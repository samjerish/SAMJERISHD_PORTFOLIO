import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { AboutSection } from './AboutSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import './PortfolioLayout.css';

export const PortfolioLayout: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about') => void }> = ({ onNavigate }) => {
  return (
    <div className="portfolio-layout">
      <Navbar onNavigate={onNavigate} />
      <main>
        <HeroSection />
        <StorySection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};
