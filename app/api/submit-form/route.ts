import { NextResponse } from "next/server";
import { processContactSubmission } from "@/lib/contact/orchestrator";
import { ContactFormInput } from "@/lib/contact/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // Normalize legacy payload structure if needed
    const payload: Partial<ContactFormInput> = {
      type: rawBody.type || (rawBody.formType === "Management" ? "institution" : rawBody.formType === "Educators" ? "educator" : rawBody.formType),
      name: rawBody.name,
      email: rawBody.email,
      phone: rawBody.phone,
      message: rawBody.message || rawBody.details || "",
      honeypot: rawBody.honeypot || rawBody.website_source_ref || "",
    };

    const { status, body } = await processContactSubmission(payload, req);
    return NextResponse.json(body, { status });
  } catch (err) {
    console.error("submit-form legacy endpoint error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your request.",
        message: err instanceof Error ? err.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
