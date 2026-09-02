import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import profileImg1 from "../../assets/me.jpg";
import profileImg2 from "../../assets/me2.jpg";

const STORY_PHOTOS = [profileImg1, profileImg2];

export const StorySection: React.FC<{
  onNavigate?: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

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
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
    setIsHovered(false);
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
            <div
              className="id-card-stack"
              onClick={() => onNavigate && onNavigate("contact")}
              style={{
                cursor: onNavigate ? "pointer" : "default",
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
                  : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: isHovered
                  ? "transform 0.1s ease-out"
                  : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              role={onNavigate ? "button" : undefined}
              tabIndex={onNavigate ? 0 : undefined}
              onKeyDown={(e) => {
                if (onNavigate && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onNavigate("contact");
                }
              }}
            >
              {/* Background Card */}
              <div className="id-card-bg">
                <div className="id-card-connect-text">CLICK TO CONNECT ↗</div>
              </div>

              {/* Foreground Card */}
              <div className="id-card-fg">
                {/* Dynamic light glare on hover */}
                <div
                  className="id-card-glare"
                  style={{
                    opacity: isHovered ? 0.3 : 0,
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 65%)`,
                  }}
                />

                {/* ID Card Punch Hole & Metallic Badge Clip */}
                <div className="id-card-punch-slot"></div>
                <div className="id-card-clip">
                  <svg
                    width="40"
                    height="70"
                    viewBox="0 0 24 42"
                    fill="none"
                    stroke="#888888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 26 V 10 A 3 3 0 0 1 15 10 V 30 A 6 6 0 0 1 3 30 V 6 A 9 9 0 0 1 21 6 V 24" />
                  </svg>
                </div>

                {/* ID Header Badge */}
                <div className="id-card-header-bar">
                  <span className="id-card-header-badge">DEV IDENTIFICATION</span>
                  <span className="id-card-header-id">#007</span>
                </div>

                {/* Photo */}
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

                  {/* Security Barcode Footer */}
                  <div className="id-card-barcode-container">
                    <div className="id-card-barcode-lines">
                      <span className="b-w1"></span>
                      <span className="b-w2"></span>
                      <span className="b-w1"></span>
                      <span className="b-w3"></span>
                      <span className="b-w1"></span>
                      <span className="b-w2"></span>
                      <span className="b-w3"></span>
                      <span className="b-w1"></span>
                      <span className="b-w2"></span>
                      <span className="b-w1"></span>
                      <span className="b-w3"></span>
                      <span className="b-w2"></span>
                      <span className="b-w1"></span>
                      <span className="b-w3"></span>
                      <span className="b-w2"></span>
                      <span className="b-w1"></span>
                      <span className="b-w2"></span>
                      <span className="b-w1"></span>
                      <span className="b-w3"></span>
                      <span className="b-w1"></span>
                    </div>
                    <div className="id-card-barcode-code">SJD // 2026 // PASS</div>
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
