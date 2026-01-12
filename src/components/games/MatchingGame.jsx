import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dinosaurs } from '../../data/dinosaurs';
import { Shuffle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import MusicToggle from '../MusicToggle';
import SpeakButton from '../SpeakButton';
import soundFx from '../../utils/soundEffects';

const MatchingGame = () => {
    const [dinoPool, setDinoPool] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [matched, setMatched] = useState([]); // array of matched dino ids
    const [wrongPair, setWrongPair] = useState(null);
    const [score, setScore] = useState(0);
    const [shuffledNames, setShuffledNames] = useState([]);

    // Initialize game
    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        // Pick 6 random dinosaurs
        const shuffledDinos = [...dinosaurs].sort(() => 0.5 - Math.random()).slice(0, 6);
        setDinoPool(shuffledDinos);
        setShuffledNames([...shuffledDinos].sort(() => 0.5 - Math.random()));
        setMatched([]);
        setScore(0);
        setSelectedImage(null);
        setSelectedName(null);
        setWrongPair(null);
    };

    const handleImageClick = (dino) => {
        if (matched.includes(dino.id) || wrongPair) return;
        setSelectedImage(dino);
        if (selectedName) {
            checkMatch(dino, selectedName);
        }
    };

    const handleNameClick = (dino) => {
        if (matched.includes(dino.id) || wrongPair) return;
        setSelectedName(dino);
        if (selectedImage) {
            checkMatch(selectedImage, dino);
        }
    };

    const checkMatch = (imageDino, nameDino) => {
        if (imageDino.id === nameDino.id) {
            // Correct match!
            soundFx.playCorrect();
            const newMatched = [...matched, imageDino.id];
            setMatched(newMatched);
            setScore(score + 1);
            setSelectedImage(null);
            setSelectedName(null);

            // Check if game is complete
            if (newMatched.length === dinoPool.length) {
                setTimeout(() => soundFx.playVictory(), 300);
            }
        } else {
            // Wrong match!
            soundFx.playWrong();
            setWrongPair({ image: imageDino.id, name: nameDino.id });
            setTimeout(() => {
                setWrongPair(null);
                setSelectedImage(null);
                setSelectedName(null);
            }, 800);
        }
    };

    const isGameComplete = matched.length === dinoPool.length && dinoPool.length > 0;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bubblegm text-dino-purple">Dino Match!</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold bg-dino-yellow px-4 py-2 rounded-full">
                        Score: {score} / {dinoPool.length}
                    </span>
                    <MusicToggle />
                    <button
                        onClick={startNewGame}
                        className="p-3 bg-dino-teal rounded-full hover:bg-teal-300 transition-colors shadow-md"
                        title="New Game"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <p className="text-center text-lg text-gray-600 mb-8 font-fredoka">
                Click on a dinosaur picture, then click on its name! 🦕
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Images Column */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                    <h3 className="text-xl font-bubblegm text-center mb-4 text-pink-500">Pictures</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {dinoPool.map((dino) => {
                            const isMatched = matched.includes(dino.id);
                            const isSelected = selectedImage?.id === dino.id;
                            const isWrong = wrongPair?.image === dino.id;

                            return (
                                <motion.div
                                    key={`img-${dino.id}`}
                                    whileHover={!isMatched ? { scale: 1.05 } : {}}
                                    whileTap={!isMatched ? { scale: 0.95 } : {}}
                                    onClick={() => handleImageClick(dino)}
                                    className={`
                    relative aspect-square rounded-2xl p-2 cursor-pointer transition-all duration-200 border-4
                    ${isMatched ? 'bg-green-100 border-green-400 opacity-60' :
                                            isSelected ? 'bg-dino-purple border-dino-purple ring-4 ring-purple-300' :
                                                isWrong ? 'bg-red-100 border-red-400 animate-shake' :
                                                    'bg-gray-100 border-transparent hover:border-dino-pink'}
                  `}
                                >
                                    <img src={dino.image} alt={dino.name} className="w-full h-full object-contain" />
                                    {isMatched && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-green-400/30 rounded-2xl">
                                            <CheckCircle className="text-green-600" size={40} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Names Column */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                    <h3 className="text-xl font-bubblegm text-center mb-4 text-blue-500">Names</h3>
                    <div className="flex flex-col space-y-3">
                        {shuffledNames.map((dino) => {
                            const isMatched = matched.includes(dino.id);
                            const isSelected = selectedName?.id === dino.id;
                            const isWrong = wrongPair?.name === dino.id;

                            return (
                                <div key={`name-${dino.id}`} className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={!isMatched ? { scale: 1.02, x: 5 } : {}}
                                        whileTap={!isMatched ? { scale: 0.98 } : {}}
                                        onClick={() => handleNameClick(dino)}
                                        disabled={isMatched}
                                        className={`
                                            flex-1 py-3 px-6 rounded-full text-lg font-bold text-left transition-all duration-200 border-4
                                            ${isMatched ? 'bg-green-100 border-green-400 text-green-700 opacity-60 cursor-not-allowed' :
                                                isSelected ? 'bg-dino-purple border-dino-purple text-white ring-4 ring-purple-300' :
                                                    isWrong ? 'bg-red-100 border-red-400 text-red-700 animate-shake' :
                                                        'bg-gray-100 border-transparent hover:bg-dino-pink hover:text-white'}
                                        `}
                                    >
                                        {dino.name}
                                    </motion.button>
                                    <SpeakButton name={dino.name} size="sm" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Game Complete Overlay */}
            <AnimatePresence>
                {isGameComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <div className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-md">
                            <h2 className="text-5xl font-bubblegm text-dino-purple mb-4">🎉 You Did It! 🎉</h2>
                            <p className="text-2xl text-gray-700 mb-8 font-fredoka">
                                You matched all {dinoPool.length} dinosaurs!
                            </p>
                            <button
                                onClick={startNewGame}
                                className="px-8 py-4 bg-dino-teal text-teal-900 rounded-full font-bold text-xl hover:bg-teal-300 transition-colors shadow-lg"
                            >
                                Play Again!
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MatchingGame;
