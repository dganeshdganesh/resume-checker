# Ganesh Resume Checker

A small, private resume-feedback app. It checks document structure, approximate length, and a curated set of common skills using transparent local heuristics. It does not predict hiring outcomes or guarantee ATS results.

## Run locally

### API

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000`; interactive documentation is at `/docs`.

### Web app

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Its development server proxies API requests to `http://localhost:8000`.

## Supported files and privacy

PDF, DOCX, and UTF-8 TXT files up to 5 MB are supported. Resume contents are processed for the request and are not persisted by the application or sent to another service. Scoring is a simple heuristic and feedback should be reviewed by a person.

## Tests

```bash
cd backend
pytest
```
