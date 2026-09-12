import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import "./ProjectModal.css";
import type { Project } from "../../data/projects";
import { FiX, FiExternalLink } from "react-icons/fi";

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
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const isGestureActiveRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [isClosing, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (typeof window !== "undefined" && window.innerWidth > 768) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = performance.now();
    isGestureActiveRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (typeof window !== "undefined" && window.innerWidth > 768) return;
    const dx = e.touches[0].clientX - touchStartXRef.current;
    const dy = e.touches[0].clientY - touchStartYRef.current;

    if (!isGestureActiveRef.current) {
      if (touchStartXRef.current < 95 && dx > 10 && dx > Math.abs(dy) * 1.2) {
        isGestureActiveRef.current = true;
        setIsSwiping(true);
      }
    }

    if (isGestureActiveRef.current && dx >= 0) {
      setSwipeOffset(dx);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isGestureActiveRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    const dt = Math.max(1, performance.now() - touchStartTimeRef.current);
    const velocity = dx / dt;
    isGestureActiveRef.current = false;

    if (dx > 75 || velocity > 0.35) {
      setIsSwiping(false);
      handleClose();
    } else {
      setIsSwiping(false);
      setSwipeOffset(0);
    }
  };

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    return () => {
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("modal-open");

      window.scrollTo(0, scrollY);
      if (lenis) {
        if (typeof lenis.start === "function") lenis.start();
        if (typeof lenis.scrollTo === "function") {
          lenis.scrollTo(scrollY, { immediate: true });
        }
      }
    };
  }, [isOpen]);

  // Handle escape key
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

  const displayUrl = project.link
    ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `local://${project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.internal`;

  return createPortal(
    <div
      className={`modal-overlay ${isClosing ? "is-closing" : ""}`}
      style={{
        opacity: isSwiping ? Math.max(0, 1 - swipeOffset / 350) : undefined,
        transition: isSwiping ? "none" : undefined,
      }}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      role="presentation"
    >
      <div
        className={`dev-modal-container ${isClosing ? "is-closing" : ""}`}
        style={{
          transform: isSwiping ? `translate3d(${swipeOffset}px, 0, 0)` : undefined,
          transition: isSwiping ? "none" : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dev-modal-project-title"
      >
        {/* Top Window Chrome Bar */}
        <div className="dev-modal-topbar">
          <div className="dev-window-controls">
            <button
              type="button"
              className="window-traffic-dot dot-close"
              onClick={handleClose}
              title="Close"
              aria-label="Close window"
            />
            <span className="window-traffic-dot dot-min" />
            <span className="window-traffic-dot dot-max" />
            <span className="dev-window-tab-title">
              {project.brandName || project.name}
            </span>
          </div>

          <div className="dev-topbar-meta">
            <span className="dev-meta-pill">{project.tag || "Full-Stack System"}</span>
            {project.date && (
              <span className="dev-meta-date">{project.date}</span>
            )}
          </div>

          <button
            type="button"
            className="dev-close-action-btn"
            onClick={handleClose}
            aria-label="Close preview"
            title="Close (Esc)"
            data-cursor-text="CLOSE"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Two-Column Landscape Grid (Strict No-Scroll on Desktop) */}
        <div className="dev-modal-body">
          {/* Left Column: Realistic Browser Mockup Frame with Contained Screenshot */}
          <div className="dev-col-preview">
            <div className="dev-browser-window">
              {/* Browser Address Bar */}
              <div className="dev-browser-header">
                <div className="dev-address-capsule">
                  <span className="dev-lock-icon" aria-hidden="true">
                    🔒
                  </span>
                  <span className="dev-address-text">{displayUrl}</span>
                </div>
                {isLiveProject && (
                  <span className="dev-live-indicator">
                    <span className="live-pulse-dot" />
                    <span>ONLINE</span>
                  </span>
                )}
              </div>

              {/* Contained Screenshot Viewport */}
              <div className="dev-screenshot-viewport">
                <img
                  src={project.image}
                  alt={project.name}
                  className="dev-screenshot-img"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>

            {/* Action Bar Beneath Browser Window */}
            <div className="dev-action-bar">
              {isLiveProject ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-visit-btn"
                  data-cursor-text="VISIT"
                >
                  <span>Open Live App</span>
                  <FiExternalLink size={13} />
                </a>
              ) : (
                <div className="dev-arch-badge">
                  <span className="arch-dot" />
                  <span>System &amp; Database Project</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Engineering Details, Architecture & Tech Stack */}
          <div className="dev-col-narrative">
            {/* Title & Headline */}
            <div className="dev-header-block">
              {project.pills && project.pills.length > 0 && (
                <div className="dev-pills-row">
                  {project.pills.map((pill, idx) => (
                    <span key={idx} className="dev-pill-tag">
                      {pill}
                    </span>
                  ))}
                </div>
              )}

              <h2 id="dev-modal-project-title" className="dev-title">
                {project.name}
              </h2>

              {project.headline && (
                <p className="dev-headline">{project.headline}</p>
              )}
            </div>

            {/* About the Project Overview */}
            <div className="dev-section-box">
              <span className="dev-section-label">About the Project</span>
              <p
                className="dev-section-text"
                dangerouslySetInnerHTML={{
                  __html:
                    project.shortDesc || project.details || project.description,
                }}
              />
            </div>

            {/* Challenge & Solution Cards */}
            <div className="dev-specs-grid">
              <div className="dev-spec-card">
                <span className="dev-spec-label">The Problem</span>
                <p className="dev-spec-text">{project.problemStatement}</p>
              </div>

              <div className="dev-spec-card">
                <span className="dev-spec-label">The Solution</span>
                <p className="dev-spec-text">{project.solution}</p>
              </div>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="dev-tech-row">
                <span className="dev-tech-label">Built With</span>
                <div className="dev-tech-tags">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="dev-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
