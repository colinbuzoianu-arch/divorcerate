export type Answers = Record<string, string | number>;

export interface Factor {
  label: string;
  detail: string;
  positive: boolean;
  weight: "critical" | "significant" | "moderate";
}

export interface Recommendation {
  title: string;
  detail: string;
}

export interface AnalysisResult {
  probability: number;
  nationalAverage: number;
  riskLevel: "Low" | "Moderate" | "Elevated" | "High";
  headline: string;
  summary: string;
  dynamicPattern: string;
  dynamicPatternDetail: string;
  biggestStrength: string;
  biggestStrengthDetail: string;
  biggestRisk: string;
  biggestRiskDetail: string;
  factors: Factor[];
  recommendations: Recommendation[];
  urgency: "keep doing what you are doing" | "worth being aware of" | "worth addressing soon" | "worth addressing urgently";
  disclaimer: string;
  /** Set server-side (never by the AI) when the safety layer triggers (Phase 1.4). */
  safetyFlag?: boolean;
}

/**
 * The fields that are safe to expose before payment. Everything NOT listed here
 * (biggestRiskDetail, factors, recommendations, urgency) is paid-only and must
 * never leave the server for an unpaid result.
 */
export const FREE_FIELDS = [
  "probability",
  "nationalAverage",
  "riskLevel",
  "headline",
  "summary",
  "dynamicPattern",
  "dynamicPatternDetail",
  "biggestStrength",
  "biggestStrengthDetail",
  "biggestRisk",
  "disclaimer",
  "safetyFlag",
] as const;

export type FreeResult = Pick<AnalysisResult, (typeof FREE_FIELDS)[number]>;

/** Strip a full result down to only the free fields. */
export function toFreeResult(full: AnalysisResult): FreeResult {
  const free = {} as Record<string, unknown>;
  for (const key of FREE_FIELDS) free[key] = full[key];
  return free as FreeResult;
}

/** Response shape returned by /api/analyze and GET /api/result/[id]. */
export interface ResultResponse {
  resultId: string;
  paid: boolean;
  result: FreeResult | AnalysisResult;
}
