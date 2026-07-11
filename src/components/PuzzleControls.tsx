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
  const isSolved  = status === 'solved';
  const isWrong   = status === 'wrong';
  const isCorrect = status === 'correct';
  const isPlaying = status === 'playing';

  const statusColor = isSolved || isCorrect
    ? 'text-[#8fb87a]'
    : isWrong
    ? 'text-[#d4756a]'
    : 'text-white';

  const statusBg = isSolved || isCorrect
    ? 'bg-[#8fb87a]/10 border-[#8fb87a]/25'
    : isWrong
    ? 'bg-[#d4756a]/10 border-[#d4756a]/25'
    : 'bg-[#c9a96e]/10 border-[#c9a96e]/25';

  const statusMsg = isSolved
    ? '✓ Puzzle Solved!'
    : isWrong
    ? '✗ Incorrect Move'
    : isCorrect
    ? '✓ Correct! Keep going…'
    : isPlaying
    ? `Find the best move for ${userColor}`
    : message;

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Status banner */}
      <div className={`rounded-lg p-4 border ${statusBg}`}>
        <div className="flex items-center gap-3">
          {/* Color indicator dot */}
          <div
            className={`w-4 h-4 rounded-sm border flex-shrink-0 ${
              userColor === 'white'
                ? 'bg-[#f0d9b5] border-[#b58863]'
                : 'bg-[#b58863] border-[#8b6343]'
            }`}
          />
          <span className={`font-semibold text-sm ${statusColor}`}>
            {statusMsg}
          </span>
        </div>
      </div>

      {/* Puzzle info */}
      {puzzleId && (
        <div className="bg-[#252220] rounded-lg border border-[#3a3530] divide-y divide-[#3a3530]">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs text-[#7a7068] font-medium">Puzzle ID</span>
            <span className="text-xs font-mono text-[#a0998e]">#{puzzleId.slice(0, 6)}</span>
          </div>
          {puzzleRating && (
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-xs text-[#7a7068] font-medium">Rating</span>
              <span className="text-sm font-bold text-[#c9a96e]">{puzzleRating}</span>
            </div>
          )}
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-xs text-[#7a7068] font-medium">Playing</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${userColor === 'white' ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}`} />
              <span className="text-xs text-[#a0998e] capitalize">{userColor}</span>
            </div>
          </div>
          {hintsUsed > 0 && (
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-xs text-[#7a7068] font-medium">Hints used</span>
              <span className="text-xs text-[#a0998e]">{hintsUsed}</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-auto">

        {/* Next — primary when solved */}
        {isSolved && (
          <button
            onClick={onNext}
            id="next-puzzle-btn"
            className="w-full bg-[#8fb87a] hover:bg-[#9dc888] text-white font-bold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            Next Puzzle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        )}

        {/* Hint */}
        {!isSolved && status !== 'loading' && (
          <button
            onClick={onHint}
            id="hint-btn"
            className="w-full bg-[#252220] hover:bg-[#2e2b27] text-[#a0998e] hover:text-white font-semibold py-3 rounded-lg text-sm transition-colors border border-[#3a3530] hover:border-[#c9a96e]/40 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
            </svg>
            Get a Hint
          </button>
        )}

        {/* Retry + Skip row */}
        <div className="flex gap-2">
          <button
            onClick={onRetry}
            disabled={status === 'loading'}
            id="retry-btn"
            className="flex-1 bg-[#252220] hover:bg-[#2e2b27] disabled:opacity-40 text-[#a0998e] hover:text-white py-2.5 rounded-lg text-sm font-medium transition-colors border border-[#3a3530] flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Retry
          </button>
          <button
            onClick={onNext}
            disabled={status === 'loading'}
            id="skip-btn"
            className="flex-1 bg-[#252220] hover:bg-[#2e2b27] disabled:opacity-40 text-[#a0998e] hover:text-white py-2.5 rounded-lg text-sm font-medium transition-colors border border-[#3a3530] flex items-center justify-center gap-1.5"
          >
            Skip
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className="flex justify-center gap-5 text-xs text-[#5a5550] pt-1">
        <span><kbd className="bg-[#252220] border border-[#3a3530] rounded px-1.5 py-0.5 text-[#7a7068] font-mono">H</kbd> Hint</span>
        <span><kbd className="bg-[#252220] border border-[#3a3530] rounded px-1.5 py-0.5 text-[#7a7068] font-mono">R</kbd> Retry</span>
        <span><kbd className="bg-[#252220] border border-[#3a3530] rounded px-1.5 py-0.5 text-[#7a7068] font-mono">N</kbd> Next</span>
      </div>
    </div>
  );
};

export default PuzzleControls;
