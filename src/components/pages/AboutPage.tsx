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

const ABOUT_PHOTOS = [
  {
    src: firstPhoto,
    alt: "Sam Jerish D - Building since early days",
    objectPosition: "18% center",
  },
  {
    src: profileImg,
    alt: "Sam Jerish D - Portrait",
    objectPosition: "center 15%",
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDir, setExitDir] = useState<number>(0);
  const dragStartRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const nextIndex = (photoIndex + 1) % ABOUT_PHOTOS.length;

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const triggerSwitch = (direction: number = 1) => {
    if (isExiting) return;
    setExitDir(direction);
    setIsExiting(true);
    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % ABOUT_PHOTOS.length);
      setIsExiting(false);
      setDragX(0);
      setExitDir(0);
    }, 320);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isExiting) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsHolding(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isExiting) return;
    const diff = e.clientX - dragStartRef.current;
    setDragX(diff);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isExiting) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDraggingRef.current = false;
    setIsHolding(false);

    if (dragX < -45) {
      triggerSwitch(1);
    } else if (dragX > 45) {
      triggerSwitch(-1);
    } else {
      if (Math.abs(dragX) < 6) {
        triggerSwitch(1);
      } else {
        setDragX(0);
      }
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
            <div className="photo-stack-deck">
              {/* Background Stack Card (Preview of next photo) */}
              <div
                className={`about-avatar-frame back-stack-card ${isHolding || isExiting ? "peeking" : ""}`}
              >
                <img
                  src={ABOUT_PHOTOS[nextIndex].src}
                  alt={ABOUT_PHOTOS[nextIndex].alt}
                  className="about-avatar-img"
                  style={{
                    objectPosition:
                      ABOUT_PHOTOS[nextIndex].objectPosition || "center center",
                  }}
                  draggable={false}
                />
              </div>

              {/* Foreground Active Card */}
              <div
                className={`about-avatar-frame top-active-card ${isHolding ? "is-holding" : ""} ${isExiting ? "is-exiting" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  transform: isExiting
                    ? `translate3d(${exitDir * 130}%, 0, 0) rotate(${exitDir * 20}deg) scale(0.9)`
                    : isHolding
                    ? `translate3d(${dragX}px, 0, 0) rotate(${dragX * 0.08}deg) scale(0.98)`
                    : "translate3d(0, 0, 0) rotate(0deg) scale(1)",
                  opacity: isExiting ? 0 : 1,
                  transition: isHolding
                    ? "none"
                    : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
                }}
              >
                <img
                  src={ABOUT_PHOTOS[photoIndex].src}
                  alt={ABOUT_PHOTOS[photoIndex].alt}
                  className="about-avatar-img"
                  style={{
                    objectPosition:
                      ABOUT_PHOTOS[photoIndex].objectPosition || "center center",
                  }}
                  draggable={false}
                />
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
                      if (i !== photoIndex) triggerSwitch(1);
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
