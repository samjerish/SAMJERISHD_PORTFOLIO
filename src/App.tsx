import { useState, useCallback } from 'react';
import { LoadingIntro } from './components/LoadingIntro';
import { RibbonTransition } from './components/RibbonTransition';
import { PortfolioLayout } from './components/PortfolioLayout';

import { CustomCursor } from './components/CustomCursor';
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

  const handleNavigate = (page: 'home' | 'media' | 'about' | 'projects' | 'contact' | 'resume') => {
    if (page === 'contact') {
      setTargetPage(page);
      setIsTransitioning(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleReveal = useCallback(() => {
    setCurrentPage(targetPage);
  }, [targetPage]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <>
      <CustomCursor />

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
