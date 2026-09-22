"use client";

import type { Machine } from "@/types/machine";
import { useCompare } from "./CompareProvider";
import { useQuiz } from "@/features/quiz/QuizProvider";

export function CompareBar({ machines }: { machines: Machine[] }) {
  const compare = useCompare();
  const quiz = useQuiz();

  const items = compare.slugs
    .map((slug) => machines.find((m) => m.slug === slug))
    .filter((m): m is Machine => !!m);

  const visible = items.length > 0 && !compare.isOpen && !quiz.isOpen;
  if (!visible) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-70 border-t border-border bg-white/96 shadow-[0_-8px_32px_rgba(16,24,40,0.10)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-4 px-6 py-3.5">
        <span className="flex-none font-inter text-sm font-semibold text-text">
          {items.length} de {compare.max} maquininhas selecionadas
        </span>
        <div className="flex min-w-0 flex-1 flex-wrap gap-2.5">
          {items.map((m) => (
            <span
              key={m.slug}
              className="flex h-12 items-center gap-2.5 rounded-xl border border-border bg-bg py-0 pr-2.5 pl-2"
            >
              <span className="h-8 w-8 rounded-lg border border-dashed border-border-hover bg-white" />
              <span className="font-inter text-[13px] font-semibold text-text">{m.name}</span>
              <button
                data-focus="1"
                onClick={() => compare.remove(m.slug)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-[#E9ECF2] font-inter text-[13px] font-bold text-muted hover:bg-border-hover hover:text-text"
              >
                ×
              </button>
            </span>
          ))}
          {items.length < compare.max && (
            <a
              href="#catalogo"
              className="flex h-12 items-center rounded-xl border border-dashed border-border-hover px-4 font-inter text-[13px] font-medium text-muted"
            >
              + adicionar
            </a>
          )}
        </div>
        <div className="flex flex-none gap-2.5">
          <button
            data-focus="1"
            onClick={compare.clear}
            className="h-12 cursor-pointer rounded-xl border border-border bg-white px-4 font-inter text-sm font-semibold text-muted hover:border-border-hover hover:text-text"
          >
            Limpar
          </button>
          <button
            data-focus="1"
            onClick={compare.open}
            className="h-12 cursor-pointer rounded-xl border-none bg-primary px-5 font-inter text-[15px] font-semibold text-white hover:bg-primary-dark"
          >
            Comparar agora
          </button>
        </div>
      </div>
    </div>
  );
}
