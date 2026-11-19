import { getRedis, getResult } from "@/lib/kv";
import type { StoredResult } from "@/lib/types";

/**
 * Couple comparison (Phase 6.2). Two partners take the test separately; once
 * both have, and both have consented (by creating / joining), the comparison
 * shows where they align and where they differ — using ONLY dimension scores,
 * never raw answers or free text (we don't even store those). Auto-deletes
 * after 30 days.
 */

const TTL_SECONDS = 60 * 60 * 24 * 30;
const key = (id: string) => `compare:${id}`;

export interface Comparison {
  id: string;
  createdAt: number;
  aResultId: string; // creator (consented by creating)
  bResultId?: string; // partner (consented by joining)
  paid: boolean;
}

export async function createComparison(id: string, aResultId: string): Promise<void> {
  const c: Comparison = { id, createdAt: Date.now(), aResultId, paid: false };
  await getRedis().set(key(id), c, { ex: TTL_SECONDS });
}

export async function getComparison(id: string): Promise<Comparison | null> {
  return await getRedis().get<Comparison>(key(id));
}

/** Link the partner's result (their act of joining is their consent). */
export async function joinComparison(id: string, bResultId: string): Promise<Comparison | null> {
  const c = await getComparison(id);
  if (!c) return null;
  if (c.aResultId === bResultId) return c; // can't compare with yourself
  const updated: Comparison = { ...c, bResultId };
  await getRedis().set(key(id), updated, { ex: TTL_SECONDS });
  return updated;
}

export async function setComparisonPaid(id: string): Promise<void> {
  const c = await getComparison(id);
  if (!c) return;
  await getRedis().set(key(id), { ...c, paid: true }, { ex: TTL_SECONDS });
}

export interface ComparisonDimension {
  key: string;
  label: string;
  a: number;
  b: number;
  gap: number;
}

export interface ComparisonView {
  overall: { a: number; b: number };
  dimensions: ComparisonDimension[];
  prompts: string[];
}

const PROMPT_BY_KEY: Record<string, string> = {
  communication: "You experience how you talk through hard things quite differently. Try asking each other: when we disagree, what do you most need from me?",
  conflictRepair: "You recover from arguments at different speeds. Talk about: after a fight, what actually helps you feel reconnected?",
  contempt: "One of you feels the sharpness in conflict more than the other. Ask gently: is there something I do in an argument that stings more than I realise?",
  friendship: "You experience your closeness and friendship differently. Try: what's one small thing that makes you feel close to me?",
  respect: "You feel respected to different degrees. Ask each other: when do you feel most — and least — respected by me?",
  trust: "Trust feels different for each of you right now. Talk about: is there anything that would help you trust me more fully?",
  support: "You experience support under stress differently. Ask: when you're stressed, what do you actually want from me?",
  vision: "Your sense of a shared future differs. Make time to talk about: where do we each picture us in five years?",
};

/** Build the comparison view from two stored results (scores only). */
export function computeComparison(a: StoredResult, b: StoredResult): ComparisonView {
  const dimensions: ComparisonDimension[] = a.dimensions.map((da) => {
    const db = b.dimensions.find((x) => x.key === da.key);
    const bScore = db ? db.score : 0;
    return { key: da.key, label: da.label, a: da.score, b: bScore, gap: Math.abs(da.score - bScore) };
  });

  const prompts = [...dimensions]
    .sort((x, y) => y.gap - x.gap)
    .slice(0, 3)
    .map((d) => PROMPT_BY_KEY[d.key])
    .filter(Boolean);

  return {
    overall: { a: a.healthScore, b: b.healthScore },
    dimensions,
    prompts,
  };
}

/** Load both results for a ready comparison, or null if not both present. */
export async function loadComparisonResults(c: Comparison): Promise<{ a: StoredResult; b: StoredResult } | null> {
  if (!c.bResultId) return null;
  const [a, b] = await Promise.all([getResult(c.aResultId), getResult(c.bResultId)]);
  if (!a || !b) return null;
  return { a, b };
}
