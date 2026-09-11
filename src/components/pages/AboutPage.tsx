import React, { useEffect, useState } from "react";
import "./AboutPage.css";
import { ArrowLeft } from "lucide-react";
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
      <nav className="about-nav">
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
        {/* Live GitHub Coding Activity & Contributions */}
        <GitHubContributions />
      </main>

      <Footer />
    </div>
  );
};
