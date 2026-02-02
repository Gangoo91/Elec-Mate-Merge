/**
 * useEmergencyLightingSmartForm Hook
 *
 * Provides smart auto-fill, BS 5266/EN 1838 compliance validation, and calculations
 * for Emergency Lighting certificates. Integrates with company profiles,
 * luminaire database, and compliance data.
 */

import { useCallback, useMemo } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import {
  EmergencyLuminaire,
  searchLuminaires,
  findLuminaire,
  findLuminaireById,
  getLuminairesGroupedByMake,
  getManufacturers,
} from '@/data/emergencyLuminaireDatabase';
import {
  LUX_REQUIREMENTS,
  validateLuxReading,
  validateBatteryCondition,
  validateDuration,
  isTestOverdue,
  calculateNextTestDate,
  getDurationRequirement,
  getPremisesGuidance,
  suggestDefectPriority,
  ZoneCategory,
  OccupancyType,
  ValidationResult,
} from '@/data/emergencyLightingCompliance';

// ============================================================================
// Types
// ============================================================================

export interface TesterDetails {
  testerName: string;
  testerCompany: string;
  testerQualifications: string;
  testerSignature: string;
  testerDate: string;
}

export interface CompanyBranding {
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyAccentColor: string;
}

export interface LuminaireDefaults {
  make: string;
  model: string;
  luminaireType: string;
  category: string;
  wattage: number;
  batteryType: string;
  ratedDuration: number;
  maintained: boolean;
  selfTest: boolean;
  ipRating: string;
  lightOutput?: number;
}

export interface TestResultValidation {
  field: string;
  value: number | string | boolean;
  isValid: boolean;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  reference?: string;
}

export interface TestDates {
  nextMonthlyTest: Date;
  nextAnnualTest: Date;
  monthlyOverdue: boolean;
  annualOverdue: boolean;
  daysUntilMonthly: number;
  daysUntilAnnual: number;
}

export interface DurationGuidance {
  title: string;
  content: string;
  duration: 60 | 180;
  reference: string;
}

export interface DefectSuggestion {
  priority: 'immediate' | '7-days' | '28-days' | 'recommendation';
  reason: string;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useEmergencyLightingSmartForm() {
  const { companyProfile, loading: companyLoading } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();

  // ---------------------------------------------------------------------------
  // Load Tester Details from Business Settings / Inspector Profile
  // ---------------------------------------------------------------------------
  const loadTesterDetails = useCallback((): TesterDetails | null => {
    const inspectorProfile = getDefaultProfile();
    const today = new Date().toISOString().split('T')[0];

    // Priority: Company Profile > Inspector Profile
    const name = companyProfile?.inspector_name || inspectorProfile?.name;
    if (!name) return null;

    const qualifications = companyProfile?.inspector_qualifications?.length
      ? companyProfile.inspector_qualifications.join(', ')
      : inspectorProfile?.qualifications?.join(', ') || '';

    const signature = companyProfile?.signature_data || inspectorProfile?.signatureData || '';
    const company = companyProfile?.company_name || inspectorProfile?.companyName || '';

    return {
      testerName: name,
      testerCompany: company,
      testerQualifications: qualifications,
      testerSignature: signature,
      testerDate: today
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
      companyAccentColor: companyProfile.primary_color || '#f59e0b'
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Check if Saved Details Available
  // ---------------------------------------------------------------------------
  const hasSavedTesterDetails = useMemo(() => {
    const profile = getDefaultProfile();
    return !!(companyProfile?.inspector_name || profile?.name);
  }, [companyProfile, getDefaultProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Apply Luminaire Defaults from Database
  // ---------------------------------------------------------------------------
  const applyLuminaireDefaults = useCallback((luminaire: EmergencyLuminaire): LuminaireDefaults => {
    return {
      make: luminaire.make,
      model: luminaire.model,
      luminaireType: luminaire.luminaireType,
      category: luminaire.category,
      wattage: luminaire.wattage,
      batteryType: luminaire.batteryType,
      ratedDuration: luminaire.ratedDuration,
      maintained: luminaire.maintained,
      selfTest: luminaire.selfTest,
      ipRating: luminaire.ipRating,
      lightOutput: luminaire.lightOutput
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Luminaire Search Helpers
  // ---------------------------------------------------------------------------
  const searchLuminairesQuery = useCallback((query: string) => {
    return searchLuminaires(query);
  }, []);

  const findLuminaireByMakeModel = useCallback((make: string, model: string) => {
    return findLuminaire(make, model);
  }, []);

  const findLuminaireByIdQuery = useCallback((id: string) => {
    return findLuminaireById(id);
  }, []);

  const getLuminairesGrouped = useCallback(() => {
    return getLuminairesGroupedByMake();
  }, []);

  const getManufacturerList = useCallback(() => {
    return getManufacturers();
  }, []);

  // ---------------------------------------------------------------------------
  // BS EN 1838 Lux Validation
  // ---------------------------------------------------------------------------
  const validateLux = useCallback((
    lux: number,
    category: ZoneCategory
  ): ValidationResult => {
    return validateLuxReading(lux, category);
  }, []);

  const getLuxRequirement = useCallback((category: ZoneCategory) => {
    return LUX_REQUIREMENTS[category] || null;
  }, []);

  // ---------------------------------------------------------------------------
  // Validate Test Results
  // ---------------------------------------------------------------------------
  const validateTestResults = useCallback((testResults: {
    allLuminairesOperational?: boolean;
    chargingIndicatorsNormal?: boolean;
    batteryCondition?: string;
    durationAchieved?: number;
    ratedDuration?: number;
    luxReadings?: Array<{ lux: number; category: ZoneCategory }>;
  }): TestResultValidation[] => {
    const validations: TestResultValidation[] = [];

    // Functional test - all luminaires operational
    if (testResults.allLuminairesOperational !== undefined) {
      validations.push({
        field: 'allLuminairesOperational',
        value: testResults.allLuminairesOperational,
        isValid: testResults.allLuminairesOperational === true,
        status: testResults.allLuminairesOperational ? 'pass' : 'fail',
        message: testResults.allLuminairesOperational
          ? 'PASS: All luminaires operational'
          : 'FAIL: One or more luminaires not operational'
      });
    }

    // Charging indicators
    if (testResults.chargingIndicatorsNormal !== undefined) {
      validations.push({
        field: 'chargingIndicatorsNormal',
        value: testResults.chargingIndicatorsNormal,
        isValid: testResults.chargingIndicatorsNormal === true,
        status: testResults.chargingIndicatorsNormal ? 'pass' : 'fail',
        message: testResults.chargingIndicatorsNormal
          ? 'PASS: Charging indicators normal'
          : 'FAIL: Charging indicator fault detected'
      });
    }

    // Battery condition
    if (testResults.batteryCondition) {
      const batteryValidation = validateBatteryCondition(testResults.batteryCondition);
      validations.push({
        field: 'batteryCondition',
        value: testResults.batteryCondition,
        isValid: batteryValidation.valid,
        status: batteryValidation.status,
        message: batteryValidation.message
      });
    }

    // Duration test
    if (testResults.durationAchieved !== undefined && testResults.ratedDuration !== undefined) {
      const durationValid = testResults.durationAchieved >= testResults.ratedDuration;
      validations.push({
        field: 'durationAchieved',
        value: testResults.durationAchieved,
        isValid: durationValid,
        status: durationValid ? 'pass' : 'fail',
        message: durationValid
          ? `PASS: Duration ${testResults.durationAchieved} min meets ${testResults.ratedDuration} min rating`
          : `FAIL: Duration ${testResults.durationAchieved} min below ${testResults.ratedDuration} min rating`
      });
    }

    // Lux readings
    if (testResults.luxReadings && testResults.luxReadings.length > 0) {
      testResults.luxReadings.forEach((reading, index) => {
        const luxValidation = validateLuxReading(reading.lux, reading.category);
        validations.push({
          field: `luxReading_${index}`,
          value: reading.lux,
          isValid: luxValidation.valid,
          status: luxValidation.status,
          message: luxValidation.message,
          reference: luxValidation.reference
        });
      });
    }

    return validations;
  }, []);

  // ---------------------------------------------------------------------------
  // Calculate Next Test Dates
  // ---------------------------------------------------------------------------
  const calculateTestDates = useCallback((
    lastMonthlyTest: Date | string | null,
    lastAnnualTest: Date | string | null
  ): TestDates => {
    const now = new Date();

    // Monthly test dates
    let nextMonthlyTest: Date;
    let monthlyOverdue = false;
    let daysUntilMonthly = 0;

    if (lastMonthlyTest) {
      nextMonthlyTest = calculateNextTestDate(lastMonthlyTest, 'monthly');
      const monthlyStatus = isTestOverdue(lastMonthlyTest, 'monthly');
      monthlyOverdue = monthlyStatus.overdue;
      daysUntilMonthly = monthlyOverdue
        ? -monthlyStatus.daysOverdue
        : Math.ceil((nextMonthlyTest.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      nextMonthlyTest = now;
      monthlyOverdue = true;
      daysUntilMonthly = 0;
    }

    // Annual test dates
    let nextAnnualTest: Date;
    let annualOverdue = false;
    let daysUntilAnnual = 0;

    if (lastAnnualTest) {
      nextAnnualTest = calculateNextTestDate(lastAnnualTest, 'annual');
      const annualStatus = isTestOverdue(lastAnnualTest, 'annual');
      annualOverdue = annualStatus.overdue;
      daysUntilAnnual = annualOverdue
        ? -annualStatus.daysOverdue
        : Math.ceil((nextAnnualTest.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      nextAnnualTest = now;
      annualOverdue = true;
      daysUntilAnnual = 0;
    }

    return {
      nextMonthlyTest,
      nextAnnualTest,
      monthlyOverdue,
      annualOverdue,
      daysUntilMonthly,
      daysUntilAnnual
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Get Duration Requirement for Premises Type
  // ---------------------------------------------------------------------------
  const getDurationForPremises = useCallback((premisesType: string): DurationGuidance => {
    return getPremisesGuidance(premisesType);
  }, []);

  // ---------------------------------------------------------------------------
  // Suggest Defect Priority
  // ---------------------------------------------------------------------------
  const suggestDefectPriorityFromDescription = useCallback((
    defectDescription: string
  ): DefectSuggestion => {
    return suggestDefectPriority(defectDescription);
  }, []);

  // ---------------------------------------------------------------------------
  // Validate Duration Against Premises Type
  // ---------------------------------------------------------------------------
  const validateDurationForPremises = useCallback((
    durationMinutes: number,
    premisesType: string
  ): ValidationResult => {
    const requirement = getDurationRequirement(premisesType);
    const occupancyType: OccupancyType = requirement.duration === 180
      ? 'sleeping-risk'
      : 'normal-occupancy';
    return validateDuration(durationMinutes, occupancyType);
  }, []);

  // ---------------------------------------------------------------------------
  // Format Date for Display
  // ---------------------------------------------------------------------------
  const formatDate = useCallback((date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Generate Certificate Number
  // ---------------------------------------------------------------------------
  const generateCertificateNumber = useCallback((prefix: string = 'EL'): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${year}${month}${day}-${random}`;
  }, []);

  // ---------------------------------------------------------------------------
  // Return Hook Interface
  // ---------------------------------------------------------------------------
  return {
    // State
    loading: companyLoading,
    hasSavedTesterDetails,
    hasSavedCompanyBranding,

    // Tester & Company Loading
    loadTesterDetails,
    loadCompanyBranding,

    // Luminaire Database
    applyLuminaireDefaults,
    searchLuminaires: searchLuminairesQuery,
    findLuminaire: findLuminaireByMakeModel,
    findLuminaireById: findLuminaireByIdQuery,
    getLuminairesGrouped,
    getManufacturers: getManufacturerList,

    // BS EN 1838 Validation
    validateLux,
    getLuxRequirement,

    // Test Result Validation
    validateTestResults,

    // Test Date Calculations
    calculateTestDates,

    // Duration Requirements
    getDurationForPremises,
    validateDurationForPremises,

    // Defect Management
    suggestDefectPriority: suggestDefectPriorityFromDescription,

    // Utilities
    formatDate,
    generateCertificateNumber,
  };
}

export default useEmergencyLightingSmartForm;
