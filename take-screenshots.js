const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Take homepage screenshot
  await page.goto('http://localhost:4201');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/homepage-desktop.png', fullPage: true });
  
  // Take mobile screenshot
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'screenshots/homepage-mobile.png', fullPage: true });
  
  // Navigate to different sections and take screenshots
  const sections = ['art', 'music', 'design', 'games', 'dev', 'curriculum', 'contact'];
  
  for (const section of sections) {
    await page.goto(`http://localhost:4201/${section}`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `screenshots/${section}-desktop.png`, fullPage: true });
  }
  
  await browser.close();
  console.log('Screenshots taken successfully!');
})();