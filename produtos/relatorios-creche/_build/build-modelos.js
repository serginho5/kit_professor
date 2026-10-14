// Gera "02 - Modelos de Relatorio Editaveis.pptx" (A4 retrato, importável no Canva).
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { EXEMPLOS, CARTA_FAMILIA, TURMA } = require('./content/exemplos');
const { W, H, M, C, FONT_HEAD, text, iconCircle, card, dots } = D;
const CW = W - 2 * M;

const TITULOS = ['Chegada e vínculos', 'Relações e convivência', 'Corpo, movimento e cuidados', 'Linguagens e expressão', 'Explorações e descobertas', 'Conquistas e próximos passos'];
const BLOCO_COR = ['coral', 'coral', 'mint', 'sky', 'lilac', 'sun'];
const BLOCO_ICON = ['PiHouse', 'PiHandHeart', 'PiPersonSimpleRun', 'PiChatCircleText', 'PiMagnifyingGlass', 'PiStar'];

const GUIAS = require('./content/guias');

// Estimativa de altura de um parágrafo (polegadas) para diagramar blocos sem sobreposição.
function textHeight(str, widthIn, pt = 10.5) {
  const cpi = 13.2 * (10.5 / pt);
  const lines = Math.ceil(str.length / (widthIn * cpi)) + (str.match(/\n/g) || []).length;
  return lines * (pt * 1.32 / 72) + 0.06;
}

async function photoSlot(s, pres, { x, y, w, h, round = true, label = 'Foto' }) {
  if (round) s.addShape(pres.shapes.OVAL, { x, y, w, h, fill: { color: 'FFFFFF' }, line: { color: 'CFC9E0', width: 1.5, dashType: 'dash' }, objectName: 'Espaço para foto' });
  else s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: 'FFFFFF' }, line: { color: 'CFC9E0', width: 1.5, dashType: 'dash' }, rectRadius: 0.15, objectName: 'Espaço para foto' });
  const ic = Math.min(w, h) * 0.28;
  s.addImage({ data: await D.icon('PiCamera', 'A9A4BF'), x: x + (w - ic) / 2, y: y + h / 2 - ic * 0.85, w: ic, h: ic });
  text(s, label, { x, y: y + h / 2 + ic * 0.25, w, h: 0.25, fontSize: 9, color: 'A9A4BF', align: 'center' });
}

function smallFooter(s, label) {
  text(s, label, { x: M, y: H - 0.45, w: CW, h: 0.2, fontSize: 8, color: C.ink2 });
}

// Um relatório em duas páginas.
async function reportPages(pres, cfg) {
  const { cor, turma, faixa, crianca, idade, periodo, blocos, exemplo, section } = cfg;
  const c = C[cor], tc = C[cor + 'T'];
  const nomeTxt = crianca || 'Nome da criança';
  const placeholder = !exemplo;

  // ---- página 1 ----
  const s1 = pres.addSlide({ sectionTitle: section });
  s1.background = { color: C.paper };
  card(s1, pres, { x: M, y: 0.5, w: CW, h: 2.6, fill: tc });
  await photoSlot(s1, pres, { x: M + 0.35, y: 0.75, w: 1.6, h: 1.6 });
  text(s1, 'RELATÓRIO DESCRITIVO INDIVIDUAL', { x: M + 2.4, y: 0.72, w: CW - 2.7, h: 0.3, fontSize: 8.5, bold: true, color: c, charSpacing: 1.5 });
  text(s1, nomeTxt, { x: M + 2.4, y: 0.98, w: CW - 2.7, h: 0.65, fontSize: 26, fontFace: FONT_HEAD, bold: true, color: placeholder ? 'A9A4BF' : C.ink });
  const campos = [
    ['Turma', turma], ['Idade', idade || '___ anos e ___ meses'], ['Período', periodo || '___ semestre / ______'],
    ['Instituição', 'Nome da escola / CMEI'], ['Professora', 'Nome da professora'], ['Faixa BNCC', faixa],
  ];
  for (let i = 0; i < 6; i++) {
    const x = M + 2.4 + (i % 3) * 1.6, y = 1.68 + Math.floor(i / 3) * 0.6;
    text(s1, campos[i][0].toUpperCase(), { x, y, w: 1.5, h: 0.2, fontSize: 7, bold: true, color: C.ink2, charSpacing: 1 });
    text(s1, campos[i][1], { x, y: y + 0.2, w: 1.5, h: 0.32, fontSize: 9.5, color: C.ink });
  }
  text(s1, 'Este relatório apresenta o percurso da criança no semestre, a partir da observação e do registro cotidiano das interações e brincadeiras, conforme a LDB (art. 31), as DCNEI e a BNCC.', { x: M, y: 3.25, w: CW, h: 0.4, fontSize: 8.5, italic: true, color: C.ink2 });

  async function bloco(s, i, y) {
    const tx = blocos[i];
    const col = C[BLOCO_COR[i]];
    await iconCircle(s, pres, { x: M, y, d: 0.48, fill: col, name: BLOCO_ICON[i] });
    text(s, `${i + 1}. ${TITULOS[i]}`, { x: M + 0.65, y: y + 0.04, w: CW - 0.65, h: 0.4, fontSize: 14, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
    if (placeholder) {
      // Área de escrita: caixa suave com a orientação em cinza (a professora apaga e escreve por cima).
      const h = 1.6;
      card(s, pres, { x: M + 0.65, y: y + 0.55, w: CW - 0.65, h, fill: C.mist, radius: 0.12 });
      text(s, tx, { x: M + 0.85, y: y + 0.7, w: CW - 1.05, h: h - 0.3, fontSize: 10.5, color: C.ink2, italic: true, lineSpacingMultiple: 1.1 });
      return y + 0.55 + h + 0.25;
    }
    const h = Math.max(textHeight(tx, CW - 0.65), 0.9);
    text(s, tx, { x: M + 0.65, y: y + 0.55, w: CW - 0.65, h, fontSize: 10.5, color: C.ink, lineSpacingMultiple: 1.1 });
    return y + 0.55 + h + 0.3;
  }

  let y = 3.8;
  for (let i = 0; i < 3; i++) y = await bloco(s1, i, y);
  smallFooter(s1, `${nomeTxt} · ${turma} · página 1 de 2`);

  // ---- página 2 ----
  const s2 = pres.addSlide({ sectionTitle: section });
  s2.background = { color: C.paper };
  card(s2, pres, { x: M, y: 0.5, w: CW, h: 0.7, fill: tc, radius: 0.35 });
  text(s2, nomeTxt, { x: M + 0.35, y: 0.5, w: 4, h: 0.7, fontSize: 15, fontFace: FONT_HEAD, bold: true, valign: 'middle', color: placeholder ? 'A9A4BF' : C.ink });
  text(s2, `${turma} · ${periodo || 'semestre'}`, { x: M + 3.5, y: 0.5, w: CW - 3.85, h: 0.7, fontSize: 10, align: 'right', valign: 'middle', color: C.ink2 });
  y = 1.5;
  for (let i = 3; i < 6; i++) y = await bloco(s2, i, y);

  // Assinaturas
  const sy = Math.max(y + 0.2, 8.7);
  text(s2, 'Local e data: ________________________________________', { x: M, y: sy, w: CW, h: 0.3, fontSize: 10, color: C.ink2 });
  const sw = (CW - 0.6) / 3;
  const ass = ['Professora', 'Coordenação pedagógica', 'Responsável pela criança'];
  for (let k = 0; k < 3; k++) {
    const x = M + k * (sw + 0.3);
    s2.addShape(pres.shapes.LINE, { x, y: sy + 0.85, w: sw, h: 0, line: { color: C.ink2, width: 0.75 } });
    text(s2, ass[k], { x, y: sy + 0.92, w: sw, h: 0.25, fontSize: 9, color: C.ink2, align: 'center' });
  }
  smallFooter(s2, `${nomeTxt} · ${turma} · página 2 de 2`);
}

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = 'Modelos de Relatório Editáveis · Kit Relatórios da Creche';
  pres.author = 'Kit Relatórios da Creche';
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };

  // ---- Capa ----
  pres.addSection({ title: 'Como usar' });
  {
    const s = pres.addSlide({ sectionTitle: 'Como usar' });
    s.background = { color: C.ink };
    dots(s, pres, 5.2, 1.0, 2.0);
    text(s, 'KIT RELATÓRIOS DA CRECHE', { x: M, y: 5.0, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Modelos de relatório editáveis', { x: M, y: 5.4, w: 6.5, h: 1.8, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Berçário · Maternal I · Maternal II\nCarta à família · Relatório da turma · Mini-história', { x: M, y: 7.35, w: 6.5, h: 0.9, fontSize: 14, color: 'E9E6F5' });
  }
  {
    const s = pres.addSlide({ sectionTitle: 'Como usar' });
    s.background = { color: C.paper };
    text(s, 'COMO USAR', { x: M, y: 0.55, w: CW, h: 0.25, fontSize: 9, bold: true, color: C.brand, charSpacing: 2 });
    text(s, 'Do modelo ao relatório pronto em 4 passos', { x: M, y: 0.8, w: CW, h: 0.9, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    const passos = [
      ['PiCopy', 'Duplique o modelo', 'No Canva, use "Duplicar página" no modelo da turma para cada criança. Os exemplos preenchidos mostram o tom e a extensão ideais.'],
      ['PiCamera', 'Coloque a foto', 'Apague o círculo tracejado "Foto" e arraste uma foto da criança (com autorização da família) para o lugar. Use uma moldura circular do Canva.'],
      ['PiPencilSimple', 'Escreva cada bloco', 'Substitua o texto em cinza pelos seus registros. Use o Banco de Frases para começar e acrescente sempre um fato ou uma fala real.'],
      ['PiDownloadSimple', 'Revise e baixe', 'Passe o checklist do guia, confira o nome e a concordância, e baixe em PDF para imprimir ou enviar.'],
    ];
    let y = 1.95;
    const cols = ['coral', 'mint', 'sky', 'sun'];
    for (let i = 0; i < 4; i++) {
      card(s, pres, { x: M, y, w: CW, h: 1.55, fill: C[cols[i] + 'T'] });
      await iconCircle(s, pres, { x: M + 0.3, y: y + 0.38, d: 0.8, fill: C[cols[i]], name: passos[i][0] });
      text(s, `${i + 1}. ${passos[i][1]}`, { x: M + 1.4, y: y + 0.25, w: CW - 1.7, h: 0.4, fontSize: 15, fontFace: FONT_HEAD, bold: true });
      text(s, passos[i][2], { x: M + 1.4, y: y + 0.68, w: CW - 1.7, h: 0.75, fontSize: 10.5, color: C.ink2 });
      y += 1.75;
    }
    card(s, pres, { x: M, y: y + 0.1, w: CW, h: 2.0, fill: C.ink });
    text(s, [
      { text: 'O que tem neste arquivo\n', options: { bold: true, color: C.sun, fontSize: 12, breakLine: true } },
      { text: 'Modelos em branco com orientações: Berçário, Maternal I e Maternal II (2 páginas cada)\nExemplos preenchidos das três turmas\nCarta à família (modelo e exemplo) · Relatório da turma · Mini-história', options: { color: 'FFFFFF', fontSize: 10.5 } },
    ], { x: M + 0.35, y: y + 0.1, w: CW - 0.7, h: 2.0, valign: 'middle', lineSpacingMultiple: 1.2 });
  }

  // ---- Modelos em branco ----
  const turmas = [
    { cor: 'coral', turma: 'Berçário', faixa: 'Bebês (EI01)', f: 'EI01' },
    { cor: 'mint', turma: 'Maternal I', faixa: 'Crianças bem pequenas (EI02)', f: 'EI02' },
    { cor: 'sky', turma: 'Maternal II', faixa: 'Crianças bem pequenas (EI02)', f: 'EI02' },
  ];
  for (const t of turmas) {
    const section = `Modelo · ${t.turma}`;
    pres.addSection({ title: section });
    await reportPages(pres, { ...t, blocos: GUIAS[t.f], exemplo: false, section });
  }

  // ---- Exemplos preenchidos ----
  const corPor = { bercario: 'coral', maternal1: 'mint', maternal2: 'sky' };
  const faixaPor = { bercario: 'Bebês (EI01)', maternal1: 'Crianças bem pequenas (EI02)', maternal2: 'Crianças bem pequenas (EI02)' };
  for (const ex of EXEMPLOS) {
    const section = `Exemplo · ${ex.turma}`;
    pres.addSection({ title: section });
    await reportPages(pres, { cor: corPor[ex.id], turma: ex.turma, faixa: faixaPor[ex.id], crianca: ex.crianca, idade: ex.idade, periodo: ex.periodo, blocos: ex.blocos.map((b) => b.texto), exemplo: true, section });
  }

  // ---- Carta à família (modelo + exemplo) ----
  pres.addSection({ title: 'Carta à família' });
  for (const exemplo of [false, true]) {
    const s = pres.addSlide({ sectionTitle: 'Carta à família' });
    s.background = { color: C.coralT };
    card(s, pres, { x: M, y: 0.55, w: CW, h: H - 1.1, fill: 'FFFFFF', shadow: true });
    dots(s, pres, W - M - 1.7, 0.85, 1.0);
    text(s, 'CARTA À FAMÍLIA', { x: M + 0.45, y: 0.95, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.coral, charSpacing: 2 });
    const nome = exemplo ? CARTA_FAMILIA.crianca : '[Nome]';
    text(s, exemplo ? CARTA_FAMILIA.saudacao : 'Querida família de [Nome],', { x: M + 0.45, y: 1.25, w: CW - 2.5, h: 0.75, fontSize: 24, fontFace: FONT_HEAD, bold: true, color: exemplo ? C.ink : 'A9A4BF' });
    await photoSlot(s, pres, { x: M + 0.45, y: 2.25, w: CW - 0.9, h: 2.9, round: false, label: `Foto de ${nome} em um momento marcante do semestre` });
    const paras = exemplo ? CARTA_FAMILIA.paragrafos : GUIAS.carta;
    text(s, paras.map((p, i) => ({ text: p, options: { breakLine: i < paras.length - 1, paraSpaceAfter: 10 } })), { x: M + 0.45, y: 5.45, w: CW - 0.9, h: 4.3, fontSize: 12.5, color: exemplo ? C.ink : C.ink2, italic: !exemplo, lineSpacingMultiple: 1.1 });
    text(s, exemplo ? CARTA_FAMILIA.assinatura : 'Com carinho, equipe da turma [nome da turma]', { x: M + 0.45, y: 9.85, w: CW - 0.9, h: 0.4, fontSize: 13, fontFace: FONT_HEAD, bold: true, color: C.coral });
  }

  // ---- Relatório da turma ----
  pres.addSection({ title: 'Relatório da turma' });
  {
    const s = pres.addSlide({ sectionTitle: 'Relatório da turma' });
    s.background = { color: C.paper };
    card(s, pres, { x: M, y: 0.5, w: CW, h: 1.45, fill: C.mintT });
    await iconCircle(s, pres, { x: M + 0.3, y: 0.75, d: 0.95, fill: C.mint, name: 'PiUsers' });
    text(s, 'RELATÓRIO COLETIVO · EXEMPLO', { x: M + 1.5, y: 0.75, w: CW - 1.8, h: 0.25, fontSize: 9, bold: true, color: C.mint, charSpacing: 2 });
    text(s, `${TURMA.titulo}: ${TURMA.turma}`, { x: M + 1.5, y: 1.02, w: CW - 1.8, h: 0.6, fontSize: 22, fontFace: FONT_HEAD, bold: true });
    const pw = (CW - 0.4) / 3;
    for (let k = 0; k < 3; k++) await photoSlot(s, pres, { x: M + k * (pw + 0.2), y: 2.2, w: pw, h: 1.7, round: false, label: 'Foto da turma' });
    text(s, TURMA.paragrafos.map((p, i) => ({ text: p, options: { breakLine: i < TURMA.paragrafos.length - 1, paraSpaceAfter: 11 } })), { x: M, y: 4.2, w: CW, h: 6.6, fontSize: 11.5, lineSpacingMultiple: 1.15 });
    smallFooter(s, 'Relatório da turma · substitua pelo percurso do seu grupo');
  }

  // ---- Mini-história ----
  pres.addSection({ title: 'Mini-história' });
  {
    const s = pres.addSlide({ sectionTitle: 'Mini-história' });
    s.background = { color: C.sunT };
    card(s, pres, { x: M, y: 0.55, w: CW, h: H - 1.1, fill: 'FFFFFF', shadow: true });
    text(s, 'MINI-HISTÓRIA · EXEMPLO', { x: M + 0.45, y: 0.95, w: 5, h: 0.25, fontSize: 9, bold: true, color: C.sun, charSpacing: 2 });
    text(s, 'A pesquisadora da água', { x: M + 0.45, y: 1.22, w: CW - 0.9, h: 0.7, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    text(s, 'Helena · Berçário II · 18 de setembro', { x: M + 0.45, y: 1.9, w: CW - 0.9, h: 0.3, fontSize: 10, color: C.ink2 });
    await photoSlot(s, pres, { x: M + 0.45, y: 2.45, w: CW - 0.9, h: 3.1, round: false, label: 'Foto 1: a cena principal' });
    const pw = (CW - 0.9 - 0.2) / 2;
    await photoSlot(s, pres, { x: M + 0.45, y: 5.75, w: pw, h: 1.9, round: false, label: 'Foto 2' });
    await photoSlot(s, pres, { x: M + 0.65 + pw, y: 5.75, w: pw, h: 1.9, round: false, label: 'Foto 3' });
    text(s, 'Na bacia de água morna, Helena descobriu um copo. Encheu, virou, encheu de novo. Observou a água escorrer pelos dedos e riu. Repetiu o gesto muitas vezes, cada vez mais devagar, como quem confere se a água sempre cai do mesmo jeito. Quando a colega Bia chegou perto, Helena estendeu o copo cheio e esperou. Bia virou a água e as duas riram juntas.', { x: M + 0.45, y: 7.9, w: CW - 0.9, h: 1.7, fontSize: 11, lineSpacingMultiple: 1.12 });
    card(s, pres, { x: M + 0.45, y: 9.7, w: CW - 0.9, h: 0.75, fill: C.sunT, radius: 0.12 });
    text(s, [{ text: 'O que essa cena revela: ', options: { bold: true } }, { text: 'investigação de causa e efeito (EI01ET02) e interação com colegas a partir da exploração (EI01EO03).' }], { x: M + 0.65, y: 9.7, w: CW - 1.3, h: 0.75, fontSize: 9.5, valign: 'middle' });
  }

  pres.addSection({ title: 'Encerramento' });
  D.closingPage(pres, 'Encerramento', require('./content/fontes').ENCERRAMENTOS.modelos);

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile);
}

main(process.argv[2] || '../02 - Modelos de Relatorio Editaveis.pptx').catch((e) => { console.error(e); process.exit(1); });
