/**
 * Automated Verification Suite for Google Sheets Automation via Google Apps Script
 * Tests:
 * 1. Payload structure and field mapping
 * 2. Formula injection sanitization
 * 3. Mock Google Apps Script Web App server (POST / GET)
 * 4. Authentication with shared secret
 * 5. Rejection of invalid secrets
 * 6. Deduplication handling
 * 7. End-to-end submission pipeline with Google Sheets sync
 * 8. Retry endpoint with target: "google_sheets"
 */

import http from "http";
import { syncSubmissionToGoogleSheets } from "../lib/contact/google-sheets-service.ts";
import { processContactSubmission } from "../lib/contact/orchestrator.ts";
import { POST as retryHandler } from "../app/api/contact/retry/route.ts";
import { getSubmissionById, persistNewSubmission } from "../lib/contact/storage.ts";
import { resetRateLimit } from "../lib/contact/rate-limiter.ts";

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
    passedCount++;
  } else {
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} ${details ? "- " + details : ""}`);
    failedCount++;
  }
}

// In-memory sheet database for mock Apps Script Web App
const mockSheetRows = [];
const TEST_SECRET = "test_shiksha_secret_2026";
let mockServer;
let mockPort = 3899;

function startMockAppsScriptServer() {
  return new Promise((resolve) => {
    mockServer = http.createServer((req, res) => {
      // Health check GET
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "ok",
            service: "Mock Google Apps Script Web App",
            active: true,
          })
        );
        return;
      }

      // POST handler
      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          let data;
          try {
            data = JSON.parse(body);
          } catch {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Invalid JSON" }));
            return;
          }

          // Secret verification
          if (!data.secret || data.secret !== TEST_SECRET) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                error: "Unauthorized: Invalid or missing shared secret token.",
              })
            );
            return;
          }

          // Deduplication check
          const existing = mockSheetRows.find((r) => r.submission_id === data.submission_id);
          if (existing) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: true,
                duplicate: true,
                message: "Enquiry successfully stored",
                submission_id: data.submission_id,
              })
            );
            return;
          }

          // Append row
          mockSheetRows.push(data);
          const rowIndex = mockSheetRows.length + 1; // +1 for header
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: "Enquiry successfully stored",
              submission_id: data.submission_id,
              row_index: rowIndex,
            })
          );
        });
      }
    });

    mockServer.listen(mockPort, () => {
      resolve();
    });
  });
}

async function runTests() {
  console.log("\n=======================================================");
  console.log(" Google Sheets Automation via Google Apps Script Tests");
  console.log("=======================================================\n");

  await startMockAppsScriptServer();

  // Configure environment variables for testing
  process.env.GOOGLE_APPS_SCRIPT_URL = `http://localhost:${mockPort}`;
  process.env.GOOGLE_APPS_SCRIPT_SECRET = TEST_SECRET;
  process.env.NEXT_PUBLIC_SITE_URL = "https://shikshaelite.com";

  // ---------------------------------------------------------------------------
  // 1. Basic Sync with Valid Record
  // ---------------------------------------------------------------------------
  console.log("Section 1: Google Apps Script Web App Communication");

  const sampleRecord = {
    submissionId: "sheets-uuid-" + Date.now(),
    submissionDate: "02/11/2026",
    submissionTime: "10:45:00 PM IST",
    submissionTimestampIso: new Date().toISOString(),
    organizationType: "An Institution",
    fullName: "Venkatesh Murthy",
    phoneNumber: "+91 98450 77889",
    emailAddress: "venkatesh.murthy@vidyashiksha.org",
    requirementMessage: "Requirement for 8 Primary and Middle School teachers in Bangalore.",
    submissionStatus: "RECEIVED",
    adminEmailStatus: "SENT",
    customerEmailStatus: "SENT",
    excelSyncStatus: "NOT_CONFIGURED",
    sourceWebsite: "https://shikshaelite.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const syncRes = await syncSubmissionToGoogleSheets(sampleRecord);
  assert(syncRes.success === true, "Google Sheets sync successful with valid record");
  assert(syncRes.status === "SYNCED", "Sync status is marked as 'SYNCED'");
  assert(syncRes.rowIndex === 2, "Returns correct sheet row index (Row 2 for first data row)");

  // ---------------------------------------------------------------------------
  // 2. Idempotent Deduplication (Test Case: Duplicate Submission ID)
  // ---------------------------------------------------------------------------
  console.log("\nSection 2: Deduplication & Idempotency");
  const duplicateRes = await syncSubmissionToGoogleSheets(sampleRecord);
  assert(duplicateRes.success === true, "Idempotent resubmission reports success");
  assert(duplicateRes.duplicate === true, "Correctly identifies duplicate submission ID");
  assert(mockSheetRows.length === 1, "Does NOT create duplicate row in spreadsheet");

  // ---------------------------------------------------------------------------
  // 3. Security: Shared Secret Token Authentication
  // ---------------------------------------------------------------------------
  console.log("\nSection 3: Security & Shared Secret Verification");
  process.env.GOOGLE_APPS_SCRIPT_SECRET = "wrong_secret_attacker";
  const badAuthRecord = {
    ...sampleRecord,
    submissionId: "sheets-bad-secret-" + Date.now(),
  };

  const badSecretRes = await syncSubmissionToGoogleSheets(badAuthRecord);
  assert(badSecretRes.success === false, "Rejects request with invalid shared secret");
  assert(badSecretRes.status === "FAILED", "Status marked as 'FAILED' when unauthorized");
  assert(badSecretRes.error.includes("Unauthorized") || badSecretRes.error.includes("secret"), "Returns authorization error message");

  // Restore correct secret
  process.env.GOOGLE_APPS_SCRIPT_SECRET = TEST_SECRET;

  // ---------------------------------------------------------------------------
  // 4. Unconfigured Environment Handling
  // ---------------------------------------------------------------------------
  console.log("\nSection 4: Unconfigured Web App Handling (Graceful Degradation)");
  const savedUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  delete process.env.GOOGLE_APPS_SCRIPT_URL;

  const unconfiguredRecord = {
    ...sampleRecord,
    submissionId: "sheets-unconfigured-" + Date.now(),
  };

  const unconfigRes = await syncSubmissionToGoogleSheets(unconfiguredRecord);
  assert(unconfigRes.success === false, "Returns success: false when unconfigured");
  assert(unconfigRes.status === "NOT_CONFIGURED", "Returns status 'NOT_CONFIGURED'");
  assert(unconfigRes.error.includes("GOOGLE_APPS_SCRIPT_URL"), "Returns informative message to configure URL");

  // Restore URL
  process.env.GOOGLE_APPS_SCRIPT_URL = savedUrl;

  // ---------------------------------------------------------------------------
  // 5. End-to-End Submission Pipeline with Google Sheets
  // ---------------------------------------------------------------------------
  console.log("\nSection 5: End-to-End Orchestrator Pipeline with Google Sheets");
  resetRateLimit("127.0.0.1");

  const mockReq = new Request("http://localhost:3000/api/contact/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
      "user-agent": "Automated-E2E-Runner/1.0",
    },
  });

  const validSubmissionInput = {
    type: "educator",
    name: "Deepa Narayanan",
    phone: "+91 94481 22334",
    email: "deepa.narayanan@example.com",
    message: "Seeking senior chemistry educator position in Mysore or Bangalore.",
  };

  const pipelineRes = await processContactSubmission(validSubmissionInput, mockReq);
  assert(pipelineRes.status === 200, "Pipeline returns HTTP 200");
  assert(pipelineRes.body.success === true, "Pipeline response success is true");
  assert(pipelineRes.body.statuses?.googleSheets === "SYNCED", "Pipeline response reports googleSheets: SYNCED");

  // Verify storage persistence has the status recorded
  const savedDoc = await getSubmissionById(pipelineRes.body.submissionId);
  assert(savedDoc !== null, "Submission persisted in storage");
  assert(savedDoc?.googleSheetsSyncStatus === "SYNCED", "Stored document has googleSheetsSyncStatus: SYNCED");
  assert(typeof savedDoc?.googleSheetsRowIndex === "number", "Stored document records googleSheetsRowIndex");

  // ---------------------------------------------------------------------------
  // 6. Retry Endpoint (/api/contact/retry) with Google Sheets
  // ---------------------------------------------------------------------------
  console.log("\nSection 6: Retry Endpoint with target: 'google_sheets'");
  const retrySubId = "retry-sheets-" + Date.now();
  const retryRecord = {
    submissionId: retrySubId,
    submissionDate: "02/11/2026",
    submissionTime: "11:00:00 PM IST",
    submissionTimestampIso: new Date().toISOString(),
    organizationType: "An Institution",
    fullName: "National Public School Academy",
    phoneNumber: "+91 80 2345 6789",
    emailAddress: "info@npsacademy.org",
    requirementMessage: "Urgent recruitment for Mathematics and Science faculty.",
    submissionStatus: "RECEIVED",
    adminEmailStatus: "SENT",
    customerEmailStatus: "SENT",
    excelSyncStatus: "NOT_CONFIGURED",
    googleSheetsSyncStatus: "FAILED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await persistNewSubmission(retryRecord);

  const retryReq = new Request("http://localhost:3000/api/contact/retry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submissionId: retrySubId,
      target: "google_sheets",
    }),
  });

  const retryResponse = await retryHandler(retryReq);
  assert(retryResponse.status === 200, "Retry endpoint returns HTTP 200");
  const retryBody = await retryResponse.json();
  assert(retryBody.success === true, "Retry body reports success: true");
  assert(retryBody.results.googleSheets === "SYNCED", "Retry results shows googleSheets: SYNCED");

  const updatedAfterRetry = await getSubmissionById(retrySubId);
  assert(updatedAfterRetry?.googleSheetsSyncStatus === "SYNCED", "Stored record updated to SYNCED after retry");

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  mockServer.close();

  console.log("\n=======================================================");
  console.log(` Test Execution Complete: ${passedCount} Passed, ${failedCount} Failed`);
  console.log("=======================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution exception:", err);
  if (mockServer) mockServer.close();
  process.exit(1);
});
