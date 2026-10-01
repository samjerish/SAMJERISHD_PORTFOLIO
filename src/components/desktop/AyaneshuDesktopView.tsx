import React, { useState, useEffect } from "react";
import "./AyaneshuDesktopView.css";
import {
  FiHome,
  FiBriefcase,
  FiCoffee,
  FiFeather,
  FiFileText,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiTwitter,
  FiInstagram,
  FiBookOpen,
  FiSmartphone,
  FiArrowRight,
  FiExternalLink,
  FiArrowUpRight,
  FiX,
  FiCheckCircle,
  FiArrowUp,
} from "react-icons/fi";

import dtsLogo from "../../assets/companies/dts-logo.png";
import swiftantLogo from "../../assets/companies/swiftant-logo.png";
import profilePhoto from "../../assets/me-opt.jpg";
import heroPortrait from "../../assets/sam_hero_portrait.jpg";
import { projects, type Project } from "../../data/projects";

interface AyaneshuDesktopViewProps {
  onSwitchToStandard: () => void;
  onNavigateToResume?: () => void;
}

export const AyaneshuDesktopView: React.FC<AyaneshuDesktopViewProps> = ({
  onSwitchToStandard,
  onNavigateToResume,
}) => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const basePath = import.meta.env.BASE_URL;

  // Scroll to section handler
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to highlight active nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "personal-projects", "creative-suite", "about", "experience"];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Companies row
  const companies = [
    {
      name: "Dynamic Tooling Systems",
      logo: dtsLogo,
    },
    {
      name: "SwiftAnt",
      logo: swiftantLogo,
    },
    {
      name: "Karunya",
      logo: `${basePath}karunya-logo.svg`,
    },
    {
      name: "FocusFlow",
      logo: `${basePath}favicon.png`,
    },
  ];

  // Personal Projects
  const personalProjects = [
    {
      year: "2026",
      tag: "UI & INTERACTION DESIGN",
      title: "Cinematic Marquee Ribbon Preloader",
      desc: "Architected high-precision morphing marquee ribbon physics and requestAnimationFrame sequencing with zero layout jitter.",
      link: "https://github.com/samjerish",
    },
    {
      year: "2025",
      tag: "AUDIO SYNTHESIS & WEB APIS",
      title: "FocusFlow Web Audio Synthesizer",
      desc: "Engineered procedural white noise and rain frequency soundscapes computed in real-time in the browser without static MP3 assets.",
      link: "https://focusflowstudy.netlify.app",
    },
    {
      year: "2026",
      tag: "AUTOMATION & DATA PIPELINES",
      title: "Python OOP File Normalizer Suite",
      desc: "Built batch scripts for data cleaning, automated media compression, and schema consistency checking across local databases.",
      link: "https://github.com/samjerish",
    },
  ];

  // Creative Suite Items
  const creativeItems = [
    {
      title: "Hardware Workbench & Circuitry",
      category: "Robotics & Prototyping",
      img: `${basePath}media-opt/media-1.jpg`,
    },
    {
      title: "Nightscape Horizon",
      category: "Visual Photography",
      img: `${basePath}media-opt/media-3.jpg`,
    },
    {
      title: "3D Space & Motion Lab",
      category: "Blender & Premiere Pro",
      img: `${basePath}media-opt/media-5.jpg`,
    },
    {
      title: "Development Studio Setup",
      category: "Workplace & Engineering",
      img: `${basePath}media-opt/10.jpg`,
    },
  ];

  return (
    <div className="ay-screen-layout" id="top">
      {/* ====================================================================
          LEFT SIDEBAR (1:1 with Screenshot)
          ==================================================================== */}
      <aside className="ay-sidebar" aria-label="Sidebar Navigation">
        {/* User Profile Card */}
        <div>
          <div className="ay-sidebar-profile" onClick={() => scrollTo("home")}>
            <div className="ay-sidebar-avatar-wrap">
              <img
                src={profilePhoto}
                alt="Sam Jerish D"
                className="ay-sidebar-avatar-img"
              />
            </div>
            <div className="ay-sidebar-user-meta">
              <span className="ay-sidebar-username">Sam Jerish D</span>
              <span className="ay-sidebar-userrole">Product Developer</span>
            </div>
          </div>

          {/* Section: CREATIONS */}
          <div className="ay-sidebar-label">CREATIONS</div>
          <nav className="ay-sidebar-creations">
            <button
              type="button"
              className={`ay-sidebar-nav-btn ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollTo("home")}
            >
              <div className="ay-nav-btn-left">
                <FiHome size={17} />
                <span>Home</span>
              </div>
            </button>

            <button
              type="button"
              className={`ay-sidebar-nav-btn ${activeSection === "work" ? "active" : ""}`}
              onClick={() => scrollTo("work")}
            >
              <div className="ay-nav-btn-left">
                <FiBriefcase size={17} />
                <span>Work</span>
              </div>
            </button>

            <button
              type="button"
              className={`ay-sidebar-nav-btn ${activeSection === "personal-projects" ? "active" : ""}`}
              onClick={() => scrollTo("personal-projects")}
            >
              <div className="ay-nav-btn-left">
                <FiCoffee size={17} />
                <span>Personal Projects</span>
              </div>
            </button>

            <button
              type="button"
              className={`ay-sidebar-nav-btn ${activeSection === "creative-suite" ? "active" : ""}`}
              onClick={() => scrollTo("creative-suite")}
            >
              <div className="ay-nav-btn-left">
                <FiFeather size={17} />
                <span>Creative Suite</span>
              </div>
            </button>

            <button
              type="button"
              className={`ay-sidebar-nav-btn ${activeSection === "experience" ? "active" : ""}`}
              onClick={() => {
                if (onNavigateToResume) {
                  onNavigateToResume();
                } else {
                  scrollTo("experience");
                }
              }}
            >
              <div className="ay-nav-btn-left">
                <FiFileText size={17} />
                <span>Resume</span>
              </div>
              <span className="ay-badge-new">NEW</span>
            </button>

            {/* Quick Switch to Standard / Mobile View */}
            <button
              type="button"
              className="ay-sidebar-switch-btn"
              onClick={onSwitchToStandard}
              title="Switch to Mobile / Interactive 3D View"
            >
              <FiSmartphone size={14} />
              <span>Standard View</span>
            </button>
          </nav>
        </div>

        {/* Section: SOCIALS & Coordinates */}
        <div className="ay-sidebar-bottom">
          <div className="ay-sidebar-label">SOCIALS</div>
          <div className="ay-socials-matrix">
            <a
              href="mailto:samjerishd@gmail.com"
              className="ay-social-icon-link"
              title="Email samjerishd@gmail.com"
              aria-label="Email"
            >
              <FiMail size={16} />
            </a>
            <a
              href="https://github.com/samjerish"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="GitHub"
              aria-label="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/samjerishd/"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="https://focusflowstudy.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="FocusFlow Live"
              aria-label="Live Web"
            >
              <FiGlobe size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="Twitter / X"
              aria-label="Twitter"
            >
              <FiTwitter size={16} />
            </a>
            <a
              href="https://medium.com"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="Medium"
              aria-label="Medium"
            >
              <FiBookOpen size={16} />
            </a>
            <a
              href="https://instagram.com/samjerishd"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="Instagram"
              aria-label="Instagram"
            >
              <FiInstagram size={16} />
            </a>
            <a
              href="https://drive.google.com/file/d/1UDob2GDrfJLw3JD4dG5BLQTJCX5e28uz/view?usp=share_link"
              target="_blank"
              rel="noreferrer"
              className="ay-social-icon-link"
              title="CV Resume"
              aria-label="Resume"
            >
              <FiFileText size={16} />
            </a>
          </div>

          <div className="ay-sidebar-coords">
            12.7409° N, 77.8253° E
          </div>
        </div>
      </aside>

      {/* ====================================================================
          MAIN SCROLLABLE VIEWPORT (Huge Rounded Floating Canvas)
          ==================================================================== */}
      <main className="ay-main-scroll">
        <div className="ay-canvas">
          {/* ====================================================================
              HERO SECTION (2 COLUMNS: LEFT BIO + RIGHT PHOTO CARD)
              ==================================================================== */}
          <section className="ay-hero-container" id="home">
            {/* Left Bio Column */}
            <div className="ay-hero-left">
              <div className="ay-hero-eyebrow">
                <span className="ay-eyebrow-highlight">ENGINEERING FOR IMPACT</span>
                <span className="ay-eyebrow-divider">|</span>
                <span className="ay-eyebrow-muted">FULL-STACK &amp; AI/ML DEVELOPER</span>
              </div>

              <h1 className="ay-hero-heading">Hey, I'm Sam Jerish!</h1>

              <p className="ay-hero-description">
                I'm a computer science engineer and developer with hands-on experience building clean,
                intuitive web systems, intelligent automation, and tools that solve real everyday problems.
                Currently developing responsive web platforms at <strong>Dynamic Tooling Systems</strong>—&amp;
                engineering developer tools behind the scenes.
              </p>

              {/* Companies Strip */}
              <div className="ay-companies-block">
                <span className="ay-companies-label">COMPANIES &amp; INITIATIVES I'VE WORKED WITH</span>
                <div className="ay-companies-logos">
                  {companies.map((c, idx) => (
                    <div key={idx} className="ay-company-logo-item">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="ay-company-inline-icon"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Photo Frame Column (Matches Screenshot 1:1) */}
            <div className="ay-hero-right">
              <div className="ay-photo-card-frame">
                <div className="ay-photo-inner">
                  <img
                    src={heroPortrait || profilePhoto}
                    alt="Sam Jerish D"
                    className="ay-photo-img"
                  />
                </div>
                <div className="ay-photo-caption">
                  <span className="ay-caption-text">HOSUR / BENGALURU</span>
                  <span className="ay-caption-badge">IMG</span>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              WORK SECTION (Matches Screenshot with Briefcase icon + All Projects)
              ==================================================================== */}
          <section className="ay-section-block" id="work">
            <div className="ay-section-row-header">
              <div className="ay-section-header-left">
                <div className="ay-section-icon-badge">
                  <FiBriefcase size={20} />
                </div>
                <h2 className="ay-section-main-title">Work</h2>
              </div>

              <button
                type="button"
                className="ay-all-projects-btn"
                onClick={() => {
                  const el = document.getElementById("projects-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>All Projects</span>
                <FiArrowRight size={15} />
              </button>
            </div>

            {/* Work Grid */}
            <div className="ay-canvas-projects-grid" id="projects-grid">
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="ay-work-card"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className="ay-work-card-media">
                    <img
                      src={p.image.startsWith("/") ? `${basePath}${p.image.slice(1)}` : p.image}
                      alt={p.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="ay-work-card-body">
                    <div className="ay-work-card-top">
                      <span className="ay-work-year">{p.date || "2024 - 2026"}</span>
                      <span className="ay-work-brand">{p.tag || "SOFTWARE SYSTEM"}</span>
                    </div>

                    <h3 className="ay-work-title">{p.brandName || p.name}</h3>

                    <p className="ay-work-desc">
                      {p.shortDesc || p.description}
                    </p>

                    <div className="ay-work-tags-row">
                      {(p.pills || p.techStack?.slice(0, 4) || []).map((pill, pIdx) => (
                        <span key={pIdx} className="ay-tag-pill">
                          {pill}
                        </span>
                      ))}
                    </div>

                    <div className="ay-work-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="ay-action-btn-sm"
                        onClick={() => setSelectedProject(p)}
                      >
                        <span>Case Study</span>
                        <FiArrowUpRight size={13} />
                      </button>

                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ay-action-btn-sm"
                        >
                          <FiExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ay-action-btn-sm"
                        >
                          <FiGithub size={13} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ====================================================================
              PERSONAL PROJECTS SECTION
              ==================================================================== */}
          <section className="ay-section-block" id="personal-projects">
            <div className="ay-section-row-header">
              <div className="ay-section-header-left">
                <div className="ay-section-icon-badge">
                  <FiCoffee size={20} />
                </div>
                <h2 className="ay-section-main-title">Personal Projects</h2>
              </div>

              <span className="ay-all-projects-btn">
                <span>Take a Look</span>
                <FiArrowRight size={15} />
              </span>
            </div>

            <div className="ay-personal-cards-grid">
              {personalProjects.map((item, idx) => (
                <div key={idx} className="ay-personal-item-card">
                  <div className="ay-personal-item-top">
                    <span className="ay-work-year">{item.year}</span>
                    <span className="ay-work-brand">{item.tag}</span>
                  </div>
                  <h3 className="ay-personal-item-title">{item.title}</h3>
                  <p className="ay-personal-item-desc">{item.desc}</p>
                  <div style={{ marginTop: "18px" }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ay-action-btn-sm"
                    >
                      <span>Explore</span>
                      <FiArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================================
              CREATIVE SUITE SECTION
              ==================================================================== */}
          <section className="ay-section-block" id="creative-suite">
            <div className="ay-section-row-header">
              <div className="ay-section-header-left">
                <div className="ay-section-icon-badge">
                  <FiFeather size={20} />
                </div>
                <h2 className="ay-section-main-title">Creative Suite</h2>
              </div>

              <span className="ay-all-projects-btn">
                <span>Take a Look</span>
                <FiArrowRight size={15} />
              </span>
            </div>

            <div className="ay-creative-suite-grid">
              {creativeItems.map((item, idx) => (
                <div key={idx} className="ay-suite-card">
                  <div className="ay-suite-img-frame">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="ay-suite-caption">
                    <h4 className="ay-suite-title">{item.title}</h4>
                    <span className="ay-suite-meta">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================================
              WHERE IT ALL STARTED (Origin Story)
              ==================================================================== */}
          <section className="ay-section-block" id="about">
            <div className="ay-story-container">
              <div className="ay-story-media-box">
                <div className="ay-story-img-wrap">
                  <img
                    src={profilePhoto}
                    alt="Sam Jerish D"
                  />
                </div>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Sam Jerish D</span>
                  <div style={{ fontSize: "0.78rem", color: "var(--ay-text-gray)" }}>
                    B.Tech CSE (AI &amp; ML) @ Karunya
                  </div>
                </div>
              </div>

              <div className="ay-story-text-col">
                <span className="ay-companies-label">ORIGIN STORY</span>
                <h2 className="ay-story-title">Where it all started!</h2>

                <p className="ay-story-p">
                  My design and engineering journey unexpectedly began in college when I realized
                  code wasn't just abstract logic—it was the fastest way to fix genuine inefficiencies in people's lives.
                </p>

                <p className="ay-story-p">
                  Growing up in Hosur, Tamil Nadu, I watched our residential committee track monthly
                  maintenance collections on handwritten paper sheets that constantly got lost, soaked in rain,
                  or miscalculated. I sat down and coded them a web ledger—and when I saw the relief on their faces,
                  I knew what I wanted to do with my life.
                </p>

                <p className="ay-story-p">
                  Later, when standard study timers felt bloated with ads and mandatory subscriptions, I built
                  <strong>FocusFlow</strong>—a lightning-fast, zero-bloat study workspace with browser-synthesized
                  white noise soundscapes.
                </p>

                <div className="ay-story-actions-row">
                  <a
                    href="mailto:samjerishd@gmail.com"
                    className="ay-all-projects-btn"
                    style={{ background: "#ffffff", color: "#0b0c0e" }}
                  >
                    <FiMail size={15} />
                    <span>Email Me</span>
                  </a>

                  {onNavigateToResume ? (
                    <button
                      type="button"
                      className="ay-all-projects-btn"
                      onClick={onNavigateToResume}
                    >
                      <FiFileText size={15} />
                      <span>View Full Resume</span>
                    </button>
                  ) : (
                    <a
                      href="https://drive.google.com/file/d/1UDob2GDrfJLw3JD4dG5BLQTJCX5e28uz/view?usp=share_link"
                      target="_blank"
                      rel="noreferrer"
                      className="ay-all-projects-btn"
                    >
                      <FiFileText size={15} />
                      <span>View Full Resume</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              PROFESSIONAL PITSTOPS (Experience Timeline)
              ==================================================================== */}
          <section className="ay-section-block" id="experience">
            <div className="ay-section-row-header">
              <div className="ay-section-header-left">
                <div className="ay-section-icon-badge">
                  <FiFileText size={20} />
                </div>
                <h2 className="ay-section-main-title">Professional Pitstops</h2>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--ay-accent-green)" }}>
                <FiCheckCircle size={14} />
                <span>Verified Experience</span>
              </div>
            </div>

            <div className="ay-pitstops-list">
              <div className="ay-pitstop-card">
                <div className="ay-pitstop-main">
                  <div className="ay-pitstop-icon-box">
                    <img src={dtsLogo} alt="Dynamic Tooling Systems" />
                  </div>
                  <div className="ay-pitstop-info">
                    <h3 className="ay-pitstop-company">Dynamic Tooling Systems - India</h3>
                    <span className="ay-pitstop-role">Web Developer · Freelance</span>
                    <p className="ay-pitstop-desc">
                      Engineered and delivered responsive, high-performance web systems tailored to industrial specifications,
                      transforming enterprise business operations into intuitive, accessible digital solutions.
                    </p>
                  </div>
                </div>
                <span className="ay-pitstop-date">May 2026 - Present</span>
              </div>

              <div className="ay-pitstop-card">
                <div className="ay-pitstop-main">
                  <div className="ay-pitstop-icon-box">
                    <img src={swiftantLogo} alt="SwiftAnt" />
                  </div>
                  <div className="ay-pitstop-info">
                    <h3 className="ay-pitstop-company">SwiftAnt</h3>
                    <span className="ay-pitstop-role">Python Development Intern</span>
                    <p className="ay-pitstop-desc">
                      Developed Python applications applying Object-Oriented Programming (OOP) paradigms. Focused on
                      structured data flows, systematic debugging, and robust software maintenance.
                    </p>
                  </div>
                </div>
                <span className="ay-pitstop-date">June 2026</span>
              </div>

              <div className="ay-pitstop-card">
                <div className="ay-pitstop-main">
                  <div className="ay-pitstop-icon-box">
                    <img src={`${basePath}karunya-logo.svg`} alt="Karunya University" />
                  </div>
                  <div className="ay-pitstop-info">
                    <h3 className="ay-pitstop-company">Karunya Institute of Technology and Sciences</h3>
                    <span className="ay-pitstop-role">
                      B.Tech in Computer Science and Engineering (Artificial Intelligence &amp; Machine Learning)
                    </span>
                    <p className="ay-pitstop-desc">
                      Rigorous study of Data Structures, Distributed Systems, Machine Learning algorithms, and Computer Vision.
                    </p>
                  </div>
                </div>
                <span className="ay-pitstop-date">2024 - 2028</span>
              </div>
            </div>
          </section>

          {/* ====================================================================
              CANVAS FOOTER
              ==================================================================== */}
          <footer className="ay-canvas-footer">
            <div className="ay-footer-grid-4">
              <div className="ay-footer-metric">
                <span className="ay-metric-label">Designed on</span>
                <span className="ay-metric-val">Figma &amp; CSS</span>
                <span className="ay-metric-sub">Precision token architecture</span>
              </div>
              <div className="ay-footer-metric">
                <span className="ay-metric-label">Built on</span>
                <span className="ay-metric-val">React &amp; Vite</span>
                <span className="ay-metric-sub">TypeScript &amp; Web APIs</span>
              </div>
              <div className="ay-footer-metric">
                <span className="ay-metric-label">Location</span>
                <span className="ay-metric-val">Hosur / Bengaluru</span>
                <span className="ay-metric-sub">Tamil Nadu, India</span>
              </div>
              <div className="ay-footer-metric">
                <span className="ay-metric-label">Updated on</span>
                <span className="ay-metric-val">Sept '26</span>
                <span className="ay-metric-sub">Latest production build</span>
              </div>
            </div>

            <div className="ay-canvas-footer-bottom">
              <span>© {new Date().getFullYear()} Sam Jerish D. All rights reserved.</span>
              <button
                type="button"
                className="ay-all-projects-btn"
                onClick={() => scrollTo("top")}
                style={{ padding: "6px 14px", fontSize: "0.78rem" }}
              >
                <FiArrowUp size={13} />
                <span>Back to Top</span>
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* ====================================================================
          CASE STUDY MODAL
          ==================================================================== */}
      {selectedProject && (
        <div className="ay-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="ay-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="ay-modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Case Study"
            >
              <FiX size={18} />
            </button>

            <div style={{ marginBottom: "20px" }}>
              <div className="ay-work-card-top">
                <span className="ay-work-year">{selectedProject.date || "2024 - 2026"}</span>
                <span className="ay-work-brand">{selectedProject.tag || "SOFTWARE SYSTEM"}</span>
              </div>
              <h2 className="ay-section-main-title" style={{ fontSize: "2rem", marginTop: "6px" }}>
                {selectedProject.brandName || selectedProject.name}
              </h2>
              <p style={{ color: "var(--ay-text-gray)", marginTop: "6px", fontSize: "0.95rem" }}>
                {selectedProject.headline || selectedProject.shortDesc}
              </p>
            </div>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
              {(selectedProject.techStack || selectedProject.pills || []).map((t, idx) => (
                <span key={idx} className="ay-tag-pill">
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "0.95rem", color: "var(--ay-text-gray)" }}>
              {selectedProject.problemStatement && (
                <div>
                  <h4 style={{ color: "var(--ay-text-white)", margin: "0 0 6px 0", fontSize: "1.05rem" }}>
                    The Problem
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{selectedProject.problemStatement}</p>
                </div>
              )}

              {selectedProject.solution && (
                <div>
                  <h4 style={{ color: "var(--ay-text-white)", margin: "0 0 6px 0", fontSize: "1.05rem" }}>
                    The Solution &amp; Engineering
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{selectedProject.solution}</p>
                </div>
              )}

              {selectedProject.architecture && (
                <div>
                  <h4 style={{ color: "var(--ay-text-white)", margin: "0 0 6px 0", fontSize: "1.05rem" }}>
                    Architecture &amp; Data Flow
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{selectedProject.architecture}</p>
                </div>
              )}

              {selectedProject.impact && (
                <div>
                  <h4 style={{ color: "var(--ay-text-white)", margin: "0 0 6px 0", fontSize: "1.05rem" }}>
                    Real-World Impact
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{selectedProject.impact}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ay-all-projects-btn"
                  style={{ background: "#ffffff", color: "#0b0c0e" }}
                >
                  <FiExternalLink size={15} />
                  <span>Open Live Application</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ay-all-projects-btn"
                >
                  <FiGithub size={15} />
                  <span>View Source Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
