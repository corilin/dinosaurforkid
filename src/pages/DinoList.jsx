import React from 'react';
import { Link } from 'react-router-dom';
import { dinosaurs } from '../data/dinosaurs';
import { motion } from 'framer-motion';
import SpeakButton from '../components/SpeakButton';

const DinoList = () => {
    // Animation variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Animation variants for each item
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-4xl font-bubblegm text-dino-purple text-center mb-8 drop-shadow-sm">
                Meet Your New Friends!
            </h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {dinosaurs.map((dino) => (
                    <motion.div
                        key={dino.id}
                        variants={itemVariants}
                        className={`bg-white rounded-3xl p-6 shadow-lg border-b-8 ${dino.borderColor} relative overflow-hidden group hover:shadow-2xl transition-shadow cursor-pointer`}
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 ${dino.color} rounded-bl-full z-0 opacity-50 transition-transform group-hover:scale-150 duration-500`}></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-40 w-full flex items-center justify-center mb-4">
                                <img
                                    src={dino.image}
                                    alt={dino.name}
                                    className="max-h-full max-w-full object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                                />
                            </div>

                            {/* Name with pronunciation button */}
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-2xl font-bubblegm text-gray-800">{dino.name}</h3>
                                <SpeakButton name={dino.name} size="sm" />
                            </div>
                            <span className="text-sm font-bold text-gray-500 mb-4 bg-gray-100 px-3 py-1 rounded-full">
                                "{dino.nickname}"
                            </span>

                            <Link
                                to={`/dinos/${dino.id}`}
                                className={`px-6 py-2 ${dino.borderColor.replace('border-', 'bg-').replace('400', '200')} text-gray-800 rounded-full font-bold hover:brightness-95 transition-all shadow-sm active:shadow-none active:translate-y-1`}
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default DinoList;

