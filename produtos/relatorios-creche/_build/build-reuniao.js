// Order bump 2 (parte A4): "Kit Reunião de Entrega dos Relatórios" — guia, convites e documentos.
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { W, H, M, C, FONT_HEAD, text, iconCircle, card, dots } = D;
const CW = W - 2 * M;
const MARCA = 'Kit Reunião de Entrega dos Relatórios';
const GRAY = 'A9A4BF';
const foot = (s, n) => D.footer(s, n, MARCA);

function title(s, kicker, t, cor = 'coral') {
  text(s, kicker.toUpperCase(), { x: M, y: 0.55, w: CW, h: 0.25, fontSize: 9, bold: true, color: C[cor], charSpacing: 2 });
  text(s, t, { x: M, y: 0.8, w: CW, h: 0.65, fontSize: 26, fontFace: FONT_HEAD, bold: true });
}
function line(s, pres, x, y, w, color = 'B9B4D3') { s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: 0.75 } }); }
function cut(s, pres, y) {
  s.addShape(pres.shapes.LINE, { x: 0.3, y, w: W - 0.6, h: 0, line: { color: 'B9B4D3', width: 1, dashType: 'dash' } });
  text(s, '✂', { x: 0.3, y: y - 0.16, w: 0.3, h: 0.3, fontSize: 12, color: GRAY });
}
function grid(s, pres, { x, y, cols, rowH, rows, headFill, cells = [] }) {
  const tw = cols.reduce((a, c) => a + c.w, 0), hh = 0.42;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: tw, h: hh, fill: { color: headFill }, line: { color: headFill, width: 0 }, rectRadius: 0.08 });
  let cx = x;
  for (const c of cols) { text(s, c.t, { x: cx + 0.08, y, w: c.w - 0.16, h: hh, fontSize: 9, bold: true, color: 'FFFFFF', valign: 'middle', align: c.align || 'left' }); cx += c.w; }
  for (let r = 0; r < rows; r++) {
    const ry = y + hh + r * rowH;
    s.addShape(pres.shapes.RECTANGLE, { x, y: ry, w: tw, h: rowH, fill: { color: r % 2 ? 'FFFFFF' : C.mist }, line: { color: C.line, width: 0.5 } });
    cx = x;
    cols.forEach((c, i) => {
      if (i > 0) s.addShape(pres.shapes.LINE, { x: cx, y: ry, w: 0, h: rowH, line: { color: C.line, width: 0.5 } });
      const v = cells[r] && cells[r][i];
      if (v) text(s, v, { x: cx + 0.08, y: ry, w: c.w - 0.16, h: rowH, fontSize: 9, valign: 'middle', align: c.align || 'left' });
      cx += c.w;
    });
  }
}

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = MARCA; pres.author = MARCA;
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };
  let n = 0;
  const add = (sec, bg = C.paper) => { n += 1; const s = pres.addSlide({ sectionTitle: sec }); s.background = { color: bg }; return s; };

  // ---------- Capa ----------
  pres.addSection({ title: 'Abertura' });
  {
    const s = add('Abertura', C.ink);
    const circ = [{ x: 4.4, y: 0.8, d: 3.1, c: C.sky }, { x: 6.5, y: 3.5, d: 1.3, c: C.sun }, { x: 3.7, y: 3.4, d: 1.0, c: C.coral }, { x: 5.6, y: 4.3, d: 0.8, c: C.mint }, { x: 7.0, y: 0.6, d: 0.55, c: C.lilac }];
    for (const c of circ) s.addShape(pres.shapes.OVAL, { x: c.x, y: c.y, w: c.d, h: c.d, fill: { color: c.c }, line: { color: c.c, width: 0 } });
    await iconCircle(s, pres, { x: 5.2, y: 1.6, d: 1.5, fill: C.sky, name: 'PiUsers', ratio: 0.62 });
    text(s, 'KIT RELATÓRIOS DA CRECHE · COMPLEMENTO', { x: M, y: 5.55, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Reunião de entrega dos relatórios', { x: M, y: 5.95, w: 6.8, h: 1.9, fontSize: 38, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Tudo para preparar, conduzir e registrar a reunião com as famílias: roteiro, frases para conversas delicadas, convites, documentos e uma apresentação da turma editável no Canva.', { x: M, y: 8.0, w: 6.3, h: 1.1, fontSize: 13.5, color: 'E9E6F5' });
    text(s, 'Guia da reunião · 8 documentos para imprimir · apresentação 16:9 editável', { x: M, y: 10.6, w: CW, h: 0.3, fontSize: 10, color: 'B9B4D3' });
  }

  // ---------- Roteiro ----------
  {
    const s = add('Abertura');
    title(s, 'Guia da reunião', 'Roteiro de 40 minutos', 'sky');
    text(s, 'A LDB (art. 31) pede que a creche documente o desenvolvimento das crianças, e as Diretrizes Curriculares (Resolução CNE/CEB nº 5/2009, art. 10) pedem que essa documentação permita às famílias conhecer o trabalho da instituição. A reunião de entrega é o momento em que isso acontece de verdade: o relatório vira conversa.', { x: M, y: 1.5, w: CW, h: 1.1, fontSize: 11, color: C.ink2 });
    const etapas = [
      ['5 min', 'Acolhida', 'Receba as famílias pelo nome, com música da turma tocando e fotos expostas. Passe a lista de presença.', 'coral', 'PiHandHeart'],
      ['10 min', 'A turma no semestre', 'Projete a apresentação: rotina, o que a turma viveu em cada campo de experiência, fotos dos momentos.', 'sun', 'PiPresentationChart'],
      ['5 min', 'Como acompanhamos cada criança', 'Explique como a equipe observa e registra, e como ler o relatório (seis blocos, sem nota, sem comparação).', 'mint', 'PiEye'],
      ['15 min', 'Entrega e conversa individual', 'Entregue o relatório em envelope, em conversas curtas. Assuntos delicados ficam para um horário individual.', 'sky', 'PiChatsCircle'],
      ['5 min', 'Encerramento', 'Agradeça, apresente os próximos passos e entregue a avaliação da reunião para as famílias responderem.', 'lilac', 'PiStar'],
    ];
    let y = 2.8;
    for (const [t, nome, d, cor, ic] of etapas) {
      card(s, pres, { x: M, y, w: CW, h: 1.28, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: M + 0.25, y: y + 0.29, d: 0.7, fill: C[cor], name: ic });
      text(s, t, { x: M + 1.1, y: y + 0.2, w: 1.0, h: 0.35, fontSize: 11, bold: true, color: C[cor] });
      text(s, nome, { x: M + 2.0, y: y + 0.18, w: CW - 2.25, h: 0.38, fontSize: 14, fontFace: FONT_HEAD, bold: true });
      text(s, d, { x: M + 1.1, y: y + 0.6, w: CW - 1.35, h: 0.6, fontSize: 10, color: C.ink2 });
      y += 1.4;
    }
    card(s, pres, { x: M, y: y + 0.05, w: CW, h: 0.9, fill: C.ink });
    text(s, [{ text: 'Leve impresso: ', options: { bold: true, color: C.sun } }, { text: 'lista de presença, pauta, relatórios em envelopes, recibos de entrega e avaliações.', options: { color: 'FFFFFF' } }], { x: M + 0.3, y: y + 0.05, w: CW - 0.6, h: 0.9, fontSize: 10.5, valign: 'middle' });
    foot(s, n);
  }

  // ---------- Como falar com as famílias ----------
  {
    const s = add('Abertura');
    title(s, 'Guia da reunião', 'Como conversar com as famílias', 'sky');
    text(s, 'Os Indicadores da Qualidade na Educação Infantil (MEC, 2009) dedicam uma dimensão inteira à cooperação e troca com as famílias. Estes princípios ajudam a conversa a fortalecer essa parceria.', { x: M, y: 1.5, w: CW, h: 0.8, fontSize: 11, color: C.ink2 });
    const pr = [
      ['Comece pelo que a criança conquistou', 'A família precisa reconhecer o próprio filho no que você conta. Abra sempre com uma cena bonita e verdadeira.', 'coral'],
      ['Descreva fatos, não rótulos', '"Ele tem mordido nos momentos de disputa" em vez de "ele é agressivo". Fatos abrem conversa; rótulos fecham.', 'mint'],
      ['Escute mais do que fala', 'Pergunte como a criança é em casa. A família conhece a criança de um jeito que a creche não vê.', 'sun'],
      ['Nunca compare crianças', 'Nem com colegas, nem com irmãos. Compare a criança com ela mesma no início do semestre.', 'sky'],
      ['Combine um próximo passo', 'Termine com algo concreto para casa e para a creche: "vamos incentivar que ele coma sozinho".', 'lilac'],
      ['Delicado é individual', 'Preocupações sobre desenvolvimento são conversadas a sós, com a coordenação, nunca na roda.', 'coral'],
    ];
    const cw = (CW - 0.25) / 2, ch = 2.2;
    pr.forEach(([t, d, cor], i) => {
      const x = M + (i % 2) * (cw + 0.25), y = 2.5 + Math.floor(i / 2) * (ch + 0.22);
      card(s, pres, { x, y, w: cw, h: ch, fill: C[cor + 'T'] });
      s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.28, w: 0.42, h: 0.42, fill: { color: C[cor] }, line: { color: C[cor], width: 0 } });
      text(s, String(i + 1), { x: x + 0.25, y: y + 0.28, w: 0.42, h: 0.42, fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      text(s, t, { x: x + 0.85, y: y + 0.22, w: cw - 1.05, h: 0.6, fontSize: 12.5, fontFace: FONT_HEAD, bold: true });
      text(s, d, { x: x + 0.25, y: y + 0.95, w: cw - 0.5, h: ch - 1.05, fontSize: 10.5, color: C.ink2 });
    });
    foot(s, n);
  }

  // ---------- Frases para conversas delicadas ----------
  {
    const s = add('Abertura');
    title(s, 'Guia da reunião', 'Frases para conversas delicadas', 'sky');
    const fr = [
      ['Mordidas', '"Nesta fase, muitas crianças ainda usam a boca quando faltam palavras. Temos acompanhado de perto e oferecido alternativas, e as situações estão diminuindo. Em casa, vocês têm notado algo parecido?"'],
      ['Adaptação e choro', '"O choro na despedida mostra o vínculo forte que ela tem com vocês. Depois da chegada, ela se acalma e participa. Despedidas curtas e sempre do mesmo jeito ajudam muito."'],
      ['Desfralde', '"Ele tem dado sinais de interesse pelo banheiro. Que tal combinarmos de começar juntos, no tempo dele, sem pressa?"'],
      ['Alimentação', '"Ela tem experimentado novos alimentos aos poucos. Oferecemos de novo, sem pressão. Quais ela come bem em casa?"'],
      ['Fala', '"Ele se comunica muito por gestos e algumas palavras, e entende tudo o que dizemos. Conversar e ler juntos em casa ajuda bastante."'],
      ['Sinal de atenção', 'Nunca na roda. Marque uma conversa individual com a coordenação: "Observamos algumas situações e gostaríamos de conversar com calma com vocês."'],
    ];
    let y = 1.6;
    for (const [t, f] of fr) {
      const h = 1.45, delicado = t === 'Sinal de atenção';
      card(s, pres, { x: M, y, w: 1.85, h, fill: delicado ? C.coral : C.sky, radius: 0.14 });
      text(s, t, { x: M + 0.15, y, w: 1.55, h, fontSize: 12, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF', valign: 'middle' });
      card(s, pres, { x: M + 2.0, y, w: CW - 2.0, h, fill: delicado ? C.coralT : C.skyT, radius: 0.14 });
      text(s, f, { x: M + 2.25, y, w: CW - 2.5, h, fontSize: 10.5, italic: !delicado, valign: 'middle' });
      y += h + 0.12;
    }
    foot(s, n);
  }

  // ---------- Convite A4 ----------
  pres.addSection({ title: 'Documentos' });
  {
    const s = add('Documentos', C.skyT);
    card(s, pres, { x: M, y: 0.55, w: CW, h: H - 1.1, fill: 'FFFFFF', shadow: true });
    dots(s, pres, W / 2 - 0.65, 1.0, 1.2);
    text(s, 'CONVITE', { x: M, y: 2.35, w: CW, h: 0.35, fontSize: 13, bold: true, color: C.sky, charSpacing: 6, align: 'center' });
    text(s, 'Venha conhecer o semestre do seu filho!', { x: M + 0.5, y: 2.8, w: CW - 1.0, h: 1.6, fontSize: 32, fontFace: FONT_HEAD, bold: true, align: 'center' });
    text(s, 'Queridas famílias da turma [nome da turma], convidamos vocês para a reunião de entrega dos relatórios. Vamos mostrar as descobertas da turma e conversar sobre o desenvolvimento de cada criança.', { x: M + 0.8, y: 4.55, w: CW - 1.6, h: 1.3, fontSize: 13, align: 'center', color: C.ink2 });
    const info = [['PiCalendar', 'Data', '[dia/mês]', 'coral'], ['PiClock', 'Horário', '[00h00]', 'sun'], ['PiMapPin', 'Local', '[sala / escola]', 'mint']];
    const iw = (CW - 1.4) / 3;
    for (let i = 0; i < 3; i++) {
      const [ic, l, v, cor] = info[i], x = M + 0.5 + i * (iw + 0.2);
      card(s, pres, { x, y: 6.2, w: iw, h: 2.0, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: x + iw / 2 - 0.35, y: 6.4, d: 0.7, fill: C[cor], name: ic });
      text(s, l, { x, y: 7.2, w: iw, h: 0.3, fontSize: 10, bold: true, color: C.ink2, align: 'center' });
      text(s, v, { x, y: 7.5, w: iw, h: 0.45, fontSize: 15, fontFace: FONT_HEAD, bold: true, color: GRAY, align: 'center' });
    }
    text(s, 'A presença de vocês é muito importante para nós!', { x: M, y: 8.6, w: CW, h: 0.4, fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.sky, align: 'center' });
    text(s, 'Com carinho, equipe da turma [nome] · [Nome da escola / CMEI]', { x: M, y: 9.2, w: CW, h: 0.35, fontSize: 11, color: C.ink2, align: 'center' });
  }

  // ---------- Convites bilhete (2 por página) ----------
  {
    const s = add('Documentos');
    for (let k = 0; k < 2; k++) {
      const y0 = 0.45 + k * 5.55;
      card(s, pres, { x: M, y: y0, w: CW, h: 4.95, fill: k ? C.mintT : C.sunT });
      await iconCircle(s, pres, { x: M + 0.35, y: y0 + 0.35, d: 0.85, fill: k ? C.mint : C.sun, name: 'PiEnvelopeSimple' });
      text(s, 'Convite para a família', { x: M + 1.45, y: y0 + 0.42, w: CW - 1.8, h: 0.45, fontSize: 20, fontFace: FONT_HEAD, bold: true });
      text(s, 'Reunião de entrega dos relatórios', { x: M + 1.45, y: y0 + 0.88, w: CW - 1.8, h: 0.35, fontSize: 12, color: C.ink2 });
      text(s, [{ text: 'Família de: ', options: { bold: true } }, { text: '_________________________________________', options: { color: GRAY } }], { x: M + 0.4, y: y0 + 1.65, w: CW - 0.8, h: 0.4, fontSize: 12 });
      text(s, 'Venham conhecer as descobertas da turma e receber o relatório do semestre do seu filho. Contamos com vocês!', { x: M + 0.4, y: y0 + 2.2, w: CW - 0.8, h: 0.8, fontSize: 12 });
      text(s, [{ text: 'Data: ', options: { bold: true } }, { text: '[___/___]', options: { color: GRAY } }, { text: '     Horário: ', options: { bold: true } }, { text: '[__h__]', options: { color: GRAY } }, { text: '     Local: ', options: { bold: true } }, { text: '[__________]', options: { color: GRAY } }], { x: M + 0.4, y: y0 + 3.15, w: CW - 0.8, h: 0.4, fontSize: 12 });
      text(s, 'Equipe da turma [nome]', { x: M + 0.4, y: y0 + 4.05, w: CW - 0.8, h: 0.4, fontSize: 13, fontFace: FONT_HEAD, bold: true, color: k ? C.mint : C.coral });
      if (k === 0) cut(s, pres, 5.73);
    }
  }

  // ---------- Pauta ----------
  {
    const s = add('Documentos');
    title(s, 'Para as famílias', 'Pauta da reunião', 'sun');
    text(s, '[Nome da escola / CMEI] · Turma [nome] · [data]', { x: M, y: 1.45, w: CW, h: 0.3, fontSize: 11, color: C.ink2 });
    const itens = [['Boas-vindas e apresentação da equipe', 'coral'], ['Como foi o semestre da turma', 'sun'], ['Como acompanhamos e avaliamos cada criança', 'mint'], ['Entrega dos relatórios e conversas individuais', 'sky'], ['Próximos passos e datas importantes', 'lilac'], ['Avaliação da reunião', 'coral']];
    let y = 2.05;
    itens.forEach(([t, cor], i) => {
      card(s, pres, { x: M, y, w: CW, h: 0.95, fill: C[cor + 'T'], radius: 0.14 });
      s.addShape(pres.shapes.OVAL, { x: M + 0.25, y: y + 0.22, w: 0.5, h: 0.5, fill: { color: C[cor] }, line: { color: C[cor], width: 0 } });
      text(s, String(i + 1), { x: M + 0.25, y: y + 0.22, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      text(s, t, { x: M + 1.0, y, w: CW - 1.2, h: 0.95, fontSize: 14, valign: 'middle', bold: true });
      y += 1.1;
    });
    card(s, pres, { x: M, y: y + 0.15, w: CW, h: 2.1, fill: C.mist });
    text(s, 'ANOTAÇÕES', { x: M + 0.3, y: y + 0.3, w: 3, h: 0.25, fontSize: 9, bold: true, color: C.ink2, charSpacing: 1 });
    for (let l = 0; l < 3; l++) line(s, pres, M + 0.3, y + 0.95 + l * 0.42, CW - 0.6, 'D9D5E6');
    foot(s, n);
  }

  // ---------- Lista de presença ----------
  {
    const s = add('Documentos');
    title(s, 'Documento', 'Lista de presença', 'mint');
    text(s, '[Nome da escola / CMEI] · Turma [nome] · Data: ___/___/______', { x: M, y: 1.45, w: CW, h: 0.3, fontSize: 11, color: C.ink2 });
    const cols = [{ t: '#', w: 0.45, align: 'center' }, { t: 'Criança', w: 2.3 }, { t: 'Responsável presente', w: 2.4 }, { t: 'Assinatura', w: 1.92 }];
    grid(s, pres, { x: M, y: 1.95, cols, rowH: 0.345, rows: 25, headFill: C.mint, cells: Array.from({ length: 25 }, (_, i) => [String(i + 1)]) });
    foot(s, n);
  }

  // ---------- Recibos de entrega (3 por página) ----------
  {
    const s = add('Documentos');
    for (let k = 0; k < 3; k++) {
      const y0 = 0.4 + k * 3.7;
      card(s, pres, { x: M, y: y0, w: CW, h: 3.2, fill: C.mist });
      text(s, 'Recibo de entrega do relatório', { x: M + 0.35, y: y0 + 0.25, w: CW - 0.7, h: 0.45, fontSize: 17, fontFace: FONT_HEAD, bold: true });
      text(s, [{ text: 'Recebi o relatório descritivo de desenvolvimento e aprendizagem do ', options: {} }, { text: '[1º/2º]', options: { color: GRAY } }, { text: ' semestre de ', options: {} }, { text: '[ano]', options: { color: GRAY } }, { text: ' referente à criança:', options: {} }], { x: M + 0.35, y: y0 + 0.8, w: CW - 0.7, h: 0.5, fontSize: 11 });
      line(s, pres, M + 0.35, y0 + 1.7, CW - 0.7);
      text(s, 'Nome da criança', { x: M + 0.35, y: y0 + 1.75, w: 3, h: 0.25, fontSize: 8.5, color: C.ink2 });
      line(s, pres, M + 0.35, y0 + 2.6, 4.2);
      line(s, pres, M + 4.85, y0 + 2.6, CW - 5.2);
      text(s, 'Assinatura do responsável', { x: M + 0.35, y: y0 + 2.65, w: 4, h: 0.25, fontSize: 8.5, color: C.ink2 });
      text(s, 'Data', { x: M + 4.85, y: y0 + 2.65, w: 2, h: 0.25, fontSize: 8.5, color: C.ink2 });
      if (k < 2) cut(s, pres, y0 + 3.45);
    }
  }

  // ---------- Registro da conversa individual ----------
  {
    const s = add('Documentos');
    title(s, 'Para a professora', 'Registro da conversa individual', 'lilac');
    const fl = [['Criança', 3.2], ['Responsável', 2.2], ['Data', 1.3]];
    let x = M;
    for (const [l, w] of fl) { text(s, l.toUpperCase(), { x, y: 1.6, w, h: 0.22, fontSize: 8, bold: true, color: C.ink2, charSpacing: 1 }); line(s, pres, x, 2.1, w - 0.2); x += w + 0.18; }
    const blocos = [['Pontos destacados no relatório', 'coral'], ['O que a família contou sobre a criança em casa', 'mint'], ['Dúvidas ou preocupações da família', 'sun'], ['Combinados (creche e família)', 'sky']];
    let y = 2.45;
    for (const [t, cor] of blocos) {
      card(s, pres, { x: M, y, w: CW, h: 1.8, fill: C[cor + 'T'], radius: 0.14 });
      text(s, t, { x: M + 0.3, y: y + 0.18, w: CW - 0.6, h: 0.35, fontSize: 12, fontFace: FONT_HEAD, bold: true });
      for (let l = 0; l < 3; l++) line(s, pres, M + 0.3, y + 0.85 + l * 0.34, CW - 0.6, 'FFFFFF');
      y += 1.95;
    }
    text(s, 'Precisa de acompanhamento da coordenação?   ☐ Não   ☐ Sim  →  data combinada: ___/___', { x: M, y: y + 0.1, w: CW, h: 0.35, fontSize: 11, bold: true });
    foot(s, n);
  }

  // ---------- Avaliação da reunião (2 por página) ----------
  {
    const s = add('Documentos');
    for (let k = 0; k < 2; k++) {
      const y0 = 0.45 + k * 5.55;
      card(s, pres, { x: M, y: y0, w: CW, h: 4.95, fill: k ? C.lilacT : C.skyT });
      text(s, 'Como foi a reunião para você?', { x: M + 0.35, y: y0 + 0.3, w: CW - 0.7, h: 0.45, fontSize: 18, fontFace: FONT_HEAD, bold: true });
      text(s, 'Sua opinião ajuda a melhorar os próximos encontros. Não precisa se identificar.', { x: M + 0.35, y: y0 + 0.78, w: CW - 0.7, h: 0.35, fontSize: 10.5, color: C.ink2 });
      const qs = ['Entendi como a creche acompanha meu filho.', 'O relatório me ajudou a conhecer o semestre dele.', 'Tive espaço para tirar minhas dúvidas.'];
      qs.forEach((q, i) => {
        const yy = y0 + 1.3 + i * 0.62;
        text(s, q, { x: M + 0.35, y: yy, w: 4.0, h: 0.5, fontSize: 10.5, valign: 'middle' });
        text(s, '☐ Sim     ☐ Em parte     ☐ Não', { x: M + 4.4, y: yy, w: CW - 4.7, h: 0.5, fontSize: 10.5, valign: 'middle', color: C.ink2 });
      });
      text(s, 'Um recado para a equipe:', { x: M + 0.35, y: y0 + 3.3, w: CW - 0.7, h: 0.3, fontSize: 10.5, bold: true });
      for (let l = 0; l < 2; l++) line(s, pres, M + 0.35, y0 + 4.0 + l * 0.4, CW - 0.7, 'FFFFFF');
      if (k === 0) cut(s, pres, 5.73);
    }
  }

  // ---------- Bilhete de agradecimento (2 por página) ----------
  {
    const s = add('Documentos');
    for (let k = 0; k < 2; k++) {
      const y0 = 0.45 + k * 5.55;
      card(s, pres, { x: M, y: y0, w: CW, h: 4.95, fill: k ? C.coralT : C.sunT });
      dots(s, pres, W - M - 1.5, y0 + 0.35, 0.95);
      text(s, 'Obrigada, família!', { x: M + 0.4, y: y0 + 0.5, w: CW - 2.2, h: 0.7, fontSize: 28, fontFace: FONT_HEAD, bold: true });
      text(s, 'Foi muito bom ter vocês na reunião. Seguimos juntos cuidando e acompanhando cada descoberta de [nome da criança]. Qualquer dúvida, estamos à disposição.', { x: M + 0.4, y: y0 + 1.55, w: CW - 0.8, h: 1.4, fontSize: 13 });
      text(s, 'Com carinho, equipe da turma [nome]', { x: M + 0.4, y: y0 + 3.6, w: CW - 0.8, h: 0.45, fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.coral });
      if (k === 0) cut(s, pres, 5.73);
    }
  }

  pres.addSection({ title: 'Encerramento' });
  D.closingPage(pres, 'Encerramento', require('./content/fontes').ENCERRAMENTOS.reuniao);
  n += 1;

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile, n, 'páginas');
}

main(process.argv[2] || '../../reuniao-entrega-relatorios/01 - Guia e Documentos da Reuniao.pptx').catch((e) => { console.error(e); process.exit(1); });
