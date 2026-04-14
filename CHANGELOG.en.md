# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### To Do
- [ ] Add more levels
- [ ] Optimize card generation algorithm
- [ ] Add more sound effects
- [ ] Performance optimization

---

## [1.0.0] - 2026-04-14

### ✨ Added
- **Game Core Features**
  - Implemented 4 levels with increasing difficulty
  - Level 4 uses special dispersion algorithm, target win rate < 5%
  - Item system: Undo (2 uses), Shuffle (2 uses)
  - Restart mechanism: 1st free, subsequent require sharing
  - Share callback and auto-restart

- **User Interface**
  - Game main page
  - Level selection page
  - "My" page (includes game history, medal system)
  - "Dog King" medal feature (unlocked after clearing all levels)
  - Level progress bar (checkmark for each cleared level)

- **Technical Implementation**
  - Card generation and layout algorithm
  - Cover detection and click judgment
  - Timer feature (solved closure trap)
  - Local storage (game history, best time)
  - Sound management
  - TypeScript type support

- **Development Tools**
  - Local auto-commit script (`scripts/auto-commit.sh`)
  - GitHub Actions CI/CD pipeline
  - ESLint code checking
  - TypeScript type checking

### 📝 Documentation
- Added professional README.md
- Added MIT License
- Added original work statement
- Added automation script usage instructions
- Added CI/CD pipeline instructions

### 🐛 Fixed
- Fixed Level 2 `cardsPerType` to 6 (ensures multiple of 3)
- Fixed timer closure trap issue
- Fixed score update race condition
- Fixed restart logic (limited free attempts)
- Fixed share callback and auto-restart

---

## Versioning

### Version Types
- `MAJOR`: Incompatible API changes
- `MINOR`: Backward-compatible feature additions
- `PATCH`: Backward-compatible bug fixes

### Change Types
- `✨ Added`: New features
- `🔄 Changed`: Feature changes
- `🗑️ Deprecated`: Soon-to-be removed features
- `🐛 Removed`: Removed features
- `🔧 Fixed`: Bug fixes
- `⚡ Security`: Security fixes

---

[Unreleased]: https://github.com/fengfanM/doggo-game/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/fengfanM/doggo-game/releases/tag/v1.0.0
