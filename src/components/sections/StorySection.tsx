import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import { GitHubModal } from "../ui/GitHubModal";

const PixelBotSvg: React.FC = () => (
  <svg
    className="pixel-bot-svg"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="2" y="0" width="2" height="2" fill="#e0564c" />
    <rect x="12" y="0" width="2" height="2" fill="#e0564c" />
    <rect x="4" y="2" width="2" height="2" fill="#e0564c" />
    <rect x="10" y="2" width="2" height="2" fill="#e0564c" />
    <rect x="2" y="4" width="12" height="4" fill="#e0564c" />
    <rect x="4" y="4" width="2" height="2" fill="#ffffff" className="bot-eye left-eye" />
    <rect x="10" y="4" width="2" height="2" fill="#ffffff" className="bot-eye right-eye" />
    <rect x="0" y="6" width="2" height="4" fill="#e0564c" />
    <rect x="14" y="6" width="2" height="4" fill="#e0564c" />
    <rect x="2" y="8" width="2" height="2" fill="#e0564c" />
    <rect x="12" y="8" width="2" height="2" fill="#e0564c" />
    <rect x="4" y="10" width="2" height="2" fill="#e0564c" />
    <rect x="10" y="10" width="2" height="2" fill="#e0564c" />
  </svg>
);

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
}> = ({ onNavigate: _onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
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

          {/* Sequential Story Flow: A Little About Me and What I Do (Horizontal Extended Alignment) */}
          <div className="story-sequence-flow">
            {/* Part 1: A LITTLE ABOUT ME */}
            <div className="story-sequence-step">
              <div className="story-theme-kicker">
                <span className="kicker-accent-dot" />
                <span>A LITTLE ABOUT ME</span>
              </div>

              <div className="story-sequence-content">
                <p className="story-editorial-statement">
                  It started with a curiosity about how computers work. That curiosity grew into a passion for{" "}
                  <span className="story-chip story-chip-code" data-cursor-text="DEV">
                    <span className="chip-square-box code-box">&lt;/&gt;</span>
                    <span className="chip-text">coding</span>
                  </span>
                  , problem-solving, and{" "}
                  <span className="story-chip story-chip-yellow" data-cursor-text="BUILD">
                    building
                  </span>.
                </p>

                <p className="story-editorial-statement">
                  From exploring technology to developing{" "}
                  <span className="story-chip story-chip-agent" data-cursor-text="AI">
                    <span className="pixel-bot-wrapper">
                      <PixelBotSvg />
                    </span>
                    <span className="story-agent-text">intelligent solutions</span>
                  </span>
                  , my journey is about turning{" "}
                  <span className="story-chip story-chip-curiosity" data-cursor-text="SPARK">
                    <span className="curiosity-spark">✧</span>
                    <span className="curiosity-text">curiosity</span>
                  </span>{" "}
                  into code and ideas into reality.
                </p>
              </div>
            </div>

            {/* Part 2: WHAT I DO */}
            <div className="story-sequence-step">
              <div className="story-theme-kicker">
                <span className="kicker-accent-dot green" />
                <span>WHAT I DO</span>
              </div>

              <div className="story-sequence-content">
                <p className="story-editorial-statement">
                  I’m someone who loves to{" "}
                  <span className="story-chip story-chip-yellow" data-cursor-text="LEARN">
                    learn
                  </span>
                  ,{" "}
                  <span className="story-chip story-chip-craft" data-cursor-text="CRAFT">
                    <span className="chip-square-box craft-box">✦</span>
                    <span className="chip-text">create</span>
                  </span>
                  , and{" "}
                  <span className="story-chip story-chip-experiment" data-cursor-text="ENERGY">
                    <span className="chip-square-box exp-box">⚡</span>
                    <span className="exp-orange-text">experiment</span>
                  </span>
                  .
                </p>

                <p className="story-editorial-statement">
                  I enjoy exploring different ways to turn an idea into something real. I’m still figuring things out, still learning, and still creating. And honestly, that’s the part of the journey I enjoy the most.
                </p>
              </div>
            </div>
          </div>

          {/* GitHub CTA - Prominently Highlighted in White */}
          <div className="story-horizontal-bottom-bar plain-bar">
            <div className="story-read-more-wrapper">
              <button
                type="button"
                className="story-read-more-btn highlighted-white"
                onClick={() => setIsGithubModalOpen(true)}
                data-cursor-text="GITHUB"
                aria-label="View my GitHub contributions"
              >
                <span className="btn-ambient-glow" />
                <span className="live-contrib-ping">
                  <span className="ping-dot" />
                  <span className="ping-ring" />
                </span>
                <span className="btn-label">VIEW MY GITHUB CONTRIBUTION</span>
                <span className="read-more-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time GitHub Activity Modal */}
      <GitHubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </section>
  );
};
