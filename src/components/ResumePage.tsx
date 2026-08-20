import React, { useEffect } from 'react';
import './ResumePage.css';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';

interface ResumePageProps {
  onNavigate?: (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techSkills = [
    "Python", "Java", "TypeScript", "HTML", "CSS", "React", 
    "SQL", "Firebase", "Adobe Premiere Pro", "After Effects", "Blender"
  ];

  return (
    <div className="pro-resume-container fade-in-page">
      
      {/* ACTION BAR */}
      <div className="resume-action-bar">
        <button 
          className="action-btn back-btn"
          onClick={() => onNavigate && onNavigate('home')}
        >
          <FiArrowLeft size={20} />
          <span>BACK TO HOME</span>
        </button>

        <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="action-btn download-btn">
          <span>DOWNLOAD CV</span>
          <FiDownload size={20} />
        </a>
      </div>

      {/* DOCUMENT WRAPPER */}
      <div className="resume-document">
        
        {/* HEADER */}
        <header className="resume-doc-header">
          <h1 className="resume-doc-name">SAM JERISH D</h1>
          <h2 className="resume-doc-title">ASPIRING FULL-STACK DEVELOPER</h2>
          <div className="resume-doc-contact">
            <span>+91 93453 13744</span>
            <span className="dot-divider">•</span>
            <a href="mailto:samjerishd@gmail.com">samjerishd@gmail.com</a>
            <span className="dot-divider">•</span>
            <a href="https://www.linkedin.com/in/samjerishd/" target="_blank" rel="noreferrer">linkedin.com/in/samjerishd/</a>
          </div>
        </header>

        <hr className="resume-divider" />

        {/* ABOUT */}
        <section className="resume-doc-section">
          <h3 className="section-heading">ABOUT ME</h3>
          <p className="resume-doc-text">
            Full Stack Developer passionate about continuously learning new skills and technologies to <strong>solve real-world problems</strong> through creativity and innovation. Skilled in frontend and backend development, UI/UX design, database management, APIs, and application development, with a focus on building scalable, responsive, and user-friendly solutions. I enjoy <strong>transforming ideas into practical applications</strong> by combining technology, creativity, and problem-solving while constantly exploring new tools and technologies to grow as a developer.
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-doc-section">
          <h3 className="section-heading">WORK EXPERIENCE</h3>
          
          <div className="resume-doc-item">
            <div className="item-header">
              <h4 className="item-title">FULL STACK DEVELOPER | INDEPENDENT</h4>
              <span className="item-date">2026 - NOW</span>
            </div>
            <p className="resume-doc-text mb-2">
              Independent Full-Stack Developer, building responsive and user-friendly web applications based on project requirements. Focused on combining development, UI/UX, and modern technologies to create practical solutions.
            </p>
            <ul className="resume-doc-list">
              <li>Developed and managed web applications using frontend, backend, databases, and APIs.</li>
              <li>Independently handled project requirements, development, and delivery to create creative, scalable, and real-world solutions.</li>
            </ul>
          </div>

          <div className="resume-doc-item mt-4">
            <div className="item-header">
              <h4 className="item-title">PYTHON DEVELOPMENT INTERN | @SWIFTANT</h4>
              <span className="item-date">JUNE 2026</span>
            </div>
            <p className="resume-doc-text mb-2">
              Worked on Python-based application development, applying object oriented programming principles to build structured and maintainable solutions. Gained practical experience in debugging, problem-solving, and writing efficient code.
            </p>
            <ul className="resume-doc-list">
              <li>Developed Python applications using Object-Oriented Programming (OOP) principles.</li>
              <li>Strengthened debugging, problem-solving, and software development skills through hands-on projects.</li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="resume-doc-section">
          <h3 className="section-heading">PROJECTS</h3>
          
          <div className="resume-doc-item">
            <div className="item-header">
              <h4 className="item-title">DATABASE MANAGEMENT WEBSITE</h4>
            </div>
            <span className="tech-stack-text mb-2">HTML, CSS, JS, FIREBASE</span>
            <ul className="resume-doc-list">
              <li>Developed a web-based Database Management System with an intuitive interface for efficiently creating, managing, updating, and retrieving structured data.</li>
              <li>Integrated Firebase for real-time database management, secure data storage, and seamless synchronization between the application and backend.</li>
            </ul>
          </div>

          <div className="resume-doc-item mt-4">
            <div className="item-header">
              <h4 className="item-title">AUTONOMOUS MOBILE ROBOT</h4>
            </div>
            <span className="tech-stack-text mb-2">REACT, TYPESCRIPT, BLENDER</span>
            <ul className="resume-doc-list">
              <li>Developed an autonomous mobile robot for university by integrating Intelligent Robotics and Computer Vision for real-time environment perception and autonomous navigation.</li>
              <li>Implemented computer vision-based object detection and obstacle avoidance, enabling the robot to analyze its surroundings and make autonomous movement decisions.</li>
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-doc-section">
          <h3 className="section-heading">EDUCATION</h3>
          <div className="resume-doc-item">
            <div className="item-header">
              <h4 className="item-title">KARUNYA INSTITUTE OF TECHNOLOGY AND SCIENCES (DEEMED UNIVERSITY)</h4>
              <span className="item-date">2024 - 2028</span>
            </div>
            <p className="resume-doc-text">B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)</p>
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-doc-section">
          <h3 className="section-heading">TECHNICAL SKILLS</h3>
          <div className="tech-pill-container-static">
            {techSkills.map((skill, index) => (
              <span key={index} className="skill-pill-static">{skill}</span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
