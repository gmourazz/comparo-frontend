"use client";

import { useMemo, useState } from "react";
import type { Machine } from "@/types/machine";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "./ProductCard";
import { FiltersDrawer } from "./FiltersDrawer";
import {
  brandFilterLabels,
  featureFilterLabels,
  profileFilterLabels,
  quickFilterLabels,
  sortOptions,
} from "@/config/content/filters";
import { siteConfig } from "@/config/site";
import { useCatalogFilters } from "@/features/catalog/CatalogFilterProvider";
import { filterMachines } from "@/features/catalog/filter-machines";
import { sortMachines } from "@/features/catalog/rank-machines";

export function CatalogSection({ machines }: { machines: Machine[] }) {
  const filters = useCatalogFilters();
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () =>
      sortMachines(
        filterMachines(machines, {
          brand: filters.brand,
          profile: filters.profile,
          quick: filters.quick,
          features: filters.features,
          query: filters.query,
        }),
        filters.sort,
      ),
    [machines, filters.brand, filters.profile, filters.quick, filters.features, filters.query, filters.sort],
  );

  function reload() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <>
      {/* Search + quick chips */}
      <section className="mx-auto max-w-[1280px] px-6 pt-16">
        <div className="rounded-[20px] border border-border bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-80 flex-1">
              <span className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-muted-2" />
              <input
                data-focus="1"
                value={filters.query}
                onChange={(e) => filters.setQuery(e.target.value)}
                placeholder="Qual tipo de maquininha você procura?"
                className="h-13 w-full rounded-xl border border-border-hover bg-white pr-4 pl-11 font-inter text-base text-text focus:border-primary focus:shadow-[0_0_0_4px_rgba(109,93,251,0.14)] focus:outline-none"
              />
            </div>
            <a
              href="#catalogo"
              className="flex h-13 items-center rounded-xl bg-text px-5.5 font-inter text-base font-semibold text-white hover:bg-[#2b3040]"
            >
              Buscar
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickFilterLabels.map((label) => (
              <Chip key={label} active={filters.quick === label} onClick={() => filters.setQuick(label)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalogo" className="mx-auto max-w-[1280px] px-6 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-155">
            <h2 className="m-0 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
              Compare as maquininhas
            </h2>
            <p className="mt-3 font-inter text-[17px] text-muted">
              Veja preços, recursos e condições em um só lugar.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              title="Preços e condições podem mudar. Confirme as informações no site oficial."
              className="inline-flex h-8 items-center gap-2 rounded-full border border-border bg-[#F2F4F8] px-3 font-inter text-[13px] font-medium text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Dados atualizados em {siteConfig.lastUpdatedLabel}
            </span>
            <button
              data-focus="1"
              onClick={reload}
              className="h-8 cursor-pointer rounded-full border border-border bg-white px-3 font-inter text-[13px] font-medium text-muted hover:border-border-hover hover:text-text"
            >
              Recarregar
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-white px-5 py-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-muted-2 uppercase">
              Marca
            </span>
            <div className="flex gap-0.5 rounded-[10px] bg-[#F2F4F8] p-0.75">
              {brandFilterLabels.map((label) => (
                <button
                  key={label}
                  data-focus="1"
                  onClick={() => filters.setBrand(label)}
                  className={`h-8.5 cursor-pointer rounded-lg px-3.5 font-inter text-sm font-semibold ${
                    filters.brand === label ? "bg-white text-text shadow-[0_1px_2px_rgba(16,24,40,0.08)]" : "text-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-muted-2 uppercase">
              Recursos
            </span>
            <div className="flex flex-wrap gap-2">
              {featureFilterLabels.map((label) => (
                <Chip
                  key={label}
                  pill
                  active={filters.features.includes(label)}
                  onClick={() => filters.toggleFeature(label)}
                >
                  {label}
                </Chip>
              ))}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <button
              data-focus="1"
              onClick={filters.openFiltersDrawer}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 font-inter text-sm font-semibold text-text hover:border-border-hover hover:bg-bg"
            >
              Todos os filtros
              <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary-soft px-1.25 font-inter text-[11px] font-bold text-primary-dark">
                {filters.activeFilterCount}
              </span>
            </button>
            <label className="flex items-center gap-2 font-inter text-sm font-medium text-muted">
              Ordenar
              <select
                data-focus="1"
                value={filters.sort}
                onChange={(e) => filters.setSort(e.target.value as typeof filters.sort)}
                className="h-10 cursor-pointer rounded-[10px] border border-border-hover bg-white px-3 font-inter text-sm font-medium text-text focus:border-primary focus:shadow-[0_0_0_4px_rgba(109,93,251,0.14)] focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-inter text-[13px] font-semibold tracking-[0.06em] text-muted-2 uppercase">
            Perfil
          </span>
          {profileFilterLabels.map((label) => (
            <Chip key={label} active={filters.profile === label} onClick={() => filters.setProfile(label)}>
              {label}
            </Chip>
          ))}
        </div>

        <p className="mt-5 font-inter text-sm font-medium text-muted">
          {filtered.length === 1 ? "1 maquininha encontrada" : `${filtered.length} maquininhas encontradas`}
        </p>

        {loading && (
          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[20px] border border-border bg-white p-5">
                <div className="h-5 w-30 animate-pulse rounded-md bg-[#F2F4F8]" />
                <div className="mt-4 aspect-4/3 animate-pulse rounded-2xl bg-[#F2F4F8]" />
                <div className="mt-5 h-6 w-2/3 animate-pulse rounded-md bg-[#F2F4F8]" />
                <div className="mt-2.5 h-4 w-9/10 rounded-md bg-[#F2F4F8]" />
                <div className="mt-6 h-8 w-1/2 animate-pulse rounded-lg bg-[#F2F4F8]" />
                <div className="mt-5 h-12 rounded-xl bg-[#F2F4F8]" />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-5 rounded-[20px] border border-dashed border-border-hover bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-[#F2F4F8]">
              <span className="h-5.5 w-5.5 rounded-full border-2 border-muted-2" />
            </div>
            <h3 className="mt-5 font-manrope text-[22px] font-bold">
              Nenhuma maquininha corresponde a esses filtros.
            </h3>
            <p className="mx-auto mt-2.5 max-w-105 font-inter text-[15px] text-muted">
              Tente remover um recurso ou voltar para todas as marcas.
            </p>
            <button
              data-focus="1"
              onClick={filters.clear}
              className="mt-6 h-12 cursor-pointer rounded-xl border-none bg-primary font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {filtered.map((m) => (
              <ProductCard key={m.slug} machine={m} catalog={machines} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-white px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary-soft font-inter text-sm font-bold text-primary-dark">
            i
          </span>
          <p className="m-0 flex-1 basis-80 font-inter text-sm leading-relaxed text-muted text-pretty">
            <strong className="font-semibold text-text">Transparência.</strong> Alguns links desta
            página são links de indicação. Podemos receber uma recompensa quando uma contratação é
            realizada através deles, sem custo adicional para você.
          </p>
          <a href="/como-escolher" className="font-inter text-sm font-semibold text-primary-dark">
            Saiba mais
          </a>
        </div>
      </section>

      <FiltersDrawer />
    </>
  );
}
