const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

let gameState = {};
let systemInfo = wx.getSystemInfoSync();

canvas.width = systemInfo.windowWidth;
canvas.height = systemInfo.windowHeight;

const DOG_EMOJIS = [
  '🐕',
  '🐶',
  '🐩',
  '🦮',
  '🐕‍🦺',
  '🐾',
  '🦴',
  '🎾',
  '🏆',
  '⭐',
  '🥎',
  '🎯'
];

const levelConfig = [
  { types: 3, cardsPerType: 6, layers: 2, layerOffset: 15 },
  { types: 5, cardsPerType: 9, layers: 3, layerOffset: 18 },
  { types: 7, cardsPerType: 9, layers: 4, layerOffset: 22 },
  { types: 10, cardsPerType: 9, layers: 6, layerOffset: 28 },
];

const LEVELS = [
  { id: 1, name: '新手试炼', difficulty: 'easy', description: '让你觉得你很行～' },
  { id: 2, name: '初露锋芒', difficulty: 'easy', description: '难度逐渐增加' },
  { id: 3, name: '极限挑战', difficulty: 'hard', description: '开始有挑战了！' },
  { id: 4, name: '狗王挑战', difficulty: 'hard', description: '终极挑战！通关率<10%' },
];

function generateId(len = 6) {
  const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  while (len > 0) {
    res += pool[Math.floor(pool.length * Math.random())];
    len--;
  }
  return res;
}

function fastShuffle(arr) {
  const res = arr.slice();
  for (let i = 0; i < res.length; i++) {
    const idx = Math.floor(Math.random() * res.length);
    [res[i], res[idx]] = [res[idx], res[i]];
  }
  return res;
}

function generateCards(level) {
  const cards = [];
  const config = levelConfig[Math.min(level - 1, levelConfig.length - 1)];
  const iconPool = DOG_EMOJIS.slice(0, config.types);

  const allCards = [];
  for (const type of iconPool) {
    for (let i = 0; i < config.cardsPerType; i++) {
      allCards.push({ type, emoji: type });
    }
  }

  const shuffledCards = fastShuffle(allCards);
  const layerCards = [];

  if (level === 4) {
    const typeIndices = {};
    iconPool.forEach(type => {
      typeIndices[type] = [];
    });

    shuffledCards.forEach((card, index) => {
      typeIndices[card.type].push(index);
    });

    const layerAssignments = new Array(shuffledCards.length).fill(0);

    iconPool.forEach(type => {
      const indices = typeIndices[type];
      for (let i = 0; i < indices.length; i++) {
        layerAssignments[indices[i]] = i % config.layers;
      }
    });

    for (let i = layerAssignments.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (shuffledCards[i].type !== shuffledCards[j].type) {
        [layerAssignments[i], layerAssignments[j]] = [layerAssignments[j], layerAssignments[i]];
      }
    }

    for (let layer = 0; layer < config.layers; layer++) {
      layerCards[layer] = [];
    }
    shuffledCards.forEach((card, index) => {
      const layer = layerAssignments[index];
      layerCards[layer].push(card);
    });
  } else {
    for (let layer = 0; layer < config.layers; layer++) {
      const start = Math.floor((layer / config.layers) * shuffledCards.length);
      const end = Math.floor(((layer + 1) / config.layers) * shuffledCards.length);
      layerCards.push(shuffledCards.slice(start, end));
    }
  }

  let zIndex = 0;
  const centerX = Math.min(180, systemInfo.windowWidth / 2);
  const centerY = Math.min(200, systemInfo.windowHeight / 2 - 50);

  for (let layer = 0; layer < config.layers; layer++) {
    const layerData = layerCards[layer];
    const layerOffset = layer * config.layerOffset;
    const cardsInLayer = layerData.length;

    const cols = Math.ceil(Math.sqrt(cardsInLayer * 1.5));
    const rows = Math.ceil(cardsInLayer / cols);

    const cellWidth = 70;
    const cellHeight = 70;

    const startX = centerX - (cols * cellWidth) / 2 + layerOffset;
    const startY = centerY - (rows * cellHeight) / 2 + layerOffset;

    for (let i = 0; i < layerData.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const randomOffsetX = (Math.random() - 0.5) * 20;
      const randomOffsetY = (Math.random() - 0.5) * 20;

      cards.push({
        id: generateId(6),
        type: layerData[i].type,
        emoji: layerData[i].emoji,
        x: startX + col * cellWidth + randomOffsetX,
        y: startY + row * cellHeight + randomOffsetY,
        width: 70,
        height: 70,
        zIndex: zIndex++,
        isCover: false,
        status: 0
      });
    }
  }

  return checkCover(cards);
}

function checkCover(cards) {
  const updateCards = cards.slice();
  const cardWidth = 90;
  const cardHeight = 90;

  for (let i = 0; i < updateCards.length; i++) {
    const cur = updateCards[i];
    cur.isCover = false;

    if (cur.status !== 0) continue;

    const x1 = cur.x;
    const y1 = cur.y;
    const x2 = x1 + cardWidth;
    const y2 = y1 + cardHeight;

    for (let j = 0; j < updateCards.length; j++) {
      if (i === j) continue;

      const compare = updateCards[j];
      if (compare.status !== 0) continue;

      if (compare.zIndex <= cur.zIndex) continue;

      const x = compare.x;
      const y = compare.y;

      if (!(y + cardHeight <= y1 || y >= y2 || x + cardWidth <= x1 || x >= x2)) {
        cur.isCover = true;
        break;
      }
    }
  }

  return updateCards;
}

function washCards(level, cards) {
  const updateCards = cards.filter(c => c.status === 0);
  const eliminatedCards = cards.filter(c => c.status === 2);

  const shuffled = fastShuffle(updateCards);

  const config = levelConfig[Math.min(level - 1, levelConfig.length - 1)];
  const centerX = Math.min(180, systemInfo.windowWidth / 2);
  const centerY = Math.min(200, systemInfo.windowHeight / 2 - 50);

  const cols = Math.ceil(Math.sqrt(shuffled.length * 1.5));
  const rows = Math.ceil(shuffled.length / cols);

  const cellWidth = 70;
  const cellHeight = 70;

  const startX = centerX - (cols * cellWidth) / 2;
  const startY = centerY - (rows * cellHeight) / 2;

  let zIndex = 0;
  shuffled.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const randomOffsetX = (Math.random() - 0.5) * 20;
    const randomOffsetY = (Math.random() - 0.5) * 20;

    card.x = startX + col * cellWidth + randomOffsetX;
    card.y = startY + row * cellHeight + randomOffsetY;
    card.zIndex = zIndex++;
    card.isCover = false;
  });

  return checkCover([...shuffled, ...eliminatedCards]);
}

function initGame(level = 1) {
  const cards = generateCards(level);
  gameState = {
    currentLevel: level,
    cards,
    queue: [],
    score: 0,
    timeLeft: 300,
    undoCount: 2,
    shuffleCount: 2,
    isPaused: false,
    isGameOver: false,
    isWin: false,
    showStartScreen: true,
    history: []
  };
  gameState.history.push({
    cards: JSON.parse(JSON.stringify(cards)),
    queue: [],
    score: 0
  });
  render();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FEF3E2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (gameState.showStartScreen) {
    renderStartScreen();
    return;
  }

  renderGameScreen();
}

function renderStartScreen() {
  ctx.fillStyle = '#FF9A3C';
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐶 狗了个狗', canvas.width / 2, canvas.height / 2 - 100);

  ctx.fillStyle = '#6B5B4F';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText(LEVELS[gameState.currentLevel - 1].name, canvas.width / 2, canvas.height / 2 - 50);

  ctx.font = '16px Arial, sans-serif';
  ctx.fillText(LEVELS[gameState.currentLevel - 1].description, canvas.width / 2, canvas.height / 2 - 20);

  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = '#6B5B4F';
  ctx.fillText('🔄 每局有2次洗牌机会', canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText('↩️ 每局有2次撤回机会', canvas.width / 2, canvas.height / 2 + 55);

  const btnX = canvas.width / 2 - 100;
  const btnY = canvas.height / 2 + 100;
  ctx.fillStyle = '#FF9A3C';
  ctx.strokeStyle = '#E88932';
  ctx.lineWidth = 2;
  roundRect(ctx, btnX, btnY, 200, 50, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('开始游戏', canvas.width / 2, btnY + 30);

  gameState.startBtn = { x: btnX, y: btnY, width: 200, height: 50 };
}

function renderGameScreen() {
  renderTitle();
  renderCards();
  renderSlot();
  renderInfo();
  renderButtons();

  if (gameState.isPaused) {
    renderPauseModal();
  }
  if (gameState.isWin) {
    renderWinModal();
  }
  if (gameState.isGameOver) {
    renderLoseModal();
  }
}

function renderTitle() {
  ctx.fillStyle = '#FF9A3C';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐶 狗了个狗', canvas.width / 2, 35);
}

function renderCards() {
  gameState.cards
    .filter(c => c.status === 0)
    .sort((a, b) => a.zIndex - b.zIndex)
    .forEach(card => {
      ctx.save();

      ctx.fillStyle = card.isCover ? 'rgba(0,0,0,0.1)' : '#FFFFFF';
      ctx.strokeStyle = card.isCover ? '#CCC' : '#FF9A3C';
      ctx.lineWidth = 2;

      roundRect(ctx, card.x, card.y, card.width, card.height, 10);
      ctx.fill();
      ctx.stroke();

      ctx.font = '36px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = card.isCover ? 0.6 : 1;
      ctx.fillText(card.emoji, card.x + card.width / 2, card.y + card.height / 2);

      ctx.restore();
    });
}

function renderSlot() {
  const slotY = canvas.height - 180;
  const slotWidth = 70;
  const slotHeight = 90;

  ctx.fillStyle = '#FFF5E6';
  ctx.strokeStyle = '#FFB86C';
  ctx.lineWidth = 2;

  for (let i = 0; i < 7; i++) {
    const x = 20 + i * (slotWidth + 5);
    roundRect(ctx, x, slotY, slotWidth, slotHeight, 10);
    ctx.fill();
    ctx.stroke();
  }

  gameState.queue.forEach((card, i) => {
    const x = 20 + i * (slotWidth + 5);
    ctx.font = '36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(card.emoji, x + slotWidth / 2, slotY + slotHeight / 2);
  });
}

function renderInfo() {
  const infoY = canvas.height - 220;
  ctx.fillStyle = '#6B5B4F';
  ctx.font = '18px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`得分: ${gameState.score}`, 20, infoY);
  ctx.textAlign = 'right';
  ctx.fillText(`⏱️ ${Math.floor(gameState.timeLeft / 60)}:${(gameState.timeLeft % 60).toString().padStart(2, '0')}`, canvas.width - 20, infoY);
}

function renderButtons() {
  const btnY = canvas.height - 70;
  const btnWidth = (canvas.width - 60) / 3;

  const buttons = [
    { text: `🔄 洗牌 (${gameState.shuffleCount})`, x: 20, action: 'shuffle' },
    { text: `↩️ 撤回 (${gameState.undoCount})`, x: 40 + btnWidth, action: 'undo' },
    { text: '⏸️ 暂停', x: 60 + btnWidth * 2, action: 'pause' }
  ];

  gameState.actionButtons = [];

  buttons.forEach(btn => {
    ctx.fillStyle = '#FF9A3C';
    ctx.strokeStyle = '#E88932';
    ctx.lineWidth = 2;
    roundRect(ctx, btn.x, btnY, btnWidth, 50, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(btn.text, btn.x + btnWidth / 2, btnY + 25);

    gameState.actionButtons.push({ ...btn, y: btnY, width: btnWidth, height: 50 });
  });
}

function renderPauseModal() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const modalX = canvas.width / 2 - 140;
  const modalY = canvas.height / 2 - 100;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF9A3C';
  ctx.lineWidth = 3;
  roundRect(ctx, modalX, modalY, 280, 200, 15);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#6B5B4F';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('游戏暂停', canvas.width / 2, modalY + 50);

  const btn1X = canvas.width / 2 - 100;
  const btn1Y = modalY + 90;
  ctx.fillStyle = '#FF9A3C';
  ctx.strokeStyle = '#E88932';
  ctx.lineWidth = 2;
  roundRect(ctx, btn1X, btn1Y, 200, 45, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('继续游戏', canvas.width / 2, btn1Y + 27);

  gameState.pauseBtn = { x: btn1X, y: btn1Y, width: 200, height: 45 };
}

function renderWinModal() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const modalX = canvas.width / 2 - 140;
  const modalY = canvas.height / 2 - 120;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF9A3C';
  ctx.lineWidth = 3;
  roundRect(ctx, modalX, modalY, 280, 240, 15);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#6B5B4F';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎉 恭喜通关！', canvas.width / 2, modalY + 50);

  ctx.font = '20px Arial, sans-serif';
  ctx.fillText(`得分: ${gameState.score}`, canvas.width / 2, modalY + 85);

  const btn1X = canvas.width / 2 - 100;
  const btn1Y = modalY + 110;
  ctx.fillStyle = '#FF9A3C';
  ctx.strokeStyle = '#E88932';
  ctx.lineWidth = 2;
  roundRect(ctx, btn1X, btn1Y, 200, 45, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('下一关', canvas.width / 2, btn1Y + 27);

  const btn2X = canvas.width / 2 - 100;
  const btn2Y = modalY + 165;
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF9A3C';
  ctx.lineWidth = 2;
  roundRect(ctx, btn2X, btn2Y, 200, 45, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FF9A3C';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('再玩一次', canvas.width / 2, btn2Y + 27);

  gameState.winBtn1 = { x: btn1X, y: btn1Y, width: 200, height: 45 };
  gameState.winBtn2 = { x: btn2X, y: btn2Y, width: 200, height: 45 };
}

function renderLoseModal() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const modalX = canvas.width / 2 - 140;
  const modalY = canvas.height / 2 - 120;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF6B6B';
  ctx.lineWidth = 3;
  roundRect(ctx, modalX, modalY, 280, 240, 15);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#6B5B4F';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('😢 挑战失败', canvas.width / 2, modalY + 50);

  ctx.font = '20px Arial, sans-serif';
  ctx.fillText(`得分: ${gameState.score}`, canvas.width / 2, modalY + 85);

  const btn1X = canvas.width / 2 - 100;
  const btn1Y = modalY + 110;
  ctx.fillStyle = '#FF9A3C';
  ctx.strokeStyle = '#E88932';
  ctx.lineWidth = 2;
  roundRect(ctx, btn1X, btn1Y, 200, 45, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('再试一次', canvas.width / 2, btn1Y + 27);

  const btn2X = canvas.width / 2 - 100;
  const btn2Y = modalY + 165;
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF9A3C';
  ctx.lineWidth = 2;
  roundRect(ctx, btn2X, btn2Y, 200, 45, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FF9A3C';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('分享给好友', canvas.width / 2, btn2Y + 27);

  gameState.loseBtn1 = { x: btn1X, y: btn1Y, width: 200, height: 45 };
  gameState.loseBtn2 = { x: btn2X, y: btn2Y, width: 200, height: 45 };
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  handleClick(x, y);
});

function handleClick(x, y) {
  if (gameState.showStartScreen) {
    if (gameState.startBtn &&
        x >= gameState.startBtn.x && x <= gameState.startBtn.x + gameState.startBtn.width &&
        y >= gameState.startBtn.y && y <= gameState.startBtn.y + gameState.startBtn.height) {
      gameState.showStartScreen = false;
      startTimer();
      render();
    }
    return;
  }

  if (gameState.isPaused) {
    if (gameState.pauseBtn &&
        x >= gameState.pauseBtn.x && x <= gameState.pauseBtn.x + gameState.pauseBtn.width &&
        y >= gameState.pauseBtn.y && y <= gameState.pauseBtn.y + gameState.pauseBtn.height) {
      gameState.isPaused = false;
      render();
    }
    return;
  }

  if (gameState.isWin) {
    if (gameState.winBtn1 &&
        x >= gameState.winBtn1.x && x <= gameState.winBtn1.x + gameState.winBtn1.width &&
        y >= gameState.winBtn1.y && y <= gameState.winBtn1.y + gameState.winBtn1.height) {
      const nextLevel = Math.min(gameState.currentLevel + 1, 4);
      clearInterval(gameState.timer);
      initGame(nextLevel);
      gameState.showStartScreen = false;
      startTimer();
      return;
    }
    if (gameState.winBtn2 &&
        x >= gameState.winBtn2.x && x <= gameState.winBtn2.x + gameState.winBtn2.width &&
        y >= gameState.winBtn2.y && y <= gameState.winBtn2.y + gameState.winBtn2.height) {
      clearInterval(gameState.timer);
      initGame(gameState.currentLevel);
      gameState.showStartScreen = false;
      startTimer();
      return;
    }
    return;
  }

  if (gameState.isGameOver) {
    if (gameState.loseBtn1 &&
        x >= gameState.loseBtn1.x && x <= gameState.loseBtn1.x + gameState.loseBtn1.width &&
        y >= gameState.loseBtn1.y && y <= gameState.loseBtn1.y + gameState.loseBtn1.height) {
      clearInterval(gameState.timer);
      initGame(gameState.currentLevel);
      gameState.showStartScreen = false;
      startTimer();
      return;
    }
    if (gameState.loseBtn2) {
      return;
    }
    return;
  }

  if (gameState.actionButtons) {
    for (const btn of gameState.actionButtons) {
      if (x >= btn.x && x <= btn.x + btn.width &&
          y >= btn.y && y <= btn.y + btn.height) {
        if (btn.action === 'shuffle') {
          shuffle();
        } else if (btn.action === 'undo') {
          undo();
        } else if (btn.action === 'pause') {
          gameState.isPaused = true;
          render();
        }
        return;
      }
    }
  }

  const sortedCards = [...gameState.cards]
    .filter(c => c.status === 0 && !c.isCover)
    .sort((a, b) => b.zIndex - a.zIndex);

  for (const card of sortedCards) {
    if (x >= card.x && x <= card.x + card.width &&
        y >= card.y && y <= card.y + card.height) {
      handleCardClick(card);
      return;
    }
  }
}

function handleCardClick(card) {
  gameState.history.push({
    cards: JSON.parse(JSON.stringify(gameState.cards)),
    queue: [...gameState.queue],
    score: gameState.score
  });
  if (gameState.history.length > 10) gameState.history.shift();

  card.status = 1;
  gameState.queue.push(card);
  gameState.score += 10;
  checkMatches();
  checkCover(gameState.cards);

  if (gameState.queue.length === 7) {
    gameState.isGameOver = true;
    clearInterval(gameState.timer);
  }

  if (gameState.cards.every(c => c.status === 2)) {
    gameState.isWin = true;
    clearInterval(gameState.timer);
  }

  render();
}

function checkMatches() {
  const counts = {};
  gameState.queue.forEach(card => {
    counts[card.type] = (counts[card.type] || 0) + 1;
  });

  Object.entries(counts).forEach(([type, count]) => {
    if (count >= 3) {
      for (let i = 0; i < Math.floor(count / 3); i++) {
        let removed = 0;
        gameState.queue = gameState.queue.filter(card => {
          if (card.type === type && removed < 3) {
            removed++;
            card.status = 2;
            return false;
          }
          return true;
        });
        gameState.score += 3;
      }
    }
  });
}

function shuffle() {
  if (gameState.shuffleCount <= 0) return;
  gameState.shuffleCount--;
  gameState.cards = washCards(gameState.currentLevel, gameState.cards);
  render();
}

function undo() {
  if (gameState.undoCount <= 0 || gameState.history.length <= 1) return;
  gameState.undoCount--;
  gameState.history.pop();
  const last = gameState.history[gameState.history.length - 1];
  gameState.cards = JSON.parse(JSON.stringify(last.cards));
  gameState.queue = [...last.queue];
  gameState.score = last.score;
  render();
}

function startTimer() {
  gameState.timer = setInterval(() => {
    if (!gameState.isPaused && !gameState.isGameOver && !gameState.isWin && !gameState.showStartScreen) {
      gameState.timeLeft--;
      if (gameState.timeLeft <= 0) {
        gameState.isGameOver = true;
        clearInterval(gameState.timer);
      }
      render();
    }
  }, 1000);
}

initGame(1);
