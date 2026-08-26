import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FileText } from 'lucide-react';
import thumpsupImage from '../../assets/thumpsup.png';

interface ContactSectionProps {
  onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['build', 'create', 'innovate'];
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
    
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    
    return () => {
      if (node) observer.unobserve(node);
      clearInterval(wordInterval);
    };
  }, [words.length]);

  return (
    <section ref={sectionRef} className={`dark-contact-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="dark-contact-content">
        


        {/* Header Section */}
        <div className="contact-hero-header">
          <h1>
            Lets <span key={wordIndex} className="handwriting-pink word-animate">{words[wordIndex]}</span><br />
            incredible work together.
          </h1>
        </div>

        {/* Info Grid */}
        <div className="contact-info-grid">
          <div className="info-block">
            <span className="info-label">Email</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="mailto:samjerishd@gmail.com" className="info-value">samjerishd@gmail.com</a>
              {onNavigate && (
                <button 
                  onClick={() => onNavigate('resume')}
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0, fontSize: '0.9rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', transition: 'color 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ccc'}
                  onMouseOut={e => e.currentTarget.style.color = '#ffffff'}
                >
                  <FileText size={16} /> VIEW RESUME
                </button>
              )}
            </div>
          </div>
          
          <div className="contact-splitter-vertical"></div>
          
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

        <div className="contact-splitter-horizontal"></div>
      </div>

      {/* Massive Text and Footer */}
      <div className="contact-massive-text-container">
        <div className="contact-massive-text">
          SAM JERISH D
        </div>
        
        <div className="contact-footer-line"></div>
        
        <div className="contact-footer-links">
          <div className="contact-footer-left">
            © 2026 Sam Jerish D / Reject all substitutes
          </div>
          <div className="contact-footer-right">
            <span>Security</span>
            <span>Terms of service</span>
            <span>Privacy policy</span>
          </div>
        </div>
      </div>
      
      <img src={thumpsupImage} alt="Thumbs Up" className="contact-thumpsup-image" />
    </section>
  );
};
