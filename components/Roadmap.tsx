
import React, { useRef } from 'react';
import { Quarter } from '../types';
import StageCard from './StageCard';
import Timeline from './Timeline';

interface RoadmapProps {
  data: Quarter[];
  activeQuarterId: number;
  onQuarterSelect: (id: number) => void;
  activeStageIndex: number;
  onStageSelect: (index: number) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ data, activeQuarterId, onQuarterSelect, activeStageIndex, onStageSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<Map<number, HTMLElement | null>>(new Map());
  const stageRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  const activeQuarter = data.find(q => q.id === activeQuarterId);

  return (
    <div ref={containerRef} className="relative border border-slate-700/80 rounded-xl bg-slate-800/50 shadow-2xl shadow-black/30 backdrop-blur-sm">
      <Timeline 
        activeQuarterId={activeQuarterId}
        onQuarterSelect={onQuarterSelect}
        timelineRefs={timelineRefs}
      />
      
      {activeQuarter && (
        <div 
          id="quarter-content-panel" 
          role="region" 
          aria-live="polite" 
          className="p-6 pt-0 animate-fade-in border-t border-slate-700/80 relative z-10"
        >
          <div className="mt-20 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-400">
              Q{activeQuarter.id}: <span className="text-white">{activeQuarter.title}</span>
            </h2>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4 lg:col-span-3 mb-6 md:mb-0">
              <h3 id="stage-list-heading" className="text-xl font-semibold text-white mb-3">Этапы квартала</h3>
              <nav className="space-y-2" aria-labelledby="stage-list-heading">
                {activeQuarter.stages.map((stage, index) => {
                  const isActive = activeStageIndex === index;
                  const isCompleted = index < activeStageIndex;
                  
                  return (
                    <button
                      key={stage.id}
                      ref={el => stageRefs.current.set(stage.id, el)}
                      onClick={() => onStageSelect(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center ${
                        isActive
                          ? 'text-violet-300 animate-bg-pulse'
                          : isCompleted
                          ? 'text-slate-300 hover:bg-slate-700/50'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <stage.icon className="w-5 h-5 mr-3 shrink-0" />
                      <span className="text-lg font-medium">{stage.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="md:col-span-8 lg:col-span-9" aria-live="polite">
              {activeQuarter.stages[activeStageIndex] && (
                 <StageCard 
                    key={`${activeQuarterId}-${activeStageIndex}`}
                    stage={activeQuarter.stages[activeStageIndex]} 
                 />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;