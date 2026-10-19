import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view to highlight the matching nav link.
 */
export function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const section = document.getElementById(id.replace("#", ""));
        if (section && section.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}
