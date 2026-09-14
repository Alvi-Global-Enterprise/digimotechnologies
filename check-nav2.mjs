import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(4000);
const info = await page.evaluate(() => [...document.querySelectorAll('[data-framer-name=\"Nav Links\"] a')].map(a => ({
  text:(a.innerText||'').trim(), active: a.getAttribute('data-framer-name')==='Text - Active'
})).filter(x => x.text && x.text !== 'Book a call'));
console.log(info);
await browser.close();
