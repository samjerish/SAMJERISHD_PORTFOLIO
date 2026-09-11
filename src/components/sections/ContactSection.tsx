import React, { useState, useEffect, useRef } from "react";
import "./ContactSection.css";
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { FileText, Mail } from "lucide-react";
import thumpsupImage from "../../assets/thumpsup.png";

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
  const words = ["build", "create", "innovate"];
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
        {/* Header Section */}
        <div className="contact-hero-header">
          <h1>
            Let's{" "}
            <span key={wordIndex} className="handwriting-pink word-animate">
              {words[wordIndex]}
            </span>
            <br />
            incredible work together.
          </h1>
        </div>

        {/* Info Grid */}
        <div className="contact-info-grid">
          <div className="info-block">
            <span className="info-label">Email & Actions</span>
            <div className="contact-email-row">
              <a
                href="mailto:samjerishd@gmail.com"
                className="info-value"
                data-cursor-text="EMAIL"
              >
                samjerishd@gmail.com
              </a>
              {onNavigate && (
                <div className="contact-actions-group">
                  <button
                    type="button"
                    onClick={() => onNavigate("contact")}
                    className="contact-highlight-btn send-message-btn"
                    aria-label="Send a Message"
                    data-cursor-text="MESSAGE"
                  >
                    <Mail size={16} />
                    <span>Send Message</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate("resume")}
                    className="contact-highlight-btn view-resume-btn"
                    aria-label="View Resume"
                    data-cursor-text="RESUME"
                  >
                    <FileText size={16} />
                    <span>View Resume</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="contact-splitter-vertical"></div>

          <div className="info-block">
            <span className="info-label">Social Media</span>
            <div className="contact-social-row">
              <span className="info-value social-subtitle">
                Connect & Follow
              </span>
              <div className="contact-social-group">
                <a
                  href="https://instagram.com/samjerishd"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-pill social-instagram"
                  data-cursor-text="INSTA"
                  aria-label="Instagram Profile"
                >
                  <FiInstagram size={17} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com/in/samjerishd"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-pill social-linkedin"
                  data-cursor-text="LINKEDIN"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={17} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/samjerish"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-pill social-github"
                  data-cursor-text="GITHUB"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={17} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-splitter-horizontal"></div>
      </div>

      {/* Massive Text and Footer */}
      <div className="contact-massive-text-container">
        <div className="contact-massive-text-wrapper">
          <div className="contact-massive-text">
            SAM <span className="contact-massive-text-grey">JERISH D</span>
          </div>
          <img
            src={thumpsupImage}
            alt="Sam Jerish"
            className="contact-thumpsup-image"
          />
        </div>

        <div className="contact-footer-line"></div>

        <div className="contact-footer-links">
          <div className="contact-footer-left">
            <span>Reject all substitutes</span>
          </div>
          <div className="contact-footer-center">
            <span>© 2026 Sam Jerish. All rights reserved.</span>
          </div>
          <div className="contact-footer-right" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
};
