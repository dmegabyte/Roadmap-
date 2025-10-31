
import React, { useState } from 'react';
import { Quarter } from '../types';
import StageCard from './StageCard';
import { ChevronDownIcon } from './Icons';

interface QuarterCardProps {
  quarter: Quarter;
  isActive: boolean;
  onToggle: () => void;
}

const QuarterCard: React.FC<QuarterCardProps> = ({ quarter, isActive, onToggle }) => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const handleStageToggle = (index: number) => {
    setActiveStage(activeStage === index ? null : index);
  };

  return (
    <div className="border border-slate-700/80 rounded-xl bg-slate-800/50 shadow-2xl shadow-slate-900/50 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center cursor-pointer hover:bg-slate-700/30 rounded-t-xl"
        aria-expanded={isActive}
        aria-controls={`quarter-content-${quarter.id}`}
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            Q{quarter.id}: <span className="text-white">{quarter.title}</span>
          </h2>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
      </button>
      
      {isActive && (
        <div id={`quarter-content-${quarter.id}`} className="p-6 border-t border-slate-700/80 animate-fade-in">
          <div className="space-y-4">
            {quarter.stages.map((stage, index) => (
              <StageCard 
                key={index} 
                stage={stage}
                isActive={activeStage === index}
                onToggle={() => handleStageToggle(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuarterCard;