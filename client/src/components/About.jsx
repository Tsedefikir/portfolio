import { about, profile } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Get to know me"
          title={about.heading}
          subtitle={about.subheading}
        />

        <div className="about-grid">
          <div className="card about-card reveal">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}

            <div className="about-meta">
              <span>
                <i className="bi bi-geo-alt-fill" /> {profile.location}
              </span>
              <span>
                <i className="bi bi-briefcase-fill" /> {profile.availability}
              </span>
              <a className="about-cv" href={profile.resumeUrl} download>
                <i className="bi bi-download" /> Download CV
              </a>
            </div>
          </div>

          <div className="about-highlights">
            {about.highlights.map((item, index) => (
              <article
                key={item.title}
                className="card highlight-card reveal"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="highlight-icon">
                  <i className={`bi ${item.icon}`} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
