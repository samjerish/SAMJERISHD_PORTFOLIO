import React, { useEffect } from "react";
import "./ProjectsPage.css";
import "../sections/ProjectsSection.css";
import { ArrowLeft } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectSwipeDownList } from "../ui/ProjectSwipeDownList";
import { Footer } from "../layout/Footer";

export const ProjectsPage: React.FC<{
  onNavigate: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="projects-page-wrapper is-visible">
      <nav className="projects-nav">
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

      <div className="projects-page-content">
        <div className="projects-story-section">
          <div className="projects-story-text-container">
            <p className="story-line line-1">
              Things I've built to solve everyday problems, explore new tools, and understand how systems work.
            </p>
          </div>
        </div>

        {/* Minimalist Title List with Swipe-Down on Hover */}
        <ProjectSwipeDownList projects={projects} />

        <div className="github-cta-section">
          <h2>Code on GitHub</h2>
          <p>
            Explore the repositories for these projects, setup instructions, and smaller technical experiments.
          </p>
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
          >
            Visit GitHub Profile
          </a>
        </div>

        <div className="projects-watermark">
          SAM JERISH D • SELECTED WORK
        </div>
      </div>
      <Footer />
    </div>
  );
};
