"use client";

import type { Machine } from "@/types/machine";
import { useCompare } from "./CompareProvider";
import { buildCompareRows } from "./compare-rows";
import { formatCurrency, formatInstallments } from "@/lib/formatters";
import { BuyLink } from "@/components/ui/BuyLink";

export function CompareModal({ machines }: { machines: Machine[] }) {
  const compare = useCompare();
  if (!compare.isOpen) return null;

  const items = compare.slugs
    .map((slug) => machines.find((m) => m.slug === slug))
    .filter((m): m is Machine => !!m);
  const rows = buildCompareRows(items);
  const tableCols = `200px repeat(${Math.max(1, items.length)}, minmax(180px, 1fr))`;
  const tableMinWidth = 200 + Math.max(1, items.length) * 200;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-[#171A21]/45 p-0 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && compare.close()}
    >
      <div className="relative w-full max-w-300 overflow-hidden rounded-none border border-border bg-bg shadow-dropdown sm:rounded-3xl">
        <div className="sticky top-0 z-2 flex items-center justify-between gap-4 border-b border-border bg-white px-6 py-5">
          <div>
            <h2 className="m-0 font-manrope text-[22px] font-bold">Comparar maquininhas</h2>
            <p className="m-0 mt-1.5 font-inter text-sm text-muted">
              {items.length} de {compare.max} maquininhas selecionadas
            </p>
          </div>
          <button
            data-focus="1"
            onClick={compare.close}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-white font-inter text-lg text-muted hover:bg-bg"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-white">
              <span className="h-5 w-5 rounded-md border-2 border-muted-2" />
            </div>
            <h3 className="mt-5 font-manrope text-[22px] font-bold">Sua comparação está vazia</h3>
            <p className="mx-auto mt-2.5 max-w-100 font-inter text-[15px] text-muted">
              Marque &ldquo;Comparar&rdquo; em até {compare.max} maquininhas do catálogo para ver
              as diferenças lado a lado.
            </p>
            <button
              data-focus="1"
              onClick={compare.close}
              className="mt-6 h-12 cursor-pointer rounded-xl border-none bg-primary px-5.5 font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto p-6">
            <div style={{ minWidth: tableMinWidth }}>
              <div className="grid items-end gap-4" style={{ gridTemplateColumns: tableCols }}>
                <div className="pb-3 font-inter text-[13px] font-semibold tracking-[0.06em] text-muted-2 uppercase">
                  Produto
                </div>
                {items.map((m) => (
                  <div key={m.slug} className="rounded-2xl border border-border bg-white p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-6 items-center gap-1.5 rounded-md bg-[#F2F4F8] px-2 font-inter text-[11px] font-semibold text-text-strong">
                        {m.brand}
                      </span>
                      <button
                        data-focus="1"
                        onClick={() => compare.remove(m.slug)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-[#F2F4F8] font-inter text-[13px] font-bold text-muted hover:bg-[#E9ECF2]"
                      >
                        ×
                      </button>
                    </div>
                    <div className="mt-3 aspect-4/3 rounded-xl border border-dashed border-border-hover bg-bg" />
                    <h3 className="mt-3.5 font-manrope text-[17px] leading-tight font-bold">{m.name}</h3>
                    <span className="mt-2 block font-manrope text-[22px] font-bold">
                      {formatCurrency(m.currentPriceCents)}
                    </span>
                    <span className="mt-1 block font-inter text-xs font-medium text-muted">
                      {formatInstallments(m.installmentCount, m.installmentValueCents)}
                    </span>
                    <BuyLink
                      machine={m}
                      className="mt-3.5 block h-11 rounded-xl bg-primary text-center font-inter text-sm leading-11 font-semibold text-white hover:bg-primary-dark"
                    >
                      Quero essa
                    </BuyLink>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid items-center gap-4 border-b border-[#F2F4F8] px-4 py-3.5 last:border-b-0"
                    style={{ gridTemplateColumns: tableCols }}
                  >
                    <div className="flex items-center gap-2 font-inter text-sm font-medium text-muted">
                      {row.label}
                      {row.differs && (
                        <span className="rounded-md bg-primary-soft px-1.5 font-inter text-[10px] font-semibold tracking-[0.04em] text-primary-dark">
                          DIFERE
                        </span>
                      )}
                    </div>
                    {row.cells.map((cell, i) => (
                      <div
                        key={i}
                        className={`font-inter text-[15px] font-semibold ${cell.muted ? "text-muted-2" : "text-text"}`}
                      >
                        {cell.value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-4 font-inter text-[13px] text-muted-2">
                Taxas e preços são informativos e podem variar conforme plano, campanha e
                faturamento. Confirme no site oficial.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
