// Banco de dados dos casos do jogo
const bancoDeCasos = [
  {
    id: 1,
    titulo: "CASO 01: O Desaparecimento do Quadro de Ouro",
    descricao: "O valioso quadro 'A Lápide do Sol' sumiu da galeria de arte da Sra. Valentina durante a festa de gala da última noite. Não há sinais de arrombamento nas portas ou janelas.",
    pistas: [
      "Uma taça de champagne quebrada perto da parede onde o quadro estava pendurado, com manchas de lama no pé do vidro.",
      "O sistema de ar-condicionado parou de funcionar exatamente às 22h, fazendo todos no salão irem até o jardim para tomar ar fresco.",
      "Apenas o jardim da galeria estava molhado devido aos regadores automáticos acionados às 21h50."
    ],
    suspeitos: [
      {
        id: "marcos",
        nome: "Marcos (O Zelador)",
        alibi: "Teve acesso a todas as chaves durante a limpeza, mas jura que passou a noite toda na sala de máquinas consertando o ar-condicionado."
      },
      {
        id: "beatriz",
        nome: "Beatriz (A Curadora)",
        alibi: "A única que sabia o código do alarme da moldura. Ela afirma que estava na cozinha conversando com o chef."
      },
      {
        id: "lucas",
        nome: "Lucas (O Colecionador)",
        alibi: "Tentou comprar o quadro semana passada, mas teve a proposta recusada. Ele diz que ficou apenas no salão principal bebendo taças de champagne."
      }
    ],
    investigacoes: [
      {
        opcao: "1. Interrogar o Marcos sobre o ar-condicionado.",
        resposta: "Marcos afirma que às 22h o sistema queimou um fusível por sobrecarga. Ele garante que não saiu da sala de máquinas."
      },
      {
        opcao: "2. Confrontar o Lucas sobre a taça de champagne e a lama.",
        resposta: "Lucas fica nervoso ao ver a foto da lama na taça! Se ele disse que ficou apenas no salão principal, como a taça dele acumulou lama do jardim molhado pelos regadores às 21h50?"
      },
      {
        opcao: "3. Questionar a Beatriz sobre quem mais poderia saber a senha do alarme.",
        resposta: "Beatriz confirma que anotou o código em um bloco de notas na cozinha, local de fácil acesso aos convidados durante a festa."
      }
    ],
    solucaoCorreta: "lucas",
    explicacaoVitoria: "CASO RESOLVIDO! Lucas mentiu ao dizer que nunca saiu do salão principal. Ele foi ao jardim molhado durante a falha do ar-condicionado, pegou a anotação do alarme na cozinha e furtou o quadro, deixando cair sua taça suja de lama ao remover a pintura.",
    explicacaoDerrota: "ACUSAÇÃO ERRADA! As evidências não sustentam a culpa desta pessoa. O verdadeiro culpado continua solto!"
  }
];

let casoAtualIndex = 0;

function iniciarJogo() {
  const caso = bancoDeCasos[casoAtualIndex];

  // Preenche dados do caso
  document.getElementById('caso-titulo').innerText = caso.titulo;
  document.getElementById('caso-descricao').innerText = caso.descricao;

  // Renderiza Pistas
  const listaPistas = document.getElementById('lista-pistas');
  listaPistas.innerHTML = '';
  caso.pistas.forEach(pista => {
    const li = document.createElement('li');
    li.innerText = pista;
    listaPistas.appendChild(li);
  });

  // Renderiza Suspeitos
  const listaSuspeitos = document.getElementById('lista-suspeitos');
  listaSuspeitos.innerHTML = '';
  caso.suspeitos.forEach(suspeito => {
    const div = document.createElement('div');
    div.className = 'suspeito-item';
    div.innerHTML = `<strong>${suspeito.nome}</strong><br><small>Álibi: ${suspeito.alibi}</small>`;
    listaSuspeitos.appendChild(div);
  });

  // Renderiza Ações/Interrogações
  renderizarAcoes();
}

function renderizarAcoes() {
  const caso = bancoDeCasos[casoAtualIndex];
  const containerAcoes = document.getElementById('botoes-acoes');
  containerAcoes.innerHTML = '';

  // Botões de Interrogatório
  caso.investigacoes.forEach(inv => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerText = inv.opcao;
    btn.onclick = () => exibirDetalheInvestigacao(inv.resposta);
    containerAcoes.appendChild(btn);
  });

  // Botão para Mudar para Tela de Acusação
  const btnIrParaAcusacao = document.createElement('button');
  btnIrParaAcusacao.className = 'btn btn-acusar';
  btnIrParaAcusacao.innerText = "🚨 Fazer Acusação Final!";
  btnIrParaAcusacao.onclick = () => renderizarOpcoesAcusacao();
  containerAcoes.appendChild(btnIrParaAcusacao);
}

function exibirDetalheInvestigacao(texto) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.classList.remove('hidden', 'erro');
  resultadoDiv.innerHTML = `<h4>🔍 Resultado da Investigação:</h4><p>${texto}</p>`;
}

function renderizarOpcoesAcusacao() {
  const caso = bancoDeCasos[casoAtualIndex];
  const containerAcoes = document.getElementById('botoes-acoes');
  
  document.getElementById('texto-interacao').innerText = "Quem é o culpado? Escolha com cuidado:";
  containerAcoes.innerHTML = '';

  caso.suspeitos.forEach(suspeito => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-acusar';
    btn.innerText = `Acusar ${suspeito.nome}`;
    btn.onclick = () => verificarAcusacao(suspeito.id);
    containerAcoes.appendChild(btn);
  });
}

function verificarAcusacao(suspeitoId) {
  const caso = bancoDeCasos[casoAtualIndex];
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.classList.remove('hidden');

  if (suspeitoId === caso.solucaoCorreta) {
    resultadoDiv.classList.remove('erro');
    resultadoDiv.innerHTML = `<h4>🏆 VITÓRIA!</h4><p>${caso.explicacaoVitoria}</p>`;
  } else {
    resultadoDiv.classList.add('erro');
    resultadoDiv.innerHTML = `<h4>❌ FALHA NA INVESTIGAÇÃO!</h4><p>${caso.explicacaoDerrota}</p>`;
  }
}

// Inicia a aplicação
iniciarJogo();