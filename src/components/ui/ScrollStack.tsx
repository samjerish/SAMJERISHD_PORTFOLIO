import React, { useEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";
import type { Project } from "../../data/projects";
import { Layers, ArrowUpRight } from "lucide-react";

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
            >
              {/* Header Top Strip */}
              <div className="stack-card-header">
                <div className="stack-card-brand">
                  <div className="stack-brand-icon">
                    <Layers size={18} strokeWidth={2.2} />
                  </div>
                  <span className="stack-brand-name">
                    {project.brandName || project.name}
                  </span>
                </div>

                <div className="stack-card-pills">
                  {project.pills?.map((pill) => (
                    <span key={pill} className="stack-pill">
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="stack-card-index">
                  <span className="index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="index-divider">/</span>
                  <span className="index-total">
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Main Card Body (2-Column Desktop Split) */}
              <div className="stack-card-body">
                {/* Left Side: Information Column */}
                <div className="stack-card-info">
                  <h2 className="stack-card-headline">
                    {project.headline || project.name}
                  </h2>

                  <p
                    className="stack-card-desc"
                    dangerouslySetInnerHTML={{
                      __html: project.shortDesc || project.details,
                    }}
                  />

                  {project.techStack && (
                    <div className="stack-card-tech">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="stack-tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {Boolean(project.link) &&
                    (project.name.toUpperCase().includes("FOCUSFLOW") ||
                      project.name.toUpperCase().includes("ECOTRACKER")) && (
                      <div className="stack-card-actions">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stack-card-view-btn"
                          onClick={(e) => e.stopPropagation()}
                          data-cursor-text="VIEW"
                        >
                          <span>View Project</span>
                          <ArrowUpRight size={17} strokeWidth={2.2} />
                        </a>
                      </div>
                    )}
                </div>

                {/* Right Side: Media Showcase Mockup */}
                <div className="stack-card-media">
                  <div className="stack-device-frame">
                    <div className="stack-device-notch">
                      <div className="stack-device-speaker" />
                    </div>
                    <div className="stack-device-screen">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="stack-project-img"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="stack-glare-overlay" />
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
