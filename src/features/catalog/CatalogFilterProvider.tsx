"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { BrandFilter, FeatureFilter, ProfileFilter, QuickFilter, SortOption } from "@/config/content/filters";

interface CatalogFilterState {
  query: string;
  brand: BrandFilter;
  profile: ProfileFilter;
  quick: QuickFilter;
  features: FeatureFilter[];
  sort: SortOption;
  filtersDrawerOpen: boolean;
}

interface CatalogFilterContextValue extends CatalogFilterState {
  setQuery: (q: string) => void;
  setBrand: (b: BrandFilter) => void;
  setProfile: (p: ProfileFilter) => void;
  setQuick: (q: QuickFilter) => void;
  toggleFeature: (f: FeatureFilter) => void;
  setSort: (s: SortOption) => void;
  openFiltersDrawer: () => void;
  closeFiltersDrawer: () => void;
  clear: () => void;
  activeFilterCount: number;
}

const INITIAL: CatalogFilterState = {
  query: "",
  brand: "Todas",
  profile: "Todos",
  quick: "Todas",
  features: [],
  sort: "Recomendadas",
  filtersDrawerOpen: false,
};

const CatalogFilterContext = createContext<CatalogFilterContextValue | null>(null);

export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogFilterState>(INITIAL);

  const setQuery = useCallback((query: string) => setState((s) => ({ ...s, query })), []);
  const setBrand = useCallback((brand: BrandFilter) => setState((s) => ({ ...s, brand })), []);
  const setProfile = useCallback(
    (profile: ProfileFilter) => setState((s) => ({ ...s, profile, quick: "Todas" })),
    [],
  );
  const setQuick = useCallback((quick: QuickFilter) => setState((s) => ({ ...s, quick })), []);
  const toggleFeature = useCallback(
    (f: FeatureFilter) =>
      setState((s) => ({
        ...s,
        features: s.features.includes(f) ? s.features.filter((x) => x !== f) : [...s.features, f],
      })),
    [],
  );
  const setSort = useCallback((sort: SortOption) => setState((s) => ({ ...s, sort })), []);
  const openFiltersDrawer = useCallback(() => setState((s) => ({ ...s, filtersDrawerOpen: true })), []);
  const closeFiltersDrawer = useCallback(() => setState((s) => ({ ...s, filtersDrawerOpen: false })), []);
  const clear = useCallback(
    () => setState((s) => ({ ...INITIAL, filtersDrawerOpen: s.filtersDrawerOpen })),
    [],
  );

  const activeFilterCount =
    (state.brand !== "Todas" ? 1 : 0) +
    (state.profile !== "Todos" ? 1 : 0) +
    state.features.length +
    (state.quick !== "Todas" ? 1 : 0);

  const value = useMemo<CatalogFilterContextValue>(
    () => ({
      ...state,
      setQuery,
      setBrand,
      setProfile,
      setQuick,
      toggleFeature,
      setSort,
      openFiltersDrawer,
      closeFiltersDrawer,
      clear,
      activeFilterCount,
    }),
    [state, setQuery, setBrand, setProfile, setQuick, toggleFeature, setSort, openFiltersDrawer, closeFiltersDrawer, clear, activeFilterCount],
  );

  return <CatalogFilterContext.Provider value={value}>{children}</CatalogFilterContext.Provider>;
}

export function useCatalogFilters() {
  const ctx = useContext(CatalogFilterContext);
  if (!ctx) throw new Error("useCatalogFilters must be used within a CatalogFilterProvider");
  return ctx;
}
