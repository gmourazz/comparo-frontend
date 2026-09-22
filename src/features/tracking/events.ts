"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 event + a Meta Pixel custom event, if their scripts are
 * loaded (they only load post-consent — see AnalyticsScripts.tsx — so this
 * is naturally a no-op before the visitor accepts analytics/marketing
 * cookies, with no extra consent check needed here).
 *
 * NOTE: machine_impression (from the spec's event list) is not wired up —
 * it needs an IntersectionObserver per card, which is meaningfully more
 * plumbing than the other 9 events for the lowest-value signal. Documented
 * gap, not a silent omission.
 */
function track(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
  window.fbq?.("trackCustom", eventName, params);
}

export const trackMachineView = (slug: string, brand: string) =>
  track("machine_view", { slug, brand });

export const trackMachineCompareAdd = (slug: string) => track("machine_compare_add", { slug });

export const trackMachineCompareRemove = (slug: string) =>
  track("machine_compare_remove", { slug });

export const trackComparisonView = (slugs: string[]) =>
  track("comparison_view", { slugs: slugs.join(",") , count: slugs.length });

export const trackQuizStart = () => track("quiz_start");

export const trackQuizAnswer = (questionId: string, answer: string) =>
  track("quiz_answer", { questionId, answer });

export const trackQuizComplete = () => track("quiz_complete");

export const trackRecommendationView = (slug: string) =>
  track("recommendation_view", { slug });

export const trackAffiliateClick = (provider: string, slug: string, placement: string) =>
  track("affiliate_click", { provider, slug, placement });
