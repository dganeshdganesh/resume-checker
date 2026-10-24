export interface AnalysisResult {
  filename: string;
  overall_score: number;
  word_count: number;
  sections_found: string[];
  missing_sections: string[];
  skills_found: string[];
  feedback: string[];
}
