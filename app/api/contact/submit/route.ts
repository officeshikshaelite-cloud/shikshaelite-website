import { NextResponse } from "next/server";
import { processContactSubmission } from "@/lib/contact/orchestrator";
import { ContactFormInput } from "@/lib/contact/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body: Partial<ContactFormInput>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
          errors: ["Request body must be valid JSON."],
        },
        { status: 400 }
      );
    }

    const { status, body: responseBody } = await processContactSubmission(body, req);
    return NextResponse.json(responseBody, { status });
  } catch (err) {
    console.error("Unhandled contact submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while processing your request.",
        errors: [err instanceof Error ? err.message : "Internal Server Error"],
      },
      { status: 500 }
    );
  }
}
