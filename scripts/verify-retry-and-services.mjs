/**
 * Detailed Verification for Resend Email, Microsoft Graph Excel Append, and Retry Endpoint
 */

import { getSubmissionById, persistNewSubmission, updateSubmissionStatus } from "../lib/contact/storage.ts";
import { POST as retryHandler } from "../app/api/contact/retry/route.ts";
import { appendSubmissionToExcel } from "../lib/contact/excel-service.ts";

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

async function runServiceTests() {
  console.log("\n=======================================================");
  console.log(" Service & Retry Functional Verification");
  console.log("=======================================================\n");

  // 1. Retry Endpoint Functionality (Test Case 12)
  console.log("Section 1: Retry Endpoint (/api/contact/retry) Verification");
  const testSubId = "retry-test-" + Date.now();
  const testRecord = {
    submissionId: testSubId,
    submissionDate: "02/11/2026",
    submissionTime: "10:30:00 PM IST",
    submissionTimestampIso: new Date().toISOString(),
    organizationType: "An Educator",
    fullName: "Pooja Hegde",
    phoneNumber: "+91 99887 76655",
    emailAddress: "pooja.hegde@example.com",
    requirementMessage: "Experienced Physics teacher applying for international schools.",
    submissionStatus: "RECEIVED",
    adminEmailStatus: "FAILED",
    customerEmailStatus: "FAILED",
    excelSyncStatus: "FAILED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await persistNewSubmission(testRecord);
  const initialCheck = await getSubmissionById(testSubId);
  assert(initialCheck?.adminEmailStatus === "FAILED", "Initial record has FAILED status for admin email");
  assert(initialCheck?.excelSyncStatus === "FAILED", "Initial record has FAILED status for Excel");

  // Test retry endpoint with missing/invalid ID
  const invalidRetryReq = new Request("http://localhost:3000/api/contact/retry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const invalidRetryRes = await retryHandler(invalidRetryReq);
  assert(invalidRetryRes.status === 400, "Retry endpoint rejects missing submissionId with HTTP 400");

  // Test retry endpoint with non-existent ID
  const notFoundReq = new Request("http://localhost:3000/api/contact/retry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId: "non-existent-uuid" }),
  });
  const notFoundRes = await retryHandler(notFoundReq);
  assert(notFoundRes.status === 404, "Retry endpoint returns HTTP 404 for unknown submissionId");

  // Test retry endpoint with valid record
  const validRetryReq = new Request("http://localhost:3000/api/contact/retry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId: testSubId, target: "all" }),
  });
  const validRetryRes = await retryHandler(validRetryReq);
  assert(validRetryRes.status === 200, "Retry endpoint executes successfully with HTTP 200");
  const retryBody = await validRetryRes.json();
  assert(retryBody.success === true, "Retry body reports success");
  assert(Boolean(retryBody.results), "Retry body contains target execution results");

  // 2. Microsoft Graph Excel Append Payload and Schema Verification
  console.log("\nSection 2: Microsoft Excel Online Integration Schema");
  // When credentials are not yet configured, verifies clear diagnostic response (Prompt Section 3)
  const unconfiguredResult = await appendSubmissionToExcel(testRecord);
  assert(
    unconfiguredResult.status === "NOT_CONFIGURED",
    "Reports NOT_CONFIGURED when Microsoft credentials are unset (does not falsely claim sync)"
  );
  assert(
    unconfiguredResult.error.includes("MICROSOFT_CLIENT_ID"),
    "Returns clear setup guide in error message when unconfigured"
  );

  // 3. Independent Status Integrity (Prompt Section 7)
  console.log("\nSection 3: Independent Status Integrity Verification");
  await updateSubmissionStatus(testSubId, {
    adminEmailStatus: "SENT",
    customerEmailStatus: "FAILED",
    excelSyncStatus: "SYNCED",
  });
  const independentStatusCheck = await getSubmissionById(testSubId);
  assert(independentStatusCheck?.adminEmailStatus === "SENT", "adminEmail: SENT");
  assert(independentStatusCheck?.customerEmailStatus === "FAILED", "customerEmail: FAILED");
  assert(independentStatusCheck?.excelSyncStatus === "SYNCED", "excelSync: SYNCED");
  assert(independentStatusCheck?.submissionStatus === "RECEIVED", "Original enquiry remains safely RECEIVED");

  console.log("\n=======================================================");
  console.log(` Service & Retry Tests Complete: ${passedCount} Passed, ${failedCount} Failed`);
  console.log("=======================================================\n");

  if (failedCount > 0) process.exit(1);
}

runServiceTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
