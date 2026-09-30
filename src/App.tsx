import { useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import { LoadingIntro } from "./components/ui/LoadingIntro";
import { RibbonTransition } from "./components/ui/RibbonTransition";
import { PortfolioLayout } from "./components/layout/PortfolioLayout";
import { CustomCursor } from "./components/ui/CustomCursor";

import { MyMediaPage } from "./components/pages/MyMediaPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ResumePage } from "./components/pages/ResumePage";
import { DriftWallSection } from "./components/sections/DriftWallSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ContactSection } from "./components/sections/ContactSection";

function App() {
  const preview = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("preview") : null;
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "home" | "media" | "about" | "projects" | "contact" | "resume"
  >("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<
    "home" | "media" | "about" | "projects" | "contact" | "resume"
  >("home");

  const handleNavigate = (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => {
    if (page === currentPage) return;
    setTargetPage(page);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isTouch,
      wheelMultiplier: 1,
      touchMultiplier: 0,
      syncTouch: false,
    });

    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  const handleReveal = useCallback(() => {
    setCurrentPage(targetPage);
  }, [targetPage]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <>
      <CustomCursor />

      {preview === "drift" && (
        <div style={{ width: "100%", minHeight: "100vh", background: "#050507", padding: "40px 0" }}>
          <DriftWallSection />
        </div>
      )}

      {preview === "experience" && (
        <div style={{ width: "100%", minHeight: "100vh", background: "#050507", padding: "40px 0" }}>
          <ExperienceSection />
        </div>
      )}

      {preview === "contact" && (
        <div style={{ width: "100%", minHeight: "100vh", background: "#050507", padding: "40px 0" }}>
          <ContactSection />
        </div>
      )}

      {!preview && (
        <>
          {/* Initial Preloader: LatticeLoader + Marquee Ribbons */}
          {!isLoaded && (
            <LoadingIntro onComplete={() => setIsLoaded(true)} />
          )}

          {/* Ribbon Transition for all devices */}
          {isTransitioning && (
            <RibbonTransition
              onReveal={handleReveal}
              onComplete={handleTransitionComplete}
            />
          )}

          {/* Home Page */}
          <div
            className="app-home-layer"
            style={{
              display: currentPage !== "home" ? "none" : "block",
            }}
          >
            <PortfolioLayout onNavigate={handleNavigate} />
          </div>

          {/* Subpages */}
          {currentPage !== "home" && (
            <>
              {currentPage === "media" && (
                <MyMediaPage onNavigate={handleNavigate} />
              )}
              {currentPage === "about" && (
                <AboutPage onNavigate={handleNavigate} />
              )}
              {currentPage === "projects" && (
                <ProjectsPage onNavigate={handleNavigate} />
              )}
              {currentPage === "contact" && (
                <ContactPage onNavigate={handleNavigate} />
              )}
              {currentPage === "resume" && (
                <ResumePage onNavigate={handleNavigate} />
              )}
            </>
          )}

        </>
      )}
    </>
  );
}

export default App;
