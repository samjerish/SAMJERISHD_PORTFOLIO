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
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

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
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handlePointerDown = (clientX: number, clientY: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setIsDragging(true);
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top;

    const dx = clientX - anchorX;
    const dy = Math.max(15, clientY - anchorY);
    const rad = Math.atan2(dx, dy);
    let deg = (rad * 180) / Math.PI;
    deg = Math.max(-45, Math.min(45, deg));
    setAngle(deg);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top;

    if (isDragging) {
      const dx = clientX - anchorX;
      const dy = Math.max(15, clientY - anchorY);
      const rad = Math.atan2(dx, dy);
      let deg = (rad * 180) / Math.PI;
      deg = Math.max(-50, Math.min(50, deg));
      setAngle(deg);
    }

    const glareX = ((clientX - rect.left) / rect.width) * 100;
    const glareY = ((clientY - rect.top) / rect.height) * 100;
    setGlare({ x: glareX, y: glareY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Realistic dampened pendulum swing back to center
    const startDeg = angle;
    let time = 0;

    const animateSwing = () => {
      time += 0.035;
      const decay = Math.exp(-time * 2.2);
      const nextAngle = startDeg * decay * Math.cos(time * 9.5);
      setAngle(nextAngle);

      if (Math.abs(nextAngle) > 0.1 && decay > 0.008) {
        animRef.current = requestAnimationFrame(animateSwing);
      } else {
        setAngle(0);
      }
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animateSwing);
  };

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
            {/* Hanging Status Tag */}
            <div className="hanging-tag-wrapper">
              <span className="hanging-tag">
                <span className="hanging-tag-pulse"></span>
                HOLD & DRAG TO SWING ✦
              </span>
            </div>

            {/* Hanging Wall Rig */}
            <div
              className="hanging-rig"
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchEnd={handlePointerUp}
              onTouchCancel={handlePointerUp}
            >
              {/* Wall Pin / Metallic Nail */}
              <div className="wall-anchor-pin">
                <div className="pin-head"></div>
                <div className="pin-screw"></div>
              </div>

              {/* Lanyard Strap hanging from pin */}
              <div
                className="hanging-lanyard"
                style={{
                  transform: `rotate(${angle * 0.4}deg)`,
                  transformOrigin: "top center",
                }}
              >
                <div className="lanyard-ribbon"></div>
                <div className="lanyard-clasp">
                  <div className="clasp-swivel"></div>
                  <div className="clasp-hook"></div>
                </div>
              </div>

              {/* ID Card with Hanging Pendulum Physics */}
              <div
                ref={cardRef}
                className={`hanging-id-card ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "top center",
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePointerDown(e.clientX, e.clientY);
                }}
                onMouseMove={(e) => {
                  handlePointerMove(e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  if (touch) handlePointerDown(touch.clientX, touch.clientY);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  if (touch) handlePointerMove(touch.clientX, touch.clientY);
                }}
              >
                {/* Dynamic light reflection glare */}
                <div
                  className="card-glare-layer"
                  style={{
                    opacity: isDragging ? 0.35 : 0.15,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
                  }}
                />

                {/* Card Punch Slot & Metal Eyelet */}
                <div className="card-top-slot">
                  <div className="slot-eyelet"></div>
                </div>

                {/* Card Header */}
                <div className="id-card-top-banner">
                  <div className="id-badge-status">
                    <span className="badge-live-dot"></span>
                    <span className="badge-title">DEV ACCESS PASS</span>
                  </div>
                  <div className="id-badge-serial">2026 // PRO</div>
                </div>

                {/* Photo with Frame */}
                <div className="id-card-photo-wrapper">
                  {STORY_PHOTOS.map((photo, index) => {
                    const positionClass = index === photoIndex ? "active" : "hidden";

                    return (
                      <img
                        key={index}
                        src={photo}
                        alt={`Sam Jerish ${index + 1}`}
                        className={`id-card-photo ${positionClass}`}
                      />
                    );
                  })}
                </div>

                {/* Text Content */}
                <div className="id-card-content">
                  <h3 className="id-card-headline">
                    THIS IS WHO SAYS
                    <br />
                    EVERYTHING IS
                    <br />
                    <span className="figureoutable-word">FIGUREOUTABLE</span>
                    <br />
                    <span className="id-card-subheadline">AND FIGURES OUT</span>
                  </h3>

                  <div className="id-card-info-row">
                    <span className="id-card-label">Name:</span>
                    <span className="id-card-value handwriting">
                      Sam Jerish
                    </span>
                  </div>

                  <div className="id-card-info-row">
                    <span className="id-card-label">Role:</span>
                    <span className="id-card-value handwriting">
                      Full Stack Developer
                    </span>
                  </div>

                  {/* Unique Security Holographic Seal */}
                  <div className="id-card-hologram-seal">
                    <div className="hologram-emblem">
                      <div className="hologram-ring"></div>
                      <span className="hologram-text">VERIFIED IDENTITY</span>
                    </div>
                    <div className="hologram-chip">
                      <div className="chip-line c1"></div>
                      <div className="chip-line c2"></div>
                      <div className="chip-line c3"></div>
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
