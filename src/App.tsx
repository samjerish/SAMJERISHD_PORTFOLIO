import { useState, useCallback, useEffect } from "react";
import Lenis from "lenis";
import { LoadingIntro } from "./components/ui/LoadingIntro";
import { RibbonTransition } from "./components/ui/RibbonTransition";
import { PortfolioLayout } from "./components/layout/PortfolioLayout";

import { MyMediaPage } from "./components/pages/MyMediaPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ResumePage } from "./components/pages/ResumePage";

function App() {
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
    if (page !== currentPage) {
      setTargetPage(page);
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
      {!isLoaded && <LoadingIntro onComplete={() => setIsLoaded(true)} />}

      {isTransitioning && (
        <RibbonTransition
          onReveal={handleReveal}
          onComplete={handleTransitionComplete}
        />
      )}

      {currentPage === "home" && (
        <PortfolioLayout onNavigate={handleNavigate} />
      )}

      {currentPage === "media" && <MyMediaPage onNavigate={handleNavigate} />}

      {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}

      {currentPage === "projects" && (
        <ProjectsPage onNavigate={handleNavigate} />
      )}

      {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}

      {currentPage === "resume" && <ResumePage onNavigate={handleNavigate} />}
    </>
  );
}

export default App;
