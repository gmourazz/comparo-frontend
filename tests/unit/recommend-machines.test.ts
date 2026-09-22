import { describe, expect, it } from "vitest";
import { computeMachineScoreProfile, recommendMachines, reasonSentence } from "@/features/quiz/recommend-machines";
import { makeMachine } from "./helpers/make-machine";

const cheapNoPrinter = makeMachine({
  id: "cheap",
  slug: "cheap",
  currentPriceCents: 5000,
  hasPrinter: false,
  requiresPhone: true,
});
const pricierWithPrinter = makeMachine({
  id: "pricier",
  slug: "pricier",
  currentPriceCents: 60000,
  hasPrinter: true,
  requiresPhone: false,
  hasNfc: true,
  hasWifi: true,
  hasChip: true,
});
const catalog = [cheapNoPrinter, pricierWithPrinter];

describe("computeMachineScoreProfile", () => {
  it("gives the cheapest machine the highest 'cheap' score", () => {
    const cheapProfile = computeMachineScoreProfile(cheapNoPrinter, catalog);
    const pricierProfile = computeMachineScoreProfile(pricierWithPrinter, catalog);
    expect(cheapProfile.cheap).toBeGreaterThan(pricierProfile.cheap);
  });

  it("never hardcodes a score for a specific product id — it's derived from fields", () => {
    const clone = makeMachine({ ...pricierWithPrinter, id: "clone", slug: "clone" });
    expect(computeMachineScoreProfile(clone, [...catalog, clone])).toEqual(
      computeMachineScoreProfile(pricierWithPrinter, [...catalog, clone]),
    );
  });
});

describe("recommendMachines", () => {
  it("prioritizes price when the user says economy matters most", () => {
    const results = recommendMachines({ priority: "Economizar na compra" }, catalog);
    expect(results[0].machine.id).toBe("cheap");
  });

  it("prioritizes printer + no-phone when both are required", () => {
    const results = recommendMachines({ printer: "Sim", phone: "Sim" }, catalog);
    expect(results[0].machine.id).toBe("pricier");
  });

  it("never crashes and returns every machine even with no answers at all", () => {
    const results = recommendMachines({}, catalog);
    expect(results).toHaveLength(2);
  });

  it("handles an empty catalog", () => {
    expect(recommendMachines({ priority: "Economizar na compra" }, [])).toEqual([]);
  });
});

describe("reasonSentence", () => {
  it("falls back to a generic sentence with no reasons", () => {
    expect(reasonSentence([])).toBe("Combina com o perfil geral das suas respostas.");
  });
  it("joins up to 2 reasons", () => {
    expect(reasonSentence(["motivo um", "motivo dois", "motivo três"])).toBe(
      "Combina porque motivo um e motivo dois.",
    );
  });
});
