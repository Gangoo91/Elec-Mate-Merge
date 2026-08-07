/**
 * Which cells carry a compliance warning, and how serious it is.
 *
 * The checks already ran — `checkRegulationCompliance` has been returning
 * findings for a long time. The problem was never detection, it was that a
 * finding lived in a panel while the number it was about lived in a cell
 * thirty columns wide, and nothing connected the two. An electrician had to
 * read "protective device rating too high for cable size", then go and work
 * out which of thirty cells that meant.
 *
 * Warnings now name their fields (`RegulationWarning.fields`), so the grid can
 * mark the cell itself. This module is the lookup between the two: give it a
 * circuit, get back the fields to flag.
 *
 * Deliberately does NOT re-run the rules per cell. A 23-way board has ~780
 * cells; validating each one independently would run the whole engine 780
 * times per render. The row validates once and the cells read the result.
 */
import type { TestResult } from '@/types/testResult';
import type { RegulationWarning } from '@/utils/regulationChecker/types';

export type CellSeverity = 'critical' | 'warning';

export interface CellWarning {
  severity: CellSeverity;
  /** Every finding that touches this cell — a cell can be named by more than one. */
  warnings: RegulationWarning[];
}

/** Severity order, so a cell named by both a critical and a warning shows the critical. */
const RANK: Record<CellSeverity, number> = { warning: 1, critical: 2 };

/**
 * Map of field -> the warnings naming it.
 *
 * `info` findings are excluded on purpose. They are worth reading in the
 * Validate sheet but are not defects, and tinting a cell for one would teach
 * the electrician that a marked cell means nothing.
 */
export const buildCellWarnings = (
  warnings: RegulationWarning[]
): Partial<Record<keyof TestResult, CellWarning>> => {
  const map: Partial<Record<keyof TestResult, CellWarning>> = {};

  for (const warning of warnings) {
    if (warning.severity === 'info') continue;
    const severity: CellSeverity = warning.severity === 'critical' ? 'critical' : 'warning';

    for (const field of warning.fields ?? []) {
      const existing = map[field];
      if (!existing) {
        map[field] = { severity, warnings: [warning] };
        continue;
      }
      existing.warnings.push(warning);
      if (RANK[severity] > RANK[existing.severity]) existing.severity = severity;
    }
  }

  return map;
};

/**
 * The tooltip for a flagged cell.
 *
 * The title alone, or a count when several findings name the same cell — the
 * full wording belongs in the Validate sheet, which has room for the numbers
 * and the regulation. This is the label that gets you to open it.
 */
export const describeCellWarning = (cell: CellWarning): string =>
  cell.warnings.length === 1
    ? cell.warnings[0].title
    : `${cell.warnings.length} issues — ${cell.warnings[0].title}`;
