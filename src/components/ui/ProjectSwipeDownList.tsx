import React, { useState } from "react";
import "./ProjectSwipeDownList.css";
import type { Project } from "../../data/projects";
import { FiArrowUpRight, FiChevronDown, FiExternalLink } from "react-icons/fi";

interface ProjectSwipeDownListProps {
  projects: Project[];
}

export const ProjectSwipeDownList: React.FC<ProjectSwipeDownListProps> = ({
  projects,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<number | null>(null);

  const handleRowClick = (project: Project, e: React.MouseEvent) => {
    // If on mobile/touch, toggle the swipe-down drawer
    if (window.innerWidth <= 860) {
      e.preventDefault();
      setActiveMobileId((prev) => (prev === project.id ? null : project.id));
    }
  };

  return (
    <div className="project-swipe-list">
      {projects.map((project, index) => {
        const isHovered = hoveredId === project.id;
        const isActive = activeMobileId === project.id;
        const isOpen = isHovered || isActive;

        return (
          <div
            key={project.id}
            className={`project-swipe-item ${isOpen ? "is-open" : ""}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Minimalist Title Row */}
            <div
              className="project-title-row"
              onClick={(e) => handleRowClick(project, e)}
            >
              <div className="project-title-left">
                <span className="project-number">0{index + 1}</span>
                <h3 className="project-name-heading">{project.name}</h3>
              </div>

              <div className="project-title-right">
                {project.tag && (
                  <span className="project-tag-pill">{project.tag}</span>
                )}
                <div className="project-arrow-badge">
                  <FiChevronDown className={`chevron-icon ${isOpen ? "is-rotated" : ""}`} />
                  <FiArrowUpRight className="arrow-hover-icon" />
                </div>
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

                  {/* Right: Project Highlights & Actions */}
                  <div className="drawer-info-col">
                    <div className="drawer-meta-tags">
                      <span className="drawer-highlight-badge">PROJECT OVERVIEW</span>
                      {project.date && (
                        <span className="drawer-year-tag">{project.date}</span>
                      )}
                    </div>

                    {project.problemStatement && (
                      <div className="drawer-problem-box">
                        <span className="problem-pill">PROBLEM SOLVED</span>
                        <p>{project.problemStatement}</p>
                      </div>
                    )}

                    {project.details && (
                      <p
                        className="drawer-desc-text"
                        dangerouslySetInnerHTML={{ __html: project.details }}
                      ></p>
                    )}

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
