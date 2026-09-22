import type { Machine } from "@/types/machine";

const now = new Date("2026-09-20T12:00:00-03:00");

/** Minimal Machine factory for tests — only pass the fields the test cares about. */
export function makeMachine(overrides: Partial<Machine> & Pick<Machine, "id" | "slug">): Machine {
  return {
    externalId: overrides.id,
    provider: "MERCADO_PAGO",
    brand: "Mercado Pago",
    name: overrides.id,
    currency: "BRL",
    images: [],
    features: [],
    connectivity: [],
    recommendedProfiles: [],
    manuallyMaintained: false,
    active: true,
    ctaAvailable: true,
    firstSeenAt: now,
    lastSeenAt: now,
    updatedAt: now,
    ...overrides,
  };
}
