// Versões ALTERNATIVAS em Word (.docx) dos modelos de relatório e das fichas.
// O caminho recomendado continua sendo o Canva (.pptx); estes arquivos são o plano B para quem só usa Word/Google Docs.
// Uso: node build-word.js  → gera "Word (alternativo)/02 - ... .docx" e "03 - ... .docx"
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  AlignmentType, VerticalAlign, HeightRule, PageBreak, Footer, PageNumber,
} = require('docx');
const { EXEMPLOS, CARTA_FAMILIA, TURMA } = require('./content/exemplos');
const { ENCERRAMENTOS } = require('./content/fontes');

const INK = '2D2A4A', INK2 = '5E5A7A', MIST = 'F6F4FA', LINE = 'E6E2EF', GRAY = 'A9A4BF';
const K = { coral: ['EF6F57', 'FDE7E2'], mint: ['2FA587', 'DCF2EB'], sun: ['C98A0F', 'FCF0D4'], sky: ['3F86D6', 'DFEBF9'], lilac: ['8A67C9', 'EEE7F8'] };
const MARGIN = 1020; // 1,8 cm
const PW = 11906 - 2 * MARGIN; // largura útil (DXA)

// ---------- helpers ----------
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: NONE, bottom: NONE, left: NONE, right: NONE };
const run = (text, o = {}) => new TextRun({ text, font: o.head ? 'Fredoka' : 'Nunito', size: Math.round((o.pt || 10.5) * 2), bold: o.bold, italics: o.italic, color: o.color || INK, characterSpacing: o.spacing });
const para = (runs, o = {}) => new Paragraph({ alignment: o.align, spacing: { before: o.before || 0, after: o.after ?? 80, line: o.line || 276 }, keepNext: o.keepNext, children: Array.isArray(runs) ? runs : [runs] });
const gap = (pt = 6) => new Paragraph({ spacing: { before: 0, after: 0, line: Math.round(pt * 20), lineRule: 'exact' }, children: [] });

function cell(children, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: { top: o.pad ?? 120, bottom: o.pad ?? 120, left: o.padX ?? 160, right: o.padX ?? 160 },
    verticalAlign: o.valign || VerticalAlign.TOP,
    borders: o.borders || noBorders,
    columnSpan: o.span,
    children,
  });
}
function table(cols, rows, o = {}) {
  return new Table({ width: { size: cols.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: cols, rows, borders: o.borders });
}
function row(cells, o = {}) {
  return new TableRow({ cantSplit: true, height: o.h ? { value: o.h, rule: o.exact ? HeightRule.EXACT : HeightRule.ATLEAST } : undefined, children: cells });
}
const box = (children, o = {}) => table([PW], [row([cell(children, PW, o)], { h: o.h })]);
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// Aviso "Canva recomendado" (primeira página de cada arquivo Word)
function avisoCanva(nomeArquivoCanva) {
  return box([
    para(run('RECOMENDADO: EDITE NO CANVA', { bold: true, pt: 9, color: K.sun[0], spacing: 40 }), { after: 80 }),
    para(run('Esta é a versão alternativa para Word e Google Docs.', { head: true, bold: true, pt: 15 }), { after: 100 }),
    para([run('Ela é prática para escrever, mas não reproduz o acabamento visual do kit: composição das páginas, círculos, cores e espaços para foto. Para o relatório que vai para as famílias e para o arquivo da escola, use o arquivo '), run(nomeArquivoCanva, { bold: true }), run(' no Canva e baixe em PDF.')], { line: 300, after: 100 }),
    para(run('Como abrir no Canva: "Criar design" > "Importar arquivo" > escolha o .pptx.', { pt: 9.5, color: INK2, italic: true }), { after: 0 }),
  ], { fill: K.sun[1], pad: 260, padX: 300 });
}

function capa(titulo, sub, nomeCanva, itens) {
  return [
    para(run('KIT RELATÓRIOS DA CRECHE', { bold: true, pt: 10, color: K.coral[0], spacing: 60 }), { before: 600, after: 120 }),
    para(run(titulo, { head: true, bold: true, pt: 32 }), { after: 120, line: 300 }),
    para(run(sub, { pt: 12, color: INK2 }), { after: 360, line: 300 }),
    avisoCanva(nomeCanva),
    gap(18),
    para(run('Neste arquivo', { head: true, bold: true, pt: 14 }), { after: 120 }),
    ...itens.map((t) => para([run('•  ', { bold: true, color: K.coral[0] }), run(t)], { after: 60 })),
    gap(12),
    para(run('Fontes: o kit usa Fredoka (títulos) e Nunito (textos), gratuitas no Google Docs e em fonts.google.com. Sem elas, o Word usa uma fonte parecida.', { pt: 8.5, color: INK2, italic: true }), { after: 0 }),
  ];
}

// Página de encerramento escura com fontes consultadas
function encerramento(key) {
  const e = ENCERRAMENTOS[key];
  return [
    pageBreak(),
    table([PW], [row([cell([
      para(run('PARA ENCERRAR', { bold: true, pt: 10, color: 'E9A21F', spacing: 60 }), { before: 400, after: 160 }),
      para(run(e.titulo, { head: true, bold: true, pt: 24, color: 'FFFFFF' }), { after: 200, line: 320 }),
      para(run(e.texto, { pt: 12, color: 'E9E6F5' }), { after: 500, line: 320 }),
      para(run('FONTES CONSULTADAS NA ELABORAÇÃO DESTE MATERIAL', { bold: true, pt: 8.5, color: 'E9A21F', spacing: 30 }), { after: 120 }),
      ...e.fontes.map((f) => para(run(f, { pt: 9, color: 'E9E6F5' }), { after: 70 })),
      para(run(e.nota, { pt: 8.5, italic: true, color: 'B9B4D3' }), { before: 160, after: 400 }),
      para(run('Kit Relatórios da Creche · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.', { pt: 8, color: 'B9B4D3' }), { after: 0 }),
    ], PW, { fill: INK, pad: 500, padX: 500 })], { h: 14400 })]),
  ];
}

function doc(children, footerLabel) {
  return new Document({
    creator: 'Kit Relatórios da Creche',
    styles: { default: { document: { run: { font: 'Nunito', size: 21, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, footer: 500 } } },
      footers: { default: new Footer({ children: [para([run(`${footerLabel}  ·  `, { pt: 8, color: INK2 }), new TextRun({ children: [PageNumber.CURRENT], font: 'Nunito', size: 16, color: INK2, bold: true })], { align: AlignmentType.RIGHT, after: 0 })] }) },
      children,
    }],
  });
}

// =====================================================================
// MODELOS DE RELATÓRIO
// =====================================================================
const TITULOS = ['Chegada e vínculos', 'Relações e convivência', 'Corpo, movimento e cuidados', 'Linguagens e expressão', 'Explorações e descobertas', 'Conquistas e próximos passos'];
const BCOR = ['coral', 'coral', 'mint', 'sky', 'lilac', 'sun'];
const GUIAS = require('./content/guias');

function cabecalho(cfg) {
  const [c, t] = K[cfg.cor];
  const ph = !cfg.crianca;
  const W1 = 2300, W2 = PW - W1 - 200;
  const campos = [['TURMA', cfg.turma], ['IDADE', cfg.idade || '___ anos e ___ meses'], ['PERÍODO', cfg.periodo || '___ semestre / ____'], ['INSTITUIÇÃO', 'Nome da escola / CMEI'], ['PROFESSORA', 'Nome da professora'], ['FAIXA BNCC', cfg.faixa]];
  const fw = Math.floor((W2 - 320) / 3);
  const grade = table([fw, fw, fw], [0, 1].map((r) => row([0, 1, 2].map((k) => {
    const [l, v] = campos[r * 3 + k];
    return cell([para(run(l, { pt: 7, bold: true, color: INK2, spacing: 20 }), { after: 20 }), para(run(v, { pt: 9.5 }), { after: 0 })], fw, { pad: 60, padX: 0 });
  }))));
  const dashed = { style: BorderStyle.DASHED, size: 8, color: 'CFC9E0' };
  return table([W1, 200, W2], [row([
    cell([para(run('FOTO', { bold: true, pt: 10, color: GRAY, spacing: 40 }), { align: AlignmentType.CENTER, after: 40 }), para(run('Clique aqui e insira a foto da criança', { pt: 8, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], W1, { fill: 'FFFFFF', valign: VerticalAlign.CENTER, borders: { top: dashed, bottom: dashed, left: dashed, right: dashed } }),
    cell([para(run(''), { after: 0 })], 200),
    cell([
      para(run('RELATÓRIO DESCRITIVO INDIVIDUAL', { bold: true, pt: 8, color: c, spacing: 30 }), { after: 40 }),
      para(run(cfg.crianca || 'Nome da criança', { head: true, bold: true, pt: 24, color: ph ? GRAY : INK }), { after: 100, line: 240 }),
      grade,
    ], W2, { fill: t, pad: 200, padX: 240 }),
  ], { h: 2600 })]);
}

function bloco(i, texto, placeholder) {
  const c = K[BCOR[i]][0];
  const titulo = table([520, PW - 520], [row([
    cell([para(run(String(i + 1), { head: true, bold: true, pt: 13, color: 'FFFFFF' }), { align: AlignmentType.CENTER, after: 0 })], 520, { fill: c, valign: VerticalAlign.CENTER, pad: 40, padX: 0 }),
    cell([para(run(TITULOS[i], { head: true, bold: true, pt: 14 }), { after: 0 })], PW - 520, { valign: VerticalAlign.CENTER, pad: 40 }),
  ])]);
  const corpo = placeholder
    ? box([para(run(texto, { italic: true, color: INK2, pt: 10 }), { line: 290, after: 0 })], { fill: MIST, pad: 160, padX: 220, h: 2050 })
    : box([para(run(texto), { line: 300, after: 0 })], { pad: 100, padX: 120 });
  return [titulo, gap(5), corpo, gap(12)];
}

function assinaturas() {
  const w = Math.floor((PW - 400) / 3);
  const top = { style: BorderStyle.SINGLE, size: 6, color: INK2 };
  const c = (t) => cell([para(run(t, { pt: 8.5, color: INK2 }), { align: AlignmentType.CENTER, after: 0 })], w, { borders: { top, bottom: NONE, left: NONE, right: NONE }, pad: 60 });
  const sp = () => cell([para(run(''), { after: 0 })], 200);
  return [
    para(run('Local e data: ________________________________________', { color: INK2, pt: 10 }), { before: 200, after: 600 }),
    table([w, 200, w, 200, w], [row([c('Professora'), sp(), c('Coordenação pedagógica'), sp(), c('Responsável pela criança')])]),
  ];
}

function relatorio(cfg, blocos, placeholder) {
  const [c, t] = K[cfg.cor];
  return [
    pageBreak(),
    cabecalho(cfg),
    para(run('Este relatório apresenta o percurso da criança no semestre, a partir da observação e do registro cotidiano das interações e brincadeiras, conforme a LDB (art. 31), as DCNEI e a BNCC.', { pt: 8, italic: true, color: INK2 }), { before: 120, after: 200 }),
    ...[0, 1, 2].flatMap((i) => bloco(i, blocos[i], placeholder)),
    pageBreak(),
    table([PW], [row([cell([para([run(cfg.crianca || 'Nome da criança', { head: true, bold: true, pt: 13, color: cfg.crianca ? INK : GRAY }), run(`     ${cfg.turma} · ${cfg.periodo || 'semestre'}`, { pt: 9, color: INK2 })], { after: 0 })], PW, { fill: t, pad: 120, padX: 240 })])]),
    gap(14),
    ...[3, 4, 5].flatMap((i) => bloco(i, blocos[i], placeholder)),
    ...assinaturas(),
  ];
}

function cartaFamilia(exemplo) {
  const nome = exemplo ? CARTA_FAMILIA.crianca : '[Nome]';
  const paras = exemplo ? CARTA_FAMILIA.paragrafos : GUIAS.carta;
  const dashed = { style: BorderStyle.DASHED, size: 8, color: 'CFC9E0' };
  return [
    pageBreak(),
    table([PW], [row([cell([
      para(run('CARTA À FAMÍLIA', { bold: true, pt: 9, color: K.coral[0], spacing: 40 }), { after: 80 }),
      para(run(exemplo ? CARTA_FAMILIA.saudacao : 'Querida família de [Nome],', { head: true, bold: true, pt: 22, color: exemplo ? INK : GRAY }), { after: 200 }),
      table([PW - 640], [row([cell([para(run(`Foto de ${nome} em um momento marcante do semestre`, { pt: 9, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], PW - 640, { fill: 'FFFFFF', valign: VerticalAlign.CENTER, borders: { top: dashed, bottom: dashed, left: dashed, right: dashed } })], { h: 3600 })]),
      gap(14),
      ...paras.map((p) => para(run(p, { pt: 11.5, italic: !exemplo, color: exemplo ? INK : INK2 }), { line: 320, after: 160 })),
      para(run(exemplo ? CARTA_FAMILIA.assinatura : 'Com carinho, equipe da turma [nome da turma]', { head: true, bold: true, pt: 13, color: K.coral[0] }), { before: 200, after: 0 }),
    ], PW, { fill: K.coral[1], pad: 360, padX: 320 })], { h: 14200 })]),
  ];
}

function relatorioTurma() {
  const dashed = { style: BorderStyle.DASHED, size: 8, color: 'CFC9E0' };
  const w = Math.floor((PW - 400) / 3);
  const foto = () => cell([para(run('Foto da turma', { pt: 9, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], w, { fill: 'FFFFFF', valign: VerticalAlign.CENTER, borders: { top: dashed, bottom: dashed, left: dashed, right: dashed } });
  const sp = () => cell([para(run(''), { after: 0 })], 200);
  return [
    pageBreak(),
    box([para(run('RELATÓRIO COLETIVO · EXEMPLO', { bold: true, pt: 9, color: K.mint[0], spacing: 40 }), { after: 60 }), para(run(`${TURMA.titulo}: ${TURMA.turma}`, { head: true, bold: true, pt: 20 }), { after: 0 })], { fill: K.mint[1], pad: 220, padX: 300 }),
    gap(14),
    table([w, 200, w, 200, w], [row([foto(), sp(), foto(), sp(), foto()], { h: 2200 })]),
    gap(14),
    ...TURMA.paragrafos.map((p) => para(run(p, { pt: 11 }), { line: 310, after: 160 })),
  ];
}

function buildModelos() {
  const turmas = [
    { cor: 'coral', turma: 'Berçário', faixa: 'Bebês (EI01)', f: 'EI01' },
    { cor: 'mint', turma: 'Maternal I', faixa: 'Crianças bem pequenas (EI02)', f: 'EI02' },
    { cor: 'sky', turma: 'Maternal II', faixa: 'Crianças bem pequenas (EI02)', f: 'EI02' },
  ];
  const cor = { bercario: 'coral', maternal1: 'mint', maternal2: 'sky' };
  const faixa = { bercario: 'Bebês (EI01)', maternal1: 'Crianças bem pequenas (EI02)', maternal2: 'Crianças bem pequenas (EI02)' };
  const children = [
    ...capa('Modelos de relatório', 'Versão Word e Google Docs dos modelos editáveis: Berçário, Maternal I e Maternal II, exemplos preenchidos, carta à família e relatório da turma.', '02 - Modelos de Relatorio Editaveis.pptx', [
      'Modelos em branco com orientações: Berçário, Maternal I e Maternal II (2 páginas cada)',
      'Exemplos preenchidos das três turmas (Helena, Davi e Ana Luísa, crianças fictícias)',
      'Carta à família (modelo e exemplo) e relatório da turma',
      'Para usar: apague o texto em cinza de cada bloco e escreva por cima. Clique na caixa "FOTO" e use Inserir > Imagem.',
    ]),
    ...turmas.flatMap((t) => relatorio(t, GUIAS[t.f], true)),
    ...EXEMPLOS.flatMap((ex) => relatorio({ cor: cor[ex.id], turma: ex.turma, faixa: faixa[ex.id], crianca: ex.crianca, idade: ex.idade, periodo: ex.periodo }, ex.blocos.map((b) => b.texto), false)),
    ...cartaFamilia(false),
    ...cartaFamilia(true),
    ...relatorioTurma(),
    ...encerramento('modelos'),
  ];
  return doc(children, 'Kit Relatórios da Creche · Modelos de relatório (versão Word)');
}

// =====================================================================
// FICHAS DE OBSERVAÇÃO
// =====================================================================
function fichaHeader(n, titulo, sub, cor) {
  const [c, t] = K[cor];
  return [
    pageBreak(),
    table([1300, PW - 1300], [row([
      cell([para(run('FICHA', { bold: true, pt: 8, color: 'FFFFFF', spacing: 40 }), { align: AlignmentType.CENTER, after: 0 }), para(run(String(n), { head: true, bold: true, pt: 28, color: 'FFFFFF' }), { align: AlignmentType.CENTER, after: 0, line: 240 })], 1300, { fill: c, valign: VerticalAlign.CENTER }),
      cell([para(run(titulo, { head: true, bold: true, pt: 18 }), { after: 60 }), para(run(sub, { pt: 9.5, color: INK2 }), { after: 0, line: 270 })], PW - 1300, { fill: t, valign: VerticalAlign.CENTER, pad: 160, padX: 260 }),
    ])]),
    gap(12),
  ];
}
function campos(labels) {
  const w = Math.floor((PW - 200 * (labels.length - 1)) / labels.length);
  const bottom = { style: BorderStyle.SINGLE, size: 6, color: 'B9B4D3' };
  const cells = [];
  labels.forEach((l, i) => {
    if (i) cells.push(cell([para(run(''), { after: 0 })], 200));
    cells.push(cell([para(run(l, { pt: 7.5, bold: true, color: INK2, spacing: 20 }), { after: 220 })], w, { borders: { top: NONE, left: NONE, right: NONE, bottom }, pad: 40, padX: 0 }));
  });
  return [table(labels.flatMap((_, i) => (i ? [200, w] : [w])), [row(cells)]), gap(14)];
}
const grid = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const gb = { top: grid, bottom: grid, left: grid, right: grid };
function head(cols, labels, cor) {
  return row(labels.map((l, i) => cell([para(run(l, { pt: 8.5, bold: true, color: 'FFFFFF' }), { after: 0 })], cols[i], { fill: K[cor][0], borders: gb, pad: 80, padX: 100, valign: VerticalAlign.CENTER })));
}
function linhas(cols, n, h, preenche = () => [], zebra = true) {
  return Array.from({ length: n }, (_, r) => row(cols.map((w, i) => {
    const v = preenche(r)[i];
    const ps = Array.isArray(v) ? v.map((t) => para(run(t, { pt: 9 }), { after: 20 })) : [para(run(v || '', { pt: 9 }), { after: 0 })];
    return cell(ps, w, { fill: zebra && r % 2 === 0 ? MIST : 'FFFFFF', borders: gb, pad: 60, padX: 100, valign: VerticalAlign.CENTER });
  }), { h, exact: true }));
}

function buildFichas() {
  const ch = [
    ...capa('Fichas de observação e registro', 'Versão Word e Google Docs das sete fichas do kit, para imprimir ou preencher no computador.', '03 - Fichas de Observacao.pptx', [
      'Ficha 1 · Registro diário das crianças-foco', 'Ficha 2 · Rodízio semanal da turma', 'Ficha 3 · Ficha individual por campo', 'Ficha 4 · Acompanhamento dos cuidados',
      'Ficha 5 · Conquistas e marcos', 'Ficha 6 · Entrevista de acolhimento da família', 'Ficha 7 · Roteiro para montar o relatório',
    ]),
  ];
  // 1
  ch.push(...fichaHeader(1, 'Registro diário das crianças-foco', 'Escolha 4 ou 5 crianças por dia. Anote uma cena, uma fala e os campos envolvidos. Leva 5 minutos.', 'coral'));
  ch.push(...campos(['DATA', 'TURMA', 'MOMENTO DA ROTINA']));
  { const cols = [2000, 4300, 2366, 1200]; ch.push(table(cols, [head(cols, ['Criança', 'O que aconteceu (cena)', 'Fala da criança', 'Campos'], 'coral'), ...linhas(cols, 5, 2050, () => ['', '', '', ['☐ EO', '☐ CG', '☐ TS', '☐ EF', '☐ ET']])])); }
  // 2
  ch.push(...fichaHeader(2, 'Rodízio semanal da turma', 'Marque o dia em que cada criança foi criança-foco. Ninguém fica sem registro: confira a coluna "Total" no fim da semana.', 'sun'));
  ch.push(...campos(['SEMANA DE', 'TURMA']));
  { const cols = [500, 3366, 1000, 1000, 1000, 1000, 1000, 1000]; ch.push(table(cols, [head(cols, ['#', 'Criança', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Total'], 'sun'), ...linhas(cols, 20, 520, (r) => [String(r + 1)])])); }
  // 3
  ch.push(...fichaHeader(3, 'Ficha individual por campo', 'Uma por criança no semestre. Uma vez por mês, transfira para cá os registros diários. No fim, o relatório nasce desta ficha.', 'mint'));
  ch.push(...campos(['CRIANÇA', 'TURMA', 'SEMESTRE']));
  const nomes = [['EO', 'O eu, o outro e o nós', 'coral'], ['CG', 'Corpo, gestos e movimentos', 'mint'], ['TS', 'Traços, sons, cores e formas', 'sun'], ['EF', 'Escuta, fala, pensamento e imaginação', 'sky'], ['ET', 'Espaços, tempos, quantidades, relações e transformações', 'lilac']];
  for (const [sig, nm, cor] of nomes) {
    const cols = [1100, PW - 1100];
    ch.push(table(cols, [
      row([cell([para(run(`${sig} · ${nm}`, { head: true, bold: true, pt: 11, color: 'FFFFFF' }), { after: 0 })], PW, { fill: K[cor][0], span: 2, borders: gb, pad: 70, padX: 140 })]),
      ...linhas(cols, 3, 430, () => ['___/___'], false).map((r) => r),
    ]));
    ch.push(gap(8));
  }
  // 4
  ch.push(...fichaHeader(4, 'Acompanhamento dos cuidados', 'Alimentação, sono e higiene também são aprendizagem. Registre conquistas de autonomia, não só "comeu" ou "dormiu".', 'sky'));
  ch.push(...campos(['CRIANÇA', 'SEMANA DE']));
  { const cols = [900, 3200, 2000, 2266, 1500]; ch.push(table(cols, [head(cols, ['Dia', 'Alimentação (aceitou, experimentou, autonomia)', 'Sono e descanso', 'Higiene, troca, desfralde', 'Humor'], 'sky'), ...linhas(cols, 5, 1500, (r) => [['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][r], '', '', '', '☺  ☹  ☾'])])); }
  ch.push(gap(14));
  ch.push(box([para(run('CONQUISTAS DE AUTONOMIA DA SEMANA', { pt: 8, bold: true, color: K.sky[0], spacing: 20 }), { after: 0 })], { fill: K.sky[1], h: 2100, pad: 160, padX: 220 }));
  // 5
  ch.push(...fichaHeader(5, 'Conquistas e marcos', 'Anote a data das grandes conquistas. Elas dão vida ao relatório ("deu os primeiros passos em outubro, no pátio").', 'lilac'));
  ch.push(...campos(['CRIANÇA', 'TURMA']));
  { const marcos = ['Sentou sem apoio', 'Engatinhou / arrastou-se', 'Ficou de pé com apoio', 'Primeiros passos sozinho', 'Primeiras palavras', 'Juntou duas palavras', 'Respondeu ao próprio nome', 'Apontou para mostrar ou pedir', 'Comeu sozinho com a colher', 'Bebeu no copo sozinho', 'Pediu para ir ao banheiro', 'Concluiu o desfralde diurno', 'Brincou de faz de conta', 'Contou um fato vivido', 'Desenhou e nomeou o desenho', 'Resolveu um conflito com palavras', '', ''];
    const cols = [4000, 1300, PW - 5300]; ch.push(table(cols, [head(cols, ['Conquista', 'Data', 'Contexto / como foi'], 'lilac'), ...linhas(cols, marcos.length, 540, (r) => [marcos[r]])])); }
  ch.push(para(run('Cada criança tem seu tempo: esta ficha serve para celebrar e registrar, nunca para comparar.', { pt: 8.5, italic: true, color: INK2 }), { before: 100, after: 0 }));
  // 6
  ch.push(...fichaHeader(6, 'Entrevista de acolhimento da família', 'Converse com a família na chegada da criança. Estas informações orientam a adaptação e o primeiro bloco do relatório.', 'coral'));
  ch.push(...campos(['CRIANÇA', 'NASCIMENTO', 'RESPONSÁVEL']));
  { const qs = ['Como a criança é chamada em casa? Tem apelido?', 'Com quem mora? Tem irmãos? Quem cuida dela no dia a dia?', 'Como é o sono? Como adormece (colo, chupeta, paninho, música)?', 'Como é a alimentação? Preferências, recusas, alergias ou restrições?', 'Usa fralda? Já demonstra interesse pelo banheiro?', 'Como se comunica? Que palavras ou gestos usa?', 'O que a acalma quando está triste ou assustada?', 'Do que mais gosta de brincar? Tem um objeto ou brinquedo preferido?', 'Já frequentou outra creche? Como foram as separações até hoje?', 'Há alguma informação de saúde importante para a equipe?', 'O que a família espera da creche neste ano?'];
    const rows = qs.flatMap((q, i) => [
      row([cell([para(run(`${i + 1}. ${q}`, { pt: 9.5, bold: true }), { after: 0 })], PW, { fill: K.coral[1], pad: 60, padX: 140 })]),
      row([cell([para(run(''), { after: 0 })], PW, { borders: { top: NONE, left: NONE, right: NONE, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D9D5E6' } } })], { h: 560, exact: true }),
    ]);
    ch.push(table([PW], rows)); }
  // 7
  ch.push(...fichaHeader(7, 'Roteiro para montar o relatório', 'Antes de escrever, separe as melhores evidências de cada bloco. Depois é só costurar com o Banco de Frases.', 'mint'));
  ch.push(...campos(['CRIANÇA', 'TURMA / SEMESTRE']));
  { const cols = [2300, 3200, 2266, 2100]; const bl = ['1. Chegada e vínculos', '2. Relações e convivência', '3. Corpo, movimento e cuidados', '4. Linguagens e expressão', '5. Explorações e descobertas', '6. Conquistas e próximos passos'];
    ch.push(table(cols, [head(cols, ['Bloco', 'Cena ou fato real (com data)', 'Fala da criança', 'Frase do banco (código)'], 'mint'), ...linhas(cols, 6, 1650, (r) => [bl[r]])])); }
  ch.push(...encerramento('fichas'));
  return doc(ch, 'Kit Relatórios da Creche · Fichas de observação (versão Word)');
}

async function main() {
  const outDir = path.join('..', 'Word (alternativo)');
  fs.mkdirSync(outDir, { recursive: true });
  const a = path.join(outDir, '02 - Modelos de Relatorio (versao Word).docx');
  const b = path.join(outDir, '03 - Fichas de Observacao (versao Word).docx');
  fs.writeFileSync(a, await Packer.toBuffer(buildModelos()));
  fs.writeFileSync(b, await Packer.toBuffer(buildFichas()));
  console.log('ok', a, b);
}
main().catch((e) => { console.error(e); process.exit(1); });
