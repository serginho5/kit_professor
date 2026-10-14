// Página de encerramento de cada arquivo: mensagem de despedida + fontes consultadas na elaboração.

const F = {
  ldb: 'BRASIL. Lei nº 9.394/1996 (LDB), art. 31, com redação da Lei nº 12.796/2013.',
  dcnei: 'BRASIL. CNE/CEB. Resolução nº 5/2009. Diretrizes Curriculares Nacionais para a Educação Infantil.',
  bncc: 'BRASIL. MEC. Base Nacional Comum Curricular: Educação Infantil. Brasília: MEC, 2017.',
  indicadores: 'BRASIL. MEC. Indicadores da Qualidade na Educação Infantil. Brasília: MEC/SEB, 2009.',
  praticas: 'BRASIL. MEC. Práticas cotidianas na Educação Infantil: bases para a reflexão sobre as orientações curriculares. Brasília: MEC/SEB, 2009.',
  caderneta: 'BRASIL. Ministério da Saúde. Caderneta da Criança (edição vigente).',
  cdc: 'CDC (Centers for Disease Control and Prevention, EUA). Learn the Signs. Act Early: marcos do desenvolvimento.',
  hoffmann: 'HOFFMANN, J. Avaliação e educação infantil: um olhar sensível e reflexivo sobre a criança. Porto Alegre: Mediação.',
  reggio: 'EDWARDS, C.; GANDINI, L.; FORMAN, G. As cem linguagens da criança. Porto Alegre: Artmed.',
  fochi: 'FOCHI, P. Afinal, o que os bebês fazem no berçário? Porto Alegre: Penso, 2015.',
  falk: 'FALK, J. (org.). Educar os três primeiros anos: a experiência de Lóczy. Araraquara: Junqueira & Marin.',
  autores: 'PIAGET, J.; VYGOTSKY, L. S.; WALLON, H. (obras citadas nas Referências do Guia Pedagógico).',
};

const ENCERRAMENTOS = {
  guia: {
    titulo: 'Cada relatório é a história de uma criança contada por quem a acompanhou de perto.',
    texto: 'Obrigada por chegar até aqui. As frases e os modelos deste kit são pontos de partida: o que torna o relatório verdadeiro é o seu olhar, com os fatos, as falas e as conquistas que só você presenciou.',
    fontes: [F.ldb, F.dcnei, F.bncc, F.indicadores, F.caderneta, F.cdc, F.hoffmann, F.reggio, F.fochi, F.falk, F.autores],
    nota: 'A lista completa e comentada está na página de Referências deste guia.',
  },
  modelos: {
    titulo: 'Agora é com você: cada modelo ganha vida com o seu olhar.',
    texto: 'Os modelos e os exemplos mostram a estrutura, o tom e a extensão de um bom relatório. Preencha com cenas, falas e conquistas reais de cada criança e passe o checklist do guia antes de entregar. As crianças dos exemplos são fictícias.',
    fontes: [F.ldb, F.dcnei, F.bncc, F.praticas, F.hoffmann, F.reggio, F.fochi],
    nota: 'Estrutura em seis blocos e linguagem baseadas no Guia Pedagógico do kit.',
  },
  fichas: {
    titulo: 'Quem registra um pouco todo dia escreve com tranquilidade no fim do semestre.',
    texto: 'Imprima as fichas quantas vezes precisar e deixe-as à mão na sala. Cinco minutos por dia, cinco crianças por vez: no fim do semestre, você terá material de sobra para relatórios ricos e verdadeiros.',
    fontes: [F.dcnei, F.bncc, F.indicadores, F.caderneta, F.cdc, F.hoffmann, F.fochi, F.falk],
    nota: 'A Ficha 5 (marcos) é referência para celebrar conquistas, nunca instrumento de comparação ou diagnóstico.',
  },
  banco: {
    titulo: 'As palavras certas ajudam. O seu olhar é o que torna cada relatório único.',
    texto: 'Use as frases como ponto de partida, nunca como texto final. Troque [NOME], ajuste a concordância e acrescente sempre um fato ou uma fala real da criança. Assim, cada família reconhece o próprio filho no relatório.',
    fontes: [F.bncc, F.ldb, F.dcnei, F.hoffmann, F.caderneta, F.fochi, F.falk, F.praticas],
    nota: 'Os textos dos objetivos de aprendizagem foram transcritos da BNCC (2017). As frases descritivas são autorais, elaboradas a partir dessas fontes.',
  },
  portfolio: {
    marca: 'Portfólio de Fim de Ano da Creche',
    titulo: 'Um portfólio guarda o ano que a família não pôde ver de perto.',
    texto: 'Cada foto com legenda, cada desenho datado e cada recado transformam a rotina da creche em memória. Monte o portfólio aos poucos ao longo do semestre e entregue-o junto com o relatório: é o presente que as famílias guardam para sempre.',
    fontes: [F.dcnei, F.bncc, F.reggio, F.fochi, F.hoffmann, F.indicadores, F.praticas],
    nota: 'Use fotos das crianças apenas com autorização de uso de imagem assinada pela família, conforme a política da sua instituição.',
  },
  reuniao: {
    marca: 'Kit Reunião de Entrega dos Relatórios',
    titulo: 'A reunião é o momento em que o relatório vira conversa.',
    texto: 'Quando a família entende como a creche observa, registra e cuida, o relatório deixa de ser um papel e vira parceria. Prepare o encontro com calma, escute mais do que fala e termine sempre com um combinado para o próximo semestre.',
    fontes: [F.ldb, F.dcnei, F.bncc, F.indicadores, F.praticas, F.hoffmann],
    nota: 'Conversas sobre dificuldades ou sinais de atenção devem ser individuais e combinadas antes com a coordenação.',
  },
  apresentacao: {
    marca: 'Kit Reunião de Entrega dos Relatórios',
    titulo: 'Obrigada por caminharem com a gente.',
    texto: 'Substitua as fotos e os textos pelos momentos da sua turma. Projete na reunião ou envie em PDF para as famílias que não puderam comparecer.',
    fontes: [F.ldb, F.dcnei, F.bncc, F.indicadores],
    nota: 'Mostre fotos das crianças apenas com autorização de uso de imagem das famílias.',
  },
};

module.exports = { ENCERRAMENTOS };
