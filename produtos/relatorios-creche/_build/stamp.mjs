import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
for (const [w, h, n] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  const b = await Browser.launch({ width: w, height: h }); const p = await b.newPage({ width: w, height: h, mobile: w < 600, dsf: 2 });
  await p.goto(pathToFileURL('../pagina-de-vendas/index.html').href, { settleMs: 1500 });
  await p.eval(async () => { const g = document.querySelector('.guarantee'); g.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 1500)); });
  await p.screenshot({ path: `preview/stamp-${n}.jpg`, quality: 75 }); await b.close();
}
console.log('ok');
