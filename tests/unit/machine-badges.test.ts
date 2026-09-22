import { describe, expect, it } from "vitest";
import { getMachineBadges } from "@/features/catalog/machine-badges";
import { makeMachine } from "./helpers/make-machine";

describe("getMachineBadges", () => {
  it("badges the machine with the most tracked features as 'Mais completa'", () => {
    const full = makeMachine({
      id: "full",
      slug: "full",
      hasNfc: true,
      hasWifi: true,
      hasChip: true,
      hasPrinter: true,
      hasTouchscreen: true,
      hasBluetooth: true,
    });
    const basic = makeMachine({ id: "basic", slug: "basic", hasNfc: true });
    const badges = getMachineBadges(full, [full, basic]);
    expect(badges[0]).toEqual({ label: "Mais completa", tone: "info" });
  });

  it("badges the cheapest known-price machine as 'Boa para começar'", () => {
    const cheap = makeMachine({ id: "cheap", slug: "cheap", currentPriceCents: 5000 });
    const pricey = makeMachine({ id: "pricey", slug: "pricey", currentPriceCents: 50000 });
    const badges = getMachineBadges(cheap, [cheap, pricey]);
    expect(badges.map((b) => b.label)).toContain("Boa para começar");
  });

  it("falls back to 'Compacta' when no rule matches (e.g. price unknown)", () => {
    const plain = makeMachine({ id: "plain", slug: "plain" });
    const badges = getMachineBadges(plain, [plain]);
    expect(badges).toEqual([{ label: "Compacta", tone: "info" }]);
  });

  it("handles a single-machine catalog without crashing", () => {
    const solo = makeMachine({ id: "solo", slug: "solo" });
    expect(() => getMachineBadges(solo, [solo])).not.toThrow();
  });
});
