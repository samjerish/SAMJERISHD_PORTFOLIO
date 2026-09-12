import { useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import { RibbonTransition } from "./components/ui/RibbonTransition";
import { PortfolioLayout } from "./components/layout/PortfolioLayout";
import { CustomCursor } from "./components/ui/CustomCursor";

import { MyMediaPage } from "./components/pages/MyMediaPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ResumePage } from "./components/pages/ResumePage";
import { BottomMenuBar } from "./components/layout/BottomMenuBar";
import { MobilePageWrapper } from "./components/layout/MobilePageWrapper";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "media" | "about" | "projects" | "contact" | "resume"
  >("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<
    "home" | "media" | "about" | "projects" | "contact" | "resume"
  >("home");
  const [isShiftingRight, setIsShiftingRight] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (
    page: "home" | "media" | "about" | "projects" | "contact" | "resume",
  ) => {
    if (page === currentPage) return;

    // In mobile view: instant iOS Instagram push/pop rightward shift transitions
    if (isMobile) {
      if (page === "home") {
        setIsShiftingRight(true);
      } else {
        setIsShiftingRight(false);
        setCurrentPage(page);
      }
      return;
    }

    // Desktop view: cinematic ribbon transition
    setTargetPage(page);
    setIsTransitioning(true);
  };

  const handleMobileSwipeBack = useCallback(() => {
    setCurrentPage("home");
    setIsShiftingRight(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    setCurrentPage("home");
    setIsShiftingRight(false);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
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
  }, [isMobile]);

  const handleReveal = useCallback(() => {
    setCurrentPage(targetPage);
  }, [targetPage]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Desktop Ribbon Transition */}
      {!isMobile && isTransitioning && (
        <RibbonTransition
          onReveal={handleReveal}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Home Page: Always preserved under subpages on mobile for smooth Instagram-style reveal */}
      <div
        className={`app-home-layer ${
          isMobile && currentPage !== "home" ? "is-under-subpage" : ""
        }`}
        style={{
          display: !isMobile && currentPage !== "home" ? "none" : "block",
        }}
      >
        <PortfolioLayout onNavigate={handleNavigate} />
      </div>

      {/* Subpages: Wrapped in MobilePageWrapper for native iOS edge-swipe and shift-right transitions */}
      {currentPage !== "home" && (
        <MobilePageWrapper
          onSwipeBack={handleMobileSwipeBack}
          isExiting={isShiftingRight}
          onExitComplete={handleExitComplete}
        >
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
        </MobilePageWrapper>
      )}

      <BottomMenuBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default App;
