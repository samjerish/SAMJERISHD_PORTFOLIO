import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CenterFlow.css";

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
  category?: string;
}

const DEFAULT_TECH_STACK: TechItem[] = [
  {
    id: "react",
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    category: "Language",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#5FA04E",
    category: "Backend",
  },
  {
    id: "python",
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#3776AB",
    category: "Language",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    category: "Language",
  },
  {
    id: "html5",
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    color: "#E34F26",
    category: "Frontend",
  },
  {
    id: "css3",
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    color: "#1572B6",
    category: "Frontend",
  },
  {
    id: "java",
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    color: "#EA2D2E",
    category: "Language",
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    category: "Cloud",
  },
];

interface ConnectionLine {
  id: string;
  path: string;
  color: string;
}

export const CenterFlow: React.FC<{
  items?: TechItem[];
  title?: string;
  subtitle?: string;
}> = ({
  items = DEFAULT_TECH_STACK,
  title = "TECH STACK",
  subtitle = "Radial flow of technologies & frameworks powering my solutions",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [lines, setLines] = useState<ConnectionLine[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  // Calculate dynamic SVG connecting paths from Center Hub to all Nodes
  const updateLines = useCallback(() => {
    if (!containerRef.current || !centerNodeRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerNodeRef.current.getBoundingClientRect();

    const startX = centerRect.left - containerRect.left + centerRect.width / 2;
    const startY = centerRect.top - containerRect.top + centerRect.height / 2;

    const newLines: ConnectionLine[] = [];

    items.forEach((item) => {
      const nodeEl = itemRefs.current.get(item.id);
      if (!nodeEl) return;

      const nodeRect = nodeEl.getBoundingClientRect();
      const endX = nodeRect.left - containerRect.left + nodeRect.width / 2;
      const endY = nodeRect.top - containerRect.top + nodeRect.height / 2;

      // Smooth cubic bezier S-curve flow from center to target node
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const ctrl1X = startX + deltaX * 0.45;
      const ctrl1Y = startY + deltaY * 0.15;
      const ctrl2X = startX + deltaX * 0.55;
      const ctrl2Y = endY - deltaY * 0.15;

      const path = `M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`;

      newLines.push({
        id: item.id,
        path,
        color: item.color || "#4ade80",
      });
    });

    setLines(newLines);
  }, [items]);

  useEffect(() => {
    updateLines();
    const handleResize = () => updateLines();
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(updateLines, 200);
    const observer = new ResizeObserver(updateLines);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [updateLines]);

  // Distribute items into left, top/bottom, and right orbital groups for desktop layout
  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  return (
    <div className="center-flow-wrapper">
      <div className="center-flow-header">
        <h2 className="center-flow-title">{title}</h2>
        <p className="center-flow-subtitle">{subtitle}</p>
      </div>

      <div ref={containerRef} className="center-flow-canvas">
        {/* Animated Radial SVG Connections */}
        <svg className="center-flow-svg">
          <defs>
            {lines.map((line) => (
              <linearGradient
                key={`grad-${line.id}`}
                id={`grad-${line.id}`}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor={line.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={line.color} stopOpacity="1" />
              </linearGradient>
            ))}

            {/* Glowing filter for active beams */}
            <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Static / Dashed Beam Lines */}
          {lines.map((line) => {
            const isTargeted =
              isCenterHovered || hoveredItem === line.id || hoveredItem === null;
            const isHighlighted =
              isCenterHovered || hoveredItem === line.id;

            return (
              <g key={`group-${line.id}`}>
                {/* Subtle base track */}
                <path
                  d={line.path}
                  className="center-flow-base-track"
                  stroke={isHighlighted ? line.color : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray="4 6"
                  opacity={isTargeted ? 0.7 : 0.25}
                />

                {/* Animated Flowing Laser Pulse */}
                <path
                  d={line.path}
                  className={`center-flow-beam ${isHighlighted ? "is-highlighted" : ""}`}
                  stroke={`url(#grad-${line.id})`}
                  strokeWidth={isHighlighted ? 3.5 : 2}
                  filter={isHighlighted ? "url(#beam-glow)" : undefined}
                />

                {/* Flowing Pulse Particle */}
                <circle
                  r={isHighlighted ? 4 : 2.5}
                  fill="#ffffff"
                  filter="url(#beam-glow)"
                  className="center-flow-particle"
                >
                  <animateMotion
                    dur={`${2.2 + (lines.indexOf(line) % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    path={line.path}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Outer Tech Nodes: Left Wing */}
        <div className="center-flow-column flow-left">
          {leftItems.map((item) => {
            const isHovered = hoveredItem === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
                className={`center-flow-node ${isHovered ? "is-active" : ""}`}
                style={{
                  borderColor: isHovered ? item.color : undefined,
                  boxShadow: isHovered
                    ? `0 10px 30px ${item.color}33, 0 0 20px ${item.color}22`
                    : undefined,
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="node-icon-wrapper">
                  <img src={item.icon} alt={item.name} className="node-icon" />
                </div>
                <div className="node-info">
                  <span className="node-name">{item.name}</span>
                  {item.category && (
                    <span className="node-category">{item.category}</span>
                  )}
                </div>
                <div
                  className="node-status-dot"
                  style={{ backgroundColor: item.color || "#4ade80" }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Central Core Hub */}
        <div
          ref={centerNodeRef}
          className={`center-flow-hub ${isCenterHovered ? "is-active" : ""}`}
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
        >
          {/* Animated Ambient Waves */}
          <div className="hub-ripple-ring ring-1"></div>
          <div className="hub-ripple-ring ring-2"></div>
          <div className="hub-orbit-dashed"></div>

          {/* Central Core Card */}
          <div className="hub-core-card">
            <div className="hub-icon-container">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hub-icon"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
            </div>
            <div className="hub-text-content">
              <span className="hub-label">CORE SYSTEM</span>
              <span className="hub-tag">FULL STACK</span>
            </div>
            <div className="hub-live-badge">
              <span className="hub-live-dot"></span>
              <span>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Outer Tech Nodes: Right Wing */}
        <div className="center-flow-column flow-right">
          {rightItems.map((item) => {
            const isHovered = hoveredItem === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
                className={`center-flow-node ${isHovered ? "is-active" : ""}`}
                style={{
                  borderColor: isHovered ? item.color : undefined,
                  boxShadow: isHovered
                    ? `0 10px 30px ${item.color}33, 0 0 20px ${item.color}22`
                    : undefined,
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="node-icon-wrapper">
                  <img src={item.icon} alt={item.name} className="node-icon" />
                </div>
                <div className="node-info">
                  <span className="node-name">{item.name}</span>
                  {item.category && (
                    <span className="node-category">{item.category}</span>
                  )}
                </div>
                <div
                  className="node-status-dot"
                  style={{ backgroundColor: item.color || "#4ade80" }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
