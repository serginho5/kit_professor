// Gera "03 - Fichas de Observacao.pptx" (A4 retrato, para imprimir ou editar no Canva).
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { W, H, M, C, FONT_HEAD, text, iconCircle, card, dots } = D;
const CW = W - 2 * M;
const CAMPOS = [['EO', 'coral'], ['CG', 'mint'], ['TS', 'sun'], ['EF', 'sky'], ['ET', 'lilac']];

function footer(s, n, nome) {
  text(s, `Kit Relatórios da Creche · Ficha ${n} · ${nome}`, { x: M, y: H - 0.45, w: CW, h: 0.2, fontSize: 8, color: C.ink2 });
}

async function header(s, pres, n, titulo, sub, cor, icon) {
  card(s, pres, { x: M, y: 0.45, w: CW, h: 1.35, fill: C[cor + 'T'] });
  await iconCircle(s, pres, { x: M + 0.25, y: 0.67, d: 0.9, fill: C[cor], name: icon });
  text(s, `FICHA ${n}`, { x: M + 1.4, y: 0.62, w: CW - 1.6, h: 0.25, fontSize: 9, bold: true, color: C[cor], charSpacing: 2 });
  text(s, titulo, { x: M + 1.4, y: 0.86, w: CW - 1.6, h: 0.45, fontSize: 19, fontFace: FONT_HEAD, bold: true });
  text(s, sub, { x: M + 1.4, y: 1.3, w: CW - 1.6, h: 0.4, fontSize: 9.5, color: C.ink2 });
}

// Campo de preenchimento: rótulo + linha.
function field(s, pres, label, x, y, w) {
  text(s, label, { x, y, w, h: 0.22, fontSize: 8, bold: true, color: C.ink2, charSpacing: 1 });
  s.addShape(pres.shapes.LINE, { x, y: y + 0.5, w, h: 0, line: { color: 'B9B4D3', width: 0.75 } });
}

// Grade feita de formas (imprime bem e o Canva importa como elementos editáveis).
function grid(s, pres, { x, y, cols, rowH, headH = 0.45, rows, headFill = C.ink, cells = [] }) {
  const totalW = cols.reduce((a, c) => a + c.w, 0);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: totalW, h: headH, fill: { color: headFill }, line: { color: headFill, width: 0 }, rectRadius: 0.08 });
  let cx = x;
  for (const c of cols) {
    text(s, c.t, { x: cx + 0.08, y, w: c.w - 0.16, h: headH, fontSize: c.fs || 8.5, bold: true, color: 'FFFFFF', valign: 'middle', align: c.align || 'left' });
    cx += c.w;
  }
  for (let r = 0; r < rows; r++) {
    const ry = y + headH + r * rowH;
    s.addShape(pres.shapes.RECTANGLE, { x, y: ry, w: totalW, h: rowH, fill: { color: r % 2 ? 'FFFFFF' : C.mist }, line: { color: C.line, width: 0.5 } });
    cx = x;
    cols.forEach((c, i) => {
      if (i > 0) s.addShape(pres.shapes.LINE, { x: cx, y: ry, w: 0, h: rowH, line: { color: C.line, width: 0.5 } });
      const v = cells[r] && cells[r][i];
      if (v) text(s, v, { x: cx + 0.08, y: ry, w: c.w - 0.16, h: rowH, fontSize: c.cfs || 8.5, valign: 'middle', color: C.ink, align: c.align || 'left' });
      cx += c.w;
    });
  }
  return y + headH + rows * rowH;
}

// Quadradinhos de marcação dos campos (EO CG TS EF ET).
function campoChecks(s, pres, x, y) {
  CAMPOS.forEach(([sig, cor], i) => {
    const bx = x + i * 0.42;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y, w: 0.16, h: 0.16, fill: { color: 'FFFFFF' }, line: { color: C[cor], width: 1.25 }, rectRadius: 0.03 });
    text(s, sig, { x: bx + 0.18, y: y - 0.02, w: 0.24, h: 0.2, fontSize: 7, bold: true, color: C[cor] });
  });
}

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = 'Fichas de Observação · Kit Relatórios da Creche';
  pres.author = 'Kit Relatórios da Creche';
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };
  const add = (sec) => { const s = pres.addSlide({ sectionTitle: sec }); s.background = { color: C.paper }; return s; };

  // ---- Capa + índice ----
  pres.addSection({ title: 'Capa' });
  {
    const s = add('Capa');
    s.background = { color: C.ink };
    dots(s, pres, 5.2, 1.0, 2.0);
    text(s, 'KIT RELATÓRIOS DA CRECHE', { x: M, y: 4.6, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Fichas de observação e registro', { x: M, y: 5.0, w: 6.6, h: 1.8, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Sete fichas para o dia a dia da creche. Imprima quantas precisar ou preencha direto no Canva.', { x: M, y: 7.0, w: 6.0, h: 0.8, fontSize: 14, color: 'E9E6F5' });
    const lista = ['1 · Registro diário das crianças-foco', '2 · Rodízio semanal da turma', '3 · Ficha individual por campo', '4 · Acompanhamento dos cuidados', '5 · Conquistas e marcos', '6 · Entrevista de acolhimento da família', '7 · Roteiro para montar o relatório'];
    text(s, lista.map((l, i) => ({ text: l, options: { breakLine: i < lista.length - 1 } })), { x: M, y: 8.15, w: 6, h: 2.4, fontSize: 11.5, color: 'FFFFFF', lineSpacingMultiple: 1.3 });
  }

  // ---- Ficha 1: registro diário ----
  pres.addSection({ title: 'Fichas' });
  {
    const s = add('Fichas');
    await header(s, pres, 1, 'Registro diário das crianças-foco', 'Escolha 4 ou 5 crianças por dia. Anote uma cena, uma fala e os campos envolvidos. Leva 5 minutos.', 'coral', 'PiNotePencil');
    field(s, pres, 'DATA', M, 2.0, 1.6);
    field(s, pres, 'TURMA', M + 1.9, 2.0, 2.4);
    field(s, pres, 'MOMENTO DA ROTINA', M + 4.6, 2.0, CW - 4.6);
    let y = 2.8;
    for (let i = 0; i < 5; i++) {
      const h = 1.55;
      card(s, pres, { x: M, y, w: CW, h, fill: C.mist, radius: 0.12 });
      text(s, 'CRIANÇA', { x: M + 0.2, y: y + 0.15, w: 1.6, h: 0.2, fontSize: 7.5, bold: true, color: C.ink2, charSpacing: 1 });
      s.addShape(pres.shapes.LINE, { x: M + 0.2, y: y + 0.6, w: 1.75, h: 0, line: { color: 'B9B4D3', width: 0.75 } });
      campoChecks(s, pres, M + 0.2, y + 0.9);
      s.addShape(pres.shapes.LINE, { x: M + 2.15, y: y + 0.15, w: 0, h: h - 0.3, line: { color: C.line, width: 1 } });
      text(s, 'O QUE ACONTECEU (cena)', { x: M + 2.3, y: y + 0.15, w: 3, h: 0.2, fontSize: 7.5, bold: true, color: C.ink2, charSpacing: 1 });
      for (let l = 0; l < 2; l++) s.addShape(pres.shapes.LINE, { x: M + 2.3, y: y + 0.6 + l * 0.33, w: CW - 2.5, h: 0, line: { color: 'D9D5E6', width: 0.75 } });
      text(s, 'FALA DA CRIANÇA: "', { x: M + 2.3, y: y + 1.12, w: 1.6, h: 0.22, fontSize: 7.5, bold: true, color: C.ink2, charSpacing: 1 });
      s.addShape(pres.shapes.LINE, { x: M + 3.85, y: y + 1.32, w: CW - 4.05, h: 0, line: { color: 'D9D5E6', width: 0.75 } });
      y += h + 0.15;
    }
    footer(s, 1, 'Registro diário');
  }

  // ---- Ficha 2: rodízio semanal ----
  {
    const s = add('Fichas');
    await header(s, pres, 2, 'Rodízio semanal da turma', 'Marque o dia em que cada criança foi criança-foco. Ninguém fica sem registro: confira a coluna "Total" no fim da semana.', 'sun', 'PiCalendar');
    field(s, pres, 'SEMANA DE', M, 2.0, 2.2);
    field(s, pres, 'TURMA', M + 2.5, 2.0, CW - 2.5);
    const cols = [{ t: '#', w: 0.4, align: 'center' }, { t: 'Criança', w: 2.37 }, { t: 'Seg', w: 0.72, align: 'center' }, { t: 'Ter', w: 0.72, align: 'center' }, { t: 'Qua', w: 0.72, align: 'center' }, { t: 'Qui', w: 0.72, align: 'center' }, { t: 'Sex', w: 0.72, align: 'center' }, { t: 'Total', w: 0.7, align: 'center' }];
    const cells = Array.from({ length: 20 }, (_, i) => [String(i + 1)]);
    grid(s, pres, { x: M, y: 2.8, cols, rowH: 0.37, rows: 20, cells, headFill: C.sun });
    footer(s, 2, 'Rodízio semanal');
  }

  // ---- Ficha 3: individual por campo ----
  {
    const s = add('Fichas');
    await header(s, pres, 3, 'Ficha individual por campo', 'Uma por criança no semestre. Uma vez por mês, transfira para cá os registros diários. No fim, o relatório nasce desta ficha.', 'mint', 'PiFolder');
    field(s, pres, 'CRIANÇA', M, 2.0, 3.2);
    field(s, pres, 'TURMA', M + 3.5, 2.0, 1.8);
    field(s, pres, 'SEMESTRE', M + 5.6, 2.0, CW - 5.6);
    const nomes = { EO: 'O eu, o outro e o nós', CG: 'Corpo, gestos e movimentos', TS: 'Traços, sons, cores e formas', EF: 'Escuta, fala, pensamento e imaginação', ET: 'Espaços, tempos, quantidades, relações e transformações' };
    let y = 2.8;
    for (const [sig, cor] of CAMPOS) {
      const h = 1.55;
      card(s, pres, { x: M, y, w: CW, h, fill: C[cor + 'T'], radius: 0.12 });
      await iconCircle(s, pres, { x: M + 0.18, y: y + 0.15, d: 0.42, fill: C[cor], name: D.CAMPO_ICON[sig] });
      text(s, `${sig} · ${nomes[sig]}`, { x: M + 0.72, y: y + 0.15, w: CW - 0.9, h: 0.42, fontSize: 11, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
      for (let l = 0; l < 3; l++) {
        text(s, '___/___', { x: M + 0.2, y: y + 0.66 + l * 0.27, w: 0.7, h: 0.22, fontSize: 8, color: C.ink2 });
        s.addShape(pres.shapes.LINE, { x: M + 0.9, y: y + 0.86 + l * 0.27, w: CW - 1.1, h: 0, line: { color: 'FFFFFF', width: 1.25 } });
      }
      y += h + 0.12;
    }
    footer(s, 3, 'Ficha individual por campo');
  }

  // ---- Ficha 4: cuidados ----
  {
    const s = add('Fichas');
    await header(s, pres, 4, 'Acompanhamento dos cuidados', 'Alimentação, sono e higiene também são aprendizagem. Registre conquistas de autonomia, não só "comeu" ou "dormiu".', 'sky', 'PiHeart');
    field(s, pres, 'CRIANÇA', M, 2.0, 3.6);
    field(s, pres, 'SEMANA DE', M + 3.9, 2.0, CW - 3.9);
    const cols = [{ t: 'Dia', w: 0.75 }, { t: 'Alimentação (aceitou, experimentou, autonomia)', w: 2.25 }, { t: 'Sono e descanso', w: 1.45 }, { t: 'Higiene, troca, desfralde', w: 1.55 }, { t: 'Humor', w: 1.07, align: 'center', cfs: 13 }];
    const cells = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((d) => [d, '', '', '', '☺  ☹  ☾']);
    let y = grid(s, pres, { x: M, y: 2.8, cols, rowH: 1.0, rows: 5, cells, headFill: C.sky });
    card(s, pres, { x: M, y: y + 0.25, w: CW, h: 2.2, fill: C.skyT });
    text(s, 'CONQUISTAS DE AUTONOMIA DA SEMANA', { x: M + 0.25, y: y + 0.4, w: CW - 0.5, h: 0.22, fontSize: 8, bold: true, color: C.sky, charSpacing: 1 });
    for (let l = 0; l < 4; l++) s.addShape(pres.shapes.LINE, { x: M + 0.25, y: y + 0.95 + l * 0.38, w: CW - 0.5, h: 0, line: { color: 'FFFFFF', width: 1.25 } });
    footer(s, 4, 'Cuidados');
  }

  // ---- Ficha 5: conquistas e marcos ----
  {
    const s = add('Fichas');
    await header(s, pres, 5, 'Conquistas e marcos', 'Anote a data das grandes conquistas. Elas dão vida ao relatório ("deu os primeiros passos em outubro, no pátio").', 'lilac', 'PiStar');
    field(s, pres, 'CRIANÇA', M, 2.0, 3.6);
    field(s, pres, 'TURMA', M + 3.9, 2.0, CW - 3.9);
    const marcos = ['Sentou sem apoio', 'Engatinhou / arrastou-se', 'Ficou de pé com apoio', 'Primeiros passos sozinho', 'Primeiras palavras', 'Juntou duas palavras', 'Respondeu ao próprio nome', 'Apontou para mostrar ou pedir', 'Comeu sozinho com a colher', 'Bebeu no copo sozinho', 'Pediu para ir ao banheiro', 'Concluiu o desfralde diurno', 'Brincou de faz de conta', 'Contou um fato vivido', 'Desenhou e nomeou o desenho', 'Resolveu um conflito com palavras'];
    const cols = [{ t: 'Conquista', w: 3.4 }, { t: 'Data', w: 1.0, align: 'center' }, { t: 'Contexto / como foi', w: 2.67 }];
    const cells = marcos.map((m) => [m]).concat([[''], ['']]);
    grid(s, pres, { x: M, y: 2.8, cols, rowH: 0.42, rows: cells.length, cells, headFill: C.lilac });
    text(s, 'Cada criança tem seu tempo: esta ficha serve para celebrar e registrar, nunca para comparar.', { x: M, y: 10.85, w: CW, h: 0.25, fontSize: 8.5, italic: true, color: C.ink2 });
    footer(s, 5, 'Conquistas e marcos');
  }

  // ---- Ficha 6: entrevista de acolhimento ----
  {
    const s = add('Fichas');
    await header(s, pres, 6, 'Entrevista de acolhimento da família', 'Converse com a família na chegada da criança. Estas informações orientam a adaptação e o primeiro bloco do relatório.', 'coral', 'PiHouse');
    field(s, pres, 'CRIANÇA', M, 2.0, 3.0);
    field(s, pres, 'NASCIMENTO', M + 3.3, 2.0, 1.5);
    field(s, pres, 'RESPONSÁVEL', M + 5.1, 2.0, CW - 5.1);
    const perguntas = [
      'Como a criança é chamada em casa? Tem apelido?',
      'Com quem mora? Tem irmãos? Quem cuida dela no dia a dia?',
      'Como é o sono? Como adormece (colo, chupeta, paninho, música)?',
      'Como é a alimentação? Preferências, recusas, alergias ou restrições?',
      'Usa fralda? Já demonstra interesse pelo banheiro?',
      'Como se comunica? Que palavras ou gestos usa?',
      'O que a acalma quando está triste ou assustada?',
      'Do que mais gosta de brincar? Tem um objeto ou brinquedo preferido?',
      'Já frequentou outra creche? Como foram as separações até hoje?',
      'Há alguma informação de saúde importante para a equipe?',
      'O que a família espera da creche neste ano?',
    ];
    let y = 2.75;
    perguntas.forEach((p, i) => {
      text(s, `${i + 1}. ${p}`, { x: M, y, w: CW, h: 0.24, fontSize: 9.5, bold: true });
      s.addShape(pres.shapes.LINE, { x: M, y: y + 0.6, w: CW, h: 0, line: { color: 'D9D5E6', width: 0.75 } });
      y += 0.72;
    });
    footer(s, 6, 'Entrevista de acolhimento');
  }

  // ---- Ficha 7: roteiro do relatório ----
  {
    const s = add('Fichas');
    await header(s, pres, 7, 'Roteiro para montar o relatório', 'Antes de escrever, separe as melhores evidências de cada bloco. Depois é só costurar com o Banco de Frases.', 'mint', 'PiListChecks');
    field(s, pres, 'CRIANÇA', M, 2.0, 3.6);
    field(s, pres, 'TURMA / SEMESTRE', M + 3.9, 2.0, CW - 3.9);
    const blocos = [['1. Chegada e vínculos', 'coral'], ['2. Relações e convivência', 'coral'], ['3. Corpo, movimento e cuidados', 'mint'], ['4. Linguagens e expressão', 'sky'], ['5. Explorações e descobertas', 'lilac'], ['6. Conquistas e próximos passos', 'sun']];
    const cols = [{ t: 'Bloco', w: 1.75 }, { t: 'Cena ou fato real (com data)', w: 2.35 }, { t: 'Fala da criança', w: 1.6 }, { t: 'Frase do banco (código)', w: 1.37 }];
    const cells = blocos.map(([b]) => [b]);
    grid(s, pres, { x: M, y: 2.8, cols, rowH: 1.15, rows: 6, cells, headFill: C.mint });
    card(s, pres, { x: M, y: 10.35, w: CW, h: 0.7, fill: C.mintT, radius: 0.12 });
    text(s, 'Pronto? Escreva no modelo editável e passe o checklist do guia antes de entregar.', { x: M + 0.25, y: 10.35, w: CW - 0.5, h: 0.7, fontSize: 10, bold: true, valign: 'middle' });
    footer(s, 7, 'Roteiro do relatório');
  }

  pres.addSection({ title: 'Encerramento' });
  D.closingPage(pres, 'Encerramento', require('./content/fontes').ENCERRAMENTOS.fichas);

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile);
}

main(process.argv[2] || '../03 - Fichas de Observacao.pptx').catch((e) => { console.error(e); process.exit(1); });
