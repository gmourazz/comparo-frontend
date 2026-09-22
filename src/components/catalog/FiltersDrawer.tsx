"use client";

import { Chip } from "@/components/ui/Chip";
import { brandFilterLabels, featureFilterLabels, profileFilterLabels } from "@/config/content/filters";
import { useCatalogFilters } from "@/features/catalog/CatalogFilterProvider";

export function FiltersDrawer() {
  const filters = useCatalogFilters();
  if (!filters.filtersDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex justify-end bg-[#171A21]/40">
      <div className="absolute inset-0" onClick={filters.closeFiltersDrawer} />
      <aside className="relative flex h-full w-[min(400px,100%)] flex-col border-l border-border bg-white shadow-[-12px_0_32px_rgba(16,24,40,0.12)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="m-0 font-manrope text-xl font-bold">Filtros</h2>
          <button
            data-focus="1"
            onClick={filters.closeFiltersDrawer}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white font-inter text-base text-muted hover:bg-bg"
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex-col gap-7 overflow-y-auto p-6">
          <div>
            <span className="font-inter text-sm font-semibold text-text">Marca</span>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {brandFilterLabels.map((label) => {
                const active = filters.brand === label;
                return (
                  <label
                    key={label}
                    className={`flex h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 font-inter text-[15px] font-medium text-text ${
                      active ? "border-[#C7C1F5] bg-primary-soft" : "border-border bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        active ? "border-primary" : "border-border-hover"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-primary" : "bg-transparent"}`} />
                    </span>
                    <input
                      data-focus="1"
                      type="radio"
                      checked={active}
                      onChange={() => filters.setBrand(label)}
                      className="absolute h-px w-px opacity-0"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-7">
            <span className="font-inter text-sm font-semibold text-text">Perfil do negócio</span>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {profileFilterLabels.map((label) => (
                <Chip key={label} active={filters.profile === label} onClick={() => filters.setProfile(label)}>
                  {label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <span className="font-inter text-sm font-semibold text-text">Recursos</span>
            <div className="mt-3.5 flex flex-col gap-1.5">
              {featureFilterLabels.map((label) => {
                const active = filters.features.includes(label);
                return (
                  <label
                    key={label}
                    className="flex h-12 cursor-pointer items-center gap-3 px-1 font-inter text-[15px] font-medium text-text"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] font-inter text-xs font-bold text-white ${
                        active ? "border-primary bg-primary" : "border-border-hover bg-white"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    <input
                      data-focus="1"
                      type="checkbox"
                      checked={active}
                      onChange={() => filters.toggleFeature(label)}
                      className="absolute h-px w-px opacity-0"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-border px-6 py-5">
          <button
            data-focus="1"
            onClick={filters.clear}
            className="h-12 cursor-pointer rounded-xl border border-border bg-white px-4.5 font-inter text-[15px] font-semibold text-muted hover:text-text"
          >
            Limpar
          </button>
          <button
            data-focus="1"
            onClick={filters.closeFiltersDrawer}
            className="h-12 flex-1 cursor-pointer rounded-xl border-none bg-primary font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
          >
            Ver resultados
          </button>
        </div>
      </aside>
    </div>
  );
}
