import React, { useState, useEffect, useRef } from "react";

import "./ProjectsSection.css";

import { projects } from "../../data/projects";
import { ScrollStack } from "../ui/ScrollStack";

export const ProjectsSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLElement>(null);

  // Visibility logic for fading in the section initially and cleanup
  useEffect(() => {
    document.body.removeAttribute("data-project-hover");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (scrollContainerRef.current)
            observer.unobserve(scrollContainerRef.current);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    const node = scrollContainerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      document.body.removeAttribute("data-project-hover");
    };
  }, []);

  return (
    <section
      ref={scrollContainerRef}
      className={`portfolio-container ${isVisible ? "is-visible" : ""}`}
      id="projects"
    >
      <div className="portfolio-content-wrapper">
        <div className="portfolio-header-static">
          <h1 className="portfolio-headline">FEATURED WORK</h1>
          <p className="portfolio-subtext">
            A curated showcase of flagship products, intelligent systems, and interactive 3D experiences.
          </p>
        </div>

        {/* Scroll Stack Pinned Cards Deck with physical card rotation physics */}
        <ScrollStack
          projects={projects}
          stackOffset={28}
          scaleStep={0.024}
          rotationStep={1.4}
        />
      </div>
    </section>
  );
};
