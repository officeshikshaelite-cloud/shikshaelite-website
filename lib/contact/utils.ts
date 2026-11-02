/**
 * Shiksha Elite Contact Form Automation Utilities
 * Timezone: Asia/Kolkata (IST - UTC+05:30)
 */

export function getIstDateTime(date: Date = new Date()): {
  dateStr: string;
  timeStr: string;
  isoStr: string;
} {
  // Format Date in IST: DD/MM/YYYY
  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Format Time in IST: hh:mm:ss A IST
  const timeFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateStr = dateFormatter.format(date);
  const timeFormatted = timeFormatter.format(date);
  const timeStr = `${timeFormatted} IST`;
  const isoStr = date.toISOString();

  return { dateStr, timeStr, isoStr };
}

/**
 * Escape HTML special characters to prevent XSS in email templates or display
 */
export function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Extract sanitized client IP from Request headers
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return sanitizeIp(firstIp);
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return sanitizeIp(realIp.trim());

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return sanitizeIp(cfConnectingIp.trim());

  const clientIp = headers.get("client-ip");
  if (clientIp) return sanitizeIp(clientIp.trim());

  return "127.0.0.1";
}

function sanitizeIp(ip: string): string {
  // Strip port if present e.g. "192.168.1.1:12345"
  const clean = ip.replace(/:[0-9]+$/, "");
  return clean.slice(0, 45); // Max IPv6 length
}
