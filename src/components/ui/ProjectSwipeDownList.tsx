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

                    {/* Headline */}
                    {project.headline && (
                      <p className="drawer-headline-text">{project.headline}</p>
                    )}

                    {/* 3-Line Concise Summary */}
                    <div className="drawer-summary-block">
                      <span className="drawer-section-label">PROJECT SUMMARY</span>
                      <div className="drawer-summary-lines">
                        {project.summaryLines.map((line, idx) => (
                          <div key={idx} className="drawer-summary-line">
                            <span className="drawer-line-index" aria-hidden="true">
                              0{idx + 1}
                            </span>
                            <p className="drawer-line-text">{line}</p>
                          </div>
                        ))}
                      </div>
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
