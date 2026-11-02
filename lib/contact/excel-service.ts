import { ContactSubmissionRecord, ExcelSyncStatus } from "./types";

export interface ExcelAppendResult {
  success: boolean;
  status: ExcelSyncStatus;
  rowId?: string;
  error?: string;
}

// In-memory token cache
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

// Set of processed submission IDs to prevent duplicate row additions
const syncedSubmissionIds = new Set<string>();

interface MicrosoftConfig {
  clientId: string;
  clientSecret: string;
  refreshToken?: string;
  tenantId: string;
  filePath: string;
  worksheetName: string;
  tableName: string;
  itemId?: string;
  driveId?: string;
}

function getMicrosoftConfig(): MicrosoftConfig | null {
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();
  const refreshToken = process.env.MICROSOFT_REFRESH_TOKEN?.trim();

  // If core credentials are not provided or are placeholders, return null
  if (
    !clientId ||
    clientId.includes("your_") ||
    !clientSecret ||
    clientSecret.includes("your_")
  ) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
    tenantId: process.env.MICROSOFT_TENANT_ID?.trim() || "common",
    filePath: process.env.MICROSOFT_EXCEL_FILE_PATH?.trim() || "Shiksha_Elite_Contact_Enquiries.xlsx",
    worksheetName: process.env.MICROSOFT_EXCEL_WORKSHEET_NAME?.trim() || "Contact Enquiries",
    tableName: process.env.MICROSOFT_EXCEL_TABLE_NAME?.trim() || "Contact_Enquiries",
    itemId: process.env.MICROSOFT_EXCEL_ITEM_ID?.trim(),
    driveId: process.env.MICROSOFT_DRIVE_ID?.trim(),
  };
}

/**
 * Acquire Microsoft Graph access token using delegated Refresh Token flow or Client Credentials
 */
async function getAccessToken(config: MicrosoftConfig): Promise<string> {
  const now = Date.now();
  // Reuse token if still valid for at least 3 minutes
  if (cachedAccessToken && tokenExpiresAt > now + 3 * 60 * 1000) {
    return cachedAccessToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", config.clientId);
  params.append("client_secret", config.clientSecret);

  if (config.refreshToken) {
    // Delegated Permissions Flow via Refresh Token
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", config.refreshToken);
    params.append("scope", "offline_access Files.ReadWrite Files.ReadWrite.All User.Read");
  } else {
    // Application Permissions Flow (Client Credentials) fallback
    params.append("grant_type", "client_credentials");
    params.append("scope", "https://graph.microsoft.com/.default");
  }

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Microsoft OAuth Token Error:", response.status, errorBody);
    throw new Error(`Microsoft OAuth token acquisition failed: ${response.status} - ${errorBody}`);
  }

  const tokenData = await response.json();
  if (!tokenData.access_token) {
    throw new Error("No access_token returned by Microsoft OAuth endpoint.");
  }

  const accessToken = String(tokenData.access_token);
  cachedAccessToken = accessToken;
  tokenExpiresAt = Date.now() + (Number(tokenData.expires_in) || 3600) * 1000;

  return accessToken;
}

/**
 * Resolve the base Graph API endpoint for the Excel workbook
 */
function getWorkbookBaseUrl(config: MicrosoftConfig): string {
  if (config.itemId) {
    if (config.driveId) {
      return `https://graph.microsoft.com/v1.0/drives/${config.driveId}/items/${config.itemId}/workbook`;
    }
    return `https://graph.microsoft.com/v1.0/me/drive/items/${config.itemId}/workbook`;
  }

  const encodedPath = encodeURIComponent(config.filePath);
  if (config.driveId) {
    return `https://graph.microsoft.com/v1.0/drives/${config.driveId}/root:/${encodedPath}:/workbook`;
  }

  return `https://graph.microsoft.com/v1.0/me/drive/root:/${encodedPath}:/workbook`;
}

/**
 * Append row to Excel Online table with retry logic
 */
export async function appendSubmissionToExcel(
  record: ContactSubmissionRecord
): Promise<ExcelAppendResult> {
  // Check for duplicate submission in memory
  if (syncedSubmissionIds.has(record.submissionId)) {
    console.log(`Submission ${record.submissionId} already synced to Excel.`);
    return {
      success: true,
      status: "SYNCED",
    };
  }

  const config = getMicrosoftConfig();
  if (!config) {
    return {
      success: false,
      status: "NOT_CONFIGURED",
      error:
        "Microsoft Graph API credentials not configured. Please set MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, and MICROSOFT_REFRESH_TOKEN.",
    };
  }

  // Row values corresponding to the 11 columns required:
  // 1. Submission ID
  // 2. Submission Date
  // 3. Submission Time
  // 4. Organization Type
  // 5. Full Name
  // 6. Phone Number
  // 7. Email Address
  // 8. Requirement Message
  // 9. Admin Email Status
  // 10. Customer Email Status
  // 11. Submission Status
  const rowValues = [
    [
      record.submissionId,
      record.submissionDate,
      record.submissionTime,
      record.organizationType,
      record.fullName,
      record.phoneNumber,
      record.emailAddress,
      record.requirementMessage,
      record.adminEmailStatus,
      record.customerEmailStatus,
      record.submissionStatus,
    ],
  ];

  const maxRetries = 3;
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const accessToken = await getAccessToken(config);
      const workbookBase = getWorkbookBaseUrl(config);

      // Endpoint: POST /workbook/tables/{table-id-or-name}/rows/add
      const appendUrl = `${workbookBase}/tables/${encodeURIComponent(config.tableName)}/rows/add`;

      const response = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: rowValues,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        syncedSubmissionIds.add(record.submissionId);
        return {
          success: true,
          status: "SYNCED",
          rowId: responseData?.index !== undefined ? String(responseData.index) : undefined,
        };
      }

      // Handle transient errors (429 Rate Limit, 503/504, or ResourceLocked)
      const errorText = await response.text();
      lastError = `Microsoft Graph API error (${response.status}): ${errorText}`;

      const isRetryable =
        response.status === 429 ||
        response.status === 503 ||
        response.status === 504 ||
        errorText.includes("ResourceLocked") ||
        errorText.includes("activityLimitReached");

      if (isRetryable && attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 1000 + Math.floor(Math.random() * 500);
        console.warn(`Excel append attempt ${attempt} failed with retryable error. Retrying in ${backoffMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }

      // If table wasn't found by specific name, try discovering or falling back to first table
      if (response.status === 404 && attempt === 1) {
        const fallbackResult = await tryAppendToFirstAvailableTable(workbookBase, accessToken, rowValues);
        if (fallbackResult.success) {
          syncedSubmissionIds.add(record.submissionId);
          return fallbackResult;
        }
      }

      break;
    } catch (err) {
      lastError = err instanceof Error ? err.message : "Unknown Excel sync error";
      if (attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }
    }
  }

  console.error("Microsoft Excel sync failed after retries:", lastError);
  return {
    success: false,
    status: "FAILED",
    error: lastError || "Failed to append row to Excel Online.",
  };
}

/**
 * Fallback helper to discover tables in the workbook if table name is default or renamed
 */
async function tryAppendToFirstAvailableTable(
  workbookBase: string,
  accessToken: string,
  rowValues: (string | number)[][]
): Promise<ExcelAppendResult> {
  try {
    const listTablesUrl = `${workbookBase}/tables`;
    const listRes = await fetch(listTablesUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!listRes.ok) return { success: false, status: "FAILED" };

    const data = await listRes.json();
    const tables = data?.value;
    if (Array.isArray(tables) && tables.length > 0) {
      const firstTableId = tables[0].id || tables[0].name;
      const addRowUrl = `${workbookBase}/tables/${encodeURIComponent(firstTableId)}/rows/add`;

      const addRes = await fetch(addRowUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: rowValues }),
      });

      if (addRes.ok) {
        const resData = await addRes.json();
        return {
          success: true,
          status: "SYNCED",
          rowId: resData?.index !== undefined ? String(resData.index) : undefined,
        };
      }
    }
  } catch (err) {
    console.warn("Fallback table append attempt failed:", err);
  }

  return { success: false, status: "FAILED" };
}
