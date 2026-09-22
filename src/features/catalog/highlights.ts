import type { Machine } from "@/types/machine";
import { featureCount } from "./filter-machines";
import { rankByPrice } from "./rank-machines";

export interface HighlightGroup {
  title: string;
  rule: string;
  items: Machine[];
}

const ITEMS_PER_GROUP = 3;

/** 4 fixed groups, each ranked/filtered by an explicit, inspectable rule. */
export function buildHighlights(machines: Machine[]): HighlightGroup[] {
  return [
    {
      title: "Para começar gastando menos",
      rule: "Ordenado pelo menor preço do aparelho",
      items: rankByPrice(machines).slice(0, ITEMS_PER_GROUP),
    },
    {
      title: "Para quem precisa imprimir",
      rule: "Filtra modelos com impressora integrada",
      items: machines.filter((m) => m.hasPrinter === true).slice(0, ITEMS_PER_GROUP),
    },
    {
      title: "Para vender em qualquer lugar",
      rule: "Filtra modelos que funcionam sem celular",
      items: machines.filter((m) => m.requiresPhone === false).slice(0, ITEMS_PER_GROUP),
    },
    {
      title: "Para quem quer uma maquininha completa",
      rule: "Ordenado pela quantidade de recursos",
      items: [...machines]
        .sort((a, b) => featureCount(b) - featureCount(a))
        .slice(0, ITEMS_PER_GROUP),
    },
  ];
}
