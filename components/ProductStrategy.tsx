
import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import DialogueFlow from './DialogueFlow';
import { productStrategyData } from '../data/roadmapData';

const Section: React.FC<{ title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 h-full flex flex-col backdrop-blur-sm">
        <div className="flex items-center mb-4 border-b border-slate-700 pb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-violet-500/20 mr-4 shrink-0">
                <Icon className="w-6 h-6 text-violet-300" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
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
}> = ({ icon: Icon, title, value, children }) => {
  return (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 h-full flex flex-col transition-all duration-300 hover:bg-slate-900 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/50">
      <div className="flex items-center mb-3">
        <Icon className="w-6 h-6 text-sky-400 mr-3 shrink-0" />
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-violet-300 mb-3">{value}</p>
      <p className="text-slate-400 text-base leading-relaxed flex-grow">{children}</p>
    </div>
  );
};

const ProductStrategy: React.FC = () => {
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
                    <h2 className="text-xl md:text-2xl font-bold text-sky-400">
                        {data.title}
                    </h2>
                    <p className="text-slate-400 mt-1">{data.subtitle}</p>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div id="product-strategy-content" className="p-6 border-t border-slate-700/80 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <Section title={data.vision.title} icon={data.vision.icon}>
                            {data.vision.content.map((p, i) => (
                                <p key={i} className={i === 0 ? "mb-4" : ""}>{p}</p>
                            ))}
                            <p className="font-semibold text-violet-300/90 mt-4">{data.vision.ethics}</p>
                        </Section>

                        <Section title={data.personas.title} icon={data.personas.icon}>
                            <div className="space-y-4">
                                {data.personas.items.map((persona, i) => (
                                    <div key={i}>
                                        <p className="font-semibold text-white">{persona.name}</p>
                                        <p className="text-base text-slate-400">{persona.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title={data.prioritization.title} icon={data.prioritization.icon}>
                           <p>{data.prioritization.description}</p>
                            <div className="text-base overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-600">
                                            <th className="p-2 font-semibold text-slate-400 uppercase tracking-wider">Функция</th>
                                            <th className="p-2 font-semibold text-slate-400 uppercase tracking-wider text-right">RICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.prioritization.items.map((item, i) => (
                                            <tr key={i} className="border-t border-slate-700">
                                                <td className="p-2">{item.feature}</td>
                                                <td className={`p-2 font-bold text-right ${item.rice > 8 ? 'text-green-400' : 'text-yellow-400'}`}>{item.rice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <div className="lg:col-span-3 my-6">
                             <Section title={data.dialogueArchitecture.title} icon={data.dialogueArchitecture.icon}>
                                <div className="animate-fade-in">
                                    <DialogueFlow />
                                </div>
                            </Section>
                        </div>
                       
                        <div className="lg:col-span-3">
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