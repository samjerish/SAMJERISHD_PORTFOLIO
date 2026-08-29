import React, { useState } from "react";
import { FiSettings, FiX, FiMoon, FiSun } from "react-icons/fi";
import "./ThemeSwitcher.css";

interface ThemeSwitcherProps {
  isSpaceMode: boolean;
  setIsSpaceMode: (val: boolean) => void;
  spaceColor: "black" | "purple" | "blue";
  setSpaceColor: (val: "black" | "purple" | "blue") => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  isSpaceMode,
  setIsSpaceMode,
  spaceColor,
  setSpaceColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`theme-switcher-container ${isOpen ? "open" : ""}`}>
      {/* Toggle Button */}
      <button
        className="theme-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme Settings"
      >
        {isOpen ? <FiX /> : <FiSettings className="spin-icon" />}
      </button>

      {/* Settings Menu */}
      <div className="theme-switcher-menu">
        <h3 className="theme-switcher-title">THEME SETTINGS</h3>

        {/* Mood Toggle */}
        <div className="setting-section">
          <span className="setting-label">MOOD</span>
          <div className="mood-toggle-group">
            <button
              className={`mood-btn ${!isSpaceMode ? "active" : ""}`}
              onClick={() => setIsSpaceMode(false)}
            >
              <FiSun /> Normal
            </button>
            <button
              className={`mood-btn ${isSpaceMode ? "active" : ""}`}
              onClick={() => setIsSpaceMode(true)}
            >
              <FiMoon /> Space
            </button>
          </div>
        </div>

        {/* Color Picker (Only visible in Space Mode) */}
        {isSpaceMode && (
          <div className="setting-section fade-in">
            <span className="setting-label">SPACE COLOR</span>
            <div className="color-picker-group">
              <button
                className={`color-btn black-preset ${spaceColor === "black" ? "active" : ""}`}
                onClick={() => setSpaceColor("black")}
                title="Deep Black"
              />
              <button
                className={`color-btn purple-preset ${spaceColor === "purple" ? "active" : ""}`}
                onClick={() => setSpaceColor("purple")}
                title="Cosmic Purple"
              />
              <button
                className={`color-btn blue-preset ${spaceColor === "blue" ? "active" : ""}`}
                onClick={() => setSpaceColor("blue")}
                title="Galaxy Blue"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
