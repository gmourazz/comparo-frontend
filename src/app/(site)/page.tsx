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

export default async function HomePage() {
  const machines = await getActiveMachines();

  return (
    <main>
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
