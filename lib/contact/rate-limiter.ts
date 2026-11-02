interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting by IP (per Node instance/serverless container)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Default configuration: 5 requests per 10 minutes (600,000 ms) per IP
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// Periodically clean up expired entries (every 5 minutes)
let lastCleanup = Date.now();
function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup > 5 * 60 * 1000) {
    lastCleanup = now;
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (entry.resetAt <= now) {
        rateLimitMap.delete(ip);
      }
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(ip: string, maxRequests = MAX_REQUESTS, windowMs = WINDOW_MS): RateLimitResult {
  cleanupExpiredEntries();

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= maxRequests) {
    const resetSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
    };
  }

  entry.count += 1;
  const resetSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetSeconds,
  };
}

/**
 * Reset rate limit for a specific IP (useful for automated testing)
 */
export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}
