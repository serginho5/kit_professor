// Print da página inteira (viewport real 1440x900 ou 390x844), rolando antes para disparar as entradas.
// Uso: node shot.mjs arquivo.html saida.jpg [largura] [altura]
import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
const [, , file, out, w = '1440', h = '900'] = process.argv;
const b = await Browser.launch({ width: +w, height: +h });
const p = await b.newPage({ width: +w, height: +h, mobile: +w < 600, dsf: 1 });
await p.goto(pathToFileURL(file).href, { settleMs: 2500 });
const total = await p.eval(() => document.documentElement.scrollHeight);
await p.wheel(total, { step: 400, pauseMs: 60 });
await p.eval(() => { document.querySelectorAll('[data-in]').forEach(e => e.classList.add('is-in')); window.scrollTo(0, 0); });
await new Promise(r => setTimeout(r, 1200));
await p.screenshot({ path: out, fullPage: true, quality: 70 });
await b.close();
console.log('ok', out, total);
