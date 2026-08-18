import { useState } from 'react';
import { LoadingIntro } from './components/LoadingIntro';
import { PortfolioLayout } from './components/PortfolioLayout';

import { CustomCursor } from './components/CustomCursor';
import { MyMediaPage } from './components/MyMediaPage';
import { AboutPage } from './components/AboutPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'media' | 'about'>('home');

  return (
    <>
      <CustomCursor />
      {!isLoaded && <LoadingIntro onComplete={() => setIsLoaded(true)} />}
      
      {currentPage === 'home' && (
        <PortfolioLayout onNavigate={setCurrentPage} />
      )}
      
      {currentPage === 'media' && (
        <MyMediaPage onNavigate={setCurrentPage} />
      )}

      {currentPage === 'about' && (
        <AboutPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
