/**
 * Server-only calls to the Go backend's secret-protected internal
 * endpoints. Never imported from a Client Component — the sync secret must
 * never reach the browser.
 */

export interface ProviderStatus {
  provider: string;
  activeCount: number;
  lastAttemptAt: string | null;
  lastAttemptStatus: string | null;
  lastSuccessAt: string | null;
  recentWarnings: string[];
  recentError: string | null;
}

export interface RecentChange {
  provider: string;
  changeType: string;
  field: string | null;
  detectedAt: string;
}

export interface StatusResponse {
  providers: ProviderStatus[];
  recentChanges: RecentChange[];
}

function backendConfig() {
  const apiUrl = process.env.API_URL;
  const secret = process.env.CATALOG_SYNC_SECRET;
  if (!apiUrl) throw new Error("API_URL is not set");
  if (!secret) throw new Error("CATALOG_SYNC_SECRET is not set");
  return { apiUrl, secret };
}

export async function getSyncStatus(): Promise<StatusResponse> {
  const { apiUrl, secret } = backendConfig();
  const res = await fetch(`${apiUrl}/api/internal/status`, {
    headers: { "X-Sync-Secret": secret },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`status fetch failed: ${res.status}`);
  return res.json();
}

export async function triggerSync(): Promise<unknown> {
  const { apiUrl, secret } = backendConfig();
  const res = await fetch(`${apiUrl}/api/internal/catalog/sync?trigger=manual`, {
    method: "POST",
    headers: { "X-Sync-Secret": secret },
  });
  if (!res.ok) throw new Error(`sync trigger failed: ${res.status}`);
  return res.json();
}
