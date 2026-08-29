import React, { useEffect } from "react";
import "./ResumePage.css";
import { FiDownload, FiArrowLeft } from "react-icons/fi";

interface ResumePageProps {
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const techSkills = [
    {
      name: "Python",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      name: "Java",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    },
    {
      name: "TypeScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    {
      name: "HTML",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    {
      name: "React",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "SQL",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    },
    {
      name: "Firebase",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    },
    {
      name: "Premiere Pro",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg",
    },
    {
      name: "After Effects",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg",
    },
    {
      name: "Blender",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
    },
  ];

  return (
    <div className="pro-resume-container fade-in-page">
      {/* ACTION BAR */}
      <div className="resume-action-bar">
        <button
          className="action-btn back-btn"
          onClick={() => onNavigate && onNavigate("home")}
        >
          <FiArrowLeft size={20} />
          <span>BACK TO HOME</span>
        </button>

        <a
          href="https://drive.google.com/file/d/1UDob2GDrfJLw3JD4dG5BLQTJCX5e28uz/view?usp=share_link"
          target="_blank"
          rel="noreferrer"
          className="action-btn download-btn"
        >
          <span>DOWNLOAD CV</span>
          <FiDownload size={20} />
        </a>
      </div>

      {/* DOCUMENT WRAPPER */}
      <div className="resume-document">
        {/* HEADER */}
        <header className="resume-doc-header">
          <h1 className="resume-doc-name">SAM JERISH D</h1>
          <h2 className="resume-doc-title">FULL-STACK DEVELOPER</h2>
          <div className="resume-doc-contact">
            <a href="mailto:samjerishd@gmail.com">samjerishd@gmail.com</a>
            <span className="dot-divider">•</span>
            <a
              href="https://www.linkedin.com/in/samjerishd/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/samjerishd/
            </a>
          </div>
        </header>

        <hr className="resume-divider" />

        {/* ABOUT */}
        <section className="resume-doc-section">
          <h3 className="section-heading">ABOUT ME</h3>
          <p className="resume-doc-text">
            Full Stack Developer passionate about continuously learning new
            skills and technologies to{" "}
            <strong>solve real-world problems</strong> through creativity and
            innovation. Skilled in frontend and backend development, UI/UX
            design, database management, APIs, and application development, with
            a focus on building scalable, responsive, and user-friendly
            solutions. I enjoy{" "}
            <strong>transforming ideas into practical applications</strong> by
            combining technology, creativity, and problem-solving while
            constantly exploring new tools and technologies to grow as a
            developer.
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
              Independent Full-Stack Developer, building responsive and
              user-friendly web applications based on project requirements.
              Focused on combining development, UI/UX, and modern technologies
              to create practical solutions.
            </p>
            <ul className="resume-doc-list">
              <li>
                Developed and managed web applications using frontend, backend,
                databases, and APIs.
              </li>
              <li>
                Independently handled project requirements, development, and
                delivery to create creative, scalable, and real-world solutions.
              </li>
            </ul>
          </div>

          <div className="resume-doc-item mt-4">
            <div className="item-header">
              <h4 className="item-title">
                PYTHON DEVELOPMENT INTERN | @SWIFTANT
              </h4>
              <span className="item-date">JUNE 2026</span>
            </div>
            <p className="resume-doc-text mb-2">
              Worked on Python-based application development, applying object
              oriented programming principles to build structured and
              maintainable solutions. Gained practical experience in debugging,
              problem-solving, and writing efficient code.
            </p>
            <ul className="resume-doc-list">
              <li>
                Developed Python applications using Object-Oriented Programming
                (OOP) principles.
              </li>
              <li>
                Strengthened debugging, problem-solving, and software
                development skills through hands-on projects.
              </li>
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="resume-doc-section">
          <h3 className="section-heading">EDUCATION</h3>
          <div className="resume-doc-item">
            <div className="item-header">
              <h4 className="item-title">
                KARUNYA INSTITUTE OF TECHNOLOGY AND SCIENCES (DEEMED UNIVERSITY)
              </h4>
              <span className="item-date">2024 - 2028</span>
            </div>
            <p className="resume-doc-text">
              B.Tech in Computer Science and Engineering (Artificial
              Intelligence & Machine Learning)
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-doc-section">
          <h3 className="section-heading">TECHNICAL SKILLS</h3>
          <div className="resume-skills-logo-grid">
            {techSkills.map((skill, index) => (
              <div key={index} className="resume-skill-logo-item">
                <img
                  src={skill.url}
                  alt={skill.name}
                  title={skill.name}
                  className="resume-skill-logo"
                />
                <span className="resume-skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
