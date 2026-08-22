# ✦ Our Universe · 23 Chapters

A private, cinematic anniversary experience for Alinah Joyce V. Francisco.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Build for Production (Vercel)

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 🎵 Adding Music (Iris — Goo Goo Dolls)

1. Download the song as an MP3 file.
2. Rename it to `iris.mp3`
3. Place it at: `public/assets/audio/iris.mp3`

The audio toggle will automatically appear after the experience starts.

---

## 📸 Adding Your Photo (Chapter 23)

1. Prepare your couple photo — recommended: 3:4 portrait ratio
2. Save it as `us.webp` (or `us.jpg` — update the src in `FinalReveal.tsx` if needed)
3. Place it at: `public/assets/photo/us.webp`

The photo appears exclusively in Chapter 23.

---

## 🔐 The Puzzle Answers (for you, the creator)

| Chapter | Title | Answer |
|---------|-------|--------|
| 01 | The First Star | mlbb / mobile legends |
| 02 | The Follow | follow |
| 03 | First Conversations | online |
| 04 | Instagram | instagram |
| 05 | Hidden Identity | ella |
| 06 | The Search | typhoon / bagyo |
| 07 | Francisco? | francisco |
| 08 | Joyce | joyce |
| 09 | The Wrong Photo | B (her cousin) |
| 10 | The Crush | truth or dare |
| 11 | Favorite Things | D (all of the above) |
| 12 | MLBB Duo | duo |
| 13 | Late-Night Talks | tawanan |
| 14 | Birthdays & New Year | C (both) |
| 15 | The Hard Days | surgery |
| 16 | Distance | distance / layo |
| 17 | Difficult Days | stay (decode: 19-20-1-25) |
| 18 | Choosing Each Other | communicate / stay |
| 19 | College | college |
| 20 | Keep Going | time management |
| 21 | Our Future | future / together |
| 22 | The Last Star | palangga (after lighting all 22 stars) |
| 23 | For You | No puzzle — the final letter |

---

## 🛠 Customizing Answers

Edit `src/chapters/chapterData.ts` — find the chapter and update the `answers` array.
All answers are case-insensitive and trimmed automatically.

---

## ⚙️ Tech Stack

- React 18 + TypeScript
- Vite (fast builds)
- Tailwind CSS (styling)
- GSAP (animations)
- React Router v6 (routing)
- HTML5 Canvas (star field)
- LocalStorage (progress persistence)

---

## 🌌 File Structure

```
public/assets/
  backgrounds/   ← Cosmic images (already included)
  audio/         ← Add iris.mp3 here
  photo/         ← Add us.webp here

src/
  chapters/      ← All 23 chapter definitions
  components/    ← Puzzle engine, cosmic bg, progress
  context/       ← Game state (progress, music)
  pages/         ← Entry, Chapter, Cinematic, FinalReveal
  systems/       ← Progress persistence, answer validation
  types/         ← TypeScript interfaces
```

---

*Two people. Two places. One universe. 23 chapters. One final message.*

*Happy 1st Anniversary — 23 · 08 · 2026*
