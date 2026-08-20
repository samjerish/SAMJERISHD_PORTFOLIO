import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';
import { FiLinkedin, FiInstagram, FiGithub, FiMail } from 'react-icons/fi';

export const ContactSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <section ref={sectionRef} className={`dark-contact-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="dark-contact-content">
        
        {/* Logo Container */}
        <div className="stylized-logo-wrapper">
          <div className="logo-script-text">the</div>
          <div className="logo-main-text">Sam Jerish <span className="logo-slash">/</span> D</div>
          
          {/* Decorative lines */}
          <div className="logo-line-horizontal"></div>
          <div className="logo-line-diagonal"></div>
        </div>

        {/* Social Icons */}
        <div className="dark-social-icons">
          <a href="https://www.linkedin.com/in/samjerishd" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-linkedin">
            <FiLinkedin size={32} strokeWidth={1.5} />
          </a>
          <a href="https://github.com/samjerish" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-github">
            <FiGithub size={32} strokeWidth={1.5} />
          </a>
          <a href="https://www.instagram.com/samjerishd" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-instagram">
            <FiInstagram size={32} strokeWidth={1.5} />
          </a>
          <a href="mailto:samjerishd@gmail.com" aria-label="Email" className="social-mail">
            <FiMail size={32} strokeWidth={1.5} />
          </a>
        </div>

        {/* Headings */}
        <h2 className="dark-contact-heading">
          From concept to<br/>creation, let's make<br/>it happen
        </h2>

        <p className="dark-contact-subheading">
          Curious to know more about my work and process?<br/>
          Let's connect and talk about what really matters.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="contact-btn-primary" onClick={() => onNavigate && onNavigate('contact')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Get in Touch
            </span>
          </button>
          
          <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="contact-btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              View Resume
            </span>
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="contact-footer-bar">
        <div className="footer-left">
          © 2026 SAM JERISH D . BUILT WITH ❤️
        </div>
        <div className="footer-right">
          <span className="status-dot-green"></span> Available <span className="time-display">{timeString}</span>
        </div>
      </div>
    </section>
  );
};
