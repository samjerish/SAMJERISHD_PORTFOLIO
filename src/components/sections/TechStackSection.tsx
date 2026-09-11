import React from "react";
import "./TechStackSection.css";

export interface TechItem {
  name: string;
  url: string;
  color?: string;
}

const TECH_ROW_1: TechItem[] = [
  {
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#3776AB",
  },
  {
    name: "Java",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    color: "#ED8B00",
  },
  {
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "HTML5",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "SQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    color: "#00758F",
  },
  {
    name: "Next.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
];

const TECH_ROW_2: TechItem[] = [
  {
    name: "Adobe Premiere Pro",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg",
    color: "#9999FF",
  },
  {
    name: "Adobe After Effects",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg",
    color: "#CF96FD",
  },
  {
    name: "Blender",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
    color: "#EA7600",
  },
  {
    name: "Tailwind CSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#38BDF8",
  },
  {
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#5FA04E",
  },
  {
    name: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
];

const ALL_TECH: TechItem[] = [...TECH_ROW_1, ...TECH_ROW_2];

export const TechStackSection: React.FC<{
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}> = () => {
  return (
    <section className="tech-stack-container" id="skills">

      <div className="tech-marquee-viewport">
        {/* Single Continuous Horizontal Line of Tech Logos */}
        <div className="tech-marquee-track track-left">
          {[...ALL_TECH, ...ALL_TECH, ...ALL_TECH, ...ALL_TECH].map(
            (tech, idx) => (
              <div
                key={`tech-${tech.name}-${idx}`}
                className="tech-logo-pill"
                data-cursor-text={tech.name}
              >
                <img
                  src={tech.url}
                  alt={tech.name}
                  className="tech-logo-img"
                  loading="lazy"
                />
                <span className="tech-logo-name">{tech.name}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
