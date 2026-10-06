// Captures of the study: every page, three widths, full page.
//   NODE_PATH=<a node_modules with playwright> node captures/study.cjs [base-url] [page]
const { chromium } = require('playwright');
const path = require('path');
const PAGES = ['index', 'calculation', 'history', 'geometry', 'fibonacci', 'world'];
(async () => {
  const base = process.argv[2] || 'http://localhost:5178/';
  const only = process.argv[3];
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const page of only ? [only] : PAGES) {
    for (const [w, h] of [[390, 844], [820, 1180], [1440, 900]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      const errors = [];
      p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      await p.goto(`${base}${page}.html`, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(400);
      const over = await p.evaluate(() => [...document.querySelectorAll('.box, .fit')].filter((e) => e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1).length);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      await p.screenshot({ path: path.join(__dirname, `study-${page}-${w}.png`), fullPage: true });
      console.log(page, w, 'overflowing boxes:', over, 'scrollWidth:', sw, errors.length ? 'ERRORS ' + errors[0] : '');
      await ctx.close();
    }
  }
  await browser.close();
})();
