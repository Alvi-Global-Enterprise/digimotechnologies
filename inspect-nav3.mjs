import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);

const desktop = await page.evaluate(() => {
  const nav = document.querySelector('[data-framer-name=\"Nav Links\"]');
  const row = nav?.children?.[0];
  if (!row) return null;
  return {
    rowClass: row.className,
    children: [...row.children].map(c => {
      const a = c.querySelector('a');
      return {
        className: c.className,
        text: (a?.innerText||'').trim(),
        href: a?.getAttribute('href'),
        framerName: a?.getAttribute('data-framer-name'),
        aClass: a?.className,
        aHtml: a?.outerHTML?.slice(0, 350)
      };
    })
  };
});
console.log(JSON.stringify(desktop, null, 2));

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(800);
await page.locator('text=Home').first().waitFor({ state: 'attached' });
// click likely menu
const clicked = await page.evaluate(() => {
  const cands = [...document.querySelectorAll('[data-framer-name], button, div')].filter(el => {
    const r = el.getBoundingClientRect();
    const name = (el.getAttribute('data-framer-name')||'').toLowerCase();
    return r.width > 0 && r.height > 0 && r.top < 90 && r.left > window.innerWidth - 120 && (name.includes('menu') || name.includes('hamburger') || name.includes('burger') || el.tagName==='BUTTON');
  });
  if (cands[0]) { cands[0].click(); return cands[0].getAttribute('data-framer-name') || cands[0].tagName; }
  return null;
});
await page.waitForTimeout(800);
const mobileNav = await page.evaluate(() => {
  // find any open overlay with Home About
  const containers = [...document.querySelectorAll('[data-framer-name]')].filter(el => /Home[\s\S]*About[\s\S]*Services/.test(el.innerText||'') && el.getBoundingClientRect().height > 200);
  return containers.slice(0,3).map(el => ({
    name: el.getAttribute('data-framer-name'),
    links: [...el.querySelectorAll('a')].map(a => ({text:(a.innerText||'').trim(), href:a.getAttribute('href')})).filter(x=>x.text)
  }));
});
console.log('clicked', clicked);
console.log('mobile', JSON.stringify(mobileNav, null, 2));
await browser.close();
