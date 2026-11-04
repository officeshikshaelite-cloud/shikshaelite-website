/**
 * Shiksha Elite - Contact Form Google Sheets Automation
 * Google Apps Script Web App Implementation
 * 
 * Target Spreadsheet: "Shiksha Elite - Contact Enquiries"
 * Target Worksheet:   "Contact Enquiries"
 * Timezone:            Asia/Kolkata (IST)
 */

// Spreadsheet ID from Shiksha Elite production workbook
var DEFAULT_SPREADSHEET_ID = "1n-skSg2sa8bipdEIdD20E8Crwpx8UOGRuT0IazhwjJM";
var SHEET_NAME = "Contact Enquiries";
var TIMEZONE = "Asia/Kolkata";

var HEADERS = [
  "Submission ID",
  "Submission Date",
  "Submission Time",
  "Organization Type",
  "Full Name",
  "Phone Number",
  "Email Address",
  "Requirement Message",
  "Admin Email Status",
  "Customer Email Status",
  "Submission Status",
  "Source Website"
];

/**
 * Health-check endpoint for monitoring deployment status
 * GET request returns basic status without exposing sensitive data
 */
function doGet(e) {
  var spreadsheetStatus = "UNKNOWN";
  try {
    var ss = getTargetSpreadsheet();
    if (ss) {
      spreadsheetStatus = "CONNECTED: " + ss.getName();
    }
  } catch (err) {
    spreadsheetStatus = "ERROR: " + err.toString();
  }

  return createJsonResponse({
    status: "ok",
    service: "Shiksha Elite Google Sheets Automation",
    spreadsheet: spreadsheetStatus,
    timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    active: true
  });
}

/**
 * Main Web App POST handler for contact form submissions
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 30 seconds to acquire exclusive lock to prevent concurrent write collisions
  try {
    var lockAcquired = lock.tryLock(30000);
    if (!lockAcquired) {
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "LOCK_TIMEOUT"
      }, 503);
    }

    // 1. Validate payload presence
    var rawContents = null;
    if (e && e.postData && e.postData.contents) {
      rawContents = e.postData.contents;
    } else if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      rawContents = JSON.stringify(e.parameter);
    }

    if (!rawContents) {
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "EMPTY_PAYLOAD"
      }, 400);
    }

    var payload;
    try {
      payload = JSON.parse(rawContents);
    } catch (parseError) {
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "INVALID_JSON"
      }, 400);
    }

    // 2. Authenticate Shared Secret if configured in Script Properties
    var expectedSecret = getScriptProperty("GOOGLE_APPS_SCRIPT_SECRET") || getScriptProperty("SHARED_SECRET");
    if (expectedSecret && expectedSecret.trim() !== "") {
      if (!payload.secret || payload.secret.trim() !== expectedSecret.trim()) {
        return createJsonResponse({
          success: false,
          message: "Unable to store enquiry",
          error_code: "UNAUTHORIZED"
        }, 401);
      }
    }

    // 3. Validate mandatory fields
    var submissionId = (payload.submission_id || "").toString().trim();
    var fullName = (payload.full_name || "").toString().trim();
    var email = (payload.email_address || "").toString().trim();
    var phone = (payload.phone_number || "").toString().trim();

    if (!submissionId || !fullName || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "MISSING_MANDATORY_FIELDS"
      }, 400);
    }

    // 4. Access target Spreadsheet
    var spreadsheet = getTargetSpreadsheet();
    if (!spreadsheet) {
      Logger.log("ERROR: Target spreadsheet could not be opened.");
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "SPREADSHEET_NOT_FOUND"
      }, 500);
    }

    // 5. Access or create the "Contact Enquiries" worksheet
    var sheet = getOrCreateWorksheet(spreadsheet, SHEET_NAME);
    if (!sheet) {
      Logger.log("ERROR: Target worksheet could not be resolved.");
      return createJsonResponse({
        success: false,
        message: "Unable to store enquiry",
        error_code: "WORKSHEET_NOT_FOUND"
      }, 500);
    }

    // 6. Idempotency Check: Prevent duplicate submissions using Submission ID
    var isDuplicate = checkDuplicateSubmission(sheet, submissionId);
    if (isDuplicate) {
      Logger.log("Duplicate submission ID: " + submissionId + " - Skipping row append.");
      return createJsonResponse({
        success: true,
        message: "Enquiry successfully stored",
        submission_id: submissionId,
        duplicate: true
      });
    }

    // 7. Format IST Date and Time
    var now = new Date();
    var submissionDate = payload.submission_date || Utilities.formatDate(now, TIMEZONE, "dd/MM/yyyy");
    var submissionTime = payload.submission_time || Utilities.formatDate(now, TIMEZONE, "hh:mm:ss a 'IST'");

    // 8. Prepare and sanitize row values (neutralizes formula injection: =, +, -, @)
    var rowValues = [
      sanitizeForSpreadsheet(submissionId),
      sanitizeForSpreadsheet(submissionDate),
      sanitizeForSpreadsheet(submissionTime),
      sanitizeForSpreadsheet(payload.organization_type || "An Institution"),
      sanitizeForSpreadsheet(fullName),
      sanitizeForSpreadsheet(phone),
      sanitizeForSpreadsheet(email),
      sanitizeForSpreadsheet(payload.requirement_message || ""),
      sanitizeForSpreadsheet(payload.admin_email_status || "PENDING"),
      sanitizeForSpreadsheet(payload.customer_email_status || "PENDING"),
      sanitizeForSpreadsheet(payload.submission_status || "RECEIVED"),
      sanitizeForSpreadsheet(payload.source_website || "https://shikshaelite.com")
    ];

    // 9. Append the new row
    sheet.appendRow(rowValues);
    var newRowIndex = sheet.getLastRow();

    // Format new row readability (align top, wrap message text)
    try {
      sheet.getRange(newRowIndex, 1, 1, HEADERS.length).setVerticalAlignment("top");
      sheet.getRange(newRowIndex, 8).setWrap(true);
    } catch (formatErr) {
      // Non-fatal
    }

    Logger.log("SUCCESS: Recorded enquiry " + submissionId + " at row " + newRowIndex);

    // Return structured success response required by Phase 2
    return createJsonResponse({
      success: true,
      message: "Enquiry successfully stored",
      submission_id: submissionId,
      row_index: newRowIndex
    });

  } catch (globalError) {
    Logger.log("CRITICAL ERROR: " + globalError.toString());
    return createJsonResponse({
      success: false,
      message: "Unable to store enquiry",
      error_code: "SHEETS_WRITE_FAILED"
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Access the target spreadsheet by ID or Active instance
 */
function getTargetSpreadsheet() {
  var spreadsheetId = getScriptProperty("SPREADSHEET_ID") || DEFAULT_SPREADSHEET_ID;
  if (spreadsheetId && spreadsheetId.trim() !== "") {
    try {
      return SpreadsheetApp.openById(spreadsheetId.trim());
    } catch (e) {
      Logger.log("Could not open by SPREADSHEET_ID: " + e.toString());
    }
  }

  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    Logger.log("No active spreadsheet available: " + e.toString());
    return null;
  }
}

/**
 * Retrieve or create the worksheet with styled headers.
 * If user has "Sheet1" with "Submission ID" in row 1, seamlessly use or rename it!
 */
function getOrCreateWorksheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    ensureHeaders(sheet);
    return sheet;
  }

  // Check if first sheet already has "Submission ID" in A1 (e.g. default Sheet1)
  var sheets = spreadsheet.getSheets();
  if (sheets.length > 0) {
    var firstSheet = sheets[0];
    if (firstSheet.getLastRow() >= 1) {
      try {
        var firstCell = firstSheet.getRange(1, 1).getValue().toString().trim();
        if (firstCell === "Submission ID") {
          try {
            firstSheet.setName(sheetName);
          } catch (renameErr) {
            // Non-fatal
          }
          ensureHeaders(firstSheet);
          return firstSheet;
        }
      } catch (checkErr) {
        // Non-fatal
      }
    }
  }

  // Create new worksheet if not found
  sheet = spreadsheet.insertSheet(sheetName);
  ensureHeaders(sheet);
  return sheet;
}

/**
 * Ensure headers exist and are styled
 */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);

    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#071B4D"); // Shiksha Elite Navy
    headerRange.setFontColor("#FFFFFF"); // White text
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);

    sheet.setFrozenRows(1);

    sheet.setColumnWidth(1, 260); // Submission ID
    sheet.setColumnWidth(2, 110); // Date
    sheet.setColumnWidth(3, 130); // Time
    sheet.setColumnWidth(4, 150); // Org Type
    sheet.setColumnWidth(5, 170); // Full Name
    sheet.setColumnWidth(6, 140); // Phone
    sheet.setColumnWidth(7, 210); // Email
    sheet.setColumnWidth(8, 320); // Message
    sheet.setColumnWidth(9, 130); // Admin Email
    sheet.setColumnWidth(10, 140); // Customer Email
    sheet.setColumnWidth(11, 130); // Sub Status
    sheet.setColumnWidth(12, 180); // Source Website
  }
}

/**
 * Check if the submission ID already exists in Column 1 (Idempotent Deduplication)
 */
function checkDuplicateSubmission(sheet, submissionId) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  var idRange = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < idRange.length; i++) {
    if (idRange[i][0] && idRange[i][0].toString().trim() === submissionId) {
      return true;
    }
  }
  return false;
}

/**
 * Neutralize formula injection risks (=, +, -, @)
 */
function sanitizeForSpreadsheet(value) {
  if (value === null || value === undefined) return "";
  var str = value.toString().trim();
  var firstChar = str.charAt(0);
  if (firstChar === "=" || firstChar === "+" || firstChar === "-" || firstChar === "@") {
    return "'" + str;
  }
  return str;
}

/**
 * Read script properties safely
 */
function getScriptProperty(key) {
  try {
    return PropertiesService.getScriptProperties().getProperty(key);
  } catch (e) {
    return null;
  }
}

/**
 * Helper to build JSON responses via ContentService
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * ONE-CLICK SETUP HELPER:
 * Run this function inside the Apps Script editor to initialize the spreadsheet,
 * create the 'Contact Enquiries' worksheet, add headers, and style columns.
 */
function setupSpreadsheet() {
  var ss = getTargetSpreadsheet();
  if (!ss) {
    Logger.log("ERROR: Could not open spreadsheet ID: " + DEFAULT_SPREADSHEET_ID);
    return;
  }
  var sheet = getOrCreateWorksheet(ss, SHEET_NAME);
  Logger.log("SUCCESS: Initialized worksheet '" + sheet.getName() + "' in spreadsheet '" + ss.getName() + "'.");
}
