import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { ProjectsSection } from './ProjectsSection';
import './PortfolioLayout.css';

export const PortfolioLayout: React.FC = () => {
  return (
    <div className="portfolio-layout">
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <ProjectsSection />
      </main>
      {/* Additional sections (Work, Contact) can be added here in the future */}
    </div>
  );
};
