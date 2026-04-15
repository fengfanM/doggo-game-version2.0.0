# 🐕 Dog Go Dog - WeChat Mini Game Version

A match-3 elimination game based on Canvas rendering, inspired by the classic "Sheep a Sheep" game. Developed with pure native Canvas API for excellent performance!

---

## 📌 GitHub Project Description

**Recommended GitHub Project Description:**

> A match-3 elimination game inspired by the classic "Sheep a Sheep", supporting both WeChat Mini Program and WeChat Mini Game platforms. Built with Taro + TypeScript (Mini Program version) and pure Canvas API (Mini Game version). Features adaptive layout for various screen sizes, multi-layer stacking, shuffle, undo, and more.

---

## 🎬 Game Demo

<p align="center">
  <img src="https://via.placeholder.com/800x600?text=Game+Demo+GIF" alt="Game Demo" width="600">
</p>

---

## 🎮 How to Play

### Basic Rules
1. **Tap Cards**: Tap cards in the game area to move them to the bottom slot
2. **Elimination**: When there are **3 identical cards** in the slot, they are automatically eliminated
3. **Lose Condition**: Game ends when the slot is full (7+ cards) with no possible matches
4. **Win Condition**: Eliminate all cards on the board to win

### Power-ups
- **🔄 Undo**: Undo your last move (2 per level)
- **🔀 Shuffle**: Randomly rearrange cards on the board (2 per level)

---

## 🛠️ Tech Stack

| Category | Technology | Description |
|----------|-----------|-------------|
| **Rendering** | Canvas API | Pure native Canvas rendering |
| **Language** | JavaScript | Native JS, no compilation needed |
| **Platform** | WeChat Mini Game | WeChat Mini Game environment |

---

## ✨ Key Features

### 1. Adaptive Layout
- ✅ Supports various screen sizes
- ✅ Safe area adaptation (notch screens, hole-punch displays)
- ✅ Dynamic card size calculation
- ✅ Boundary constraints to prevent overflow

### 2. Multi-layer Stacking Algorithm
- ✅ Smooth layer offset calculation (cosine function)
- ✅ Random offset per layer for realism
- ✅ Semi-transparent display for covered cards
- ✅ Precise occlusion detection

### 3. Modular Utility Functions
- ✅ Layout calculation utilities (`utils.js`)
- ✅ Shuffle and stacking algorithms (`shuffle-utils.js`)
- ✅ Detailed usage documentation
- ✅ Reusable independent modules

---

## 📁 Project Structure

```
mini-game/
├── game.js                 # Main game logic
├── game.json               # Mini game configuration
├── project.config.json     # Project configuration
├── utils.js                # Layout calculation utilities
├── shuffle-utils.js        # Shuffle and stacking algorithms
├── README.md               # This document (Chinese)
├── README.en.md            # This document (English)
├── UTILS_README.md         # Utility functions documentation
└── SHUFFLE_README.md       # Shuffle algorithm documentation
```

---

## 🧠 Core Implementations

### 1. Smooth Layer Offset Algorithm

Uses cosine function for natural layer offset progression:

```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

**Effect:**
- Lower layers stack more tightly
- Upper layers stack more loosely
- Creates a natural pyramid shape

### 2. Card Boundary Constraints

```javascript
const bounds = {
  minX: layout.leftPadding,
  maxX: canvas.width - layout.rightPadding - cellWidth,
  minY: layout.topPadding + 80,
  maxY: canvas.height - layout.bottomPadding - 200 - layout.tabBarHeight - cellHeight
};

cardX = Math.max(bounds.minX, Math.min(cardX, bounds.maxX));
cardY = Math.max(bounds.minY, Math.min(cardY, bounds.maxY));
```

### 3. Dynamic Card Sizing

```javascript
function calculateCardSize(availableWidth, availableHeight, cols, rows) {
  const baseCellSize = Math.min(availableWidth / (cols + 2), availableHeight / (rows + 2), 70);
  const minCellSize = Math.min(50, availableWidth / cols, availableHeight / rows);
  const cellWidth = Math.max(baseCellSize, minCellSize);
  return { cellWidth, cellHeight: cellWidth };
}
```

---

## 🎯 Level Design

| Level | Card Types | Cards per Type | Total Cards | Layers | Difficulty |
|-------|------------|----------------|-------------|--------|-----------|
| 1 | 3 | 6 | 18 | 2 | ⭐ Easy |
| 2 | 5 | 9 | 45 | 3 | ⭐ Medium |
| 3 | 7 | 9 | 63 | 4 | ⭐⭐⭐ Hard |
| 4 | 10 | 9 | 90 | 6 | ⭐⭐⭐⭐⭐ Expert |

---

## 🚀 Quick Start

### Requirements
- WeChat Developer Tools
- WeChat Mini Game development access

### Import Project

1. **Open WeChat Developer Tools**
2. **Select "Mini Game"**
3. **Import Project**
   - Project directory: Select the `mini-game` folder
   - AppID: Enter your Mini Game AppID
4. **Click "Compile"**

### Project Configuration

**game.json**
```json
{
  "deviceOrientation": "portrait",
  "showStatusBar": false,
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  }
}
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [README.en.md](./README.en.md) | Mini Game version (English) |
| [README.md](./README.md) | Mini Game version (Chinese) |
| [UTILS_README.md](./UTILS_README.md) | Layout utility functions |
| [SHUFFLE_README.md](./SHUFFLE_README.md) | Shuffle algorithm documentation |

---

## 🤝 Contributing

We welcome contributions of all kinds!

### How to Contribute

1. 🍴 Fork this repository
2. 🌿 Create your feature branch
3. ✨ Commit your changes
4. 📤 Push to the branch
5. 🔍 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

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
