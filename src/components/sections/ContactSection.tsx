import React, { useState, useEffect, useRef } from "react";
import "./ContactSection.css";
import { Mail } from "lucide-react";

interface ContactSectionProps {
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const words = ["build", "create", "make"];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
      },
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    // Live Indian Standard Time (IST) Clock
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(istString);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      if (node) observer.unobserve(node);
      clearInterval(wordInterval);
      clearInterval(timeInterval);
    };
  }, [words.length]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`dark-contact-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="dark-contact-content">
        {/* Header Section */}
        <div className="contact-hero-header">
          <span className="contact-section-kicker">GET IN TOUCH</span>
          <h1>
            Let's{" "}
            <span key={wordIndex} className="handwriting-pink word-animate">
              {words[wordIndex]}
            </span>
            <br />
            something great together.
          </h1>
          <div className="contact-hero-email-wrap">
            <a
              href="mailto:samjerishd@gmail.com"
              className="contact-hero-email-btn"
              data-cursor-text="EMAIL"
            >
              <Mail size={16} strokeWidth={2} />
              <span>samjerishd@gmail.com</span>
              <span className="contact-arrow-icon">↗</span>
            </a>
          </div>
        </div>

        {/* 4-Column Architectural Grid in Reference Theme */}
        <div className="contact-theme-grid">
          {/* Column 1: INDEX */}
          <div className="contact-theme-col">
            <span className="contact-col-header">INDEX</span>
            <nav className="contact-col-list" aria-label="Page navigation">
              <button
                type="button"
                className="contact-nav-btn"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Work
              </button>
              <button
                type="button"
                className="contact-nav-btn"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About me
              </button>
              <button
                type="button"
                className="contact-nav-btn"
                onClick={() => {
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Experience
              </button>
              <button
                type="button"
                className="contact-nav-btn"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </button>
              <button
                type="button"
                className="contact-nav-btn"
                onClick={() => onNavigate?.("resume")}
              >
                <span>Resume</span>
                <span className="contact-arrow-icon">↗</span>
              </button>
            </nav>
          </div>

          {/* Column 2: CONNECT */}
          <div className="contact-theme-col">
            <span className="contact-col-header">CONNECT</span>
            <div className="contact-col-list">
              <a
                href="https://linkedin.com/in/samjerishd"
                target="_blank"
                rel="noreferrer"
                className="contact-link-item"
                data-cursor-text="LINKEDIN"
              >
                <span>LinkedIn</span>
                <span className="contact-arrow-icon">↗</span>
              </a>
              <a
                href="mailto:samjerishd@gmail.com"
                className="contact-link-item"
                data-cursor-text="EMAIL"
              >
                <span>Email</span>
                <span className="contact-arrow-icon">↗</span>
              </a>
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noreferrer"
                className="contact-link-item"
                data-cursor-text="GITHUB"
              >
                <span>GitHub</span>
                <span className="contact-arrow-icon">↗</span>
              </a>
              <a
                href="https://instagram.com/samjerishd"
                target="_blank"
                rel="noreferrer"
                className="contact-link-item"
                data-cursor-text="INSTA"
              >
                <span>Instagram</span>
                <span className="contact-arrow-icon">↗</span>
              </a>
            </div>
          </div>

          {/* Column 3: BASED IN */}
          <div className="contact-theme-col">
            <span className="contact-col-header">BASED IN</span>
            <div className="contact-col-list">
              <div className="contact-based-location">
                <span className="location-flag">🇮🇳</span>
                <span className="location-name">Nagarcoil, India</span>
              </div>
              <div className="contact-based-time">
                <span className="contact-live-dot" aria-hidden="true" />
                <span className="time-text">
                  {currentTime || "21:53"} IST
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: COPYRIGHT */}
          <div className="contact-theme-col">
            <span className="contact-col-header">© 2026</span>
            <div className="contact-col-list">
              <span className="contact-author-title">Sam Jerish D</span>
              <span className="contact-rights-text">All rights reserved</span>
            </div>
          </div>
        </div>

        {/* Subtle Dividing Line */}
        <div className="contact-theme-divider" />

        {/* Massive Full-Width Typographic Signature (Khaled Batt Style) */}
        <div className="contact-theme-massive-wrap">
          <div className="contact-theme-massive-text">
            SAM JERISH D
          </div>
        </div>
      </div>
    </section>
  );
};
