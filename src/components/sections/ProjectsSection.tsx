import React, { useState, useEffect, useRef } from "react";

import "./ProjectsSection.css";
import clickHereGraphic from "../../assets/click_here.png";

import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { ProjectModal } from "../ui/ProjectModal";
import { CenterFlow } from "../ui/CenterFlow";

export const ProjectsSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLElement>(null);

  // We only show the first 3 projects in the home section
  const featuredProjects = projects.slice(0, 3);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Visibility logic just for fading in the section title initially
  useEffect(() => {
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
          <h1 className="portfolio-headline">FEATURED PROJECTS</h1>
          <p className="portfolio-subtext">
            This is a curated selection of projects I want to share. If anything
            catches your eye or sparks an idea, don't hesitate to drop me a
            message :)
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-card-header">
                <div className="project-card-logo">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  </svg>
                </div>
                <span className="project-card-name">{project.name}</span>
              </div>

              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <div className="project-hover-overlay">
                  <span className="hover-hint-text">Click to view more</span>
                  {project.problemStatement && (
                    <div className="hover-problem-text">
                      <span className="problem-label">Problem solved:</span>
                      <p>{project.problemStatement}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-info">
                {project.description && (
                  <h3
                    className="project-card-title"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  ></h3>
                )}
                <div className="project-card-footer">
                  {project.tag && project.date
                    ? `${project.tag}, ${project.date}`
                    : project.date || project.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Flow Radial Tech Stack */}
        <CenterFlow />

        <div
          className="view-all-banner"
          onClick={() => onNavigate && onNavigate("projects")}
        >
          <div className="view-all-graphic-wrapper">
            <img
              src={clickHereGraphic}
              alt="Click Here"
              className="view-all-avatar"
            />
          </div>
          <div className="view-all-text-wrapper">
            <h2>WANT TO SEE MORE?</h2>
            <p>Click here to view all my projects and experiments!</p>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};
