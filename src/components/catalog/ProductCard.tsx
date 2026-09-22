"use client";

import type { Machine } from "@/types/machine";
import { siteConfig } from "@/config/site";
import { getMachineBadges } from "@/features/catalog/machine-badges";
import { formatCurrency, formatInstallments, formatPercentage } from "@/lib/formatters";
import { BuyLink } from "@/components/ui/BuyLink";
import { useCompare } from "@/features/comparison/CompareProvider";
import { useToast } from "@/components/ui/ToastProvider";

export function ProductCard({ machine, catalog }: { machine: Machine; catalog: Machine[] }) {
  const compare = useCompare();
  const toast = useToast();
  const badge = getMachineBadges(machine, catalog)[0];
  const selected = compare.slugs.includes(machine.slug);

  function onToggleCompare() {
    const result = compare.toggle(machine.slug);
    if (result.blocked) {
      toast.notify(`Você pode comparar até ${compare.max} maquininhas.`);
    }
  }

  return (
    <article
      className={`flex flex-col rounded-3xl border bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,24,40,0.10)] ${
        selected ? "border-[#C7C1F5] shadow-card-selected" : "border-border shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="flex h-6.5 items-center gap-1.5 rounded-lg border border-border bg-[#F2F4F8] px-2.5 font-inter text-xs font-semibold text-text-strong">
            <span
              className="h-1.75 w-1.75 rounded-sm"
              style={{ background: machine.provider === "MERCADO_PAGO" ? "var(--color-brand-mp)" : "var(--color-brand-ton)" }}
            />
            {machine.brand}
          </span>
          {badge && (
            <span className="flex h-6.5 items-center rounded-lg bg-primary-soft px-2.5 font-inter text-xs font-semibold text-primary-dark">
              {badge.label}
            </span>
          )}
        </div>
        {siteConfig.showDiscountBadges && machine.discountBasisPoints != null && (
          <span className="flex h-6.5 items-center rounded-lg bg-success px-2 font-inter text-xs font-bold text-white">
            -{Math.round(machine.discountBasisPoints / 100)}%
          </span>
        )}
      </div>

      <div className="px-5 pt-4">
        <div className="relative flex aspect-4/3 items-end justify-center rounded-2xl border border-dashed border-border-hover bg-bg p-3.5 [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_10px,transparent_10px_20px)]">
          <span className="text-center font-mono text-[10px] leading-relaxed text-muted-2 tracking-[0.04em]">
            [ IMAGEM OFICIAL ]
            <br />
            {machine.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="m-0 font-manrope text-[22px] leading-tight font-bold tracking-[-0.01em]">
          {machine.name}
        </h3>
        {machine.shortDescription && (
          <p className="mt-2 font-inter text-sm leading-relaxed text-muted text-pretty">
            {machine.shortDescription}
          </p>
        )}

        <ul className="mt-4 grid list-none grid-cols-2 gap-2 p-0">
          {machine.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-1.5 font-inter text-[13px] font-medium text-text-strong">
              <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-soft font-inter text-[10px] font-bold text-primary-dark">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-border pt-4">
          {machine.originalPriceCents != null && machine.originalPriceCents !== machine.currentPriceCents && (
            <span className="font-inter text-sm text-muted-2 line-through">
              {formatCurrency(machine.originalPriceCents)}
            </span>
          )}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-manrope text-[30px] leading-none font-bold tracking-[-0.02em]">
              {formatCurrency(machine.currentPriceCents)}
            </span>
            <span className="font-inter text-[13px] font-medium text-muted">à vista</span>
          </div>
          <p className="mt-1.5 font-inter text-[13px] font-medium text-muted">
            ou {formatInstallments(machine.installmentCount, machine.installmentValueCents)}
          </p>
        </div>

        {siteConfig.showFees && machine.fees && (
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border bg-bg p-3">
            <FeeCell label="Pix" value={formatPercentage(machine.fees.pixBp)} />
            <FeeCell label="Débito" value={formatPercentage(machine.fees.debitBp)} bordered />
            <FeeCell label="Crédito" value={formatPercentage(machine.fees.creditCashBp)} bordered />
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2.5 pt-5">
          <BuyLink
            machine={machine}
            className="flex h-12 items-center justify-center rounded-xl bg-primary font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
          >
            Quero essa maquininha
          </BuyLink>
          <a
            href={`/maquininhas/${machine.slug}`}
            className="flex h-11 items-center justify-center rounded-xl border border-border bg-white font-inter text-[15px] font-semibold text-text hover:border-border-hover hover:bg-bg"
          >
            Ver detalhes
          </a>
          <label className="mt-0.5 flex cursor-pointer items-center gap-2.5 font-inter text-sm font-medium text-muted">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] font-inter text-xs font-bold text-white ${
                selected ? "border-primary bg-primary" : "border-border-hover bg-white"
              }`}
            >
              {selected ? "✓" : ""}
            </span>
            <input
              data-focus="1"
              type="checkbox"
              checked={selected}
              onChange={onToggleCompare}
              className="absolute h-px w-px opacity-0"
            />
            Comparar
          </label>
        </div>
      </div>
    </article>
  );
}

function FeeCell({ label, value, bordered }: { label: string; value: string; bordered?: boolean }) {
  return (
    <div className={bordered ? "border-l border-border pl-2" : ""}>
      <span className="block font-inter text-[11px] font-semibold tracking-[0.04em] text-muted-2 uppercase">
        {label}
      </span>
      <span className="mt-1.25 block font-inter text-sm font-bold text-text">{value}</span>
    </div>
  );
}
