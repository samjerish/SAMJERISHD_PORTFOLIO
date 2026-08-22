import React, { useEffect, useRef } from 'react';
import './HeroSection.css';
import animatedProfile from '../assets/animated_profile.png';
import firstPhoto from '../assets/1st_photo.png';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Optional: Add some entry animations for the cards on load
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, i * 200 + 100);
    });
  }, []);

  return (
    <section ref={heroRef} className="hero-container" id="home">
      <div className="hero-content-wrapper">
        
        {/* LEFT COLUMN: Typography & Info */}
        <div className="hero-left-col">
          <div className="hero-branding">
            <span className="star-icon">✦</span> SAM JERISH D
          </div>
          
          <div className="hero-title-group">
            <h1 className="hero-headline">HI, I'M SAM</h1>
            <h2 className="hero-subheadline">
              A FULL STACK DEVELOPER<span className="blinking-cursor">|</span>
            </h2>
          </div>
          
          <p className="hero-description">
            I'm a practicing Full Stack Developer who loves to learn, create, and experiment.<br/>
            I enjoy exploring different ways to turn an idea into something real. I’m still figuring things out, still learning, and still creating.<br/>
            My approach to development is pragmatic and lean: I rely on rapid iteration and tightly scoped experiments to move work forward.<br/>
            I value straightforward communication and low-friction collaboration.
          </p>
          
          <hr className="hero-divider" />
          
          <div className="hero-links-grid">
            <div className="link-row">
              <span className="link-label">Currently:</span>
              <a href="#" className="link-value highlight">Full Stack Developer</a>
            </div>
            <div className="link-row">
              <span className="link-label">My recent:</span>
              <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="link-value underline">📄 Resume</a>
            </div>
            <div className="link-row">
              <span className="link-label">Find more:</span>
              <span className="link-value">
                <a href="https://linkedin.com/in/samjerishd" target="_blank" rel="noreferrer" className="underline">💼 LinkedIn</a> / 
                <a href="https://github.com/samjerish" target="_blank" rel="noreferrer" className="underline"> GitHub</a> / 
                <a href="https://instagram.com/samjerishd" target="_blank" rel="noreferrer" className="underline"> Instagram</a>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Photo Cards */}
        <div className="hero-right-col">
          <div className="hero-cards-container">
            <div className="hero-card card-left">
              <img src={animatedProfile} alt="Sam Jerish" />
            </div>
            <div className="hero-card card-right">
              <img src={firstPhoto} alt="Sam Jerish" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
