import { Puzzle } from './puzzleEngine';

/**
 * Curated, high-popularity puzzles from the official Lichess puzzle database.
 * The Lichess export is released under CC0: https://database.lichess.org/#puzzles
 * Each rating bracket below contains 20 unique puzzles. Moves use UCI notation.
 */
const puzzleDatabase: Record<number, Puzzle[]> = {
  // 400–599 rating puzzles
  500: [
    {
      "id": "JOGv3",
      "fen": "5r2/pp6/2p3k1/2R1p2n/8/1BP5/Pr4PP/5R1K w - - 0 27",
      "moves": [
        "f1f8",
        "b2b1",
        "b3d1",
        "b1d1",
        "f8f1",
        "d1f1"
      ],
      "rating": 524,
      "themes": [
        "backRankMate",
        "endgame",
        "long",
        "mate",
        "mateIn3"
      ],
      "gameUrl": "https://lichess.org/fFWULcre#53"
    },
    {
      "id": "FN2Pm",
      "fen": "8/1p3qbk/p1pr2rp/4p2N/2P1P3/6R1/PPP3PP/5R1K w - - 0 27",
      "moves": [
        "f1f7",
        "d6d1",
        "f7f1",
        "d1f1"
      ],
      "rating": 539,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/Zqr3bJiB#53"
    },
    {
      "id": "IosLj",
      "fen": "6r1/2k2p1p/1qP1p3/3rP3/4Q1p1/P7/5PPP/1R4K1 w - - 2 28",
      "moves": [
        "b1b6",
        "d5d1",
        "e4e1",
        "d1e1"
      ],
      "rating": 596,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "queenRookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/i1zPnQ05#55"
    },
    {
      "id": "UJjrX",
      "fen": "6K1/2p5/8/2p4P/8/8/2k5/8 b - - 0 50",
      "moves": [
        "c2d3",
        "h5h6",
        "c5c4",
        "h6h7",
        "c4c3",
        "h7h8q"
      ],
      "rating": 509,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "long",
        "pawnEndgame",
        "promotion"
      ],
      "gameUrl": "https://lichess.org/dirlf5QM/black#100"
    },
    {
      "id": "IKfJm",
      "fen": "3Q4/1pp2ppk/1p4p1/6q1/8/2P5/rP3PPP/6K1 w - - 0 23",
      "moves": [
        "d8g5",
        "a2a1",
        "g5c1",
        "a1c1"
      ],
      "rating": 474,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "queenRookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/JZlBBrfL#45"
    },
    {
      "id": "ScRyb",
      "fen": "r1b1r1k1/ppp2ppp/8/2b5/3p1q2/1B4Q1/PPP3PP/RN5K w - - 0 16",
      "moves": [
        "g3f4",
        "e8e1",
        "f4f1",
        "e1f1"
      ],
      "rating": 400,
      "themes": [
        "backRankMate",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/piw9dpIi#31"
    },
    {
      "id": "L329z",
      "fen": "5r1k/p5pp/1p2Q3/7q/2PP3r/P4nP1/4RP2/2B2R1K w - - 0 29",
      "moves": [
        "g3h4",
        "h5h4",
        "e6h3",
        "h4h3"
      ],
      "rating": 416,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/gxSdoctS#57"
    },
    {
      "id": "8Puf9",
      "fen": "8/p7/1p4kp/2p2R2/6n1/2P5/PPK5/8 w - - 0 41",
      "moves": [
        "f5d5",
        "g4e3",
        "c2d3",
        "e3d5"
      ],
      "rating": 578,
      "themes": [
        "crushing",
        "endgame",
        "fork",
        "short"
      ],
      "gameUrl": "https://lichess.org/700DfbCe#81"
    },
    {
      "id": "Bm9pH",
      "fen": "8/6pk/P4p1p/1p6/1Pn3P1/4p3/3p1PK1/3R4 w - - 0 56",
      "moves": [
        "f2e3",
        "c4e3",
        "g2f2",
        "e3d1"
      ],
      "rating": 538,
      "themes": [
        "crushing",
        "endgame",
        "fork",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/oWxk5K4P#111"
    },
    {
      "id": "RRJib",
      "fen": "5k2/R4p1p/pp1r1Pp1/3p4/P2K4/2P5/1P5P/8 b - - 2 32",
      "moves": [
        "a6a5",
        "a7a8",
        "d6d8",
        "a8d8"
      ],
      "rating": 525,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "rookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/97LN09us/black#64"
    },
    {
      "id": "0BtyY",
      "fen": "4r1k1/2Q2ppp/8/8/P1Pp4/3P4/2P1rPPP/R1R1q1K1 w - - 1 20",
      "moves": [
        "c1e1",
        "e2e1",
        "a1e1",
        "e8e1"
      ],
      "rating": 416,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "queenRookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/ZrW94MT8#39"
    },
    {
      "id": "RZ8yx",
      "fen": "3r2k1/5ppp/p1R1p3/4P3/5B2/2N2N2/P1P2bPP/1r5K w - - 1 22",
      "moves": [
        "c3b1",
        "d8d1",
        "f3e1",
        "d1e1"
      ],
      "rating": 536,
      "themes": [
        "backRankMate",
        "endgame",
        "fork",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/B8cWbglX#43"
    },
    {
      "id": "Siwta",
      "fen": "8/8/1K5p/6p1/2P3k1/8/8/8 b - - 0 40",
      "moves": [
        "h6h5",
        "c4c5",
        "g4h4",
        "c5c6",
        "g5g4",
        "c6c7",
        "g4g3",
        "c7c8q"
      ],
      "rating": 453,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "pawnEndgame",
        "promotion",
        "quietMove",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/WS6GBez4/black#80"
    },
    {
      "id": "1ISXF",
      "fen": "4r1k1/5ppp/8/pp2P3/3p4/3P3P/1PR2PP1/6K1 b - - 0 30",
      "moves": [
        "e8e5",
        "c2c8",
        "e5e8",
        "c8e8"
      ],
      "rating": 436,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "rookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/1YkWiMH5/black#60"
    },
    {
      "id": "T4xHV",
      "fen": "rn1qr1k1/pp2bppp/2p2Bb1/4Q3/2B5/2NP1P2/PPP4P/2K1R1NR b - - 0 15",
      "moves": [
        "e7f6",
        "e5e8",
        "d8e8",
        "e1e8"
      ],
      "rating": 576,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/TZgn41je/black#30"
    },
    {
      "id": "3frCP",
      "fen": "6k1/5ppp/Rq2p3/8/1n1P4/4P1P1/2rQBPKP/1r6 b - - 0 26",
      "moves": [
        "c2d2",
        "a6a8",
        "b6b8",
        "a8b8"
      ],
      "rating": 599,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/LpdRIsbG/black#52"
    },
    {
      "id": "Ppu8u",
      "fen": "k5r1/pp6/2p5/4Q3/8/5P2/PP2R2K/5q2 b - - 2 37",
      "moves": [
        "f1f3",
        "e5e8",
        "g8e8",
        "e2e8"
      ],
      "rating": 587,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/mDNvMdbk/black#74"
    },
    {
      "id": "TFiZz",
      "fen": "r2k4/p1p3pp/2p5/8/2Q3b1/2N3q1/PPP3P1/R1K1rR2 w - - 3 23",
      "moves": [
        "f1e1",
        "g3e1",
        "c3d1",
        "e1d1"
      ],
      "rating": 490,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "queensideAttack",
        "short"
      ],
      "gameUrl": "https://lichess.org/7RUGYZFl#45"
    },
    {
      "id": "2TaIl",
      "fen": "r1br3k/p1qp2pp/1pQR1p2/4p3/4P3/4BN2/PP3PPP/3R2K1 b - - 0 17",
      "moves": [
        "d7c6",
        "d6d8",
        "c7d8",
        "d1d8"
      ],
      "rating": 461,
      "themes": [
        "backRankMate",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/NRG74BxN/black#34"
    },
    {
      "id": "GrTdo",
      "fen": "3r2k1/p1p2ppp/8/2P5/Q3q3/2P5/5PPP/2KR4 b - - 8 28",
      "moves": [
        "e4a4",
        "d1d8",
        "a4e8",
        "d8e8"
      ],
      "rating": 400,
      "themes": [
        "backRankMate",
        "endgame",
        "hangingPiece",
        "mate",
        "mateIn2",
        "queenRookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/AtFTyNNq/black#56"
    }
  ],

  // 600–799 rating puzzles
  700: [
    {
      "id": "KM0Nq",
      "fen": "8/8/1P6/4k3/2K2p1p/8/7P/8 b - - 0 48",
      "moves": [
        "f4f3",
        "b6b7",
        "f3f2",
        "b7b8q"
      ],
      "rating": 647,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "master",
        "pawnEndgame",
        "promotion",
        "short"
      ],
      "gameUrl": "https://lichess.org/tmccnY9c/black#96"
    },
    {
      "id": "ASUwe",
      "fen": "r5k1/ppp2ppp/8/5q2/6b1/3Br3/PPPN1NQP/2K5 w - - 0 22",
      "moves": [
        "d3f5",
        "e3e1",
        "f2d1",
        "e1d1"
      ],
      "rating": 702,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "operaMate",
        "queensideAttack",
        "short"
      ],
      "gameUrl": "https://lichess.org/IIY1RgGz#43"
    },
    {
      "id": "078kF",
      "fen": "r7/5ppp/8/1pk5/2b5/5P2/P2R2PP/K1R5 w - - 2 32",
      "moves": [
        "a1b2",
        "a8a2",
        "b2b1",
        "a2d2"
      ],
      "rating": 733,
      "themes": [
        "crushing",
        "endgame",
        "short",
        "skewer"
      ],
      "gameUrl": "https://lichess.org/0mfaNFVP#63"
    },
    {
      "id": "HVfLY",
      "fen": "8/1p1k4/p1b5/5p1p/6pP/3PB1P1/P3rP2/2Q3K1 w - - 4 34",
      "moves": [
        "c1c5",
        "e2e1",
        "g1h2",
        "e1h1"
      ],
      "rating": 773,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "operaMate",
        "short"
      ],
      "gameUrl": "https://lichess.org/wn7F0TQ8#67"
    },
    {
      "id": "3F6dK",
      "fen": "r1b2rk1/pp3pbp/2nq2p1/3B4/8/5N2/PP3PPP/R1BQ1RK1 b - - 0 14",
      "moves": [
        "c6b4",
        "d5f7",
        "f8f7",
        "d1d6"
      ],
      "rating": 799,
      "themes": [
        "crushing",
        "discoveredAttack",
        "kingsideAttack",
        "opening",
        "short"
      ],
      "gameUrl": "https://lichess.org/AU4QcjlA/black#28"
    },
    {
      "id": "3y04a",
      "fen": "3k1r2/RR5p/1n4p1/1B2p3/4P1b1/2N1P3/1Pr3PP/6K1 w - - 3 22",
      "moves": [
        "b7b6",
        "c2c1",
        "c3d1",
        "c1d1",
        "b5f1",
        "d1f1"
      ],
      "rating": 792,
      "themes": [
        "long",
        "mate",
        "mateIn3",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/nzs21PvH#43"
    },
    {
      "id": "C9CdU",
      "fen": "8/8/5p2/4kPp1/6Pp/4K2P/8/8 w - - 4 54",
      "moves": [
        "e3d3",
        "e5f4",
        "d3c4",
        "f4g3",
        "c4d5",
        "g3h3"
      ],
      "rating": 720,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "pawnEndgame"
      ],
      "gameUrl": "https://lichess.org/GleXse8p#107"
    },
    {
      "id": "8otry",
      "fen": "r4b1r/p1RR3p/kp3p2/1P2p1p1/2P5/P3P3/6PP/2K5 b - - 0 22",
      "moves": [
        "a6a5",
        "c7a7",
        "a8a7",
        "d7a7"
      ],
      "rating": 778,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/bJD8dAkR/black#44"
    },
    {
      "id": "QkR08",
      "fen": "8/3r2kp/p2PQ1p1/1p2pp2/1P3q2/P1N5/5p2/3K1R2 b - - 1 39",
      "moves": [
        "d7d6",
        "e6d6",
        "f4d4",
        "d6d4"
      ],
      "rating": 736,
      "themes": [
        "crushing",
        "endgame",
        "hangingPiece",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/1vwhvP5t/black#78"
    },
    {
      "id": "2VKqZ",
      "fen": "1r3rkR/3n2p1/1qb3P1/p2p4/2pPp3/2P1P3/P2NB3/K1Q5 b - - 3 27",
      "moves": [
        "g8h8",
        "c1h1",
        "h8g8",
        "h1h7"
      ],
      "rating": 768,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/SDf2bBZb/black#54"
    },
    {
      "id": "SwOrL",
      "fen": "r4rk1/1p1b3p/p2p4/3P2Q1/4pR2/8/q5PP/5R1K b - - 1 23",
      "moves": [
        "g8h8",
        "f4f8",
        "a8f8",
        "f1f8"
      ],
      "rating": 785,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/MAzePy3w/black#46"
    },
    {
      "id": "FCaJi",
      "fen": "6k1/1p6/p3p3/3pP2N/3R2nP/P6R/1Pr2r2/3K4 b - - 1 30",
      "moves": [
        "f2d2",
        "d4d2",
        "c2d2",
        "d1d2"
      ],
      "rating": 755,
      "themes": [
        "crushing",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/dB79YV0R/black#60"
    },
    {
      "id": "SIbYI",
      "fen": "3r2k1/1p3ppp/p7/8/3bR3/1P2P3/P1r2PPP/3R2K1 b - - 1 24",
      "moves": [
        "d4b6",
        "d1d8",
        "b6d8",
        "e4e8"
      ],
      "rating": 779,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/9h3y9xGl/black#48"
    },
    {
      "id": "L5OZh",
      "fen": "r2r2k1/pp2qppp/2p1b3/2npP1N1/8/8/PPQB1PPP/R3R1K1 b - - 9 20",
      "moves": [
        "h7h6",
        "c2h7",
        "g8f8",
        "h7h8"
      ],
      "rating": 793,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/zKHSXjBb/black#40"
    },
    {
      "id": "NQBMO",
      "fen": "7r/1pr1p1n1/p1k1b3/2p4p/2P1NPpP/1P4P1/P1KRB3/3R4 b - - 0 24",
      "moves": [
        "e6f5",
        "d2d6",
        "e7d6",
        "d1d6"
      ],
      "rating": 745,
      "themes": [
        "epauletteMate",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/SFiSTfqg/black#48"
    },
    {
      "id": "G5zLv",
      "fen": "8/2K3pp/k7/3P4/7P/4p1r1/4B3/8 b - - 1 53",
      "moves": [
        "a6a5",
        "d5d6",
        "g3g2",
        "d6d7",
        "g2e2",
        "d7d8q"
      ],
      "rating": 784,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "long",
        "promotion"
      ],
      "gameUrl": "https://lichess.org/659O2EMl/black#106"
    },
    {
      "id": "6DwUI",
      "fen": "1rQ3k1/1p3ppp/3Npn2/8/1P6/P7/7q/1KR5 b - - 3 29",
      "moves": [
        "b8c8",
        "c1c8",
        "f6e8",
        "c8e8"
      ],
      "rating": 780,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/7Dn9OQYD/black#58"
    },
    {
      "id": "5ukwH",
      "fen": "2rq3r/Qp2kp2/R2Rbp2/3p4/P2P4/4PNPp/1P3P1P/6K1 w - - 3 26",
      "moves": [
        "d6d8",
        "c8c1",
        "f3e1",
        "c1e1"
      ],
      "rating": 791,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/l6tznOxG#51"
    },
    {
      "id": "1YFnv",
      "fen": "1rb3k1/pp4pP/2pp1qQ1/6b1/2PP4/P4p2/1P3PP1/3K1B1R b - - 0 24",
      "moves": [
        "g8h8",
        "g6e8",
        "f6f8",
        "e8f8"
      ],
      "rating": 789,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/8LZyjAez/black#48"
    },
    {
      "id": "BjQm0",
      "fen": "r3r1k1/1p1q1pp1/3p3p/pp1Pp3/2P1Nn2/P2P1Q1P/1P3PP1/R4RK1 w - - 0 20",
      "moves": [
        "f3g3",
        "f4e2",
        "g1h1",
        "e2g3"
      ],
      "rating": 752,
      "themes": [
        "crushing",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/HLVgyPSI#39"
    }
  ],

  // 800–999 rating puzzles
  900: [
    {
      "id": "KEPe0",
      "fen": "5r1k/1R4b1/p2P2Pp/1p5n/2p5/P4B1P/1pP5/5R1K w - - 1 32",
      "moves": [
        "b7f7",
        "h5g3",
        "h1g2",
        "g3f1"
      ],
      "rating": 915,
      "themes": [
        "crushing",
        "endgame",
        "fork",
        "short"
      ],
      "gameUrl": "https://lichess.org/4ViaNcFf#63"
    },
    {
      "id": "EyqYa",
      "fen": "6k1/p4N2/1p3KP1/8/8/5P2/r7/8 b - - 0 56",
      "moves": [
        "a2f2",
        "f7h6",
        "g8f8",
        "g6g7"
      ],
      "rating": 873,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/oi8tSM6O/black#112"
    },
    {
      "id": "IXqrY",
      "fen": "2r2rk1/p4q1p/b1n1R1p1/PN1Q4/1P6/2P5/5PPP/R5K1 w - - 1 25",
      "moves": [
        "b5d6",
        "f7f2",
        "g1h1",
        "f2f1",
        "a1f1",
        "f8f1"
      ],
      "rating": 828,
      "themes": [
        "backRankMate",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/54wEiuWr#49"
    },
    {
      "id": "FTAtt",
      "fen": "rn1qk2r/pp3ppp/2p1p3/4Nb2/Qb1PP3/4nP2/PP1B2PP/RN2KB1R w KQkq - 0 10",
      "moves": [
        "a4b4",
        "e3c2",
        "e1e2",
        "c2b4"
      ],
      "rating": 968,
      "themes": [
        "advantage",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/xcUTK4jZ#19"
    },
    {
      "id": "Byh1y",
      "fen": "1q5r/Rp1k1pp1/1Pn5/1B1p4/3P1n2/1Q5P/8/3R3K w - - 1 33",
      "moves": [
        "d1f1",
        "h8h3",
        "b3h3",
        "f4h3"
      ],
      "rating": 881,
      "themes": [
        "advantage",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/dFg5XY0T#65"
    },
    {
      "id": "6XKai",
      "fen": "5b1k/pR4Qp/8/2p2p2/8/5P2/P1qr1P1P/4R1K1 b - - 0 29",
      "moves": [
        "f8g7",
        "e1e8",
        "g7f8",
        "e8f8"
      ],
      "rating": 940,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/dOMXXYpd/black#58"
    },
    {
      "id": "EMPIc",
      "fen": "3r1r2/p3qp1k/n1p1p1pP/1p2P2P/2pP4/3b1N2/PP1QNR2/R5K1 b - - 0 22",
      "moves": [
        "f8g8",
        "f3g5",
        "e7g5",
        "d2g5"
      ],
      "rating": 974,
      "themes": [
        "crushing",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/B4RZKNCR/black#44"
    },
    {
      "id": "4pI19",
      "fen": "8/1p6/p2p4/3Pn3/P1p2k1r/6NP/1P4K1/7R b - - 3 39",
      "moves": [
        "f4e3",
        "g3f5",
        "e3e4",
        "f5h4"
      ],
      "rating": 981,
      "themes": [
        "advantage",
        "endgame",
        "fork",
        "short"
      ],
      "gameUrl": "https://lichess.org/NWDtdlRA/black#78"
    },
    {
      "id": "4NwJW",
      "fen": "8/r7/8/3p4/PR1P1B2/3b1kPK/4pP2/4R3 w - - 1 41",
      "moves": [
        "b4b3",
        "a7h7",
        "f4h6",
        "h7h6"
      ],
      "rating": 836,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/oaPEczIN#81"
    },
    {
      "id": "2M9AE",
      "fen": "1q2r2k/6pp/1r3p2/1PN5/3P4/1Q5P/5PP1/1R4K1 b - - 2 32",
      "moves": [
        "h7h6",
        "c5d7",
        "b6b5",
        "d7b8",
        "b5b3",
        "b1b3"
      ],
      "rating": 995,
      "themes": [
        "advantage",
        "endgame",
        "fork",
        "long"
      ],
      "gameUrl": "https://lichess.org/O6SvWKsR/black#64"
    },
    {
      "id": "GUg7K",
      "fen": "8/8/3p1r2/1k1P3p/p2PK2P/P6R/8/8 w - - 9 46",
      "moves": [
        "h3f3",
        "f6f3",
        "e4f3",
        "b5c4",
        "f3e4",
        "c4b3"
      ],
      "rating": 997,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "rookEndgame"
      ],
      "gameUrl": "https://lichess.org/igpNQFGr#91"
    },
    {
      "id": "3KS2c",
      "fen": "2k4r/Np3pb1/1np1p3/6p1/P6q/3r1B1P/1P3PP1/R1Q2RK1 b - - 0 18",
      "moves": [
        "c8b8",
        "a7c6",
        "b7c6",
        "c1c6"
      ],
      "rating": 899,
      "themes": [
        "advantage",
        "middlegame",
        "queensideAttack",
        "short"
      ],
      "gameUrl": "https://lichess.org/Emf6dM8j/black#36"
    },
    {
      "id": "7gkHr",
      "fen": "r5k1/pp3p1p/6p1/q3N3/6Q1/bPn1P1P1/P4P1P/1R1R2K1 w - - 1 26",
      "moves": [
        "g4f4",
        "c3e2",
        "g1g2",
        "e2f4"
      ],
      "rating": 964,
      "themes": [
        "crushing",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/QAvbI1u5#51"
    },
    {
      "id": "3qUz7",
      "fen": "8/p1r4p/2p1k1p1/3PN1B1/R1P2K1P/8/P5b1/6r1 b - - 0 38",
      "moves": [
        "c6d5",
        "a4a6",
        "c7c6",
        "a6c6"
      ],
      "rating": 929,
      "themes": [
        "endgame",
        "master",
        "mate",
        "mateIn2",
        "pillsburysMate",
        "short"
      ],
      "gameUrl": "https://lichess.org/Z4Flmykt/black#76"
    },
    {
      "id": "668Xn",
      "fen": "5R2/pp1k4/2pn4/3p4/3P4/KP3N2/PP1r4/8 b - - 4 39",
      "moves": [
        "d2f2",
        "f3e5",
        "d7e6",
        "f8f2"
      ],
      "rating": 985,
      "themes": [
        "crushing",
        "discoveredAttack",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/mP6TMuQ1/black#78"
    },
    {
      "id": "2LWHH",
      "fen": "2r3k1/2q1Rpb1/2Np3p/3Q4/8/1P4K1/P7/8 b - - 2 38",
      "moves": [
        "c7c6",
        "d5f7",
        "g8h8",
        "f7g7"
      ],
      "rating": 981,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/MsM3Uy0l/black#76"
    },
    {
      "id": "NTIrG",
      "fen": "6k1/5p2/5rp1/7p/3K3P/4Q1P1/8/8 w - - 12 61",
      "moves": [
        "d4e4",
        "f6e6",
        "e4f4",
        "e6e3"
      ],
      "rating": 817,
      "themes": [
        "crushing",
        "endgame",
        "master",
        "queenRookEndgame",
        "short",
        "skewer",
        "superGM"
      ],
      "gameUrl": "https://lichess.org/PzPuji6o#121"
    },
    {
      "id": "1p7lY",
      "fen": "7k/2R2Qpp/5p2/1p6/3P4/2P4P/PP1q1PP1/4r1K1 w - - 2 30",
      "moves": [
        "g1h2",
        "d2f4",
        "g2g3",
        "f4f2"
      ],
      "rating": 981,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/KUMvCQhX#59"
    },
    {
      "id": "A8cv6",
      "fen": "3rr1k1/pp3ppp/2p2n2/2b5/5B2/PQ3PPP/1PP1N2R/R2q1K2 w - - 11 24",
      "moves": [
        "a1d1",
        "d8d1",
        "f1g2",
        "e8e2"
      ],
      "rating": 937,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/ABIjxTiO#47"
    },
    {
      "id": "PsYcB",
      "fen": "1k2N3/1b1Q4/p6p/1p1pP3/2p5/q1P5/2PB1rPP/2R4K w - - 0 26",
      "moves": [
        "d2e3",
        "a3c1",
        "e3c1",
        "f2f1"
      ],
      "rating": 974,
      "themes": [
        "backRankMate",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/J6liTg11#51"
    }
  ],

  // 1000–1199 rating puzzles
  1100: [
    {
      "id": "134eC",
      "fen": "2r1r1k1/p4q1p/bp4pP/3R4/P1n3N1/4N3/4QPP1/2R3K1 b - - 0 28",
      "moves": [
        "f7d5",
        "g4f6",
        "g8f7",
        "f6d5"
      ],
      "rating": 1181,
      "themes": [
        "advantage",
        "fork",
        "master",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/7LOvO73y/black#56"
    },
    {
      "id": "LsBga",
      "fen": "6R1/7K/5P2/p5r1/5kp1/8/8/8 b - - 9 48",
      "moves": [
        "g5g8",
        "h7g8",
        "g4g3",
        "f6f7",
        "g3g2",
        "f7f8q"
      ],
      "rating": 1185,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "long",
        "promotion"
      ],
      "gameUrl": "https://lichess.org/jCiGyeeK/black#96"
    },
    {
      "id": "NHH1j",
      "fen": "8/3B4/5p2/p7/8/5K1p/5P1k/8 w - - 0 45",
      "moves": [
        "f3e2",
        "h2g2",
        "e2e3",
        "h3h2"
      ],
      "rating": 1127,
      "themes": [
        "advancedPawn",
        "bishopEndgame",
        "crushing",
        "endgame",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/4lwkvJlA#89"
    },
    {
      "id": "JEpH7",
      "fen": "2r1nrk1/1p2qp1p/p2p2p1/2n5/2PN4/B1P5/P5QP/1R3R1K b - - 3 23",
      "moves": [
        "g8g7",
        "d4f5",
        "g7h8",
        "f5e7"
      ],
      "rating": 1127,
      "themes": [
        "crushing",
        "middlegame",
        "pin",
        "short"
      ],
      "gameUrl": "https://lichess.org/2xIaHCRJ/black#46"
    },
    {
      "id": "Arg9M",
      "fen": "6k1/1pq2pp1/2p3rp/5N2/p2PQ3/Prn5/1P3PPP/K2RR3 w - - 0 29",
      "moves": [
        "b2c3",
        "b3a3",
        "a1b1",
        "c7b6"
      ],
      "rating": 1070,
      "themes": [
        "crushing",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/zpWgfuld#57"
    },
    {
      "id": "KMCUb",
      "fen": "r3r1k1/p4pb1/2pp2pp/1p1Pp3/1PP1P1nq/P1N1BQ2/5P2/RB2R1K1 w - - 5 22",
      "moves": [
        "g1f1",
        "g4h2",
        "f1g2",
        "h2f3"
      ],
      "rating": 1180,
      "themes": [
        "advantage",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/laGWUMYU#43"
    },
    {
      "id": "3Bml7",
      "fen": "5r1k/p2n2p1/2bR1r2/2P2q2/4pnNp/1BQ1B2P/6P1/3R2K1 w - - 0 32",
      "moves": [
        "g4f6",
        "f4e2",
        "g1h1",
        "e2c3"
      ],
      "rating": 1130,
      "themes": [
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/z75s5dzM#63"
    },
    {
      "id": "QlhHO",
      "fen": "2kr3r/1ppb1ppp/p1p5/2qnPN2/5P2/2P1B3/P1PQ2PP/1R3RK1 b - - 6 15",
      "moves": [
        "c5c3",
        "f5e7",
        "d5e7",
        "d2c3"
      ],
      "rating": 1157,
      "themes": [
        "crushing",
        "deflection",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/5Ddra9va/black#30"
    },
    {
      "id": "62iQf",
      "fen": "r4rk1/pp2ppBp/2p3p1/8/N1P3n1/1P2PKP1/P4P1q/R2Q1R2 b - - 1 16",
      "moves": [
        "g8g7",
        "d1d4",
        "e7e5",
        "d4g4"
      ],
      "rating": 1017,
      "themes": [
        "advantage",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/BNSZVrEA/black#32"
    },
    {
      "id": "BCrvj",
      "fen": "r3r3/p1p4k/1p1p3p/3P1p2/2P1p3/6q1/PP2QN2/R3R2K w - - 0 28",
      "moves": [
        "e1g1",
        "g3h4",
        "f2h3",
        "h4h3"
      ],
      "rating": 1106,
      "themes": [
        "crushing",
        "kingsideAttack",
        "master",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/1nIzlet3#55"
    },
    {
      "id": "5D1WZ",
      "fen": "8/1p3kpp/4pp2/2Np4/2nPP1P1/7P/1rn2P2/R3R1K1 w - - 1 30",
      "moves": [
        "e1e2",
        "c2a1",
        "e2b2",
        "c4b2"
      ],
      "rating": 1016,
      "themes": [
        "advantage",
        "endgame",
        "hangingPiece",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/Oxo0wTCc#59"
    },
    {
      "id": "6GBpS",
      "fen": "2r3k1/1p1b3p/2n1p1p1/pBPpP3/Q5pq/P1RR1rN1/1P3P1P/6K1 b - - 0 25",
      "moves": [
        "c8f8",
        "d3f3",
        "f8f3",
        "c3f3"
      ],
      "rating": 1115,
      "themes": [
        "advantage",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/PhGbzgVq/black#50"
    },
    {
      "id": "NxFSi",
      "fen": "1n3rk1/4p1bp/2p3p1/1pP2bN1/1p1p1q2/1Q3B2/rB4PP/2R1R1K1 b - - 3 21",
      "moves": [
        "g8h8",
        "g5f7",
        "f8f7",
        "b3f7"
      ],
      "rating": 1132,
      "themes": [
        "crushing",
        "kingsideAttack",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/fFQoJ7ct/black#42"
    },
    {
      "id": "Gjrhw",
      "fen": "r2q1rk1/p1p1npb1/1p2p1p1/6NN/3P4/4P2Q/PPP4P/R3K2R b KQ - 0 17",
      "moves": [
        "e7f5",
        "h5f6",
        "g7f6",
        "h3h7"
      ],
      "rating": 1119,
      "themes": [
        "clearance",
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/peAEjyYM/black#34"
    },
    {
      "id": "FaKFb",
      "fen": "r5k1/pp5p/2p3p1/3P4/1q2P3/6P1/PbQ1b1BP/1R4K1 w - - 0 24",
      "moves": [
        "c2e2",
        "b2d4",
        "g1h1",
        "b4b1"
      ],
      "rating": 1102,
      "themes": [
        "crushing",
        "discoveredAttack",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/aQ268hDn#47"
    },
    {
      "id": "GuRp8",
      "fen": "b7/3N2p1/2p4p/Pp1kp3/6P1/4K3/2P4P/8 b - - 4 41",
      "moves": [
        "c6c5",
        "d7b6",
        "d5c6",
        "b6a8",
        "c6b7",
        "a8b6"
      ],
      "rating": 1089,
      "themes": [
        "crushing",
        "defensiveMove",
        "endgame",
        "fork",
        "long"
      ],
      "gameUrl": "https://lichess.org/6EKmFEwu/black#82"
    },
    {
      "id": "RNV8z",
      "fen": "8/8/6k1/5p1p/5K2/5PP1/8/8 w - - 1 59",
      "moves": [
        "f4e5",
        "g6g5",
        "f3f4",
        "g5g4",
        "e5f6",
        "g4g3"
      ],
      "rating": 1114,
      "themes": [
        "crushing",
        "defensiveMove",
        "endgame",
        "long",
        "pawnEndgame",
        "zugzwang"
      ],
      "gameUrl": "https://lichess.org/IfgBYmEb#117"
    },
    {
      "id": "FLOF3",
      "fen": "4Qbk1/ppp2ppp/4n3/4p3/1PP1N3/2P3PN/P4PKP/2q5 w - - 1 23",
      "moves": [
        "h3g5",
        "e6g5",
        "e4g5",
        "c1g5"
      ],
      "rating": 1154,
      "themes": [
        "advantage",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/UDmm4j5z#45"
    },
    {
      "id": "MAN9U",
      "fen": "Q7/7k/4r1qp/3p2p1/4nP2/3Bb2P/6PB/4R2K w - - 8 46",
      "moves": [
        "a8d5",
        "e4f2",
        "h1g1",
        "f2d3"
      ],
      "rating": 1140,
      "themes": [
        "advantage",
        "discoveredAttack",
        "discoveredCheck",
        "master",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/e8lnnxlx#91"
    },
    {
      "id": "FFwGd",
      "fen": "r1b1k1nB/2p4p/p1p5/3p2p1/8/1P2P3/P1PP1P1q/RN1QK3 w Qq - 0 14",
      "moves": [
        "d1f3",
        "h2g1",
        "e1e2",
        "c8g4",
        "f3g4",
        "g1g4"
      ],
      "rating": 1174,
      "themes": [
        "crushing",
        "long",
        "middlegame",
        "pin"
      ],
      "gameUrl": "https://lichess.org/ADTaFdQS#27"
    }
  ],

  // 1200–1399 rating puzzles
  1300: [
    {
      "id": "8g4h0",
      "fen": "8/1pp2pk1/p7/P2Q1Pq1/1P2r3/2P1r2P/5R1K/5R2 w - - 0 33",
      "moves": [
        "f1g1",
        "e3h3",
        "h2h3",
        "e4h4"
      ],
      "rating": 1388,
      "themes": [
        "attraction",
        "endgame",
        "mate",
        "mateIn2",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/9x1Qt4d7#65"
    },
    {
      "id": "ALGsV",
      "fen": "8/8/6p1/8/4k2P/1prp2P1/1R3P2/4K3 w - - 0 46",
      "moves": [
        "e1d2",
        "c3c2",
        "b2c2",
        "b3c2"
      ],
      "rating": 1224,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "rookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/rnIKS0cq#91"
    },
    {
      "id": "QXDI1",
      "fen": "4kb1r/p2n1pp1/np1qp3/3p2Pp/2rQ3P/P3PPB1/1PP5/2KR2NR w k - 0 17",
      "moves": [
        "g3d6",
        "c4d4",
        "d1d4",
        "f8d6"
      ],
      "rating": 1306,
      "themes": [
        "advantage",
        "intermezzo",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/B7bYtPEs#33"
    },
    {
      "id": "6aKLW",
      "fen": "3Q4/3N2p1/4p2p/1p3pk1/3q4/7P/6PK/8 b - - 3 43",
      "moves": [
        "g5g6",
        "d7f8",
        "g6f7",
        "d8d4"
      ],
      "rating": 1305,
      "themes": [
        "crushing",
        "discoveredAttack",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/Knevedk8/black#86"
    },
    {
      "id": "DN6VV",
      "fen": "8/p5p1/Pkb2p1p/4pB2/1K3P1P/2R1P1P1/3r4/8 b - - 0 41",
      "moves": [
        "d2g2",
        "c3c6",
        "b6c6",
        "f5e4",
        "c6b6",
        "e4g2"
      ],
      "rating": 1375,
      "themes": [
        "attraction",
        "crushing",
        "endgame",
        "exposedKing",
        "fork",
        "long",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/pRKYzByo/black#82"
    },
    {
      "id": "L3GIc",
      "fen": "8/p3r2p/6k1/5p2/PR5K/6PP/8/8 b - - 0 42",
      "moves": [
        "e7e4",
        "b4e4",
        "f5e4",
        "h4g4",
        "g6f6",
        "g4f4"
      ],
      "rating": 1362,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "rookEndgame"
      ],
      "gameUrl": "https://lichess.org/ojPYAfpb/black#84"
    },
    {
      "id": "62rXy",
      "fen": "8/p3r3/4P1p1/8/2k3B1/P1ppK3/6P1/2R5 w - - 0 39",
      "moves": [
        "c1b1",
        "c3c2",
        "b1c1",
        "c4c3"
      ],
      "rating": 1323,
      "themes": [
        "advancedPawn",
        "crushing",
        "defensiveMove",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/tZuQhNww#77"
    },
    {
      "id": "25etE",
      "fen": "r1b4k/pp1p2pB/4p3/2P4Q/1P6/P7/3K4/q5b1 b - - 4 28",
      "moves": [
        "a1f6",
        "h7g6",
        "h8g8",
        "h5h7",
        "g8f8",
        "h7h8",
        "f8e7",
        "h8e8"
      ],
      "rating": 1391,
      "themes": [
        "discoveredAttack",
        "discoveredCheck",
        "endgame",
        "mate",
        "mateIn4",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/FRoaYSN2/black#56"
    },
    {
      "id": "7STMD",
      "fen": "r4k2/pR4Np/n4p2/4p3/8/5r2/P4P1P/4K1R1 b - - 3 24",
      "moves": [
        "a8b8",
        "g7e6",
        "f8e8",
        "g1g8"
      ],
      "rating": 1320,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/nb2IrqXw/black#48"
    },
    {
      "id": "SV1kB",
      "fen": "8/p4Q1p/7k/2pPbB2/2P5/2K4P/PP3q2/8 w - - 14 42",
      "moves": [
        "c3b3",
        "f2b2",
        "b3a4",
        "b2b4"
      ],
      "rating": 1222,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/nj0zc4HV#83"
    },
    {
      "id": "D5B7X",
      "fen": "2q3k1/5ppp/4b3/8/2r5/3Q1N1P/1P3PP1/R5K1 w - - 5 27",
      "moves": [
        "f3g5",
        "c4c1",
        "a1c1",
        "c8c1",
        "g1h2",
        "c1g5"
      ],
      "rating": 1248,
      "themes": [
        "advantage",
        "endgame",
        "fork",
        "long"
      ],
      "gameUrl": "https://lichess.org/179uN0W9#53"
    },
    {
      "id": "Jcv7e",
      "fen": "2r4k/2qR2p1/p3Qp1p/1pp5/4P3/5P1P/1P4P1/6K1 b - - 4 32",
      "moves": [
        "c7c6",
        "d7d8",
        "c8d8",
        "e6c6"
      ],
      "rating": 1386,
      "themes": [
        "advantage",
        "deflection",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/xpJfWTdu/black#64"
    },
    {
      "id": "Ph8Sk",
      "fen": "b4rk1/5p2/5QP1/2pPP2p/8/7P/6BK/2q5 b - - 0 32",
      "moves": [
        "c1h6",
        "g6f7",
        "f8f7",
        "f6h6"
      ],
      "rating": 1320,
      "themes": [
        "advancedPawn",
        "crushing",
        "discoveredAttack",
        "endgame",
        "master",
        "short"
      ],
      "gameUrl": "https://lichess.org/zwkBjL6A/black#64"
    },
    {
      "id": "HIYZl",
      "fen": "1Q3bk1/5pp1/b3p2P/4P3/4B3/8/p4PK1/3r4 b - - 2 37",
      "moves": [
        "a2a1q",
        "h6h7",
        "g8h8",
        "b8f8"
      ],
      "rating": 1397,
      "themes": [
        "advancedPawn",
        "deflection",
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/oaT3NSnH/black#74"
    },
    {
      "id": "Kpeyi",
      "fen": "r4r1k/1b2pPbp/p5p1/1pp5/3q2nQ/P1NP1P2/BPP4P/R1B2RK1 w - - 1 17",
      "moves": [
        "g1g2",
        "g4e3",
        "c1e3",
        "d4h4"
      ],
      "rating": 1233,
      "themes": [
        "crushing",
        "discoveredAttack",
        "fork",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/bD3mXStn#33"
    },
    {
      "id": "AK3i0",
      "fen": "8/1pp3kp/5Rbr/3QP1p1/2P5/1P2N1Pq/P6P/6K1 w - - 1 36",
      "moves": [
        "d5b7",
        "h3h2",
        "g1f1",
        "g6d3",
        "f1e1",
        "h2e2"
      ],
      "rating": 1321,
      "themes": [
        "endgame",
        "long",
        "master",
        "mate",
        "mateIn3"
      ],
      "gameUrl": "https://lichess.org/P82QOmNV#71"
    },
    {
      "id": "9Ajox",
      "fen": "3r2k1/pQ2rp2/3bq1pB/2pn3p/8/2P2N1P/PP3PP1/R2R2K1 w - - 1 25",
      "moves": [
        "b7d5",
        "d6h2",
        "g1h2",
        "d8d5"
      ],
      "rating": 1300,
      "themes": [
        "advantage",
        "discoveredAttack",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/wkAAtskc#49"
    },
    {
      "id": "1zx3Y",
      "fen": "3Q2k1/5r1p/3p2p1/2p5/1p1qPp2/1P1P1P1R/r1P1K1P1/2R5 b - - 4 31",
      "moves": [
        "g8g7",
        "h3h7",
        "g7h7",
        "c1h1",
        "h7g7",
        "d8h8"
      ],
      "rating": 1382,
      "themes": [
        "attraction",
        "endgame",
        "long",
        "mate",
        "mateIn3",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/KVHMvzUE/black#62"
    },
    {
      "id": "BFx0h",
      "fen": "R2r2k1/5ppp/2Q5/6q1/3P4/P3n2P/r4P2/5R1K b - - 5 26",
      "moves": [
        "e3f1",
        "c6e8",
        "d8e8",
        "a8e8"
      ],
      "rating": 1355,
      "themes": [
        "backRankMate",
        "endgame",
        "mate",
        "mateIn2",
        "sacrifice",
        "short",
        "xRayAttack"
      ],
      "gameUrl": "https://lichess.org/RRD7toqM/black#52"
    },
    {
      "id": "ISOAr",
      "fen": "8/4k1pp/8/4K3/1R6/4P3/rp3PP1/8 w - - 0 40",
      "moves": [
        "f2f4",
        "a2a5",
        "e5d4",
        "a5a4",
        "b4a4",
        "b2b1q"
      ],
      "rating": 1322,
      "themes": [
        "advancedPawn",
        "crushing",
        "deflection",
        "endgame",
        "long",
        "pin",
        "promotion",
        "rookEndgame"
      ],
      "gameUrl": "https://lichess.org/UTqiI4NV#79"
    }
  ],

  // 1400–1599 rating puzzles
  1500: [
    {
      "id": "Ej1L9",
      "fen": "5rk1/5pp1/p3p1n1/3pP1P1/2pP1NK1/1rP5/7R/7R b - - 2 44",
      "moves": [
        "b3c3",
        "f4g6",
        "f7g6",
        "h2h8",
        "g8f7",
        "h1f1"
      ],
      "rating": 1430,
      "themes": [
        "crushing",
        "endgame",
        "long"
      ],
      "gameUrl": "https://lichess.org/SJVPuvJP/black#88"
    },
    {
      "id": "E9Hod",
      "fen": "2k5/2p5/p3R3/1pN5/1P1r4/P4BPq/4K3/8 b - - 0 47",
      "moves": [
        "h3g3",
        "e6e8",
        "d4d8",
        "f3b7",
        "c8b8",
        "e8d8",
        "b8a7",
        "d8a8",
        "a7b6",
        "a8a6"
      ],
      "rating": 1474,
      "themes": [
        "deflection",
        "endgame",
        "epauletteMate",
        "hookMate",
        "mate",
        "mateIn5",
        "operaMate",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/FX3WECIQ/black#94"
    },
    {
      "id": "M0O2S",
      "fen": "5q2/7k/1p1pr1b1/p1bP1p1p/2P5/1PQ3P1/PB5P/2R4K w - - 0 36",
      "moves": [
        "d5e6",
        "f8a8",
        "c3f3",
        "a8f3"
      ],
      "rating": 1458,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/ztPEDCOe#71"
    },
    {
      "id": "8Axgi",
      "fen": "r2q2k1/pp3Rp1/2nb2Qp/2p3N1/8/2PP4/P1P3PP/R5K1 b - - 4 20",
      "moves": [
        "d8g5",
        "f7g7",
        "g8h8",
        "g7h7"
      ],
      "rating": 1414,
      "themes": [
        "kingsideAttack",
        "master",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/RZkWmHjs/black#40"
    },
    {
      "id": "Nq02I",
      "fen": "8/4bpk1/4p3/1p2P1p1/p2PN1Pn/P1B1Q1K1/1Pq5/8 w - - 7 52",
      "moves": [
        "e4g5",
        "c2g2",
        "g3h4",
        "g2h2",
        "e3h3",
        "e7g5",
        "h4g5",
        "h2h3"
      ],
      "rating": 1473,
      "themes": [
        "crushing",
        "deflection",
        "endgame",
        "master",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/efdiR7Yb#103"
    },
    {
      "id": "SqLTu",
      "fen": "r3kb1r/1pq2p1p/p3bp2/3p4/8/5N2/PPP1PPPP/R2QKB1R w KQkq - 2 10",
      "moves": [
        "f3d4",
        "f8b4",
        "c2c3",
        "b4c3",
        "b2c3",
        "c7c3",
        "d1d2",
        "c3a1"
      ],
      "rating": 1463,
      "themes": [
        "advantage",
        "deflection",
        "middlegame",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/EzlgqJlF#19"
    },
    {
      "id": "Q4oDR",
      "fen": "rnb1k2r/pp2ppb1/6pp/2pNP1B1/2B2Pn1/8/PPP3PP/3RK1NR b Kkq - 1 10",
      "moves": [
        "h6g5",
        "d5c7",
        "e8f8",
        "d1d8"
      ],
      "rating": 1484,
      "themes": [
        "fork",
        "mate",
        "mateIn2",
        "opening",
        "short"
      ],
      "gameUrl": "https://lichess.org/bBgwsgMm/black#20"
    },
    {
      "id": "FEyo3",
      "fen": "8/8/6pk/8/5PPp/2Q4K/5q2/8 b - - 4 61",
      "moves": [
        "f2f4",
        "c3h8",
        "h6g5",
        "h8h4"
      ],
      "rating": 1570,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "queenEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/lrpljh8U/black#122"
    },
    {
      "id": "0MLAj",
      "fen": "8/4k3/4p1p1/4K1P1/7P/8/8/8 w - - 1 64",
      "moves": [
        "h4h5",
        "g6h5",
        "g5g6",
        "h5h4",
        "g6g7",
        "e7f7",
        "g7g8r",
        "f7g8"
      ],
      "rating": 1527,
      "themes": [
        "crushing",
        "endgame",
        "pawnEndgame",
        "quietMove",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/5dhfncb4#127"
    },
    {
      "id": "FAwQH",
      "fen": "5rk1/4bR2/4P2p/p5pQ/P2r1nP1/1P3P2/7P/6K1 w - - 15 44",
      "moves": [
        "h5h6",
        "d4d1",
        "g1f2",
        "e7c5",
        "f2g3",
        "d1g1"
      ],
      "rating": 1420,
      "themes": [
        "endgame",
        "long",
        "mate",
        "mateIn3",
        "pillsburysMate"
      ],
      "gameUrl": "https://lichess.org/Oy4ck17w#87"
    },
    {
      "id": "9eXvi",
      "fen": "2R5/8/8/1K1k4/1P5p/8/8/4r3 b - - 20 70",
      "moves": [
        "h4h3",
        "c8d8",
        "d5e4",
        "d8e8",
        "e4f3",
        "e8e1"
      ],
      "rating": 1460,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "rookEndgame",
        "skewer"
      ],
      "gameUrl": "https://lichess.org/f0w9lXDu/black#140"
    },
    {
      "id": "BuD0E",
      "fen": "2b3rk/p1q1R2p/8/1ppp1p1Q/3p3P/3P2r1/PPPN1P2/4R1K1 w - - 0 30",
      "moves": [
        "f2g3",
        "c7g3",
        "g1f1",
        "g3g2"
      ],
      "rating": 1433,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/LHQAxFsm#59"
    },
    {
      "id": "IJOx2",
      "fen": "r1qn1rk1/5pp1/p4b1B/1ppP3Q/4B3/P6P/5PP1/5RK1 b - - 4 25",
      "moves": [
        "g7g6",
        "e4g6",
        "f7g6",
        "h5g6",
        "g8h8",
        "h6f8"
      ],
      "rating": 1425,
      "themes": [
        "advantage",
        "kingsideAttack",
        "long",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/dZtrTbd8/black#50"
    },
    {
      "id": "UPfj4",
      "fen": "6k1/pQ2np1p/3b2pB/8/3q1P1P/6P1/PPr5/4R2K b - - 1 29",
      "moves": [
        "d4f2",
        "b7a8",
        "c2c8",
        "a8c8",
        "e7c8",
        "e1e8",
        "d6f8",
        "e8f8"
      ],
      "rating": 1446,
      "themes": [
        "fork",
        "mate",
        "mateIn4",
        "middlegame",
        "operaMate",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/6n9JVYvn/black#58"
    },
    {
      "id": "TlLP9",
      "fen": "6k1/5pqp/3Qp1p1/p2p4/r7/1r3PRP/6P1/4R2K b - - 0 33",
      "moves": [
        "a4a1",
        "d6d8",
        "g7f8",
        "d8f8",
        "g8f8",
        "e1a1"
      ],
      "rating": 1468,
      "themes": [
        "advantage",
        "endgame",
        "long"
      ],
      "gameUrl": "https://lichess.org/yB08lRuN/black#66"
    },
    {
      "id": "BT2ox",
      "fen": "2kr2r1/b1pq4/2pp3p/N3p3/1P2Ppb1/P2Q1N2/2P2PPK/R5R1 b - - 5 23",
      "moves": [
        "c8b8",
        "d3a6",
        "d7c8",
        "a5c6",
        "b8a8",
        "a6a7"
      ],
      "rating": 1456,
      "themes": [
        "fork",
        "long",
        "mate",
        "mateIn3",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/6vIXyE35/black#46"
    },
    {
      "id": "FzzYv",
      "fen": "6rk/bp3Q1p/pq3p1B/3pp3/8/5n2/PPP3PP/3R3K b - - 0 31",
      "moves": [
        "g8g2",
        "f7f8",
        "g2g8",
        "h6g7"
      ],
      "rating": 1471,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/Cj45Q4nZ/black#62"
    },
    {
      "id": "87c8n",
      "fen": "q4rk1/p4ppp/1p2b3/2b1P3/2PQ3P/6P1/P4P2/1RB1R1K1 w - - 1 20",
      "moves": [
        "d4e4",
        "a8e4",
        "e1e4",
        "e6f5",
        "e4e1",
        "f5b1"
      ],
      "rating": 1579,
      "themes": [
        "advantage",
        "long",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/ntEKzcZf#39"
    },
    {
      "id": "18GEz",
      "fen": "2r4r/8/2R5/1p2p1pk/4P3/1BKP4/1PP4N/8 w - - 1 38",
      "moves": [
        "b3d5",
        "c8c6",
        "d5c6",
        "h8c8"
      ],
      "rating": 1506,
      "themes": [
        "advantage",
        "clearance",
        "endgame",
        "pin",
        "short"
      ],
      "gameUrl": "https://lichess.org/Mf3oAFVF#75"
    },
    {
      "id": "RxTqJ",
      "fen": "8/pr2B1pk/3P4/4P3/7P/8/2r2R2/5K2 b - - 0 48",
      "moves": [
        "c2f2",
        "f1f2",
        "h7g6",
        "e5e6",
        "g6f5",
        "d6d7"
      ],
      "rating": 1402,
      "themes": [
        "advancedPawn",
        "advantage",
        "endgame",
        "long"
      ],
      "gameUrl": "https://lichess.org/yBYsgyCb/black#96"
    }
  ],

  // 1600–1799 rating puzzles
  1700: [
    {
      "id": "2y11K",
      "fen": "6k1/pppK4/4P3/3p2P1/4b3/2P1P3/PP3r2/8 b - - 4 57",
      "moves": [
        "g8f8",
        "e6e7",
        "f8g7",
        "e7e8q",
        "f2f7",
        "d7e6"
      ],
      "rating": 1622,
      "themes": [
        "advancedPawn",
        "advantage",
        "deflection",
        "endgame",
        "long",
        "promotion"
      ],
      "gameUrl": "https://lichess.org/AXhxMA3F/black#114"
    },
    {
      "id": "Jw0sQ",
      "fen": "6k1/1b1q2b1/pp2p1Q1/4P2N/P5R1/1Pr5/5PPK/3q4 b - - 1 36",
      "moves": [
        "d1g4",
        "h5f6",
        "g8f8",
        "f6d7",
        "f8e7",
        "g6g4"
      ],
      "rating": 1626,
      "themes": [
        "crushing",
        "exposedKing",
        "fork",
        "long",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/Qh08pVeE/black#72"
    },
    {
      "id": "MUmHG",
      "fen": "1k1rr3/ppp3pp/3bQ3/1R4B1/3q4/2N4P/PPn2PP1/3R2K1 w - - 7 18",
      "moves": [
        "e6b3",
        "d4d1",
        "c3d1",
        "e8e1"
      ],
      "rating": 1612,
      "themes": [
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "pillsburysMate",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/NnhV9mpl#35"
    },
    {
      "id": "NtxBC",
      "fen": "r3k2r/5ppp/2p1p3/p2Nq3/8/P4P2/1PQ2KP1/3R4 b kq - 2 24",
      "moves": [
        "e8g8",
        "d5e7",
        "g8h8",
        "c2h7",
        "h8h7",
        "d1h1",
        "e5h2",
        "h1h2"
      ],
      "rating": 1607,
      "themes": [
        "anastasiaMate",
        "attraction",
        "endgame",
        "mate",
        "mateIn4",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/JkYfH4nf/black#48"
    },
    {
      "id": "3Fn7t",
      "fen": "r4rk1/1p3ppp/p3n3/3NP1q1/8/P2Q1R2/1P4PP/R5K1 b - - 3 21",
      "moves": [
        "g5e5",
        "d5e7",
        "g8h8",
        "d3h7",
        "h8h7",
        "f3h3",
        "e5h5",
        "h3h5"
      ],
      "rating": 1643,
      "themes": [
        "anastasiaMate",
        "attraction",
        "mate",
        "mateIn4",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/L7it5PM0/black#42"
    },
    {
      "id": "U70p8",
      "fen": "8/6k1/1p4p1/pP1p4/P2P2KP/8/8/8 b - - 5 47",
      "moves": [
        "g7h6",
        "g4f4",
        "h6h5",
        "f4e5",
        "h5h4",
        "e5d5"
      ],
      "rating": 1607,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "pawnEndgame"
      ],
      "gameUrl": "https://lichess.org/zRTum0Ma/black#94"
    },
    {
      "id": "SsCKw",
      "fen": "5rk1/ppp2ppp/8/3NPp2/5P2/4P1q1/PPPK4/6RR b - - 0 17",
      "moves": [
        "g3f3",
        "d5f6",
        "g8h8",
        "h1h7"
      ],
      "rating": 1798,
      "themes": [
        "arabianMate",
        "endgame",
        "kingsideAttack",
        "mate",
        "mateIn2",
        "pin",
        "short"
      ],
      "gameUrl": "https://lichess.org/nRRkkQbf/black#34"
    },
    {
      "id": "Mesbf",
      "fen": "4r1k1/2q2ppp/p7/1p2bN2/1P2n3/P4Q1P/B4PP1/5RK1 w - - 1 31",
      "moves": [
        "f3g4",
        "e5h2",
        "g1h1",
        "e4f2",
        "f1f2",
        "e8e1",
        "f2f1",
        "e1f1"
      ],
      "rating": 1703,
      "themes": [
        "clearance",
        "deflection",
        "kingsideAttack",
        "mate",
        "mateIn4",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/tNnfnpoT#61"
    },
    {
      "id": "1RGJw",
      "fen": "r3qr1k/ppp1N1pp/3n1p2/8/1P6/3Q3R/P1P3PP/5R1K b - - 6 26",
      "moves": [
        "f6f5",
        "h3h7",
        "h8h7",
        "d3h3",
        "e8h5",
        "h3h5"
      ],
      "rating": 1653,
      "themes": [
        "anastasiaMate",
        "attraction",
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/H0onKhYi/black#52"
    },
    {
      "id": "RPIVR",
      "fen": "r5k1/5pp1/6np/1PQ4B/2P5/1q1bP1BP/5PP1/3R2K1 w - - 1 27",
      "moves": [
        "h5g6",
        "b3d1",
        "g1h2",
        "d3g6"
      ],
      "rating": 1616,
      "themes": [
        "advantage",
        "hangingPiece",
        "intermezzo",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/1JdYYPxV#53"
    },
    {
      "id": "1kfQF",
      "fen": "3r2k1/3rqpp1/p2Nb2p/1p2P3/2pR4/P4Q1P/1P3PP1/4R1K1 b - - 2 31",
      "moves": [
        "f7f6",
        "e5f6",
        "e7f6",
        "f3f6",
        "g7f6",
        "e1e6"
      ],
      "rating": 1634,
      "themes": [
        "advantage",
        "capturingDefender",
        "long",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/wN6rsEel/black#62"
    },
    {
      "id": "IvAZD",
      "fen": "rn3rk1/1p1n1ppp/p2p4/5N1R/4Pp2/2N1B3/PPP5/2KR4 b - - 0 17",
      "moves": [
        "f4e3",
        "f5e7",
        "g8h8",
        "h5h7",
        "h8h7",
        "d1h1"
      ],
      "rating": 1721,
      "themes": [
        "anastasiaMate",
        "attraction",
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/Hhb4zSOJ/black#34"
    },
    {
      "id": "0YTZr",
      "fen": "r2qkb1r/pp2pppb/2p4p/7P/2BPnBP1/5Q2/PPP2P2/R3K1NR b KQkq - 2 13",
      "moves": [
        "d8d4",
        "c4f7",
        "e8f7",
        "f4e5",
        "e4f6",
        "e5d4"
      ],
      "rating": 1631,
      "themes": [
        "advantage",
        "attackingF2F7",
        "discoveredAttack",
        "long",
        "opening",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/Okc6JATg/black#26"
    },
    {
      "id": "4B8FW",
      "fen": "5rk1/pR2Q1pp/6r1/2p2p2/2q1n3/7P/6P1/2BR2K1 b - - 4 28",
      "moves": [
        "c4e2",
        "e7f8",
        "g8f8",
        "d1d8"
      ],
      "rating": 1648,
      "themes": [
        "attraction",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/dhvOB2AC/black#56"
    },
    {
      "id": "FAFlE",
      "fen": "8/7p/6p1/3k1pP1/1pp5/4KN1P/1P6/8 w - - 2 45",
      "moves": [
        "f3d4",
        "f5f4",
        "e3f4",
        "d5d4"
      ],
      "rating": 1634,
      "themes": [
        "crushing",
        "deflection",
        "endgame",
        "knightEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/es9yztqd#89"
    },
    {
      "id": "8tmuW",
      "fen": "r3r1kR/6p1/p3p3/1p1q1pN1/2n2Bp1/P2p4/1PP2P2/1K4Q1 b - - 1 29",
      "moves": [
        "g8h8",
        "g1h2",
        "h8g8",
        "h2h7",
        "g8f8",
        "h7h8",
        "f8e7",
        "h8g7",
        "e7d8",
        "g7c7"
      ],
      "rating": 1690,
      "themes": [
        "deflection",
        "kingsideAttack",
        "mate",
        "mateIn5",
        "middlegame",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/ff6azsxl/black#58"
    },
    {
      "id": "T851t",
      "fen": "8/8/8/4p3/5k2/4rp2/3Q4/2K5 w - - 2 84",
      "moves": [
        "d2c2",
        "e3e1",
        "c1b2",
        "e1e2",
        "b2c3",
        "e2c2"
      ],
      "rating": 1720,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "pin",
        "queenRookEndgame"
      ],
      "gameUrl": "https://lichess.org/BWXDOXI7#167"
    },
    {
      "id": "FMOeL",
      "fen": "4R3/p5pk/r6p/5P2/1K3q2/B1Q4P/P7/R7 w - - 0 40",
      "moves": [
        "c3c4",
        "a6a4",
        "b4a4",
        "f4c4"
      ],
      "rating": 1611,
      "themes": [
        "advantage",
        "attraction",
        "deflection",
        "endgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/bCVXyYxF#79"
    },
    {
      "id": "PqQcL",
      "fen": "8/8/7p/1p3rk1/1P3R2/5KP1/8/8 w - - 2 47",
      "moves": [
        "f3e4",
        "f5f4",
        "g3f4",
        "g5f6"
      ],
      "rating": 1638,
      "themes": [
        "crushing",
        "defensiveMove",
        "endgame",
        "rookEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/qvjHO5oY#93"
    },
    {
      "id": "HqEGT",
      "fen": "2r3k1/p5p1/b2N3p/4pq2/2rp4/1P1Q1P1P/PK2R1P1/3R4 b - - 1 40",
      "moves": [
        "c4c2",
        "e2c2",
        "c8c2",
        "d3c2"
      ],
      "rating": 1617,
      "themes": [
        "crushing",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/R5x7UM7N/black#80"
    }
  ],

  // 1800–1999 rating puzzles
  1900: [
    {
      "id": "GIBCl",
      "fen": "r1bQR3/p1p2pkp/2q5/5p2/3b1P2/3B4/PPP3PP/7K b - - 3 21",
      "moves": [
        "c8b7",
        "e8g8",
        "g7h6",
        "d8g5"
      ],
      "rating": 1831,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/t9KUHobQ/black#42"
    },
    {
      "id": "NI5rt",
      "fen": "2kr1b1r/ppp5/2q2n1p/5bp1/8/2P1BN1P/PP1NQ1P1/2KR3R w - - 0 18",
      "moves": [
        "f3d4",
        "c6c3",
        "b2c3",
        "f8a3"
      ],
      "rating": 1913,
      "themes": [
        "bodenMate",
        "mate",
        "mateIn2",
        "middlegame",
        "queensideAttack",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/XpNP3KuN#35"
    },
    {
      "id": "DP2Dq",
      "fen": "6k1/4q1p1/6B1/p3P2Q/6Pp/bpP4P/8/4K3 b - - 2 40",
      "moves": [
        "e7c5",
        "h5h7",
        "g8f8",
        "h7h8",
        "f8e7",
        "h8e8"
      ],
      "rating": 1855,
      "themes": [
        "endgame",
        "long",
        "mate",
        "mateIn3"
      ],
      "gameUrl": "https://lichess.org/t4ebriG1/black#80"
    },
    {
      "id": "Q89k9",
      "fen": "r1b2r1k/pp1nQ1bp/2pp2p1/4p3/2B1P2B/2NPq3/PPP1N1PP/R4n1K b - - 3 16",
      "moves": [
        "g7f6",
        "e7f8",
        "d7f8",
        "h4f6"
      ],
      "rating": 1914,
      "themes": [
        "doubleBishopMate",
        "kingsideAttack",
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/BP997x9d/black#32"
    },
    {
      "id": "Qgvnv",
      "fen": "r3kb1r/2qn1pp1/p7/3bp1B1/np1p1PQP/1N1B4/PPP5/2KRR3 b kq - 1 20",
      "moves": [
        "d5e6",
        "g4e6",
        "f7e6",
        "d3g6"
      ],
      "rating": 1819,
      "themes": [
        "doubleBishopMate",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/ZAB6xi7P/black#40"
    },
    {
      "id": "7Ej0U",
      "fen": "2rr2k1/b4pp1/5q1p/pR2p3/P3Q3/1B6/2P2PPP/5RK1 w - - 7 22",
      "moves": [
        "b5b7",
        "f6f2",
        "f1f2",
        "d8d1",
        "e4e1",
        "d1e1"
      ],
      "rating": 1816,
      "themes": [
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "pin",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/rl1oxFCB#43"
    },
    {
      "id": "0RrTi",
      "fen": "r4k1r/1pR1nppp/1p2p3/3pP3/1Q6/8/1B3PPP/1q2N1K1 b - - 9 21",
      "moves": [
        "a8e8",
        "b4e7",
        "e8e7",
        "c7c8",
        "e7e8",
        "b2a3",
        "b1b4",
        "a3b4",
        "f8g8",
        "c8e8"
      ],
      "rating": 1826,
      "themes": [
        "backRankMate",
        "mate",
        "mateIn5",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/s8MaC1zl/black#42"
    },
    {
      "id": "4caJS",
      "fen": "8/5pp1/7p/2k1p2P/1p2P1P1/1P1K4/5P2/8 b - - 0 37",
      "moves": [
        "g7g6",
        "g4g5",
        "h6g5",
        "h5h6"
      ],
      "rating": 1881,
      "themes": [
        "crushing",
        "endgame",
        "pawnEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/GHYCMbRL/black#74"
    },
    {
      "id": "TiPTO",
      "fen": "8/1q3P1k/p4Qp1/1p3p1p/1P1pR2P/P2r4/2r3P1/5R1K b - - 0 36",
      "moves": [
        "b7e4",
        "f7f8n",
        "h7g8",
        "f6g6",
        "g8f8",
        "f1f5",
        "e4f5",
        "g6f5"
      ],
      "rating": 1887,
      "themes": [
        "advancedPawn",
        "crushing",
        "deflection",
        "endgame",
        "promotion",
        "underPromotion",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/VLKrZ0Wy/black#72"
    },
    {
      "id": "Elf2P",
      "fen": "r2k2r1/p1p4p/1p1pP2p/1N6/7n/5P1P/PP1R1P1K/2R5 w - - 1 22",
      "moves": [
        "c1c7",
        "h4f3",
        "h2h1",
        "g8g1"
      ],
      "rating": 1915,
      "themes": [
        "arabianMate",
        "endgame",
        "fork",
        "mate",
        "mateIn2",
        "short"
      ],
      "gameUrl": "https://lichess.org/ZV8HGzjO#43"
    },
    {
      "id": "7uISb",
      "fen": "6rk/pR3Qbp/5p1N/7p/2p3q1/8/4rPP1/5RK1 b - - 3 33",
      "moves": [
        "g8f8",
        "f7g8",
        "f8g8",
        "h6f7"
      ],
      "rating": 1878,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short",
        "smotheredMate"
      ],
      "gameUrl": "https://lichess.org/k56nZE3o/black#66"
    },
    {
      "id": "B1kKF",
      "fen": "r1b2r1k/q3b1pp/2p1B3/p4QP1/N3PP2/1P6/P1P5/K2R3R b - - 0 26",
      "moves": [
        "f8f5",
        "h1h7",
        "h8h7",
        "d1h1",
        "h7g6",
        "e4f5"
      ],
      "rating": 1854,
      "themes": [
        "attraction",
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/QPn2WeDE/black#52"
    },
    {
      "id": "EPNGX",
      "fen": "8/p7/2p5/kp4PR/8/8/3r1PK1/8 b - - 0 45",
      "moves": [
        "b5b4",
        "g5g6",
        "c6c5",
        "g6g7",
        "d2d8",
        "h5h8"
      ],
      "rating": 1816,
      "themes": [
        "advancedPawn",
        "crushing",
        "discoveredAttack",
        "endgame",
        "long",
        "pin",
        "rookEndgame"
      ],
      "gameUrl": "https://lichess.org/CuVC6t0I/black#90"
    },
    {
      "id": "6JRfN",
      "fen": "8/1p2k3/4P3/p1pP2p1/2PpK1p1/1P4P1/6P1/8 b - - 2 41",
      "moves": [
        "e7d6",
        "e4f5",
        "d4d3",
        "f5f6",
        "d3d2",
        "e6e7",
        "d2d1r",
        "e7e8q"
      ],
      "rating": 1814,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "pawnEndgame",
        "promotion",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/0DG5wMh1/black#82"
    },
    {
      "id": "SHLpc",
      "fen": "r1bqkb1r/pp1n3p/4p1B1/2ppp1NQ/3P4/2P1P3/PP3PPP/RN2K2R b KQkq - 0 10",
      "moves": [
        "h7g6",
        "h5g6",
        "e8e7",
        "g6e6"
      ],
      "rating": 1900,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/XyxY7D2C/black#20"
    },
    {
      "id": "N097e",
      "fen": "5rk1/pp3ppp/2p1p3/5b2/6N1/6Q1/Pq1r2PP/1R3R1K b - - 3 23",
      "moves": [
        "f5b1",
        "g4h6",
        "g8h8",
        "h6f7",
        "f8f7",
        "g3b8",
        "d2d8",
        "b8d8",
        "f7f8",
        "d8f8"
      ],
      "rating": 1871,
      "themes": [
        "deflection",
        "mate",
        "mateIn5",
        "middlegame",
        "pin",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/CHTa4TE9/black#46"
    },
    {
      "id": "SydNk",
      "fen": "rk5r/pp3p2/3R1p2/1Np5/Q7/6pq/PPP2P1P/4R1K1 w - - 3 20",
      "moves": [
        "a4f4",
        "h3h2",
        "g1f1",
        "g3g2",
        "f1e2",
        "h2f4"
      ],
      "rating": 1813,
      "themes": [
        "advancedPawn",
        "crushing",
        "discoveredAttack",
        "kingsideAttack",
        "long",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/HDB6Or4H#39"
    },
    {
      "id": "9f3JJ",
      "fen": "8/p4p1k/1p2p1pp/2rnQ3/7R/5P1P/6PK/1q6 b - - 0 36",
      "moves": [
        "b1f5",
        "h4h6",
        "h7h6",
        "e5h8",
        "h6g5",
        "h3h4",
        "g5f4",
        "h8d4",
        "f5e4",
        "d4e4"
      ],
      "rating": 1946,
      "themes": [
        "attraction",
        "endgame",
        "mate",
        "mateIn5",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/BkvM514T/black#72"
    },
    {
      "id": "5UybD",
      "fen": "8/8/6N1/8/7P/2ppk3/8/3K4 w - - 0 53",
      "moves": [
        "g6e5",
        "c3c2",
        "d1c1",
        "d3d2",
        "c1c2",
        "e3e2",
        "c2c3",
        "d2d1q"
      ],
      "rating": 1904,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "exposedKing",
        "knightEndgame",
        "promotion",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/R4Ymg5d0#105"
    },
    {
      "id": "J96Np",
      "fen": "r2qk2r/1p3pp1/p1n1p3/3N2N1/2PP1bp1/8/PP2QPP1/R2R2K1 w kq - 0 18",
      "moves": [
        "g5e6",
        "h8h1",
        "g1h1",
        "d8h4",
        "h1g1",
        "h4h2",
        "g1f1",
        "h2h1"
      ],
      "rating": 1821,
      "themes": [
        "attraction",
        "kingsideAttack",
        "mate",
        "mateIn4",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/BRbfGJK3#35"
    }
  ],

  // 2000+ rating puzzles
  2100: [
    {
      "id": "4dzpo",
      "fen": "1bkr3r/pp1nqpp1/2p1pn2/7p/Q2P1BbP/2P4N/PP2BPP1/R3KN1R b KQ - 4 13",
      "moves": [
        "g4h3",
        "a4c6",
        "b7c6",
        "e2a6"
      ],
      "rating": 2004,
      "themes": [
        "bodenMate",
        "mate",
        "mateIn2",
        "opening",
        "queensideAttack",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/00UcO4jl/black#26"
    },
    {
      "id": "QEOYY",
      "fen": "8/2r2k2/3Rb1p1/6r1/2p5/2Q3K1/2P5/8 w - - 0 44",
      "moves": [
        "g3h4",
        "g5h5",
        "h4g3",
        "h5h3",
        "g3f2",
        "h3c3"
      ],
      "rating": 2107,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "skewer"
      ],
      "gameUrl": "https://lichess.org/U0jS5bdo#87"
    },
    {
      "id": "HdKbS",
      "fen": "2r3k1/1R3ppp/8/8/p2P3q/P2BPQ2/n2r1PPP/6K1 b - - 1 26",
      "moves": [
        "c8f8",
        "f3f7",
        "f8f7",
        "b7b8",
        "h4d8",
        "b8d8",
        "f7f8",
        "d3c4",
        "g8h8",
        "d8f8"
      ],
      "rating": 2037,
      "themes": [
        "backRankMate",
        "deflection",
        "mate",
        "mateIn5",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/sbOmvTlP/black#52"
    },
    {
      "id": "LyTGr",
      "fen": "r4bk1/2r2p1p/1p2p1p1/1p1pPP2/nPnP2P1/PK3N1P/R5B1/2B4R w - - 1 28",
      "moves": [
        "f5e6",
        "c4a5",
        "b4a5",
        "c7c3"
      ],
      "rating": 2032,
      "themes": [
        "clearance",
        "hookMate",
        "master",
        "mate",
        "mateIn2",
        "middlegame",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/rT0mfiYb#55"
    },
    {
      "id": "LqJiU",
      "fen": "6rk/ppp1nr1p/3p4/3P3R/2q1Pp2/P1P2QN1/5P2/2K4R b - - 0 25",
      "moves": [
        "f4g3",
        "f3f6",
        "g8g7",
        "h5h7",
        "h8g8",
        "h7h8"
      ],
      "rating": 2054,
      "themes": [
        "collinearMove",
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame"
      ],
      "gameUrl": "https://lichess.org/N4CQmEPy/black#50"
    },
    {
      "id": "7WvMG",
      "fen": "8/1p2kp1R/p7/5N2/5P2/r2nPK1P/8/8 b - - 1 31",
      "moves": [
        "e7f6",
        "h7h6",
        "f6f5",
        "e3e4"
      ],
      "rating": 2032,
      "themes": [
        "endgame",
        "mate",
        "mateIn2",
        "sacrifice",
        "short"
      ],
      "gameUrl": "https://lichess.org/NZbNNTUY/black#62"
    },
    {
      "id": "5STDu",
      "fen": "8/pp3pp1/3k4/1P2p3/P1K2P1P/R5P1/3r4/8 w - - 0 39",
      "moves": [
        "a3d3",
        "d2d3",
        "f4e5",
        "d6e5",
        "c4d3",
        "e5f5",
        "a4a5",
        "f5g4"
      ],
      "rating": 2002,
      "themes": [
        "crushing",
        "endgame",
        "rookEndgame",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/HMQTfOOi#77"
    },
    {
      "id": "ADzqc",
      "fen": "8/1b3Rk1/p3p3/1p2q1p1/6Pr/2P3p1/P7/3B1RK1 b - - 1 33",
      "moves": [
        "g7g6",
        "d1c2",
        "e5f5",
        "c2f5",
        "g6f7",
        "f5e4",
        "f7e8",
        "e4b7"
      ],
      "rating": 2089,
      "themes": [
        "advantage",
        "discoveredAttack",
        "endgame",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/Brj3eWch/black#66"
    },
    {
      "id": "EGFs2",
      "fen": "3N1r2/1kpQ4/3p2p1/4p2p/4P2P/5PK1/4q3/8 b - - 6 41",
      "moves": [
        "b7a7",
        "d7c7",
        "a7a6",
        "c7b7",
        "a6a5",
        "d8c6",
        "a5a4",
        "b7b4"
      ],
      "rating": 2098,
      "themes": [
        "endgame",
        "exposedKing",
        "mate",
        "mateIn4",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/pIXwTbIz/black#82"
    },
    {
      "id": "MrC8W",
      "fen": "8/6pp/p3pp2/P7/3p1P2/1k3P2/1p1K3P/1R6 w - - 0 45",
      "moves": [
        "h2h4",
        "b3a2",
        "b1e1",
        "b2b1q",
        "e1b1",
        "a2b1",
        "d2d3",
        "e6e5",
        "f4e5",
        "f6e5",
        "f3f4",
        "e5f4"
      ],
      "rating": 2113,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "promotion",
        "rookEndgame",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/lWJpQrKs#89"
    },
    {
      "id": "12kUF",
      "fen": "8/6pp/8/p5PP/2k1K3/Pp6/1P6/8 w - - 0 41",
      "moves": [
        "h5h6",
        "g7h6",
        "g5h6",
        "a5a4"
      ],
      "rating": 2229,
      "themes": [
        "crushing",
        "defensiveMove",
        "endgame",
        "pawnEndgame",
        "short",
        "zugzwang"
      ],
      "gameUrl": "https://lichess.org/PaVwn3pw#81"
    },
    {
      "id": "RGhH1",
      "fen": "r4rk1/1b4b1/p2Rp2p/1Np4Q/5P2/2P3R1/PP4PK/4q3 b - - 3 27",
      "moves": [
        "a6b5",
        "g3g7",
        "g8g7",
        "d6d7",
        "g7f6",
        "h5h6",
        "f6f5",
        "h6g5",
        "f5e4",
        "g5e5"
      ],
      "rating": 2234,
      "themes": [
        "attraction",
        "deflection",
        "exposedKing",
        "fork",
        "mate",
        "mateIn5",
        "middlegame",
        "sacrifice",
        "veryLong"
      ],
      "gameUrl": "https://lichess.org/3mpDLsnV/black#54"
    },
    {
      "id": "711me",
      "fen": "r2q2k1/4b1p1/2p1p2B/pb2P3/3P4/5P1P/3Q1P2/1BR3K1 b - - 0 27",
      "moves": [
        "g7h6",
        "d2h6",
        "e7g5",
        "h6h7"
      ],
      "rating": 2320,
      "themes": [
        "crushing",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/qA0Xge2p/black#54"
    },
    {
      "id": "LrDuo",
      "fen": "8/4k3/3r2p1/5p2/2Q5/6P1/3p2K1/8 w - - 0 64",
      "moves": [
        "c4c7",
        "d6d7",
        "c7e5",
        "e7f7",
        "e5h8",
        "d2d1q"
      ],
      "rating": 2250,
      "themes": [
        "advancedPawn",
        "crushing",
        "defensiveMove",
        "endgame",
        "long",
        "promotion",
        "queenRookEndgame"
      ],
      "gameUrl": "https://lichess.org/zI3ZD8Ig#127"
    },
    {
      "id": "As6Kk",
      "fen": "8/7R/4k3/1p6/4p3/2P2p1P/Pn3K2/8 w - - 0 38",
      "moves": [
        "h7h5",
        "b2d3",
        "f2e3",
        "f3f2",
        "e3e2",
        "d3f4"
      ],
      "rating": 2344,
      "themes": [
        "advancedPawn",
        "crushing",
        "endgame",
        "long",
        "master"
      ],
      "gameUrl": "https://lichess.org/wuTZwgC1#75"
    },
    {
      "id": "Lr5IR",
      "fen": "8/8/p5K1/2p5/2Pk4/1P6/P7/8 w - - 3 38",
      "moves": [
        "a2a3",
        "d4c3",
        "b3b4",
        "c5b4"
      ],
      "rating": 2263,
      "themes": [
        "crushing",
        "endgame",
        "pawnEndgame",
        "short"
      ],
      "gameUrl": "https://lichess.org/QsaVUxKz#75"
    },
    {
      "id": "UvFeH",
      "fen": "4r2k/ppp3p1/2n3b1/2P1q1P1/2B1r1P1/P3Q3/1P4K1/4R2R b - - 0 24",
      "moves": [
        "g6h7",
        "h1h7",
        "h8h7",
        "e3h3",
        "h7g6",
        "h3h5"
      ],
      "rating": 2226,
      "themes": [
        "attraction",
        "kingsideAttack",
        "long",
        "mate",
        "mateIn3",
        "middlegame",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/7glbi5FH/black#48"
    },
    {
      "id": "IKIsx",
      "fen": "8/8/3k3p/1p4p1/1P1KPpPP/8/8/8 w - - 0 49",
      "moves": [
        "h4h5",
        "d6e6",
        "e4e5",
        "f4f3",
        "d4e3",
        "e6e5"
      ],
      "rating": 2272,
      "themes": [
        "crushing",
        "endgame",
        "long",
        "pawnEndgame",
        "zugzwang"
      ],
      "gameUrl": "https://lichess.org/wZIN6iF5#97"
    },
    {
      "id": "Hr9bV",
      "fen": "7r/p2qpk2/2ppN1R1/1p6/3PP3/2N4b/PPPQ4/1K6 b - - 0 25",
      "moves": [
        "f7g6",
        "d2g5",
        "g6f7",
        "g5g7",
        "f7e6",
        "g7g6"
      ],
      "rating": 2367,
      "themes": [
        "endgame",
        "exposedKing",
        "long",
        "mate",
        "mateIn3",
        "sacrifice"
      ],
      "gameUrl": "https://lichess.org/zUDfdqau/black#50"
    },
    {
      "id": "FoUNS",
      "fen": "2krr3/1Rp2ppp/2n5/2q5/6P1/2NP1Q1P/2PK2B1/R7 w - - 0 28",
      "moves": [
        "f3c6",
        "c5e3",
        "d2d1",
        "e3e1"
      ],
      "rating": 2214,
      "themes": [
        "mate",
        "mateIn2",
        "middlegame",
        "short"
      ],
      "gameUrl": "https://lichess.org/8pSP3KBu#55"
    }
  ],
};

/** Return the curated set for the player's 200 point rating bracket. */
export function getPuzzlesForRating(userRating: number): Puzzle[] {
  const bracket = userRating >= 2000
    ? 2100
    : Math.max(500, Math.floor((userRating - 400) / 200) * 200 + 500);

  return puzzleDatabase[bracket] ?? puzzleDatabase[2100];
}

/** Get a random puzzle from the player's rating bracket. */
export function getRandomPuzzle(userRating: number): Puzzle {
  const puzzles = getPuzzlesForRating(userRating);
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

/** Get a puzzle by ID. */
export function getPuzzleById(id: string): Puzzle | null {
  for (const puzzles of Object.values(puzzleDatabase)) {
    const found = puzzles.find((puzzle) => puzzle.id === id);
    if (found) return found;
  }
  return null;
}

export default {
  getPuzzlesForRating,
  getRandomPuzzle,
  getPuzzleById,
};
