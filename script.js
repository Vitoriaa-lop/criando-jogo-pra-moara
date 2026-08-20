const bancoDeCasos = [
  {
    id: 1,
    titulo: "O Mistério da Galeria",
    descricao: "O quadro 'A Lápide do Sol' desapareceu. A galeria estava trancada e o jardim molhado.",
    pistas: [
      "Taça quebrada com lama perto do pedestal.",
      "Ar-condicionado desligou às 22h, levando todos ao jardim.",
      "Lama no jardim foi criada pelos regadores às 21h50."
    ],
    suspeitos: [
      { id: "marcos", nome: "Marcos (Zelador)", alibi: "Consertando o ar-condicionado na sala de máquinas." },
      { id: "beatriz", nome: "Beatriz (Curadora)", alibi: "Conversando com o chef na cozinha." },
      { id: "lucas", nome: "Lucas (Colecionador)", alibi: "Apenas bebendo no salão principal." }
    ],
    solucaoCorreta: "lucas",
    explicacaoVitoria: "Correto! Lucas mentiu dizendo que ficou apenas no salão, mas a lama na taça prova que ele foi ao jardim molhado durante a falha do ar-condicionado para invadir a galeria.",
    explicacaoDerrota: "Incorreto. Essa pessoa tinha um álibi sólido ou não esteve no jardim molhado no horário do crime."
  }
];