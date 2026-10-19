import { useEffect, useState } from "react";
import { profile, contact } from "../data/portfolio.js";

function useTypewriter(phrases) {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      setText(current.slice(0, charIndex));

      let delay = deleting ? 45 : 90;
      if (!deleting && charIndex === current.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [phrases]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.typingPhrases);

  return (
    <section id="home" className="hero section">
      <div className="container hero-inner">
        <div className="hero-content reveal">
          <span className="hero-badge">
            <span className="pulse-dot" aria-hidden="true" />
            Available for opportunities
          </span>

          <h1 className="hero-headline">{profile.headline}</h1>

          <p className="hero-typed" aria-live="polite">
            <span className="typed-label">I'm a </span>
            <span className="typed-text">{typed}</span>
            <span className="caret" aria-hidden="true">
              |
            </span>
          </p>

          <p className="hero-description">{profile.description}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <i className="bi bi-grid-1x2-fill" />
              View My Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              <i className="bi bi-chat-dots-fill" />
              Contact Me
            </a>
          </div>

          <ul className="hero-socials" aria-label="Social links">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <i className={`bi ${social.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual reveal">
          <div className="hero-image-frame">
            <img
              src={profile.image}
              alt={`${profile.name} — ${profile.role}`}
              className="hero-image"
              width="360"
              height="432"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
