"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "comparo:cookie-consent";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentContextValue {
  consent: ConsentState | null;
  /** true until the visitor has made an explicit choice — banner should show. */
  bannerVisible: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing };
    }
  } catch {
    // corrupt/blocked storage — treat as no decision yet
  }
  return null;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (unavailable during SSR) — not
    // derived React state, so the set-state-in-effect rule doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setConsent(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore write failures — consent still applies for this session via state
    }
  }, []);

  const acceptAll = useCallback(() => persist({ necessary: true, analytics: true, marketing: true }), [persist]);
  const rejectOptional = useCallback(
    () => persist({ necessary: true, analytics: false, marketing: false }),
    [persist],
  );
  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) =>
      persist({ necessary: true, analytics: prefs.analytics, marketing: prefs.marketing }),
    [persist],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      bannerVisible: hydrated && consent === null,
      acceptAll,
      rejectOptional,
      savePreferences,
    }),
    [consent, hydrated, acceptAll, rejectOptional, savePreferences],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
