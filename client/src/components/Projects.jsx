import SectionHeading from "./SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects({ projects, loading, error }) {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Practical projects that demonstrate my frontend, backend, and database skills."
        />

        {error && (
          <p className="notice notice-warn reveal" role="status">
            <i className="bi bi-wifi-off" /> Live project data is unavailable right
            now, so default content is shown.
          </p>
        )}

        {loading ? (
          <div className="projects-grid">
            {[0, 1, 2].map((key) => (
              <div key={key} className="card skeleton-card" aria-hidden="true">
                <div className="skeleton skeleton-thumb" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
