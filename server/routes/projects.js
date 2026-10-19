import { Router } from "express";
import { db, mapProject } from "../db.js";

const router = Router();

const selectAll = db.prepare(
  `SELECT * FROM projects WHERE featured = 1 ORDER BY sort_order ASC, id ASC`,
);
const selectBySlug = db.prepare(`SELECT * FROM projects WHERE slug = ?`);

// GET /api/projects -> all featured projects
router.get("/", (_req, res, next) => {
  try {
    const projects = selectAll.all().map(mapProject);
    res.json({ data: projects });
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:slug -> a single project
router.get("/:slug", (req, res, next) => {
  try {
    const project = mapProject(selectBySlug.get(req.params.slug));
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ data: project });
  } catch (err) {
    next(err);
  }
});

export default router;
