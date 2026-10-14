// Gera "01 - Guia Pedagógico.pptx" (A4 retrato, importável no Canva).
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const G = require('./content/guia');
const { CAMPOS } = require('./content/bncc');
const { W, H, M, C, FONT_HEAD, text, footer, pageTitle, iconCircle, card, dots } = D;
const CW = W - 2 * M;

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = 'Guia Pedagógico · Kit Relatórios da Creche';
  pres.author = 'Kit Relatórios da Creche';
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };

  let n = 0;
  const toc = [];
  const add = (section) => { n += 1; const s = pres.addSlide({ sectionTitle: section }); s.background = { color: C.paper }; return s; };

  // ---------- CAPA ----------
  pres.addSection({ title: 'Abertura' });
  {
    const s = add('Abertura');
    s.background = { color: C.ink };
    // composição de círculos (motivo do kit)
    const circ = [
      { x: 4.55, y: 0.7, d: 3.0, c: C.coral }, { x: 6.35, y: 3.25, d: 1.5, c: C.sun },
      { x: 3.75, y: 3.2, d: 1.15, c: C.mint }, { x: 5.4, y: 4.45, d: 0.85, c: C.sky }, { x: 7.05, y: 0.55, d: 0.6, c: C.lilac },
    ];
    for (const c of circ) s.addShape(pres.shapes.OVAL, { x: c.x, y: c.y, w: c.d, h: c.d, fill: { color: c.c }, line: { color: c.c, width: 0 } });
    await iconCircle(s, pres, { x: 5.25, y: 1.45, d: 1.5, fill: C.coral, name: 'PiBaby', ratio: 0.8 });
    text(s, 'KIT RELATÓRIOS DA CRECHE', { x: M, y: 5.55, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Relatórios que enxergam a criança', { x: M, y: 5.95, w: 6.6, h: 1.9, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF', valign: 'top' });
    text(s, 'Guia pedagógico para observar, registrar e escrever relatórios descritivos de bebês e crianças bem pequenas, alinhado à BNCC.', { x: M, y: 7.95, w: 6.2, h: 0.9, fontSize: 14, color: 'E9E6F5' });
    const tags = [['Berçário', C.coral], ['Maternal I', C.mint], ['Maternal II', C.sky]];
    let tx = M;
    for (const [t, c] of tags) {
      const w = 0.32 + t.length * 0.105;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 9.15, w, h: 0.42, fill: { color: c }, line: { color: c, width: 0 }, rectRadius: 0.21 });
      text(s, t, { x: tx, y: 9.15, w, h: 0.42, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      tx += w + 0.15;
    }
    text(s, '0 a 3 anos e 11 meses  ·  5 campos de experiência  ·  61 objetivos de aprendizagem', { x: M, y: 10.6, w: CW, h: 0.3, fontSize: 10, color: 'B9B4D3' });
  }

  // ---------- O QUE TEM NO KIT ----------
  {
    const s = add('Abertura');
    pageTitle(s, 'Comece por aqui', 'O que tem no seu kit');
    text(s, 'Quatro materiais que trabalham juntos: o guia explica o porquê e o como; o banco de frases ajuda a escrever; os modelos deixam o relatório bonito; as fichas garantem que você tenha o que contar.', { x: M, y: 1.6, w: CW, h: 0.75, fontSize: 12, color: C.ink2 });
    const items = [
      { t: 'Guia pedagógico', d: 'Base legal, referenciais teóricos, marcos do desenvolvimento, o que observar em cada campo e como escrever. É este arquivo.', i: 'PiBookOpenText', c: C.coral, tc: C.coralT },
      { t: 'Banco de frases BNCC', d: 'Frases para todos os 61 objetivos de 0 a 3 anos, em três níveis, com próximo passo, situações delicadas e fechamentos. Em Word.', i: 'PiQuotes', c: C.mint, tc: C.mintT },
      { t: 'Modelos editáveis', d: 'Relatórios prontos para editar no Canva: Berçário, Maternal I e II, carta à família, relatório da turma e exemplos preenchidos.', i: 'PiLayout', c: C.sky, tc: C.skyT },
      { t: 'Fichas de observação', d: 'Fichas para o dia a dia: registro rápido, rodízio da turma, ficha por campo, mini-história e acompanhamento dos cuidados.', i: 'PiClipboardText', c: C.sun, tc: C.sunT },
    ];
    const cw = (CW - 0.3) / 2, ch = 2.35;
    for (let i = 0; i < items.length; i++) {
      const it = items[i], x = M + (i % 2) * (cw + 0.3), y = 2.55 + Math.floor(i / 2) * (ch + 0.3);
      card(s, pres, { x, y, w: cw, h: ch, fill: it.tc });
      await iconCircle(s, pres, { x: x + 0.3, y: y + 0.3, d: 0.65, fill: it.c, name: it.i });
      text(s, it.t, { x: x + 0.3, y: y + 1.07, w: cw - 0.6, h: 0.35, fontSize: 15, fontFace: FONT_HEAD, bold: true });
      text(s, it.d, { x: x + 0.3, y: y + 1.45, w: cw - 0.6, h: 0.8, fontSize: 10.5, color: C.ink2 });
    }
    // Como editar no Canva
    const y0 = 7.95;
    card(s, pres, { x: M, y: y0, w: CW, h: 2.6, fill: C.ink });
    text(s, 'Como editar no Canva (recomendado)', { x: M + 0.35, y: y0 + 0.3, w: 6, h: 0.4, fontSize: 16, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    const steps = [
      ['1', 'No Canva, clique em "Criar design" > "Importar arquivo" e escolha o arquivo .pptx (ou arraste o arquivo para a página inicial).'],
      ['2', 'O Canva transforma o arquivo em um design A4 editável. Clique em qualquer texto, foto ou cor para alterar.'],
      ['3', 'Baixe em PDF para entregar às famílias e arquivar. Há versões em Word como alternativa, sem o mesmo acabamento.'],
    ];
    for (let i = 0; i < 3; i++) {
      const sx = M + 0.35 + i * 2.3;
      s.addShape(pres.shapes.OVAL, { x: sx, y: y0 + 0.9, w: 0.42, h: 0.42, fill: { color: C.sun }, line: { color: C.sun, width: 0 } });
      text(s, steps[i][0], { x: sx, y: y0 + 0.9, w: 0.42, h: 0.42, fontSize: 13, bold: true, align: 'center', valign: 'middle', color: C.ink });
      text(s, steps[i][1], { x: sx, y: y0 + 1.45, w: 2.05, h: 1.35, fontSize: 9.5, color: 'E9E6F5' });
    }
    footer(s, n);
  }

  // ---------- SUMÁRIO (preenchido no final) ----------
  const sumario = add('Abertura');
  const sumarioN = n;

  // ---------- divisor de parte ----------
  async function divider(num, title, desc, color, tint, iconName, section) {
    pres.addSection({ title: section });
    const s = add(section);
    s.background = { color: tint };
    toc.push({ num, title, page: n, color });
    s.addShape(pres.shapes.OVAL, { x: 3.9, y: 1.2, w: 4.0, h: 4.0, fill: { color: color, transparency: 85 }, line: { color: color, width: 0 } });
    await iconCircle(s, pres, { x: 4.9, y: 2.2, d: 2.0, fill: color, name: iconName, ratio: 0.55 });
    text(s, `PARTE ${num}`, { x: M, y: 6.0, w: CW, h: 0.35, fontSize: 13, bold: true, color, charSpacing: 3 });
    text(s, title, { x: M, y: 6.45, w: 6.6, h: 1.8, fontSize: 36, fontFace: FONT_HEAD, bold: true, color: C.ink });
    const tl = title.length > 26 ? 2 : 1;
    text(s, desc, { x: M, y: 6.45 + tl * 0.68 + 0.35, w: 6.0, h: 1.2, fontSize: 13, color: C.ink2 });
    footer(s, n);
    return s;
  }

  // ===================== PARTE 1 =====================
  await divider('01', 'Por que e para que avaliar', 'O que a lei pede, o que a avaliação na Educação Infantil é (e não é) e as ideias que sustentam um bom relatório.', C.coral, C.coralT, 'PiScales', 'Parte 1 · Por que avaliar');

  { // Base legal
    const s = add('Parte 1 · Por que avaliar');
    pageTitle(s, 'Parte 1 · Base legal', 'O relatório é um direito da criança');
    let y = 2.0;
    const hs = [2.65, 2.85, 2.65];
    for (let i = 0; i < G.LEIS.length; i++) {
      const l = G.LEIS[i], h = hs[i];
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist });
      await iconCircle(s, pres, { x: M + 0.3, y: y + 0.3, d: 0.6, fill: C.coral, name: i === 2 ? 'PiBooks' : 'PiScales' });
      text(s, l.doc, { x: M + 1.1, y: y + 0.32, w: CW - 1.4, h: 0.5, fontSize: 14, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
      text(s, l.resumo, { x: M + 1.1, y: y + 0.9, w: CW - 1.4, h: h - 1.65, fontSize: 10.5, color: C.ink2 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 1.1, y: y + h - 0.7, w: CW - 1.4, h: 0.48, fill: { color: 'FFFFFF' }, line: { color: C.line, width: 0.75 }, rectRadius: 0.1 });
      text(s, [{ text: 'Na prática: ', options: { bold: true, color: C.coral } }, { text: l.pratica }], { x: M + 1.25, y: y + h - 0.7, w: CW - 1.7, h: 0.48, fontSize: 10, valign: 'middle' });
      y += h + 0.25;
    }
    footer(s, n);
  }

  { // Avaliação é / não é
    const s = add('Parte 1 · Por que avaliar');
    pageTitle(s, 'Parte 1 · Concepção', 'Avaliar é acompanhar, não classificar');
    text(s, 'Segundo as Diretrizes Curriculares Nacionais, a avaliação na Educação Infantil acontece sem seleção, promoção ou classificação. Seu objetivo é conhecer cada criança para planejar melhor e contar à família como ela vive e aprende na instituição.', { x: M, y: 1.75, w: CW, h: 0.95, fontSize: 12, color: C.ink2 });
    const cols = [
      { t: 'O relatório É', items: G.AVALIACAO_E, c: C.mint, tc: C.mintT, i: 'PiCheckCircle' },
      { t: 'O relatório NÃO É', items: G.AVALIACAO_NAO, c: C.coral, tc: C.coralT, i: 'PiXCircle' },
    ];
    const cw = (CW - 0.3) / 2;
    for (let k = 0; k < 2; k++) {
      const col = cols[k], x = M + k * (cw + 0.3), y = 2.95;
      card(s, pres, { x, y, w: cw, h: 6.0, fill: col.tc });
      await iconCircle(s, pres, { x: x + 0.3, y: y + 0.3, d: 0.6, fill: col.c, name: col.i });
      text(s, col.t, { x: x + 1.05, y: y + 0.3, w: cw - 1.3, h: 0.6, fontSize: 17, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
      for (let j = 0; j < col.items.length; j++) {
        const iy = y + 1.2 + j * 0.78;
        s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: iy + 0.08, w: 0.14, h: 0.14, fill: { color: col.c }, line: { color: col.c, width: 0 } });
        text(s, col.items[j], { x: x + 0.65, y: iy, w: cw - 0.95, h: 0.7, fontSize: 11 });
      }
    }
    card(s, pres, { x: M, y: 9.25, w: CW, h: 1.5, fill: C.ink });
    text(s, [{ text: 'Uma pergunta para guiar a escrita\n', options: { bold: true, color: C.sun, fontSize: 11, breakLine: true } }, { text: '"Se a família ler este texto, vai reconhecer o próprio filho e saber o que ele viveu e aprendeu aqui?"', options: { color: 'FFFFFF', fontSize: 14, fontFace: FONT_HEAD } }], { x: M + 0.35, y: 9.25, w: CW - 0.7, h: 1.5, valign: 'middle' });
    footer(s, n);
  }

  // Referenciais teóricos (2 páginas, 3 autores cada)
  for (let p = 0; p < 2; p++) {
    const s = add('Parte 1 · Por que avaliar');
    pageTitle(s, 'Parte 1 · Referenciais teóricos', 'As ideias que sustentam o relatório');
    const cores = [[C.coral, C.coralT], [C.mint, C.mintT], [C.sky, C.skyT], [C.sun, C.sunT], [C.lilac, C.lilacT], [C.coral, C.coralT]];
    const icons = ['PiChalkboardTeacher', 'PiCamera', 'PiBaby', 'PiHeart', 'PiUsers', 'PiPuzzlePiece'];
    let y = 1.95;
    for (let k = 0; k < 3; k++) {
      const idx = p * 3 + k, t = G.TEORICOS[idx], [c, tc] = cores[idx], h = 2.85;
      card(s, pres, { x: M, y, w: CW, h, fill: tc });
      await iconCircle(s, pres, { x: M + 0.3, y: y + 0.3, d: 0.7, fill: c, name: icons[idx] });
      text(s, t.ideia.toUpperCase(), { x: M + 1.2, y: y + 0.3, w: CW - 1.5, h: 0.25, fontSize: 9, bold: true, color: c, charSpacing: 1.5 });
      text(s, t.nome, { x: M + 1.2, y: y + 0.55, w: CW - 1.5, h: 0.45, fontSize: 15, fontFace: FONT_HEAD, bold: true });
      text(s, t.texto, { x: M + 1.2, y: y + 1.05, w: CW - 1.5, h: 1.0, fontSize: 10.5, color: C.ink2 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 1.2, y: y + h - 0.68, w: CW - 1.5, h: 0.46, fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF', width: 0 }, rectRadius: 0.1 });
      text(s, [{ text: 'No relatório: ', options: { bold: true, color: c } }, { text: t.pratica }], { x: M + 1.35, y: y + h - 0.68, w: CW - 1.8, h: 0.46, fontSize: 10, valign: 'middle' });
      y += h + 0.2;
    }
    footer(s, n);
  }

  // ===================== PARTE 2 =====================
  await divider('02', 'Quem é a criança de 0 a 3 anos', 'As faixas etárias da BNCC, os direitos de aprendizagem e os marcos que ajudam a olhar com intenção.', C.mint, C.mintT, 'PiBaby', 'Parte 2 · A criança');

  { // Faixas + direitos
    const s = add('Parte 2 · A criança');
    pageTitle(s, 'Parte 2 · BNCC', 'Faixas etárias e direitos de aprendizagem', C.mint);
    text(s, 'A BNCC organiza os objetivos da Educação Infantil em três grupos etários. Este kit cobre os dois primeiros, que correspondem à creche. O código de cada objetivo indica etapa, faixa, campo e número: EI 02 EF 05.', { x: M, y: 1.75, w: CW, h: 0.8, fontSize: 11.5, color: C.ink2 });
    const fx = G.FAIXAS, fw = (CW - 0.4) / 3;
    for (let i = 0; i < 3; i++) {
      const f = fx[i], x = M + i * (fw + 0.2), y = 2.75, c = C[f.cor], tc = C[f.cor + 'T'];
      const off = i === 2;
      card(s, pres, { x, y, w: fw, h: 2.55, fill: off ? C.mist : tc });
      text(s, f.cod, { x: x + 0.25, y: y + 0.25, w: fw - 0.5, h: 0.55, fontSize: 24, fontFace: FONT_HEAD, bold: true, color: off ? 'A9A4BF' : c });
      text(s, f.nome, { x: x + 0.25, y: y + 0.85, w: fw - 0.5, h: 0.5, fontSize: 12.5, bold: true, color: off ? C.ink2 : C.ink });
      text(s, f.idade, { x: x + 0.25, y: y + 1.35, w: fw - 0.5, h: 0.5, fontSize: 10, color: C.ink2 });
      text(s, f.turmas, { x: x + 0.25, y: y + 1.85, w: fw - 0.5, h: 0.55, fontSize: 9, italic: true, color: C.ink2 });
    }
    text(s, 'Os seis direitos de aprendizagem e desenvolvimento', { x: M, y: 5.6, w: CW, h: 0.4, fontSize: 16, fontFace: FONT_HEAD, bold: true });
    text(s, 'Use-os como lente: um bom relatório mostra como cada criança exerceu esses direitos no semestre.', { x: M, y: 6.0, w: CW, h: 0.35, fontSize: 10.5, color: C.ink2 });
    const icons = ['PiUsers', 'PiPuzzlePiece', 'PiHandHeart', 'PiMagnifyingGlass', 'PiChatCircleText', 'PiSmiley'];
    const cols = ['coral', 'mint', 'sun', 'sky', 'lilac', 'coral'];
    const dw = (CW - 0.3) / 2, dh = 1.18;
    for (let i = 0; i < 6; i++) {
      const d = G.DIREITOS[i], x = M + (i % 2) * (dw + 0.3), y = 6.55 + Math.floor(i / 2) * (dh + 0.17);
      card(s, pres, { x, y, w: dw, h: dh, fill: C.mist });
      await iconCircle(s, pres, { x: x + 0.22, y: y + 0.27, d: 0.62, fill: C[cols[i]], name: icons[i] });
      text(s, d.nome, { x: x + 1.02, y: y + 0.2, w: dw - 1.2, h: 0.35, fontSize: 13, fontFace: FONT_HEAD, bold: true });
      text(s, d.texto, { x: x + 1.02, y: y + 0.55, w: dw - 1.2, h: 0.55, fontSize: 9.5, color: C.ink2 });
    }
    footer(s, n);
  }

  // Marcos (2 páginas)
  for (let p = 0; p < 2; p++) {
    const s = add('Parte 2 · A criança');
    pageTitle(s, 'Parte 2 · Desenvolvimento', p === 0 ? 'Marcos: 0 a 18 meses' : 'Marcos: 18 meses a 4 anos', C.mint);
    const areas = [['mov', 'Movimento', 'PiPersonSimpleRun', C.mint], ['ling', 'Linguagem', 'PiChatCircleText', C.sky], ['socio', 'Socioemocional', 'PiHeart', C.coral], ['cog', 'Exploração', 'PiMagnifyingGlass', C.lilac]];
    let y = 1.85;
    for (let k = 0; k < 3; k++) {
      const m = G.MARCOS[p * 3 + k], h = 2.5;
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.25, y: y + 0.25, w: 1.95, h: 0.42, fill: { color: C.ink }, line: { color: C.ink, width: 0 }, rectRadius: 0.21 });
      text(s, m.idade, { x: M + 0.25, y: y + 0.25, w: 1.95, h: 0.42, fontSize: 11.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      const aw = (CW - 0.5 - 0.45) / 4;
      for (let a = 0; a < 4; a++) {
        const [key, label, ic, col] = areas[a], ax = M + 0.25 + a * (aw + 0.15), ay = y + 0.85;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ax, y: ay, w: aw, h: h - 1.1, fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF', width: 0 }, rectRadius: 0.12 });
        await iconCircle(s, pres, { x: ax + 0.15, y: ay + 0.15, d: 0.34, fill: col, name: ic });
        text(s, label, { x: ax + 0.55, y: ay + 0.15, w: aw - 0.6, h: 0.34, fontSize: 9, bold: true, color: col, valign: 'middle' });
        text(s, m[key], { x: ax + 0.15, y: ay + 0.58, w: aw - 0.3, h: h - 1.7, fontSize: 9, color: C.ink });
      }
      y += h + 0.15;
    }
    card(s, pres, { x: M, y: y + 0.0, w: CW, h: 1.05, fill: C.sunT });
    text(s, [{ text: 'Importante: ', options: { bold: true } }, { text: G.MARCOS_NOTA }], { x: M + 0.25, y: y + 0.0, w: CW - 0.5, h: 1.05, fontSize: 8.5, valign: 'middle', color: C.ink });
    footer(s, n);
  }

  // ===================== PARTE 3 =====================
  await divider('03', 'O que observar em cada campo de experiência', 'Para cada campo: o foco, o que olhar no Berçário e no Maternal e as evidências que valem ouro no relatório.', C.sky, C.skyT, 'PiEye', 'Parte 3 · O que observar');

  for (const sig of ['EO', 'CG', 'TS', 'EF', 'ET']) {
    const s = add('Parte 3 · O que observar');
    const o = G.OBSERVAR[sig], cor = D.CAMPO_COR[sig], c = C[cor], tc = C[cor + 'T'];
    // Cabeçalho do campo
    card(s, pres, { x: M, y: 0.55, w: CW, h: 2.25, fill: tc });
    await iconCircle(s, pres, { x: M + 0.35, y: 0.9, d: 1.15, fill: c, name: D.CAMPO_ICON[sig] });
    text(s, `CAMPO DE EXPERIÊNCIA · ${sig}`, { x: M + 1.8, y: 0.85, w: CW - 2.1, h: 0.3, fontSize: 9.5, bold: true, color: c, charSpacing: 2 });
    text(s, CAMPOS[sig].nome, { x: M + 1.8, y: 1.15, w: CW - 2.1, h: 0.95, fontSize: 21, fontFace: FONT_HEAD, bold: true, valign: 'top' });
    text(s, o.foco, { x: M + 1.8, y: 2.12, w: CW - 2.1, h: 0.45, fontSize: 11, color: C.ink2 });
    // Duas colunas
    const cols = [['No Berçário', 'bebês · EI01', o.bercario, 'PiBaby'], ['No Maternal', 'crianças bem pequenas · EI02', o.maternal, 'PiPersonSimpleRun']];
    const cw = (CW - 0.3) / 2;
    for (let k = 0; k < 2; k++) {
      const [t, sub, items, ic] = cols[k], x = M + k * (cw + 0.3), y = 3.1;
      card(s, pres, { x, y, w: cw, h: 4.85, fill: C.mist });
      await iconCircle(s, pres, { x: x + 0.28, y: y + 0.28, d: 0.55, fill: c, name: ic });
      text(s, t, { x: x + 0.98, y: y + 0.26, w: cw - 1.2, h: 0.35, fontSize: 14, fontFace: FONT_HEAD, bold: true });
      text(s, sub, { x: x + 0.98, y: y + 0.6, w: cw - 1.2, h: 0.25, fontSize: 9, color: C.ink2 });
      for (let j = 0; j < items.length; j++) {
        const iy = y + 1.15 + j * 0.9;
        s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: iy + 0.07, w: 0.14, h: 0.14, fill: { color: c }, line: { color: c, width: 0 } });
        text(s, items[j], { x: x + 0.6, y: iy, w: cw - 0.85, h: 0.82, fontSize: 11 });
      }
    }
    // Evidências
    card(s, pres, { x: M, y: 8.2, w: CW, h: 1.35, fill: C.ink });
    await iconCircle(s, pres, { x: M + 0.3, y: 8.55, d: 0.65, fill: c, name: 'PiStar' });
    text(s, 'Evidências que valem ouro no relatório', { x: M + 1.2, y: 8.38, w: CW - 1.5, h: 0.32, fontSize: 12.5, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, o.evidencias, { x: M + 1.2, y: 8.72, w: CW - 1.5, h: 0.7, fontSize: 10.5, color: 'E9E6F5' });
    card(s, pres, { x: M, y: 9.8, w: CW, h: 1.0, fill: tc });
    text(s, [{ text: 'Exemplo de registro: ', options: { bold: true, color: c } }, { text: o.registro }], { x: M + 0.3, y: 9.8, w: CW - 0.6, h: 1.0, fontSize: 10, valign: 'middle' });
    text(s, `Frases prontas para todos os objetivos deste campo (EI01${sig} e EI02${sig}) estão no Banco de Frases BNCC.`, { x: M, y: 10.9, w: CW - 0.8, h: 0.25, fontSize: 8.5, italic: true, color: C.ink2 });
    footer(s, n);
  }

  // ===================== PARTE 4 =====================
  await divider('04', 'Como observar e registrar', 'Ninguém escreve um bom relatório sem registros. Técnicas simples e uma rotina de 5 minutos por dia.', C.sun, C.sunT, 'PiNotePencil', 'Parte 4 · Registrar');

  { // Técnicas
    const s = add('Parte 4 · Registrar');
    pageTitle(s, 'Parte 4 · Técnicas', 'Seis formas de registrar o cotidiano', C.sun);
    text(s, 'As DCNEI pedem "múltiplos registros". Combine pelo menos três destas formas ao longo do semestre.', { x: M, y: 1.65, w: CW, h: 0.45, fontSize: 11.5, color: C.ink2 });
    const icons = ['PiNotePencil', 'PiQuotes', 'PiCamera', 'PiBookOpenText', 'PiListChecks', 'PiPaintBrush'];
    const cols = ['coral', 'sky', 'mint', 'lilac', 'sun', 'coral'];
    const cw = (CW - 0.3) / 2, ch = 2.62;
    for (let i = 0; i < 6; i++) {
      const t = G.TECNICAS[i], x = M + (i % 2) * (cw + 0.3), y = 2.3 + Math.floor(i / 2) * (ch + 0.25);
      card(s, pres, { x, y, w: cw, h: ch, fill: C[cols[i] + 'T'] });
      await iconCircle(s, pres, { x: x + 0.28, y: y + 0.28, d: 0.6, fill: C[cols[i]], name: icons[i] });
      text(s, t.nome, { x: x + 0.28, y: y + 1.0, w: cw - 0.56, h: 0.35, fontSize: 13, fontFace: FONT_HEAD, bold: true });
      text(s, t.texto, { x: x + 0.28, y: y + 1.38, w: cw - 0.56, h: ch - 1.5, fontSize: 9.5, color: C.ink });
    }
    footer(s, n);
  }

  { // Rotina de registro
    const s = add('Parte 4 · Registrar');
    pageTitle(s, 'Parte 4 · Rotina', 'O método dos 5 minutos por dia', C.sun);
    text(s, 'O relatório de fim de semestre fica leve quando o registro acontece aos poucos. Este é o ciclo:', { x: M, y: 1.65, w: CW, h: 0.45, fontSize: 11.5, color: C.ink2 });
    const icons = ['PiCalendar', 'PiEye', 'PiPencilSimple', 'PiFolder', 'PiFileText'];
    const cols = ['coral', 'sun', 'mint', 'sky', 'lilac'];
    let y = 2.35;
    for (let i = 0; i < 5; i++) {
      const r = G.ROTINA_REGISTRO[i], h = 1.3;
      if (i < 4) s.addShape(pres.shapes.LINE, { x: M + 0.5, y: y + 1.0, w: 0, h: h - 0.4, line: { color: C.line, width: 2, dashType: 'dash' } });
      await iconCircle(s, pres, { x: M + 0.1, y: y + 0.1, d: 0.8, fill: C[cols[i]], name: icons[i] });
      card(s, pres, { x: M + 1.15, y, w: CW - 1.15, h: h - 0.2, fill: C.mist });
      text(s, `${i + 1}. ${r.passo}`, { x: M + 1.45, y: y + 0.15, w: CW - 1.7, h: 0.35, fontSize: 14, fontFace: FONT_HEAD, bold: true });
      text(s, r.texto, { x: M + 1.45, y: y + 0.5, w: CW - 1.7, h: 0.55, fontSize: 10.5, color: C.ink2 });
      y += h + 0.05;
    }
    card(s, pres, { x: M, y: y + 0.2, w: CW, h: 1.55, fill: C.sunT });
    text(s, [{ text: 'Dica de ouro\n', options: { bold: true, fontSize: 12, breakLine: true } }, { text: 'Turma de 15 crianças, 5 crianças-foco por dia: em 3 dias todas foram observadas com atenção. Em um semestre, isso dá mais de 20 registros por criança, material de sobra para um relatório rico e verdadeiro.', options: { fontSize: 10.5 } }], { x: M + 0.3, y: y + 0.2, w: CW - 0.6, h: 1.55, valign: 'middle' });
    footer(s, n);
  }

  // ===================== PARTE 5 =====================
  await divider('05', 'Como escrever o relatório', 'A estrutura em seis blocos, a linguagem que respeita a criança, os erros mais comuns e as situações delicadas.', C.lilac, C.lilacT, 'PiPencilSimple', 'Parte 5 · Escrever');

  { // Estrutura
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Estrutura', 'Um relatório em seis blocos', C.lilac);
    text(s, 'Esta estrutura garante que os cinco campos de experiência apareçam sem que o texto vire uma lista. Cada bloco tem de 3 a 6 linhas. Os modelos editáveis já vêm organizados assim.', { x: M, y: 1.65, w: CW, h: 0.7, fontSize: 11.5, color: C.ink2 });
    const cols = ['coral', 'coral', 'mint', 'sky', 'lilac', 'sun'];
    let y = 2.5;
    for (let i = 0; i < 6; i++) {
      const e = G.ESTRUTURA[i], h = 1.1;
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist });
      s.addShape(pres.shapes.OVAL, { x: M + 0.25, y: y + 0.25, w: 0.7, h: 0.7, fill: { color: C[cols[i]] }, line: { color: C[cols[i]], width: 0 } });
      text(s, e.n, { x: M + 0.25, y: y + 0.25, w: 0.7, h: 0.7, fontSize: 20, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      text(s, e.titulo, { x: M + 1.2, y: y + 0.22, w: CW - 1.5, h: 0.38, fontSize: 14, fontFace: FONT_HEAD, bold: true });
      text(s, e.texto, { x: M + 1.2, y: y + 0.6, w: CW - 1.5, h: 0.5, fontSize: 10.5, color: C.ink2 });
      y += h + 0.15;
    }
    card(s, pres, { x: M, y: y + 0.05, w: CW, h: 0.8, fill: C.lilacT });
    text(s, [{ text: 'Extensão ideal: ', options: { bold: true } }, { text: 'de uma a uma página e meia por criança. Mais longo cansa a família; mais curto vira genérico.' }], { x: M + 0.3, y: y + 0.05, w: CW - 0.6, h: 0.8, fontSize: 10.5, valign: 'middle' });
    footer(s, n);
  }

  { // Troque isto por isto
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Linguagem', 'Troque isto por isto', C.lilac);
    const cw1 = 2.55, cw2 = CW - cw1 - 0.15;
    text(s, 'EVITE', { x: M, y: 1.6, w: cw1, h: 0.3, fontSize: 10, bold: true, color: C.coral, charSpacing: 2 });
    text(s, 'PREFIRA', { x: M + cw1 + 0.15, y: 1.6, w: cw2, h: 0.3, fontSize: 10, bold: true, color: C.mint, charSpacing: 2 });
    const rows = require('./content/extras').TROCAS.slice(0, 10);
    let y = 1.95;
    for (const [ev, pr] of rows) {
      const h = 0.74;
      card(s, pres, { x: M, y, w: cw1, h, fill: C.coralT, radius: 0.12 });
      card(s, pres, { x: M + cw1 + 0.15, y, w: cw2, h, fill: C.mintT, radius: 0.12 });
      text(s, ev.replace(/\[NOME\]/g, 'Fulano'), { x: M + 0.18, y, w: cw1 - 0.36, h, fontSize: 9.5, valign: 'middle', strike: 'sngStrike', color: C.ink2 });
      text(s, pr.replace(/\[NOME\]/g, 'Fulano'), { x: M + cw1 + 0.33, y, w: cw2 - 0.36, h, fontSize: 9.5, valign: 'middle' });
      y += h + 0.1;
    }
    text(s, 'Regra de ouro: descreva o que a criança FAZ, nunca o que ela "É". Mais trocas no Banco de Frases.', { x: M, y: y + 0.15, w: CW, h: 0.4, fontSize: 10.5, bold: true, color: C.lilac });
    footer(s, n);
  }

  { // Erros comuns
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Atenção', 'Os 10 erros mais comuns (e como evitar)', C.lilac);
    let y = 1.75;
    for (let i = 0; i < 10; i++) {
      const h = 0.72;
      card(s, pres, { x: M, y, w: CW, h, fill: i % 2 ? 'FFFFFF' : C.mist, radius: 0.12 });
      s.addShape(pres.shapes.OVAL, { x: M + 0.2, y: y + 0.14, w: 0.44, h: 0.44, fill: { color: C.coral }, line: { color: C.coral, width: 0 } });
      text(s, String(i + 1), { x: M + 0.2, y: y + 0.14, w: 0.44, h: 0.44, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      text(s, G.ERROS[i], { x: M + 0.85, y, w: CW - 1.05, h, fontSize: 11.5, valign: 'middle' });
      y += h + 0.1;
    }
    card(s, pres, { x: M, y: y + 0.15, w: CW, h: 1.0, fill: C.ink });
    text(s, 'Usou o banco de frases? Ótimo. Agora acrescente em cada bloco um fato ou uma fala real da criança. É isso que torna cada relatório único.', { x: M + 0.35, y: y + 0.15, w: CW - 0.7, h: 1.0, fontSize: 11.5, color: 'FFFFFF', valign: 'middle' });
    footer(s, n);
  }

  { // Situações delicadas
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Cuidado', 'Situações delicadas: como escrever', C.lilac);
    text(s, 'Descreva fatos, nunca rótulos. Mostre que a situação está sendo acompanhada e qual é o próximo passo. Frases prontas para cada caso estão no Banco de Frases.', { x: M, y: 1.65, w: CW, h: 0.65, fontSize: 11, color: C.ink2 });
    const del = require('./content/extras').DELICADAS.grupos;
    const cw = (CW - 0.25) / 2, ch = 2.02;
    const icons = ['PiWarning', 'PiHeart', 'PiUsers', 'PiChatCircleText', 'PiPersonSimpleRun', 'PiCalendar', 'PiEye', 'PiHandHeart'];
    for (let i = 0; i < 8; i++) {
      const g = del[i], x = M + (i % 2) * (cw + 0.25), y = 2.45 + Math.floor(i / 2) * (ch + 0.17);
      card(s, pres, { x, y, w: cw, h: ch, fill: i === 6 ? C.coralT : C.mist });
      await iconCircle(s, pres, { x: x + 0.2, y: y + 0.2, d: 0.42, fill: i === 6 ? C.coral : C.lilac, name: icons[i] });
      text(s, g.nome, { x: x + 0.72, y: y + 0.2, w: cw - 0.9, h: 0.42, fontSize: 11, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
      text(s, g.orientacao, { x: x + 0.2, y: y + 0.72, w: cw - 0.4, h: ch - 0.82, fontSize: 9, color: C.ink });
    }
    footer(s, n);
  }

  { // Família x Escola
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Destinatário', 'Para a família ou para a escola?', C.lilac);
    text(s, 'Muitas redes pedem dois documentos: o relatório pedagógico (que vai para o prontuário) e uma devolutiva para a família. O kit traz modelos para os dois.', { x: M, y: 1.65, w: CW, h: 0.7, fontSize: 11.5, color: C.ink2 });
    const cols = [
      { t: 'Relatório pedagógico', sub: 'escola, coordenação, prontuário', i: 'PiFileText', c: C.sky, tc: C.skyT, items: ['Linguagem pedagógica, clara e respeitosa', 'Organizado pelos campos de experiência', 'Pode citar os códigos dos objetivos da BNCC', 'Mostra a intencionalidade e os próximos passos da equipe', 'É documento oficial (LDB, art. 31): segue o modelo da rede'] },
      { t: 'Carta à família', sub: 'devolutiva afetiva', i: 'PiEnvelopeSimple', c: C.coral, tc: C.coralT, items: ['Linguagem simples e calorosa, sem jargões', 'Sem códigos da BNCC', 'Cenas, falas e conquistas que emocionam', 'Sugestões simples para fazer em casa', 'Curta: cabe em uma página com foto'] },
    ];
    const cw = (CW - 0.3) / 2;
    for (let k = 0; k < 2; k++) {
      const col = cols[k], x = M + k * (cw + 0.3), y = 2.55;
      card(s, pres, { x, y, w: cw, h: 6.3, fill: col.tc });
      await iconCircle(s, pres, { x: x + 0.3, y: y + 0.3, d: 0.75, fill: col.c, name: col.i });
      text(s, col.t, { x: x + 0.3, y: y + 1.25, w: cw - 0.6, h: 0.4, fontSize: 16, fontFace: FONT_HEAD, bold: true });
      text(s, col.sub, { x: x + 0.3, y: y + 1.65, w: cw - 0.6, h: 0.3, fontSize: 9.5, italic: true, color: C.ink2 });
      for (let j = 0; j < col.items.length; j++) {
        const iy = y + 2.25 + j * 0.78;
        s.addShape(pres.shapes.OVAL, { x: x + 0.32, y: iy + 0.07, w: 0.14, h: 0.14, fill: { color: col.c }, line: { color: col.c, width: 0 } });
        text(s, col.items[j], { x: x + 0.62, y: iy, w: cw - 0.9, h: 0.6, fontSize: 10.5 });
      }
    }
    card(s, pres, { x: M, y: 9.15, w: CW, h: 1.35, fill: C.ink });
    text(s, [{ text: 'Se a sua rede usa um documento só\n', options: { bold: true, color: C.sun, breakLine: true } }, { text: 'Escreva o relatório pedagógico como se a família fosse ler, porque ela vai. Use os códigos da BNCC entre parênteses, discretos, no fim das frases.', options: { color: 'FFFFFF' } }], { x: M + 0.35, y: 9.15, w: CW - 0.7, h: 1.35, fontSize: 11, valign: 'middle' });
    footer(s, n);
  }

  { // Checklist
    const s = add('Parte 5 · Escrever');
    pageTitle(s, 'Parte 5 · Revisão', 'Checklist antes de entregar', C.lilac);
    text(s, 'Imprima esta página ou deixe-a aberta ao lado enquanto revisa cada relatório.', { x: M, y: 1.65, w: CW, h: 0.4, fontSize: 11.5, color: C.ink2 });
    let y = 2.25;
    for (let i = 0; i < G.CHECKLIST.length; i++) {
      const h = 0.72;
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist, radius: 0.12 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.25, y: y + 0.2, w: 0.32, h: 0.32, fill: { color: 'FFFFFF' }, line: { color: C.lilac, width: 1.5 }, rectRadius: 0.06 });
      text(s, G.CHECKLIST[i], { x: M + 0.8, y, w: CW - 1.0, h, fontSize: 11.5, valign: 'middle' });
      y += h + 0.1;
    }
    footer(s, n);
  }

  // ---------- REFERÊNCIAS ----------
  pres.addSection({ title: 'Fechamento' });
  {
    const s = add('Fechamento');
    pageTitle(s, 'Para aprofundar', 'Referências');
    toc.push({ num: '', title: 'Referências', page: n, color: C.ink2 });
    text(s, G.REFERENCIAS.map((r, i) => ({ text: r, options: { breakLine: i < G.REFERENCIAS.length - 1, paraSpaceAfter: 12 } })), { x: M, y: 1.75, w: CW, h: 8.9, fontSize: 11, color: C.ink });
    footer(s, n);
  }
  n += 1;
  D.closingPage(pres, 'Fechamento', require('./content/fontes').ENCERRAMENTOS.guia);

  // ---------- Preenche o sumário ----------
  {
    const s = sumario;
    pageTitle(s, 'Sumário', 'O que você vai encontrar');
    let y = 2.0;
    const descs = {
      '01': 'Base legal · avaliação é e não é · referenciais teóricos',
      '02': 'Faixas da BNCC · direitos de aprendizagem · marcos do desenvolvimento',
      '03': 'Os cinco campos de experiência no Berçário e no Maternal',
      '04': 'Seis técnicas de registro · o método dos 5 minutos',
      '05': 'Estrutura · linguagem · erros comuns · situações delicadas · checklist',
    };
    for (const t of toc) {
      const h = t.num ? 1.45 : 0.75;
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist });
      if (t.num) text(s, t.num, { x: M + 0.3, y, w: 1.0, h, fontSize: 30, fontFace: FONT_HEAD, bold: true, color: t.color, valign: 'middle' });
      text(s, t.title, { x: M + (t.num ? 1.35 : 0.3), y: y + (t.num ? 0.28 : 0), w: CW - 2.5, h: t.num ? 0.45 : h, fontSize: 15, fontFace: FONT_HEAD, bold: true, valign: t.num ? 'top' : 'middle' });
      if (t.num) text(s, descs[t.num], { x: M + 1.35, y: y + 0.75, w: CW - 2.5, h: 0.5, fontSize: 10, color: C.ink2 });
      text(s, `p. ${t.page}`, { x: W - M - 1.0, y, w: 0.75, h, fontSize: 12, bold: true, color: t.color, align: 'right', valign: 'middle' });
      y += h + 0.2;
    }
    footer(s, sumarioN);
  }

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile, n, 'páginas');
}

main(process.argv[2] || '../01 - Guia Pedagogico.pptx').catch((e) => { console.error(e); process.exit(1); });
