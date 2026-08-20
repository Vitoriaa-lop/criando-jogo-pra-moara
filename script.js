// Árvore de decisão em formato de fluxograma
const fluxoDoJogo = {
  // Nó Inicial
  inicio: {
    texto: "Bem-vindo à agência, Detetive. Você tem uma mesa cheia de arquivos e a cidade conta com a sua dedicação.\n\nCASO 01: O Desaparecimento do Quadro de Ouro\nO valioso quadro 'A Lápide do Sol' sumiu da galeria durante a festa. Pistas iniciais: taça com lama no chão, ar-condicionado pifou às 22h e regadores molharam o jardim às 21h50.\n\nPor onde deseja começar?",
    escolhas: [
      { texto: "Interrogar Marcos (O Zelador)", proximoNo: "marcos_interrogatorio" },
      { texto: "Confrontar Lucas (O Colecionador)", proximoNo: "lucas_interrogatorio" },
      { texto: "Questionar Beatriz (A Curadora)", proximoNo: "beatriz_interrogatorio" }
    ]
  },

  // Ramo: Marcos
  marcos_interrogatorio: {
    texto: "Marcos diz: 'O ar-condicionado pifou às 22h por sobrecarga. Passei a noite toda trancado na sala de máquinas e não vi ninguém.'\n\nO que fazer agora?",
    escolhas: [
      { texto: "Acusar Marcos pelo crime", proximoNo: "fim_derrota_marcos" },
      { texto: "Ir falar com o Lucas", proximoNo: "lucas_interrogatorio" },
      { texto: "Ir falar com a Beatriz", proximoNo: "beatriz_interrogatorio" }
    ]
  },

  // Ramo: Beatriz
  beatriz_interrogatorio: {
    texto: "Beatriz explica: 'Eu sabia a senha do alarme, mas anotei em um bloco na cozinha. Alguém pode ter visto enquanto eu falava com o chef.'\n\nO que fazer agora?",
    escolhas: [
      { texto: "Acusar Beatriz pelo crime", proximoNo: "fim_derrota_beatriz" },
      { texto: "Ir falar com o Lucas", proximoNo: "lucas_interrogatorio" },
      { texto: "Ir falar com o Marcos", proximoNo: "marcos_interrogatorio" }
    ]
  },

  // Ramo: Lucas
  lucas_interrogatorio: {
    texto: "Lucas diz: 'Eu só fiquei no salão principal bebendo champagne!'\nVocê mostra a taça com lama achada na cena. Os regadores molharam o jardim às 21h50. Se ele não saiu do salão, como a taça dele tem lama do jardim?\n\nEle gagueja e fica nervoso.",
    escolhas: [
      { texto: "🚨 Acusar Lucas imediatamente!", proximoNo: "fim_vitoria" },
      { texto: "Deixar Lucas para lá e falar com a Beatriz", proximoNo: "beatriz_interrogatorio" },
      { texto: "Deixar Lucas para lá e falar com o Marcos", proximoNo: "marcos_interrogatorio" }
    ]
  },

  // Nós de Finais
  fim_vitoria: {
    texto: "🏆 VITÓRIA! Lucas confessa! Ele foi ao jardim molhado durante a queda do ar-condicionado, pegou a anotação da senha na cozinha e roubou o quadro, deixando cair sua taça com lama.",
    escolhas: [
      { texto: "Reiniciar Investigação", proximoNo: "inicio" }
    ]
  },
  fim_derrota_marcos: {
    texto: "❌ FALHA! Marcos realmente estava na sala de máquinas. Sem provas da lama, seu caso é arquivado.",
    escolhas: [
      { texto: "Tentar Novamente", proximoNo: "inicio" }
    ]
  },
  fim_derrota_beatriz: {
    texto: "❌ FALHA! Beatriz estava na cozinha com testemunhas. O verdadeiro culpado fugiu!",
    escolhas: [
      { texto: "Tentar Novamente", proximoNo: "inicio" }
    ]
  }
};

// Gerenciador do Fluxo
function carregarNo(idNo) {
  const no = fluxoDoJogo[idNo];
  
  // Atualiza o texto da cena
  document.getElementById('texto-cena').innerText = no.texto;
  
  // Limpa e cria os botões de escolha
  const conteinerBotoes = document.getElementById('botoes-escolhas');
  conteinerBotoes.innerHTML = '';
  
  no.escolhas.forEach(escolha => {
    const btn = document.createElement('button');
    btn.className = 'btn-opcao';
    btn.innerText = escolha.texto;
    btn.onclick = () => carregarNo(escolha.proximoNo);
    conteinerBotoes.appendChild(btn);
  });
}

// Inicia o jogo no nó inicial
carregarNo('inicio');