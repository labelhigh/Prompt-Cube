import React from 'react';
import HomePage from './pages/HomePage';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
    // The useTheme hook manages the theme state and applies it to the document.
    useTheme();

    return (
        <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans">
            <HomePage />
        </div>
    );
};

export default App;
