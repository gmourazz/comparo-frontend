import type { Machine } from "@/types/machine";
import type { BrandFilter, FeatureFilter, QuickFilter } from "@/config/content/filters";

export interface MachineFilters {
  brand?: BrandFilter;
  profile?: string;
  quick?: QuickFilter;
  features?: FeatureFilter[];
  query?: string;
}

export function getFeatureMap(machine: Machine): Record<FeatureFilter, boolean | null | undefined> {
  return {
    NFC: machine.hasNfc,
    "Wi-Fi": machine.hasWifi,
    "Chip próprio": machine.hasChip,
    Impressora: machine.hasPrinter,
    Touchscreen: machine.hasTouchscreen,
  };
}

/** Counts how many of nfc/wifi/chip/printer/touch/bluetooth the machine has (truthy only). */
export function featureCount(machine: Machine): number {
  return [
    machine.hasNfc,
    machine.hasWifi,
    machine.hasChip,
    machine.hasPrinter,
    machine.hasTouchscreen,
    machine.hasBluetooth,
  ].filter(Boolean).length;
}

export function matchesQuickFilter(machine: Machine, quick: QuickFilter | undefined): boolean {
  if (!quick || quick === "Todas") return true;
  switch (quick) {
    case "Mais econômicas":
      return machine.currentPriceCents != null && machine.currentPriceCents <= 25000;
    case "Com impressora":
      return machine.hasPrinter === true;
    case "Sem celular":
      return machine.requiresPhone === false;
    case "Com NFC":
      return machine.hasNfc === true;
    case "Smart":
      return machine.hasTouchscreen === true;
    default:
      return true;
  }
}

export function filterMachines(machines: Machine[], filters: MachineFilters): Machine[] {
  const term = filters.query?.trim().toLowerCase();
  return machines.filter((m) => {
    if (filters.brand && filters.brand !== "Todas" && m.brand !== filters.brand) return false;
    if (filters.profile && filters.profile !== "Todos" && !m.recommendedProfiles.includes(filters.profile)) {
      return false;
    }
    if (!matchesQuickFilter(m, filters.quick)) return false;
    if (filters.features?.length) {
      const map = getFeatureMap(m);
      if (filters.features.some((f) => !map[f])) return false;
    }
    if (term) {
      const haystack = [m.name, m.brand, m.shortDescription ?? "", ...m.features]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}
