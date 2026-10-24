interface SkillsChartProps {
  found: string[];
}

export default function SkillsChart({ found }: SkillsChartProps) {
  return (
    <section className="result-card">
      <div className="result-title"><span className="result-icon skill-icon">✦</span><h3>Skills detected</h3></div>
      {found.length > 0 ? (
        <div className="chips">{found.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
      ) : (
        <p className="muted">No common skills detected yet. Add a clear skills section with role-relevant terms.</p>
      )}
    </section>
  );
}
