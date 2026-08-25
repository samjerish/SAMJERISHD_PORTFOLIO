import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ProjectsSection.css';
import clickHereGraphic from '../assets/click_here.png';

import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC<{ onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void }> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // The scroll container that will be tall (e.g., 400vh)
  const scrollContainerRef = useRef<HTMLElement>(null);

  // We only show the first 3 projects in the home section
  const featuredProjects = projects.slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Card 0 Animation
  const rotateX0 = useTransform(scrollYProgress, [0, 0.25, 0.35], [0, 0, 90]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const scale0 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0.8]);
  const pointerEvents0 = useTransform(scrollYProgress, [0, 0.25, 0.35], ["auto", "auto", "none"]);

  // Card 1 Animation
  const rotateX1 = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [-90, 0, 0, 90]);
  const opacity1 = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0.8, 1, 1, 0.8]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], ["none", "auto", "auto", "none"]);

  // Card 2 Animation
  const rotateX2 = useTransform(scrollYProgress, [0.6, 0.7, 1], [-90, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.6, 0.7, 1], [0.8, 1, 1]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.6, 0.7, 1], ["none", "auto", "auto"]);

  const transforms = [
    { rotateX: rotateX0, opacity: opacity0, scale: scale0, pointerEvents: pointerEvents0 },
    { rotateX: rotateX1, opacity: opacity1, scale: scale1, pointerEvents: pointerEvents1 },
    { rotateX: rotateX2, opacity: opacity2, scale: scale2, pointerEvents: pointerEvents2 },
  ];

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

        {/* Tall container for scrolling */}
        <div className="scroll-sequence-container">
          {/* Sticky container that holds the 3D perspective scene */}
          <div className="sticky-3d-scene">
            <div className="projects-grid-3d">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="project-card-3d" 
                  onClick={() => handleProjectClick(project)}
                  style={{
                    rotateX: transforms[index].rotateX,
                    opacity: transforms[index].opacity,
                    scale: transforms[index].scale,
                    pointerEvents: transforms[index].pointerEvents,
                    transformOrigin: 'center center -100px'
                  }}
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
                </motion.div>
              ))}
            </div>
          </div>
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
