import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import "./ProjectBlogShowcase.css";
import type { Project } from "../../data/projects";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiClock,
  FiCpu,
  FiSend,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
} from "react-icons/fi";
import { Sparkles, Layers } from "lucide-react";

interface ProjectBlogShowcaseProps {
  project: Project | null;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectBlogShowcase: React.FC<ProjectBlogShowcaseProps> = ({
  project,
  projects,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Handle closing with clean fade-out
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [isClosing, onClose]);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const origPos = document.body.style.position;
    const origTop = document.body.style.top;
    const origWidth = document.body.style.width;
    const origOverflow = document.body.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = origPos;
      document.body.style.top = origTop;
      document.body.style.width = origWidth;
      document.body.style.overflow = origOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Reset scroll and AI states when project changes
  useEffect(() => {
    if (isOpen && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
      setScrollProgress(0);
      setAiQuery("");
      setAiResponse(null);
      setActiveChip(null);
    }
  }, [project, isOpen]);

  // Top Reading Scroll Progress Bar
  const handleScroll = () => {
    const el = modalScrollRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      const progress = (el.scrollTop / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  // Quick AI Query Chips Handler
  const handleQuickPrompt = (chipKey: "problem" | "techStack" | "architecture" | "impact", label: string) => {
    if (!project) return;
    setActiveChip(label);
    setAiQuery(label);
    setIsAiLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAiLoading(false);
      if (project.aiInsights && project.aiInsights[chipKey]) {
        setAiResponse(project.aiInsights[chipKey]);
      } else {
        setAiResponse(project.description);
      }
    }, 320);
  };

  const handleCustomAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || !project) return;
    setIsAiLoading(true);
    setAiResponse(null);

    const queryLower = aiQuery.toLowerCase();
    setTimeout(() => {
      setIsAiLoading(false);
      if (queryLower.includes("tech") || queryLower.includes("stack") || queryLower.includes("react") || queryLower.includes("python")) {
        setAiResponse(project.aiInsights?.techStack || `Built with: ${project.techStack?.join(", ")}`);
      } else if (queryLower.includes("problem") || queryLower.includes("why") || queryLower.includes("solve")) {
        setAiResponse(project.aiInsights?.problem || project.problemStatement || project.description);
      } else if (queryLower.includes("arch") || queryLower.includes("how") || queryLower.includes("built")) {
        setAiResponse(project.aiInsights?.architecture || project.architecture || project.solution || project.description);
      } else if (queryLower.includes("impact") || queryLower.includes("result") || queryLower.includes("metric")) {
        setAiResponse(project.aiInsights?.impact || project.impact || "Actively used in real production environments.");
      } else {
        setAiResponse(
          `${project.name} is a ${project.tag} designed by Sam Jerish. ${project.solution || project.description} It addresses key workflows using ${project.techStack?.slice(0, 3).join(", ")}.`
        );
      }
    }, 380);
  };

  if (!isOpen || !project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return createPortal(
    <div
      className={`blog-showcase-backdrop ${isClosing ? "is-closing" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Case Study`}
    >
      {/* Top Fixed Reading Progress Bar */}
      <div className="blog-top-progress-track">
        <div
          className="blog-top-progress-bar"
          style={{ width: `${scrollProgress}%` }}
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div
        ref={modalScrollRef}
        className="blog-showcase-scroll-viewport"
        onScroll={handleScroll}
      >
        <div className="blog-showcase-container">
          {/* Header Navigation Bar */}
          <header className="blog-header-bar">
            <div className="blog-header-left">
              <div className="blog-brand-pill">
                <Layers size={14} className="blog-brand-icon" />
                <span>{project.brandName || project.name}</span>
              </div>
              <div className="blog-reading-pill">
                <FiClock size={13} />
                <span>{project.readingTime || "4 min read"}</span>
              </div>
            </div>

            <button
              className="blog-close-btn"
              onClick={handleClose}
              aria-label="Close Case Study"
              data-cursor-text="CLOSE"
            >
              <FiX size={18} />
              <span className="close-text">ESC</span>
            </button>
          </header>

          {/* Article Main Hero */}
          <article className="blog-article-content">
            <div className="blog-meta-breadcrumbs">
              <span className="blog-category-tag">{project.tag || "Featured Project"}</span>
              <span className="blog-meta-dot">•</span>
              <span className="blog-date-tag">{project.date || "2026"}</span>
            </div>

            <h1 className="blog-article-title">{project.name}</h1>

            {project.headline && (
              <p className="blog-article-subtitle">{project.headline}</p>
            )}

            {/* Quick Link Actions */}
            <div className="blog-action-row">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-primary-link"
                >
                  <span>Launch Live Demo</span>
                  <FiExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-secondary-link"
                >
                  <FiGithub size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Featured Image Banner */}
            <div className="blog-hero-media-wrapper">
              <div className="blog-media-frame">
                <img
                  src={project.image}
                  alt={`${project.name} showcase`}
                  className="blog-hero-image"
                />
                <div className="blog-media-glare" />
              </div>
            </div>

            {/* REACT BITS PRO "BLOG 5" SIGNATURE FEATURE: Interactive AI Input Section */}
            <section className="blog-ai-assistant-card">
              <div className="blog-ai-header">
                <div className="blog-ai-title-wrap">
                  <div className="blog-ai-sparkle-halo">
                    <Sparkles size={16} className="sparkle-icon" />
                  </div>
                  <div>
                    <h3 className="blog-ai-heading">Project AI Assistant</h3>
                    <p className="blog-ai-caption">
                      Instant contextual answers regarding technical design, problem statement, and impact.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Chips */}
              <div className="blog-ai-chips-list">
                <button
                  type="button"
                  className={`blog-ai-chip ${activeChip === "Problem Statement" ? "is-active" : ""}`}
                  onClick={() => handleQuickPrompt("problem", "Problem Statement")}
                >
                  <FiAlertCircle size={13} />
                  <span>What problem does this solve?</span>
                </button>
                <button
                  type="button"
                  className={`blog-ai-chip ${activeChip === "Tech Stack Breakdown" ? "is-active" : ""}`}
                  onClick={() => handleQuickPrompt("techStack", "Tech Stack Breakdown")}
                >
                  <FiCpu size={13} />
                  <span>Tech Stack breakdown</span>
                </button>
                <button
                  type="button"
                  className={`blog-ai-chip ${activeChip === "Architecture & Challenges" ? "is-active" : ""}`}
                  onClick={() => handleQuickPrompt("architecture", "Architecture & Challenges")}
                >
                  <FiZap size={13} />
                  <span>Key architecture & challenges</span>
                </button>
                <button
                  type="button"
                  className={`blog-ai-chip ${activeChip === "Real-World Impact" ? "is-active" : ""}`}
                  onClick={() => handleQuickPrompt("impact", "Real-World Impact")}
                >
                  <FiCheckCircle size={13} />
                  <span>Real-World impact</span>
                </button>
              </div>

              {/* Custom Input Form */}
              <form className="blog-ai-input-form" onSubmit={handleCustomAiSubmit}>
                <div className="blog-ai-input-container">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder={`Ask AI anything about ${project.brandName || project.name}...`}
                    className="blog-ai-input"
                  />
                  <button
                    type="submit"
                    className="blog-ai-send-btn"
                    disabled={!aiQuery.trim()}
                    aria-label="Send Query"
                  >
                    <FiSend size={15} />
                  </button>
                </div>
              </form>

              {/* AI Response Display */}
              {isAiLoading && (
                <div className="blog-ai-loading">
                  <div className="ai-pulse-dot" />
                  <span>Synthesizing project intelligence...</span>
                </div>
              )}

              {aiResponse && !isAiLoading && (
                <div className="blog-ai-response-box">
                  <div className="ai-response-badge">
                    <Sparkles size={13} />
                    <span>AI Analysis</span>
                  </div>
                  <p className="ai-response-text">{aiResponse}</p>
                </div>
              )}
            </section>

            {/* Detailed Case Study Sections */}
            <div className="blog-body-sections">
              {/* Section 1: Overview */}
              <section className="blog-section-block">
                <h2 className="blog-section-heading">Overview & Purpose</h2>
                <p className="blog-paragraph">{project.shortDesc || project.description}</p>
              </section>

              {/* Section 2: Problem Statement */}
              {project.problemStatement && (
                <section className="blog-section-block">
                  <h2 className="blog-section-heading">The Problem</h2>
                  <div className="blog-callout-box">
                    <p className="blog-callout-text">{project.problemStatement}</p>
                  </div>
                </section>
              )}

              {/* Section 3: Solution & Technical Architecture */}
              {project.solution && (
                <section className="blog-section-block">
                  <h2 className="blog-section-heading">Solution & Engineering</h2>
                  <p className="blog-paragraph">{project.solution}</p>
                  {project.architecture && (
                    <div className="blog-subblock">
                      <h4 className="blog-subheading">System Architecture</h4>
                      <p className="blog-paragraph">{project.architecture}</p>
                    </div>
                  )}
                  {project.challenges && (
                    <div className="blog-subblock">
                      <h4 className="blog-subheading">Key Engineering Challenges</h4>
                      <p className="blog-paragraph">{project.challenges}</p>
                    </div>
                  )}
                </section>
              )}

              {/* Section 4: Technology Deep-Dive */}
              {project.techStack && project.techStack.length > 0 && (
                <section className="blog-section-block">
                  <h2 className="blog-section-heading">Technology Stack</h2>
                  <div className="blog-tech-grid">
                    {project.techStack.map((tech) => (
                      <div key={tech} className="blog-tech-pill">
                        <FiCpu size={14} className="tech-icon" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 5: Real-World Impact */}
              {project.impact && (
                <section className="blog-section-block">
                  <h2 className="blog-section-heading">Impact & Results</h2>
                  <div className="blog-impact-card">
                    <FiCheckCircle size={22} className="impact-check-icon" />
                    <p className="blog-impact-text">{project.impact}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Footer Project Navigation */}
            <footer className="blog-footer-nav">
              <div className="blog-footer-prev">
                {prevProject ? (
                  <button
                    type="button"
                    className="blog-nav-btn prev"
                    onClick={() => onSelectProject(prevProject)}
                  >
                    <FiChevronLeft size={18} />
                    <div className="nav-btn-text">
                      <span className="nav-sub">PREVIOUS PROJECT</span>
                      <span className="nav-title">{prevProject.brandName || prevProject.name}</span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}
              </div>

              <div className="blog-footer-next">
                {nextProject && (
                  <button
                    type="button"
                    className="blog-nav-btn next"
                    onClick={() => onSelectProject(nextProject)}
                  >
                    <div className="nav-btn-text">
                      <span className="nav-sub">NEXT PROJECT</span>
                      <span className="nav-title">{nextProject.brandName || nextProject.name}</span>
                    </div>
                    <FiChevronRight size={18} />
                  </button>
                )}
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>,
    document.body
  );
};
