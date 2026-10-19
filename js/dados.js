/* ======================================================
   ORÁCULO DIGITAL — dados.js
   Base de dados (signos + arcanos) e funções de cálculo.
   Esse arquivo é compartilhado entre index.html (formulário)
   e resultado.html (página de resultado), então tudo que
   está aqui precisa ser carregado ANTES dos scripts de cada
   página (ver as tags <script> no final de cada .html).
   ====================================================== */

const SIGNOS = {
  'Áries': { simbolo:'♈', elemento:'Fogo', modalidade:'Cardinal', planeta:'Marte',
    texto:'Áries abre o ciclo zodiacal com impulso e coragem. É o signo da iniciativa: age antes de pensar demais, prefere começar a esperar o momento perfeito, e tem uma energia competitiva que busca ser o primeiro. O desafio costuma ser a paciência — sustentar o que começou com tanto ímpeto.',
    motto:'Eu começo.', fornece:'o impulso e a coragem de dar o primeiro passo', sombraFrase:'a impaciência de quem quer tudo pra ontem', verbo:'correr' },
  'Touro': { simbolo:'♉', elemento:'Terra', modalidade:'Fixo', planeta:'Vênus',
    texto:'Touro busca estabilidade e prazer sensorial. É paciente, teimoso no bom sentido e constrói devagar aquilo que pretende manter por muito tempo. Valoriza conforto, beleza e segurança material, e tende a resistir a mudanças bruscas mesmo quando elas seriam benéficas.',
    motto:'Eu construo.', fornece:'a raiz e a paciência para sustentar o que começa', sombraFrase:'a teimosia de quem resiste até o que já não serve mais', verbo:'construir' },
  'Gêmeos': { simbolo:'♊', elemento:'Ar', modalidade:'Mutável', planeta:'Mercúrio',
    texto:'Gêmeos é curiosidade em movimento. Comunicativo, rápido de raciocínio e com facilidade para se adaptar a diferentes contextos e pessoas, costuma ter múltiplos interesses ao mesmo tempo. O ponto de atenção é a dispersão — começar muitas coisas e ter dificuldade em aprofundar uma só.',
    motto:'Eu pergunto.', fornece:'a curiosidade e a agilidade de se adaptar', sombraFrase:'a dispersão de quem começa mil coisas ao mesmo tempo', verbo:'explorar' },
  'Câncer': { simbolo:'♋', elemento:'Água', modalidade:'Cardinal', planeta:'Lua',
    texto:'Câncer sente antes de entender. É protetor, ligado à família e às memórias, e cria vínculos profundos com quem considera "seu". Tem intuição forte, mas também oscila de humor com facilidade e pode se fechar em uma casca quando se sente vulnerável.',
    motto:'Eu cuido.', fornece:'o cuidado e a memória emocional', sombraFrase:'a insegurança de quem se fecha quando se machuca', verbo:'cuidar' },
  'Leão': { simbolo:'♌', elemento:'Fogo', modalidade:'Fixo', planeta:'Sol',
    texto:'Leão tem presença. Generoso, criativo e com necessidade genuína de ser visto e reconhecido, costuma liderar com calor humano mais do que com autoritarismo. O orgulho pode pesar quando se sente ignorado, mas raramente perde a lealdade por quem ama.',
    motto:'Eu brilho.', fornece:'o brilho e a vontade genuína de ser visto', sombraFrase:'o orgulho de quem tem dificuldade em pedir ajuda', verbo:'brilhar' },
  'Virgem': { simbolo:'♍', elemento:'Terra', modalidade:'Mutável', planeta:'Mercúrio',
    texto:'Virgem enxerga detalhes que passam despercebidos. É analítico, prestativo e busca melhorar continuamente — a si mesmo e o que está ao redor. A autocrítica costuma ser o maior obstáculo: a busca por perfeição pode se tornar um peso.',
    motto:'Eu aperfeiçoo.', fornece:'o olhar crítico e a vontade de melhorar tudo', sombraFrase:'a autocrítica de quem nunca acha que é suficiente', verbo:'lapidar' },
  'Libra': { simbolo:'♎', elemento:'Ar', modalidade:'Cardinal', planeta:'Vênus',
    texto:'Libra busca equilíbrio e harmonia nas relações. Diplomático, esteticamente sensível e desconfortável com conflito direto, tende a pesar prós e contras antes de decidir. A indecisão aparece justamente por querer agradar e equilibrar todos os lados.',
    motto:'Eu equilibro.', fornece:'o senso de equilíbrio e a diplomacia', sombraFrase:'a indecisão de quem tenta agradar todo mundo', verbo:'equilibrar' },
  'Escorpião': { simbolo:'♏', elemento:'Água', modalidade:'Fixo', planeta:'Plutão (e Marte)',
    texto:'Escorpião vive em intensidade. Investigativo, magnético e pouco interessado em superficialidade, costuma ir fundo nas pessoas e nos próprios sentimentos. Guarda mágoas com facilidade, mas também tem uma capacidade rara de se reinventar depois de crises.',
    motto:'Eu transformo.', fornece:'a intensidade e a vontade de ir fundo', sombraFrase:'a dificuldade de soltar mágoas antigas', verbo:'aprofundar' },
  'Sagitário': { simbolo:'♐', elemento:'Fogo', modalidade:'Mutável', planeta:'Júpiter',
    texto:'Sagitário busca expansão — de horizontes, de ideias, de experiências. Otimista, direto ao ponto e com sede de liberdade, não lida bem com rotinas engessadas. A franqueza pode soar sem filtro, mas raramente vem com má intenção.',
    motto:'Eu expando.', fornece:'a fome de horizontes novos', sombraFrase:'a falta de filtro e o medo de rotina', verbo:'viajar' },
  'Capricórnio': { simbolo:'♑', elemento:'Terra', modalidade:'Cardinal', planeta:'Saturno',
    texto:'Capricórnio constrói a longo prazo. Disciplinado, responsável e movido por metas concretas, tende a levar a vida (e a si mesmo) muito a sério. É de quem chega mais devagar, mas raramente desiste no meio do caminho.',
    motto:'Eu ergo.', fornece:'a disciplina e a visão de longo prazo', sombraFrase:'a rigidez de quem não sabe descansar', verbo:'erguer' },
  'Aquário': { simbolo:'♒', elemento:'Ar', modalidade:'Fixo', planeta:'Urano (e Saturno)',
    texto:'Aquário pensa fora da caixa por natureza. Independente, orientado a ideias coletivas e pouco preso a convenções, costuma se sentir mais confortável entre grupos e causas do que em relações muito próximas. Valoriza a liberdade quase acima de tudo.',
    motto:'Eu reinvento.', fornece:'a originalidade e a distância crítica', sombraFrase:'a distância emocional de quem prefere a ideia à pessoa', verbo:'reinventar' },
  'Peixes': { simbolo:'♓', elemento:'Água', modalidade:'Mutável', planeta:'Netuno (e Júpiter)',
    texto:'Peixes é o mais permeável do zodíaco: sensível, imaginativo e empático a ponto de absorver o clima emocional ao redor. Tem inclinação natural para arte e espiritualidade, mas pode ter dificuldade em manter limites claros entre si e o outro.',
    motto:'Eu sinto.', fornece:'a sensibilidade e a imaginação', sombraFrase:'a dificuldade de manter limites claros', verbo:'sonhar' },
};


/* Faixas de data de cada signo, na ordem do calendário (usado por
   calcularSigno abaixo). Cada item é [nome, [mêsInício,diaInício], [mêsFim,diaFim]] */
const ORDEM_SIGNOS = [
  ['Capricórnio', [12,22], [1,19]], ['Aquário', [1,20], [2,18]],
  ['Peixes', [2,19], [3,20]], ['Áries', [3,21], [4,19]],
  ['Touro', [4,20], [5,20]], ['Gêmeos', [5,21], [6,20]],
  ['Câncer', [6,21], [7,22]], ['Leão', [7,23], [8,22]],
  ['Virgem', [8,23], [9,22]], ['Libra', [9,23], [10,22]],
  ['Escorpião', [10,23], [11,21]], ['Sagitário', [11,22], [12,21]],
];


/* Descobre o signo solar a partir do dia e mês de nascimento,
   percorrendo as faixas de ORDEM_SIGNOS até achar a que bate */
function calcularSigno(dia, mes) {
  for (const [nome, de, ate] of ORDEM_SIGNOS) {
    const [mIni, dIni] = de, [mFim, dFim] = ate;
    if ((mes === mIni && dia >= dIni) || (mes === mFim && dia <= dFim)) return nome;
  }
  return 'Indefinido';
}


/* ------------------------------------------------------
   2) BASE DE DADOS DOS ARCANOS MAIORES (tarot)
   22 arcanos (1 a 22, sendo 22 = "O Louco", tradicionalmente
   numerado como 0). Cada um tem:
   - astro: o planeta/signo a que é tradicionalmente associado
            no sistema clássico de correspondências do tarot
            (usado na comparação com o signo real da pessoa)
   - texto: explicação geral do arcano
   - motto / fornece / sombra / luz: mesmos papéis que em SIGNOS,
            usados pra montar a interpretação combinada
   ------------------------------------------------------ */
const ARCANOS = {
  1:  { nome:'O Mago', emoji:'🪄', astro:'Mercúrio', texto:'Representa vontade, iniciativa e a capacidade de transformar ideia em ação. Quem carrega esse arcano tende a ter talento para começar coisas, articular recursos diferentes e se comunicar com clareza — o desafio é usar esse poder com propósito, e não só para manipular situações a seu favor.',
    motto:'Eu crio.', fornece:'a vontade de transformar ideia em ação', sombra:'a tentação de usar a própria habilidade para manipular em vez de construir', luz:'consegue manifestar praticamente qualquer intenção quando tem clareza sobre o motivo por trás dela.' },
  2:  { nome:'A Sacerdotisa', emoji:'🌙', astro:'a Lua', texto:'Fala de intuição, mistério e conhecimento que vem de dentro, não de fora. Pessoas ligadas a esse arcano costumam confiar mais no que sentem do que no que é dito, e têm facilidade para perceber o que não está sendo falado abertamente.',
    motto:'Eu sei sem precisar provar.', fornece:'a intuição e o silêncio necessário pra escutar por dentro', sombra:'o excesso de retraimento, guardando tudo pra si até se isolar', luz:'funciona como um radar interno, captando o que os outros nem percebem.' },
  3:  { nome:'A Imperatriz', emoji:'🌺', astro:'Vênus', texto:'Simboliza fertilidade, criação e abundância — no sentido criativo, afetivo e material. Indica uma energia nutridora, sensorial, conectada à natureza e ao prazer de cuidar e fazer crescer o que se planta.',
    motto:'Eu nutro.', fornece:'a fartura e a energia de criar e cuidar', sombra:'o excesso de entrega, dando tanto de si que esquece de se preencher também', luz:'faz florescer praticamente tudo que toca com carinho e constância.' },
  4:  { nome:'O Imperador', emoji:'♛', astro:'Áries', texto:'Traz estrutura, autoridade e disciplina. Reflete capacidade de organizar, liderar e sustentar responsabilidades por meio de regras claras — o ponto de atenção é não deixar essa estrutura virar rigidez ou controle excessivo.',
    motto:'Eu estruturo.', fornece:'a ordem e a capacidade de sustentar responsabilidade', sombra:'a rigidez de quem confunde controle com segurança', luz:'constrói bases sólidas o bastante pra outras pessoas se apoiarem nelas.' },
  5:  { nome:'O Hierofante', emoji:'📜', astro:'Touro', texto:'Está ligado à tradição, ao aprendizado formal e a sistemas de crença compartilhados. Costuma indicar alguém que valoriza referências, mentores e estruturas estabelecidas — e que também pode ensinar o que aprendeu para outros.',
    motto:'Eu aprendo (e ensino).', fornece:'o respeito por sistemas de referência e a vontade de aprender de verdade', sombra:'o apego a regras que já não fazem mais sentido', luz:'vira referência pra quem busca orientação e estrutura de crença.' },
  6:  { nome:'Os Enamorados', emoji:'💫', astro:'Gêmeos', texto:'Fala sobre escolhas, vínculos e alinhamento entre razão e coração. Marca a importância das relações na trajetória da pessoa e a necessidade de decidir com base em valores próprios, não só em pressão externa.',
    motto:'Eu escolho.', fornece:'a necessidade de alinhar decisões a valores pessoais reais', sombra:'a indecisão diante de caminhos que parecem certos dos dois lados', luz:'escolhe com o coração inteiro quando entende de verdade o que quer.' },
  7:  { nome:'O Carro', emoji:'🐎', astro:'Câncer', texto:'Representa determinação, foco e a capacidade de avançar mesmo diante de forças contrárias. Indica alguém que precisa aprender a equilibrar impulsos opostos dentro de si para manter o rumo sem se desviar.',
    motto:'Eu avanço.', fornece:'determinação pra seguir mesmo sob pressão', sombra:'o conflito entre impulsos opostos que competem pela mesma direção', luz:'vence pela persistência de manter o rumo, mesmo quando o caminho balança.' },
  8:  { nome:'A Justiça', emoji:'⚖️', astro:'Libra', texto:'Simboliza equilíbrio, verdade e consequência. Costuma indicar um forte senso de ética e a necessidade de clareza e coerência entre o que se pensa, se diz e se faz.',
    motto:'Eu equilibro com verdade.', fornece:'clareza ética e senso de causa e efeito', sombra:'o julgamento rígido, inclusive consigo mesmo', luz:'toma decisões justas mesmo quando elas são difíceis de tomar.' },
  9:  { nome:'O Eremita', emoji:'🕯️', astro:'Virgem', texto:'Está ligado à introspecção, à busca de sentido e à sabedoria que vem do recolhimento. Indica alguém que precisa de tempo sozinho para se entender antes de guiar ou ajudar outras pessoas.',
    motto:'Eu me recolho pra entender.', fornece:'a necessidade de introspecção antes de agir ou guiar alguém', sombra:'o isolamento excessivo, evitando pedir ou receber ajuda', luz:'encontra respostas profundas justamente nos momentos de silêncio.' },
  10: { nome:'A Roda da Fortuna', emoji:'🎡', astro:'Júpiter', texto:'Fala de ciclos, mudanças e do que está fora do nosso controle direto. Costuma indicar uma vida com reviravoltas marcantes, e a necessidade de aprender a se adaptar em vez de resistir ao movimento natural das coisas.',
    motto:'Eu giro com o ciclo.', fornece:'a consciência de que mudança é inevitável e cíclica', sombra:'a sensação de estar sempre à mercê de forças fora do controle', luz:'sabe girar junto com a vida em vez de travar contra ela.' },
  11: { nome:'A Força', emoji:'🦁', astro:'Leão', texto:'Não é sobre força bruta, mas sobre coragem gentil — a capacidade de lidar com os próprios instintos e com situações difíceis através de paciência e domínio interior, não de confronto.',
    motto:'Eu domo, não domino.', fornece:'coragem gentil pra lidar com instintos difíceis', sombra:'a tentação de reprimir em vez de realmente processar', luz:'transforma situações tensas com paciência em vez de confronto.' },
  12: { nome:'O Enforcado', emoji:'🌀', astro:'Netuno (elemento Água)', texto:'Representa pausa, entrega e mudança de perspectiva. Indica alguém que aprende mais soltando o controle e olhando a situação de outro ângulo do que insistindo em forçar um resultado.',
    motto:'Eu solto o controle.', fornece:'a disposição de ver a mesma situação por outro ângulo', sombra:'a paralisia de ficar tempo demais "em suspenso" sem decidir', luz:'encontra clareza justamente quando para de forçar uma saída.' },
  13: { nome:'A Morte', emoji:'🦋', astro:'Escorpião', texto:'Apesar do nome, fala de transformação e encerramento de ciclos, não de fim literal. Costuma indicar uma vida marcada por reinvenções profundas — a pessoa se desfaz do que não serve mais para dar espaço ao que vem a seguir.',
    motto:'Eu me transformo.', fornece:'a coragem de encerrar o que já cumpriu seu papel', sombra:'o medo de mudanças que, na real, já estão em curso', luz:'se reinventa com uma naturalidade que impressiona quem está por perto.' },
  14: { nome:'A Temperança', emoji:'🧪', astro:'Sagitário', texto:'Simboliza equilíbrio, paciência e a arte de misturar opostos até encontrar o ponto certo. Indica alguém que tende a buscar meio-termo, moderação e cura ao longo da vida.',
    motto:'Eu misturo até equilibrar.', fornece:'paciência pra encontrar o meio-termo entre extremos', sombra:'a demora em decidir por querer misturar tudo com cuidado demais', luz:'transforma combinações difíceis em algo que finalmente funciona.' },
  15: { nome:'O Diabo', emoji:'⛓️', astro:'Capricórnio', texto:'Fala de apego, tentação e amarras — muitas vezes autoimpostas. Costuma indicar a necessidade de reconhecer padrões viciosos ou dependências (materiais, emocionais) para conseguir se libertar deles.',
    motto:'Eu reconheço minhas amarras.', fornece:'consciência sobre apegos e padrões repetidos', sombra:'a dificuldade de romper com o que machuca mas é familiar', luz:'quando entende o próprio padrão, ganha um tipo raro de liberdade.' },
  16: { nome:'A Torre', emoji:'⚡', astro:'Marte', texto:'Representa ruptura repentina de estruturas que já não sustentavam mais nada de verdade. Indica uma vida com momentos de crise reveladora — desconfortáveis na hora, mas que abrem espaço para reconstruir algo mais real.',
    motto:'Eu deixo cair o que era ilusão.', fornece:'a capacidade de atravessar rupturas reveladoras', sombra:'o susto diante de mudanças que chegam sem aviso', luz:'reconstrói mais forte e mais real depois de cada colapso.' },
  17: { nome:'A Estrela', emoji:'⭐', astro:'Aquário', texto:'Simboliza esperança, inspiração e renovação depois de um período difícil. Costuma indicar alguém que serve de referência e conforto para outras pessoas, mesmo tendo passado por provações.',
    motto:'Eu acredito.', fornece:'esperança e clareza de propósito depois de fases difíceis', sombra:'a frustração quando o ideal demora a virar realidade', luz:'inspira quem está por perto só por continuar olhando pra frente.' },
  18: { nome:'A Lua', emoji:'🌘', astro:'Peixes', texto:'Fala de subconsciente, sonhos e emoções que nem sempre são fáceis de explicar racionalmente. Indica uma sensibilidade forte para o que não é dito, mas também a necessidade de não se perder em medos e ilusões.',
    motto:'Eu sinto antes de entender.', fornece:'sensibilidade pro que não é dito e pro próprio inconsciente', sombra:'a tendência a se perder em medos ou ilusões sem perceber', luz:'acessa camadas emocionais que a maioria nem sabe que existem.' },
  19: { nome:'O Sol', emoji:'☀️', astro:'o próprio Sol', texto:'É um dos arcanos mais positivos: vitalidade, clareza e alegria genuína. Costuma indicar alguém com energia contagiante e facilidade em irradiar confiança para quem está por perto.',
    motto:'Eu brilho com clareza.', fornece:'vitalidade, confiança e alegria genuína', sombra:'um otimismo tão grande que às vezes ignora sinais de alerta', luz:'contagia quem está por perto com uma energia difícil de fingir.' },
  20: { nome:'O Julgamento', emoji:'🔔', astro:'Plutão (elemento Fogo)', texto:'Representa chamado, despertar e avaliação honesta do próprio caminho. Indica momentos de virada em que a pessoa é convocada a se responsabilizar por escolhas passadas e decidir quem quer ser daqui pra frente.',
    motto:'Eu me responsabilizo.', fornece:'um chamado interno pra avaliar o caminho com honestidade', sombra:'a autocobrança severa ao revisar decisões do passado', luz:'desperta pra quem realmente quer ser, com coragem de mudar de rota.' },
  21: { nome:'O Mundo', emoji:'🌍', astro:'Saturno', texto:'Simboliza realização, integração e o fechamento bem-sucedido de um grande ciclo. Costuma indicar alguém que, com esforço, consegue reunir as partes da própria jornada em um sentido coerente.',
    motto:'Eu completo o ciclo.', fornece:'a capacidade de integrar experiências diferentes num sentido só', sombra:'a dificuldade de saber quando algo realmente está "pronto"', luz:'realiza o que se propôs com uma sensação rara de inteireza.' },
  22: { nome:'O Louco', emoji:'🃏', astro:'Urano (elemento Ar)', texto:'Representa começo, liberdade e a coragem de dar o primeiro passo sem garantias do que vem depois. Indica espontaneidade, abertura ao novo e disposição para viver por experiência, não só por planejamento.',
    motto:'Eu começo sem garantias.', fornece:'espontaneidade e coragem de saltar sem mapa', sombra:'a imprudência de pular etapas importantes', luz:'vive experiências que só existem pra quem topa o risco.' },
};


/* Calcula o "arcano pessoal" por numerologia: soma os dígitos
   do dia + mês + ano de nascimento, reduzindo o resultado até
   ficar entre 1 e 22 (equivalente aos 22 arcanos maiores) */
function calcularArcano(dia, mes, ano) {
  const somaDigitos = n => String(n).split('').reduce((a,d) => a + Number(d), 0);
  let soma = somaDigitos(dia) + somaDigitos(mes) + somaDigitos(ano);
  while (soma > 22) soma = somaDigitos(soma);
  if (soma === 0) soma = 22;
  return { numero: soma, ...ARCANOS[soma] };
}


/* ------------------------------------------------------
   3) INTERPRETAÇÃO COMBINADA (signo + arcano)
   Monta um HTML com: aviso sobre o caráter simbólico,
   comparação com a correspondência tradicional do tarot,
   o que cada um contribui, quando a combinação funciona bem,
   a sombra/ponto de atenção, e uma frase de fechamento estilo motto
   ------------------------------------------------------ */

function gerarCombinado(signo, arcano) {
  const s = SIGNOS[signo];
  const bateComSigno = arcano.astro === signo;

  let notaAstro;
  if (bateComSigno) {
    notaAstro = `Curiosamente, ${arcano.nome} já é o arcano tradicionalmente associado a ${signo} no sistema clássico de correspondências do tarot — ou seja, aqui as duas camadas simbólicas apontam praticamente na mesma direção, o que tende a reforçar (e não misturar) essas características.`;
  } else {
    notaAstro = `Vale um adendo: no sistema clássico de correspondências do tarot, ${arcano.nome} é tradicionalmente ligado a ${arcano.astro}, não a ${signo}. Isso não invalida nada — só significa que aqui estamos combinando dois símbolos que normalmente andam separados, então o resultado tende a ser uma mistura mais original do que uma combinação "de manual".`;
  }

  return `
    <p><em>Antes de tudo: astrologia e tarot são sistemas simbólicos, não descrições científicas de personalidade. ${notaAstro}</em></p>
    <p>${s.simbolo} <strong>${signo}</strong> entra com ${s.fornece}. ${arcano.emoji} <strong>${arcano.nome}</strong> entra com ${arcano.fornece}. Juntando os dois, aparece alguém que tende a funcionar pela lógica de unir ação com significado — não é só "fazer por fazer", é fazer <em>por causa de</em> alguma coisa.</p>
    <p><strong>🔥 Quando dá certo:</strong> essa combinação ${arcano.luz} ${signo} sabe colocar as coisas em movimento, e ${arcano.nome} sabe dar direção pra esse movimento não se perder pelo caminho — um fornece o motor, o outro fornece o rumo.</p>
    <p><strong>🌑 Mas tem uma sombra:</strong> o ponto de atenção é misturar ${s.sombraFrase} com ${arcano.sombra}. Quando as duas coisas se somam ao mesmo tempo, o resultado pode ser tanto impulso demais quanto idealismo demais — vale ficar de olho nisso, principalmente em decisões tomadas no calor do momento.</p>
    <p style="text-align:center; font-style:italic; color:#cfc9e8; margin-top:1.2rem; line-height:1.9;">
      ${s.simbolo} ${signo}: "${s.motto}"<br>
      ${arcano.emoji} ${arcano.nome}: "${arcano.motto}"<br>
      Juntos: "Então vamos ${s.verbo} até onde isso pode chegar."
    </p>
  `;
}
