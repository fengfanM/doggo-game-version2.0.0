function calculateSafeArea(safeArea, canvas) {
  const topPadding = Math.max(safeArea.top || 0, 10);
  const bottomPadding = Math.max(canvas.height - (safeArea.bottom || canvas.height), 0);
  const leftPadding = Math.max(safeArea.left || 0, 20);
  const rightPadding = Math.max(canvas.width - (safeArea.right || canvas.width), 20);
  
  return {
    topPadding,
    bottomPadding,
    leftPadding,
    rightPadding
  };
}

function calculateGameLayout(canvas, safeArea, safeAreaTop, safeAreaBottom) {
  const tabBarHeight = 60;
  const topPadding = Math.max(safeAreaTop, 10);
  const bottomPadding = Math.max(canvas.height - safeAreaBottom, 0);
  const leftPadding = Math.max(safeArea.left || 0, 20);
  const rightPadding = Math.max(canvas.width - (safeArea.right || canvas.width), 20);
  
  const availableWidth = canvas.width - leftPadding - rightPadding;
  const availableHeight = canvas.height - topPadding - 80 - 200 - bottomPadding - tabBarHeight;
  
  return {
    topPadding,
    bottomPadding,
    leftPadding,
    rightPadding,
    tabBarHeight,
    availableWidth,
    availableHeight,
    centerX: canvas.width / 2,
    centerY: topPadding + 80 + availableHeight / 2
  };
}

function calculateCardSize(availableWidth, availableHeight, cols, rows) {
  const baseCellSize = Math.min(availableWidth / (cols + 2), availableHeight / (rows + 2), 70);
  const minCellSize = Math.min(50, availableWidth / cols, availableHeight / rows);
  const cellWidth = Math.max(baseCellSize, minCellSize);
  const cellHeight = cellWidth;
  return { cellWidth, cellHeight };
}

function calculateCardBounds(canvas, layout, cellWidth, cellHeight) {
  const minX = layout.leftPadding;
  const maxX = canvas.width - layout.rightPadding - cellWidth;
  const minY = layout.topPadding + 80;
  const maxY = canvas.height - layout.bottomPadding - 200 - layout.tabBarHeight - cellHeight;
  
  return { minX, maxX, minY, maxY };
}

function clampCardPosition(x, y, bounds, cellWidth, cellHeight) {
  return {
    x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
    y: Math.max(bounds.minY, Math.min(y, bounds.maxY))
  };
}

function calculateGridStartPosition(centerX, centerY, cols, rows, cellWidth, cellHeight, layerOffset, bounds) {
  let startX = centerX - (cols * cellWidth) / 2 + layerOffset;
  let startY = centerY - (rows * cellHeight) / 2 + layerOffset;
  
  startX = Math.max(bounds.minX, Math.min(startX, bounds.maxX - (cols - 1) * cellWidth));
  startY = Math.max(bounds.minY, Math.min(startY, bounds.maxY - (rows - 1) * cellHeight));
  
  return { startX, startY };
}

function calculateRandomOffset(cellWidth, factor = 0.2) {
  const maxOffset = cellWidth * factor;
  return {
    x: (Math.random() - 0.5) * maxOffset,
    y: (Math.random() - 0.5) * maxOffset
  };
}

function calculateSlotLayout(canvas, safeAreaBottom) {
  const bottomPadding = Math.max(canvas.height - safeAreaBottom, 0);
  const tabBarHeight = 60;
  const slotY = canvas.height - 200 - bottomPadding - tabBarHeight;
  const totalSlotsWidth = canvas.width - 40;
  const slotWidth = totalSlotsWidth / 7 - 4;
  const slotHeight = 90;
  
  return { slotY, slotWidth, slotHeight, totalSlotsWidth };
}

function calculateControlsLayout(canvas, safeAreaBottom) {
  const bottomPadding = Math.max(canvas.height - safeAreaBottom, 0);
  const tabBarHeight = 60;
  const btnY = canvas.height - 85 - bottomPadding - tabBarHeight;
  const btnWidth = (canvas.width - 80) / 3;
  
  return { btnY, btnWidth };
}

function calculateModalSize(canvas) {
  const modalWidth = Math.min(280, canvas.width - 40);
  const modalHeight = Math.min(300, canvas.height - 100);
  const modalX = (canvas.width - modalWidth) / 2;
  const modalY = (canvas.height - modalHeight) / 2;
  
  return { modalX, modalY, modalWidth, modalHeight };
}

function calculateHeaderLayout(canvas, safeArea) {
  const { topPadding, leftPadding, rightPadding } = calculateSafeArea(safeArea, canvas);
  const availableWidth = canvas.width - leftPadding - rightPadding - 60;
  const statsSpacing = availableWidth / 3;
  
  return {
    topPadding,
    leftPadding,
    rightPadding,
    pauseBtnX: canvas.width - rightPadding - 20,
    stats: [
      { label: '关卡', x: leftPadding + 20 },
      { label: '剩余', x: leftPadding + 20 + statsSpacing },
      { label: '得分', x: leftPadding + 20 + statsSpacing * 2 },
      { label: '用时', x: canvas.width - rightPadding - 20 }
    ]
  };
}

function calculateStartScreenLayout(canvas, safeArea) {
  const { topPadding, leftPadding, rightPadding } = calculateSafeArea(safeArea, canvas);
  const availableWidth = canvas.width - leftPadding - rightPadding;
  
  return {
    topPadding,
    leftPadding,
    rightPadding,
    stats: [
      { x: leftPadding + availableWidth / 4 },
      { x: canvas.width / 2 },
      { x: canvas.width - rightPadding - availableWidth / 4 }
    ],
    descY: topPadding + 250
  };
}

function calculateLevelTabLayout(canvas, safeArea) {
  const { topPadding, leftPadding, rightPadding } = calculateSafeArea(safeArea, canvas);
  
  return {
    topPadding,
    leftPadding,
    rightPadding,
    cardWidth: canvas.width - leftPadding - rightPadding,
    startY: topPadding + 85
  };
}

function calculateMineTabLayout(canvas, safeArea) {
  const { topPadding, leftPadding, rightPadding } = calculateSafeArea(safeArea, canvas);
  const availableWidth = canvas.width - leftPadding - rightPadding;
  
  return {
    topPadding,
    leftPadding,
    rightPadding,
    cardWidth: availableWidth,
    progressWidth: availableWidth - 40,
    statItems: [
      { x: leftPadding + availableWidth / 6 },
      { x: leftPadding + availableWidth / 2 },
      { x: canvas.width - rightPadding - availableWidth / 6 }
    ]
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSafeArea,
    calculateGameLayout,
    calculateCardSize,
    calculateCardBounds,
    clampCardPosition,
    calculateGridStartPosition,
    calculateRandomOffset,
    calculateSlotLayout,
    calculateControlsLayout,
    calculateModalSize,
    calculateHeaderLayout,
    calculateStartScreenLayout,
    calculateLevelTabLayout,
    calculateMineTabLayout
  };
}
