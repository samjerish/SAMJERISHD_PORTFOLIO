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
              For me, every project starts with a problem, an idea, or simply a
              question
            </p>
            <p className="story-line line-what-if">"What if?"</p>
          </div>
        </div>

        {/* Minimalist Title List with Swipe-Down on Hover */}
        <ProjectSwipeDownList projects={projects} />

        <div className="github-cta-section">
          <h2>More on GitHub</h2>
          <p>
            Want to see the code behind these projects or explore my other
            technical experiments? Dive into my repositories.
          </p>
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
          >
            View My GitHub
          </a>
        </div>

        <div className="projects-watermark">
          CREATIVITY AND TECHNOLOGY TO SOLVE REAL WORLD PROBLEMS
        </div>
      </div>
      <Footer />
    </div>
  );
};
