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
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x: glareX, y: glareY });

    if (isDragging) {
      const newX = e.clientX - dragStartRef.current.startX;
      const newY = e.clientY - dragStartRef.current.startY;
      const rotate = Math.max(-25, Math.min(25, newX * 0.07));
      setPos({ x: newX, y: newY, rotate });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);

    // Elastic spring physics simulation with bounce-back to home (0,0)
    let currentX = pos.x;
    let currentY = pos.y;
    let currentRotate = pos.rotate;
    let vx = 0;
    let vy = 0;
    let vRotate = 0;
    const stiffness = 0.16;
    const damping = 0.78;

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
        Math.abs(currentX) > 0.25 ||
        Math.abs(currentY) > 0.25 ||
        Math.abs(vx) > 0.08 ||
        Math.abs(vy) > 0.08
      ) {
        animFrameRef.current = requestAnimationFrame(springStep);
      } else {
        setPos({ x: 0, y: 0, rotate: 0 });
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(springStep);
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
            <div className="elastic-card-container">
              {/* Elastic Draggable ID Card */}
              <div
                ref={cardRef}
                className={`elastic-id-card ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rotate}deg) scale(${isDragging ? 1.04 : 1})`,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
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
