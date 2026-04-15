<p align="center">
  <br>
  <img src="https://via.placeholder.com/120?text=🐕" alt="Logo" width="120">
  <br>
</p>

<h1 align="center">狗了个狗</h1>

<p align="center">
  复刻经典"羊了个羊"玩法的消除游戏
  <br>
  支持微信小程序和微信小游戏双平台
</p>

<p align="center">
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/stargazers">
    <img src="https://img.shields.io/github/stars/fengfanM/doggo-game-version2.0.0?style=flat-square&logo=github" alt="Stars">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/forks">
    <img src="https://img.shields.io/github/forks/fengfanM/doggo-game-version2.0.0?style=flat-square&logo=github" alt="Forks">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/fengfanM/doggo-game-version2.0.0/ci.yml?branch=main&style=flat-square&label=CI" alt="CI">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/fengfanM/doggo-game-version2.0.0?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/releases">
    <img src="https://img.shields.io/github/v/release/fengfanM/doggo-game-version2.0.0?style=flat-square" alt="Release">
  </a>
</p>

<p align="center">
  <a href="#-简介">简介</a> ·
  <a href="#-特性">特性</a> ·
  <a href="#-快速开始">快速开始</a> ·
  <a href="#-文档">文档</a> ·
  <a href="#-贡献">贡献</a>
</p>

<br>

---

## 📖 简介

**狗了个狗** 是一款复刻经典"羊了个羊"玩法的消除游戏，采用现代化的技术栈构建，支持微信小程序和微信小游戏双平台。

### 核心优势

- 🎨 **双平台支持**：一套代码逻辑，两个平台实现
- ⚡ **极致性能**：小游戏版采用纯 Canvas 渲染，启动快，流畅度高
- 📱 **完美适配**：自适应各种屏幕尺寸，支持刘海屏等特殊屏幕
- 🔧 **模块化设计**：核心算法独立封装，易于复用和扩展
- 🎯 **精心设计**：4个难度递增的关卡，难度曲线合理

---

## ✨ 特性

### 核心玩法
- [x] **经典三消**：3张相同卡牌自动消除
- [x] **多层堆叠**：卡牌分层放置，上层遮挡下层
- [x] **平滑层叠**：使用余弦算法实现自然的堆叠效果
- [x] **智能遮挡检测**：精确判断卡牌遮挡关系

### 道具系统
- [x] **撤回功能**：每关限用2次，降低操作失误
- [x] **洗牌功能**：每关限用2次，打破僵局
- [x] **重新开始机制**：第1次免费，后续需分享

### 用户体验
- [x] **流畅动画**：点击反馈、消除动画
- [x] **音效支持**：点击、消除、胜利、失败音效
- [x] **本地存储**：自动保存进度和统计
- [x] **社交分享**：分享到微信群获取重新开始机会

### 技术特性
- [x] **TypeScript**：小程序版类型安全
- [x] **Canvas 渲染**：小游戏版性能优异
- [x] **自适应布局**：动态计算，完美适配
- [x] **安全区域**：刘海屏、挖孔屏适配
- [x] **CI/CD**：自动化构建和测试

---

## 🎬 演示

<p align="center">
  <img src="https://via.placeholder.com/800x450?text=游戏演示" alt="Demo" width="800">
</p>

---

## 🚀 快速开始

### 微信小程序版本

```bash
# 克隆项目
git clone https://github.com/fengfanM/doggo-game-version2.0.0.git
cd doggo-game-version2.0.0

# 安装依赖
npm install

# 开发模式
npm run dev:weapp

# 生产构建
npm run build:weapp
```

然后在微信开发者工具中导入 `dist` 目录。

### 微信小游戏版本

```bash
# 克隆项目
git clone https://github.com/fengfanM/doggo-game-version2.0.0.git
```

直接在微信开发者工具中导入 `mini-game` 目录即可。

详细文档请参考：[快速开始指南](#快速开始-1)

---

## 📚 文档

- [项目结构](#项目结构)
- [核心算法](#核心算法)
- [游戏设计](#游戏设计)
- [游戏规则](#游戏规则)
- [游戏策略](#游戏策略)
- [API 参考](mini-game/UTILS_README.md)
- [开发指南](#开发指南)

---

## 🏗️ 项目结构

```
sheep/
├── src/                      # 微信小程序版本
│   ├── pages/              # 页面
│   │   ├── game/           # 游戏主页面
│   │   ├── level/          # 关卡选择
│   │   └── mine/           # 个人中心
│   ├── components/         # 组件
│   ├── data/               # 关卡配置
│   ├── utils/              # 工具函数
│   ├── styles/             # 全局样式
│   ├── app.ts              # 应用入口
│   └── app.config.ts       # 应用配置
├── mini-game/               # 微信小游戏版本
│   ├── game.js             # 游戏主逻辑
│   ├── utils.js            # 布局工具
│   ├── shuffle-utils.js    # 洗牌算法
│   └── README.md           # 小游戏文档
├── .github/                 # GitHub 配置
│   └── workflows/          # CI/CD 流程
├── config/                 # Taro 配置
└── package.json
```

---

## 🧠 核心算法

### 1. 洗牌算法（Fisher-Yates Shuffle）

时间复杂度：**O(n)**，空间复杂度：**O(n)**

```javascript
function fastShuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

### 2. 平滑层偏移算法

使用余弦函数实现自然的堆叠效果，底层紧密、顶层松散：

```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

### 3. 遮挡检测

基于矩形碰撞检测和 z-index 层级判断：

```
条件：重叠区域存在 && B.zIndex > A.zIndex
结果：A 被 B 遮挡
```

### 4. 第4关特殊算法

目标：通关率 < 5%

策略：相同类型卡牌分散到不同层，增加消除难度

---

## 🎯 游戏设计

### 难度曲线

| 关卡 | 卡牌种类 | 总卡牌数 | 层数 | 目标通关率 | 设计目标 |
|------|---------|---------|------|-----------|---------|
| 1 | 3 | 18 | 2 | > 90% | 教学关，建立信心 |
| 2 | 5 | 45 | 3 | > 70% | 入门关，熟悉玩法 |
| 3 | 7 | 63 | 4 | < 30% | 挑战关，筛选玩家 |
| 4 | 10 | 90 | 6 | < 5% | 地狱关，极致挑战 |

### 道具设计哲学

- **撤回**：降低操作失误的挫败感，提升留存
- **洗牌**：打破僵局，增加策略深度
- **次数限制**：防止滥用，保持游戏挑战性

### 社交传播机制

- 第1次失败：免费重新开始
- 第2次及以后：分享到微信群获取机会
- 利用社交裂变，降低获客成本

---

## � 游戏规则

### 基础规则

1. **卡牌点击**：只能点击未被遮挡的卡牌
2. **卡槽放置**：按点击顺序放入，最多7张
3. **自动消除**：出现3张相同类型时立即消除
4. **失败条件**：卡槽满且无法形成3连消
5. **胜利条件**：消除场上所有卡牌

### 遮挡规则

卡牌 A 被遮挡的充要条件：
- 存在卡牌 B，与 A 有重叠区域
- 且 B.zIndex > A.zIndex

被遮挡卡牌：半透明显示（α=0.7），不可点击

### 道具规则

| 道具 | 功能 | 限制 | 影响 |
|------|------|------|------|
| 撤回 | 恢复上一步 | 2次/关 | 不影响洗牌 |
| 洗牌 | 打乱场上卡牌 | 2次/关 | 不影响撤回 |

---

## 💡 游戏策略

### 新手策略

1. **优先消除边缘卡牌**：遮挡少，容易形成组合
2. **保持卡槽清洁**：尽量不要超过4-5张牌
3. **观察全局**：提前规划，避免相同卡牌被分开

### 进阶策略

1. **分层消除**：从顶层开始，逐层向下
2. **预留空间**：卡槽中预留1-2个位置
3. **合理用道具**：撤回用于关键失误，洗牌用于真正僵局

### 高手策略

1. **记忆分布**：注意观察相同卡牌的位置
2. **预判消除链**：思考消除后暴露的卡牌
3. **控制节奏**：不要急于点击，先观察全局

---

## 🛠️ 技术栈

### 微信小程序版本

| 技术 | 版本 | 用途 |
|------|------|------|
| Taro | 4.1.9 | 跨端框架 |
| TypeScript | 5.x | 类型安全 |
| React | - | UI 框架 |
| SCSS | - | 样式预处理器 |
| Webpack | - | 构建工具 |

### 微信小游戏版本

| 技术 | 用途 |
|------|------|
| Canvas API | 2D 渲染 |
| JavaScript | 开发语言 |
| 微信小游戏 API | 平台能力 |

---

## � 快速开始

### 前置要求

- Node.js >= 16
- npm 或 yarn
- 微信开发者工具

### 小程序开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev:weapp

# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 生产构建
npm run build:weapp
```

### 小游戏开发

直接在微信开发者工具中导入 `mini-game` 目录即可，无需构建。

---

## 🤝 贡献

我们欢迎任何形式的贡献！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 ESLint 规则
- 提交信息符合 [Conventional Commits](https://www.conventionalcommits.org/)
- 确保所有测试通过

详细指南请参考 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 许可证

本项目采用 MIT License - 详见 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

## � 联系

- GitHub: [@fengfanM](https://github.com/fengfanM)
- 项目: [doggo-game-version2.0.0](https://github.com/fengfanM/doggo-game-version2.0.0)

---

<p align="center">
  如果这个项目对你有帮助，请给它一个 ⭐ Star！
</p>

<p align="center">
  <sub>Made with ❤️ by fengfanM</sub>
</p>
