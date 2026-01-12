import React from 'react';
import { Link } from 'react-router-dom';
import { Puzzle, HelpCircle } from 'lucide-react';

const Games = () => {
    const games = [
        {
            id: 'matching',
            name: 'Dino Match!',
            description: 'Match the dinosaur picture with its name!',
            icon: <Puzzle size={60} />,
            color: 'bg-dino-pink',
            hoverColor: 'hover:bg-pink-400',
            borderColor: 'border-pink-400',
        },
        {
            id: 'quiz',
            name: 'Dino Quiz!',
            description: 'Can you guess the dinosaur?',
            icon: <HelpCircle size={60} />,
            color: 'bg-dino-purple',
            hoverColor: 'hover:bg-purple-400',
            borderColor: 'border-purple-400',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 text-center">
            <h2 className="text-5xl font-bubblegm text-dino-purple mb-4 drop-shadow-sm">Let's Play! 🎮</h2>
            <p className="text-xl text-gray-600 mb-12 font-fredoka">
                Choose a game and learn dinosaur names!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {games.map((game) => (
                    <Link
                        key={game.id}
                        to={`/games/${game.id}`}
                        className={`block bg-white rounded-3xl p-8 shadow-xl border-b-8 ${game.borderColor} transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}
                    >
                        <div className={`w-24 h-24 ${game.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                            {game.icon}
                        </div>
                        <h3 className="text-3xl font-bubblegm text-gray-800 mb-2">{game.name}</h3>
                        <p className="text-lg text-gray-500 font-fredoka">{game.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Games;
