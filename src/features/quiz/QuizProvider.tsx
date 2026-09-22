"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { quizQuestions } from "@/config/content/quiz-questions";
import type { QuizAnswers } from "@/types/quiz";

interface QuizContextValue {
  isOpen: boolean;
  stepIndex: number;
  answers: QuizAnswers;
  done: boolean;
  totalSteps: number;
  start: () => void;
  close: () => void;
  answer: (questionId: keyof QuizAnswers, value: string) => void;
  skip: () => void;
  back: () => void;
  restart: () => void;
  finish: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  const totalSteps = quizQuestions.length;

  const start = useCallback(() => {
    setIsOpen(true);
    setStepIndex(0);
    setAnswers({});
    setDone(false);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const restart = useCallback(() => {
    setStepIndex(0);
    setAnswers({});
    setDone(false);
  }, []);
  const finish = useCallback(() => setDone(true), []);

  const advance = useCallback(() => {
    setStepIndex((i) => {
      const last = i >= totalSteps - 1;
      if (last) {
        setDone(true);
        return i;
      }
      return i + 1;
    });
  }, [totalSteps]);

  const answer = useCallback(
    (questionId: keyof QuizAnswers, value: string) => {
      setAnswers((current) => ({ ...current, [questionId]: value }) as QuizAnswers);
      advance();
    },
    [advance],
  );

  const skip = useCallback(() => advance(), [advance]);

  const back = useCallback(() => {
    if (done) {
      setDone(false);
    } else if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    } else {
      setIsOpen(false);
    }
  }, [done, stepIndex]);

  const value = useMemo<QuizContextValue>(
    () => ({ isOpen, stepIndex, answers, done, totalSteps, start, close, answer, skip, back, restart, finish }),
    [isOpen, stepIndex, answers, done, totalSteps, start, close, answer, skip, back, restart, finish],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within a QuizProvider");
  return ctx;
}
