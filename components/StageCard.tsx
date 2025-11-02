
import React, { useState, useMemo } from 'react';
import { Stage } from '../types';
import CodeSnippet from './CodeSnippet';
import { SearchIcon, CheckCircleIcon, DocsIcon } from './Icons';
import Modal from './Modal';
import DetailedDocumentation from './DetailedDocumentation';

// Helper function to parse and style inline code blocks marked with backticks
const renderWithInlineCode = (text: string) => {
  const parts = text.split(/(`.*?`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className="font-mono text-sky-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm mx-1">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
};

interface StageCardProps {
  stage: Stage;
}

const StageCard: React.FC<StageCardProps> = ({ stage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getCellStyle = (index: number) => {
    // Styling based on header name for robustness
    switch (stage.table?.headers[index]) {
      case 'Поле':
        return 'font-mono text-sky-300 font-semibold';
      case 'Тип':
      case 'version':
        return 'font-mono text-sky-300';
      case 'Пример значения':
      case 'accuracy':
      case 'auto_ratio':
      case 'semantic':
      case 'coverage':
      case 'hallucination':
        return 'font-mono text-emerald-300';
      case 'latency':
      case 'feedback':
        return 'font-mono text-yellow-300';
      case 'updated_at':
        return 'font-mono text-slate-400';
      default: // Описание and any others
        return 'text-slate-400';
    }
  };

  return (
    <>
      <div className="bg-slate-800/80 rounded-lg border border-slate-700 p-5 animate-fade-in">
        <div className="flex items-start mb-4">
          <stage.icon className="w-7 h-7 text-violet-400 mr-4 shrink-0 mt-1" />
          <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            {stage.description.map((desc, i) => (
              <p key={i} className="text-slate-300 leading-relaxed">{desc}</p>
            ))}
          </div>
          
          {stage.details && (
               <div className="space-y-3 mt-5 pt-5 border-t border-slate-700/60">
                  {stage.details.map((detail, i) => {
                    if (typeof detail === 'string') {
                      return (
                        <div key={i} className="flex items-start bg-slate-900/50 p-3 rounded-md border border-slate-700/80">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-1 shrink-0" />
                            <p className="text-slate-300 leading-relaxed">{renderWithInlineCode(detail)}</p>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="bg-slate-900/40 p-4 rounded-md border border-slate-700/80">
                          <h4 className="font-semibold text-slate-100">{detail.title}</h4>
                          <p className="text-slate-400 mt-1 leading-relaxed">{detail.content}</p>
                      </div>
                    );
                  })}
              </div>
          )}

          {stage.table && (
            <div className="bg-slate-900/40 rounded-lg border border-slate-700/80 overflow-hidden">
              {canSearch && (
                <div className="p-4 border-b border-slate-700/80">
                  <div className="relative">
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
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-base border-collapse">
                  <thead className="bg-slate-800/60 hidden md:table-header-group">
                    <tr>
                      {stage.table.headers.map((header, index) => (
                        <th key={index} className="p-3 font-semibold border-b border-slate-700 text-slate-300 uppercase text-xs tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="block md:table-row mb-4 md:mb-0 border md:border-0 md:border-b border-slate-700 rounded-lg md:rounded-none md:odd:bg-slate-800/40 hover:bg-slate-700/40 transition-colors duration-200">
                        {row.map((cell, cellIndex) => {
                          const header = stage.table?.headers[cellIndex];

                          if (header === 'Размер (токены)') {
                            const tokenCount = parseInt(cell, 10);
                            const maxTokens = 32; // Max value in the data is 21, so 32 is a good ceiling
                            const percentage = isNaN(tokenCount) ? 0 : Math.min((tokenCount / maxTokens) * 100, 100);
                            
                            return (
                                <td key={cellIndex} className="block md:table-cell p-3 border-b md:border-none border-slate-700/50 last:border-b-0 align-top">
                                    <span className="md:hidden font-semibold float-left text-slate-400">{header}:</span>
                                    <div className="flex items-center gap-2 justify-end md:justify-start">
                                        <span className="font-mono text-slate-300 w-8 text-right">{cell}</span>
                                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                                            <div 
                                                className="bg-gradient-to-r from-sky-500 to-violet-500 h-2.5 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                                title={`${tokenCount} токенов`}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            );
                          }
                          
                          return (
                            <td key={cellIndex} className="block md:table-cell p-3 border-b md:border-none border-slate-700/50 last:border-b-0 text-right md:text-left align-top">
                              <span className="md:hidden font-semibold float-left text-slate-400">{stage.table.headers[cellIndex]}:</span>
                              <span className={`break-words ${getCellStyle(cellIndex)}`}>{cell}</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                 {filteredRows.length === 0 && searchTerm && (
                    <p className="text-center text-slate-400 p-4">Совпадений не найдено.</p>
                )}
              </div>
            </div>
          )}
          
          {stage.codeSnippet && <CodeSnippet snippet={stage.codeSnippet} />}
          
          {stage.detailedContent && (
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-sky-500/50 text-sky-300 bg-sky-500/10 rounded-md hover:bg-sky-500/20 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
              >
                <DocsIcon className="w-5 h-5" />
                Подробнее о модуле
              </button>
            </div>
          )}
        </div>
      </div>
      {stage.detailedContent && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={stage.detailedContent.title}>
            <DetailedDocumentation content={stage.detailedContent} />
        </Modal>
      )}
    </>
  );
};

export default StageCard;