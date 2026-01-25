import { Chess, Move, Square } from 'chess.js';

export type PuzzleStatus = 'loading' | 'playing' | 'correct' | 'wrong' | 'solved' | 'failed';

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[]; // UCI format moves (e.g., "e2e4", "g1f3")
  rating: number;
  themes?: string[];
  gameUrl?: string;
}

export interface PuzzleState {
  puzzle: Puzzle | null;
  chess: Chess;
  status: PuzzleStatus;
  moveIndex: number;
  userColor: 'white' | 'black';
  lastMove: { from: Square; to: Square } | null;
  message: string;
  hintsUsed: number;
  isOpponentTurn: boolean;
}

export interface HintInfo {
  from: Square;
  to: Square;
  san: string;
}

/**
 * PuzzleEngine - Controls all puzzle logic to match Lichess behavior exactly
 * 
 * Key behaviors:
 * 1. Puzzle loads with initial FEN
 * 2. First move of solution is the "setup" move (opponent's last move) - we apply it
 * 3. User must find remaining moves in the solution
 * 4. After each correct user move, opponent's response is auto-played
 * 5. Wrong moves are rejected immediately
 * 6. Hints show the exact next correct move from solution
 */
export class PuzzleEngine {
  private state: PuzzleState;
  private initialFen: string = '';
  private onStateChange: (state: PuzzleState) => void;

  constructor(onStateChange: (state: PuzzleState) => void) {
    this.onStateChange = onStateChange;
    this.state = this.getInitialState();
  }

  private getInitialState(): PuzzleState {
    return {
      puzzle: null,
      chess: new Chess(),
      status: 'loading',
      moveIndex: 0,
      userColor: 'white',
      lastMove: null,
      message: '',
      hintsUsed: 0,
      isOpponentTurn: false,
    };
  }

  private updateState(updates: Partial<PuzzleState>) {
    this.state = { ...this.state, ...updates };
    this.onStateChange(this.state);
  }

  /**
   * Load a new puzzle
   * The puzzle.moves array contains UCI moves starting with the opponent's "setup" move
   */
  loadPuzzle(puzzle: Puzzle) {
    const chess = new Chess(puzzle.fen);
    this.initialFen = puzzle.fen;

    // The first move in the solution is the opponent's move that sets up the puzzle
    // We need to apply it first
    const setupMove = puzzle.moves[0];
    const from = setupMove.substring(0, 2) as Square;
    const to = setupMove.substring(2, 4) as Square;
    const promotion = setupMove.length > 4 ? setupMove.substring(4) : undefined;

    try {
      chess.move({ from, to, promotion });
    } catch (e) {
      console.error('Failed to apply setup move:', setupMove, e);
    }

    // After setup move, it's the user's turn
    // User plays the color that moves AFTER the setup move
    const userColor = chess.turn() === 'w' ? 'white' : 'black';

    this.updateState({
      puzzle,
      chess,
      status: 'playing',
      moveIndex: 1, // Start at 1 because we already applied move[0]
      userColor,
      lastMove: { from, to },
      message: 'Your turn',
      hintsUsed: 0,
      isOpponentTurn: false,
    });
  }

  /**
   * Get the current FEN position
   */
  getFen(): string {
    return this.state.chess.fen();
  }

  /**
   * Get current state
   */
  getState(): PuzzleState {
    return this.state;
  }

  /**
   * Check if a move matches the expected solution move
   */
  private matchesExpectedMove(from: Square, to: Square, promotion?: string): boolean {
    const { puzzle, moveIndex } = this.state;
    if (!puzzle || moveIndex >= puzzle.moves.length) return false;

    const expected = puzzle.moves[moveIndex];
    const expectedFrom = expected.substring(0, 2);
    const expectedTo = expected.substring(2, 4);
    const expectedPromo = expected.length > 4 ? expected.substring(4) : undefined;

    // For promotion moves, check promotion piece too
    if (expectedPromo) {
      return from === expectedFrom && to === expectedTo && promotion === expectedPromo;
    }

    return from === expectedFrom && to === expectedTo;
  }

  /**
   * Attempt to make a move - returns true if move was valid
   * This is called when user tries to move a piece
   */
  makeMove(from: Square, to: Square, promotion?: string): boolean {
    const { chess, puzzle, status, moveIndex, userColor, isOpponentTurn } = this.state;

    // Don't allow moves if puzzle is solved, failed, or it's opponent's turn
    if (!puzzle || status === 'solved' || status === 'failed' || isOpponentTurn) {
      return false;
    }

    // Check if it's actually the user's turn
    const currentTurn = chess.turn() === 'w' ? 'white' : 'black';
    if (currentTurn !== userColor) {
      return false;
    }

    // For pawn promotion, default to queen if not specified
    const promoMove = this.needsPromotion(from, to);
    const finalPromotion = promoMove ? (promotion || 'q') : undefined;

    // Check if this move matches the expected solution move
    if (this.matchesExpectedMove(from, to, finalPromotion)) {
      // Correct move!
      try {
        const move = chess.move({ from, to, promotion: finalPromotion });
        if (!move) return false;

        const newMoveIndex = moveIndex + 1;

        // Check if puzzle is complete
        if (newMoveIndex >= puzzle.moves.length) {
          this.updateState({
            chess,
            moveIndex: newMoveIndex,
            lastMove: { from, to },
            status: 'solved',
            message: 'Puzzle solved!',
            isOpponentTurn: false,
          });
          return true;
        }

        // More moves to go - show "correct" briefly then auto-play opponent
        this.updateState({
          chess,
          moveIndex: newMoveIndex,
          lastMove: { from, to },
          status: 'correct',
          message: 'Best move!',
          isOpponentTurn: true,
        });

        // Auto-play opponent's response after a short delay
        setTimeout(() => this.playOpponentMove(), 400);
        return true;
      } catch (e) {
        console.error('Move failed:', e);
        return false;
      }
    } else {
      // Wrong move - check if it's at least a legal move
      try {
        const testChess = new Chess(chess.fen());
        const legalMove = testChess.move({ from, to, promotion: finalPromotion });
        
        if (legalMove) {
          // Legal but wrong move
          this.updateState({
            status: 'wrong',
            message: "That's not the move!",
          });

          // Reset message after delay
          setTimeout(() => {
            if (this.state.status === 'wrong') {
              this.updateState({
                status: 'playing',
                message: 'Try again',
              });
            }
          }, 1500);
        }
      } catch (e) {
        // Illegal move, just ignore
      }
      return false;
    }
  }

  /**
   * Check if a pawn move requires promotion
   */
  private needsPromotion(from: Square, to: Square): boolean {
    const piece = this.state.chess.get(from);
    if (!piece || piece.type !== 'p') return false;

    const toRank = to.charAt(1);
    return (piece.color === 'w' && toRank === '8') || (piece.color === 'b' && toRank === '1');
  }

  /**
   * Auto-play the opponent's move from the solution
   */
  private playOpponentMove() {
    const { chess, puzzle, moveIndex } = this.state;

    if (!puzzle || moveIndex >= puzzle.moves.length) return;

    const opponentMove = puzzle.moves[moveIndex];
    const from = opponentMove.substring(0, 2) as Square;
    const to = opponentMove.substring(2, 4) as Square;
    const promotion = opponentMove.length > 4 ? opponentMove.substring(4) : undefined;

    try {
      chess.move({ from, to, promotion });

      const newMoveIndex = moveIndex + 1;

      // Check if puzzle is complete after opponent's move
      if (newMoveIndex >= puzzle.moves.length) {
        this.updateState({
          chess,
          moveIndex: newMoveIndex,
          lastMove: { from, to },
          status: 'solved',
          message: 'Puzzle solved!',
          isOpponentTurn: false,
        });
      } else {
        // User's turn again
        this.updateState({
          chess,
          moveIndex: newMoveIndex,
          lastMove: { from, to },
          status: 'playing',
          message: 'Your turn',
          isOpponentTurn: false,
        });
      }
    } catch (e) {
      console.error('Failed to play opponent move:', opponentMove, e);
    }
  }

  /**
   * Get hint for the current position
   * Returns the exact next correct move from the solution
   */
  getHint(): HintInfo | null {
    const { chess, puzzle, moveIndex, status } = this.state;

    if (!puzzle || status === 'solved' || status === 'failed') return null;
    if (moveIndex >= puzzle.moves.length) return null;

    const hintMove = puzzle.moves[moveIndex];
    const from = hintMove.substring(0, 2) as Square;
    const to = hintMove.substring(2, 4) as Square;
    const promotion = hintMove.length > 4 ? hintMove.substring(4) : undefined;

    // Get SAN notation for display
    try {
      const testChess = new Chess(chess.fen());
      const move = testChess.move({ from, to, promotion });
      
      this.updateState({
        hintsUsed: this.state.hintsUsed + 1,
      });

      return {
        from,
        to,
        san: move?.san || `${from}-${to}`,
      };
    } catch (e) {
      return { from, to, san: `${from}-${to}` };
    }
  }

  /**
   * Reset puzzle to initial state (retry)
   */
  retry() {
    const { puzzle } = this.state;
    if (!puzzle) return;

    // Reload the puzzle from scratch
    this.loadPuzzle(puzzle);
  }

  /**
   * Get legal moves for a square (for highlighting)
   */
  getLegalMoves(square: Square): Square[] {
    const moves = this.state.chess.moves({ square, verbose: true });
    return moves.map((m) => m.to as Square);
  }

  /**
   * Check if it's the user's turn to move
   */
  isUserTurn(): boolean {
    const { chess, userColor, status, isOpponentTurn } = this.state;
    if (status === 'solved' || status === 'failed' || isOpponentTurn) return false;
    const currentTurn = chess.turn() === 'w' ? 'white' : 'black';
    return currentTurn === userColor;
  }

  /**
   * Get all legal moves for the current position
   */
  getAllLegalMoves(): Move[] {
    return this.state.chess.moves({ verbose: true });
  }
}
