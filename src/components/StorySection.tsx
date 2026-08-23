import React, { useEffect, useRef, useState } from 'react';
import './StorySection.css';

export const StorySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (textRef.current) observer.unobserve(textRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    const node = textRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section className="story-container">
      <div className="story-content-wrapper">
        <div 
          ref={textRef} 
          className={`story-content-block ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="story-section-part">
            <h1 className="story-headline">A LITTLE ABOUT ME</h1>
            <p className="story-description">
              It started with a curiosity about how computers work. That curiosity grew into a passion for coding, problem-solving, and building.<br/><br/>
              From exploring technology to developing intelligent solutions, my journey is about turning curiosity into code and ideas into reality.
            </p>
          </div>

          <div className="story-section-part">
            <h2 className="story-subheadline">WHAT I DO</h2>
            <p className="story-description">
              I’m someone who loves to learn, create, and experiment.<br/>
              I enjoy exploring different ways to turn an idea into something real. I’m still figuring things out, still learning, and still creating. And honestly, that’s the part of the journey I enjoy the most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AnimatedLine = ({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) => {
  const parts = text.split(/(<[^>]+>)/g);
  let charIndex = 0;

  const renderWords = (content: string, isHighlight: boolean) => {
    const tokens = content.split(/( )/g);
    return tokens.map((token, index) => {
      if (token === ' ') {
        charIndex++;
        return <span key={index}> </span>;
      }
      return (
        <span key={index} style={{ whiteSpace: 'nowrap' }} className={isHighlight ? 'story-highlight' : ''}>
          {token.split('').map((char, j) => {
            const delay = baseDelay + (charIndex++) * 0.015;
            return <span key={j} className="fade-char" style={{ transitionDelay: `${delay}s` }}>{char}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <span className="fade-line-container">
      {parts.map((part, i) => {
        if (part.startsWith('<') && part.endsWith('>')) {
          const content = part.slice(1, -1);
          return <React.Fragment key={i}>{renderWords(content, true)}</React.Fragment>;
        }
        return <React.Fragment key={i}>{renderWords(part, false)}</React.Fragment>;
      })}
    </span>
  );
};
