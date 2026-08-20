import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import profileImg from '../assets/animated_profile.png';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'media' | 'about') => void;
}

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 20l4-9"></path><path d="M10.7 14c.498 1.26 1.743 2 3.3 2 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 1.26.498 2.378 1.3 3"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // simple fade in
    setIsVisible(true);
  }, []);

  return (
    <div className={`about-page-wrapper ${isVisible ? 'is-visible' : ''}`}>
      <nav className="about-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </nav>

      {/* MODERN ABOUT SECTION */}
      <div className="modern-about-container">
        
        {/* Left Column: Text & Socials */}
        <div className="modern-about-left">
          <h1 className="modern-about-title">ABOUT ME</h1>
          
          <h2 className="modern-about-name">Sam Jerish D</h2>
          
          <div className="modern-about-text">
            <p>
              I’m a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning, with a strong interest in full-stack development and emerging technologies.
            </p>
            <p>
              I enjoy building practical, user-focused solutions that combine technology, creativity, and problem-solving. My experience spans web development, AI-powered applications, UI/UX design, and software development, along with creative work in photography and video editing. I’m passionate about continuously learning new technologies, exploring innovative ideas, and turning concepts into meaningful digital experiences. My goal is to grow as a versatile developer while creating solutions that address real-world challenges.
            </p>
          </div>

          <div className="modern-about-socials">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <PinterestIcon />
            </a>
            <a href="https://www.linkedin.com/in/samjerishd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Right Column: Portrait */}
        <div className="modern-about-right">
          <div className="modern-about-image-wrapper">
            <img src={profileImg} alt="Sam Jerish" className="modern-about-image" />
          </div>
        </div>

      </div>
    </div>
  );
};
