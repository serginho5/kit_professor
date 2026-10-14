// Versões ALTERNATIVAS em Word dos order bumps (Portfólio e Reunião). O recomendado é o Canva.
const fs = require('fs');
const path = require('path');
const { Packer } = require('docx');
const W = require('./word-kit');
const { K, INK, INK2, GRAY, run, para, gap, pageBreak, cell, row, table, box, spacer, photo, photoRow, capa, header, encerramento, campos, pautado, grade, doc, AlignmentType, VerticalAlign } = W;
const { ENCERRAMENTOS } = require('./content/fontes');
const CAMPOS = { EO: 'O eu, o outro e o nós', CG: 'Corpo, gestos e movimentos', TS: 'Traços, sons, cores e formas', EF: 'Escuta, fala, pensamento e imaginação', ET: 'Espaços, tempos, quantidades, relações e transformações' };
const ph = (t, o = {}) => run(t, { italic: true, color: INK2, ...o }); // texto de orientação (cinza)

// =====================================================================
// PORTFÓLIO
// =====================================================================
function portfolio() {
  W.setLandscape(false);
  const PW = W.pw(), c = [];
  c.push(...capa('Kit Relatórios da Creche · Complemento', 'Portfólio de fim de ano', 'Versão Word e Google Docs das páginas do portfólio: capas, páginas da criança, campos de experiência, mini-histórias, conquistas, recados e certificado.', 'Portfolio de Fim de Ano.pptx', [
    'Como montar o portfólio e legendas que contam',
    '3 capas (Berçário, Maternal I e Maternal II)',
    'Eu sou assim · Minha turma · Minha chegada · 5 campos de experiência',
    '2 mini-histórias · Produções · Conquistas · Recados · Certificado',
    'Para usar: clique dentro das caixas tracejadas "FOTO" e use Inserir > Imagem. Troque os textos entre colchetes.',
  ]));

  // Como montar
  c.push(...header('Comece por aqui', 'Como montar o portfólio', 'coral'));
  c.push(para(run('As Diretrizes Curriculares Nacionais pedem que a creche produza documentação que permita às famílias conhecer o trabalho da instituição e o percurso de cada criança (Resolução CNE/CEB nº 5/2009, art. 10). O portfólio é essa documentação em forma de memória.', { color: INK2 }), { after: 200, line: 300 }));
  const passos = [['Guarde ao longo do semestre', 'Uma pasta no celular por criança: fotos do processo (não só do resultado), desenhos datados e falas anotadas no dia.', 'coral'], ['Escolha junto com a criança', 'No Maternal, deixe a criança escolher o desenho ou a foto preferida. Participar das escolhas também é um direito de aprendizagem.', 'mint'], ['Escreva legendas que contam', 'Uma legenda boa diz o que a criança fez, disse ou descobriu.', 'sky'], ['Monte e entregue', 'Duplique as páginas, troque fotos e textos, salve em PDF e entregue junto com o relatório.', 'sun']];
  passos.forEach(([t, d, cor]) => { c.push(box([para(run(t, { head: true, bold: true, pt: 13 }), { after: 60 }), para(run(d, { color: INK2 }), { after: 0 })], { fill: K[cor][1], pad: 200, padX: 260 })); c.push(gap(8)); });
  c.push(box([para([run('Autorização de imagem: ', { bold: true, color: 'E9A21F' }), run('use fotos das crianças apenas com autorização de uso de imagem assinada pelas famílias.', { color: 'FFFFFF' })], { after: 0 })], { fill: INK, pad: 220, padX: 260 }));

  // Legendas que contam
  c.push(...header('Antes de escrever', 'Legendas que contam', 'coral'));
  const pares = [['Pintura com guache.', 'Davi misturou o azul com o amarelo, parou e disse: "Virou verde!". Depois quis repetir com outras cores.'], ['Brincando no parque.', 'Helena subiu sozinha a rampa pela primeira vez, olhou para trás e bateu palmas.'], ['Hora da história.', 'Ana Luísa pediu "A casa sonolenta" de novo e completou o final junto com a professora.'], ['Aula de música.', 'Pedro descobriu que o chocalho fazia mais barulho quando sacudia forte, e passou a tocar forte e fraco.'], ['Alimentação.', 'Laura comeu sozinha com a colher, do começo ao fim do almoço, e mostrou o prato vazio sorrindo.'], ['Projeto horta.', 'Theo regou a horta e encontrou uma joaninha. Chamou os colegas: "Olha, ela tem bolinha!".']];
  const c1 = 3000;
  c.push(table([c1, 160, PW - c1 - 160], [row([cell([para(run('GENÉRICA', { bold: true, pt: 8.5, color: K.coral[0], sp: 30 }), { after: 0 })], c1, { pad: 40 }), spacer(160), cell([para(run('QUE CONTA', { bold: true, pt: 8.5, color: K.mint[0], sp: 30 }), { after: 0 })], PW - c1 - 160, { pad: 40 })]),
    ...pares.flatMap(([a, b]) => [row([cell([para(run(a, { strike: true, color: INK2 }), { after: 0 })], c1, { fill: K.coral[1], valign: VerticalAlign.CENTER }), spacer(160), cell([para(run(b), { after: 0 })], PW - c1 - 160, { fill: K.mint[1], valign: VerticalAlign.CENTER })]), row([spacer(c1), spacer(160), spacer(PW - c1 - 160)], { h: 120, exact: true })])]));

  // Capas
  for (const [turma, cor] of [['Berçário', 'coral'], ['Maternal I', 'mint'], ['Maternal II', 'sky']]) {
    c.push(pageBreak());
    c.push(table([PW], [row([cell([
      gap(10), photo('Foto da criança', PW - 1200, 6400), gap(14),
      para(run('Meu ano na creche', { head: true, bold: true, pt: 32 }), { align: AlignmentType.CENTER, after: 100, line: 400 }),
      para(run('[Nome da criança]', { head: true, bold: true, pt: 22, color: K[cor][0] }), { align: AlignmentType.CENTER, after: 120 }),
      para(run(`${turma} · [ano]`, { bold: true, pt: 13 }), { align: AlignmentType.CENTER, after: 120 }),
      para(run('[Nome da escola / CMEI] · Professora [nome]', { color: INK2 }), { align: AlignmentType.CENTER, after: 0 }),
    ], PW, { fill: K[cor][1], pad: 300, padX: 600 })], { h: 13800 })]));
  }

  // Eu sou assim
  c.push(...header('Quem eu sou', 'Eu sou assim', 'coral'));
  const lw = 3300;
  c.push(table([lw, 300, PW - lw - 300], [row([cell([photo('Foto', lw - 40, 3200)], lw, { pad: 0, padX: 0 }), spacer(300), cell(['Meu nome', 'Minha idade', 'Minha turma', 'Como me chamam'].flatMap((l, i) => [para(run(l.toUpperCase(), { bold: true, pt: 8, color: INK2, sp: 20 }), { after: 20 }), para(run(['[Nome da criança]', '[_ anos e _ meses]', '[Turma]', '[Apelido]'][i], { head: true, bold: true, pt: 14, color: GRAY }), { after: 160 })]), PW - lw - 300, { pad: 40 })])]));
  c.push(gap(12));
  const gw = Math.floor((PW - 200) / 2);
  const gostos = [['Do que eu mais gosto de brincar', 'coral'], ['Minha música ou história preferida', 'sun'], ['Meus amigos da turma', 'mint'], ['Minha comida preferida', 'sky']];
  const gcell = ([t, cor]) => cell([para(run(t, { bold: true }), { after: 80 }), para(ph('[Escreva aqui]'), { after: 0 })], gw, { fill: K[cor][1], pad: 180 });
  c.push(table([gw, 200, gw], [row([gcell(gostos[0]), spacer(200), gcell(gostos[1])], { h: 1500 }), row([spacer(gw), spacer(200), spacer(gw)], { h: 200, exact: true }), row([gcell(gostos[2]), spacer(200), gcell(gostos[3])], { h: 1500 })]));
  c.push(gap(12));
  c.push(table([3600, 200, PW - 3800], [row([cell([para(run('Minha mãozinha', { head: true, bold: true, pt: 13 }), { after: 60 }), para(ph('Carimbe com tinta a mão da criança neste espaço (ou cole a foto do carimbo).'), { after: 0 })], 3600, { fill: K.lilac[1], pad: 200 }), spacer(200), W.photoCell('Carimbo da mão', PW - 3800)], { h: 2000 })]));

  // Minha turma
  c.push(...header('Com quem eu convivo', 'Minha turma', 'mint'));
  c.push(photo('Foto da turma', PW, 5200)); c.push(gap(12));
  c.push(box([para(ph('[Nomes dos colegas da turma, separados por vírgula]'), { after: 0 })], { fill: K.mint[1], h: 1500, pad: 200 })); c.push(gap(12));
  c.push(table([2000, 300, PW - 2300], [row([W.photoCell('Professora', 2000), spacer(300), cell([para(run('Minhas professoras', { head: true, bold: true, pt: 14 }), { after: 80 }), para(ph('[Nome da professora] e [nome da auxiliar], que cuidaram de mim e me acompanharam em cada descoberta deste ano.'), { after: 0 })], PW - 2300)], { h: 2400 })]));

  // Minha chegada
  c.push(...header('O começo', 'Minha chegada na creche', 'sun'));
  c.push(photoRow(['Foto dos primeiros dias', 'Foto', 'Foto'], 3400)); c.push(gap(12));
  c.push(box([para(ph('[Conte como foi a adaptação: como a criança chegou, o que a ajudou a se sentir segura, com quem criou os primeiros vínculos. Ex.: "Nos primeiros dias, Helena gostava de ficar no colo observando. Um paninho de casa ajudou a despedida, e logo ela descobriu o cesto de tesouros."]'), { after: 0, line: 300 })], { fill: K.sun[1], h: 2800, pad: 220 })); c.push(gap(12));
  c.push(box([para([run('Data de entrada: ', { bold: true }), run('[__/__/____]', { color: GRAY })], { after: 80 }), para([run('Minha primeira professora: ', { bold: true }), run('[nome]', { color: GRAY })], { after: 0 })], { fill: W.MIST, pad: 220 }));

  // Campos
  const cs = [['EO', 'coral', 'Eu, os amigos e a turma', 'Momentos de convivência: brincadeiras com os colegas, gestos de cuidado, combinados, amizades.', '[Ex.: "Davi consolou a amiga que chorava levando seu carrinho preferido para ela."]'], ['CG', 'mint', 'Meu corpo em movimento', 'Conquistas motoras e de autonomia: engatinhar, andar, correr, subir, comer sozinho, desfralde.', '[Ex.: "Helena deu os primeiros passos sozinha em outubro, no pátio, e comemorou batendo palmas."]'], ['TS', 'sun', 'Sons, cores e rabiscos', 'Explorações artísticas: tintas, massinha, música, instrumentos, primeiras marcas no papel.', '[Ex.: "Ana Luísa misturou as cores e disse que tinha feito o arco-íris da chuva."]'], ['EF', 'sky', 'Histórias, músicas e palavras', 'Linguagem e imaginação: histórias preferidas, primeiras palavras, faz de conta, conversas.', '[Ex.: "A primeira palavra de Pedro na creche foi água. Hoje ele pede: quero mais água, tia!"]'], ['ET', 'lilac', 'Descobrindo o mundo', 'Investigações: água, areia, plantas, bichinhos, encher e esvaziar, contar e comparar.', '[Ex.: "Theo encontrou uma joaninha na horta e passou a manhã observando por onde ela andava."]']];
  for (const [sig, cor, t, d, ex] of cs) {
    c.push(pageBreak());
    c.push(box([para(run(`CAMPO DE EXPERIÊNCIA · ${sig} · ${CAMPOS[sig]}`, { bold: true, pt: 8, color: K[cor][0], sp: 20 }), { after: 60 }), para(run(t, { head: true, bold: true, pt: 22 }), { after: 60, line: 320 }), para(run(d, { color: INK2, pt: 10 }), { after: 0 })], { fill: K[cor][1], pad: 220, padX: 280 }));
    c.push(gap(12)); c.push(photo('Foto principal', PW, 4400)); c.push(gap(12));
    c.push(photoRow(['Foto', 'Foto ou produção'], 2500)); c.push(gap(12));
    c.push(box([para(ph(ex), { after: 0 })], { fill: K[cor][1], h: 1800, pad: 220 }));
  }

  // Mini-história A
  c.push(...header('Mini-história', '[Título da cena]', 'sun'));
  c.push(para(run('[Nome] · [turma] · [data]', { color: INK2 }), { after: 140 }));
  c.push(photoRow(['Foto 1', 'Foto 2', 'Foto 3'], 3300)); c.push(gap(12));
  c.push(box([para(ph('[Conte a cena em 4 a 6 linhas, como uma pequena história: o que a criança encontrou, o que tentou, o que disse, como terminou. Ex.: "Na bacia de água morna, Helena descobriu um copo. Encheu, virou, encheu de novo. Observou a água escorrer pelos dedos e riu."]'), { after: 0, line: 300 })], { fill: W.MIST, h: 3600, pad: 220 })); c.push(gap(12));
  c.push(box([para([run('O que essa cena revela: ', { bold: true }), ph('[Escreva em uma frase o que a criança aprendeu ou descobriu]')], { after: 0 })], { fill: K.sun[1], pad: 220 }));

  // Mini-história B
  c.push(...header('Mini-história', '[Título da cena]', 'sky'));
  c.push(para(run('[Nome] · [turma] · [data]', { color: INK2 }), { after: 140 }));
  c.push(photo('Foto da cena', PW, 5600)); c.push(gap(12));
  const mw = Math.floor(PW * 0.6);
  c.push(table([mw, 200, PW - mw - 200], [row([cell([para(ph('[A história da cena, em poucas linhas, com uma fala da criança entre aspas.]'), { after: 0 })], mw, { fill: K.sky[1], pad: 220 }), spacer(200), cell([para(run('Fala da criança', { bold: true, color: 'E9A21F', pt: 10 }), { after: 80 }), para(run('"[escreva aqui a fala]"', { head: true, pt: 16, color: 'FFFFFF' }), { after: 0 })], PW - mw - 200, { fill: INK, pad: 260, valign: VerticalAlign.CENTER })], { h: 3400 })]));

  // Produções
  c.push(...header('Feito por mim', 'Minhas produções', 'lilac'));
  for (let k = 0; k < 2; k++) {
    c.push(photoRow(['Desenho, pintura ou modelagem', 'Desenho, pintura ou modelagem'], 4600));
    const hw = Math.floor((PW - 200) / 2);
    c.push(table([hw, 200, hw], [row([cell([para([run('[__/__] ', { bold: true, color: K.lilac[0] }), ph('[O que a criança disse sobre a produção]')], { after: 0 })], hw, { pad: 60, padX: 0 }), spacer(200), cell([para([run('[__/__] ', { bold: true, color: K.lilac[0] }), ph('[O que a criança disse sobre a produção]')], { after: 0 })], hw, { pad: 60, padX: 0 })])]));
    c.push(gap(10));
  }

  // Conquistas
  c.push(...header('Eu consegui', 'Minhas conquistas do ano', 'sun'));
  c.push(para(run('Cada conquista no seu tempo: aqui só se celebra, nunca se compara.', { color: INK2 }), { after: 160 }));
  const itens = ['[Ex.: Dei meus primeiros passos sozinho]', '[Ex.: Falei minhas primeiras palavras]', '[Ex.: Comi sozinho com a colher]', '[Ex.: Fiz um amigo especial]', '[Ex.: Deixei a fralda]', '[Ex.: Contei uma história]', '[Conquista]', '[Conquista]'];
  const cores = ['coral', 'mint', 'sun', 'sky', 'lilac'];
  c.push(table([PW - 1400, 1400], itens.flatMap((t, i) => [row([cell([para([run('★  ', { bold: true, color: K[cores[i % 5]][0], pt: 13 }), ph(t, { pt: 11 })], { after: 0 })], PW - 1400, { fill: K[cores[i % 5]][1], valign: VerticalAlign.CENTER }), cell([para(run('__/__', { bold: true, color: K[cores[i % 5]][0] }), { align: AlignmentType.RIGHT, after: 0 })], 1400, { fill: K[cores[i % 5]][1], valign: VerticalAlign.CENTER })], { h: 820 }), row([spacer(PW - 1400), spacer(1400)], { h: 110, exact: true })])));

  // Recado da professora
  c.push(pageBreak());
  c.push(table([PW], [row([cell([
    para(run('UM RECADO PARA VOCÊ', { bold: true, pt: 9, color: K.coral[0], sp: 40 }), { after: 80 }),
    para(run('Querido(a) [Nome],', { head: true, bold: true, pt: 24, color: GRAY }), { after: 240 }),
    para(ph('[Escreva um recado carinhoso para a criança, para ser lido pela família em voz alta: o que você mais vai lembrar deste ano, uma conquista que te emocionou, um desejo para o próximo ano.]', { pt: 12.5 }), { after: 200, line: 340 }),
    para(ph('[Ex.: "Que alegria foi ver você descobrindo o mundo neste ano! Vou lembrar sempre do dia em que você deu seus primeiros passos no pátio e bateu palmas para si mesma. Continue curiosa assim!"]', { pt: 12.5 }), { after: 1600, line: 340 }),
    para(run('Com carinho,'), { after: 40 }),
    para(run('[Nome da professora]', { head: true, bold: true, pt: 16, color: K.coral[0] }), { after: 0 }),
  ], PW, { fill: K.coral[1], pad: 460, padX: 500 })], { h: 13800 })]));

  // Recado da família
  c.push(...header('Para a família escrever', 'Um recado da família', 'mint'));
  c.push(para(run('Esta página é da família: um recado para a criança, ou para a creche, sobre este ano.', { color: INK2 }), { after: 160 }));
  c.push(pautado('Recado', 16, 'mint', 460)); c.push(gap(12));
  c.push(para(run('Assinatura: ______________________________     Data: ___/___/______', { color: INK2 }), { after: 0 }));

  // Certificado
  c.push(pageBreak());
  c.push(table([PW], [row([cell([
    para(run('CERTIFICADO', { bold: true, pt: 14, color: K.coral[0], sp: 120 }), { align: AlignmentType.CENTER, before: 200, after: 120 }),
    para(run('Concluí mais uma etapa!', { head: true, bold: true, pt: 30 }), { align: AlignmentType.CENTER, after: 240, line: 400 }),
    photo('Foto', 3200, 3000),
    para(run('Certificamos que', { color: INK2, pt: 12 }), { align: AlignmentType.CENTER, before: 240, after: 80 }),
    para(run('[Nome da criança]', { head: true, bold: true, pt: 28, color: GRAY }), { align: AlignmentType.CENTER, after: 160 }),
    para(run('viveu com alegria, curiosidade e muitas descobertas a turma do [Berçário / Maternal I / Maternal II] no ano de [____].', { pt: 12.5 }), { align: AlignmentType.CENTER, after: 1000, line: 320 }),
    para(run('_______________________________          _______________________________', { color: INK2 }), { align: AlignmentType.CENTER, after: 40 }),
    para(run('Professora                                                    Direção / Coordenação', { color: INK2, pt: 9.5 }), { align: AlignmentType.CENTER, after: 200 }),
    para(run('[Nome da escola / CMEI] · [cidade], [data]', { color: INK2, pt: 10 }), { align: AlignmentType.CENTER, after: 0 }),
  ], PW, { fill: K.sun[1], pad: 400, padX: 600 })], { h: 13800 })]));

  c.push(...encerramento(ENCERRAMENTOS.portfolio));
  return doc(c, 'Portfólio de Fim de Ano da Creche (versão Word)');
}

// =====================================================================
// REUNIÃO: guia e documentos
// =====================================================================
function reuniao() {
  W.setLandscape(false);
  const PW = W.pw(), c = [];
  c.push(...capa('Kit Relatórios da Creche · Complemento', 'Reunião de entrega dos relatórios', 'Versão Word e Google Docs do guia da reunião e dos documentos para imprimir.', '01 - Guia e Documentos da Reuniao.pptx', [
    'Roteiro de 40 minutos e como conversar com as famílias',
    'Frases para conversas delicadas',
    'Convite A4 e convites-bilhete · Pauta · Lista de presença',
    'Recibos de entrega · Registro da conversa individual',
    'Avaliação da reunião · Bilhete de agradecimento',
  ]));

  c.push(...header('Guia da reunião', 'Roteiro de 40 minutos', 'sky'));
  c.push(para(run('A LDB (art. 31) pede que a creche documente o desenvolvimento das crianças, e as Diretrizes Curriculares (Resolução CNE/CEB nº 5/2009, art. 10) pedem que essa documentação permita às famílias conhecer o trabalho da instituição. A reunião de entrega é o momento em que o relatório vira conversa.', { color: INK2 }), { after: 200, line: 300 }));
  const et = [['5 min', 'Acolhida', 'Receba as famílias pelo nome, com música da turma tocando e fotos expostas. Passe a lista de presença.', 'coral'], ['10 min', 'A turma no semestre', 'Projete a apresentação: rotina, o que a turma viveu em cada campo de experiência, fotos dos momentos.', 'sun'], ['5 min', 'Como acompanhamos cada criança', 'Explique como a equipe observa e registra, e como ler o relatório (seis blocos, sem nota, sem comparação).', 'mint'], ['15 min', 'Entrega e conversa individual', 'Entregue o relatório em envelope, em conversas curtas. Assuntos delicados ficam para um horário individual.', 'sky'], ['5 min', 'Encerramento', 'Agradeça, apresente os próximos passos e entregue a avaliação da reunião.', 'lilac']];
  c.push(table([1300, PW - 1300], et.flatMap(([t, n, d, cor]) => [row([cell([para(run(t, { bold: true, color: K[cor][0], pt: 12 }), { after: 0 })], 1300, { fill: K[cor][1], valign: VerticalAlign.CENTER }), cell([para(run(n, { head: true, bold: true, pt: 13 }), { after: 40 }), para(run(d, { color: INK2, pt: 10 }), { after: 0 })], PW - 1300, { fill: K[cor][1] })]), row([spacer(1300), spacer(PW - 1300)], { h: 120, exact: true })])));
  c.push(box([para([run('Leve impresso: ', { bold: true, color: 'E9A21F' }), run('lista de presença, pauta, relatórios em envelopes, recibos de entrega e avaliações.', { color: 'FFFFFF' })], { after: 0 })], { fill: INK, pad: 200, padX: 260 }));

  c.push(...header('Guia da reunião', 'Como conversar com as famílias', 'sky'));
  c.push(para(run('Os Indicadores da Qualidade na Educação Infantil (MEC, 2009) dedicam uma dimensão inteira à cooperação e troca com as famílias.', { color: INK2 }), { after: 200 }));
  const pr = [['Comece pelo que a criança conquistou', 'A família precisa reconhecer o próprio filho no que você conta. Abra sempre com uma cena bonita e verdadeira.', 'coral'], ['Descreva fatos, não rótulos', '"Ele tem mordido nos momentos de disputa" em vez de "ele é agressivo". Fatos abrem conversa; rótulos fecham.', 'mint'], ['Escute mais do que fala', 'Pergunte como a criança é em casa. A família conhece a criança de um jeito que a creche não vê.', 'sun'], ['Nunca compare crianças', 'Nem com colegas, nem com irmãos. Compare a criança com ela mesma no início do semestre.', 'sky'], ['Combine um próximo passo', 'Termine com algo concreto para casa e para a creche.', 'lilac'], ['Delicado é individual', 'Preocupações sobre desenvolvimento são conversadas a sós, com a coordenação, nunca na roda.', 'coral']];
  pr.forEach(([t, d, cor], i) => { c.push(box([para(run(`${i + 1}. ${t}`, { head: true, bold: true, pt: 13 }), { after: 60 }), para(run(d, { color: INK2 }), { after: 0 })], { fill: K[cor][1], pad: 180, padX: 240 })); c.push(gap(8)); });

  c.push(...header('Guia da reunião', 'Frases para conversas delicadas', 'sky'));
  const fr = [['Mordidas', '"Nesta fase, muitas crianças ainda usam a boca quando faltam palavras. Temos acompanhado de perto e oferecido alternativas, e as situações estão diminuindo. Em casa, vocês têm notado algo parecido?"'], ['Adaptação e choro', '"O choro na despedida mostra o vínculo forte que ela tem com vocês. Depois da chegada, ela se acalma e participa. Despedidas curtas e sempre do mesmo jeito ajudam muito."'], ['Desfralde', '"Ele tem dado sinais de interesse pelo banheiro. Que tal combinarmos de começar juntos, no tempo dele, sem pressa?"'], ['Alimentação', '"Ela tem experimentado novos alimentos aos poucos. Oferecemos de novo, sem pressão. Quais ela come bem em casa?"'], ['Fala', '"Ele se comunica muito por gestos e algumas palavras, e entende tudo o que dizemos. Conversar e ler juntos em casa ajuda bastante."'], ['Sinal de atenção', 'Nunca na roda. Marque uma conversa individual com a coordenação: "Observamos algumas situações e gostaríamos de conversar com calma com vocês."']];
  c.push(table([2300, PW - 2300], fr.flatMap(([t, f]) => { const d = t === 'Sinal de atenção', cor = d ? 'coral' : 'sky'; return [row([cell([para(run(t, { head: true, bold: true, pt: 12, color: 'FFFFFF' }), { after: 0 })], 2300, { fill: K[cor][0], valign: VerticalAlign.CENTER }), cell([para(run(f, { italic: !d }), { after: 0, line: 290 })], PW - 2300, { fill: K[cor][1], valign: VerticalAlign.CENTER })]), row([spacer(2300), spacer(PW - 2300)], { h: 120, exact: true })]; })));

  // Convite A4
  c.push(pageBreak());
  const iw = Math.floor((PW - 1000 - 400) / 3);
  c.push(table([PW], [row([cell([
    para(run('CONVITE', { bold: true, pt: 13, color: K.sky[0], sp: 120 }), { align: AlignmentType.CENTER, before: 400, after: 160 }),
    para(run('Venha conhecer o semestre do seu filho!', { head: true, bold: true, pt: 30 }), { align: AlignmentType.CENTER, after: 240, line: 400 }),
    para(run('Queridas famílias da turma [nome da turma], convidamos vocês para a reunião de entrega dos relatórios. Vamos mostrar as descobertas da turma e conversar sobre o desenvolvimento de cada criança.', { pt: 12.5, color: INK2 }), { align: AlignmentType.CENTER, after: 400, line: 320 }),
    table([iw, 200, iw, 200, iw], [row([['Data', '[dia/mês]', 'coral'], null, ['Horário', '[00h00]', 'sun'], null, ['Local', '[sala / escola]', 'mint']].map((x, i) => x ? cell([para(run(x[0], { bold: true, color: INK2 }), { align: AlignmentType.CENTER, after: 60 }), para(run(x[1], { head: true, bold: true, pt: 15, color: GRAY }), { align: AlignmentType.CENTER, after: 0 })], iw, { fill: K[x[2]][1], pad: 300 }) : spacer(200)))]),
    para(run('A presença de vocês é muito importante para nós!', { head: true, bold: true, pt: 14, color: K.sky[0] }), { align: AlignmentType.CENTER, before: 500, after: 120 }),
    para(run('Com carinho, equipe da turma [nome] · [Nome da escola / CMEI]', { color: INK2 }), { align: AlignmentType.CENTER, after: 0 }),
  ], PW, { fill: 'FFFFFF', pad: 300, padX: 500 })], { h: 13600 })]));

  // Convites-bilhete
  c.push(pageBreak());
  const bilhete = (cor) => box([
    para(run('Convite para a família', { head: true, bold: true, pt: 18 }), { after: 40 }),
    para(run('Reunião de entrega dos relatórios', { color: INK2 }), { after: 220 }),
    para([run('Família de: ', { bold: true }), run('_____________________________________________', { color: GRAY })], { after: 160 }),
    para(run('Venham conhecer as descobertas da turma e receber o relatório do semestre do seu filho. Contamos com vocês!'), { after: 200, line: 300 }),
    para([run('Data: ', { bold: true }), run('[___/___]', { color: GRAY }), run('     Horário: ', { bold: true }), run('[__h__]', { color: GRAY }), run('     Local: ', { bold: true }), run('[__________]', { color: GRAY })], { after: 220 }),
    para(run('Equipe da turma [nome]', { head: true, bold: true, pt: 13, color: K[cor][0] }), { after: 0 }),
  ], { fill: K[cor][1], pad: 360, padX: 400, h: 6400 });
  c.push(bilhete('sun')); c.push(para(run('✂  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', { color: GRAY }), { before: 160, after: 160 })); c.push(bilhete('mint'));

  // Pauta
  c.push(...header('Para as famílias', 'Pauta da reunião', 'sun'));
  c.push(para(run('[Nome da escola / CMEI] · Turma [nome] · [data]', { color: INK2 }), { after: 200 }));
  const pt = [['Boas-vindas e apresentação da equipe', 'coral'], ['Como foi o semestre da turma', 'sun'], ['Como acompanhamos e avaliamos cada criança', 'mint'], ['Entrega dos relatórios e conversas individuais', 'sky'], ['Próximos passos e datas importantes', 'lilac'], ['Avaliação da reunião', 'coral']];
  c.push(table([800, PW - 800], pt.flatMap(([t, cor], i) => [row([cell([para(run(String(i + 1), { head: true, bold: true, pt: 16, color: 'FFFFFF' }), { align: AlignmentType.CENTER, after: 0 })], 800, { fill: K[cor][0], valign: VerticalAlign.CENTER }), cell([para(run(t, { bold: true, pt: 13 }), { after: 0 })], PW - 800, { fill: K[cor][1], valign: VerticalAlign.CENTER, pad: 200 })]), row([spacer(800), spacer(PW - 800)], { h: 120, exact: true })])));
  c.push(pautado('Anotações', 4, 'sky'));

  // Lista de presença
  c.push(...header('Documento', 'Lista de presença', 'mint'));
  c.push(para(run('[Nome da escola / CMEI] · Turma [nome] · Data: ___/___/______', { color: INK2 }), { after: 160 }));
  c.push(grade([600, 3200, 3300, PW - 7100], ['#', 'Criança', 'Responsável presente', 'Assinatura'], 'mint', 25, 460, (r) => [String(r + 1)]));

  // Recibos
  c.push(pageBreak());
  const recibo = () => box([
    para(run('Recibo de entrega do relatório', { head: true, bold: true, pt: 16 }), { after: 120 }),
    para([run('Recebi o relatório descritivo de desenvolvimento e aprendizagem do '), run('[1º/2º]', { color: GRAY }), run(' semestre de '), run('[ano]', { color: GRAY }), run(' referente à criança:')], { after: 380 }),
    para(run('______________________________________________________________', { color: INK2 }), { after: 20 }),
    para(run('Nome da criança', { pt: 8.5, color: INK2 }), { after: 380 }),
    para(run('_______________________________________          ___/___/______', { color: INK2 }), { after: 20 }),
    para(run('Assinatura do responsável                                                              Data', { pt: 8.5, color: INK2 }), { after: 0 }),
  ], { fill: W.MIST, pad: 280, padX: 340 });
  for (let k = 0; k < 3; k++) { c.push(recibo()); if (k < 2) c.push(para(run('✂  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', { color: GRAY }), { before: 100, after: 100 })); }

  // Registro individual
  c.push(...header('Para a professora', 'Registro da conversa individual', 'lilac'));
  c.push(...campos(['CRIANÇA', 'RESPONSÁVEL', 'DATA']));
  for (const [t, cor] of [['Pontos destacados no relatório', 'coral'], ['O que a família contou sobre a criança em casa', 'mint'], ['Dúvidas ou preocupações da família', 'sun'], ['Combinados (creche e família)', 'sky']]) { c.push(pautado(t, 3, cor, 400)); c.push(gap(8)); }
  c.push(para(run('Precisa de acompanhamento da coordenação?   ☐ Não   ☐ Sim  →  data combinada: ___/___', { bold: true }), { before: 100, after: 0 }));

  // Avaliação
  c.push(pageBreak());
  const aval = (cor) => box([
    para(run('Como foi a reunião para você?', { head: true, bold: true, pt: 17 }), { after: 60 }),
    para(run('Sua opinião ajuda a melhorar os próximos encontros. Não precisa se identificar.', { color: INK2, pt: 10 }), { after: 200 }),
    ...['Entendi como a creche acompanha meu filho.', 'O relatório me ajudou a conhecer o semestre dele.', 'Tive espaço para tirar minhas dúvidas.'].map((q) => para([run(q + '   '), run('☐ Sim   ☐ Em parte   ☐ Não', { color: INK2 })], { after: 140 })),
    para(run('Um recado para a equipe:', { bold: true }), { before: 100, after: 300 }),
    para(run('__________________________________________________________________', { color: 'B9B4D3' }), { after: 200 }),
    para(run('__________________________________________________________________', { color: 'B9B4D3' }), { after: 0 }),
  ], { fill: K[cor][1], pad: 320, padX: 380, h: 6300 });
  c.push(aval('sky')); c.push(para(run('✂  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', { color: GRAY }), { before: 160, after: 160 })); c.push(aval('lilac'));

  // Agradecimento
  c.push(pageBreak());
  const obrig = (cor) => box([
    para(run('Obrigada, família!', { head: true, bold: true, pt: 26 }), { after: 200, line: 360 }),
    para(run('Foi muito bom ter vocês na reunião. Seguimos juntos cuidando e acompanhando cada descoberta de [nome da criança]. Qualquer dúvida, estamos à disposição.', { pt: 12.5 }), { after: 500, line: 320 }),
    para(run('Com carinho, equipe da turma [nome]', { head: true, bold: true, pt: 14, color: K.coral[0] }), { after: 0 }),
  ], { fill: K[cor][1], pad: 400, padX: 440, h: 6300 });
  c.push(obrig('sun')); c.push(para(run('✂  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', { color: GRAY }), { before: 160, after: 160 })); c.push(obrig('coral'));

  c.push(...encerramento(ENCERRAMENTOS.reuniao));
  return doc(c, 'Kit Reunião de Entrega dos Relatórios · Guia e documentos (versão Word)');
}

// =====================================================================
// REUNIÃO: apresentação da turma (páginas horizontais)
// =====================================================================
function apresentacao() {
  W.setLandscape(true);
  const PW = W.pw(), c = [];
  const slide = (kicker, titulo, cor, first) => [
    ...(first ? [] : [pageBreak()]),
    para(run(kicker.toUpperCase(), { bold: true, pt: 10, color: K[cor][0], sp: 40 }), { after: 40 }),
    para(run(titulo, { head: true, bold: true, pt: 28 }), { after: 200, line: 380 }),
  ];
  // capa + aviso
  c.push(para(run('KIT REUNIÃO DE ENTREGA DOS RELATÓRIOS', { bold: true, pt: 10, color: K.coral[0], sp: 60 }), { before: 200, after: 120 }));
  c.push(para(run('Apresentação da turma', { head: true, bold: true, pt: 30 }), { after: 200, line: 400 }));
  c.push(W.avisoCanva('02 - Apresentacao da Turma (16x9).pptx'));
  c.push(para(run('Para projetar na reunião, apresente direto do Canva ou do PowerPoint. Esta versão serve para preparar os textos ou imprimir.', { italic: true, color: INK2 }), { before: 200, after: 0 }));

  c.push(...slide('Reunião de famílias', 'Turma [nome da turma] · [1º/2º] semestre de [ano]', 'coral'));
  c.push(table([Math.floor(PW * 0.55), 300, PW - Math.floor(PW * 0.55) - 300], [row([cell([para(run('Reunião de famílias', { head: true, bold: true, pt: 36, color: 'FFFFFF' }), { after: 200, line: 460 }), para(run('[Nome da escola / CMEI] · Professora [nome]', { color: 'E9E6F5' }), { after: 0 })], Math.floor(PW * 0.55), { fill: INK, pad: 400, padX: 400, valign: VerticalAlign.CENTER }), spacer(300), W.photoCell('Foto da turma', PW - Math.floor(PW * 0.55) - 300)], { h: 5400 })]));

  const cartoes = (itens, h = 3600) => { const g = 160, w = Math.floor((PW - g * (itens.length - 1)) / itens.length), cols = [], cells = []; itens.forEach(([t, d, cor], i) => { if (i) { cols.push(g); cells.push(spacer(g)); } cols.push(w); cells.push(cell([para(run(t, { head: true, bold: true, pt: 15 }), { after: 100, line: 320 }), ...(d ? [para(run(d, { color: INK2, pt: 11 }), { after: 0 })] : [])], w, { fill: K[cor][1], pad: 240 })); }); return table(cols, [row(cells, { h })]); };

  c.push(...slide('Sejam bem-vindos', 'O que vamos conversar hoje', 'coral'));
  c.push(cartoes([['Como foi o semestre da turma', '', 'coral'], ['O que as crianças viveram e aprenderam', '', 'sun'], ['Como acompanhamos cada criança', '', 'mint'], ['Entrega dos relatórios', '', 'sky'], ['Próximos passos', '', 'lilac']], 3000));

  c.push(...slide('Quem somos', 'Nossa turma', 'mint'));
  const tw = Math.floor(PW * 0.58);
  c.push(table([tw, 300, PW - tw - 300], [row([W.photoCell('Foto da turma', tw), spacer(300), cell([['[14]', 'crianças', 'mint'], ['[1 a 2]', 'anos de idade', 'sun'], ['[2]', 'educadoras', 'sky']].flatMap(([v, l, cor]) => [para([run(v + '  ', { head: true, bold: true, pt: 28, color: GRAY }), run(l, { pt: 14 })], { after: 200 })]), PW - tw - 300, { fill: K.mint[1], pad: 300, valign: VerticalAlign.CENTER })], { h: 5000 })]));

  c.push(...slide('Um dia na creche', 'Nossa rotina', 'sun'));
  const mom = [['[7h30]', 'Chegada e acolhida'], ['[8h30]', 'Lanche'], ['[9h]', 'Brincadeiras e propostas'], ['[10h30]', 'Pátio'], ['[11h]', 'Almoço'], ['[12h]', 'Descanso'], ['[14h30]', 'Lanche e brincar livre'], ['[16h30]', 'Saída']];
  const mc = ['coral', 'sun', 'mint', 'sky', 'lilac', 'coral', 'sun', 'mint'];
  c.push(cartoes(mom.map(([h, t], i) => [h, t, mc[i]]), 2600));
  c.push(para(run('Na creche, cuidar e educar andam juntos: alimentação, sono e higiene também são momentos de aprendizagem.', { italic: true, color: INK2 }), { before: 200, after: 0 }));

  c.push(...slide('O semestre', 'O que a turma viveu e aprendeu', 'sky'));
  c.push(cartoes([['Convivência', '[Ex.: aprendemos a dividir brinquedos e a cuidar dos amigos]', 'coral'], ['Movimento', '[Ex.: muitos deram os primeiros passos e já sobem a rampa]', 'mint'], ['Artes e música', '[Ex.: pintamos com tintas naturais e criamos instrumentos]', 'sun'], ['Linguagem', '[Ex.: as histórias preferidas e as primeiras palavras]', 'sky'], ['Descobertas', '[Ex.: projeto água: encher, esvaziar, transbordar]', 'lilac']], 4200));

  c.push(...slide('Em fotos', 'Momentos do semestre', 'coral'));
  c.push(photoRow(['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4'], 3800));
  c.push(para(ph('[Legendas: o que as crianças estavam descobrindo em cada foto]'), { before: 160, after: 0 }));

  c.push(...slide('Avaliação na creche', 'Como acompanhamos cada criança', 'mint'));
  c.push(cartoes([['Observamos', 'Todos os dias, nas brincadeiras, nas refeições, no pátio: o que cada criança faz, diz e descobre.', 'coral'], ['Registramos', 'Anotações, falas, fotos e produções, organizadas pelos cinco campos de experiência da BNCC.', 'sun'], ['Contamos', 'No relatório, contamos o percurso de cada criança: suas conquistas e os próximos passos.', 'mint']], 3400));
  c.push(gap(12)); c.push(box([para(run('Na Educação Infantil não há nota nem reprovação: a avaliação acompanha o desenvolvimento de cada criança (LDB, art. 31).', { color: 'FFFFFF', pt: 13 }), { after: 0 })], { fill: INK, pad: 220, padX: 300 }));

  c.push(...slide('O relatório', 'Como ler o relatório do seu filho', 'lilac'));
  const bl = [['1. Chegada e vínculos', '', 'coral'], ['2. Relações e convivência', '', 'coral'], ['3. Corpo, movimento e cuidados', '', 'mint'], ['4. Linguagens e expressão', '', 'sky'], ['5. Explorações e descobertas', '', 'lilac'], ['6. Conquistas e próximos passos', '', 'sun']];
  c.push(cartoes(bl.slice(0, 3), 1500)); c.push(gap(10)); c.push(cartoes(bl.slice(3), 1500));
  c.push(para(run('Cada criança é comparada apenas com ela mesma. Os códigos entre parênteses (ex.: EI02EO04) indicam os objetivos da BNCC.', { italic: true, color: INK2 }), { before: 200, after: 0 }));

  c.push(...slide('Família e creche', 'Como vocês podem ajudar em casa', 'sun'));
  c.push(cartoes([['Leiam juntos', 'Uma história antes de dormir, todos os dias.', 'coral'], ['Deixem fazer sozinho', 'Comer, tirar o sapato, guardar os brinquedos.', 'mint'], ['Conversem sobre o dia', 'Perguntem do que brincou e com quem.', 'sky'], ['Mantenham a rotina', 'Horários de sono e alimentação parecidos com os da creche.', 'lilac']], 3800));

  c.push(...slide('O que vem por aí', 'Próximos passos e datas', 'sky'));
  const lw = Math.floor(PW * 0.55);
  c.push(table([lw, 300, PW - lw - 300], [row([cell(['[Ex.: festa de encerramento]', '[Ex.: último dia de aula]', '[Ex.: início do próximo semestre]', '[Ex.: entrega do portfólio]'].map((t, i) => para([run('[dd/mm]   ', { head: true, bold: true, pt: 15, color: K[['coral', 'sun', 'mint', 'sky'][i]][0] }), ph(t, { pt: 12 })], { after: 220 })), lw, { fill: W.MIST, pad: 300 }), spacer(300), cell([para(run('No próximo semestre', { bold: true, color: 'E9A21F', pt: 13 }), { after: 120 }), para(ph('[O que a equipe pretende propor para a turma: projetos, novas experiências, focos de observação.]', { color: 'FFFFFF', pt: 13 }), { after: 0 })], PW - lw - 300, { fill: INK, pad: 340, valign: VerticalAlign.CENTER })], { h: 4200 })]));

  c.push(...encerramento(ENCERRAMENTOS.apresentacao));
  return doc(c, 'Kit Reunião de Entrega dos Relatórios · Apresentação (versão Word)', { landscape: true });
}

(async () => {
  const base = path.join('..', '..');
  const out = [
    [path.join(base, 'portfolio-fim-de-ano', 'Word (alternativo)'), 'Portfolio de Fim de Ano (versao Word).docx', portfolio],
    [path.join(base, 'reuniao-entrega-relatorios', 'Word (alternativo)'), '01 - Guia e Documentos da Reuniao (versao Word).docx', reuniao],
    [path.join(base, 'reuniao-entrega-relatorios', 'Word (alternativo)'), '02 - Apresentacao da Turma (versao Word).docx', apresentacao],
  ];
  for (const [dir, nome, fn] of out) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, nome), await Packer.toBuffer(fn()));
    console.log('ok', path.join(dir, nome));
  }
})().catch((e) => { console.error(e); process.exit(1); });
