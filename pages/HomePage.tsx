import React, { useState, useCallback, useMemo } from 'react';
import { PROMPTS } from '../data/prompts';
import { ROLE_CATEGORIES, PURPOSE_CATEGORIES } from '../data/categories';
import type { Prompt, RoleCategory, PurposeCategory, Theme } from '../types';
import { usePrompts } from '../hooks/usePrompts';
import { useSavedPrompts } from '../hooks/useSavedPrompts';
import { useTheme } from '../hooks/useTheme';

import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import MobileFilterModal from '../components/MobileFilterModal';
import PromptGrid from '../components/PromptGrid';
import SortControls from '../components/SortControls';
import PromptDetailModal from '../components/PromptDetailModal';
import SettingsModal from '../components/SettingsModal';

type SpecialFilter = 'saved' | 'editorsPick' | 'weeklyHot';

const HomePage: React.FC = () => {
    const [allPrompts] = useState<Prompt[]>(PROMPTS);
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    const [theme, setTheme] = useTheme();
    const { savedPromptIds, toggleSave } = useSavedPrompts();

    const [activeRole, setActiveRole] = useState<RoleCategory | 'All'>('All');
    const [activePurpose, setActivePurpose] = useState<PurposeCategory | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'saves' | 'latest'>('saves');
    const [specialFilter, setSpecialFilter] = useState<SpecialFilter | null>(null);

    const filteredAndSortedPrompts = usePrompts({
        prompts: allPrompts,
        activeRole,
        activePurpose,
        searchTerm,
        sortBy,
        specialFilter,
        savedPromptIds,
    });

    const handleSpecialFilterToggle = useCallback((filter: SpecialFilter) => {
        setSpecialFilter(prev => (prev === filter ? null : filter));
    }, []);
    
    const handleSelectPrompt = useCallback((prompt: Prompt) => {
        setSelectedPrompt(prompt);
    }, []);

    const handleCloseDetailModal = useCallback(() => {
        setSelectedPrompt(null);
    }, []);

    const handleToggleSave = useCallback((promptId: number) => {
        toggleSave(promptId);
    }, [toggleSave]);

    const pageTitle = useMemo(() => {
        if (specialFilter === 'saved') return '我的收藏';
        if (specialFilter === 'editorsPick') return '編輯精選';
        if (specialFilter === 'weeklyHot') return '本週熱門';
        if (activeRole !== 'All') return activeRole;
        if (activePurpose !== 'All') return activePurpose;
        return '所有提示詞';
    }, [specialFilter, activeRole, activePurpose]);

    return (
        <>
            <Header 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onSettingsClick={() => setIsSettingsOpen(true)}
                onFilterClick={() => setIsMobileFilterOpen(true)}
            />
            <main className="container mx-auto px-4 pt-24 pb-8">
                <FilterBar
                    activeRole={activeRole}
                    onRoleChange={setActiveRole}
                    activePurpose={activePurpose}
                    onPurposeChange={setActivePurpose}
                    specialFilter={specialFilter}
                    onSpecialFilterToggle={handleSpecialFilterToggle}
                />

                <div className="flex justify-between items-center my-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {pageTitle}
                    </h2>
                    <SortControls sortBy={sortBy} onSortChange={setSortBy} />
                </div>
                
                <PromptGrid 
                    prompts={filteredAndSortedPrompts}
                    savedPromptIds={savedPromptIds}
                    onSelectPrompt={handleSelectPrompt}
                    onToggleSave={handleToggleSave}
                />
            </main>
            
            {selectedPrompt && (
                <PromptDetailModal
                    prompt={selectedPrompt}
                    onClose={handleCloseDetailModal}
                    isSaved={savedPromptIds.has(selectedPrompt.id)}
                    onToggleSave={() => handleToggleSave(selectedPrompt.id)}
                />
            )}
            
            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setIsSettingsOpen(false)}
                    currentTheme={theme}
                    onThemeChange={setTheme}
                />
            )}

            {isMobileFilterOpen && (
                <MobileFilterModal
                    onClose={() => setIsMobileFilterOpen(false)}
                    activeRole={activeRole}
                    onRoleChange={setActiveRole}
                    activePurpose={activePurpose}
                    onPurposeChange={setActivePurpose}
                    specialFilter={specialFilter}
                    onSpecialFilterToggle={handleSpecialFilterToggle}
                />
            )}
        </>
    );
};

export default HomePage;