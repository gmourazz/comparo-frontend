import { QuizTriggerButton } from "@/features/quiz/QuizTriggerButton";

export function QuizPromoBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary-dark p-14">
        <div
          className="pointer-events-none absolute inset-y-0 left-[60%] h-105 bottom-[-60%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(109,93,251,0.9) 0%, rgba(81,69,205,0) 70%)",
          }}
        />
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10">
          <div className="relative min-w-0">
            <h2 className="m-0 text-cta-title font-manrope leading-[1.15] font-bold tracking-[-0.02em] text-white">
              Não sabe qual escolher?
            </h2>
            <p className="mt-4 max-w-115 font-inter text-[17px] leading-relaxed text-[#E0DDFA] text-pretty">
              Responda algumas perguntas e encontre modelos que combinam com seu negócio.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <QuizTriggerButton className="h-13 cursor-pointer rounded-xl border-none bg-white px-6 font-inter text-base font-bold text-primary-dark hover:bg-primary-soft">
                Descobrir minha maquininha
              </QuizTriggerButton>
              <span className="font-inter text-sm font-medium text-[#C7C1F5]">
                Leva menos de 1 minuto
              </span>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_32px_rgba(16,24,40,0.18)]">
            <div className="flex items-center justify-between font-inter text-[13px] font-semibold text-muted">
              <span>Pergunta 2 de 5</span>
              <span className="text-muted-2">40%</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F2F4F8]">
              <div className="h-full w-2/5 rounded-full bg-primary" />
            </div>
            <h3 className="mt-5 font-manrope text-xl font-bold">
              Você precisa imprimir comprovante?
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex h-13 items-center rounded-xl border-[1.5px] border-primary bg-primary-soft px-4 font-inter text-[15px] font-semibold text-primary-dark">
                Sim
              </div>
              <div className="flex h-13 items-center rounded-xl border border-border px-4 font-inter text-[15px] font-medium text-text-strong">
                Não
              </div>
              <div className="flex h-13 items-center rounded-xl border border-border px-4 font-inter text-[15px] font-medium text-text-strong">
                Tanto faz
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
