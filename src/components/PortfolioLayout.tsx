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
          section.style.borderRadius = '0';
          section.style.transform = 'none';
          return;
        }

        const rect = section.getBoundingClientRect();
        
        // Distance from bottom of screen to top of section
        const distFromBottom = windowHeight - rect.top;
        const normalized = Math.max(0, Math.min(1, distFromBottom / windowHeight));

        // Cylinder effect: calculate the vertical radius for the top border
        // It starts highly curved (e.g., 200px) when entering from the bottom
        // and flattens out (0px) as it reaches the top (normalized = 1)
        let vRadius = 0;
        if (normalized < 1) {
          // Easing function for smoother flattening
          const easeOut = 1 - Math.pow(1 - normalized, 3);
          vRadius = (1 - easeOut) * 200; // max curve is 200px
        }

        // Apply curved top line using border-radius
        section.style.borderRadius = `50% 50% 0 0 / ${vRadius}px ${vRadius}px 0 0`;
        section.style.clipPath = 'none'; // Remove the old circle clip-path
        
        // Add a slight 3D rotation effect as it scrolls in for the cylinder feel
        if (normalized < 1) {
           const rotateX = (1 - normalized) * 15; // Rotates back slightly when lower
           const translateY = (1 - normalized) * 50; // Pushes it down slightly
           section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px)`;
        } else {
           section.style.transform = 'none';
        }
        
        section.style.willChange = 'border-radius, transform';
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
