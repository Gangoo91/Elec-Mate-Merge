import type { TestResult } from '@/types/testResult';

export interface RegulationWarning {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  regulation: string;
  suggestion?: string;
  /**
   * The cells this warning is about, so the grid can mark them.
   *
   * A warning the electrician cannot locate is a warning they ignore: on a
   * 34-column schedule, "protective device rating too high for the cable" is
   * true of two cells and neither of them says so. Naming the fields lets the
   * cell carry the flag, and lets a tap on it open the finding.
   *
   * Optional, and deliberately a list — most findings are a relationship
   * between values (a rating against a cable size), not a property of one.
   * Omitting it costs nothing: the warning still appears in the Validate sheet,
   * it simply is not anchored to a cell.
   */
  fields?: (keyof TestResult)[];
}

export interface RegulationCheckResult {
  isCompliant: boolean;
  warnings: RegulationWarning[];
}
