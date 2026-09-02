import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavigate = (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
    e?: React.MouseEvent,
  ) => {
    if (e) e.preventDefault();
    setIsOpen(false); // Close menu on navigation

    if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const navItems = [
    { id: "about", label: "ABOUT ME", number: "01", tag: "Story & Journey" },
    { id: "projects", label: "PROJECTS", number: "02", tag: "Selected Works" },
    {
      id: "media",
      label: "BEYOND THE FRAME",
      number: "03",
      tag: "Gallery & Moments",
    },
    {
      id: "resume",
      label: "RESUME",
      number: "04",
      tag: "Skills & Experience",
    },
    {
      id: "contact",
      label: "CONNECT WITH ME",
      number: "05",
      tag: "Let's Talk",
    },
  ];

  return (
    <>
      <button
        className={`hamburger-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu className="menu-icon-hamburger" size={28} strokeWidth={2.5} />
        <X className="menu-icon-close" size={28} strokeWidth={2.5} />
      </button>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <div className="menu-background-gradient"></div>

        <div className="menu-content-wrapper">
          <nav className="menu-links-advanced">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className="menu-item"
                style={{ "--animation-order": index } as React.CSSProperties}
                onClick={(e) => handleNavigate(item.id as any, e)}
              >
                <div className="menu-item-left">
                  <span className="menu-item-number">{item.number}</span>
                  <div className="menu-text-group">
                    <span className="menu-item-text">{item.label}</span>
                    <span className="menu-item-tag">{item.tag}</span>
                  </div>
                </div>
                <div className="menu-item-icon-wrapper">
                  <ArrowRight className="menu-item-icon" size={24} />
                </div>
              </button>
            ))}
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
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/samjerishd"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
            <div className="menu-email">samjerishd@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  );
};
