
import React, { useState, useEffect, useRef } from 'react';

interface TimelineProps {
  activeQuarterId: number;
  onQuarterSelect: (id: number) => void;
  timelineRefs: React.MutableRefObject<Map<number, HTMLElement | null>>;
}

const Timeline: React.FC<TimelineProps> = ({ activeQuarterId, onQuarterSelect, timelineRefs }) => {
  const quarters = [
    { id: 1, name: 'Q1', goal: 'Data & Foundation', milestone: 'RAG-Ready Data' },
    { id: 2, name: 'Q2', goal: 'UI & Monitoring', milestone: 'MVP Launch' },
    { id: 3, name: 'Q3', goal: 'Integrations & Bias Control', milestone: 'System Integration' },
    { id: 4, name: 'Q4', goal: 'Maturity & Scale', milestone: 'Production Ready' },
  ];

  const [isMoving, setIsMoving] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    // This effect makes the glowing dot visible only during the progress bar transition.
    // It's skipped on the initial mount so the dot doesn't appear on page load.
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setIsMoving(true);
    const timer = setTimeout(() => {
      setIsMoving(false);
    }, 1000); // Duration should match the progress bar's CSS transition

    // Clean up the timer if the quarter changes again before the timeout completes
    return () => clearTimeout(timer);
  }, [activeQuarterId]);

  const activeIndex = activeQuarterId - 1;
  const itemWidthPercentage = 100 / quarters.length;
  const progressPercentage = (activeIndex * itemWidthPercentage) + (itemWidthPercentage / 2);

  return (
    <nav aria-label="Временная шкала кварталов" className="w-full px-4 pt-8 pb-12">
      <div className="relative">
        {/* Timeline track */}
        <div className="absolute top-4 left-0 w-full h-1 bg-slate-700 rounded-full"></div>
        
        {/* Progress bar with gradient and glow */}
        <div
          className="absolute top-4 left-0 h-1 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 ring-4 ring-violet-400/30 transition-opacity duration-200 ${isMoving ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        {/* Quarters and milestones */}
        <div className="relative flex justify-between items-start">
          {quarters.map((q, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;
            const milestoneAchieved = index <= activeIndex;
            
            return (
              <div 
                key={q.name} 
                className="w-1/4 flex flex-col items-center relative"
                ref={el => timelineRefs.current.set(q.id, el)}
              >
                <button
                  onClick={() => onQuarterSelect(q.id)}
                  className="w-full group flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-slate-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-400"
                  aria-current={isActive ? 'step' : undefined}
                  aria-controls="quarter-content-panel"
                >
                  {/* Quarter circle */}
                  <div className={`relative w-5 h-5 rounded-full z-10 transition-all duration-500 group-hover:scale-110 ${
                      isActive 
                        ? 'bg-sky-400 scale-125' 
                        : isCompleted 
                          ? 'bg-sky-400' 
                          : 'bg-slate-600 border-2 border-slate-500'
                    }`}>
                    {isActive && <div className="absolute -inset-1 rounded-full bg-sky-400/30 animate-pulse-glow"></div>}
                  </div>
                  
                  {/* Quarter labels */}
                  <div className="text-center mt-4">
                    <div className={`font-bold transition-colors text-lg md:text-xl ${isActive ? 'text-sky-300' : isCompleted ? 'text-sky-400' : 'text-slate-400'} ${!isActive ? 'group-hover:text-sky-300' : ''}`}>{q.name}</div>
                    <div className={`text-slate-400 mt-1 min-h-[2.5rem] text-base md:text-lg transition-colors ${!isActive ? 'group-hover:text-slate-300' : ''}`}>{q.goal}</div>
                  </div>
                </button>
                
                {/* Milestone labels */}
                {q.milestone && (
                  <div className="absolute top-full mt-8 md:mt-10 left-1/2 -translate-x-1/2">
                    <div className={`font-semibold rounded-full px-3 py-1 border transition-colors duration-500 text-base md:text-lg whitespace-nowrap ${milestoneAchieved ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-md shadow-violet-500/10' : 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>
                      {q.milestone}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Timeline;