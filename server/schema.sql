-- Relational schema for the portfolio backend.

CREATE TABLE IF NOT EXISTS projects (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT    NOT NULL UNIQUE,
  title        TEXT    NOT NULL,
  description  TEXT    NOT NULL,
  features     TEXT    NOT NULL DEFAULT '[]',  -- JSON-encoded array of strings
  technologies TEXT    NOT NULL DEFAULT '[]',  -- JSON-encoded array of strings
  image        TEXT,
  github_url   TEXT,
  demo_url     TEXT,
  featured     INTEGER NOT NULL DEFAULT 1,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_sort   ON projects (sort_order);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages (created_at);
