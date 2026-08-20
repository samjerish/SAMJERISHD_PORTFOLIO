import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Calculate 3D tilt
  const calculateTilt = () => {
    if (!containerRef.current) return { rotateX: 0, rotateY: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limits the tilt to a max of 10 degrees for subtlety
    const rotateX = ((mousePosition.y - centerY) / centerY) * -10; 
    const rotateY = ((mousePosition.x - centerX) / centerX) * 10;
    
    return { rotateX, rotateY };
  };

  const { rotateX, rotateY } = calculateTilt();

  return (
    <section ref={containerRef} className="hero-container" id="home">
      
      {/* Spotlight Background Effect */}
      <div 
        className="hero-spotlight"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Foreground Content */}
      <div className="hero-text-content" style={{ perspective: '1000px' }}>
        
        <div 
          className="hero-name-wrapper"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <h1 className="hero-name">SAM JERISH D</h1>
        </div>
        
        <h2 className="hero-subtitle">
          AIML STUDENT | FULL STACK DEVELOPER
        </h2>
        
        <div className="hero-actions">
          <a href="mailto:samjerishd@gmail.com" className="status-button">
            <span className="status-dot"></span>
            Open to new opportunities
            <span className="status-arrow">↗</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-arrow">&darr;</div>
      </div>
    </section>
  );
};
