import { NextResponse } from "next/server";
import { getSubmissionById, updateSubmissionStatus } from "@/lib/contact/storage";
import { sendAdminNotificationEmail, sendCustomerAcknowledgementEmail } from "@/lib/contact/resend-service";
import { appendSubmissionToExcel } from "@/lib/contact/excel-service";
import { syncSubmissionToGoogleSheets } from "@/lib/contact/google-sheets-service";
import { ContactSubmissionRecord } from "@/lib/contact/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { submissionId, target = "all" } = body;

    if (!submissionId || typeof submissionId !== "string") {
      return NextResponse.json(
        { success: false, message: "A valid submissionId is required." },
        { status: 400 }
      );
    }

    const record = await getSubmissionById(submissionId);
    if (!record) {
      return NextResponse.json(
        { success: false, message: `Submission with ID ${submissionId} was not found.` },
        { status: 404 }
      );
    }

    const updates: Partial<ContactSubmissionRecord> = {};
    const results: Record<string, string> = {};

    // 1. Retry Admin Email if requested or needed
    if (target === "all" || target === "admin_email") {
      if (record.adminEmailStatus !== "SENT") {
        const adminRes = await sendAdminNotificationEmail(record);
        if (adminRes.success) {
          updates.adminEmailStatus = "SENT";
          updates.adminEmailId = adminRes.emailId;
          results.adminEmail = "SENT";
        } else {
          updates.adminEmailStatus = "FAILED";
          results.adminEmail = adminRes.error || "FAILED";
        }
      } else {
        results.adminEmail = "ALREADY_SENT";
      }
    }

    // 2. Retry Customer Email if requested or needed
    if (target === "all" || target === "customer_email") {
      if (record.customerEmailStatus !== "SENT") {
        const customerRes = await sendCustomerAcknowledgementEmail(record);
        if (customerRes.success) {
          updates.customerEmailStatus = "SENT";
          updates.customerEmailId = customerRes.emailId;
          results.customerEmail = "SENT";
        } else {
          updates.customerEmailStatus = "FAILED";
          results.customerEmail = customerRes.error || "FAILED";
        }
      } else {
        results.customerEmail = "ALREADY_SENT";
      }
    }

    // 3. Retry Excel Sync if requested or needed
    if (target === "all" || target === "excel") {
      if (record.excelSyncStatus !== "SYNCED") {
        const excelRes = await appendSubmissionToExcel(record);
        updates.excelSyncStatus = excelRes.status;
        if (excelRes.success) {
          updates.excelRowId = excelRes.rowId;
          results.excelSync = "SYNCED";
        } else {
          results.excelSync = excelRes.error || excelRes.status;
        }
      } else {
        results.excelSync = "ALREADY_SYNCED";
      }
    }

    // 4. Retry Google Sheets Sync if requested or needed
    if (target === "all" || target === "google_sheets" || target === "sheets") {
      if (record.googleSheetsSyncStatus !== "SYNCED") {
        const sheetsRes = await syncSubmissionToGoogleSheets(record);
        updates.googleSheetsSyncStatus = sheetsRes.status;
        if (sheetsRes.success) {
          updates.googleSheetsRowIndex = sheetsRes.rowIndex;
          results.googleSheets = "SYNCED";
        } else {
          results.googleSheets = sheetsRes.error || sheetsRes.status;
        }
      } else {
        results.googleSheets = "ALREADY_SYNCED";
      }
    }

    if (Object.keys(updates).length > 0) {
      await updateSubmissionStatus(submissionId, updates);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Retry operations processed.",
      results,
    });
  } catch (err) {
    console.error("Retry route error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process retry operations.",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
