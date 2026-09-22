export interface CriteriaDef {
  n: string;
  title: string;
  desc: string;
}

export const criteriaData: CriteriaDef[] = [
  {
    n: "01",
    title: "Preço da maquininha",
    desc: "O valor do aparelho é único. Compare o preço à vista e o parcelamento antes de decidir.",
  },
  {
    n: "02",
    title: "Taxas por venda",
    desc: "Veja a taxa da forma de pagamento que você mais recebe, não só a menor do anúncio.",
  },
  {
    n: "03",
    title: "Conectividade",
    desc: "Chip próprio e Wi-Fi funcionam sem celular. Bluetooth depende do aplicativo no smartphone.",
  },
  {
    n: "04",
    title: "Comprovante",
    desc: "Impressora resolve no balcão. Comprovante digital é suficiente em vendas por delivery.",
  },
  {
    n: "05",
    title: "Prazo de recebimento",
    desc: "Confirme em quantos dias o dinheiro cai na conta e se há antecipação com custo.",
  },
];
