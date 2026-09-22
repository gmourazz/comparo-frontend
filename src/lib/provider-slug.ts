import type { Provider } from "@/types/machine";

const PROVIDER_SLUGS: Record<Provider, string> = {
  MERCADO_PAGO: "mercado-pago",
  TON: "ton",
};

/** URL segment used by /go/[provider]/[machine] — e.g. "MERCADO_PAGO" -> "mercado-pago". */
export function providerUrlSlug(provider: Provider): string {
  return PROVIDER_SLUGS[provider];
}

/**
 * Builds the affiliate redirect href for a machine's buy CTA. Points at the
 * Go backend directly (not a Next.js route) — the redirect + tracking write
 * live there. Rendered in Client Components, so this must be NEXT_PUBLIC_.
 */
export function goHref(machine: { provider: Provider; slug: string }): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return `${apiUrl}/go/${providerUrlSlug(machine.provider)}/${machine.slug}`;
}
