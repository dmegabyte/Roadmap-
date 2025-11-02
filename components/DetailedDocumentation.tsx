
import React from 'react';
import { DetailedContent } from '../types';
import CodeSnippet from './CodeSnippet';
import { CheckCircleIcon } from './Icons';

interface DetailedDocumentationProps {
  content: DetailedContent;
}

const ArchitectureDiagram: React.FC<{ steps: string[] }> = ({ steps }) => (
    <div className="relative border-l-2 border-slate-700 pl-8 py-4 my-6">
      {steps.map((step, index) => (
          <div key={index} className="mb-8 last:mb-0 relative">
              {/* Circle on the line */}
              <div className="absolute -left-12 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 ring-8 ring-slate-800 text-sky-300 font-bold text-sm">
                  {index + 1}
              </div>
              {/* Content */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 shadow-md transition-colors hover:border-sky-500/50">
                  <p className="text-lg text-slate-200">{parseSimpleMarkdown(step)}</p>
              </div>
          </div>
      ))}
    </div>
);

// Helper function to parse and style simple markdown like **bold**, *italic*, and `code`
const parseSimpleMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-slate-100">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={index} className="italic text-slate-300">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="font-mono text-sky-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm mx-1">{part.slice(1, -1)}</code>;
        }
        return part;
      })}
    </>
  );
};


const DetailedDocumentation: React.FC<DetailedDocumentationProps> = ({ content }) => {
  return (
    <div className="space-y-8">
      {content.sections.map((section, index) => (
        <section key={index} aria-labelledby={`section-title-${index}`}>
          <h3 id={`section-title-${index}`} className="text-xl font-semibold text-sky-400 mb-4 border-b border-slate-700 pb-2">
            {section.title}
          </h3>
          <div className="text-lg text-slate-300 space-y-4 leading-relaxed">
            {section.type === 'text' && section.content?.map((p, i) => <p key={i}>{parseSimpleMarkdown(p)}</p>)}
            
            {section.type === 'architecture' && section.architecture && (
                <ArchitectureDiagram steps={section.architecture.steps} />
            )}

            {section.type === 'code' && section.codeSnippet && <CodeSnippet snippet={section.codeSnippet} />}

            {section.type === 'list' && section.list && (
                <ul className="space-y-3">
                    {section.list.map((item, i) => (
                        <li key={i} className="flex items-start">
                             <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-1 shrink-0" />
                            <span>{parseSimpleMarkdown(item)}</span>
                        </li>
                    ))}
                </ul>
            )}

            {section.type === 'table' && section.table && (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-lg border-collapse">
                        <thead className="bg-slate-900/50">
                            <tr>
                                {section.table.headers.map((header, hIndex) => (
                                    <th key={hIndex} className="p-3 font-semibold border-b border-slate-600 text-slate-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {section.table.rows.map((row, rIndex) => (
                                <tr key={rIndex} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/40 transition-colors">
                                    {row.map((cell, cIndex) => (
                                        <td key={cIndex} className="p-3">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

          </div>
        </section>
      ))}
    </div>
  );
};

export default DetailedDocumentation;