import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
const b = await Browser.launch({ width: 1440, height: 900 }); const p = await b.newPage({ width: 1440, height: 900 });
await p.goto(pathToFileURL('../../../sites/relatorios-creche/index.html').href, { settleMs: 2500 });
const r = await p.eval(async () => {
  window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 1500));
  document.querySelectorAll('img').forEach(i => i.loading = 'eager'); await new Promise(r => setTimeout(r, 2500));
  const quebradas = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
  return { imagens: document.images.length, quebradas, checkout: document.getElementById('comprar').href };
});
console.log(JSON.stringify(r, null, 1)); await b.close();
