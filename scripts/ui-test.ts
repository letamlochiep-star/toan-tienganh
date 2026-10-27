import { test, expect } from '@playwright/test';

// Mobile configuration (360x640)
test.use({
  viewport: { width: 360, height: 640 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Mobile Safari/537.36',
});

test('UI layout mobile 360px', async ({ page }) => {
  // Start dev server is already running on localhost:3000
  await page.goto('http://localhost:3000');

  // Verify main button exists and has adequate size
  const startBtn = page.locator('text=Bắt đầu học');
  await expect(startBtn).toBeVisible();
  const btnBox = await startBtn.boundingBox();
  console.log('Start button size:', btnBox?.width, 'x', btnBox?.height);
  expect(btnBox?.width).toBeGreaterThanOrEqual(40);
  expect(btnBox?.height).toBeGreaterThanOrEqual(40);

  // Click to go to day 1 learning page
  await startBtn.click();
  await page.waitForURL('**/hoc/1');

  // Check that speaker icons are visible (button inside SpeakableWord)
  const speakerButtons = page.locator('button[aria-label^="Nghe phát âm:"]');
  await expect(speakerButtons.first()).toBeVisible();
  const iconBox = await speakerButtons.first().boundingBox();
  console.log('Speaker button size:', iconBox?.width, 'x', iconBox?.height);
  expect(iconBox?.width).toBeGreaterThanOrEqual(40);
  expect(iconBox?.height).toBeGreaterThanOrEqual(40);

  // Take screenshot for review
  await page.screenshot({ path: 'mobile-ui.png', fullPage: true });
});
