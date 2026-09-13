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
                My approach to building software is simple: build things that actually work, keep code clean, and don't add complexity where a straightforward solution does the job.
              </p>

              <p className="story-editorial-statement">
                Most of my projects start from noticing a slow or broken manual process—like tracking neighborhood collections on paper logbooks or getting distracted by bloated timer apps. I like taking those problems, understanding the real requirements, and shipping clean software that makes them effortless.
              </p>
            </div>

            {/* GitHub Contribution Modal Trigger */}
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
