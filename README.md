# Full-Stack Web Developer Portfolio

A modern, responsive portfolio website for a **Full-Stack Web Developer**, built with a
React frontend, a Node.js + Express REST API, and a relational SQL database.

The site introduces you as a full-stack developer, showcases your **Netflix Clone**,
**ChatGPT Clone**, and **Evangadi Forum** projects, presents your skills and services,
and lets visitors send you a message through a validated contact form that stores
messages in the database.

---

## Features

- Hero section with headline, rotating role text, and clear calls to action.
- Categorized technical skills (Frontend, Backend, Database, Tools) as clean badges.
- Featured projects rendered from the SQL database, with fallback content if the API is offline.
- "What I Can Do" services section.
- About section with highlights and a CV download.
- Contact section with client validation, a spam honeypot, and a Formspree-powered form
  (no backend required to receive messages).
- Dark / light mode with saved preference and system default.
- Smooth scrolling, scroll-spy navigation, reveal-on-scroll animations, back-to-top button.
- Fully responsive (desktop, tablet, mobile) and keyboard/accessibility friendly.
- Centralized content file for easy customization.

## Tech stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Frontend  | React 18, Vite, modern CSS (custom properties, no UI kit) |
| Backend   | Node.js, Express.js, REST API                           |
| Database  | SQL (SQLite via Node's built-in `node:sqlite`)          |

> **Why SQLite?** It is a real relational SQL database and requires no separate server
> or installation, so the project runs anywhere Node runs. The schema and queries are
> standard SQL, so migrating to MySQL/PostgreSQL later is straightforward.

## Project structure

```
TsedekePortfolio/
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── assets/             # Profile photo, CV, project thumbnails (imported & hashed)
│       ├── components/         # Reusable UI components
│       ├── data/portfolio.js   # ← EDIT YOUR CONTENT HERE
│       ├── hooks/              # useTheme, useReveal, useScrollSpy
│       ├── services/api.js     # API client
│       ├── App.jsx
│       └── index.css           # Design tokens + all styles
├── server/                     # Express + SQL backend
│   ├── routes/                 # projects, contact
│   ├── schema.sql              # Relational schema
│   ├── db.js                   # DB connection + helpers
│   ├── seed.js                 # Seeds the three projects
│   └── index.js                # Server entry point
└── README.md
```

## Prerequisites

- **Node.js 22.5 or newer** (required for the built-in `node:sqlite` module). Check with `node -v`.
- **npm** (comes with Node).

## Setup

### 1. Backend

```bash
cd server
npm install
copy .env.example .env      # Windows  (use `cp .env.example .env` on macOS/Linux)
npm run seed                # create the database and load the projects
npm run dev                 # start the API on http://localhost:5000
```

### 2. Frontend (in a second terminal)

```bash
cd client
npm install
copy .env.example .env      # optional; defaults are fine for local dev
npm run dev                 # start the app on http://localhost:5173
```

Open <http://localhost:5173>. The Vite dev server proxies `/api` requests to the backend
automatically.

## Production build

```bash
cd client
npm run build               # outputs client/dist
```

Once `client/dist` exists, the backend serves it automatically:

```bash
cd server
npm start                   # serves the API and the built site on http://localhost:5000
```

## Customizing your portfolio

Almost everything lives in **`client/src/data/portfolio.js`**:

- `profile` – your name, headline, description, typing phrases, photo, CV path, location, availability.
- `about` – the About Me paragraphs and highlight cards.
- `skills`, `services`, `navLinks` – the skills, service cards, and navigation.
- `contact` – email, phone, social links.
- `fallbackProjects` – default projects shown if the API is unavailable.

**Project data** is served from the database. Edit the project list in
**`server/seed.js`** and re-run `npm run seed` to update it. Replace the placeholder
`githubUrl` / `demoUrl` values with your real repository and live-demo links.

**Images** live in `client/src/assets/` and are imported in
`client/src/data/portfolio.js`, so Vite bundles and content-hashes them in the
production build:

- Profile photo: `client/src/assets/MyPhoto.png`
- CV: `client/src/assets/TsedekeCV.pdf`
- Project thumbnails: `client/src/assets/projects/`

To change a thumbnail, replace the placeholder `.svg` in `client/src/assets/projects/`
(keep the same file name), or add a new file and update the matching import in
`portfolio.js` and the `projectImages` map.

## API reference

| Method | Endpoint               | Description                          |
| ------ | ---------------------- | ------------------------------------ |
| GET    | `/api/health`          | Health check + database path         |
| GET    | `/api/projects`        | List all featured projects           |
| GET    | `/api/projects/:slug`  | Get one project by slug              |
| POST   | `/api/contact`         | Validate and store a contact message |

`POST /api/contact` expects JSON: `{ "name", "email", "subject", "message" }`.
It returns `201` on success and `422` with per-field errors on validation failure.
The frontend uses Formspree by default; this endpoint remains available if you prefer
to store messages in SQL instead.

## Contact form (Formspree)

The contact form posts to a Formspree endpoint, so it works on a static deployment
with no backend. Set your own endpoint in `client/.env`:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

If `VITE_FORMSPREE_ENDPOINT` is not set, it falls back to the default value in
`client/src/services/api.js`. Client-side validation runs before submission, and a
`_gotcha` honeypot field filters basic spam.

## Environment variables

**server/.env**

| Variable      | Default                     | Description                       |
| ------------- | --------------------------- | --------------------------------- |
| `PORT`        | `5000`                      | API port                          |
| `CORS_ORIGIN` | `http://localhost:5173`     | Comma-separated allowed origins   |
| `DB_PATH`     | `./data/portfolio.db`       | SQLite database location          |

**client/.env**

| Variable                  | Default                              | Description                                  |
| ------------------------- | ------------------------------------ | -------------------------------------------- |
| `VITE_API_URL`            | *(empty)*                            | Backend base URL. Empty uses the dev proxy. |
| `VITE_FORMSPREE_ENDPOINT` | `https://formspree.io/f/mkoybewq`    | Contact form submission endpoint.            |

## Notes

- The previous static `index.html` / `style.css` / `script.js` version has been replaced
  by this React application.
- No fake testimonials, invented experience, or non-functional buttons are included.
