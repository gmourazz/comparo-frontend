import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getActiveMachines } from "@/services/catalog/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const machines = await getActiveMachines();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/comparar`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/termos-de-uso`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/politica-de-cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const machineRoutes: MetadataRoute.Sitemap = machines.map((m) => ({
    url: `${siteConfig.url}/maquininhas/${m.slug}`,
    lastModified: m.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...machineRoutes];
}
