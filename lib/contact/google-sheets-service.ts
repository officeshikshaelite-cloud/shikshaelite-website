import { ContactSubmissionRecord, GoogleAppsScriptPayload, GoogleSheetsSyncStatus } from "./types";

export interface GoogleSheetsSyncResult {
  success: boolean;
  status: GoogleSheetsSyncStatus;
  rowIndex?: number;
  duplicate?: boolean;
  error?: string;
  responseBody?: unknown;
}

interface GoogleAppsScriptConfig {
  url: string;
  secret: string;
  sourceWebsite: string;
}

export function getGoogleAppsScriptConfig(): GoogleAppsScriptConfig | null {
  let url = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET?.trim() || "";

  if (!url || url === "" || url.includes("your_deployment_id_here") || url.includes("your_apps_script_url_here")) {
    return null;
  }

  // Ensure URL points to /exec, not /edit
  if (url.includes("/edit")) {
    url = url.replace(/\/edit.*$/, "/exec");
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
 * Mask URL for safe production logging without leaking deployment hashes
 */
function maskScriptUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/");
    if (pathParts.length > 3) {
      const id = pathParts[3];
      const maskedId = id.length > 10 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id;
      pathParts[3] = maskedId;
      return `${parsed.origin}${pathParts.join("/")}`;
    }
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return "https://script.google.com/macros/s/.../exec";
  }
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
    console.warn(
      `[Contact Form] [Submission ${record.submissionId}] Google Sheets synchronization skipped: GOOGLE_APPS_SCRIPT_URL is not configured.`
    );
    return {
      success: false,
      status: "NOT_CONFIGURED",
      error:
        "GOOGLE_APPS_SCRIPT_URL environment variable is not configured. Please deploy the Apps Script and configure the URL.",
    };
  }

  const maskedUrl = maskScriptUrl(config.url);
  console.log(
    `[Contact Form] [Submission ${record.submissionId}] Google Apps Script request initiated -> ${maskedUrl}`
  );

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
      // Send POST request with JSON payload
      // Use redirect: "follow" to follow Google's 302 redirect to script.googleusercontent.com
      let response = await fetch(config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: controller.signal,
      });

      // Handle cases where manual redirect is returned (HTTP 301, 302, 307)
      if (
        (response.status === 301 || response.status === 302 || response.status === 307) &&
        response.headers.get("location")
      ) {
        const redirectUrl = response.headers.get("location")!;
        console.log(
          `[Contact Form] [Submission ${record.submissionId}] Following Apps Script redirect to Google content server...`
        );
        response = await fetch(redirectUrl, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
      }

      clearTimeout(timer);

      const httpStatus = response.status;
      const text = await response.text();

      console.log(
        `[Contact Form] [Submission ${record.submissionId}] Apps Script HTTP response status: ${httpStatus}`
      );

      let data: {
        success?: boolean;
        message?: string;
        error?: string;
        error_code?: string;
        submission_id?: string;
        row_index?: number;
        duplicate?: boolean;
      } = {};

      try {
        data = JSON.parse(text);
      } catch {
        // Detect HTML responses (such as Google Login redirect or 404 page)
        if (text.includes("accounts.google.com") || text.includes("<html")) {
          throw new Error(
            `Apps Script returned HTML authorization/error page (HTTP ${httpStatus}). Please verify that Web App deployment access is set to 'Anyone', not 'Only myself'.`
          );
        }
        throw new Error(
          `Apps Script returned non-JSON response (HTTP ${httpStatus}): ${text.slice(0, 150)}`
        );
      }

      console.log(
        `[Contact Form] [Submission ${record.submissionId}] Apps Script response body:`,
        JSON.stringify({
          success: data.success,
          message: data.message,
          error_code: data.error_code,
          row_index: data.row_index,
          duplicate: data.duplicate,
        })
      );

      // Verify the returned JSON success field
      if (!response.ok || data.success !== true) {
        const failureReason =
          data.error ||
          data.message ||
          data.error_code ||
          `HTTP ${httpStatus} from Apps Script`;
        throw new Error(failureReason);
      }

      console.log(
        `[Contact Form] [Submission ${record.submissionId}] Google Sheets synchronization result: SYNCED ${
          data.row_index ? `(Row ${data.row_index})` : ""
        }`
      );

      return {
        success: true,
        status: "SYNCED",
        rowIndex: data.row_index,
        duplicate: data.duplicate,
        responseBody: data,
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
          `[Contact Form] [Submission ${record.submissionId}] Attempt ${attempt} failed: ${message}. Retrying...`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
    }
  }

  console.error(
    `[Contact Form] [Submission ${record.submissionId}] Google Sheets synchronization result: FAILED (${lastError})`
  );

  return {
    success: false,
    status: "FAILED",
    error: lastError || "Failed to sync to Google Sheets",
  };
}
