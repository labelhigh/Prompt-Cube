import React from 'react';
import type { Prompt } from '../types';
import PromptCard from './PromptCard';
import { CubeIcon } from './Icons';

interface PromptGridProps {
    prompts: Prompt[];
    savedPromptIds: Set<number>;
    onSelectPrompt: (prompt: Prompt) => void;
    onToggleSave: (promptId: number) => void;
}

const PromptGrid: React.FC<PromptGridProps> = ({ prompts, savedPromptIds, onSelectPrompt, onToggleSave }) => {
    if (prompts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-500 h-96 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                <CubeIcon className="w-16 h-16 mb-4 text-slate-400 dark:text-slate-600"/>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400">找不到符合的提示詞</h3>
                <p className="mt-2">請試著調整您的篩選條件或搜尋關鍵字。</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {prompts.map(prompt => (
                <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onSelect={() => onSelectPrompt(prompt)}
                    isSaved={savedPromptIds.has(prompt.id)}
                    onToggleSave={() => onToggleSave(prompt.id)}
                />
            ))}
        </div>
    );
};

export default PromptGrid;
