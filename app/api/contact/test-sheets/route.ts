import { NextResponse } from "next/server";
import { getGoogleAppsScriptConfig } from "@/lib/contact/google-sheets-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getGoogleAppsScriptConfig();

  if (!config) {
    return NextResponse.json({
      success: false,
      configured: false,
      message: "GOOGLE_APPS_SCRIPT_URL is not configured in environment variables.",
      instructions: [
        "1. Open the Google Spreadsheet: https://docs.google.com/spreadsheets/d/1n-skSg2sa8bipdEIdD20E8Crwpx8UOGRuT0IazhwjJM/edit",
        "2. Open Extensions > Apps Script and paste google-apps-script/Code.gs",
        "3. Deploy > New deployment > Web app",
        "4. Set 'Execute as': 'Me', 'Who has access': 'Anyone'",
        "5. Copy the Web App URL and add GOOGLE_APPS_SCRIPT_URL to Netlify Dashboard",
      ],
    });
  }

  // Masked URL for security
  const maskedUrl = config.url.replace(/\/s\/([^/]{6})[^/]+([^/]{4})\//, "/s/$1...$2/");

  const diagnosticResults: Record<string, unknown> = {
    configured: true,
    maskedUrl,
    hasSecret: Boolean(config.secret && config.secret.length > 0),
    targetSpreadsheetId: "1n-skSg2sa8bipdEIdD20E8Crwpx8UOGRuT0IazhwjJM",
  };

  // Test 1: GET Health Check
  try {
    const getRes = await fetch(config.url, {
      method: "GET",
      headers: { Accept: "application/json" },
      redirect: "follow",
    });

    diagnosticResults.getTest = {
      httpStatus: getRes.status,
      ok: getRes.ok,
      contentType: getRes.headers.get("content-type"),
    };

    const getText = await getRes.text();
    try {
      diagnosticResults.getResponseBody = JSON.parse(getText);
    } catch {
      diagnosticResults.getResponseBodyRaw = getText.slice(0, 300);
      if (getText.includes("accounts.google.com")) {
        diagnosticResults.authError =
          "Web App permissions issue: Received Google login redirect. Ensure 'Who has access' is set to 'Anyone', not 'Only myself'.";
      }
    }
  } catch (err) {
    diagnosticResults.getError = err instanceof Error ? err.message : String(err);
  }

  // Test 2: POST Test with identifiable diagnostic ID
  try {
    const testPayload = {
      submission_id: "diag-check-" + Date.now(),
      submission_date: "02/11/2026",
      submission_time: "11:20:00 PM IST",
      organization_type: "Diagnostic Check",
      full_name: "Diagnostic Health Check",
      phone_number: "+919999999999",
      email_address: "diagnostics@shikshaelite.com",
      requirement_message: "System health check verifying Google Sheets connectivity.",
      admin_email_status: "TEST",
      customer_email_status: "TEST",
      submission_status: "DIAGNOSTIC",
      source_website: "https://shikshaelite.com",
      secret: config.secret,
    };

    let postRes = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testPayload),
      redirect: "follow",
    });

    if (
      (postRes.status === 301 || postRes.status === 302 || postRes.status === 307) &&
      postRes.headers.get("location")
    ) {
      postRes = await fetch(postRes.headers.get("location")!, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
    }

    const postStatus = postRes.status;
    const postText = await postRes.text();

    diagnosticResults.postTest = {
      httpStatus: postStatus,
      ok: postRes.ok,
    };

    try {
      diagnosticResults.postResponseBody = JSON.parse(postText);
    } catch {
      diagnosticResults.postResponseBodyRaw = postText.slice(0, 300);
      if (postText.includes("accounts.google.com")) {
        diagnosticResults.postAuthError =
          "Web App permissions error: POST redirected to Google login. Fix in Apps Script: Deploy > Manage deployments > Edit > Who has access: Anyone.";
      }
    }
  } catch (err) {
    diagnosticResults.postError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json(diagnosticResults);
}
