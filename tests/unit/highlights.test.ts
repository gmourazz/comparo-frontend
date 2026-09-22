import { describe, expect, it } from "vitest";
import { buildHighlights } from "@/features/catalog/highlights";
import { makeMachine } from "./helpers/make-machine";

describe("buildHighlights", () => {
  it("builds all 4 groups with correctly filtered/ranked items", () => {
    const cheap = makeMachine({ id: "cheap", slug: "cheap", currentPriceCents: 5000, hasPrinter: false, requiresPhone: true });
    const printer = makeMachine({ id: "printer", slug: "printer", currentPriceCents: 30000, hasPrinter: true, requiresPhone: false, hasNfc: true, hasWifi: true });
    const catalog = [cheap, printer];

    const groups = buildHighlights(catalog);
    expect(groups).toHaveLength(4);
    expect(groups[0].items[0].id).toBe("cheap"); // cheapest first
    expect(groups[1].items.map((m) => m.id)).toEqual(["printer"]); // has printer
    expect(groups[2].items.map((m) => m.id)).toEqual(["printer"]); // works without phone
    expect(groups[3].items[0].id).toBe("printer"); // most features
  });

  it("returns empty item lists (not a crash) for an empty catalog", () => {
    const groups = buildHighlights([]);
    expect(groups.every((g) => g.items.length === 0)).toBe(true);
  });
});
