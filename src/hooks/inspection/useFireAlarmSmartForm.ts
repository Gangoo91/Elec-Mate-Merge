/**
 * useFireAlarmSmartForm Hook
 *
 * Provides smart form functionality for Fire Alarm certificates:
 * - Load installer/commissioner details from profile
 * - Auto-fill panel specifications from equipment database
 * - Validate sound readings against BS 5839-1 requirements
 * - Calculate next service dates
 * - Suggest system category based on premises type
 */

import { useCallback, useMemo } from 'react';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import {
  findPanelById,
  searchPanels,
  getPanelDefaults,
  getPanelManufacturers,
  getPanelsGroupedByManufacturer,
  FireAlarmPanel
} from '@/data/fireAlarmEquipmentDatabase';
import {
  validateSoundLevel,
  calculateNextServiceDates,
  suggestSystemCategory,
  suggestDefectSeverity,
  getMinDbRequired,
  formatDateUK,
  SOUND_LEVEL_REQUIREMENTS,
  SYSTEM_CATEGORIES,
  type AreaType,
  type SystemCategoryType,
  type ValidationResult
} from '@/data/fireAlarmCompliance';

export interface SmartFormProfile {
  name: string;
  company: string;
  qualifications: string;
  signature?: string;
  date: string;
}

export interface SoundValidationResult {
  isValid: boolean;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  minRequired: number;
  reference?: string;
}

export interface ServiceDates {
  nextService: string;      // 6-monthly
  nextInspection: string;   // Annual
  nextServiceDate: Date;
  nextInspectionDate: Date;
}

export interface CategorySuggestion {
  recommended: SystemCategoryType;
  minimum: SystemCategoryType;
  reason: string;
  description: string;
  coverage: string;
}

export const useFireAlarmSmartForm = () => {
  const { getDefaultProfile, profiles } = useInspectorProfiles();
  const { companyProfile } = useCompanyProfile();

  /**
   * Load installer details from default profile
   */
  const loadInstallerDetails = useCallback((): SmartFormProfile | null => {
    const profile = getDefaultProfile();
    if (!profile) return null;

    const qualifications = Array.isArray(profile.qualifications)
      ? profile.qualifications.join(', ')
      : profile.qualifications || '';

    return {
      name: profile.name || '',
      company: profile.companyName || companyProfile?.company_name || '',
      qualifications,
      signature: profile.signatureData,
      date: new Date().toISOString().split('T')[0]
    };
  }, [getDefaultProfile, companyProfile]);

  /**
   * Load commissioner details from default profile
   */
  const loadCommissionerDetails = useCallback((): SmartFormProfile | null => {
    // Same as installer - typically the same person
    return loadInstallerDetails();
  }, [loadInstallerDetails]);

  /**
   * Load company branding details for PDF
   */
  const loadCompanyBranding = useCallback(() => {
    const profile = getDefaultProfile();

    // Build full address
    const fullAddress = companyProfile?.company_postcode
      ? `${companyProfile?.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile?.company_address || profile?.companyAddress || '';

    return {
      companyName: companyProfile?.company_name || profile?.companyName || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile?.company_phone || profile?.companyPhone || '',
      companyEmail: companyProfile?.company_email || profile?.companyEmail || '',
      companyWebsite: companyProfile?.website || profile?.companyWebsite || '',
      // CRITICAL: Use logo_data_url first (for PDF embedding), then logo_url as fallback
      companyLogo: companyProfile?.logo_data_url || companyProfile?.logo_url || profile?.companyLogo || '',
      accentColor: companyProfile?.primary_color || '#dc2626'
    };
  }, [getDefaultProfile, companyProfile]);

  /**
   * Check if company branding is available
   */
  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  /**
   * Apply panel defaults when a panel is selected
   * Returns the default values to auto-fill in the form
   */
  const applyPanelDefaults = useCallback((panelId: string): {
    networkType: string;
    zonesCount: number;
    loopCapacity: number;
    protocol: string;
    panel: FireAlarmPanel | null;
  } | null => {
    const defaults = getPanelDefaults(panelId);
    const panel = findPanelById(panelId);

    if (!defaults || !panel) return null;

    return {
      ...defaults,
      panel
    };
  }, []);

  /**
   * Search for panels by query
   */
  const searchPanelsByQuery = useCallback((query: string): FireAlarmPanel[] => {
    return searchPanels(query);
  }, []);

  /**
   * Get all panel manufacturers
   */
  const panelManufacturers = useMemo(() => {
    return getPanelManufacturers();
  }, []);

  /**
   * Get panels grouped by manufacturer
   */
  const panelsGroupedByManufacturer = useMemo(() => {
    return getPanelsGroupedByManufacturer();
  }, []);

  /**
   * Validate a sound level reading against BS 5839-1
   */
  const validateSoundReading = useCallback((
    dbReading: number | string,
    areaType: AreaType = 'general',
    ambientNoise?: number
  ): SoundValidationResult => {
    const db = typeof dbReading === 'string' ? parseFloat(dbReading) : dbReading;

    if (isNaN(db) || db <= 0) {
      return {
        isValid: false,
        status: 'warning',
        message: 'Enter a valid dB reading',
        minRequired: getMinDbRequired(areaType)
      };
    }

    const result = validateSoundLevel(db, areaType, ambientNoise);

    return {
      isValid: result.valid,
      status: result.status,
      message: result.message,
      minRequired: getMinDbRequired(areaType),
      reference: result.reference
    };
  }, []);

  /**
   * Get minimum required dB for an area type
   */
  const getMinimumDbRequired = useCallback((areaType: AreaType): number => {
    return getMinDbRequired(areaType);
  }, []);

  /**
   * Calculate next service dates from commissioning date
   * BS 5839-1 recommends 6-monthly service visits
   */
  const calculateServiceDates = useCallback((commissioningDate: string | Date): ServiceDates => {
    if (!commissioningDate) {
      const now = new Date();
      return {
        nextService: '',
        nextInspection: '',
        nextServiceDate: now,
        nextInspectionDate: now
      };
    }

    const dates = calculateNextServiceDates(commissioningDate);

    return {
      nextService: dates.formatted.nextSixMonthly,
      nextInspection: dates.formatted.nextAnnual,
      nextServiceDate: dates.nextSixMonthly,
      nextInspectionDate: dates.nextAnnual
    };
  }, []);

  /**
   * Calculate next service date as ISO string for form input
   */
  const calculateNextServiceISO = useCallback((commissioningDate: string | Date): string => {
    if (!commissioningDate) return '';

    const date = typeof commissioningDate === 'string' ? new Date(commissioningDate) : commissioningDate;
    if (isNaN(date.getTime())) return '';

    const nextService = new Date(date);
    nextService.setMonth(nextService.getMonth() + 6);

    return nextService.toISOString().split('T')[0];
  }, []);

  /**
   * Calculate next inspection date as ISO string for form input
   */
  const calculateNextInspectionISO = useCallback((commissioningDate: string | Date): string => {
    if (!commissioningDate) return '';

    const date = typeof commissioningDate === 'string' ? new Date(commissioningDate) : commissioningDate;
    if (isNaN(date.getTime())) return '';

    const nextInspection = new Date(date);
    nextInspection.setFullYear(nextInspection.getFullYear() + 1);

    return nextInspection.toISOString().split('T')[0];
  }, []);

  /**
   * Suggest system category based on premises type
   */
  const suggestCategoryForPremises = useCallback((premisesType: string): CategorySuggestion | null => {
    if (!premisesType) return null;

    const suggestion = suggestSystemCategory(premisesType);
    if (!suggestion) return null;

    return {
      recommended: suggestion.recommended,
      minimum: suggestion.minimum,
      reason: suggestion.reason,
      description: suggestion.categoryDetails.description,
      coverage: suggestion.categoryDetails.coverage
    };
  }, []);

  /**
   * Get system category details
   */
  const getSystemCategoryDetails = useCallback((category: SystemCategoryType) => {
    return SYSTEM_CATEGORIES[category] || null;
  }, []);

  /**
   * Suggest defect severity based on description
   */
  const suggestDefectSeverityFromDescription = useCallback((description: string): {
    severity: 'critical' | 'non-critical' | 'recommendation';
    reason: string;
  } => {
    return suggestDefectSeverity(description);
  }, []);

  /**
   * Check if installer and commissioner details match
   * (to enable "Same as Installer" checkbox)
   */
  const areDetailsMatching = useCallback((
    installer: SmartFormProfile | null,
    commissioner: SmartFormProfile | null
  ): boolean => {
    if (!installer || !commissioner) return false;

    return (
      installer.name === commissioner.name &&
      installer.company === commissioner.company &&
      installer.qualifications === commissioner.qualifications
    );
  }, []);

  /**
   * Copy installer details to commissioner
   */
  const copyInstallerToCommissioner = useCallback((installer: SmartFormProfile): SmartFormProfile => {
    return {
      ...installer,
      date: new Date().toISOString().split('T')[0]
    };
  }, []);

  /**
   * Format date to UK format for display
   */
  const formatToUKDate = useCallback((date: string | Date): string => {
    return formatDateUK(date);
  }, []);

  /**
   * Check if there's a default profile available
   */
  const hasDefaultProfile = useMemo(() => {
    return !!getDefaultProfile();
  }, [getDefaultProfile]);

  /**
   * Get all available profiles
   */
  const availableProfiles = useMemo(() => {
    return profiles;
  }, [profiles]);

  return {
    // Profile loading
    loadInstallerDetails,
    loadCommissionerDetails,
    loadCompanyBranding,
    hasSavedCompanyBranding,
    hasDefaultProfile,
    availableProfiles,

    // Panel database
    applyPanelDefaults,
    searchPanelsByQuery,
    panelManufacturers,
    panelsGroupedByManufacturer,

    // Sound level validation
    validateSoundReading,
    getMinimumDbRequired,

    // Service date calculation
    calculateServiceDates,
    calculateNextServiceISO,
    calculateNextInspectionISO,

    // System category suggestion
    suggestCategoryForPremises,
    getSystemCategoryDetails,

    // Defect severity suggestion
    suggestDefectSeverityFromDescription,

    // Utility functions
    areDetailsMatching,
    copyInstallerToCommissioner,
    formatToUKDate
  };
};

export default useFireAlarmSmartForm;
