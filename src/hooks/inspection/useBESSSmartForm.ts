/**
 * useBESSSmartForm Hook
 *
 * Smart auto-fill, chemistry-aware guidance, G98/G99 determination,
 * PME decision tree, and test result validation for BESS certificates.
 */

import { useCallback, useMemo } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { getMcbZsLimit, MCBCurve, DisconnectionTime, ZsLookupResult, checkZsCompliance } from '@/data/zsLimits';
import { BatteryChemistry, getDCTestVoltage } from '@/types/bess';

export interface InstallerDetails {
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  installerScheme: string;
  installerSchemeNumber: string;
  mcsInstallerNumber: string;
  installerSignature: string;
  installerDate: string;
}

export interface CompanyBranding {
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyTagline: string;
  companyAccentColor: string;
  registrationSchemeLogo: string;
  registrationScheme: string;
  registrationNumber: string;
}

export interface GridConnectionRequirement {
  type: 'G98' | 'G99' | 'none';
  message: string;
  details: string;
  warning: boolean;
}

export interface ChemistryGuidance {
  dcTestVoltage: string;
  minResistance: string;
  ventilationAdvice: string;
  thermalRunawayRisk: 'low' | 'medium' | 'high';
  safetyNotes: string;
}

export interface PMEGuidance {
  requiresAction: boolean;
  recommendation: string;
  regulation: string;
  options: string[];
}

export interface TestResultValidation {
  field: string;
  value: number | string;
  isValid: boolean;
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  message: string;
  limit?: number;
}

export function useBESSSmartForm() {
  const { companyProfile, loading: companyLoading } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();

  // Load installer details from Business Settings
  const loadInstallerDetails = useCallback((): InstallerDetails | null => {
    const inspectorProfile = getDefaultProfile();
    const today = new Date().toISOString().split('T')[0];
    const name = companyProfile?.inspector_name || inspectorProfile?.name;
    if (!name) return null;

    return {
      installerName: name,
      installerCompany: companyProfile?.company_name || inspectorProfile?.companyName || '',
      installerPhone: companyProfile?.company_phone || '',
      installerEmail: companyProfile?.company_email || '',
      installerScheme: companyProfile?.registration_scheme || inspectorProfile?.registrationScheme || '',
      installerSchemeNumber: companyProfile?.registration_number || inspectorProfile?.registrationNumber || '',
      mcsInstallerNumber: '',
      installerSignature: companyProfile?.signature_data || inspectorProfile?.signatureData || '',
      installerDate: today,
    };
  }, [companyProfile, getDefaultProfile]);

  // Load company branding for PDF
  const loadCompanyBranding = useCallback((): CompanyBranding | null => {
    if (!companyProfile) return null;
    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      companyLogo: companyProfile.logo_data_url || companyProfile.logo_url || '',
      companyName: companyProfile.company_name || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile.company_phone || '',
      companyEmail: companyProfile.company_email || '',
      companyWebsite: (companyProfile as any).company_website || '',
      companyTagline: (companyProfile as any).company_tagline || '',
      companyAccentColor: companyProfile.primary_color || '#f59e0b',
      registrationSchemeLogo: companyProfile.scheme_logo_data_url || companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
      registrationNumber: companyProfile.registration_number || '',
    };
  }, [companyProfile]);

  const hasSavedInstallerDetails = useMemo(() => {
    const profile = getDefaultProfile();
    return !!(companyProfile?.inspector_name || profile?.name);
  }, [companyProfile, getDefaultProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  // G98/G99 auto-determination from total site generation capacity
  const getGridConnectionRequirement = useCallback((totalSiteCapacityKW: number, phases: 'single' | 'three' = 'single'): GridConnectionRequirement => {
    const g98Limit = phases === 'three' ? 11.04 : 3.68;
    if (totalSiteCapacityKW <= 0) {
      return { type: 'none', message: 'Enter total site generation capacity', details: '', warning: false };
    }
    if (totalSiteCapacityKW <= g98Limit) {
      return {
        type: 'G98',
        message: 'G98 Notification',
        details: `At ${totalSiteCapacityKW}kW (≤${g98Limit}kW ${phases}-phase), notify DNO within 28 days. No approval needed.`,
        warning: false,
      };
    }
    return {
      type: 'G99',
      message: 'G99 Application Required',
      details: `At ${totalSiteCapacityKW}kW (>${g98Limit}kW), DNO approval required BEFORE installation. Allow several weeks for approval.`,
      warning: true,
    };
  }, []);

  // Chemistry-aware guidance
  const getChemistryGuidance = useCallback((chemistry: BatteryChemistry | ''): ChemistryGuidance => {
    const { voltage, minResistance } = getDCTestVoltage(chemistry);
    switch (chemistry) {
      case 'LFP':
        return {
          dcTestVoltage: voltage, minResistance,
          ventilationAdvice: 'Natural ventilation typically sufficient. LFP has low thermal runaway risk.',
          thermalRunawayRisk: 'low',
          safetyNotes: 'Lithium Iron Phosphate — inherently stable chemistry. No toxic gas release under normal failure modes.',
        };
      case 'NMC':
        return {
          dcTestVoltage: voltage, minResistance,
          ventilationAdvice: 'Consider mechanical ventilation. NMC has higher thermal runaway risk — ensure adequate clearance from combustibles.',
          thermalRunawayRisk: 'high',
          safetyNotes: 'Nickel Manganese Cobalt — higher energy density but elevated thermal runaway risk. Fire detection and ventilation strongly recommended.',
        };
      case 'NCA':
        return {
          dcTestVoltage: voltage, minResistance,
          ventilationAdvice: 'Mechanical ventilation recommended. NCA has elevated thermal runaway risk.',
          thermalRunawayRisk: 'high',
          safetyNotes: 'Nickel Cobalt Aluminium — similar risk profile to NMC. Enhanced safety measures recommended.',
        };
      case 'lead-acid':
        return {
          dcTestVoltage: voltage, minResistance,
          ventilationAdvice: 'Ventilation essential — hydrogen gas produced during charging. Do not install in sealed spaces.',
          thermalRunawayRisk: 'low',
          safetyNotes: 'Lead-acid batteries produce hydrogen gas. Adequate ventilation per BS EN 50272-2 required.',
        };
      default:
        return {
          dcTestVoltage: voltage, minResistance,
          ventilationAdvice: 'Assess ventilation requirements based on battery chemistry.',
          thermalRunawayRisk: 'medium',
          safetyNotes: 'Select battery chemistry to see specific safety guidance.',
        };
    }
  }, []);

  // PME earthing guidance
  const getPMEGuidance = useCallback((earthingArrangement: string, hasGalvanicIsolation: boolean): PMEGuidance => {
    if (earthingArrangement !== 'TN-C-S') {
      return {
        requiresAction: false,
        recommendation: 'No PME considerations — standard earthing applies.',
        regulation: 'BS 7671 Section 411',
        options: [],
      };
    }
    if (hasGalvanicIsolation) {
      return {
        requiresAction: false,
        recommendation: 'Inverter provides galvanic isolation — standard PME earthing acceptable for DC side.',
        regulation: 'BS 7671 Reg 551.4, IET CoP EESS Ch. 6',
        options: [],
      };
    }
    return {
      requiresAction: true,
      recommendation: 'PME earthing with non-isolated inverter — DC earth fault could inject DC into PEN conductor. Action required.',
      regulation: 'BS 7671 Reg 411.4.2, IET CoP EESS Ch. 6',
      options: [
        'Install a separate earth electrode for the DC side',
        'Use IT earthing arrangement on DC side with insulation monitoring device (IMD)',
        'Replace inverter with one providing galvanic isolation (transformer-based)',
      ],
    };
  }, []);

  // Zs calculation
  const calculateZs = useCallback((ze: number, r1r2: number, applyTempCorrection: boolean = true) => {
    const tempFactor = applyTempCorrection ? 1.2 : 1.0;
    return { calculatedZs: Math.round((ze + r1r2 * tempFactor) * 100) / 100, ze, r1r2, temperatureCorrectionFactor: tempFactor };
  }, []);

  // Max Zs lookup
  const lookupMaxZs = useCallback((deviceType: string, rating: number, curve: string, disconnectionTime: DisconnectionTime = '0.4s'): ZsLookupResult | null => {
    let mcbCurve: MCBCurve;
    switch (curve.toUpperCase()) {
      case 'B': case 'TYPE B': mcbCurve = 'typeB'; break;
      case 'C': case 'TYPE C': mcbCurve = 'typeC'; break;
      case 'D': case 'TYPE D': mcbCurve = 'typeD'; break;
      default: mcbCurve = 'typeB';
    }
    return getMcbZsLimit(mcbCurve, rating, disconnectionTime);
  }, []);

  // Validate test results
  const validateTestResults = useCallback((formData: any): TestResultValidation[] => {
    const validations: TestResultValidation[] = [];

    // AC insulation resistance (≥1MΩ)
    if (formData.acInsulationResistance) {
      const ir = parseFloat(formData.acInsulationResistance.toString().replace('>', '').trim());
      if (!isNaN(ir)) {
        validations.push({ field: 'acInsulationResistance', value: ir, isValid: ir >= 1, status: ir >= 1 ? 'pass' : 'fail', message: ir >= 1 ? `PASS: ${ir}MΩ ≥ 1MΩ` : `FAIL: ${ir}MΩ < 1MΩ`, limit: 1 });
      }
    }

    // DC insulation resistance (chemistry-dependent)
    if (formData.dcInsulationResistance && formData.batteryChemistry) {
      const { minResistance } = getDCTestVoltage(formData.batteryChemistry);
      const dcIr = parseFloat(formData.dcInsulationResistance.toString().replace('>', '').trim());
      const min = parseFloat(minResistance);
      if (!isNaN(dcIr)) {
        validations.push({ field: 'dcInsulationResistance', value: dcIr, isValid: dcIr >= min, status: dcIr >= min ? 'pass' : 'fail', message: dcIr >= min ? `PASS: ${dcIr}MΩ ≥ ${min}MΩ` : `FAIL: ${dcIr}MΩ < ${min}MΩ`, limit: min });
      }
    }

    // RCD trip times
    if (formData.rcdTripTimeIdn) {
      const t = parseFloat(formData.rcdTripTimeIdn);
      if (!isNaN(t)) validations.push({ field: 'rcdTripTimeIdn', value: t, isValid: t <= 300, status: t <= 300 ? 'pass' : 'fail', message: t <= 300 ? `PASS: ${t}ms ≤ 300ms` : `FAIL: ${t}ms > 300ms`, limit: 300 });
    }
    if (formData.rcdTripTime5xIdn) {
      const t5 = parseFloat(formData.rcdTripTime5xIdn);
      if (!isNaN(t5)) validations.push({ field: 'rcdTripTime5xIdn', value: t5, isValid: t5 <= 40, status: t5 <= 40 ? 'pass' : 'fail', message: t5 <= 40 ? `PASS: ${t5}ms ≤ 40ms` : `FAIL: ${t5}ms > 40ms`, limit: 40 });
    }

    // AC polarity
    if (formData.acPolarity) {
      const pass = formData.acPolarity === 'correct';
      validations.push({ field: 'acPolarity', value: formData.acPolarity, isValid: pass, status: pass ? 'pass' : 'fail', message: pass ? 'PASS: Polarity correct' : 'FAIL: Polarity incorrect' });
    }

    // DC polarity
    if (formData.dcPolarityVerified !== undefined) {
      validations.push({ field: 'dcPolarityVerified', value: formData.dcPolarityVerified, isValid: formData.dcPolarityVerified, status: formData.dcPolarityVerified ? 'pass' : 'fail', message: formData.dcPolarityVerified ? 'PASS: DC polarity verified' : 'DC polarity not verified' });
    }

    return validations;
  }, []);

  // PAS 63100:2024 compliance validation (domestic BESS fire safety)
  const getPAS63100Compliance = useCallback((formData: any): { errors: string[]; warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (formData.installationType !== 'domestic') return { errors, warnings };

    // Location prohibitions
    if (!formData.notInSleepingRoom) errors.push('Confirm battery NOT in sleeping room');
    if (!formData.notInEscapeRoute) errors.push('Confirm battery NOT on escape route');
    if (!formData.notInLoftOrVoid) errors.push('Confirm battery NOT in loft/void/roof space');
    if (!formData.notInBasementNoAccess) errors.push('Confirm battery NOT in basement without external access');

    // Energy limits
    const energyPerEnc = parseFloat(formData.energyPerEnclosure) || 0;
    if (energyPerEnc > 20) errors.push(`Max 20 kWh per enclosure — currently ${energyPerEnc} kWh`);
    const totalEnergy = parseFloat(formData.totalEnergyAtPremises) || 0;
    const loc = formData.installationLocation;
    if (loc === 'garage' || loc === 'dedicated-enclosure') {
      if (totalEnergy > 80) errors.push(`Max 80 kWh in outbuilding/garage — currently ${totalEnergy} kWh`);
    } else if (totalEnergy > 40) {
      errors.push(`Max 40 kWh in this location — currently ${totalEnergy} kWh`);
    }

    // Distances
    const distOpenings = parseFloat(formData.distanceFromOpenings) || 0;
    if (loc === 'outdoor' && distOpenings > 0 && distOpenings < 1) warnings.push('Min 1m from windows/doors/vents (outdoor)');
    const distFlam = parseFloat(formData.distanceFromFlammables) || 0;
    if (distFlam > 0 && distFlam < 2) warnings.push('Min 2m from flammable materials/fuel storage');

    // Enclosure
    if (!formData.enclosureNonCombustible) warnings.push('Enclosure must be non-combustible (PAS 63100)');
    if (!formData.enclosureToolAccessOnly) warnings.push('Enclosure access must require tool (PAS 63100)');
    if (!formData.dcFusesToolAccessOnly) warnings.push('DC fuses must only be accessible via tool');

    // IK10 for garage/vehicle areas
    if ((loc === 'garage') && !formData.ik10Protection) warnings.push('IK10 mechanical protection required in garage/vehicle area');

    // Fire detection
    if (!formData.fireDetectionGrade) warnings.push('Grade D2 fire detection required');
    if (!formData.audibleBatteryWarning) warnings.push('Audible warning required for dangerous battery condition');

    // Ventilation
    if (loc !== 'outdoor' && !formData.ventilationToOutdoors) warnings.push('Interior installation requires ventilation to outdoors');

    return { errors, warnings };
  }, []);

  // EESS Class auto-suggestion (MCS MIS 3012:2025)
  const getEESSClassSuggestion = useCallback((formData: any): { suggested: string; description: string } => {
    const battMfr = (formData.batteryManufacturer || '').toLowerCase();
    const invMfr = (formData.inverterManufacturer || '').toLowerCase();
    if (!battMfr || !invMfr) return { suggested: '', description: 'Select battery and inverter manufacturers' };
    if (battMfr === invMfr) {
      const sameEnclosure = formData.installationLocation === 'dedicated-enclosure';
      if (sameEnclosure) return { suggested: '1', description: 'Class 1 — Same manufacturer, single enclosure, no visible DC cable' };
      return { suggested: '2', description: 'Class 2 — Same manufacturer, separate enclosures with DC cable link' };
    }
    return { suggested: '3', description: 'Class 3 — Different manufacturers (verify compatibility)' };
  }, []);

  // AFDD recommendation
  const getAFDDRecommendation = useCallback((installationType: string): boolean => {
    return installationType === 'domestic';
  }, []);

  // MCS validation — check mandatory fields before PDF generation
  const getMCSMissingFields = useCallback((formData: any): string[] => {
    const missing: string[] = [];
    if (!formData.clientName) missing.push('Client name');
    if (!formData.installationAddress) missing.push('Installation address');
    if (!formData.batteryManufacturer) missing.push('Battery manufacturer');
    if (!formData.batteryModel) missing.push('Battery model');
    if (!formData.batterySerials) missing.push('Battery serial number(s)');
    if (!formData.batteryChemistry) missing.push('Battery chemistry');
    if (!formData.usableCapacity) missing.push('Usable capacity (kWh)');
    if (!formData.inverterManufacturer) missing.push('Inverter manufacturer');
    if (!formData.inverterModel) missing.push('Inverter model');
    if (!formData.inverterSerial) missing.push('Inverter serial number');
    if (!formData.inverterRatedPower) missing.push('Inverter rated power');
    if (!formData.couplingType) missing.push('Coupling type (AC/DC/Hybrid)');
    if (!formData.earthingArrangement) missing.push('Earthing arrangement');
    if (!formData.ze) missing.push('Ze measurement');
    if (!formData.acInsulationResistance) missing.push('AC insulation resistance');
    if (!formData.dcInsulationResistance) missing.push('DC insulation resistance');
    if (!formData.chargeTest) missing.push('Charge test result');
    if (!formData.dischargeTest) missing.push('Discharge test result');
    if (!formData.antiIslandingTest) missing.push('Anti-islanding test result');
    if (!formData.gridConnectionType) missing.push('G98/G99 selection');
    if (!formData.installerName) missing.push('Installer name');
    if (!formData.installerSignature) missing.push('Installer signature');
    if (!formData.mcsInstallerNumber) missing.push('MCS installer number');
    return missing;
  }, []);

  return {
    loading: companyLoading,
    hasSavedInstallerDetails,
    hasSavedCompanyBranding,
    loadInstallerDetails,
    loadCompanyBranding,
    getGridConnectionRequirement,
    getChemistryGuidance,
    getPMEGuidance,
    calculateZs,
    lookupMaxZs,
    validateTestResults,
    getMCSMissingFields,
    getPAS63100Compliance,
    getEESSClassSuggestion,
    getAFDDRecommendation,
  };
}

export default useBESSSmartForm;
