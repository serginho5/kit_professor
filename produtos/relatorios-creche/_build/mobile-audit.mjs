// Auditoria do celular: elementos mais largos que a tela + prints de cada "tela" ao rolar.
import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
const [, , file, prefix = 'preview/mob', w = '390', h = '844'] = process.argv;
const b = await Browser.launch({ width: +w, height: +h });
const p = await b.newPage({ width: +w, height: +h, mobile: true, dsf: 2 });
await p.goto(pathToFileURL(file).href, { settleMs: 2000 });
const info = await p.eval(() => {
  const W = document.documentElement.clientWidth, out = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); if (!r.width) return;
    if (r.right > W + 1 || r.left < -1) {
      let a = el, clipped = false;
      while ((a = a.parentElement) && a !== document.body) { const s = getComputedStyle(a); if (s.overflowX !== 'visible' || s.overflow === 'hidden') { clipped = true; break; } }
      if (!clipped) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} left=${Math.round(r.left)} right=${Math.round(r.right)}`);
    }
  });
  return { W, scrollW: document.documentElement.scrollWidth, H: document.documentElement.scrollHeight, overflow: out.slice(0, 15) };
});
console.log(JSON.stringify(info, null, 1));
let y = 0, n = 0;
while (y < info.H && n < 30) {
  await p.eval((yy) => { window.scrollTo(0, yy); document.querySelectorAll('[data-in]').forEach(e => e.classList.add('is-in')); }, y);
  await new Promise(r => setTimeout(r, 450));
  await p.screenshot({ path: `${prefix}-${String(n).padStart(2, '0')}.jpg`, quality: 60 });
  y += +h - 80; n++;
}
await b.close(); console.log('telas', n);
