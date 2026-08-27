import React from 'react';
import './Navbar.css';
import { Home } from 'lucide-react';

export const Navbar: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const handleNavigate = (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume', e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="pill-nav-container">
      <nav className="pill-navbar">
        <button className="pill-nav-home" onClick={(e) => handleNavigate('home', e)} aria-label="Home">
          <Home size={22} strokeWidth={2.5} />
        </button>
        
        <div className="pill-nav-links">
          <button onClick={(e) => handleNavigate('projects', e)}>Projects</button>
          <button onClick={(e) => handleNavigate('media', e)}>Beyond the frame</button>
          <button onClick={(e) => handleNavigate('resume', e)}>Resume</button>
          <button onClick={(e) => handleNavigate('contact', e)}>Contact</button>
        </div>
      </nav>
    </div>
  );
};
