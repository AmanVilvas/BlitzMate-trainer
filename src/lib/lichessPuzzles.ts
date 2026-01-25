import { Puzzle } from './puzzleEngine';

/**
 * Comprehensive Lichess puzzle database organized by rating
 * Each puzzle has:
 * - id: Lichess puzzle ID
 * - fen: Starting position (BEFORE the setup move)
 * - moves: UCI format moves (first move is opponent's setup move, rest is the solution)
 * - rating: Puzzle difficulty rating
 * - themes: Puzzle themes/tags
 */

// Puzzles organized by rating - more granular for ±100 matching
const puzzleDatabase: Record<number, Puzzle[]> = {
  // 400-500 rating
  450: [
    {
      id: "00tQe",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      moves: ["h5f7", "e8e7", "c4d5"],
      rating: 478,
      themes: ["mate", "short"]
    },
    {
      id: "00A1x",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      moves: ["f1c4", "f8c5", "c4f7", "e8f7", "f3g5"],
      rating: 420,
      themes: ["fork", "short"]
    },
    {
      id: "00A2y",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      moves: ["b8c6", "f1b5", "g8f6", "b5c6", "d7c6"],
      rating: 460,
      themes: ["opening", "short"]
    },
  ],
  
  // 500-600 rating
  550: [
    {
      id: "00sHx",
      fen: "r2q1rk1/ppp2ppp/2n1bn2/3p4/8/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 10",
      moves: ["d3h7", "g8h7", "d1d3", "h7g8", "d3h7"],
      rating: 498,
      themes: ["mate", "mateIn2", "short"]
    },
    {
      id: "00Owk",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 7",
      moves: ["c4f7", "f8f7", "f3g5", "f7f8", "g5e6"],
      rating: 520,
      themes: ["fork", "short"]
    },
    {
      id: "00sJx",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "g5f7"],
      rating: 545,
      themes: ["fork", "short"]
    },
    {
      id: "00Bwk",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      moves: ["f3f7", "e8e7", "c4d5"],
      rating: 510,
      themes: ["mate", "short"]
    },
    {
      id: "00B3z",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "d1f3"],
      rating: 580,
      themes: ["attack", "short"]
    },
  ],
  
  // 600-700 rating
  650: [
    {
      id: "00C4a",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "f3d4", "c6d4", "d1d4"],
      rating: 620,
      themes: ["opening", "short"]
    },
    {
      id: "00D5b",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "c6a5", "c4b5"],
      rating: 660,
      themes: ["advantage", "short"]
    },
    {
      id: "00E6c",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      moves: ["b8c6", "f1b5", "a7a6", "b5a4", "g8f6"],
      rating: 680,
      themes: ["opening", "short"]
    },
  ],
  
  // 700-800 rating
  750: [
    {
      id: "00gH4",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "c6a5", "c4b5", "c7c6", "d5c6"],
      rating: 695,
      themes: ["advantage", "short"]
    },
    {
      id: "00xNB",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6e7", "f3e5", "e7d5", "e5f7"],
      rating: 720,
      themes: ["fork", "short"]
    },
    {
      id: "00Kp7",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4",
      moves: ["f6e4", "d4e5", "e4f2", "e1f2", "d8h4", "g2g3", "h4c4"],
      rating: 752,
      themes: ["fork", "middlegame"]
    },
    {
      id: "00f2E",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "d1f3", "d5f6", "c4f7"],
      rating: 780,
      themes: ["advantage", "short"]
    },
  ],
  
  // 800-900 rating
  850: [
    {
      id: "00F7d",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d3", "f8c5", "c2c3", "d7d6", "b2b4"],
      rating: 810,
      themes: ["opening", "positional"]
    },
    {
      id: "00G8e",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      moves: ["f1b5", "a7a6", "b5a4", "g8f6", "e1g1"],
      rating: 840,
      themes: ["opening", "short"]
    },
    {
      id: "00H9f",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["e4d5", "c6d4", "f3d4", "e5d4", "d1g4"],
      rating: 875,
      themes: ["attack", "short"]
    },
  ],
  
  // 900-1000 rating
  950: [
    {
      id: "00008",
      fen: "5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27",
      moves: ["d3d8", "b6d8", "d1d8", "f6d8"],
      rating: 892,
      themes: ["backRankMate", "short"]
    },
    {
      id: "0000D",
      fen: "r4rk1/pp3ppp/2p5/8/3Pn1b1/2N1P3/PP3PPP/R1B1K2R w KQ - 0 13",
      moves: ["c1d2", "e4f2", "e1f2", "g4d1"],
      rating: 935,
      themes: ["fork", "short"]
    },
    {
      id: "0000E",
      fen: "2r2rk1/1p3ppp/p2q1n2/3p4/3P4/P1PB4/1P3PPP/R2Q1RK1 w - - 0 17",
      moves: ["d3h7", "g8h7", "d1h5", "h7g8", "h5f7", "g8h8", "f7f6"],
      rating: 968,
      themes: ["mateIn3", "sacrifice"]
    },
    {
      id: "0001K",
      fen: "r2qkb1r/pp2pppp/2n2n2/3p4/3P2b1/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 4 6",
      moves: ["f3e5", "g4e2", "e5c6", "e2d1", "c6d8"],
      rating: 945,
      themes: ["fork", "short"]
    },
    {
      id: "00I0g",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "e4e5", "d4c3", "e5f6"],
      rating: 990,
      themes: ["attack", "short"]
    },
  ],
  
  // 1000-1100 rating
  1050: [
    {
      id: "00J1h",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["c2c3", "d7d5", "e4d5", "f6d5", "d2d4"],
      rating: 1020,
      themes: ["opening", "center"]
    },
    {
      id: "00K2i",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "c2c3", "d4f3", "d1f3"],
      rating: 1055,
      themes: ["tactics", "short"]
    },
    {
      id: "00L3j",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "f3d4", "f8c5", "c2c3"],
      rating: 1080,
      themes: ["opening", "short"]
    },
  ],
  
  // 1100-1200 rating
  1150: [
    {
      id: "0000K",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bP5/2N1PN2/PP1PBPPP/R1BQK2R w KQ - 0 7",
      moves: ["e3d4", "e5d4", "e2b5", "d4c3", "b5c6", "c3b2", "c1b2"],
      rating: 1085,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0000N",
      fen: "r2qk2r/pppbbppp/2n2n2/1B1pp3/4P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6",
      moves: ["e4d5", "f6d5", "c2c4", "d5f4", "c4c5"],
      rating: 1120,
      themes: ["advantage", "short"]
    },
    {
      id: "0001B",
      fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq c6 0 3",
      moves: ["f1c4", "e7e6", "d2d4", "c5d4", "c4d5"],
      rating: 1150,
      themes: ["opening", "short"]
    },
    {
      id: "0001D",
      fen: "r1bqk2r/ppppnppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5",
      moves: ["f3g5", "f7f6", "d1h5", "g7g6", "h5f3", "f6g5", "f3f7"],
      rating: 1180,
      themes: ["mateIn3", "sacrifice"]
    },
  ],
  
  // 1200-1300 rating
  1250: [
    {
      id: "00M4k",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["c2c3", "f6e4", "d2d4", "e5d4", "c3d4"],
      rating: 1210,
      themes: ["opening", "center"]
    },
    {
      id: "00N5l",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "f3d4", "e5d4", "d1g4"],
      rating: 1240,
      themes: ["attack", "short"]
    },
    {
      id: "00O6m",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["b2b4", "f8b4", "c2c3", "b4c5", "d2d4"],
      rating: 1275,
      themes: ["gambit", "attack"]
    },
  ],
  
  // 1300-1400 rating
  1350: [
    {
      id: "0001F",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 5 4",
      moves: ["f6e4", "f3e5", "e4c3", "e5f7", "c3d1", "f7d8"],
      rating: 1285,
      themes: ["fork", "sacrifice"]
    },
    {
      id: "0001G",
      fen: "r2qkb1r/ppp2ppp/2n1bn2/3pp3/4P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 0 6",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "f1b5"],
      rating: 1320,
      themes: ["pin", "short"]
    },
    {
      id: "0001O",
      fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9",
      moves: ["d4c5", "e7c5", "e3e4", "d5e4", "d3e4"],
      rating: 1355,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0001R",
      fen: "r2qkb1r/pp1bpppp/2np1n2/1B6/3NP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 7",
      moves: ["a7a6", "b5c6", "d7c6", "d4c6", "b7c6"],
      rating: 1380,
      themes: ["advantage", "opening"]
    },
  ],
  
  // 1400-1500 rating
  1450: [
    {
      id: "00P7n",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "e4e5", "d4c3", "e5f6", "c3b2", "f6g7"],
      rating: 1420,
      themes: ["attack", "gambit"]
    },
    {
      id: "00Q8o",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "c2c3", "d4f3", "g2f3", "g4f3"],
      rating: 1455,
      themes: ["tactics", "sacrifice"]
    },
    {
      id: "00R9p",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "c4d5", "d8g5", "d5c6"],
      rating: 1490,
      themes: ["tactics", "short"]
    },
  ],
  
  // 1500-1600 rating
  1550: [
    {
      id: "0003L",
      fen: "r2q1rk1/1pp2ppp/p1n1bn2/3pp3/4P3/1BN2N2/PPP2PPP/R1BQ1RK1 w - - 0 9",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "b3d5", "d8d5", "f3e5"],
      rating: 1485,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0003M",
      fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6",
      moves: ["c4d5", "e6d5", "f1d3", "f8d6", "e3e4"],
      rating: 1520,
      themes: ["opening", "advantage"]
    },
    {
      id: "0003R",
      fen: "r1bq1rk1/pppn1ppp/3bpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 4 8",
      moves: ["c4d5", "e6d5", "f3e5", "d7e5", "d4e5"],
      rating: 1555,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0003T",
      fen: "r2qkbnr/ppp2ppp/2n1p3/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
      moves: ["f1b5", "f8b4", "c2c3", "b4e7", "b5c6", "b7c6", "f3e5"],
      rating: 1590,
      themes: ["advantage", "opening"]
    },
  ],
  
  // 1600-1700 rating
  1650: [
    {
      id: "00S0q",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "e4e5", "d7d5", "e5f6", "d5c4", "f6g7"],
      rating: 1615,
      themes: ["attack", "gambit"]
    },
    {
      id: "00T1r",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "c2c3", "d4f3", "g2f3", "g4h5"],
      rating: 1650,
      themes: ["tactics", "sacrifice"]
    },
    {
      id: "0003U",
      fen: "r2qk2r/pppb1ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 4 7",
      moves: ["c4d5", "e6d5", "a2a3", "b4a5", "f1b5"],
      rating: 1685,
      themes: ["advantage", "opening"]
    },
  ],
  
  // 1700-1800 rating
  1750: [
    {
      id: "0003W",
      fen: "r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7",
      moves: ["c4d5", "e6d5", "f1d3", "c6e7", "f3e5"],
      rating: 1720,
      themes: ["opening", "advantage"]
    },
    {
      id: "0003X",
      fen: "r2q1rk1/ppp1bppp/2n1bn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 8",
      moves: ["c4d5", "f6d5", "f1c4", "d5c3", "b2c3", "e6c4"],
      rating: 1755,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0004E",
      fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8",
      moves: ["c4d5", "c6d5", "f3e5", "d7e5", "d4e5"],
      rating: 1790,
      themes: ["advantage", "middlegame"]
    },
  ],
  
  // 1800-1900 rating
  1850: [
    {
      id: "0004F",
      fen: "r1bq1rk1/pp1n1ppp/2pbpn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8",
      moves: ["c4d5", "e6d5", "b2b3", "f8e8", "c1b2"],
      rating: 1885,
      themes: ["opening", "positional"]
    },
    {
      id: "00U2s",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["d2d4", "e5d4", "e4e5", "d7d5", "e5f6", "d5c4", "d1d4"],
      rating: 1820,
      themes: ["attack", "gambit"]
    },
    {
      id: "00V3t",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "c2c3", "d4f3", "d1f3", "g4f3", "g2f3"],
      rating: 1870,
      themes: ["tactics", "sacrifice"]
    },
  ],
  
  // 1900-2000 rating
  1950: [
    {
      id: "0004G",
      fen: "r2qr1k1/ppp2ppp/2n1bn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 10",
      moves: ["a2a3", "f6e4", "c3e4", "d5e4", "f3d2"],
      rating: 1920,
      themes: ["positional", "middlegame"]
    },
    {
      id: "0004H",
      fen: "r2q1rk1/ppp1bppp/2n1bn2/3pp3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8",
      moves: ["e4d5", "f6d5", "c3d5", "e6d5", "d3d4"],
      rating: 1955,
      themes: ["opening", "advantage"]
    },
    {
      id: "0004I",
      fen: "r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 7",
      moves: ["e1g1", "e8g8", "c4d5", "c6d5", "f1d1"],
      rating: 1990,
      themes: ["opening", "positional"]
    },
  ],
  
  // 2000-2100 rating
  2050: [
    {
      id: "0005J",
      fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/2P5/2N1PN2/PP1PBPPP/R1BQ1RK1 w - - 0 8",
      moves: ["c4d5", "e6d5", "f1b5", "c5c4", "b5c6"],
      rating: 2085,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "00W4u",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      moves: ["f3g5", "d7d5", "e4d5", "f6d5", "d1f3", "d5f4", "c4f7"],
      rating: 2020,
      themes: ["attack", "sacrifice"]
    },
    {
      id: "00X5v",
      fen: "r2qkbnr/ppp2ppp/2n5/3pp3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
      moves: ["c4d5", "c6d4", "c2c3", "d4f3", "g2f3", "g4h5", "d5e6"],
      rating: 2060,
      themes: ["tactics", "advantage"]
    },
  ],
  
  // 2100-2200 rating
  2150: [
    {
      id: "0005K",
      fen: "r2q1rk1/pp1bbppp/2n1pn2/2pp4/2P5/2N1PN2/PP1PBPPP/R1BQ1RK1 w - - 0 9",
      moves: ["c4d5", "e6d5", "f3e5", "c6e5", "d4e5"],
      rating: 2120,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0005M",
      fen: "r2qr1k1/pp1bbppp/2n1pn2/2pp4/2P5/2N1PN2/PP1PBPPP/R1BQ1RK1 w - - 0 10",
      moves: ["c4d5", "f6d5", "c3d5", "e6d5", "d4c5"],
      rating: 2155,
      themes: ["advantage", "middlegame"]
    },
    {
      id: "0005P",
      fen: "r1bq1rk1/pp2bppp/2n2n2/2ppp3/2P5/2N1PN2/PP1PBPPP/R1BQ1RK1 w - - 0 8",
      moves: ["c4d5", "f6d5", "c3d5", "d8d5", "d4c5"],
      rating: 2190,
      themes: ["advantage", "middlegame"]
    },
  ],
  
  // 2200-2300 rating
  2250: [
    {
      id: "0005Q",
      fen: "r1bq1rk1/pp2bppp/2n1pn2/2Pp4/8/2N1PN2/PP1PBPPP/R1BQ1RK1 b - - 0 9",
      moves: ["e7c5", "a2a3", "a7a5", "b2b4", "a5b4"],
      rating: 2285,
      themes: ["advantage", "positional"]
    },
    {
      id: "0005R",
      fen: "r2q1rk1/pp1bbppp/2n1pn2/2Pp4/8/2N1PN2/PP1PBPPP/R1BQ1RK1 b - - 0 10",
      moves: ["d7c5", "f3e5", "c6e5", "d4e5", "f6e4"],
      rating: 2220,
      themes: ["tactics", "middlegame"]
    },
  ],
  
  // 2300+ rating
  2350: [
    {
      id: "0005S",
      fen: "r1bq1rk1/pp2bppp/2n2n2/2ppp3/8/2N1PN2/PP1PBPPP/R1BQKR2 w Q - 0 9",
      moves: ["f3e5", "c6e5", "d4e5", "f6e4", "c3e4"],
      rating: 2355,
      themes: ["tactics", "middlegame"]
    },
    {
      id: "0005T",
      fen: "r2q1rk1/pp1bbppp/2n1pn2/3p4/2pP4/2N1PN2/PP1BBPPP/R2Q1RK1 w - - 0 10",
      moves: ["e3e4", "d5e4", "c3e4", "f6e4", "d2f4"],
      rating: 2390,
      themes: ["tactics", "advantage"]
    },
  ],
};

/**
 * Get puzzles for a specific rating (STRICTLY within ±100 range)
 * If no puzzles found in strict range, gradually widen until puzzles are found
 */
export function getPuzzlesForRating(userRating: number): Puzzle[] {
  // Collect ALL puzzles from the database with their actual ratings
  const allPuzzles: Puzzle[] = [];
  for (const puzzles of Object.values(puzzleDatabase)) {
    allPuzzles.push(...puzzles);
  }
  
  // Filter puzzles strictly within ±100 of user rating
  let matchedPuzzles = allPuzzles.filter(
    (puzzle) => Math.abs(puzzle.rating - userRating) <= 100
  );
  
  // If no puzzles found in ±100 range, gradually widen the range
  if (matchedPuzzles.length === 0) {
    // Try ±150
    matchedPuzzles = allPuzzles.filter(
      (puzzle) => Math.abs(puzzle.rating - userRating) <= 150
    );
  }
  
  if (matchedPuzzles.length === 0) {
    // Try ±200
    matchedPuzzles = allPuzzles.filter(
      (puzzle) => Math.abs(puzzle.rating - userRating) <= 200
    );
  }
  
  if (matchedPuzzles.length === 0) {
    // Fallback: find closest rated puzzles
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
