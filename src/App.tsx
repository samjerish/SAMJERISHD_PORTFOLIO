import { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { LoadingIntro } from './components/LoadingIntro';
import { RibbonTransition } from './components/RibbonTransition';
import { PortfolioLayout } from './components/PortfolioLayout';
import { SpaceBackground } from './components/SpaceBackground';
import { ThemeSwitcher } from './components/ThemeSwitcher';
// @ts-ignore
import SplashCursor from './components/SplashCursor';

import { MyMediaPage } from './components/MyMediaPage';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactPage } from './components/ContactPage';
import { ResumePage } from './components/ResumePage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume'>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume'>('home');
  
  const [isSpaceMode, setIsSpaceMode] = useState(true);
  const [spaceColor, setSpaceColor] = useState<'black' | 'purple' | 'blue'>('black');

  const handleNavigate = (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => {
    if (page !== currentPage) {
      setTargetPage(page);
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
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
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#ffffff"
      />
      {isSpaceMode && <SpaceBackground colorTheme={spaceColor} />}
      
      <ThemeSwitcher 
        isSpaceMode={isSpaceMode}
        setIsSpaceMode={setIsSpaceMode}
        spaceColor={spaceColor}
        setSpaceColor={setSpaceColor}
      />

      {!isLoaded && <LoadingIntro onComplete={() => setIsLoaded(true)} />}
      
      {isTransitioning && (
        <RibbonTransition onReveal={handleReveal} onComplete={handleTransitionComplete} />
      )}

      {currentPage === 'home' && (
        <PortfolioLayout onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'media' && (
        <MyMediaPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'about' && (
        <AboutPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'projects' && (
        <ProjectsPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'contact' && (
        <ContactPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'resume' && (
        <ResumePage onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;
