import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { kvConfigured } from "@/lib/kv";

/**
 * IP rate limiting for the paid /api/analyze endpoint (Phase 1.3).
 * Every analyze call costs an Anthropic request, so we cap it: 5 per hour and
 * 20 per day per IP. Lazily initialised so `next build` does not touch Upstash.
 */

let _hourly: Ratelimit | null = null;
let _daily: Ratelimit | null = null;

function limiters(): { hourly: Ratelimit; daily: Ratelimit } {
  if (!_hourly || !_daily) {
    const redis = Redis.fromEnv();
    _hourly = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 h"), prefix: "rl:analyze:h", analytics: false });
    _daily = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, "24 h"), prefix: "rl:analyze:d", analytics: false });
  }
  return { hourly: _hourly, daily: _daily };
}

export interface RateLimitResult {
  success: boolean;
  /** Seconds until the exceeded window resets (for Retry-After), if blocked. */
  retryAfter?: number;
}

/**
 * Check both the hourly and daily limits for an IP. If Upstash is not
 * configured, fail open (allow) rather than blocking real users.
 */
export async function checkAnalyzeRateLimit(ip: string): Promise<RateLimitResult> {
  if (!kvConfigured()) return { success: true };

  const { hourly, daily } = limiters();
  const [h, d] = await Promise.all([hourly.limit(ip), daily.limit(ip)]);

  if (!h.success || !d.success) {
    const reset = Math.max(!h.success ? h.reset : 0, !d.success ? d.reset : 0);
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { success: false, retryAfter };
  }
  return { success: true };
}
