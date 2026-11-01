import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      formType,
      name,
      email,
      phone,
      location = "",
      details = "",
    } = body;

    // Validate required fields
    if (!formType || !name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    // Check email configuration
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.LEAD_EMAIL) {
      console.error("LEAD_EMAIL is missing.");
      return NextResponse.json(
        {
          success: false,
          error: "Lead email address is not configured.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 1. SAVE LEAD TO FIRESTORE
    // --------------------------------------------------

    const docRef = await addDoc(collection(db, "leads"), {
      formType,
      name,
      email,
      phone,
      location,
      details,
      source: "website",
      status: "New",
      createdAt: serverTimestamp(),
    });

    console.log("Lead saved to Firestore:", docRef.id);

    // --------------------------------------------------
    // 2. SEND EMAIL NOTIFICATION
    // --------------------------------------------------

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: "ShikshaElite Website <onboarding@resend.dev>",
        to: [process.env.LEAD_EMAIL],
        subject: `New ShikshaElite Enquiry — ${formType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
            
            <div style="background:#071B4D; padding:24px;">
              <h1 style="color:#FFB400; margin:0;">
                ShikshaElite
              </h1>
              <p style="color:white; margin:8px 0 0;">
                New Website Enquiry
              </p>
            </div>

            <div style="padding:30px; border:1px solid #e5e7eb;">

              <h2 style="color:#071B4D; margin-top:0;">
                New ${formType} Enquiry
              </h2>

              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0; font-weight:bold;">
                    Name
                  </td>
                  <td style="padding:10px 0;">
                    ${escapeHtml(name)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; font-weight:bold;">
                    Email
                  </td>
                  <td style="padding:10px 0;">
                    ${escapeHtml(email)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; font-weight:bold;">
                    Phone
                  </td>
                  <td style="padding:10px 0;">
                    ${escapeHtml(phone)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; font-weight:bold;">
                    Type
                  </td>
                  <td style="padding:10px 0;">
                    ${escapeHtml(formType)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; font-weight:bold;">
                    Location
                  </td>
                  <td style="padding:10px 0;">
                    ${escapeHtml(location)}
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;" />

              <h3 style="color:#071B4D;">
                Requirement
              </h3>

              <p style="line-height:1.7;color:#374151;">
                ${escapeHtml(details).replace(/\n/g, "<br />")}
              </p>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;" />

              <p style="font-size:13px;color:#6b7280;">
                Lead ID: ${docRef.id}
              </p>

              <p style="font-size:13px;color:#6b7280;">
                Submitted from the ShikshaElite website.
              </p>

            </div>
          </div>
        `,
      });

    if (emailError) {
      console.error("Resend email error:", emailError);

      // Lead is already safely stored in Firestore.
      return NextResponse.json(
        {
          success: false,
          error:
            "Lead was saved, but email notification failed. Please check the server logs.",
        },
        { status: 502 }
      );
    }

    console.log("Notification email sent:", emailData?.id);

    return NextResponse.json({
      success: true,
      message:
        "Your request has been submitted successfully.",
    });

  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to process your request.",
      },
      { status: 500 }
    );
  }
}

// Prevent form data from becoming HTML
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}