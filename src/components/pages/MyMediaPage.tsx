import React, { useEffect, useRef, useState } from "react";

import "./MyMediaPage.css";
import { AnimatedLine } from "../sections/StorySection";

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
      img: `${basePath}media/media-1.jpg`,
      url: `${basePath}media/media-1.jpg`,
      height: 800,
    },
    {
      id: "2",
      img: `${basePath}media/media-2.jpg`,
      url: `${basePath}media/media-2.jpg`,
      height: 600,
    },
    {
      id: "3",
      img: `${basePath}media/media-3.jpg`,
      url: `${basePath}media/media-3.jpg`,
      height: 800,
    },
    {
      id: "4",
      img: `${basePath}media/media-4.png`,
      url: `${basePath}media/media-4.png`,
      height: 500,
    },
    {
      id: "5",
      img: `${basePath}media/media-5.jpg`,
      url: `${basePath}media/media-5.jpg`,
      height: 700,
    },
    { id: "6", img: `${basePath}6.JPG`, url: `${basePath}6.JPG`, height: 600 },
    { id: "7", img: `${basePath}7.JPG`, url: `${basePath}7.JPG`, height: 700 },
    { id: "8", img: `${basePath}8.JPG`, url: `${basePath}8.JPG`, height: 500 },
    { id: "9", img: `${basePath}9.JPG`, url: `${basePath}9.JPG`, height: 800 },
    {
      id: "10",
      img: `${basePath}10.jpg`,
      url: `${basePath}10.jpg`,
      height: 650,
    },
    {
      id: "11",
      img: `${basePath}11.JPG`,
      url: `${basePath}11.JPG`,
      height: 550,
    },
    {
      id: "12",
      img: `${basePath}12.JPG`,
      url: `${basePath}12.JPG`,
      height: 750,
    },
    {
      id: "13",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.05.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.05.png`,
      height: 600,
    },
    {
      id: "14",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.18.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.18.png`,
      height: 800,
    },
    {
      id: "15",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.25.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.25.png`,
      height: 500,
    },
    {
      id: "16",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.30.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.30.png`,
      height: 700,
    },
    {
      id: "17",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.42.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.42.png`,
      height: 650,
    },
    {
      id: "18",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.51.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.51.png`,
      height: 750,
    },
    {
      id: "19",
      img: `${basePath}Screenshot 2026-08-29 at 19.58.56.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.58.56.png`,
      height: 550,
    },
    {
      id: "20",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.03.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.03.png`,
      height: 800,
    },
    {
      id: "21",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.12.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.12.png`,
      height: 600,
    },
    {
      id: "22",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.20.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.20.png`,
      height: 700,
    },
    {
      id: "23",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.29.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.29.png`,
      height: 500,
    },
    {
      id: "24",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.43.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.43.png`,
      height: 750,
    },
    {
      id: "25",
      img: `${basePath}Screenshot 2026-08-29 at 19.59.49.png`,
      url: `${basePath}Screenshot 2026-08-29 at 19.59.49.png`,
      height: 650,
    },
    {
      id: "26",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.04.png`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.04.png`,
      height: 800,
    },
    {
      id: "27",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.15.png`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.15.png`,
      height: 550,
    },
    {
      id: "28",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.23.png`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.23.png`,
      height: 700,
    },
    {
      id: "29",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.40.png`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.40.png`,
      height: 600,
    },
    {
      id: "30",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.46.png`,
      url: `${basePath}Screenshot 2026-08-29 at 20.00.46.png`,
      height: 500,
    },
    {
      id: "31",
      img: `${basePath}Screenshot 2026-08-29 at 20.00.51.png`,
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStoryVisible(true);
          if (storyRef.current) observer.unobserve(storyRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      },
    );

    const node = storyRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <div className="my-media-page">
      <nav className="media-nav">
        <button className="back-btn" onClick={() => onNavigate("home")}>
          ← Back to Home
        </button>
      </nav>

      <div className="media-content">
        <h1 className="media-title">Beyond the Frame</h1>
        <p className="media-subtitle">
          A showcase of my recent production work.
        </p>

        <div className="media-story-section">
          <div
            ref={storyRef}
            className={`story-text ${isStoryVisible ? "is-visible" : ""}`}
          >
            <AnimatedLine
              text="What began as a hobby slowly became a passion for <photography and video editing>. With every photo I captured and every video I edited, I discovered a new way to express <creativity>."
              baseDelay={0.2}
            />
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
    </div>
  );
};
