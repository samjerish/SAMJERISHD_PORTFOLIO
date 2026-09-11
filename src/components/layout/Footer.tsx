import React from "react";
import "./Footer.css";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`site-page-footer ${className}`}>
      <div className="site-page-footer-inner">
        <div className="site-page-footer-line" />
        <div className="site-page-footer-content">
          <p className="site-page-footer-text">
            © 2026 Sam Jerish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
