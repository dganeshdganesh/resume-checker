from app.services.scoring_service import score_resume


def test_score_finds_sections_and_skills() -> None:
    resume = """
    Experience
    Built a Python service with FastAPI and PostgreSQL.
    Education
    Bachelor degree
    Skills
    Python, FastAPI, SQL
    Projects
    Resume analysis tool
    """

    result = score_resume(resume, "sample.txt")

    assert result.filename == "sample.txt"
    assert result.overall_score > 0
    assert result.sections_found == ["Experience", "Education", "Skills", "Projects"]
    assert result.missing_sections == []
    assert result.skills_found == ["Python", "FastAPI", "SQL", "PostgreSQL"]


def test_score_reports_missing_sections_and_short_resume() -> None:
    result = score_resume("Python")

    assert result.missing_sections == ["Experience", "Education", "Skills", "Projects"]
    assert result.overall_score < 50
    assert any("Add clearly labeled" in item for item in result.feedback)
