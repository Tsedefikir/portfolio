/**
 * ---------------------------------------------------------------------------
 * PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * This is the single place to edit your personal details, skills, services,
 * and fallback project data. Update the values below and the whole site
 * updates automatically.
 *
 * Project images live in: client/src/assets/projects/
 * Replace the placeholder .svg files with real screenshots (same file name)
 * or point `image` to a different path/URL.
 * ---------------------------------------------------------------------------
 */

import profilePhoto from "../assets/MyPhoto.png";
import resumePdf from "../assets/TsedekeCV.pdf";
import netflixCloneImage from "../assets/projects/netflix-clone.png";
import chatgptCloneImage from "../assets/projects/chatgpt-clone.png";
import evangadiForumImage from "../assets/projects/evangadi-forum.png";

/**
 * Maps a project slug to its bundled image. Vite hashes these files in the
 * production build, so the frontend resolves them by slug instead of relying
 * on a static public path.
 */
export const projectImages = {
  "netflix-clone": netflixCloneImage,
  "chatgpt-clone": chatgptCloneImage,
  "evangadi-forum": evangadiForumImage,
};

export const profile = {
  name: "Tsedeke Kebede",
  role: "Full-Stack Web Developer",
  headline: "Hi, I'm a Full-Stack Web Developer.",
  description:
    "I build responsive, interactive, and user-friendly web applications using modern frontend and backend technologies. I enjoy transforming ideas into practical digital solutions through clean code, thoughtful design, and efficient database integration.",
  // A few rotating phrases shown under the headline.
  typingPhrases: [
    "Full-Stack Web Developer",
    "Frontend & Backend Builder",
    "Problem Solver",
  ],
  image: profilePhoto,
  resumeUrl: resumePdf,
  location: "Ethiopia",
  availability: "Open to internships, freelance work, and collaboration.",
};

export const about = {
  heading: "About Me",
  subheading: "Passion for full-stack development and continuous learning",
  paragraphs: [
    "I am a Full-Stack Web Developer with knowledge of frontend technologies, backend development, and relational databases. My development journey has helped me build projects that combine responsive user interfaces, server-side logic, API integration, and database operations.",
    "I am passionate about writing clean code, solving real-world problems, learning modern technologies, and collaborating with other developers to create useful digital products.",
  ],
  highlights: [
    {
      icon: "bi-code-slash",
      title: "Frontend",
      text: "Responsive, accessible interfaces with HTML, CSS, JavaScript, and React.",
    },
    {
      icon: "bi-hdd-network",
      title: "Backend",
      text: "Server-side logic and REST APIs with Node.js and Express.js.",
    },
    {
      icon: "bi-database",
      title: "Database",
      text: "Relational data modeling, SQL queries, and CRUD operations.",
    },
  ],
};

export const skills = [
  {
    title: "Frontend Development",
    icon: "bi-window-stack",
    items: [
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
      { name: "React.js", icon: "devicon-react-original colored" },
    ],
  },
  {
    title: "Backend Development",
    icon: "bi-hdd-stack",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "RESTful APIs", icon: "bi bi-diagram-3" },
      { name: "Backend application development", icon: "bi bi-server" },
      {
        name: "Authentication & authorization fundamentals",
        icon: "bi bi-shield-lock",
      },
    ],
  },
  {
    title: "Database Management",
    icon: "bi-database-gear",
    items: [
      { name: "SQL databases", icon: "devicon-azuresqldatabase-plain colored" },
      { name: "Database integration", icon: "bi bi-database-add" },
      { name: "SQL queries & CRUD operations", icon: "bi bi-terminal" },
      { name: "Relational database fundamentals", icon: "bi bi-table" },
    ],
  },
  {
    title: "Tools & Development",
    icon: "bi-tools",
    items: [
      { name: "Git & GitHub", icon: "devicon-git-plain colored" },
      { name: "API integration", icon: "bi bi-plug" },
      { name: "Responsive web design", icon: "bi bi-aspect-ratio" },
      { name: "Debugging & problem-solving", icon: "bi bi-bug" },
    ],
  },
];

export const services = [
  {
    icon: "bi-window-stack",
    title: "Frontend Development",
    text: "Build responsive and interactive user interfaces.",
  },
  {
    icon: "bi-hdd-stack",
    title: "Backend Development",
    text: "Develop server-side applications, business logic, and REST APIs.",
  },
  {
    icon: "bi-database-gear",
    title: "Database Integration",
    text: "Connect web applications to SQL databases and implement CRUD functionality.",
  },
  {
    icon: "bi-diagram-3",
    title: "Full-Stack Application Development",
    text: "Integrate frontend, backend, APIs, and databases into complete web applications.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const contact = {
  heading: "Let's Work Together",
  subheading: "Open to internships, freelance projects, and collaboration",
  email: "Tsedeke30@gmail.com",
  phone: "+251926574570",
  socials: [
    {
      label: "GitHub",
      icon: "bi-github",
      url: "https://github.com/Tsedefikir/",
    },
    {
      label: "LinkedIn",
      icon: "bi-linkedin",
      url: "https://www.linkedin.com/in/tsedeke-kebede-elito-a57847118",
    },
    {
      label: "Email",
      icon: "bi-envelope-fill",
      url: "mailto:Tsedeke30@gmail.com",
    },
  ],
};

/**
 * Fallback projects used when the API is unreachable, so the site still
 * renders. In normal use, project data is served by the backend from SQL
 * (see server/seed.js).
 */
export const fallbackProjects = [
  {
    id: 1,
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
    image: netflixCloneImage,
    githubUrl: "https://github.com/Tsedefikir/NetflixClone",
    demoUrl: "https://netclone.tsedetech.com/",
  },
  {
    id: 2,
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
    image: chatgptCloneImage,
    githubUrl: "https://github.com/Tsedefikir/GptClone",
    demoUrl: "https://clonegpt.tsedetech.com",
  },
  {
    id: 3,
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
    image: evangadiForumImage,
    githubUrl: "https://github.com/Tsedefikir/EvangadiForum",
    demoUrl: "https://evangadiforum.tsedetech.com/",
  },
];
