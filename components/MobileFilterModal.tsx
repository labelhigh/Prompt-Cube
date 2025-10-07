import React, { useEffect } from 'react';
import type { RoleCategory, PurposeCategory } from '../types';
import { ROLE_CATEGORIES, PURPOSE_CATEGORIES } from '../data/categories';
import { XIcon, BookmarkIcon, RocketIcon, CheckIcon } from './Icons';

type SpecialFilter = 'saved' | 'editorsPick' | 'weeklyHot';

interface MobileFilterModalProps {
    onClose: () => void;
    activeRole: RoleCategory | 'All';
    onRoleChange: (role: RoleCategory | 'All') => void;
    activePurpose: PurposeCategory | 'All';
    onPurposeChange: (purpose: PurposeCategory | 'All') => void;
    specialFilter: SpecialFilter | null;
    onSpecialFilterToggle: (filter: SpecialFilter) => void;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
    onClose,
    activeRole, onRoleChange,
    activePurpose, onPurposeChange,
    specialFilter, onSpecialFilterToggle,
}) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleResetFilters = () => {
        onRoleChange('All');
        onPurposeChange('All');
        if (specialFilter) {
            onSpecialFilterToggle(specialFilter);
        }
    };
    
    const renderFilterList = <T extends string>(
        items: readonly T[], 
        activeItem: T | 'All', 
        onItemClick: (item: T | 'All') => void,
        title: string
    ) => (
        <div>
            <h3 className="px-1 mb-2 text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
            <ul className="flex flex-col space-y-1">
                 <li>
                    <button
                        onClick={() => onItemClick('All')}
                        className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors ${
                            activeItem === 'All'
                            ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-semibold'
                            : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                    >
                        <span>所有{title}</span>
                        {activeItem === 'All' && <CheckIcon className="w-5 h-5 text-cyan-500" />}
                    </button>
                </li>
                {items.map(item => (
                    <li key={item}>
                        <button
                            onClick={() => onItemClick(item)}
                            className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors ${
                                activeItem === item
                                ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-semibold'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                        >
                            <span>{item}</span>
                            {activeItem === item && <CheckIcon className="w-5 h-5 text-cyan-500" />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 w-full h-full max-h-[85vh] absolute bottom-0 rounded-t-2xl flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">篩選提示詞</h2>
                    <button onClick={onClose} className="p-2 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <XIcon className="w-6 h-6"/>
                    </button>
                </header>

                <div className="p-4 overflow-y-auto flex-grow space-y-6">
                    <div>
                        <h3 className="px-1 mb-2 text-base font-semibold text-slate-700 dark:text-slate-300">快速篩選</h3>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => onSpecialFilterToggle('saved')} className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center space-x-1.5 ${specialFilter === 'saved' ? 'bg-cyan-500 text-white font-semibold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}><BookmarkIcon className="w-4 h-4" /><span>我的收藏</span></button>
                            <button onClick={() => onSpecialFilterToggle('editorsPick')} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${specialFilter === 'editorsPick' ? 'bg-cyan-500 text-white font-semibold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>編輯精選</button>
                            <button onClick={() => onSpecialFilterToggle('weeklyHot')} className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center space-x-1.5 ${specialFilter === 'weeklyHot' ? 'bg-cyan-500 text-white font-semibold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}><RocketIcon className="w-4 h-4" /><span>本週熱門</span></button>
                        </div>
                    </div>
                    {renderFilterList(ROLE_CATEGORIES, activeRole, onRoleChange, '角色')}
                    {renderFilterList(PURPOSE_CATEGORIES, activePurpose, onPurposeChange, '用途')}
                </div>
                
                <footer className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <button onClick={handleResetFilters} className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                        重設
                    </button>
                    <button onClick={onClose} className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg">
                        完成
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default MobileFilterModal;