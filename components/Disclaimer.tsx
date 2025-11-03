import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import { disclaimerData } from '../data/roadmapData';

// Helper function to parse and style simple markdown like **bold**
const parseSimpleMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-violet-300">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
};

const Disclaimer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const data = disclaimerData;
    const Icon = data.icon;

    return (
        <div className="mb-6 border border-slate-700/80 rounded-xl bg-slate-800/50 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center cursor-pointer hover:bg-slate-700/30 rounded-xl"
                aria-expanded={isOpen}
                aria-controls="disclaimer-content"
            >
                <div className="flex items-center">
                    <Icon className="w-6 h-6 text-slate-400 mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold text-slate-300">
                            {data.title}
                        </h2>
                    </div>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div id="disclaimer-content" className="p-6 border-t border-slate-700/80 animate-fade-in">
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="bg-slate-900/50 p-5 rounded-lg border border-slate-700/80 flex flex-col">
                                <div className="flex items-center mb-4">
                                    <section.icon className="w-6 h-6 text-sky-400 mr-3 shrink-0" />
                                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                                </div>
                                <div className="text-lg text-slate-300 leading-relaxed space-y-4 flex-grow">
                                    {section.content.map((item, index) => {
                                        if (item.type === 'paragraph' && item.text) {
                                            return <p key={index}>{parseSimpleMarkdown(item.text)}</p>;
                                        }
                                        if (item.type === 'list' && item.items) {
                                            return (
                                                <ul key={index} className="space-y-2">
                                                    {item.items.map((listItem, i) => (
                                                        <li key={i} className="flex items-start">
                                                          <span className="text-sky-400 mr-3 mt-1.5 shrink-0">▪</span>
                                                          <span>{parseSimpleMarkdown(listItem)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Disclaimer;