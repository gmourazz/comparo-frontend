"use client";

import type { Machine } from "@/types/machine";
import { quizQuestions } from "@/config/content/quiz-questions";
import { useQuiz } from "./QuizProvider";
import { useCompare } from "@/features/comparison/CompareProvider";
import { recommendMachines, reasonSentence } from "./recommend-machines";
import { formatCurrency, formatInstallments } from "@/lib/formatters";
import { BuyLink } from "@/components/ui/BuyLink";

export function QuizModal({ machines }: { machines: Machine[] }) {
  const quiz = useQuiz();
  const compare = useCompare();
  if (!quiz.isOpen) return null;

  const question = quizQuestions[Math.min(quiz.stepIndex, quizQuestions.length - 1)];
  const progressPct = Math.round(
    ((quiz.done ? quizQuestions.length : quiz.stepIndex) / quizQuestions.length) * 100,
  );
  const stepLabel = `Pergunta ${quiz.stepIndex + 1} de ${quizQuestions.length}`;

  const recommendations = quiz.done ? recommendMachines(quiz.answers, machines) : [];
  const topPick = recommendations[0];
  const altPicks = recommendations.slice(1, 3);

  function addTopPicksToCompare() {
    const slugs = recommendations.slice(0, compare.max).map((r) => r.machine.slug);
    slugs.forEach((slug) => {
      if (!compare.slugs.includes(slug)) compare.toggle(slug);
    });
    quiz.close();
    compare.open();
  }

  return (
    <div className="fixed inset-0 z-110 flex flex-col overflow-y-auto bg-white">
      <div className="sticky top-0 z-2 border-b border-border bg-white/94 backdrop-blur-md">
        <div className="mx-auto flex max-w-200 items-center gap-4 px-6 py-4">
          <button
            data-focus="1"
            onClick={quiz.back}
            className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-xl border border-border bg-white font-inter text-[15px] font-semibold text-muted hover:bg-bg"
          >
            ←
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <span className="font-manrope text-[15px] font-bold text-text">
                Encontre sua maquininha
              </span>
              <span className="font-inter text-[13px] font-medium text-muted">{stepLabel}</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F2F4F8]">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-250"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <button
            data-focus="1"
            onClick={quiz.close}
            className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-xl border border-border bg-white font-inter text-lg text-muted hover:bg-bg"
          >
            ×
          </button>
        </div>
      </div>

      {!quiz.done && (
        <div className="mx-auto w-full max-w-200 px-6 py-16">
          <span className="font-inter text-[13px] font-semibold tracking-[0.08em] text-primary-dark uppercase">
            {stepLabel}
          </span>
          <h2 className="mt-4 text-quiz-title font-manrope leading-tight font-bold tracking-[-0.02em]">
            {question.q}
          </h2>
          <p className="mt-3 font-inter text-base text-muted">{question.help}</p>
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {question.options.map((label, i) => {
              const active = quiz.answers[question.id] === label;
              return (
                <button
                  key={label}
                  data-focus="1"
                  onClick={() => quiz.answer(question.id, label)}
                  className={`flex min-h-18 items-center gap-3.5 rounded-2xl border-[1.5px] px-4.5 py-4 text-left font-inter text-base font-semibold transition-transform hover:-translate-y-0.5 hover:border-primary ${
                    active
                      ? "border-primary bg-primary-soft text-[#3f3699]"
                      : "border-border bg-white text-text"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] font-inter text-xs font-bold ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-bg text-muted-2"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <button
              data-focus="1"
              onClick={quiz.skip}
              className="h-11 cursor-pointer rounded-xl border-none bg-transparent px-4 font-inter text-[15px] font-semibold text-muted hover:text-text"
            >
              Pular esta pergunta
            </button>
            <span className="font-inter text-sm text-muted-2">Nenhuma resposta é obrigatória.</span>
          </div>
        </div>
      )}

      {quiz.done && topPick && (
        <div className="mx-auto w-full max-w-240 px-6 py-14 pb-20">
          <div className="text-center">
            <span className="inline-flex h-8 items-center gap-2 rounded-full bg-success-soft px-3.5 font-inter text-[13px] font-semibold text-[#1a7f54]">
              Resultado pronto
            </span>
            <h2 className="mt-4.5 font-manrope text-quiz-title leading-tight font-bold tracking-[-0.02em]">
              Encontramos boas opções para você
            </h2>
            <p className="mx-auto mt-3 max-w-130 font-inter text-base text-muted">
              Com base nas suas respostas, estas são as que mais combinam com o seu jeito de vender.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-center gap-7 rounded-3xl border-[1.5px] border-primary bg-white p-6 shadow-[0_12px_32px_rgba(109,93,251,0.14)]">
            <div className="min-w-0">
              <span className="inline-block h-7 rounded-full bg-primary px-3 font-inter text-xs leading-7 font-bold text-white">
                Melhor combinação
              </span>
              <h3 className="mt-3.5 font-manrope text-card-title leading-tight font-bold">
                {topPick.machine.name}
              </h3>
              <span className="mt-2 flex items-center gap-1.5 font-inter text-[13px] font-medium text-muted">
                {topPick.machine.brand}
              </span>
              <p className="mt-4 rounded-xl bg-primary-soft px-4 py-3.5 font-inter text-[15px] leading-relaxed text-[#3f3699]">
                {reasonSentence(topPick.reasons)}
              </p>
              <ul className="mt-4 grid list-none grid-cols-2 gap-2 p-0">
                {topPick.machine.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 font-inter text-[13px] font-medium text-text-strong">
                    <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-soft font-inter text-[10px] font-bold text-primary-dark">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-baseline gap-2.5">
                <span className="font-manrope text-[32px] font-bold">
                  {formatCurrency(topPick.machine.currentPriceCents)}
                </span>
                <span className="font-inter text-sm text-muted">
                  ou {formatInstallments(topPick.machine.installmentCount, topPick.machine.installmentValueCents)}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <BuyLink
                  machine={topPick.machine}
                  className="flex h-13 items-center rounded-xl bg-primary px-5.5 font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
                >
                  Quero essa maquininha
                </BuyLink>
                <a
                  href={`/maquininhas/${topPick.machine.slug}`}
                  className="flex h-13 items-center rounded-xl border border-border bg-white px-5.5 font-inter text-[15px] font-semibold text-text hover:bg-bg"
                >
                  Ver detalhes
                </a>
              </div>
            </div>
            <div className="flex aspect-square items-end justify-center rounded-2xl border border-dashed border-border-hover bg-bg p-4.5" />
          </div>

          {altPicks.length > 0 && (
            <>
              <h3 className="mt-9 font-manrope text-xl font-bold">Outras opções que fazem sentido</h3>
              <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
                {altPicks.map((r) => (
                  <div key={r.machine.slug} className="rounded-2xl border border-border bg-white p-5">
                    <span className="flex items-center gap-1.5 font-inter text-xs font-medium text-muted">
                      {r.machine.brand}
                    </span>
                    <h4 className="mt-2.5 font-manrope text-[19px] font-bold">{r.machine.name}</h4>
                    <p className="mt-2.5 font-inter text-sm leading-relaxed text-muted">
                      {reasonSentence(r.reasons)}
                    </p>
                    <span className="mt-4 block font-manrope text-2xl font-bold">
                      {formatCurrency(r.machine.currentPriceCents)}
                    </span>
                    <div className="mt-4.5 flex flex-col gap-2">
                      <BuyLink
                        machine={r.machine}
                        className="flex h-12 items-center justify-center rounded-xl bg-text font-inter text-[15px] font-semibold text-white hover:bg-[#2b3040]"
                      >
                        Quero essa
                      </BuyLink>
                      <a
                        href={`/maquininhas/${r.machine.slug}`}
                        className="flex h-11 items-center justify-center rounded-xl border border-border bg-white font-inter text-[15px] font-semibold text-text hover:bg-bg"
                      >
                        Ver detalhes
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              data-focus="1"
              onClick={addTopPicksToCompare}
              className="h-13 cursor-pointer rounded-xl border border-border bg-white px-6 font-inter text-base font-semibold text-text hover:border-border-hover hover:bg-bg"
            >
              Comparar as opções
            </button>
            <button
              data-focus="1"
              onClick={quiz.restart}
              className="h-13 cursor-pointer rounded-xl border-none bg-transparent px-6 font-inter text-base font-semibold text-muted hover:text-text"
            >
              Refazer o quiz
            </button>
          </div>
          <p className="mx-auto mt-7 max-w-155 text-center font-inter text-[13px] text-muted-2">
            A recomendação usa apenas critérios objetivos das suas respostas (preço, recursos e
            forma de vender). Alguns links são de indicação.
          </p>
        </div>
      )}
    </div>
  );
}
