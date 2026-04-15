# 🐕 狗了个狗 - 微信小游戏版本

一款基于 Canvas 渲染的微信小游戏，复刻经典"羊了个羊"玩法，采用纯原生 Canvas API 开发，性能优异！

---

## 📌 GitHub 项目 Description

**推荐的 GitHub 项目 Description：**

> 复刻经典"羊了个羊"玩法的消除游戏，支持微信小程序和微信小游戏双平台。采用 Taro + TypeScript（小程序版）和纯 Canvas API（小游戏版）开发，自适应各种屏幕尺寸，支持多层堆叠、洗牌、撤回等完整功能。

---

## 🎬 游戏演示

<p align="center">
  <img src="https://via.placeholder.com/800x600?text=游戏演示GIF动图" alt="游戏演示" width="600">
</p>

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

---

## 🛠️ 技术栈

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| **渲染引擎** | Canvas API | 纯原生 Canvas 渲染 |
| **开发语言** | JavaScript | 原生 JS，无需编译 |
| **目标平台** | 微信小游戏 | 微信小游戏环境 |

---

## ✨ 核心特性

### 1. 自适应布局
- ✅ 支持各种屏幕尺寸
- ✅ 安全区域适配（刘海屏、挖孔屏）
- ✅ 卡牌尺寸动态计算
- ✅ 边界限制，防止溢出

### 2. 多层堆叠算法
- ✅ 平滑的层偏移计算（余弦函数）
- ✅ 每层随机偏移，增加真实感
- ✅ 被遮挡卡牌半透明显示
- ✅ 精确的遮挡检测

### 3. 工具函数模块化
- ✅ 布局计算工具（`utils.js`）
- ✅ 洗牌和层叠算法（`shuffle-utils.js`）
- ✅ 详细的使用文档
- ✅ 可复用的独立模块

---

## 📁 项目结构

```
mini-game/
├── game.js                 # 游戏主逻辑
├── game.json               # 小游戏配置
├── project.config.json     # 项目配置
├── utils.js                # 布局计算工具
├── shuffle-utils.js        # 洗牌和层叠算法
├── README.md               # 本文档
├── UTILS_README.md         # 工具函数文档
└── SHUFFLE_README.md       # 洗牌算法文档
```

---

## 🧠 核心功能实现

### 1. 平滑层偏移算法

使用余弦函数实现自然的层偏移增长：

```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

**效果：**
- 底层堆叠更紧密
- 顶层堆叠更松散
- 呈现自然的金字塔形状

### 2. 卡牌边界限制

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

### 3. 动态卡牌尺寸

```javascript
function calculateCardSize(availableWidth, availableHeight, cols, rows) {
  const baseCellSize = Math.min(availableWidth / (cols + 2), availableHeight / (rows + 2), 70);
  const minCellSize = Math.min(50, availableWidth / cols, availableHeight / rows);
  const cellWidth = Math.max(baseCellSize, minCellSize);
  return { cellWidth, cellHeight: cellWidth };
}
```

---

## 🎯 关卡设计

| 关卡 | 种类数 | 每种卡牌数 | 总卡牌数 | 层数 | 难度 |
|------|--------|------------|----------|------|------|
| 1 | 3 | 6 | 18 | 2 | ⭐ 简单 |
| 2 | 5 | 9 | 45 | 3 | ⭐ 中等 |
| 3 | 7 | 9 | 63 | 4 | ⭐⭐⭐ 困难 |
| 4 | 10 | 9 | 90 | 6 | ⭐⭐⭐⭐⭐ 地狱 |

---

## 🚀 快速开始

### 环境要求
- 微信开发者工具
- 微信小游戏开发权限

### 导入项目

1. **打开微信开发者工具**
2. **选择「小游戏」**
3. **导入项目**
   - 项目目录：选择 `mini-game` 文件夹
   - AppID：填入你的小游戏 AppID
4. **点击「编译」**

### 项目配置

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

## 📖 文档

| 文档 | 说明 |
|------|------|
| [README.md](./README.md) | 小游戏版本说明（本文档） |
| [UTILS_README.md](./UTILS_README.md) | 布局计算工具函数文档 |
| [SHUFFLE_README.md](./SHUFFLE_README.md) | 洗牌和层叠算法文档 |

---

## 🤝 贡献

我们欢迎任何形式的贡献！

### 如何贡献

1. 🍴 Fork 这个仓库
2. 🌿 创建你的特性分支
3. ✨ 提交你的变更
4. 📤 推送到分支
5. 🔍 开启一个 Pull Request

---

## 📄 许可证

本项目采用 MIT License - 详见 [LICENSE](../LICENSE) 文件。

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

## 📞 联系方式

- GitHub: https://github.com/fengfanM
- 项目地址: https://github.com/fengfanM/doggo-game

---

**如果这个项目对你有帮助，请给它一个 ⭐ Star！**

---

**祝游戏愉快！🎉**
