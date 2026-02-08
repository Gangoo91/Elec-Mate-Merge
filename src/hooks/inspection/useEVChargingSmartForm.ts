/**
 * useEVChargingSmartForm Hook
 *
 * Provides smart auto-fill, calculations, and validations for EV charging certificates.
 * Integrates with company profiles, Zs lookup tables, and charger database.
 */

import { useCallback, useMemo } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { getMcbZsLimit, MCBCurve, DisconnectionTime, ZsLookupResult, checkZsCompliance } from '@/data/zsLimits';
import {
  EVCharger,
  findCharger,
  searchChargers,
  calculateCurrentFromPower,
  calculatePowerFromCurrent
} from '@/data/evChargerDatabase';

// ============================================================================
// Types
// ============================================================================

export interface InstallerDetails {
  installerName: string;
  installerCompany: string;
  installerQualifications: string;
  installerScheme: string;
  installerSchemeNumber: string;
  installerSignature: string;
  installerDate: string;
}

export interface CompanyBranding {
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyAccentColor: string;
  registrationSchemeLogo: string;
  registrationScheme: string;
}

export interface TestResultValidation {
  field: string;
  value: number | string;
  isValid: boolean;
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  message: string;
  limit?: number;
}

export interface ZsCalculation {
  calculatedZs: number;
  ze: number;
  r1r2: number;
  temperatureCorrectionFactor: number;
  isManual: boolean;
}

export interface DNORequirement {
  required: boolean;
  type: 'G98' | 'G99' | 'none';
  message: string;
  details: string;
}

export interface ChargerDefaults {
  chargerMake: string;
  chargerModel: string;
  powerRating: number;
  phases: number;
  ratedCurrent: number;
  socketType: string;
  chargerConnection: string;
  rcdType: string;
  rcdIntegral: boolean;
  chargerType: string;
  smartChargingEnabled: boolean;
  cableSize: number;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useEVChargingSmartForm() {
  const { companyProfile, loading: companyLoading } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();

  // ---------------------------------------------------------------------------
  // Load Installer Details from Business Settings / Inspector Profile
  // ---------------------------------------------------------------------------
  const loadInstallerDetails = useCallback((): InstallerDetails | null => {
    const inspectorProfile = getDefaultProfile();
    const today = new Date().toISOString().split('T')[0];

    // Priority: Company Profile > Inspector Profile
    const name = companyProfile?.inspector_name || inspectorProfile?.name;
    if (!name) return null;

    const qualifications = companyProfile?.inspector_qualifications?.length
      ? companyProfile.inspector_qualifications.join(', ')
      : inspectorProfile?.qualifications?.join(', ') || '';

    const scheme = companyProfile?.registration_scheme || inspectorProfile?.registrationScheme || '';
    const schemeNumber = companyProfile?.registration_number || inspectorProfile?.registrationNumber || '';
    const signature = companyProfile?.signature_data || inspectorProfile?.signatureData || '';
    const company = companyProfile?.company_name || inspectorProfile?.companyName || '';

    return {
      installerName: name,
      installerCompany: company,
      installerQualifications: qualifications,
      installerScheme: scheme,
      installerSchemeNumber: schemeNumber,
      installerSignature: signature,
      installerDate: today
    };
  }, [companyProfile, getDefaultProfile]);

  // ---------------------------------------------------------------------------
  // Load Company Branding
  // ---------------------------------------------------------------------------
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
      companyAccentColor: companyProfile.primary_color || '#f59e0b',
      registrationSchemeLogo: companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || ''
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Check if Saved Details Available
  // ---------------------------------------------------------------------------
  const hasSavedInstallerDetails = useMemo(() => {
    const profile = getDefaultProfile();
    return !!(companyProfile?.inspector_name || profile?.name);
  }, [companyProfile, getDefaultProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Apply Charger Defaults
  // ---------------------------------------------------------------------------
  const applyChargerDefaults = useCallback((charger: EVCharger): ChargerDefaults => {
    const defaultPower = charger.powerOptions[0];
    const defaultPhases = charger.phases[0];

    return {
      chargerMake: charger.make,
      chargerModel: charger.model,
      powerRating: defaultPower,
      phases: defaultPhases,
      ratedCurrent: charger.current,
      socketType: charger.socketType,
      chargerConnection: charger.connection === 'both' ? 'tethered' : charger.connection,
      rcdType: charger.rcdType,
      rcdIntegral: charger.rcdIntegral,
      chargerType: 'Mode3', // Most chargers are Mode 3
      smartChargingEnabled: charger.smartEnabled,
      cableSize: charger.recommendedCable
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Calculate Zs from Ze + R1+R2 with Temperature Correction
  // ---------------------------------------------------------------------------
  const calculateZs = useCallback((
    ze: number,
    r1r2: number,
    applyTempCorrection: boolean = true
  ): ZsCalculation => {
    // Temperature correction factor: 1.2 for 70°C operating temperature
    // Per BS 7671 Appendix 14
    const tempFactor = applyTempCorrection ? 1.2 : 1.0;
    const calculatedZs = ze + (r1r2 * tempFactor);

    return {
      calculatedZs: Math.round(calculatedZs * 100) / 100, // 2 decimal places
      ze,
      r1r2,
      temperatureCorrectionFactor: tempFactor,
      isManual: false
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Lookup Max Zs from BS 7671 Tables
  // ---------------------------------------------------------------------------
  const lookupMaxZs = useCallback((
    deviceType: 'MCB' | 'RCBO' | 'MCCB',
    rating: number,
    curve: string,
    disconnectionTime: DisconnectionTime = '0.4s'
  ): ZsLookupResult | null => {
    // Convert curve to MCBCurve type
    let mcbCurve: MCBCurve;
    switch (curve.toUpperCase()) {
      case 'B':
      case 'TYPE B':
        mcbCurve = 'typeB';
        break;
      case 'C':
      case 'TYPE C':
        mcbCurve = 'typeC';
        break;
      case 'D':
      case 'TYPE D':
        mcbCurve = 'typeD';
        break;
      default:
        mcbCurve = 'typeB'; // Default to Type B
    }

    return getMcbZsLimit(mcbCurve, rating, disconnectionTime);
  }, []);

  // ---------------------------------------------------------------------------
  // Validate Test Results
  // ---------------------------------------------------------------------------
  const validateTestResults = useCallback((testResults: any, maxZs?: number): TestResultValidation[] => {
    const validations: TestResultValidation[] = [];

    // Zs Validation
    if (testResults.zs !== undefined && testResults.zs !== '') {
      const zs = parseFloat(testResults.zs);
      if (!isNaN(zs) && maxZs) {
        const compliance = checkZsCompliance(zs, maxZs);
        validations.push({
          field: 'zs',
          value: zs,
          isValid: compliance.compliant,
          status: compliance.compliant ? 'pass' : 'fail',
          message: compliance.compliant
            ? `PASS: ${zs}Ω ≤ ${maxZs}Ω (${compliance.marginPercent.toFixed(0)}% margin)`
            : `FAIL: ${zs}Ω > max ${maxZs}Ω`,
          limit: maxZs
        });
      }
    }

    // Insulation Resistance Validation (≥ 1MΩ)
    if (testResults.insulationResistance !== undefined && testResults.insulationResistance !== '') {
      const ir = testResults.insulationResistance.toString().replace('>', '').trim();
      const irValue = parseFloat(ir);
      if (!isNaN(irValue)) {
        const isPass = irValue >= 1;
        validations.push({
          field: 'insulationResistance',
          value: irValue,
          isValid: isPass,
          status: isPass ? 'pass' : 'fail',
          message: isPass ? `PASS: ${irValue}MΩ ≥ 1MΩ` : `FAIL: ${irValue}MΩ < 1MΩ minimum`,
          limit: 1
        });
      }
    }

    // RCD Trip Time @ IΔn (≤ 300ms)
    if (testResults.rcdTripTime !== undefined && testResults.rcdTripTime !== '') {
      const tripTime = parseFloat(testResults.rcdTripTime);
      if (!isNaN(tripTime)) {
        const isPass = tripTime <= 300;
        validations.push({
          field: 'rcdTripTime',
          value: tripTime,
          isValid: isPass,
          status: isPass ? 'pass' : 'fail',
          message: isPass ? `PASS: ${tripTime}ms ≤ 300ms` : `FAIL: ${tripTime}ms > 300ms max`,
          limit: 300
        });
      }
    }

    // RCD Trip Time @ 5×IΔn (≤ 40ms)
    if (testResults.rcdTripTimeX5 !== undefined && testResults.rcdTripTimeX5 !== '') {
      const tripTimeX5 = parseFloat(testResults.rcdTripTimeX5);
      if (!isNaN(tripTimeX5)) {
        const isPass = tripTimeX5 <= 40;
        validations.push({
          field: 'rcdTripTimeX5',
          value: tripTimeX5,
          isValid: isPass,
          status: isPass ? 'pass' : 'fail',
          message: isPass ? `PASS: ${tripTimeX5}ms ≤ 40ms` : `FAIL: ${tripTimeX5}ms > 40ms max`,
          limit: 40
        });
      }
    }

    // Polarity Validation
    if (testResults.polarity !== undefined && testResults.polarity !== '') {
      const isPass = testResults.polarity === 'correct';
      validations.push({
        field: 'polarity',
        value: testResults.polarity,
        isValid: isPass,
        status: isPass ? 'pass' : 'fail',
        message: isPass ? 'PASS: Polarity correct' : 'FAIL: Polarity incorrect'
      });
    }

    return validations;
  }, []);

  // ---------------------------------------------------------------------------
  // Check DNO Requirements
  // ---------------------------------------------------------------------------
  const checkDNORequirements = useCallback((powerKW: number, phases: number = 1): DNORequirement => {
    // G98: > 3.68kW (16A single phase) requires notification
    // G99: > 11kW requires full application

    if (powerKW > 11) {
      return {
        required: true,
        type: 'G99',
        message: 'G99 Application Required',
        details: `At ${powerKW}kW (>${phases === 3 ? '16A per phase' : '48A'}), this installation requires a G99 application to the DNO before installation. This typically requires approval which may take several weeks.`
      };
    }

    if (powerKW > 3.68) {
      return {
        required: true,
        type: 'G98',
        message: 'G98 Notification Required',
        details: `At ${powerKW}kW (>16A), this installation requires G98 notification to the DNO within 28 days of commissioning. This is a notification only - no approval is needed.`
      };
    }

    return {
      required: false,
      type: 'none',
      message: 'No DNO Notification Required',
      details: `At ${powerKW}kW (≤16A), this installation does not require DNO notification under G98/G99.`
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Power / Current Conversion Helpers
  // ---------------------------------------------------------------------------
  const powerToCurrent = useCallback((powerKW: number, phases: number): number => {
    return calculateCurrentFromPower(powerKW, phases);
  }, []);

  const currentToPower = useCallback((currentA: number, phases: number): number => {
    return calculatePowerFromCurrent(currentA, phases);
  }, []);

  // ---------------------------------------------------------------------------
  // Charger Search Helper
  // ---------------------------------------------------------------------------
  const searchChargersQuery = useCallback((query: string) => {
    return searchChargers(query);
  }, []);

  const findChargerByMakeModel = useCallback((make: string, model: string) => {
    return findCharger(make, model);
  }, []);

  // ---------------------------------------------------------------------------
  // Return Hook Interface
  // ---------------------------------------------------------------------------
  return {
    // State
    loading: companyLoading,
    hasSavedInstallerDetails,
    hasSavedCompanyBranding,

    // Installer & Company Loading
    loadInstallerDetails,
    loadCompanyBranding,

    // Charger Database
    applyChargerDefaults,
    searchChargers: searchChargersQuery,
    findCharger: findChargerByMakeModel,

    // Calculations
    calculateZs,
    lookupMaxZs,
    powerToCurrent,
    currentToPower,

    // Validation
    validateTestResults,
    checkDNORequirements
  };
}

export default useEVChargingSmartForm;
