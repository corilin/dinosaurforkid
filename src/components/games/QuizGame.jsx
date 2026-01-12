import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dinosaurs } from '../../data/dinosaurs';
import { RotateCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import MusicToggle from '../MusicToggle';
import soundFx from '../../utils/soundEffects';

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        generateQuestions();
    }, []);

    const generateQuestions = () => {
        // Generate 5 questions
        const shuffledDinos = [...dinosaurs].sort(() => 0.5 - Math.random());
        const newQuestions = shuffledDinos.slice(0, 5).map((correctDino) => {
            // Get 2 wrong answers
            const wrongAnswers = dinosaurs
                .filter(d => d.id !== correctDino.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);

            // Combine and shuffle all answers
            const allAnswers = [correctDino, ...wrongAnswers].sort(() => 0.5 - Math.random());

            return {
                correctDino,
                answers: allAnswers,
            };
        });

        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setGameOver(false);
    };

    const handleAnswer = (answer) => {
        if (selectedAnswer) return; // Already answered

        setSelectedAnswer(answer);
        const correct = answer.id === questions[currentQuestion].correctDino.id;
        setIsCorrect(correct);
        if (correct) {
            soundFx.playCorrect();
            setScore(score + 1);
        } else {
            soundFx.playWrong();
        }
    };

    const handleNext = () => {
        if (currentQuestion + 1 >= questions.length) {
            setGameOver(true);
            setTimeout(() => soundFx.playVictory(), 300);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        }
    };

    if (questions.length === 0) {
        return <div className="text-center text-2xl font-bubblegm mt-20">Loading Quiz...</div>;
    }

    const current = questions[currentQuestion];

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bubblegm text-dino-purple">Dino Quiz!</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold bg-dino-yellow px-4 py-2 rounded-full">
                        Score: {score} / {questions.length}
                    </span>
                    <MusicToggle />
                    <button
                        onClick={generateQuestions}
                        className="p-3 bg-dino-teal rounded-full hover:bg-teal-300 transition-colors shadow-md"
                        title="New Game"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            {!gameOver ? (
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    {/* Question Counter */}
                    <div className="flex justify-center mb-4 space-x-2">
                        {questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-4 h-4 rounded-full transition-all ${idx < currentQuestion ? 'bg-green-400' :
                                    idx === currentQuestion ? 'bg-dino-purple w-8' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Question Image */}
                    <div className="text-center mb-8">
                        <p className="text-2xl font-bubblegm text-gray-700 mb-6">Who is this dinosaur?</p>
                        <motion.div
                            key={currentQuestion}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mx-auto w-64 h-64 bg-gray-100 rounded-3xl p-4 shadow-inner"
                        >
                            <img
                                src={current.correctDino.image}
                                alt="Mystery Dinosaur"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* Answer Buttons */}
                    <div className="space-y-4">
                        {current.answers.map((answer, idx) => {
                            const isSelected = selectedAnswer?.id === answer.id;
                            const isCorrectAnswer = answer.id === current.correctDino.id;
                            let bgColor = 'bg-gray-100 hover:bg-dino-pink hover:text-white';
                            let borderColor = 'border-transparent';

                            if (selectedAnswer) {
                                if (isCorrectAnswer) {
                                    bgColor = 'bg-green-100';
                                    borderColor = 'border-green-500';
                                } else if (isSelected && !isCorrect) {
                                    bgColor = 'bg-red-100';
                                    borderColor = 'border-red-500';
                                }
                            }

                            return (
                                <motion.button
                                    key={answer.id}
                                    whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                                    whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                                    onClick={() => handleAnswer(answer)}
                                    disabled={selectedAnswer !== null}
                                    className={`
                    w-full py-4 px-6 rounded-2xl text-xl font-bold text-left transition-all duration-200 border-4
                    ${bgColor} ${borderColor}
                    ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}
                  `}
                                >
                                    <span className="flex items-center justify-between">
                                        {answer.name}
                                        {selectedAnswer && isCorrectAnswer && <CheckCircle className="text-green-600" />}
                                        {selectedAnswer && isSelected && !isCorrect && <XCircle className="text-red-600" />}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <AnimatePresence>
                        {selectedAnswer && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 text-center"
                            >
                                <p className={`text-2xl font-bubblegm mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? '🎉 Correct! Great job!' : `😮 Oops! That was ${current.correctDino.name}.`}
                                </p>
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-dino-purple text-white rounded-full font-bold text-xl hover:bg-purple-400 transition-colors shadow-lg inline-flex items-center"
                                >
                                    {currentQuestion + 1 >= questions.length ? 'See Results' : 'Next Question'}
                                    <ArrowRight className="ml-2" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                /* Game Over Screen */
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-10 text-center shadow-2xl"
                >
                    <h2 className="text-5xl font-bubblegm text-dino-purple mb-4">
                        {score === questions.length ? '🏆 Perfect Score! 🏆' : score >= questions.length / 2 ? '⭐ Great Job! ⭐' : '🦕 Keep Trying!'}
                    </h2>
                    <p className="text-3xl text-gray-700 mb-8 font-fredoka">
                        You got <span className="text-dino-purple font-bold">{score}</span> out of <span className="text-dino-purple font-bold">{questions.length}</span> correct!
                    </p>
                    <button
                        onClick={generateQuestions}
                        className="px-8 py-4 bg-dino-teal text-teal-900 rounded-full font-bold text-xl hover:bg-teal-300 transition-colors shadow-lg"
                    >
                        Play Again!
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default QuizGame;
