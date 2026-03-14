import { useState, useEffect } from 'react';

interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormValidation = (formData: any) => {
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
  });

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const validateForm = () => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Required fields validation
    if (!formData.certificateNumber) {
      errors.push({
        field: 'certificateNumber',
        message: 'Certificate number is required',
        severity: 'error',
      });
    }

    if (!formData.clientName) {
      errors.push({
        field: 'clientName',
        message: 'Client name is required',
        severity: 'error',
      });
    }

    if (!formData.propertyAddress) {
      errors.push({
        field: 'propertyAddress',
        message: 'Property address is required',
        severity: 'error',
      });
    }

    // Date validations
    if (formData.workDate && formData.dateOfCompletion) {
      const workDate = new Date(formData.workDate);
      const completionDate = new Date(formData.dateOfCompletion);

      if (completionDate < workDate) {
        errors.push({
          field: 'dateOfCompletion',
          message: 'Completion date cannot be before work start date',
          severity: 'error',
        });
      }
    }

    // Zs validation
    if (formData.earthFaultLoopImpedance && formData.maxPermittedZs) {
      const zs = parseFloat(formData.earthFaultLoopImpedance);
      const maxZs = parseFloat(formData.maxPermittedZs);

      if (zs > maxZs) {
        errors.push({
          field: 'earthFaultLoopImpedance',
          message: `Zs (${zs}Ω) exceeds maximum permitted value (${maxZs}Ω)`,
          severity: 'error',
        });
      }
    }

    // Insulation resistance validation
    if (formData.insulationLiveNeutral) {
      const insulation = parseFloat(formData.insulationLiveNeutral);
      if (insulation < 1.0) {
        errors.push({
          field: 'insulationLiveNeutral',
          message: 'Insulation resistance must be at least 1.0 MΩ',
          severity: 'error',
        });
      }
    }

    // PFC vs kA breaking capacity (Reg 434.5.1)
    if (formData.prospectiveFaultCurrent && formData.protectiveDeviceKaRating) {
      const pfc = parseFloat(formData.prospectiveFaultCurrent);
      const ka = parseFloat(formData.protectiveDeviceKaRating);

      if (!isNaN(pfc) && !isNaN(ka) && pfc > ka) {
        errors.push({
          field: 'prospectiveFaultCurrent',
          message: `Ipf (${pfc}kA) exceeds device breaking capacity (${ka}kA) — Reg 434.5.1`,
          severity: 'error',
        });
      }
    }

    // RA × IΔn ≤ 50V for TT systems (Reg 411.5.3)
    if (formData.earthingArrangement === 'TT' && formData.earthElectrodeResistance) {
      const ra = parseFloat(formData.earthElectrodeResistance);
      const idn = parseFloat(formData.rcdIdn || '30');

      if (!isNaN(ra) && !isNaN(idn)) {
        const touchVoltage = ra * (idn / 1000);
        if (touchVoltage > 50) {
          errors.push({
            field: 'earthElectrodeResistance',
            message: `RA × IΔn = ${touchVoltage.toFixed(1)}V exceeds 50V limit — Reg 411.5.3`,
            severity: 'error',
          });
        }
      }
    }

    // Insulation resistance on all conductors (Reg 643.3)
    ['insulationLiveEarth', 'insulationNeutralEarth'].forEach((field) => {
      if (formData[field]) {
        const val = formData[field].toString().trim();
        // Skip infinite readings (always pass)
        if (/^>\s*\d+/.test(val) || val === '∞' || val.toLowerCase() === 'infinity') return;
        const insulation = parseFloat(val);
        if (!isNaN(insulation) && insulation < 1.0) {
          errors.push({
            field,
            message: `Insulation resistance ${insulation}MΩ below 1.0MΩ minimum — Reg 643.3`,
            severity: 'error',
          });
        }
      }
    });

    // Warnings for unusual values
    if (formData.continuityR1R2) {
      const continuity = parseFloat(formData.continuityR1R2);
      if (continuity > 2.0) {
        warnings.push({
          field: 'continuityR1R2',
          message: 'Unusually high continuity value - please verify',
          severity: 'warning',
        });
      }
    }

    setValidation({
      isValid: errors.length === 0,
      errors,
      warnings,
    });
  };

  return validation;
};
