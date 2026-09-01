import React, { useEffect, useState } from "react";
import "./ProjectsPage.css";
import "../sections/ProjectsSection.css";
import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { ProjectModal } from "../ui/ProjectModal";

const TECH_STACK = [
  {
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "HTML5",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "Java",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "CSS3",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
];

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

        <div className="projects-grid" style={{ marginBottom: "6rem" }}>
          {[...projects.slice(3), ...projects.slice(0, 3)].map((project) => (
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

        <div className="tech-stack-section">
          <h2 className="tech-stack-heading">TECH STACK</h2>
          <div className="tech-stack-grid">
            {TECH_STACK.map((tech, index) => (
              <div key={index} className="tech-grid-item">
                <img
                  src={tech.url}
                  alt={tech.name}
                  className="tech-grid-icon"
                />
                <span className="tech-grid-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

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
