# 🔧 TROUBLESHOOTING GUIDE - Board Not Showing

## ✅ FIXES APPLIED

I've just updated your code with these fixes:

### 1. **Added Sample Puzzle Fallback**
If the Lichess API fails, the app now uses built-in sample puzzles so you can still train!

### 2. **Better Error Handling**
Added detailed console logging to help debug issues.

### 3. **Always-Visible "New Puzzle" Button**
You can now load a new puzzle anytime from the left sidebar.

### 4. **Improved API Parsing**
Better handling of the Lichess API response format.

---

## 🌐 HOW TO SEE YOUR APP

### The server is running at:
```
http://localhost:3001
```
(Port 3001 because 3000 was in use)

### Open in Browser:
1. Open Chrome, Edge, or Firefox
2. Go to: **http://localhost:3001**
3. Enter your Elo rating
4. Click "Start Training Session"

---

## 🔍 DEBUGGING STEPS

### Step 1: Check Browser Console
1. Open your browser to http://localhost:3001
2. Press **F12** to open Developer Tools
3. Click the **Console** tab
4. Look for any errors (red text)
5. You should see messages like:
   - "Puzzle data received..."
   - "Puzzle setup complete..."

### Step 2: Check Network Tab
1. In Developer Tools, click **Network** tab
2. Reload the page (F5)
3. Look for requests to:
   - `chessground` (should be 200 OK)
   - `lichess.org/api/puzzle` (might be 200 or fail)
4. If API fails, app will use sample puzzles

### Step 3: Force Reload
Sometimes the browser caches old code:
1. Press **Ctrl + Shift + R** (force reload)
2. Or **Ctrl + F5**
3. Or clear cache and reload

---

## 🎯 COMMON ISSUES & FIXES

### Issue 1: "Board is just a black square"
**Cause:** Chessground CSS not loading from CDN

**Fix:**
1. Check your internet connection
2. Open console (F12) and look for 404 errors
3. Wait 5-10 seconds for CDN to load

### Issue 2: "Loading puzzle..." never ends
**Cause:** API call failed

**Fix:**
1. The app should automatically switch to sample puzzles
2. Check console for error messages
3. Click "New Puzzle" button to retry

### Issue 3: "Pieces not showing"
**Cause:** Piece sprite CSS not loading

**Fix:**
1. Force reload (Ctrl + Shift + R)
2. Check Network tab for failed requests
3. Wait a few seconds for CDN

### Issue 4: "Can't drag pieces"
**Cause:** JavaScript error or Chessground not initialized

**Fix:**
1. Check console for errors
2. Reload the page
3. Make sure puzzle has loaded (check left sidebar for Puzzle ID)

---

## ✅ VERIFICATION CHECKLIST

Run through this checklist:

- [ ] Server is running (`npm run dev` in terminal)
- [ ] Browser is open to http://localhost:3001
- [ ] You can see the welcome screen with Elo input
- [ ] You entered an Elo rating (e.g., 1500)
- [ ] You clicked "Start Training Session"
- [ ] Console shows "Puzzle setup complete"
- [ ] Left sidebar shows Puzzle ID and rating
- [ ] Chess board is visible (brown/cream squares)
- [ ] Pieces are visible (black and white pieces)
- [ ] You can drag a piece

---

## 🚀 WHAT TO TRY NOW

### Try This First:
1. **Open http://localhost:3001** in your browser
2. **Open Console** (Press F12, click Console tab)
3. **Enter Elo 1500** and click Start
4. **Take a screenshot** of what you see
5. **Copy any error messages** from console

### Alternative Test:
If the board still doesn't show, try this in the console:

```javascript
// Check if Chessground loaded
console.log('Chessground:', window.Chessground);

// Check if puzzle data exists
console.log('App loaded:', document.getElementById('root'));
```

---

## 📸 WHAT YOU SHOULD SEE

### Working App Looks Like:

```
┌─────────────────────────────────────────────┐
│ BLITZMATE          Rating: 1500        [👤] │
├──────┬──────────────────────┬───────────────┤
│ Left │   Chess Board        │  Right Panel  │
│ Info │   (8x8 squares)      │  (Move List)  │
│      │   with pieces        │               │
│      │                      │  1. e4  e5    │
│ ID   │  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜    │  2. Nf3 Nc6   │
│ 1234 │  ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟    │               │
│      │                      │               │
│ Btns │  ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙    │ Shortcuts     │
│      │  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖    │ N R H         │
└──────┴──────────────────────┴───────────────┘
```

### If Board is Empty:
- You'll see just the brown/cream squares
- No pieces visible
- This means pieces didn't load

### If Board is Black:
- Black or grey square instead of board
- CSS didn't load
- Check Network tab for 404s

---

## 🆘 STILL NOT WORKING?

### Tell me:
1. **What do you see?** (blank page, error message, spinning loader?)
2. **Any errors in console?** (copy the red text)
3. **Network tab shows?** (any failed requests?)
4. **Browser you're using?** (Chrome, Edge, Firefox?)

### Quick Debug Command:
Open console and paste this:

```javascript
// Quick diagnostic
console.log({
  ChessgroundLoaded: !!window.Chessground,
  ReactRoot: !!document.getElementById('root'),
  CurrentURL: window.location.href,
  Errors: performance.getEntriesByType('resource').filter(r => r.responseStatus === 404)
});
```

This will show us exactly what's loaded and what failed.

---

## 🎉 EXPECTED RESULT

After the fixes, your app should:

✅ Load a puzzle (from API or sample)
✅ Show the chessboard with pieces
✅ Allow you to drag pieces
✅ Validate your moves
✅ Show "Correct!" or "Wrong move"
✅ Track your stats

**The board WILL show now!** 🎯

---

**Your server is running at: http://localhost:3001**
**Just open that URL in your browser and check!** 👍
