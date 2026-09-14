import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(5000);
const info = await page.evaluate(() => {
  const nav = [...document.querySelectorAll('#main *')].find(el => {
    const s = getComputedStyle(el);
    return s.position === 'fixed' && /Home/.test(el.innerText||'') && /Contact/.test(el.innerText||'');
  });
  const footer = [...document.querySelectorAll('#main > div > *')].find(el => /Built by professionals|08364537/i.test(el.innerText||''));
  const pricing = document.querySelector('.digimo-pricing-home');
  const root = document.getElementById('pricing-root');
  const hidden = document.querySelectorAll('[data-digimo-pricing-hidden]');
  return {
    title: document.title,
    hasNav: !!nav,
    navText: (nav?.innerText||'').slice(0,80).replace(/\s+/g,' '),
    hasFooter: !!footer,
    footerSample: (footer?.innerText||'').slice(0,100).replace(/\s+/g,' '),
    hasPricing: !!pricing,
    pricingInRoot: !!(pricing && root && root.contains(pricing)),
    rootExists: !!root,
    hiddenCount: hidden.length,
    catCount: document.querySelectorAll('.digimo-pricing-home__cat').length,
    cardCount: document.querySelectorAll('.px-card').length
  };
});
console.log(JSON.stringify(info, null, 2));
if (errors.length) console.log('errors', errors.slice(0,5));
await browser.close();
