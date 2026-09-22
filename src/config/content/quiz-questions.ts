export interface QuizQuestionDef {
  id: "volume" | "printer" | "phone" | "priority" | "place";
  q: string;
  help: string;
  options: string[];
}

export const quizQuestions: QuizQuestionDef[] = [
  {
    id: "volume",
    q: "Quanto você vende por mês?",
    help: "Usamos isso para pesar preço e taxas na recomendação.",
    options: [
      "Até R$ 3 mil",
      "R$ 3 mil – R$ 6 mil",
      "R$ 6 mil – R$ 10 mil",
      "Mais de R$ 10 mil",
    ],
  },
  {
    id: "printer",
    q: "Você precisa imprimir comprovante?",
    help: "Alguns modelos só enviam o comprovante digital.",
    options: ["Sim", "Não", "Tanto faz"],
  },
  {
    id: "phone",
    q: "Sua maquininha precisa funcionar sem celular?",
    help: "Modelos com chip próprio funcionam sozinhos.",
    options: ["Sim", "Não", "Tanto faz"],
  },
  {
    id: "priority",
    q: "O que é mais importante?",
    help: "Não existe resposta certa — só o que combina com você.",
    options: ["Economizar na compra", "Equilibrar preço e recursos", "Ter mais recursos"],
  },
  {
    id: "place",
    q: "Onde você vende mais?",
    help: "Isso ajuda a pesar conectividade e portabilidade.",
    options: [
      "Loja física",
      "Delivery",
      "Rua / eventos",
      "Atendimento profissional",
      "Online e presencial",
    ],
  },
];
