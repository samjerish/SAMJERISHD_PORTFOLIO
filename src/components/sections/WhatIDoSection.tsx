import React, { useEffect, useRef, useState } from "react";
import "./WhatIDoSection.css";
import "./StorySection.css"; // Reuse chip and kicker styling
import { GitHubModal } from "../ui/GitHubModal";

export const WhatIDoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section ref={sectionRef} id="what-i-do" className="what-i-do-container">
      <div className="what-i-do-content-wrapper">
        <div className={`what-i-do-content ${isVisible ? "is-visible" : ""}`}>
          {/* Subtle Ambient Radial Glow */}
          <div className="what-i-do-ambient-glow" aria-hidden="true" />

          <div className="what-i-do-step">
            <div className="story-theme-kicker">
              <span className="kicker-accent-dot green" />
              <span>WHAT I DO</span>
            </div>

            <div className="what-i-do-statements">
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

            {/* GitHub Contribution Modal Trigger */}
            <div className="what-i-do-bottom-bar">
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

      {/* Interactive GitHub Contribution Activity Modal */}
      <GitHubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </section>
  );
};
