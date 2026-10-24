from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_analyze_text_upload() -> None:
    response = client.post(
        "/api/v1/analysis/analyze",
        files={"file": ("resume.txt", b"Experience\nPython developer\nEducation", "text/plain")},
    )

    assert response.status_code == 200
    assert response.json()["filename"] == "resume.txt"
    assert response.json()["skills_found"] == ["Python"]


def test_rejects_unsupported_extension() -> None:
    response = client.post(
        "/api/v1/analysis/analyze",
        files={"file": ("resume.exe", b"not a resume", "application/octet-stream")},
    )

    assert response.status_code == 415
    assert response.json()["detail"] == "Upload a PDF, DOCX, or TXT file."


def test_rejects_invalid_utf8_text_file() -> None:
    response = client.post(
        "/api/v1/analysis/analyze",
        files={"file": ("resume.txt", b"\xff", "text/plain")},
    )

    assert response.status_code == 422
    assert response.json()["detail"] == "The text file must use UTF-8 encoding."
