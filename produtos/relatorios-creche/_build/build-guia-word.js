// Versão ALTERNATIVA em Word do Guia Pedagógico (mesmo conteúdo do .pptx do Canva).
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  AlignmentType, VerticalAlign, PageBreak, Footer, PageNumber, HeadingLevel, TableOfContents, LevelFormat,
} = require('docx');
const G = require('./content/guia');
const { CAMPOS } = require('./content/bncc');
const X = require('./content/extras');
const { ENCERRAMENTOS } = require('./content/fontes');

const INK = '2D2A4A', INK2 = '5E5A7A';
const K = { coral: ['EF6F57', 'FDE7E2'], mint: ['2FA587', 'DCF2EB'], sun: ['C98A0F', 'FCF0D4'], sky: ['3F86D6', 'DFEBF9'], lilac: ['8A67C9', 'EEE7F8'] };
const COR_CAMPO = { EO: 'coral', CG: 'mint', TS: 'sun', EF: 'sky', ET: 'lilac' };
const MARGIN = 1134, PW = 11906 - 2 * MARGIN;
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const nb = { top: NONE, bottom: NONE, left: NONE, right: NONE };

const run = (t, o = {}) => new TextRun({ text: t, font: o.head ? 'Fredoka' : 'Nunito', size: Math.round((o.pt || 10.5) * 2), bold: o.bold, italics: o.italic, color: o.color || INK, strike: o.strike, characterSpacing: o.sp });
const P = (r, o = {}) => new Paragraph({ alignment: o.align, keepNext: o.keepNext, spacing: { before: o.before || 0, after: o.after ?? 120, line: o.line || 300 }, children: Array.isArray(r) ? r : [r] });
const H1 = (t, kicker, cor = 'coral') => [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 60 }, children: [run(kicker.toUpperCase(), { bold: true, pt: 9, color: K[cor][0], sp: 40 })] }),
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 200 }, children: [new TextRun(t)] }),
];
const H2 = (t, cor) => new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, spacing: { before: 280, after: 120 }, children: [new TextRun({ text: t, color: cor })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 80, line: 290 }, children: Array.isArray(t) ? t : [run(t)] });
function cell(children, w, fill, o = {}) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined, margins: { top: o.pad ?? 140, bottom: o.pad ?? 140, left: 200, right: 200 }, verticalAlign: o.v || VerticalAlign.TOP, borders: nb, children });
}
const box = (children, fill, pad) => new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [PW], rows: [new TableRow({ cantSplit: true, children: [cell(children, PW, fill, { pad })] })] });
const gap = () => new Paragraph({ spacing: { after: 0, line: 160, lineRule: 'exact' }, children: [] });
function grid2(items, render) {
  const w = Math.floor((PW - 200) / 2), rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(new TableRow({ cantSplit: true, children: [render(items[i], w), cell([P(run(''), { after: 0 })], 200), items[i + 1] ? render(items[i + 1], w) : cell([P(run(''))], w)] }));
    if (i + 2 < items.length) rows.push(new TableRow({ children: [cell([gap()], w, null, { pad: 0 }), cell([gap()], 200, null, { pad: 0 }), cell([gap()], w, null, { pad: 0 })] }));
  }
  return new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [w, 200, w], rows });
}

function build() {
  const c = [];
  // ---------- Capa ----------
  c.push(P(run('KIT RELATÓRIOS DA CRECHE', { bold: true, pt: 10, color: K.coral[0], sp: 60 }), { before: 500, after: 120 }));
  c.push(P(run('Relatórios que enxergam a criança', { head: true, bold: true, pt: 32 }), { after: 160, line: 420 }));
  c.push(P(run('Guia pedagógico para observar, registrar e escrever relatórios descritivos de bebês e crianças bem pequenas, alinhado à BNCC. Berçário, Maternal I e Maternal II.', { pt: 12, color: INK2 }), { after: 300 }));
  c.push(box([
    P(run('RECOMENDADO: USE A VERSÃO DO CANVA', { bold: true, pt: 9, color: K.sun[0], sp: 40 }), { after: 80 }),
    P(run('Esta é a versão alternativa em Word, com o mesmo conteúdo.', { head: true, bold: true, pt: 14 }), { after: 100 }),
    P([run('O guia foi diagramado para o Canva, onde fica com o acabamento visual completo para ler, imprimir e consultar. Para a melhor experiência, abra o arquivo '), run('01 - Guia Pedagogico.pptx', { bold: true }), run(' no Canva ("Criar design" > "Importar arquivo") ou use o PDF.')], { after: 0 }),
  ], K.sun[1], 260));
  c.push(gap());
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun('Sumário')] }));
  c.push(new TableOfContents('Sumário', { hyperlink: true, headingStyleRange: '1-1' }));
  c.push(P(run('Se o sumário aparecer vazio, clique nele com o botão direito e escolha "Atualizar campo".', { pt: 9, italic: true, color: INK2 })));

  // ---------- O que tem no kit ----------
  c.push(...H1('O que tem no seu kit', 'Comece por aqui'));
  const itens = [['Guia pedagógico', 'Base legal, referenciais teóricos, marcos do desenvolvimento, o que observar em cada campo e como escrever. É este arquivo.', 'coral'], ['Banco de frases BNCC', 'Frases para os 61 objetivos de 0 a 3 anos, em três níveis, com próximo passo, situações delicadas e fechamentos.', 'mint'], ['Modelos editáveis', 'Relatórios para Berçário, Maternal I e II, carta à família, relatório da turma e exemplos preenchidos.', 'sky'], ['Fichas de observação', 'Registro rápido, rodízio da turma, ficha por campo, cuidados, conquistas e roteiro do relatório.', 'sun']];
  c.push(grid2(itens, ([t, d, cor], w) => cell([P(run(t, { head: true, bold: true, pt: 13 }), { after: 80 }), P(run(d, { pt: 10, color: INK2 }), { after: 0 })], w, K[cor][1], { pad: 200 })));

  // ---------- Parte 1 ----------
  c.push(...H1('Parte 1 · Por que e para que avaliar', 'Parte 1', 'coral'));
  c.push(H2('O relatório é um direito da criança', K.coral[0]));
  for (const l of G.LEIS) {
    c.push(box([P(run(l.doc, { head: true, bold: true, pt: 12.5 }), { after: 80 }), P(run(l.resumo, { pt: 10.5, color: INK2 }), { after: 80 }), P([run('Na prática: ', { bold: true, color: K.coral[0] }), run(l.pratica)], { after: 0 })], 'F6F4FA', 200));
    c.push(gap());
  }
  c.push(H2('Avaliar é acompanhar, não classificar', K.coral[0]));
  c.push(P(run('Segundo as Diretrizes Curriculares Nacionais, a avaliação na Educação Infantil acontece sem seleção, promoção ou classificação. Seu objetivo é conhecer cada criança para planejar melhor e contar à família como ela vive e aprende na instituição.', { color: INK2 })));
  const w2 = Math.floor((PW - 200) / 2);
  c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [w2, 200, w2], rows: [new TableRow({ cantSplit: true, children: [
    cell([P(run('O relatório É', { head: true, bold: true, pt: 13, color: K.mint[0] }), { after: 100 }), ...G.AVALIACAO_E.map((t) => P([run('✓  ', { bold: true, color: K.mint[0] }), run(t)], { after: 60 }))], w2, K.mint[1], { pad: 200 }),
    cell([P(run(''))], 200),
    cell([P(run('O relatório NÃO É', { head: true, bold: true, pt: 13, color: K.coral[0] }), { after: 100 }), ...G.AVALIACAO_NAO.map((t) => P([run('✕  ', { bold: true, color: K.coral[0] }), run(t)], { after: 60 }))], w2, K.coral[1], { pad: 200 }),
  ] })] }));
  c.push(gap());
  c.push(box([P(run('Uma pergunta para guiar a escrita', { bold: true, pt: 10, color: 'E9A21F' }), { after: 60 }), P(run('"Se a família ler este texto, vai reconhecer o próprio filho e saber o que ele viveu e aprendeu aqui?"', { head: true, pt: 13, color: 'FFFFFF' }), { after: 0 })], INK, 220));
  c.push(H2('As ideias que sustentam o relatório', K.coral[0]));
  const tc = ['coral', 'mint', 'sky', 'sun', 'lilac', 'coral'];
  G.TEORICOS.forEach((t, i) => {
    c.push(box([P(run(t.ideia.toUpperCase(), { bold: true, pt: 8.5, color: K[tc[i]][0], sp: 20 }), { after: 40 }), P(run(t.nome, { head: true, bold: true, pt: 13 }), { after: 80 }), P(run(t.texto, { color: INK2 }), { after: 80 }), P([run('No relatório: ', { bold: true, color: K[tc[i]][0] }), run(t.pratica)], { after: 0 })], K[tc[i]][1], 200));
    c.push(gap());
  });

  // ---------- Parte 2 ----------
  c.push(...H1('Parte 2 · Quem é a criança de 0 a 3 anos', 'Parte 2', 'mint'));
  c.push(H2('Faixas etárias da BNCC', K.mint[0]));
  c.push(P(run('A BNCC organiza os objetivos da Educação Infantil em três grupos etários. Este kit cobre os dois primeiros, que correspondem à creche. O código de cada objetivo indica etapa, faixa, campo e número: EI 02 EF 05.', { color: INK2 })));
  for (const f of G.FAIXAS) c.push(bullet([run(`${f.cod} · ${f.nome}: `, { bold: true }), run(`${f.idade} (${f.turmas})`)]));
  c.push(H2('Os seis direitos de aprendizagem e desenvolvimento', K.mint[0]));
  for (const d of G.DIREITOS) c.push(bullet([run(`${d.nome} `, { bold: true }), run(d.texto)]));
  c.push(H2('Marcos do desenvolvimento', K.mint[0]));
  const cw = [1500, Math.floor((PW - 1500) / 4)];
  const mcols = [cw[0], cw[1], cw[1], cw[1], PW - cw[0] - 3 * cw[1]];
  const thin = { style: BorderStyle.SINGLE, size: 4, color: 'E6E2EF' }, gb = { top: thin, bottom: thin, left: thin, right: thin };
  const mcell = (t, w, fill, o = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined, margins: { top: 90, bottom: 90, left: 110, right: 110 }, borders: gb, children: [P(run(t, { pt: o.pt || 9, bold: o.bold, color: o.color || INK }), { after: 0, line: 260 })] });
  c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: mcols, rows: [
    new TableRow({ tableHeader: true, children: ['Idade', 'Movimento', 'Linguagem', 'Socioemocional', 'Exploração'].map((h, i) => mcell(h, mcols[i], INK, { bold: true, color: 'FFFFFF' })) }),
    ...G.MARCOS.map((m, r) => new TableRow({ cantSplit: true, children: [mcell(m.idade, mcols[0], K.mint[1], { bold: true }), mcell(m.mov, mcols[1], r % 2 ? 'FFFFFF' : 'F6F4FA'), mcell(m.ling, mcols[2], r % 2 ? 'FFFFFF' : 'F6F4FA'), mcell(m.socio, mcols[3], r % 2 ? 'FFFFFF' : 'F6F4FA'), mcell(m.cog, mcols[4], r % 2 ? 'FFFFFF' : 'F6F4FA')] })),
  ] }));
  c.push(gap());
  c.push(box([P([run('Importante: ', { bold: true }), run(G.MARCOS_NOTA)], { after: 0, line: 280 })], K.sun[1], 180));

  // ---------- Parte 3 ----------
  c.push(...H1('Parte 3 · O que observar em cada campo de experiência', 'Parte 3', 'sky'));
  for (const sig of ['EO', 'CG', 'TS', 'EF', 'ET']) {
    const o = G.OBSERVAR[sig], [cc, ct] = K[COR_CAMPO[sig]];
    c.push(H2(`${sig} · ${CAMPOS[sig].nome}`, cc));
    c.push(P(run(o.foco, { italic: true, color: INK2 })));
    c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [w2, 200, w2], rows: [new TableRow({ cantSplit: true, children: [
      cell([P(run('No Berçário (EI01)', { head: true, bold: true, pt: 12 }), { after: 80 }), ...o.bercario.map((t) => P([run('•  ', { bold: true, color: cc }), run(t)], { after: 50 }))], w2, ct, { pad: 180 }),
      cell([P(run(''))], 200),
      cell([P(run('No Maternal (EI02)', { head: true, bold: true, pt: 12 }), { after: 80 }), ...o.maternal.map((t) => P([run('•  ', { bold: true, color: cc }), run(t)], { after: 50 }))], w2, ct, { pad: 180 }),
    ] })] }));
    c.push(gap());
    c.push(box([P([run('Evidências que valem ouro: ', { bold: true, color: 'E9A21F' }), run(o.evidencias, { color: 'FFFFFF' })], { after: 60 }), P([run('Exemplo de registro: ', { bold: true, color: 'E9A21F' }), run(o.registro, { color: 'FFFFFF', italic: true })], { after: 0 })], INK, 180));
  }

  // ---------- Parte 4 ----------
  c.push(...H1('Parte 4 · Como observar e registrar', 'Parte 4', 'sun'));
  c.push(H2('Seis formas de registrar o cotidiano', K.sun[0]));
  c.push(P(run('As DCNEI pedem "múltiplos registros". Combine pelo menos três destas formas ao longo do semestre.', { color: INK2 })));
  const tcol = ['coral', 'sky', 'mint', 'lilac', 'sun', 'coral'];
  c.push(grid2(G.TECNICAS.map((t, i) => [t, tcol[i]]), ([t, cor], w) => cell([P(run(t.nome, { head: true, bold: true, pt: 12 }), { after: 60 }), P(run(t.texto, { pt: 10 }), { after: 0 })], w, K[cor][1], { pad: 180 })));
  c.push(H2('O método dos 5 minutos por dia', K.sun[0]));
  G.ROTINA_REGISTRO.forEach((r, i) => c.push(P([run(`${i + 1}. ${r.passo}: `, { bold: true }), run(r.texto)], { after: 100 })));
  c.push(box([P([run('Dica de ouro: ', { bold: true }), run('turma de 15 crianças, 5 crianças-foco por dia: em 3 dias todas foram observadas com atenção. Em um semestre, isso dá mais de 20 registros por criança.')], { after: 0 })], K.sun[1], 180));

  // ---------- Parte 5 ----------
  c.push(...H1('Parte 5 · Como escrever o relatório', 'Parte 5', 'lilac'));
  c.push(H2('Um relatório em seis blocos', K.lilac[0]));
  c.push(P(run('Esta estrutura garante que os cinco campos de experiência apareçam sem que o texto vire uma lista. Cada bloco tem de 3 a 6 linhas. Extensão ideal: uma a uma página e meia por criança.', { color: INK2 })));
  for (const e of G.ESTRUTURA) c.push(P([run(`${e.n}. ${e.titulo}: `, { bold: true }), run(e.texto)], { after: 100 }));
  c.push(H2('Troque isto por isto', K.lilac[0]));
  const c1 = 3300;
  c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [c1, PW - c1], rows: [
    new TableRow({ tableHeader: true, children: [mcell('Evite', c1, K.coral[0], { bold: true, color: 'FFFFFF', pt: 10 }), mcell('Prefira', PW - c1, K.mint[0], { bold: true, color: 'FFFFFF', pt: 10 })] }),
    ...X.TROCAS.slice(0, 10).map(([a, b]) => new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: c1, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: K.coral[1] }, margins: { top: 90, bottom: 90, left: 120, right: 120 }, borders: gb, children: [P(run(a.replace(/\[NOME\]/g, 'Fulano'), { strike: true, color: INK2, pt: 9.5 }), { after: 0 })] }),
      new TableCell({ width: { size: PW - c1, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: K.mint[1] }, margins: { top: 90, bottom: 90, left: 120, right: 120 }, borders: gb, children: [P(run(b.replace(/\[NOME\]/g, 'Fulano'), { pt: 9.5 }), { after: 0 })] }),
    ] })),
  ] }));
  c.push(P(run('Regra de ouro: descreva o que a criança FAZ, nunca o que ela "É".', { bold: true, color: K.lilac[0] }), { before: 120 }));
  c.push(H2('Os 10 erros mais comuns', K.lilac[0]));
  G.ERROS.forEach((e, i) => c.push(P([run(`${i + 1}. `, { bold: true, color: K.coral[0] }), run(e)], { after: 80 })));
  c.push(H2('Situações delicadas: como escrever', K.lilac[0]));
  for (const g of X.DELICADAS.grupos) c.push(P([run(`${g.nome}: `, { bold: true }), run(g.orientacao)], { after: 100 }));
  c.push(H2('Para a família ou para a escola?', K.lilac[0]));
  c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [w2, 200, w2], rows: [new TableRow({ cantSplit: true, children: [
    cell([P(run('Relatório pedagógico', { head: true, bold: true, pt: 12 }), { after: 80 }), ...['Linguagem pedagógica, clara e respeitosa', 'Organizado pelos campos de experiência', 'Pode citar os códigos dos objetivos da BNCC', 'Mostra a intencionalidade e os próximos passos', 'É documento oficial: segue o modelo da rede'].map((t) => P([run('•  ', { bold: true, color: K.sky[0] }), run(t)], { after: 50 }))], w2, K.sky[1], { pad: 180 }),
    cell([P(run(''))], 200),
    cell([P(run('Carta à família', { head: true, bold: true, pt: 12 }), { after: 80 }), ...['Linguagem simples e calorosa, sem jargões', 'Sem códigos da BNCC', 'Cenas, falas e conquistas que emocionam', 'Sugestões simples para fazer em casa', 'Curta: cabe em uma página com foto'].map((t) => P([run('•  ', { bold: true, color: K.coral[0] }), run(t)], { after: 50 }))], w2, K.coral[1], { pad: 180 }),
  ] })] }));
  c.push(H2('Checklist antes de entregar', K.lilac[0]));
  for (const t of G.CHECKLIST) c.push(P([run('☐  ', { bold: true, color: K.lilac[0] }), run(t)], { after: 80 }));

  // ---------- Referências ----------
  c.push(...H1('Referências', 'Para aprofundar', 'coral'));
  for (const r of G.REFERENCIAS) c.push(P(run(r, { pt: 10 }), { after: 140 }));

  // ---------- Encerramento ----------
  const e = ENCERRAMENTOS.guia;
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [PW], rows: [new TableRow({ children: [cell([
    P(run('PARA ENCERRAR', { bold: true, pt: 10, color: 'E9A21F', sp: 60 }), { before: 300, after: 160 }),
    P(run(e.titulo, { head: true, bold: true, pt: 22, color: 'FFFFFF' }), { after: 200, line: 320 }),
    P(run(e.texto, { pt: 12, color: 'E9E6F5' }), { after: 400, line: 320 }),
    P(run('FONTES CONSULTADAS NA ELABORAÇÃO DESTE MATERIAL', { bold: true, pt: 8.5, color: 'E9A21F', sp: 30 }), { after: 120 }),
    ...e.fontes.map((f) => P(run(f, { pt: 9, color: 'E9E6F5' }), { after: 70 })),
    P(run(e.nota, { pt: 8.5, italic: true, color: 'B9B4D3' }), { before: 160, after: 300 }),
    P(run('Kit Relatórios da Creche · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.', { pt: 8, color: 'B9B4D3' }), { after: 0 }),
  ], PW, INK, { pad: 460 })] })] }));

  return new Document({
    creator: 'Kit Relatórios da Creche', title: 'Guia Pedagógico · Kit Relatórios da Creche',
    styles: {
      default: { document: { run: { font: 'Nunito', size: 21, color: INK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Fredoka', size: 44, bold: true, color: INK }, paragraph: { spacing: { after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Fredoka', size: 28, bold: true }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      ],
    },
    numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, footer: 500 } } },
      footers: { default: new Footer({ children: [P([run('Kit Relatórios da Creche · Guia pedagógico (versão Word)  ·  ', { pt: 8, color: INK2 }), new TextRun({ children: [PageNumber.CURRENT], font: 'Nunito', size: 16, color: INK2, bold: true })], { align: AlignmentType.RIGHT, after: 0 })] }) },
      children: c,
    }],
  });
}

(async () => {
  const out = path.join('..', 'Word (alternativo)', '01 - Guia Pedagogico (versao Word).docx');
  fs.writeFileSync(out, await Packer.toBuffer(build()));
  console.log('ok', out);
})().catch((e) => { console.error(e); process.exit(1); });
