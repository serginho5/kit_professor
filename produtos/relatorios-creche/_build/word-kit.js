// Peças compartilhadas para as versões ALTERNATIVAS em Word (o caminho recomendado é sempre o Canva).
const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  AlignmentType, VerticalAlign, HeightRule, PageBreak, Footer, PageNumber, PageOrientation,
} = require('docx');

const INK = '2D2A4A', INK2 = '5E5A7A', MIST = 'F6F4FA', LINE = 'E6E2EF', GRAY = 'A9A4BF';
const K = { coral: ['EF6F57', 'FDE7E2'], mint: ['2FA587', 'DCF2EB'], sun: ['C98A0F', 'FCF0D4'], sky: ['3F86D6', 'DFEBF9'], lilac: ['8A67C9', 'EEE7F8'] };
const MARGIN = 1020;
const A4W = 11906, A4H = 16838;
let PW = A4W - 2 * MARGIN; // largura útil; muda para paisagem com setLandscape()
const setLandscape = (on) => { PW = (on ? A4H : A4W) - 2 * MARGIN; };
const pw = () => PW;

const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noB = { top: NONE, bottom: NONE, left: NONE, right: NONE };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const gridB = { top: thin, bottom: thin, left: thin, right: thin };
const dashed = { style: BorderStyle.DASHED, size: 8, color: 'CFC9E0' };
const dashB = { top: dashed, bottom: dashed, left: dashed, right: dashed };

const run = (text, o = {}) => new TextRun({ text, font: o.head ? 'Fredoka' : 'Nunito', size: Math.round((o.pt || 10.5) * 2), bold: o.bold, italics: o.italic, color: o.color || INK, characterSpacing: o.sp, strike: o.strike });
const para = (runs, o = {}) => new Paragraph({ alignment: o.align, keepNext: o.keepNext, spacing: { before: o.before || 0, after: o.after ?? 80, line: o.line || 280 }, children: Array.isArray(runs) ? runs : [runs] });
const gap = (pt = 6) => new Paragraph({ spacing: { before: 0, after: 0, line: Math.round(pt * 20), lineRule: 'exact' }, children: [] });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

function cell(children, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: { top: o.pad ?? 120, bottom: o.pad ?? 120, left: o.padX ?? 160, right: o.padX ?? 160 },
    verticalAlign: o.valign || VerticalAlign.TOP, borders: o.borders || noB, columnSpan: o.span, children,
  });
}
const row = (cells, o = {}) => new TableRow({ cantSplit: true, height: o.h ? { value: o.h, rule: o.exact ? HeightRule.EXACT : HeightRule.ATLEAST } : undefined, children: cells });
const table = (cols, rows) => new Table({ width: { size: cols.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: cols, rows });
const box = (children, o = {}) => table([PW], [row([cell(children, PW, o)], { h: o.h })]);
const spacer = (w) => cell([para(run(''), { after: 0 })], w);

// Espaço tracejado para foto (no Word: Inserir > Imagem dentro da célula)
function photo(label, w, h) {
  return table([w], [row([cell([para(run('FOTO', { bold: true, pt: 9, color: GRAY, sp: 40 }), { align: AlignmentType.CENTER, after: 30 }), para(run(label, { pt: 8.5, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], w, { fill: 'FFFFFF', valign: VerticalAlign.CENTER, borders: dashB })], { h, exact: true })]);
}
function photoCell(label, w) {
  return cell([para(run('FOTO', { bold: true, pt: 9, color: GRAY, sp: 40 }), { align: AlignmentType.CENTER, after: 30 }), para(run(label, { pt: 8.5, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], w, { fill: 'FFFFFF', valign: VerticalAlign.CENTER, borders: dashB });
}
// Linha de N fotos lado a lado
function photoRow(labels, h) {
  const g = 200, w = Math.floor((PW - g * (labels.length - 1)) / labels.length), cols = [], cells = [];
  labels.forEach((l, i) => { if (i) { cols.push(g); cells.push(spacer(g)); } cols.push(w); cells.push(photoCell(l, w)); });
  return table(cols, [row(cells, { h, exact: true })]);
}

// Aviso "Canva recomendado"
function avisoCanva(nomeArquivoCanva) {
  return box([
    para(run('RECOMENDADO: EDITE NO CANVA', { bold: true, pt: 9, color: K.sun[0], sp: 40 }), { after: 80 }),
    para(run('Esta é a versão alternativa para Word e Google Docs.', { head: true, bold: true, pt: 15 }), { after: 100 }),
    para([run('Ela é prática para escrever, mas não reproduz o acabamento visual do material: composição das páginas, círculos, cores e molduras de foto. Para entregar às famílias e guardar, use o arquivo '), run(nomeArquivoCanva, { bold: true }), run(' no Canva e baixe em PDF.')], { line: 300, after: 100 }),
    para(run('Como abrir no Canva: "Criar design" > "Importar arquivo" > escolha o .pptx.', { pt: 9.5, color: INK2, italic: true }), { after: 0 }),
  ], { fill: K.sun[1], pad: 260, padX: 300 });
}

function capa(marca, titulo, sub, nomeCanva, itens) {
  return [
    para(run(marca.toUpperCase(), { bold: true, pt: 10, color: K.coral[0], sp: 60 }), { before: 500, after: 120 }),
    para(run(titulo, { head: true, bold: true, pt: 30 }), { after: 160, line: 400 }),
    para(run(sub, { pt: 12, color: INK2 }), { after: 320, line: 300 }),
    avisoCanva(nomeCanva),
    gap(18),
    para(run('Neste arquivo', { head: true, bold: true, pt: 14 }), { after: 120 }),
    ...itens.map((t) => para([run('•  ', { bold: true, color: K.coral[0] }), run(t)], { after: 60 })),
    gap(12),
    para(run('Fontes: Fredoka (títulos) e Nunito (textos), gratuitas no Google Docs e em fonts.google.com. Sem elas, o Word usa uma fonte parecida.', { pt: 8.5, color: INK2, italic: true }), { after: 0 }),
  ];
}

// Cabeçalho de página: rótulo + título
function header(kicker, titulo, cor = 'coral') {
  return [
    pageBreak(),
    para(run(kicker.toUpperCase(), { bold: true, pt: 9, color: K[cor][0], sp: 40 }), { after: 40 }),
    para(run(titulo, { head: true, bold: true, pt: 22 }), { after: 160, line: 320 }),
  ];
}

// Encerramento escuro com fontes consultadas
function encerramento(e) {
  return [
    pageBreak(),
    table([PW], [row([cell([
      para(run('PARA ENCERRAR', { bold: true, pt: 10, color: 'E9A21F', sp: 60 }), { before: 300, after: 160 }),
      para(run(e.titulo, { head: true, bold: true, pt: 22, color: 'FFFFFF' }), { after: 200, line: 340 }),
      para(run(e.texto, { pt: 12, color: 'E9E6F5' }), { after: 400, line: 320 }),
      para(run('FONTES CONSULTADAS NA ELABORAÇÃO DESTE MATERIAL', { bold: true, pt: 8.5, color: 'E9A21F', sp: 30 }), { after: 120 }),
      ...e.fontes.map((f) => para(run(f, { pt: 9, color: 'E9E6F5' }), { after: 70 })),
      para(run(e.nota, { pt: 8.5, italic: true, color: 'B9B4D3' }), { before: 160, after: 300 }),
      para(run(`${e.marca || 'Kit Relatórios da Creche'} · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.`, { pt: 8, color: 'B9B4D3' }), { after: 0 }),
    ], PW, { fill: INK, pad: 460, padX: 460 })])]),
  ];
}

// Campos de preenchimento (rótulo + linha)
function campos(labels) {
  const g = 200, w = Math.floor((PW - g * (labels.length - 1)) / labels.length);
  const bottom = { style: BorderStyle.SINGLE, size: 6, color: 'B9B4D3' };
  const cols = [], cells = [];
  labels.forEach((l, i) => {
    if (i) { cols.push(g); cells.push(spacer(g)); }
    cols.push(w); cells.push(cell([para(run(l, { pt: 7.5, bold: true, color: INK2, sp: 20 }), { after: 220 })], w, { borders: { top: NONE, left: NONE, right: NONE, bottom }, pad: 40, padX: 0 }));
  });
  return [table(cols, [row(cells)]), gap(14)];
}
// Linhas pautadas dentro de um bloco colorido
function pautado(titulo, n, cor = 'mint', h) {
  const white = { style: BorderStyle.SINGLE, size: 6, color: 'FFFFFF' };
  return table([PW], [
    row([cell([para(run(titulo, { head: true, bold: true, pt: 12 }), { after: 0 })], PW, { fill: K[cor][1], pad: 140, padX: 220 })]),
    ...Array.from({ length: n }, () => row([cell([para(run(''), { after: 0 })], PW, { fill: K[cor][1], borders: { top: NONE, left: NONE, right: NONE, bottom: white }, pad: 0, padX: 220 })], { h: h || 420, exact: true })),
  ]);
}
// Grade tipo planilha
function grade(cols, labels, cor, nLinhas, rowH, preenche = () => []) {
  const head = row(labels.map((l, i) => cell([para(run(l, { pt: 8.5, bold: true, color: 'FFFFFF' }), { after: 0 })], cols[i], { fill: K[cor][0], borders: gridB, pad: 80, padX: 100, valign: VerticalAlign.CENTER })));
  const rows = Array.from({ length: nLinhas }, (_, r) => row(cols.map((w, i) => cell([para(run(preenche(r)[i] || '', { pt: 9 }), { after: 0 })], w, { fill: r % 2 === 0 ? MIST : 'FFFFFF', borders: gridB, pad: 50, padX: 100, valign: VerticalAlign.CENTER })), { h: rowH, exact: true }));
  return table(cols, [head, ...rows]);
}

function doc(children, footerLabel, { landscape = false } = {}) {
  return new Document({
    creator: 'Kit Relatórios da Creche',
    styles: { default: { document: { run: { font: 'Nunito', size: 21, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: A4W, height: A4H, orientation: landscape ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, footer: 500 } } },
      footers: { default: new Footer({ children: [para([run(`${footerLabel}  ·  `, { pt: 8, color: INK2 }), new TextRun({ children: [PageNumber.CURRENT], font: 'Nunito', size: 16, color: INK2, bold: true })], { align: AlignmentType.RIGHT, after: 0 })] }) },
      children,
    }],
  });
}

module.exports = { INK, INK2, MIST, GRAY, K, run, para, gap, pageBreak, cell, row, table, box, spacer, photo, photoCell, photoRow, avisoCanva, capa, header, encerramento, campos, pautado, grade, doc, setLandscape, pw, VerticalAlign, AlignmentType, BorderStyle };
