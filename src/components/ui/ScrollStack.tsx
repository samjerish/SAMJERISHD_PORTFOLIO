import React, { useEffect, useRef, useCallback, useState } from "react";
import "./ScrollStack.css";
import type { Project } from "../../data/projects";
import { Layers, ArrowUpRight, BookOpen } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { ProjectBlogShowcase } from "./ProjectBlogShowcase";

export interface ScrollStackProps {
  projects: Project[];
  stackOffset?: number;
  scaleStep?: number;
  rotationStep?: number;
  dissolveStep?: number;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  projects,
  stackOffset = 28,
  scaleStep = 0.026,
  rotationStep: _rotationStep = 0,
  dissolveStep = 0.025,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Project Blog 5 Case Study Modal State
  const [selectedProjectForBlog, setSelectedProjectForBlog] = useState<Project | null>(null);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const openBlogShowcase = (proj: Project) => {
    setSelectedProjectForBlog(proj);
    setIsBlogOpen(true);
  };

  // 60/120fps direct hardware-accelerated style calculation without React state lag
  const updateStackTransforms = useCallback(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 860;
    const currentStackOffset = isMobile ? 16 : stackOffset;
    const stickyTopBase = isMobile ? 54 : 75;
    const transitionZone = isMobile ? 220 : 300;
    const currentScaleStep = isMobile ? 0.016 : scaleStep;
    const currentDissolveStep = isMobile ? 0.018 : dissolveStep;

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

      // Smooth, squared stack with progressive depth scale so cards are never fully covered
      const scale = Math.max(isMobile ? 0.93 : 0.88, 1 - cardsOnTop * currentScaleStep);
      const opacity = Math.max(0.85, 1 - cardsOnTop * currentDissolveStep);
      const brightness = Math.max(0.72, 1 - cardsOnTop * 0.045);

      // Direct GPU compositor mutation - card stays squarely aligned while shrinking into background
      cardEl.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      cardEl.style.opacity = opacity.toFixed(3);
      cardEl.style.filter = `brightness(${brightness.toFixed(2)})`;
    }
  }, [projects, stackOffset, scaleStep, dissolveStep]);

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
              top: `calc(var(--stack-top-base, 75px) + var(--stack-offset, 28px) * ${index})`,
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
                  <div className="stack-brand-icon" aria-hidden="true">
                    <Layers size={16} strokeWidth={2.2} />
                  </div>
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

                    <button
                      type="button"
                      className="stack-card-link-btn stack-article-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBlogShowcase(project);
                      }}
                      data-cursor-text="READ"
                      aria-label={`Read case study for ${project.name}`}
                    >
                      <BookOpen size={15} />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Media Showcase Mockup (Clean Display, No Click to View Overlay) */}
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

      {/* Blog 5 Detailed Article Showcase with Scroll Progress and AI Input */}
      <ProjectBlogShowcase
        project={selectedProjectForBlog}
        projects={projects}
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
        onSelectProject={(newProject) => setSelectedProjectForBlog(newProject)}
      />
    </div>
  );
};
