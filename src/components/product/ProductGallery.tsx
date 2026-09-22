import type { Machine } from "@/types/machine";

export function ProductGallery({ machine }: { machine: Machine }) {
  const images = machine.images?.length ? machine.images : machine.image ? [machine.image] : [];
  const main = images[0];

  return (
    <div className="rounded-3xl border border-border bg-white p-6">
      {main ? (
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[20px] border border-border-hover bg-bg p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={main} alt={machine.name} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className="flex aspect-square items-end justify-center rounded-[20px] border border-dashed border-border-hover bg-bg p-5 bg-[repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_12px,transparent_12px_24px)]">
          <span className="text-center font-mono text-[11px] leading-relaxed text-muted-2 tracking-[0.04em]">
            [ IMAGEM OFICIAL — 1200×1200 ]
            <br />
            {machine.name}
          </span>
        </div>
      )}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-bg p-1.5 ${
                i === 0 ? "border-[1.5px] border-primary" : "border-border-hover"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${machine.name} ${i + 1}`} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
