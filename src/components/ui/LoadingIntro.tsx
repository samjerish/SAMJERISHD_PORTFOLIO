import React, { useState, useCallback } from "react";
import "./LoadingIntro.css";

interface LoadingIntroProps {
  onComplete: () => void;
}

type Phase = "welcome" | "ribbons" | "exit";

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setPhase("ribbons");

    // Sequence ribbons parting and revealing the portfolio
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 1100);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [isExiting, onComplete]);

  // Explicit click required to enter website (auto-enter removed as requested)

  // Repeat text for marquee ribbons transition
  const marqueeText = "SAM JERISH D. ".repeat(15);

  return (
    <div className={`intro-container phase-${phase} is-initial-load`}>
      {/* Welcome Preloader Stage (Featuring transparent cutout of Sam Jerish at laptop) */}
      <div className={`welcome-stage ${isExiting ? "is-exiting" : ""}`}>
        <div className="welcome-glow-ambient" aria-hidden="true" />
        <div className="welcome-card-content">
          {/* Animated Illustration with completely transparent background */}
          <div className="welcome-avatar-wrapper">
            <img
              src={`${import.meta.env.BASE_URL}sam_laptop.png`}
              alt="Sam Jerish D working on laptop"
              className="welcome-avatar-img"
              draggable={false}
            />
            <div className="welcome-avatar-aura" aria-hidden="true" />
          </div>

          {/* Name & Role in Website Font Theme */}
          <h1 className="welcome-name">Sam Jerish D</h1>
          <p className="welcome-role">Developer to solve real world problems</p>

          {/* Welcome Call-To-Action Pill Button */}
          <button
            type="button"
            className="welcome-enter-btn"
            onClick={handleEnter}
            aria-label="Welcome to my portfolio - Enter site"
          >
            <span>Welcome to my portfolio</span>
          </button>
        </div>
      </div>

      {/* Marquee Ribbons Transition */}
      <div className="ribbons-container">
        <div className="ribbon ribbon-top">
          <div className="marquee-content marquee-content-left">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        <div className="ribbon ribbon-bottom">
          <div className="marquee-content marquee-content-right">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

