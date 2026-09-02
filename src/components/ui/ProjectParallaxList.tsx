import React, { useEffect, useRef, useState } from "react";
import "./ProjectParallaxList.css";
import type { Project } from "../../data/projects";

interface ProjectParallaxListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectParallaxList: React.FC<ProjectParallaxListProps> = ({
  projects,
  onProjectClick,
}) => {
  return (
    <div className="parallax-projects-list">
      {projects.map((project, index) => (
        <ProjectParallaxItem
          key={project.id}
          project={project}
          index={index}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  );
};

interface ProjectItemProps {
  project: Project;
  index: number;
  onProjectClick: (project: Project) => void;
}

const ProjectParallaxItem: React.FC<ProjectItemProps> = ({
  project,
  index,
  onProjectClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const node = itemRef.current;
    if (node) observer.observe(node);

    // Subtle scroll parallax tracking on the image
    const handleScroll = () => {
      if (!itemRef.current || !imageRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // When the card is within the viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollFraction = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const parallaxOffsetY = scrollFraction * 24; // Subtle smooth shift
        imageRef.current.style.transform = `translate3d(0, ${parallaxOffsetY}px, 0) scale(1.08)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (node) observer.unobserve(node);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const isEven = index % 2 === 1;

  return (
    <div
      ref={itemRef}
      className={`parallax-project-card ${isVisible ? "is-in-view" : ""} ${
        isEven ? "is-reversed" : ""
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
          : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onProjectClick(project)}
    >
      {/* Spotlight Cursor Reflection */}
      <div
        className="parallax-card-glare"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
        }}
      />

      {/* Media Window Column */}
      <div className="parallax-media-col">
        <div className="parallax-media-frame">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.name}
            className="parallax-project-image"
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="parallax-image-overlay">
            <span className="parallax-hover-hint">
              <span>View Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Info Column */}
      <div className="parallax-info-col">
        {/* Top Meta Line */}
        <div className="parallax-meta-header">
          <span className="parallax-number">0{index + 1}</span>
          <div className="parallax-tag-badge">
            <span className="tag-pulse-dot"></span>
            <span>{project.tag || "Full Stack Application"}</span>
          </div>
          {project.date && <span className="parallax-year">{project.date}</span>}
        </div>

        {/* Project Title */}
        <h3 className="parallax-project-title">{project.name}</h3>

        {/* Highlighted Problem Statement */}
        {project.problemStatement && (
          <div className="parallax-problem-box">
            <div className="problem-pill">PROBLEM SOLVED</div>
            <p>{project.problemStatement}</p>
          </div>
        )}

        {/* Project Details Description */}
        {project.details && (
          <p
            className="parallax-project-desc"
            dangerouslySetInnerHTML={{ __html: project.details }}
          ></p>
        )}

        {/* Action Button Row */}
        <div className="parallax-action-row">
          <button
            className="parallax-primary-btn"
            onClick={(e) => {
              e.stopPropagation();
              onProjectClick(project);
            }}
          >
            <span>Explore Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="parallax-demo-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
