// Gera "04 - Banco de Frases BNCC (Canva).pptx": o banco de frases diagramado em A4, editável no Canva.
// Paginação automática: cada bloco tem a altura estimada pelo texto e é colocado na página enquanto couber.
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { W, H, M, C, FONT_HEAD, text, iconCircle, card, dots } = D;
const { CAMPOS, EI01, EI02 } = require('./content/bncc');
const X = require('./content/extras');
const { ENCERRAMENTOS } = require('./content/fontes');
const CW = W - 2 * M;
const MARCA = 'Kit Relatórios da Creche · Banco de Frases BNCC';
const TOP = 1.0, BOTTOM = H - 0.7; // área útil da página

// Estimativa de altura de texto (polegadas). Margem de segurança para o Canva e o PowerPoint.
function th(str, widthIn, pt) {
  const cpi = 12.6 * (10.5 / pt);
  const lines = Math.ceil((str.length * 1.04) / (widthIn * cpi));
  return lines * (pt * 1.34 / 72) + 0.04;
}
const NIVEIS = [['ja', 'Já demonstra', 'mint'], ['dev', 'Em desenvolvimento', 'sun'], ['ini', 'Iniciando', 'coral'], ['prox', 'Próximo passo da equipe', 'sky']];
const LBL = 1.72, PAD = 0.2, FS = 9.5;
const PW = CW - LBL - PAD * 2 - 0.15; // largura da coluna das frases
const nome = (t) => t; // as frases mantêm [NOME] para a professora trocar

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = 'Banco de Frases BNCC · Kit Relatórios da Creche';
  pres.author = 'Kit Relatórios da Creche';
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };
  let n = 0;
  const newPage = (sec, bg = C.paper) => { n += 1; const s = pres.addSlide({ sectionTitle: sec }); s.background = { color: bg }; return s; };
  const foot = (s) => D.footer(s, n, MARCA);

  // ---------- fluxo com paginação ----------
  let page = null, y = 0, curSec = '', kicker = '';
  function startPage(sec, k) {
    if (page) foot(page);
    page = newPage(sec); curSec = sec; kicker = k || kicker;
    text(page, kicker.toUpperCase(), { x: M, y: 0.5, w: CW, h: 0.25, fontSize: 8.5, bold: true, color: C.ink2, charSpacing: 2 });
    y = TOP;
  }
  function place(h, sec, k) {
    if (!page || sec !== curSec || y + h > BOTTOM) startPage(sec, k);
    const yy = y; y += h; return yy;
  }
  function closeFlow() { if (page) foot(page); page = null; }

  // Blocos
  function bigTitle(sec, k, titulo, sub, cor) {
    startPage(sec, k);
    const th1 = titulo.length > 30 ? 1.25 : 0.7;
    const hs = sub ? th(sub, CW, 11) + 0.1 : 0;
    const h = th1 + hs + 0.05;
    text(page, titulo, { x: M, y, w: CW, h: th1, fontSize: 28, fontFace: FONT_HEAD, bold: true });
    if (sub) text(page, sub, { x: M, y: y + th1 + 0.05, w: CW, h: hs, fontSize: 11, color: C.ink2 });
    y += h + 0.1;
  }
  async function campoHeader(sec, k, sig) {
    const cor = D.CAMPO_COR[sig], h = 1.05;
    const yy = place(h + 0.2 + 1.2, sec, k); // garante espaço para o cabeçalho e o início do primeiro cartão
    y = yy + h + 0.2;
    card(page, pres, { x: M, y: yy, w: CW, h, fill: C[cor + 'T'] });
    await iconCircle(page, pres, { x: M + 0.22, y: yy + 0.17, d: 0.7, fill: C[cor], name: D.CAMPO_ICON[sig] });
    text(page, `CAMPO DE EXPERIÊNCIA · ${sig}`, { x: M + 1.1, y: yy + 0.18, w: CW - 1.3, h: 0.25, fontSize: 8.5, bold: true, color: C[cor], charSpacing: 1.5 });
    text(page, CAMPOS[sig].nome, { x: M + 1.1, y: yy + 0.42, w: CW - 1.3, h: 0.5, fontSize: 16, fontFace: FONT_HEAD, bold: true });
  }
  function objetivoCard(sec, k, o, sig) {
    const cor = D.CAMPO_COR[sig];
    const hHead = Math.max(th(o.texto, CW - 1.75, 9), 0.3) + 0.3;
    const rows = NIVEIS.map(([key]) => Math.max(th(o[key], PW, FS), 0.32) + 0.14);
    const h = hHead + rows.reduce((a, b) => a + b, 0) + 0.12;
    const yy = place(h + 0.16, sec, k);
    card(page, pres, { x: M, y: yy, w: CW, h, fill: C.mist, radius: 0.12 });
    page.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + PAD, y: yy + 0.16, w: 1.1, h: 0.3, fill: { color: C[cor] }, line: { color: C[cor], width: 0 }, rectRadius: 0.08 });
    text(page, o.cod, { x: M + PAD, y: yy + 0.16, w: 1.1, h: 0.3, fontSize: 9, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    text(page, o.texto, { x: M + 1.5, y: yy + 0.15, w: CW - 1.75, h: hHead - 0.2, fontSize: 9, bold: true, color: C.ink2 });
    let ry = yy + hHead;
    NIVEIS.forEach(([key, label, c], i) => {
      const rh = rows[i];
      page.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + PAD - 0.05, y: ry, w: CW - 2 * PAD + 0.1, h: rh - 0.06, fill: { color: key === 'prox' ? C.skyT : 'FFFFFF' }, line: { color: 'FFFFFF', width: 0 }, rectRadius: 0.08 });
      text(page, label.toUpperCase(), { x: M + PAD + 0.1, y: ry + 0.07, w: LBL - 0.2, h: 0.3, fontSize: 7, bold: true, color: C[c], charSpacing: 0.5 });
      text(page, nome(o[key]), { x: M + PAD + LBL, y: ry + 0.06, w: PW, h: rh - 0.12, fontSize: FS, italic: key === 'prox', color: key === 'prox' ? C.ink2 : C.ink });
      ry += rh;
    });
  }
  function grupoTitulo(sec, k, t, cor = 'coral') {
    const yy = place(0.55 + 0.9, sec, k); y = yy + 0.55;
    text(page, t, { x: M, y: yy + 0.05, w: CW, h: 0.42, fontSize: 15, fontFace: FONT_HEAD, bold: true, color: C[cor] });
  }
  function orientacao(sec, k, t) {
    const h = th('Como escrever: ' + t, CW - 0.5, 9.5) + 0.3;
    if (page && y + h + 0.12 + 1.3 > BOTTOM) startPage(sec, k);
    const yy = place(h + 0.12, sec, k);
    card(page, pres, { x: M, y: yy, w: CW, h, fill: C.sunT, radius: 0.12 });
    text(page, [{ text: 'Como escrever: ', options: { bold: true } }, { text: t }], { x: M + 0.25, y: yy + 0.14, w: CW - 0.5, h: h - 0.2, fontSize: 9.5 });
  }
  function frase(sec, k, t) {
    const h = th(t, CW - 0.5, 10) + 0.28;
    const yy = place(h + 0.1, sec, k);
    card(page, pres, { x: M, y: yy, w: CW, h, fill: C.mist, radius: 0.12 });
    text(page, t, { x: M + 0.25, y: yy + 0.13, w: CW - 0.5, h: h - 0.2, fontSize: 10 });
  }

  // ================= CAPA =================
  pres.addSection({ title: 'Abertura' });
  {
    const s = newPage('Abertura', C.ink);
    const circ = [{ x: 4.4, y: 0.8, d: 3.1, c: C.mint }, { x: 6.5, y: 3.5, d: 1.3, c: C.sun }, { x: 3.7, y: 3.4, d: 1.0, c: C.coral }, { x: 5.6, y: 4.3, d: 0.8, c: C.sky }, { x: 7.0, y: 0.6, d: 0.55, c: C.lilac }];
    for (const c of circ) s.addShape(pres.shapes.OVAL, { x: c.x, y: c.y, w: c.d, h: c.d, fill: { color: c.c }, line: { color: c.c, width: 0 } });
    await iconCircle(s, pres, { x: 5.2, y: 1.6, d: 1.5, fill: C.mint, name: 'PiQuotes', ratio: 0.6 });
    text(s, 'KIT RELATÓRIOS DA CRECHE', { x: M, y: 5.55, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Banco de Frases BNCC', { x: M, y: 5.95, w: 6.6, h: 1.9, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Frases para os 61 objetivos de aprendizagem de 0 a 3 anos, em três níveis e com o próximo passo da equipe, mais abertura, rotina, situações delicadas e fechamentos.', { x: M, y: 7.95, w: 6.3, h: 1.1, fontSize: 14, color: 'E9E6F5' });
    const tags = [['Berçário', C.coral], ['Maternal I', C.mint], ['Maternal II', C.sky]];
    let tx = M;
    for (const [t, c] of tags) {
      const w = 0.32 + t.length * 0.105;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 9.35, w, h: 0.42, fill: { color: c }, line: { color: c, width: 0 }, rectRadius: 0.21 });
      text(s, t, { x: tx, y: 9.35, w, h: 0.42, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      tx += w + 0.15;
    }
    text(s, '61 objetivos · 299 frases e sugestões · editável no Canva', { x: M, y: 10.6, w: CW, h: 0.3, fontSize: 10, color: 'B9B4D3' });
  }

  // ================= COMO USAR =================
  {
    const s = newPage('Abertura');
    text(s, 'COMECE POR AQUI', { x: M, y: 0.55, w: CW, h: 0.25, fontSize: 9, bold: true, color: C.brand, charSpacing: 2 });
    text(s, 'Como usar o banco de frases', { x: M, y: 0.8, w: CW, h: 0.65, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    const passos = [
      ['PiMagnifyingGlass', 'Encontre o objetivo', 'As frases estão organizadas por faixa (Berçário EI01, Maternal EI02) e por campo de experiência, na ordem dos códigos da BNCC.', 'coral'],
      ['PiListChecks', 'Escolha o nível', 'Já demonstra, em desenvolvimento ou iniciando: o nível que descreve a criança hoje, comparada com ela mesma.', 'mint'],
      ['PiCopy', 'Copie e personalize', 'No Canva, selecione o texto e copie para o modelo. Troque [NOME] pelo nome da criança e revise a concordância (o/a).', 'sky'],
      ['PiStar', 'Acrescente o que você viu', 'Uma cena ou uma fala real em cada bloco. Use o próximo passo da equipe no fechamento do relatório.', 'sun'],
    ];
    let yy = 1.7;
    for (const [ic, t, d, cor] of passos) {
      card(s, pres, { x: M, y: yy, w: CW, h: 1.3, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: M + 0.28, y: yy + 0.27, d: 0.75, fill: C[cor], name: ic });
      text(s, t, { x: M + 1.3, y: yy + 0.18, w: CW - 1.5, h: 0.38, fontSize: 14, fontFace: FONT_HEAD, bold: true });
      text(s, d, { x: M + 1.3, y: yy + 0.58, w: CW - 1.5, h: 0.65, fontSize: 10.5, color: C.ink2 });
      yy += 1.43;
    }
    text(s, 'Os níveis de cada objetivo', { x: M, y: yy + 0.1, w: CW, h: 0.4, fontSize: 14, fontFace: FONT_HEAD, bold: true });
    const lw = (CW - 0.45) / 4, ld = [['Já demonstra', 'Aparece com frequência e autonomia.', 'mint'], ['Em desenvolvimento', 'Aparece com apoio ou de vez em quando.', 'sun'], ['Iniciando', 'Está surgindo; descrito de forma positiva.', 'coral'], ['Próximo passo', 'O que a equipe vai propor a seguir.', 'sky']];
    ld.forEach(([t, d, cor], i) => {
      const x = M + i * (lw + 0.15);
      card(s, pres, { x, y: yy + 0.6, w: lw, h: 1.25, fill: C[cor + 'T'], radius: 0.12 });
      text(s, t, { x: x + 0.15, y: yy + 0.72, w: lw - 0.3, h: 0.3, fontSize: 10, bold: true, color: C[cor] });
      text(s, d, { x: x + 0.15, y: yy + 1.05, w: lw - 0.3, h: 0.7, fontSize: 9, color: C.ink });
    });
    card(s, pres, { x: M, y: 10.0, w: CW, h: 0.95, fill: C.ink });
    text(s, [{ text: 'Importante: ', options: { bold: true, color: C.sun } }, { text: 'as frases são pontos de partida. Nunca copie o mesmo texto para várias crianças.', options: { color: 'FFFFFF' } }], { x: M + 0.3, y: 10.0, w: CW - 0.6, h: 0.95, fontSize: 10.5, valign: 'middle' });
    D.footer(s, n, MARCA);
  }

  // ================= ABERTURA =================
  pres.addSection({ title: 'Abertura e adaptação' });
  bigTitle('Abertura e adaptação', 'Banco de frases · Abertura', X.ABERTURAS.titulo, X.ABERTURAS.intro);
  for (const g of X.ABERTURAS.grupos) { grupoTitulo('Abertura e adaptação', '', g.nome); for (const f of g.frases) frase('Abertura e adaptação', '', f); }
  closeFlow();

  // ================= FAIXAS =================
  for (const [faixa, dados, titulo, sub] of [
    ['Berçário (EI01)', EI01, 'Berçário · Bebês (EI01)', 'De zero a 1 ano e 6 meses. Para cada objetivo: três níveis de descrição e o próximo passo da equipe.'],
    ['Maternal (EI02)', EI02, 'Maternal I e II · Crianças bem pequenas (EI02)', 'De 1 ano e 7 meses a 3 anos e 11 meses. No Maternal I, "iniciando" e "em desenvolvimento" são os mais usados; no Maternal II, "em desenvolvimento" e "já demonstra".'],
  ]) {
    pres.addSection({ title: faixa });
    bigTitle(faixa, `Banco de frases · ${faixa}`, titulo, sub);
    for (const sig of ['EO', 'CG', 'TS', 'EF', 'ET']) {
      const k = `Banco de frases · ${faixa} · Campo ${sig}`;
      kicker = k;
      await campoHeader(faixa, k, sig);
      for (const o of dados[sig]) objetivoCard(faixa, k, o, sig);
    }
    closeFlow();
  }

  // ================= ROTINA, DELICADAS, FECHAMENTO =================
  for (const [bloco, comOri] of [[X.ROTINA, false], [X.DELICADAS, true], [X.FECHAMENTOS, false]]) {
    pres.addSection({ title: bloco.titulo });
    bigTitle(bloco.titulo, `Banco de frases · ${bloco.titulo}`, bloco.titulo, bloco.intro);
    for (const g of bloco.grupos) {
      grupoTitulo(bloco.titulo, '', g.nome, comOri && g.nome.startsWith('Sinais') ? 'coral' : 'lilac');
      if (comOri && g.orientacao) orientacao(bloco.titulo, '', g.orientacao);
      for (const f of g.frases) frase(bloco.titulo, '', f);
    }
    closeFlow();
  }

  // ================= TROQUE ISTO POR ISTO =================
  pres.addSection({ title: 'Troque isto por isto' });
  bigTitle('Troque isto por isto', 'Banco de frases · Linguagem', 'Troque isto por isto', 'Rótulos e frases negativas ferem a criança e a família. Estas trocas mantêm a verdade com respeito.');
  for (const [a, b] of X.TROCAS) {
    const c1 = 2.45, c2 = CW - c1 - 0.15;
    const h = Math.max(th(a, c1 - 0.4, 9.5), th(b, c2 - 0.4, 9.5)) + 0.3;
    const yy = place(h + 0.1, 'Troque isto por isto', 'Banco de frases · Linguagem');
    card(page, pres, { x: M, y: yy, w: c1, h, fill: C.coralT, radius: 0.12 });
    card(page, pres, { x: M + c1 + 0.15, y: yy, w: c2, h, fill: C.mintT, radius: 0.12 });
    text(page, a, { x: M + 0.2, y: yy, w: c1 - 0.4, h, fontSize: 9.5, valign: 'middle', strike: 'sngStrike', color: C.ink2 });
    text(page, b, { x: M + c1 + 0.35, y: yy, w: c2 - 0.4, h, fontSize: 9.5, valign: 'middle' });
  }
  closeFlow();

  // ================= VERBOS =================
  {
    pres.addSection({ title: 'Verbos e conectivos' });
    const s = newPage('Verbos e conectivos');
    text(s, 'BANCO DE FRASES · LINGUAGEM', { x: M, y: 0.5, w: CW, h: 0.25, fontSize: 8.5, bold: true, color: C.ink2, charSpacing: 2 });
    text(s, 'Verbos, expressões e conectivos', { x: M, y: 1.0, w: CW, h: 0.65, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    let yy = 1.9;
    const cores = ['coral', 'mint', 'sky', 'lilac'];
    X.VERBOS.forEach((v, i) => {
      const txt = v.itens.join('  ·  ');
      const h = th(txt, CW - 0.5, 10.5) + 0.75;
      card(s, pres, { x: M, y: yy, w: CW, h, fill: C[cores[i] + 'T'] });
      text(s, v.grupo, { x: M + 0.25, y: yy + 0.18, w: CW - 0.5, h: 0.35, fontSize: 12.5, fontFace: FONT_HEAD, bold: true, color: C[cores[i]] });
      text(s, txt, { x: M + 0.25, y: yy + 0.58, w: CW - 0.5, h: h - 0.7, fontSize: 10.5 });
      yy += h + 0.2;
    });
    D.footer(s, n, MARCA);
  }

  // ================= ENCERRAMENTO =================
  pres.addSection({ title: 'Encerramento' });
  D.closingPage(pres, 'Encerramento', ENCERRAMENTOS.banco);
  n += 1;

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile, n, 'páginas');
}

main(process.argv[2] || '../04 - Banco de Frases BNCC (Canva).pptx').catch((e) => { console.error(e); process.exit(1); });
