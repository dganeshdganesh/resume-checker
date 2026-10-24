import { useRef, useState } from "react";

interface ResumeUploaderProps {
  busy: boolean;
  onAnalyze: (file: File) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;

export default function ResumeUploader({ busy, onAnalyze }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function selectFile(nextFile?: File) {
    setError("");
    if (!nextFile) return;
    if (!/\.(pdf|docx|txt)$/i.test(nextFile.name)) {
      setError("Choose a PDF, DOCX, or TXT file.");
      return;
    }
    if (nextFile.size > MAX_SIZE) {
      setError("Your file must be smaller than 5 MB.");
      return;
    }
    setFile(nextFile);
  }

  return (
    <section className="upload-card" aria-labelledby="upload-title">
      <div className="card-heading">
        <span className="step-number">01</span>
        <div>
          <h2 id="upload-title">Upload your resume</h2>
          <p>Get a clear snapshot of what’s working and what to improve.</p>
        </div>
      </div>
      <button
        className="dropzone"
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFile(event.dataTransfer.files[0]);
        }}
        aria-label="Choose or drop your resume file"
      >
        <span className="upload-icon" aria-hidden="true">↑</span>
        <strong>{file ? file.name : "Drop your resume here"}</strong>
        <span>{file ? `${(file.size / 1024).toFixed(0)} KB · Ready to review` : "or click to browse your files"}</span>
        <span className="file-types">PDF, DOCX or TXT · Max 5 MB</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        hidden
        onChange={(event) => selectFile(event.target.files?.[0])}
      />
      {error && <p className="error-message" role="alert">{error}</p>}
      <button
        className="primary-button"
        type="button"
        disabled={!file || busy}
        onClick={() => file && onAnalyze(file)}
      >
        {busy ? <><span className="spinner" /> Reviewing your resume…</> : "Analyze my resume"}
        {!busy && <span aria-hidden="true">→</span>}
      </button>
      <p className="privacy-note"><span aria-hidden="true">⌑</span> Your file is processed for this review and not retained.</p>
    </section>
  );
}
