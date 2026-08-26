import React, { useEffect, useState } from 'react';
import './ProjectsPage.css';
import './ProjectsSection.css';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';

const TECH_STACK = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
];

export const ProjectsPage: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects') => void }> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="projects-page-wrapper is-visible">
      <nav className="projects-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Go Back
        </button>
      </nav>

      <div className="projects-page-content">
        <div className="projects-story-section">
          <div className="projects-story-text-container">
            <p className="story-line line-1">
              For me, every project starts with a problem, an idea, or simply a question
            </p>
            <p className="story-line line-what-if">
              "What if?"
            </p>
          </div>
        </div>
        
        <div className="projects-grid" style={{ marginBottom: '6rem' }}>
          {projects.map((project) => (
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

        <div className="tech-stack-section">
          <h2 className="tech-stack-heading">TECH STACK</h2>
          <div className="tech-stack-grid">
            {TECH_STACK.map((tech, index) => (
              <div key={index} className="tech-grid-item">
                <img src={tech.url} alt={tech.name} className="tech-grid-icon" />
                <span className="tech-grid-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="github-cta-section">
          <h2>More on GitHub</h2>
          <p>Want to see the code behind these projects or explore my other technical experiments? Dive into my repositories.</p>
          <a href="https://github.com/samjerish" target="_blank" rel="noopener noreferrer" className="github-link-btn">
            View My GitHub
          </a>
        </div>

        <div className="projects-watermark">
          CREATIVITY AND TECHNOLOGY TO SOLVE REAL WORLD PROBLEMS
        </div>
      </div>

      {/* Render Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
