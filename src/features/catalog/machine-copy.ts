import type { Machine } from "@/types/machine";

/**
 * Product detail copy ("características interessantes" / "pode não ser
 * ideal se") derived strictly from real fields — each line only appears
 * when the underlying fact is known (non-null), and each line states only
 * that fact. This replaces the hand-written per-product pros/notIdeal
 * strings from the design mock, so the text stays correct automatically as
 * catalog data changes instead of drifting out of sync (spec: "Centralizar
 * regras... Não espalhar lógica comercial na UI").
 */
export function buildProsAndCons(
  machine: Machine,
  activeCatalog: Machine[],
): { pros: string[]; notIdeal: string[] } {
  const pros: string[] = [];
  const notIdeal: string[] = [];

  const knownPrices = activeCatalog
    .map((m) => m.currentPriceCents)
    .filter((v): v is number => v != null)
    .sort((a, b) => a - b);
  const isCheapest =
    machine.currentPriceCents != null && knownPrices[0] === machine.currentPriceCents;
  const isMostExpensive =
    machine.currentPriceCents != null &&
    knownPrices[knownPrices.length - 1] === machine.currentPriceCents &&
    knownPrices.length > 1;

  if (isCheapest) pros.push("Menor investimento inicial do catálogo");
  if (machine.requiresPhone === false) pros.push("Funciona sem depender do celular");
  if (machine.requiresPhone === true) notIdeal.push("Você precisa ter o celular sempre por perto");
  if (machine.hasPrinter === true) pros.push("Imprime comprovante na hora");
  if (machine.hasPrinter === false) notIdeal.push("Não imprime comprovante na hora");
  if (machine.hasNfc === true) pros.push("Aceita pagamento por aproximação (NFC)");
  if (machine.hasTouchscreen === true) pros.push("Tela touch facilita o uso por equipes");
  if (isMostExpensive) notIdeal.push("Não é a opção mais barata do catálogo");
  if (machine.batteryDescription) pros.push(`Bateria com boa duração (${machine.batteryDescription})`);

  return { pros, notIdeal };
}

/** One-line "quem deveria comprar isso" built from recommendedProfiles + requiresPhone. */
export function buildIdealForText(machine: Machine): string | null {
  if (machine.recommendedProfiles.length === 0) return null;
  const profiles = machine.recommendedProfiles.slice(0, 2).join(" e ");
  const phoneClause =
    machine.requiresPhone === false
      ? ", especialmente se você quer vender sem depender do celular"
      : "";
  return `Indicada para ${profiles}${phoneClause}.`;
}
