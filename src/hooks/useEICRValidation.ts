import { useMemo } from 'react';

export type EICRTabId = 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';

export interface EICRValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  regulation?: string;
  tab: EICRTabId;
}

export const EICR_TAB_LABEL: Record<EICRTabId, string> = {
  details: 'Details',
  inspection: 'Inspection',
  testing: 'Testing',
  inspector: 'Inspector',
  certificate: 'Certificate',
};

export interface EICRValidationResult {
  isValid: boolean;
  errors: EICRValidationRule[];
  warnings: EICRValidationRule[];
  completionPercentage: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEICRValidation = (formData: any): EICRValidationResult => {
  return useMemo(() => {
    const errors: EICRValidationRule[] = [];
    const warnings: EICRValidationRule[] = [];

    // ── Details tab ────────────────────────────────────────────
    if (!formData.clientName) {
      errors.push({ field: 'clientName', message: 'Client name', severity: 'error', tab: 'details' });
    }
    if (!formData.installationAddress) {
      errors.push({ field: 'installationAddress', message: 'Installation address', severity: 'error', tab: 'details' });
    }
    if (!formData.inspectionDate) {
      errors.push({ field: 'inspectionDate', message: 'Inspection date', severity: 'error', tab: 'details' });
    }
    if (!formData.supplyVoltage) {
      errors.push({ field: 'supplyVoltage', message: 'Supply voltage', severity: 'error', tab: 'details' });
    }
    if (!formData.phases) {
      errors.push({ field: 'phases', message: 'Number of phases', severity: 'error', tab: 'details' });
    }
    if (!formData.earthingArrangement) {
      errors.push({ field: 'earthingArrangement', message: 'Earthing arrangement', severity: 'error', tab: 'details' });
    }
    if (!formData.mainProtectiveDevice) {
      errors.push({ field: 'mainProtectiveDevice', message: 'Main protective device', severity: 'error', tab: 'details' });
    }
    // Bonding compliance — warn if missing, not block
    if (!formData.bondingCompliance) {
      warnings.push({
        field: 'bondingCompliance',
        message: 'Bonding compliance not recorded',
        severity: 'warning',
        tab: 'details',
      });
    }

    // ── Inspection tab ─────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inspectionItems: any[] = formData.inspectionItems || [];
    const inspectedItems = inspectionItems.filter(
      (i) => i.outcome && i.outcome !== '' && i.outcome !== 'not-applicable'
    );
    if (inspectedItems.length === 0) {
      errors.push({
        field: 'inspectionItems',
        message: 'No inspection items completed',
        severity: 'error',
        tab: 'inspection',
      });
    } else if (inspectedItems.length < inspectionItems.length) {
      const remaining = inspectionItems.length - inspectedItems.length;
      warnings.push({
        field: 'inspectionItems',
        message: `${remaining} inspection item${remaining === 1 ? '' : 's'} not yet recorded`,
        severity: 'warning',
        tab: 'inspection',
      });
    }

    // ── Testing tab ────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scheduleOfTests: any[] = formData.scheduleOfTests || [];
    const testedCircuits = scheduleOfTests.filter(
      (t) => t.zs || t.polarity || t.insulationResistance || t.insulationLiveEarth || t.r1r2
    );
    if (scheduleOfTests.length === 0) {
      errors.push({
        field: 'scheduleOfTests',
        message: 'No circuits in schedule of tests',
        severity: 'error',
        tab: 'testing',
      });
    } else if (testedCircuits.length === 0) {
      errors.push({
        field: 'scheduleOfTests',
        message: 'No test readings recorded',
        severity: 'error',
        tab: 'testing',
      });
    } else if (testedCircuits.length < scheduleOfTests.length) {
      const remaining = scheduleOfTests.length - testedCircuits.length;
      warnings.push({
        field: 'scheduleOfTests',
        message: `${remaining} circuit${remaining === 1 ? '' : 's'} without test readings`,
        severity: 'warning',
        tab: 'testing',
      });
    }

    // ── Inspector tab ──────────────────────────────────────────
    if (!formData.inspectorName) {
      errors.push({ field: 'inspectorName', message: 'Inspector name', severity: 'error', tab: 'inspector' });
    }
    if (!formData.inspectorQualifications) {
      errors.push({
        field: 'inspectorQualifications',
        message: 'Inspector qualifications',
        severity: 'error',
        tab: 'inspector',
      });
    }
    if (!formData.inspectorSignature) {
      errors.push({ field: 'inspectorSignature', message: 'Inspector signature', severity: 'error', tab: 'inspector' });
    }

    // ── Certificate tab ────────────────────────────────────────
    if (!formData.overallAssessment) {
      errors.push({
        field: 'overallAssessment',
        message: 'Overall assessment (satisfactory / unsatisfactory)',
        severity: 'error',
        tab: 'certificate',
      });
    }
    if (!formData.nextInspectionDate) {
      warnings.push({
        field: 'nextInspectionDate',
        message: 'Next inspection date not set',
        severity: 'warning',
        tab: 'certificate',
      });
    }

    // ── Cross-cutting checks ───────────────────────────────────
    // C1 outcomes are immediately dangerous — every C1 must have an observation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const observations: any[] = formData.defectObservations || [];
    const c1Items = inspectionItems.filter((i) => i.outcome === 'C1');
    const c2Items = inspectionItems.filter((i) => i.outcome === 'C2');

    c1Items.forEach((item) => {
      const linked = observations.find((o) => o.inspectionItemId === item.id);
      if (!linked) {
        errors.push({
          field: `c1-${item.id}`,
          message: `C1 item missing observation: ${item.item?.slice(0, 40)}…`,
          severity: 'error',
          tab: 'inspection',
          regulation: 'C1 = danger present, requires action',
        });
      } else if (!linked.description?.trim() || !linked.recommendation?.trim()) {
        errors.push({
          field: `c1-detail-${item.id}`,
          message: `C1 observation needs description + recommendation`,
          severity: 'error',
          tab: 'inspection',
        });
      }
    });

    // C1 outcomes also force an "unsatisfactory" overall assessment
    if (c1Items.length > 0 && formData.overallAssessment === 'satisfactory') {
      errors.push({
        field: 'overallAssessment',
        message: `${c1Items.length} C1 item${c1Items.length === 1 ? '' : 's'} present — overall cannot be Satisfactory`,
        severity: 'error',
        tab: 'certificate',
      });
    }

    // C2 items should also be observed (less strict than C1 — warn, don't block)
    c2Items.forEach((item) => {
      const linked = observations.find((o) => o.inspectionItemId === item.id);
      if (!linked) {
        warnings.push({
          field: `c2-${item.id}`,
          message: `C2 item missing observation: ${item.item?.slice(0, 40)}…`,
          severity: 'warning',
          tab: 'inspection',
        });
      }
    });

    // Completion percentage
    const REQUIRED = [
      'clientName', 'installationAddress', 'inspectionDate', 'supplyVoltage', 'phases',
      'earthingArrangement', 'mainProtectiveDevice',
      'inspectorName', 'inspectorQualifications', 'inspectorSignature',
      'overallAssessment',
    ];
    let filled = REQUIRED.filter((f) => {
      const v = formData[f];
      return v !== undefined && v !== '' && v !== false && v !== null;
    }).length;
    // bonus completion for having inspection + tests
    if (inspectedItems.length > 0) filled++;
    if (testedCircuits.length > 0) filled++;
    const total = REQUIRED.length + 2;
    const completionPercentage = Math.round((filled / total) * 100);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      completionPercentage,
    };
  }, [formData]);
};
