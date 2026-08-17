import React, { useState, useEffect, useMemo } from 'react';
import './HeroSection.css';
import avatarImg from '../assets/animated_profile.png';

// Generate random stars once on mount
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      xOffset: (Math.random() - 0.5) * 100, // -50 to 50 vw
      yOffset: Math.random() * 100, // 0 to 100 vh
      size: Math.random() * 4 + 1, // 1px to 5px
      opacity: Math.random() * 0.8 + 0.2,
    });
  }
  return stars;
};

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const stars = useMemo(() => generateStars(80), []); // 80 stars

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-container" id="home">
      {/* 1. Left Text Layer */}
      <div className="hero-text-layer">
        <div className="hero-text-content">
          <h1 className="hero-name">
            <span className="name-bright">SAM</span> <span className="name-light">JERISH D</span>
          </h1>
          <h2 className="hero-subtitle">FULL STACK DEVELOPER</h2>
          
          <div className="hero-actions">
            <a href="#projects" className="hero-btn btn-white">View Projects</a>
            <a href="#" className="hero-btn btn-black">Download CV</a>
          </div>
        </div>
      </div>
      
      {/* 2. Space Stars Background Layer */}
      <div className="hero-stars-layer">
        {stars.map((star) => (
          <div 
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `calc(50% + ${star.xOffset}vw)`,
              bottom: `${star.yOffset}vh`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* 3. Avatar Layer (Right Side) */}
      <div className="hero-content">
        <div className="avatar-wrapper">
          <img src={avatarImg} alt="Sam Jerish D." className="avatar-img" />
        </div>
      </div>
    </section>
  );
};



