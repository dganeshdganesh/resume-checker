import { useState } from "react";
import FeedbackPanel from "./components/FeedbackPanel";
import Navbar from "./components/Navbar";
import ResumeUploader from "./components/ResumeUploader";
import ScoreCard from "./components/ScoreCard";
import SkillsChart from "./components/SkillsChart";
import { analyzeResume } from "./services/api";
import type { AnalysisResult } from "./types";

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(file: File) {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      setResult(await analyzeResume(file));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <section className="hero">
          <span className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>A better resume.<br /><em>A brighter next step.</em></h1>
          <p>Thoughtful, practical feedback to help your experience shine through.</p>
        </section>
        <div className="workspace">
          <ResumeUploader busy={busy} onAnalyze={handleAnalyze} />
          <div className="results-column" aria-live="polite">
            {error && <div className="api-error" role="alert"><strong>We couldn’t review that file.</strong><span>{error}</span></div>}
            {busy && <div className="empty-state"><span className="large-spinner" /><strong>Looking over the details</strong><span>This usually takes just a moment.</span></div>}
            {result && <>
              <div className="results-heading"><div><span className="eyebrow">YOUR REVIEW</span><h2>{result.filename}</h2></div><button className="text-button" onClick={() => setResult(null)}>Clear results</button></div>
              <ScoreCard score={result.overall_score} wordCount={result.word_count} />
              <SkillsChart found={result.skills_found} />
              <FeedbackPanel found={result.sections_found} missing={result.missing_sections} feedback={result.feedback} />
            </>}
            {!result && !busy && !error && (
              <div className="empty-state">
                <div className="illustration" aria-hidden="true"><span>✦</span><span>✧</span><span>↗</span></div>
                <strong>Your review will show up here</strong>
                <span>Upload a resume to get started. It is processed for this review and not retained.</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer><span>Made to help your experience stand out.</span><span>Private · Practical · Yours</span></footer>
    </div>
  );
}
