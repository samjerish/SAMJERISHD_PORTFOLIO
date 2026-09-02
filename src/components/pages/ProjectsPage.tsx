import React, { useEffect, useState } from "react";
import "./ProjectsPage.css";
import "../sections/ProjectsSection.css";
import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { ProjectModal } from "../ui/ProjectModal";
import { CenterFlow } from "../ui/CenterFlow";
import { ProjectSwipeDownList } from "../ui/ProjectSwipeDownList";

export const ProjectsPage: React.FC<{
  onNavigate: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="projects-page-wrapper is-visible">
      <nav className="projects-nav">
        <button className="back-btn" onClick={() => onNavigate("home")}>
          ← Go Back
        </button>
      </nav>

      <div className="projects-page-content">
        <div className="projects-story-section">
          <div className="projects-story-text-container">
            <p className="story-line line-1">
              For me, every project starts with a problem, an idea, or simply a
              question
            </p>
            <p className="story-line line-what-if">"What if?"</p>
          </div>
        </div>

        {/* Minimalist Title List with Swipe-Down on Hover */}
        <ProjectSwipeDownList
          projects={projects}
          onProjectClick={handleProjectClick}
        />

        {/* Center Flow Radial Tech Stack */}
        <CenterFlow
          title="TECH STACK"
          subtitle="Core technologies and frameworks powering my applications and experiments"
        />

        <div className="github-cta-section">
          <h2>More on GitHub</h2>
          <p>
            Want to see the code behind these projects or explore my other
            technical experiments? Dive into my repositories.
          </p>
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
          >
            View My GitHub
          </a>
        </div>

        <div className="projects-watermark">
          CREATIVITY AND TECHNOLOGY TO SOLVE REAL WORLD PROBLEMS
        </div>
      </div>

      {/* Render Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
