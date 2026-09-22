import { Container } from "@/components/ui/Container";
import { QuizTriggerButton } from "@/features/quiz/QuizTriggerButton";

const checks = [
  "Compare gratuitamente",
  "Veja taxas e recursos",
  "Compra no site oficial",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div
        className="pointer-events-none absolute inset-x-[-10%] top-[-20%] h-[560px]"
        style={{
          background:
            "radial-gradient(48% 60% at 72% 30%, #EEECFF 0%, rgba(238,236,255,0) 72%)",
        }}
      />
      <Container className="relative grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-16 py-24">
        <div className="min-w-0">
          <span className="inline-flex h-8 items-center gap-2 rounded-full bg-primary-soft px-3 font-inter text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Compare antes de escolher
          </span>
          <h1 className="mt-5 text-hero font-manrope leading-[1.1] font-bold tracking-[-0.025em] text-text text-balance">
            Encontre a maquininha ideal para o seu negócio
          </h1>
          <p className="mt-5 max-w-140 font-inter text-lg leading-relaxed text-muted text-pretty">
            Compare modelos, preços, taxas e recursos e descubra qual opção faz mais sentido para
            o seu jeito de vender.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuizTriggerButton className="h-13 cursor-pointer rounded-xl border border-primary bg-primary px-6 font-inter text-base font-semibold text-white shadow-[0_4px_12px_rgba(109,93,251,0.24)] hover:border-primary-dark hover:bg-primary-dark">
              Descobrir a ideal para mim
            </QuizTriggerButton>
            <a
              href="#catalogo"
              className="flex h-13 items-center rounded-xl border border-border bg-white px-6 font-inter text-base font-semibold text-text hover:border-border-hover hover:bg-bg"
            >
              Ver maquininhas
            </a>
          </div>
          <ul className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
            {checks.map((label) => (
              <li key={label} className="flex items-center gap-2 font-inter text-sm font-medium text-muted">
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-success-soft font-inter text-[11px] font-bold text-success">
                  ✓
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-w-0">
          <div className="relative rounded-3xl border border-border bg-bg p-6 shadow-dropdown">
            <div className="grid grid-cols-[1.25fr_1fr] grid-rows-2 gap-4">
              <div className="row-span-2 flex aspect-3/4 items-end justify-center rounded-2xl border border-dashed border-border-hover bg-white p-4 [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_10px,transparent_10px_20px)]">
                <span className="text-center font-mono text-[11px] leading-relaxed text-muted-2 tracking-[0.04em]">
                  [ IMAGEM OFICIAL ]
                  <br />
                  maquininha smart
                </span>
              </div>
              <div className="flex aspect-square items-end justify-center rounded-2xl border border-dashed border-border-hover bg-white p-3 [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_10px,transparent_10px_20px)]">
                <span className="text-center font-mono text-[10px] leading-relaxed text-muted-2 tracking-[0.04em]">
                  [ IMAGEM ]
                  <br />
                  modelo mini
                </span>
              </div>
              <div className="flex aspect-square items-end justify-center rounded-2xl border border-dashed border-border-hover bg-white p-3 [background-image:repeating-linear-gradient(135deg,rgba(109,93,251,0.06)_0_10px,transparent_10px_20px)]">
                <span className="text-center font-mono text-[10px] leading-relaxed text-muted-2 tracking-[0.04em]">
                  [ IMAGEM ]
                  <br />
                  com impressora
                </span>
              </div>
            </div>
            <FloatingBadge className="top-[-14px] left-[-16px]" dot="bg-success" label="Pix" />
            <FloatingBadge className="top-[38%] right-[-18px]" dot="bg-primary" label="Com NFC" />
            <FloatingBadge className="bottom-[-14px] left-[22%]" dot="bg-warning" label="Imprime comprovante" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FloatingBadge({ className, dot, label }: { className: string; dot: string; label: string }) {
  return (
    <div
      className={`absolute flex h-9 items-center gap-2 rounded-full border border-border bg-white px-3.5 font-inter text-[13px] font-semibold text-text shadow-dropdown ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
