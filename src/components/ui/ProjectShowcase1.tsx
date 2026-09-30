import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./ProjectShowcase1.css";
import type { Project } from "../../data/projects";
import { ArrowUpRight, BookOpen, Layers, Sparkles, Cpu } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { ProjectBlogShowcase } from "./ProjectBlogShowcase";

export interface ProjectShowcase1Props {
  projects: Project[];
  activeCategory?: string;
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

export const ProjectShowcase1: React.FC<ProjectShowcase1Props> = ({
  projects,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Blog 5 Case Study Modal State
  const [selectedProjectForBlog, setSelectedProjectForBlog] = useState<Project | null>(null);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const openBlogShowcase = (proj: Project) => {
    setSelectedProjectForBlog(proj);
    setIsBlogOpen(true);
  };

  // Filter 4 premier flagship projects for the "Showcase 1" 4-item layout
  const showcaseProjects = useMemo(() => {
    // Select top 4 high-impact engineering projects
    const primary = projects.filter(
      (p) =>
        p.id === 2 || // Campus Virtual Tour 360
        p.id === 3 || // AI-Powered Customer Support
        p.id === 4 || // Matrix - Karunya Event Portal
        p.id === 5    // Autonomous Delivery Bot
    );
    return primary.length === 4 ? primary : projects.slice(0, 4);
  }, [projects]);

  // Animated background canvas (Aurora wave ripples & drifting particle constellation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = Math.min(48, Math.floor((width * height) / 22000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.15,
      color: Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(74, 222, 128, ", // Cyan & Emerald
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Fluid Ambient Aurora Waves
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time * 0.8) * 120,
        height * 0.25 + Math.cos(time * 0.6) * 80,
        20,
        width * 0.3,
        height * 0.25,
        width * 0.6
      );
      grad1.addColorStop(0, "rgba(56, 189, 248, 0.08)");
      grad1.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
      grad1.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(time * 0.7) * 100,
        height * 0.75 + Math.sin(time * 0.9) * 90,
        30,
        width * 0.75,
        height * 0.75,
        width * 0.65
      );
      grad2.addColorStop(0, "rgba(74, 222, 128, 0.07)");
      grad2.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
      grad2.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor Reactive Spotlight Ambient Glow
      if (mousePos.x > 0 && mousePos.y > 0) {
        const spotGrad = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          340
        );
        spotGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
        spotGrad.addColorStop(0.5, "rgba(74, 222, 128, 0.04)");
        spotGrad.addColorStop(1, "rgba(5, 5, 7, 0)");
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Constellation Particles & Connection Filaments
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos]);

  // Mouse move handler for container-wide interactive spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Expose CSS variables for hardware-accelerated border illumination
    containerRef.current.style.setProperty("--showcase-mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--showcase-mouse-y", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -1000, y: -1000 });
  }, []);

  // 3D Card Tilt Effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIdx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5; // subtle tilt
    const rotateY = ((x - centerX) / centerX) * 5.5;

    card.style.setProperty("--card-rotate-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--card-rotate-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--card-local-x", `${x}px`);
    card.style.setProperty("--card-local-y", `${y}px`);
    setActiveItemIndex(cardIdx);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
    setActiveItemIndex(null);
  };

  return (
    <div
      ref={containerRef}
      className="rb-showcase-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Animated Canvas Background (Aurora + Constellation) */}
      <canvas ref={canvasRef} className="rb-showcase-canvas" />

      {/* Decorative Grid Lines Overlay */}
      <div className="rb-showcase-grid-overlay" aria-hidden="true" />

      {/* Top Header Badge & Navigation Tabs */}
      <div className="rb-showcase-header">
        <div className="rb-showcase-tag-pill">
          <Sparkles size={13} className="rb-tag-sparkle" />
          <span>REACT BITS PRO • SHOWCASE 1</span>
        </div>

        <div className="rb-showcase-nav-pills">
          {showcaseProjects.map((p, idx) => (
            <button
              key={p.id}
              className={`rb-nav-item-btn ${activeItemIndex === idx ? "is-active" : ""}`}
              onClick={() => {
                const el = document.getElementById(`showcase-card-${p.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              data-cursor-text={`0${idx + 1}`}
            >
              <span className="rb-nav-num">0{idx + 1}</span>
              <span className="rb-nav-title">{p.brandName || p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Four Featured Items Grid */}
      <div className="rb-showcase-grid">
        {showcaseProjects.map((project, index) => {
          const itemNumber = `0${index + 1}`;
          const isHighlighted = activeItemIndex === index;

          return (
            <div
              key={project.id}
              id={`showcase-card-${project.id}`}
              className={`rb-showcase-card ${isHighlighted ? "is-spotlighted" : ""}`}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Glass Card Glowing Spotlight Border Layer */}
              <div className="rb-card-spotlight-border" aria-hidden="true" />

              <div className="rb-card-content">
                {/* Visual Screenshot Container with 3D Depth & Case Study Trigger */}
                <div
                  className="rb-card-media-wrapper"
                  onClick={() => openBlogShowcase(project)}
                  data-cursor-text="CASE STUDY"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openBlogShowcase(project);
                    }
                  }}
                  aria-label={`View detailed case study for ${project.name}`}
                >
                  <div className="rb-media-inner">
                    <img
                      src={project.image}
                      alt={`${project.name} interface preview`}
                      className="rb-media-image"
                      loading="lazy"
                    />

                    {/* Gradient Depth Vignette */}
                    <div className="rb-media-vignette" />



                    {/* Floating Item Number Indicator */}
                    <div className="rb-media-number-badge">
                      <span>{itemNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Information & Description Area */}
                <div className="rb-card-info">
                  <div className="rb-info-top-row">
                    <div className="rb-brand-badge">
                      <Layers size={13} className="rb-brand-icon" />
                      <span>{project.brandName || project.name}</span>
                    </div>
                    {project.readingTime && (
                      <span className="rb-reading-pill">{project.readingTime}</span>
                    )}
                  </div>

                  <h3 className="rb-card-title">{project.name}</h3>

                  <p className="rb-card-headline">
                    {project.headline || project.description}
                  </p>

                  <p className="rb-card-description">
                    {project.problemStatement || project.shortDesc || project.description}
                  </p>

                  {/* Architecture & Tech Stack Highlights */}
                  {project.techStack && (
                    <div className="rb-card-tech-chips">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="rb-tech-chip">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rb-tech-chip more-chip">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="rb-card-actions">
                    <button
                      className="rb-action-btn primary-btn"
                      onClick={() => openBlogShowcase(project)}
                      data-cursor-text="READ"
                      aria-label={`Open Blog 5 Case Study for ${project.name}`}
                    >
                      <BookOpen size={15} />
                      <span>Case Study</span>
                    </button>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="rb-action-btn secondary-btn"
                        data-cursor-text="VISIT"
                        aria-label={`Visit live demo for ${project.name}`}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rb-action-btn icon-btn"
                        data-cursor-text="CODE"
                        aria-label={`View GitHub repository for ${project.name}`}
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info: Total Projects Indicator & Stack Explore Note */}
      <div className="rb-showcase-footer">
        <div className="rb-footer-stat">
          <Cpu size={14} className="rb-footer-icon" />
          <span>Showing 4 Flagship Engineering Works • Full-Stack, AI & Spatial Web</span>
        </div>
        {onNavigate && (
          <button
            className="rb-footer-archive-btn"
            onClick={() => onNavigate("projects")}
            data-cursor-text="ARCHIVE"
          >
            <span>View Full Archive ({projects.length} Works)</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      {/* React Bits Pro "Blog 5" Fullscreen Case Study Overlay */}
      {selectedProjectForBlog && (
        <ProjectBlogShowcase
          project={selectedProjectForBlog}
          isOpen={isBlogOpen}
          onClose={() => setIsBlogOpen(false)}
          onSelectProject={(nextProj) => setSelectedProjectForBlog(nextProj)}
          projects={projects}
        />
      )}
    </div>
  );
};
