import "dotenv/config";
import express from "express";
import cors from "cors";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dbPath } from "./db.js";
import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || "https://tsedetech.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/curl requests (no origin) and any allow-listed origin.
      if (
        !origin ||
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
  }),
);
app.use(express.json({ limit: "20kb" }));

// Simple request logger.
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: dbPath });
});

app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);

// Serve the built React app in production, if it exists.
const clientDist = resolve(__dirname, "..", "client", "dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(resolve(clientDist, "index.html"));
  });
}

// 404 for unknown API routes.
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found." });
});

// Central error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Internal server error." : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Database: ${dbPath}`);
});
