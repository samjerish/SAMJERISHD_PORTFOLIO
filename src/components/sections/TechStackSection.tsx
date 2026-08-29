import React from "react";
import "./TechStackSection.css";

const TECH_STACK = [
  {
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Java",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "HTML5",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  { name: "Premiere Pro", url: "https://skillicons.dev/icons?i=pr" },
  { name: "After Effects", url: "https://skillicons.dev/icons?i=ae" },
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="tech-stack-container" id="skills">
      <h3 className="tech-stack-title">TECH STACK</h3>
      <div className="tech-marquee">
        <div className="tech-marquee-content">
          {/* Double the list for infinite scroll effect */}
          {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div key={index} className="tech-item">
              <img src={tech.url} alt={tech.name} className="tech-icon" />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
