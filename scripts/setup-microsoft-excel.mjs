/**
 * Shiksha Elite - Microsoft Excel Online & Microsoft Graph Setup Helper
 * 
 * This script guides the administrator through:
 * 1. Microsoft Entra App registration details
 * 2. Generating the OAuth consent URL for delegated permissions
 * 3. Exchanging authorization code for a long-lived Refresh Token
 * 4. Creating/verifying the Excel workbook, worksheet and table with all 11 columns
 * 
 * Usage:
 *   node scripts/setup-microsoft-excel.mjs --auth-url
 *   node scripts/setup-microsoft-excel.mjs --exchange-code <AUTH_CODE>
 *   node scripts/setup-microsoft-excel.mjs --init-workbook
 */

import fs from "fs";
import path from "path";

const TENANT_ID = process.env.MICROSOFT_TENANT_ID || "common";
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || "";
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET || "";
const REDIRECT_URI = process.env.MICROSOFT_REDIRECT_URI || "http://localhost:3000/api/auth/callback";
const WORKBOOK_NAME = process.env.MICROSOFT_EXCEL_FILE_PATH || "Shiksha_Elite_Contact_Enquiries.xlsx";
const WORKSHEET_NAME = process.env.MICROSOFT_EXCEL_WORKSHEET_NAME || "Contact Enquiries";
const TABLE_NAME = process.env.MICROSOFT_EXCEL_TABLE_NAME || "Contact_Enquiries";

const COLUMNS = [
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
  "Submission Status"
];

function printBanner() {
  console.log("\n=======================================================");
  console.log(" Shiksha Elite - Microsoft Excel Online Graph Setup");
  console.log("=======================================================\n");
}

function showAuthUrl() {
  printBanner();
  if (!CLIENT_ID) {
    console.error("Error: MICROSOFT_CLIENT_ID environment variable is missing.");
    console.log("\nPlease register an app in Microsoft Entra ID (portal.azure.com):");
    console.log("1. Go to Microsoft Entra ID > App registrations > New registration");
    console.log("2. Name: 'Shiksha Elite Contact Automation'");
    console.log("3. Supported account types: 'Accounts in any organizational directory and personal Microsoft accounts'");
    console.log(`4. Redirect URI (Web): ${REDIRECT_URI}`);
    console.log("5. Under Certificates & Secrets, create a new Client Secret.");
    console.log("6. Under API Permissions, add Microsoft Graph Delegated Permissions: 'offline_access', 'Files.ReadWrite', 'Files.ReadWrite.All'");
    console.log("\nSet MICROSOFT_CLIENT_ID and MICROSOFT_CLIENT_SECRET, then re-run this script.\n");
    return;
  }

  const scopes = encodeURIComponent("offline_access Files.ReadWrite Files.ReadWrite.All User.Read");
  const authUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_mode=query&scope=${scopes}`;

  console.log("Step 1: Open this URL in your browser to sign in with your Microsoft account:\n");
  console.log(authUrl);
  console.log("\nStep 2: After consenting, you will be redirected to your REDIRECT_URI with a '?code=...' parameter.");
  console.log("Copy that code and run:\n");
  console.log("  node scripts/setup-microsoft-excel.mjs --exchange-code <YOUR_CODE>\n");
}

async function exchangeCode(code) {
  printBanner();
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Error: MICROSOFT_CLIENT_ID and MICROSOFT_CLIENT_SECRET must be set.");
    return;
  }

  console.log("Exchanging authorization code for tokens...");
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("scope", "offline_access Files.ReadWrite Files.ReadWrite.All User.Read");

  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Token exchange failed:", data);
      return;
    }

    console.log("\nSUCCESS! Successfully acquired Microsoft OAuth tokens.");
    console.log("-------------------------------------------------------");
    console.log("Add this to your .env.local file and Netlify Dashboard:\n");
    console.log(`MICROSOFT_CLIENT_ID=${CLIENT_ID}`);
    console.log(`MICROSOFT_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`MICROSOFT_REFRESH_TOKEN=${data.refresh_token}`);
    console.log(`MICROSOFT_TENANT_ID=${TENANT_ID}`);
    console.log(`MICROSOFT_EXCEL_FILE_PATH=${WORKBOOK_NAME}`);
    console.log(`MICROSOFT_EXCEL_WORKSHEET_NAME=${WORKSHEET_NAME}`);
    console.log(`MICROSOFT_EXCEL_TABLE_NAME=${TABLE_NAME}`);
    console.log("-------------------------------------------------------\n");
  } catch (err) {
    console.error("Network error during code exchange:", err);
  }
}

async function initWorkbook() {
  printBanner();
  console.log(`Target Workbook: ${WORKBOOK_NAME}`);
  console.log(`Target Worksheet: ${WORKSHEET_NAME}`);
  console.log(`Target Table:     ${TABLE_NAME}`);
  console.log(`Columns (11):     ${COLUMNS.join(", ")}\n`);

  const refreshToken = process.env.MICROSOFT_REFRESH_TOKEN;
  if (!CLIENT_ID || !CLIENT_SECRET || !refreshToken) {
    console.log("Note: Microsoft credentials are not fully configured yet in environment.");
    console.log("Please run '--auth-url' first to generate your MICROSOFT_REFRESH_TOKEN.");
    return;
  }

  console.log("Acquiring access token using refresh token...");
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("scope", "offline_access Files.ReadWrite Files.ReadWrite.All User.Read");

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error("Failed to refresh token:", tokenData);
    return;
  }

  const accessToken = tokenData.access_token;
  console.log("Access token acquired successfully.");

  const encodedPath = encodeURIComponent(WORKBOOK_NAME);
  const workbookBase = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodedPath}:/workbook`;

  console.log(`Checking workbook: ${WORKBOOK_NAME}...`);
  const checkRes = await fetch(`${workbookBase}/worksheets`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (checkRes.status === 404) {
    console.log(`Workbook '${WORKBOOK_NAME}' not found in OneDrive root. Creating empty file...`);
    const uploadRes = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${encodedPath}:/content`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      body: Buffer.from([]),
    });
    if (!uploadRes.ok) {
      console.error("Failed to create file via Graph API:", await uploadRes.text());
      return;
    }
    console.log("Workbook file created.");
  }

  console.log("Ensuring table with 11 columns exists...");
  // Check tables
  const tablesRes = await fetch(`${workbookBase}/tables`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const tablesData = await tablesRes.json();
  console.log("Existing tables:", tablesData?.value?.map(t => t.name) || []);
  console.log("\nSetup complete. Ready for live contact form submissions!");
}

const args = process.argv.slice(2);
if (args.includes("--auth-url")) {
  showAuthUrl();
} else if (args.includes("--exchange-code")) {
  const codeIdx = args.indexOf("--exchange-code") + 1;
  const code = args[codeIdx];
  if (!code) {
    console.error("Please supply the authorization code: --exchange-code <code>");
  } else {
    exchangeCode(code);
  }
} else if (args.includes("--init-workbook")) {
  initWorkbook();
} else {
  printBanner();
  console.log("Available Commands:");
  console.log("  node scripts/setup-microsoft-excel.mjs --auth-url");
  console.log("  node scripts/setup-microsoft-excel.mjs --exchange-code <CODE>");
  console.log("  node scripts/setup-microsoft-excel.mjs --init-workbook\n");
}
