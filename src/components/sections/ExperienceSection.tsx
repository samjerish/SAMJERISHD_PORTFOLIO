import React, { useEffect, useRef, useState } from "react";
import "./ExperienceSection.css";
import profileImg1 from "../../assets/me.jpg";
import profileImg2 from "../../assets/me2.jpg";

const STORY_PHOTOS = [profileImg1, profileImg2];

interface ExperienceItem {
  id: string;
  period: string;
  isCurrent: boolean;
  company: string;
  role: string;
  desc: string;
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2024 — PRESENT",
    isCurrent: true,
    company: "Freelance & Independent Projects",
    role: "Full Stack & AI Developer",
    desc: "Building and deploying web applications, working with React, TypeScript, Python, and cloud backends. Focused on clean UI, smooth performance, and practical user experience.",
    skills: ["React", "TypeScript", "Python", "Cloud Backends", "AI Integration"],
  },
  {
    id: "exp-2",
    period: "JUNE 2026",
    isCurrent: false,
    company: "@Swiftant",
    role: "Python Development Intern",
    desc: "Worked on Python-based application development, applying Object-Oriented Programming (OOP) principles to build structured and maintainable solutions. Strengthened debugging, problem-solving, and software development skills through hands-on projects.",
    skills: ["Python", "OOP Architecture", "Software Development", "Debugging"],
  },
  {
    id: "exp-3",
    period: "2024 — 2027",
    isCurrent: false,
    company: "@MatrixKarunya",
    role: "Media Coordinator",
    desc: "Delivered multimedia coverage for 50+ events, producing 35K+ visual assets and 25+ videos while managing the department’s official social media platforms to enhance public engagement.",
    skills: ["Multimedia Direction", "50+ Events", "35K+ Visual Assets", "Public Engagement"],
  },
];

export const ExperienceSection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate: _onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
  const userOffsetRef = useRef({ x: 0, y: 0, rotate: 0 });
  const userVelRef = useRef({ vx: 0, vy: 0, vRotate: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Timeline Scroll Tracking Refs
  const timelineWrapperRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    const photoInterval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length);
    }, 3500);

    // Continuous smooth ambient swing animation loop
    const stiffness = 0.055;
    const damping = 0.88;

    const animate = () => {
      const t = performance.now() * 0.001;
      const ambientX = Math.sin(t * 1.3) * 14 + Math.sin(t * 0.65) * 4;
      const ambientRotate = Math.sin(t * 1.3 - 0.25) * 3.0 + Math.sin(t * 0.65) * 0.8;
      const ambientY = Math.abs(ambientX) * 0.08;

      if (!isDraggingRef.current) {
        const u = userOffsetRef.current;
        const v = userVelRef.current;

        if (
          Math.abs(u.x) > 0.05 ||
          Math.abs(u.y) > 0.05 ||
          Math.abs(v.vx) > 0.02 ||
          Math.abs(v.vy) > 0.02
        ) {
          const ax = -stiffness * u.x;
          const ay = -stiffness * u.y;
          const aRot = -stiffness * u.rotate;

          v.vx = (v.vx + ax) * damping;
          v.vy = (v.vy + ay) * damping;
          v.vRotate = (v.vRotate + aRot) * damping;

          u.x += v.vx;
          u.y += v.vy;
          u.rotate += v.vRotate;
        } else {
          u.x = 0;
          u.y = 0;
          u.rotate = 0;
          v.vx = 0;
          v.vy = 0;
          v.vRotate = 0;
        }
      }

      setPos({
        x: ambientX + userOffsetRef.current.x,
        y: ambientY + userOffsetRef.current.y,
        rotate: ambientRotate + userOffsetRef.current.rotate,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (node) observer.unobserve(node);
      clearInterval(photoInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Scroll Tracking for Experience Timeline Beam & Active Dot
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = timelineWrapperRef.current;
      const progLine = progressLineRef.current;
      const pointer = pointerRef.current;
      if (!wrapper || !progLine || !pointer) return;

      const rect = wrapper.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Trigger line when wrapper enters view
      const triggerY = windowH * 0.55;
      const topOffset = triggerY - rect.top;
      const totalH = rect.height;

      let progress = topOffset / totalH;
      progress = Math.max(0, Math.min(1, progress));

      const currentH = progress * totalH;
      progLine.style.height = `${currentH}px`;
      pointer.style.top = `${currentH}px`;

      // Update active focused card
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const dist = Math.abs(itemRect.top + itemRect.height * 0.3 - triggerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = index;
        }
      });

      setActiveExpIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToItem = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - window.innerHeight * 0.35;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const t = performance.now() * 0.001;
    const ambientX = Math.sin(t * 1.3) * 14 + Math.sin(t * 0.65) * 4;
    const ambientY = Math.abs(ambientX) * 0.08;
    const ambientRotate = Math.sin(t * 1.3 - 0.25) * 3.0 + Math.sin(t * 0.65) * 0.8;

    const targetX = e.clientX - dragStartRef.current.startX;
    const targetY = e.clientY - dragStartRef.current.startY;
    const targetRotate = Math.max(-20, Math.min(20, targetX * 0.08));

    userOffsetRef.current = {
      x: targetX - ambientX,
      y: targetY - ambientY,
      rotate: targetRotate - ambientRotate,
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Calculate dynamic SVG lanyard path from fixed top origin to moving badge clip
  const anchorX = 160;
  const anchorY = 0;
  const clipX = 160 + pos.x;
  const clipY = 80 + pos.y;
  const controlY = anchorY + (clipY - anchorY) * 0.5;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-container"
    >
      <div className="experience-content-wrapper">
        <div className={`story-experience-combo-block ${isVisible ? "is-visible" : ""}`}>
          {/* Left Side: Timeline */}
          <div className="experience-timeline-col">
            <div className="story-experience-header">
              <span className="story-experience-kicker">CAREER TIMELINE</span>
              <h3 className="story-experience-title">Experience</h3>
            </div>

            <div ref={timelineWrapperRef} className="story-timeline-wrapper">
              {/* Background Static Track */}
              <div className="story-timeline-line" aria-hidden="true" />

              {/* Glowing Active Track Beam that follows scroll */}
              <div
                ref={progressLineRef}
                className="story-timeline-progress-line"
                aria-hidden="true"
              />

              {/* Glowing Active Traveling Pointer */}
              <div
                ref={pointerRef}
                className="story-timeline-pointer"
                aria-hidden="true"
              >
                <div className="pointer-halo" />
                <div className="pointer-core-dot" />
              </div>

              {EXPERIENCES.map((exp, index) => {
                const isFocused = activeExpIndex === index;
                const isPassed = activeExpIndex >= index;

                return (
                  <div
                    key={exp.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`story-timeline-item ${
                      isFocused ? "is-focused" : ""
                    } ${isPassed ? "is-passed" : ""}`}
                    onClick={() => scrollToItem(index)}
                    data-cursor-text="VIEW"
                  >
                    <div className="timeline-node-container">
                      <div
                        className={`timeline-node ${
                          exp.isCurrent ? "is-current" : ""
                        } ${isFocused ? "is-node-focused" : ""}`}
                      >
                        {exp.isCurrent && <div className="timeline-node-pulse" />}
                        <div className="timeline-node-inner" />
                      </div>
                    </div>

                    <div className="timeline-card-content">
                      <div className="timeline-top-row">
                        <div className="timeline-badge-group">
                          <span
                            className={`timeline-period-badge ${
                              exp.isCurrent ? "current" : ""
                            }`}
                          >
                            {exp.isCurrent && <span className="live-dot" />}
                            {exp.period}
                          </span>
                          <span className="timeline-company-badge">
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      <h4 className="timeline-role-name">{exp.role}</h4>

                      <p className="timeline-role-desc">{exp.desc}</p>

                      <div className="timeline-skill-chips">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="skill-chip">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: The Hanging ID Card */}
          <div className="experience-id-card-col">
            <div
              ref={containerRef}
              className="id-card-assembly"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Dynamic SVG Elastic Lanyard Strap */}
              <svg className="id-lanyard-svg" viewBox="0 0 320 600">
                {/* Left Strap Band */}
                <path
                  d={`M ${anchorX - 18} ${anchorY} Q ${anchorX - 10 + pos.x * 0.3} ${controlY} ${clipX - 12} ${clipY}`}
                  fill="none"
                  stroke="#1c1c1c"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                {/* Right Strap Band (Two-tone Accent) */}
                <path
                  d={`M ${anchorX + 18} ${anchorY} Q ${anchorX + 10 + pos.x * 0.3} ${controlY} ${clipX + 12} ${clipY}`}
                  fill="none"
                  stroke="#3a3a3a"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                {/* Center Seam Stripe */}
                <path
                  d={`M ${anchorX} ${anchorY} Q ${anchorX + pos.x * 0.3} ${controlY} ${clipX} ${clipY}`}
                  fill="none"
                  stroke="#111111"
                  strokeWidth="3"
                />
              </svg>

              {/* Fixed Wall/Ceiling Mounting Anchor */}
              <div className="lanyard-fixed-anchor">
                <div className="anchor-metal-pin"></div>
              </div>

              {/* Physical Swinging Badge Unit */}
              <div
                className={`id-badge-unit ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rotate}deg)`,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={() =>
                  setPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length)
                }
                data-cursor-text="SWAP"
              >
                {/* Silver Metal Clip Clasp */}
                <div className="badge-metal-clasp">
                  <div className="clasp-metal-ring"></div>
                  <div className="clasp-spring-buckle"></div>
                </div>

                {/* Sleek Black Molded Outer Badge Casing */}
                <div className="badge-outer-frame">
                  {/* Top Casing Hole Slot */}
                  <div className="badge-slot-punch">
                    <div className="slot-inner-hole"></div>
                  </div>

                  {/* Inner Dark ID Card Surface */}
                  <div className="badge-inner-card">
                    {/* Diagonal Geometric Stripes Background Overlay */}
                    <div className="card-diagonal-stripes"></div>

                    {/* Full Photo Frame */}
                    <div className="id-full-photo-frame">
                      {STORY_PHOTOS.map((photo, index) => {
                        const positionClass =
                          index === photoIndex ? "active" : "hidden";

                        return (
                          <img
                            key={index}
                            src={photo}
                            alt="Sam Jerish"
                            className={`id-card-full-img ${positionClass}`}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        );
                      })}
                      <div className="id-photo-specular-glare"></div>
                    </div>

                    {/* Below Photo: Name and Small Full Stack Developer Text */}
                    <div className="id-identity-bottom">
                      <h3 className="id-person-name">SAM JERISH D</h3>
                      <p className="id-person-subtitle">FULL STACK DEVELOPER</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Touch & Drag Hint */}
            <div className="id-card-mobile-hint" aria-hidden="true">
              <span>✦ DRAG TO SWING • TAP TO SWAP ✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
