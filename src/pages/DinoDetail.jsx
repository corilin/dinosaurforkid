import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dinosaurs } from '../data/dinosaurs';
import { ArrowLeft, Volume2, VolumeX, BookOpen } from 'lucide-react';
import SpeakButton from '../components/SpeakButton';
import { readDinoPage, stopSpeaking, isSpeaking } from '../utils/speech';

const DinoDetail = () => {
    const { id } = useParams();
    const dino = dinosaurs.find(d => d.id === id);
    const [isReading, setIsReading] = useState(false);

    // Stop reading when leaving the page
    useEffect(() => {
        return () => stopSpeaking();
    }, []);

    // Check speaking status periodically
    useEffect(() => {
        if (isReading) {
            const interval = setInterval(() => {
                if (!isSpeaking()) {
                    setIsReading(false);
                }
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isReading]);

    const handleReadAloud = () => {
        if (isReading) {
            stopSpeaking();
            setIsReading(false);
        } else {
            readDinoPage(dino);
            setIsReading(true);
        }
    };

    if (!dino) return <div className="text-center text-4xl font-bubblegm mt-20">Dino not found! 🦕</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 pt-8">
            <Link to="/dinos" className="inline-flex items-center text-dino-purple font-bold mb-6 hover:underline">
                <ArrowLeft className="mr-2" /> Back to List
            </Link>

            <div className={`bg-white rounded-[2rem] p-8 shadow-2xl border-4 ${dino.borderColor} relative overflow-hidden`}>
                {/* Background Decoration */}
                <div className={`absolute -top-20 -right-20 w-80 h-80 ${dino.color} rounded-full opacity-50`}></div>
                <div className={`absolute -bottom-20 -left-20 w-60 h-60 ${dino.color} rounded-full opacity-50`}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <img src={dino.image} alt={dino.name} className="w-full h-auto animate-bounce-slow" />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-10">
                        {/* Name with pronunciation button */}
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-5xl font-bubblegm text-gray-800">{dino.name}</h1>
                            <SpeakButton name={dino.name} size="lg" />
                        </div>

                        {/* Read Aloud Button */}
                        <button
                            onClick={handleReadAloud}
                            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full font-bold transition-all
                                ${isReading
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-dino-teal text-teal-800 hover:bg-teal-300'
                                }
                            `}
                        >
                            {isReading ? (
                                <>
                                    <VolumeX size={20} />
                                    Stop Reading
                                </>
                            ) : (
                                <>
                                    <BookOpen size={20} />
                                    Read Aloud 📖
                                </>
                            )}
                        </button>

                        <div className="space-y-4">
                            <div className="bg-orange-50 p-4 rounded-2xl border-l-4 border-orange-400">
                                <span className="block text-xs uppercase tracking-wide text-gray-500 font-bold">Nickname</span>
                                <span className="text-2xl font-bubblegm text-orange-600">{dino.nickname}</span>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400">
                                <span className="block text-xs uppercase tracking-wide text-gray-500 font-bold">Lived In</span>
                                <span className="text-xl font-bold text-blue-600">{dino.period}</span>
                            </div>

                            <div className="bg-green-50 p-4 rounded-2xl border-l-4 border-green-400">
                                <span className="block text-xs uppercase tracking-wide text-gray-500 font-bold">Diet</span>
                                <span className="text-xl font-bold text-green-600">{dino.diet}</span>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-2xl border-l-4 border-yellow-400 shadow-sm">
                                <span className="block text-xs uppercase tracking-wide text-gray-500 font-bold">Fun Fact</span>
                                <p className="text-lg text-gray-700 italic">"{dino.funFact}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DinoDetail;

