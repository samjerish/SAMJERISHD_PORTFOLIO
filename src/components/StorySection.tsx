import React, { useEffect, useRef, useState } from 'react';
import './StorySection.css';
import photoSrc from '../assets/1st_photo.png';

export const AnimatedLine = ({ text, baseDelay }: { text: string, baseDelay: number }) => {
  let globalCharIndex = 0;
  
  // Split by < and > to isolate highlighted text
  const parts = text.split(/(<[^>]+>)/g);
  
  return (
    <span className="fade-line-container">
      {parts.map((part, partIndex) => {
        const isHighlight = part.startsWith('<') && part.endsWith('>');
        const actualText = isHighlight ? part.slice(1, -1) : part;
        
        // Match chunks of non-whitespace or whitespace
        const tokens = actualText.match(/(\S+|\s+)/g) || [];

        return (
          <span key={partIndex} className={isHighlight ? 'highlight' : ''}>
            {tokens.map((token, tokenIndex) => {
              const isSpace = /^\s+$/.test(token);
              
              if (isSpace) {
                globalCharIndex += token.length;
                return token;
              }

              return (
                <span key={tokenIndex} className="word-wrapper" style={{ display: 'inline-block' }}>
                  {token.split('').map((char, charIndex) => {
                    const delay = baseDelay + (globalCharIndex * 0.02);
                    globalCharIndex++;
                    return (
                      <span 
                        key={charIndex} 
                        className="fade-char" 
                        style={{ transitionDelay: `${delay}s` }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

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
      <div className="story-image-overlay">
        <img src={photoSrc} alt="Story Background" className="story-photo" />
      </div>
      <div className="story-content">
        <div 
          ref={textRef} 
          className={`story-text ${isVisible ? 'is-visible' : ''}`}
        >
          <AnimatedLine 
            text="It started with a curiosity about how <computers work>. That curiosity grew into a passion for <coding, problem-solving, and building>." 
            baseDelay={0.2} 
          />
          <br /><br />
          <AnimatedLine 
            text="From exploring technology to developing <intelligent solutions>, my journey is about turning <curiosity into code> and <ideas into reality>." 
            baseDelay={3.0} 
          />
        </div>
      </div>
    </section>
  );
};


