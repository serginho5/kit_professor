// Relatórios-exemplo completos (crianças fictícias). Servem como referência de tom, estrutura e extensão.

const EXEMPLOS = [
  {
    id: 'bercario',
    turma: 'Berçário II',
    crianca: 'Helena',
    idade: '1 ano e 2 meses',
    periodo: '2º semestre',
    blocos: [
      { titulo: 'Chegada e vínculos', texto: 'Helena chegou à turma do Berçário II em agosto e viveu um período de adaptação gradual. Nas primeiras semanas, chorava na despedida da mãe e buscava o colo da professora de referência, observando o grupo com atenção a partir dessa segurança. A presença da família nos primeiros dias, um paninho trazido de casa e a rotina previsível ajudaram Helena a se sentir acolhida. Hoje ela chega sorrindo, estende os braços para a equipe e logo procura o cesto de tesouros, seu canto preferido da sala.' },
      { titulo: 'Relações e convivência', texto: 'Helena tem demonstrado prazer em estar perto dos colegas: aproxima-se de quem está brincando, observa com atenção e oferece objetos, aguardando a reação do outro. Diverte-se especialmente nas brincadeiras de cadê-achou, rindo e repetindo o gesto quando o adulto responde, sinal de que percebe que suas ações provocam reações nas pessoas (EI01EO01). Comunica com clareza o que sente: aponta para o que deseja, balança a cabeça para dizer "não" e já usa as palavras "mamã", "água" e "dá" (EI01EO04).' },
      { titulo: 'Corpo, movimento e cuidados', texto: 'Este semestre foi marcado por uma grande conquista motora: Helena deu seus primeiros passos sozinha em outubro, no pátio, e comemorou batendo palmas. Desde então, explora o espaço com cada vez mais segurança, sobe nas almofadas do circuito e passa pelo túnel de tecido engatinhando (EI01CG02). Nos momentos de cuidado, colabora estendendo os braços na troca e tenta segurar a colher sozinha nas refeições, aceitando bem frutas, legumes e o feijão (EI01CG04). Descansa com tranquilidade no período do sono, adormecendo com o paninho.' },
      { titulo: 'Linguagens e expressão', texto: 'Helena se encanta pelos momentos de música: balança o corpo, bate palmas e sacode o chocalho quando ouve "A barata diz que tem", sua canção preferida (EI01TS03). Nos momentos de leitura, aproxima-se do adulto, observa as ilustrações e já aponta o cachorro e o gato quando perguntamos onde estão (EI01EF04). Na proposta de pintura com tinta de beterraba, explorou a tinta com as mãos, espalhando-a pelo papel com gestos amplos e observando atentamente as marcas que produzia (EI01TS02).' },
      { titulo: 'Explorações e descobertas', texto: 'Helena é uma pesquisadora persistente. Passa longos períodos colocando e tirando objetos de potes e caixas, derruba as torres de blocos para vê-las cair e repete a ação várias vezes, investigando relações de causa e efeito (EI01ET02). Nas experiências com água, encheu e esvaziou copos com grande concentração, demonstrando curiosidade sobre o que acontecia.' },
      { titulo: 'Conquistas e próximos passos', texto: 'Foi muito bonito acompanhar Helena neste semestre: os primeiros passos, as primeiras palavras e a confiança crescente para explorar o mundo. No próximo período, seguiremos oferecendo desafios motores seguros, ampliando as conversas e as leituras e convidando Helena a participar cada vez mais dos momentos de cuidado. Agradecemos a parceria da família, fundamental em cada uma dessas conquistas.' },
    ],
  },
  {
    id: 'maternal1',
    turma: 'Maternal I',
    crianca: 'Davi',
    idade: '2 anos e 5 meses',
    periodo: '2º semestre',
    blocos: [
      { titulo: 'Chegada e vínculos', texto: 'Davi segue na turma e este semestre foi marcado por vínculos mais fortes com os colegas e por uma participação cada vez mais ativa na rotina. Chega à creche com alegria, despede-se da família com um "tchau" e logo procura os carrinhos, seus brinquedos preferidos, e os amigos Theo e Maria.' },
      { titulo: 'Relações e convivência', texto: 'Davi tem demonstrado atitudes de cuidado com os colegas: quando alguém chora, aproxima-se, faz carinho e leva um brinquedo para consolar (EI02EO01). Ainda vive com intensidade as disputas por brinquedos, o que é próprio desta fase. Em alguns momentos do início do semestre, usou a mordida para se expressar nessas situações. A equipe acompanhou de perto, ajudou Davi a nomear o que sentia e ofereceu palavras como "é meu" e "minha vez". Hoje ele já procura o adulto ou diz "não gostei" quando algo o incomoda (EI02EO07), e as mordidas deixaram de acontecer.' },
      { titulo: 'Corpo, movimento e cuidados', texto: 'Davi tem muita energia para explorar o espaço: corre pelo pátio, sobe e desce do escorregador com autonomia, pula com os dois pés e adora o circuito com túneis e bambolês, compreendendo comandos como "passa por baixo" e "entra no túnel" (EI02CG02). Conquistou independência importante nos cuidados: alimenta-se sozinho com a colher, lava as mãos antes das refeições e iniciou o desfralde em outubro, em parceria com a família, já avisando quando precisa ir ao banheiro (EI02CG04).' },
      { titulo: 'Linguagens e expressão', texto: 'A comunicação de Davi ampliou-se muito neste semestre. Ele já usa frases curtas para dizer o que quer e sente ("eu quero água", "Davi caiu, dodói") e conta, na roda, sobre o passeio com o avô (EI02EF01, EI02EF05). Adora a história "A casa sonolenta": pede para ouvi-la de novo, repete os nomes dos personagens e completa o final com os colegas (EI02EF04). Nas propostas com massinha, faz "cobrinhas" e bolinhas e diz que está fazendo "comida para o leão" (EI02TS02).' },
      { titulo: 'Explorações e descobertas', texto: 'Davi se interessa por tudo o que se move: observa o vento balançando as fitas no pátio e comenta "o vento levou" (EI02ET02). Nas brincadeiras com tampinhas, começou a separar as vermelhas das azuis quando proposto, e recita os números até três ao contar os carrinhos (EI02ET05, EI02ET07).' },
      { titulo: 'Conquistas e próximos passos', texto: 'O semestre de Davi foi de muitas conquistas: a ampliação da fala, a autonomia na alimentação, o início do desfralde e novas formas de resolver os conflitos. No próximo período, seguiremos ampliando as rodas de conversa e as brincadeiras de contar e classificar, além de apoiar o desfralde. Em casa, a família pode contribuir lendo histórias antes de dormir e conversando com Davi sobre o seu dia. Seguimos juntos!' },
    ],
  },
  {
    id: 'maternal2',
    turma: 'Maternal II',
    crianca: 'Ana Luísa',
    idade: '3 anos e 4 meses',
    periodo: '2º semestre',
    blocos: [
      { titulo: 'Chegada e vínculos', texto: 'Ana Luísa é uma criança tranquila e observadora, que gosta de conhecer as situações antes de participar. Quando se sente segura, envolve-se com entusiasmo e se torna uma das primeiras a propor brincadeiras. Neste semestre, mostrou-se cada vez mais à vontade no grupo, chegando à creche contando novidades para a professora.' },
      { titulo: 'Relações e convivência', texto: 'Ana Luísa construiu amizades importantes com Laura e Pedro, com quem brinca de casinha e de mercado, organizando os papéis da brincadeira ("eu sou a mãe e você é o filho"). Conhece os combinados da turma e lembra os colegas quando é hora de guardar os brinquedos (EI02EO06). Demonstra confiança em si: diante de um desafio, diz "eu consigo" e persiste, pedindo ajuda apenas quando realmente precisa (EI02EO02).' },
      { titulo: 'Corpo, movimento e cuidados', texto: 'Ana Luísa realiza com autonomia a maior parte dos cuidados: usa o banheiro sozinha, lava as mãos, serve-se no almoço com apoio e tenta calçar os sapatos (EI02CG04). Nas brincadeiras de movimento, corre, pula, dança e adora a brincadeira de estátua, controlando o corpo nas pausas da música (EI02CG03). Tem demonstrado bom controle manual: rasga papéis em pedaços pequenos, folheia os livros página a página e segura o giz com firmeza (EI02CG05).' },
      { titulo: 'Linguagens e expressão', texto: 'Ana Luísa dialoga com desenvoltura, expressando opiniões e fazendo muitas perguntas ("por que a lua some?"). Reconta histórias conhecidas e cria suas próprias narrativas com os fantoches, com personagens e acontecimentos (EI02EF06). Diverte-se com as parlendas, completa versos e inventa rimas engraçadas com os nomes dos colegas (EI02EF02). Seus desenhos estão cada vez mais intencionais: desenha "a mamãe" e "o sol", e faz marcas que diz serem seu nome (EI02EF09).' },
      { titulo: 'Explorações e descobertas', texto: 'No projeto da horta, Ana Luísa regou as plantas todos os dias e observou com lupa as joaninhas, contando aos colegas o que via (EI02ET03). Classifica objetos por cor e tamanho com autonomia, explicando seu critério ("aqui só as grandes"), e conta até cinco objetos apontando um a um (EI02ET05, EI02ET07). Compreende a sequência da rotina e antecipa os momentos: "depois do lanche é o parque" (EI02ET04).' },
      { titulo: 'Conquistas e próximos passos', texto: 'Este foi um semestre de muita autonomia e criatividade para Ana Luísa. Na transição para a Pré-escola, seguiremos incentivando sua participação nas rodas de conversa, o reconto de histórias e as explorações com números e escrita no contexto das brincadeiras. Agradecemos a parceria da família e a confiança em nosso trabalho. Foi uma alegria acompanhar Ana Luísa neste ano!' },
    ],
  },
];

// Versão para a família (linguagem acolhedora, sem códigos BNCC)
const CARTA_FAMILIA = {
  crianca: 'Davi',
  turma: 'Maternal I',
  saudacao: 'Querida família do Davi,',
  paragrafos: [
    'Que semestre bonito o Davi viveu! Queremos compartilhar com vocês um pouco do que acompanhamos no dia a dia da turma.',
    'O Davi está falando cada vez mais: já usa frases para contar o que quer e sente, e adora contar na roda sobre os passeios com o avô. Ele também se tornou um ótimo amigo: quando alguém chora, é um dos primeiros a se aproximar para fazer carinho.',
    'Nas brincadeiras, ele não para: corre, pula, sobe no escorregador e é o primeiro da fila no circuito. Nas refeições, já come sozinho, e em outubro começou a deixar a fralda, uma conquista que celebramos juntos.',
    'A história preferida dele é "A casa sonolenta", que ele pede para ouvir todos os dias. Que tal ler em casa também?',
    'No próximo semestre, vamos continuar conversando bastante, contando histórias e brincando de contar e separar objetos. Obrigada por caminharem com a gente!',
  ],
  assinatura: 'Com carinho, equipe do Maternal I',
};

// Relatório coletivo da turma (muitas redes pedem)
const TURMA = {
  turma: 'Berçário II',
  titulo: 'Relatório da turma',
  paragrafos: [
    'A turma do Berçário II é formada por 14 crianças entre 1 ano e 1 ano e 8 meses. O semestre começou com o período de adaptação, vivido de forma gradual, com a presença das famílias nos primeiros dias e a organização de uma rotina previsível, com adultos de referência estáveis para cada pequeno grupo.',
    'Ao longo do semestre, o grupo viveu grandes conquistas motoras: muitas crianças deram os primeiros passos, e o espaço da sala foi reorganizado com rampas, túneis e almofadas para acolher as novas explorações. O tempo no chão e no pátio foi garantido diariamente, respeitando o ritmo de cada criança.',
    'O projeto "Cesto de tesouros" foi o fio condutor das explorações sensoriais. A partir de objetos naturais e do cotidiano (colheres de pau, buchas, tecidos, potes), as crianças investigaram texturas, sons, pesos e relações de causa e efeito, permanecendo concentradas por períodos cada vez mais longos.',
    'A música e a leitura estiveram presentes todos os dias. A turma construiu um repertório de cantigas preferidas e passou a reconhecer as histórias lidas, apontando personagens e imitando os sons dos animais.',
    'Os momentos de cuidado (alimentação, troca e sono) foram vividos como momentos de relação e aprendizagem, com a equipe antecipando cada gesto com palavras e convidando as crianças a participar. Muitas já seguram a colher e o copo e colaboram na troca.',
    'Para o próximo semestre, a equipe pretende ampliar as experiências de linguagem oral, as brincadeiras ao ar livre e a participação das crianças nos cuidados. Agradecemos às famílias pela parceria e pela confiança.',
  ],
};

module.exports = { EXEMPLOS, CARTA_FAMILIA, TURMA };
