import React, { useState, useCallback } from 'react';
import type { Prompt } from '../types';
import { BookmarkIcon, ClipboardCheckIcon, ClipboardIcon, EyeIcon, TargetIcon } from './Icons';

interface PromptCardProps {
    prompt: Prompt;
    onSelect: () => void;
    isSaved: boolean;
    onToggleSave: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelect, isSaved, onToggleSave }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [prompt.content]);
    
    const handleSaveClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleSave();
    }, [onToggleSave]);

    return (
        <div 
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col cursor-pointer"
            onClick={onSelect}
        >
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">{prompt.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 line-clamp-2">{prompt.description}</p>
                    <div className="mt-4">
                        <h4 className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                            <TargetIcon className="w-4 h-4 mr-1.5" />
                            使用情境
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{prompt.usageInstructions}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{prompt.roleCategory}</span>
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{prompt.purposeCategory}</span>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-b-lg">
                <div className="flex items-center space-x-4">
                     <button
                        onClick={handleSaveClick}
                        className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label={isSaved ? "取消收藏" : "收藏"}
                    >
                       <BookmarkIcon className={`w-5 h-5 ${isSaved ? 'text-cyan-500 dark:text-cyan-400 fill-current' : ''}`} />
                        <span className="text-sm">{prompt.saves + (isSaved ? 1 : 0)}</span>
                    </button>
                    <button
                        onClick={onSelect}
                        className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label="查看詳情"
                    >
                       <EyeIcon className="w-5 h-5" />
                        <span className="text-sm">查看</span>
                    </button>
                </div>
                 <button
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 hover:bg-cyan-500 text-slate-700 dark:text-slate-300 hover:text-white'
                    }`}
                >
                    {copied ? (
                        <span className="flex items-center"><ClipboardCheckIcon className="w-4 h-4 mr-1"/> 已複製</span>
                    ) : (
                        <span className="flex items-center"><ClipboardIcon className="w-4 h-4 mr-1"/> 複製</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PromptCard;