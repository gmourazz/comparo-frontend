import type { Machine } from "@/types/machine";
import { siteConfig } from "@/config/site";
import { goHref } from "@/lib/provider-slug";

/**
 * Structured data built strictly from real fields — no invented ratings,
 * reviews or sale counts (spec: never fabricate reviewRating). A field with
 * no known value is omitted from the object entirely rather than guessed.
 */
export function buildProductJsonLd(machine: Machine) {
  const offers: Record<string, unknown> | undefined =
    machine.currentPriceCents != null
      ? {
          "@type": "Offer",
          priceCurrency: machine.currency,
          price: (machine.currentPriceCents / 100).toFixed(2),
          availability: machine.active
            ? "https://schema.org/InStock"
            : "https://schema.org/Discontinued",
          ...(machine.ctaAvailable ? { url: goHref(machine) } : {}),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: machine.name,
    brand: { "@type": "Brand", name: machine.brand },
    description: machine.shortDescription ?? undefined,
    image: machine.image ?? undefined,
    url: `${siteConfig.url}/maquininhas/${machine.slug}`,
    ...(offers ? { offers } : {}),
  };
}

export function buildBreadcrumbJsonLd(machine: Machine) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Maquininhas", item: `${siteConfig.url}/#catalogo` },
      { "@type": "ListItem", position: 3, name: machine.brand },
      { "@type": "ListItem", position: 4, name: machine.name },
    ],
  };
}

export function buildItemListJsonLd(machines: Machine[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: machines.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/maquininhas/${m.slug}`,
      name: m.name,
    })),
  };
}

export function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
