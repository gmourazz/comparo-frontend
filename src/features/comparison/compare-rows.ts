import type { Machine } from "@/types/machine";
import { formatBoolean, formatCurrency, formatInstallments, formatPercentage, NOT_INFORMED } from "@/lib/formatters";

export interface CompareCell {
  value: string;
  /** Muted rendering for "Não"/"Não informado" on boolean-style rows, matching the design. */
  muted: boolean;
}

export interface CompareRow {
  label: string;
  cells: CompareCell[];
  /** True when the compared machines disagree on this row (design shows a "DIFERE" badge). */
  differs: boolean;
}

interface RowDef {
  label: string;
  value: (m: Machine) => string;
  /** Boolean-style rows render "Não"/"Não informado" muted. */
  booleanStyle?: boolean;
}

const ROW_DEFS: RowDef[] = [
  { label: "Preço à vista", value: (m) => formatCurrency(m.currentPriceCents) },
  { label: "Parcelamento", value: (m) => formatInstallments(m.installmentCount, m.installmentValueCents) },
  { label: "Taxa Pix", value: (m) => formatPercentage(m.fees?.pixBp) },
  { label: "Taxa débito", value: (m) => formatPercentage(m.fees?.debitBp) },
  { label: "Taxa crédito", value: (m) => formatPercentage(m.fees?.creditCashBp) },
  { label: "Crédito parcelado", value: (m) => formatPercentage(m.fees?.creditInstallmentBp) },
  { label: "NFC / aproximação", value: (m) => formatBoolean(m.hasNfc), booleanStyle: true },
  { label: "Chip próprio", value: (m) => formatBoolean(m.hasChip), booleanStyle: true },
  { label: "Wi-Fi", value: (m) => formatBoolean(m.hasWifi), booleanStyle: true },
  { label: "Bluetooth", value: (m) => formatBoolean(m.hasBluetooth), booleanStyle: true },
  { label: "Impressora", value: (m) => formatBoolean(m.hasPrinter), booleanStyle: true },
  { label: "Touchscreen", value: (m) => formatBoolean(m.hasTouchscreen), booleanStyle: true },
  { label: "Sistema", value: (m) => m.operatingSystem ?? NOT_INFORMED },
  { label: "Precisa de celular?", value: (m) => formatBoolean(m.requiresPhone), booleanStyle: true },
  { label: "Comprovante", value: (m) => m.receiptDescription ?? NOT_INFORMED },
  { label: "Bateria", value: (m) => m.batteryDescription ?? NOT_INFORMED },
  { label: "Recebimento", value: (m) => m.settlementDescription ?? NOT_INFORMED },
  { label: "Ideal para", value: (m) => (m.recommendedProfiles.slice(0, 2).join(", ") || NOT_INFORMED) },
];

export function buildCompareRows(machines: Machine[]): CompareRow[] {
  return ROW_DEFS.map((def) => {
    const values = machines.map((m) => def.value(m));
    const differs = machines.length > 1 && new Set(values).size > 1;
    return {
      label: def.label,
      differs,
      cells: values.map((value) => ({
        value,
        muted: !!def.booleanStyle && (value === "Não" || value === NOT_INFORMED),
      })),
    };
  });
}
