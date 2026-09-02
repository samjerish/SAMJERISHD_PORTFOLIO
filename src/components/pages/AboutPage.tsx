import React, { useEffect, useState } from "react";
import "./AboutPage.css";
import profileImg from "../../assets/photo.jpg";
import { FiInstagram, FiLinkedin, FiGithub, FiMail, FiBriefcase, FiBookOpen, FiCode } from "react-icons/fi";
import { GitHubContributions } from "../ui/GitHubContributions";

interface AboutPageProps {
  onNavigate: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`about-page-wrapper ${isVisible ? "is-visible" : ""}`}>
      {/* Navigation Bar */}
      <nav className="about-nav">
        <button className="back-btn" onClick={() => onNavigate("home")}>
          ← Back to Home
        </button>
      </nav>

      <div className="about-main-container">
        {/* Profile Hero Header */}
        <div className="about-profile-hero">
          <div className="about-hero-image-wrapper">
            <div className="about-avatar-frame">
              <img
                src={profileImg}
                alt="Sam Jerish D"
                className="about-avatar-img"
              />
              <div className="avatar-status-pill">
                <span className="status-live-dot"></span>
                <span>Active & Building</span>
              </div>
            </div>

            <div className="about-hero-socials">
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                title="GitHub"
              >
                <FiGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/samjerishd"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                title="LinkedIn"
              >
                <FiLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/samjerishd"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                title="Instagram"
              >
                <FiInstagram />
                <span>Instagram</span>
              </a>
              <a
                href="mailto:samjerishd@gmail.com"
                className="social-pill"
                title="Email"
              >
                <FiMail />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="about-hero-info">
            <span className="about-hero-kicker">ABOUT ME</span>
            <h1 className="about-hero-name">SAM JERISH D</h1>
            <h2 className="about-hero-tagline">
              AIML Student • Full Stack Developer • Creative Problem Solver
            </h2>

            <div className="about-bio-paragraphs">
              <p>
                I’m a Computer Science and Engineering student specializing in{" "}
                <strong>Artificial Intelligence & Machine Learning</strong>, with
                a profound passion for building intelligent, user-centric full stack
                web applications and software solutions.
              </p>
              <p>
                My philosophy is simple:{" "}
                <em>"Everything is figureoutable."</em> I love exploring the
                intersection of technology and creativity—turning curious ideas
                into real, useful, and responsive digital products.
              </p>
              <p>
                Beyond code, I also engage in photography, video editing, and
                creative media, bringing an aesthetic eye and attention to detail to
                every application I design.
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience & Education Milestones */}
        <section className="about-experience-section">
          <div className="experience-header">
            <span className="exp-badge">JOURNEY & MILESTONES</span>
            <h2 className="exp-heading">WORK EXPERIENCE & EDUCATION</h2>
          </div>

          <div className="experience-timeline-grid">
            {/* Card 1 */}
            <div className="timeline-card">
              <div className="timeline-icon-box">
                <FiCode />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">2024 — PRESENT</span>
                <h3 className="timeline-role">Full Stack & AI Developer</h3>
                <h4 className="timeline-org">Freelance & Independent Projects</h4>
                <p className="timeline-desc">
                  Architected and deployed full stack web applications including
                  FocusFlow, EcoTracker, Community Maintenance Management System,
                  and Firebase Database Management Systems. Focused on responsive
                  design, cloud databases, and clean user experience.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="timeline-card">
              <div className="timeline-icon-box edu-box">
                <FiBookOpen />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">2023 — 2027</span>
                <h3 className="timeline-role">B.Tech in Computer Science (AIML)</h3>
                <h4 className="timeline-org">Undergraduate Degree</h4>
                <p className="timeline-desc">
                  Specializing in Artificial Intelligence and Machine Learning.
                  Deep coursework in Data Structures, Algorithms, Machine Learning
                  Pipelines, Deep Learning, and Autonomous Robotics Systems.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="timeline-card">
              <div className="timeline-icon-box bot-box">
                <FiBriefcase />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">2024 — 2025</span>
                <h3 className="timeline-role">Autonomous Robotics & Computer Vision</h3>
                <h4 className="timeline-org">University Research & Development</h4>
                <p className="timeline-desc">
                  Engineered autonomous obstacle navigation robots utilizing
                  sensor arrays, embedded microcontrollers, and Computer Vision
                  algorithms for environmental perception and navigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live GitHub Contributions & Real-Time Stats */}
        <GitHubContributions />
      </div>
    </div>
  );
};
