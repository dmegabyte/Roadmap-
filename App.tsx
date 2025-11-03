
import React, { useState, useRef, Suspense, lazy } from 'react';
import Header from './components/Header';
import { roadmapData } from './src/data/roadmapData';
import BackgroundAnimation from './components/BackgroundAnimation';

const Disclaimer = lazy(() => import('./components/Disclaimer'));
const ProductStrategy = lazy(() => import('./components/ProductStrategy'));
const Roadmap = lazy(() => import('./components/Roadmap'));

const LoadingFallback: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center p-12 text-slate-400 animate-pulse">{message}</div>
);

const App: React.FC = () => {
  const [activeQuarterId, setActiveQuarterId] = useState<number>(1);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleQuarterSelect = (id: number) => {
    setActiveQuarterId(id);
    setActiveStageIndex(0);
  };

  const handleNavigateToStage = (stageId: string) => {
    let targetQuarterId = -1;
    let targetStageIndex = -1;

    for (const quarter of roadmapData) {
        const stageIndex = quarter.stages.findIndex(s => s.id === stageId);
        if (stageIndex !== -1) {
            targetQuarterId = quarter.id;
            targetStageIndex = stageIndex;
            break;
        }
    }

    if (targetQuarterId !== -1 && targetStageIndex !== -1) {
        setActiveQuarterId(targetQuarterId);
        setActiveStageIndex(targetStageIndex);
        
        setTimeout(() => {
            roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  return (
    <div className="relative min-h-screen font-sans leading-relaxed text-slate-200">
      {/* Container for all background elements */}
      <div className="fixed inset-0 -z-10 bg-slate-900">
        <BackgroundAnimation />
        <div className="absolute inset-0 h-full w-full bg-grid-pattern bg-[size:3rem_3rem]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e8a33,transparent)]"></div>
      </div>

      {/* New content wrapper to force a single, stable GPU layer for all foreground elements */}
      <div 
        className="relative z-10" 
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <main className="container mx-auto px-4 py-8 md:py-16 space-y-12">
          <Header />
          <Suspense fallback={<LoadingFallback message="Загрузка..." />}>
            <Disclaimer />
          </Suspense>
          <Suspense fallback={<LoadingFallback message="Загрузка стратегии..." />}>
            <ProductStrategy onNavigate={handleNavigateToStage} />
          </Suspense>
          <div ref={roadmapRef} className="scroll-mt-4">
            <Suspense fallback={<LoadingFallback message="Загрузка дорожной карты..." />}>
              <Roadmap 
                data={roadmapData}
                activeQuarterId={activeQuarterId}
                onQuarterSelect={handleQuarterSelect}
                activeStageIndex={activeStageIndex}
                onStageSelect={setActiveStageIndex}
              />
            </Suspense>
          </div>
        </main>
        <footer className="text-center py-6 text-slate-500 text-sm">
        </footer>
      </div>
    </div>
  );
};

export default App;