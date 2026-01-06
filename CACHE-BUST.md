# How to See CSS Changes Immediately

## The Problem
Browsers cache CSS files aggressively. Even with version numbers, you might not see changes immediately.

## Solutions (Try in Order):

### 1. Hard Refresh (MOST IMPORTANT)
- **Windows/Linux**: Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: Press `Cmd + Shift + R`
- **Or**: Open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

### 2. Disable Cache in DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Disable cache" checkbox
4. Keep DevTools open while testing

### 3. Use Incognito/Private Mode
- Open site in private/incognito window
- This bypasses all cache

### 4. Clear Browser Cache
- Chrome: Settings → Privacy → Clear browsing data → Cached images and files
- Firefox: Settings → Privacy → Clear Data → Cached Web Content

### 5. Update Version Numbers
When making CSS changes, update the version in ALL HTML files:
- Change `styles.css?v=200` to `styles.css?v=201`
- Change `styles-mobile.css?v=200` to `styles-mobile.css?v=201`

## Current Version Numbers
- All pages now use: `v=200`
- Updated: Dec 8, 2025

## Verify Changes Are Live
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for `styles.css?v=200` - should show 200 status
5. Click on it → Response tab → Should show purple/pink color scheme



Cache bust: Tue Jan  6 11:01:14 CST 2026
Rebuild: Tue Jan  6 17:27:04 CST 2026
