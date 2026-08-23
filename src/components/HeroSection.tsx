import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import './AboutSection.css';
import animatedProfile from '../assets/animated_profile.png';
import firstPhoto from '../assets/1st_photo.png';

export const HeroSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);
  
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPlayOpen, setIsPlayOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleTheme = (e: React.MouseEvent) => {
    const isLight = isDarkMode; // if it was dark, it becomes light

    if (!(document as any).startViewTransition) {
      document.body.classList.add('theme-transitioning');
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('light-mode');
      setTimeout(() => document.body.classList.remove('theme-transitioning'), 600);
      return;
    }

    // Always Top Right Corner
    const originX = window.innerWidth;
    const originY = 0;

    const endRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    const transition = (document as any).startViewTransition(() => {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('light-mode');
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${originX}px ${originY}px)`,
            `circle(${endRadius}px at ${originX}px ${originY}px)`
          ]
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };
  
  const roles = ['FULL STACK DEVELOPER', 'PHOTOGRAPHER', 'VIDEO EDITOR'];
  
  useEffect(() => {
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && roleText === roles[roleIndex]) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && roleText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 500; // Pause before typing new word
      return;
    }
    
    const timeout = setTimeout(() => {
      const fullText = roles[roleIndex];
      if (isDeleting) {
        setRoleText(fullText.substring(0, roleText.length - 1));
      } else {
        setRoleText(fullText.substring(0, roleText.length + 1));
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

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
      
      {/* TOP BAR: Actions only */}
      <div className="hero-top-bar">
        <div className="hero-actions">
          <button className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} aria-label="Toggle Theme" onClick={toggleTheme}>
            <div className="toggle-handle"></div>
          </button>
          <a href="mailto:samjerishd@gmail.com" className="email-btn">Email Me :)</a>
        </div>
      </div>

      <div className="hero-content-wrapper">
        
        {/* LEFT COLUMN: Typography & Info */}
        <div className="hero-left-col">
          
          <div className="hero-title-group">
            <h1 className="hero-headline">HI, I'M SAM</h1>
            <h2 className="hero-subheadline">
              A {roleText}<span className="blinking-cursor">|</span>
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
              <a href="#" className="link-value highlight">3rd year AIML Student</a>
            </div>
            <div className="link-row">
              <span className="link-label">My recent:</span>
              <button 
                onClick={() => onNavigate && onNavigate('resume')} 
                className="link-value underline"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
              >
                📄 Resume
              </button>
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

        {/* RIGHT COLUMN: Polaroid Card */}
        <div className="hero-right-col">
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
              <img src={animatedProfile} alt="Sam Jerish" className="polaroid-image" />
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
