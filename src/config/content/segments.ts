export interface SegmentDef {
  code: string;
  title: string;
  desc: string;
  profile: string;
}

export const segmentsData: SegmentDef[] = [
  {
    code: "AUT",
    title: "Autônomos",
    desc: "Atendimento no local, preço acessível e portabilidade.",
    profile: "Autônomos",
  },
  {
    code: "MEI",
    title: "MEI",
    desc: "Primeira maquininha, com custo baixo para começar.",
    profile: "MEI",
  },
  {
    code: "LOJ",
    title: "Lojas",
    desc: "Balcão com movimento e comprovante impresso.",
    profile: "Lojas",
  },
  {
    code: "DEL",
    title: "Delivery",
    desc: "Entrega na porta, com bateria e conexão estável.",
    profile: "Delivery",
  },
  {
    code: "EVT",
    title: "Eventos e vendas externas",
    desc: "Feiras e rua, sem depender de Wi-Fi fixo.",
    profile: "Eventos e vendas externas",
  },
  {
    code: "PRO",
    title: "Profissionais liberais",
    desc: "Consultório e escritório, com recibo organizado.",
    profile: "Profissionais liberais",
  },
];
