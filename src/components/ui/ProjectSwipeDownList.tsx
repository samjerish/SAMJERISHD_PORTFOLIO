import React, { useState } from "react";
import "./ProjectSwipeDownList.css";
import type { Project } from "../../data/projects";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

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
      {projects.map((project, index) => {
        const isOpen = openId === project.id;

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
                <span className="project-number">0{index + 1}</span>
                <h3 className="project-name-heading">{project.name}</h3>
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
                      <span className="drawer-highlight-badge">CASE STUDY</span>
                      {project.tag && (
                        <span className="drawer-category-tag">{project.tag}</span>
                      )}
                      {project.date && (
                        <span className="drawer-year-tag">{project.date}</span>
                      )}
                    </div>

                    {/* Overview / Details */}
                    {project.details && (
                      <div className="drawer-overview-block">
                        <span className="drawer-section-label">OVERVIEW</span>
                        <p
                          className="drawer-desc-text"
                          dangerouslySetInnerHTML={{ __html: project.details }}
                        ></p>
                      </div>
                    )}

                    {/* Problem & Solution Showcase Cards */}
                    <div className="drawer-case-study-grid">
                      {project.problemStatement && (
                        <div className="drawer-callout-card problem-card">
                          <div className="callout-header">
                            <span className="callout-indicator problem-dot"></span>
                            <span className="callout-title">PROBLEM STATEMENT</span>
                          </div>
                          <p className="callout-text">{project.problemStatement}</p>
                        </div>
                      )}

                      {project.solution && (
                        <div className="drawer-callout-card solution-card">
                          <div className="callout-header">
                            <span className="callout-indicator solution-dot"></span>
                            <span className="callout-title">THE SOLUTION</span>
                          </div>
                          <p className="callout-text">{project.solution}</p>
                        </div>
                      )}
                    </div>

                    {/* Live Project Action */}
                    {project.link && (
                      <div className="drawer-actions">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="drawer-live-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live Project Demo</span>
                          <FiExternalLink />
                        </a>
                      </div>
                    )}
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
