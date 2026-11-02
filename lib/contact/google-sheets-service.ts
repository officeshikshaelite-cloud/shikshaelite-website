import { ContactSubmissionRecord, GoogleAppsScriptPayload, GoogleSheetsSyncStatus } from "./types";

export interface GoogleSheetsSyncResult {
  success: boolean;
  status: GoogleSheetsSyncStatus;
  rowIndex?: number;
  duplicate?: boolean;
  error?: string;
}

interface GoogleAppsScriptConfig {
  url: string;
  secret: string;
  sourceWebsite: string;
}

function getGoogleAppsScriptConfig(): GoogleAppsScriptConfig | null {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET?.trim() || "";

  if (!url || url === "" || url.includes("your_apps_script_url_here")) {
    return null;
  }

  const sourceWebsite =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://shikshaelite.com";

  return {
    url,
    secret,
    sourceWebsite,
  };
}

/**
 * Synchronize contact submission to Google Sheets via Google Apps Script Web App
 */
export async function syncSubmissionToGoogleSheets(
  record: ContactSubmissionRecord,
  timeoutMs = 15000
): Promise<GoogleSheetsSyncResult> {
  const config = getGoogleAppsScriptConfig();

  if (!config) {
    return {
      success: false,
      status: "NOT_CONFIGURED",
      error:
        "GOOGLE_APPS_SCRIPT_URL environment variable is not configured. Please deploy the Apps Script and configure the URL.",
    };
  }

  const payload: GoogleAppsScriptPayload = {
    submission_id: record.submissionId,
    submission_date: record.submissionDate,
    submission_time: record.submissionTime,
    organization_type: record.organizationType,
    full_name: record.fullName,
    phone_number: record.phoneNumber,
    email_address: record.emailAddress,
    requirement_message: record.requirementMessage,
    admin_email_status: record.adminEmailStatus,
    customer_email_status: record.customerEmailStatus,
    submission_status: record.submissionStatus,
    source_website: config.sourceWebsite,
    secret: config.secret,
  };

  const maxAttempts = 2;
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      // NOTE: Google Apps Script Web App responds to POST with a 302 redirect
      // redirect: "follow" is required to receive the JSON response
      const response = await fetch(config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: controller.signal,
      });

      clearTimeout(timer);

      const text = await response.text();
      let data: {
        success?: boolean;
        message?: string;
        error?: string;
        row_index?: number;
        duplicate?: boolean;
      } = {};

      try {
        data = JSON.parse(text);
      } catch {
        // Handle non-JSON responses from Google (e.g. HTML error page)
        throw new Error(
          `Google Apps Script returned non-JSON response (${response.status}): ${text.slice(0, 150)}`
        );
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || `HTTP ${response.status} from Apps Script`);
      }

      console.log(
        `[Google Sheets] Submission ${record.submissionId} successfully synced to Google Sheets. ${
          data.row_index ? `(Row ${data.row_index})` : ""
        }`
      );

      return {
        success: true,
        status: "SYNCED",
        rowIndex: data.row_index,
        duplicate: data.duplicate,
      };
    } catch (err: unknown) {
      clearTimeout(timer);
      const isAbort = err instanceof Error && err.name === "AbortError";
      const message = isAbort
        ? `Request timed out after ${timeoutMs}ms`
        : err instanceof Error
        ? err.message
        : "Unknown Google Apps Script error";

      lastError = message;

      if (attempt < maxAttempts) {
        console.warn(
          `[Google Sheets] Attempt ${attempt} failed for submission ${record.submissionId}: ${message}. Retrying...`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
    }
  }

  console.error(
    `[Google Sheets] All sync attempts failed for submission ${record.submissionId}: ${lastError}`
  );

  return {
    success: false,
    status: "FAILED",
    error: lastError || "Failed to sync to Google Sheets",
  };
}
