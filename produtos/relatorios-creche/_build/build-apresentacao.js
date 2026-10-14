// Order bump 2 (parte 16:9): apresentação da turma para projetar na reunião, editável no Canva.
const pptxgen = process.env.PREVIEW ? require('./preview') : require('pptxgenjs');
const D = require('./design');
const { C, FONT_HEAD, text, iconCircle, card, photoSlot } = D;
const W = 13.333, H = 7.5, M = 0.7, CW = W - 2 * M;
const GRAY = 'A9A4BF';
const { ENCERRAMENTOS } = require('./content/fontes');

function dots(s, pres, x, y, k = 1) {
  const set = [[0, 0, 0.5, C.coral], [0.62, 0.15, 0.32, C.sun], [0.2, 0.62, 0.36, C.mint], [0.72, 0.6, 0.24, C.sky], [1.05, 0.28, 0.2, C.lilac]];
  for (const [dx, dy, d, c] of set) s.addShape(pres.shapes.OVAL, { x: x + dx * k, y: y + dy * k, w: d * k, h: d * k, fill: { color: c }, line: { color: c, width: 0 } });
}
function head(s, kicker, t, cor) {
  text(s, kicker.toUpperCase(), { x: M, y: 0.5, w: CW, h: 0.3, fontSize: 11, bold: true, color: C[cor], charSpacing: 2 });
  text(s, t, { x: M, y: 0.8, w: CW, h: 0.8, fontSize: 36, fontFace: FONT_HEAD, bold: true });
}
const foot = (s, n) => {
  text(s, 'Reunião de famílias · Turma [nome]', { x: M, y: H - 0.42, w: 6, h: 0.22, fontSize: 10, color: C.ink2 });
  text(s, String(n), { x: W - M - 0.6, y: H - 0.42, w: 0.6, h: 0.22, fontSize: 10, bold: true, color: C.ink2, align: 'right' });
};

async function main(outFile) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = 'Apresentação da turma · Reunião de famílias';
  pres.author = 'Kit Reunião de Entrega dos Relatórios';
  pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: D.FONT_BODY };
  let n = 0;
  const add = (bg = C.paper) => { n += 1; const s = pres.addSlide(); s.background = { color: bg }; return s; };

  { // 1. Capa
    const s = add(C.ink);
    dots(s, pres, M, 0.8, 1.4);
    text(s, 'Reunião de famílias', { x: M, y: 2.6, w: 7.2, h: 1.2, fontSize: 54, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Turma [nome da turma] · [1º/2º] semestre de [ano]', { x: M, y: 3.9, w: 7.2, h: 0.5, fontSize: 22, color: 'E9E6F5' });
    text(s, '[Nome da escola / CMEI] · Professora [nome]', { x: M, y: 6.4, w: 7.2, h: 0.4, fontSize: 14, color: 'B9B4D3' });
    await photoSlot(s, pres, { x: 8.4, y: 1.0, w: 4.2, h: 5.5, label: 'Foto da turma', fill: '3A3660' });
  }
  { // 2. Boas-vindas e pauta
    const s = add();
    head(s, 'Sejam bem-vindos', 'O que vamos conversar hoje', 'coral');
    const itens = [['Como foi o semestre da turma', 'coral', 'PiSun'], ['O que as crianças viveram e aprenderam', 'sun', 'PiStar'], ['Como acompanhamos cada criança', 'mint', 'PiEye'], ['Entrega dos relatórios', 'sky', 'PiFileText'], ['Próximos passos', 'lilac', 'PiArrowRight']];
        for (let i = 0; i < itens.length; i++) {
      const [t, cor, ic] = itens[i], x = M + i * ((CW - 0.8) / 5 + 0.2), w = (CW - 0.8) / 5;
      card(s, pres, { x, y: 2.1, w, h: 4.4, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: x + 0.3, y: 2.45, d: 0.95, fill: C[cor], name: ic });
      text(s, t, { x: x + 0.25, y: 3.75, w: w - 0.5, h: 2.0, fontSize: 15.5, fontFace: FONT_HEAD, bold: true });
    }
    foot(s, n);
  }
  { // 3. Nossa turma
    const s = add();
    head(s, 'Quem somos', 'Nossa turma', 'mint');
    await photoSlot(s, pres, { x: M, y: 1.9, w: 7.4, h: 4.8, label: 'Foto da turma' });
    const nums = [['[14]', 'crianças'], ['[1 a 2]', 'anos de idade'], ['[2]', 'educadoras']];
    nums.forEach(([v, l], i) => {
      const y = 1.9 + i * 1.65;
      card(s, pres, { x: 8.4, y, w: CW - 7.7, h: 1.45, fill: [C.mintT, C.sunT, C.skyT][i] });
      text(s, v, { x: 8.7, y, w: 2.0, h: 1.45, fontSize: 36, fontFace: FONT_HEAD, bold: true, color: GRAY, valign: 'middle' });
      text(s, l, { x: 10.6, y, w: CW - 10.1, h: 1.45, fontSize: 18, valign: 'middle' });
    });
    foot(s, n);
  }
  { // 4. Nossa rotina
    const s = add();
    head(s, 'Um dia na creche', 'Nossa rotina', 'sun');
    const mom = [['[7h30]', 'Chegada e acolhida', 'coral'], ['[8h30]', 'Lanche', 'sun'], ['[9h]', 'Brincadeiras e propostas', 'mint'], ['[10h30]', 'Pátio', 'sky'], ['[11h]', 'Almoço', 'lilac'], ['[12h]', 'Descanso', 'coral'], ['[14h30]', 'Lanche e brincar livre', 'sun'], ['[16h30]', 'Saída', 'mint']];
    const w = (CW - 0.15 * 7) / 8;
    s.addShape(pres.shapes.LINE, { x: M, y: 3.35, w: CW, h: 0, line: { color: C.line, width: 3 } });
    mom.forEach(([h, t, cor], i) => {
      const x = M + i * (w + 0.15);
      s.addShape(pres.shapes.OVAL, { x: x + w / 2 - 0.25, y: 3.1, w: 0.5, h: 0.5, fill: { color: C[cor] }, line: { color: 'FFFFFF', width: 3 } });
      text(s, h, { x, y: 2.35, w, h: 0.5, fontSize: 16, bold: true, color: C[cor], align: 'center' });
      card(s, pres, { x, y: 3.95, w, h: 2.1, fill: C[cor + 'T'] });
      text(s, t, { x: x + 0.08, y: 3.95, w: w - 0.16, h: 2.1, fontSize: 12.5, bold: true, align: 'center', valign: 'middle' });
    });
    text(s, 'Na creche, cuidar e educar andam juntos: alimentação, sono e higiene também são momentos de aprendizagem.', { x: M, y: 6.35, w: CW, h: 0.45, fontSize: 14, italic: true, color: C.ink2 });
    foot(s, n);
  }
  { // 5. O que vivemos
    const s = add();
    head(s, 'O semestre', 'O que a turma viveu e aprendeu', 'sky');
    const cs = [['EO', 'coral', 'Convivência', '[Ex.: aprendemos a dividir brinquedos e a cuidar dos amigos]'], ['CG', 'mint', 'Movimento', '[Ex.: muitos deram os primeiros passos e já sobem a rampa]'], ['TS', 'sun', 'Artes e música', '[Ex.: pintamos com tintas naturais e criamos instrumentos]'], ['EF', 'sky', 'Linguagem', '[Ex.: as histórias preferidas e as primeiras palavras]'], ['ET', 'lilac', 'Descobertas', '[Ex.: projeto água: encher, esvaziar, transbordar]']];
    const w = (CW - 0.8) / 5;
    for (let i = 0; i < 5; i++) {
      const [sig, cor, t, ex] = cs[i], x = M + i * (w + 0.2);
      card(s, pres, { x, y: 1.95, w, h: 4.75, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: x + 0.3, y: 2.25, d: 0.9, fill: C[cor], name: D.CAMPO_ICON[sig] });
      text(s, t, { x: x + 0.3, y: 3.35, w: w - 0.6, h: 0.9, fontSize: 17, fontFace: FONT_HEAD, bold: true });
      text(s, ex, { x: x + 0.3, y: 4.3, w: w - 0.6, h: 2.5, fontSize: 13, italic: true, color: C.ink2 });
    }
    foot(s, n);
  }
  { // 6. Momentos do semestre
    const s = add();
    head(s, 'Em fotos', 'Momentos do semestre', 'coral');
    const w = (CW - 0.6) / 4;
    for (let i = 0; i < 4; i++) {
      const x = M + i * (w + 0.2);
      await photoSlot(s, pres, { x, y: 1.95, w, h: 3.7, label: `Foto ${i + 1}` });
      text(s, '[Legenda: o que as crianças estavam descobrindo]', { x, y: 5.8, w, h: 0.8, fontSize: 12.5, italic: true, color: C.ink2 });
    }
    foot(s, n);
  }
  { // 7. Como acompanhamos
    const s = add();
    head(s, 'Avaliação na creche', 'Como acompanhamos cada criança', 'mint');
    const st = [['PiEye', 'Observamos', 'Todos os dias, nas brincadeiras, nas refeições, no pátio: o que cada criança faz, diz e descobre.', 'coral'], ['PiNotePencil', 'Registramos', 'Anotações, falas, fotos e produções, organizadas pelos cinco campos de experiência da BNCC.', 'sun'], ['PiFileText', 'Contamos', 'No relatório, contamos o percurso de cada criança: suas conquistas e os próximos passos.', 'mint']];
    const w = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [ic, t, d, cor] = st[i], x = M + i * (w + 0.3);
      card(s, pres, { x, y: 1.95, w, h: 3.7, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: x + 0.35, y: 2.3, d: 1.0, fill: C[cor], name: ic });
      text(s, t, { x: x + 0.35, y: 3.5, w: w - 0.7, h: 0.6, fontSize: 24, fontFace: FONT_HEAD, bold: true });
      text(s, d, { x: x + 0.35, y: 4.15, w: w - 0.7, h: 1.4, fontSize: 14, color: C.ink2 });
    }
    card(s, pres, { x: M, y: 5.9, w: CW, h: 0.85, fill: C.ink });
    text(s, 'Na Educação Infantil não há nota nem reprovação: a avaliação acompanha o desenvolvimento de cada criança (LDB, art. 31).', { x: M + 0.35, y: 5.9, w: CW - 0.7, h: 0.85, fontSize: 15, color: 'FFFFFF', valign: 'middle' });
    foot(s, n);
  }
  { // 8. Como ler o relatório
    const s = add();
    head(s, 'O relatório', 'Como ler o relatório do seu filho', 'lilac');
    const bl = [['Chegada e vínculos', 'coral'], ['Relações e convivência', 'coral'], ['Corpo, movimento e cuidados', 'mint'], ['Linguagens e expressão', 'sky'], ['Explorações e descobertas', 'lilac'], ['Conquistas e próximos passos', 'sun']];
    const w = (CW - 0.4) / 3;
    bl.forEach(([t, cor], i) => {
      const x = M + (i % 3) * (w + 0.2), y = 1.95 + Math.floor(i / 3) * 2.05;
      card(s, pres, { x, y, w, h: 1.85, fill: C[cor + 'T'] });
      s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.55, w: 0.75, h: 0.75, fill: { color: C[cor] }, line: { color: C[cor], width: 0 } });
      text(s, String(i + 1), { x: x + 0.3, y: y + 0.55, w: 0.75, h: 0.75, fontSize: 22, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      text(s, t, { x: x + 1.3, y, w: w - 1.5, h: 1.85, fontSize: 19, fontFace: FONT_HEAD, bold: true, valign: 'middle' });
    });
    text(s, 'Cada criança é comparada apenas com ela mesma. Os códigos entre parênteses (ex.: EI02EO04) indicam os objetivos da BNCC.', { x: M, y: 6.15, w: CW, h: 0.6, fontSize: 14, italic: true, color: C.ink2 });
    foot(s, n);
  }
  { // 9. Parceria
    const s = add();
    head(s, 'Família e creche', 'Como vocês podem ajudar em casa', 'sun');
    const d = [['PiBookOpenText', 'Leiam juntos', 'Uma história antes de dormir, todos os dias.', 'coral'], ['PiHandHeart', 'Deixem fazer sozinho', 'Comer, tirar o sapato, guardar os brinquedos.', 'mint'], ['PiChatCircleText', 'Conversem sobre o dia', 'Perguntem do que brincou e com quem.', 'sky'], ['PiMoon', 'Mantenham a rotina', 'Horários de sono e alimentação parecidos com os da creche.', 'lilac']];
    const w = (CW - 0.6) / 4;
    for (let i = 0; i < 4; i++) {
      const [ic, t, tx, cor] = d[i], x = M + i * (w + 0.2);
      card(s, pres, { x, y: 1.95, w, h: 4.7, fill: C[cor + 'T'] });
      await iconCircle(s, pres, { x: x + 0.3, y: 2.3, d: 1.0, fill: C[cor], name: ic });
      text(s, t, { x: x + 0.3, y: 3.5, w: w - 0.6, h: 0.9, fontSize: 21, fontFace: FONT_HEAD, bold: true });
      text(s, tx, { x: x + 0.3, y: 4.45, w: w - 0.6, h: 1.8, fontSize: 15, color: C.ink2 });
    }
    foot(s, n);
  }
  { // 10. Próximos passos
    const s = add();
    head(s, 'O que vem por aí', 'Próximos passos e datas', 'sky');
    const it = [['[dd/mm]', '[Ex.: festa de encerramento]', 'coral'], ['[dd/mm]', '[Ex.: último dia de aula]', 'sun'], ['[dd/mm]', '[Ex.: início do próximo semestre]', 'mint'], ['[dd/mm]', '[Ex.: entrega do portfólio]', 'sky']];
    it.forEach(([d, t, cor], i) => {
      const y = 1.95 + i * 1.18;
      card(s, pres, { x: M, y, w: 7.4, h: 1.0, fill: C[cor + 'T'] });
      text(s, d, { x: M + 0.3, y, w: 1.6, h: 1.0, fontSize: 20, fontFace: FONT_HEAD, bold: true, color: C[cor], valign: 'middle' });
      text(s, t, { x: M + 2.0, y, w: 5.2, h: 1.0, fontSize: 16, italic: true, color: C.ink2, valign: 'middle' });
    });
    card(s, pres, { x: 8.4, y: 1.95, w: CW - 7.7, h: 4.55, fill: C.ink });
    text(s, [{ text: 'No próximo semestre\n', options: { bold: true, color: C.sun, fontSize: 16, breakLine: true } }, { text: '[O que a equipe pretende propor para a turma: projetos, novas experiências, focos de observação.]', options: { color: 'FFFFFF', fontSize: 16, italic: true } }], { x: 8.75, y: 1.95, w: CW - 8.4, h: 4.55, valign: 'middle' });
    foot(s, n);
  }
  { // 11. Obrigada + fontes
    const s = add(C.ink);
    const e = ENCERRAMENTOS.apresentacao;
    dots(s, pres, M, 0.7, 1.3);
    text(s, e.titulo, { x: M, y: 2.2, w: 7.0, h: 1.8, fontSize: 40, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
    text(s, 'Agora é a vez de vocês: dúvidas, perguntas e conversas.', { x: M, y: 4.15, w: 7.0, h: 0.8, fontSize: 20, color: 'E9E6F5' });
    card(s, pres, { x: 8.2, y: 0.9, w: CW - 7.5, h: 5.7, fill: '3A3660' });
    text(s, 'FONTES DESTA APRESENTAÇÃO', { x: 8.5, y: 1.15, w: CW - 8.1, h: 0.3, fontSize: 10, bold: true, color: C.sun, charSpacing: 1.5 });
    text(s, e.fontes.map((f, i) => ({ text: f, options: { breakLine: i < e.fontes.length - 1, paraSpaceAfter: 6 } })), { x: 8.5, y: 1.6, w: CW - 8.1, h: 3.6, fontSize: 11, color: 'E9E6F5' });
    text(s, e.nota, { x: 8.5, y: 5.4, w: CW - 8.1, h: 0.9, fontSize: 10.5, italic: true, color: 'B9B4D3' });
    text(s, `${e.marca} · Material de apoio pedagógico para uso individual. Proibida a revenda.`, { x: M, y: 6.85, w: CW, h: 0.3, fontSize: 9.5, color: 'B9B4D3' });
  }

  await pres.writeFile({ fileName: outFile });
  console.log('ok', outFile, n, 'slides');
}

main(process.argv[2] || '../../reuniao-entrega-relatorios/02 - Apresentacao da Turma (16x9).pptx').catch((e) => { console.error(e); process.exit(1); });
