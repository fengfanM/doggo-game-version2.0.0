function fastShuffle(arr) {
  const res = arr.slice();
  for (let i = 0; i < res.length; i++) {
    const idx = Math.floor(Math.random() * res.length);
    [res[i], res[idx]] = [res[idx], res[i]];
  }
  return res;
}

function calculateLayerOffset(layerIndex, totalLayers, baseOffset = 15, maxOffset = 30) {
  const progress = totalLayers <= 1 ? 0 : layerIndex / (totalLayers - 1);
  const smoothFactor = 1 - Math.cos(progress * Math.PI) / 2;
  return baseOffset + smoothFactor * (maxOffset - baseOffset);
}

function calculateRandomOffset(cellWidth, factor = 0.3) {
  const maxOffset = cellWidth * factor;
  return {
    x: (Math.random() - 0.5) * maxOffset,
    y: (Math.random() - 0.5) * maxOffset
  };
}

function distributeCardsToLayers(cards, layers) {
  const layerCards = [];
  const totalCards = cards.length;
  
  if (layers <= 0 || totalCards === 0) {
    return [cards];
  }
  
  for (let layer = 0; layer < layers; layer++) {
    const start = Math.floor((layer / layers) * totalCards);
    const end = Math.floor(((layer + 1) / layers) * totalCards);
    layerCards.push(cards.slice(start, end));
  }
  
  return layerCards;
}

function distributeCardsToLayersRandom(cards, layers) {
  const layerCards = Array.from({ length: layers }, () => []);
  const shuffled = fastShuffle(cards);
  
  shuffled.forEach((card, index) => {
    const layer = index % layers;
    layerCards[layer].push(card);
  });
  
  return layerCards.filter(layer => layer.length > 0);
}

function calculateGridDimensions(cardCount) {
  const cols = Math.ceil(Math.sqrt(cardCount * 1.5));
  const rows = Math.ceil(cardCount / cols);
  return { cols, rows };
}

function calculateGridStartPosition(centerX, centerY, cols, rows, cellWidth, cellHeight, layerOffset, bounds) {
  let startX = centerX - (cols * cellWidth) / 2 + layerOffset;
  let startY = centerY - (rows * cellHeight) / 2 + layerOffset;
  
  if (bounds) {
    startX = Math.max(bounds.minX, Math.min(startX, bounds.maxX - (cols - 1) * cellWidth));
    startY = Math.max(bounds.minY, Math.min(startY, bounds.maxY - (rows - 1) * cellHeight));
  }
  
  return { startX, startY };
}

function clampPosition(x, y, bounds) {
  return {
    x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
    y: Math.max(bounds.minY, Math.min(y, bounds.maxY))
  };
}

function arrangeCardsInLayers(cards, layout, config, cellWidth, cellHeight, bounds) {
  const totalLayers = config.layers;
  const layerCards = distributeCardsToLayers(cards, totalLayers);
  
  let zIndex = 0;
  const result = [];
  
  for (let layer = 0; layer < layerCards.length; layer++) {
    const currentLayerCards = layerCards[layer];
    if (currentLayerCards.length === 0) continue;
    
    const layerOffset = calculateLayerOffset(layer, totalLayers, config.layerOffset, config.layerOffset * 1.5);
    const { cols, rows } = calculateGridDimensions(currentLayerCards.length);
    const { startX, startY } = calculateGridStartPosition(
      layout.centerX,
      layout.centerY,
      cols,
      rows,
      cellWidth,
      cellHeight,
      layerOffset,
      bounds
    );
    
    for (let i = 0; i < currentLayerCards.length; i++) {
      const card = currentLayerCards[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const offset = calculateRandomOffset(cellWidth, 0.3);
      let x = startX + col * cellWidth + offset.x;
      let y = startY + row * cellHeight + offset.y;
      
      if (bounds) {
        const clamped = clampPosition(x, y, bounds);
        x = clamped.x;
        y = clamped.y;
      }
      
      result.push({
        ...card,
        x,
        y,
        width: cellWidth,
        height: cellHeight,
        zIndex: zIndex++,
        isCover: false
      });
    }
  }
  
  return result;
}

function shuffleCards(cards, level, layout, calculateCardSizeFn, bounds) {
  const levelConfig = [
    { types: 3, cardsPerType: 6, layers: 2, layerOffset: 15 },
    { types: 5, cardsPerType: 9, layers: 3, layerOffset: 18 },
    { types: 7, cardsPerType: 9, layers: 4, layerOffset: 22 },
    { types: 10, cardsPerType: 9, layers: 6, layerOffset: 28 },
  ];
  
  const config = levelConfig[Math.min(level - 1, levelConfig.length - 1)];
  
  const shuffled = fastShuffle(cards);
  const totalCards = shuffled.length;
  
  const { cols, rows } = calculateGridDimensions(totalCards);
  const { cellWidth, cellHeight } = calculateCardSizeFn(layout.availableWidth, layout.availableHeight, cols, rows);
  
  return arrangeCardsInLayers(shuffled, layout, config, cellWidth, cellHeight, bounds);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fastShuffle,
    calculateLayerOffset,
    calculateRandomOffset,
    distributeCardsToLayers,
    distributeCardsToLayersRandom,
    calculateGridDimensions,
    calculateGridStartPosition,
    clampPosition,
    arrangeCardsInLayers,
    shuffleCards
  };
}
