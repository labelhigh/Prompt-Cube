import React from 'react';
import { CubeIcon, SearchIcon, UserIcon, PlusIcon, SettingsIcon, FilterIcon } from './Icons';

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onSettingsClick: () => void;
    onFilterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onSettingsClick, onFilterClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <CubeIcon className="w-8 h-8 text-cyan-500 dark:text-cyan-400"/>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white hidden sm:block">
                        Prompt Cube
                    </h1>
                </div>

                <div className="flex-1 max-w-lg mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="搜尋提示詞..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-slate-400 dark:text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                     <button className="hidden md:flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        <PlusIcon className="w-5 h-5"/>
                        <span>提交提示詞</span>
                    </button>
                    <button onClick={onSettingsClick} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="設定">
                        <SettingsIcon className="w-6 h-6 text-slate-500 dark:text-slate-400"/>
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="使用者帳戶">
                        <UserIcon className="w-6 h-6 text-slate-500 dark:text-slate-400"/>
                    </button>
                    <button onClick={onFilterClick} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors md:hidden" aria-label="篩選">
                        <FilterIcon className="w-6 h-6 text-slate-500 dark:text-slate-400"/>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;