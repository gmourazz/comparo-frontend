import type { Machine } from "@/types/machine";
import { buildProsAndCons } from "@/features/catalog/machine-copy";

export function ProsConsSection({ machine, catalog }: { machine: Machine; catalog: Machine[] }) {
  const { pros, notIdeal } = buildProsAndCons(machine, catalog);

  return (
    <div className="rounded-[20px] border border-border bg-white p-7">
      <h2 className="m-0 font-manrope text-[22px] font-bold">Pontos de atenção</h2>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        <div>
          <span className="font-inter text-xs font-semibold tracking-wider text-success uppercase">
            Características interessantes
          </span>
          <ul className="mt-3 flex list-none flex-col gap-2.5 p-0">
            {pros.length === 0 && <li className="font-inter text-sm text-muted-2">Não informado.</li>}
            {pros.map((p) => (
              <li key={p} className="flex gap-2 font-inter text-sm text-text-strong">
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-success-soft font-inter text-[10px] font-bold text-success">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-inter text-xs font-semibold tracking-wider text-warning-text uppercase">
            Pode não ser ideal se…
          </span>
          <ul className="mt-3 flex list-none flex-col gap-2.5 p-0">
            {notIdeal.length === 0 && <li className="font-inter text-sm text-muted-2">Não informado.</li>}
            {notIdeal.map((n) => (
              <li key={n} className="flex gap-2 font-inter text-sm text-text-strong">
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-warning-soft font-inter text-[10px] font-bold text-warning-text">
                  ·
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
