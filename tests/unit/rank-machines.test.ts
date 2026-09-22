import { describe, expect, it } from "vitest";
import { averageFeeBp, rankByFee, rankByPrice, sortMachines } from "@/features/catalog/rank-machines";
import { makeMachine } from "./helpers/make-machine";

const cheap = makeMachine({ id: "cheap", slug: "cheap", currentPriceCents: 5000, fees: { pixBp: 100, feeNotes: [] } });
const mid = makeMachine({ id: "mid", slug: "mid", currentPriceCents: 15000, fees: { pixBp: 200, feeNotes: [] } });
const unknownPrice = makeMachine({ id: "unknown", slug: "unknown", currentPriceCents: null });

describe("rankByPrice", () => {
  it("sorts ascending and pushes unknown prices last", () => {
    expect(rankByPrice([mid, unknownPrice, cheap])).toEqual([cheap, mid, unknownPrice]);
  });

  it("handles an empty list", () => {
    expect(rankByPrice([])).toEqual([]);
  });
});

describe("sortMachines", () => {
  it("'Menor preço' delegates to rankByPrice", () => {
    expect(sortMachines([mid, cheap], "Menor preço")).toEqual([cheap, mid]);
  });

  it("'Recomendadas' keeps input order", () => {
    expect(sortMachines([mid, cheap], "Recomendadas")).toEqual([mid, cheap]);
  });
});

describe("rankByFee", () => {
  it("ranks ascending by the selected method and computes net-of-100", () => {
    const ranked = rankByFee([mid, cheap], "pix");
    expect(ranked.map((r) => r.machine.id)).toEqual(["cheap", "mid"]);
    expect(ranked[0].netCentsOf100).toBe(9900);
  });

  it("pushes machines with an unknown fee last", () => {
    const noFee = makeMachine({ id: "nofee", slug: "nofee" });
    const ranked = rankByFee([noFee, cheap], "pix");
    expect(ranked[0].machine.id).toBe("cheap");
    expect(ranked[1].rateBp).toBeNull();
  });
});

describe("averageFeeBp", () => {
  it("averages only known fees", () => {
    const noFee = makeMachine({ id: "nofee", slug: "nofee" });
    expect(averageFeeBp([cheap, mid, noFee], "pix")).toBe(150);
  });

  it("returns null when nothing has that fee known", () => {
    const noFee = makeMachine({ id: "nofee", slug: "nofee" });
    expect(averageFeeBp([noFee], "pix")).toBeNull();
  });
});
