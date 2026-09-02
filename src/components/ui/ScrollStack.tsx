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
  stackOffset = 26,
  scaleStep = 0.04,
  rotationStep = 1.4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track dynamic transforms for each card as subsequent cards slide on top
  const [cardTransforms, setCardTransforms] = useState<
    { scale: number; rotation: number; brightness: number; blur: number }[]
  >(() =>
    projects.map(() => ({
      scale: 1,
      rotation: 0,
      brightness: 1,
      blur: 0,
    }))
  );

  const calculateStackTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const currentStackOffset = isMobile ? 18 : stackOffset;

    const newTransforms = projects.map((_, index) => {
      const cardEl = cardRefs.current[index];
      if (!cardEl) {
        return { scale: 1, rotation: 0, brightness: 1, blur: 0 };
      }

      // Count how many subsequent cards have landed on top of this card
      let cardsOnTop = 0;
      for (let j = index + 1; j < projects.length; j++) {
        const nextCard = cardRefs.current[j];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const targetStickyTop = (isMobile ? 70 : 85) + j * currentStackOffset;

          // When the next card reaches its sticky position, it is on top of this card
          if (nextRect.top <= targetStickyTop + 30) {
            const overlapProgress = Math.min(
              1,
              Math.max(0, (targetStickyTop + 30 - nextRect.top) / 100)
            );
            cardsOnTop += overlapProgress;
          }
        }
      }

      // Calculate smooth stacking scaling, tilt, and brightness
      const scale = Math.max(0.78, 1 - cardsOnTop * scaleStep);
      const rotDirection = index % 2 === 0 ? -1 : 1;
      const rotation = cardsOnTop * rotationStep * rotDirection;
      const brightness = Math.max(0.5, 1 - cardsOnTop * 0.12);
      const blur = cardsOnTop * 0.8;

      return { scale, rotation, brightness, blur };
    });

    setCardTransforms(newTransforms);
  }, [projects, stackOffset, scaleStep, rotationStep]);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(calculateStackTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial run
    calculateStackTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [calculateStackTransforms]);

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {projects.map((project, index) => {
        const transformState = cardTransforms[index] || {
          scale: 1,
          rotation: 0,
          brightness: 1,
          blur: 0,
        };

        return (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="scroll-stack-card-wrapper"
            style={{
              // CSS custom property for sticky top position
              top: `calc(85px + ${index * stackOffset}px)`,
              zIndex: index + 10,
            }}
          >
            <div
              className="scroll-stack-card"
              style={{
                transform: `scale(${transformState.scale}) rotate(${transformState.rotation}deg)`,
                filter: `brightness(${transformState.brightness}) blur(${transformState.blur}px)`,
                transformOrigin: "center 10%",
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
