import React from 'react';
import { Volume2 } from 'lucide-react';
import { pronounceName } from '../utils/speech';

/**
 * A button that pronounces a dinosaur name when clicked.
 */
const SpeakButton = ({ name, size = 'md', className = '' }) => {
    const handleClick = (e) => {
        e.stopPropagation(); // Prevent triggering parent click events
        e.preventDefault();
        pronounceName(name);
    };

    const sizeClasses = {
        sm: 'w-6 h-6 p-1',
        md: 'w-8 h-8 p-1.5',
        lg: 'w-10 h-10 p-2',
    };

    const iconSizes = {
        sm: 14,
        md: 18,
        lg: 22,
    };

    return (
        <button
            onClick={handleClick}
            className={`
        inline-flex items-center justify-center
        bg-dino-yellow hover:bg-yellow-300 
        rounded-full transition-all duration-200
        shadow-sm hover:shadow-md
        active:scale-90
        ${sizeClasses[size]}
        ${className}
      `}
            title={`Listen to "${name}"`}
            aria-label={`Pronounce ${name}`}
        >
            <Volume2 size={iconSizes[size]} className="text-amber-700" />
        </button>
    );
};

export default SpeakButton;
