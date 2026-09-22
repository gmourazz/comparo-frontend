import type { Machine } from "@/types/machine";
import type { FeeMethodTab, SortOption } from "@/config/content/filters";
import { featureCount } from "./filter-machines";

export type FeeMethod = "pix" | "debit" | "creditCash" | "creditInstallment";

const FEE_TAB_TO_METHOD: Record<FeeMethodTab, FeeMethod> = {
  Pix: "pix",
  Débito: "debit",
  Crédito: "creditCash",
  Parcelado: "creditInstallment",
};

export function feeMethodForTab(tab: FeeMethodTab): FeeMethod {
  return FEE_TAB_TO_METHOD[tab];
}

function feeBp(machine: Machine, method: FeeMethod): number | null {
  const fees = machine.fees;
  if (!fees) return null;
  switch (method) {
    case "pix":
      return fees.pixBp ?? null;
    case "debit":
      return fees.debitBp ?? null;
    case "creditCash":
      return fees.creditCashBp ?? null;
    case "creditInstallment":
      return fees.creditInstallmentBp ?? null;
  }
}

export function rankByPrice(machines: Machine[]): Machine[] {
  return [...machines].sort((a, b) => {
    if (a.currentPriceCents == null) return 1;
    if (b.currentPriceCents == null) return -1;
    return a.currentPriceCents - b.currentPriceCents;
  });
}

export function sortMachines(machines: Machine[], sort: SortOption): Machine[] {
  if (sort === "Menor preço") return rankByPrice(machines);
  if (sort === "Mais recursos") {
    return [...machines].sort((a, b) => featureCount(b) - featureCount(a));
  }
  return machines;
}

export interface FeeRanking {
  machine: Machine;
  rateBp: number | null;
  /** Net value out of a 100 (BRL) sale, in cents — null when the fee is unknown. */
  netCentsOf100: number | null;
}

export function rankByFee(machines: Machine[], method: FeeMethod): FeeRanking[] {
  return [...machines]
    .map((machine) => {
      const rateBp = feeBp(machine, method);
      return {
        machine,
        rateBp,
        netCentsOf100: rateBp == null ? null : Math.round(10000 - rateBp),
      };
    })
    .sort((a, b) => {
      if (a.rateBp == null) return 1;
      if (b.rateBp == null) return -1;
      return a.rateBp - b.rateBp;
    });
}

/** Average fee (basis points) across machines that have that fee known. Null if none do. */
export function averageFeeBp(machines: Machine[], method: FeeMethod): number | null {
  const known = machines.map((m) => feeBp(m, method)).filter((v): v is number => v != null);
  if (known.length === 0) return null;
  return known.reduce((sum, v) => sum + v, 0) / known.length;
}
