import React from 'react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-container" id="home">
      {/* Foreground Content */}
      <div className="hero-text-content">
        <h1 className="hero-name">SAM JERISH D</h1>
        
        <h2 className="hero-subtitle">
          AIML STUDENT | FULL STACK DEVELOPER
        </h2>
        
        <div className="hero-actions">
          <a href="#about" className="hero-btn btn-primary">Get in touch &rarr;</a>
          <a href="https://linkedin.com/in/samjerishd" target="_blank" rel="noreferrer" className="hero-btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: '20px', height: '20px' }} />
            Connect on LinkedIn
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
