import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
const ys = process.argv.slice(2).map(Number);
const b = await Browser.launch({ width: 1440, height: 900 }); const p = await b.newPage({ width: 1440, height: 900 });
await p.goto(pathToFileURL('../pagina-de-vendas/index.html').href, { settleMs: 1500 });
for (const y of ys) {
  const info = await p.eval(async (yy) => { window.scrollTo(0, yy); document.querySelectorAll('[data-in]').forEach(e => e.classList.add('is-in')); await new Promise(r => setTimeout(r, 400));
    return [...document.querySelectorAll('.sheet')].map(s => { const r = s.getBoundingClientRect(); return Math.round(r.top) + '/' + Math.round(r.bottom); }).join(' '); }, y);
  await p.screenshot({ path: `preview/at-${y}.jpg`, quality: 60 }); console.log(y, info);
}
await b.close();
