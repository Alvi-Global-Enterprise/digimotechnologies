import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);
const html = await page.evaluate(() => {
  const a = [...document.querySelectorAll('[data-framer-name=\"Nav Links\"] a')].find(x => (x.innerText||'').trim()==='Services');
  return a ? a.closest('[class*=\"-container\"]')?.outerHTML : null;
});
console.log(html);

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
await page.click('[data-framer-name=\"Hamburger\"]');
await page.waitForTimeout(1000);
const mobile = await page.evaluate(() => {
  const links = [...document.querySelectorAll('a')].filter(a => {
    const t = (a.innerText||'').trim();
    const r = a.getBoundingClientRect();
    return ['Home','About','Services','Contact'].includes(t) && r.width > 0 && r.height > 0;
  }).map(a => ({
    text:(a.innerText||'').trim(),
    href:a.getAttribute('href'),
    parent: a.parentElement?.className?.toString?.().slice(0,50),
    grand: a.parentElement?.parentElement?.getAttribute?.('data-framer-name'),
    containerHtml: a.closest('[class*=\"-container\"]')?.outerHTML?.slice(0,300)
  }));
  return links;
});
console.log('MOBILE', JSON.stringify(mobile, null, 2));
await browser.close();
