import re

from app.schemas.analysis import AnalysisResult

SECTION_PATTERNS: dict[str, tuple[str, ...]] = {
    "Experience": (r"\bexperience\b", r"\bemployment\b", r"\bwork history\b"),
    "Education": (r"\beducation\b", r"\bacademic background\b"),
    "Skills": (r"\bskills\b", r"\btechnical skills\b", r"\bcore competencies\b"),
    "Projects": (r"\bprojects?\b", r"\bselected work\b"),
}

SKILL_TERMS = (
    "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "FastAPI",
    "Django", "SQL", "PostgreSQL", "AWS", "Docker", "Kubernetes", "Git",
    "Machine Learning", "Data Analysis", "Communication", "Project Management", "Excel",
)


def _contains_term(text: str, term: str) -> bool:
    return re.search(rf"(?<!\w){re.escape(term)}(?!\w)", text, re.IGNORECASE) is not None


def score_resume(text: str, filename: str = "resume") -> AnalysisResult:
    words = re.findall(r"\b[\w+#.-]+\b", text)
    word_count = len(words)
    sections_found = [
        name for name, patterns in SECTION_PATTERNS.items()
        if any(re.search(pattern, text, re.IGNORECASE) for pattern in patterns)
    ]
    missing_sections = [name for name in SECTION_PATTERNS if name not in sections_found]
    skills_found = [term for term in SKILL_TERMS if _contains_term(text, term)]

    section_score = round(len(sections_found) / len(SECTION_PATTERNS) * 40)
    length_score = 30 if 300 <= word_count <= 900 else 20 if 200 <= word_count <= 1200 else 10
    skills_score = min(30, len(skills_found) * 5)
    overall_score = min(100, section_score + length_score + skills_score)

    feedback: list[str] = []
    if missing_sections:
        feedback.append(f"Add clearly labeled section(s): {', '.join(missing_sections)}.")
    if word_count < 200:
        feedback.append("Add more detail about your experience, accomplishments, and relevant projects.")
    elif word_count > 1200:
        feedback.append("Consider shortening the resume so the most relevant experience is easy to find.")
    else:
        feedback.append("Keep descriptions concise and focus on measurable results.")
    if len(skills_found) < 3:
        feedback.append("Include relevant skills that match the roles you are targeting.")
    else:
        feedback.append("Tailor the skills listed to the requirements of each job application.")
    feedback.append("Use specific accomplishments and numbers where possible; this score is a heuristic, not an ATS guarantee.")

    return AnalysisResult(
        filename=filename,
        overall_score=overall_score,
        word_count=word_count,
        sections_found=sections_found,
        missing_sections=missing_sections,
        skills_found=skills_found,
        feedback=feedback,
    )
