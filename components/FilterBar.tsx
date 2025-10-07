import React from 'react';
import type { RoleCategory, PurposeCategory } from '../types';
import { ROLE_CATEGORIES, PURPOSE_CATEGORIES } from '../data/categories';
import { BookmarkIcon, RocketIcon } from './Icons';
import { DropdownFilter } from './DropdownFilter';

type SpecialFilter = 'saved' | 'editorsPick' | 'weeklyHot';

interface FilterBarProps {
    activeRole: RoleCategory | 'All';
    onRoleChange: (role: RoleCategory | 'All') => void;
    activePurpose: PurposeCategory | 'All';
    onPurposeChange: (purpose: PurposeCategory | 'All') => void;
    specialFilter: SpecialFilter | null;
    onSpecialFilterToggle: (filter: SpecialFilter) => void;
}

const FilterButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center space-x-2 ${
                isActive
                ? 'bg-cyan-500 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
        >
            {children}
        </button>
    );
};


const FilterBar: React.FC<FilterBarProps> = ({
    activeRole, onRoleChange,
    activePurpose, onPurposeChange,
    specialFilter, onSpecialFilterToggle,
}) => {
    return (
        <div className="hidden md:flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-2">
                <DropdownFilter
                    title="角色"
                    allOptionLabel="所有角色"
                    options={ROLE_CATEGORIES}
                    activeOption={activeRole}
                    onOptionChange={onRoleChange}
                />
                <DropdownFilter
                    title="用途"
                    allOptionLabel="所有用途"
                    options={PURPOSE_CATEGORIES}
                    activeOption={activePurpose}
                    onOptionChange={onPurposeChange}
                />
            </div>
            <div className="flex items-center space-x-2">
                <FilterButton isActive={specialFilter === 'saved'} onClick={() => onSpecialFilterToggle('saved')}>
                    <BookmarkIcon className="w-4 h-4" />
                    <span>我的收藏</span>
                </FilterButton>
                <FilterButton isActive={specialFilter === 'editorsPick'} onClick={() => onSpecialFilterToggle('editorsPick')}>
                    <span>編輯精選</span>
                </FilterButton>
                 <FilterButton isActive={specialFilter === 'weeklyHot'} onClick={() => onSpecialFilterToggle('weeklyHot')}>
                    <RocketIcon className="w-4 h-4" />
                    <span>本週熱門</span>
                </FilterButton>
            </div>
        </div>
    );
};

export default FilterBar;