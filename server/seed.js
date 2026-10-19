import "dotenv/config";
import { db, dbPath } from "./db.js";

// Editable project data. Re-run `npm run seed` after changing it.
const projects = [
  {
    slug: "netflix-clone",
    title: "Netflix Clone",
    description:
      "A movie-streaming-style web interface inspired by Netflix, focused on a responsive browsing experience and a modern, content-first design.",
    features: [
      "Responsive movie and TV-show browsing interface",
      "Movie cards and horizontal content sliders",
      "Modern streaming-platform-inspired design",
      "Interactive navigation and user interface",
      "Movie API integration for dynamic content",
    ],
    technologies: ["React", "JavaScript", "Movie API"],
    image: "/assets/projects/netflix-clone.png",
    githubUrl: "https://github.com/Tsedefikir/NetflixClone",
    demoUrl: "https://netclone.tsedetech.com/",
    featured: 1,
    sort_order: 1,
  },
  {
    slug: "chatgpt-clone",
    title: "ChatGPT Clone",
    description:
      "An AI-powered conversational web application with an interactive chat interface and frontend-to-backend communication over a REST API.",
    features: [
      "Interactive chat interface",
      "User message input and AI-generated responses",
      "Frontend-to-backend communication",
      "REST API integration",
      "AI model integration where implemented",
      "Backend and database integration where implemented",
    ],
    technologies: ["React", "JavaScript", "Node.js", "REST API", "SQL"],
    image: "/assets/projects/chatgpt-clone.png",
    githubUrl: "https://github.com/Tsedefikir/GptClone",
    demoUrl: "https://clonegpt.tsedetech.com",
    featured: 1,
    sort_order: 2,
  },
  {
    slug: "evangadi-forum",
    title: "Evangadi Forum",
    description:
      "A discussion platform where users can participate in conversations and share knowledge, backed by a REST API and a relational database.",
    features: [
      "User registration and login",
      "Posting questions and answers",
      "Organized discussion interface",
      "Backend API integration",
      "Database-backed information management",
      "Authentication and protected routes where implemented",
    ],
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "SQL"],
    image: "/assets/projects/evangadi-forum.png",
    githubUrl: "https://github.com/Tsedefikir/EvangadiForum",
    demoUrl: "https://evangadiforum.tsedetech.com/",
    featured: 1,
    sort_order: 3,
  },
];

const upsert = db.prepare(`
  INSERT INTO projects
    (slug, title, description, features, technologies, image, github_url, demo_url, featured, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET
    title        = excluded.title,
    description  = excluded.description,
    features     = excluded.features,
    technologies = excluded.technologies,
    image        = excluded.image,
    github_url   = excluded.github_url,
    demo_url     = excluded.demo_url,
    featured     = excluded.featured,
    sort_order   = excluded.sort_order
`);

db.exec("BEGIN");
try {
  for (const p of projects) {
    upsert.run(
      p.slug,
      p.title,
      p.description,
      JSON.stringify(p.features),
      JSON.stringify(p.technologies),
      p.image,
      p.githubUrl,
      p.demoUrl,
      p.featured,
      p.sort_order,
    );
  }
  db.exec("COMMIT");
} catch (err) {
  db.exec("ROLLBACK");
  throw err;
}

console.log(`Seeded ${projects.length} projects into ${dbPath}`);
