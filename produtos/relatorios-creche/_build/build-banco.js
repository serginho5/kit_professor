// Gera "04 - Banco de Frases BNCC.docx" (Word / Google Docs), feito para copiar e colar.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, PageBreak, TableOfContents, Footer, PageNumber, LevelFormat,
} = require('docx');
const { CAMPOS, EI01, EI02 } = require('./content/bncc');
const X = require('./content/extras');
const { EXEMPLOS, CARTA_FAMILIA, TURMA } = require('./content/exemplos');

const INK = '2D2A4A', INK2 = '5E5A7A';
const COR = { EO: ['EF6F57', 'FDE7E2'], CG: ['2FA587', 'DCF2EB'], TS: ['C98A0F', 'FCF0D4'], EF: ['3F86D6', 'DFEBF9'], ET: ['8A67C9', 'EEE7F8'] };
const NIVEIS = [
  ['ja', 'Já demonstra', '2FA587', 'DCF2EB'],
  ['dev', 'Em desenvolvimento', 'C98A0F', 'FCF0D4'],
  ['ini', 'Iniciando', 'EF6F57', 'FDE7E2'],
  ['prox', 'Próximo passo da equipe', '3F86D6', 'DFEBF9'],
];
const PAGE_W = 11906 - 2 * 1134; // A4 menos margens de 2 cm (DXA)

const P = (text, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, ...o.p, children: [new TextRun({ text, ...o.r })] });
const H1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 200 }, children: [new TextRun(text)] });
const H2 = (text, color) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 360, after: 140 }, children: [new TextRun({ text, color })] });
const H3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, keepNext: true, spacing: { before: 260, after: 100 }, children: [new TextRun(text)] });
const intro = (text) => P(text, { r: { color: INK2, italics: true } });
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80, line: 290 }, children: [new TextRun(text)] });

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const thin = { style: BorderStyle.SINGLE, size: 4, color: 'E6E2EF' };
function cell(children, width, fill, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 },
    borders: { top: thin, bottom: thin, left: thin, right: thin },
    children, ...opts,
  });
}

// Tabela de um objetivo: rótulo colorido + frase em cada linha.
function objetivoTable(o) {
  const w1 = 2000, w2 = PAGE_W - w1;
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    columnWidths: [w1, w2],
    rows: NIVEIS.map(([k, label, c, t]) => new TableRow({
      cantSplit: true,
      children: [
        cell([new Paragraph({ children: [new TextRun({ text: label, bold: true, color: c, size: 18 })] })], w1, t),
        cell([new Paragraph({ spacing: { line: 280 }, children: [new TextRun({ text: o[k], size: 20, italics: k === 'prox', color: k === 'prox' ? INK2 : INK })] })], w2),
      ],
    })),
  });
}

function faixaSection(titulo, sub, dados, faixaCod) {
  const out = [H1(titulo), intro(sub)];
  for (const sig of ['EO', 'CG', 'TS', 'EF', 'ET']) {
    const [c] = COR[sig];
    out.push(H2(`${sig} · ${CAMPOS[sig].nome}`, c));
    for (const o of dados[sig]) {
      out.push(H3(`${o.cod}`));
      out.push(P(o.texto, { r: { color: INK2, size: 19 }, p: { keepNext: true, spacing: { after: 100 } } }));
      out.push(objetivoTable(o));
    }
  }
  return out;
}

function grupoSection(bloco, comOrientacao = false) {
  const out = [H1(bloco.titulo), intro(bloco.intro)];
  for (const g of bloco.grupos) {
    out.push(H2(g.nome, 'EF6F57'));
    if (comOrientacao && g.orientacao) {
      out.push(new Table({
        width: { size: PAGE_W, type: WidthType.DXA }, columnWidths: [PAGE_W],
        rows: [new TableRow({ children: [cell([new Paragraph({ children: [new TextRun({ text: 'Como escrever: ', bold: true }), new TextRun(g.orientacao)] })], PAGE_W, 'FCF0D4')] })],
      }));
      out.push(P(''));
    }
    for (const f of g.frases) out.push(bullet(f));
  }
  return out;
}

// Página final: despedida + fontes consultadas.
function encerramento() {
  const e = require('./content/fontes').ENCERRAMENTOS.banco;
  return [
    H1('Para encerrar'),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: e.titulo, font: 'Fredoka', bold: true, size: 34, color: INK })] }),
    P(e.texto, { r: { size: 23, color: INK2 } }),
    H2('Fontes consultadas na elaboração deste material', 'EF6F57'),
    ...e.fontes.map((f) => bullet(f)),
    P(e.nota, { r: { italics: true, color: INK2, size: 19 }, p: { spacing: { before: 200 } } }),
    P('Kit Relatórios da Creche · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.', { r: { size: 17, color: INK2 }, p: { spacing: { before: 400 } } }),
  ];
}

function main(outFile) {
  // Contagem honesta de frases para a capa
  const nObj = ['EO', 'CG', 'TS', 'EF', 'ET'].reduce((a, s) => a + EI01[s].length + EI02[s].length, 0);
  const nExtras = [X.ABERTURAS, X.ROTINA, X.DELICADAS, X.FECHAMENTOS].reduce((a, b) => a + b.grupos.reduce((x, g) => x + g.frases.length, 0), 0);
  const total = nObj * 4 + nExtras + X.TROCAS.length;

  const capa = [
    new Paragraph({ spacing: { before: 1800, after: 120 }, children: [new TextRun({ text: 'KIT RELATÓRIOS DA CRECHE', bold: true, color: 'EF6F57', size: 22, characterSpacing: 60 })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Banco de Frases BNCC', font: 'Fredoka', bold: true, size: 72, color: INK })] }),
    P(`Berçário, Maternal I e Maternal II · ${nObj} objetivos de aprendizagem · ${total} frases e sugestões prontas para copiar, colar e personalizar.`, { r: { size: 26, color: INK2 } }),
    P(''),
    H2('Como usar', 'EF6F57'),
    bullet('Encontre o objetivo pelo campo de experiência (use o sumário ou Ctrl+F com o código, ex.: EI02EO07).'),
    bullet('Escolha o nível que descreve a criança: Já demonstra, Em desenvolvimento ou Iniciando.'),
    bullet('Copie a frase, troque [NOME] pelo nome da criança (Ctrl+H substitui todos de uma vez) e acrescente um fato ou uma fala real.'),
    bullet('Use o "Próximo passo da equipe" no último bloco do relatório: ele mostra a intencionalidade do seu trabalho.'),
    bullet('Revise a concordância (o/a) depois de trocar o nome.'),
    P(''),
    new Table({
      width: { size: PAGE_W, type: WidthType.DXA }, columnWidths: [PAGE_W],
      rows: [new TableRow({ children: [cell([
        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'Importante', bold: true, color: 'C98A0F' })] }),
        new Paragraph({ children: [new TextRun('As frases são pontos de partida, não relatórios prontos. Um relatório só é verdadeiro quando traz o que você observou: cenas, falas e conquistas daquela criança. Nunca copie o mesmo texto para várias crianças.')] }),
      ], PAGE_W, 'FCF0D4')] })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Sumário')] }),
    new TableOfContents('Sumário', { hyperlink: true, headingStyleRange: '1-2' }),
    P('Se o sumário aparecer vazio, clique nele com o botão direito e escolha "Atualizar campo" (Word) ou use o painel de navegação.', { r: { size: 18, color: INK2, italics: true } }),
  ];

  const trocas = [
    H1('Troque isto por isto'),
    intro('Rótulos e frases negativas ferem a criança e a família. Estas trocas mantêm a verdade com respeito.'),
    new Table({
      width: { size: PAGE_W, type: WidthType.DXA }, columnWidths: [3300, PAGE_W - 3300],
      rows: [
        new TableRow({ tableHeader: true, children: [cell([P('Evite', { r: { bold: true, color: 'FFFFFF' } })], 3300, 'EF6F57'), cell([P('Prefira', { r: { bold: true, color: 'FFFFFF' } })], PAGE_W - 3300, '2FA587')] }),
        ...X.TROCAS.map(([a, b]) => new TableRow({ cantSplit: true, children: [cell([P(a, { r: { strike: true, color: INK2, size: 20 } })], 3300, 'FDE7E2'), cell([P(b, { r: { size: 20 } })], PAGE_W - 3300, 'DCF2EB')] })),
      ],
    }),
  ];

  const verbos = [H1('Verbos, expressões e conectivos')];
  for (const v of X.VERBOS) {
    verbos.push(H2(v.grupo, '8A67C9'));
    verbos.push(P(v.itens.join('  ·  ')));
  }

  const exemplos = [H1('Relatórios-exemplo completos'), intro('Crianças fictícias. Veja o tom, a extensão e como os códigos da BNCC aparecem de forma discreta. Os mesmos exemplos estão diagramados no arquivo de modelos do Canva.')];
  for (const ex of EXEMPLOS) {
    exemplos.push(H2(`${ex.crianca} · ${ex.turma} · ${ex.idade}`, 'EF6F57'));
    for (const b of ex.blocos) {
      exemplos.push(new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [new TextRun({ text: b.titulo, bold: true, color: INK })] }));
      exemplos.push(P(b.texto));
    }
  }
  exemplos.push(H2(`Carta à família · ${CARTA_FAMILIA.crianca}`, 'EF6F57'));
  exemplos.push(P(CARTA_FAMILIA.saudacao, { r: { bold: true } }));
  for (const p of CARTA_FAMILIA.paragrafos) exemplos.push(P(p));
  exemplos.push(P(CARTA_FAMILIA.assinatura, { r: { italics: true } }));
  exemplos.push(H2(`${TURMA.titulo} · ${TURMA.turma}`, 'EF6F57'));
  for (const p of TURMA.paragrafos) exemplos.push(P(p));

  const doc = new Document({
    creator: 'Kit Relatórios da Creche',
    title: 'Banco de Frases BNCC · Kit Relatórios da Creche',
    styles: {
      default: { document: { run: { font: 'Nunito', size: 21, color: INK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Fredoka', size: 44, bold: true, color: INK }, paragraph: { spacing: { after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Fredoka', size: 30, bold: true, color: 'EF6F57' }, paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Nunito', size: 22, bold: true, color: INK }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 } },
      ],
    },
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Kit Relatórios da Creche · Banco de Frases BNCC · ', size: 16, color: INK2 }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: INK2 })] })] }) },
      children: [
        ...capa,
        ...grupoSection(X.ABERTURAS),
        ...faixaSection('Berçário · Bebês (EI01)', 'De zero a 1 ano e 6 meses. Para cada objetivo: três níveis de descrição e o próximo passo da equipe.', EI01, 'EI01'),
        ...faixaSection('Maternal I e II · Crianças bem pequenas (EI02)', 'De 1 ano e 7 meses a 3 anos e 11 meses. No Maternal I, os níveis "Iniciando" e "Em desenvolvimento" costumam ser os mais usados; no Maternal II, "Em desenvolvimento" e "Já demonstra".', EI02, 'EI02'),
        ...grupoSection(X.ROTINA),
        ...grupoSection(X.DELICADAS, true),
        ...grupoSection(X.FECHAMENTOS),
        ...trocas,
        ...verbos,
        ...exemplos,
        ...encerramento(),
      ],
    }],
  });
  return Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(outFile, buf); console.log('ok', outFile, `${nObj} objetivos, ${total} frases`); });
}

main(process.argv[2] || '../04 - Banco de Frases BNCC.docx').catch((e) => { console.error(e); process.exit(1); });
