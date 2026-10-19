import { Router } from "express";
import { db } from "../db.js";

const router = Router();

const insertMessage = db.prepare(
  `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server-side validation mirrors the client so the API is safe on its own.
function validate(payload) {
  const errors = {};
  const value = (key) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";

  const name = value("name");
  const email = value("email");
  const subject = value("subject");
  const message = value("message");

  if (name.length < 2) errors.name = "Please enter your name (2 characters or more).";
  if (name.length > 100) errors.name = "Name is too long.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (email.length > 150) errors.email = "Email is too long.";
  if (subject.length < 3) errors.subject = "Please enter a subject (3 characters or more).";
  if (subject.length > 150) errors.subject = "Subject is too long.";
  if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  if (message.length > 5000) errors.message = "Message is too long.";

  return { errors, clean: { name, email, subject, message } };
}

// POST /api/contact -> store a new contact message
router.post("/", (req, res, next) => {
  try {
    const { errors, clean } = validate(req.body ?? {});

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        error: "Please fix the highlighted fields and try again.",
        fields: errors,
      });
    }

    const result = insertMessage.run(clean.name, clean.email, clean.subject, clean.message);

    res.status(201).json({
      data: { id: Number(result.lastInsertRowid) },
      message: "Thanks for reaching out! Your message has been received.",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
