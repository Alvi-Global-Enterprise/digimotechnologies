import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const url of ['http://localhost:3000/', 'http://localhost:3000/services', 'http://localhost:3000/pricing']) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(3500);
  const info = await page.evaluate(() => {
    const links = [...document.querySelectorAll('[data-framer-name=\"Nav Links\"] a')].map(a => ({
      text: (a.innerText||'').trim(),
      href: a.getAttribute('href'),
      active: a.getAttribute('data-framer-name') === 'Text - Active'
    })).filter(x => x.text && x.text !== 'Book a call');
    return links;
  });
  console.log(url, JSON.stringify(info));
}
await browser.close();
