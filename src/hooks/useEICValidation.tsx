import { useMemo } from 'react';
import { normalizeEICDefectCode } from '@/hooks/useEICObservations';

export type EICTabId = 'details' | 'inspection' | 'testing' | 'declarations' | 'certificate';

export interface ValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  regulation?: string;
  tab?: EICTabId;
}

const TAB_LABEL: Record<EICTabId, string> = {
  details: 'Installation Details',
  inspection: 'Schedule of Inspections',
  testing: 'Schedule of Testing',
  declarations: 'Declarations',
  certificate: 'Certificate',
};
export { TAB_LABEL };

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationRule[];
  warnings: ValidationRule[];
  completionPercentage: number;
  /** Per-step completeness derived from the same checks as errors/warnings —
   * the single source of truth for the shell's tab ticks (MW parity). */
  tabComplete: Record<EICTabId, boolean>;
}

/** Every field the header progress ring tracks. completionPercentage divides by
 * this list's length (mirrors useMinorWorksValidation's REQUIRED_FIELDS), so a
 * fully complete EIC genuinely reads 100% — the ring, the missing-items sheet
 * and the tab ticks all derive from this one list. */
const REQUIRED_FIELDS: {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  regulation?: string;
  tab: EICTabId;
}[] = [
  { field: 'clientName', message: 'Client name', severity: 'error', tab: 'details' },
  { field: 'installationAddress', message: 'Installation address', severity: 'error', tab: 'details' },
  { field: 'installationDate', message: 'Installation date', severity: 'error', tab: 'details' },
  { field: 'installationType', message: 'Installation type', severity: 'warning', tab: 'details' },
  {
    field: 'supplyVoltage',
    message: 'Supply voltage',
    severity: 'error',
    regulation: 'Chapter 31',
    tab: 'details',
  },
  {
    field: 'earthingArrangement',
    message: 'Earthing arrangement',
    severity: 'error',
    regulation: 'Chapter 54',
    tab: 'details',
  },
  {
    field: 'mainProtectiveDevice',
    message: 'Main protective device',
    severity: 'error',
    regulation: 'Chapter 43',
    tab: 'details',
  },
  { field: 'designerName', message: 'Designer name', severity: 'error', regulation: 'Part 6', tab: 'declarations' },
  {
    field: 'designerSignature',
    message: 'Designer signature',
    severity: 'error',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'constructorName',
    message: 'Constructor name',
    severity: 'error',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'constructorSignature',
    message: 'Constructor signature',
    severity: 'error',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'inspectorName',
    message: 'Inspector name',
    severity: 'error',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'inspectorSignature',
    message: 'Inspector signature',
    severity: 'error',
    regulation: 'Part 6',
    tab: 'declarations',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEICValidation = (formData: any): ValidationResult => {
  return useMemo(() => {
    const errors: ValidationRule[] = [];
    const warnings: ValidationRule[] = [];
    let completedFields = 0;

    for (const rule of REQUIRED_FIELDS) {
      const value = formData[rule.field];
      if (value && String(value).trim() !== '') {
        completedFields++;
      } else {
        const item: ValidationRule = {
          field: rule.field,
          message: rule.message,
          severity: rule.severity,
          regulation: rule.regulation,
          tab: rule.tab,
        };
        if (rule.severity === 'error') errors.push(item);
        else warnings.push(item);
      }
    }

    /*
     * Uncorrected defects block issue outright — this is not a warning.
     *
     * BS 7671 644.1.1 (new installation): "any defect or omission revealed
     * during the inspection and testing shall be corrected before the
     * Certificate is issued."
     * 644.1.2 (addition or alteration): the same for any defect or omission
     * "that will affect the safety of the addition or alteration".
     *
     * This is the mirror image of the EICR's C1/C2 gate, and it resolves the
     * opposite way. An EICR reports condition, so a C2 forces the outcome to
     * Unsatisfactory. An EIC *declares compliance*, so there is no unsatisfactory
     * EIC to fall back on — the certificate simply must not be issued yet. That
     * is why this is an error and why the EIC has no satisfactory/unsatisfactory
     * toggle: adding one would let somebody sign a declaration that their own
     * work does not comply.
     *
     * `rectified` is the release valve, and it is the regulation's own wording:
     * put right before issue, and the certificate may be issued. Defects in the
     * *existing* installation are a separate matter — they belong in Section I,
     * "Comments on existing installation", and never block.
     */
    const uncorrectedDefects = Array.isArray(formData.observations)
      ? formData.observations.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (obs: any) => normalizeEICDefectCode(obs?.defectCode) === 'unsatisfactory' && !obs?.rectified
        ).length
      : 0;

    if (uncorrectedDefects > 0) {
      errors.push({
        field: 'observations',
        message: `${uncorrectedDefects} unsatisfactory item${uncorrectedDefects === 1 ? '' : 's'} must be corrected before issue`,
        severity: 'error',
        regulation: '644.1.1 / 644.1.2',
        tab: 'inspection',
      });
    }

    // Technical Validation Warnings
    const rawVoltage = formData.supplyVoltage?.replace(/V$/i, '') || '';
    if (rawVoltage && rawVoltage !== '230' && rawVoltage !== '400') {
      warnings.push({
        field: 'supplyVoltage',
        message: 'Non-standard supply voltage — verify',
        severity: 'warning',
        regulation: 'Section 312',
        tab: 'details',
      });
    }

    // Fresh certs have no scheduleOfTests at all — warn on undefined AND empty,
    // matching the hasInspections handling below.
    const hasTestResults =
      Array.isArray(formData.scheduleOfTests) && formData.scheduleOfTests.length > 0;
    if (!hasTestResults) {
      warnings.push({
        field: 'scheduleOfTests',
        message: 'No test results recorded',
        severity: 'warning',
        regulation: 'Chapter 61',
        tab: 'testing',
      });
    }

    // inspectionItems may be a Record<string,{result,...}> (wizard path) or an array (legacy)
    // The component stores results under 'result', not 'outcome' — check both for safety.
    // Mere presence of items is NOT enough: the schedule auto-seeds the full BS 7671
    // list on first visit, so completeness requires an actual recorded outcome.
    const hasInspections = (() => {
      const items = formData.inspectionItems;
      if (items && !Array.isArray(items) && typeof items === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Object.values(items).some((i: any) => i.result || i.outcome);
      }
      if (Array.isArray(items) && items.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.some((i: any) => i.result || i.outcome);
      }
      return false;
    })() || (formData.inspections && Object.keys(formData.inspections).length > 0);
    if (!hasInspections) {
      warnings.push({
        field: 'inspections',
        message: 'No inspections recorded',
        severity: 'warning',
        regulation: 'Chapter 61',
        tab: 'inspection',
      });
    }

    // Additional completeness checks
    if (formData.designerName && !formData.designerQualifications) {
      warnings.push({
        field: 'designerQualifications',
        message: 'Designer qualifications',
        severity: 'info',
        tab: 'declarations',
      });
    }

    if (formData.constructorName && !formData.constructorQualifications) {
      warnings.push({
        field: 'constructorQualifications',
        message: 'Constructor qualifications',
        severity: 'info',
        tab: 'declarations',
      });
    }

    const completionPercentage = Math.round((completedFields / REQUIRED_FIELDS.length) * 100);
    const isValid = errors.length === 0;

    // Tab ticks converge on the same checks the missing-items sheet renders:
    // a step ticks exactly when the sheet has no errors left for it. Inspect and
    // Testing tick on real recorded data; Issue ticks when the cert is ready.
    const tabComplete: Record<EICTabId, boolean> = {
      details: !errors.some((e) => e.tab === 'details'),
      inspection: Boolean(hasInspections),
      testing: hasTestResults,
      declarations: !errors.some((e) => e.tab === 'declarations'),
      certificate: isValid,
    };

    return {
      isValid,
      errors,
      warnings,
      completionPercentage,
      tabComplete,
    };
  }, [formData]);
};
