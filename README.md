# Blitzmate - Chess Puzzle Trainer

A professional, mobile-responsive chess puzzle trainer built with React and TypeScript. Train chess tactics with puzzles matched to your skill level.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Rating-Based Matching**: Puzzles matched within ±100 of your rating
- **4 Board Themes**: Classic, Blue, Green, and Purple color schemes
- **Mobile Optimized**: Fully responsive design, playable on any device
- **Streak Tracking**: Track your progress and accuracy
- **Keyboard Shortcuts**: H (Hint), R (Retry), N (Next)
- **Smooth Animations**: Professional UI with smooth transitions
- **Error Handling**: Built-in error boundary for stability
- **Production Ready**: Optimized builds with code splitting

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **chess.js** - Chess logic
- **react-chessboard** - Board rendering

## 📱 Mobile Support

Blitzmate is fully optimized for mobile devices:

- **Touch Controls**: Tap to select pieces, tap again to move
- **Responsive Layout**: Adapts to any screen size
- **Safe Area Support**: Works perfectly on devices with notches
- **Touch Optimization**: Optimized touch targets (44px minimum)
- **No Zoom**: Prevents accidental zooming during gameplay
- **Gesture Support**: Drag and drop pieces with your finger

### Mobile Tips

1. Play in portrait mode for the best experience
2. Use the mobile control bar at the bottom for quick actions
3. Puzzle info appears above the board on mobile
4. Theme selector adapts to smaller screens

## 🎮 How to Play

1. **Enter Your Rating**: Start by entering your current chess rating
2. **Solve Puzzles**: Find the best move in each position
3. **Get Feedback**: Instant feedback on your moves
4. **Track Progress**: Monitor your streak and accuracy
5. **Customize**: Choose from 4 different board themes

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/AmanVilvas/BlitzMate-trainer.git

# Navigate to project directory
cd BlitzMate-trainer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Build Output

Production build generates optimized chunks:
- `index.html`: ~4 KB
- `index.css`: ~26 KB (gzipped: 5.8 KB)
- `react-vendor.js`: ~133 KB (gzipped: 42.75 KB)
- `chess-vendor.js`: ~141 KB (gzipped: 40.56 KB)
- `index.js`: ~42 KB (gzipped: 10.85 KB)

Total gzipped size: ~100 KB

## 🎯 Keyboard Shortcuts

- `H` - Get a hint
- `R` - Retry puzzle
- `N` - Next puzzle
- `ESC` - Close theme selector

## 🎨 Board Themes

1. **Classic** - Traditional brown and beige
2. **Blue** - Cool blue tones
3. **Green** - Lichess-inspired green
4. **Purple** - Modern purple accent

## 📊 Puzzle Database

- 50+ curated puzzles
- Rating range: 500-2300
- Multiple themes: tactics, endgame, middlegame
- Real Lichess puzzle data

## 🔧 Development

```bash
# Start dev server (auto-opens browser)
npm run dev

# Type checking
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Drag and drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
# Build
npm run build

# Deploy dist folder to gh-pages branch
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or building your own chess trainer.

## 🙏 Acknowledgments

- Puzzle data from [Lichess](https://lichess.org)
- Chess piece images from standard chess fonts
- Inspired by Lichess puzzle trainer

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ♟️ by [AmanVilvas](https://github.com/AmanVilvas)
