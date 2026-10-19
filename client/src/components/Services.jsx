import { services } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Do"
          subtitle="How I can help turn an idea into a working web application."
        />

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="card service-card reveal"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="service-icon">
                <i className={`bi ${service.icon}`} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
