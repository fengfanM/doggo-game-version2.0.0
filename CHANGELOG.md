# Changelog

所有重要的项目变更都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
项目版本遵循 [语义化版本 (Semantic Versioning)](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 待开发
- [ ] 添加更多关卡
- [ ] 优化卡牌生成算法
- [ ] 添加更多音效
- [ ] 优化性能

---

## [1.0.0] - 2026-04-14

### ✨ 新增
- **游戏核心功能**
  - 实现 4 个关卡，难度递增
  - 第 4 关采用特殊分散算法，目标通关率 < 5%
  - 道具系统：撤回（2次）、洗牌（2次）
  - 重新开始机制：第1次免费，后续需分享
  - 分享回调与自动重新开始

- **用户界面**
  - 游戏主页面
  - 关卡选择页面
  - "我的"页面（包含游戏记录、勋章系统）
  - "狗王"勋章功能（全通关解锁）
  - 关卡进度条（每通关一关打勾）

- **技术实现**
  - 卡牌生成与布局算法
  - 遮挡检测与点击判断
  - 计时器功能（解决闭包陷阱）
  - 本地存储（游戏记录、最短用时）
  - 音效管理
  - TypeScript 类型支持

- **开发工具**
  - 本地自动化提交脚本 (`scripts/auto-commit.sh`)
  - GitHub Actions CI/CD 流程
  - ESLint 代码检查
  - TypeScript 类型检查

### 📝 文档
- 添加专业的 README.md
- 添加 MIT License
- 添加原创声明
- 添加自动化脚本使用说明
- 添加 CI/CD 流程说明

### 🐛 修复
- 修复第 2 关 `cardsPerType` 为 6（确保 3 的倍数）
- 修复计时器闭包陷阱问题
- 修复分数更新竞态条件
- 修复重新开始逻辑（限制免费次数）
- 修复分享回调与自动重新开始

---

## 版本说明

### 版本类型
- `MAJOR`：不兼容的 API 修改
- `MINOR`：向下兼容的功能性新增
- `PATCH`：向下兼容的问题修正

### 变更类型
- `✨ Added`：新功能
- `🔄 Changed`：功能变更
- `🗑️ Deprecated`：即将移除的功能
- `🐛 Removed`：已移除的功能
- `🔧 Fixed`：Bug 修复
- `⚡ Security`：安全修复

---

[Unreleased]: https://github.com/fengfanM/doggo-game/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/fengfanM/doggo-game/releases/tag/v1.0.0
