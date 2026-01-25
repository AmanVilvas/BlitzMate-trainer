import React from 'react';
import { PuzzleStatus } from '../lib/puzzleEngine';

interface PuzzleControlsProps {
  status: PuzzleStatus;
  message: string;
  puzzleRating: number | null;
  puzzleId: string | null;
  userColor: 'white' | 'black';
  hintsUsed: number;
  onHint: () => void;
  onRetry: () => void;
  onNext: () => void;
}

/**
 * Puzzle control buttons and status display
 */
const PuzzleControls: React.FC<PuzzleControlsProps> = ({
  status,
  message,
  puzzleRating,
  puzzleId,
  userColor,
  hintsUsed,
  onHint,
  onRetry,
  onNext,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'correct':
      case 'solved':
        return 'text-[#629924]';
      case 'wrong':
        return 'text-[#cc3333]';
      default:
        return 'text-white';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'correct':
      case 'solved':
        return 'bg-[#629924]/10 border-[#629924]/30';
      case 'wrong':
        return 'bg-[#cc3333]/10 border-[#cc3333]/30';
      default:
        return 'bg-[#D4A024]/10 border-[#D4A024]/30';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'correct':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        );
      case 'solved':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        );
      case 'wrong':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 22H5v-2h14v2M17.16 8.26A4.96 4.96 0 0 0 12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-.9-.24-1.73-.84-2.74z"/>
          </svg>
        );
    }
  };

  return (
    <div className="bg-[#262421] rounded-xl border border-[#3a3835] overflow-hidden shadow-lg">
      {/* Status section */}
      <div className={`p-5 border-b ${getStatusBg()}`}>
        <div className="flex items-center gap-3">
          {/* Player color indicator */}
          <div
            className={`w-10 h-10 rounded-lg ${
              userColor === 'white' 
                ? 'bg-white shadow-md' 
                : 'bg-[#333] border border-[#555]'
            } flex items-center justify-center ${getStatusColor()}`}
          >
            {getStatusIcon()}
          </div>

          {/* Status message */}
          <div className="flex-1">
            <div className={`font-bold text-lg ${getStatusColor()}`}>
              {message || 'Your turn'}
            </div>
            <div className="text-sm text-gray-400">
              {status === 'playing' && (
                <>Find the best move for {userColor}</>
              )}
              {status === 'correct' && <>Keep going...</>}
              {status === 'solved' && <>Puzzle completed!</>}
              {status === 'wrong' && <>Try again!</>}
              {status === 'loading' && <>Loading puzzle...</>}
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-5">
        {/* Puzzle info */}
        {puzzleId && (
          <div className="bg-[#1a1816] rounded-lg p-4 mb-4 border border-[#2a2825]">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-500">Puzzle ID</span>
              <span className="text-white font-mono text-xs bg-[#333] px-2 py-1 rounded">
                #{puzzleId.slice(0, 6)}
              </span>
            </div>
            {puzzleRating && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-500">Rating</span>
                <span className="text-[#D4A024] font-bold">{puzzleRating}</span>
              </div>
            )}
            {hintsUsed > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Hints used</span>
                <span className="text-[#56b4e9] font-medium">{hintsUsed}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Next button (prominent when solved) */}
          {status === 'solved' && (
            <button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-[#629924] to-[#558821] hover:from-[#75b226] hover:to-[#669927] text-white font-bold py-3.5 px-4 rounded-xl transition-all text-lg shadow-lg shadow-[#629924]/20 flex items-center justify-center gap-2"
            >
              Next Puzzle
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          )}

          {/* Hint button */}
          {status !== 'solved' && status !== 'loading' && (
            <button
              onClick={onHint}
              className="w-full bg-[#1a1816] hover:bg-[#252320] text-[#56b4e9] font-semibold py-3 px-4 rounded-xl transition-all border border-[#2a2825] hover:border-[#3a3835] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
              </svg>
              Get a Hint
            </button>
          )}

          {/* Retry and Next buttons */}
          <div className="flex gap-3">
            <button
              onClick={onRetry}
              disabled={status === 'loading'}
              className="flex-1 bg-[#3a3835] hover:bg-[#4a4845] disabled:opacity-50 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Retry
            </button>
            <button
              onClick={onNext}
              disabled={status === 'loading'}
              className="flex-1 bg-[#3a3835] hover:bg-[#4a4845] disabled:opacity-50 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5"
            >
              Skip
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts info */}
      <div className="px-5 py-3 bg-[#1a1816] border-t border-[#2a2825]">
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#333] rounded text-gray-400 font-mono">H</kbd>
            <span>Hint</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#333] rounded text-gray-400 font-mono">R</kbd>
            <span>Retry</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#333] rounded text-gray-400 font-mono">N</kbd>
            <span>Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleControls;
