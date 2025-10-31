

import React, { useState, useMemo } from 'react';
import { Stage } from '../types';
import CodeSnippet from './CodeSnippet';
import { SearchIcon, CheckCircleIcon } from './Icons';

interface StageCardProps {
  stage: Stage;
}

const StageCard: React.FC<StageCardProps> = ({ stage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = useMemo(() => {
    if (!stage.table || !searchTerm) {
      return stage.table?.rows || [];
    }
    return stage.table.rows.filter(row =>
      row.some(cell =>
        cell.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stage.table]);

  const canSearch = stage.table && stage.table.rows.length > 3;

  return (
    <div className="bg-slate-800/80 rounded-lg border border-slate-700 p-5 animate-fade-in">
      <div className="flex items-center mb-4">
        <stage.icon className="w-7 h-7 text-violet-400 mr-4 shrink-0" />
        <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
      </div>
      
      <div className="space-y-4">
        {stage.description.map((desc, i) => (
          <p key={i} className="text-slate-300 leading-relaxed">{desc}</p>
        ))}
        {stage.table && (
          <div className="my-4">
            {canSearch && (
              <div className="mb-4 relative">
                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-slate-400" />
                </span>
                 <input
                  type="search"
                  placeholder="Фильтр по таблице..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  aria-label="Фильтр по таблице"
                />
              </div>
            )}
            <table className="w-full text-left text-base border-collapse">
              <thead className="bg-slate-900/50 hidden md:table-header-group">
                <tr>
                  {stage.table.headers.map((header, index) => (
                    <th key={index} className="p-3 font-semibold border-b border-slate-700 text-slate-400">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {filteredRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="block md:table-row mb-4 md:mb-0 border md:border-t md:border-b-0 md:border-x-0 border-slate-700 rounded-lg md:rounded-none hover:bg-slate-700/40 hover:shadow-lg hover:shadow-black/20 transition-all duration-200">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="block md:table-cell p-3 border-b md:border-none border-slate-700/50 last:border-b-0 text-right md:text-left">
                        <span className="md:hidden font-semibold float-left text-slate-400">{stage.table.headers[cellIndex]}:</span>
                        <span className="break-words">{cell}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
             {filteredRows.length === 0 && searchTerm && (
                <p className="text-center text-slate-400 mt-4">Совпадений не найдено.</p>
            )}
          </div>
        )}
        {stage.details && (
             <div className="space-y-4 mt-4">
                {stage.details.map((detail, i) => {
                  if (typeof detail === 'string') {
                    return (
                      <div key={i} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-sky-400 mr-3 mt-0.5 shrink-0" />
                          <span className="text-slate-300">{detail}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-sky-400 mr-3 mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-100">{detail.title}</h4>
                            <p className="text-slate-400 mt-1 leading-relaxed">{detail.content}</p>
                        </div>
                    </div>
                  );
                })}
            </div>
        )}
        {stage.codeSnippet && <CodeSnippet snippet={stage.codeSnippet} />}
      </div>
    </div>
  );
};

export default StageCard;