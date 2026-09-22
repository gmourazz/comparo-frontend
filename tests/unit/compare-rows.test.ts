import { describe, expect, it } from "vitest";
import { buildCompareRows } from "@/features/comparison/compare-rows";
import { makeMachine } from "./helpers/make-machine";

describe("buildCompareRows", () => {
  it("marks a row as differing when compared machines disagree", () => {
    const a = makeMachine({ id: "a", slug: "a", hasNfc: true });
    const b = makeMachine({ id: "b", slug: "b", hasNfc: false });
    const rows = buildCompareRows([a, b]);
    const nfcRow = rows.find((r) => r.label === "NFC / aproximação")!;
    expect(nfcRow.differs).toBe(true);
    expect(nfcRow.cells.map((c) => c.value)).toEqual(["Sim", "Não"]);
  });

  it("does not flag a row as differing with a single machine", () => {
    const a = makeMachine({ id: "a", slug: "a", hasNfc: true });
    const rows = buildCompareRows([a]);
    expect(rows.every((r) => r.differs === false)).toBe(true);
  });

  it("renders 'Não informado' (not 'Não') for unknown boolean fields, and marks it muted", () => {
    const a = makeMachine({ id: "a", slug: "a", hasChip: undefined });
    const rows = buildCompareRows([a]);
    const chipRow = rows.find((r) => r.label === "Chip próprio")!;
    expect(chipRow.cells[0].value).toBe("Não informado");
    expect(chipRow.cells[0].muted).toBe(true);
  });
});
