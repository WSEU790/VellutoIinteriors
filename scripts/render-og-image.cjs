// Renders public/images/og-default.svg to a 1200x630 JPG for social previews.
// Requires Playwright with Chromium installed (dev-only): node scripts/render-og-image.cjs
const { chromium } = require('playwright');
const path = require('node:path');
(async () => {
  const svg = path.resolve(__dirname, '../public/images/og-default.svg');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + svg);
  await p.screenshot({ path: path.resolve(__dirname, '../public/images/og-default.jpg'), type: 'jpeg', quality: 90 });
  await b.close();
})();
