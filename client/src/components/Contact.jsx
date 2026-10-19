import { useState } from "react";
import { contact, profile } from "../data/portfolio.js";
import { submitContactMessage } from "../services/api.js";
import SectionHeading from "./SectionHeading.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  _gotcha: "", // Formspree honeypot - hidden from real users
};

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2)
    errors.name = "Please enter your name (2 characters or more).";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3)
    errors.subject = "Please enter a subject (3 characters or more).";
  if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    // Silently ignore bot submissions caught by the honeypot.
    if (values._gotcha.trim() !== "") {
      setValues(emptyForm);
      return;
    }

    const foundErrors = validate(values);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setSubmitting(true);
    try {
      const { name, email, subject, message } = values;
      const response = await submitContactMessage({
        name,
        email,
        subject,
        message,
      });
      setStatus({
        type: "success",
        message: response?.message || "Thanks! Your message has been sent.",
      });
      setValues(emptyForm);
      setErrors({});
    } catch (error) {
      if (error.fields) setErrors(error.fields);
      setStatus({
        type: "error",
        message:
          error.message || "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={contact.heading}
          subtitle={contact.subheading}
        />

        <div className="contact-grid">
          <div className="card contact-info reveal">
            <h3>Get in Touch</h3>
            <p className="contact-blurb">
              Have a project, an internship opportunity, or a question? Send a
              message and I will get back to you.
            </p>

            <ul className="contact-list">
              <li>
                <i className="bi bi-envelope-fill" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <i className="bi bi-telephone-fill" />
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </li>
              <li>
                <i className="bi bi-geo-alt-fill" />
                <span>{profile.location}</span>
              </li>
            </ul>

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

          <form className="card contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                value={values.subject}
                onChange={update("subject")}
                placeholder="How can I help?"
                aria-invalid={Boolean(errors.subject)}
                required
              />
              {errors.subject && <small className="field-error">{errors.subject}</small>}
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                value={values.message}
                onChange={update("message")}
                placeholder="Tell me a little about your project or question..."
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message && <small className="field-error">{errors.message}</small>}
            </div>

            {/* Honeypot: hidden from users, tempting to bots. */}
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="_gotcha">Company</label>
              <input
                id="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values._gotcha}
                onChange={update("_gotcha")}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <i className="bi bi-arrow-repeat spin" /> Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill" /> Send Message
                </>
              )}
            </button>

            {status && (
              <p
                className={`notice ${status.type === "success" ? "notice-success" : "notice-error"}`}
                role="status"
              >
                <i
                  className={`bi ${status.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`}
                />
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
