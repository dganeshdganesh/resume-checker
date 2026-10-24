from pydantic import BaseModel, Field


class AnalysisResult(BaseModel):
    filename: str
    overall_score: int = Field(ge=0, le=100)
    word_count: int = Field(ge=0)
    sections_found: list[str]
    missing_sections: list[str]
    skills_found: list[str]
    feedback: list[str]
