"use client";

import type { ReactNode } from "react";
import { useQuiz } from "./QuizProvider";

export function QuizTriggerButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const quiz = useQuiz();
  return (
    <button data-focus="1" onClick={quiz.start} className={className}>
      {children}
    </button>
  );
}
