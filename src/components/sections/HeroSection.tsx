import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import animatedProfile from '../../assets/animated_profile.png';
import { SpaceBackground } from '../ui/SpaceBackground';

export const HeroSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate: _onNavigate }) => {
  const [_isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <section className="hero-container new-hero" id="home">
      <SpaceBackground colorTheme="black" />
      
      {/* Top Bar removed and moved to PortfolioLayout.tsx */}

      <div className="hero-content-wrapper center-layout">

        {/* Giant Background Text */}
        <div className="hero-background-text-new">
          <span className="text-line-1">SAM</span>
          <span className="text-line-2">JERISH D</span>
        </div>
        
        {/* Floating Avatar */}
        <div className="floating-avatar-new">
          <img 
            src={animatedProfile} 
            alt="Sam Jerish" 
            className="hero-avatar-img-new"
          />
        </div>

      </div>

      {/* Bottom Elements moved outside of center-layout so they are not masked by the fade out effect */}
      <div className="hero-bottom-elements">
        <div className="hero-intro-text">
          <p><span className="waving-hand">👋</span> I'm a practicing Full Stack Developer who loves to learn, create, and experiment.<br/>I enjoy exploring different ways to turn an idea into something real.</p>
        </div>
        
        <div className="hero-cta-group">
          <a href="mailto:samjerishd@gmail.com" className="book-call-btn">
            EMAIL ME :)
          </a>
          <div className="cta-dot"></div>
        </div>
      </div>

    </section>
  );
};
