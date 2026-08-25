import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

export const ContactSection: React.FC = () => {
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

    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`dark-contact-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="dark-contact-content">
        
        <div className="contact-copyright-top-right">
          <span>© 2026 Sam Jerish D</span>
        </div>

        {/* Header Section */}
        <div className="contact-hero-header">
          <h1>
            Lets <span className="handwriting-pink">build</span><br />
            incredible work together.
          </h1>
        </div>

        {/* Info Grid */}
        <div className="contact-info-grid">
          <div className="info-block">
            <span className="info-label">Email</span>
            <a href="mailto:samjerishd@gmail.com" className="info-value">samjerishd@gmail.com</a>
          </div>
          
          <div className="info-block">
            <span className="info-label">Social</span>
            <div className="social-circles">
              <a href="https://instagram.com/samjerishd" target="_blank" rel="noreferrer" className="social-circle">
                <FiInstagram />
              </a>
              <a href="https://linkedin.com/in/samjerishd" target="_blank" rel="noreferrer" className="social-circle">
                <FiLinkedin />
              </a>
              <a href="https://github.com/samjerish" target="_blank" rel="noreferrer" className="social-circle">
                <FiGithub />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Text (Outside content wrapper to stretch fully) */}
      <div className="contact-massive-text">
        <span style={{ color: '#ffffff' }}>SAM</span> <span style={{ color: '#888888' }}>JERISH D</span>
      </div>
      
    </section>
  );
};
