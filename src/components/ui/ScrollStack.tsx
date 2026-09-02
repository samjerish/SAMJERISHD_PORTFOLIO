import React, { useEffect, useRef, useState } from "react";
import "./ScrollStack.css";
import type { Project } from "../../data/projects";

export interface ScrollStackProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  stackOffset?: number;
  scaleStep?: number;
  rotationStep?: number;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  projects,
  onProjectClick,
  stackOffset = 24,
  scaleStep = 0.035,
  rotationStep = 1.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const cardElements = containerRef.current.querySelectorAll<HTMLDivElement>(
        ".scroll-stack-card-wrapper"
      );

      const newProgress: number[] = [];

      cardElements.forEach((cardEl, index) => {
        const rect = cardEl.getBoundingClientRect();
        const cardTop = rect.top;
        const stickyTop = 100 + index * stackOffset;

        // Progress from 0 (just reaching sticky top) to 1 (covered by next card)
        if (cardTop <= stickyTop) {
          const distanceOverSticky = stickyTop - cardTop;
          const nextCardDistance = rect.height;
          const progress = Math.min(
            1,
            Math.max(0, distanceOverSticky / nextCardDistance)
          );
          newProgress.push(progress);
        } else {
          newProgress.push(0);
        }
      });

      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects.length, stackOffset]);

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {projects.map((project, index) => {
        const progress = scrollProgress[index] || 0;
        const totalCards = projects.length;
        const remainingCards = totalCards - index - 1;

        // Dynamic stacked transforms as subsequent cards cover this one
        const scale = Math.max(0.85, 1 - progress * scaleStep * remainingCards);
        const rotationDirection = index % 2 === 0 ? -1 : 1;
        const rotation = progress * rotationStep * rotationDirection;
        const brightness = Math.max(0.65, 1 - progress * 0.3);
        const blur = progress * 1.5;

        return (
          <div
            key={project.id}
            className="scroll-stack-card-wrapper"
            style={{
              top: `calc(11vh + ${index * stackOffset}px)`,
              zIndex: index + 1,
            }}
          >
            <div
              className="scroll-stack-card"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                filter: `brightness(${brightness}) blur(${blur}px)`,
                transformOrigin: "center top",
              }}
              onClick={() => onProjectClick && onProjectClick(project)}
            >
              {/* Card Header Top Strip */}
              <div className="stack-card-header">
                <div className="stack-card-index">
                  <span className="index-number">0{index + 1}</span>
                  <span className="index-total">/ 0{projects.length}</span>
                </div>
                <div className="stack-card-tag-pill">
                  <span className="tag-dot"></span>
                  <span>{project.tag || "Full Stack Application"}</span>
                </div>
                {project.date && (
                  <div className="stack-card-year">{project.date}</div>
                )}
              </div>

              {/* Main Card Content Split */}
              <div className="stack-card-body">
                {/* Left Side: Information */}
                <div className="stack-card-info">
                  <h3 className="stack-card-title">{project.name}</h3>

                  {project.problemStatement && (
                    <div className="stack-card-problem">
                      <span className="problem-badge">PROBLEM SOLVED</span>
                      <p>{project.problemStatement}</p>
                    </div>
                  )}

                  {project.details && (
                    <p
                      className="stack-card-desc"
                      dangerouslySetInnerHTML={{ __html: project.details }}
                    ></p>
                  )}

                  <div className="stack-card-actions">
                    <button
                      className="stack-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onProjectClick) onProjectClick(project);
                      }}
                    >
                      <span>View Project Details</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="stack-card-link-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Visual Showcase Preview */}
                <div className="stack-card-media">
                  <div className="media-frame">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="stack-project-img"
                      loading="lazy"
                    />
                    <div className="media-glare-overlay"></div>
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
