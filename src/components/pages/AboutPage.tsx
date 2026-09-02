import React, { useEffect, useState, useRef } from "react";
import "./AboutPage.css";
import firstPhoto from "../../assets/first_photo.png";
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateOffset, setRotateOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const diffX = e.clientX - dragStartRef.current.x;
    const diffY = e.clientY - dragStartRef.current.y;
    setRotateOffset({
      y: Math.max(-28, Math.min(28, diffX * 0.22)),
      x: Math.max(-18, Math.min(18, -diffY * 0.18)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const diffX = e.clientX - dragStartRef.current.x;
    setIsDragging(false);
    setRotateOffset({ x: 0, y: 0 });

    if (Math.abs(diffX) > 25 || Math.abs(diffX) < 5) {
      setIsFlipped((prev) => !prev);
    }
  };

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
            <div className="photo-3d-container">
              <div
                className={`photo-3d-card ${isFlipped ? "is-flipped" : ""} ${isDragging ? "is-dragging" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  transform: `rotateX(${rotateOffset.x}deg) rotateY(${
                    (isFlipped ? 180 : 0) + rotateOffset.y
                  }deg)`,
                }}
              >
                {/* Front Face: 1st Photo */}
                <div className="photo-card-face front-face">
                  <img
                    src={firstPhoto}
                    alt="Sam Jerish D - Building"
                    className="about-avatar-img"
                    style={{ objectPosition: "18% center" }}
                    draggable={false}
                  />
                  <div className="photo-glass-glare"></div>
                </div>

                {/* Back Face: Portrait Photo */}
                <div className="photo-card-face back-face">
                  <img
                    src={profileImg}
                    alt="Sam Jerish D - Portrait"
                    className="about-avatar-img"
                    style={{ objectPosition: "center 15%" }}
                    draggable={false}
                  />
                  <div className="photo-glass-glare"></div>
                </div>
              </div>

              {/* Photo Indicator Dots */}
              <div className="avatar-dots-indicator">
                <button
                  type="button"
                  className={`avatar-dot ${!isFlipped ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  aria-label="Photo 1"
                />
                <button
                  type="button"
                  className={`avatar-dot ${isFlipped ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  aria-label="Photo 2"
                />
              </div>
            </div>
          </div>

          <div className="about-hero-info">
            <h1 className="about-hero-name">SAM JERISH D</h1>
            <h2 className="about-hero-tagline">
              AIML Student • Full Stack Developer • Creative Problem Solver
            </h2>

            <div className="about-bio-paragraphs">
              <p>
                Hey, I’m <strong>Sam Jerish</strong> — a Computer Science student specializing in AI & Machine Learning. I build full-stack web applications, experiment with intelligent software, and create visual media.
              </p>
              <p>
                My philosophy is simple:{" "}
                <em>"Solving Real world problems through creativity and technology."</em> I love taking ideas from scratch and turning them into practical, clean, and responsive digital products that people can actually use.
              </p>
              <p>
                When I’m not coding or debugging, you’ll usually find me behind a camera capturing photos and editing videos.
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
                  Building and deploying web applications, working with React, TypeScript, Python, and cloud backends. Focused on clean UI, smooth performance, and practical user experience.
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
            className="about-social-icon-btn github-btn"
            aria-label="GitHub"
            title="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="about-social-icon-btn linkedin-btn"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="https://instagram.com/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="about-social-icon-btn instagram-btn"
            aria-label="Instagram"
            title="Instagram"
          >
            <FiInstagram />
          </a>
          <a
            href="mailto:samjerishd@gmail.com"
            className="about-social-icon-btn email-btn"
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
