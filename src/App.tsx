import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Square } from 'chess.js';
import Board, { BOARD_THEMES, BoardTheme } from './components/Board';
import PuzzleControls from './components/PuzzleControls';
import { PuzzleEngine, PuzzleState, HintInfo } from './lib/puzzleEngine';
import { getRandomPuzzle } from './lib/lichessPuzzles';

/**
 * Blitzmate - Professional Chess Puzzle Trainer
 */
const App: React.FC = () => {
  // User settings
  const [userRating, setUserRating] = useState<string>(() => 
    localStorage.getItem('blitzmate_rating') || ''
  );
  const [isStarted, setIsStarted] = useState(false);
  
  // Board theme
  const [boardTheme, setBoardTheme] = useState<BoardTheme>(() => {
    const savedThemeId = localStorage.getItem('blitzmate_theme');
    return BOARD_THEMES.find(t => t.id === savedThemeId) || BOARD_THEMES[0];
  });
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  // Stats
  const [streak, setStreak] = useState<number>(() => 
    parseInt(localStorage.getItem('blitzmate_streak') || '0')
  );
  const [totalSolved, setTotalSolved] = useState<number>(() => 
    parseInt(localStorage.getItem('blitzmate_solved') || '0')
  );
  const [totalPuzzles, setTotalPuzzles] = useState<number>(() => 
    parseInt(localStorage.getItem('blitzmate_total') || '0')
  );
  
  // Puzzle state
  const [puzzleState, setPuzzleState] = useState<PuzzleState | null>(null);
  const [hint, setHint] = useState<HintInfo | null>(null);
  const [prevStatus, setPrevStatus] = useState<string>('');
  
  // Engine reference
  const engineRef = useRef<PuzzleEngine | null>(null);
  
  // Accuracy calculation
  const accuracy = totalPuzzles > 0 ? Math.round((totalSolved / totalPuzzles) * 100) : 0;

  // Initialize engine
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new PuzzleEngine((state) => {
        setPuzzleState(state);
      });
    }
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('blitzmate_streak', streak.toString());
    localStorage.setItem('blitzmate_solved', totalSolved.toString());
    localStorage.setItem('blitzmate_total', totalPuzzles.toString());
  }, [streak, totalSolved, totalPuzzles]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('blitzmate_theme', boardTheme.id);
  }, [boardTheme]);

  const handleThemeChange = (theme: BoardTheme) => {
    setBoardTheme(theme);
    setShowThemeSelector(false);
  };

  // Track status changes for streak/stats
  useEffect(() => {
    if (!puzzleState) return;

    if (puzzleState.status === 'solved' && prevStatus !== 'solved') {
      setStreak((s) => s + 1);
      setTotalSolved((s) => s + 1);
      setTotalPuzzles((p) => p + 1);
    } else if (puzzleState.status === 'wrong' && prevStatus !== 'wrong') {
      setStreak(0);
    }

    setPrevStatus(puzzleState.status);
  }, [puzzleState?.status, prevStatus]);

  // Clear hint when status changes
  useEffect(() => {
    if (puzzleState?.status !== 'playing') {
      setHint(null);
    }
  }, [puzzleState?.status]);

  const loadPuzzle = useCallback(() => {
    if (!engineRef.current) return;
    const rating = parseInt(userRating) || 1500;
    const puzzle = getRandomPuzzle(rating);
    setHint(null);
    engineRef.current.loadPuzzle(puzzle);
  }, [userRating]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRating) return;
    localStorage.setItem('blitzmate_rating', userRating);
    setIsStarted(true);
    setTimeout(loadPuzzle, 100);
  };

  const handleMove = useCallback(
    (from: Square, to: Square, promotion?: string): boolean => {
      if (!engineRef.current) return false;
      return engineRef.current.makeMove(from, to, promotion);
    },
    []
  );

  const getLegalMoves = useCallback((square: Square): Square[] => {
    if (!engineRef.current) return [];
    return engineRef.current.getLegalMoves(square);
  }, []);

  const handleHint = useCallback(() => {
    if (!engineRef.current) return;
    const hintInfo = engineRef.current.getHint();
    if (hintInfo) {
      setHint(hintInfo);
      setTimeout(() => setHint(null), 3000);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (!engineRef.current) return;
    setHint(null);
    engineRef.current.retry();
  }, []);

  const handleNext = useCallback(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'h':
          handleHint();
          break;
        case 'r':
          handleRetry();
          break;
        case 'n':
          handleNext();
          break;
        case 'escape':
          setShowThemeSelector(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, handleHint, handleRetry, handleNext]);

  // Close theme selector when clicking outside
  useEffect(() => {
    if (!showThemeSelector) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-theme-selector]')) {
        setShowThemeSelector(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showThemeSelector]);

  // Welcome screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#161512] via-[#1a1816] to-[#161512] flex items-center justify-center text-white p-4">
        <div className="animate-fadeIn bg-[#262421]/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-[#3a3835] text-center">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-[#D4A024] to-[#b8891e] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[#D4A024]/20 transform hover:scale-105 transition-transform">
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
                className="w-full bg-[#161512] border-2 border-[#3a3835] rounded-xl p-4 text-2xl font-bold text-white text-center focus:outline-none focus:border-[#D4A024] transition-all placeholder:text-gray-600 hover:border-[#4a4845]"
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
              <div className="bg-[#161512]/80 border border-[#3a3835] rounded-xl p-5 animate-slideUp">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">Your Progress</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#262421] rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#629924]">{streak}</div>
                    <div className="text-xs text-gray-500 uppercase mt-1">Streak</div>
                  </div>
                  <div className="bg-[#262421] rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{totalSolved}</div>
                    <div className="text-xs text-gray-500 uppercase mt-1">Solved</div>
                  </div>
                  <div className="bg-[#262421] rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#D4A024]">{accuracy}%</div>
                    <div className="text-xs text-gray-500 uppercase mt-1">Accuracy</div>
                  </div>
                </div>
              </div>
            )}

            {/* Start button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4A024] to-[#c4941e] hover:from-[#e6b033] hover:to-[#d4a428] text-white font-bold py-4 rounded-xl transition-all text-lg uppercase tracking-wide shadow-lg shadow-[#D4A024]/20 hover:shadow-[#D4A024]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Training
            </button>
          </form>

          {/* Version badge */}
          <div className="mt-8 text-gray-600 text-xs">
            v2.0.0
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!puzzleState || puzzleState.status === 'loading') {
    return (
      <div className="min-h-screen bg-[#161512] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-16 h-16 border-4 border-[#D4A024] border-t-transparent rounded-full animate-spin" />
        <div className="text-lg text-gray-400">Loading puzzle...</div>
      </div>
    );
  }

  // Main puzzle trainer UI
  return (
    <div className="min-h-screen bg-[#161512] text-[#bababa] flex flex-col">
      {/* Header */}
      <header className="h-14 bg-[#262421] border-b border-[#3a3835] flex items-center px-4 justify-between shadow-md">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setIsStarted(false)}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4A024] to-[#b8891e] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">blitzmate</span>
          </div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-400">
            <span className="text-white font-medium px-3 py-1 bg-[#3a3835] rounded-full text-xs uppercase tracking-wide">Puzzles</span>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2 bg-[#1a1816] px-3 py-1.5 rounded-lg">
            <span className="text-gray-500 text-xs uppercase">Rating</span>
            <span className="text-white font-bold">{userRating}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1816] px-3 py-1.5 rounded-lg">
            <span className="text-gray-500 text-xs uppercase">Streak</span>
            <span className="text-[#629924] font-bold">{streak}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex justify-center items-start p-4 gap-5">
        {/* Left sidebar - Puzzle info */}
        <aside className="w-[240px] hidden lg:flex flex-col gap-4">
          {/* Puzzle info card */}
          <div className="bg-[#262421] rounded-xl p-5 border border-[#3a3835] shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#D4A024]/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#D4A024]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">
                Puzzle #{puzzleState.puzzle?.id?.slice(0, 5) || '---'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Rating</span>
                <span className="text-[#D4A024] font-bold text-lg">
                  {puzzleState.puzzle?.rating || '?'}
                </span>
              </div>
              {puzzleState.puzzle?.themes && (
                <div className="pt-2 border-t border-[#3a3835]">
                  <div className="text-xs text-gray-500 mb-2">Themes</div>
                  <div className="flex flex-wrap gap-1">
                    {puzzleState.puzzle.themes.slice(0, 3).map((theme, i) => (
                      <span key={i} className="text-xs bg-[#3a3835] text-gray-300 px-2 py-1 rounded-full">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-[#262421] rounded-xl p-5 border border-[#3a3835] shadow-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-4 font-semibold">Session Stats</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Streak</span>
                <span className="text-[#629924] font-bold text-lg">{streak}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Solved</span>
                <span className="text-white font-bold text-lg">{totalSolved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Accuracy</span>
                <span className="text-[#D4A024] font-bold text-lg">{accuracy}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center - Board */}
        <section className="flex flex-col items-center">
          <div className="animate-scaleIn">
            <Board
              fen={engineRef.current?.getFen() || 'start'}
              orientation={puzzleState.userColor}
              lastMove={puzzleState.lastMove}
              hint={hint}
              onMove={handleMove}
              getLegalMoves={getLegalMoves}
              isUserTurn={engineRef.current?.isUserTurn() || false}
              status={puzzleState.status}
              theme={boardTheme}
            />
          </div>
          
          {/* Theme selector button */}
          <div className="relative mt-4" data-theme-selector>
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="flex items-center gap-2 bg-[#262421] hover:bg-[#333] px-4 py-2.5 rounded-xl text-sm text-gray-300 transition-all border border-[#3a3835] hover:border-[#4a4845] shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <span className="font-medium">Board Theme</span>
              <span 
                className="w-5 h-5 rounded-md border border-gray-600 shadow-inner" 
                style={{ backgroundColor: boardTheme.darkSquare }}
              />
            </button>
            
            {/* Theme dropdown */}
            {showThemeSelector && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#262421] border border-[#3a3835] rounded-xl shadow-2xl p-4 z-20 animate-scaleIn">
                <div className="text-xs text-gray-500 mb-3 uppercase font-bold text-center tracking-wide">Select Theme</div>
                <div className="flex gap-3">
                  {BOARD_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex flex-col items-center p-2.5 rounded-xl transition-all ${
                        boardTheme.id === theme.id 
                          ? 'bg-[#3a3835] ring-2 ring-[#D4A024] shadow-lg' 
                          : 'hover:bg-[#333]'
                      }`}
                    >
                      <div className="w-14 h-14 grid grid-cols-4 rounded-lg overflow-hidden mb-2 border border-gray-700 shadow-md">
                        {[...Array(16)].map((_, i) => {
                          const row = Math.floor(i / 4);
                          const col = i % 4;
                          const isLight = (row + col) % 2 === 0;
                          return (
                            <div
                              key={i}
                              style={{ 
                                backgroundColor: isLight ? theme.lightSquare : theme.darkSquare 
                              }}
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs text-gray-300 font-medium">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right sidebar - Controls */}
        <aside className="w-[280px] hidden lg:flex flex-col gap-4">
          <PuzzleControls
            status={puzzleState.status}
            message={puzzleState.message}
            puzzleRating={puzzleState.puzzle?.rating || null}
            puzzleId={puzzleState.puzzle?.id || null}
            userColor={puzzleState.userColor}
            hintsUsed={puzzleState.hintsUsed}
            onHint={handleHint}
            onRetry={handleRetry}
            onNext={handleNext}
          />
        </aside>
      </main>

      {/* Mobile controls */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#262421] border-t border-[#3a3835] p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className={`font-bold text-lg ${
            puzzleState.status === 'solved' ? 'text-[#629924]' :
            puzzleState.status === 'wrong' ? 'text-[#cc3333]' : 'text-white'
          }`}>
            {puzzleState.message}
          </span>
          <span className="text-[#D4A024] text-sm font-bold flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {puzzleState.puzzle?.rating}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleHint}
            className="flex-1 bg-[#3a3835] hover:bg-[#4a4845] text-white py-3 px-4 rounded-xl text-sm font-medium transition-all active:scale-95"
          >
            Hint
          </button>
          <button
            onClick={handleRetry}
            className="flex-1 bg-[#3a3835] hover:bg-[#4a4845] text-white py-3 px-4 rounded-xl text-sm font-medium transition-all active:scale-95"
          >
            Retry
          </button>
          <button
            onClick={handleNext}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              puzzleState.status === 'solved'
                ? 'bg-gradient-to-r from-[#629924] to-[#558821] text-white shadow-lg'
                : 'bg-[#3a3835] hover:bg-[#4a4845] text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
