"use client";

import { useState } from "react";
import type { Machine } from "@/types/machine";
import { feeMethodTabs, type FeeMethodTab } from "@/config/content/filters";
import { averageFeeBp, feeMethodForTab, rankByFee } from "@/features/catalog/rank-machines";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const FEE_TITLES: Record<FeeMethodTab, string> = {
  Pix: "Pix recebido na maquininha",
  Débito: "Venda no cartão de débito",
  Crédito: "Crédito à vista",
  Parcelado: "Crédito parcelado em 12x",
};

const FEE_NOTES: Record<FeeMethodTab, string> = {
  Pix: "O Pix na maquininha cai na conta na hora, com a menor taxa entre as formas de pagamento.",
  Débito: "O débito costuma ter a segunda menor taxa e recebimento em 1 dia útil.",
  Crédito: "No crédito à vista o dinheiro pode cair em 1 dia útil, com taxa maior que o débito.",
  Parcelado: "No parcelado a taxa cresce conforme o número de parcelas. O valor mostrado é o ponto de partida.",
};

export function FeesSection({ machines }: { machines: Machine[] }) {
  const [tab, setTab] = useState<FeeMethodTab>("Pix");
  const method = feeMethodForTab(tab);
  const ranking = rankByFee(machines, method);
  const avgBp = averageFeeBp(machines, method);
  const barWidth = avgBp == null ? 6 : Math.max(6, (avgBp / 100) * 12);

  return (
    <section id="taxas" className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-155">
          <h2 className="m-0 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
            Entenda as taxas
          </h2>
          <p className="mt-3 font-inter text-[17px] text-muted">
            Quanto sai de cada venda, em valores simples de entender.
          </p>
        </div>
        <div className="flex gap-0.5 rounded-xl border border-border bg-white p-1">
          {feeMethodTabs.map((t) => (
            <button
              key={t}
              data-focus="1"
              onClick={() => setTab(t)}
              className={`h-9.5 cursor-pointer rounded-lg px-4 font-inter text-sm font-semibold ${
                tab === t ? "bg-text text-white" : "text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="rounded-[20px] border border-border bg-white p-7">
          <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-muted-2 uppercase">
            Exemplo
          </span>
          <h3 className="mt-3 font-manrope text-[22px] font-bold">{FEE_TITLES[tab]}</h3>
          <div className="mt-6 flex flex-col gap-3.5">
            <div>
              <div className="flex justify-between font-inter text-sm font-medium text-muted">
                <span>Venda</span>
                <span className="font-semibold text-text">R$ 100,00</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-primary-soft" />
            </div>
            <div>
              <div className="flex justify-between font-inter text-sm font-medium text-muted">
                <span>Taxa média</span>
                <span className="font-semibold text-text">{formatPercentage(avgBp)}</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#F2F4F8]">
                <div className="h-full rounded-full bg-warning" style={{ width: `${barWidth}%` }} />
              </div>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-inter text-[15px] font-medium text-text-strong">
                Você recebe cerca de
              </span>
              <span className="font-manrope text-[26px] font-bold text-success">
                {avgBp == null ? "Não informado" : formatCurrency(10000 - Math.round(avgBp))}
              </span>
            </div>
          </div>
          <p className="mt-5 font-inter text-[13px] text-muted-2">{FEE_NOTES[tab]}</p>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-border bg-white pt-2">
          {ranking.map((r) => (
            <div
              key={r.machine.slug}
              className="flex items-center gap-3 border-b border-[#F2F4F8] px-6 py-3.5 last:border-b-0"
            >
              <span
                className="h-2 w-2 flex-none rounded-sm"
                style={{
                  background:
                    r.machine.provider === "MERCADO_PAGO" ? "var(--color-brand-mp)" : "var(--color-brand-ton)",
                }}
              />
              <span className="min-w-0 flex-1 font-inter text-[15px] font-semibold text-text">
                {r.machine.name}
              </span>
              <span className="font-inter text-[13px] text-muted-2">
                recebe {r.netCentsOf100 == null ? "—" : formatCurrency(r.netCentsOf100)}
              </span>
              <span className="min-w-18 text-right font-inter text-[15px] font-bold text-text">
                {formatPercentage(r.rateBp)}
              </span>
            </div>
          ))}
          <div className="flex gap-2.5 bg-bg px-6 py-4">
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-md bg-warning-soft font-inter text-xs font-bold text-warning-text">
              !
            </span>
            <p className="m-0 font-inter text-[13px] leading-relaxed text-muted">
              As taxas podem variar conforme plano, campanha e faturamento. Confirme no site
              oficial antes de contratar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
