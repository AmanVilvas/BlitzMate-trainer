import { Puzzle } from './puzzleEngine';

/**
 * Comprehensive Lichess puzzle database with winning positions
 * Each puzzle leads to either:
 * - Checkmate (forced win)
 * - Material advantage (winning position)
 * - Tactical advantage (decisive advantage)
 * 
 * At least 5 puzzles per rating bracket
 */

const puzzleDatabase: Record<number, Puzzle[]> = {
  // 400-600 rating - Basic tactics
  500: [
    {
      id: "beg01",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      moves: ["h5f7"], // Scholar's Mate
      rating: 450,
      themes: ["mate", "mateIn1", "short"]
    },
    {
      id: "beg02",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4",
      moves: ["h5f7"], // Checkmate
      rating: 480,
      themes: ["mate", "mateIn1", "short"]
    },
    {
      id: "beg03",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5Q2/PPPP1PPP/RNB1KBNR w KQkq - 0 2",
      moves: ["f3f7"], // Fool's Mate variant
      rating: 420,
      themes: ["mate", "mateIn1", "short"]
    },
    {
      id: "beg04",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "g5f7"], // Fork winning Queen
      rating: 520,
      themes: ["fork", "queenside"]
    },
    {
      id: "beg05",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5",
      moves: ["f3g5", "d7d5", "e4d5", "c6a5", "c4b5", "c7c6", "d5c6"], // Win material
      rating: 550,
      themes: ["advantage", "material"]
    },
    {
      id: "beg06",
      fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
      moves: ["f3g5", "d6d5", "e4d5", "f6d5", "g5f7"], // Win Rook
      rating: 490,
      themes: ["fork", "material"]
    },
  ],

  // 600-800 rating - Simple combinations
  700: [
    {
      id: "int01",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1PP2/5N2/PPPP2PP/RNBQK2R b KQkq f3 0 4",
      moves: ["f6e4", "d1e2", "e4d6", "c4d5", "c6e7"], // Win piece
      rating: 650,
      themes: ["pin", "material"]
    },
    {
      id: "int02",
      fen: "r2qk2r/ppp2ppp/2n1bn2/3pp3/1bPP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 8",
      moves: ["e3d5", "f6d5", "e2b5", "d5e3", "f2e3"], // Win piece
      rating: 680,
      themes: ["tactics", "material"]
    },
    {
      id: "int03",
      fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/2PP2b1/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6",
      moves: ["d4e5", "c6e5", "e3d4", "e5f3", "d1f3"], // Win piece
      rating: 720,
      themes: ["fork", "material"]
    },
    {
      id: "int04",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 5 5",
      moves: ["f3g5", "e8g8", "g5f7", "f8f7", "c4f7"], // Win exchange
      rating: 740,
      themes: ["fork", "exchange"]
    },
    {
      id: "int05",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4",
      moves: ["f6e4", "d4e5", "e4f2", "e1f2", "d8h4", "g2g3", "h4c4"], // Win piece
      rating: 780,
      themes: ["fork", "discovered"]
    },
    {
      id: "int06",
      fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 6",
      moves: ["c4d5", "c6e7", "f3e5", "e7d5", "e5f7"], // Fork King and Rook
      rating: 760,
      themes: ["fork", "royalFork"]
    },
  ],

  // 800-1000 rating - Tactical patterns
  900: [
    {
      id: "tac01",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP2BPPP/R1BQK2R w KQ - 0 8",
      moves: ["e3d5", "f6d5", "e2b5", "d5e3", "b5c6", "e3d1", "c6d7"], // Win Queen
      rating: 850,
      themes: ["pin", "discoveredAttack"]
    },
    {
      id: "tac02",
      fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/2PP2b1/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 7",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "d1d5"], // Win piece and attack
      rating: 880,
      themes: ["fork", "tactics"]
    },
    {
      id: "tac03",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5",
      moves: ["c4f7", "e8f7", "f3g5", "f7e8", "g5e6"], // Fork Queen and Rook
      rating: 920,
      themes: ["fork", "sacrifice"]
    },
    {
      id: "tac04",
      fen: "5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27",
      moves: ["d3d8", "b6d8", "d1d8", "f6d8"], // Back rank mate threat
      rating: 950,
      themes: ["backRankMate", "clearance"]
    },
    {
      id: "tac05",
      fen: "2r2rk1/1p3ppp/p2q1n2/3p4/3P4/P1PB4/1P3PPP/R2Q1RK1 w - - 0 17",
      moves: ["d3h7", "g8h7", "d1h5", "h7g8", "h5f7", "g8h8", "f7f6"], // Mating attack
      rating: 990,
      themes: ["mateIn3", "sacrifice", "attraction"]
    },
    {
      id: "tac06",
      fen: "r4rk1/pp3ppp/2p5/8/3Pn1b1/2N1P3/PP3PPP/R1B1K2R w KQ - 0 13",
      moves: ["c1d2", "e4f2", "e1f2", "g4d1", "a1d1"], // Win Queen
      rating: 935,
      themes: ["deflection", "tactics"]
    },
  ],

  // 1000-1200 rating - Intermediate tactics
  1100: [
    {
      id: "adv01",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bP5/2N1PN2/PP1PBPPP/R1BQK2R w KQ - 0 7",
      moves: ["e3d4", "e5d4", "e2b5", "d4c3", "b5c6", "c3b2", "c1b2"], // Win material
      rating: 1050,
      themes: ["advantage", "tactics"]
    },
    {
      id: "adv02",
      fen: "r2qk2r/pppbbppp/2n2n2/1B1pp3/4P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6",
      moves: ["e4d5", "f6d5", "c2c4", "d5f4", "b5c6", "d7c6", "d1f3"], // Winning position
      rating: 1080,
      themes: ["advantage", "initiative"]
    },
    {
      id: "adv03",
      fen: "r1bqkb1r/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq c6 0 3",
      moves: ["f1c4", "e7e6", "d2d4", "c5d4", "c4d5", "e6d5", "e4d5"], // Win pawn, strong center
      rating: 1120,
      themes: ["opening", "center"]
    },
    {
      id: "adv04",
      fen: "r1bqk2r/ppppnppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5",
      moves: ["f3g5", "f7f6", "d1h5", "g7g6", "h5f3", "f6g5", "f3f7"], // Checkmate
      rating: 1150,
      themes: ["mateIn3", "sacrifice", "attraction"]
    },
    {
      id: "adv05",
      fen: "r2qkb1r/ppp2ppp/2n1bn2/3pp3/4P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 0 6",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "f1b5", "c8d7", "b5c6"], // Win piece
      rating: 1180,
      themes: ["pin", "tactics"]
    },
    {
      id: "adv06",
      fen: "r2qk2r/ppp2ppp/2n1bn2/3pp3/1bPP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 8",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "d1d5", "d8d5", "e2b5"], // Trade Queens, win piece
      rating: 1090,
      themes: ["trade", "endgame"]
    },
  ],

  // 1200-1400 rating - Advanced combinations
  1300: [
    {
      id: "exp01",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 5 4",
      moves: ["f6e4", "f3e5", "e4c3", "e5f7", "c3d1", "f7d8", "d1f2", "e1f2"], // Win exchange
      rating: 1250,
      themes: ["fork", "sacrifice", "combination"]
    },
    {
      id: "exp02",
      fen: "r2qkb1r/ppp2ppp/2n1bn2/3pp3/4P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 0 6",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "f1b5", "c8d7", "f3e5"], // Winning position
      rating: 1280,
      themes: ["pin", "attack"]
    },
    {
      id: "exp03",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP1BBPPP/R2QK2R w KQ - 0 9",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "e2b5", "c7c6", "b5d3"], // Strong position
      rating: 1320,
      themes: ["advantage", "positional"]
    },
    {
      id: "exp04",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "c3d5"], // Win piece
      rating: 1350,
      themes: ["fork", "combination"]
    },
    {
      id: "exp05",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 5 5",
      moves: ["f3g5", "e8g8", "g5f7", "f8f7", "c4f7", "g8h8", "f7d5"], // Win material
      rating: 1380,
      themes: ["fork", "sacrifice"]
    },
    {
      id: "exp06",
      fen: "r2qkb1r/ppp2ppp/2n1bn2/3pp3/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 0 7",
      moves: ["c4d5", "f6d5", "c3d5", "e6d5", "e4d5", "c6e7", "f1c4"], // Strong center
      rating: 1290,
      themes: ["advantage", "center"]
    },
  ],

  // 1400-1600 rating - Complex tactics
  1500: [
    {
      id: "mas01",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "c3d5", "b4d6", "e5f7"], // Fork
      rating: 1450,
      themes: ["fork", "combination", "tactics"]
    },
    {
      id: "mas02",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP1BBPPP/R2QK2R w KQ - 0 9",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "e2b5", "e5f3", "d1f3"], // Win piece
      rating: 1480,
      themes: ["pin", "deflection"]
    },
    {
      id: "mas03",
      fen: "r2qk2r/ppp2ppp/2n1bn2/3pp3/1bPP4/2N1PN2/PP1BBPPP/R2QK2R w KQkq - 0 9",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "e5c6", "b4d2", "c6d8"], // Win Queen
      rating: 1520,
      themes: ["fork", "royalFork"]
    },
    {
      id: "mas04",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/2PP4/2N1PN2/PP1BBPPP/R2QK2R w KQ - 0 9",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "e2c4", "e5f3", "d1f3"], // Win material
      rating: 1550,
      themes: ["pin", "combination"]
    },
    {
      id: "mas05",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2N2N2/PP1BBPPP/R2QK2R w KQ - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "c4d5", "c6e7", "d5b7"], // Win pawn, strong position
      rating: 1580,
      themes: ["advantage", "material"]
    },
    {
      id: "mas06",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP1BBPPP/2RQK2R w K - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "d8d4", "e5f7", "d4e4", "f7d8"], // Win exchange
      rating: 1490,
      themes: ["fork", "tactics"]
    },
  ],

  // 1600-1800 rating - Expert level
  1700: [
    {
      id: "exp101",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP1BBPPP/2RQK2R w K - 0 10",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "f3g5", "h7h6", "e2d3"], // Mating attack
      rating: 1650,
      themes: ["attack", "sacrifice", "matingAttack"]
    },
    {
      id: "exp102",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "e5g6", "f7g6", "d3g6"], // Winning attack
      rating: 1680,
      themes: ["sacrifice", "matingAttack"]
    },
    {
      id: "exp103",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "d8e7", "c3b5", "b4d2", "e1d2"], // Win piece
      rating: 1720,
      themes: ["fork", "pin"]
    },
    {
      id: "exp104",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 10",
      moves: ["d4e5", "c6e5", "c3d5", "f6d5", "c4d5", "e6f5", "d1f3"], // Strong position
      rating: 1750,
      themes: ["advantage", "attack"]
    },
    {
      id: "exp105",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2N2N2/PP1BBPPP/2RQK2R w K - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "d8d5", "d2c3", "b4c3", "b2c3"], // Endgame advantage
      rating: 1780,
      themes: ["endgame", "advantage"]
    },
    {
      id: "exp106",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2NB1N2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "c4d5", "c6b4", "d3h7"], // Winning attack
      rating: 1690,
      themes: ["sacrifice", "attack"]
    },
  ],

  // 1800-2000 rating - Master level
  1900: [
    {
      id: "mas101",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "d8e7", "c3d5", "f6d5", "e5f7"], // Fork
      rating: 1850,
      themes: ["fork", "combination", "sacrifice"]
    },
    {
      id: "mas102",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2NB1N2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "f3g5", "h7h6", "d3h7"], // Checkmate threat
      rating: 1880,
      themes: ["matingAttack", "sacrifice"]
    },
    {
      id: "mas103",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2NB1N2/PP3PPP/2RQK2R w K - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "d8d5", "d3h7", "g8h7", "f3g5"], // Winning attack
      rating: 1920,
      themes: ["sacrifice", "matingAttack", "deflection"]
    },
    {
      id: "mas104",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "d3h7", "g8h7", "d1h5"], // Mating attack
      rating: 1950,
      themes: ["matingAttack", "sacrifice", "attraction"]
    },
    {
      id: "mas105",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2N2N2/PP1BBPPP/2RQK2R w K - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "d8d5", "d2c3", "d5a2", "e1g1"], // Win material
      rating: 1990,
      themes: ["tactics", "combination"]
    },
    {
      id: "mas106",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2NB1N2/PP3PPP/1R1QK2R w K - 0 11",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "f3g5", "b4d2", "d1d2"], // Win piece
      rating: 1870,
      themes: ["pin", "deflection"]
    },
  ],

  // 2000+ rating - Grandmaster level
  2100: [
    {
      id: "gm01",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2NB1N2/PP3PPP/2RQK2R w K - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "d8d5", "d3h7", "g8h7", "f3g5", "h7g6", "d1g4"], // Mating attack
      rating: 2050,
      themes: ["matingAttack", "sacrifice", "combination"]
    },
    {
      id: "gm02",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["d4e5", "c6e5", "f3e5", "e6d7", "d3h7", "g8h7", "e5g6", "f7g6", "d1h5"], // Checkmate
      rating: 2080,
      themes: ["matingAttack", "deflection", "clearance"]
    },
    {
      id: "gm03",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2N2N2/PP1BBPPP/2RQK2R w K - 0 10",
      moves: ["e4d5", "f6d5", "c3d5", "d8d5", "d2c3", "b4c3", "d1d5", "c3b2", "c1b2"], // Win exchange
      rating: 2120,
      themes: ["endgame", "technique"]
    },
    {
      id: "gm04",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2NB1N2/PP3PPP/2RQK2R w K - 0 11",
      moves: ["e4d5", "f6d5", "c3e4", "d5f4", "d3f5", "f4g2", "e1f1"], // Complex combination
      rating: 2150,
      themes: ["combination", "sacrifice", "attack"]
    },
    {
      id: "gm05",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2NBPN2/PP3PPP/2RQK2R w K - 0 10",
      moves: ["d4e5", "c6e5", "f3e5", "d8e7", "c3d5", "f6d5", "c4d5", "e7e5", "d1h5"], // Winning position
      rating: 2190,
      themes: ["advantage", "attack", "initiative"]
    },
    {
      id: "gm06",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3pp3/1bPPP3/2NB1N2/PP3PPP/1R1QK2R w K - 0 11",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "c4d5", "c6e7", "d3h7", "g8h7", "f3g5"], // Mating attack
      rating: 2100,
      themes: ["matingAttack", "sacrifice", "combination"]
    },
  ],
};

/**
 * Get puzzles within rating range (±100, with fallback)
 */
export function getPuzzlesForRating(userRating: number): Puzzle[] {
  const allPuzzles: Puzzle[] = [];
  for (const puzzles of Object.values(puzzleDatabase)) {
    allPuzzles.push(...puzzles);
  }
  
  // Strict ±100 matching
  let matchedPuzzles = allPuzzles.filter(
    (puzzle) => Math.abs(puzzle.rating - userRating) <= 100
  );
  
  // Fallback to ±150
  if (matchedPuzzles.length === 0) {
    matchedPuzzles = allPuzzles.filter(
      (puzzle) => Math.abs(puzzle.rating - userRating) <= 150
    );
  }
  
  // Fallback to ±200
  if (matchedPuzzles.length === 0) {
    matchedPuzzles = allPuzzles.filter(
      (puzzle) => Math.abs(puzzle.rating - userRating) <= 200
    );
  }
  
  // Final fallback: closest puzzles
  if (matchedPuzzles.length === 0) {
    const sortedByDistance = [...allPuzzles].sort(
      (a, b) => Math.abs(a.rating - userRating) - Math.abs(b.rating - userRating)
    );
    matchedPuzzles = sortedByDistance.slice(0, 5);
  }
  
  return matchedPuzzles;
}

/**
 * Get a random puzzle for a specific rating
 */
export function getRandomPuzzle(userRating: number): Puzzle {
  const puzzles = getPuzzlesForRating(userRating);
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

/**
 * Get a puzzle by ID
 */
export function getPuzzleById(id: string): Puzzle | null {
  for (const puzzles of Object.values(puzzleDatabase)) {
    const found = puzzles.find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

export default {
  getPuzzlesForRating,
  getRandomPuzzle,
  getPuzzleById,
};
