from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import settings
from app.schemas.analysis import AnalysisResult
from app.services.resume_service import ResumeFormatError, extract_resume_text
from app.services.scoring_service import score_resume

router = APIRouter()
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}


@router.post("/analyze", response_model=AnalysisResult)
async def analyze_resume(file: UploadFile = File(...)) -> AnalysisResult:
    filename = file.filename or "resume"
    extension = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=415, detail="Upload a PDF, DOCX, or TXT file.")

    contents = await file.read(settings.max_upload_bytes + 1)
    if len(contents) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail="File is larger than the 5 MB limit.")
    if not contents:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    try:
        text = extract_resume_text(contents, extension)
    except ResumeFormatError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error

    if not text.strip():
        raise HTTPException(status_code=422, detail="No readable text was found in this file.")
    return score_resume(text, filename)
