import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);
const names = await page.evaluate(() => {
  const els = [...document.querySelectorAll('[data-framer-name]')];
  return els.map(el => ({
    name: el.getAttribute('data-framer-name'),
    tag: el.tagName.toLowerCase(),
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    h: Math.round(el.getBoundingClientRect().height),
    text: (el.innerText || '').slice(0, 60).replace(/\s+/g, ' ')
  })).filter(x => x.h > 20).slice(0, 80);
});
console.log(JSON.stringify(names, null, 2));
await browser.close();
