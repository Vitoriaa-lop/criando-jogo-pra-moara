// Estado Global do Jogador
const estadoJogo = {
  vidas: 3,
  pistas: [],
  escolhas: {}
};

// Estrutura Completa da Campanha
const casos = {
  // CASO 1: O ESCRITÓRIO DO LORDE STERLING
  caso1_inicio: {
    titulo: "CASO 1: O Escritório de Lorde Sterling",
    texto: "Você entra no escritório particular de Lorde Sterling às 23h15. O corpo do negociador de arte repousa sobre a poltrona de couro. Na mesa: dois cálices de cristal (um tombado e seco, outro em pé com vinho). A boca do falecido exala aroma de amêndoas amargas.\n\nA gaveta da escrivaninha está forçada e papéis queimam no lixo ao lado. No chão, há um botão de osso polido preso por um fio de seda azul.\n\nO mordomo Arthur diz que serviu o vinho às 22h00 e só voltou ao ouvir a taça caindo. Porém, há cinzas de papel na sola do sapato dele, e seu uniforme usa botões metálicos prateados.",
    escolhas: [
      { texto: "Fazer Dedução 1: Causa da Morte", proximo: "caso1_deducao1" }
    ]
  },

  caso1_deducao1: {
    titulo: "DEDUÇÃO 1: A Causa da Morte",
    texto: "Qual é o meio exato usado no assassinato e onde o veneno foi colocado?",
    escolhas: [
      { texto: "[A] Veneno cianeto aplicado na borda do cálice tombado.", proximo: "caso1_erro1" },
      { texto: "[B] Veneno dentro da garrafa principal de vinho.", proximo: "caso1_erro1" },
      { texto: "[C] Veneno (cianeto) ingerido por Sterling antes do vinho; a taça caiu com o espasmo.", proximo: "caso1_sucesso1" },
      { texto: "[D] Gás inalado vindo dos papéis queimados.", proximo: "caso1_erro1" }
    ]
  },

  caso1_erro1: {
    titulo: "DEDUÇÃO INCORRETA!",
    texto: "Se o veneno estivesse na garrafa, a outra taça serviria de prova. Se estivesse na borda da taça seca, não haveria cheiro forte na boca sem rastros do líquido.",
    acao: () => { estadoJogo.vidas -= 1; },
    gerarEscolhas: () => processarEscolhaErro("caso1_deducao1")
  },

  caso1_sucesso1: {
    titulo: "DEDUÇÃO CORRETA!",
    texto: "O cheiro de amêndoas é clássico do cianeto. A taça seca indica que ele não bebeu dela no colapso; o veneno foi ministrado antes, provocando a queda da taça seca.\n\nDesbloqueado: Pista A1 (Envenenamento Rápido por Cianeto).",
    acao: () => {
      if (!estadoJogo.pistas.includes("Pista A1: Envenenamento por Cianeto")) {
        estadoJogo.pistas.push("Pista A1: Envenenamento por Cianeto");
      }
    },
    escolhas: [
      { texto: "Avançar para Dedução 2: Testemunho de Arthur", proximo: "caso1_deducao2" }
    ]
  },

  caso1_deducao2: {
    titulo: "DEDUÇÃO 2: O Testemunho e as Evidências",
    texto: "Com base nas evidências físicas e depoimentos, qual foi o verdadeiro papel do Mordomo Arthur?",
    escolhas: [
      { texto: "[A] Arthur é o assassino e perdeu o botão do terno na luta.", proximo: "caso1_erro2" },
      { texto: "[B] Arthur não é o assassino, mas destruiu evidências na gaveta após a morte.", proximo: "caso1_sucesso2" },
      { texto: "[C] Arthur é inocente e as cinzas vieram da lareira.", proximo: "caso1_erro2" },
      { texto: "[D] Arthur é o mandante e usou botão de osso para incriminar a esposa.", proximo: "caso1_erro2" }
    ]
  },

  caso1_erro2: {
    titulo: "DEDUÇÃO INCORRETA!",
    texto: "Os botões de Arthur são prateados, não de osso com seda azul. As cinzas no sapato dele vêm dos papéis queimados da gaveta, provando sua mentira.",
    acao: () => { estadoJogo.vidas -= 1; },
    gerarEscolhas: () => processarEscolhaErro("caso1_deducao2")
  },

  caso1_sucesso2: {
    titulo: "DEDUÇÃO CORRETA!",
    texto: "O botão de osso com seda azul prova um segundo visitante (o invasor). As cinzas no sapato de Arthur provam que ele queimou papéis após o crime.\n\nDesbloqueado: Pista B1 (O Terceiro Homem de Seda Azul).",
    acao: () => {
      if (!estadoJogo.pistas.includes("Pista B1: Seda Azul & Botão de Osso")) {
        estadoJogo.pistas.push("Pista B1: Seda Azul & Botão de Osso");
      }
    },
    escolhas: [
      { texto: "Ir para o Caso 2: A Falsificação Fatal", proximo: "caso2_inicio" }
    ]
  },

  // CASO 2: A FALSIFICAÇÃO FATAL
  caso2_inicio: {
    titulo: "CASO 2: A Falsificação Fatal",
    texto: "Às 03h40, você entra no ateliê do restaurador Mateo Rossi. O corpo está na bancada, cercado de réplicas de Sterling. Tinta óleo azul-cobalto mancha seu braço esquerdo. Um hematoma na nuca indica golpe seco.\n\nUma lâmpada UV foca em uma tela em branco. Há uma xícara de café à direita de Mateo (que era canhoto) e um retalho de lã cinza numa estaca da porta dos fundos. A janela do teto está aberta com uma escada suja de tinta cobalto.",
    escolhas: [
      { texto: "Fazer Dedução: A Rota de Fuga", proximo: "caso2_deducao" }
    ]
  },

  caso2_deducao: {
    titulo: "DEDUÇÃO: A Rota de Fuga",
    texto: "Qual foi a real dinâmica do ataque e a rota de fuga do assassino?",
    escolhas: [
      { texto: "[A] Entrou pelo teto, golpeou Mateo e fugiu pela porta dos fundos.", proximo: "caso2_erro" },
      { texto: "[B] Tomou café com Mateo, atacou por trás e subiu pela escada até o teto.", proximo: "caso2_erro" },
      { texto: "[C] Atacou Mateo por trás, simulou fuga pela escada e fugiu pela porta dos fundos.", proximo: "caso2_sucesso" },
      { texto: "[D] Mateo foi atacado fora, tentou fugir pela claraboia e caiu.", proximo: "caso2_erro" }
    ]
  },

  caso2_erro: {
    titulo: "DEDUÇÃO INCORRETA!",
    texto: "Se o assassino subiu a escada coberta de tinta úmida, haveria marcas no telhado. O café à direita indica uma visita destra sentada com Mateo antes do golpe.",
    acao: () => { estadoJogo.vidas -= 1; },
    gerarEscolhas: () => processarEscolhaErro("caso2_deducao")
  },

  caso2_sucesso: {
    titulo: "DEDUÇÃO CORRETA!",
    texto: "Mateo era canhoto e recebia um visitante destro. A tinta na escada foi forjada para enganar a perícia; a fuga real ocorreu pela porta dos fundos.\n\nDesbloqueado: Pista Roupas de Lã Cinza do Assassino.",
    acao: () => {
      if (!estadoJogo.pistas.includes("Pista: Lã Cinza do Assassino")) {
        estadoJogo.pistas.push("Pista: Lã Cinza do Assassino");
      }
    },
    escolhas: [
      { texto: "Ir para o Caso 3: O Atentado no Teatro", proximo: "caso3_inicio" }
    ]
  },

  // CASO 3: O ATENTADO NO TEATRO
  caso3_inicio: {
    titulo: "CASO 3: O Atentado no Teatro",
    texto: "Na ópera, um disparo atinge o Prefeito de raspão no ombro. Na galeria técnica, você encontra um rifle com silenciador em um tripé (cano quente) e dois estojos deflagrados, mas a plateia ouviu apenas um estrondo.\n\nHá graxa recente no chão e um bilhete: 'O alvo muda na segunda cortina'. O suspeito preso no corredor é um operário vestindo paletó de lã cinza rasgado e botas sujas de graxa.",
    escolhas: [
      { texto: "Fazer Dedução: A Intenção do Atentado", proximo: "caso3_deducao" }
    ]
  },

  caso3_deducao: {
    titulo: "DEDUÇÃO: A Verdadeira Intenção",
    texto: "Qual é o mistério por trás do disparo no teatro?",
    escolhas: [
      { texto: "[A] O operário é o único atirador e errou o primeiro tiro.", proximo: "caso3_erro" },
      { texto: "[B] O atirador disparou duas vezes simultaneamente para matar o Prefeito.", proximo: "caso3_erro" },
      { texto: "[C] O Prefeito nunca foi o alvo; o ataque incriminou o operário.", proximo: "caso3_erro" },
      { texto: "[D] Tiro de festim no tripé criou o barulho para incriminar o operário; o tiro real veio de outro ângulo.", proximo: "caso3_sucesso" }
    ]
  },

  caso3_erro: {
    titulo: "DEDUÇÃO INCORRETA!",
    texto: "Um rifle com silenciador não faz estrondo suficiente para assustar a plateia toda. Dois estojos e um só som indicam disparos sincronizados de fontes diferentes.",
    acao: () => { estadoJogo.vidas -= 1; },
    gerarEscolhas: () => processarEscolhaErro("caso3_deducao")
  },

  caso3_sucesso: {
    titulo: "DEDUÇÃO CORRETA!",
    texto: "O estrondo foi uma encenação. O tripé usou um tiro de festim para culpar o operário de lã cinza, enquanto o projétil real partiu de uma segunda posição oculta.\n\nDesbloqueado: Pista Sindicato das Sombras / Segundo Atirador.",
    acao: () => {
      if (!estadoJogo.pistas.includes("Pista: Sindicato / Segundo Atirador")) {
        estadoJogo.pistas.push("Pista: Sindicato / Segundo Atirador");
      }
    },
    escolhas: [
      { texto: "Ir para o Caso 4: A Queda do Juiz", proximo: "caso4_inicio" }
    ]
  },

  // CASO 4: A QUEDA DO JUIZ
  caso4_inicio: {
    titulo: "CASO 4: A Queda do Juiz",
    texto: "O Juiz Vance é encontrado morto no gabinete trancado por dentro no 4º andar. A causa foi um tiro no peito. Janela e porta intactas. Lareira acesa, xícara de chá quente e um relógio de bolso parado às 22h10 com o vidro quebrado.\n\nO zelador limpou o duto de ar do andar entre 21h30 e 22h30 e afirma não ter ouvido tiro algum.",
    escolhas: [
      { texto: "Fazer Dedução: A Sala Fechada", proximo: "caso4_deducao" }
    ]
  },

  caso4_deducao: {
    titulo: "DEDUÇÃO: O Mecanismo do Crime",
    texto: "Como o assassino executou o crime sem quebrar a tranca ou a janela?",
    escolhas: [
      { texto: "[A] Atirou pelo duto de ar usando silenciador.", proximo: "caso4_erro" },
      { texto: "[B] O Juiz cometeu suicídio e quebrou o relógio na queda.", proximo: "caso4_erro" },
      { texto: "[C] Armadilha mecânica ligada à lareira/relógio atirou e simulou a hora da morte muito depois do crime.", proximo: "caso4_sucesso" },
      { texto: "[D] O zelador usou chave mestre para trancar a porta.", proximo: "caso4_erro" }
    ]
  },

  caso4_erro: {
    titulo: "DEDUÇÃO INCORRETA!",
    texto: "O chá morno e as brasas aqueciam o ambiente para simular presença recente. O relógio e o disparo foram controlados por uma armadilha oculta.",
    acao: () => { estadoJogo.vidas -= 1; },
    gerarEscolhas: () => processarEscolhaErro("caso4_deducao")
  },

  caso4_sucesso: {
    titulo: "DEDUÇÃO CORRETA!",
    texto: "O relógio parado às 22h10 e a sala aquecida forjaram o horário. A armadilha executou o tiro automático enquanto o ambiente estava trancado por dentro.\n\nDesbloqueado: Pista Chave do Cofre do Palácio.",
    acao: () => {
      if (!estadoJogo.pistas.includes("Pista: Chave do Cofre do Palácio")) {
        estadoJogo.pistas.push("Pista: Chave do Cofre do Palácio");
      }
    },
    escolhas: [
      { texto: "Ir para o Confronto Final: O Mestre das Sombras", proximo: "caso5_inicio" }
    ]
  },

  // CASO 5: O MESTRE DAS SOMBRAS (FINAL)
  caso5_inicio: {
    titulo: "CASO 5: O Mestre das Sombras",
    texto: "Você invade o covil subterrâneo sob o Palácio da Justiça. Três suspeitos cercam os papéis roubados de Sterling:\n\n• O Chefe de Polícia: Terno com botões metálicos prateados e botas engraxadas.\n• O Prefeito: Ombro enfaixado, sobretudo de lã azul e caneta de ouro.\n• A Promotora: Paletó de alfaiataria com botões de osso polido e costura em fio de seda azul.\n\nNa mesa há cianeto e o testamento alterado. O Chefe de Polícia saca a arma: 'Você chegou longe demais, detetive!'",
    escolhas: [
      { texto: "ACUSAR O VERDADEIRO MANDANTE", proximo: "caso5_deducao" }
    ]
  },

  caso5_deducao: {
    titulo: "DEDUÇÃO FINAL: Quem é o Mestre das Sombras?",
    texto: "Analise todas as pistas acumuladas desde o Caso 1. Quem é o verdadeiro líder da conspiração?",
    escolhas: [
      { texto: "[A] O Chefe de Polícia, que encobriu todos os vestígios.", proximo: "final_ruim" },
      { texto: "[B] A Promotora, cujo botão de osso com seda azul estava no escritório de Sterling.", proximo: "final_perfeito" },
      { texto: "[C] O Prefeito, que simulou o atentado para desviar suspeitas.", proximo: "final_ruim" },
      { texto: "[D] O Mordomo Arthur em conluio com o Chefe de Polícia.", proximo: "final_ruim" }
    ]
  },

  final_ruim: {
    titulo: "❌ GAME OVER - FINAL RUIM",
    texto: "Você acusa a pessoa errada! A Promotora usa sua influência jurídica para anular suas acusações. O verdadeiro mandante foge da cidade e você é incriminado pela morte do Juiz Vance.",
    escolhas: [{ texto: "Recomeçar Investigação", proximo: "reiniciar" }]
  },

  final_perfeito: {
    titulo: "🏆 FINAL PERFEITO - CASO RESOLVIDO!",
    texto: "A Promotora era a mente por trás do Sindicato! O botão de osso preso com seda azul no Caso 1 foi a prova irrefutável que a ligou à chantagem de Sterling. Ela usava o Chefe de Polícia como força bruta e o Prefeito como fantoche. A polícia honesta efetua a prisão de toda a rede!",
    escolhas: [{ texto: "Jogar Novamente", proximo: "reiniciar" }]
  }
};

// Utilitário para controle de vidas e erros
function processarEscolhaErro(noRetorno) {
  if (estadoJogo.vidas <= 0) {
    return [{ texto: "☠️ Vidas Esgotadas! Recomeçar o Jogo", proximo: "reiniciar" }];
  }
  return [{ texto: "Tentar Analisar a Cena Novamente (-1 Vida)", proximo: noRetorno }];
}

// Engine de Renderização
function carregarCena(chaveCena) {
  if (chaveCena === "reiniciar") {
    estadoJogo.vidas = 3;
    estadoJogo.pistas = [];
    carregarCena("caso1_inicio");
    return;
  }

  const cena = casos[chaveCena];
  if (cena.acao) cena.acao();

  document.getElementById("titulo-caso").innerText = cena.titulo;
  document.getElementById("texto-cena").innerText = cena.texto;

  // Atualiza painel visual de Pistas e Vidas
  const painelPistas = document.getElementById("lista-pistas");
  let htmlPistas = estadoJogo.pistas.map(p => `<li>${p}</li>`).join("");
  htmlPistas += `<li style="color: #ef4444; font-weight: bold; margin-top: 10px;">❤️ Vidas Restantes: ${estadoJogo.vidas}</li>`;
  painelPistas.innerHTML = htmlPistas;

  // Renderiza os botões de escolha
  const conteinerBotoes = document.getElementById("botoes-escolhas");
  conteinerBotoes.innerHTML = "";

  const listaEscolhas = cena.gerarEscolhas ? cena.gerarEscolhas() : cena.escolhas;

  listaEscolhas.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn-opcao";
    btn.innerText = opt.texto;
    btn.onclick = () => carregarCena(opt.proximo);
    conteinerBotoes.appendChild(btn);
  });
}

// Inicializar a aplicação
carregarCena("caso1_inicio");