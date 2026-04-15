# 🐕 狗了个狗 - 超好玩的消除游戏

复刻经典"羊了个羊"玩法的消除游戏，支持微信小程序和微信小游戏双平台。采用 Taro + TypeScript（小程序版）和纯 Canvas API（小游戏版）开发，自适应各种屏幕尺寸，支持多层堆叠、洗牌、撤回等完整功能。

<p align="center">
  <a href="README.md">中文</a> |
  <a href="README.en.md">English</a>
</p>

---

## 🎬 游戏演示

<p align="center">
  <img src="https://via.placeholder.com/800x600?text=游戏演示GIF动图" alt="游戏演示" width="600">
</p>

### 如何添加你的游戏演示 GIF

1. **录制游戏视频**：在微信开发者工具或真机上录制游戏过程
2. **转换为 GIF**：使用工具将视频转换为 GIF（推荐工具：Kap、ScreenToGif、ffmpeg）
3. **上传到仓库**：将 GIF 文件放到项目的 `assets/` 目录下（需要先创建）
4. **更新 README**：修改上面的图片链接为你的 GIF 文件路径

**示例：**
```markdown
<p align="center">
  <img src="./assets/demo.gif" alt="游戏演示" width="600">
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
  <a href="#-快速开始">快速开始</a> ·
  <a href="#-文档">文档</a> ·
  <a href="#-贡献">贡献</a> ·
  <a href="https://github.com/fengfanM/doggo-game-version2.0.0/issues">报告问题</a>
</p>

---

## 📌 快速链接

| 资源 | 中文 | English |
|------|------|---------|
| 📖 完整文档 | [README.md](./README.md) | [README.en.md](./README.en.md) |
| 📱 小程序文档 | [README.md](./README.md) | - |
| 🎮 小游戏文档 | [mini-game/README.md](./mini-game/README.md) | [mini-game/README.en.md](./mini-game/README.en.md) |
| 📝 变更日志 | [CHANGELOG.md](./CHANGELOG.md) | [CHANGELOG.en.md](./CHANGELOG.en.md) |
| 🤝 贡献指南 | [CONTRIBUTING.md](./CONTRIBUTING.md) | [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) |
| ⚖️ 行为准则 | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | [CODE_OF_CONDUCT.en.md](./CODE_OF_CONDUCT.en.md) |
| 🔒 安全政策 | [SECURITY.md](./SECURITY.md) | [SECURITY.en.md](./SECURITY.en.md) |
| 🐛 报告 Bug | [提交 Issue](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose) | - |
| ✨ 功能请求 | [提交 Feature Request](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose) | - |

---

## ⚠️ 原创声明

**本项目为原创作品，保留所有权利。**

- 任何个人或组织在复制、使用、修改或分发本项目的代码、文档或其他资源前，**必须**提前通知作者并获得书面授权。
- 未经授权的复制、使用或分发行为将被视为侵权，作者保留追究法律责任的权利。
- 如需合作或授权，请通过 GitHub 联系作者：https://github.com/fengfanM

---

---

## 📋 目录

- [双平台支持](#-双平台支持)
- [游戏玩法](#-游戏玩法)
- [技术栈](#-技术栈)
- [游戏背后的算法](#-游戏背后的算法)
- [游戏设计逻辑](#-游戏设计逻辑)
- [游戏规则详解](#-游戏规则详解)
- [游戏策略简介](#-游戏策略简介)
- [产品功能](#-产品功能)
- [项目结构](#-项目结构)
- [核心功能实现](#-核心功能实现)
- [关卡设计](#-关卡设计)
- [快速开始](#-快速开始)
- [自动化脚本](#-自动化脚本)
- [CI/CD 流程](#-cicd-流程)
- [开发指南](#-开发指南)
- [贡献](#-贡献)
- [许可证](#-许可证)

---

## 📱 双平台支持

本项目支持两个平台：

### 微信小程序版本（推荐）
- **技术栈**：Taro 4.1.9 + TypeScript
- **渲染方式**：React 组件 + Taro 框架
- **特点**：代码结构清晰，易于扩展
- **位置**：根目录（除 `mini-game/` 外的所有文件）

### 微信小游戏版本
- **技术栈**：原生 JavaScript + Canvas API
- **渲染方式**：纯 Canvas 2D 渲染
- **特点**：性能优异，启动快速
- **位置**：`mini-game/` 目录

---

## 🎮 游戏玩法

### 基本规则
1. **点击卡牌**：点击游戏区域中的卡牌，将其放入底部卡槽
2. **消除规则**：当卡槽中有 **3 张相同类型**的卡牌时，自动消除
3. **失败条件**：卡槽满了（超过 7 张）且无法消除时，游戏失败
4. **胜利条件**：消除场上所有卡牌，游戏胜利

### 道具系统
- **🔄 撤回**：撤回上一步操作（每关限用 2 次）
- **🔀 洗牌**：随机打乱场上卡牌位置（每关限用 2 次）

### 重新开始机制
- **第 1 次失败**：免费重新开始（返还撤回和洗牌次数）
- **第 2 次及以后**：需分享到微信群获取重新开始机会

---

## 🛠️ 技术栈

### 微信小程序版本
| 类别 | 技术选型 | 版本 |
|------|----------|------|
| **框架** | Taro | 4.1.9 |
| **开发语言** | TypeScript | 5.x |
| **样式** | SCSS | - |
| **UI 组件** | Taro UI | - |
| **编译工具** | Webpack | - |
| **目标平台** | 微信小程序 | - |

### 微信小游戏版本
| 类别 | 技术选型 | 说明 |
|------|----------|------|
| **渲染引擎** | Canvas API | 纯原生 Canvas 渲染 |
| **开发语言** | JavaScript | 原生 JS，无需编译 |
| **目标平台** | 微信小游戏 | 微信小游戏环境 |

---

## 🧮 游戏背后的算法

### 1. 洗牌算法（Fisher-Yates Shuffle）
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
- **时间复杂度**：O(n)
- **特点**：原地洗牌，无偏随机

### 2. 平滑层偏移算法
```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```
- **特点**：使用余弦函数实现自然的堆叠效果
- **效果**：底层紧密，顶层松散，呈金字塔形

### 3. 遮挡检测算法
- **原理**：遍历所有卡牌对，判断重叠关系和层级关系
- **优化**：使用 z-index 作为层级判断依据
- **精度**：基于矩形碰撞检测

### 4. 第4关特殊算法
- **目标**：降低通关率至 5% 以内
- **策略**：将相同类型的卡牌分散到不同层
- **实现**：使用类型索引追踪 + 层分配算法

---

## 🎯 游戏设计逻辑

### 1. 难度曲线设计
| 关卡 | 设计目标 | 核心策略 |
|------|---------|---------|
| 1 | 教学关 | 少种类、少数量、容易通关 |
| 2 | 入门关 | 增加种类和数量，建立信心 |
| 3 | 挑战关 | 显著增加难度，筛选玩家 |
| 4 | 地狱关 | 极端配置，极低通关率 |

### 2. 道具系统设计
- **撤回**：降低操作失误的挫败感
- **洗牌**：打破僵局，增加策略性
- **限制次数**：防止滥用，保持挑战性

### 3. 重新开始机制
- **第1次免费**：鼓励继续尝试
- **后续需分享**：利用社交传播，增加用户获取

---

## 📜 游戏规则详解

### 基础规则
1. **卡牌点击**：只能点击未被遮挡的卡牌（z-index 最高且无重叠）
2. **卡槽放置**：卡牌按点击顺序放入卡槽，最多7张
3. **自动消除**：卡槽中出现3张相同类型时立即消除
4. **失败条件**：卡槽满（7张）且无法形成3连消
5. **胜利条件**：场上所有卡牌都被消除

### 遮挡规则
- 卡牌 A 被卡牌 B 遮挡的条件：
  1. 两张卡牌有重叠区域
  2. 卡牌 B 的 z-index > 卡牌 A 的 z-index
- 被遮挡的卡牌：半透明显示，不可点击

### 道具规则
- **撤回**：
  - 恢复上一步操作（包括卡牌位置、卡槽状态）
  - 每关限用2次
  - 不影响洗牌次数
- **洗牌**：
  - 打乱场上所有未消除卡牌的位置
  - 保持分层结构
  - 每关限用2次
  - 不影响撤回次数

---

## 💡 游戏策略简介

### 新手策略
1. **优先消除边缘卡牌**：边缘卡牌遮挡少，更容易消除
2. **保持卡槽清洁**：尽量不要让卡槽超过4-5张牌
3. **观察卡牌分布**：提前规划，避免相同卡牌被分开

### 进阶策略
1. **分层消除**：从顶层开始，逐层向下消除
2. **预留空间**：卡槽中预留1-2个位置给可能出现的组合
3. **合理使用道具**：
   - 撤回：用于关键失误，不要浪费在小错误上
   - 洗牌：在真正陷入僵局时使用

### 高手策略
1. **记忆卡牌位置**：注意观察相同卡牌的分布
2. **预判消除链**：思考消除后会暴露哪些卡牌
3. **控制节奏**：不要急于点击，先观察全局

---

## 🚀 产品功能

### 核心功能
- ✅ **三消玩法**：经典的3张相同卡牌消除机制
- ✅ **多层堆叠**：卡牌分层放置，上层遮挡下层
- ✅ **自适应布局**：自动适配各种屏幕尺寸
- ✅ **安全区域**：刘海屏、挖孔屏等特殊屏幕适配
- ✅ **道具系统**：撤回和洗牌道具
- ✅ **多关卡**：4个难度递增的关卡

### 用户体验
- ✅ **流畅动画**：卡牌消除、点击反馈动画
- ✅ **音效支持**：点击、消除、胜利、失败音效
- ✅ **本地存储**：自动保存关卡进度和游戏统计
- ✅ **分享功能**：支持分享到微信群获取重新开始机会
- ✅ **个人中心**：查看游戏统计和成就

### 技术特性
- ✅ **双平台支持**：小程序版和小游戏版
- ✅ **模块化设计**：工具函数独立封装，易于复用
- ✅ **TypeScript**：小程序版使用 TypeScript，类型安全
- ✅ **Canvas渲染**：小游戏版使用纯 Canvas，性能优异
- ✅ **CI/CD**：自动化构建、测试和部署

---

## 📁 项目结构

```
sheep/
├── src/                      # 微信小程序版本源代码
│   ├── pages/              # 页面
│   │   ├── game/           # 游戏主页面
│   │   ├── level/          # 关卡选择页面
│   │   └── mine/           # 我的页面
│   ├── components/         # 组件
│   │   ├── GameCard/       # 游戏卡牌组件
│   │   ├── GameBoard/      # 游戏棋盘组件
│   │   └── CardSlot/       # 卡槽组件
│   ├── data/               # 数据
│   │   └── levels.ts       # 关卡配置
│   ├── utils/              # 工具函数
│   │   ├── game.ts         # 游戏核心逻辑
│   │   ├── storage.ts      # 本地存储
│   │   ├── sound.ts        # 音效管理
│   │   └── dailyTasks.ts   # 每日任务
│   ├── styles/             # 全局样式
│   ├── app.ts              # 应用入口
│   └── app.config.ts       # 应用配置
├── mini-game/               # 微信小游戏版本源代码
│   ├── game.js             # 游戏主逻辑
│   ├── game.json           # 小游戏配置
│   ├── project.config.json # 项目配置
│   ├── utils.js            # 布局计算工具
│   ├── shuffle-utils.js    # 洗牌和层叠算法
│   ├── README.md           # 小游戏文档（中文）
│   ├── README.en.md        # 小游戏文档（英文）
│   ├── UTILS_README.md     # 工具函数文档
│   └── SHUFFLE_README.md   # 洗牌算法文档
├── config/                 # Taro 配置
├── dist/                   # 编译输出
└── package.json
```

---

## 🧠 核心功能实现

### 1. 卡牌生成与布局算法

**小程序版本**：`src/utils/game.ts`

**小游戏版本**：`mini-game/game.js` + `mini-game/shuffle-utils.js`

#### 核心流程
```typescript
// 1. 根据关卡配置生成卡牌池
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

// 2. 随机打乱卡牌顺序
const shuffledCards = shuffleArray(cards);

// 3. 分层放置卡牌（上层覆盖下层）
for (let layer = 0; layer < config.layers; layer++) {
  // 计算每层卡牌位置
  // 添加偏移量，使卡牌错落有致
}

// 4. 特殊关卡算法（第 4 关）
// 使相同类型的卡牌分散在不同层，提升难度
```

#### 关键特性
- ✅ 确保每种卡牌数量为 3 的倍数
- ✅ 随机化卡牌位置，增加游戏性
- ✅ 分层设计，上层卡牌遮挡下层
- ✅ 第 4 关采用分散算法，降低通关率
- ✅ 小游戏版本使用平滑层偏移算法（余弦函数）

---

### 2. 遮挡检测与点击判断

**文件位置**：`src/utils/game.ts` - `checkCover` 函数

```typescript
export function checkCover(cards: Card[]): Card[] {
  cards.forEach(card => {
    card.isCovered = false;
    card.coveringCards = [];
  });

  // 对于每张卡牌，检查是否有其他卡牌覆盖它
  cards.forEach((cardA, indexA) => {
    cards.forEach((cardB, indexB) => {
      if (indexA === indexB) return;
      
      // 判断是否有重叠且 cardB 在 cardA 上方
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

### 3. 小游戏版本特性

小游戏版本额外包含以下特性：

#### 平滑层偏移算法
```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

#### 自适应布局
- 动态计算卡牌尺寸
- 安全区域适配
- 边界限制，防止溢出

#### 模块化工具
- `utils.js`：布局计算工具
- `shuffle-utils.js`：洗牌和层叠算法

---

## 🎯 关卡设计

| 关卡 | 种类数 | 每种卡牌数 | 总卡牌数 | 层数 | 难度 | 目标通关率 |
|------|--------|------------|----------|------|------|------------|
| 1 | 3 | 6 | 18 | 2 | ⭐ 简单 | > 90% |
| 2 | 5 | 9 | 45 | 3 | ⭐ 中等 | > 70% |
| 3 | 7 | 9 | 63 | 4 | ⭐⭐⭐ 困难 | < 30% |
| 4 | 10 | 9 | 90 | 6 | ⭐⭐⭐⭐⭐ 地狱 | < 5% |

### 第 4 关特殊算法
- ✅ 相同类型卡牌分散在不同层
- ✅ 增加卡牌种类和数量
- ✅ 增加层数和层偏移
- ✅ 目标：只有 5% 以内的玩家能通关

---

## 🚀 快速开始

### 微信小程序版本

#### 环境要求
- Node.js >= 16
- npm 或 yarn
- 微信开发者工具

#### 安装依赖
```bash
npm install
```

#### 开发模式
```bash
npm run dev:weapp
```

#### 生产构建
```bash
npm run build:weapp
```

#### 微信开发者工具
1. 打开微信开发者工具
2. 选择「小程序」
3. 导入项目，项目目录选择 `dist` 文件夹
4. AppID 填入你的小程序 AppID

---

### 微信小游戏版本

#### 环境要求
- 微信开发者工具
- 微信小游戏开发权限

#### 导入项目
1. 打开微信开发者工具
2. 选择「小游戏」
3. 导入项目，项目目录选择 `mini-game` 文件夹
4. AppID 填入你的小游戏 AppID
5. 点击「编译」

详细文档请查看：[mini-game/README.md](./mini-game/README.md)

---

## 🤖 自动化脚本

### 本地自动提交推送

使用自动提交脚本，一键完成 git add → commit → push：

```bash
# 方式1：使用 npm 脚本
npm run auto-commit "你的提交信息"

# 方式2：直接运行脚本
./scripts/auto-commit.sh "你的提交信息"

# 方式3：不带提交信息（使用默认信息）
npm run auto-commit
```

**脚本功能**：
- ✅ 自动检查 git 状态
- ✅ 自动添加所有修改的文件
- ✅ 自动创建提交
- ✅ 自动拉取最新代码（避免冲突）
- ✅ 自动推送到远程仓库
- 🎨 漂亮的彩色输出

---

## 🔄 CI/CD 流程

项目已配置 GitHub Actions CI/CD 流程，每次推送代码或创建 Pull Request 时会自动运行：

### CI/CD 任务列表
| 步骤 | 说明 |
|------|------|
| 📥 Checkout code | 检出代码 |
| 🟢 Setup Node.js | 设置 Node.js 环境 |
| 📦 Install dependencies | 安装依赖 |
| 🔍 TypeScript type check | TypeScript 类型检查 |
| 📝 ESLint check | 代码风格检查 |
| 🔨 Build project | 构建项目 |
| ✅ Upload build artifacts | 上传构建产物 |

### 查看 CI/CD 结果
访问：https://github.com/fengfanM/doggo-game-version2.0.0/actions

---

## 💻 开发指南

### 代码检查与格式化
```bash
# TypeScript 类型检查
npm run typecheck

# ESLint 代码检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# 运行测试
npm run test
```

### 添加新关卡
修改 `src/data/levels.ts`（小程序版本）或 `mini-game/game.js`（小游戏版本）：
```typescript
const levelConfig = [
  // ... 现有关卡
  {
    types: 10,        // 卡牌种类数
    cardsPerType: 12, // 每种卡牌数量（必须是 3 的倍数）
    layers: 6,        // 层数
    layerOffset: 30   // 层偏移（像素）
  }
];
```

### 添加新卡牌
修改 `src/utils/game.ts`（小程序版本）或 `mini-game/game.js`（小游戏版本）中的 emoji 数组：
```typescript
export const DOG_EMOJIS = [
  '🐕', '🐶', '🐩', '🦮', '🐕‍🦺',
  // ... 添加更多 emoji
];
```

### 修改音效
修改 `src/utils/sound.ts`（小程序版本）：
```typescript
export const playSound = (type: SoundType) => {
  // 自定义音效逻辑
};
```

---

---

## 🤝 贡献

我们欢迎任何形式的贡献！🙏

### 如何贡献

1. 🍴 Fork 这个仓库
2. 🌿 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. ✨ 提交你的变更 (`git commit -m 'feat: 添加一些很棒的功能'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🔍 开启一个 Pull Request

详细的贡献指南请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)。

### 问题反馈

- 🐛 报告 Bug：[提交 Issue](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose)
- ✨ 功能请求：[提交 Feature Request](https://github.com/fengfanM/doggo-game-version2.0.0/issues/new/choose)
- ❓ 问题讨论：[GitHub Discussions](https://github.com/fengfanM/doggo-game-version2.0.0/discussions)

### 行为准则

参与本项目请遵守 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)。

### 安全问题

请参考 [SECURITY.md](./SECURITY.md) 报告安全问题。

---

## 📄 许可证

本项目采用 MIT License - 详见 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

## 📞 联系方式

- GitHub: https://github.com/fengfanM
- 项目地址: https://github.com/fengfanM/doggo-game-version2.0.0

---

**如果这个项目对你有帮助，请给它一个 ⭐ Star！**

---

**祝游戏愉快！🎉**
