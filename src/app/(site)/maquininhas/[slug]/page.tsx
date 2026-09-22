import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveMachines, getMachineBySlug } from "@/services/catalog/queries";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPriceBox } from "@/components/product/ProductPriceBox";
import { FeeCardsGrid } from "@/components/product/FeeCardsGrid";
import { SpecsList } from "@/components/product/SpecsList";
import { RecommendedProfiles } from "@/components/product/RecommendedProfiles";
import { ProsConsSection } from "@/components/product/ProsConsSection";
import { SimilarProductsGrid } from "@/components/product/SimilarProductsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const machine = await getMachineBySlug(slug);
  if (!machine) return { title: "Maquininha não encontrada" };
  return {
    title: `${machine.name} — preço, taxas e recursos`,
    description:
      machine.shortDescription ??
      `Compare preço, taxas e recursos da ${machine.name} (${machine.brand}) no comparô.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [machine, activeMachines] = await Promise.all([
    getMachineBySlug(slug),
    getActiveMachines(),
  ]);

  if (!machine) notFound();

  const similar = activeMachines.filter((m) => m.slug !== machine.slug).slice(0, 3);

  if (!machine.active) {
    const alternatives = activeMachines.filter((m) => m.brand === machine.brand).slice(0, 3);
    return (
      <main className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="rounded-[20px] border border-dashed border-warning-text/40 bg-warning-soft p-8 text-center">
          <h1 className="m-0 font-manrope text-2xl font-bold">
            Este modelo pode não estar mais disponível.
          </h1>
          <p className="mx-auto mt-3 max-w-130 font-inter text-[15px] text-muted">
            A {machine.name} não aparece mais no catálogo público de {machine.brand}. Veja outras
            opções ativas abaixo.
          </p>
        </div>
        {alternatives.length > 0 && <SimilarProductsGrid items={alternatives} />}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8 pb-20">
      <Breadcrumb machine={machine} />

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-8">
        <ProductGallery machine={machine} />

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="flex h-7 items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 font-inter text-[13px] font-semibold text-text-strong">
              <span
                className="h-1.75 w-1.75 rounded-sm"
                style={{ background: machine.provider === "MERCADO_PAGO" ? "var(--color-brand-mp)" : "var(--color-brand-ton)" }}
              />
              {machine.brand}
            </span>
            {machine.discountBasisPoints != null && (
              <span className="flex h-7 items-center rounded-lg bg-success px-2.5 font-inter text-[13px] font-bold text-white">
                -{Math.round(machine.discountBasisPoints / 100)}% agora
              </span>
            )}
          </div>
          <h1 className="mt-4 text-product-title font-manrope leading-[1.15] font-bold tracking-[-0.025em]">
            {machine.name}
          </h1>
          {machine.shortDescription && (
            <p className="mt-3 max-w-130 font-inter text-[17px] leading-relaxed text-muted text-pretty">
              {machine.shortDescription}
            </p>
          )}

          <ProductPriceBox machine={machine} />
          <FeeCardsGrid machine={machine} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-6">
        <SpecsList machine={machine} />
        <div className="flex flex-col gap-6">
          <RecommendedProfiles machine={machine} />
          <ProsConsSection machine={machine} catalog={activeMachines} />
        </div>
      </div>

      <SimilarProductsGrid items={similar} />
    </main>
  );
}
