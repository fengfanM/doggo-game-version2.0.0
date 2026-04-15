console.log('='.repeat(70));
console.log('测试卡牌布局溢出修复');
console.log('='.repeat(70));

const testScreenSizes = [
  { name: 'iPhone SE (小屏幕)', width: 320, height: 568, safeArea: { top: 20, bottom: 568, left: 0, right: 320 } },
  { name: 'iPhone 12 (普通屏幕)', width: 390, height: 844, safeArea: { top: 47, bottom: 814, left: 0, right: 390 } },
  { name: 'iPhone 14 Pro Max (大屏幕)', width: 430, height: 932, safeArea: { top: 54, bottom: 904, left: 0, right: 430 } },
  { name: '超窄屏 (测试边界)', width: 280, height: 600, safeArea: { top: 20, bottom: 580, left: 10, right: 270 } },
  { name: '横屏平板', width: 800, height: 400, safeArea: { top: 20, bottom: 380, left: 40, right: 760 } }
];

const testLevels = [
  { level: 1, name: '第1关（简单）' },
  { level: 3, name: '第3关（中等）' },
  { level: 4, name: '第4关（困难）' }
];

function simulateGameLayout(screen, level) {
  const canvas = { width: screen.width, height: screen.height };
  const safeArea = screen.safeArea;
  const safeAreaTop = safeArea.top || 0;
  const safeAreaBottom = safeArea.bottom || canvas.height;
  const safeAreaLeft = safeArea.left || 0;
  const safeAreaRight = safeArea.right || canvas.width;
  
  const tabBarHeight = 60;
  const topPadding = Math.max(safeAreaTop, 10);
  const bottomPadding = Math.max(canvas.height - safeAreaBottom, 0);
  const leftPadding = Math.max(safeAreaLeft, 20);
  const rightPadding = Math.max(canvas.width - safeAreaRight, 20);
  
  const availableWidth = canvas.width - leftPadding - rightPadding;
  const availableHeight = canvas.height - topPadding - 80 - 200 - bottomPadding - tabBarHeight;
  
  const layout = {
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
  
  const levelConfig = [
    { types: 3, cardsPerType: 6, layers: 2, layerOffset: 15 },
    { types: 5, cardsPerType: 9, layers: 3, layerOffset: 18 },
    { types: 7, cardsPerType: 9, layers: 4, layerOffset: 22 },
    { types: 10, cardsPerType: 9, layers: 6, layerOffset: 28 },
  ];
  
  const config = levelConfig[Math.min(level - 1, levelConfig.length - 1)];
  const totalCards = config.types * config.cardsPerType;
  
  const results = [];
  
  for (let layer = 0; layer < config.layers; layer++) {
    const cardsInLayer = Math.ceil(totalCards / config.layers);
    const cols = Math.ceil(Math.sqrt(cardsInLayer * 1.5));
    const rows = Math.ceil(cardsInLayer / cols);
    
    const baseCellSize = Math.min(availableWidth / (cols + 2), availableHeight / (rows + 2), 70);
    const minCellSize = Math.min(50, availableWidth / cols, availableHeight / rows);
    const cellWidth = Math.max(baseCellSize, minCellSize);
    const cellHeight = cellWidth;
    
    let startX = layout.centerX - (cols * cellWidth) / 2 + layer * config.layerOffset;
    let startY = layout.centerY - (rows * cellHeight) / 2 + layer * config.layerOffset;
    
    const minX = layout.leftPadding;
    const maxX = canvas.width - layout.rightPadding - cellWidth;
    const minY = layout.topPadding + 80;
    const maxY = canvas.height - layout.bottomPadding - 200 - layout.tabBarHeight - cellHeight;
    
    startX = Math.max(minX, Math.min(startX, maxX - (cols - 1) * cellWidth));
    startY = Math.max(minY, Math.min(startY, maxY - (rows - 1) * cellHeight));
    
    for (let i = 0; i < Math.min(cardsInLayer, totalCards - layer * cardsInLayer); i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const maxOffset = cellWidth * 0.2;
      const randomOffsetX = 0;
      const randomOffsetY = 0;
      
      let cardX = startX + col * cellWidth + randomOffsetX;
      let cardY = startY + row * cellHeight + randomOffsetY;
      
      cardX = Math.max(minX, Math.min(cardX, maxX));
      cardY = Math.max(minY, Math.min(cardY, maxY));
      
      results.push({
        x: cardX,
        y: cardY,
        width: cellWidth,
        height: cellHeight,
        layer: layer
      });
    }
  }
  
  return { layout, cards: results, totalCards: results.length };
}

function checkCardBounds(card, canvas, layout) {
  const minX = layout.leftPadding;
  const maxX = canvas.width - layout.rightPadding;
  const minY = layout.topPadding + 80;
  const maxY = canvas.height - layout.bottomPadding - 200 - layout.tabBarHeight;
  
  const cardLeft = card.x;
  const cardRight = card.x + card.width;
  const cardTop = card.y;
  const cardBottom = card.y + card.height;
  
  const leftOk = cardLeft >= minX - 1;
  const rightOk = cardRight <= maxX + 1;
  const topOk = cardTop >= minY - 1;
  const bottomOk = cardBottom <= maxY + 1;
  
  return {
    leftOk,
    rightOk,
    topOk,
    bottomOk,
    allOk: leftOk && rightOk && topOk && bottomOk,
    bounds: { minX, maxX, minY, maxY }
  };
}

testScreenSizes.forEach(screen => {
  console.log(`\n\n${'='.repeat(70)}`);
  console.log(`屏幕: ${screen.name} (${screen.width}x${screen.height})`);
  console.log(`${'='.repeat(70)}`);
  
  testLevels.forEach(testLevel => {
    console.log(`\n  ${testLevel.name}:`);
    
    const result = simulateGameLayout(screen, testLevel.level);
    let allValid = true;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    result.cards.forEach((card, index) => {
      const check = checkCardBounds(card, { width: screen.width, height: screen.height }, result.layout);
      
      if (!check.allOk) {
        allValid = false;
        console.log(`    ⚠️  卡牌 ${index} 超出边界!`);
        console.log(`       位置: (${card.x.toFixed(1)}, ${card.y.toFixed(1)})`);
        console.log(`       尺寸: ${card.width.toFixed(1)}x${card.height.toFixed(1)}`);
        console.log(`       边界: X: [${check.bounds.minX}, ${check.bounds.maxX}], Y: [${check.bounds.minY}, ${check.bounds.maxY}]`);
      }
      
      minX = Math.min(minX, card.x);
      maxX = Math.max(maxX, card.x + card.width);
      minY = Math.min(minY, card.y);
      maxY = Math.max(maxY, card.y + card.height);
    });
    
    console.log(`    总卡牌数: ${result.cards.length}`);
    console.log(`    卡牌区域: X: [${minX.toFixed(1)}, ${maxX.toFixed(1)}], Y: [${minY.toFixed(1)}, ${maxY.toFixed(1)}]`);
    console.log(`    可用区域: X: [${result.layout.leftPadding}, ${screen.width - result.layout.rightPadding}], Y: [${result.layout.topPadding + 80}, ${screen.height - result.layout.bottomPadding - 200 - result.layout.tabBarHeight}]`);
    
    if (allValid) {
      console.log('    ✅ 所有卡牌都在安全区域内');
    } else {
      console.log('    ❌ 有卡牌超出边界');
    }
  });
});

console.log(`\n\n${'='.repeat(70)}`);
console.log('测试完成！');
console.log(`${'='.repeat(70)}`);
