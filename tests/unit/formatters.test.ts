import { describe, expect, it } from "vitest";
import {
  formatBoolean,
  formatCurrency,
  formatDate,
  formatInstallments,
  formatPercentage,
} from "@/lib/formatters";

describe("formatCurrency", () => {
  it("formats a whole-real amount with no decimals", () => {
    expect(formatCurrency(8900)).toBe("R$ 89");
  });
  it("formats an amount with cents using exactly 2 decimals", () => {
    expect(formatCurrency(860)).toBe("R$ 8,60");
  });
  it("returns 'Não informado' for null/undefined", () => {
    expect(formatCurrency(null)).toBe("Não informado");
    expect(formatCurrency(undefined)).toBe("Não informado");
  });
});

describe("formatPercentage", () => {
  it("formats basis points as pt-BR percent", () => {
    expect(formatPercentage(498)).toBe("4,98%");
  });
  it("returns 'Não informado' for null/undefined", () => {
    expect(formatPercentage(null)).toBe("Não informado");
  });
});

describe("formatInstallments", () => {
  it("formats count + value", () => {
    expect(formatInstallments(12, 860)).toBe("12x de R$ 8,60");
  });
  it("returns 'Não informado' when either part is missing", () => {
    expect(formatInstallments(null, 860)).toBe("Não informado");
    expect(formatInstallments(12, null)).toBe("Não informado");
  });
});

describe("formatBoolean", () => {
  it("never coerces null/undefined to 'Não'", () => {
    expect(formatBoolean(true)).toBe("Sim");
    expect(formatBoolean(false)).toBe("Não");
    expect(formatBoolean(null)).toBe("Não informado");
    expect(formatBoolean(undefined)).toBe("Não informado");
  });
});

describe("formatDate", () => {
  it("returns 'Não informado' for missing/invalid dates", () => {
    expect(formatDate(null)).toBe("Não informado");
    expect(formatDate("not-a-date")).toBe("Não informado");
  });
  it("formats a valid date in pt-BR", () => {
    expect(formatDate(new Date("2026-09-20T12:00:00-03:00"))).toBe("20/09/2026");
  });
});
