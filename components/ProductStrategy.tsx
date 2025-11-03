import React, { useState } from 'react';
import { ChevronDownIcon, InformationCircleIcon, UsersIcon, TargetIcon, CheckCircleIcon, AutomationIcon } from './Icons';
import DialogueFlow from './DialogueFlow';
import { productStrategyData } from '../src/data/roadmapData';
import { PrioritizationItem } from '../types';

const Section: React.FC<{ title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 h-full flex flex-col backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
            <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-violet-500/20 mr-4 shrink-0">
                    <Icon className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            {title === productStrategyData.prioritization.title && (
                <div className="relative group flex items-center">
                    <InformationCircleIcon className="w-6 h-6 text-slate-500 cursor-help group-hover:text-sky-400 transition-colors" aria-describedby="rice-tooltip" />
                    <div
                        id="rice-tooltip"
                        role="tooltip"
                        className="absolute bottom-full mb-3 right-0 w-80 p-4 bg-slate-900 border border-slate-600 rounded-lg text-sm text-slate-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-20 transform translate-y-2 group-hover:translate-y-0"
                    >
                        <h4 className="font-bold text-white mb-2 text-lg">Как рассчитывается RICE?</h4>
                        <p className="font-mono text-sky-300 bg-slate-800 p-2 rounded-md text-center mb-3 text-lg">Reach × Impact × Confidence / Effort</p>
                        <ul className="space-y-2">
                            {[
                                { name: 'Reach', icon: UsersIcon, description: 'Охват (скольких пользователей затронет функция за период).' },
                                { name: 'Impact', icon: TargetIcon, description: 'Влияние (насколько сильно это повлияет на цели продукта).' },
                                { name: 'Confidence', icon: CheckCircleIcon, description: 'Уверенность (насколько мы уверены в оценках, в %).' },
                                { name: 'Effort', icon: AutomationIcon, description: 'Усилия (сколько "человеко-месяцев" потребуется).' }
                            ].map((factor, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex items-center w-32 shrink-0">
                                        <factor.icon className="w-5 h-5 text-sky-400 mr-3" />
                                        <strong className="font-semibold text-slate-200">{factor.name}:</strong>
                                    </div>
                                    <span className="text-base text-slate-400">{factor.description}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="absolute bottom-0 right-4 translate-y-1/2 w-4 h-4 bg-slate-900 border-b border-r border-slate-600 transform rotate-45"></div>
                    </div>
                </div>
            )}
        </div>
        <div className="flex-grow text-slate-300 space-y-4">
            {children}
        </div>
    </div>
);

const KpiCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  children: React.ReactNode;
  riceBreakdown?: { reach: number; impact: number; confidence: number; effort: number };
}> = ({ icon: Icon, title, value, children, riceBreakdown }) => {
  return (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 h-full flex flex-col transition-all duration-300 hover:bg-slate-900 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/50">
      <div className="flex items-center mb-3">
        <Icon className="w-6 h-6 text-sky-400 mr-3 shrink-0" />
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-violet-300 mb-3">{value}</p>
      
      {riceBreakdown && (
        <div className="font-mono text-sm space-y-2 mb-4 text-slate-400 border-t border-slate-700 pt-3" title="RICE: (Reach × Impact × Confidence) / Effort">
            <div className="flex justify-between items-center">
                <span>Reach</span>
                <span className="font-semibold text-slate-200">{riceBreakdown.reach}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Impact</span>
                <span className="font-semibold text-slate-200">{riceBreakdown.impact}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Confidence</span>
                <span className="font-semibold text-slate-200">{riceBreakdown.confidence}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Effort</span>
                <span className="font-semibold text-slate-200">{riceBreakdown.effort}</span>
            </div>
        </div>
      )}

      <p className="text-lg text-slate-400 leading-relaxed flex-grow">{children}</p>
    </div>
  );
};

interface ProductStrategyProps {
    onNavigate: (stageId: string) => void;
}

const ProductStrategy: React.FC<ProductStrategyProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(true);
    const data = productStrategyData;

    return (
        <div className="mb-6 border border-slate-700/80 rounded-xl bg-slate-800/50 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center cursor-pointer hover:bg-slate-700/30 rounded-t-xl"
                aria-expanded={isOpen}
                aria-controls="product-strategy-content"
            >
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sky-400">
                        {data.title}
                    </h2>
                    <p className="text-lg text-slate-400 mt-1">{data.subtitle}</p>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div id="product-strategy-content" className="p-6 border-t border-slate-700/80 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Section title={data.vision.title} icon={data.vision.icon}>
                            {data.vision.content.map((p, i) => (
                                <p key={i} className={`text-lg ${i === 0 ? "mb-4" : ""}`}>{p}</p>
                            ))}
                            <p className="text-lg font-semibold text-violet-300/90 mt-4">{data.vision.ethics}</p>
                        </Section>

                        <Section title={data.personas.title} icon={data.personas.icon}>
                            <div className="space-y-4">
                                {data.personas.items.map((persona, i) => (
                                    <div key={i}>
                                        <p className="font-semibold text-white">{persona.name}</p>
                                        <p className="text-lg text-slate-400">{persona.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                        
                        <div className="md:col-span-2">
                             <Section title={data.prioritization.title} icon={data.prioritization.icon}>
                               <p className="text-lg mb-6">{data.prioritization.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/80">
                                    {data.prioritization.items.map((item: PrioritizationItem) => (
                                       <div key={item.feature} className="p-5 flex flex-col">
                                           <div>
                                               <div className="flex items-center mb-4">
                                                   <item.icon className="w-7 h-7 text-sky-400 mr-3 shrink-0" />
                                                   <h4 className="text-xl font-semibold text-white">{item.feature}</h4>
                                               </div>
                               
                                               <div className="text-center my-4">
                                                   <p className="text-7xl font-bold text-violet-300 tracking-tight">{item.rice}</p>
                                               </div>
                               
                                               <div className="border border-slate-700/80 rounded-lg my-4 font-mono text-lg">
                                                   <div className="grid grid-cols-2">
                                                       <div className="p-3 border-r border-b border-slate-700/80">
                                                           <div className="flex justify-between items-baseline">
                                                               <span className="text-slate-400">Reach</span>
                                                               <span className="font-semibold text-slate-100">{item.reach}</span>
                                                           </div>
                                                       </div>
                                                       <div className="p-3 border-b border-slate-700/80">
                                                           <div className="flex justify-between items-baseline">
                                                               <span className="text-slate-400">Impact</span>
                                                               <span className="font-semibold text-slate-100">{item.impact}</span>
                                                           </div>
                                                       </div>
                                                       <div className="p-3 border-r border-slate-700/80">
                                                           <div className="flex justify-between items-baseline">
                                                               <span className="text-slate-400">Confidence</span>
                                                               <span className="font-semibold text-slate-100">{item.confidence}</span>
                                                           </div>
                                                       </div>
                                                       <div className="p-3">
                                                           <div className="flex justify-between items-baseline">
                                                               <span className="text-slate-400">Effort</span>
                                                               <span className="font-semibold text-slate-100">{item.effort}</span>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                           
                                           <div className="mt-auto pt-4">
                                               <p className="text-lg text-slate-400 leading-relaxed">{item.description}</p>
                                           </div>
                                       </div>
                                    ))}
                                </div>
                            </Section>
                        </div>
                        
                        <div className="md:col-span-2">
                            <Section title={data.dialogueArchitecture.title} icon={data.dialogueArchitecture.icon}>
                                <div className="animate-fade-in">
                                    <DialogueFlow onNavigate={onNavigate} />
                                </div>
                            </Section>
                        </div>
                       
                        <div className="md:col-span-2">
                            <Section title={data.kpis.title} icon={data.kpis.icon}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.kpis.items.map((kpi, i) => (
                                        <KpiCard key={i} icon={kpi.icon} title={kpi.title} value={kpi.value}>
                                            {kpi.description}
                                        </KpiCard>
                                    ))}
                                </div>
                            </Section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductStrategy;