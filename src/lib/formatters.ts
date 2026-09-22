const NOT_INFORMED = "Não informado";

const wholeCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const centsCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats an integer cents value as BRL. Whole-real amounts render with no
 * decimals ("R$ 89"), matching the design; amounts with cents always show
 * both digits ("R$ 8,60", never "R$ 8,6"). `null`/`undefined` → "Não informado".
 */
export function formatCurrency(cents: number | null | undefined): string {
  if (cents == null) return NOT_INFORMED;
  const formatter = cents % 100 === 0 ? wholeCurrencyFormatter : centsCurrencyFormatter;
  return formatter.format(cents / 100);
}

/** Formats basis points (5498 = 5,498%) as a pt-BR percentage string. */
export function formatPercentage(basisPoints: number | null | undefined): string {
  if (basisPoints == null) return NOT_INFORMED;
  const pct = basisPoints / 100;
  return pct.toFixed(2).replace(".", ",") + "%";
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatDate(
  date: Date | string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (!date) return NOT_INFORMED;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return NOT_INFORMED;
  if (options) {
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      ...options,
    }).format(d);
  }
  return dateFormatter.format(d);
}

/** e.g. "12x de R$ 8,60". Falls back to "Não informado" when either part is missing. */
export function formatInstallments(
  count: number | null | undefined,
  valueCents: number | null | undefined,
): string {
  if (!count || valueCents == null) return NOT_INFORMED;
  return `${count}x de ${formatCurrency(valueCents)}`;
}

/** true → "Sim", false → "Não", null/undefined → "Não informado". Never coerce null to false. */
export function formatBoolean(value: boolean | null | undefined): string {
  if (value === true) return "Sim";
  if (value === false) return "Não";
  return NOT_INFORMED;
}

export { NOT_INFORMED };
