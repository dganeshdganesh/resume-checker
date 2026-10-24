import type { AnalysisResult } from "../types";

export async function analyzeResume(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/v1/analysis/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const message =
      typeof payload === "object" && payload !== null && "detail" in payload &&
      typeof payload.detail === "string"
        ? payload.detail
        : "Could not analyze this resume. Please try again.";
    throw new Error(message);
  }
  return response.json() as Promise<AnalysisResult>;
}
