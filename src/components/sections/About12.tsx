import React, { useEffect, useRef, useState } from "react";
import "./About12.css";
import profilePhoto from "../../assets/photo.jpg";
import { Quote, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface About12Props {
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume"
  ) => void;
  className?: string;
}

interface ValueItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const OPERATING_VALUES: ValueItem[] = [
  {
    number: "01",
    title: "Make the Work Visible",
    description:
      "Surfacing clean architecture, transparent processes, and verifiable metrics rather than hidden assumptions. If software cannot be cleanly observed, tested, and documented, it isn't ready for real users.",
    tags: ["Clean Architecture", "Observability", "Type Safety"],
  },
  {
    number: "02",
    title: "Move with Precision & Velocity",
    description:
      "Velocity without discipline produces technical debt. I combine rapid prototyping with rigorous type safety, modular component systems, and scalable patterns to build fast without sacrificing stability.",
    tags: ["High Velocity", "Modern Stack", "Scalable Systems"],
  },
  {
    number: "03",
    title: "Protect the Signal",
    description:
      "Relentlessly prioritizing user value, 60fps fluid interaction, and sub-second Core Web Vitals over superficial noise. Great digital experiences feel effortless because the complexity is handled under the hood.",
    tags: ["User Centric", "60FPS Motion", "Core Web Vitals"],
  },
  {
    number: "04",
    title: "Leave Useful Artifacts",
    description:
      "Software is a compounding craft. Every project should produce reusable components, robust abstractions, and clean documentation that empower team members and elevate the broader community.",
    tags: ["Design Systems", "Reusable UI", "Documentation"],
  },
];

export const About12: React.FC<About12Props> = ({ onNavigate, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.12 }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about-12-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      <div className="about-12-inner">
        {/* Section Header */}
        <div className="about-12-header">
          <div className="about-12-badge">
            <Sparkles size={14} className="about-12-badge-icon" />
            <span>ABOUT ME • OPERATING PHILOSOPHY</span>
          </div>
          <h2 className="about-12-headline">
            Engineering with intention. <br className="hidden-mobile" />
            Guided by principles.
          </h2>
          <p className="about-12-subheadline">
            An inverted founder pull-quote panel paired with a numbered operating-values ledger,
            reflecting my core standards across full-stack development, AI, and creative technology.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="about-12-grid">
          {/* LEFT: Inverted Founder Pull-Quote Panel */}
          <div className="about-12-founder-card">
            <div className="about-12-card-glow" />
            
            <div className="about-12-quote-top">
              <div className="about-12-quote-icon-box">
                <Quote size={22} className="about-12-quote-svg" />
              </div>
              <span className="about-12-quote-label">FOUNDER PULL-QUOTE</span>
            </div>

            <blockquote className="about-12-quote-body">
              "Good software isn’t just about writing code—it’s about empathy for the user,
              relentless attention to detail, and building systems that endure."
            </blockquote>

            <p className="about-12-quote-reflection">
              I specialize in full-stack web development, AI-driven applications, and interactive
              experiences. Whether architecting backend microservices or crafting sub-60fps fluid
              interfaces, I focus on turning ambitious ideas into reliable, practical realities.
            </p>

            {/* Founder Profile Ledger Bar */}
            <div className="about-12-founder-profile">
              <div className="about-12-avatar-wrapper">
                <img
                  src={profilePhoto}
                  alt="Sam Jerish D"
                  className="about-12-avatar-img"
                  draggable={false}
                />
                <div className="about-12-avatar-badge" />
              </div>

              <div className="about-12-founder-info">
                <h3 className="about-12-founder-name">SAM JERISH D</h3>
                <span className="about-12-founder-role">AIML Student & Full-Stack Developer</span>
                <span className="about-12-founder-location">Based in India • Building Globally</span>
              </div>
            </div>

            {/* Link to Dedicated Story & Journey */}
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="about-12-more-btn"
                aria-label="View Full Journey & GitHub Activity"
                data-cursor-text="EXPLORE"
              >
                <span>Read Full Story & Journey</span>
                <ArrowRight size={16} className="about-12-btn-arrow" />
              </button>
            )}
          </div>

          {/* RIGHT: Numbered Operating-Values Ledger */}
          <div className="about-12-ledger">
            <div className="about-12-ledger-header">
              <span className="about-12-ledger-title">OPERATING VALUES LEDGER</span>
              <span className="about-12-ledger-count">04 PRINCIPLES</span>
            </div>

            <div className="about-12-ledger-list">
              {OPERATING_VALUES.map((val, idx) => {
                const isActive = activeValue === idx;
                return (
                  <div
                    key={val.number}
                    className={`about-12-ledger-item ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveValue(idx)}
                    onClick={() => setActiveValue(idx)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    data-cursor-text={val.number}
                  >
                    <div className="about-12-item-header">
                      <span className="about-12-item-number">{val.number}</span>
                      <div className="about-12-item-heading-wrap">
                        <h4 className="about-12-item-title">{val.title}</h4>
                      </div>
                      <div className="about-12-item-status-icon">
                        <CheckCircle2 size={16} />
                      </div>
                    </div>

                    <div className="about-12-item-content">
                      <p className="about-12-item-desc">{val.description}</p>
                      
                      <div className="about-12-item-tags">
                        {val.tags.map((tag) => (
                          <span key={tag} className="about-12-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="about-12-item-indicator" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
