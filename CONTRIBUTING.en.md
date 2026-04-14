# Contributing Guide

Thank you for your interest in contributing to this project! 🎉

Before you start, please take a few minutes to read the following guidelines, which will help us collaborate better.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Development Workflow](#-development-workflow)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Guide](#-pull-request-guide)
- [Issue Feedback](#-issue-feedback)

---

## 🤝 Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.en.md) code of conduct. By participating, you are expected to uphold this code.

---

## 🚀 How to Contribute

### 1. Submit an Issue
If you find a bug, have a feature suggestion, or other questions, please first search [Issues](https://github.com/fengfanM/doggo-game/issues) to see if there's already a related discussion. If not, please create a new Issue.

### 2. Submit a Pull Request
If you want to contribute code directly, please follow the [Development Workflow](#-development-workflow) below.

---

## 💻 Development Workflow

### 1. Fork the Repository
Fork this repository to your own GitHub account.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/doggo-game.git
cd doggo-game
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create a Branch
Please create a new feature branch from `main`:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 5. Develop
Develop on your branch, please ensure:
- Consistent code style
- Add necessary comments
- Update related documentation (if needed)

### 6. Run Checks
```bash
# TypeScript type check
npm run typecheck

# ESLint code check
npm run lint

# Build project
npm run build:weapp
```

### 7. Commit
Please use meaningful commit messages, refer to [Commit Guidelines](#-commit-guidelines).

### 8. Push Branch
```bash
git push origin feature/your-feature-name
```

### 9. Create Pull Request
Create a Pull Request on GitHub and fill in the PR template information.

---

## 📝 Commit Guidelines

We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Types
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation update |
| `style` | Code style adjustment (doesn't affect code execution) |
| `refactor` | Refactoring |
| `perf` | Performance optimization |
| `test` | Testing related |
| `chore` | Build/toolchain related |

### Example
```
feat: Add Level 5

- Add Level 5 configuration
- Adjust card generation algorithm
- Update README.md

Closes #123
```

---

## 🔍 Pull Request Guide

### PR Title
Please use a clear and concise title to describe your changes.

### PR Description
Please fill in all information in the PR template:
- **Change Type**: Bug fix / New feature / Documentation update / Other
- **Change Description**: Detailed description of your changes
- **Related Issue**: Associated Issue number (if any)
- **Testing**: What tests you've done
- **Screenshots/Recording**: If it's a UI change, please attach screenshots

### Review Process
1. After submitting PR, CI/CD checks will run automatically
2. Maintainers will conduct code review
3. Make changes based on feedback (if needed)
4. PR gets merged! 🎉

---

## 🐛 Issue Feedback

### Report a Bug
When reporting a bug, please provide the following information:
- Operating system and version
- Node.js version
- Reproduction steps
- Expected behavior
- Actual behavior
- Error logs (if any)
- Screenshots (if any)

### Feature Suggestion
When proposing a feature suggestion, please explain:
- Purpose of the feature
- Why this feature is needed
- Possible implementation

---

## 📞 Contact

- GitHub Issues: https://github.com/fengfanM/doggo-game/issues
- GitHub Discussions: https://github.com/fengfanM/doggo-game/discussions

---

Thank you again for your contribution! 🙏
