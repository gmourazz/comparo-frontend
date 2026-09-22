export const siteConfig = {
  name: "comparô",
  description: "Comparador independente de maquininhas de cartão.",
  // Overridden by NEXT_PUBLIC_SITE_URL once the frontend has a real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO(fase 4+): substituir por CatalogSync mais recente com status SUCCESS
  // (services/catalog/queries.ts). Placeholder só até o banco existir.
  lastUpdatedLabel: "20/09/2026",
  maxCompare: 3,
  showFees: true,
  showDiscountBadges: true,
  nav: [
    { label: "Maquininhas", href: "/#catalogo" },
    { label: "Comparar", href: "/comparar" },
    { label: "Como escolher", href: "/#como-escolher" },
    { label: "Taxas", href: "/#taxas" },
    { label: "FAQ", href: "/#faq" },
  ],
} as const;
