export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="Ganesh Resume Checker home">
        <span className="brand-mark">R</span>
        <span>Ganesh Resume Checker</span>
      </a>
      <span className="nav-note"><span className="privacy-dot" /> Private by design</span>
    </header>
  );
}
