# 🐕 Doggo Game - A Fun Match-3 Game

A WeChat Mini Program game developed with Taro framework, inspired by the classic "Sheep a Sheep" gameplay, bringing you a unique matching experience!

<p align="center">
  <a href="README.md">中文</a> |
  <a href="README.en.md">English</a>
</p>

---

## 🎬 Game Demo

<p align="center">
  <img src="https://via.placeholder.com/800x600?text=Game+Demo+GIF" alt="Game Demo" width="600">
</p>

### How to add your game demo GIF

1. **Record gameplay video**: Record the game in WeChat DevTools or on a real device
2. **Convert to GIF**: Use tools to convert video to GIF (recommended: Kap, ScreenToGif, ffmpeg)
3. **Upload to repo**: Place the GIF file in the `assets/` directory (create it first)
4. **Update README**: Modify the image link above to your GIF file path

**Example:**
```markdown
<p align="center">
  <img src="./assets/demo.gif" alt="Game Demo" width="600">
</p>
```

---

<p align="center">
  <a href="https://github.com/fengfanM/doggo-game/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/fengfanM/doggo-game/ci.yml?branch=main&style=flat-square&label=CI/CD" alt="CI/CD Status">
  </a>
  <a href="https://github.com/fengfanM/doggo-game/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/fengfanM/doggo-game?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/fengfanM/doggo-game/releases">
    <img src="https://img.shields.io/github/v/release/fengfanM/doggo-game?style=flat-square" alt="Release">
  </a>
  <a href="https://github.com/fengfanM/doggo-game/commits/main">
    <img src="https://img.shields.io/github/last-commit/fengfanM/doggo-game?style=flat-square" alt="Last Commit">
  </a>
  <a href="https://github.com/fengfanM/doggo-game">
    <img src="https://img.shields.io/github/stars/fengfanM/doggo-game?style=flat-square&logo=github" alt="Stars">
  </a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-documentation">Documentation</a> ·
  <a href="#-contributing">Contributing</a> ·
  <a href="https://github.com/fengfanM/doggo-game/issues">Report Issues</a>
</p>

---

## 📌 Quick Links

| Resource | Link |
|----------|------|
| 📖 Full Documentation | [README.en.md](./README.en.md) |
| 📝 Changelog | [CHANGELOG.en.md](./CHANGELOG.en.md) |
| 🤝 Contributing Guide | [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) |
| ⚖️ Code of Conduct | [CODE_OF_CONDUCT.en.md](./CODE_OF_CONDUCT.en.md) |
| 🔒 Security Policy | [SECURITY.en.md](./SECURITY.en.md) |
| 🐛 Report Bug | [Submit Issue](https://github.com/fengfanM/doggo-game/issues/new/choose) |
| ✨ Feature Request | [Submit Feature Request](https://github.com/fengfanM/doggo-game/issues/new/choose) |

---

## ⚠️ Original Work Statement

**This project is an original work, all rights reserved.**

- Any individual or organization **must** notify the author and obtain written authorization before copying, using, modifying, or distributing the code, documentation, or other resources of this project.
- Unauthorized copying, use, or distribution will be considered infringement, and the author reserves the right to pursue legal action.
- For cooperation or authorization, please contact the author via GitHub: https://github.com/fengfanM

---

## 📋 Table of Contents

- [Gameplay](#-gameplay)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [Level Design](#-level-design)
- [Quick Start](#-quick-start)
- [Automation Scripts](#-automation-scripts)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Development Guide](#-development-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎮 Gameplay

### Basic Rules
1. **Click Cards**: Click cards in the game area to move them to the bottom slot
2. **Match Rule**: When there are **3 cards of the same type** in the slot, they are automatically eliminated
3. **Lose Condition**: Game over when the slot is full (more than 7 cards) and cannot be eliminated
4. **Win Condition**: Eliminate all cards on the board to win

### Item System
- **🔄 Undo**: Undo the last move (2 uses per level)
- **🔀 Shuffle**: Randomly shuffle card positions (2 uses per level)

### Restart Mechanism
- **1st failure**: Free restart (refund undo and shuffle uses)
- **2nd failure and beyond**: Need to share to WeChat groups to get restart opportunities

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Taro | 4.1.9 |
| **Language** | TypeScript | 5.x |
| **Styling** | SCSS | - |
| **UI Components** | Taro UI | - |
| **Build Tool** | Webpack | - |
| **Target Platform** | WeChat Mini Program | - |

---

## 📁 Project Structure

```
sheep/
├── src/
│   ├── pages/              # Pages
│   │   ├── game/           # Game main page
│   │   ├── level/          # Level selection page
│   │   └── mine/           # My page
│   ├── components/         # Components
│   │   ├── GameCard/       # Game card component
│   │   ├── GameBoard/      # Game board component
│   │   └── CardSlot/       # Card slot component
│   ├── data/               # Data
│   │   └── levels.ts       # Level configuration
│   ├── utils/              # Utilities
│   │   ├── game.ts         # Game core logic
│   │   ├── storage.ts      # Local storage
│   │   ├── sound.ts        # Sound management
│   │   └── dailyTasks.ts   # Daily tasks
│   ├── styles/             # Global styles
│   ├── app.ts              # App entry
│   └── app.config.ts       # App config
├── config/                 # Taro config
├── dist/                   # Build output
└── package.json
```

---

## 🧠 Core Features

### 1. Card Generation and Layout Algorithm

**File**: `src/utils/game.ts`

#### Key Process
```typescript
// 1. Generate card pool based on level config
const iconPool = DOG_EMOJIS.slice(0, config.types);
const cards: Card[] = [];
for (let i = 0; i < config.types; i++) {
  for (let j = 0; j < config.cardsPerType; j++) {
    cards.push({
      id: `${i}-${j}`,
      type: iconPool[i]
    });
  }
}

// 2. Shuffle cards randomly
const shuffledCards = shuffleArray(cards);

// 3. Place cards in layers (upper layers cover lower layers)
for (let layer = 0; layer < config.layers; layer++) {
  // Calculate card positions for each layer
  // Add offset for staggered layout
}

// 4. Special level algorithm (Level 4)
// Disperse same-type cards across different layers to increase difficulty
```

#### Key Features
- ✅ Ensure each card type count is a multiple of 3
- ✅ Randomize card positions for replayability
- ✅ Layered design with upper layers covering lower
- ✅ Level 4 uses dispersion algorithm to lower win rate

---

### 2. Cover Detection and Click Judgment

**File**: `src/utils/game.ts` - `checkCover` function

```typescript
export function checkCover(cards: Card[]): Card[] {
  cards.forEach(card => {
    card.isCovered = false;
    card.coveringCards = [];
  });

  // For each card, check if any other card covers it
  cards.forEach((cardA, indexA) => {
    cards.forEach((cardB, indexB) => {
      if (indexA === indexB) return;
      
      // Check if overlapping and cardB is above cardA
      const isOverlapping = checkOverlap(cardA, cardB);
      const isAbove = cardB.layer > cardA.layer;
      
      if (isOverlapping && isAbove) {
        cardA.isCovered = true;
        cardA.coveringCards!.push(cardB.id);
      }
    });
  });

  return cards;
}
```

---

### 3. Game State Management

**File**: `src/pages/game/index.tsx`

| State | Description |
|-------|-------------|
| `cards` | All cards on board |
| `slot` | Cards in slot |
| `score` | Current score |
| `undoCount` | Remaining undo uses |
| `shuffleCount` | Remaining shuffle uses |
| `gamePaused` | Is game paused |
| `showLoseModal` | Show lose modal |
| `showWinModal` | Show win modal |
| `failCount` | Fail count (controls restart logic) |
| `hasShared` | Has shared (controls restart logic) |
| `elapsedTime` | Game elapsed time (seconds) |

---

### 4. Timer Implementation

**Solving closure trap**: Use `useRef` to store latest state

```typescript
const gameStateRef = useRef({
  gamePaused,
  showLoseModal,
  showWinModal,
  showStartScreen
});

useEffect(() => {
  gameStateRef.current = {
    gamePaused,
    showLoseModal,
    showWinModal,
    showStartScreen
  };
}, [gamePaused, showLoseModal, showWinModal, showStartScreen]);

useEffect(() => {
  timerRef.current = setInterval(() => {
    const { gamePaused, showLoseModal, showWinModal, showStartScreen } = gameStateRef.current;
    if (!gamePaused && !showLoseModal && !showWinModal && !showStartScreen) {
      setElapsedTime(prev => prev + 1);
    }
  }, 1000);
  
  return () => clearInterval(timerRef.current);
}, []);
```

---

### 5. Share Callback and Auto-Restart

**File**: `src/pages/game/index.tsx`

```typescript
// Global ref to update state in onShareAppMessage
let setHasSharedRef: ((value: boolean) => void) | null = null;

export const onShareAppMessage = () => {
  try {
    Taro.setStorageSync(SHARE_STORAGE_KEY, Date.now());
    if (setHasSharedRef) {
      setHasSharedRef(true);
    }
    Taro.showToast({ title: 'Share successful!', icon: 'success', duration: 1000 });
  } catch (e) {
    console.error('Failed to save share state:', e);
  }
  return { title: '🐕 Doggo Game', path: '/pages/index/index' };
};

// Set ref in component
useEffect(() => {
  setHasSharedRef = setHasShared;
  return () => {
    setHasSharedRef = null;
  };
}, []);

// Listen for share state and auto-restart
useEffect(() => {
  if (hasShared && showLoseModal) {
    handleLoseConfirm();
  }
}, [hasShared, showLoseModal]);
```

---

## 🎯 Level Design

| Level | Types | Cards per Type | Total Cards | Layers | Difficulty | Target Win Rate |
|-------|-------|-----------------|-------------|--------|------------|-----------------|
| 1 | 3 | 6 | 18 | 2 | ⭐ Easy | > 90% |
| 2 | 5 | 6 | 30 | 3 | ⭐ Easy | > 70% |
| 3 | 7 | 9 | 63 | 4 | ⭐⭐⭐ Hard | < 30% |
| 4 | 12 | 15 | 180 | 8 | ⭐⭐⭐⭐⭐ Expert | < 5% |

### Level 4 Special Algorithm
- ✅ Same-type cards dispersed across different layers
- ✅ Increased card types and count
- ✅ Increased layers and layer offset
- ✅ Goal: < 5% of players can clear

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm or yarn
- WeChat DevTools

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev:weapp
```

### Production Build
```bash
npm run build:weapp
```

### WeChat DevTools
1. Open WeChat DevTools
2. Select "Import Project"
3. Project directory: select `dist` folder
4. AppID: enter your Mini Program AppID

---

## 🤖 Automation Scripts

### Local Auto-Commit and Push

Use the auto-commit script to complete git add → commit → push in one step:

```bash
# Method 1: Use npm script
npm run auto-commit "Your commit message"

# Method 2: Run script directly
./scripts/auto-commit.sh "Your commit message"

# Method 3: Without commit message (uses default)
npm run auto-commit
```

**Script Features**:
- ✅ Auto-check git status
- ✅ Auto-add all modified files
- ✅ Auto-create commit
- ✅ Auto-pull latest code (avoid conflicts)
- ✅ Auto-push to remote
- 🎨 Beautiful colored output

---

## 🔄 CI/CD Pipeline

Project is configured with GitHub Actions CI/CD pipeline, automatically runs on every push or Pull Request:

### CI/CD Tasks
| Step | Description |
|------|-------------|
| 📥 Checkout code | Checkout repository |
| 🟢 Setup Node.js | Setup Node.js environment |
| 📦 Install dependencies | Install dependencies with npm ci |
| 🔍 TypeScript type check | TypeScript type checking |
| 📝 ESLint check | Code style checking |
| 🔨 Build project | Build WeChat Mini Program |
| ✅ Upload build artifacts | Upload build artifacts |

### View CI/CD Results
Visit: https://github.com/fengfanM/doggo-game/actions

---

## 💻 Development Guide

### Code Linting and Formatting
```bash
# TypeScript type check
npm run typecheck

# ESLint code check
npm run lint

# ESLint auto-fix
npm run lint:fix

# Run tests
npm run test
```

### Add New Level
Modify `src/data/levels.ts`:
```typescript
const levelConfig = [
  // ... existing levels
  {
    types: 10,        // Number of card types
    cardsPerType: 12, // Cards per type (must be multiple of 3)
    layers: 6,        // Number of layers
    layerOffset: 30   // Layer offset (pixels)
  }
];
```

### Add New Cards
Modify `DOG_EMOJIS` array in `src/utils/game.ts`:
```typescript
export const DOG_EMOJIS = [
  '🐕', '🐶', '🐩', '🦮', '🐕‍🦺',
  // ... add more emojis
];
```

### Modify Sounds
Modify `src/utils/sound.ts`:
```typescript
export const playSound = (type: SoundType) => {
  // Custom sound logic
};
```

---

## 🤝 Contributing

We welcome contributions of any kind! 🙏

### How to Contribute

1. 🍴 Fork this repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✨ Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔍 Open a Pull Request

See [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) for detailed guidelines.

### Issue Feedback

- 🐛 Report Bug: [Submit Issue](https://github.com/fengfanM/doggo-game/issues/new/choose)
- ✨ Feature Request: [Submit Feature Request](https://github.com/fengfanM/doggo-game/issues/new/choose)
- ❓ Questions/Discussions: [GitHub Discussions](https://github.com/fengfanM/doggo-game/discussions)

### Code of Conduct

Please follow [CODE_OF_CONDUCT.en.md](./CODE_OF_CONDUCT.en.md) when participating in this project.

### Security Issues

Please refer to [SECURITY.en.md](./SECURITY.en.md) to report security issues.

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Thanks to everyone who has contributed to this project!

---

## 📞 Contact

- GitHub: https://github.com/fengfanM
- Project: https://github.com/fengfanM/doggo-game

---

**If this project helps you, please give it a ⭐ Star!**

---

**Enjoy the game! 🎉**
