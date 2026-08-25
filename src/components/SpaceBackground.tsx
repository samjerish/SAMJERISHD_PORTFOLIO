import React, { useState } from 'react';
import './SpaceBackground.css';

interface SpaceBackgroundProps {
  colorTheme?: 'black' | 'purple' | 'blue';
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ colorTheme = 'black' }) => {
  // Generate random stars for the space theme
  const generateStars = (count: number) => {
    let shadows = '';
    for(let i=0; i<count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows += `${x}px ${y}px #FFF${i < count - 1 ? ', ' : ''}`;
    }
    return shadows;
  };

  const [stars] = useState(() => ({
    small: generateStars(700),
    medium: generateStars(200),
    large: generateStars(50)
  }));

  return (
    <div className={`global-space-theme theme-${colorTheme}`}>
      <div className="stars-layer stars-small" style={{ boxShadow: stars.small }}></div>
      <div className="stars-layer stars-medium" style={{ boxShadow: stars.medium }}></div>
      <div className="stars-layer stars-large" style={{ boxShadow: stars.large }}></div>
    </div>
  );
};
