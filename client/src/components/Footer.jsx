import { profile, contact, navLinks } from "../data/portfolio.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#home" className="brand">
            Tsedeke<span className="brand-dot">.</span>
          </a>
          <p>{profile.headline}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <ul className="hero-socials footer-socials" aria-label="Social links">
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

      <div className="container footer-bottom">
        <p>
          © {year} {profile.name}. Built with React, Node.js, Express, and SQL.
        </p>
      </div>
    </footer>
  );
}
