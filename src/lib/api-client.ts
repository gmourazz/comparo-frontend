import type { Machine } from "@/types/machine";

/**
 * Base URL of the Go backend (see backend/). Server-only — Server Components
 * and Route Handlers call this directly (no CORS involved); nothing here is
 * exposed to the browser.
 */
function apiUrl(): string {
  const url = process.env.API_URL;
  if (!url) throw new Error("API_URL is not set");
  return url;
}

const DATE_FIELDS = ["promotionExpiresAt", "firstSeenAt", "lastSeenAt", "updatedAt"] as const;

/** JSON has no Date type — the Go API sends RFC3339 strings for these fields. */
function reviveDates(raw: Record<string, unknown>): Machine {
  const out = { ...raw };
  for (const field of DATE_FIELDS) {
    const value = out[field];
    if (typeof value === "string") out[field] = new Date(value);
  }
  return out as unknown as Machine;
}

export async function apiGet<T>(path: string): Promise<T | null> {
  const res = await fetch(`${apiUrl()}${path}`, { next: { revalidate: 300 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export async function fetchMachines(path: string): Promise<Machine[]> {
  const raw = (await apiGet<Record<string, unknown>[]>(path)) ?? [];
  return raw.map(reviveDates);
}

export async function fetchMachine(path: string): Promise<Machine | null> {
  const raw = await apiGet<Record<string, unknown>>(path);
  return raw ? reviveDates(raw) : null;
}
