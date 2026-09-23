import { Container } from "@/components/ui/Container";

export function BrandsStrip() {
  return (
    <section className="border-b border-border bg-bg">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-4 py-7">
        <span className="font-inter text-sm font-medium text-muted-2">Compare opções de</span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 items-center gap-2.5 rounded-[10px] border border-border bg-white px-4 font-inter text-sm font-semibold text-text-strong shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)]">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-mp" />
            Mercado Pago / Point
          </span>
          <span className="flex h-10 items-center gap-2.5 rounded-[10px] border border-border bg-white px-4 font-inter text-sm font-semibold text-text-strong shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)]">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-ton" />
            Ton
          </span>
          <span className="flex h-10 items-center rounded-[10px] border border-dashed border-border-hover px-4 font-inter text-sm font-medium text-muted-2">
            Mais marcas em breve
          </span>
        </div>
        <span className="ml-auto max-w-80 font-inter text-xs text-muted-2">
          Site independente. Não somos parceiros oficiais das marcas comparadas.
        </span>
      </Container>
    </section>
  );
}
