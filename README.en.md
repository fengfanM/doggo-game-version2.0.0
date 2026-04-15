# 🐕 Doggo Game - A Fun Match-3 Game

A match-3 elimination game inspired by the classic "Sheep a Sheep", supporting both WeChat Mini Program and WeChat Mini Game platforms. Built with Taro + TypeScript (Mini Program version) and pure Canvas API (Mini Game version). Features adaptive layout for various screen sizes, multi-layer stacking, shuffle, undo, and more.

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

<p align="center">
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/fengfanM/doggo-game-version2.0.0/ci.yml?branch=main&style=flat-square&label=CI/CD" alt="CI/CD Status">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/fengfanM/doggo-game-version2.0.0?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/releases">
    <img src="https://img.shields.io/github/v/release/fengfanM/doggo-game-version2.0.0?style=flat-square" alt="Release">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/commits/main">
    <img src="https://img.shields.io/github/last-commit/fengfanM/doggo-game-version2.0.0?style=flat-square" alt="Last Commit">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0">
    <img src="https://img.shields.io/github/stars/fengfanM/doggo-game-version2.0.0?style=flat-square&logo=github" alt="Stars">
  </a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-documentation">Documentation</a> ·
  <a href="#-contributing">Contributing</a> ·
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/issues">Report Issues</a>
</p>

---

## 📌 Quick Links

| Resource | Link |
|----------|------|
| 📖 Full Documentation | [README.en.md](./README.en.md) |
| 📱 Mini Program Docs | [README.en.md](./README.en.md) |
| 🎮 Mini Game Docs | [mini-game/README.en.md](./mini-game/README.en.md) |
| 📝 Changelog | [CHANGELOG.en.md](./CHANGELOG.en.md) |
| 🤝 Contributing Guide | [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) |
| ⚖️ Code of Conduct | [CODE_OF_CONDUCT.en.md](./CODE_OF_CONDUCT.en.md) |
| 🔒 Security Policy | [SECURITY.en.md](./SECURITY.en.md) |
| 🐛 Report Bug | [Submit Issue](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose) |
| ✨ Feature Request | [Submit Feature Request](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose) |

---

## ⚠️ Original Work Statement

**This project is an original work, all rights reserved.**

- Any individual or organization **must** notify the author and obtain written authorization before copying, using, modifying, or distributing the code, documentation, or other resources of this project.
- Unauthorized copying, use, or distribution will be considered infringement, and the author reserves the right to pursue legal action.
- For cooperation or authorization, please contact the author via GitHub: https://github.com/fengfanM

---

## 📋 Table of Contents

- [Dual Platform Support](#-dual-platform-support)
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

## 📱 Dual Platform Support

This project supports two platforms:

### WeChat Mini Program Version (Recommended)
- **Tech Stack**: Taro 4.1.9 + TypeScript
- **Rendering**: React Components + Taro Framework
- **Features**: Clear code structure, easy to extend
- **Location**: Root directory (all files except `mini-game/`)

### WeChat Mini Game Version
- **Tech Stack**: Native JavaScript + Canvas API
- **Rendering**: Pure Canvas 2D rendering
- **Features**: Excellent performance, fast startup
- **Location**: `mini-game/` directory

---

## 🎮 Gameplay

### Basic Rules
1. **Tap Cards**: Tap cards in the game area to move them to the bottom slot
2. **Elimination**: When there are **3 identical cards** in the slot, they are automatically eliminated
3. **Lose Condition**: Game ends when the slot is full (7+ cards) with no possible matches
4. **Win Condition**: Eliminate all cards on the board to win

### Power-ups
- **🔄 Undo**: Undo your last move (2 per level)
- **🔀 Shuffle**: Randomly rearrange cards on the board (2 per level)

### Restart Mechanism
- **1st fail**: Free restart (refunds undo and shuffle counts)
- **2nd fail and beyond**: Share to WeChat group to get restart chance

---

## 🛠️ Tech Stack

### WeChat Mini Program Version
| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Taro | 4.1.9 |
| **Language** | TypeScript | 5.x |
| **Styling** | SCSS | - |
| **UI Components** | Taro UI | - |
| **Build Tool** | Webpack | - |
| **Target Platform** | WeChat Mini Program | - |

### WeChat Mini Game Version
| Category | Technology | Description |
|----------|-----------|-------------|
| **Rendering Engine** | Canvas API | Pure native Canvas rendering |
| **Language** | JavaScript | Native JS, no compilation needed |
| **Target Platform** | WeChat Mini Game | WeChat Mini Game environment |

---

## 📁 Project Structure

```
sheep/
├── src/                      # WeChat Mini Program source code
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
│   ├── utils/              # Utility functions
│   │   ├── game.ts         # Game core logic
│   │   ├── storage.ts      # Local storage
│   │   ├── sound.ts        # Sound management
│   │   └── dailyTasks.ts   # Daily tasks
│   ├── styles/             # Global styles
│   ├── app.ts              # App entry
│   └── app.config.ts       # App configuration
├── mini-game/               # WeChat Mini Game source code
│   ├── game.js             # Main game logic
│   ├── game.json           # Mini game configuration
│   ├── project.config.json # Project configuration
│   ├── utils.js            # Layout calculation utilities
│   ├── shuffle-utils.js    # Shuffle and stacking algorithms
│   ├── README.md           # Mini game docs (Chinese)
│   ├── README.en.md        # Mini game docs (English)
│   ├── UTILS_README.md     # Utility functions documentation
│   └── SHUFFLE_README.md   # Shuffle algorithm documentation
├── config/                 # Taro configuration
├── dist/                   # Build output
└── package.json
```

---

## 🧠 Core Features

### 1. Card Generation and Layout Algorithm

**Mini Program Version**: `src/utils/game.ts`

**Mini Game Version**: `mini-game/game.js` + `mini-game/shuffle-utils.js`

#### Key Features
- ✅ Ensure each card type count is a multiple of 3
- ✅ Randomize card positions for gameplay variety
- ✅ Layered design, upper layers cover lower layers
- ✅ Level 4 uses scattering algorithm to reduce pass rate
- ✅ Mini game uses smooth layer offset algorithm (cosine function)

---

### 2. Mini Game Version Features

Mini game version includes these additional features:

#### Smooth Layer Offset Algorithm
```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

#### Adaptive Layout
- Dynamic card size calculation
- Safe area adaptation
- Boundary constraints to prevent overflow

#### Modular Utilities
- `utils.js`: Layout calculation utilities
- `shuffle-utils.js`: Shuffle and stacking algorithms

---

## 🎯 Level Design

| Level | Card Types | Cards per Type | Total Cards | Layers | Difficulty | Target Pass Rate |
|-------|-------------|-----------------|-------------|--------|------------|-----------------|
| 1 | 3 | 6 | 18 | 2 | ⭐ Easy | > 90% |
| 2 | 5 | 9 | 45 | 3 | ⭐ Medium | > 70% |
| 3 | 7 | 9 | 63 | 4 | ⭐⭐⭐ Hard | < 30% |
| 4 | 10 | 9 | 90 | 6 | ⭐⭐⭐⭐⭐ Expert | < 5% |

### Level 4 Special Algorithm
- ✅ Same type cards scattered across different layers
- ✅ Increased card types and count
- ✅ Increased layers and layer offset
- ✅ Goal: Less than 5% of players can pass

---

## 🚀 Quick Start

### WeChat Mini Program Version

#### Requirements
- Node.js >= 16
- npm or yarn
- WeChat DevTools

#### Install Dependencies
```bash
npm install
```

#### Development Mode
```bash
npm run dev:weapp
```

#### Production Build
```bash
npm run build:weapp
```

#### WeChat DevTools
1. Open WeChat DevTools
2. Select "Mini Program"
3. Import project, select `dist` folder
4. Enter your Mini Program AppID

---

### WeChat Mini Game Version

#### Requirements
- WeChat DevTools
- WeChat Mini Game development access

#### Import Project
1. Open WeChat DevTools
2. Select "Mini Game"
3. Import project, select `mini-game` folder
4. Enter your Mini Game AppID
5. Click "Compile"

Detailed docs: [mini-game/README.en.md](./mini-game/README.en.md)

---

## 🤖 Automation Scripts

### Local Auto Commit & Push

Use auto commit script to complete git add → commit → push in one step:

```bash
# Method 1: Use npm script
npm run auto-commit "Your commit message"

# Method 2: Run script directly
./scripts/auto-commit.sh "Your commit message"

# Method 3: Without commit message (use default)
npm run auto-commit
```

**Script Features**:
- ✅ Auto check git status
- ✅ Auto add all modified files
- ✅ Auto create commit
- ✅ Auto pull latest code (avoid conflicts)
- ✅ Auto push to remote repo
- 🎨 Beautiful colored output

---

## 🔄 CI/CD Pipeline

Project has GitHub Actions CI/CD configured, runs automatically on every push or PR:

### CI/CD Task List
| Step | Description |
|------|-------------|
| 📥 Checkout code | Checkout code |
| 🟢 Setup Node.js | Setup Node.js environment |
| 📦 Install dependencies | Install dependencies |
| 🔍 TypeScript type check | TypeScript type check |
| 📝 ESLint check | Code style check |
| 🔨 Build project | Build project |
| ✅ Upload build artifacts | Upload build artifacts |

### View CI/CD Results
Visit: https://github.com/fengfanM/doggo-game-version2.0.0/actions

---

## 💻 Development Guide

### Code Checking & Formatting
```bash
# TypeScript type check
npm run typecheck

# ESLint check
npm run lint

# ESLint auto fix
npm run lint:fix

# Run tests
npm run test
```

### Add New Level
Modify `src/data/levels.ts` (Mini Program) or `mini-game/game.js` (Mini Game):
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
Modify emoji array in `src/utils/game.ts` (Mini Program) or `mini-game/game.js` (Mini Game):
```typescript
export const DOG_EMOJIS = [
  '🐕', '🐶', '🐩', '🦮', '🐕‍🦺',
  // ... add more emoji
];
```

### Modify Sound Effects
Modify `src/utils/sound.ts` (Mini Program):
```typescript
export const playSound = (type: SoundType) => {
  // Custom sound logic
};
```

---

## 🤝 Contributing

We welcome contributions of all kinds! 🙏

### How to Contribute

1. 🍴 Fork this repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✨ Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔍 Open a Pull Request

Detailed contributing guide: [CONTRIBUTING.en.md](./CONTRIBUTING.en.md).

### Issue Reporting

- 🐛 Report Bug: [Submit Issue](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose)
- ✨ Feature Request: [Submit Feature Request](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose)
- ❓ Questions: [GitHub Discussions](https://github.com/fengfanM/doggo-game-version2.0.0/discussions)

### Code of Conduct

Please adhere to [CODE_OF_CONDUCT.en.md](./CODE_OF_CONDUCT.en.md).

### Security Issues

Please report security issues via [SECURITY.en.md](./SECURITY.en.md).

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Thanks to everyone who has contributed to this project!

---

## 📞 Contact

- GitHub: https://github.com/fengfanM
- Project: https://github.com/fengfanM/doggo-game-version2.0.0

---

**If this project helps you, please give it a ⭐ Star!**

---

**Enjoy the game! 🎉**
