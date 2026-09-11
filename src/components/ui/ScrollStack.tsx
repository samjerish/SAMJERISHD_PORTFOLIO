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
  stackOffset = 22,
  scaleStep = 0.038,
  rotationStep = 1.3,
  dissolveStep = 0.15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 60/120fps direct hardware-accelerated style calculation without React state lag
  const updateStackTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const currentStackOffset = isMobile ? 14 : stackOffset;
    const stickyTopBase = isMobile ? 60 : 75;

    for (let i = 0; i < projects.length; i++) {
      const cardEl = cardInnerRefs.current[i];
      if (!cardEl) continue;

      let cardsOnTop = 0;
      for (let j = i + 1; j < projects.length; j++) {
        const nextWrapper = cardWrapperRefs.current[j];
        if (nextWrapper) {
          const nextRect = nextWrapper.getBoundingClientRect();
          const targetStickyTop = stickyTopBase + j * currentStackOffset;

          // Progressive overlap detection window with smooth quadratic ease-out
          if (nextRect.top <= targetStickyTop + 180) {
            const rawProgress = Math.min(
              1,
              Math.max(0, (targetStickyTop + 180 - nextRect.top) / 180)
            );
            // Quadratic ease-out curve for natural physical resistance
            const easedProgress = rawProgress * (2 - rawProgress);
            cardsOnTop += easedProgress;
          }
        }
      }

      // Smooth stacking properties: scale down, alternate subtle tilt, dissolve
      const scale = Math.max(0.82, 1 - cardsOnTop * scaleStep);
      const rotDirection = i % 2 === 0 ? -1 : 1;
      const rotation = cardsOnTop * rotationStep * rotDirection;
      const opacity = Math.max(0.2, 1 - cardsOnTop * dissolveStep);
      const brightness = Math.max(0.52, 1 - cardsOnTop * 0.08);

      // Direct GPU compositor mutation
      cardEl.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) rotate(${rotation.toFixed(2)}deg)`;
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
        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 768;
        const currentStackOffset = isMobile ? 14 : stackOffset;
        const stickyTop = (isMobile ? 60 : 75) + index * currentStackOffset;

        return (
          <div
            key={project.id}
            ref={(el) => {
              cardWrapperRefs.current[index] = el;
            }}
            className="scroll-stack-card-wrapper"
            style={{
              top: `${stickyTop}px`,
              zIndex: index + 10,
            }}
          >
            <div
              ref={(el) => {
                cardInnerRefs.current[index] = el;
              }}
              className={`scroll-stack-card ${project.cardClass || ""}`}
              style={{
                transformOrigin: "center 15%",
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
