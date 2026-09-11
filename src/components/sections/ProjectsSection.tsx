import React, { useState, useEffect, useRef } from "react";

import "./ProjectsSection.css";

import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { ProjectModal } from "../ui/ProjectModal";
import { ScrollStack } from "../ui/ScrollStack";


export const ProjectsSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate: _onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLElement>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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
          <h1 className="portfolio-headline">MY WORK</h1>
          <p className="portfolio-subtext">
            A curated selection of featured products, intelligent software, and full-stack systems designed with purpose.
          </p>
        </div>

        {/* React Bits Pro Scroll Stack: Pinned Cards That Stack, Turn, and Dissolve */}
        <ScrollStack
          projects={projects}
          onProjectClick={handleProjectClick}
        />
      </div>



      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};
