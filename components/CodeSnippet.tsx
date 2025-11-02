
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeSnippet as CodeSnippetType } from '../types';
import { ClipboardIcon, ClipboardCheckIcon } from './Icons';

interface CodeSnippetProps {
  snippet: CodeSnippetType;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // A mapping for more user-friendly language names.
  const languageMap: { [key: string]: string } = {
    json: 'JSON',
    diff: 'Diff',
    text: 'Plain Text',
  };
  
  const displayName = languageMap[snippet.language] || snippet.language;

  return (
    <div className="mt-4">
      <div className="bg-slate-900/70 rounded-lg border border-slate-700 text-base overflow-hidden shadow-lg shadow-black/20">
        <div className="flex justify-between items-center px-4 py-1.5 bg-slate-800/60 border-b border-slate-700">
          <span className="text-sm font-semibold uppercase text-sky-300 tracking-wider font-mono">
            {displayName}
          </span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-white transition-all"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <ClipboardCheckIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={snippet.language}
          style={vscDarkPlus}
          customStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: '1rem',
            overflowX: 'auto',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'inherit',
              fontSize: '1rem',
              lineHeight: '1.5',
            },
          }}
        >
          {String(snippet.code).trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;