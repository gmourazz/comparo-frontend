"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useCompare } from "@/features/comparison/CompareProvider";
import { useQuiz } from "@/features/quiz/QuizProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const compare = useCompare();
  const quiz = useQuiz();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-60 border-b border-[#2b3040] bg-footer/95 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-header-scrolled" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex min-h-18 max-w-[1280px] flex-wrap items-center gap-4 px-6 py-3">
        <Link href="/" className="flex flex-none items-center gap-2.5 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary font-manrope text-[15px] font-extrabold text-white">
            C
          </span>
          <span className="font-manrope text-xl font-extrabold tracking-[-0.02em] text-white">
            comparô
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 flex-wrap items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 font-inter text-[15px] font-medium text-muted-2 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2.5 md:flex-none">
          <button
            data-focus="1"
            onClick={compare.open}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#2b3040] bg-transparent px-4 font-inter text-[15px] font-semibold text-white transition-colors hover:border-[#3a4152] hover:bg-[#20242e]"
          >
            <span className="hidden sm:inline">Comparar</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-soft px-1.5 font-inter text-xs font-bold text-primary-dark">
              {compare.slugs.length}
            </span>
          </button>
          <button
            data-focus="1"
            onClick={quiz.start}
            className="h-11 cursor-pointer rounded-xl border border-primary bg-primary px-4.5 font-inter text-[15px] font-semibold whitespace-nowrap text-white shadow-card transition-[background-color,transform] hover:-translate-y-0.5 hover:border-primary-dark hover:bg-primary-dark"
          >
            <span className="hidden sm:inline">Descobrir minha maquininha</span>
            <span className="sm:hidden">Descobrir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
