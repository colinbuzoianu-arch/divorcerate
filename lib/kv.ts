import { Redis } from "@upstash/redis";
import type { AnalysisResult } from "@/lib/types";

/**
 * Upstash Redis helpers for Phase 1.2 (server-side results + paywall).
 *
 * Every key gets a 30-day TTL — we store as little as possible and nothing lives
 * forever (privacy rule 3). Quiz answers are never stored here; only the
 * generated analysis and a paid flag are.
 *
 * The client is created lazily so `next build` (which imports route modules but
 * does not run them) does not throw when the Upstash env vars are absent locally.
 */

const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

let _redis: Redis | null = null;
function redis(): Redis {
  if (!_redis) {
    // Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
    _redis = Redis.fromEnv();
  }
  return _redis;
}

/** True when Upstash env is configured (so callers can fail gracefully). */
export function kvConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

const resultKey = (id: string) => `result:${id}`;
const paidKey = (id: string) => `paid:${id}`;

/** Store the full analysis under a random id, with a 30-day TTL. */
export async function saveResult(id: string, result: AnalysisResult): Promise<void> {
  await redis().set(resultKey(id), result, { ex: TTL_SECONDS });
}

/** Fetch the full stored analysis, or null if missing/expired. */
export async function getResult(id: string): Promise<AnalysisResult | null> {
  return await redis().get<AnalysisResult>(resultKey(id));
}

/** Mark a result as paid (called from the verified Stripe webhook). */
export async function markPaid(id: string): Promise<void> {
  await redis().set(paidKey(id), 1, { ex: TTL_SECONDS });
}

/** Whether a result has been paid for. */
export async function isPaid(id: string): Promise<boolean> {
  const v = await redis().get(paidKey(id));
  return v !== null && v !== undefined;
}
