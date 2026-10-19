import { useEffect, useState } from "react";
import { fallbackProjects } from "./data/portfolio.js";
import { getProjects } from "./services/api.js";
import { useTheme } from "./hooks/useTheme.js";
import { useReveal } from "./hooks/useReveal.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    getProjects()
      .then((response) => {
        if (active && response?.data?.length) setProjects(response.data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Re-run reveal animations once projects finish loading.
  useReveal(`${loading}-${projects.length}`);

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} loading={loading} error={error} />
        <Services />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
