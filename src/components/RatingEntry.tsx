import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Rating Entry Page Component
 */
const RatingEntry: React.FC = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState<string>(() => 
    localStorage.getItem('blitzmate_rating') || ''
  );

  // Get existing stats
  const streak = parseInt(localStorage.getItem('blitzmate_streak') || '0');
  const totalSolved = parseInt(localStorage.getItem('blitzmate_solved') || '0');
  const totalPuzzles = parseInt(localStorage.getItem('blitzmate_total') || '0');
  const accuracy = totalPuzzles > 0 ? Math.round((totalSolved / totalPuzzles) * 100) : 0;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRating) return;
    localStorage.setItem('blitzmate_rating', userRating);
    navigate('/puzzles');
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,#ff5d2211,transparent_50%)] pointer-events-none" />
      
      <div className="animate-fadeIn bg-black/40 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-white/10 text-center relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 transform hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-white fill-current drop-shadow-md">
              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
            </svg>
          </div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            BLITZMATE
          </h1>
          <p className="text-gray-400 mt-3 font-medium text-lg">
            Master Chess Tactics
          </p>
        </div>

        {/* Rating form */}
        <form onSubmit={handleStart} className="space-y-6">
          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              Your Rating
            </label>
            <input
              type="number"
              value={userRating}
              onChange={(e) => setUserRating(e.target.value)}
              placeholder="1500"
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-4 text-2xl font-bold text-white text-center focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-600 hover:border-white/20"
              required
              min="100"
              max="3500"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Puzzles will match your skill level
            </p>
          </div>

          {/* Stats display */}
          {totalPuzzles > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 animate-slideUp backdrop-blur-md">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">Your Progress</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-2xl font-bold text-green-400">{streak}</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Streak</div>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-2xl font-bold text-white">{totalSolved}</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Solved</div>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <div className="text-2xl font-bold text-orange-400">{accuracy}%</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Accuracy</div>
                </div>
              </div>
            </div>
          )}

          {/* Start button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-full transition-all text-lg uppercase tracking-wide shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Training
          </button>
        </form>

        {/* Back to home link */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-gray-500 text-sm hover:text-white transition-colors"
        >
          ← Back to Home
        </button>

        {/* Version badge */}
        <div className="mt-8 text-gray-600 text-xs">
          v2.0.0
        </div>
      </div>
    </div>
  );
};

export default RatingEntry;
