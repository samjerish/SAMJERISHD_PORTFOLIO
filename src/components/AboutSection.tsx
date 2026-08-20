import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';
import profileImg from '../assets/animated_profile.png';
import { AnimatedLine } from './StorySection';

export const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const [isPlayOpen, setIsPlayOpen] = useState(false);

  return (
    <section 
      ref={sectionRef} 
      className={`about-container ${isVisible ? 'is-visible' : ''}`}
      id="about"
    >
      <div className="about-content">
        
        {/* LEFT COLUMN: Text content */}
        <div className="about-right">
          <h2 className="main-title">Just a little about me…</h2>
          
          <div className={`description about-story-text ${isVisible ? 'is-visible' : ''}`}>
            <AnimatedLine 
              text="I’m someone who loves to <learn, create, and experiment>." 
              baseDelay={0.2} 
            />
            <br />
            <AnimatedLine 
              text="I enjoy exploring different ways to turn an <idea into something real>. I’m still figuring things out, <still learning, and still creating>. And honestly, that’s the part of the <journey I enjoy the most>." 
              baseDelay={1.4} 
            />
          </div>
          
          <div style={{ marginTop: '3rem' }} className={`about-resume-wrapper ${isVisible ? 'is-visible' : ''}`}>
            <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="resume-btn">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                View Resume
              </span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Polaroid Card */}
        <div className="about-left">
          <div 
            className={`yellow-folder ${isPlayOpen ? 'open' : ''}`}
            onClick={() => setIsPlayOpen(!isPlayOpen)}
          >
            <div className="play-text-container">
              <div className="tag-pulse-indicator"></div>
              <span className="play-text">CLICK TO CONNECT &#x2197;</span>
            </div>
            
            <div className="social-links-drawer">
              <a href="https://www.instagram.com/samjerishd" target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/samjerishd" target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="#0077b5" width="32" height="32">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a href="https://github.com/samjerish" target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="#ffffff" width="32" height="32">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="polaroid-card">
            <div className="binder-clip">
              <svg width="60" height="70" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
                {/* Top wire */}
                <path d="M22 35 L22 15 C22 5, 38 5, 38 15 L38 35" stroke="#777" strokeWidth="3" fill="none" />
                {/* Black body */}
                <rect x="5" y="30" width="50" height="22" rx="3" fill="#050505" />
                {/* Binder clip reflections/details */}
                <rect x="5" y="30" width="50" height="4" fill="#222" />
                {/* Bottom wire overlapping */}
                <path d="M22 35 L12 60 C8 70, 52 70, 48 60 L38 35" stroke="#777" strokeWidth="3" fill="none" />
              </svg>
            </div>
            
            <div className="polaroid-image-wrapper">
              <img src={profileImg} alt="Sam Jerish" className="polaroid-image" />
            </div>
            
            <div className="polaroid-text">
              <h3>
                THIS IS WHO SAYS<br/>
                EVERYTHING IS<br/>
                FIGUREOUTABLE<br/>
                <span className="highlight-text">AND FIGURES OUT</span>
              </h3>
              
              <div className="info-section">
                <div className="info-row">
                  <span className="label">Name:</span> 
                  <span className="value handwriting">Sam Jerish</span>
                </div>
                <hr className="dashed-line" />
                <div className="info-row">
                  <span className="label">Role:</span> 
                  <span className="value handwriting">Full Stack Developer</span>
                </div>
                <hr className="dashed-line" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
