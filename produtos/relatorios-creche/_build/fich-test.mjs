import { Browser } from 'file:///C:/Users/sergi/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
for (const [w, h, nome] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  const b = await Browser.launch({ width: w, height: h });
  const p = await b.newPage({ width: w, height: h, mobile: w < 600, dsf: 2 });
  const errs = []; await p.send('Runtime.enable'); p.browser.on(p.sessionId, 'Runtime.exceptionThrown', e => errs.push(e.exceptionDetails.exception?.description || e.exceptionDetails.text));
  await p.goto(pathToFileURL('../pagina-de-vendas/index.html').href, { settleMs: 1500 });
  const r = await p.eval(async () => {
    document.querySelectorAll('[data-in]').forEach(e => e.classList.add('is-in'));
    const f = document.querySelector('.fich'); f.scrollIntoView({ block: 'center' });
    await new Promise(r => setTimeout(r, 500));
    const tabs = [...document.querySelectorAll('.fich__tab')];
    const vis = tabs.map(t => { const r = t.getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width / 2, r.top + 12); return t.contains(el) || el === t; });
    tabs[3].click(); await new Promise(r => setTimeout(r, 500));
    const ativo = document.querySelector('.fich__card.is-on h3').textContent;
    return { abasClicaveis: vis.join(','), aposClicarRede: ativo, largura: document.documentElement.scrollWidth };
  });
  await p.screenshot({ path: `preview/fich-${nome}.jpg`, quality: 70 });
  console.log(nome, JSON.stringify(r), 'erros:', errs.length ? errs : 'nenhum');
  await b.close();
}
