import React from 'react';
import { Link } from 'react-router-dom';
import heroBanner from '../assets/hero_banner.png';
import dinoTrex from '../assets/dino_trex.png';

const Home = () => {
    return (
        <main className="max-w-6xl mx-auto p-4 flex flex-col items-center animate-fade-in">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white mt-8 group h-[400px]">
                <img src={heroBanner} alt="Dinosaur Landscape" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <h2 className="text-6xl text-white font-bubblegm drop-shadow-lg text-center animate-bounce-slow">
                        Welcome to <br /> <span className="text-dino-yellow">Dino World!</span>
                    </h2>
                </div>
            </div>

            <div className="mt-12 flex items-center bg-white rounded-3xl p-8 shadow-xl border-b-8 border-dino-purple max-w-4xl w-full relative transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-1/3">
                    <img src={dinoTrex} alt="T-Rex" className="w-full h-auto hover:animate-shake cursor-pointer" />
                </div>
                <div className="w-2/3 pl-8">
                    <h3 className="text-4xl font-bubblegm text-dino-purple mb-4">Meet Rex!</h3>
                    <p className="text-xl text-gray-600 mb-6 font-fredoka">
                        "Hi! I'm the King of Dinosaurs. I have big teeth but I am very friendly! Roar!"
                    </p>
                    <Link to="/dinos" className="inline-block px-8 py-3 bg-dino-teal text-teal-900 rounded-full font-bold text-xl hover:bg-teal-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none">
                        Meet All Dinos
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;
