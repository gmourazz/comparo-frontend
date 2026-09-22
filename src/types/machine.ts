export type Provider = "MERCADO_PAGO" | "TON";

export interface MachineFees {
  pixBp?: number | null;
  debitBp?: number | null;
  creditCashBp?: number | null;
  creditInstallmentBp?: number | null;
  feeNotes: string[];
}

/**
 * Normalized catalog entry, independent of provider. Unknown fields are
 * null/undefined — never invented. Booleans follow: true = "Sim",
 * false = "Não", undefined/null = "Não informado" (see lib/formatters.ts).
 */
export interface Machine {
  id: string;
  externalId: string;
  provider: Provider;
  brand: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  image?: string | null;
  images: string[];

  originalPriceCents?: number | null;
  currentPriceCents?: number | null;
  currency: string;
  installmentCount?: number | null;
  installmentValueCents?: number | null;
  discountBasisPoints?: number | null;

  fees?: MachineFees | null;

  features: string[];
  hasNfc?: boolean | null;
  hasPrinter?: boolean | null;
  requiresPhone?: boolean | null;
  hasChip?: boolean | null;
  hasWifi?: boolean | null;
  hasBluetooth?: boolean | null;
  hasTouchscreen?: boolean | null;

  operatingSystem?: string | null;
  batteryDescription?: string | null;
  /** e.g. "1 dia útil" — how long until the sale settles into the account. */
  settlementDescription?: string | null;
  /** e.g. "Digital (SMS / WhatsApp)" or "Impresso e digital". */
  receiptDescription?: string | null;
  connectivity: string[];
  recommendedProfiles: string[];

  sourceUrl?: string | null;
  promotionText?: string | null;
  promotionExpiresAt?: Date | null;

  /** Computed by the backend (services/affiliate) — false when no affiliate link is configured. */
  ctaAvailable: boolean;
  manuallyMaintained: boolean;
  active: boolean;
  firstSeenAt: Date;
  lastSeenAt: Date;
  updatedAt: Date;
}
