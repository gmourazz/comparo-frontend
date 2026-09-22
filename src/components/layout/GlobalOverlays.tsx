"use client";

import type { Machine } from "@/types/machine";
import { CompareBar } from "@/features/comparison/CompareBar";
import { CompareModal } from "@/features/comparison/CompareModal";
import { QuizModal } from "@/features/quiz/QuizModal";
import { Toast } from "@/components/ui/Toast";
import { CookieBanner } from "@/components/layout/CookieBanner";

/**
 * Cross-page chrome that isn't part of the document flow: the sticky compare
 * bar, the compare/quiz modals, the toast and the cookie banner. Mounted
 * once in the (site) layout so header/footer CTAs on any public page can
 * open them via context, regardless of which page happens to be rendering.
 */
export function GlobalOverlays({ machines }: { machines: Machine[] }) {
  return (
    <>
      <CompareBar machines={machines} />
      <CompareModal machines={machines} />
      <QuizModal machines={machines} />
      <Toast />
      <CookieBanner />
    </>
  );
}
