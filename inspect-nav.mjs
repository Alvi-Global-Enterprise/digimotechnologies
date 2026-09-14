import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);
const info = await page.evaluate(() => {
  const navLinks = document.querySelector('[data-framer-name=\"Nav Links\"]');
  const links = [...document.querySelectorAll('a')].filter(a => {
    const t = (a.innerText||'').trim();
    return ['Home','About','Services','Contact'].includes(t);
  }).map(a => {
    const r = a.getBoundingClientRect();
    const parent = a.closest('[data-framer-name]');
    return {
      text: t = (a.innerText||'').trim(),
      href: a.getAttribute('href'),
      w: Math.round(r.width), h: Math.round(r.height),
      top: Math.round(r.top), left: Math.round(r.left),
      parentName: parent?.getAttribute('data-framer-name'),
      parentClass: (a.parentElement?.className||'').toString().slice(0,60),
      fixed: (() => { let n=a; while(n){ if(getComputedStyle(n).position==='fixed') return true; n=n.parentElement;} return false; })()
    };
  }).filter(x => x.fixed || x.top < 150);
  return {
    navLinksHtml: navLinks ? navLinks.innerHTML.slice(0,500) : null,
    navLinksChildren: navLinks ? [...navLinks.children].map(c => ({name:c.getAttribute('data-framer-name'), tag:c.tagName, text:(c.innerText||'').slice(0,40), href:c.getAttribute('href')})) : null,
    links
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
