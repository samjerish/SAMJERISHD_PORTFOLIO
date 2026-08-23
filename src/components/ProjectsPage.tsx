import React, { useEffect } from 'react';
import './ProjectsPage.css';
import './ProjectsSection.css';

type Project = {
  id: number;
  name: string;
  description: string;
  details: string;
  link: string;
  image: string;
  tag?: string;
  date?: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: 'PHYSITRACK GROUP IR',
    description: "Redesigning Physitrack Group's Investor Relations website to make...",
    details: 'This project involved architecting a scalable backend using Node.js and WebSockets to handle real-time data from hundreds of simulated IoT devices. The frontend is a React Native app with a custom dark-mode UI designed for quick access to critical controls.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tag: 'Corporate UI/UX',
    date: 'Nov 2025'
  },
  {
    id: 2,
    name: 'DEUX HEADLESS CMS',
    description: 'A hands-on exploration of building, connecting, and deploying a scalable...',
    details: 'Built with React, Vite, and Recharts, this dashboard processes large datasets to render interactive graphs. It features customizable widget layouts, complex filtering, and export capabilities, tailored specifically for power-users in retail management.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    tag: 'Full-Stack Web',
    date: 'Nov 2025'
  },
  {
    id: 3,
    name: 'GAMIFYING ECOSIA',
    description: 'Designing a gamified Impact Dashboard that connects individual user activity...',
    details: 'Leveraging RAG (Retrieval-Augmented Generation) and vector databases, this assistant contextually understands user queries based on a company\'s internal documentation. It reduced support ticket volume by 30% in its initial pilot phase.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    tag: 'Feature Scaling',
    date: 'Oct 2025'
  },
  {
    id: 4,
    name: 'FITNESS TRACKER APP',
    description: 'A cross-platform mobile application that gamifies daily exercise routines.',
    details: 'Designed from the ground up to prioritize user retention, this app uses subtle animations and a rewarding badge system. The technical stack includes Flutter and Firebase, with rigorous testing for offline-first capabilities.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    date: 'Sep 2025'
  },
  {
    id: 5,
    name: 'PORTFOLIO REDESIGN',
    description: 'A modern, interactive portfolio website leveraging sleek CSS animations.',
    details: 'A fully responsive web application built with React. It focuses heavily on micro-interactions, CSS 3D transforms, and performant scroll-based animations to create a highly engaging, story-driven user experience without relying on heavy WebGL libraries.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    tag: 'Development',
    date: 'Aug 2025'
  }
];

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
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card" 
              onClick={() => window.location.href = project.link}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-image-wrapper">
                {project.tag && (
                  <div className="project-tag">
                    <span className="tag-dot"></span> {project.tag}
                  </div>
                )}
                <img src={project.image} alt={project.name} className="project-image" />
              </div>
              <div className="project-info">
                <div className="project-info-header">
                  <h3 className="project-title">{project.name}</h3>
                  <span className="project-date">{project.date}</span>
                </div>
                <p className="project-desc">{project.description}</p>
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
          CREATIVITY AND TECHNOLOGY TO SOLVE REAL WORLD PROBLEMS
        </div>
      </div>
    </div>
  );
};
