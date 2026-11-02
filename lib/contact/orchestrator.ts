import crypto from "crypto";
import {
  ContactFormInput,
  ContactSubmissionRecord,
  SubmissionResponse,
  ExcelSyncStatus,
  GoogleSheetsSyncStatus,
} from "./types";
import { validateAndSanitizeContactInput } from "./validation";
import { checkRateLimit } from "./rate-limiter";
import { getIstDateTime, getClientIp } from "./utils";
import { persistNewSubmission, updateSubmissionStatus } from "./storage";
import {
  sendAdminNotificationEmail,
  sendCustomerAcknowledgementEmail,
} from "./resend-service";
import { appendSubmissionToExcel } from "./excel-service";
import { syncSubmissionToGoogleSheets } from "./google-sheets-service";

export async function processContactSubmission(
  rawInput: Partial<ContactFormInput>,
  req: Request
): Promise<{ status: number; body: SubmissionResponse }> {
  // Step 4a: Rate Limiting by Client IP
  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    return {
      status: 429,
      body: {
        success: false,
        message: `Too many submissions from your connection. Please wait ${rateLimitResult.resetSeconds} seconds before trying again.`,
        errors: ["Rate limit exceeded."],
      },
    };
  }

  // Steps 2 & 3: Validate and sanitize all inputs
  const validation = validateAndSanitizeContactInput(rawInput);
  if (!validation.isValid || !validation.sanitizedData) {
    return {
      status: 400,
      body: {
        success: false,
        message: validation.errors[0] || "Invalid submission data.",
        errors: validation.errors,
      },
    };
  }

  const {
    organizationType,
    fullName,
    phoneNumber,
    emailAddress,
    requirementMessage,
  } = validation.sanitizedData;

  // Step 5: Generate unique Submission ID (UUID) and IST Timestamps
  const submissionId = crypto.randomUUID();
  const { dateStr, timeStr, isoStr } = getIstDateTime();

  // Create initial record
  const submissionRecord: ContactSubmissionRecord = {
    submissionId,
    submissionDate: dateStr,
    submissionTime: timeStr,
    submissionTimestampIso: isoStr,
    organizationType,
    fullName,
    phoneNumber,
    emailAddress,
    requirementMessage,
    submissionStatus: "RECEIVED",
    adminEmailStatus: "PENDING",
    customerEmailStatus: "PENDING",
    excelSyncStatus: "PENDING",
    ipAddress: clientIp,
    userAgent,
    errors: {},
    createdAt: isoStr,
    updatedAt: isoStr,
  };

  // Step 6: Persist the submission BEFORE external email and Excel calls
  // "Important: Database/storage persistence must happen before external email and Excel operations.
  // Email or Excel failures must not erase the original enquiry."
  const persistenceResult = await persistNewSubmission(submissionRecord);
  if (!persistenceResult.persisted) {
    console.error("Critical: Failed to persist contact enquiry:", submissionId);
    return {
      status: 500,
      body: {
        success: false,
        message:
          "We could not save your submission right now due to a storage issue. Please try again or contact us directly.",
        errors: ["Storage persistence failed."],
      },
    };
  }

  console.log(`[Submission ${submissionId}] Persisted via ${persistenceResult.storageMethod}. Beginning async operations...`);

  // Step 7: Trigger Admin Notification Email (Resend)
  let adminEmailStatus: "SENT" | "FAILED" = "FAILED";
  let adminEmailId: string | undefined;
  let adminEmailError: string | undefined;

  try {
    const adminEmailResult = await sendAdminNotificationEmail(submissionRecord);
    if (adminEmailResult.success) {
      adminEmailStatus = "SENT";
      adminEmailId = adminEmailResult.emailId;
    } else {
      adminEmailStatus = "FAILED";
      adminEmailError = adminEmailResult.error;
    }
  } catch (err) {
    adminEmailStatus = "FAILED";
    adminEmailError = err instanceof Error ? err.message : "Admin email send error";
  }

  // Step 8: Trigger Customer Acknowledgement Email (Resend)
  let customerEmailStatus: "SENT" | "FAILED" = "FAILED";
  let customerEmailId: string | undefined;
  let customerEmailError: string | undefined;

  try {
    const customerEmailResult = await sendCustomerAcknowledgementEmail(submissionRecord);
    if (customerEmailResult.success) {
      customerEmailStatus = "SENT";
      customerEmailId = customerEmailResult.emailId;
    } else {
      customerEmailStatus = "FAILED";
      customerEmailError = customerEmailResult.error;
    }
  } catch (err) {
    customerEmailStatus = "FAILED";
    customerEmailError = err instanceof Error ? err.message : "Customer acknowledgement send error";
  }

  // Step 9: Append the submission to Microsoft Excel Online
  // Note: We update the record status fields before sending to Excel so Excel row reflects the email delivery statuses
  submissionRecord.adminEmailStatus = adminEmailStatus;
  submissionRecord.customerEmailStatus = customerEmailStatus;

  let excelSyncStatus: ExcelSyncStatus = "FAILED";
  let excelRowId: string | undefined;
  let excelError: string | undefined;

  try {
    const excelResult = await appendSubmissionToExcel(submissionRecord);
    excelSyncStatus = excelResult.status;
    excelRowId = excelResult.rowId;
    excelError = excelResult.error;
  } catch (err) {
    excelSyncStatus = "FAILED";
    excelError = err instanceof Error ? err.message : "Excel sync error";
  }

  // Step 10: Append the submission to Google Sheets (via Google Apps Script Web App)
  let googleSheetsSyncStatus: GoogleSheetsSyncStatus = "FAILED";
  let googleSheetsRowIndex: number | undefined;
  let googleSheetsError: string | undefined;

  try {
    const sheetsResult = await syncSubmissionToGoogleSheets(submissionRecord);
    googleSheetsSyncStatus = sheetsResult.status;
    googleSheetsRowIndex = sheetsResult.rowIndex;
    googleSheetsError = sheetsResult.error;
  } catch (err) {
    googleSheetsSyncStatus = "FAILED";
    googleSheetsError = err instanceof Error ? err.message : "Google Sheets sync error";
  }

  // Step 11: Record the final delivery and synchronization statuses
  const statusUpdates: Partial<ContactSubmissionRecord> = {
    adminEmailStatus,
    customerEmailStatus,
    excelSyncStatus,
    googleSheetsSyncStatus,
    googleSheetsRowIndex,
    adminEmailId,
    customerEmailId,
    excelRowId,
    errors: {
      ...(adminEmailError ? { adminEmail: adminEmailError } : {}),
      ...(customerEmailError ? { customerEmail: customerEmailError } : {}),
      ...(excelError ? { excelSync: excelError } : {}),
      ...(googleSheetsError ? { googleSheets: googleSheetsError } : {}),
    },
  };

  await updateSubmissionStatus(submissionId, statusUpdates);

  console.log(
    `[Submission ${submissionId}] Summary: AdminEmail=${adminEmailStatus}, CustomerEmail=${customerEmailStatus}, Excel=${excelSyncStatus}, GoogleSheets=${googleSheetsSyncStatus}`
  );

  // Step 12: Return response to the frontend
  // Even if email or external spreadsheet sync had transient issues, the customer's enquiry is safely persisted.
  return {
    status: 200,
    body: {
      success: true,
      submissionId,
      message:
        "Thank you for contacting Shiksha Elite! Your enquiry has been successfully submitted. Our team will contact you shortly.",
      statuses: {
        submission: "RECEIVED",
        adminEmail: adminEmailStatus,
        customerEmail: customerEmailStatus,
        excelSync: excelSyncStatus,
        googleSheets: googleSheetsSyncStatus,
      },
    },
  };
}
