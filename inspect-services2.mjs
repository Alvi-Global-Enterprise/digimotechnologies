import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => {
  const all = [...document.querySelectorAll('[data-framer-name]')].map(el => el.getAttribute('data-framer-name'));
  const unique = [...new Set(all)].sort();
  const footerish = unique.filter(n => /foot|nav|header|menu|cta|contact/i.test(n));
  const sections = [...document.querySelectorAll('#main > * , #main section, [data-framer-name^=\"Section\"]')].map(el => ({
    name: el.getAttribute('data-framer-name'),
    tag: el.tagName,
    class: (el.className||'').toString().slice(0,40),
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    h: Math.round(el.getBoundingClientRect().height)
  }));
  // find sticky/fixed at top
  const fixed = [...document.querySelectorAll('#main *')].filter(el => {
    const s = getComputedStyle(el);
    return (s.position === 'fixed' || s.position === 'sticky') && el.getBoundingClientRect().height > 30;
  }).slice(0,10).map(el => ({name: el.getAttribute('data-framer-name'), pos: getComputedStyle(el).position, top: el.getBoundingClientRect().top, h: el.getBoundingClientRect().height, text:(el.innerText||'').slice(0,40)}));
  return { footerish, uniqueCount: unique.length, sections: sections.filter(s=>s.h>40).slice(0,40), fixed };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
