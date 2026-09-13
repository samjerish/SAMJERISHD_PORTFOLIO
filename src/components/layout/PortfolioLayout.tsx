import React, { useEffect } from "react";
import { HeroSection } from "../sections/HeroSection";
import { StorySection } from "../sections/StorySection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { WhatIDoSection } from "../sections/WhatIDoSection";
import { ExperienceSection } from "../sections/ExperienceSection";
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
          const windowHeight = window.innerHeight;
          const isMobile = window.innerWidth <= 768;

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

          // Section fade-out transition: Active on desktop alone, disabled on mobile
          if (isMobile) {
            if (mainRef.current) {
              const sections = mainRef.current.children;
              for (let i = 0; i < sections.length; i++) {
                const section = sections[i] as HTMLElement;
                if (section.style.opacity !== "1") {
                  section.style.opacity = "1";
                }
              }
            }
          } else if (mainRef.current) {
            const sections = mainRef.current.children;

            for (let i = 0; i < sections.length; i++) {
              const section = sections[i] as HTMLElement;
              const rect = section.getBoundingClientRect();
              const fadeThreshold = Math.min(windowHeight * 0.8, rect.height);

              if (rect.top < 0 && rect.bottom < fadeThreshold) {
                const fadeAmount = 1 - rect.bottom / fadeThreshold;
                section.style.opacity = Math.max(0, 1 - fadeAmount).toString();
              } else {
                section.style.opacity = "1";
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768 && mainRef.current) {
        const sections = mainRef.current.children;
        for (let i = 0; i < sections.length; i++) {
          (sections[i] as HTMLElement).style.opacity = "1";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
          <StorySection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper">
          <ProjectsSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper">
          <WhatIDoSection />
        </div>
        <div className="scroll-fade-wrapper">
          <ExperienceSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-fade-wrapper">
          <ContactSection onNavigate={onNavigate} />
        </div>
      </main>
    </div>
  );
};
