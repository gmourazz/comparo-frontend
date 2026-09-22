import { describe, expect, it } from "vitest";
import { filterMachines, featureCount, matchesQuickFilter } from "@/features/catalog/filter-machines";
import { makeMachine } from "./helpers/make-machine";

const cheapPocket = makeMachine({
  id: "a",
  slug: "a",
  brand: "Mercado Pago",
  name: "Point Mini",
  currentPriceCents: 8900,
  hasNfc: true,
  hasPrinter: false,
  requiresPhone: true,
  recommendedProfiles: ["MEI"],
  features: ["NFC"],
});

const proWithPrinter = makeMachine({
  id: "b",
  slug: "b",
  brand: "Ton",
  name: "Ton T3",
  currentPriceCents: 32900,
  hasNfc: true,
  hasPrinter: true,
  requiresPhone: false,
  hasTouchscreen: false,
  recommendedProfiles: ["Lojas"],
  features: ["NFC", "Impressora"],
});

const catalog = [cheapPocket, proWithPrinter];

describe("filterMachines", () => {
  it("returns everything with no filters", () => {
    expect(filterMachines(catalog, {})).toHaveLength(2);
  });

  it("filters by brand", () => {
    expect(filterMachines(catalog, { brand: "Ton" })).toEqual([proWithPrinter]);
  });

  it("filters by recommended profile", () => {
    expect(filterMachines(catalog, { profile: "Lojas" })).toEqual([proWithPrinter]);
  });

  it("filters by quick chip", () => {
    expect(filterMachines(catalog, { quick: "Com impressora" })).toEqual([proWithPrinter]);
    expect(filterMachines(catalog, { quick: "Sem celular" })).toEqual([proWithPrinter]);
  });

  it("filters by required features (AND across all selected)", () => {
    expect(filterMachines(catalog, { features: ["NFC", "Impressora"] })).toEqual([proWithPrinter]);
  });

  it("does not treat an unknown (null) feature as a match", () => {
    const unknownPrinter = makeMachine({ id: "c", slug: "c", hasPrinter: null });
    expect(filterMachines([unknownPrinter], { features: ["Impressora"] })).toEqual([]);
  });

  it("searches name/brand/description/features case-insensitively", () => {
    expect(filterMachines(catalog, { query: "ton t3" })).toEqual([proWithPrinter]);
  });

  it("returns an empty array for an empty catalog", () => {
    expect(filterMachines([], { brand: "Ton" })).toEqual([]);
  });
});

describe("matchesQuickFilter", () => {
  it("'Todas' always matches", () => {
    expect(matchesQuickFilter(cheapPocket, "Todas")).toBe(true);
  });
});

describe("featureCount", () => {
  it("counts only truthy tracked features", () => {
    const m = makeMachine({ id: "x", slug: "x", hasNfc: true, hasPrinter: false, hasWifi: null });
    expect(featureCount(m)).toBe(1);
  });
});
