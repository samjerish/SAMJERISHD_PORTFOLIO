import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { AboutSection } from './AboutSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import './PortfolioLayout.css';

export const PortfolioLayout: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const mainContent = document.querySelector('main') as HTMLElement;
    if (mainContent) {
      // Ensure no leftover global transforms
      mainContent.style.transform = 'none';
      mainContent.style.filter = 'none';
    }

    const renderLoop = () => {
      const sections = document.querySelectorAll('main > section') as NodeListOf<HTMLElement>;
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;

      sections.forEach((section, index) => {
        // Natural stacking: later sections (higher index) overlap earlier ones
        section.style.position = 'relative';
        section.style.zIndex = index.toString();
        
        // Reset old scale/opacity transforms
        section.style.transform = 'none';
        section.style.opacity = '1';
        section.style.filter = 'none';

        if (index === 0) {
          // First section (Hero) is always fully visible
          section.style.clipPath = 'none';
          return;
        }

        const rect = section.getBoundingClientRect();
        
        // Distance from bottom of screen to top of section
        const distFromBottom = windowHeight - rect.top;
        const normalized = distFromBottom / windowHeight;

        // Keep the mask visually locked to the exact center of the screen
        const maskCenterY = centerY - rect.top;

        let radius = 0;
        
        if (normalized > 0 && normalized <= 1.5) {
          // Cubic easing for a slow start then burst open
          radius = Math.pow(normalized, 3) * 150; 
        } else if (normalized > 1.5) {
          radius = 150;
        }

        // Apply clip path
        if (radius >= 150) {
          section.style.clipPath = 'none';
        } else if (radius <= 0) {
          section.style.clipPath = `circle(0% at 50% ${maskCenterY}px)`;
        } else {
          section.style.clipPath = `circle(${radius}% at 50% ${maskCenterY}px)`;
        }
        
        section.style.willChange = 'clip-path';
      });
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start continuous physics loop
    renderLoop();

    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / docHeight) * 100;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (mainContent) {
        mainContent.style.transform = 'none';
        mainContent.style.filter = 'none';
      }
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
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="timeline-dot" />
        </div>
      </div>
      <Navbar onNavigate={onNavigate} />
      <main>
        <HeroSection />
        <StorySection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection onNavigate={onNavigate} />
      </main>
    </div>
  );
};
