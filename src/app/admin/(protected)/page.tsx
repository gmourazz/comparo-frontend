import { getSyncStatus } from "@/lib/admin-api";
import { formatDate } from "@/lib/formatters";
import { SyncNowButton } from "./SyncNowButton";
import { SignOutButton } from "./SignOutButton";

const PROVIDER_LABELS: Record<string, string> = {
  MERCADO_PAGO: "Mercado Pago",
  TON: "Ton",
};

const CHANGE_LABELS: Record<string, string> = {
  PRICE_CHANGED: "Preço alterado",
  PROMOTION_CHANGED: "Promoção alterada",
  PRODUCT_ADDED: "Produto adicionado",
  PRODUCT_REMOVED: "Produto removido",
  FEATURE_CHANGED: "Recursos alterados",
};

export default async function AdminDashboardPage() {
  let status: Awaited<ReturnType<typeof getSyncStatus>> | null = null;
  let loadError: string | null = null;
  try {
    status = await getSyncStatus();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Falha ao carregar status.";
  }

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="m-0 font-manrope text-2xl font-bold">Painel do catálogo</h1>
        <div className="flex items-center gap-3">
          <SyncNowButton />
          <SignOutButton />
        </div>
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-inter text-sm text-red-700">
          {loadError}
        </p>
      )}

      {status && (
        <>
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            {status.providers.map((p) => (
              <div key={p.provider} className="rounded-2xl border border-border bg-white p-5">
                <h2 className="m-0 font-manrope text-lg font-bold">{PROVIDER_LABELS[p.provider] ?? p.provider}</h2>
                <p className="mt-2 font-inter text-sm text-muted">
                  {p.activeCount} produto{p.activeCount === 1 ? "" : "s"} ativo{p.activeCount === 1 ? "" : "s"}
                </p>
                <p className="mt-1 font-inter text-sm text-muted">
                  Última tentativa: {p.lastAttemptAt ? formatDate(p.lastAttemptAt) : "nunca"}
                  {p.lastAttemptStatus && ` (${p.lastAttemptStatus})`}
                </p>
                <p className="mt-1 font-inter text-sm text-muted">
                  Última sincronização bem-sucedida: {p.lastSuccessAt ? formatDate(p.lastSuccessAt) : "nunca"}
                </p>
                {p.recentError && (
                  <p className="mt-2 rounded-lg bg-red-50 p-2 font-inter text-xs text-red-700">{p.recentError}</p>
                )}
                {p.recentWarnings.length > 0 && (
                  <ul className="mt-2 list-disc pl-4 font-inter text-xs text-warning-text">
                    {p.recentWarnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-manrope text-lg font-bold">Mudanças recentes</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
            {status.recentChanges.length === 0 && (
              <p className="p-5 font-inter text-sm text-muted">Nenhuma mudança registrada ainda.</p>
            )}
            {status.recentChanges.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-[#F2F4F8] px-5 py-3 last:border-b-0"
              >
                <span className="font-inter text-sm font-medium text-text">
                  {PROVIDER_LABELS[c.provider] ?? c.provider} — {CHANGE_LABELS[c.changeType] ?? c.changeType}
                  {c.field ? ` (${c.field})` : ""}
                </span>
                <span className="font-inter text-xs text-muted-2">{formatDate(c.detectedAt)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
