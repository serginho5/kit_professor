// Frases complementares: abertura, rotina e cuidados, situações delicadas, fechamento,
// conectivos e verbos observáveis. [NOME] = nome da criança.

const ABERTURAS = {
  titulo: 'Abertura e adaptação',
  intro: 'O primeiro parágrafo apresenta a criança e conta como foi sua chegada e o vínculo com o grupo. Escolha a frase que mais se aproxima do que você viveu com a criança e complete com um fato real.',
  grupos: [
    {
      nome: 'Adaptação tranquila',
      frases: [
        '[NOME] chegou à turma neste semestre e viveu o período de adaptação com tranquilidade. Desde as primeiras semanas, explorou o espaço com curiosidade e construiu vínculos com a equipe e com os colegas.',
        '[NOME] iniciou o ano na turma demonstrando segurança. A presença da família nos primeiros dias e a rotina previsível contribuíram para que a criança se sentisse acolhida rapidamente.',
        '[NOME] é uma criança que chega à creche com alegria, despede-se da família com tranquilidade e logo procura os brinquedos e os colegas de que mais gosta.',
      ],
    },
    {
      nome: 'Adaptação gradual',
      frases: [
        '[NOME] viveu um período de adaptação gradual, com momentos de choro na despedida da família nas primeiras semanas. Com o tempo, o acolhimento da equipe e a rotina estável ajudaram a criança a se sentir segura, e hoje chega com mais tranquilidade.',
        'Nos primeiros dias, [NOME] preferiu ficar próximo do adulto de referência, observando o grupo antes de participar. Esse tempo de observação foi respeitado e, aos poucos, a criança passou a explorar o espaço e a se aproximar dos colegas.',
        'A adaptação de [NOME] foi construída passo a passo, em parceria com a família. Um objeto de casa trazido nos primeiros dias ajudou a criança a fazer a transição e hoje ela já se sente parte do grupo.',
      ],
    },
    {
      nome: 'Retorno ou continuidade',
      frases: [
        '[NOME] já frequentava a instituição e retornou neste semestre reencontrando colegas e espaços conhecidos. A adaptação à nova turma e à nova equipe aconteceu com tranquilidade.',
        '[NOME] segue na turma, e este semestre foi marcado por vínculos mais fortes com os colegas e por uma participação cada vez mais ativa na rotina.',
      ],
    },
    {
      nome: 'Chegada no meio do semestre',
      frases: [
        '[NOME] chegou à turma no decorrer do semestre e, por isso, este relatório reflete um período mais curto de convivência. Nesse tempo, a criança foi acolhida pelo grupo e já demonstra estar construindo seus primeiros vínculos.',
      ],
    },
    {
      nome: 'Apresentação da criança (jeito de ser)',
      frases: [
        '[NOME] é uma criança curiosa, que observa tudo ao redor com atenção e se interessa especialmente por [interesse da criança].',
        '[NOME] demonstra um jeito tranquilo e observador: gosta de conhecer as situações antes de participar e, quando se sente à vontade, envolve-se com entusiasmo.',
        '[NOME] é uma criança comunicativa e afetuosa, que gosta de estar próxima dos colegas e dos adultos e demonstra alegria nas brincadeiras em grupo.',
        '[NOME] tem muita energia para explorar o mundo: movimenta-se pelo espaço, experimenta desafios e demonstra prazer nas brincadeiras de movimento.',
      ],
    },
  ],
};

const ROTINA = {
  titulo: 'Rotina e cuidados',
  intro: 'Na creche, cuidar e educar são indissociáveis. Alimentação, sono, higiene e trocas são momentos de aprendizagem e devem aparecer no relatório, sempre com foco nas conquistas de autonomia.',
  grupos: [
    {
      nome: 'Alimentação',
      frases: [
        '[NOME] demonstra prazer nos momentos de alimentação, experimenta novos alimentos e tem conquistado autonomia para comer com a colher e beber no copo.',
        'Nos momentos de alimentação, [NOME] tem experimentado novos sabores e texturas aos poucos. Aceita bem [alimentos] e tem sido incentivado a provar novos alimentos, sem pressão.',
        '[NOME] alimenta-se com autonomia, servindo-se com ajuda, e participa das conversas à mesa com os colegas.',
        '[NOME] ainda demonstra preferência por alguns alimentos e resistência a outros, o que é comum nesta fase. A equipe oferece os alimentos repetidas vezes, de forma tranquila, respeitando os sinais de saciedade da criança.',
      ],
    },
    {
      nome: 'Sono e descanso',
      frases: [
        '[NOME] descansa com tranquilidade no momento do sono, adormecendo com facilidade e acordando bem-disposto.',
        '[NOME] tem construído uma relação mais tranquila com o momento do descanso. Com a presença próxima do adulto e um ambiente acolhedor, tem conseguido relaxar e adormecer.',
        'Nem sempre [NOME] dorme no período de descanso, e esse ritmo é respeitado: a criança permanece em momento tranquilo, com livros ou brinquedos calmos.',
      ],
    },
    {
      nome: 'Higiene e trocas',
      frases: [
        '[NOME] colabora nos momentos de troca e higiene, antecipando os gestos e demonstrando conforto nesses momentos de relação com o adulto.',
        '[NOME] lava as mãos com autonomia antes das refeições e após as brincadeiras, e demonstra interesse em cuidar da própria aparência diante do espelho.',
      ],
    },
    {
      nome: 'Desfralde',
      frases: [
        '[NOME] iniciou o processo de desfralde neste semestre, em parceria com a família. Já comunica quando precisa ir ao banheiro e tem vivido essa conquista com orgulho.',
        '[NOME] concluiu o processo de desfralde durante o dia e utiliza o banheiro com autonomia, pedindo ajuda quando necessário.',
        '[NOME] tem demonstrado os primeiros sinais de interesse pelo banheiro, como observar os colegas e avisar quando a fralda está suja. O processo de desfralde será iniciado em conversa com a família, respeitando o tempo da criança.',
      ],
    },
  ],
};

const DELICADAS = {
  titulo: 'Situações delicadas',
  intro: 'Algumas situações exigem cuidado redobrado na escrita. Descreva fatos (o que aconteceu, quando, como a equipe agiu), nunca rótulos. Mostre que a situação está sendo acompanhada e qual é o próximo passo.',
  grupos: [
    {
      nome: 'Mordidas',
      orientacao: 'Morder é comum entre 1 e 3 anos: a criança ainda não tem palavras suficientes para expressar frustração ou desejo. Nunca use "agressivo". Descreva o contexto e a mediação.',
      frases: [
        'Em alguns momentos de disputa por brinquedos ou de muita agitação no grupo, [NOME] utilizou a mordida para se expressar, comportamento comum nesta faixa etária, em que a linguagem oral ainda está em construção. A equipe tem acompanhado de perto essas situações, ajudando a criança a nomear o que sente e oferecendo palavras e gestos alternativos ("é meu", "não gostei"). Ao longo do semestre, essas situações tornaram-se menos frequentes.',
        '[NOME] passou por um período em que mordeu colegas em situações de conflito. Em parceria com a família, a equipe observou os momentos em que isso acontecia, reorganizou o espaço para diminuir as disputas e acompanhou a criança mais de perto. Hoje [NOME] já busca o adulto ou usa palavras quando algo a incomoda.',
      ],
    },
    {
      nome: 'Choro na despedida / separação',
      orientacao: 'O choro na separação é sinal de vínculo, não de problema. Mostre a evolução e o que ajuda a criança.',
      frases: [
        '[NOME] ainda demonstra tristeza no momento da despedida da família, o que é esperado e revela o vínculo afetivo que a criança tem com as pessoas de casa. Após a chegada, com o acolhimento do adulto de referência, [NOME] se acalma e passa a participar da rotina. Despedidas breves e previsíveis têm ajudado nesse processo.',
      ],
    },
    {
      nome: 'Conflitos e disputas',
      orientacao: 'Disputas fazem parte da convivência entre crianças pequenas. Fale da mediação e dos avanços, não de "bater" ou "brigar".',
      frases: [
        '[NOME] vive com intensidade as situações de disputa, característica desta fase em que a criança está aprendendo a lidar com a frustração e a esperar. Com a mediação da equipe, tem aprendido a expressar o que deseja com palavras e a aceitar alternativas, e tem conseguido resolver algumas situações com mais tranquilidade.',
      ],
    },
    {
      nome: 'Criança que ainda não fala (ou fala pouco)',
      orientacao: 'Descreva TODAS as formas de comunicação da criança. Se houver preocupação real, registre fatos e converse com a coordenação antes de escrever; o relatório não é lugar de diagnóstico.',
      frases: [
        '[NOME] se comunica principalmente por gestos, olhares, apontamentos e algumas palavras, e compreende bem o que lhe é dito: atende a pedidos simples, reconhece nomes de objetos e pessoas e participa das brincadeiras. A equipe tem ampliado as oportunidades de conversa, nomeando objetos e ações e valorizando cada tentativa de fala.',
      ],
    },
    {
      nome: 'Criança que ainda não anda',
      orientacao: 'O tempo de cada criança para andar varia bastante. Descreva como ela se desloca e explora.',
      frases: [
        '[NOME] se desloca pelo espaço engatinhando com agilidade e tem se colocado de pé com apoio dos móveis. A equipe organiza o ambiente para favorecer essas conquistas, sem apressar etapas, respeitando o tempo da criança.',
      ],
    },
    {
      nome: 'Faltas frequentes',
      orientacao: 'Registre o impacto na continuidade, sem culpabilizar a família.',
      frases: [
        'Neste semestre, [NOME] teve algumas ausências, o que reduziu o tempo de convivência com o grupo e a continuidade de algumas propostas. Nos períodos em que esteve presente, a criança participou da rotina e das vivências da turma, e as observações deste relatório referem-se a esses momentos.',
      ],
    },
    {
      nome: 'Sinais de atenção (sem diagnosticar)',
      orientacao: 'Se você observou algo que preocupa, NÃO escreva hipóteses de diagnóstico ("parece autista", "tem TDAH", "atraso"). Registre fatos com datas em sua ficha, converse com a coordenação e combine com ela como e quando conversar com a família. No relatório, descreva o que a criança faz e o que a equipe tem oferecido.',
      frases: [
        '[NOME] demonstra interesse especial por [interesse] e prefere brincar de forma individual, mantendo-se concentrado por longos períodos. A equipe tem criado oportunidades de interação a partir desses interesses, convidando colegas a brincar junto, e segue acompanhando de perto as formas de comunicação e interação da criança, em diálogo com a família.',
      ],
    },
    {
      nome: 'Criança com deficiência ou laudo',
      orientacao: 'O relatório fala da criança, não do laudo. Descreva conquistas, interesses e apoios que funcionam. Mencione o trabalho conjunto com AEE/terapeutas apenas se a família autorizou.',
      frases: [
        '[NOME] participa da rotina da turma com os apoios de que precisa e tem conquistado avanços importantes neste semestre, como [conquista]. A criança demonstra prazer em [interesse] e responde bem quando [estratégia que funciona]. A equipe segue trabalhando em parceria com a família e com os profissionais que acompanham [NOME].',
      ],
    },
  ],
};

const FECHAMENTOS = {
  titulo: 'Fechamento: conquistas e próximos passos',
  intro: 'O último parágrafo retoma as principais conquistas, aponta o que será proposto a seguir e convida a família à parceria. Termine sempre com uma nota afetiva e verdadeira.',
  grupos: [
    {
      nome: 'Conquistas do semestre',
      frases: [
        'Este semestre foi marcado por conquistas importantes para [NOME], especialmente [conquista 1] e [conquista 2]. A criança tem demonstrado cada vez mais confiança para explorar o mundo e se relacionar com o grupo.',
        'Ao longo do semestre, foi bonito acompanhar [NOME] conquistando [conquista], resultado do seu esforço e da sua curiosidade.',
      ],
    },
    {
      nome: 'Próximos passos',
      frases: [
        'No próximo semestre, seguiremos oferecendo experiências que ampliem [área], como [proposta], respeitando o ritmo e os interesses de [NOME].',
        'Como próximos passos, a equipe pretende ampliar as oportunidades de [área], incentivando [NOME] a [ação], sempre a partir do que a criança já conquistou.',
      ],
    },
    {
      nome: 'Parceria com a família',
      frases: [
        'Agradecemos a parceria da família, que tem sido fundamental para o desenvolvimento de [NOME]. Seguimos juntos!',
        'Em casa, a família pode contribuir [sugestão simples: lendo histórias antes de dormir, incentivando a criança a comer sozinha, conversando sobre o dia]. Contamos com essa parceria para continuar acompanhando as descobertas de [NOME].',
        'Foi uma alegria acompanhar [NOME] neste semestre. Agradecemos a confiança da família e seguimos à disposição para conversar.',
      ],
    },
  ],
};

const VERBOS = [
  { grupo: 'Para descrever o que a criança faz', itens: ['explora', 'investiga', 'experimenta', 'observa', 'manipula', 'constrói', 'cria', 'imita', 'reproduz', 'transporta', 'empilha', 'encaixa', 'escala', 'desloca-se', 'participa', 'interage', 'compartilha', 'demonstra', 'expressa', 'comunica', 'escolhe', 'propõe', 'nomeia', 'relata', 'reconhece'] },
  { grupo: 'Para mostrar processo (em desenvolvimento)', itens: ['tem ampliado', 'tem começado a', 'vem construindo', 'tem experimentado', 'está descobrindo', 'tem conquistado', 'gradualmente', 'progressivamente', 'cada vez mais', 'aos poucos', 'no seu tempo', 'com o apoio do adulto'] },
  { grupo: 'Para mostrar intenção pedagógica (o que a equipe faz)', itens: ['a equipe tem oferecido', 'foram propostas', 'organizamos o espaço para', 'temos incentivado', 'a mediação do adulto', 'seguiremos ampliando', 'temos acompanhado de perto', 'em parceria com a família'] },
  { grupo: 'Conectivos para costurar o texto', itens: ['Além disso,', 'Nesse sentido,', 'Ao longo do semestre,', 'Nos momentos de...,', 'Durante as brincadeiras,', 'Com o tempo,', 'Aos poucos,', 'Também foi possível observar que', 'Por outro lado,', 'Em relação a...,', 'Vale destacar que', 'Dessa forma,'] },
];

// Trocas de linguagem: evitar -> preferir
const TROCAS = [
  ['[NOME] é agressivo.', 'Em situações de disputa, [NOME] ainda usa o corpo para se expressar; a equipe tem oferecido palavras e alternativas.'],
  ['[NOME] não sabe falar.', '[NOME] se comunica por gestos, olhares e algumas palavras, e compreende bem o que lhe é dito.'],
  ['[NOME] é muito chorão.', '[NOME] expressa suas emoções com intensidade e tem encontrado no adulto de referência o acolhimento de que precisa.'],
  ['[NOME] é hiperativo / não para quieto.', '[NOME] tem muita energia para explorar o espaço e se envolve especialmente nas brincadeiras de movimento.'],
  ['[NOME] não come nada.', '[NOME] tem experimentado novos alimentos aos poucos e aceita bem [alimentos].'],
  ['[NOME] é tímido.', '[NOME] prefere observar as situações antes de participar e, quando se sente seguro, envolve-se com interesse.'],
  ['[NOME] é birrento / faz birra.', '[NOME] ainda vive as frustrações com intensidade, o que é próprio da idade; com a mediação do adulto, tem conseguido se reorganizar.'],
  ['[NOME] não consegue...', '[NOME] tem começado a... / Com o apoio do adulto, [NOME] tem...'],
  ['[NOME] tem atraso na fala.', '[NOME] se comunica principalmente por... A equipe tem ampliado as oportunidades de conversa. (Preocupações: registre fatos e converse com a coordenação.)'],
  ['[NOME] é o mais esperto da turma.', '[NOME] demonstra grande curiosidade e resolve desafios com criatividade. (Nunca compare crianças.)'],
  ['[NOME] fez todas as atividades.', 'Descreva COMO a criança participou: o que fez, o que disse, o que descobriu.'],
  ['[NOME] é bonzinho / comportado.', '[NOME] respeita os combinados da turma e demonstra cuidado com os colegas.'],
  ['A mãe não colabora.', 'Seguimos contando com a parceria da família para... (Conflitos com a família não entram no relatório.)'],
  ['[NOME] ainda usa fralda.', '[NOME] tem demonstrado os primeiros sinais de interesse pelo banheiro; o desfralde será construído junto com a família, no tempo da criança.'],
];

module.exports = { ABERTURAS, ROTINA, DELICADAS, FECHAMENTOS, VERBOS, TROCAS };
