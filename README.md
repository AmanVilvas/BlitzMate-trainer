# Blitzmate - Chess Puzzle Trainer

A professional chess puzzle training application inspired by Lichess.org's puzzle trainer. Built with React, Vite, and Tailwind CSS.

![Blitzmate Screenshot](https://img.shields.io/badge/Status-Ready-brightgreen)

## Features

- 🎯 **Personalized Training** - Enter your Elo rating for customized puzzle difficulty
- ♟️ **Interactive Chess Board** - Powered by Chessground (same library used by Lichess)
- 📊 **Performance Tracking** - Track your streak, accuracy percentage, and total puzzles solved
- ⌨️ **Keyboard Shortcuts** - Quick access with N (next), R (reset), H (hint)
- 💾 **Persistent Stats** - Your progress is saved in localStorage
- 🎨 **Beautiful Dark UI** - Lichess-inspired design with modern styling
- 🚀 **Fast & Responsive** - Built with Vite for lightning-fast development and production builds

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Chess Logic**: chess.js
- **Chess Board**: Chessground
- **API**: Lichess Open API

## Installation

1. **Clone or download the repository**

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## Usage

### Getting Started

1. Open the app in your browser
2. Enter your chess Elo rating (0-3000)
3. Click "Start Training Session"
4. Solve puzzles by dragging and dropping pieces

### Keyboard Shortcuts

- **N** - Load next puzzle (after solving current one)
- **R** - Reset current puzzle
- **H** - Show hint for the next move

### Scoring System

- **Streak**: Number of consecutive puzzles solved correctly
- **Solved**: Total number of puzzles you've completed
- **Accuracy**: Percentage of puzzles solved on the first attempt

## Project Structure

```
lichess/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── README.md           # This file
```

## How It Works

### Puzzle Loading

1. Fetches daily puzzle from Lichess API: `https://lichess.org/api/puzzle/daily`
2. Parses the puzzle PGN (game notation) to set up the position
3. Applies the first move from the solution (opponent's move)
4. User must find the best continuation

### Move Validation

1. User drags a piece to make a move
2. The move is validated against chess rules using `chess.js`
3. If valid, it's checked against the puzzle solution
4. Correct moves advance the puzzle; wrong moves reset the position
5. After each correct user move, the opponent's response plays automatically

### Stats Tracking

All stats are stored in localStorage:
- `blitzmate_elo`: Your chess rating
- `blitzmate_streak`: Current solving streak
- `blitzmate_total`: Total puzzles attempted
- `blitzmate_solved`: Total puzzles solved correctly

## API Reference

This app uses the Lichess Open API:

- **Endpoint**: `https://lichess.org/api/puzzle/daily`
- **Method**: GET
- **Response**: Daily puzzle with FEN, solution, rating, and game PGN
- **Rate Limit**: No authentication required for daily puzzle

## Customization

### Colors

Edit the `COLORS` object in `src/App.jsx` to customize the color scheme:

```javascript
const COLORS = {
  bg: 'bg-[#161512]',      // Background
  card: 'bg-[#262421]',    // Card backgrounds
  sidebar: 'bg-[#1e1e1e]', // Sidebar background
  // ... more colors
};
```

### Board Theme

The board uses Chessground's brown theme. To change it, modify the CSS link in `src/App.jsx`:

```javascript
// Change from brown to blue
theme.href = 'https://cdn.jsdelivr.net/npm/chessground@9.1.1/assets/chessground.blue.css';
```

Available themes: `brown`, `blue`, `canvas`, `wood`, `wood2`, `wood3`, `maple`

## Known Issues & Limitations

1. **API Limitation**: Currently uses the daily puzzle endpoint. For more variety, you could implement:
   - Random puzzle selection
   - Elo-based puzzle filtering
   - Backend proxy to access more API endpoints

2. **CORS**: Direct API calls work for the daily puzzle endpoint. For other endpoints, you may need a backend proxy.

3. **Mobile**: Touch controls work, but the UI is optimized for desktop screens.

## Future Enhancements

- [ ] Backend proxy for more puzzle variety
- [ ] User authentication and cloud storage
- [ ] Puzzle history and replay
- [ ] Leaderboard and social features
- [ ] Timer for each puzzle
- [ ] Puzzle themes (tactics, endgames, etc.)
- [ ] Analysis board after solving
- [ ] Dark/light theme toggle

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Lichess.org** - For the amazing open API and inspiration
- **Chessground** - For the excellent chess board component
- **chess.js** - For chess move validation and game logic

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Built with ♟️ by aspiring chess developers**

Inspired by Lichess.org • Powered by Lichess API
