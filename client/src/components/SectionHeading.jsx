export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="section-heading reveal">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
}
