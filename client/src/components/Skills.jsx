import { skills } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="What I work with"
          title="Technical Skills"
          subtitle="The frontend, backend, database, and development tools I use to build web applications."
        />

        <div className="skills-grid">
          {skills.map((group, index) => (
            <article
              key={group.title}
              className="card skill-card reveal"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="skill-card-head">
                <span className="skill-icon">
                  <i className={`bi ${group.icon}`} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <ul className="badge-list">
                {group.items.map((item) => (
                  <li key={item.name} className="badge">
                    <i className={item.icon} aria-hidden="true" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
