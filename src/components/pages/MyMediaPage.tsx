import React, { useEffect, useRef, useState } from 'react';

import './MyMediaPage.css';
import { AnimatedLine } from '../sections/StorySection';

interface MyMediaPageProps {
  onNavigate: (page: 'home' | 'media') => void;
}

// @ts-ignore
import Masonry from '../ui/Masonry';

export const MyMediaPage: React.FC<MyMediaPageProps> = ({ onNavigate }) => {
  const basePath = import.meta.env.BASE_URL;
  const items = [
    { id: "1", img: `${basePath}media/media-1.jpg`, url: `${basePath}media/media-1.jpg`, height: 800 },
    { id: "2", img: `${basePath}media/media-2.jpg`, url: `${basePath}media/media-2.jpg`, height: 600 },
    { id: "3", img: `${basePath}media/media-3.jpg`, url: `${basePath}media/media-3.jpg`, height: 800 },
    { id: "4", img: `${basePath}media/media-4.png`, url: `${basePath}media/media-4.png`, height: 500 },
    { id: "5", img: `${basePath}media/media-5.jpg`, url: `${basePath}media/media-5.jpg`, height: 700 },
  ];

  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStoryVisible(true);
          if (storyRef.current) observer.unobserve(storyRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    const node = storyRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <div className="my-media-page">
      <nav className="media-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </nav>
      
      <div className="media-content">
        <h1 className="media-title">Beyond the Frame</h1>
        <p className="media-subtitle">A showcase of my recent production work.</p>
        
        <div className="media-story-section">
          <div 
            ref={storyRef} 
            className={`story-text ${isStoryVisible ? 'is-visible' : ''}`}
          >
            <AnimatedLine 
              text="What began as a hobby slowly became a passion for <photography and video editing>. With every photo I captured and every video I edited, I discovered a new way to express <creativity>." 
              baseDelay={0.2} 
            />
          </div>
        </div>
      </div>
      
      {/* Interactive Masonry Gallery */}
      <div style={{ height: '800px', width: '100%', position: 'relative', marginTop: '0rem' }}>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>
    </div>
  );
};
