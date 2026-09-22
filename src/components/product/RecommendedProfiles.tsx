import type { Machine } from "@/types/machine";
import { buildIdealForText } from "@/features/catalog/machine-copy";

export function RecommendedProfiles({ machine }: { machine: Machine }) {
  const ideal = buildIdealForText(machine);

  return (
    <div className="rounded-[20px] border border-border bg-white p-7">
      <h2 className="m-0 font-manrope text-[22px] font-bold">Perfil recomendado</h2>
      <p className="mt-3 font-inter text-[15px] leading-relaxed text-muted text-pretty">
        {ideal ?? "Perfil recomendado não informado para este modelo."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {machine.recommendedProfiles.map((p) => (
          <span
            key={p}
            className="flex h-7.5 items-center rounded-full border border-border bg-[#F2F4F8] px-3 font-inter text-[13px] font-medium text-text-strong"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
