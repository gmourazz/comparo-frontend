export const quickFilterLabels = [
  "Todas",
  "Mais econômicas",
  "Com impressora",
  "Sem celular",
  "Com NFC",
  "Smart",
] as const;
export type QuickFilter = (typeof quickFilterLabels)[number];

export const profileFilterLabels = [
  "Todos",
  "Começando agora",
  "Autônomos",
  "MEI",
  "Lojas",
  "Delivery",
  "Eventos e vendas externas",
  "Profissionais liberais",
  "Alto volume",
] as const;
export type ProfileFilter = (typeof profileFilterLabels)[number];

export const featureFilterLabels = [
  "NFC",
  "Wi-Fi",
  "Chip próprio",
  "Impressora",
  "Touchscreen",
] as const;
export type FeatureFilter = (typeof featureFilterLabels)[number];

export const brandFilterLabels = ["Todas", "Mercado Pago", "Ton"] as const;
export type BrandFilter = (typeof brandFilterLabels)[number];

export const sortOptions = ["Recomendadas", "Menor preço", "Mais recursos"] as const;
export type SortOption = (typeof sortOptions)[number];

export const feeMethodTabs = ["Pix", "Débito", "Crédito", "Parcelado"] as const;
export type FeeMethodTab = (typeof feeMethodTabs)[number];
