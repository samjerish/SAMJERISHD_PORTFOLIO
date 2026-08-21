import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import { ParticleText } from './ParticleText';

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
      <div className="hero-text-content">
        <div className="hero-name-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ParticleText />
        </div>
        
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
