# Dino-Mite! Project Index

## Quick Navigation

| Section | Description |
|---------|-------------|
| [Overview](#overview) | What this project is about |
| [Architecture](#architecture) | How the code is organized |
| [Key Files](#key-files) | Important files to know |
| [Data Flow](#data-flow) | How data moves through the app |

---

## Overview

**Dino-Mite!** is a kid-friendly educational website teaching dinosaur vocabulary to K4 (4-5 year old) children through interactive games and audio features.

### Target Audience
- **Primary**: K4 children (age 4-5)
- **Secondary**: Parents, teachers, early childhood educators

### Core Functionality
1. **Dinosaur Encyclopedia** - Browse 10 dinosaurs with images and facts
2. **Audio Learning** - Hear pronunciations and read-aloud content
3. **Vocabulary Games** - Interactive matching and quiz games

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        App.jsx                          │
│                    (React Router)                       │
└─────────────────────────┬───────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Home.jsx   │  │ DinoList.jsx │  │  Games.jsx   │
│  (Landing)   │  │   (Grid)     │  │   (Hub)      │
└──────────────┘  └──────┬───────┘  └──────┬───────┘
                         │                 │
                         ▼                 ▼
                  ┌──────────────┐  ┌──────────────┐
                  │DinoDetail.jsx│  │MatchingGame  │
                  │  (Info page) │  │ QuizGame     │
                  └──────────────┘  └──────────────┘
                         │                 │
                         ▼                 ▼
              ┌──────────────────────────────────┐
              │           Shared Utils           │
              │  speech.js │ soundEffects.js │   │
              │  backgroundMusic.js              │
              └──────────────────────────────────┘
```

---

## Key Files

### Entry Points
| File | Purpose |
|------|---------|
| `src/main.jsx` | React app bootstrap |
| `src/App.jsx` | Root component with routing |
| `src/index.css` | Global styles + Tailwind theme |

### Pages
| File | Route | Description |
|------|-------|-------------|
| `src/pages/Home.jsx` | `/` | Hero banner + featured dino |
| `src/pages/DinoList.jsx` | `/dinos` | Grid of 10 dinosaur cards |
| `src/pages/DinoDetail.jsx` | `/dinos/:id` | Individual dinosaur page |
| `src/pages/Games.jsx` | `/games` | Game selection hub |

### Components
| File | Description |
|------|-------------|
| `src/components/SpeakButton.jsx` | Pronunciation speaker button |
| `src/components/MusicToggle.jsx` | Background music on/off |
| `src/components/games/MatchingGame.jsx` | Picture-name matching |
| `src/components/games/QuizGame.jsx` | Multiple choice quiz |

### Data
| File | Description |
|------|-------------|
| `src/data/dinosaurs.js` | Array of 10 dinosaur objects |

### Utilities
| File | Description |
|------|-------------|
| `src/utils/speech.js` | Web Speech API wrapper |
| `src/utils/soundEffects.js` | Game sound effect generator |
| `src/utils/backgroundMusic.js` | Background music player |

---

## Data Flow

### Dinosaur Data Structure
```javascript
{
  id: 't-rex',
  name: 'Tyrannosaurus Rex',
  nickname: 'The King',
  period: 'Late Cretaceous',
  diet: 'Carnivore',
  funFact: 'I have the strongest bite of any land animal!',
  image: dinoTrex,  // imported PNG
  color: 'bg-green-100',
  borderColor: 'border-green-400'
}
```

### Audio Flow
```
User clicks 🔊 → SpeakButton → speech.pronounceName()
                                    ↓
                           Web Speech API
                                    ↓
                         US English voice output
```

### Game Flow
```
Game Start → Random dinosaur selection
     ↓
User interaction → checkMatch() / handleAnswer()
     ↓
Correct? → soundFx.playCorrect() → Update score
Wrong?   → soundFx.playWrong()   → Show feedback
     ↓
All matched? → soundFx.playVictory() → Show celebration
```

---

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build settings |
| `tailwind.config.js` | Custom colors & fonts |
| `postcss.config.js` | PostCSS + Tailwind v4 |
| `eslint.config.js` | Code linting rules |

---

## Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build to /dist
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

*Last updated: 2026-01-12*
