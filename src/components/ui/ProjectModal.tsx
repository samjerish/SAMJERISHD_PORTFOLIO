import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./ProjectModal.css";
import type { Project } from "../../data/projects";
import { FiX, FiExternalLink, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 260);
  }, [isClosing, onClose]);

  // Prevent scrolling on the body and lock Lenis smooth scroll when modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // Handle escape key to close smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isClosing, handleClose]);

  if (!isOpen || !project) return null;

  const isLiveProject =
    Boolean(project.link) &&
    (project.name.toUpperCase().includes("FOCUSFLOW") ||
      project.name.toUpperCase().includes("ECOTRACKER"));

  return createPortal(
    <div
      className={`modal-overlay ${isClosing ? "is-closing" : ""}`}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className={`modal-container modal-popup-clean ${isClosing ? "is-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="modal-glow-ambient" />

        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close project preview"
          title="Close (Esc)"
        >
          <FiX />
        </button>

        {/* Content Showcase (No Picture) */}
        <div className="modal-inner-content">
          {/* Header Block */}
          <div className="modal-header-block">
            <div className="modal-top-meta-row">
              {project.brandName && (
                <span className="modal-brand-badge">{project.brandName}</span>
              )}
              {project.date && (
                <span className="modal-date-badge">{project.date}</span>
              )}
              {project.tag && (
                <span className="modal-tag-badge">{project.tag}</span>
              )}
            </div>

            <h2 className="modal-title">{project.name}</h2>

            {project.headline && (
              <p className="modal-headline">{project.headline}</p>
            )}

            {project.pills && project.pills.length > 0 && (
              <div className="modal-pills-row">
                {project.pills.map((pill, idx) => (
                  <span key={idx} className="modal-meta-pill">
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Overview Section */}
          <div className="modal-section modal-section-overview">
            <h3 className="modal-section-heading">Overview</h3>
            <div
              className="modal-section-desc"
              dangerouslySetInnerHTML={{
                __html: project.details || project.description,
              }}
            />
          </div>

          {/* Split: Problem & Solution Callouts */}
          <div className="modal-split">
            <div className="modal-callout problem">
              <div className="callout-header">
                <FiAlertCircle className="callout-icon" />
                <h3 className="callout-heading">The Problem</h3>
              </div>
              <p className="callout-desc">{project.problemStatement}</p>
            </div>

            <div className="modal-callout solution">
              <div className="callout-header">
                <FiCheckCircle className="callout-icon" />
                <h3 className="callout-heading">The Solution</h3>
              </div>
              <p className="callout-desc">{project.solution}</p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="modal-tech-stack-row">
              <span className="tech-stack-lbl">TECH ARSENAL:</span>
              <div className="tech-stack-pills">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-stack-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer (Only for FocusFlow and EcoTracker) */}
          {isLiveProject && (
            <div className="modal-footer">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-view-btn"
                data-cursor-text="VISIT"
              >
                <span>VIEW PROJECT</span>
                <FiExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
