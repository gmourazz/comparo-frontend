import type { Machine } from "@/types/machine";
import { featureCount } from "./filter-machines";

export type BadgeTone = "info" | "success" | "warning";

export interface MachineBadge {
  label: string;
  tone: BadgeTone;
}

/**
 * Derives display badges from real machine fields + the active catalog they
 * sit in — never hardcoded per product id/name (spec: "Card precisa aceitar
 * objeto Machine... Características devem derivar dos dados", "Não marcar
 * 'Mais vendida' sem fonte verificável"). The design shows one badge chip
 * per card; callers take `badges[0]` for that slot and may use the rest
 * elsewhere. Order is priority order — most distinguishing fact first.
 */
export function getMachineBadges(machine: Machine, activeCatalog: Machine[]): MachineBadge[] {
  const badges: MachineBadge[] = [];

  const maxFeatureCount = Math.max(0, ...activeCatalog.map(featureCount));
  const knownPrices = activeCatalog
    .map((m) => m.currentPriceCents)
    .filter((v): v is number => v != null);
  const minPrice = knownPrices.length ? Math.min(...knownPrices) : null;

  if (maxFeatureCount > 0 && featureCount(machine) === maxFeatureCount) {
    badges.push({ label: "Mais completa", tone: "info" });
  }
  if (machine.hasTouchscreen === true) {
    badges.push({ label: "Smart", tone: "info" });
  }
  if (machine.hasPrinter === true) {
    badges.push({ label: "Imprime comprovante", tone: "info" });
  }
  if (machine.requiresPhone === false) {
    badges.push({ label: "Sem celular", tone: "info" });
  }
  if (minPrice != null && machine.currentPriceCents === minPrice) {
    badges.push({ label: "Boa para começar", tone: "success" });
  }
  if (badges.length === 0) {
    badges.push({ label: "Compacta", tone: "info" });
  }
  return badges;
}
