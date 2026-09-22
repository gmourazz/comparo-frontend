"use client";

import { useState } from "react";
import { useConsent } from "@/features/tracking/ConsentProvider";

export function CookieBanner() {
  const consent = useConsent();
  const [configuring, setConfiguring] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);
  const [marketingChecked, setMarketingChecked] = useState(true);

  if (!consent.bannerVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[130] w-[min(400px,calc(100vw-48px))] rounded-2xl border border-border bg-white p-5 shadow-toast">
      <p className="m-0 font-inter text-sm leading-relaxed text-muted">
        <strong className="font-semibold text-text">Cookies.</strong> Usamos cookies para entender
        o uso do site e melhorar a comparação. Você escolhe.
      </p>

      {configuring && (
        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
          <label className="flex items-center justify-between gap-3 font-inter text-sm text-text">
            Necessários (sempre ativos)
            <input type="checkbox" checked disabled />
          </label>
          <label className="flex items-center justify-between gap-3 font-inter text-sm text-text">
            Analytics
            <input
              type="checkbox"
              checked={analyticsChecked}
              onChange={(e) => setAnalyticsChecked(e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between gap-3 font-inter text-sm text-text">
            Marketing
            <input
              type="checkbox"
              checked={marketingChecked}
              onChange={(e) => setMarketingChecked(e.target.checked)}
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {configuring ? (
          <button
            data-focus="1"
            onClick={() =>
              consent.savePreferences({ analytics: analyticsChecked, marketing: marketingChecked })
            }
            className="h-11 cursor-pointer rounded-xl border-none bg-primary px-4.5 font-inter text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Salvar preferências
          </button>
        ) : (
          <>
            <button
              data-focus="1"
              onClick={consent.acceptAll}
              className="h-11 cursor-pointer rounded-xl border-none bg-primary px-4.5 font-inter text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Aceitar
            </button>
            <button
              data-focus="1"
              onClick={() => setConfiguring(true)}
              className="h-11 cursor-pointer rounded-xl border border-border bg-white px-4 font-inter text-sm font-semibold text-text hover:bg-bg"
            >
              Configurar
            </button>
            <button
              data-focus="1"
              onClick={consent.rejectOptional}
              className="h-11 cursor-pointer rounded-xl border-none bg-transparent px-3 font-inter text-sm font-semibold text-muted hover:text-text"
            >
              Recusar opcionais
            </button>
          </>
        )}
      </div>
    </div>
  );
}
