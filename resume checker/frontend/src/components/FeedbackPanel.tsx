interface FeedbackPanelProps {
  found: string[];
  missing: string[];
  feedback: string[];
}

export default function FeedbackPanel({ found, missing, feedback }: FeedbackPanelProps) {
  return (
    <section className="result-card feedback-card">
      <div className="result-title"><span className="result-icon feedback-icon">↗</span><h3>Next best steps</h3></div>
      <div className="section-checklist">
        <div>
          <strong>Resume sections</strong>
          <p>{found.length ? found.join(" · ") : "No standard sections detected"}</p>
          {missing.length > 0 && <p className="missing">Consider adding: {missing.join(", ")}</p>}
        </div>
      </div>
      <ul className="feedback-list">{feedback.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>
    </section>
  );
}
