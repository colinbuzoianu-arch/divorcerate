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
}
