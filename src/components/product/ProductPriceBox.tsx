"use client";

import type { Machine } from "@/types/machine";
import { formatCurrency, formatInstallments } from "@/lib/formatters";
import { BuyLink } from "@/components/ui/BuyLink";
import { useCompare } from "@/features/comparison/CompareProvider";

export function ProductPriceBox({ machine }: { machine: Machine }) {
  const compare = useCompare();
  const selected = compare.slugs.includes(machine.slug);
  const saveCents =
    machine.originalPriceCents != null && machine.currentPriceCents != null
      ? machine.originalPriceCents - machine.currentPriceCents
      : null;

  return (
    <div className="mt-6 rounded-[20px] border border-border bg-white p-6 shadow-card">
      {saveCents != null && saveCents > 0 && (
        <div className="flex items-baseline gap-2.5">
          <span className="font-inter text-[15px] text-muted-2 line-through">
            {formatCurrency(machine.originalPriceCents)}
          </span>
          <span className="font-inter text-[13px] font-medium text-success">
            economia de {formatCurrency(saveCents)}
          </span>
        </div>
      )}
      <div className="mt-1.5 flex items-baseline gap-2.5">
        <span className="font-manrope text-[40px] leading-none font-bold tracking-[-0.03em]">
          {formatCurrency(machine.currentPriceCents)}
        </span>
        <span className="font-inter text-sm font-medium text-muted">à vista</span>
      </div>
      <p className="mt-2 font-inter text-[15px] font-medium text-muted">
        ou {formatInstallments(machine.installmentCount, machine.installmentValueCents)} no cartão
      </p>

      <BuyLink
        machine={machine}
        className="mt-5 flex h-14 w-full items-center justify-center rounded-xl bg-primary font-inter text-[17px] font-bold text-white shadow-[0_4px_12px_rgba(109,93,251,0.24)] hover:bg-primary-dark"
      >
        Comprar no site oficial
      </BuyLink>
      <p className="mt-3 text-center font-inter text-[13px] text-muted-2">
        Você será direcionado ao site da empresa.
      </p>

      <div className="mt-4 flex gap-2.5">
        <button
          data-focus="1"
          onClick={() => compare.toggle(machine.slug)}
          className="h-11 flex-1 cursor-pointer rounded-xl border border-border bg-white font-inter text-[15px] font-semibold text-text hover:border-border-hover hover:bg-bg"
        >
          {selected ? "Remover da comparação" : "Adicionar à comparação"}
        </button>
        <button
          data-focus="1"
          onClick={compare.open}
          className="h-11 flex-1 cursor-pointer rounded-xl border border-border bg-white font-inter text-[15px] font-semibold text-text hover:border-border-hover hover:bg-bg"
        >
          Ver comparação
        </button>
      </div>
    </div>
  );
}
