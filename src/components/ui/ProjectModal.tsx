import React, { useEffect } from 'react';
import './ProjectModal.css';
import type { Project } from '../../data/projects';
import { FiX } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="modal-header-image">
          <img src={project.image} alt={project.name} />
          <div className="modal-header-gradient"></div>
          <h2 className="modal-title">{project.name}</h2>
        </div>

        <div className="modal-content">
          <div className="modal-section">
            <h3>Overview</h3>
            <p>{project.details || project.description}</p>
          </div>
          
          <div className="modal-split">
            <div className="modal-section problem">
              <h3>The Problem</h3>
              <p>{project.problemStatement}</p>
            </div>
            
            <div className="modal-section solution">
              <h3>The Solution</h3>
              <p>{project.solution}</p>
            </div>
          </div>
          
          <div className="modal-footer">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-view-btn">
              VIEW PROJECT ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
