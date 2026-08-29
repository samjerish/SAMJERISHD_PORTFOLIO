import React, { useEffect, useRef, useState } from "react";
import "./StorySection.css";
import profileImg1 from "../../assets/me.jpg";
import profileImg2 from "../../assets/me2.jpg";
import profileImg3 from "../../assets/me3.jpg";

export const StorySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const photos = [profileImg1, profileImg2, profileImg3];

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
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3500);

    return () => {
      if (node) observer.unobserve(node);
      clearInterval(photoInterval);
    };
  }, []);

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
            <div className="id-card-stack">
              {/* Background Card - No green dot as requested */}
              <div className="id-card-bg">
                <div className="id-card-connect-text">CLICK TO CONNECT ↗</div>
              </div>

              {/* Foreground Card */}
              <div className="id-card-fg">
                {/* Paperclip */}
                <div className="id-card-clip">
                  <svg
                    width="40"
                    height="70"
                    viewBox="0 0 24 42"
                    fill="none"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 26 V 10 A 3 3 0 0 1 15 10 V 30 A 6 6 0 0 1 3 30 V 6 A 9 9 0 0 1 21 6 V 24" />
                  </svg>
                </div>

                {/* Photo */}
                <div className="id-card-photo-wrapper">
                  {photos.map((photo, index) => {
                    let positionClass = "next";
                    if (index === photoIndex) positionClass = "active";
                    else if (
                      index ===
                      (photoIndex - 1 + photos.length) % photos.length
                    )
                      positionClass = "prev";

                    return (
                      <img
                        key={index}
                        src={photo}
                        alt={`Sam Jerish ${index + 1}`}
                        className={`id-card-photo ${positionClass} ${index === 2 ? "photo-contain" : ""}`}
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
                    FIGUREOUTABLE
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
