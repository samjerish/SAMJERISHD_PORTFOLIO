import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

export interface CustomCursorProps {
  dotSize?: number;
  ringSize?: number;
  ringColor?: string;
  dotColor?: string;
  targetSelector?: string;
  hideDefaultCursor?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  dotSize = 8,
  ringSize = 34,
  ringColor = "rgba(255, 255, 255, 0.45)",
  dotColor = "#ffffff",
  targetSelector = 'a, button, [role="button"], input, textarea, select, .showcase-card, .timeline-card, .about-12-ledger-item, .project-card, .social-circle, .segmented-tab-btn, .photo-3d-card, .back-btn, [data-cursor]',
  hideDefaultCursor = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorText, setCursorText] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [targetRect, setTargetRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: string;
  } | null>(null);

  // Motion values for spring animation
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth fluid trailing
  const springX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.4 });

  const activeTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Detect touch-only devices
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    if (hideDefaultCursor) {
      document.documentElement.classList.add("custom-cursor-active");
    }

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisible) setIsVisible(true);

      // Ensure active element text stays updated even during continuous dragging
      const elFromPoint = document.elementFromPoint(clientX, clientY);
      if (elFromPoint) {
        const interactive = elFromPoint.closest(targetSelector) as HTMLElement | null;
        if (interactive) {
          setIsHovered(true);
          activeTargetRef.current = interactive;
          const customText =
            interactive.getAttribute("data-cursor-text") ||
            interactive.getAttribute("data-cursor");
          if (customText && customText !== "true") {
            setCursorText(customText);
          }
        }
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setTargetRect(null);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Target detection and morphing
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(targetSelector) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        activeTargetRef.current = interactive;

        const customText =
          interactive.getAttribute("data-cursor-text") ||
          interactive.getAttribute("data-cursor");
        if (customText && customText !== "true") {
          setCursorText(customText);
        } else {
          setCursorText("");
        }

        // Morph to target if explicitly requested via data-cursor-morph
        if (interactive.getAttribute("data-cursor-morph") === "true") {
          const rect = interactive.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(interactive);
          setTargetRect({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width + 12,
            height: rect.height + 8,
            borderRadius: computedStyle.borderRadius || "16px",
          });
        } else {
          setTargetRect(null);
        }
      } else {
        setIsHovered(false);
        setCursorText("");
        setTargetRect(null);
        activeTargetRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, hideDefaultCursor, mouseX, mouseY, targetSelector]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`custom-cursor-root ${isVisible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      {/* Outer morphing ring with Framer Motion spring physics */}
      <motion.div
        className={`custom-cursor-ring ${isHovered ? "is-hovered" : ""} ${
          isPressed ? "is-pressed" : ""
        } ${cursorText ? "has-text" : ""} ${targetRect ? "is-morphed" : ""}`}
        style={{
          x: targetRect ? targetRect.x : springX,
          y: targetRect ? targetRect.y : springY,
          width: targetRect ? targetRect.width : cursorText ? 76 : isHovered ? 56 : ringSize,
          height: targetRect ? targetRect.height : cursorText ? 76 : isHovered ? 56 : ringSize,
          borderRadius: targetRect ? targetRect.borderRadius : "50%",
          borderColor: ringColor,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 300,
          mass: 0.35,
        }}
      >
        {cursorText && <span className="custom-cursor-label">{cursorText}</span>}
      </motion.div>

      {/* Inner high-precision dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
        animate={{
          scale: isPressed ? 1.5 : isHovered ? 0.3 : 1,
          opacity: isHovered && !cursorText ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
