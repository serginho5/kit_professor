// Conteúdo do Guia Pedagógico (fundamentação, observação, escrita).

const LEIS = [
  {
    doc: 'LDB · Lei nº 9.394/1996, art. 31',
    resumo: 'Na Educação Infantil, a avaliação é feita por meio do acompanhamento e do registro do desenvolvimento das crianças, sem o objetivo de promoção, e a instituição deve expedir documentação que permita atestar os processos de desenvolvimento e aprendizagem de cada criança (redação dada pela Lei nº 12.796/2013).',
    pratica: 'O relatório é a principal forma de cumprir essa exigência: ele documenta o processo de cada criança.',
  },
  {
    doc: 'DCNEI · Resolução CNE/CEB nº 5/2009, art. 10',
    resumo: 'As Diretrizes Curriculares Nacionais para a Educação Infantil determinam que a avaliação aconteça sem seleção, promoção ou classificação, por meio da observação crítica e criativa das brincadeiras e interações, do uso de múltiplos registros (relatórios, fotografias, desenhos, álbuns), da continuidade dos processos nas transições e de documentação que permita às famílias conhecer o trabalho da instituição.',
    pratica: 'Observar no cotidiano, registrar de várias formas e comunicar às famílias.',
  },
  {
    doc: 'BNCC · Educação Infantil (2017)',
    resumo: 'A Base Nacional Comum Curricular organiza a Educação Infantil em dois eixos estruturantes (interações e brincadeira), seis direitos de aprendizagem e cinco campos de experiência, com objetivos de aprendizagem por faixa etária. Indica que o acompanhamento das aprendizagens se dê por observação da trajetória de cada criança e do grupo, com registros variados, sem intenção de classificação.',
    pratica: 'Os campos de experiência e os objetivos são a "lente" para organizar o que você observou.',
  },
];

const AVALIACAO_E = [
  'Acompanhar o percurso de cada criança ao longo do tempo',
  'Descrever o que a criança faz, diz e descobre',
  'Comparar a criança com ela mesma',
  'Revelar conquistas e apontar próximos passos',
  'Mostrar a intencionalidade do trabalho da professora',
  'Um documento que a família lê com emoção',
];
const AVALIACAO_NAO = [
  'Dar nota, conceito, aprovar ou reprovar',
  'Listar o que a criança "não sabe" ou "não faz"',
  'Comparar com os colegas ou com um padrão',
  'Rotular ("agressivo", "tímido", "hiperativo")',
  'Diagnosticar ou levantar hipóteses clínicas',
  'Um texto genérico, igual para todas as crianças',
];

const TEORICOS = [
  {
    nome: 'Jussara Hoffmann',
    ideia: 'Avaliação mediadora',
    texto: 'Avaliar na Educação Infantil é acompanhar a criança com um olhar sensível e reflexivo, para conhecê-la melhor e planejar ações educativas a partir do que ela revela. O relatório deve contar a história singular de cada criança, e não uma lista de comportamentos.',
    pratica: 'Escreva sobre a criança real, com fatos e cenas, e diga o que você fará a partir disso.',
  },
  {
    nome: 'Loris Malaguzzi e a abordagem de Reggio Emilia',
    ideia: 'Documentação pedagógica',
    texto: 'A criança é potente, competente e se expressa por "cem linguagens". Documentar (fotografar, anotar falas, guardar produções) torna visível o pensamento da criança e permite que a professora reflita sobre a própria prática.',
    pratica: 'Use falas da criança, fotos com legenda e mini-histórias como matéria-prima do relatório.',
  },
  {
    nome: 'Emmi Pikler e o Instituto Lóczy',
    ideia: 'Movimento livre e cuidado como relação',
    texto: 'O bebê é ativo e capaz de conquistar o próprio desenvolvimento motor, se tiver liberdade, segurança e tempo. Os momentos de cuidado (troca, banho, alimentação) são momentos privilegiados de relação, nos quais o adulto antecipa os gestos e convida o bebê a participar.',
    pratica: 'Valorize as conquistas motoras no tempo de cada criança e descreva os cuidados como aprendizagem.',
  },
  {
    nome: 'Henri Wallon',
    ideia: 'Afetividade, emoção e movimento',
    texto: 'Na criança pequena, emoção, movimento e pensamento são inseparáveis. A afetividade é a base do desenvolvimento, e o movimento é uma das primeiras formas de expressão e comunicação.',
    pratica: 'Descreva como a criança expressa emoções com o corpo e como se dão os vínculos.',
  },
  {
    nome: 'Lev Vygotsky',
    ideia: 'Mediação e zona de desenvolvimento proximal',
    texto: 'A aprendizagem acontece nas interações com pessoas mais experientes. Aquilo que a criança faz hoje com ajuda é o que ela fará sozinha amanhã, e é ali que a ação do professor tem mais potência.',
    pratica: 'O que a criança faz "com o apoio do adulto" é o seu próximo passo, não uma falta.',
  },
  {
    nome: 'Jean Piaget',
    ideia: 'Construção do conhecimento pela ação',
    texto: 'De 0 a 2 anos (período sensório-motor), a criança conhece o mundo pela ação e pelos sentidos: explora objetos, descobre causa e efeito e constrói a noção de permanência do objeto. A partir dos 2 anos, surge a função simbólica: faz de conta, imitação diferida e linguagem.',
    pratica: 'Encher, esvaziar, derrubar e esconder são pesquisas, não bagunça. Descreva-as assim.',
  },
];

const FAIXAS = [
  { cod: 'EI01', nome: 'Bebês', idade: 'zero a 1 ano e 6 meses', turmas: 'Berçário I e II (conforme a rede)', cor: 'coral' },
  { cod: 'EI02', nome: 'Crianças bem pequenas', idade: '1 ano e 7 meses a 3 anos e 11 meses', turmas: 'Maternal I e II / Infantil 2 e 3', cor: 'mint' },
  { cod: 'EI03', nome: 'Crianças pequenas', idade: '4 anos a 5 anos e 11 meses', turmas: 'Pré-escola (fora deste kit)', cor: 'sky' },
];

// Marcos de desenvolvimento: referência geral, não checklist diagnóstico.
const MARCOS = [
  { idade: '0 a 6 meses', mov: 'Sustenta a cabeça; rola; leva as mãos e objetos à boca', ling: 'Sorriso social; arrulhos e vocalizações; vira-se em direção aos sons', socio: 'Acalma-se com a voz e o colo de quem cuida; reconhece pessoas próximas', cog: 'Acompanha objetos com o olhar; explora com a boca e as mãos' },
  { idade: '6 a 12 meses', mov: 'Senta sem apoio; arrasta-se ou engatinha; fica de pé com apoio; pinça os dedos', ling: 'Balbucia sílabas repetidas ("mamama"); responde ao nome; dá tchau', socio: 'Estranha pessoas desconhecidas; brinca de esconder e achar', cog: 'Procura objeto escondido; bate, sacode e joga objetos para ver o efeito' },
  { idade: '12 a 18 meses', mov: 'Anda sozinho; empilha 2 a 3 blocos; rabisca', ling: 'Primeiras palavras; aponta para mostrar e pedir; atende a pedidos simples', socio: 'Imita adultos; busca o adulto de referência para explorar com segurança', cog: 'Encaixa, enche e esvazia; usa objetos de forma funcional (colher, telefone)' },
  { idade: '18 a 24 meses', mov: 'Corre; sobe degraus com apoio; chuta bola; usa a colher', ling: 'Vocabulário cresce rápido; começa a juntar duas palavras', socio: 'Interessa-se por outras crianças; brinca lado a lado', cog: 'Faz de conta simples (dar comida à boneca); reconhece partes do corpo' },
  { idade: '2 a 3 anos', mov: 'Pula com os dois pés; sobe escadas; folheia livros; faz bolinhas de massinha', ling: 'Frases de 3 ou mais palavras; faz perguntas; nomeia objetos e figuras', socio: 'Começa a brincar junto; vive disputas e aprende a esperar a vez', cog: 'Faz de conta elaborado; agrupa objetos iguais; noções de dentro, fora, em cima' },
  { idade: '3 a 4 anos', mov: 'Pedala; equilibra-se; desenha formas fechadas; veste-se com ajuda', ling: 'Conta fatos e histórias curtas; é compreendido pela maioria das pessoas', socio: 'Brinca em grupo com papéis ("eu sou a mãe"); segue combinados', cog: 'Conta pequenas quantidades; classifica por cor e tamanho; antecipa a rotina' },
];

const MARCOS_NOTA = 'Referência geral, baseada na Caderneta da Criança (Ministério da Saúde) e nos marcos do CDC (EUA). Cada criança tem seu ritmo, e a variação é grande e esperada. Os marcos ajudam a olhar com intenção, nunca a comparar ou diagnosticar. Se algum marco não aparece de forma persistente, registre fatos, converse com a coordenação e combinem juntos a conversa com a família, que poderá buscar orientação de profissional de saúde.';

// O que observar em cada campo (berçário x maternal) + evidências
const OBSERVAR = {
  EO: {
    registro: '05/09, chegada. Pedro chorou ao se despedir do pai, buscou o colo da professora e, depois de alguns minutos, apontou para os blocos e desceu do colo para brincar.',
    foco: 'Vínculos, convivência, identidade e emoções.',
    bercario: ['Como reage à chegada e à despedida da família', 'Com quem busca estar; como pede colo', 'Como comunica fome, sono e desconforto', 'Reações às outras crianças (olhar, tocar, imitar)'],
    maternal: ['Como se relaciona nas disputas e como resolve conflitos', 'Gestos de cuidado com colegas', 'Confiança diante de desafios ("eu consigo")', 'Respeito aos combinados e espera da vez'],
    evidencias: 'Falas ("é meu!", "não gostei"), cenas de cuidado entre crianças, fotos de brincadeiras em grupo.',
  },
  CG: {
    registro: '14/10, pátio. Helena deu cinco passos sozinha até o banco, sentou, bateu palmas e se levantou para tentar de novo.',
    foco: 'Conquistas motoras, expressão corporal e autonomia nos cuidados.',
    bercario: ['Como se desloca (rola, arrasta, engatinha, anda)', 'Preensão: pega, solta, encaixa, lança', 'Participação na troca e na alimentação', 'Expressão de emoções pelo corpo'],
    maternal: ['Correr, pular, subir, equilibrar-se', 'Noções de dentro/fora, em cima/embaixo no movimento', 'Autonomia: comer, lavar as mãos, vestir-se, desfralde', 'Controle das mãos: rasgar, folhear, modelar'],
    evidencias: 'Data da primeira conquista (primeiros passos), fotos do circuito, registro de autonomia nas refeições.',
  },
  TS: {
    registro: '22/08, pintura com beterraba. Lucas espalhou a tinta com as duas mãos, olhou as palmas vermelhas e disse: "Olha!".',
    foco: 'Exploração sensorial, sons, marcas gráficas e criação.',
    bercario: ['Reação às músicas e aos sons', 'Como explora tintas, texturas e riscadores', 'Interesse pelas marcas que produz', 'Instrumentos e objetos sonoros preferidos'],
    maternal: ['Acompanha ritmos; canta trechos das músicas', 'Modela, constrói e nomeia o que cria', 'Desenha com intenção e fala sobre o desenho', 'Preferências de cores e materiais'],
    evidencias: 'Produções datadas com a fala da criança, vídeos curtos de música, fotos do processo (não só do resultado).',
  },
  EF: {
    registro: '03/10, leitura de "A casa sonolenta". Antes de a professora virar a página, Davi gritou: "E a pulga!".',
    foco: 'Comunicação, linguagem oral, escuta, leitura e imaginação.',
    bercario: ['Formas de comunicação: choro, olhar, gesto, balbucio, palavra', 'Responde ao nome; reconhece pessoas', 'Interesse por livros, poemas e canções', 'Aponta figuras; imita sons e entonações'],
    maternal: ['Tamanho das frases; perguntas que faz', 'Relata fatos vividos; reconta histórias', 'Brinca com rimas e completa parlendas', 'Faz de conta com narrativas'],
    evidencias: 'Falas literais da criança (anote entre aspas!), histórias preferidas, palavras novas do mês.',
  },
  ET: {
    registro: '18/09, bacia de água. Helena encheu e virou o copo 12 vezes, cada vez mais devagar, observando a água cair.',
    foco: 'Investigação do mundo: objetos, espaço, tempo, quantidades e natureza.',
    bercario: ['Explora objetos com os sentidos', 'Pesquisa causa e efeito (derrubar, encher, esvaziar)', 'Procura objetos escondidos', 'Desloca e transporta objetos pelo espaço'],
    maternal: ['Compara e classifica (cor, tamanho, forma)', 'Conta e recita números nas brincadeiras', 'Noções de tempo da rotina (antes, depois)', 'Observa fenômenos naturais e cuida de plantas e bichos'],
    evidencias: 'Cenas de investigação ("encheu e esvaziou o pote 15 vezes"), perguntas da criança sobre o mundo.',
  },
};

const DIREITOS = [
  { nome: 'Conviver', texto: 'com outras crianças e adultos, em pequenos e grandes grupos.' },
  { nome: 'Brincar', texto: 'cotidianamente, de diversas formas, com diferentes parceiros.' },
  { nome: 'Participar', texto: 'ativamente das decisões e das atividades da vida cotidiana.' },
  { nome: 'Explorar', texto: 'movimentos, gestos, sons, formas, texturas, cores, palavras, objetos.' },
  { nome: 'Expressar', texto: 'necessidades, emoções, sentimentos, dúvidas, descobertas, opiniões.' },
  { nome: 'Conhecer-se', texto: 'e construir sua identidade pessoal, social e cultural.' },
];

const TECNICAS = [
  { nome: 'Registro cursivo (anedótico)', texto: 'Anote em poucas linhas uma cena observada: data, contexto, o que a criança fez e disse. Ex.: "12/09, pátio. Helena empurrou a caixa até a rampa, tentou subir, caiu sentada, riu e tentou de novo."' },
  { nome: 'Fala literal', texto: 'Anote entre aspas exatamente o que a criança disse. Uma única fala vale mais que um parágrafo de adjetivos.' },
  { nome: 'Fotografia com legenda', texto: 'Fotografe o processo, não só o resultado. Escreva no mesmo dia uma legenda curta: o que estava acontecendo e por que importa.' },
  { nome: 'Mini-história', texto: 'Sequência de 3 a 5 fotos de uma cena com um pequeno texto narrativo. Revela o pensamento da criança e encanta as famílias.' },
  { nome: 'Ficha de acompanhamento', texto: 'Ficha rápida por campo de experiência, preenchida em rodízio (4 ou 5 crianças por dia), para que nenhuma criança fique sem registro.' },
  { nome: 'Produções datadas', texto: 'Desenhos, pinturas e modelagens com data e a fala da criança no verso. Mostram a evolução ao longo do semestre.' },
];

const ROTINA_REGISTRO = [
  { passo: 'Planeje', texto: 'Escolha 4 ou 5 crianças "foco" do dia. Em uma semana, toda a turma é observada com atenção.' },
  { passo: 'Observe', texto: 'Durante a rotina (chegada, brincar livre, refeição, pátio), olhe com intenção para as crianças foco.' },
  { passo: 'Anote', texto: '5 minutos no fim do dia: uma cena, uma fala, uma conquista por criança. Use a ficha de observação.' },
  { passo: 'Organize', texto: 'Uma vez por mês, distribua as anotações pelos campos de experiência na ficha individual.' },
  { passo: 'Escreva', texto: 'No fim do semestre, o relatório nasce dos registros: escolha as melhores cenas e use o banco de frases para costurar o texto.' },
];

const ESTRUTURA = [
  { n: '1', titulo: 'Chegada e vínculos', texto: 'Quem é a criança, como foi a adaptação, como se relaciona com a creche. (EO)' },
  { n: '2', titulo: 'Relações e convivência', texto: 'Interações com colegas e adultos, emoções, conflitos e cuidado com o outro. (EO, EF)' },
  { n: '3', titulo: 'Corpo, movimento e cuidados', texto: 'Conquistas motoras, alimentação, sono, higiene, desfralde, autonomia. (CG)' },
  { n: '4', titulo: 'Linguagens e expressão', texto: 'Comunicação, escuta de histórias, música, artes, faz de conta. (EF, TS)' },
  { n: '5', titulo: 'Explorações e descobertas', texto: 'Investigações, causa e efeito, natureza, quantidades, espaço e tempo. (ET)' },
  { n: '6', titulo: 'Conquistas e próximos passos', texto: 'Síntese do semestre, intenções da equipe e convite à parceria com a família.' },
];

const ERROS = [
  'Copiar o mesmo texto para várias crianças trocando só o nome',
  'Começar frases com "não": "não fala", "não anda", "não come"',
  'Usar rótulos: agressivo, tímido, preguiçoso, hiperativo, birrento',
  'Comparar a criança com colegas ou com "o esperado para a idade"',
  'Escrever hipóteses de diagnóstico ou termos clínicos',
  'Listar atividades da turma em vez de falar da criança',
  'Usar adjetivos vagos sem fatos: "é ótimo", "se desenvolveu bem"',
  'Expor conflitos com a família ou situações íntimas',
  'Esquecer os cuidados (alimentação, sono, higiene): na creche, eles são aprendizagem',
  'Terminar sem apontar próximos passos',
];

const CHECKLIST = [
  'O nome da criança está correto em todo o texto (inclusive onde havia [NOME])',
  'Há pelo menos um fato concreto ou uma fala real em cada bloco',
  'Os cinco campos de experiência aparecem ao longo do texto',
  'Não há nenhuma frase começando com "não"',
  'Não há rótulos, comparações ou hipóteses de diagnóstico',
  'Os cuidados (alimentação, sono, higiene) estão descritos',
  'O texto aponta conquistas E próximos passos',
  'A linguagem é respeitosa: eu leria isso tranquilamente na frente da família',
  'Revisei concordância de gênero (o/a) depois de trocar o nome',
  'Conferi o modelo exigido pela minha rede ou escola',
];

const REFERENCIAS = [
  'BRASIL. Lei nº 9.394, de 20 de dezembro de 1996. Estabelece as diretrizes e bases da educação nacional (com redação da Lei nº 12.796/2013).',
  'BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. Resolução nº 5, de 17 de dezembro de 2009. Fixa as Diretrizes Curriculares Nacionais para a Educação Infantil.',
  'BRASIL. Ministério da Educação. Base Nacional Comum Curricular: Educação é a Base. Brasília: MEC, 2017.',
  'BRASIL. Ministério da Educação. Indicadores da Qualidade na Educação Infantil. Brasília: MEC/SEB, 2009.',
  'BRASIL. Ministério da Educação. Práticas cotidianas na Educação Infantil: bases para a reflexão sobre as orientações curriculares. Brasília: MEC/SEB, 2009.',
  'BRASIL. Ministério da Saúde. Caderneta da Criança. Brasília: Ministério da Saúde (edição vigente).',
  'CENTERS FOR DISEASE CONTROL AND PREVENTION (CDC). Learn the Signs. Act Early: developmental milestones. Atlanta: CDC.',
  'EDWARDS, C.; GANDINI, L.; FORMAN, G. As cem linguagens da criança: a abordagem de Reggio Emilia na educação da primeira infância. Porto Alegre: Artmed.',
  'FALK, Judit (org.). Educar os três primeiros anos: a experiência de Lóczy. Araraquara: Junqueira & Marin.',
  'FOCHI, Paulo. Afinal, o que os bebês fazem no berçário? Comunicação, autonomia e saber-fazer de bebês em um contexto de vida coletiva. Porto Alegre: Penso, 2015.',
  'HOFFMANN, Jussara. Avaliação e educação infantil: um olhar sensível e reflexivo sobre a criança. Porto Alegre: Mediação.',
  'PIAGET, Jean. O nascimento da inteligência na criança. Rio de Janeiro: Zahar.',
  'VYGOTSKY, Lev S. A formação social da mente. São Paulo: Martins Fontes.',
  'WALLON, Henri. A evolução psicológica da criança. São Paulo: Martins Fontes.',
];

module.exports = { LEIS, AVALIACAO_E, AVALIACAO_NAO, TEORICOS, FAIXAS, MARCOS, MARCOS_NOTA, OBSERVAR, DIREITOS, TECNICAS, ROTINA_REGISTRO, ESTRUTURA, ERROS, CHECKLIST, REFERENCIAS };
