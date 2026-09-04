import React, { useEffect, useState } from "react";
import "./LoadingIntro.css";

interface LoadingIntroProps {
  onComplete: () => void;
}

type Phase = "loading" | "ribbons" | "exit";

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    // Phase 1: Percentage counting up to 100%
    const duration = 1200; // 1.2s for loading
    const intervalTime = 25;
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

    // Phase 2: Ribbons marquee across screen
    const ribbonsTimer = setTimeout(() => {
      setPhase("ribbons");
    }, 1350);

    // Phase 3: Zoom out exit animation revealing website
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2800);

    // Complete the intro
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearInterval(interval);
      clearTimeout(ribbonsTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Repeat text for infinite marquee to look seamless
  const marqueeText = "SAM JERISH D. ".repeat(15);

  return (
    <div className={`intro-container phase-${phase} is-initial-load`}>
      {/* Central Percentage Hub */}
      <div
        className={`lock-intro-stage ${
          phase === "ribbons" || phase === "exit" ? "is-morphed" : ""
        }`}
      >
        <div className="percentage-container">
          <div className="percentage-text">{percentage}%</div>
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
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
