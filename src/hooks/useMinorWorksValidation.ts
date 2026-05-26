import { useMemo } from 'react';

export type MWTabId = 'details' | 'circuit' | 'testing' | 'declaration';

export interface MWValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  regulation?: string;
  tab: MWTabId;
}

export const MW_TAB_LABEL: Record<MWTabId, string> = {
  details: 'Client & Details',
  circuit: 'Circuit Details',
  testing: 'Test Results',
  declaration: 'Declaration',
};

export interface MWValidationResult {
  isValid: boolean;
  errors: MWValidationRule[];
  warnings: MWValidationRule[];
  completionPercentage: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMinorWorksValidation = (formData: any): MWValidationResult => {
  return useMemo(() => {
    const errors: MWValidationRule[] = [];
    const warnings: MWValidationRule[] = [];

    // ── Details tab ────────────────────────────────────────────
    if (!formData.clientName) {
      errors.push({ field: 'clientName', message: 'Client name', severity: 'error', tab: 'details' });
    }
    if (!formData.propertyAddress) {
      errors.push({ field: 'propertyAddress', message: 'Property address', severity: 'error', tab: 'details' });
    }
    if (!formData.workDate) {
      errors.push({ field: 'workDate', message: 'Date of work', severity: 'error', tab: 'details' });
    }
    if (!formData.workType) {
      errors.push({ field: 'workType', message: 'Type of work', severity: 'error', tab: 'details' });
    }
    if (!formData.workDescription) {
      errors.push({ field: 'workDescription', message: 'Description of work', severity: 'error', tab: 'details' });
    }
    if (!formData.earthingArrangement) {
      errors.push({ field: 'earthingArrangement', message: 'Earthing arrangement', severity: 'error', tab: 'details' });
    }
    if (formData.workDate && formData.dateOfCompletion) {
      const work = new Date(formData.workDate).getTime();
      const done = new Date(formData.dateOfCompletion).getTime();
      if (done < work) {
        errors.push({
          field: 'dateOfCompletion',
          message: 'Completion date is before start date',
          severity: 'error',
          tab: 'details',
        });
      }
    }

    // ── Circuit tab ────────────────────────────────────────────
    if (!formData.circuitDesignation) {
      errors.push({ field: 'circuitDesignation', message: 'Circuit number', severity: 'error', tab: 'circuit' });
    }
    if (!formData.protectiveDeviceType) {
      errors.push({ field: 'protectiveDeviceType', message: 'Protective device type', severity: 'error', tab: 'circuit' });
    }
    if (!formData.protectiveDeviceRating) {
      errors.push({ field: 'protectiveDeviceRating', message: 'Device rating', severity: 'error', tab: 'circuit' });
    }
    if (!formData.liveConductorSize) {
      errors.push({ field: 'liveConductorSize', message: 'Live conductor size', severity: 'error', tab: 'circuit' });
    }

    // ── Testing tab ────────────────────────────────────────────
    if (!formData.polarity) {
      errors.push({ field: 'polarity', message: 'Polarity check', severity: 'error', tab: 'testing' });
    } else if (formData.polarity === 'incorrect') {
      errors.push({
        field: 'polarity',
        message: 'Polarity fault — must be corrected',
        severity: 'error',
        tab: 'testing',
        regulation: 'Reg 643.6',
      });
    }
    if (!formData.earthFaultLoopImpedance) {
      errors.push({ field: 'earthFaultLoopImpedance', message: 'Zs (Earth fault loop impedance)', severity: 'error', tab: 'testing' });
    } else if (formData.maxPermittedZs) {
      const zs = parseFloat(formData.earthFaultLoopImpedance);
      const max = parseFloat(formData.maxPermittedZs);
      if (!isNaN(zs) && !isNaN(max) && zs > max) {
        errors.push({
          field: 'earthFaultLoopImpedance',
          message: `Zs ${zs}Ω exceeds max ${max}Ω`,
          severity: 'error',
          tab: 'testing',
          regulation: 'Reg 411.4.5',
        });
      }
    }
    if (!formData.prospectiveFaultCurrent) {
      errors.push({ field: 'prospectiveFaultCurrent', message: 'Prospective fault current (Ipf)', severity: 'error', tab: 'testing' });
    } else if (formData.protectiveDeviceKaRating) {
      const pfc = parseFloat(formData.prospectiveFaultCurrent);
      const ka = parseFloat(formData.protectiveDeviceKaRating);
      if (!isNaN(pfc) && !isNaN(ka) && pfc > ka) {
        errors.push({
          field: 'prospectiveFaultCurrent',
          message: `Ipf ${pfc}kA exceeds device kA rating ${ka}kA`,
          severity: 'error',
          tab: 'testing',
          regulation: 'Reg 434.5.1',
        });
      }
    }
    // Insulation L-E (model form records L-E here) — only error if below 1 MΩ
    const ir = formData.insulationLiveEarth?.toString().trim();
    if (ir) {
      const isInf = /^>\s*\d+/.test(ir) || ir === '∞' || ir.toLowerCase() === 'infinity';
      if (!isInf) {
        const v = parseFloat(ir);
        if (!isNaN(v) && v < 1.0) {
          errors.push({
            field: 'insulationLiveEarth',
            message: `Insulation L-E ${v}MΩ below 1.0MΩ minimum`,
            severity: 'error',
            tab: 'testing',
            regulation: 'Reg 643.3',
          });
        }
      }
    }
    // TT touch voltage check
    if (formData.earthingArrangement === 'TT' && formData.earthElectrodeResistance) {
      const ra = parseFloat(formData.earthElectrodeResistance);
      const idn = parseFloat(formData.rcdIdn || '30');
      if (!isNaN(ra) && !isNaN(idn)) {
        const touch = ra * (idn / 1000);
        if (touch > 50) {
          errors.push({
            field: 'earthElectrodeResistance',
            message: `RA × IΔn = ${touch.toFixed(1)}V exceeds 50V`,
            severity: 'error',
            tab: 'testing',
            regulation: 'Reg 411.5.3',
          });
        }
      }
    }
    if (formData.earthingArrangement === 'TT' && !formData.earthElectrodeResistance) {
      errors.push({
        field: 'earthElectrodeResistance',
        message: 'RA (Earth electrode resistance) — required for TT',
        severity: 'error',
        tab: 'testing',
        regulation: 'Reg 411.5.3',
      });
    }
    // Calibration warning
    if (formData.testEquipmentCalDate) {
      const cal = new Date(formData.testEquipmentCalDate);
      const monthsAgo =
        (Date.now() - cal.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsAgo > 12) {
        warnings.push({
          field: 'testEquipmentCalDate',
          message: 'Test equipment calibration over 12 months old',
          severity: 'warning',
          tab: 'testing',
        });
      }
    }

    // ── Declaration tab ────────────────────────────────────────
    if (!formData.electricianName) {
      errors.push({ field: 'electricianName', message: 'Electrician name', severity: 'error', tab: 'declaration' });
    }
    if (!formData.position) {
      errors.push({ field: 'position', message: 'Position', severity: 'error', tab: 'declaration' });
    }
    if (!formData.ietDeclaration) {
      errors.push({
        field: 'ietDeclaration',
        message: 'BS 7671 compliance declaration',
        severity: 'error',
        tab: 'declaration',
      });
    }
    if (!formData.signature) {
      errors.push({ field: 'signature', message: 'Signature', severity: 'error', tab: 'declaration' });
    }
    if (!formData.signatureDate) {
      errors.push({ field: 'signatureDate', message: 'Signature date', severity: 'error', tab: 'declaration' });
    }

    // Completion percentage — based on a fixed required field set
    const REQUIRED_FIELDS = [
      'clientName', 'propertyAddress', 'workDate', 'workType', 'workDescription',
      'earthingArrangement', 'circuitDesignation', 'protectiveDeviceType',
      'protectiveDeviceRating', 'liveConductorSize', 'polarity',
      'earthFaultLoopImpedance', 'prospectiveFaultCurrent', 'electricianName',
      'position', 'ietDeclaration', 'signature', 'signatureDate',
    ];
    const filled = REQUIRED_FIELDS.filter((f) => {
      const v = formData[f];
      return v !== undefined && v !== '' && v !== false && v !== null;
    }).length;
    const completionPercentage = Math.round((filled / REQUIRED_FIELDS.length) * 100);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      completionPercentage,
    };
  }, [formData]);
};
