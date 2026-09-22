import type { Machine } from "@/types/machine";

export function ProductGallery({ machine }: { machine: Machine }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-6">
      <div className="flex aspect-square items-end justify-center rounded-[20px] border border-dashed border-border-hover bg-bg p-5 [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_12px,transparent_12px_24px)]">
        <span className="text-center font-mono text-[11px] leading-relaxed text-muted-2 tracking-[0.04em]">
          [ IMAGEM OFICIAL — 1200×1200 ]
          <br />
          {machine.name}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        <div className="aspect-square rounded-xl border-[1.5px] border-primary bg-bg [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.08)_0_8px,transparent_8px_16px)]" />
        <div className="aspect-square rounded-xl border border-dashed border-border-hover bg-bg" />
        <div className="aspect-square rounded-xl border border-dashed border-border-hover bg-bg" />
        <div className="aspect-square rounded-xl border border-dashed border-border-hover bg-bg" />
      </div>
    </div>
  );
}
