import React from 'react';
import './ProjectsPage.css';

type Project = {
  id: number;
  name: string;
  description: string;
  details: string;
  link: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: 'Smart Home Automation',
    description: 'An IoT system that connects all household appliances to a centralized mobile application.',
    details: 'This project involved architecting a scalable backend using Node.js and WebSockets to handle real-time data from hundreds of simulated IoT devices. The frontend is a React Native app with a custom dark-mode UI designed for quick access to critical controls.',
    link: '#',
    image: '/1.png'
  },
  {
    id: 2,
    name: 'E-Commerce Dashboard',
    description: 'A comprehensive React-based analytics dashboard providing real-time sales data.',
    details: 'Built with React, Vite, and Recharts, this dashboard processes large datasets to render interactive graphs. It features customizable widget layouts, complex filtering, and export capabilities, tailored specifically for power-users in retail management.',
    link: '#',
    image: '/4.JPG'
  },
  {
    id: 3,
    name: 'AI Chat Assistant',
    description: 'A contextual chatbot built with OpenAI APIs, designed to help customers navigate support documentation.',
    details: 'Leveraging RAG (Retrieval-Augmented Generation) and vector databases, this assistant contextually understands user queries based on a company\'s internal documentation. It reduced support ticket volume by 30% in its initial pilot phase.',
    link: '#',
    image: '/5.png'
  },
  {
    id: 4,
    name: 'Fitness Tracker App',
    description: 'A cross-platform mobile application that gamifies daily exercise routines.',
    details: 'Designed from the ground up to prioritize user retention, this app uses subtle animations and a rewarding badge system. The technical stack includes Flutter and Firebase, with rigorous testing for offline-first capabilities.',
    link: '#',
    image: '/BQPV5141.JPG'
  },
  {
    id: 5,
    name: 'Portfolio Redesign',
    description: 'A modern, interactive portfolio website leveraging sleek CSS animations.',
    details: 'A fully responsive web application built with React. It focuses heavily on micro-interactions, CSS 3D transforms, and performant scroll-based animations to create a highly engaging, story-driven user experience without relying on heavy WebGL libraries.',
    link: '#',
    image: '/channel art.png'
  }
];

const TECH_STACK = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Premiere Pro', url: 'https://skillicons.dev/icons?i=pr' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'After Effects', url: 'https://skillicons.dev/icons?i=ae' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
];

export const ProjectsPage: React.FC<{ onNavigate: (page: 'home' | 'media' | 'about' | 'projects') => void }> = ({ onNavigate }) => {
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
        
        <div className="detailed-projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="detailed-project-card"
              style={{ top: `calc(10vh + ${index * 40}px)` }}
            >
              <div className="detailed-project-image-wrapper">
                <img src={project.image} alt={project.name} className="detailed-project-image" />
              </div>
              <div className="detailed-project-info">
                <h2>{project.name}</h2>
                <p className="detailed-project-desc">{project.description}</p>
                <p className="detailed-project-full-desc">{project.details}</p>
                <a href={project.link} className="detailed-project-link">View Project</a>
              </div>
            </div>
          ))}
        </div>

        <div className="tech-stack-section">
          <h2 className="tech-stack-heading">Technologies</h2>
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
          creativity and technology to solve real world problems
        </div>
      </div>
    </div>
  );
};
