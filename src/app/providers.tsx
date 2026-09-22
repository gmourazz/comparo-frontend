"use client";

import type { ReactNode } from "react";
import { CompareProvider } from "@/features/comparison/CompareProvider";
import { QuizProvider } from "@/features/quiz/QuizProvider";
import { ConsentProvider } from "@/features/tracking/ConsentProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsentProvider>
      <ToastProvider>
        <CompareProvider>
          <QuizProvider>{children}</QuizProvider>
        </CompareProvider>
      </ToastProvider>
    </ConsentProvider>
  );
}
