import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configuredPath = process.env.DB_PATH || "./data/portfolio.db";
const dbPath = isAbsolute(configuredPath)
  ? configuredPath
  : resolve(__dirname, configuredPath);

// Make sure the folder that will hold the database file exists.
const dbDir = dirname(dbPath);
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

export const db = new DatabaseSync(dbPath);

// Sensible defaults for a small relational workload.
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

// Create tables/indexes if they do not exist yet.
const schema = readFileSync(resolve(__dirname, "schema.sql"), "utf8");
db.exec(schema);

export { dbPath };

// Convert a raw row into the shape the frontend expects.
export function mapProject(row) {
  if (!row) return null;
  const parseList = (value) => {
    try {
      const parsed = JSON.parse(value ?? "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    features: parseList(row.features),
    technologies: parseList(row.technologies),
    image: row.image,
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    featured: Boolean(row.featured),
    order: row.sort_order,
    createdAt: row.created_at,
  };
}
