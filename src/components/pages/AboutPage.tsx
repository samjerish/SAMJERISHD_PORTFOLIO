import React, { useEffect, useState } from "react";
import "./AboutPage.css";
import { ArrowLeft, FileText, ArrowUpRight } from "lucide-react";
import profilePhoto from "../../assets/me.jpg";
import { GitHubContributions } from "../ui/GitHubContributions";
import { Footer } from "../layout/Footer";

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
      <nav className="about-nav" aria-label="About page navigation">
        <button
          className="back-btn"
          onClick={() => onNavigate("home")}
          aria-label="Back to Home"
          data-cursor-text="BACK"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Back to Home</span>
        </button>
      </nav>

      <main className="about-main-container">
        {/* Recruiter-Focused Profile Hero */}
        <section className="about-profile-hero" aria-label="Profile Overview">
          {/* Left Column: Photo Card */}
          <div className="about-hero-image-wrapper">
            <div className="photo-3d-container">
              <div className="photo-3d-card">
                <div className="photo-card-front">
                  <img
                    src={profilePhoto}
                    alt="Sam Jerish D"
                    className="photo-actual-img"
                    loading="eager"
                  />
                  <div className="photo-glass-glare" aria-hidden="true" />
                  <div className="photo-caption-tag">
                    <span className="caption-dot" aria-hidden="true" />
                    <span>Sam Jerish D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Background */}
          <div className="about-hero-info">
            <div className="about-hero-tagline">
              <span className="tagline-item">DEVELOPER</span>
              <span className="tagline-bullet" aria-hidden="true">•</span>
              <span className="tagline-item">CSE (AI &amp; ML) @ KARUNYA</span>
            </div>

            <h1 className="about-hero-name">SAM JERISH D</h1>

            <div className="about-bio-paragraphs">
              <p>
                Hi, I'm Sam. I'm a computer science student and developer based in India. Most of my day-to-day programming is done with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Python</strong>.
              </p>
              <p>
                I got into development because I like building tools that fix real, everyday headaches. When our residential committee in Hosur was logging collections by hand in paper notebooks and losing receipts, I built them a web ledger. When study timers felt bloated with ads and subscriptions, I made FocusFlow so students could jump straight into focused study sessions.
              </p>
              <p>
                I care about simplicity and reliability over chasing hype. When I build an interface or write backend logic, I want it to load fast, feel intuitive to anyone using it, and be straightforward to maintain.
              </p>
              <p>
                Beyond web development, I enjoy experimenting with OpenCV computer vision on hardware like Arduino rovers, and learning more about distributed backend patterns and database architecture.
              </p>
            </div>

            {/* Recruiter Quick Actions */}
            <div className="about-hero-actions" style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="back-btn"
                style={{ background: "#ffffff", color: "#000000", borderColor: "#ffffff" }}
                onClick={() => onNavigate("resume")}
                data-cursor-text="RESUME"
              >
                <FileText size={16} strokeWidth={2} />
                <span>View Full Resume</span>
              </button>

              <button
                type="button"
                className="back-btn"
                onClick={() => onNavigate("projects")}
                data-cursor-text="WORK"
              >
                <span>Explore Featured Projects</span>
                <ArrowUpRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>

        {/* Live GitHub Coding Activity & Contributions */}
        <section style={{ marginTop: "4rem" }} aria-label="GitHub Contributions">
          <GitHubContributions />
        </section>
      </main>

      <Footer />
    </div>
  );
};
