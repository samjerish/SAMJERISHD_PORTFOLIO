import React, { useEffect, useRef, useState, useCallback } from "react";
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
  stackOffset = 32,
  scaleStep = 0.045,
  rotationStep = 1.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State to track scroll transforms for each card
  const [cardTransforms, setCardTransforms] = useState<
    { scale: number; rotation: number; brightness: number; blur: number; translateY: number }[]
  >(() =>
    projects.map(() => ({
      scale: 1,
      rotation: 0,
      brightness: 1,
      blur: 0,
      translateY: 0,
    }))
  );

  const updateTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const newTransforms = projects.map((_, index) => {
      const cardEl = cardRefs.current[index];
      if (!cardEl) {
        return { scale: 1, rotation: 0, brightness: 1, blur: 0, translateY: 0 };
      }

      // Check how many subsequent cards have scrolled past their sticky point
      let overlapCount = 0;
      for (let j = index + 1; j < projects.length; j++) {
        const nextCard = cardRefs.current[j];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const targetStickyTop = 90 + j * stackOffset;

          // If next card has reached or passed its sticky top
          if (nextRect.top <= targetStickyTop + 20) {
            const distancePast = (targetStickyTop + 20) - nextRect.top;
            const progress = Math.min(1, Math.max(0, distancePast / 150));
            overlapCount += progress;
          }
        }
      }

      const totalRemaining = projects.length - 1 - index;
      const effectiveOverlap = Math.min(totalRemaining, overlapCount);

      // Transforms
      const scale = Math.max(0.82, 1 - effectiveOverlap * scaleStep);
      const rotDir = index % 2 === 0 ? -1 : 1;
      const rotation = effectiveOverlap * rotationStep * rotDir;
      const brightness = Math.max(0.55, 1 - effectiveOverlap * 0.14);
      const blur = effectiveOverlap * 1.2;
      const translateY = -effectiveOverlap * 6;

      return { scale, rotation, brightness, blur, translateY };
    });

    setCardTransforms(newTransforms);
  }, [projects, scaleStep, rotationStep, stackOffset]);

  useEffect(() => {
    let animFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial calculation
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [updateTransforms]);

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {projects.map((project, index) => {
        const transformState = cardTransforms[index] || {
          scale: 1,
          rotation: 0,
          brightness: 1,
          blur: 0,
          translateY: 0,
        };

        const stickyTop = `calc(90px + ${index * stackOffset}px)`;

        return (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="scroll-stack-card-wrapper"
            style={{
              top: stickyTop,
              zIndex: index + 10,
            }}
          >
            <div
              className="scroll-stack-card"
              style={{
                transform: `translate3d(0, ${transformState.translateY}px, 0) scale(${transformState.scale}) rotate(${transformState.rotation}deg)`,
                filter: `brightness(${transformState.brightness}) blur(${transformState.blur}px)`,
                transformOrigin: "center 15%",
              }}
              onClick={() => onProjectClick && onProjectClick(project)}
            >
              {/* Card Top Pill & Header */}
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
