import React, { useEffect, useState } from 'react';
import './LoadingIntro.css';

interface LoadingIntroProps {
  onComplete: () => void;
}

type Phase = 'loading' | 'blackout' | 'ribbons' | 'exit';

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    // Phase 1: Percentage counting up to 100%
    const duration = 1200; // 1.2s for loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextPercentage = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setPercentage(nextPercentage);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    // Phase 2: Blackout
    const blackoutTimer = setTimeout(() => {
      setPhase('blackout');
    }, 1300);

    // Phase 3: Ribbons appear and marquee
    const ribbonsTimer = setTimeout(() => {
      setPhase('ribbons');
    }, 1500);

    // Phase 4: Zoom out exit animation
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 3200);

    // Complete the intro
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(blackoutTimer);
      clearTimeout(ribbonsTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Repeat text a lot of times for infinite marquee to look seamless
  const marqueeText = "SAM JERISH D. ".repeat(15);

  return (
    <div className={`intro-container phase-${phase} is-initial-load`}>
      {/* Loading Percentage */}
      <div className={`percentage-text ${phase !== 'loading' ? 'hidden' : ''}`}>
        {percentage}%
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
