import { getActiveMachines } from "@/services/catalog/queries";
import { CatalogFilterProvider } from "@/features/catalog/CatalogFilterProvider";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { QuizPromoBanner } from "@/components/home/QuizPromoBanner";
import { SegmentsGrid } from "@/components/home/SegmentsGrid";
import { CriteriaList } from "@/components/home/CriteriaList";
import { FeesSection } from "@/components/home/FeesSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqJsonLd, buildItemListJsonLd } from "@/lib/structured-data";
import { faqData } from "@/config/content/faq";

export default async function HomePage() {
  const machines = await getActiveMachines();

  return (
    <main>
      <JsonLd data={buildItemListJsonLd(machines)} />
      <JsonLd data={buildFaqJsonLd(faqData)} />
      <HeroSection />
      <BrandsStrip />
      <CatalogFilterProvider>
        <CatalogSection machines={machines} />
        <QuizPromoBanner />
        <SegmentsGrid />
        <CriteriaList />
        <FeesSection machines={machines} />
        <HighlightsSection machines={machines} />
        <FaqAccordion />
        <FinalCtaSection />
      </CatalogFilterProvider>
    </main>
  );
}
