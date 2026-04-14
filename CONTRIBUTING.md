# 贡献指南

感谢你有兴趣为这个项目做出贡献！🎉

在开始之前，请花几分钟阅读以下指南，这将帮助我们更好地合作。

---

## 📋 目录

- [行为准则](#-行为准则)
- [如何贡献](#-如何贡献)
- [开发流程](#-开发流程)
- [提交规范](#-提交规范)
- [Pull Request 指南](#-pull-request-指南)
- [问题反馈](#-问题反馈)

---

## 🤝 行为准则

本项目遵循 [Contributor Covenant](./CODE_OF_CONDUCT.md) 行为准则。参与项目即表示你同意遵守该准则。

---

## 🚀 如何贡献

### 1. 提交 Issue
如果你发现了 Bug、有新功能建议或其他问题，请先搜索 [Issues](https://github.com/fengfanM/doggo-game/issues) 确认是否已有相关讨论。如果没有，请新建一个 Issue。

### 2. 提交 Pull Request
如果你想直接贡献代码，请按照下面的 [开发流程](#-开发流程) 操作。

---

## 💻 开发流程

### 1. Fork 仓库
在 GitHub 上 Fork 这个仓库到你自己的账号下。

### 2. 克隆仓库
```bash
git clone https://github.com/你的用户名/doggo-game.git
cd doggo-game
```

### 3. 安装依赖
```bash
npm install
```

### 4. 创建分支
请从 `main` 分支创建新的功能分支：
```bash
git checkout -b feature/你的功能名
# 或者
git checkout -b fix/你的修复名
```

### 5. 进行开发
在你的分支上进行开发，请确保：
- 代码风格一致
- 添加必要的注释
- 更新相关文档（如果需要）

### 6. 运行检查
```bash
# TypeScript 类型检查
npm run typecheck

# ESLint 代码检查
npm run lint

# 构建项目
npm run build:weapp
```

### 7. 提交代码
请使用有意义的提交信息，参考 [提交规范](#-提交规范)。

### 8. 推送分支
```bash
git push origin feature/你的功能名
```

### 9. 创建 Pull Request
在 GitHub 上创建 Pull Request，填写 PR 模板中的信息。

---

## 📝 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范。

### 提交格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响代码运行） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具链相关 |

### 示例
```
feat: 添加第 5 关

- 新增第 5 关配置
- 调整卡牌生成算法
- 更新 README.md

Closes #123
```

---

## 🔍 Pull Request 指南

### PR 标题
请使用清晰、简洁的标题描述你的变更。

### PR 描述
请填写 PR 模板中的所有信息：
- **变更类型**：Bug 修复 / 新功能 / 文档更新 / 其他
- **变更描述**：详细描述你的变更
- **相关 Issue**：关联的 Issue 编号（如果有）
- **测试情况**：你做了哪些测试
- **截图/录屏**：如果是 UI 变更，请附上截图

### 审查流程
1. 提交 PR 后，会自动运行 CI/CD 检查
2. 维护者会进行代码审查
3. 根据反馈进行修改（如果需要）
4. PR 被合并！🎉

---

## 🐛 问题反馈

### 报告 Bug
在报告 Bug 时，请提供以下信息：
- 操作系统和版本
- Node.js 版本
- 复现步骤
- 预期行为
- 实际行为
- 错误日志（如果有）
- 截图（如果有）

### 功能建议
在提出功能建议时，请说明：
- 功能的用途
- 为什么需要这个功能
- 可能的实现方案

---

## 📞 联系方式

- GitHub Issues: https://github.com/fengfanM/doggo-game/issues
- GitHub Discussions: https://github.com/fengfanM/doggo-game/discussions

---

再次感谢你的贡献！🙏
