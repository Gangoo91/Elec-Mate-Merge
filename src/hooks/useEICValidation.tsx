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
 * and the tab ticks all derive from this one list.
 *
 * 🔴 ALL ADVISORY — Andrew, 30 Sep 2026: "we shouldn't have gates in the EIC".
 * Nothing in this list blocks Generate. Every rule is severity 'warning': it
 * counts in the ring, appears in the still-to-complete sheet with a Go, and
 * the electrician decides. The gate had existed since the certificate
 * redesign (13 blocking fields) and was widened to 21 earlier the same day
 * before the decision was taken. Do not reintroduce 'error' here. */
const REQUIRED_FIELDS: {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  regulation?: string;
  tab: EICTabId;
  /** Older keys the PDF formatter also accepts for this field — filled is filled. */
  aliases?: string[];
}[] = [
  { field: 'clientName', message: 'Client name', severity: 'warning', tab: 'details' },
  { field: 'clientAddress', message: 'Client address', severity: 'warning', tab: 'details' },
  { field: 'installationAddress', message: 'Installation address', severity: 'warning', tab: 'details' },
  { field: 'installationDate', message: 'Installation date', severity: 'warning', tab: 'details' },
  { field: 'installationType', message: 'Installation type', severity: 'warning', tab: 'details' },
  /*
   * The eight starred Details fields that were never tracked here (EIC
   * walkthrough, 30 Sep 2026): a cert read 93% with description, Ze, Ipf,
   * main switch rating and means of earthing all blank, and the only item
   * listed was the next inspection date. On the last 229 issued EICs Ze was
   * blank on 44, Ipf on 26, description on 19, means of earthing on 17.
   *
   * ADVISORY, not blocking (Andrew, 30 Sep 2026: "we shouldn't have gates in
   * the EIC"). They count in the ring and appear in the still-to-complete
   * sheet under "worth checking", and Generate stays live.
   */
  {
    field: 'description',
    message: 'Description of installation',
    severity: 'warning',
    tab: 'details',
  },
  {
    field: 'supplyVoltage',
    message: 'Supply voltage',
    severity: 'warning',
    regulation: 'Chapter 31',
    tab: 'details',
  },
  { field: 'phases', message: 'Number of phases', severity: 'warning', regulation: 'Chapter 31', tab: 'details' },
  {
    field: 'liveCondutorType',
    message: 'Live conductor configuration',
    severity: 'warning',
    regulation: 'Chapter 31',
    tab: 'details',
  },
  {
    field: 'prospectiveFaultCurrent',
    message: 'Prospective fault current (Ipf)',
    severity: 'warning',
    regulation: '643.7.3.201',
    tab: 'details',
  },
  {
    field: 'externalZe',
    message: 'External loop impedance (Ze)',
    severity: 'warning',
    regulation: '643.7.3.201',
    tab: 'details',
    // eicJsonFormatter prints externalEarthFaultLoopImpedance || externalZe.
    aliases: ['externalEarthFaultLoopImpedance'],
  },
  {
    field: 'earthingArrangement',
    message: 'Earthing arrangement',
    severity: 'warning',
    regulation: 'Chapter 54',
    tab: 'details',
  },
  {
    field: 'meansOfEarthing',
    message: 'Means of earthing',
    severity: 'warning',
    regulation: 'Chapter 54',
    tab: 'details',
  },
  {
    field: 'mainProtectiveDevice',
    message: 'Main protective device',
    severity: 'warning',
    regulation: 'Chapter 43',
    tab: 'details',
  },
  // The panel's N/A chip stamps 'N/A' into this field, which counts as answered.
  {
    field: 'mainSwitchRating',
    message: 'Main switch rating',
    severity: 'warning',
    regulation: 'Chapter 43',
    tab: 'details',
  },
  { field: 'designerName', message: 'Designer name', severity: 'warning', regulation: 'Part 6', tab: 'declarations' },
  {
    field: 'designerSignature',
    message: 'Designer signature',
    severity: 'warning',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'constructorName',
    message: 'Constructor name',
    severity: 'warning',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'constructorSignature',
    message: 'Constructor signature',
    severity: 'warning',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'inspectorName',
    message: 'Inspector name',
    severity: 'warning',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  {
    field: 'inspectorSignature',
    message: 'Inspector signature',
    severity: 'warning',
    regulation: 'Part 6',
    tab: 'declarations',
  },
  // ELE-1636 — without this date the certificate can never prompt its own
  // renewal. The interval presets fill it in one tap.
  {
    field: 'nextInspectionDate',
    message: 'Next inspection date',
    severity: 'warning',
    regulation: '653.4',
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
      // Seeds are '' not undefined, so fall through on blank, not just on null.
      const primary = formData[rule.field];
      const value =
        primary && String(primary).trim() !== ''
          ? primary
          : rule.aliases?.map((alias) => formData[alias]).find((v) => v && String(v).trim() !== '');
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
     * Uncorrected defects. Reg 644.1.1 expects an initial verification's
     * defects put right before the certificate is issued; the observation
     * card's "Rectified" tick clears them. Advisory since 30 Sep 2026 (no
     * gates on the EIC) — listed with the regulation, never blocking. Defects
     * in the *existing* installation are a separate matter — they belong in
     * Section I, "Comments on existing installation".
     */
    const uncorrectedDefects = Array.isArray(formData.observations)
      ? formData.observations.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (obs: any) => normalizeEICDefectCode(obs?.defectCode) === 'unsatisfactory' && !obs?.rectified
        ).length
      : 0;

    // Advisory since 30 Sep 2026 (no gates on the EIC) — still listed first
    // in the sheet with the regulation, so nobody issues without seeing it.
    if (uncorrectedDefects > 0) {
      warnings.push({
        field: 'observations',
        message: `${uncorrectedDefects} unsatisfactory item${uncorrectedDefects === 1 ? '' : 's'} not yet corrected — Reg 644.1.1 expects these put right before issue`,
        severity: 'warning',
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
