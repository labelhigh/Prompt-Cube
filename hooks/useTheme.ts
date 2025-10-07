import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = localStorage.getItem('theme') as Theme | null;
            if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
                return storedTheme;
            }
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, setTheme] as const;
};
