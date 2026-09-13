import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import animatedProfile from "../../assets/animated_profile.png";
import { SpaceBackground } from "../ui/SpaceBackground";
import { Mail, ChevronDown, FileText } from "lucide-react";

export const HeroSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextEl =
      document.getElementById("about") || document.getElementById("projects");
    const lenis = (window as unknown as {
      __lenis?: {
        scrollTo: (
          target: HTMLElement | string,
          options?: { duration?: number; offset?: number },
        ) => void;
      };
    }).__lenis;

    if (lenis && nextEl) {
      lenis.scrollTo(nextEl, { duration: 1.1, offset: -20 });
    } else if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="hero-container new-hero" id="home" aria-label="Hero">
      <SpaceBackground colorTheme="black" />

      <div className="hero-content-wrapper center-layout">
        {/* Giant Background Text */}
        <div className="hero-background-text-new">
          <span className="text-line-1">SAM</span>
          <span className="text-line-2">JERISH D</span>
        </div>

        {/* Floating Avatar */}
        <div className="floating-avatar-new">
          <img
            src={animatedProfile}
            alt="Sam Jerish D avatar"
            className="hero-avatar-img-new"
          />
        </div>
      </div>

      {/* Bottom Elements */}
      <div className="hero-bottom-elements">
        <div className="hero-intro-text">
          <p>
            Developer building with <strong className="hero-strong">React, TypeScript, and Python</strong>.
            <br />
            I focus on clean interfaces, simple architectures, and software that solves real everyday problems.
          </p>
        </div>

        {/* Center Scroll Down Indicator */}
        <button
          type="button"
          className={`hero-scroll-indicator ${scrolled ? "is-scrolled" : ""}`}
          onClick={handleScrollDown}
          aria-label="Scroll down to about section"
          data-cursor-text="SCROLL"
        >
          <div className="scroll-indicator-mouse" aria-hidden="true">
            <div className="scroll-indicator-wheel" />
          </div>
          <div className="scroll-indicator-label">
            <span>SCROLL</span>
            <ChevronDown size={13} className="scroll-indicator-chevron" aria-hidden="true" />
          </div>
        </button>

        <div className="hero-cta-group">
          <a
            href="mailto:samjerishd@gmail.com"
            className="book-call-btn primary-cta"
            data-cursor-text="EMAIL"
            aria-label="Email samjerishd@gmail.com"
          >
            <Mail size={16} strokeWidth={2} />
            <span>Get in Touch</span>
          </a>

          <button
            type="button"
            className="book-call-btn resume-hero-btn"
            onClick={() => onNavigate?.("resume")}
            data-cursor-text="RESUME"
            aria-label="View Resume"
          >
            <FileText size={16} strokeWidth={2} />
            <span>Resume</span>
          </button>

          <div className="cta-status-indicator" title="Open for software developer internships and projects">
            <div className="cta-dot" aria-hidden="true"></div>
            <span className="cta-status-label">Open for internships &amp; work</span>
          </div>
        </div>
      </div>
    </section>
  );
};
