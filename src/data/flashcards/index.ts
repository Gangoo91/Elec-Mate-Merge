import type { FlashcardData } from "./types";
import { cableColours } from "./cableColours";
import { bs7671Regulations } from "./bs7671Regulations";
import { eicrCodes } from "./eicrCodes";
import { safeIsolation } from "./safeIsolation";
import { testInstruments } from "./testInstruments";
import { faultFinding } from "./faultFinding";
import { earthingAndBonding } from "./earthingAndBonding";
import { circuitProtection } from "./circuitProtection";
import { wiringSystems } from "./wiringSystems";
import { electricalScience } from "./electricalScience";
import { firstAndSecondFix } from "./firstAndSecondFix";
import { environmentalTech } from "./environmentalTech";

export type { FlashcardData } from "./types";

/** Card data keyed by set ID — used by FlashcardStudySession */
export const flashcardSets: Record<string, FlashcardData[]> = {
  "cable-colors": cableColours,
  "bs7671-regulations": bs7671Regulations,
  "eicr-codes": eicrCodes,
  "safe-isolation": safeIsolation,
  "test-instruments": testInstruments,
  "fault-finding": faultFinding,
  "earthing-bonding": earthingAndBonding,
  "circuit-protection": circuitProtection,
  "wiring-systems": wiringSystems,
  "electrical-science": electricalScience,
  "first-second-fix": firstAndSecondFix,
  "environmental-tech": environmentalTech,
};

/** Lightweight metadata for stats hooks that need to iterate over sets */
export const flashcardSetMeta = Object.entries(flashcardSets).map(
  ([id, cards]) => ({
    id,
    title: cards[0]?.category ?? id,
    count: cards.length,
  }),
);
