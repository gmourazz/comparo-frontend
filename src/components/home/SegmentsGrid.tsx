"use client";

import { segmentsData } from "@/config/content/segments";
import { useCatalogFilters } from "@/features/catalog/CatalogFilterProvider";
import type { ProfileFilter } from "@/config/content/filters";

export function SegmentsGrid() {
  const filters = useCatalogFilters();

  function selectSegment(profile: string) {
    filters.setProfile(profile as ProfileFilter);
    const el = document.getElementById("catalogo");
    if (el) window.scrollTo({ top: el.offsetTop - 80 });
  }

  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="max-w-155">
        <h2 className="m-0 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
          Encontre por tipo de negócio
        </h2>
        <p className="mt-3 font-inter text-[17px] text-muted">
          Escolha o perfil mais parecido com o seu e veja modelos compatíveis.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {segmentsData.map((s) => (
          <button
            key={s.code}
            data-focus="1"
            onClick={() => selectSegment(s.profile)}
            className="rounded-2xl border border-border bg-white p-5 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_12px_32px_rgba(16,24,40,0.10)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft font-mono text-[13px] font-semibold text-primary-dark">
              {s.code}
            </span>
            <span className="mt-4 block font-manrope text-lg font-bold text-text">{s.title}</span>
            <span className="mt-1.5 block font-inter text-sm text-muted">{s.desc}</span>
            <span className="mt-3.5 block font-inter text-sm font-semibold text-primary-dark">
              Ver modelos →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
