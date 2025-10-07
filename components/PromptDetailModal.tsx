import React, { useCallback, useEffect } from 'react';
import type { Prompt } from '../types';
import { XIcon, BookmarkIcon, ClipboardCheckIcon, ClipboardIcon, LinkIcon } from './Icons';

interface PromptDetailModalProps {
    prompt: Prompt;
    onClose: () => void;
    isSaved: boolean;
    onToggleSave: () => void;
}

const HighlightedContent: React.FC<{ content: string }> = ({ content }) => {
    const parts = content.split(/(\[.*?\])/g);
    return (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {parts.map((part, index) => 
                part.startsWith('[') && part.endsWith(']') ? (
                    <span key={index} className="bg-cyan-100/50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-medium px-1 py-0.5 rounded">
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </p>
    );
};

const PromptDetailModal: React.FC<PromptDetailModalProps> = ({ prompt, onClose, isSaved, onToggleSave }) => {
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [prompt.content]);
    
    return (
        <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-3xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl shadow-black/20 dark:shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{prompt.title}</h2>
                        <div className="flex items-center space-x-2 text-sm mt-2">
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{prompt.roleCategory}</span>
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{prompt.purposeCategory}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                        <XIcon className="w-6 h-6"/>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto flex-grow">
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">提示詞內容</h4>
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                <HighlightedContent content={prompt.content} />
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">使用說明</h4>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{prompt.usageInstructions}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">範例輸出</h4>
                            <pre className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap font-mono">
                                <code>{prompt.exampleOutput}</code>
                            </pre>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">標籤</h4>
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.map(tag => (
                                    <span key={tag} className="bg-slate-200 dark:bg-slate-700 text-cyan-700 dark:text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-sm text-slate-400 dark:text-slate-500 flex items-center">
                            <LinkIcon className="w-4 h-4 mr-2"/>
                            來源: <a href={prompt.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-500 dark:text-cyan-400 hover:underline">{prompt.sourceUrl}</a>
                        </div>
                    </div>
                </div>

                <footer className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-b-2xl">
                    <button
                        onClick={onToggleSave}
                        className={`flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors ${
                            isSaved 
                            ? 'bg-slate-200 dark:bg-slate-700 text-cyan-600 dark:text-cyan-400' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                    >
                        <BookmarkIcon className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                        <span>{isSaved ? '已收藏' : '收藏'}</span>
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`min-w-[120px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center ${
                            copied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        }`}
                    >
                        {copied ? (
                            <><ClipboardCheckIcon className="w-5 h-5 mr-2"/> 已複製</>
                        ) : (
                            <><ClipboardIcon className="w-5 h-5 mr-2"/> 複製提示詞</>
                        )}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PromptDetailModal;