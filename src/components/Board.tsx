import React, { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'chess.js';

// Board theme definitions
export interface BoardTheme {
  id: string;
  name: string;
  lightSquare: string;
  darkSquare: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
  },
  {
    id: 'blue',
    name: 'Blue',
    lightSquare: '#dee3e6',
    darkSquare: '#8ca2ad',
  },
  {
    id: 'green',
    name: 'Green',
    lightSquare: '#ffffdd',
    darkSquare: '#86a666',
  },
  {
    id: 'purple',
    name: 'Purple',
    lightSquare: '#e8dff5',
    darkSquare: '#9b7cb6',
  },
];

interface BoardProps {
  fen: string;
  orientation: 'white' | 'black';
  lastMove?: { from: Square; to: Square } | null;
  hint?: { from: Square; to: Square } | null;
  onMove: (from: Square, to: Square, promotion?: string) => boolean;
  getLegalMoves: (square: Square) => Square[];
  isUserTurn: boolean;
  status: string;
  theme?: BoardTheme;
}

/**
 * Chess board component using react-chessboard
 * Provides Lichess-like look and feel for puzzles
 */
const Board: React.FC<BoardProps> = ({
  fen,
  orientation,
  lastMove,
  hint,
  onMove,
  getLegalMoves,
  isUserTurn,
  status,
  theme = BOARD_THEMES[0],
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [promotionMove, setPromotionMove] = useState<{
    from: Square;
    to: Square;
  } | null>(null);

  /**
   * Get custom square styles for highlighting
   */
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    // Last move highlight (Lichess green/yellow)
    if (lastMove) {
      styles[lastMove.from] = {
        backgroundColor: 'rgba(155, 199, 0, 0.41)',
      };
      styles[lastMove.to] = {
        backgroundColor: 'rgba(155, 199, 0, 0.41)',
      };
    }

    // Hint highlight (blue glow like Lichess)
    if (hint) {
      styles[hint.from] = {
        ...styles[hint.from],
        backgroundColor: 'rgba(0, 136, 204, 0.6)',
        boxShadow: 'inset 0 0 3px 3px rgba(0, 136, 204, 0.8)',
      };
      styles[hint.to] = {
        ...styles[hint.to],
        backgroundColor: 'rgba(0, 136, 204, 0.4)',
      };
    }

    // Selected square highlight
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        backgroundColor: 'rgba(20, 85, 30, 0.5)',
      };

      // Show legal move destinations
      const moves = getLegalMoves(selectedSquare);
      moves.forEach((sq) => {
        styles[sq] = {
          ...styles[sq],
          background:
            'radial-gradient(circle, rgba(20, 85, 30, 0.4) 25%, transparent 25%)',
        };
      });
    }

    return styles;
  }, [lastMove, hint, selectedSquare, getLegalMoves]);

  /**
   * Handle piece drop (drag and drop)
   */
  const handlePieceDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ): boolean => {
    if (!isUserTurn) return false;

    const from = sourceSquare as Square;
    const to = targetSquare as Square;

    // Check if this is a pawn promotion
    const isPawn = piece.toLowerCase().includes('p');
    const isPromotion =
      isPawn &&
      ((piece.startsWith('w') && targetSquare[1] === '8') ||
        (piece.startsWith('b') && targetSquare[1] === '1'));

    if (isPromotion) {
      setPromotionMove({ from, to });
      return false; // Don't complete move yet, wait for promotion choice
    }

    setSelectedSquare(null);
    return onMove(from, to);
  };

  /**
   * Handle square click (click-to-move)
   */
  const handleSquareClick = (square: string) => {
    if (!isUserTurn) return;

    const sq = square as Square;

    if (selectedSquare) {
      // Try to make a move
      const moves = getLegalMoves(selectedSquare);
      if (moves.includes(sq)) {
        // Check for pawn promotion
        const piece = getPieceAtSquare(selectedSquare, fen);
        const isPawn = piece?.type === 'p';
        const isPromotion =
          isPawn &&
          ((piece.color === 'w' && sq[1] === '8') ||
            (piece.color === 'b' && sq[1] === '1'));

        if (isPromotion) {
          setPromotionMove({ from: selectedSquare, to: sq });
          setSelectedSquare(null);
          return;
        }

        const success = onMove(selectedSquare, sq);
        setSelectedSquare(null);
        if (success) return;
      }
      // Select new square if it has a piece we can move
      setSelectedSquare(sq);
    } else {
      // Select piece if it's ours
      const moves = getLegalMoves(sq);
      if (moves.length > 0) {
        setSelectedSquare(sq);
      }
    }
  };

  /**
   * Handle promotion selection
   */
  const handlePromotion = (piece: string) => {
    if (promotionMove) {
      onMove(promotionMove.from, promotionMove.to, piece);
    }
    setPromotionMove(null);
    setSelectedSquare(null);
  };

  /**
   * Get piece at a square from FEN
   */
  const getPieceAtSquare = (
    square: Square,
    fenStr: string
  ): { type: string; color: 'w' | 'b' } | null => {
    const fenBoard = fenStr.split(' ')[0];
    const ranks = fenBoard.split('/');
    const file = square.charCodeAt(0) - 97;
    const rank = 8 - parseInt(square[1]);

    if (rank < 0 || rank > 7) return null;

    let col = 0;
    for (const char of ranks[rank] || '') {
      if (/\d/.test(char)) {
        col += parseInt(char);
      } else {
        if (col === file) {
          const color = char === char.toUpperCase() ? 'w' : 'b';
          return { type: char.toLowerCase(), color };
        }
        col++;
      }
    }
    return null;
  };

  return (
    <div className="relative">
      {/* Chess board */}
      <div style={{ width: '560px', height: '560px' }}>
        <Chessboard
          position={fen}
          onPieceDrop={handlePieceDrop}
          onSquareClick={handleSquareClick}
          boardOrientation={orientation}
          customSquareStyles={customSquareStyles}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
          customDarkSquareStyle={{ backgroundColor: theme.darkSquare }}
          customLightSquareStyle={{ backgroundColor: theme.lightSquare }}
          arePiecesDraggable={isUserTurn}
          animationDuration={200}
        />
      </div>

      {/* Promotion dialog */}
      {promotionMove && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="bg-[#302e2b] rounded-lg p-4 shadow-xl">
            <div className="text-white text-sm mb-3 text-center">
              Promote to:
            </div>
            <div className="flex gap-2">
              {['q', 'r', 'b', 'n'].map((piece) => (
                <button
                  key={piece}
                  onClick={() => handlePromotion(piece)}
                  className="w-14 h-14 bg-[#454340] hover:bg-[#5a5654] rounded flex items-center justify-center text-3xl transition-colors"
                >
                  {orientation === 'white'
                    ? piece === 'q'
                      ? '♕'
                      : piece === 'r'
                      ? '♖'
                      : piece === 'b'
                      ? '♗'
                      : '♘'
                    : piece === 'q'
                    ? '♛'
                    : piece === 'r'
                    ? '♜'
                    : piece === 'b'
                    ? '♝'
                    : '♞'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">
            Loading puzzle...
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
