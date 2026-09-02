import React, { useEffect, useState } from "react";
import "./LoadingIntro.css";

interface LoadingIntroProps {
  onComplete: () => void;
}

type Phase = "loading" | "unlocking" | "morphing" | "ribbons" | "exit";

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    // Phase 1: Percentage counting up to 100%
    const duration = 1200; // 1.2s for loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextPercentage = Math.min(
        Math.floor((currentStep / steps) * 100),
        100,
      );
      setPercentage(nextPercentage);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    // Phase 2: Lock pops open (Unlocking)
    const unlockTimer = setTimeout(() => {
      setPhase("unlocking");
    }, 1300);

    // Phase 3: Lock morphs and shoots ribbons outward
    const morphTimer = setTimeout(() => {
      setPhase("morphing");
    }, 2100);

    // Phase 4: Ribbons marquee across screen
    const ribbonsTimer = setTimeout(() => {
      setPhase("ribbons");
    }, 2600);

    // Phase 5: Zoom out exit animation revealing website
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 4100);

    // Complete the intro
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5400);

    return () => {
      clearInterval(interval);
      clearTimeout(unlockTimer);
      clearTimeout(morphTimer);
      clearTimeout(ribbonsTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Repeat text for infinite marquee to look seamless
  const marqueeText = "SAM JERISH D. ".repeat(15);

  const isUnlocked =
    phase === "unlocking" ||
    phase === "morphing" ||
    phase === "ribbons" ||
    phase === "exit";

  return (
    <div className={`intro-container phase-${phase} is-initial-load`}>
      {/* Central Security Padlock & Percentage Hub */}
      <div
        className={`lock-intro-stage ${
          phase === "morphing" || phase === "ribbons" || phase === "exit"
            ? "is-morphed"
            : ""
        }`}
      >
        <div className={`lock-card-wrapper ${isUnlocked ? "is-unlocked" : ""}`}>
          <div className="lock-pulse-ring"></div>
          
          {/* Morph Energy Beams shooting out to ribbons */}
          <div className="lock-morph-beam beam-top-left"></div>
          <div className="lock-morph-beam beam-bottom-right"></div>

          <div className="lock-icon-assembly">
            <svg
              className={`lock-svg ${isUnlocked ? "unlocked" : ""}`}
              viewBox="0 -10 24 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Shackle: lifts and rotates open when unlocked with ample headroom */}
              <path className="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4" />
              {/* Padlock Body */}
              <rect
                className="lock-body"
                x="4"
                y="11"
                width="16"
                height="11"
                rx="3"
              />
              {/* Keyhole */}
              <circle
                className="lock-keyhole"
                cx="12"
                cy="16"
                r="1.5"
                fill="currentColor"
              />
              <path className="lock-keyhole-stem" d="M12 17.5v2" />
            </svg>
          </div>

          <div className="lock-status-badge">
            <span
              className={`lock-status-dot ${isUnlocked ? "active-green" : ""}`}
            ></span>
            <span className="lock-status-label">
              {isUnlocked ? "SYSTEM UNLOCKED" : "SECURE SYSTEM"}
            </span>
          </div>
        </div>

        {/* Loading Percentage */}
        <div
          className={`percentage-text ${
            phase !== "loading" && phase !== "unlocking" ? "hidden" : ""
          }`}
        >
          {percentage}%
        </div>
      </div>

      {/* Marquee Ribbons */}
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
