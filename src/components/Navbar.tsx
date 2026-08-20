import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

export const Navbar: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume', e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(page);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setHoverStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div>
      {/* Sticky Menu Bar (Visible when scrolled) */}
      <div className={`sticky-menu-bar ${!isVisible ? 'visible' : ''}`}>
        <div className="sticky-menu-content" ref={containerRef} onMouseLeave={handleMouseLeave}>
          <div className="nav-sliding-underline" style={{ left: `${hoverStyle.left}px`, width: `${hoverStyle.width}px`, opacity: hoverStyle.opacity }} />
          <a href="#home" onClick={(e) => handleNavigate('home', e)} onMouseEnter={handleMouseEnter}>Home</a>
          <a href="#" onClick={(e) => handleNavigate('media', e)} onMouseEnter={handleMouseEnter}>Beyond the Frame</a>
          <a href="#" onClick={(e) => handleNavigate('resume', e)} onMouseEnter={handleMouseEnter}>Resume</a>
        </div>
      </div>
    </div>
  );
};
