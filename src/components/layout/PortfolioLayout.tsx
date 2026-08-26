import React, { useEffect, useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { StorySection } from '../sections/StorySection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ContactSection } from '../sections/ContactSection';
import './PortfolioLayout.css';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

export const PortfolioLayout: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);
  const socialPopupRef = React.useRef<HTMLDivElement>(null);
  
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      const totalScroll = window.scrollY;
      
      // Social popup logic
      if (socialPopupRef.current && mainRef.current) {
        const sections = mainRef.current.children;
        const contactSection = sections[sections.length - 1]; // Assuming Contact is the last section
        let isContactVisible = false;
        
        if (contactSection) {
          const contactRect = contactSection.getBoundingClientRect();
          // Hide when Contact section enters the viewport
          if (contactRect.top < window.innerHeight - 100) {
            isContactVisible = true;
          }
        }
        
        if (totalScroll > window.innerHeight * 0.8 && !isContactVisible) {
          socialPopupRef.current.classList.add('visible');
        } else {
          socialPopupRef.current.classList.remove('visible');
        }
      }

      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / docHeight) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scroll}%`;
        const container = progressBarRef.current.parentElement;
        if (container) {
          container.style.opacity = totalScroll > 10 ? '1' : '0';
        }
      }

      // Professional fade-out effect for sections as they scroll up
      if (mainRef.current) {
        const sections = mainRef.current.children;
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i] as HTMLElement;
          const rect = section.getBoundingClientRect();
          
          // Only fade out when the section is almost finished scrolling
          // This fixes the issue with tall sections (like Projects) fading out too early
          const fadeThreshold = Math.min(windowHeight * 0.8, rect.height);
          
          if (rect.top < 0 && rect.bottom < fadeThreshold) {
            // Fade out over the remaining visible height of the section
            const fadeAmount = 1 - (rect.bottom / fadeThreshold);
            section.style.opacity = Math.max(0, 1 - fadeAmount).toString();
          } else {
            section.style.opacity = '1';
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleTimelineAction = (e: React.MouseEvent<HTMLDivElement>, isDragging: boolean) => {
    if (isDragging && e.buttons !== 1) return;
    const { clientX } = e;
    const { innerWidth } = window;
    const clickRatio = Math.max(0, Math.min(1, clientX / innerWidth));
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const targetScroll = windowHeight * clickRatio;
    
    window.scrollTo({
      top: targetScroll,
      behavior: isDragging ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="portfolio-layout">
      {/* Global Navigation Bar */}
      <div className="hero-top-bar" style={{ position: 'fixed', zIndex: 100 }}>
        <nav className={`hero-floating-nav ${isScrolling ? 'collapsed' : ''}`}>
          <div className="nav-profile">
            <div className="nav-avatar-bg" style={{ background: 'transparent' }}>
              <img src={`${import.meta.env.BASE_URL}LOGO.png`} alt="Logo" className="nav-avatar" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            </div>
            <span className="nav-name">samjerish</span>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate && onNavigate('about')}>About</button>
            <button onClick={() => onNavigate && onNavigate('projects')}>Projects</button>
            <button onClick={() => onNavigate && onNavigate('media')}>Beyond the frame</button>
            <button onClick={() => onNavigate && onNavigate('contact')}>Contact</button>
          </div>
        </nav>
      </div>

      {/* Floating Social Popup */}
      <div ref={socialPopupRef} className="social-popup-container">
        <span className="social-popup-text">Follow me</span>
        <div className="social-popup-links">
          <a href="https://instagram.com/samjerishd" className="social-instagram" target="_blank" rel="noreferrer"><FiInstagram /></a>
          <a href="https://linkedin.com/in/samjerishd" className="social-linkedin" target="_blank" rel="noreferrer"><FiLinkedin /></a>
          <a href="https://github.com/samjerish" className="social-github" target="_blank" rel="noreferrer"><FiGithub /></a>
        </div>
      </div>

      <div 
        className="scroll-progress-container"
        onClick={(e) => handleTimelineAction(e, false)}
        onMouseMove={(e) => handleTimelineAction(e, true)}
      >
        <div 
          ref={progressBarRef}
          className="scroll-progress-bar" 
          style={{ width: '0%' }}
        >
          <div className="timeline-dot" />
        </div>
      </div>
      <main ref={mainRef}>
        <div className="scroll-fade-wrapper"><HeroSection onNavigate={onNavigate} /></div>
        <div className="scroll-fade-wrapper"><ProjectsSection onNavigate={onNavigate} /></div>
        <div className="scroll-fade-wrapper"><StorySection /></div>
        <div className="scroll-fade-wrapper"><ContactSection onNavigate={onNavigate} /></div>
      </main>
    </div>
  );
};
