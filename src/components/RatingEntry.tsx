import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RatingEntry: React.FC = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState<string>(() =>
    localStorage.getItem('blitzmate_rating') || ''
  );

  const streak      = parseInt(localStorage.getItem('blitzmate_streak')  || '0');
  const totalSolved = parseInt(localStorage.getItem('blitzmate_solved')  || '0');
  const totalPuzzles= parseInt(localStorage.getItem('blitzmate_total')   || '0');
  const accuracy    = totalPuzzles > 0 ? Math.round((totalSolved / totalPuzzles) * 100) : 0;
  const isReturning = totalPuzzles > 0;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRating) return;
    localStorage.setItem('blitzmate_rating', userRating);
    navigate('/puzzles');
  };

  const presets = [800, 1000, 1200, 1500, 1800, 2000, 2200];

  return (
    <div className="min-h-screen bg-[#1a1814] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-9 h-9 bg-[#c9a96e] rounded flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1a1814]">
              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Blitzmate</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            {isReturning ? 'Welcome back' : 'Set your rating'}
          </h1>
          <p className="text-sm text-[#a0998e]">
            {isReturning
              ? 'Continue training where you left off.'
              : 'Puzzles will be matched to your current skill level.'}
          </p>
        </div>

        <form onSubmit={handleStart} className="space-y-5">

          {/* Rating input */}
          <div>
            <label className="block text-xs font-semibold text-[#a0998e] uppercase tracking-wider mb-2">
              Your Elo Rating
            </label>
            <input
              id="rating-input"
              type="number"
              value={userRating}
              onChange={(e) => setUserRating(e.target.value)}
              placeholder="e.g. 1500"
              required
              min="100"
              max="3500"
              className="w-full bg-[#252220] border border-[#3a3530] rounded-lg px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-[#c9a96e] transition-colors placeholder:text-[#4a4540]"
            />
          </div>

          {/* Quick presets */}
          <div>
            <p className="text-xs text-[#5a5550] uppercase tracking-wider mb-2">Quick select</p>
            <div className="grid grid-cols-4 gap-2">
              {presets.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setUserRating(String(p))}
                  className={`py-2 text-xs font-bold rounded transition-colors ${
                    userRating === String(p)
                      ? 'bg-[#c9a96e] text-[#1a1814]'
                      : 'bg-[#252220] text-[#a0998e] hover:bg-[#2e2b27] hover:text-white border border-[#3a3530]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Returning user stats */}
          {isReturning && (
            <div className="bg-[#252220] rounded-lg p-4 border border-[#3a3530]">
              <p className="text-xs font-semibold text-[#a0998e] uppercase tracking-wider mb-3">Your Progress</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-[#c9a96e]">{streak}</p>
                  <p className="text-xs text-[#5a5550]">Streak</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{totalSolved}</p>
                  <p className="text-xs text-[#5a5550]">Solved</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#8fb87a]">{accuracy}%</p>
                  <p className="text-xs text-[#5a5550]">Accuracy</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="start-training-btn"
            className="w-full bg-[#c9a96e] hover:bg-[#d4b87e] text-[#1a1814] font-bold py-3.5 rounded-lg text-sm transition-colors"
          >
            {isReturning ? 'Continue Training' : 'Start Training'}
          </button>
        </form>

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-xs text-[#5a5550] hover:text-[#a0998e] transition-colors py-2"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
};

export default RatingEntry;
