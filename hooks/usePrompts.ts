import { useMemo } from 'react';
import type { Prompt, RoleCategory, PurposeCategory } from '../types';

type SpecialFilter = 'saved' | 'editorsPick' | 'weeklyHot';

interface UsePromptsArgs {
    prompts: Prompt[];
    activeRole: RoleCategory | 'All';
    activePurpose: PurposeCategory | 'All';
    searchTerm: string;
    sortBy: 'saves' | 'latest';
    specialFilter: SpecialFilter | null;
    savedPromptIds: Set<number>;
}

export const usePrompts = ({ prompts, activeRole, activePurpose, searchTerm, sortBy, specialFilter, savedPromptIds }: UsePromptsArgs): Prompt[] => {
    return useMemo(() => {
        let filtered = prompts;

        // Apply category filters first
        if (activeRole !== 'All') {
            filtered = filtered.filter(p => p.roleCategory === activeRole);
        }

        if (activePurpose !== 'All') {
            filtered = filtered.filter(p => p.purposeCategory === activePurpose);
        }

        // Apply special filters on top of category filters
        if (specialFilter) {
            switch (specialFilter) {
                case 'saved':
                    filtered = filtered.filter(p => savedPromptIds.has(p.id));
                    break;
                case 'editorsPick':
                    filtered = filtered.filter(p => p.isEditorsPick);
                    break;
                case 'weeklyHot':
                    filtered = filtered.filter(p => p.isWeeklyHot);
                    break;
            }
        }

        // Apply search term last
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(lowercasedTerm) ||
                p.description.toLowerCase().includes(lowercasedTerm) ||
                p.content.toLowerCase().includes(lowercasedTerm) ||
                p.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
            );
        }

        // Sort the final result
        return [...filtered].sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            // Default sort by saves
            return b.saves - a.saves;
        });
    }, [prompts, activeRole, activePurpose, searchTerm, sortBy, specialFilter, savedPromptIds]);
};