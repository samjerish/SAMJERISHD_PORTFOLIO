import React, { useState } from 'react';
import './ProjectsSection.css';

type Project = {
  id: number;
  name: string;
  description: string;
  details: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: 'Smart Home Automation',
    description: 'An IoT system that connects all household appliances to a centralized mobile application.',
    details: 'This project involved architecting a scalable backend using Node.js and WebSockets to handle real-time data from hundreds of simulated IoT devices. The frontend is a React Native app with a custom dark-mode UI designed for quick access to critical controls.',
    link: '#',
  },
  {
    id: 2,
    name: 'E-Commerce Dashboard',
    description: 'A comprehensive React-based analytics dashboard providing real-time sales data.',
    details: 'Built with React, Vite, and Recharts, this dashboard processes large datasets to render interactive graphs. It features customizable widget layouts, complex filtering, and export capabilities, tailored specifically for power-users in retail management.',
    link: '#',
  },
  {
    id: 3,
    name: 'AI Chat Assistant',
    description: 'A contextual chatbot built with OpenAI APIs, designed to help customers navigate support documentation.',
    details: 'Leveraging RAG (Retrieval-Augmented Generation) and vector databases, this assistant contextually understands user queries based on a company\'s internal documentation. It reduced support ticket volume by 30% in its initial pilot phase.',
    link: '#',
  },
  {
    id: 4,
    name: 'Fitness Tracker App',
    description: 'A cross-platform mobile application that gamifies daily exercise routines.',
    details: 'Designed from the ground up to prioritize user retention, this app uses subtle animations and a rewarding badge system. The technical stack includes Flutter and Firebase, with rigorous testing for offline-first capabilities.',
    link: '#',
  },
  {
    id: 5,
    name: 'Portfolio Redesign',
    description: 'A modern, interactive portfolio website leveraging sleek CSS animations.',
    details: 'A fully responsive web application built with React. It focuses heavily on micro-interactions, CSS 3D transforms, and performant scroll-based animations to create a highly engaging, story-driven user experience without relying on heavy WebGL libraries.',
    link: '#',
  },
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <section className="projects-container" id="projects">
      <h2 className="projects-title">Selected Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-inner">
              
              {/* Front of card */}
              <div className="project-card-front">
                <h3>{project.name}</h3>
              </div>
              
              {/* Back of card */}
              <div className="project-card-back">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <button 
                  className="view-btn"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>&times;</button>
            <div className="project-modal-graphics"></div>
            <h2>{selectedProject.name}</h2>
            <p className="modal-description">{selectedProject.details}</p>
            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-project-link"
            >
              View Project
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
