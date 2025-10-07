import React from 'react';

interface SortControlsProps {
    sortBy: 'saves' | 'latest';
    onSortChange: (sort: 'saves' | 'latest') => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, onSortChange }) => {
    return (
        <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
            <button
                onClick={() => onSortChange('saves')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    sortBy === 'saves' 
                    ? 'bg-cyan-500 text-white font-semibold' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
                aria-pressed={sortBy === 'saves'}
            >
                熱門度
            </button>
            <button
                onClick={() => onSortChange('latest')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    sortBy === 'latest' 
                    ? 'bg-cyan-500 text-white font-semibold' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
                aria-pressed={sortBy === 'latest'}
            >
                最新
            </button>
        </div>
    );
};

export default SortControls;
