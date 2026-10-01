import React from "react";
import "./MaintenanceAnnouncement.css";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

export const MaintenanceAnnouncement: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <main className="maintenance-container" role="main">
      <div className="maintenance-bg-grid" aria-hidden="true" />

      <div className="maintenance-content-card">
        {/* Live Status Badge */}
        <div className="maintenance-badge" role="status" aria-live="polite">
          <span className="maintenance-pulse-dot" aria-hidden="true" />
          <span>System Under Maintenance</span>
        </div>

        {/* Sam Jerish D with Laptop Photo Announcement */}
        <div className="maintenance-photo-wrapper">
          <div className="maintenance-photo-glow" aria-hidden="true" />
          <img
            src={`${baseUrl}sam_laptop.png`}
            alt="Sam Jerish D with laptop"
            className="maintenance-laptop-img"
            draggable={false}
          />
        </div>

        {/* Headings */}
        <h1 className="maintenance-title">
          <span className="maintenance-title-gradient">I'll be Right back</span>
        </h1>
        <p className="maintenance-name-subtitle">
          <span className="maintenance-name-highlight">Sam Jerish D</span> &bull; Full-Stack Developer
        </p>

        <p className="maintenance-desc">
          My portfolio is temporarily on hold for scheduled maintenance and feature upgrades.
        </p>

        {/* Primary Action Buttons */}
        <div className="maintenance-actions">
          <a
            href="mailto:samjerishd@gmail.com"
            className="maintenance-btn maintenance-btn-primary"
            aria-label="Send email to Sam Jerish D"
          >
            <Mail size={16} strokeWidth={2.2} />
            <span>Contact via Email</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href={`${baseUrl}SAMJERISHD_RESUME.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-btn maintenance-btn-secondary"
            aria-label="View or download Sam Jerish D Resume"
          >
            <FileText size={16} strokeWidth={2} />
            <span>View Resume</span>
          </a>
        </div>

        {/* Social Connections */}
        <div className="maintenance-socials">
          <a
            href="https://linkedin.com/in/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-social-btn"
            title="LinkedIn profile"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin size={18} />
          </a>

          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-social-btn"
            title="GitHub profile"
            aria-label="GitHub profile"
          >
            <FiGithub size={18} />
          </a>

          <a
            href="https://instagram.com/samjerishd"
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-social-btn"
            title="Instagram profile"
            aria-label="Instagram profile"
          >
            <FiInstagram size={18} />
          </a>
        </div>
      </div>
    </main>
  );
};
