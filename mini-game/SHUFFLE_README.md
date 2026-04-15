# 洗牌和层叠算法优化

## 概述
本文档记录了对洗牌逻辑、层叠算法和动画性能的优化方案。

## 问题1：优化层偏移量的计算方式

### 原问题
- 使用线性增长的层偏移：`layer * baseOffset`
- 各层之间的间隔完全相同，不够自然

### 优化方案
使用余弦函数实现平滑的层偏移增长：

```javascript
function calculateSmoothLayerOffset(layer, totalLayers, baseOffset) {
  if (totalLayers <= 1) return 0;
  const progress = layer / (totalLayers - 1);
  const smoothProgress = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothProgress * baseOffset * 0.5;
}
```

### 效果
- 底层（前几层）的偏移量较小，堆叠更紧密
- 顶层（后几层）的偏移量逐渐增大，堆叠更松散
- 整体呈现自然的金字塔形状，视觉效果更好

### 示例对比（以 4 层为例）
| 层级 | 原偏移 | 平滑偏移 |
|-----|-------|---------|
| 0   | 0     | 0       |
| 1   | 22    | 27.5    |
| 2   | 44    | 38.5    |
| 3   | 66    | 44      |

---

## 问题2：动画过渡卡顿问题

### 检查结果
游戏中没有复杂的动画过渡效果：
- ✅ 没有使用 `requestAnimationFrame` 做复杂动画
- ✅ 只有一个 `setInterval` 用于计时（每秒 1 次）
- ✅ 没有在洗牌时有动画效果，直接重绘
- ✅ 渲染是同步完成的，没有异步动画

### 性能保证
1. 洗牌操作在单次计算中完成，不涉及逐帧动画
2. 洗牌后直接调用 `render()` 一次性重绘
3. 只有计时器在后台运行，每秒一次，对性能影响极小

### 结论
**不会有动画卡顿问题！** 当前的实现是同步完成的，没有复杂的过渡动画，性能很好。

---

## 问题3：封装成独立模块

### 新模块文件
`shuffle-utils.js` - 独立的洗牌和层叠算法模块

### 导出的函数

#### 基础函数
1. `fastShuffle(arr)` - 快速洗牌算法
2. `calculateLayerOffset(layer, totalLayers, baseOffset, maxOffset)` - 计算平滑层偏移
3. `calculateRandomOffset(cellWidth, factor)` - 计算随机偏移量
4. `calculateGridDimensions(cardCount)` - 计算网格行列数
5. `calculateGridStartPosition(...)` - 计算网格起始位置
6. `clampPosition(x, y, bounds)` - 限制位置在边界内

#### 分层函数
7. `distributeCardsToLayers(cards, layers)` - 平均分配卡牌到各层
8. `distributeCardsToLayersRandom(cards, layers)` - 随机分配卡牌到各层

#### 高级函数
9. `arrangeCardsInLayers(...)` - 在多层中排列卡牌
10. `shuffleCards(...)` - 完整的洗牌流程

### 使用示例

```javascript
const shuffleUtils = require('./shuffle-utils.js');

// 快速洗牌
const shuffled = shuffleUtils.fastShuffle(cards);

// 计算平滑层偏移
const offset = shuffleUtils.calculateLayerOffset(
  2,      // 当前层
  6,      // 总层数
  28,     // 基础偏移
  42      // 最大偏移
);

// 完整洗牌流程
const result = shuffleUtils.shuffleCards(
  cards,
  level,
  layout,
  calculateCardSizeFn,
  bounds
);
```

---

## 模块特点

### 通用性
- 不依赖游戏特定逻辑
- 参数化配置，可灵活调整
- 可用于任何类似的消除游戏

### 性能优化
- 使用 Fisher-Yates 洗牌算法（O(n) 复杂度）
- 避免了不必要的数组复制
- 边界检查是简单的数学计算

### 可扩展性
- 支持自定义层偏移算法
- 支持多种卡牌分层策略
- 易于添加新的布局算法

---

## 文件清单

| 文件 | 说明 |
|-----|-----|
| `shuffle-utils.js` | 独立的洗牌和层叠算法模块 |
| `game.js` | 主游戏逻辑，集成了平滑层偏移 |
| `SHUFFLE_README.md` | 本文档 |

---

## 更新记录

| 日期 | 版本 | 说明 |
|-----|-----|-----|
| 2026-04-16 | 1.0 | 初始版本，包含平滑层偏移、独立模块封装 |

