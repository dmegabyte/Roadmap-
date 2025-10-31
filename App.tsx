import React from 'react';
import Header from './components/Header';
import Roadmap from './components/Roadmap';
import ProductStrategy from './components/ProductStrategy';
import { roadmapData } from './data/roadmapData';
import BackgroundAnimation from './components/BackgroundAnimation';

const App: React.FC = () => {
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
          <ProductStrategy />
          <Roadmap data={roadmapData} />
        </main>
        <footer className="text-center py-6 text-slate-500 text-sm">
        </footer>
      </div>
    </div>
  );
};

export default App;