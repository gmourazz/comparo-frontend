import { QuizTriggerButton } from "@/features/quiz/QuizTriggerButton";
import { CompareTriggerButton } from "@/features/comparison/CompareTriggerButton";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-20 pb-20">
      <div className="rounded-3xl bg-primary-soft p-14 text-center">
        <h2 className="m-0 text-cta-title font-manrope leading-[1.15] font-bold tracking-[-0.02em] text-text">
          Ainda em dúvida?
        </h2>
        <p className="mx-auto mt-4 max-w-130 font-inter text-[17px] leading-relaxed text-[#5b5570] text-pretty">
          Responda algumas perguntas e encontre opções compatíveis com o seu negócio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <QuizTriggerButton className="h-13 cursor-pointer rounded-xl border-none bg-primary px-6 font-inter text-base font-semibold text-white hover:bg-primary-dark">
            Descobrir minha maquininha
          </QuizTriggerButton>
          <CompareTriggerButton className="h-13 cursor-pointer rounded-xl border border-[#D9D5F5] bg-white px-6 font-inter text-base font-semibold text-text hover:bg-bg">
            Comparar modelos
          </CompareTriggerButton>
        </div>
      </div>
    </section>
  );
}
