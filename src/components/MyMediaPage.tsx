import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './MyMediaPage.css';
import { AnimatedLine } from './StorySection';

interface MyMediaPageProps {
  onNavigate: (page: 'home' | 'media') => void;
}

const HoverStackGallery = ({ photos }: { photos: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Defines the messy stack look for each card when collapsed
  const stackedRotations = [-6, 3, -3, 6, 0];
  const stackedOffsetsX = [-10, 10, -5, 5, 0];
  const stackedOffsetsY = [-10, -5, 10, 5, 0];

  return (
    <div 
      className="stack-gallery-container"
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <div className="hover-indicator">Hover or tap to expand</div>
      )}
      
      <div 
        className="stack-gallery-center"
        onMouseEnter={() => setIsHovered(true)}
        onClick={() => setIsHovered(!isHovered)}
      >
        {photos.map((src, index) => {
          
          // Spread 5 items evenly: index 0 to 4. Midpoint is 2.
          const multiplier = index - 2;
          
          // We use viewport width to ensure they spread nicely across the screen
          const expandedX = `${multiplier * 18}vw`;

          const x = isHovered ? expandedX : stackedOffsetsX[index];
          const y = isHovered ? 0 : stackedOffsetsY[index];
          const rotate = isHovered ? 0 : stackedRotations[index];
          const scale = isHovered ? 1.1 : 1;

          return (
            <motion.div
              key={index}
              className="stack-gallery-item"
              initial={false}
              animate={{
                x,
                y,
                rotate,
                scale,
                zIndex: isHovered ? 50 + index : index,
              }}
              whileHover={{
                scale: isHovered ? 1.2 : 1.05,
                zIndex: 100,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              <img src={src} alt={`Gallery ${index + 1}`} className="stack-gallery-image" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const MyMediaPage: React.FC<MyMediaPageProps> = ({ onNavigate }) => {
  const photos = [
    '/1.png',
    '/4.JPG',
    '/5.png',
    '/BQPV5141.JPG',
    '/channel art.png',
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
      
      {/* Interactive Hover Stack Gallery */}
      <HoverStackGallery photos={photos} />
    </div>
  );
};
