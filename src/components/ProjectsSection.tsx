import React, { useState } from 'react';
import './ProjectsSection.css';

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

const LEFT_TECH_STACK = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Premiere Pro', url: 'https://skillicons.dev/icons?i=pr' },
];

const RIGHT_TECH_STACK = [
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'After Effects', url: 'https://skillicons.dev/icons?i=ae' },
];

export const ProjectsSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // We repeat the smaller arrays multiple times to ensure the content is tall enough for a seamless loop
  const leftItems = [...LEFT_TECH_STACK, ...LEFT_TECH_STACK, ...LEFT_TECH_STACK, ...LEFT_TECH_STACK];
  const rightItems = [...RIGHT_TECH_STACK, ...RIGHT_TECH_STACK, ...RIGHT_TECH_STACK, ...RIGHT_TECH_STACK];

  return (
    <section className="projects-container" id="projects">
      {/* Left Marquee (Scrolls Up) */}
      <div className="vertical-marquee left-marquee">
        <div className="vertical-marquee-content scroll-up">
          {leftItems.map((tech, index) => (
            <div key={`left-${index}`} className="vertical-tech-item">
              <img src={tech.url} alt={tech.name} className="vertical-tech-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="accordion-wrapper">
        <h2 className="projects-title">Selected Projects</h2>
        
        <div className="projects-accordion">
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            
            return (
              <div 
                key={project.id} 
                className={`accordion-strip ${isHovered ? 'expanded' : ''}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background image container that fades in on hover */}
                <div 
                  className="strip-bg"
                  style={{ backgroundImage: `url("${project.image}")` }}
                />
                
                <div className="strip-content">
                  {/* The title always shows */}
                  <div className="strip-header">
                    <h3>{project.name}</h3>
                    <span className="strip-arrow">➔</span>
                  </div>
                  
                  {/* The details fade in/slide up when expanded */}
                  <div className="strip-details">
                    <p className="strip-desc">{project.description}</p>
                    <p className="strip-full-desc">{project.details}</p>
                    <a href={project.link} className="strip-link">View Project</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Marquee (Scrolls Down) */}
      <div className="vertical-marquee right-marquee">
        <div className="vertical-marquee-content scroll-down">
          {rightItems.map((tech, index) => (
            <div key={`right-${index}`} className="vertical-tech-item">
              <img src={tech.url} alt={tech.name} className="vertical-tech-icon" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
