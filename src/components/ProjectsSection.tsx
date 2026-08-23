import React, { useState, useEffect, useRef } from 'react';
import './ProjectsSection.css';

type Project = {
  id: number;
  name: string;
  description: string;
  date: string;
  tag?: string;
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'PHYSITRACK GROUP IR',
    description: "Redesigning Physitrack Group's Investor Relations website to make...",
    date: 'Nov 2025',
    tag: 'Corporate UI/UX',
    link: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'DEUX HEADLESS CMS',
    description: 'A hands-on exploration of building, connecting, and deploying a scalable...',
    date: 'Nov 2025',
    tag: 'Full-Stack Web',
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'GAMIFYING ECOSIA',
    description: 'Designing a gamified Impact Dashboard that connects individual user activity...',
    date: 'Oct 2025',
    tag: 'Feature Scaling',
    link: '#',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'FITNESS TRACKER APP',
    description: 'A cross-platform mobile application that gamifies daily exercise routines.',
    date: 'Sep 2025',
    tag: 'Mobile App',
    link: '#',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'PORTFOLIO REDESIGN',
    description: 'A modern, interactive portfolio website leveraging sleek CSS animations.',
    date: 'Aug 2025',
    tag: 'Development',
    link: '#',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
  }
];

export const ProjectsSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <section ref={sectionRef} className={`portfolio-container ${isVisible ? 'is-visible' : ''}`} id="projects">
      <div className="portfolio-content-wrapper">
        
        <div className="portfolio-header">
          <h1 className="portfolio-headline">RECENT PROJECTS</h1>
          <p className="portfolio-subtext">
            This is a curated selection of projects I want to share. If anything catches
            your eye or sparks an idea, don't hesitate to drop me a message :)
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => window.location.href = project.link}>
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

        <div className="view-all-container">
          <button className="view-all-btn" onClick={() => onNavigate && onNavigate('projects')}>
            Click to view more
          </button>
        </div>

      </div>
    </section>
  );
};
