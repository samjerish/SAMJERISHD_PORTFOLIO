import React, { useEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";
import type { Project } from "../../data/projects";
import { ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export interface ScrollStackProps {
  projects: Project[];
  stackOffset?: number;
  scaleStep?: number;
  rotationStep?: number;
  dissolveStep?: number;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  projects,
  stackOffset = 30,
  scaleStep = 0.024,
  rotationStep: _rotationStep = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 60/120fps direct hardware-accelerated style calculation without React state lag
  const updateStackTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 860;
    const currentStackOffset = isMobile ? 18 : stackOffset;
    const stickyTopBase = isMobile ? 54 : 75;
    const transitionZone = isMobile ? 200 : 280;
    const currentScaleStep = isMobile ? 0.015 : scaleStep;

    // Pre-calculate wrapper tops in a single read pass to eliminate layout thrashing
    const wrapperTops: number[] = new Array(projects.length);
    for (let j = 0; j < projects.length; j++) {
      const wrapperEl = cardWrapperRefs.current[j];
      wrapperTops[j] = wrapperEl ? wrapperEl.getBoundingClientRect().top : 99999;
    }

    for (let i = 0; i < projects.length; i++) {
      const cardEl = cardInnerRefs.current[i];
      if (!cardEl) continue;

      let cardsOnTop = 0;
      for (let j = i + 1; j < projects.length; j++) {
        const nextTop = wrapperTops[j];
        const targetStickyTop = stickyTopBase + j * currentStackOffset;

        // Progressive overlap detection window with smooth cubic ease-out
        if (nextTop <= targetStickyTop + transitionZone) {
          const rawProgress = Math.min(
            1,
            Math.max(
              0,
              (targetStickyTop + transitionZone - nextTop) / transitionZone
            )
          );
          // Cubic ease-out curve for natural, elegant physical deceleration
          const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
          cardsOnTop += easedProgress;
        }
      }

      // Smooth, squared stack with progressive depth scale - 100% SOLID OPAQUE (NO TRANSPARENCY)
      const scale = Math.max(isMobile ? 0.94 : 0.90, 1 - cardsOnTop * currentScaleStep);
      const brightness = Math.max(0.75, 1 - cardsOnTop * 0.04);

      // Direct GPU compositor mutation - card stays squarely aligned while shrinking into background
      cardEl.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      cardEl.style.opacity = "1";
      cardEl.style.filter = `brightness(${brightness.toFixed(2)})`;
    }
  }, [projects, stackOffset, scaleStep]);

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
              top: `calc(var(--stack-top-base, 75px) + var(--stack-offset, ${stackOffset}px) * ${index})`,
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
              role="article"
              aria-label={`Project card for ${project.brandName || project.name}`}
            >
              {/* Header Top Strip */}
              <div className="stack-card-header">
                <div className="stack-card-brand">
                  <span className="stack-card-index" aria-label={`Project 0${index + 1}`}>
                    0{index + 1}
                  </span>
                  <span className="stack-brand-name">
                    {project.brandName || project.name}
                  </span>
                  {project.tag && (
                    <span className="stack-card-tag">{project.tag}</span>
                  )}
                </div>

                {project.date && (
                  <span className="stack-card-year" aria-label="Year built">
                    {project.date}
                  </span>
                )}
              </div>

              {/* Main Card Body (2-Column Desktop Split) */}
              <div className="stack-card-body">
                {/* Left Side: Information Column - Title, 3-Line Description & Action Buttons Alone */}
                <div className="stack-card-info">
                  <div className="stack-card-heading-group">
                    <h2 className="stack-card-headline">
                      {project.brandName || project.name}
                    </h2>
                  </div>

                  {/* 3-Line Clean Description */}
                  <p className="stack-card-description">
                    {project.shortDesc || project.description}
                  </p>

                  {/* Action Buttons: Visit Link & Source Code Buttons */}
                  <div className="stack-card-actions">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stack-card-view-btn stack-live-btn"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-text="VISIT"
                        aria-label={`Visit ${project.name} live`}
                      >
                        <span>Visit</span>
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </a>
                    )}

                    {project.githubUrl && (
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
                  </div>
                </div>

                {/* Right Side: Project Photo (Borderless with curved corners alone) */}
                <div className="stack-card-media">
                  <div className="stack-photo-frame">
                    <img
                      src={project.image}
                      alt={`${project.name} interface preview`}
                      className="stack-project-img"
                      loading="lazy"
                      draggable={false}
                    />
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
