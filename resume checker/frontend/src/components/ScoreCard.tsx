interface ScoreCardProps {
  score: number;
  wordCount: number;
}

export default function ScoreCard({ score, wordCount }: ScoreCardProps) {
  const label = score >= 80 ? "Strong foundation" : score >= 55 ? "Good start" : "Room to grow";
  return (
    <section className="result-card score-card">
      <div className="result-title"><span className="result-icon">✳</span><h3>Resume score</h3></div>
      <div className="score-layout">
        <div className="score-ring" style={{ "--score": `${score}%` } as React.CSSProperties}>
          <div><strong>{score}</strong><span>out of 100</span></div>
        </div>
        <div className="score-copy">
          <strong>{label}</strong>
          <span>Based on structure, length and relevant skills.</span>
          <span className="word-count">{wordCount.toLocaleString()} words</span>
        </div>
      </div>
      <p className="score-disclaimer">A practical checklist, not a prediction of any hiring or ATS outcome.</p>
    </section>
  );
}
