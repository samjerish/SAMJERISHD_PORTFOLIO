import React, { useState, useEffect, useRef } from 'react';

import './ProjectsSection.css';
import clickHereGraphic from '../../assets/click_here.png';

import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { ProjectModal } from '../ui/ProjectModal';

export const ProjectsSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLElement>(null);
  
  // We only show the first 4 projects in the home section
  const featuredProjects = projects.slice(0, 4);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Visibility logic just for fading in the section title initially
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (scrollContainerRef.current) observer.unobserve(scrollContainerRef.current);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const node = scrollContainerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section ref={scrollContainerRef} className={`portfolio-container ${isVisible ? 'is-visible' : ''}`} id="projects">
      <div className="portfolio-content-wrapper">
        <div className="portfolio-header-static">
          <h1 className="portfolio-headline">RECENT PROJECTS</h1>
          <p className="portfolio-subtext">
            This is a curated selection of projects I want to share. If anything catches
            your eye or sparks an idea, don't hesitate to drop me a message :)
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card" 
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-card-header">
                <div className="project-card-logo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 22 22 22"></polygon></svg>
                </div>
                <span className="project-card-name">{project.name}</span>
              </div>
              
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.name} className="project-image" />
              </div>
              
              <div className="project-info">
                <h3 className="project-card-title">{project.description}</h3>
                <p className="project-card-desc">{project.details}</p>
                <div className="project-card-footer">
                  {project.tag && project.date ? `${project.tag}, ${project.date}` : project.date || project.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-banner" onClick={() => onNavigate && onNavigate('projects')}>
          <div className="view-all-graphic-wrapper">
            <img src={clickHereGraphic} alt="Click Here" className="view-all-avatar" />
          </div>
          <div className="view-all-text-wrapper">
            <h2>WANT TO SEE MORE?</h2>
            <p>Click here to view all my projects and experiments!</p>
          </div>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
};
