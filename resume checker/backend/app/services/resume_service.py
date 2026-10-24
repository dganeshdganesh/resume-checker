from io import BytesIO


class ResumeFormatError(ValueError):
    """Raised when a supported resume file cannot be read."""


def extract_resume_text(contents: bytes, extension: str) -> str:
    if extension == ".txt":
        try:
            return contents.decode("utf-8-sig")
        except UnicodeDecodeError as error:
            raise ResumeFormatError("The text file must use UTF-8 encoding.") from error

    if extension == ".pdf":
        try:
            from pypdf import PdfReader

            reader = PdfReader(BytesIO(contents))
            return "\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception as error:
            raise ResumeFormatError("Could not read this PDF. Check that it is a valid, unlocked PDF.") from error

    if extension == ".docx":
        try:
            from docx import Document

            document = Document(BytesIO(contents))
            paragraphs = [paragraph.text for paragraph in document.paragraphs]
            for table in document.tables:
                paragraphs.extend(cell.text for row in table.rows for cell in row.cells)
            return "\n".join(paragraphs)
        except Exception as error:
            raise ResumeFormatError("Could not read this DOCX. Check that it is a valid Word document.") from error

    raise ResumeFormatError("Unsupported file type.")
