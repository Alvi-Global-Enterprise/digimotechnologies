import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const url of ['http://localhost:3000/about', 'http://localhost:3000/blogs/have-we-lost-the-joy-of-branding-a-case-study']) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2500);
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('[data-framer-name=\"Nav Links\"] a')].map(a => [(a.innerText||'').trim(), a.getAttribute('href')]));
  console.log(url, hrefs);
}
await browser.close();
