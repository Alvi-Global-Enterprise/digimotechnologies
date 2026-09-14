import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => {
  const root = document.querySelector('#main > div');
  const kids = [...(root?.children || [])].map((el,i) => ({
    i,
    name: el.getAttribute('data-framer-name'),
    tag: el.tagName,
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    h: Math.round(el.getBoundingClientRect().height),
    text: (el.innerText||'').slice(0,80).replace(/\s+/g,' ')
  }));
  return kids;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
