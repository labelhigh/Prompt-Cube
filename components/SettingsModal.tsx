import React, { useEffect } from 'react';
import type { Theme } from '../types';
import { XIcon } from './Icons';

interface SettingsModalProps {
    onClose: () => void;
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const ThemeOption: React.FC<{
    label: string;
    theme: Theme;
    currentTheme: Theme;
    onSelect: () => void;
    children: React.ReactNode;
}> = ({ label, theme, currentTheme, onSelect, children }) => {
    const isActive = theme === currentTheme;
    return (
        <div>
            <button
                onClick={onSelect}
                className={`w-full h-24 rounded-lg border-2 transition-colors ${
                    isActive ? 'border-cyan-500' : 'border-slate-300 dark:border-slate-600 hover:border-cyan-400'
                }`}
                aria-label={`選擇${label}主題`}
            >
                {children}
            </button>
            <p className={`text-center text-sm mt-2 font-medium ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {label}
            </p>
        </div>
    );
};

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, currentTheme, onThemeChange }) => {

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-lg rounded-2xl flex flex-col shadow-2xl shadow-black/20 dark:shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">設定</h2>
                    <button onClick={onClose} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                        <XIcon className="w-6 h-6"/>
                    </button>
                </header>

                <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">外觀</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <ThemeOption theme="light" currentTheme={currentTheme} onSelect={() => onThemeChange('light')} label="明亮">
                            <div className="w-full h-full p-2 flex items-center justify-center">
                                <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-md flex items-center p-2 space-x-1">
                                    <div className="w-4 h-8 bg-slate-200 rounded-sm"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-2 bg-slate-300 rounded-sm"></div>
                                        <div className="h-2 w-3/4 bg-slate-200 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </ThemeOption>
                        <ThemeOption theme="dark" currentTheme={currentTheme} onSelect={() => onThemeChange('dark')} label="黑暗">
                             <div className="w-full h-full p-2 flex items-center justify-center bg-slate-900 rounded-md">
                                <div className="w-full h-full bg-slate-800 border border-slate-700 rounded-md flex items-center p-2 space-x-1">
                                    <div className="w-4 h-8 bg-slate-700 rounded-sm"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-2 bg-slate-600 rounded-sm"></div>
                                        <div className="h-2 w-3/4 bg-slate-700 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </ThemeOption>
                        <ThemeOption theme="system" currentTheme={currentTheme} onSelect={() => onThemeChange('system')} label="跟隨系統">
                             <div className="w-full h-full p-2 flex items-center justify-center">
                                <div className="w-full h-full rounded-md flex items-center p-2 space-x-1 relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50 border-r border-slate-200"></div>
                                     <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800"></div>
                                     <div className="relative w-full h-full border border-slate-300 dark:border-slate-600 rounded-md flex items-center p-2 space-x-1 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                                         <div className="w-4 h-8 bg-slate-300 dark:bg-slate-700 rounded-sm"></div>
                                         <div className="flex-1 space-y-1">
                                             <div className="h-2 bg-slate-400 dark:bg-slate-600 rounded-sm"></div>
                                             <div className="h-2 w-3/4 bg-slate-300 dark:bg-slate-700 rounded-sm"></div>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </ThemeOption>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
