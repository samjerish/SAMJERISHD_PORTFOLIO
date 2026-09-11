import React, { useEffect, useState } from "react";
import "./LoadingIntro.css";

interface LoadingIntroProps {
  onComplete: () => void;
}

type Phase = "typewriter" | "ribbons" | "exit";

const TARGET_TEXT = "loading.....";

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>("typewriter");
  const [displayText, setDisplayText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let finishTimer: ReturnType<typeof setTimeout> | null = null;

    // Start typewriter effect after a brief initial pause
    const startDelay = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (charIndex < TARGET_TEXT.length) {
          setDisplayText(TARGET_TEXT.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (typeInterval) clearInterval(typeInterval);
          // Hold the full "loading....." text briefly before triggering ribbons
          finishTimer = setTimeout(() => {
            setPhase("ribbons");
          }, 450);
        }
      }, 75);
    }, 150);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 450);

    return () => {
      clearTimeout(startDelay);
      if (typeInterval) clearInterval(typeInterval);
      if (finishTimer) clearTimeout(finishTimer);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    if (phase === "ribbons") {
      // Phase 2: Ribbons enter across screen
      const exitTimer = setTimeout(() => {
        setPhase("exit");
      }, 1400);

      // Phase 3: Ribbons exit and reveal website
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2600);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [phase, onComplete]);

  // Repeat text for infinite marquee ribbons
  const marqueeText = "SAM JERISH D. ".repeat(15);

  return (
    <div className={`intro-container phase-${phase} is-initial-load`}>
      {/* Typewriter Preloader Text Stage */}
      <div className="typewriter-stage">
        <div className="typewriter-wrapper">
          <div className="typewriter-ambient-glow" />
          <div className="typewriter-content" aria-label="loading">
            <span className="typewriter-text">{displayText}</span>
            <span
              className={`typewriter-cursor ${!showCursor ? "cursor-hidden" : ""}`}
            >
              _
            </span>
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
