import type { Machine } from "@/types/machine";
import { buildHighlights } from "@/features/catalog/highlights";
import { formatCurrency } from "@/lib/formatters";

export function HighlightsSection({ machines }: { machines: Machine[] }) {
  const highlights = buildHighlights(machines);

  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="max-w-155">
        <h2 className="m-0 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
          Destaques por necessidade
        </h2>
        <p className="mt-3 font-inter text-[17px] text-muted">
          Seleções montadas a partir dos critérios de cada categoria.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {highlights.map((group) => (
          <div key={group.title} className="rounded-[20px] border border-border bg-white p-6">
            <h3 className="m-0 font-manrope text-[19px] font-bold">{group.title}</h3>
            <p className="mt-2 font-inter text-[13px] text-muted-2">{group.rule}</p>
            <div className="mt-5 flex flex-col gap-2.5">
              {group.items.length === 0 && (
                <p className="font-inter text-[13px] text-muted-2">Nenhum modelo disponível.</p>
              )}
              {group.items.map((m) => (
                <a
                  key={m.slug}
                  href={`/maquininhas/${m.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg p-2.5 hover:border-border-hover hover:bg-white"
                >
                  <span className="h-11 w-11 flex-none rounded-[10px] border border-dashed border-border-hover bg-white [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_8px,transparent_8px_16px)]" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-inter text-sm font-semibold text-text">{m.name}</span>
                    <span className="mt-0.75 block font-inter text-xs font-medium text-muted">
                      {m.brand} · {formatCurrency(m.currentPriceCents)}
                    </span>
                  </span>
                  <span className="font-inter text-[13px] font-semibold text-primary-dark">Ver</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
