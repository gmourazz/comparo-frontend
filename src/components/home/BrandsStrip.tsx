import { Container } from "@/components/ui/Container";

export function BrandsStrip() {
  return (
    <section className="border-b border-border bg-white">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6">
        <span className="font-inter text-sm font-medium text-muted-2">Compare opções de</span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 font-inter text-sm font-semibold text-text-strong">
            <span className="h-2 w-2 rounded-sm bg-brand-mp" />
            Mercado Pago / Point
          </span>
          <span className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 font-inter text-sm font-semibold text-text-strong">
            <span className="h-2 w-2 rounded-sm bg-brand-ton" />
            Ton
          </span>
          <span className="flex h-9 items-center rounded-[10px] border border-dashed border-border-hover px-3.5 font-inter text-sm font-medium text-muted-2">
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
