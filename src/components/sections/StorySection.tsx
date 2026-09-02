import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import profileImg1 from "../../assets/me.jpg";
import profileImg2 from "../../assets/me2.jpg";

const STORY_PHOTOS = [profileImg1, profileImg2];

export const StorySection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (textRef.current) observer.unobserve(textRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      },
    );

    const node = textRef.current;
    if (node) observer.observe(node);

    const photoInterval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length);
    }, 3500);

    return () => {
      if (node) observer.unobserve(node);
      clearInterval(photoInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent default context menus and image drag behaviors
    e.preventDefault();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();

    const newX = e.clientX - dragStartRef.current.startX;
    const newY = e.clientY - dragStartRef.current.startY;
    // Rotation tilt based on horizontal drag distance
    const rotate = Math.max(-20, Math.min(20, newX * 0.08));
    setPos({ x: newX, y: newY, rotate });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);

    // Smooth, slow elastic spring bounce-back simulation to home (0, 0)
    let currentX = pos.x;
    let currentY = pos.y;
    let currentRotate = pos.rotate;
    let vx = 0;
    let vy = 0;
    let vRotate = 0;
    // Gentle stiffness and smooth damping for slow, graceful return
    const stiffness = 0.065;
    const damping = 0.87;

    const springStep = () => {
      const ax = -stiffness * currentX;
      const ay = -stiffness * currentY;
      const aRotate = -stiffness * currentRotate;

      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;
      vRotate = (vRotate + aRotate) * damping;

      currentX += vx;
      currentY += vy;
      currentRotate += vRotate;

      setPos({ x: currentX, y: currentY, rotate: currentRotate });

      if (
        Math.abs(currentX) > 0.15 ||
        Math.abs(currentY) > 0.15 ||
        Math.abs(vx) > 0.04 ||
        Math.abs(vy) > 0.04
      ) {
        animFrameRef.current = requestAnimationFrame(springStep);
      } else {
        setPos({ x: 0, y: 0, rotate: 0 });
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(springStep);
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

