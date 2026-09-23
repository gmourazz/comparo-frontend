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
import { Reveal } from "@/components/ui/Reveal";

export default async function HomePage() {
  const machines = await getActiveMachines();

  return (
    <main>
      <JsonLd data={buildItemListJsonLd(machines)} />
      <JsonLd data={buildFaqJsonLd(faqData)} />
      <HeroSection machines={machines} />
      <BrandsStrip />
      <CatalogFilterProvider>
        <Reveal>
          <CatalogSection machines={machines} />
        </Reveal>
        <Reveal>
          <QuizPromoBanner />
        </Reveal>
        <Reveal>
          <SegmentsGrid />
        </Reveal>
        <Reveal>
          <CriteriaList />
        </Reveal>
        <Reveal>
          <FeesSection machines={machines} />
        </Reveal>
        <Reveal>
          <HighlightsSection machines={machines} />
        </Reveal>
        <Reveal>
          <FaqAccordion />
        </Reveal>
        <Reveal>
          <FinalCtaSection />
        </Reveal>
      </CatalogFilterProvider>
    </main>
  );
}
