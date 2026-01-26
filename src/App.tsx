import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Square } from 'chess.js';
import Board, { BOARD_THEMES, BoardTheme } from './components/Board';
import PuzzleControls from './components/PuzzleControls';
import { PuzzleEngine, PuzzleState, HintInfo } from './lib/puzzleEngine';
import { getRandomPuzzle } from './lib/lichessPuzzles';
import LandingPage from './components/LandingPage';
import RatingEntry from './components/RatingEntry';

/**
 * Blitzmate - Professional Chess Puzzle Trainer
 */
const PuzzleTrainer: React.FC = () => {
  const navigate = useNavigate();
  
  // User settings
  const [userRating, setUserRating] = useState<string>(() => 
    localStorage.getItem('blitzmate_rating') || ''
  );
  
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

  // Redirect to rating page if no rating is set
  useEffect(() => {
    if (!userRating) {
      navigate('/rating');
    }
  }, [userRating, navigate]);

  // Load first puzzle on mount
  useEffect(() => {
    if (userRating && engineRef.current) {
      setTimeout(loadPuzzle, 100);
    }
  }, []); // Only run once on mount

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
  }, [handleHint, handleRetry, handleNext]);

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

  // Loading state
  if (!puzzleState || puzzleState.status === 'loading') {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white gap-4 relative">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin relative z-10" />
        <div className="text-lg text-gray-400 relative z-10">Loading puzzle...</div>
      </div>
    );
  }

  // Main puzzle trainer UI
  return (
    <div className="min-h-screen bg-[#030303] text-[#bababa] flex flex-col pb-safe relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,#ff5d2211,transparent_50%)] pointer-events-none" />
      {/* Header */}
      <header className="h-12 sm:h-14 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center px-3 sm:px-4 justify-between shadow-md flex-shrink-0 relative z-10">
        <div className="flex items-center gap-3 sm:gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-600 to-orange-400 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-tight">blitzmate</span>
          </div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-400">
            <span className="text-white font-medium px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-wide">Puzzles</span>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-5 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10">
            <span className="text-gray-500 text-[10px] sm:text-xs uppercase hidden sm:inline">Rating</span>
            <span className="text-white font-bold">{userRating}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10">
            <span className="text-gray-500 text-[10px] sm:text-xs uppercase hidden sm:inline">Streak</span>
            <span className="text-green-400 font-bold">{streak}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row justify-center items-start p-2 sm:p-4 gap-3 sm:gap-5 overflow-y-auto relative z-10">
        {/* Left sidebar - Puzzle info - Shows on desktop */}
        <aside className="w-[240px] hidden xl:flex flex-col gap-4 flex-shrink-0">
          {/* Puzzle info card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
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
                <span className="text-orange-400 font-bold text-lg">
                  {puzzleState.puzzle?.rating || '?'}
                </span>
              </div>
              {puzzleState.puzzle?.themes && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-gray-500 mb-2">Themes</div>
                  <div className="flex flex-wrap gap-1">
                    {puzzleState.puzzle.themes.slice(0, 3).map((theme, i) => (
                      <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-4 font-semibold">Session Stats</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Streak</span>
                <span className="text-green-400 font-bold text-lg">{streak}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Solved</span>
                <span className="text-white font-bold text-lg">{totalSolved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Accuracy</span>
                <span className="text-orange-400 font-bold text-lg">{accuracy}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center - Board */}
        <section className="flex flex-col items-center w-full max-w-[560px] flex-shrink-0 lg:flex-shrink">
          {/* Mobile puzzle info - Above board */}
          <div className="lg:hidden w-full mb-3 bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-600/20 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-white">
                  #{puzzleState.puzzle?.id?.slice(0, 5) || '---'}
                </span>
              </div>
              <span className="text-orange-400 font-bold text-sm flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                {puzzleState.puzzle?.rating || '?'}
              </span>
            </div>
          </div>

          <div className="w-full">
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
          <div className="relative mt-3 sm:mt-4" data-theme-selector>
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-md hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-gray-300 transition-all border border-white/10 hover:border-white/20 shadow-md"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <span className="font-medium hidden sm:inline">Board Theme</span>
              <span className="font-medium sm:hidden">Theme</span>
              <span 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-md border border-gray-600 shadow-inner" 
                style={{ backgroundColor: boardTheme.darkSquare }}
              />
            </button>
            
            {/* Theme dropdown */}
            {showThemeSelector && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-3 sm:p-4 z-20 animate-scaleIn">
                <div className="text-xs text-gray-500 mb-2 sm:mb-3 uppercase font-bold text-center tracking-wide">Select Theme</div>
                <div className="flex gap-2 sm:gap-3">
                  {BOARD_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex flex-col items-center p-2 sm:p-2.5 rounded-xl transition-all ${
                        boardTheme.id === theme.id 
                          ? 'bg-white/10 ring-2 ring-orange-500 shadow-lg' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 grid grid-cols-4 rounded-lg overflow-hidden mb-1 sm:mb-2 border border-gray-700 shadow-md">
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
                      <span className="text-[10px] sm:text-xs text-gray-300 font-medium">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right sidebar - Controls - Shows on medium screens and up */}
        <aside className="w-full lg:w-[320px] flex flex-col gap-4 flex-shrink-0">
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

      {/* Mobile controls - Hidden since controls are now always visible */}
      <div className="hidden fixed bottom-0 left-0 right-0 bg-[#262421] border-t border-[#3a3835] p-3 shadow-2xl z-50 safe-area-bottom">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`font-bold text-base ${
            puzzleState.status === 'solved' ? 'text-[#629924]' :
            puzzleState.status === 'wrong' ? 'text-[#cc3333]' : 'text-white'
          }`}>
            {puzzleState.message}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleHint}
            className="flex-1 bg-[#3a3835] active:bg-[#4a4845] text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all touch-manipulation"
          >
            Hint
          </button>
          <button
            onClick={handleRetry}
            className="flex-1 bg-[#3a3835] active:bg-[#4a4845] text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all touch-manipulation"
          >
            Retry
          </button>
          <button
            onClick={handleNext}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all touch-manipulation ${
              puzzleState.status === 'solved'
                ? 'bg-gradient-to-r from-[#629924] to-[#558821] text-white shadow-lg'
                : 'bg-[#3a3835] active:bg-[#4a4845] text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Landing Page Wrapper with Navigation
 */
const LandingPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <LandingPage onStartTraining={() => navigate('/rating')} />;
};

/**
 * Main App Component with Routing
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Home Route */}
        <Route path="/" element={<LandingPageWrapper />} />
        
        {/* Rating Entry Page */}
        <Route path="/rating" element={<RatingEntry />} />
        
        {/* Puzzle Trainer Page */}
        <Route path="/puzzles" element={<PuzzleTrainer />} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
