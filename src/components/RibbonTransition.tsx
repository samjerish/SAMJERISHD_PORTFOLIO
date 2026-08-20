import React, { useEffect, useState } from 'react';
import './LoadingIntro.css';

interface RibbonTransitionProps {
  onReveal: () => void;
  onComplete: () => void;
}

export const RibbonTransition: React.FC<RibbonTransitionProps> = ({ onReveal, onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'ribbons' | 'exit'>('enter');

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setPhase('ribbons');
    }, 50);

    const exitTimer = setTimeout(() => {
      onReveal();
      setPhase('exit');
    }, 1400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onReveal, onComplete]);

  const marqueeText = "SAM JERISH D. ".repeat(15);

  return (
    <div className={`intro-container phase-${phase}`}>
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
