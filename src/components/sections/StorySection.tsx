import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import profileImg1 from "../../assets/me.jpg";
import profileImg2 from "../../assets/me2.jpg";
import clickHereGraphic from "../../assets/click_here.png";

const STORY_PHOTOS = [profileImg1, profileImg2];

export const StorySection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
  const userOffsetRef = useRef({ x: 0, y: 0, rotate: 0 });
  const userVelRef = useRef({ vx: 0, vy: 0, vRotate: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const node = textRef.current;
    if (node) observer.observe(node);

    const photoInterval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length);
    }, 3500);

    // Continuous smooth ambient swing animation loop ("moving here and there slowly")
    const stiffness = 0.055;
    const damping = 0.88;

    const animate = () => {
      const t = performance.now() * 0.001;
      // Gentle compound pendulum swing: slow oscillation back and forth
      const ambientX = Math.sin(t * 1.3) * 14 + Math.sin(t * 0.65) * 4;
      const ambientRotate = Math.sin(t * 1.3 - 0.25) * 3.0 + Math.sin(t * 0.65) * 0.8;
      const ambientY = Math.abs(ambientX) * 0.08;

      if (!isDraggingRef.current) {
        // Spring physics smoothly damp any user drag offset back to zero
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
    <section className="story-container">
      <div className="story-content-wrapper">
        <div
          ref={textRef}
          className={`story-content-block ${isVisible ? "is-visible" : ""}`}
        >
          <div className="story-text-column">
            <div className="story-section-part">
              <h1 className="story-headline">A LITTLE ABOUT ME</h1>
              <p className="story-description">
                It started with a curiosity about how computers work. That
                curiosity grew into a passion for coding, problem-solving, and
                building.
                <br />
                <br />
                From exploring technology to developing intelligent solutions,
                my journey is about turning curiosity into code and ideas into
                reality.
              </p>
            </div>

            <div className="story-section-part">
              <h2 className="story-subheadline">WHAT I DO</h2>
              <p className="story-description">
                I’m someone who loves to learn, create, and experiment.
                <br />I enjoy exploring different ways to turn an idea into
                something real. I’m still figuring things out, still learning,
                and still creating. And honestly, that’s the part of the journey
                I enjoy the most.
              </p>
            </div>

            {/* Small View More Option with Click Here Graphic */}
            <div
              className="story-view-more-card"
              onClick={() => onNavigate && onNavigate("about")}
              role="button"
              tabIndex={0}
            >
              <div className="story-view-more-avatar-wrap">
                <img
                  src={clickHereGraphic}
                  alt="Click to View More"
                  className="story-view-more-avatar"
                  draggable={false}
                />
              </div>
              <div className="story-view-more-info">
                <span className="story-view-more-title">VIEW MORE</span>
                <span className="story-view-more-sub">
                  Learn more about my story, journey & GitHub activity →
                </span>
              </div>
            </div>
          </div>

          <div className="story-graphic-column">
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

              {/* Draggable Hanging ID Card Unit */}
              <div
                ref={cardRef}
                className={`id-badge-unit ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rotate}deg)`,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Silver Metal Clip Clasp */}
                <div className="badge-metal-clasp">
                  <div className="clasp-metal-ring"></div>
                  <div className="clasp-spring-buckle"></div>
                </div>

                {/* White Molded Outer Badge Casing */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export const AnimatedLine = ({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) => {
  const parts = text.split(/(<[^>]+>)/g);
  let charIndex = 0;

  const renderWords = (content: string, isHighlight: boolean) => {
    const tokens = content.split(/( )/g);
    return tokens.map((token, index) => {
      if (token === " ") {
        charIndex++;
        return <span key={index}> </span>;
      }
      return (
        <span
          key={index}
          style={{ whiteSpace: "nowrap" }}
          className={isHighlight ? "story-highlight" : ""}
        >
          {token.split("").map((char, j) => {
            const delay = baseDelay + charIndex++ * 0.015;
            return (
              <span
                key={j}
                className="fade-char"
                style={{ transitionDelay: `${delay}s` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <span className="fade-line-container">
      {parts.map((part, i) => {
        if (part.startsWith("<") && part.endsWith(">")) {
          const content = part.slice(1, -1);
          return (
            <React.Fragment key={i}>
              {renderWords(content, true)}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={i}>{renderWords(part, false)}</React.Fragment>
        );
      })}
    </span>
  );
};

