import { useEffect, useState } from "react";
import { navLinks } from "../data/portfolio.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(navLinks.map((link) => link.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#home" className="brand" onClick={close}>
          Tsedeke<span className="brand-dot">.</span>
        </a>

        <button
          type="button"
          className="icon-btn nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
        </button>

        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${active === link.href ? "is-active" : ""}`}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>
    </header>
  );
}
