import React, { useState } from "react";
import "./ProjectSwipeDownList.css";
import type { Project } from "../../data/projects";
import { FiChevronDown, FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectSwipeDownListProps {
  projects: Project[];
}

export const ProjectSwipeDownList: React.FC<ProjectSwipeDownListProps> = ({
  projects,
}) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (projectId: number) => {
    setOpenId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="project-swipe-list">
      {projects.map((project) => {
        const isOpen = openId === project.id;
        const hasLive = Boolean(project.link);
        const hasGithub = Boolean(project.githubUrl);

        return (
          <div
            key={project.id}
            className={`project-swipe-item ${isOpen ? "is-open" : ""}`}
          >
            {/* Minimalist Title Row */}
            <div
              className="project-title-row"
              onClick={() => handleToggle(project.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle(project.id);
                }
              }}
            >
              <div className="project-title-left">
                <h3 className="project-name-heading">{project.brandName || project.name}</h3>
              </div>

              <div className="project-title-right">
                {project.tag && (
                  <span className="project-tag-pill">{project.tag}</span>
                )}
                <button
                  type="button"
                  className={`project-arrow-badge ${isOpen ? "is-open" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(project.id);
                  }}
                  aria-label={isOpen ? "Collapse project details" : "Expand project details"}
                >
                  <FiChevronDown className={`chevron-icon ${isOpen ? "is-rotated" : ""}`} />
                </button>
              </div>
            </div>

            {/* Swipe Down Animated Expandable Drawer */}
            <div className={`project-swipe-drawer ${isOpen ? "expanded" : ""}`}>
              <div className="drawer-inner-content">
                <div className="drawer-grid">
                  {/* Left: Fitted Project Image Showcase */}
                  <div className="drawer-media-col">
                    <div className="drawer-image-frame">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="drawer-project-img"
                        loading="lazy"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>

                  {/* Right: Project Highlights, Problem & Solution */}
                  <div className="drawer-info-col">
                    <div className="drawer-meta-tags">
                      {project.tag && (
                        <span className="drawer-category-tag">{project.tag}</span>
                      )}
                      {project.date && (
                        <span className="drawer-year-tag">{project.date}</span>
                      )}
                    </div>

                    {/* Overview / Details */}
                    {project.shortDesc && (
                      <div className="drawer-overview-block">
                        <span className="drawer-section-label">WHAT IT IS</span>
                        <p className="drawer-desc-text">{project.shortDesc}</p>
                      </div>
                    )}

                    {/* Problem, Solution & Impact Showcase Cards */}
                    <div className="drawer-case-study-grid">
                      {project.problemStatement && (
                        <div className="drawer-callout-card problem-card">
                          <div className="callout-header">
                            <span className="callout-title">WHY I BUILT THIS</span>
                          </div>
                          <p className="callout-text">{project.problemStatement}</p>
                        </div>
                      )}

                      {project.solution && (
                        <div className="drawer-callout-card solution-card">
                          <div className="callout-header">
                            <span className="callout-title">HOW IT WORKS &amp; CHALLENGE</span>
                          </div>
                          <p className="callout-text">{project.solution}</p>
                        </div>
                      )}

                      {project.impact && (
                        <div className="drawer-callout-card impact-card">
                          <div className="callout-header">
                            <span className="callout-title">CURRENT STATE &amp; DETAILS</span>
                          </div>
                          <p className="callout-text">{project.impact}</p>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Chips */}
                    {project.techStack && (
                      <div className="drawer-tech-stack">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="drawer-tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Live Project & GitHub Actions */}
                    <div className="drawer-actions">
                      {hasLive && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="drawer-live-btn"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open live demo for ${project.name}`}
                        >
                          <span>Live Demo</span>
                          <FiExternalLink />
                        </a>
                      )}
                      {hasGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="drawer-github-btn"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${project.name} source code on GitHub`}
                        >
                          <FiGithub />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
