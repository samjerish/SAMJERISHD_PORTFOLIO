import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import profileImg from '../assets/photo.jpg';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`about-page-wrapper ${isVisible ? 'is-visible' : ''}`}>
      <nav className="about-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </nav>

      <div className="new-about-layout">
        
        {/* Left Column: Photo & Details */}
        <div className="about-left-col">
          <div className="about-image-container">
            <img src={profileImg} alt="Sam Jerish D" className="about-image" />
            <div className="about-image-socials">
              <a href="https://instagram.com/samjerishd" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
              <a href="https://linkedin.com/in/samjerishd" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              <a href="https://github.com/samjerish" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
            </div>
          </div>
          
          <div className="about-title-block">
            <h2>Sam Jerish D</h2>
            <p>AIML Student | AI & ML Enthusiast | Full Stack Developer</p>
          </div>
        </div>

        {/* Right Column: Text content */}
        <div className="about-right-col">
          <p>I’m a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning, with a strong interest in full-stack development and emerging technologies.</p>
          
          <p>I enjoy building practical, user-focused solutions that combine technology, creativity, and problem-solving. My experience spans web development, AI-powered applications, UI/UX design, and software development.</p>
          
          <p>Beyond code, I also engage in creative work like photography and video editing. I’m passionate about continuously learning new technologies, exploring innovative ideas, and turning concepts into meaningful digital experiences.</p>
          
          <p>My goal is to keep growing by combining my background in computer science with creative problem-solving, and building work that feels clear, useful, and meaningful.</p>
          
          <div className="about-signature">
            <span>Sam Jerish</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};
