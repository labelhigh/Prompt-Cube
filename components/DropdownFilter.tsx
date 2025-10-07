import React from 'react';
import { ChevronDownIcon } from './Icons';

interface DropdownFilterProps<T extends string> {
    options: readonly T[];
    activeOption: T | 'All';
    onOptionChange: (option: T | 'All') => void;
    title: string;
    allOptionLabel: string;
}

// Custom hook to detect clicks outside of a component
const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export const DropdownFilter = <T extends string>({ options, activeOption, onOptionChange, title, allOptionLabel }: DropdownFilterProps<T>) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleSelect = (option: T | 'All') => {
        onOptionChange(option);
        setIsOpen(false);
    };

    const displayLabel = activeOption === 'All' ? allOptionLabel : activeOption;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-48 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
                <span className="truncate"><span className="text-slate-500 dark:text-slate-400">{title}: </span>{displayLabel}</span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
                    <ul className="max-h-60 overflow-y-auto">
                        <li key="All">
                            <button
                                onClick={() => handleSelect('All')}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeOption === 'All' ? 'bg-cyan-500 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                                {allOptionLabel}
                            </button>
                        </li>
                        {options.map(option => (
                            <li key={option}>
                                <button
                                    onClick={() => handleSelect(option)}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeOption === option ? 'bg-cyan-500 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
