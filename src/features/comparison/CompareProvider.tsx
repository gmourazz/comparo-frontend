"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/config/site";
import { trackComparisonView, trackMachineCompareAdd, trackMachineCompareRemove } from "@/features/tracking/events";

const STORAGE_KEY = "comparo:compare-slugs";

interface CompareContextValue {
  slugs: string[];
  isOpen: boolean;
  max: number;
  toggle: (slug: string) => { added: boolean; blocked: boolean };
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

function readInitialSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("machines");
    if (fromUrl) return fromUrl.split(",").filter(Boolean).slice(0, siteConfig.maxCompare);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return (JSON.parse(stored) as string[]).slice(0, siteConfig.maxCompare);
  } catch {
    // localStorage/JSON can legitimately fail (private mode, corrupt value) — start empty.
  }
  return [];
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage/URL (unavailable during SSR) —
    // not derived React state, so the set-state-in-effect rule doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlugs(readInitialSlugs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // ignore write failures (private mode / storage full)
    }
    if (window.location.pathname === "/comparar") {
      const params = new URLSearchParams(window.location.search);
      if (slugs.length) params.set("machines", slugs.join(","));
      else params.delete("machines");
      const query = params.toString();
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    }
  }, [slugs, hydrated]);

  const toggle = useCallback((slug: string) => {
    let added = false;
    let blocked = false;
    setSlugs((current) => {
      if (current.includes(slug)) {
        trackMachineCompareRemove(slug);
        return current.filter((s) => s !== slug);
      }
      if (current.length >= siteConfig.maxCompare) {
        blocked = true;
        return current;
      }
      added = true;
      trackMachineCompareAdd(slug);
      return [...current, slug];
    });
    return { added, blocked };
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((current) => current.filter((s) => s !== slug));
    trackMachineCompareRemove(slug);
  }, []);

  const clear = useCallback(() => setSlugs([]), []);
  const open = useCallback(() => {
    setIsOpen(true);
    if (slugs.length > 0) trackComparisonView(slugs);
  }, [slugs]);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CompareContextValue>(
    () => ({ slugs, isOpen, max: siteConfig.maxCompare, toggle, remove, clear, open, close }),
    [slugs, isOpen, toggle, remove, clear, open, close],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
