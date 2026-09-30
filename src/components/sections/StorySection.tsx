import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import firstPhoto from "../../assets/first_photo.png";
import currentPhoto from "../../assets/me-opt.jpg";
import { GitHubModal } from "../ui/GitHubModal";

export const AnimatedLine = ({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) => {
  const parts = text.split(/(<[^>]+>)/g);
  let charIndex = 0;

  const renderWords = (content: string, isHighlight: boolean) => {
    const tokens = content.split(/( )/g);
    return tokens.map((token, index) => {
      if (token === " ") {
        charIndex++;
        return <span key={index}> </span>;
      }
      return (
        <span
          key={index}
          style={{ whiteSpace: "nowrap" }}
          className={isHighlight ? "story-highlight" : ""}
        >
          {token.split("").map((char, j) => {
            const delay = baseDelay + charIndex++ * 0.015;
            return (
              <span
                key={j}
                className="story-char"
                style={{ animationDelay: `${delay}s` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <span className="story-line">
      {parts.map((part, index) => {
        if (part.startsWith("<span") && part.includes("highlight")) {
          const innerText = part.replace(/<[^>]+>/g, "");
          return <React.Fragment key={index}>{renderWords(innerText, true)}</React.Fragment>;
        }
        if (part.startsWith("<") && part.endsWith(">")) {
          const innerText = part.slice(1, -1);
          return <React.Fragment key={index}>{renderWords(innerText, true)}</React.Fragment>;
        }
        if (part.startsWith("<")) return null;
        return <React.Fragment key={index}>{renderWords(part, false)}</React.Fragment>;
      })}
    </span>
  );
};

export const StorySection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const whatIDoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove("light-mode");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    // Scroll flip trigger: when "What I Do" reaches the viewport
    const flipObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFlipped(true);
        } else {
          // If "What I Do" is below the viewport, user is looking at "A Little About Me"
          if (entry.boundingClientRect.top > 0) {
            setIsFlipped(false);
          }
        }
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "-10% 0px -20% 0px",
      },
    );

    const whatIDoNode = whatIDoRef.current;
    if (whatIDoNode) flipObserver.observe(whatIDoNode);

    return () => {
      if (node) observer.unobserve(node);
      if (whatIDoNode) flipObserver.unobserve(whatIDoNode);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="story-container"
      aria-label="About Sam Jerish"
    >
      <div className="story-content-wrapper">
        <div className={`story-horizontal-content ${isVisible ? "is-visible" : ""}`}>
          {/* Ambient Spotlight Background */}
          <div className="editorial-ambient-glow" aria-hidden="true" />

          {/* 2-Column Split Grid: Narrative Flow + Sticky 3D Photo Flip Card */}
          <div className="story-split-grid">
            <div className="story-sequence-flow">
              {/* Part 1: A LITTLE ABOUT ME */}
              <div className="story-sequence-step">
                <div className="story-theme-kicker">
                  <span className="kicker-accent-dot" aria-hidden="true" />
                  <span>A LITTLE ABOUT ME</span>
                </div>

                <div className="story-sequence-content">
                  <p className="story-editorial-statement">
                    With a foundation in engineering, I bring <strong>problem-solving</strong>, <strong>systems thinking</strong>, and <strong>analytical skills</strong> into the world of product design.
                  </p>

                  <p className="story-editorial-statement">
                    My approach blends <strong>technical precision</strong> with <strong>creativity</strong> to craft solutions that are functional, intuitive, and user-centered.
                  </p>

                  <p className="story-editorial-statement">
                    My goal is to design products that not only work seamlessly but also create meaningful experiences.
                  </p>
                </div>

                {/* Quick Navigation CTAs */}
                <div className="story-cta-row">
                  <button
                    type="button"
                    className="story-action-btn primary"
                    onClick={() => {
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-cursor-text="WORK"
                    aria-label="Scroll to featured projects"
                  >
                    <span>Explore Featured Projects</span>
                    <span className="btn-arrow" aria-hidden="true">↓</span>
                  </button>
                  <button
                    type="button"
                    className="story-action-btn secondary"
                    onClick={() => onNavigate?.("resume")}
                    data-cursor-text="RESUME"
                    aria-label="View professional resume"
                  >
                    <span>View Resume</span>
                    <span className="btn-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>

              {/* Part 2: WHAT I DO (Triggers photo flip when scrolled into view) */}
              <div ref={whatIDoRef} id="what-i-do" className="story-sequence-step what-i-do-step-block">
                <div className="story-theme-kicker">
                  <span className="kicker-accent-dot green" aria-hidden="true" />
                  <span>WHAT I DO</span>
                </div>

                <div className="story-sequence-content">
                  <p className="story-editorial-statement">
                    My approach to building software is simple: build things that actually work, keep code clean, and don't add complexity where a straightforward solution does the job.
                  </p>

                  <p className="story-editorial-statement">
                    Most of my projects start from noticing a slow or broken manual process, like tracking neighborhood collections on paper logbooks or getting distracted by bloated timer apps. I like taking those problems, understanding the real requirements, and shipping clean software that makes them effortless.
                  </p>
                </div>

                {/* GitHub Contribution Activity Modal Trigger */}
                <div className="what-i-do-bottom-bar">
                  <button
                    type="button"
                    className="story-read-more-btn highlighted-white"
                    onClick={() => setIsGithubModalOpen(true)}
                    data-cursor-text="GITHUB"
                    aria-label="View my GitHub activity and contributions"
                  >
                    <span className="btn-ambient-glow" />
                    <span className="live-contrib-ping">
                      <span className="ping-dot" />
                      <span className="ping-ring" />
                    </span>
                    <span className="btn-label">EXPLORE GITHUB ACTIVITY</span>
                    <span className="read-more-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky 3D Photo Flip Card */}
            <div className="story-flip-column" aria-label="Interactive Photo Card">
              <div className="story-flip-sticky">
                <div
                  className={`story-flip-card-container ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => setIsFlipped((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsFlipped((prev) => !prev);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to flip photo between early beginnings and current work"
                  data-cursor-text="FLIP"
                >
                  <div className="story-flip-card-inner">
                    {/* Front Face: A Little About Me (Early Beginnings) */}
                    <div className="story-flip-card-face story-flip-card-front">
                      <img
                        src={firstPhoto}
                        alt="Young Sam Jerish exploring computers"
                        className="story-flip-img"
                        loading="eager"
                        draggable={false}
                      />
                      <div className="story-flip-glass-overlay" aria-hidden="true" />
                      <div className="story-flip-badge">
                        <span className="flip-badge-dot" aria-hidden="true" />
                        <span>Where It Began</span>
                      </div>
                      <div className="story-flip-hint">
                        <span>Scroll or click to flip</span>
                        <span className="flip-hint-icon" aria-hidden="true">↻</span>
                      </div>
                    </div>

                    {/* Back Face: What I Do (Current Engineer Portrait) */}
                    <div className="story-flip-card-face story-flip-card-back">
                      <img
                        src={currentPhoto}
                        alt="Sam Jerish D building software today"
                        className="story-flip-img"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="story-flip-glass-overlay" aria-hidden="true" />
                      <div className="story-flip-badge active">
                        <span className="flip-badge-dot active" aria-hidden="true" />
                        <span>Building Solutions Today</span>
                      </div>
                      <div className="story-flip-hint">
                        <span>Sam Jerish D</span>
                        <span className="flip-hint-icon" aria-hidden="true">↻</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Contribution Modal */}
      <GitHubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </section>
  );
};
