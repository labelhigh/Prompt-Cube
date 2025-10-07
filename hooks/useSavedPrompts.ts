import { useState, useCallback } from 'react';

export const useSavedPrompts = (initialSavedIds: number[] = []) => {
    const [savedPromptIds, setSavedPromptIds] = useState<Set<number>>(new Set(initialSavedIds));

    const toggleSave = useCallback((promptId: number) => {
        setSavedPromptIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(promptId)) {
                newSet.delete(promptId);
            } else {
                newSet.add(promptId);
            }
            return newSet;
        });
    }, []);

    return { savedPromptIds, toggleSave };
};
