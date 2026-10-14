// Order bump 1: "Portfólio de Fim de Ano da Creche" (A4 retrato, editável no Canva).
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { W, H, M, C, FONT_HEAD, text, iconCircle, card, dots, photoSlot } = D;
const CW = W - 2 * M;
const MARCA = 'Portfólio de Fim de Ano da Creche';
const GRAY = 'A9A4BF';

const foot = (s, n) => D.footer(s, n, `${MARCA}`);

async function main(outFile) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'A4P', width: W, height: H });
  pres.layout = 'A4P';
  pres.title = MARCA;
  pres.author = MARCA;
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };
  let n = 0;
  const add = (sec, bg = C.paper) => { n += 1; const s = pres.addSlide({ sectionTitle: sec }); s.background = { color: bg }; return s; };

  // ================= CAPA DO PRODUTO =================
  pres.addSection({ title: 'Abertura' });
  {
    const s = add('Abertura', C.ink);
    const circ = [{ x: 4.4, y: 0.8, d: 3.1, c: C.sun }, { x: 6.5, y: 3.5, d: 1.3, c: C.coral }, { x: 3.7, y: 3.4, d: 1.0, c: C.mint }, { x: 5.6, y: 4.3, d: 0.8, c: C.sky }, { x: 7.0, y: 0.6, d: 0.55, c: C.lilac }];
    for (const c of circ) s.addShape(pres.shapes.OVAL, { x: c.x, y: c.y, w: c.d, h: c.d, fill: { color: c.c }, line: { color: c.c, width: 0 } });
    await iconCircle(s, pres, { x: 5.2, y: 1.6, d: 1.5, fill: C.sun, name: 'PiCamera', ratio: 0.62, iconColor: C.ink });
    text(s, 'KIT RELATÓRIOS DA CRECHE · COMPLEMENTO', { x: M, y: 5.55, w: CW, h: 0.3, fontSize: 11, bold: true, color: C.sun, charSpacing: 3 });
    text(s, 'Portfólio de fim de ano', { x: M, y: 5.95, w: 6.6, h: 1.9, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Páginas editáveis no Canva para transformar fotos, desenhos e falas do semestre no álbum que cada família vai guardar para sempre.', { x: M, y: 7.95, w: 6.2, h: 0.9, fontSize: 14, color: 'E9E6F5' });
    const tags = [['Berçário', C.coral], ['Maternal I', C.mint], ['Maternal II', C.sky]];
    let tx = M;
    for (const [t, c] of tags) {
      const w = 0.32 + t.length * 0.105;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 9.15, w, h: 0.42, fill: { color: c }, line: { color: c, width: 0 }, rectRadius: 0.21 });
      text(s, t, { x: tx, y: 9.15, w, h: 0.42, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      tx += w + 0.15;
    }
    text(s, '3 capas · 16 páginas de modelo · certificado · orientações pedagógicas', { x: M, y: 10.6, w: CW, h: 0.3, fontSize: 10, color: 'B9B4D3' });
  }

  // ================= COMO MONTAR =================
  {
    const s = add('Abertura');
    text(s, 'COMECE POR AQUI', { x: M, y: 0.55, w: CW, h: 0.25, fontSize: 9, bold: true, color: C.brand, charSpacing: 2 });
    text(s, 'Como montar o portfólio', { x: M, y: 0.8, w: CW, h: 0.6, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    text(s, 'As Diretrizes Curriculares Nacionais pedem que a creche produza documentação que permita às famílias conhecer o trabalho da instituição e o percurso de cada criança (Resolução CNE/CEB nº 5/2009, art. 10). O portfólio é essa documentação em forma de memória: fotos, produções e falas organizadas com intenção pedagógica, como propõe a documentação pedagógica de Reggio Emilia.', { x: M, y: 1.55, w: CW, h: 1.3, fontSize: 11, color: C.ink2 });
    const passos = [
      ['PiCalendar', 'Guarde ao longo do semestre', 'Uma pasta no celular por criança: fotos do processo (não só do resultado), desenhos datados e falas anotadas no dia.', 'coral'],
      ['PiHandHeart', 'Escolha junto com a criança', 'No Maternal, deixe a criança escolher o desenho ou a foto preferida. Participar das escolhas também é um direito de aprendizagem.', 'mint'],
      ['PiPencilSimple', 'Escreva legendas que contam', 'Uma legenda boa diz o que a criança fez, disse ou descobriu. Veja exemplos na próxima página.', 'sky'],
      ['PiPrinter', 'Monte no Canva e entregue', 'Duplique as páginas, troque fotos e textos, baixe em PDF e imprima ou envie. Entregue junto com o relatório.', 'sun'],
    ];
    let y = 3.05;
    for (const [ic, t, d, cor] of passos) {
      card(s, pres, { x: M, y, w: CW, h: 1.45, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: M + 0.3, y: y + 0.33, d: 0.78, fill: C[cor], name: ic });
      text(s, t, { x: M + 1.35, y: y + 0.22, w: CW - 1.6, h: 0.4, fontSize: 15, fontFace: FONT_HEAD, bold: true });
      text(s, d, { x: M + 1.35, y: y + 0.65, w: CW - 1.6, h: 0.7, fontSize: 10.5, color: C.ink2 });
      y += 1.6;
    }
    card(s, pres, { x: M, y: y + 0.05, w: CW, h: 1.5, fill: C.ink });
    text(s, [{ text: 'Autorização de imagem\n', options: { bold: true, color: C.sun, breakLine: true } }, { text: 'Use fotos das crianças apenas com autorização de uso de imagem assinada pelas famílias. Em fotos coletivas, confira a autorização de todas as crianças que aparecem.', options: { color: 'FFFFFF' } }], { x: M + 0.35, y: y + 0.05, w: CW - 0.7, h: 1.5, fontSize: 11, valign: 'middle' });
    foot(s, n);
  }

  // ================= LEGENDAS QUE CONTAM =================
  {
    const s = add('Abertura');
    text(s, 'ANTES DE ESCREVER', { x: M, y: 0.55, w: CW, h: 0.25, fontSize: 9, bold: true, color: C.brand, charSpacing: 2 });
    text(s, 'Legendas que contam', { x: M, y: 0.8, w: CW, h: 0.6, fontSize: 26, fontFace: FONT_HEAD, bold: true });
    text(s, 'A legenda transforma uma foto bonita em registro pedagógico. Troque a descrição genérica por uma cena: o que a criança fez, disse ou descobriu.', { x: M, y: 1.5, w: CW, h: 0.7, fontSize: 11.5, color: C.ink2 });
    const pares = [
      ['Pintura com guache.', 'Davi misturou o azul com o amarelo, parou e disse: "Virou verde!". Depois quis repetir com outras cores.'],
      ['Brincando no parque.', 'Helena subiu sozinha a rampa pela primeira vez, olhou para trás e bateu palmas.'],
      ['Hora da história.', 'Ana Luísa pediu "A casa sonolenta" de novo e completou o final junto com a professora.'],
      ['Aula de música.', 'Pedro descobriu que o chocalho fazia mais barulho quando sacudia forte, e passou a tocar forte e fraco.'],
      ['Alimentação.', 'Laura comeu sozinha com a colher, do começo ao fim do almoço, e mostrou o prato vazio sorrindo.'],
      ['Projeto horta.', 'Theo regou a horta e encontrou uma joaninha. Chamou os colegas: "Olha, ela tem bolinha!".'],
    ];
    let y = 2.4;
    const c1 = 2.35, c2 = CW - c1 - 0.15;
    text(s, 'GENÉRICA', { x: M, y, w: c1, h: 0.25, fontSize: 9, bold: true, color: C.coral, charSpacing: 2 });
    text(s, 'QUE CONTA', { x: M + c1 + 0.15, y, w: c2, h: 0.25, fontSize: 9, bold: true, color: C.mint, charSpacing: 2 });
    y += 0.35;
    for (const [a, b] of pares) {
      const h = 1.05;
      card(s, pres, { x: M, y, w: c1, h, fill: C.coralT, radius: 0.12 });
      card(s, pres, { x: M + c1 + 0.15, y, w: c2, h, fill: C.mintT, radius: 0.12 });
      text(s, a, { x: M + 0.2, y, w: c1 - 0.4, h, fontSize: 11, valign: 'middle', strike: 'sngStrike', color: C.ink2 });
      text(s, b, { x: M + c1 + 0.35, y, w: c2 - 0.4, h, fontSize: 10.5, valign: 'middle' });
      y += h + 0.12;
    }
    text(s, 'Dica: anote a fala no mesmo dia, no celular. Uma frase real da criança vale mais que qualquer adjetivo.', { x: M, y: y + 0.15, w: CW, h: 0.45, fontSize: 10.5, bold: true, color: C.lilac });
    foot(s, n);
  }

  // ================= CAPAS (3 turmas) =================
  pres.addSection({ title: 'Capas' });
  for (const [turma, cor] of [['Berçário', 'coral'], ['Maternal I', 'mint'], ['Maternal II', 'sky']]) {
    const s = add('Capas', C[cor + 'T']);
    dots(s, pres, W - M - 1.75, 0.6, 1.3);
    await photoSlot(s, pres, { x: 1.4, y: 1.5, w: 5.47, h: 5.47, round: true, label: 'Foto da criança' });
    text(s, 'Meu ano na creche', { x: M, y: 7.35, w: CW, h: 0.9, fontSize: 38, fontFace: FONT_HEAD, bold: true, align: 'center' });
    text(s, '[Nome da criança]', { x: M, y: 8.3, w: CW, h: 0.6, fontSize: 24, fontFace: FONT_HEAD, bold: true, color: C[cor], align: 'center' });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: W / 2 - 1.6, y: 9.15, w: 3.2, h: 0.5, fill: { color: C[cor] }, line: { color: C[cor], width: 0 }, rectRadius: 0.25 });
    text(s, `${turma} · [ano]`, { x: W / 2 - 1.6, y: 9.15, w: 3.2, h: 0.5, fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    text(s, '[Nome da escola / CMEI] · Professora [nome]', { x: M, y: 10.2, w: CW, h: 0.3, fontSize: 11, color: C.ink2, align: 'center' });
  }

  // ================= PÁGINAS DO PORTFÓLIO =================
  pres.addSection({ title: 'Páginas' });
  const header = (s, kicker, titulo, cor) => {
    text(s, kicker.toUpperCase(), { x: M, y: 0.6, w: CW, h: 0.25, fontSize: 9, bold: true, color: C[cor], charSpacing: 2 });
    text(s, titulo, { x: M, y: 0.88, w: CW - 1.2, h: 0.65, fontSize: 28, fontFace: FONT_HEAD, bold: true });
  };
  const caixaTexto = (s, x, y, w, h, placeholder, fill = C.mist) => {
    card(s, pres, { x, y, w, h, fill, radius: 0.15 });
    text(s, placeholder, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: h - 0.4, fontSize: 11, italic: true, color: C.ink2 });
  };

  { // Eu sou assim
    const s = add('Páginas');
    header(s, 'Quem eu sou', 'Eu sou assim', 'coral');
    dots(s, pres, W - M - 1.2, 0.55, 0.9);
    await photoSlot(s, pres, { x: M, y: 1.85, w: 3.2, h: 3.2, round: true, label: 'Foto' });
    const campos = [['Meu nome', '[Nome da criança]'], ['Minha idade', '[_ anos e _ meses]'], ['Minha turma', '[Turma]'], ['Como me chamam', '[Apelido]']];
    let y = 1.95;
    for (const [l, v] of campos) {
      text(s, l.toUpperCase(), { x: M + 3.55, y, w: 3.5, h: 0.22, fontSize: 8, bold: true, color: C.ink2, charSpacing: 1 });
      text(s, v, { x: M + 3.55, y: y + 0.24, w: 3.5, h: 0.4, fontSize: 15, fontFace: FONT_HEAD, bold: true, color: GRAY });
      y += 0.78;
    }
    const gostos = [['Do que eu mais gosto de brincar', 'coral'], ['Minha música ou história preferida', 'sun'], ['Meus amigos da turma', 'mint'], ['Minha comida preferida', 'sky']];
    const gw = (CW - 0.25) / 2;
    gostos.forEach(([t, cor], i) => {
      const x = M + (i % 2) * (gw + 0.25), yy = 5.4 + Math.floor(i / 2) * 1.75;
      card(s, pres, { x, y: yy, w: gw, h: 1.55, fill: C[cor + 'T'] });
      text(s, t, { x: x + 0.25, y: yy + 0.2, w: gw - 0.5, h: 0.35, fontSize: 11.5, bold: true });
      text(s, '[Escreva aqui]', { x: x + 0.25, y: yy + 0.65, w: gw - 0.5, h: 0.7, fontSize: 11, italic: true, color: C.ink2 });
    });
    card(s, pres, { x: M, y: 9.0, w: CW, h: 1.95, fill: C.lilacT });
    text(s, 'Minha mãozinha', { x: M + 0.3, y: 9.15, w: 3, h: 0.35, fontSize: 13, fontFace: FONT_HEAD, bold: true });
    text(s, 'Carimbe com tinta a mão da criança neste espaço (ou cole a foto do carimbo).', { x: M + 0.3, y: 9.5, w: 3.2, h: 0.8, fontSize: 9.5, color: C.ink2 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 3.8, y: 9.15, w: CW - 4.05, h: 1.65, fill: { color: 'FFFFFF' }, line: { color: 'CFC9E0', width: 1.5, dashType: 'dash' }, rectRadius: 0.12 });
    foot(s, n);
  }

  { // Minha turma
    const s = add('Páginas');
    header(s, 'Com quem eu convivo', 'Minha turma', 'mint');
    await photoSlot(s, pres, { x: M, y: 1.8, w: CW, h: 4.6, label: 'Foto da turma' });
    caixaTexto(s, M, 6.65, CW, 1.6, '[Nomes dos colegas da turma, separados por vírgula]', C.mintT);
    const pw = (CW - 0.25) / 2;
    await photoSlot(s, pres, { x: M, y: 8.5, w: 1.6, h: 2.2, label: 'Professora' });
    text(s, [{ text: 'Minhas professoras\n', options: { bold: true, fontFace: FONT_HEAD, fontSize: 14, breakLine: true } }, { text: '[Nome da professora] e [nome da auxiliar], que cuidaram de mim e me acompanharam em cada descoberta deste ano.', options: { italic: true, color: C.ink2 } }], { x: M + 1.9, y: 8.6, w: CW - 1.9, h: 2.0, fontSize: 11 });
    foot(s, n);
  }

  { // Minha chegada
    const s = add('Páginas');
    header(s, 'O começo', 'Minha chegada na creche', 'sun');
    await photoSlot(s, pres, { x: M, y: 1.8, w: CW * 0.58, h: 4.3, label: 'Foto dos primeiros dias' });
    await photoSlot(s, pres, { x: M + CW * 0.58 + 0.2, y: 1.8, w: CW * 0.42 - 0.2, h: 2.05, label: 'Foto' });
    await photoSlot(s, pres, { x: M + CW * 0.58 + 0.2, y: 4.05, w: CW * 0.42 - 0.2, h: 2.05, label: 'Foto' });
    caixaTexto(s, M, 6.4, CW, 2.5, '[Conte como foi a adaptação: como a criança chegou, o que a ajudou a se sentir segura, com quem criou os primeiros vínculos. Ex.: "Nos primeiros dias, Helena gostava de ficar no colo observando. Um paninho de casa ajudou a despedida, e logo ela descobriu o cesto de tesouros."]', C.sunT);
    card(s, pres, { x: M, y: 9.15, w: CW, h: 1.6, fill: C.mist });
    text(s, [{ text: 'Data de entrada: ', options: { bold: true } }, { text: '[__/__/____]', options: { color: GRAY } }, { text: '\nMinha primeira professora: ', options: { bold: true } }, { text: '[nome]', options: { color: GRAY } }], { x: M + 0.3, y: 9.15, w: CW - 0.6, h: 1.6, fontSize: 12, valign: 'middle', lineSpacingMultiple: 1.4 });
    foot(s, n);
  }

  // Uma página por campo de experiência
  const campos = [
    ['EO', 'coral', 'Eu, os amigos e a turma', 'Momentos de convivência: brincadeiras com os colegas, gestos de cuidado, combinados, amizades.', '[Ex.: "Davi consolou a amiga que chorava levando seu carrinho preferido para ela."]'],
    ['CG', 'mint', 'Meu corpo em movimento', 'Conquistas motoras e de autonomia: engatinhar, andar, correr, subir, comer sozinho, desfralde.', '[Ex.: "Helena deu os primeiros passos sozinha em outubro, no pátio, e comemorou batendo palmas."]'],
    ['TS', 'sun', 'Sons, cores e rabiscos', 'Explorações artísticas: tintas, massinha, música, instrumentos, primeiras marcas no papel.', '[Ex.: "Ana Luísa misturou as cores e disse que tinha feito o arco-íris da chuva."]'],
    ['EF', 'sky', 'Histórias, músicas e palavras', 'Linguagem e imaginação: histórias preferidas, primeiras palavras, faz de conta, conversas.', '[Ex.: "A primeira palavra de Pedro na creche foi água. Hoje ele pede: quero mais água, tia!"]'],
    ['ET', 'lilac', 'Descobrindo o mundo', 'Investigações: água, areia, plantas, bichinhos, encher e esvaziar, contar e comparar.', '[Ex.: "Theo encontrou uma joaninha na horta e passou a manhã observando por onde ela andava."]'],
  ];
  for (const [sig, cor, titulo, desc, ex] of campos) {
    const s = add('Páginas');
    card(s, pres, { x: M, y: 0.5, w: CW, h: 1.55, fill: C[cor + 'T'] });
    await iconCircle(s, pres, { x: M + 0.3, y: 0.73, d: 1.1, fill: C[cor], name: D.CAMPO_ICON[sig] });
    text(s, titulo, { x: M + 1.65, y: 0.72, w: CW - 1.9, h: 0.55, fontSize: 24, fontFace: FONT_HEAD, bold: true });
    text(s, desc, { x: M + 1.65, y: 1.27, w: CW - 1.9, h: 0.65, fontSize: 10, color: C.ink2 });
    await photoSlot(s, pres, { x: M, y: 2.3, w: CW, h: 4.0, label: 'Foto principal' });
    const pw = (CW - 0.25) / 2;
    await photoSlot(s, pres, { x: M, y: 6.5, w: pw, h: 2.2, label: 'Foto' });
    await photoSlot(s, pres, { x: M + pw + 0.25, y: 6.5, w: pw, h: 2.2, label: 'Foto ou produção' });
    caixaTexto(s, M, 8.9, CW, 1.85, ex, C[cor + 'T']);
    foot(s, n);
  }

  { // Mini-história A
    const s = add('Páginas');
    header(s, 'Mini-história', '[Título da cena]', 'sun');
    text(s, '[Nome] · [turma] · [data]', { x: M, y: 1.5, w: CW, h: 0.3, fontSize: 10.5, color: C.ink2 });
    const pw = (CW - 0.4) / 3;
    for (let k = 0; k < 3; k++) await photoSlot(s, pres, { x: M + k * (pw + 0.2), y: 2.05, w: pw, h: 3.1, label: `Foto ${k + 1}` });
    caixaTexto(s, M, 5.45, CW, 3.6, '[Conte a cena em 4 a 6 linhas, como uma pequena história: o que a criança encontrou, o que tentou, o que disse, como terminou. Ex.: "Na bacia de água morna, Helena descobriu um copo. Encheu, virou, encheu de novo. Observou a água escorrer pelos dedos e riu. Quando a colega Bia chegou perto, Helena estendeu o copo cheio e esperou."]');
    card(s, pres, { x: M, y: 9.3, w: CW, h: 1.4, fill: C.sunT });
    text(s, [{ text: 'O que essa cena revela: ', options: { bold: true } }, { text: '[Escreva em uma frase o que a criança aprendeu ou descobriu]', options: { italic: true, color: C.ink2 } }], { x: M + 0.3, y: 9.3, w: CW - 0.6, h: 1.4, fontSize: 11, valign: 'middle' });
    foot(s, n);
  }

  { // Mini-história B
    const s = add('Páginas');
    header(s, 'Mini-história', '[Título da cena]', 'sky');
    text(s, '[Nome] · [turma] · [data]', { x: M, y: 1.5, w: CW, h: 0.3, fontSize: 10.5, color: C.ink2 });
    await photoSlot(s, pres, { x: M, y: 2.05, w: CW, h: 5.1, label: 'Foto da cena' });
    caixaTexto(s, M, 7.4, CW * 0.62, 3.3, '[A história da cena, em poucas linhas, com uma fala da criança entre aspas.]', C.skyT);
    card(s, pres, { x: M + CW * 0.62 + 0.2, y: 7.4, w: CW * 0.38 - 0.2, h: 3.3, fill: C.ink });
    text(s, [{ text: 'Fala da criança\n', options: { bold: true, color: C.sun, fontSize: 10, breakLine: true } }, { text: '"[escreva aqui a fala]"', options: { color: 'FFFFFF', fontSize: 16, fontFace: FONT_HEAD } }], { x: M + CW * 0.62 + 0.45, y: 7.4, w: CW * 0.38 - 0.7, h: 3.3, valign: 'middle' });
    foot(s, n);
  }

  { // Minhas produções
    const s = add('Páginas');
    header(s, 'Feito por mim', 'Minhas produções', 'lilac');
    const pw = (CW - 0.25) / 2, ph = 3.85;
    for (let k = 0; k < 4; k++) {
      const x = M + (k % 2) * (pw + 0.25), y = 1.8 + Math.floor(k / 2) * (ph + 0.65);
      await photoSlot(s, pres, { x, y, w: pw, h: ph, label: 'Desenho, pintura ou modelagem' });
      text(s, [{ text: '[__/__] ', options: { bold: true, color: C.lilac } }, { text: '[O que a criança disse sobre a produção]', options: { italic: true, color: C.ink2 } }], { x, y: y + ph + 0.08, w: pw, h: 0.5, fontSize: 10 });
    }
    foot(s, n);
  }

  { // Minhas conquistas
    const s = add('Páginas');
    header(s, 'Eu consegui', 'Minhas conquistas do ano', 'sun');
    text(s, 'Marque e escreva as conquistas da criança. Cada uma no seu tempo: aqui só se celebra, nunca se compara.', { x: M, y: 1.55, w: CW, h: 0.55, fontSize: 11, color: C.ink2 });
    const itens = ['[Ex.: Dei meus primeiros passos sozinho]', '[Ex.: Falei minhas primeiras palavras]', '[Ex.: Comi sozinho com a colher]', '[Ex.: Fiz um amigo especial]', '[Ex.: Deixei a fralda]', '[Ex.: Contei uma história]', '[Conquista]', '[Conquista]'];
    let y = 2.3;
    for (let i = 0; i < itens.length; i++) {
      const h = 0.92, cor = ['coral', 'mint', 'sun', 'sky', 'lilac'][i % 5];
      card(s, pres, { x: M, y, w: CW, h, fill: C[cor + 'T'], radius: 0.14 });
      await iconCircle(s, pres, { x: M + 0.2, y: y + 0.17, d: 0.58, fill: C[cor], name: 'PiStar' });
      text(s, itens[i], { x: M + 1.0, y, w: CW - 2.6, h, fontSize: 12, italic: true, color: C.ink2, valign: 'middle' });
      text(s, '__/__', { x: W - M - 1.35, y, w: 1.15, h, fontSize: 12, bold: true, color: C[cor], align: 'right', valign: 'middle' });
      y += h + 0.12;
    }
    foot(s, n);
  }

  { // Recado da professora
    const s = add('Páginas', C.coralT);
    card(s, pres, { x: M, y: 0.55, w: CW, h: H - 1.1, fill: 'FFFFFF', shadow: true });
    dots(s, pres, W - M - 1.65, 0.85, 1.0);
    text(s, 'UM RECADO PARA VOCÊ', { x: M + 0.45, y: 0.95, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.coral, charSpacing: 2 });
    text(s, 'Querido(a) [Nome],', { x: M + 0.45, y: 1.25, w: CW - 2.4, h: 0.7, fontSize: 26, fontFace: FONT_HEAD, bold: true, color: GRAY });
    text(s, '[Escreva um recado carinhoso para a criança, para ser lido pela família em voz alta: o que você mais vai lembrar deste ano, uma conquista que te emocionou, um desejo para o próximo ano.]\n\n[Ex.: "Que alegria foi ver você descobrindo o mundo neste ano! Vou lembrar sempre do dia em que você deu seus primeiros passos no pátio e bateu palmas para si mesma. Continue curiosa assim!"]', { x: M + 0.45, y: 2.25, w: CW - 0.9, h: 6.4, fontSize: 13, italic: true, color: C.ink2, lineSpacingMultiple: 1.2 });
    await photoSlot(s, pres, { x: M + 0.45, y: 8.8, w: 1.5, h: 1.5, round: true, label: 'Professora' });
    text(s, [{ text: 'Com carinho,\n', options: { breakLine: true } }, { text: '[Nome da professora]', options: { bold: true, fontFace: FONT_HEAD, fontSize: 16, color: C.coral } }], { x: M + 2.2, y: 8.9, w: CW - 2.6, h: 1.3, fontSize: 12, valign: 'middle' });
  }

  { // Recado da família
    const s = add('Páginas');
    header(s, 'Para a família escrever', 'Um recado da família', 'mint');
    text(s, 'Esta página é da família: um recado para a criança, ou para a creche, sobre este ano.', { x: M, y: 1.55, w: CW, h: 0.5, fontSize: 11, color: C.ink2 });
    card(s, pres, { x: M, y: 2.25, w: CW, h: 7.4, fill: C.mintT });
    for (let l = 0; l < 14; l++) s.addShape(pres.shapes.LINE, { x: M + 0.35, y: 2.85 + l * 0.48, w: CW - 0.7, h: 0, line: { color: 'FFFFFF', width: 1.5 } });
    text(s, 'Assinatura: ______________________________     Data: ___/___/______', { x: M, y: 9.95, w: CW, h: 0.35, fontSize: 11, color: C.ink2 });
    foot(s, n);
  }

  { // Certificado
    const s = add('Páginas', C.sunT);
    card(s, pres, { x: M, y: 0.55, w: CW, h: H - 1.1, fill: 'FFFFFF', shadow: true });
    const cc = [{ x: M + 0.35, y: 0.9, d: 0.5, c: C.coral }, { x: M + 0.95, y: 0.95, d: 0.3, c: C.sun }, { x: W - M - 0.85, y: 0.9, d: 0.5, c: C.sky }, { x: W - M - 1.25, y: 0.95, d: 0.3, c: C.mint }, { x: W / 2 - 0.15, y: 10.35, d: 0.3, c: C.lilac }];
    for (const c of cc) s.addShape(pres.shapes.OVAL, { x: c.x, y: c.y, w: c.d, h: c.d, fill: { color: c.c }, line: { color: c.c, width: 0 } });
    text(s, 'CERTIFICADO', { x: M, y: 1.7, w: CW, h: 0.4, fontSize: 14, bold: true, color: C.coral, charSpacing: 6, align: 'center' });
    text(s, 'Concluí mais uma etapa!', { x: M, y: 2.2, w: CW, h: 0.8, fontSize: 32, fontFace: FONT_HEAD, bold: true, align: 'center' });
    await photoSlot(s, pres, { x: W / 2 - 1.3, y: 3.3, w: 2.6, h: 2.6, round: true, label: 'Foto' });
    text(s, 'Certificamos que', { x: M, y: 6.2, w: CW, h: 0.35, fontSize: 13, color: C.ink2, align: 'center' });
    text(s, '[Nome da criança]', { x: M, y: 6.6, w: CW, h: 0.7, fontSize: 30, fontFace: FONT_HEAD, bold: true, color: GRAY, align: 'center' });
    text(s, 'viveu com alegria, curiosidade e muitas descobertas a turma do [Berçário / Maternal I / Maternal II] no ano de [____].', { x: M + 0.6, y: 7.45, w: CW - 1.2, h: 0.9, fontSize: 13, align: 'center' });
    const sw = 2.6;
    for (const [k, l] of [[0, 'Professora'], [1, 'Direção / Coordenação']]) {
      const x = k === 0 ? M + 0.5 : W - M - 0.5 - sw;
      s.addShape(pres.shapes.LINE, { x, y: 9.3, w: sw, h: 0, line: { color: C.ink2, width: 0.75 } });
      text(s, l, { x, y: 9.38, w: sw, h: 0.3, fontSize: 10, color: C.ink2, align: 'center' });
    }
    text(s, '[Nome da escola / CMEI] · [cidade], [data]', { x: M, y: 9.85, w: CW, h: 0.3, fontSize: 10, color: C.ink2, align: 'center' });
  }

  { // Contracapa do portfólio
    const s = add('Páginas', C.ink);
    dots(s, pres, W / 2 - 0.65, 2.4, 1.2);
    text(s, 'Fim de um ano cheio de descobertas.', { x: M + 0.4, y: 4.0, w: CW - 0.8, h: 1.8, fontSize: 30, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF', align: 'center' });
    text(s, 'Que venham muitas outras!', { x: M, y: 5.9, w: CW, h: 0.5, fontSize: 16, color: 'E9E6F5', align: 'center' });
    text(s, '[Nome da escola / CMEI] · [ano]', { x: M, y: 10.4, w: CW, h: 0.3, fontSize: 10, color: 'B9B4D3', align: 'center' });
  }

  // ================= ENCERRAMENTO =================
  pres.addSection({ title: 'Encerramento' });
  D.closingPage(pres, 'Encerramento', require('./content/fontes').ENCERRAMENTOS.portfolio);
  n += 1;

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile, n, 'páginas');
}

main(process.argv[2] || '../../portfolio-fim-de-ano/Portfolio de Fim de Ano.pptx').catch((e) => { console.error(e); process.exit(1); });
