import React, { useState, useEffect } from 'react';
import './Navbar.css';

export const Navbar: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about') => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleNavigate = (page: 'home' | 'media' | 'about', e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    closeMenu();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide if scrolled down past 100px (i.e. leaving the hero section)
      if (window.scrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Top Right Toggle Button */}
      <button 
        className={`nav-toggle ${isOpen ? 'menu-open' : ''}`} 
        style={{ 
          opacity: isVisible ? 1 : 0, 
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger"></span>
      </button>

      {/* Full Screen Control Center */}
      <div className={`control-center-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="control-center-nav">
          <a href="#home" onClick={(e) => handleNavigate('home', e)}>Home</a>
          <a href="#" onClick={(e) => handleNavigate('about', e)}>About me</a>
          <a href="#projects" onClick={() => { closeMenu(); if (onNavigate) onNavigate('home'); }}>Projects</a>
          <a href="#" onClick={(e) => handleNavigate('media', e)}>Beyond the Frame</a>
          <a href="#contact" onClick={() => { closeMenu(); if (onNavigate) onNavigate('home'); }}>Contact</a>
        </nav>
      </div>
    </div>
  );
};
