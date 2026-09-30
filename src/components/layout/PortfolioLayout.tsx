import React, { useEffect } from "react";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { DriftWallSection } from "../sections/DriftWallSection";
import { ContactSection } from "../sections/ContactSection";
import "./PortfolioLayout.css";

export const PortfolioLayout: React.FC<{
  onNavigate: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          if (docHeight > 0 && progressBarRef.current) {
            const scroll = (totalScroll / docHeight) * 100;
            progressBarRef.current.style.width = `${scroll}%`;
            const container = progressBarRef.current.parentElement;
            if (container) {
              container.style.opacity = totalScroll > 10 ? "1" : "0";
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleTimelineAction = (
    e: React.MouseEvent<HTMLDivElement>,
    isDragging: boolean,
  ) => {
    if (isDragging && e.buttons !== 1) return;
    const { clientX } = e;
    const { innerWidth } = window;
    const clickRatio = Math.max(0, Math.min(1, clientX / innerWidth));

    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const targetScroll = windowHeight * clickRatio;

    window.scrollTo({
      top: targetScroll,
      behavior: isDragging ? "auto" : "smooth",
    });
  };

  return (
    <div className="portfolio-layout">
      <div
        className="scroll-progress-container"
        onClick={(e) => handleTimelineAction(e, false)}
        onMouseMove={(e) => handleTimelineAction(e, true)}
      >
        <div
          ref={progressBarRef}
          className="scroll-progress-bar"
          style={{ width: "0%" }}
        >
          <div className="timeline-dot" />
        </div>
      </div>
      <main ref={mainRef}>
        <div className="scroll-fade-wrapper">
          <HeroSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper">
          <ProjectsSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper experience-section-wrapper">
          <ExperienceSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper drift-wall-section-wrapper">
          <DriftWallSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper">
          <ContactSection onNavigate={onNavigate} />
        </div>
      </main>
    </div>
  );
};
