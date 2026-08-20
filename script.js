// Estado do Jogador
const estadoJogo = {
  casoAtual: 1,
  pistas: [], // Ex: 'nome_quimico', 'mapa_rotas'
  escolhas: {} // Guarda o histórico de decisões
};

// Árvore de Decisão por Casos
const casos = {
  // CASO 1
  caso1_inicio: {
    titulo: "CASO 1: O Veneno no Sindicato",
    texto: "Lorde Sterling morre envenenado. Um anel de contrabando de arte é exposto. Por onde você prefere começar?",
    escolhas: [
      { texto: "Foco no Veneno (Analisar a substância)", proximo: "caso1_opcA" },
      { texto: "Foco nos Documentos (Revistar os papéis)", proximo: "caso1_opcB" }
    ]
  },
  caso1_opcA: {
    titulo: "CASO 1: Pista do Veneno",
    texto: "Você descobre que o veneno veio de um químico clandestino conhecido como 'O Alquimista'.",
    acao: () => {
      estadoJogo.pistas.push("Nome do Fornecedor");
      estadoJogo.escolhas.caso1 = "veneno";
    },
    escolhas: [{ texto: "Avançar para o Caso 2", proximo: "caso2_inicio" }]
  },
  caso1_opcB: {
    titulo: "CASO 1: Pista dos Documentos",
    texto: "Entre os papéis, você recupera um mapa parcial de rotas clandestinas da cidade.",
    acao: () => {
      estadoJogo.pistas.push("Mapa das Rotas");
      estadoJogo.escolhas.caso1 = "documentos";
    },
    escolhas: [{ texto: "Avançar para o Caso 2", proximo: "caso2_inicio" }]
  },

  // CASO 2
  caso2_inicio: {
    titulo: "CASO 2: A Falsificação Fatal",
    texto: "O restaurador da galeria local é encontrado morto na oficina, cercado de quadros falsificados com a marca da família Sterling.",
    gerarEscolhas: () => {
      const opcoes = [
        { texto: "Perseguir o Comprador (Alta Sociedade)", proximo: "caso2_opcA" }
      ];
      // Habilita o uso do mapa se pegou no Caso 1
      if (estadoJogo.pistas.includes("Mapa das Rotas")) {
        opcoes.push({ texto: "Buscar o Depósito Escondido (Usar Mapa)", proximo: "caso2_opcB" });
      } else {
        opcoes.push({ texto: "Buscar o Depósito Escondido (Sem Mapa - Busca Cega)", proximo: "caso2_opcB" });
      }
      return opcoes;
    }
  },
  caso2_opcA: {
    titulo: "CASO 2: O Nobre Corrupto",
    texto: "Você confronta um nobre corrupto na alta sociedade. Ganha apoio financeiro, mas a máfia descobre sua identidade.",
    acao: () => {
      estadoJogo.pistas.push("Apoio Financeiro");
      estadoJogo.escolhas.caso2 = "nobre";
    },
    escolhas: [{ texto: "Avançar para o Caso 3", proximo: "caso3_inicio" }]
  },
  caso2_opcB: {
    titulo: "CASO 2: O Depósito das Docas",
    texto: "Você invade o galpão das docas e encontra uma lista de alvos de assassinato (incluindo o Prefeito).",
    acao: () => {
      estadoJogo.pistas.push("Lista de Alvos");
      estadoJogo.escolhas.caso2 = "galpao";
    },
    escolhas: [{ texto: "Avançar para o Caso 3", proximo: "caso3_inicio" }]
  },

  // CASO 3
  caso3_inicio: {
    titulo: "CASO 3: O Atentado no Teatro",
    texto: "Durante uma ópera, o Prefeito sofre um ataque armado. A arma pertence ao Sindicato dos Trabalhadores.",
    escolhas: [
      { texto: "Proteger o Prefeito", proximo: "caso3_opcA" },
      { texto: "Capturar o Atirador", proximo: "caso3_opcB" }
    ]
  },
  caso3_opcA: {
    titulo: "CASO 3: Prefeito Salvo",
    texto: "Você salva o Prefeito, mas o atirador escapa. A atitude abre portas com a polícia oficial.",
    acao: () => {
      estadoJogo.pistas.push("Apoio da Polícia");
      estadoJogo.escolhas.caso3 = "salvou_prefeito";
    },
    escolhas: [{ texto: "Avançar para o Caso 4", proximo: "caso4_inicio" }]
  },
  caso3_opcB: {
    titulo: "CASO 3: Atirador Capturado",
    texto: "Você prende o atirador. Ele revela ser um bode expiatório chantageado pela organização 'A Lótus Vermelha'.",
    acao: () => {
      estadoJogo.pistas.push("Nome: Lótus Vermelha");
      estadoJogo.escolhas.caso3 = "prendeu_atirador";
    },
    escolhas: [{ texto: "Avançar para o Caso 4", proximo: "caso4_inicio" }]
  },

  // CASO 4
  caso4_inicio: {
    titulo: "CASO 4: A Queda do Juiz",
    texto: "O Juiz responsável pelo caso Sterling é encontrado morto em seu gabinete trancado por dentro.",
    escolhas: [
      { texto: "Investigar a CENA (Segredo da Sala)", proximo: "caso4_opcA" },
      { texto: "Investigar as FINANÇAS do Juiz", proximo: "caso4_opcB" }
    ]
  },
  caso4_opcA: {
    titulo: "CASO 4: Passagem Secreta",
    texto: "Você descobre uma passagem secreta no gabinete que leva direto aos bastidores da organização.",
    acao: () => {
      estadoJogo.pistas.push("Acesso Secreto");
      estadoJogo.escolhas.caso4 = "passagem";
    },
    escolhas: [{ texto: "Avançar para o Confronto Final", proximo: "caso5_resolucao" }]
  },
  caso4_opcB: {
    titulo: "CASO 4: Rastros Financeiros",
    texto: "Você encontra papéis contendo subornos e a senha do cofre principal da corporação de fachada.",
    acao: () => {
      estadoJogo.pistas.push("Senha do Cofre");
      estadoJogo.escolhas.caso4 = "financas";
    },
    escolhas: [{ texto: "Avançar para o Confronto Final", proximo: "caso5_resolucao" }]
  },

  // CASO 5: FINAL
  caso5_resolucao: {
    titulo: "CASO 5: O Mestre das Sombras",
    gerarTexto: () => {
      if (estadoJogo.escolhas.caso3 === "salvou_prefeito") {
        return "Com as provas reunidas, você descobre a verdade: O Prefeito, a quem você salvou no teatro, é o Mestre Supremo por trás de todo o crime organizado!";
      } else {
        return "Com as provas reunidas, você descobre a verdade: O Chefe de Polícia é o verdadeiro líder por trás do Sindicato e da Lótus Vermelha!";
      }
    },
    gerarEscolhas: () => [
      { texto: "Prender o Vilão e Concluir o Jogo", proximo: "fim_jogo" }
    ]
  },
  fim_jogo: {
    titulo: "CAMPANHA CONCLUÍDA!",
    texto: "Você encerrou a rede de corrupção na cidade. Parabéns, Detetive!",
    escolhas: [{ texto: "Jogar Novamente", proximo: "reiniciar" }]
  }
};

// Motores de Renderização
function carregarCena(chaveCena) {
  if (chaveCena === "reiniciar") {
    estadoJogo.pistas = [];
    estadoJogo.escolhas = {};
    carregarCena("caso1_inicio");
    return;
  }

  const cena = casos[chaveCena];

  // Executa ações da cena se houver
  if (cena.acao) cena.acao();

  // Atualiza Interface
  document.getElementById("titulo-caso").innerText = cena.titulo;
  document.getElementById("texto-cena").innerText = cena.gerarTexto ? cena.gerarTexto() : cena.texto;

  // Atualiza Inventário de Pistas
  const PainelPistas = document.getElementById("lista-pistas");
  PainelPistas.innerHTML = estadoJogo.pistas.map(p => `<li>${p}</li>`).join("");

  // Atualiza Botões
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

// Inicializa
carregarCena("caso1_inicio");