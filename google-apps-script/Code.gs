/**
 * Shiksha Elite - Contact Form Google Sheets Automation
 * Google Apps Script Web App Implementation
 * 
 * Spreadsheet: "Shiksha Elite - Contact Enquiries"
 * Worksheet:   "Contact Enquiries"
 * Timezone:    Asia/Kolkata (IST)
 */

// Default Configuration (Can also be set in Script Properties)
var SPREADSHEET_NAME = "Shiksha Elite - Contact Enquiries";
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
  return createJsonResponse({
    status: "ok",
    service: "Shiksha Elite Google Sheets Automation",
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
        error: "Server busy. Could not acquire lock for writing.",
        status: "BUSY"
      }, 503);
    }

    // 1. Validate payload presence
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        error: "Empty or invalid request body.",
        status: "BAD_REQUEST"
      }, 400);
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({
        success: false,
        error: "Malformed JSON payload: " + parseError.toString(),
        status: "BAD_REQUEST"
      }, 400);
    }

    // 2. Authenticate Shared Secret
    var expectedSecret = getScriptProperty("GOOGLE_APPS_SCRIPT_SECRET") || getScriptProperty("SHARED_SECRET");
    if (expectedSecret) {
      if (!payload.secret || payload.secret !== expectedSecret) {
        return createJsonResponse({
          success: false,
          error: "Unauthorized: Invalid or missing shared secret token.",
          status: "UNAUTHORIZED"
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
        error: "Missing mandatory fields (submission_id, full_name, email_address, phone_number).",
        status: "BAD_REQUEST"
      }, 400);
    }

    // 4. Access or open the Spreadsheet
    var spreadsheet = getTargetSpreadsheet();
    if (!spreadsheet) {
      return createJsonResponse({
        success: false,
        error: "Target Google Spreadsheet could not be opened. Check SPREADSHEET_ID in Script Properties.",
        status: "INTERNAL_ERROR"
      }, 500);
    }

    // 5. Access or create the "Contact Enquiries" worksheet
    var sheet = getOrCreateWorksheet(spreadsheet, SHEET_NAME);

    // 6. Idempotency Check: Prevent duplicate submissions using Submission ID
    var isDuplicate = checkDuplicateSubmission(sheet, submissionId);
    if (isDuplicate) {
      return createJsonResponse({
        success: true,
        duplicate: true,
        message: "Enquiry already recorded. Duplicate row skipped.",
        submission_id: submissionId,
        status: "ALREADY_SYNCED"
      });
    }

    // 7. Format IST Date and Time
    var now = new Date();
    var submissionDate = payload.submission_date || Utilities.formatDate(now, TIMEZONE, "dd/MM/yyyy");
    var submissionTime = payload.submission_time || Utilities.formatDate(now, TIMEZONE, "hh:mm:ss a 'IST'");

    // 8. Prepare and sanitize row values (Prevents formula injection like '=cmd|' or '=SUM')
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
      sheet.getRange(newRowIndex, 8).setWrap(true); // Requirement message wrap
    } catch (formatErr) {
      // Non-fatal formatting issue
    }

    return createJsonResponse({
      success: true,
      message: "Enquiry successfully recorded in Google Sheets.",
      submission_id: submissionId,
      row_index: newRowIndex,
      status: "SYNCED"
    });

  } catch (globalError) {
    return createJsonResponse({
      success: false,
      error: "Unexpected Apps Script error: " + globalError.toString(),
      status: "INTERNAL_ERROR"
    }, 500);
  } finally {
    // Always release lock
    lock.releaseLock();
  }
}

/**
 * Access the target spreadsheet by ID or Active instance
 */
function getTargetSpreadsheet() {
  var spreadsheetId = getScriptProperty("SPREADSHEET_ID");
  if (spreadsheetId && spreadsheetId.trim() !== "") {
    try {
      return SpreadsheetApp.openById(spreadsheetId.trim());
    } catch (e) {
      Logger.log("Could not open by SPREADSHEET_ID: " + e.toString());
    }
  }

  // Fallback to active spreadsheet (if script is bound to the sheet)
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    Logger.log("No active spreadsheet available: " + e.toString());
    return null;
  }
}

/**
 * Retrieve or create the worksheet with styled headers
 */
function getOrCreateWorksheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  // Ensure header row exists
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);

    // Style the header row with Shiksha Elite corporate colors
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#071B4D"); // Shiksha Elite Navy
    headerRange.setFontColor("#FFFFFF"); // White text
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);

    // Freeze header row
    sheet.setFrozenRows(1);

    // Set practical column widths
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

  return sheet;
}

/**
 * Check if the submission ID already exists in Column 1 (Idempotent Deduplication)
 */
function checkDuplicateSubmission(sheet, submissionId) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  // Read Column 1 (Submission IDs) from row 2 down to lastRow
  var idRange = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < idRange.length; i++) {
    if (idRange[i][0] && idRange[i][0].toString().trim() === submissionId) {
      return true;
    }
  }
  return false;
}

/**
 * Neutralize formula injection risks (=, +, -, @, tab, newline prefix)
 */
function sanitizeForSpreadsheet(value) {
  if (value === null || value === undefined) return "";
  var str = value.toString().trim();
  
  // If string begins with formula trigger character, prepend a single quote
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
function createJsonResponse(data) {
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
    Logger.log("ERROR: Open this script from the spreadsheet (Extensions > Apps Script) or set SPREADSHEET_ID in Script Properties.");
    return;
  }

  var sheet = getOrCreateWorksheet(ss, SHEET_NAME);
  Logger.log("SUCCESS: Initialized worksheet '" + SHEET_NAME + "' in spreadsheet '" + ss.getName() + "'.");
}
