import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import './PortfolioLayout.css';

export const PortfolioLayout: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / docHeight) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scroll}%`;
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
      <Navbar onNavigate={onNavigate} />
      <main>
        <HeroSection onNavigate={onNavigate} />
        <ProjectsSection onNavigate={onNavigate} />
        <StorySection />
        <ContactSection onNavigate={onNavigate} />
      </main>
    </div>
  );
};
