import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import animatedProfile from "../../assets/animated_profile.png";
import { SpaceBackground } from "../ui/SpaceBackground";
import { Mail, ChevronDown } from "lucide-react";

export const HeroSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate: _onNavigate }) => {
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
    <section className="hero-container new-hero" id="home">
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
            alt="Sam Jerish"
            className="hero-avatar-img-new"
          />
        </div>
      </div>



      {/* Bottom Elements */}
      <div className="hero-bottom-elements">
        <div className="hero-intro-text">
          <p>
            <span className="waving-hand">👋</span> I'm a Full Stack Developer
            who loves to learn, create, and experiment.
            <br />I enjoy exploring different ways to turn an idea into
            something real.
          </p>
        </div>

        {/* Center Scroll Down Indicator */}
        <button
          type="button"
          className={`hero-scroll-indicator ${scrolled ? "is-scrolled" : ""}`}
          onClick={handleScrollDown}
          aria-label="Scroll down to story"
          data-cursor-text="SCROLL"
        >
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-wheel" />
          </div>
          <div className="scroll-indicator-label">
            <span>SCROLL</span>
            <ChevronDown size={13} className="scroll-indicator-chevron" />
          </div>
        </button>

        <div className="hero-cta-group">
          <a
            href="mailto:samjerishd@gmail.com"
            className="book-call-btn"
            data-cursor-text="EMAIL"
          >
            <Mail size={16} strokeWidth={2} />
            <span>Email Me</span>
          </a>
          <div className="cta-status-indicator" title="Available for work">
            <div className="cta-dot"></div>
            <span className="cta-status-label">Available for work</span>
          </div>
        </div>
      </div>
    </section>
  );
};
