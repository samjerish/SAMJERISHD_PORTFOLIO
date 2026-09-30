import React, { useState, useEffect, useRef } from "react";
import "./ContactSection.css";
import { Mail } from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import githubBannerImg from "../../assets/github_banner.png";

interface ContactSectionProps {
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
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

    return () => {
      if (node) observer.unobserve(node);
      clearInterval(wordInterval);
    };
  }, [words.length]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`dark-contact-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="dark-contact-content">
        <div className="contact-main-grid">
          {/* Left Column: Header & Actions */}
          <div className="contact-hero-header">
            <span className="contact-section-kicker">GET IN TOUCH</span>
            <h1>
              Let's{" "}
              <span key={wordIndex} className="handwriting-pink word-animate">
                {words[wordIndex]}
              </span>
              <br />
              <span className="contact-heading-together">
                something great together.
              </span>
            </h1>

            {/* Contact Action Bar: Email + LinkedIn + Instagram + GitHub */}
            <div className="contact-actions-wrap">
              <a
                href="mailto:samjerishd@gmail.com"
                className="contact-hero-email-btn"
                data-cursor-text="EMAIL"
              >
                <Mail size={16} strokeWidth={2} />
                <span>samjerishd@gmail.com</span>
                <span className="contact-arrow-icon">↗</span>
              </a>

              <div className="contact-social-links">
                <a
                  href="https://linkedin.com/in/samjerishd"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  data-cursor-text="LINKEDIN"
                >
                  <FiLinkedin size={15} />
                  <span>LinkedIn</span>
                  <span className="contact-arrow-icon">↗</span>
                </a>

                <a
                  href="https://instagram.com/samjerishd"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  data-cursor-text="INSTA"
                >
                  <FiInstagram size={15} />
                  <span>Instagram</span>
                  <span className="contact-arrow-icon">↗</span>
                </a>

                <a
                  href="https://github.com/samjerish"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  data-cursor-text="GITHUB"
                >
                  <FiGithub size={15} />
                  <span>GitHub</span>
                  <span className="contact-arrow-icon">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: GitHub Banner Image (little big at right corner) */}
          <div className="contact-banner-container">
            <a
              href="https://github.com/samjerish"
              target="_blank"
              rel="noreferrer"
              className="contact-github-banner-card"
              data-cursor-text="GITHUB"
              aria-label="Sam Jerish GitHub Profile and Projects"
            >
              <img
                src={githubBannerImg}
                alt="Sam Jerish GitHub Banner"
                className="contact-github-banner-img"
                loading="lazy"
                draggable={false}
              />
              <div className="contact-banner-glass-glow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Watermark in one line */}
      <div className="contact-bottom-watermark">
        <span>© 2026 Sam Jerish D</span>
        <span className="watermark-dot">•</span>
        <span>All rights reserved</span>
      </div>
    </section>
  );
};
