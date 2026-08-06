/**
 * Ci — cable surrounded by thermal insulation.
 * BS 7671:2018+A4:2026, Regulation 523.9 and Appendix 4, Section 2.6.
 * Transcribed from the printed standard and verified 2026-08-06.
 *
 * ⚠️ WHAT THIS FILE USED TO SAY, AND WHY IT WAS WRONG
 * It was headed "A3:2024" and cited "Table 52.2". Table 52.2 is Maximum
 * operating temperatures for types of cable insulation — it has nothing to do
 * with derating. The real source is Appendix 4, Section 2.6.
 *
 * It also carried three scenarios — touchingOneSide, totallyEnclosed and
 * betweenJoists — each with its own per-length multiplier. BS 7671 publishes
 * ONE Ci table, for a cable totally surrounded by insulation. The other two
 * cases are not handled by a multiplier at all: a cable in contact with a
 * thermally conductive surface on one side is covered by the TABULATED
 * capacities for Installation Methods 100 to 103 (Reg 523.9, second paragraph).
 * Multiplying a Method C rating by an invented factor double-counts.
 *
 * None of the old numbers matched the printed table either — totallyEnclosed
 * ran 0.81 / 0.68 / 0.55 / 0.5 against the printed 0.88 / 0.78 / 0.63 / 0.51,
 * and it was keyed by the wrong lengths.
 *
 * Nothing imported this file, so no caller changes were needed.
 */

/**
 * Appendix 4, Section 2.6. Applicable to conductor sizes up to 10 mm² in
 * thermal insulation having a thermal conductivity greater than 0.04 W/m·K.
 * Keyed by the length the cable is totally surrounded for, in mm.
 */
export const CI_TOTALLY_SURROUNDED: Record<number, number> = {
  50: 0.88,
  100: 0.78,
  200: 0.63,
  400: 0.51,
  500: 0.5,
};

/**
 * Ci for a cable totally surrounded by thermal insulation over `lengthMm`.
 *
 * Reg 523.9 sets the floor: for a length of 0.5 m or more the capacity is taken
 * as 0.5 times the Reference Method C rating, in the absence of more precise
 * information. Between the printed lengths, step DOWN to the next tabulated
 * factor rather than interpolating — the standard prints discrete values and
 * rounding toward the more onerous figure is the only safe direction.
 */
export function getThermalInsulationFactor(lengthMm: number): number {
  if (lengthMm <= 0) return 1.0;
  if (lengthMm >= 500) return 0.5;
  const lengths = Object.keys(CI_TOTALLY_SURROUNDED)
    .map(Number)
    .sort((a, b) => a - b);
  const at = lengths.find((l) => l >= lengthMm);
  return at === undefined ? 0.5 : CI_TOTALLY_SURROUNDED[at];
}

/**
 * Installation Methods 100 to 103 — cables in or above thermally insulated
 * surfaces. These are REFERENCE METHODS with their own tabulated Iz columns in
 * Table 4D5, NOT correction factors, so no multiplier is exported for them.
 *
 * ✅ CORRECTION (2026-08-06, later the same day): an earlier version of this
 * comment said those columns were unavailable. That was wrong, and it was my
 * error — I checked the RAG, found Method C only, and did not check the repo.
 * `appendix4CurrentCapacity.ts` carries method-100/101/102/103 for twin-earth,
 * transcribed page-by-page from the printed standard for ELE-1256, and
 * `cableCapacities.getThermalInsulationCapacity()` already serves them.
 * `useCableSizing` selects them correctly. So the right answer for Methods 100
 * to 103 IS available — via the column, never via a multiplier.
 */
export const METHODS_100_TO_103 = {
  100: 'Above a plasterboard ceiling covered by thermal insulation not exceeding 100 mm',
  101: 'Above a plasterboard ceiling covered by thermal insulation exceeding 100 mm',
  102: 'In a stud wall with thermal insulation, cable touching the inner wall surface',
  103: 'In a stud wall with thermal insulation, cable not touching the inner wall surface',
} as const;
