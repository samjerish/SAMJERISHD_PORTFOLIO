import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';
import profileImg from '../assets/animated_profile.png';
import { AnimatedLine } from './StorySection';

export const AboutSection: React.FC = () => {
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
        threshold: 0.2,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`about-container ${isVisible ? 'is-visible' : ''}`}
      id="about"
    >
      <div className="about-content">
        
        {/* LEFT COLUMN: Text content */}
        <div className="about-right">
          <h2 className="main-title">Just a little about me…</h2>
          
          <div className={`description about-story-text ${isVisible ? 'is-visible' : ''}`}>
            <AnimatedLine 
              text="I’m someone who loves to <learn, create, and experiment>." 
              baseDelay={0.2} 
            />
            <br />
            <br />
            <AnimatedLine 
              text="From <coding and robotics> to <photography and video editing>, I enjoy exploring different ways to turn an <idea into something real>. I’m still figuring things out, <still learning, and still creating>. And honestly, that’s the part of the <journey I enjoy the most>." 
              baseDelay={1.0} 
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Polaroid Card */}
        <div className="about-left">
          <div className="yellow-folder">
            <span className="play-text">PLAY &#x2197;</span>
          </div>
          
          <div className="polaroid-card">
            <div className="binder-clip">
              <svg width="60" height="70" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
                {/* Top wire */}
                <path d="M22 35 L22 15 C22 5, 38 5, 38 15 L38 35" stroke="#777" strokeWidth="3" fill="none" />
                {/* Black body */}
                <rect x="5" y="30" width="50" height="22" rx="3" fill="#050505" />
                {/* Binder clip reflections/details */}
                <rect x="5" y="30" width="50" height="4" fill="#222" />
                {/* Bottom wire overlapping */}
                <path d="M22 35 L12 60 C8 70, 52 70, 48 60 L38 35" stroke="#777" strokeWidth="3" fill="none" />
              </svg>
            </div>
            
            <div className="polaroid-image-wrapper">
              <img src={profileImg} alt="Sam Jerish" className="polaroid-image" />
            </div>
            
            <div className="polaroid-text">
              <h3>
                THIS IS WHO SAYS<br/>
                EVERYTHING IS<br/>
                FIGUREOUTABLE<br/>
                <span className="highlight-text">AND FIGURES OUT</span>
              </h3>
              
              <div className="info-section">
                <div className="info-row">
                  <span className="label">Name:</span> 
                  <span className="value handwriting">Sam Jerish</span>
                </div>
                <hr className="dashed-line" />
                <div className="info-row">
                  <span className="label">Role:</span> 
                  <span className="value handwriting">Developer</span>
                </div>
                <hr className="dashed-line" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
