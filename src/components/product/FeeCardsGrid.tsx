import type { Machine } from "@/types/machine";
import { formatPercentage } from "@/lib/formatters";

export function FeeCardsGrid({ machine }: { machine: Machine }) {
  if (!machine.fees) return null;

  return (
    <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
      <FeeStat label="Pix" value={formatPercentage(machine.fees.pixBp)} />
      <FeeStat label="Débito" value={formatPercentage(machine.fees.debitBp)} />
      <FeeStat label="Crédito" value={formatPercentage(machine.fees.creditCashBp)} />
      <FeeStat label="Parcelado" value={formatPercentage(machine.fees.creditInstallmentBp)} />
    </div>
  );
}

function FeeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3.5">
      <span className="block font-inter text-[11px] font-semibold tracking-wider text-muted-2 uppercase">
        {label}
      </span>
      <span className="mt-1.5 block font-manrope text-lg font-bold">{value}</span>
    </div>
  );
}
