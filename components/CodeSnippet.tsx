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

  return (
    <div className="mt-4">
        <div className="bg-slate-900/70 rounded-md border border-slate-700 group relative text-base">
            <div className="absolute top-2 right-2 z-10">
                <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <ClipboardCheckIcon className="w-5 h-5 text-green-400" />
                    ) : (
                        <ClipboardIcon className="w-5 h-5" />
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
                        fontSize: '0.9rem',
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