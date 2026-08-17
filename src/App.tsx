import { useState } from 'react';
import { LoadingIntro } from './components/LoadingIntro';
import { PortfolioLayout } from './components/PortfolioLayout';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingIntro onComplete={() => setIsLoaded(true)} />}
      <PortfolioLayout />
    </>
  );
}

export default App;
