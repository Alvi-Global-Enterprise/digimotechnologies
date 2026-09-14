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
    rowStyle: row.getAttribute('style'),
    children: [...row.children].map(c => {
      const a = c.querySelector('a');
      return {
        className: c.className,
        html: c.outerHTML.slice(0, 400),
        text: (a?.innerText||'').trim(),
        href: a?.getAttribute('href'),
        framerName: a?.getAttribute('data-framer-name'),
        aClass: a?.className
      };
    })
  };
});

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(1000);
// open mobile menu if any
const mobile = await page.evaluate(() => {
  const all = [...document.querySelectorAll('a')].filter(a => ['Home','About','Services','Contact'].includes((a.innerText||'').trim()));
  return all.map(a => {
    const r = a.getBoundingClientRect();
    return { text:(a.innerText||'').trim(), href:a.getAttribute('href'), top:Math.round(r.top), left:Math.round(r.left), w:Math.round(r.width), visible: r.width>0 && r.height>0 && getComputedStyle(a).visibility!=='hidden' && getComputedStyle(a).display!=='none' };
  });
});

// find burger
const burger = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('button, [role=button], div')].filter(el => {
    const r = el.getBoundingClientRect();
    return r.top < 100 && r.right > window.innerWidth - 100 && r.width > 20 && r.width < 80 && r.height > 20 && r.height < 80;
  }).slice(0,5).map(el => ({tag:el.tagName, name:el.getAttribute('data-framer-name'), class:(el.className||'').toString().slice(0,40), text:(el.innerText||'').slice(0,20)}));
  return burger;
});

console.log('DESKTOP', JSON.stringify(desktop, null, 2));
console.log('MOBILE LINKS', JSON.stringify(mobile, null, 2));
await browser.close();
