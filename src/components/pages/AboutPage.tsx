import React, { useEffect, useState } from "react";
import "./AboutPage.css";
import profileImg from "../../assets/photo.jpg";
import {
  FiCode,
  FiTerminal,
  FiVideo,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
} from "react-icons/fi";
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
          </div>

          <div className="about-hero-info">
            <span className="about-hero-kicker">ABOUT ME</span>
            <h1 className="about-hero-name">SAM JERISH D</h1>
            <h2 className="about-hero-tagline">
              AIML Student • Full Stack Developer • Creative Problem Solver
            </h2>

            <div className="about-bio-paragraphs">
              <p>
                I’m an AI & Machine Learning student and Full Stack Developer
                who thrives on building high-performance web experiences,
                intelligent systems, and creative digital media.
              </p>
              <p>
                My philosophy is simple:{" "}
                <em>"Solving Real world problems through creativity and technology."</em> I love exploring the
                intersection of technology and creativity—turning curious ideas
                into real, useful, and responsive digital products.
              </p>
              <p>
                Whether it's architecting reactive frontend interfaces,
                engineering automation pipelines, or capturing stories through
                visual media, I bring relentless curiosity and meticulous
                craftsmanship to everything I build.
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience Milestones */}
        <section className="about-experience-section">
          <div className="experience-header">
            <span className="exp-badge">JOURNEY & MILESTONES</span>
            <h2 className="exp-heading">WORK EXPERIENCE</h2>
          </div>

          <div className="experience-timeline-grid">
            {/* Card 1: Freelance & Independent Projects */}
            <div className="timeline-card">
              <div className="timeline-icon-box">
                <FiCode />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">2024 — PRESENT</span>
                <h3 className="timeline-role">Full Stack & AI Developer</h3>
                <h4 className="timeline-org">Freelance & Independent Projects</h4>
                <p className="timeline-desc">
                  Designing and deploying end-to-end full stack web platforms,
                  integrating responsive user interfaces with reactive backend
                  APIs and cloud-native hosting architectures.
                </p>
              </div>
            </div>

            {/* Card 2: Python Development Intern @Swiftant */}
            <div className="timeline-card">
              <div className="timeline-icon-box intern-box">
                <FiTerminal />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">JUNE 2026</span>
                <h3 className="timeline-role">Python Development Intern</h3>
                <h4 className="timeline-org">@Swiftant</h4>
                <p className="timeline-desc">
                  Worked on Python-based application development, applying Object-Oriented
                  Programming (OOP) principles to build structured and maintainable solutions.
                  Strengthened debugging, problem-solving, and software development skills through hands-on projects.
                </p>
              </div>
            </div>

            {/* Card 3: Media Coordinator @MatrixKarunya */}
            <div className="timeline-card">
              <div className="timeline-icon-box media-box">
                <FiVideo />
              </div>
              <div className="timeline-content">
                <span className="timeline-period">APR 2024 — PRESENT</span>
                <h3 className="timeline-role">Media Coordinator</h3>
                <h4 className="timeline-org">@MatrixKarunya</h4>
                <p className="timeline-desc">
                  Delivered multimedia coverage for 50+ events, producing 35K+ visual
                  assets and 25+ videos while managing the department’s official social
                  media platforms to enhance public engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live GitHub Contributions & Real-Time Stats */}
        <GitHubContributions />

        {/* Bottom Four Social Media Icons */}
        <div className="about-bottom-socials">
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noopener noreferrer"
            className="about-social-icon-btn"
            aria-label="GitHub"
            title="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="about-social-icon-btn"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="https://instagram.com/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="about-social-icon-btn"
            aria-label="Instagram"
            title="Instagram"
          >
            <FiInstagram />
          </a>
          <a
            href="mailto:samjerishd@gmail.com"
            className="about-social-icon-btn"
            aria-label="Email"
            title="Email"
          >
            <FiMail />
          </a>
        </div>
      </div>
    </div>
  );
};
