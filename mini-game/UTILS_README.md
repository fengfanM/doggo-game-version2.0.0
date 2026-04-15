# 布局计算工具函数库

## 概述
这是一组通用的布局计算工具函数，专门用于游戏界面的自适应布局和边界限制，确保在各种屏幕尺寸下都能正常显示。

## 目录
1. [安全区域计算](#安全区域计算)
2. [游戏布局计算](#游戏布局计算)
3. [卡牌尺寸计算](#卡牌尺寸计算)
4. [卡牌边界限制](#卡牌边界限制)
5. [位置限制](#位置限制)
6. [网格起始位置](#网格起始位置)
7. [随机偏移计算](#随机偏移计算)
8. [其他布局函数](#其他布局函数)

---

## 安全区域计算

### `calculateSafeArea(safeArea, canvas)`
计算基础安全区域边距

**参数：**
- `safeArea`: 系统返回的安全区域对象 `{ top, bottom, left, right }`
- `canvas`: Canvas 对象 `{ width, height }`

**返回值：**
```javascript
{
  topPadding,    // 顶部边距（默认≥10）
  bottomPadding, // 底部边距
  leftPadding,   // 左侧边距（默认≥20）
  rightPadding   // 右侧边距（默认≥20）
}
```

**示例：**
```javascript
const layout = calculateSafeArea(systemInfo.safeArea, { width: 375, height: 667 });
```

---

## 游戏布局计算

### `calculateGameLayout(canvas, safeArea, safeAreaTop, safeAreaBottom)`
计算游戏整体布局参数

**参数：**
- `canvas`: Canvas 对象
- `safeArea`: 安全区域对象
- `safeAreaTop`: 顶部安全距离
- `safeAreaBottom`: 底部安全距离

**返回值：**
```javascript
{
  topPadding,
  bottomPadding,
  leftPadding,
  rightPadding,
  tabBarHeight: 60,
  availableWidth,  // 卡牌区域可用宽度
  availableHeight, // 卡牌区域可用高度
  centerX,         // 中心X坐标
  centerY          // 中心Y坐标
}
```

**示例：**
```javascript
const gameLayout = calculateGameLayout(canvas, safeArea, safeAreaTop, safeAreaBottom);
```

---

## 卡牌尺寸计算

### `calculateCardSize(availableWidth, availableHeight, cols, rows)`
计算合适的卡牌尺寸，防止溢出

**参数：**
- `availableWidth`: 可用宽度
- `availableHeight`: 可用高度
- `cols`: 列数
- `rows`: 行数

**返回值：**
```javascript
{
  cellWidth,  // 卡牌宽度
  cellHeight  // 卡牌高度（等于宽度）
}
```

**特性：**
- 最大卡牌宽度 70px
- 最小卡牌宽度会根据可用空间动态计算，确保不溢出

**示例：**
```javascript
const { cellWidth, cellHeight } = calculateCardSize(300, 400, 5, 5);
```

---

## 卡牌边界限制

### `calculateCardBounds(canvas, layout, cellWidth, cellHeight)`
计算卡牌的允许边界范围

**参数：**
- `canvas`: Canvas 对象
- `layout`: 游戏布局对象（来自 calculateGameLayout）
- `cellWidth`: 卡牌宽度
- `cellHeight`: 卡牌高度

**返回值：**
```javascript
{
  minX,  // 最小X坐标
  maxX,  // 最大X坐标
  minY,  // 最小Y坐标
  maxY   // 最大Y坐标
}
```

**示例：**
```javascript
const bounds = calculateCardBounds(canvas, gameLayout, 50, 50);
```

---

## 位置限制

### `clampCardPosition(x, y, bounds, cellWidth, cellHeight)`
限制卡牌位置在允许的边界内

**参数：**
- `x`: 目标X坐标
- `y`: 目标Y坐标
- `bounds`: 边界对象（来自 calculateCardBounds）
- `cellWidth`: 卡牌宽度
- `cellHeight`: 卡牌高度

**返回值：**
```javascript
{
  x,  // 限制后的X坐标
  y   // 限制后的Y坐标
}
```

**示例：**
```javascript
const position = clampCardPosition(100, 200, bounds, 50, 50);
```

---

## 网格起始位置

### `calculateGridStartPosition(centerX, centerY, cols, rows, cellWidth, cellHeight, layerOffset, bounds)`
计算网格布局的起始位置，确保整个网格在边界内

**参数：**
- `centerX`: 中心X坐标
- `centerY`: 中心Y坐标
- `cols`: 列数
- `rows`: 行数
- `cellWidth`: 单元格宽度
- `cellHeight`: 单元格高度
- `layerOffset`: 层偏移量
- `bounds`: 边界对象

**返回值：**
```javascript
{
  startX,  // 网格起始X
  startY   // 网格起始Y
}
```

**示例：**
```javascript
const { startX, startY } = calculateGridStartPosition(
  187.5, 300, 5, 5, 50, 50, 15, bounds
);
```

---

## 随机偏移计算

### `calculateRandomOffset(cellWidth, factor = 0.2)`
计算卡牌的随机偏移量，增加堆叠效果

**参数：**
- `cellWidth`: 卡牌宽度
- `factor`: 偏移系数（默认0.2）

**返回值：**
```javascript
{
  x,  // X方向随机偏移
  y   // Y方向随机偏移
}
```

**示例：**
```javascript
const offset = calculateRandomOffset(50, 0.2);
card.x += offset.x;
card.y += offset.y;
```

---

## 其他布局函数

### 卡槽布局
`calculateSlotLayout(canvas, safeAreaBottom)`
计算卡槽区域位置

### 控制面板布局
`calculateControlsLayout(canvas, safeAreaBottom)`
计算控制面板位置

### 弹窗尺寸
`calculateModalSize(canvas)`
计算弹窗的合适尺寸

### Header布局
`calculateHeaderLayout(canvas, safeArea)`
计算头部区域布局

### 开始界面布局
`calculateStartScreenLayout(canvas, safeArea)`
计算开始界面布局

### 关卡选择布局
`calculateLevelTabLayout(canvas, safeArea)`
计算关卡选择页面布局

### 个人中心布局
`calculateMineTabLayout(canvas, safeArea)`
计算个人中心页面布局

---

## 完整使用示例

```javascript
// 1. 计算游戏整体布局
const gameLayout = calculateGameLayout(canvas, safeArea, safeAreaTop, safeAreaBottom);

// 2. 计算卡牌尺寸
const cols = 5;
const rows = 5;
const { cellWidth, cellHeight } = calculateCardSize(
  gameLayout.availableWidth,
  gameLayout.availableHeight,
  cols,
  rows
);

// 3. 计算卡牌边界
const bounds = calculateCardBounds(canvas, gameLayout, cellWidth, cellHeight);

// 4. 计算网格起始位置
const { startX, startY } = calculateGridStartPosition(
  gameLayout.centerX,
  gameLayout.centerY,
  cols,
  rows,
  cellWidth,
  cellHeight,
  0, // layerOffset
  bounds
);

// 5. 生成卡牌
for (let i = 0; i < totalCards; i++) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  
  // 计算基础位置
  let x = startX + col * cellWidth;
  let y = startY + row * cellHeight;
  
  // 添加随机偏移
  const offset = calculateRandomOffset(cellWidth);
  x += offset.x;
  y += offset.y;
  
  // 限制在边界内
  const clamped = clampCardPosition(x, y, bounds, cellWidth, cellHeight);
  
  cards.push({
    x: clamped.x,
    y: clamped.y,
    width: cellWidth,
    height: cellHeight
  });
}
```

---

## 注意事项

1. **边界检查**：始终使用 `clampCardPosition` 来确保卡牌在边界内
2. **动态尺寸**：`calculateCardSize` 会根据可用空间动态调整最小尺寸
3. **安全区域**：所有计算都考虑了安全区域，防止刘海屏等设备遮挡
4. **随机偏移**：建议使用 0.2 作为偏移系数，平衡视觉效果和边界安全

## 更新记录
- 2026-04-16: 初始版本，提取边界计算逻辑为通用工具函数
