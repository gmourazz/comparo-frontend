import type { Machine } from "@/types/machine";
import { formatCurrency } from "@/lib/formatters";

export function SimilarProductsGrid({ items }: { items: Machine[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="m-0 text-card-title font-manrope leading-tight font-bold tracking-[-0.02em]">
        Compare com modelos parecidos
      </h2>
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {items.map((m) => (
          <a
            key={m.slug}
            href={`/maquininhas/${m.slug}`}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-white p-4 hover:border-border-hover hover:shadow-[0_4px_12px_rgba(16,24,40,0.08)]"
          >
            {m.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.image}
                alt={m.name}
                className="h-16 w-16 flex-none rounded-xl border border-border-hover bg-bg object-contain p-1.5"
                loading="lazy"
              />
            ) : (
              <span className="h-16 w-16 flex-none rounded-xl border border-dashed border-border-hover bg-bg bg-[repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_8px,transparent_8px_16px)]" />
            )}
            <span className="min-w-0 flex-1">
              <span className="block font-inter text-xs text-muted-2">{m.brand}</span>
              <span className="mt-1.25 block font-manrope text-base leading-tight font-bold text-text">
                {m.name}
              </span>
              <span className="mt-1.5 block font-inter text-sm font-semibold text-primary-dark">
                {formatCurrency(m.currentPriceCents)}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
