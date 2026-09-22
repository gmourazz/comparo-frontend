import type { Machine } from "@/types/machine";
import type { QuizAnswers } from "@/types/quiz";
import { featureCount } from "@/features/catalog/filter-machines";

export interface ScoreProfile {
  /** 0-5, higher = cheaper relative to the rest of the active catalog. */
  cheap: number;
  /** 0-5, higher = more of the 6 tracked features (nfc/wifi/chip/printer/touch/bluetooth). */
  features: number;
  /** 0-5, higher = works independently of a phone. */
  noPhone: number;
  /** 0-5, higher = has a printer. */
  printer: number;
}

const MAX_TRACKED_FEATURES = 6;

/**
 * Computes the quiz scoring inputs from real catalog data instead of a
 * hand-tuned per-product literal — so the recommendation stays correct as
 * prices/specs change and never favors a product just because someone typed
 * a higher number for it (spec: "O algoritmo NÃO deve... favorecer produto
 * simplesmente porque paga comissão maior").
 */
export function computeMachineScoreProfile(machine: Machine, activeCatalog: Machine[]): ScoreProfile {
  const knownPrices = activeCatalog
    .map((m) => m.currentPriceCents)
    .filter((v): v is number => v != null)
    .sort((a, b) => a - b);

  let cheap = 2.5;
  if (machine.currentPriceCents != null && knownPrices.length > 0) {
    if (knownPrices.length === 1) {
      cheap = 5;
    } else {
      const rank = knownPrices.indexOf(machine.currentPriceCents);
      cheap = 5 * (1 - rank / (knownPrices.length - 1));
    }
  }

  const features = (featureCount(machine) / MAX_TRACKED_FEATURES) * 5;
  const noPhone = machine.requiresPhone === false ? 5 : machine.requiresPhone === true ? 0 : 2;
  const printer = machine.hasPrinter === true ? 5 : machine.hasPrinter === false ? 0 : 2;

  return { cheap, features, noPhone, printer };
}

const PLACE_TO_PROFILE: Record<NonNullable<QuizAnswers["place"]>, string> = {
  "Loja física": "Lojas",
  Delivery: "Delivery",
  "Rua / eventos": "Eventos e vendas externas",
  "Atendimento profissional": "Profissionais liberais",
  "Online e presencial": "Lojas",
};

export interface MachineRecommendation {
  machine: Machine;
  score: number;
  reasons: string[];
}

/**
 * Ranks the active catalog against the quiz answers. Every point added is
 * tied to an objective criterion and an explainable reason string — see
 * spec section 25 (no "essa é definitivamente a melhor", only stated facts).
 */
export function recommendMachines(answers: QuizAnswers, machines: Machine[]): MachineRecommendation[] {
  const scored = machines.map((machine) => {
    const profile = computeMachineScoreProfile(machine, machines);
    let score = 0;
    const reasons: string[] = [];

    if (answers.priority === "Economizar na compra") {
      score += profile.cheap * 3;
      if (profile.cheap >= 4) reasons.push("está entre as mais baratas do catálogo");
    }
    if (answers.priority === "Ter mais recursos") {
      score += profile.features * 3;
      if (profile.features >= 4) reasons.push("reúne os recursos mais completos");
    }
    if (answers.priority === "Equilibrar preço e recursos") {
      score += (profile.cheap + profile.features) * 1.6;
      if (profile.cheap >= 3 && profile.features >= 3) {
        reasons.push("equilibra preço de entrada e recursos");
      }
    }

    if (answers.printer === "Sim") {
      score += machine.hasPrinter ? 8 : -6;
      if (machine.hasPrinter) reasons.push("imprime o comprovante na hora");
    }
    if (answers.printer === "Não" && machine.hasPrinter === false) {
      score += 3;
      reasons.push("dispensa impressora e sai mais em conta");
    }

    if (answers.phone === "Sim") {
      score += machine.requiresPhone === false ? 8 : -7;
      if (machine.requiresPhone === false) reasons.push("funciona sem depender do celular");
    }

    if (answers.volume === "Até R$ 3 mil") {
      score += profile.cheap * 2;
    }
    if (answers.volume === "Mais de R$ 10 mil") {
      const creditCashBp = machine.fees?.creditCashBp;
      score += profile.features * 2 + (creditCashBp == null ? 0 : (500 - creditCashBp) / 100);
      reasons.push("taxas menores ajudam em volume alto");
    }
    if (answers.volume === "R$ 6 mil – R$ 10 mil") {
      score += profile.features * 1.2;
    }

    const seg = answers.place ? PLACE_TO_PROFILE[answers.place] : undefined;
    if (seg && machine.recommendedProfiles.includes(seg)) {
      score += 5;
      reasons.push(`é indicada para quem vende em ${(answers.place ?? "").toLowerCase()}`);
    }

    return { machine, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score);
}

/** Joins up to 2 reasons into the "Combina porque..." sentence shown in the design. */
export function reasonSentence(reasons: string[]): string {
  if (reasons.length === 0) return "Combina com o perfil geral das suas respostas.";
  return `Combina porque ${reasons.slice(0, 2).join(" e ")}.`;
}
