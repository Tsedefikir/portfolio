import { projectImages } from "../data/portfolio.js";

const isRealLink = (url) => Boolean(url) && url !== "#";

export default function ProjectCard({ project, index }) {
  const hasGithub = isRealLink(project.githubUrl);
  const hasDemo = isRealLink(project.demoUrl);
  const image = projectImages[project.slug] ?? project.image;

  const features = project.features ?? [];
  const visibleFeatures = features.slice(0, 3);
  const extraCount = features.length - visibleFeatures.length;

  return (
    <article
      className="card project-card reveal"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="project-thumb">
        <img
          src={image}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="project-thumb-fallback" aria-hidden="true">
          <i className="bi bi-window-stack" />
        </span>
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {visibleFeatures.length > 0 && (
          <ul className="project-features">
            {visibleFeatures.map((feature) => (
              <li key={feature}>
                <i className="bi bi-check2" /> {feature}
              </li>
            ))}
            {extraCount > 0 && (
              <li className="feature-more">
                +{extraCount} more feature{extraCount > 1 ? "s" : ""}
              </li>
            )}
          </ul>
        )}

        <ul className="badge-list project-tech">
          {project.technologies?.map((tech) => (
            <li key={tech} className="badge badge-sm">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-actions">
          {hasGithub ? (
            <a
              className="btn btn-outline btn-sm"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github" /> Source Code
            </a>
          ) : (
            <span className="btn btn-outline btn-sm is-disabled" aria-disabled="true">
              <i className="bi bi-github" /> Source Code
            </span>
          )}

          {hasDemo ? (
            <a
              className="btn btn-primary btn-sm"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-box-arrow-up-right" /> Live Demo
            </a>
          ) : (
            <span className="btn btn-primary btn-sm is-disabled" aria-disabled="true">
              <i className="bi bi-box-arrow-up-right" /> Live Demo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
