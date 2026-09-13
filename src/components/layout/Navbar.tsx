import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { ArrowRight, X } from "lucide-react";

export type PageType =
  | "home"
  | "media"
  | "about"
  | "projects"
  | "contact"
  | "resume";

interface NavbarProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = "home",
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavigate = (page: PageType, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      if (page === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (onNavigate) {
        onNavigate(page);
      }
    }, 280);
  };

  const navItems: {
    id: PageType;
    label: string;
    tag: string;
    number: string;
  }[] = [
    { id: "home", label: "Home", tag: "Start & Overview", number: "01" },
    { id: "about", label: "About", tag: "Background & Approach", number: "02" },
    { id: "projects", label: "Projects", tag: "Selected Works", number: "03" },
    { id: "media", label: "Beyond Code", tag: "Media & Moments", number: "04" },
    { id: "resume", label: "Resume", tag: "Experience & Skills", number: "05" },
    {
      id: "contact",
      label: "Contact",
      tag: "Get in Touch (Dedicated Page)",
      number: "06",
    },
  ];

  return (
    <>
      {/* Fixed Top Menu Bar for Mobile with 3 Lines */}
      <header className="mobile-top-nav-bar" aria-label="Mobile Navigation Bar">
        <div className="mobile-nav-inner">
          <button
            type="button"
            className="mobile-nav-brand"
            onClick={(e) => handleNavigate("home", e)}
            aria-label="Navigate to Home"
          >
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-text">SAM JERISH D</span>
          </button>

          {/* Three Lines Hamburger Button */}
          <button
            type="button"
            className={`mobile-hamburger-btn ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            <span className="hamburger-box" aria-hidden="true">
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="menu-background-gradient" aria-hidden="true" />

        <div className="menu-content-wrapper">
          <div className="menu-header-row">
            <span className="menu-header-title">NAVIGATION</span>
            <button
              type="button"
              className="menu-close-text-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={18} />
              <span>CLOSE</span>
            </button>
          </div>

          <nav
            className="menu-links-advanced"
            aria-label="Mobile Navigation Links"
          >
            {navItems.map((item, index) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  className={`menu-item ${isActive ? "is-active" : ""}`}
                  style={{ "--animation-order": index } as React.CSSProperties}
                  onClick={(e) => handleNavigate(item.id, e)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="menu-item-left">
                    <span className="menu-item-number">{item.number}</span>
                    <div className="menu-text-group">
                      <span className="menu-item-text">{item.label}</span>
                      <span className="menu-item-tag">{item.tag}</span>
                    </div>
                  </div>
                  <div className="menu-item-icon-wrapper">
                    <ArrowRight className="menu-item-icon" size={20} />
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="menu-footer">
            <div className="menu-socials">
              <a
                href="https://linkedin.com/in/samjerishd"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="footer-dot">•</span>
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <span className="footer-dot">•</span>
              <a
                href="https://instagram.com/samjerishd"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
            <a href="mailto:samjerishd@gmail.com" className="menu-email">
              samjerishd@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
