import React, { useState } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Top Right Toggle Button */}
      <button 
        className={`nav-toggle ${isOpen ? 'menu-open' : ''}`} 
        onClick={toggleMenu}
      >
        <span className="hamburger"></span>
      </button>

      {/* Full Screen Control Center */}
      <div className={`control-center-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="control-center-nav">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About me</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
};
