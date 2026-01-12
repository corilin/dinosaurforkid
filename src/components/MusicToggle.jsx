import React, { useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import bgMusic from '../utils/backgroundMusic';

/**
 * A button to toggle background music on/off during games.
 */
const MusicToggle = ({ autoPlay = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Start music automatically if autoPlay is true
    useEffect(() => {
        if (autoPlay) {
            // Small delay to handle browser autoplay policies
            const timer = setTimeout(() => {
                bgMusic.play();
                setIsPlaying(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [autoPlay]);

    // Cleanup when component unmounts
    useEffect(() => {
        return () => {
            bgMusic.pause();
        };
    }, []);

    const handleToggle = () => {
        const nowPlaying = bgMusic.toggle();
        setIsPlaying(nowPlaying);
    };

    return (
        <button
            onClick={handleToggle}
            className={`
        p-3 rounded-full transition-all shadow-md
        ${isPlaying
                    ? 'bg-dino-pink hover:bg-pink-400 text-white animate-pulse'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }
      `}
            title={isPlaying ? 'Turn off music' : 'Turn on music'}
            aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        >
            {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
        </button>
    );
};

export default MusicToggle;
