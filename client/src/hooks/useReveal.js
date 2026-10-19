import { useEffect } from "react";

/**
 * Adds a reveal-on-scroll animation to every element with the `reveal` class.
 * Re-runs whenever `dependency` changes (e.g. after projects load).
 */
export function useReveal(dependency) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dependency]);
}
