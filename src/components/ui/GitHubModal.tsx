import React, { useEffect } from "react";
import "./GitHubModal.css";
import { GitHubContributions } from "./GitHubContributions";
import { X } from "lucide-react";

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="github-modal-backdrop" onClick={onClose}>
      <div
        className="github-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="github-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          data-cursor-text="CLOSE"
        >
          <X size={20} />
        </button>
        <div className="github-modal-body">
          <GitHubContributions />
        </div>
      </div>
    </div>
  );
};
