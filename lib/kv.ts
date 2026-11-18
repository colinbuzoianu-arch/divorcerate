import { Redis } from "@upstash/redis";
import type { StoredResult, Narrative } from "@/lib/types";

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

/**
 * Read the Upstash REST credentials, accepting either the native Upstash names
 * (UPSTASH_REDIS_REST_URL/TOKEN) or the Vercel KV integration names
 * (KV_REST_API_URL/TOKEN) — the Vercel Marketplace sets the latter.
 */
function redisEnv(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

let _redis: Redis | null = null;
/** The configured Upstash client. Throws if env is missing — guard with kvConfigured(). */
export function getRedis(): Redis {
  if (!_redis) {
    const cfg = redisEnv();
    if (!cfg) throw new Error("Upstash Redis env not configured");
    _redis = new Redis({ url: cfg.url, token: cfg.token });
  }
  return _redis;
}

/** True when Upstash env is configured (so callers can fail gracefully). */
export function kvConfigured(): boolean {
  return redisEnv() !== null;
}

const resultKey = (id: string) => `result:${id}`;
const paidKey = (id: string) => `paid:${id}`;
const narrativeKey = (id: string) => `narrative:${id}`;

/** Store the computed result under a random id, with a 30-day TTL. */
export async function saveResult(id: string, result: StoredResult): Promise<void> {
  await getRedis().set(resultKey(id), result, { ex: TTL_SECONDS });
}

/** Fetch the stored result, or null if missing/expired. */
export async function getResult(id: string): Promise<StoredResult | null> {
  return await getRedis().get<StoredResult>(resultKey(id));
}

/** Fetch the cached paid narrative, or null if not generated yet. */
export async function getNarrative(id: string): Promise<Narrative | null> {
  return await getRedis().get<Narrative>(narrativeKey(id));
}

/** Cache the paid narrative (generated once, then reused). */
export async function saveNarrative(id: string, narrative: Narrative): Promise<void> {
  await getRedis().set(narrativeKey(id), narrative, { ex: TTL_SECONDS });
}

/** Mark a result as paid (called from the verified Stripe webhook). */
export async function markPaid(id: string): Promise<void> {
  await getRedis().set(paidKey(id), 1, { ex: TTL_SECONDS });
}

/** Whether a result has been paid for. */
export async function isPaid(id: string): Promise<boolean> {
  const v = await getRedis().get(paidKey(id));
  return v !== null && v !== undefined;
}
