// Gera o HTML diagramado do Banco de Frases; o Edge converte em PDF (versão de apresentação/impressão).
// Uso: node build-banco-pdf.js preview/banco.html
const fs = require('fs');
const { CAMPOS, EI01, EI02 } = require('./content/bncc');
const X = require('./content/extras');
const { EXEMPLOS, CARTA_FAMILIA, TURMA } = require('./content/exemplos');
const { ENCERRAMENTOS } = require('./content/fontes');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nome = (s) => esc(s).replace(/\[NOME\]/g, '<b class="nm">[NOME]</b>');
const COR = { EO: ['#EF6F57', '#FDE7E2'], CG: ['#2FA587', '#DCF2EB'], TS: ['#C98A0F', '#FCF0D4'], EF: ['#3F86D6', '#DFEBF9'], ET: ['#8A67C9', '#EEE7F8'] };
const NIVEIS = [['ja', 'Já demonstra', 'ja'], ['dev', 'Em desenvolvimento', 'dev'], ['ini', 'Iniciando', 'ini'], ['prox', 'Próximo passo da equipe', 'prox']];

const nObj = ['EO', 'CG', 'TS', 'EF', 'ET'].reduce((a, s) => a + EI01[s].length + EI02[s].length, 0);
const nExtras = [X.ABERTURAS, X.ROTINA, X.DELICADAS, X.FECHAMENTOS].reduce((a, b) => a + b.grupos.reduce((x, g) => x + g.frases.length, 0), 0);
const total = nObj * 4 + nExtras + X.TROCAS.length;

function objetivo(o, sig) {
  const rows = NIVEIS.map(([k, label, cls]) => `<div class="lv ${cls}"><span class="tag">${label}</span><p>${nome(o[k])}</p></div>`).join('');
  return `<div class="obj"><div class="oh"><span class="code" style="background:${COR[sig][0]}">${o.cod}</span><span class="ot">${esc(o.texto)}</span></div>${rows}</div>`;
}

function faixa(titulo, sub, dados, id) {
  let h = `<section class="part" id="${id}"><h1>${titulo}</h1><p class="lead">${sub}</p>`;
  for (const sig of ['EO', 'CG', 'TS', 'EF', 'ET']) {
    h += `<h2 class="campo" style="--c:${COR[sig][0]};--t:${COR[sig][1]}"><span>${sig}</span>${esc(CAMPOS[sig].nome)}</h2>`;
    h += dados[sig].map((o) => objetivo(o, sig)).join('');
  }
  return h + '</section>';
}

function grupos(bloco, id) {
  let h = `<section class="part" id="${id}"><h1>${esc(bloco.titulo)}</h1><p class="lead">${esc(bloco.intro)}</p>`;
  for (const g of bloco.grupos) {
    h += `<div class="grp"><h3>${esc(g.nome)}</h3>`;
    if (g.orientacao) h += `<div class="tip"><b>Como escrever:</b> ${esc(g.orientacao)}</div>`;
    h += `<ul>${g.frases.map((f) => `<li>${nome(f)}</li>`).join('')}</ul></div>`;
  }
  return h + '</section>';
}

const sumario = [
  ['Abertura e adaptação', '#ab'], ['Berçário · Bebês (EI01)', '#ei01'], ['Maternal I e II · Crianças bem pequenas (EI02)', '#ei02'],
  ['Rotina e cuidados', '#rot'], ['Situações delicadas', '#del'], ['Fechamento: conquistas e próximos passos', '#fec'],
  ['Troque isto por isto', '#trq'], ['Verbos, expressões e conectivos', '#vrb'], ['Relatórios-exemplo completos', '#ex'],
];

const enc = ENCERRAMENTOS.banco;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Banco de Frases BNCC</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=block" rel="stylesheet">
<style>
:root{--ink:#2D2A4A;--ink2:#5E5A7A;--mist:#F6F4FA;--line:#E6E2EF;--coral:#EF6F57;--sun:#E9A21F;--mint:#2FA587;--sky:#3F86D6;--lilac:#8A67C9}
@page{size:A4;margin:16mm 15mm 18mm 15mm;@bottom-left{content:"Kit Relatórios da Creche · Banco de Frases BNCC";font:8pt Nunito;color:#5E5A7A}@bottom-right{content:counter(page);font:700 8pt Nunito;color:#5E5A7A}}
@page full{margin:0;@bottom-left{content:none}@bottom-right{content:none}}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Nunito,sans-serif;color:var(--ink);font-size:10pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-family:Fredoka;font-weight:700;font-size:26pt;line-height:1.1;margin-bottom:6pt}
h3{font-family:Fredoka;font-weight:600;font-size:13pt;margin:12pt 0 6pt}
.full{page:full;width:210mm;height:297mm;position:relative;overflow:hidden;break-after:page;background:var(--ink);color:#fff;padding:22mm 18mm}
.dots span{position:absolute;border-radius:50%}
.kick{font-weight:800;font-size:10pt;letter-spacing:3pt;color:var(--sun)}
.cover h1{font-size:46pt;color:#fff;margin:8pt 0 14pt;max-width:150mm}
.cover .sub{font-size:14pt;color:#E9E6F5;max-width:150mm}
.chips{display:flex;gap:8pt;margin-top:22pt;flex-wrap:wrap}
.chip{border-radius:20pt;padding:6pt 14pt;font-weight:800;font-size:11pt;color:#fff}
.stats{position:absolute;left:18mm;right:18mm;bottom:26mm;display:grid;grid-template-columns:repeat(3,1fr);gap:10pt}
.stat{background:#3A3660;border-radius:12pt;padding:14pt}
.stat b{display:block;font-family:Fredoka;font-size:30pt;color:#fff;line-height:1}
.stat span{font-size:9.5pt;color:#E9E6F5}
.part{break-before:page}
.lead{color:var(--ink2);font-style:italic;font-size:11pt;margin-bottom:12pt}
.howto{display:grid;grid-template-columns:1fr 1fr;gap:10pt;margin:12pt 0 16pt}
.step{background:var(--mist);border-radius:12pt;padding:12pt 14pt}
.step b{font-family:Fredoka;font-size:20pt;color:var(--coral);display:block;line-height:1}
.legend{display:grid;grid-template-columns:repeat(4,1fr);gap:8pt;margin:8pt 0 16pt}
.legend div{border-radius:10pt;padding:10pt;font-size:9pt}
.legend b{display:block;font-size:10pt;margin-bottom:3pt}
.warn{background:#FCF0D4;border-radius:12pt;padding:12pt 14pt;font-size:10pt}
.toc{list-style:none;margin-top:10pt;display:grid;grid-template-columns:1fr 1fr;gap:0 8pt}
.toc li{display:flex;align-items:center;gap:8pt;background:var(--mist);border-radius:10pt;padding:8pt 12pt;margin-bottom:6pt;font-family:Fredoka;font-weight:600;font-size:10.5pt}
.toc li i{font-style:normal;color:var(--coral);font-size:15pt;width:22pt}
h2.campo{display:flex;align-items:center;gap:10pt;background:var(--t);border-radius:12pt;padding:10pt 14pt;margin:14pt 0 10pt;font-family:Fredoka;font-size:15pt;break-after:avoid}
h2.campo span{background:var(--c);color:#fff;border-radius:50%;width:30pt;height:30pt;display:flex;align-items:center;justify-content:center;font-size:10pt;flex:none}
.obj{border:1px solid var(--line);border-radius:12pt;margin-bottom:10pt;break-inside:avoid;overflow:hidden}
.oh{display:flex;gap:10pt;align-items:flex-start;padding:9pt 12pt;background:var(--mist)}
.code{color:#fff;font-weight:800;font-size:8.5pt;border-radius:6pt;padding:3pt 7pt;flex:none;letter-spacing:.5pt}
.ot{font-size:9pt;color:var(--ink2);font-weight:600}
.lv{display:grid;grid-template-columns:30mm 1fr;gap:8pt;padding:7pt 12pt;border-top:1px solid var(--line)}
.lv p{font-size:9.6pt}
.tag{font-size:7.8pt;font-weight:800;text-transform:uppercase;letter-spacing:.5pt;padding-top:2pt}
.ja .tag{color:#2FA587}.dev .tag{color:#C98A0F}.ini .tag{color:#EF6F57}.prox .tag{color:#3F86D6}
.prox{background:#F7FAFE}.prox p{font-style:italic;color:var(--ink2)}
.nm{color:var(--coral);font-weight:800}
.grp h3{break-after:avoid}.tip{break-after:avoid}
.grp ul{list-style:none}
.grp li{background:var(--mist);border-radius:10pt;padding:9pt 12pt;margin-bottom:6pt;font-size:9.8pt;break-inside:avoid}
.tip{background:#FCF0D4;border-radius:10pt;padding:9pt 12pt;margin-bottom:8pt;font-size:9.3pt}
table.trq{width:100%;border-collapse:separate;border-spacing:0 5pt}
table.trq th{font-size:8.5pt;letter-spacing:1.5pt;text-align:left;padding:0 10pt}
table.trq td{padding:8pt 10pt;font-size:9.5pt;vertical-align:top}
table.trq td:first-child{background:#FDE7E2;border-radius:10pt 0 0 10pt;width:38%;text-decoration:line-through;color:var(--ink2)}
table.trq td:last-child{background:#DCF2EB;border-radius:0 10pt 10pt 0}
table.trq tr{break-inside:avoid}
.vg{margin-bottom:12pt;break-inside:avoid}
.vg div{display:flex;flex-wrap:wrap;gap:5pt}
.vg span{background:#EEE7F8;border-radius:12pt;padding:3pt 9pt;font-size:9pt}
.ex{border:1px solid var(--line);border-radius:14pt;padding:14pt 16pt;margin-bottom:14pt}
.ex h3{margin-top:0;color:var(--coral)}
.ex h4{font-size:10pt;margin:8pt 0 2pt}
.ex p{font-size:9.6pt;margin-bottom:4pt}
.closing h1{color:#fff;font-size:28pt;max-width:160mm;margin:6pt 0 12pt}
.closing .msg{font-size:12.5pt;color:#E9E6F5;max-width:160mm}
.src{position:absolute;left:18mm;right:18mm;bottom:30mm;background:#3A3660;border-radius:14pt;padding:16pt 18pt}
.src ul{list-style:none;margin-top:8pt}
.src li{font-size:8.8pt;color:#E9E6F5;margin-bottom:4pt}
.src .nota{font-size:8.6pt;font-style:italic;color:#B9B4D3;margin-top:8pt}
.lic{position:absolute;left:18mm;bottom:14mm;font-size:8.5pt;color:#B9B4D3}
</style></head><body>

<section class="full cover">
  <div class="dots"><span style="left:118mm;top:20mm;width:62mm;height:62mm;background:#EF6F57"></span><span style="left:160mm;top:70mm;width:30mm;height:30mm;background:#E9A21F"></span><span style="left:108mm;top:72mm;width:24mm;height:24mm;background:#2FA587"></span><span style="left:142mm;top:96mm;width:16mm;height:16mm;background:#3F86D6"></span><span style="left:182mm;top:24mm;width:11mm;height:11mm;background:#8A67C9"></span></div>
  <div style="position:absolute;left:18mm;top:128mm;right:18mm">
    <div class="kick">KIT RELATÓRIOS DA CRECHE</div>
    <h1>Banco de Frases BNCC</h1>
    <p class="sub">Frases prontas para descrever o desenvolvimento de bebês e crianças bem pequenas, organizadas por campo de experiência e objetivo de aprendizagem.</p>
    <div class="chips"><span class="chip" style="background:#EF6F57">Berçário</span><span class="chip" style="background:#2FA587">Maternal I</span><span class="chip" style="background:#3F86D6">Maternal II</span></div>
  </div>
  <div class="stats"><div class="stat"><b>${nObj}</b><span>objetivos de aprendizagem da BNCC (0 a 3 anos)</span></div><div class="stat"><b>${total}</b><span>frases e sugestões prontas para copiar e personalizar</span></div><div class="stat"><b>3 + 1</b><span>níveis de descrição e o próximo passo da equipe</span></div></div>
</section>

<section>
  <div class="kick" style="color:var(--coral)">COMECE POR AQUI</div>
  <h1>Como usar o banco de frases</h1>
  <div class="howto">
    <div class="step"><b>1</b>Encontre o objetivo pelo campo de experiência. No Word ou Google Docs, use Ctrl+F com o código (ex.: EI02EO07).</div>
    <div class="step"><b>2</b>Escolha o nível que descreve a criança hoje: já demonstra, em desenvolvimento ou iniciando.</div>
    <div class="step"><b>3</b>Copie a frase, troque [NOME] pelo nome da criança (Ctrl+H troca todos de uma vez) e revise a concordância (o/a).</div>
    <div class="step"><b>4</b>Acrescente um fato ou uma fala real. Use o "próximo passo da equipe" no bloco final do relatório.</div>
  </div>
  <h3>Os níveis de cada objetivo</h3>
  <div class="legend">
    <div style="background:#DCF2EB"><b style="color:#2FA587">Já demonstra</b>A conquista aparece com frequência e autonomia.</div>
    <div style="background:#FCF0D4"><b style="color:#C98A0F">Em desenvolvimento</b>Aparece com apoio ou de vez em quando.</div>
    <div style="background:#FDE7E2"><b style="color:#EF6F57">Iniciando</b>Está surgindo; descrito de forma positiva.</div>
    <div style="background:#DFEBF9"><b style="color:#3F86D6">Próximo passo</b>O que a equipe vai propor a seguir.</div>
  </div>
  <div class="warn"><b>Importante:</b> as frases são pontos de partida, não relatórios prontos. Um relatório só é verdadeiro quando traz o que você observou: cenas, falas e conquistas daquela criança. Nunca copie o mesmo texto para várias crianças.</div>
  <h3 style="margin-top:18pt">Sumário</h3>
  <ul class="toc">${sumario.map(([t], i) => `<li><i>${String(i + 1).padStart(2, '0')}</i>${t}</li>`).join('')}</ul>
</section>

${grupos(X.ABERTURAS, 'ab')}
${faixa('Berçário · Bebês (EI01)', 'De zero a 1 ano e 6 meses. Para cada objetivo: três níveis de descrição e o próximo passo da equipe.', EI01, 'ei01')}
${faixa('Maternal I e II · Crianças bem pequenas (EI02)', 'De 1 ano e 7 meses a 3 anos e 11 meses. No Maternal I, os níveis "iniciando" e "em desenvolvimento" costumam ser os mais usados; no Maternal II, "em desenvolvimento" e "já demonstra".', EI02, 'ei02')}
${grupos(X.ROTINA, 'rot')}
${grupos(X.DELICADAS, 'del')}
${grupos(X.FECHAMENTOS, 'fec')}

<section class="part" id="trq"><h1>Troque isto por isto</h1><p class="lead">Rótulos e frases negativas ferem a criança e a família. Estas trocas mantêm a verdade com respeito.</p>
<table class="trq"><tr><th style="color:var(--coral)">EVITE</th><th style="color:var(--mint)">PREFIRA</th></tr>${X.TROCAS.map(([a, b]) => `<tr><td>${nome(a)}</td><td>${nome(b)}</td></tr>`).join('')}</table></section>

<section class="part" id="vrb"><h1>Verbos, expressões e conectivos</h1><p class="lead">Palavras que descrevem ações observáveis, mostram processo e costuram o texto.</p>
${X.VERBOS.map((v) => `<div class="vg"><h3>${esc(v.grupo)}</h3><div>${v.itens.map((i) => `<span>${esc(i)}</span>`).join('')}</div></div>`).join('')}</section>

<section class="part" id="ex"><h1>Relatórios-exemplo completos</h1><p class="lead">Crianças fictícias. Veja o tom, a extensão e como os códigos da BNCC aparecem de forma discreta.</p>
${EXEMPLOS.map((e) => `<div class="ex"><h3>${esc(e.crianca)} · ${esc(e.turma)} · ${esc(e.idade)}</h3>${e.blocos.map((b) => `<h4>${esc(b.titulo)}</h4><p>${esc(b.texto)}</p>`).join('')}</div>`).join('')}
<div class="ex"><h3>Carta à família · ${esc(CARTA_FAMILIA.crianca)}</h3><p><b>${esc(CARTA_FAMILIA.saudacao)}</b></p>${CARTA_FAMILIA.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}<p><i>${esc(CARTA_FAMILIA.assinatura)}</i></p></div>
<div class="ex"><h3>${esc(TURMA.titulo)} · ${esc(TURMA.turma)}</h3>${TURMA.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}</div></section>

<section class="full closing" style="break-before:page;break-after:auto">
  <div class="dots"><span style="left:18mm;top:22mm;width:13mm;height:13mm;background:#EF6F57"></span><span style="left:34mm;top:26mm;width:8mm;height:8mm;background:#E9A21F"></span><span style="left:23mm;top:38mm;width:9mm;height:9mm;background:#2FA587"></span><span style="left:37mm;top:38mm;width:6mm;height:6mm;background:#3F86D6"></span><span style="left:45mm;top:29mm;width:5mm;height:5mm;background:#8A67C9"></span></div>
  <div style="position:absolute;left:18mm;right:18mm;top:62mm">
    <div class="kick">PARA ENCERRAR</div>
    <h1>${esc(enc.titulo)}</h1>
    <p class="msg">${esc(enc.texto)}</p>
  </div>
  <div class="src"><div class="kick" style="font-size:8.5pt;letter-spacing:1.5pt">FONTES CONSULTADAS NA ELABORAÇÃO DESTE MATERIAL</div>
    <ul>${enc.fontes.map((f) => `<li>${esc(f)}</li>`).join('')}</ul><p class="nota">${esc(enc.nota)}</p></div>
  <div class="lic">Kit Relatórios da Creche · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.</div>
</section>
</body></html>`;

fs.writeFileSync(process.argv[2] || 'preview/banco.html', html);
console.log('ok', nObj, 'objetivos', total, 'frases');
