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
      <div className="min-h-screen bg-[#1a1814] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#7a7068]">Loading puzzle…</p>
      </div>
    );
  }

  // Main puzzle trainer UI
  return (
    <div className="min-h-screen bg-[#1a1814] text-[#d0c8be] flex flex-col pb-safe">

      {/* ── Header ── */}
      <header className="h-12 bg-[#141210] border-b border-[#2e2b27] flex items-center px-4 justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-[#c9a96e] rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1a1814]">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
              </svg>
            </div>
            <span className="text-white font-bold text-base tracking-tight group-hover:text-[#c9a96e] transition-colors">Blitzmate</span>
          </button>
          <span className="hidden sm:block text-xs text-[#5a5550] font-medium px-2 py-0.5 bg-[#252220] rounded border border-[#3a3530]">
            Puzzles
          </span>
        </div>

        {/* Stat chips */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-[#252220] border border-[#3a3530] rounded px-2.5 py-1">
            <span className="text-[10px] text-[#7a7068] uppercase font-semibold hidden sm:inline">Rating</span>
            <span className="text-sm font-bold text-white">{userRating}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#252220] border border-[#3a3530] rounded px-2.5 py-1">
            <span className="text-[10px] text-[#7a7068] uppercase font-semibold hidden sm:inline">Streak</span>
            <span className="text-sm font-bold text-[#c9a96e]">{streak}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#252220] border border-[#3a3530] rounded px-2.5 py-1">
            <span className="text-[10px] text-[#7a7068] uppercase font-semibold">Accuracy</span>
            <span className="text-sm font-bold text-[#8fb87a]">{accuracy}%</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#252220] border border-[#3a3530] rounded px-2.5 py-1">
            <span className="text-[10px] text-[#7a7068] uppercase font-semibold">Solved</span>
            <span className="text-sm font-bold text-white">{totalSolved}</span>
          </div>
        </div>
      </header>

      {/* ── Main layout ── */}
      <main className="flex-1 flex flex-col lg:flex-row justify-center items-start p-3 sm:p-5 gap-4 overflow-y-auto">

        {/* Left sidebar — desktop only */}
        <aside className="hidden xl:flex flex-col gap-3 w-52 flex-shrink-0">
          {/* Puzzle info */}
          <div className="bg-[#252220] rounded-lg border border-[#3a3530] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#3a3530] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#7a7068] uppercase tracking-wide">Puzzle</span>
              {puzzleState.puzzle?.id && (
                <span className="text-xs font-mono text-[#a0998e]">#{puzzleState.puzzle.id.slice(0, 5)}</span>
              )}
            </div>
            <div className="divide-y divide-[#3a3530]">
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-xs text-[#7a7068]">Rating</span>
                <span className="text-sm font-bold text-[#c9a96e]">{puzzleState.puzzle?.rating || '—'}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-xs text-[#7a7068]">Playing as</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${puzzleState.userColor === 'white' ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}`} />
                  <span className="text-xs text-[#a0998e] capitalize">{puzzleState.userColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session stats */}
          <div className="bg-[#252220] rounded-lg border border-[#3a3530] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#3a3530]">
              <span className="text-xs font-semibold text-[#7a7068] uppercase tracking-wide">Session</span>
            </div>
            <div className="divide-y divide-[#3a3530]">
              {[
                { label: 'Streak',   value: streak,        color: 'text-[#c9a96e]' },
                { label: 'Solved',   value: totalSolved,   color: 'text-white' },
                { label: 'Accuracy', value: `${accuracy}%`, color: 'text-[#8fb87a]' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center px-4 py-2.5">
                  <span className="text-xs text-[#7a7068]">{s.label}</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Themes */}
          {puzzleState.puzzle?.themes && puzzleState.puzzle.themes.length > 0 && (
            <div className="bg-[#252220] rounded-lg border border-[#3a3530] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#3a3530]">
                <span className="text-xs font-semibold text-[#7a7068] uppercase tracking-wide">Themes</span>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-1.5">
                {puzzleState.puzzle.themes.slice(0, 4).map((theme, i) => (
                  <span key={i} className="text-[10px] bg-[#1a1814] text-[#a0998e] px-2 py-1 rounded border border-[#3a3530]">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Center — Board */}
        <section className="flex flex-col items-center w-full max-w-[560px] flex-shrink-0 lg:flex-shrink">
          {/* Mobile mini-info strip */}
          <div className="xl:hidden w-full mb-3 flex items-center justify-between bg-[#252220] rounded-lg border border-[#3a3530] px-4 py-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${puzzleState.userColor === 'white' ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}`} />
              <span className="text-xs text-[#a0998e] capitalize">{puzzleState.userColor}</span>
            </div>
            <span className="text-xs font-mono text-[#7a7068]">#{puzzleState.puzzle?.id?.slice(0, 5) || '---'}</span>
            <span className="text-sm font-bold text-[#c9a96e]">{puzzleState.puzzle?.rating || '?'}</span>
          </div>

          {/* The Board */}
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

          {/* Theme selector */}
          <div className="relative mt-3" data-theme-selector>
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="flex items-center gap-2 bg-[#252220] hover:bg-[#2e2b27] border border-[#3a3530] px-3 py-2 rounded-lg text-xs text-[#a0998e] transition-colors"
            >
              <span
                className="w-4 h-4 rounded border border-[#5a5550]"
                style={{ backgroundColor: boardTheme.darkSquare }}
              />
              Board Theme
            </button>

            {showThemeSelector && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#141210] border border-[#3a3530] rounded-xl shadow-2xl p-4 z-20">
                <p className="text-xs text-[#7a7068] mb-3 text-center uppercase tracking-wide">Select Theme</p>
                <div className="flex gap-3">
                  {BOARD_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                        boardTheme.id === theme.id ? 'bg-[#252220] ring-1 ring-[#c9a96e]' : 'hover:bg-[#1e1c19]'
                      }`}
                    >
                      <div className="w-12 h-12 grid grid-cols-4 rounded overflow-hidden border border-[#3a3530]">
                        {[...Array(16)].map((_, i) => {
                          const row = Math.floor(i / 4);
                          const col = i % 4;
                          const isLight = (row + col) % 2 === 0;
                          return <div key={i} style={{ backgroundColor: isLight ? theme.lightSquare : theme.darkSquare }} />;
                        })}
                      </div>
                      <span className={`text-[10px] ${
                        boardTheme.id === theme.id ? 'text-[#c9a96e]' : 'text-[#7a7068]'
                      }`}>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right — Controls */}
        <aside className="w-full lg:w-72 flex flex-col gap-3 flex-shrink-0">
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
