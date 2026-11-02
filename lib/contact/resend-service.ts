import { Resend } from "resend";
import { ContactSubmissionRecord } from "./types";
import { escapeHtml } from "./utils";

export interface EmailSendResult {
  success: boolean;
  emailId?: string;
  error?: string;
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "YOUR_ACTUAL_RESEND_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new Resend(apiKey);
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "Shiksha Elite <onboarding@resend.dev>";
}

function getAdminEmail(): string {
  return (
    process.env.ADMIN_NOTIFICATION_EMAIL?.trim() ||
    process.env.LEAD_EMAIL?.trim() ||
    "officeshikshaelite@gmail.com"
  );
}

/**
 * 1. Send Admin Notification Email
 */
export async function sendAdminNotificationEmail(
  record: ContactSubmissionRecord
): Promise<EmailSendResult> {
  const resend = getResendClient();
  if (!resend) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured or contains placeholder.",
    };
  }

  const toEmail = getAdminEmail();
  const fromEmail = getFromEmail();
  const subject = `New Website Enquiry – ${record.fullName} – Shiksha Elite`;

  // HTML Template for Admin
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:620px;background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#071B4D;padding:28px 32px;border-bottom:3px solid #FFB400;">
              <table width="100%" role="presentation">
                <tr>
                  <td>
                    <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FFB400;display:block;">
                      Website Contact Form Enquiry
                    </span>
                    <h1 style="color:#ffffff;font-size:22px;margin:6px 0 0 0;font-weight:700;">
                      Shiksha Elite Admin Alert
                    </h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(255,180,0,0.15);border:1px solid #FFB400;color:#FFB400;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;text-transform:uppercase;">
                      ${escapeHtml(record.organizationType)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:32px;">
              <p style="font-size:15px;line-height:24px;color:#334155;margin:0 0 24px 0;">
                A new enquiry has been submitted on the website. Here are the submission details:
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#64748B;width:35%;">Customer Name</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;font-weight:700;color:#071B4D;">${escapeHtml(record.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#64748B;">Organization Type</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;font-weight:600;color:#071B4D;">${escapeHtml(record.organizationType)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#64748B;">Email Address</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#071B4D;">
                    <a href="mailto:${escapeHtml(record.emailAddress)}" style="color:#071B4D;text-decoration:underline;">${escapeHtml(record.emailAddress)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#64748B;">Phone Number</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;font-weight:600;color:#071B4D;">
                    <a href="tel:${escapeHtml(record.phoneNumber)}" style="color:#071B4D;text-decoration:none;">${escapeHtml(record.phoneNumber)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#64748B;">Submission Date & Time</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;color:#334155;">${escapeHtml(record.submissionDate)} at ${escapeHtml(record.submissionTime)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748B;">Unique Submission ID</td>
                  <td style="padding:12px 16px;font-size:12px;font-family:monospace;color:#475569;">${escapeHtml(record.submissionId)}</td>
                </tr>
              </table>

              <!-- Requirement Message -->
              <div style="margin-bottom:28px;">
                <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#071B4D;margin:0 0 10px 0;">
                  Enquiry Message
                </h3>
                <div style="background:#FFFFFF;border-left:4px solid #071B4D;border:1px solid #E2E8F0;border-left-width:4px;padding:16px;font-size:14px;line-height:22px;color:#334155;white-space:pre-wrap;">${escapeHtml(record.requirementMessage)}</div>
              </div>

              <!-- Reply Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 10px 0;">
                <tr>
                  <td style="border-radius:4px;background-color:#071B4D;">
                    <a href="mailto:${escapeHtml(record.emailAddress)}?subject=Re:%20Shiksha%20Elite%20Enquiry%20-%20Ref%20${encodeURIComponent(record.submissionId)}" target="_blank" style="font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:4px;display:inline-block;border:1px solid #071B4D;">
                      Reply to ${escapeHtml(record.fullName)} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F1F5F9;padding:16px 32px;font-size:12px;color:#64748B;text-align:center;border-top:1px solid #E2E8F0;">
              Shiksha Elite Contact Automation &bull; Bengaluru, Karnataka, India &bull; <a href="https://shikshaelite.com" style="color:#071B4D;text-decoration:none;">shikshaelite.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Plain Text Alternative
  const textContent = `
NEW WEBSITE ENQUIRY – SHIKSHA ELITE
=========================================

A new contact form enquiry has been received.

Customer Name:       ${record.fullName}
Organization Type:   ${record.organizationType}
Phone Number:        ${record.phoneNumber}
Email Address:       ${record.emailAddress}
Submission Date:     ${record.submissionDate}
Submission Time:     ${record.submissionTime}
Submission ID:       ${record.submissionId}

ENQUIRY MESSAGE:
-----------------------------------------
${record.requirementMessage}

-----------------------------------------
Reply directly to this email or write to: ${record.emailAddress}
Submitted via Shiksha Elite Website (https://shikshaelite.com)
  `.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: record.emailAddress,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend Admin Email Error:", error);
      return {
        success: false,
        error: error.message || "Failed to deliver admin notification.",
      };
    }

    return {
      success: true,
      emailId: data?.id,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown Resend error";
    console.error("Resend Admin Email Exception:", msg);
    return {
      success: false,
      error: msg,
    };
  }
}

/**
 * 2. Send Customer Acknowledgement Email
 */
export async function sendCustomerAcknowledgementEmail(
  record: ContactSubmissionRecord
): Promise<EmailSendResult> {
  const resend = getResendClient();
  if (!resend) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured or contains placeholder.",
    };
  }

  const fromEmail = getFromEmail();
  const subject = "We Have Received Your Enquiry – Shiksha Elite";

  // Plain-Text exact matching Section 2 specification
  const textContent = `
Dear ${record.fullName},

Thank you for contacting Shiksha Elite.

We have successfully received your enquiry. Our team will review your requirements and get back to you shortly.

Here is your submission reference: ${record.submissionId}.

Thank you for your interest in Shiksha Elite.

Best Regards,
Shiksha Elite Team
https://shikshaelite.com
  `.trim();

  // Polished Shiksha Elite Brand HTML template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#071B4D;padding:32px;text-align:left;border-bottom:3px solid #FFB400;">
              <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#FFB400;display:block;">
                Shiksha Elite
              </span>
              <h1 style="color:#ffffff;font-size:24px;margin:8px 0 0 0;font-weight:800;letter-spacing:-0.5px;">
                Enquiry Confirmation
              </h1>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:32px 32px 28px 32px;font-size:15px;line-height:26px;color:#334155;">
              <p style="margin:0 0 16px 0;font-weight:600;color:#071B4D;font-size:16px;">
                Dear ${escapeHtml(record.fullName)},
              </p>

              <p style="margin:0 0 16px 0;">
                Thank you for contacting <strong>Shiksha Elite</strong>.
              </p>

              <p style="margin:0 0 20px 0;">
                We have successfully received your enquiry. Our team will review your requirements and get back to you shortly.
              </p>

              <!-- Reference ID Card -->
              <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:6px;padding:16px 20px;margin:24px 0;">
                <span style="font-size:12px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">
                  Your Submission Reference
                </span>
                <span style="font-size:16px;font-family:monospace;font-weight:700;color:#071B4D;">
                  ${escapeHtml(record.submissionId)}
                </span>
              </div>

              <p style="margin:0 0 24px 0;">
                Thank you for your interest in Shiksha Elite.
              </p>

              <div style="border-top:1px solid #E2E8F0;padding-top:20px;margin-top:24px;">
                <p style="margin:0;font-weight:700;color:#071B4D;">
                  Best Regards,
                </p>
                <p style="margin:4px 0 0 0;color:#64748B;font-size:14px;">
                  Shiksha Elite Team<br>
                  <a href="https://shikshaelite.com" style="color:#071B4D;text-decoration:none;font-weight:600;">shikshaelite.com</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;padding:20px 32px;font-size:12px;line-height:18px;color:#94A3B8;text-align:center;border-top:1px solid #E2E8F0;">
              This is an automated confirmation sent to ${escapeHtml(record.emailAddress)}.<br>
              If you have urgent questions, reach us at <a href="mailto:officeshikshaelite@gmail.com" style="color:#64748B;">officeshikshaelite@gmail.com</a> or +91 93648 78590.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [record.emailAddress],
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend Customer Email Error:", error);
      return {
        success: false,
        error: error.message || "Failed to send customer confirmation email.",
      };
    }

    return {
      success: true,
      emailId: data?.id,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown Resend error";
    console.error("Resend Customer Email Exception:", msg);
    return {
      success: false,
      error: msg,
    };
  }
}
