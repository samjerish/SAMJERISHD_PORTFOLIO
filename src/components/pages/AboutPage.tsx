import React, { useEffect, useState, useRef } from "react";
import "./AboutPage.css";
import firstPhoto from "../../assets/first_photo.png";
import profileImg from "../../assets/photo.jpg";
import me2Img from "../../assets/me2.jpg";
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

const ABOUT_PHOTOS = [
  { src: firstPhoto, alt: "Sam Jerish D" },
  { src: profileImg, alt: "Sam Jerish D - Portrait" },
  { src: me2Img, alt: "Sam Jerish D - Creative" },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const dragStartRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsHolding(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - dragStartRef.current;
    setDragX(diff);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDraggingRef.current = false;
    setIsHolding(false);

    if (dragX < -65) {
      setPhotoIndex((prev) => (prev + 1) % ABOUT_PHOTOS.length);
    } else if (dragX > 65) {
      setPhotoIndex((prev) => (prev - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
    }
    setDragX(0);
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
            <div
              className={`about-avatar-frame swipe-interactive ${isHolding ? "is-holding" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg) ${isHolding ? "scale(0.98)" : "scale(1)"}`,
                transition: isHolding ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <img
                src={ABOUT_PHOTOS[photoIndex].src}
                alt={ABOUT_PHOTOS[photoIndex].alt}
                className="about-avatar-img"
                draggable={false}
              />

              {/* Hold & Swipe Gesture Pill */}
              <div className="avatar-swipe-hint-pill">
                <span>Hold & swipe</span>
                <span className="swipe-arrows">⇄</span>
              </div>

              {/* Status Indicator */}
              <div className="avatar-status-pill">
                <span className="status-live-dot"></span>
                <span>Active & Building</span>
              </div>

              {/* Photo Indicator Dots */}
              <div className="avatar-dots-indicator">
                {ABOUT_PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`avatar-dot ${i === photoIndex ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex(i);
                    }}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
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
                When I’m not coding or debugging, you’ll usually find me behind a camera capturing campus events or editing video content for <strong>@MatrixKarunya</strong>.
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
