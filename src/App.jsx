import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DinoList from './pages/DinoList';
import DinoDetail from './pages/DinoDetail';
import Games from './pages/Games';
import MatchingGame from './components/games/MatchingGame';
import QuizGame from './components/games/QuizGame';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dino-green/20 relative overflow-hidden font-fredoka pb-20">
        {/* Navigation */}
        <nav className="p-4 flex justify-between items-center max-w-6xl mx-auto sticky top-0 z-50 bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-sm mb-4">
          <Link to="/" className="text-3xl font-bubblegm text-dino-purple drop-shadow-md hover:scale-105 transition-transform">
            Dino-Mite!
          </Link>
          <div className="space-x-4">
            <Link to="/dinos" className="px-6 py-2 bg-dino-pink text-white rounded-full font-bold hover:bg-pink-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none inline-block">
              Meet Dinos
            </Link>
            <Link to="/games" className="px-6 py-2 bg-dino-purple text-white rounded-full font-bold hover:bg-purple-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none inline-block">
              Play Games
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dinos" element={<DinoList />} />
          <Route path="/dinos/:id" element={<DinoDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/matching" element={<MatchingGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
