import React, { useEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";
import type { Project } from "../../data/projects";
import { Layers, ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export interface ScrollStackProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  stackOffset?: number;
  scaleStep?: number;
  rotationStep?: number;
  dissolveStep?: number;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  projects,
  onProjectClick,
  stackOffset = 26,
  scaleStep = 0.024,
  rotationStep = 0,
  dissolveStep = 0.025,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 60/120fps direct hardware-accelerated style calculation without React state lag
  const updateStackTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const currentStackOffset = isMobile ? 16 : stackOffset;
    const stickyTopBase = isMobile ? 55 : 75;
    const transitionZone = isMobile ? 240 : 360;

    for (let i = 0; i < projects.length; i++) {
      const cardEl = cardInnerRefs.current[i];
      if (!cardEl) continue;

      let cardsOnTop = 0;
      for (let j = i + 1; j < projects.length; j++) {
        const nextWrapper = cardWrapperRefs.current[j];
        if (nextWrapper) {
          const nextRect = nextWrapper.getBoundingClientRect();
          const targetStickyTop = stickyTopBase + j * currentStackOffset;

          // Progressive overlap detection window with smooth cubic ease-out
          if (nextRect.top <= targetStickyTop + transitionZone) {
            const rawProgress = Math.min(
              1,
              Math.max(
                0,
                (targetStickyTop + transitionZone - nextRect.top) / transitionZone
              )
            );
            // Cubic ease-out curve for natural, elegant physical deceleration
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
            cardsOnTop += easedProgress;
          }
        }
      }

      // Smooth, squared, perfectly aligned stack without unwanted tilting
      const scale = Math.max(0.88, 1 - cardsOnTop * scaleStep);
      const opacity = Math.max(0.85, 1 - cardsOnTop * dissolveStep);
      const brightness = Math.max(0.68, 1 - cardsOnTop * 0.05);
      const rotation = rotationStep > 0 ? (i % 2 === 0 ? -1 : 1) * cardsOnTop * rotationStep : 0;

      // Direct GPU compositor mutation - perfectly aligned and squared
      cardEl.style.transform = rotation !== 0
        ? `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) rotate(${rotation.toFixed(2)}deg)`
        : `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      cardEl.style.opacity = opacity.toFixed(3);
      cardEl.style.filter = `brightness(${brightness.toFixed(2)})`;
    }
  }, [projects, stackOffset, scaleStep, rotationStep, dissolveStep]);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateStackTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Synchronize with Lenis smooth scrolling if present on window
    const lenis = (
      window as unknown as {
        __lenis?: {
          on: (event: string, cb: () => void) => void;
          off?: (event: string, cb: () => void) => void;
        };
      }
    ).__lenis;

    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    // Initial position evaluation
    updateStackTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
      cancelAnimationFrame(animId);
    };
  }, [updateStackTransforms]);

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {projects.map((project, index) => {
        const hasLiveDemo = Boolean(project.link);
        const hasGithub = Boolean(project.githubUrl);

        return (
          <div
            key={project.id}
            ref={(el) => {
              cardWrapperRefs.current[index] = el;
            }}
            className="scroll-stack-card-wrapper"
            style={{
              top: `calc(var(--stack-top-base, 75px) + var(--stack-offset, 26px) * ${index})`,
              zIndex: index + 10,
            }}
          >
            <div
              ref={(el) => {
                cardInnerRefs.current[index] = el;
              }}
              className={`scroll-stack-card ${project.cardClass || ""}`}
              style={{
                transformOrigin: "top center",
              }}
              onClick={() => onProjectClick?.(project)}
              data-cursor-text="VIEW"
              role="article"
              aria-label={`Project card for ${project.brandName || project.name}`}
            >
              {/* Header Top Strip */}
              <div className="stack-card-header">
                <div className="stack-card-brand">
                  <div className="stack-brand-icon" aria-hidden="true">
                    <Layers size={18} strokeWidth={2.2} />
                  </div>
                  <span className="stack-brand-name">
                    {project.brandName || project.name}
                  </span>
                </div>

                <div className="stack-card-pills" aria-label="Technologies used">
                  {project.pills?.map((pill) => (
                    <span key={pill} className="stack-pill">
                      {pill}
                    </span>
                  ))}
                </div>

                {project.date && (
                  <span className="stack-card-year" aria-label="Year built">
                    {project.date}
                  </span>
                )}
              </div>

              {/* Main Card Body (2-Column Desktop Split) */}
              <div className="stack-card-body">
                {/* Left Side: Information Column */}
                <div className="stack-card-info">
                  <h2 className="stack-card-headline">
                    {project.headline || project.name}
                  </h2>

                  <p className="stack-card-desc">{project.shortDesc}</p>

                  {/* Grounded Technical Notes */}
                  <div className="stack-card-notes">
                    <div className="stack-note-item">
                      <span className="stack-note-title">Why I built it:</span>
                      <p className="stack-note-body">{project.problemStatement}</p>
                    </div>
                    <div className="stack-note-item">
                      <span className="stack-note-title">Technical highlight:</span>
                      <p className="stack-note-body">{project.solution}</p>
                    </div>
                  </div>

                  {project.techStack && (
                    <div className="stack-card-tech" aria-label="Tech Stack">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="stack-tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons: Live Demo, GitHub, Case Study */}
                  <div className="stack-card-actions">
                    {hasLiveDemo && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stack-card-view-btn stack-live-btn"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-text="DEMO"
                        aria-label={`Open live demo for ${project.name}`}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </a>
                    )}

                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stack-card-link-btn stack-github-btn"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-text="CODE"
                        aria-label={`View ${project.name} source code on GitHub`}
                      >
                        <FiGithub size={15} />
                        <span>Source Code</span>
                      </a>
                    )}

                    <button
                      type="button"
                      className="stack-card-link-btn stack-case-study-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick?.(project);
                      }}
                      data-cursor-text="DETAILS"
                      aria-label={`View deep-dive case study for ${project.name}`}
                    >
                      <span>Case Study</span>
                      <span className="case-arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Media Showcase Mockup */}
                <div className="stack-card-media">
                  <div className="stack-device-frame">
                    <div className="stack-device-notch" aria-hidden="true">
                      <div className="stack-device-speaker" />
                    </div>
                    <div className="stack-device-screen">
                      <img
                        src={project.image}
                        alt={`${project.name} interface preview`}
                        className="stack-project-img"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="stack-glare-overlay" aria-hidden="true" />
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
