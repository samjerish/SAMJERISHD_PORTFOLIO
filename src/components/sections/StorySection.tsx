import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import { WireframeSphere } from "../ui/WireframeSphere";


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
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove("light-mode");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.15 },
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
      className="story-container"
      aria-label="About Sam Jerish"
    >
      <div className="story-content-wrapper">
        {/* ===================================================
            HORIZONTAL STORY SECTION (About Me & What I Do)
            =================================================== */}
        <div
          ref={textRef}
          className={`story-horizontal-content ${isVisible ? "is-visible" : ""}`}
        >
          {/* Ambient Spotlight Background */}
          <div className="editorial-ambient-glow" aria-hidden="true" />

          {/* 2-Column Split Grid: Narrative Flow + Rotating 3D Geodesic Polyhedron */}
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
                    I'm <strong className="statement-name">Sam Jerish D</strong>, a computer science student and developer based in India. Most of my work centers on <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Python</strong>.
                  </p>

                  <p className="story-editorial-statement">
                    I like building software that solves concrete, day-to-day problems—like replacing paper payment logbooks for a residential community in Hosur with a web ledger, or creating a distraction-free Pomodoro workspace for students.
                  </p>

                  <p className="story-editorial-statement">
                    I value straightforward code over over-engineered abstractions. When building an application, my priority is making it fast, obvious to use, and easy to maintain months later.
                  </p>
                </div>

                {/* Grounded Technical Summary */}
                <div className="story-recruiter-matrix" aria-label="Technical Background">
                  <div className="recruiter-matrix-item">
                    <span className="matrix-label">CORE TECHNOLOGIES</span>
                    <span className="matrix-value">React, TypeScript, Python, Node.js, Firebase, MongoDB</span>
                  </div>
                  <div className="recruiter-matrix-item">
                    <span className="matrix-label">WHAT I ENJOY BUILDING</span>
                    <span className="matrix-value">Focused web tools, database ledgers &amp; automation scripts</span>
                  </div>
                  <div className="recruiter-matrix-item">
                    <span className="matrix-label">EDUCATION</span>
                    <span className="matrix-value">B.Tech CSE (AI &amp; ML) • Karunya University (2024–2028)</span>
                  </div>
                  <div className="recruiter-matrix-item">
                    <span className="matrix-label">CURRENTLY EXPLORING</span>
                    <span className="matrix-value">OpenCV computer vision &amp; distributed backend architectures</span>
                  </div>
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
            </div>

            {/* Right Column: 3D Rotating Wireframe Geodesic Polyhedron */}
            <div className="story-wireframe-column" aria-hidden="true">
              <div className="story-wireframe-sticky">
                <WireframeSphere />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
