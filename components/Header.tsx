
import React from 'react';
import { RectangleGroupIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-4 mb-4 p-3 bg-slate-800/50 border border-slate-700 rounded-full">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500">
            <RectangleGroupIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
          Roadmap разработки AI-ассистента
        </h1>
      </div>
      <p className="text-xl text-slate-400 max-w-4xl mx-auto">
        Интерактивная визуализация четырехквартального плана по созданию готового к эксплуатации AI-ассистента, от подготовки данных до production-ready решения.
      </p>
    </header>
  );
};

export default Header;