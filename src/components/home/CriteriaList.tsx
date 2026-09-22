import { criteriaData } from "@/config/content/criteria";

export function CriteriaList() {
  return (
    <section id="como-escolher" className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="rounded-3xl border border-border bg-white p-11">
        <div className="max-w-155">
          <span className="font-inter text-[13px] font-semibold tracking-[0.08em] text-primary-dark uppercase">
            Como escolher
          </span>
          <h2 className="mt-3.5 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
            O que comparar antes de escolher?
          </h2>
        </div>
        <div className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
          {criteriaData.map((c) => (
            <div key={c.n}>
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-[#F2F4F8] font-mono text-[13px] font-semibold text-muted">
                {c.n}
              </span>
              <h3 className="mt-4 font-manrope text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-muted text-pretty">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
