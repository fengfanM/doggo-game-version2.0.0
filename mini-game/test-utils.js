const utils = require('./utils.js');

function testCalculateSafeArea() {
  console.log('=== 测试 calculateSafeArea ===');
  
  const testCases = [
    {
      name: '普通屏幕（无安全区域）',
      canvas: { width: 375, height: 667 },
      safeArea: { top: 0, bottom: 667, left: 0, right: 375 }
    },
    {
      name: '刘海屏（iPhone X 类似）',
      canvas: { width: 375, height: 812 },
      safeArea: { top: 44, bottom: 778, left: 0, right: 375 }
    },
    {
      name: '超窄屏',
      canvas: { width: 300, height: 800 },
      safeArea: { top: 20, bottom: 780, left: 10, right: 290 }
    },
    {
      name: '超宽屏（横屏）',
      canvas: { width: 800, height: 400 },
      safeArea: { top: 20, bottom: 380, left: 40, right: 760 }
    }
  ];

  testCases.forEach(test => {
    const result = utils.calculateSafeArea(test.safeArea, test.canvas);
    console.log(`\n${test.name}:`);
    console.log('  屏幕尺寸:', `${test.canvas.width}x${test.canvas.height}`);
    console.log('  安全区域:', `top:${test.safeArea.top}, bottom:${test.safeArea.bottom}, left:${test.safeArea.left}, right:${test.safeArea.right}`);
    console.log('  计算结果:', JSON.stringify(result, null, 4));
  });
}

function testCalculateHeaderLayout() {
  console.log('\n\n=== 测试 calculateHeaderLayout ===');
  
  const testCases = [
    {
      name: '普通屏幕',
      canvas: { width: 375, height: 667 },
      safeArea: { top: 20, bottom: 667, left: 0, right: 375 }
    },
    {
      name: '刘海屏',
      canvas: { width: 375, height: 812 },
      safeArea: { top: 44, bottom: 778, left: 0, right: 375 }
    },
    {
      name: '超窄屏',
      canvas: { width: 300, height: 800 },
      safeArea: { top: 20, bottom: 780, left: 10, right: 290 }
    },
    {
      name: '超宽屏',
      canvas: { width: 800, height: 400 },
      safeArea: { top: 20, bottom: 380, left: 40, right: 760 }
    }
  ];

  testCases.forEach(test => {
    const result = utils.calculateHeaderLayout(test.canvas, test.safeArea);
    console.log(`\n${test.name}:`);
    console.log('  计算结果:', JSON.stringify(result, null, 4));
    
    const pauseBtnValid = result.pauseBtnX > 0 && result.pauseBtnX < test.canvas.width;
    const statsValid = result.stats.every(s => s.x > 0 && s.x < test.canvas.width);
    
    console.log('  暂停按钮位置有效:', pauseBtnValid);
    console.log('  统计信息位置有效:', statsValid);
  });
}

function testCalculateCardSize() {
  console.log('\n\n=== 测试 calculateCardSize ===');
  
  const testCases = [
    { name: '普通尺寸', availableWidth: 300, availableHeight: 400, cols: 5, rows: 5 },
    { name: '超窄可用空间', availableWidth: 150, availableHeight: 400, cols: 5, rows: 5 },
    { name: '超宽可用空间', availableWidth: 600, availableHeight: 200, cols: 5, rows: 3 },
    { name: '小屏幕', availableWidth: 200, availableHeight: 200, cols: 3, rows: 3 }
  ];

  testCases.forEach(test => {
    const result = utils.calculateCardSize(test.availableWidth, test.availableHeight, test.cols, test.rows);
    console.log(`\n${test.name}:`);
    console.log('  可用空间:', `${test.availableWidth}x${test.availableHeight}`);
    console.log('  行列数:', `${test.cols}x${test.rows}`);
    console.log('  卡牌尺寸:', `${result.cellWidth}x${result.cellHeight}`);
    
    const totalCardsWidth = test.cols * result.cellWidth;
    const totalCardsHeight = test.rows * result.cellHeight;
    const fitsWidth = totalCardsWidth <= test.availableWidth;
    const fitsHeight = totalCardsHeight <= test.availableHeight;
    
    console.log('  总宽度:', totalCardsWidth, '是否符合:', fitsWidth);
    console.log('  总高度:', totalCardsHeight, '是否符合:', fitsHeight);
  });
}

function testCalculateStartScreenLayout() {
  console.log('\n\n=== 测试 calculateStartScreenLayout ===');
  
  const testCases = [
    {
      name: '普通屏幕',
      canvas: { width: 375, height: 667 },
      safeArea: { top: 20, bottom: 667, left: 0, right: 375 }
    },
    {
      name: '刘海屏',
      canvas: { width: 375, height: 812 },
      safeArea: { top: 44, bottom: 778, left: 0, right: 375 }
    },
    {
      name: '超宽屏',
      canvas: { width: 800, height: 400 },
      safeArea: { top: 20, bottom: 380, left: 40, right: 760 }
    }
  ];

  testCases.forEach(test => {
    const result = utils.calculateStartScreenLayout(test.canvas, test.safeArea);
    console.log(`\n${test.name}:`);
    console.log('  计算结果:', JSON.stringify(result, null, 4));
    
    const allStatsValid = result.stats.every(s => s.x > 0 && s.x < test.canvas.width);
    console.log('  所有统计位置有效:', allStatsValid);
  });
}

function testAll() {
  console.log('='.repeat(60));
  console.log('开始测试工具函数');
  console.log('='.repeat(60));

  testCalculateSafeArea();
  testCalculateHeaderLayout();
  testCalculateCardSize();
  testCalculateStartScreenLayout();

  console.log('\n\n' + '='.repeat(60));
  console.log('测试完成！');
  console.log('='.repeat(60));
}

testAll();
