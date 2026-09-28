import React, { useEffect, useRef, useState } from "react";

import "./MyMediaPage.css";
import { ArrowLeft } from "lucide-react";
import { AnimatedLine } from "../sections/StorySection";
import { Footer } from "../layout/Footer";

interface MyMediaPageProps {
  onNavigate: (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => void;
}

// @ts-ignore
import Masonry from "../ui/Masonry";

export const MyMediaPage: React.FC<MyMediaPageProps> = ({ onNavigate }) => {
  const basePath = import.meta.env.BASE_URL;
  const items = [
    {
      id: "1",
      img: `${basePath}media-opt/media-1.jpg`,
      url: `${basePath}media/media-1.jpg`,
      height: 800,
    },
    {
      id: "2",
      img: `${basePath}media-opt/media-2.jpg`,
      url: `${basePath}media/media-2.jpg`,
      height: 600,
    },
    {
      id: "3",
      img: `${basePath}media-opt/media-3.jpg`,
      url: `${basePath}media/media-3.jpg`,
      height: 800,
    },
    {
      id: "4",
      img: `${basePath}media-opt/media-4.jpg`,
      url: `${basePath}media/media-4.png`,
      height: 500,
    },
    {
      id: "5",
      img: `${basePath}media-opt/media-5.jpg`,
      url: `${basePath}media/media-5.jpg`,
      height: 700,
    },
    { id: "6", img: `${basePath}media-opt/6.jpg`, url: `${basePath}6.JPG`, height: 600 },
    { id: "7", img: `${basePath}media-opt/7.jpg`, url: `${basePath}7.JPG`, height: 700 },
    { id: "8", img: `${basePath}media-opt/8.jpg`, url: `${basePath}8.JPG`, height: 500 },
    { id: "9", img: `${basePath}media-opt/9.jpg`, url: `${basePath}9.JPG`, height: 800 },
    {
      id: "10",
      img: `${basePath}media-opt/10.jpg`,
      url: `${basePath}10.jpg`,
      height: 650,
    },
    {
      id: "11",
      img: `${basePath}media-opt/11.jpg`,
      url: `${basePath}11.JPG`,
      height: 550,
    },
    {
      id: "12",
      img: `${basePath}media-opt/12.jpg`,
      url: `${basePath}12.JPG`,
      height: 750,
    },
    {
      id: "13",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.05.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.05.png`,
      height: 600,
    },
    {
      id: "14",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.18.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.18.png`,
      height: 800,
    },
    {
      id: "15",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.25.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.25.png`,
      height: 500,
    },
    {
      id: "16",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.30.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.30.png`,
      height: 700,
    },
    {
      id: "17",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.42.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.42.png`,
      height: 650,
    },
    {
      id: "18",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.51.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.51.png`,
      height: 750,
    },
    {
      id: "19",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.58.56.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.56.png`,
      height: 550,
    },
    {
      id: "20",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.03.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.03.png`,
      height: 800,
    },
    {
      id: "21",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.12.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.12.png`,
      height: 600,
    },
    {
      id: "22",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.20.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.20.png`,
      height: 700,
    },
    {
      id: "23",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.29.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.29.png`,
      height: 500,
    },
    {
      id: "24",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.43.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.43.png`,
      height: 750,
    },
    {
      id: "25",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 19.59.49.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.49.png`,
      height: 650,
    },
    {
      id: "26",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.04.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.04.png`,
      height: 800,
    },
    {
      id: "27",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.15.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.15.png`,
      height: 550,
    },
    {
      id: "28",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.23.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.23.png`,
      height: 700,
    },
    {
      id: "29",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.40.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.40.png`,
      height: 600,
    },
    {
      id: "30",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.46.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.46.png`,
      height: 500,
    },
    {
      id: "31",
      img: `${basePath}media-opt/Screenshot 2026-08-29 at 20.00.51.jpg`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.51.png`,
      height: 750,
    },
  ];

  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reveal immediately on mount/page transition for reliable viewing
    const timer = setTimeout(() => {
      setIsStoryVisible(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-media-page">
      <nav className="media-nav">
        <button
          className="back-btn"
          onClick={() => onNavigate("home")}
          aria-label="Back to Home"
          data-cursor-text="BACK"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Back to Home</span>
        </button>
      </nav>

      <div className="media-content">
        {/* Ambient Glow matching portfolio space theme */}
        <div className="media-ambient-glow" aria-hidden="true" />

        <div className="media-header-badge">
          <span className="media-badge-dot" aria-hidden="true" />
          <span>VISUAL ARCHIVE &amp; PRODUCTION</span>
        </div>

        <h1 className="media-title">Beyond the Frame</h1>

        <div className="media-story-section">
          <div
            ref={storyRef}
            className={`media-story-card ${isStoryVisible ? "is-visible" : ""}`}
          >
            <div className="media-quote-icon top" aria-hidden="true">“</div>
            <div className="media-story-text">
              <p className="media-story-line">
                <AnimatedLine
                  text="What began as a hobby slowly became a passion for <photography and video editing>."
                  baseDelay={0.15}
                />
              </p>
              <p className="media-story-line">
                <AnimatedLine
                  text="With every photo I captured and every video I edited,"
                  baseDelay={0.45}
                />
              </p>
              <p className="media-story-line">
                <AnimatedLine
                  text="I discovered a new way to express <creativity>."
                  baseDelay={0.75}
                />
              </p>
            </div>
            <div className="media-quote-icon bottom" aria-hidden="true">”</div>
          </div>
        </div>
      </div>

      {/* Interactive Masonry Gallery */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          marginTop: "0rem",
          paddingBottom: "4rem",
        }}
      >
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>
      <Footer />
    </div>
  );
};
