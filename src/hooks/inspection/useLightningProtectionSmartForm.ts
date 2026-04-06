/**
 * useLightningProtectionSmartForm Hook
 * Auto pass/fail thresholds, next-test-due calculation, spacing validation
 */

import { useCallback, useMemo } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { EARTH_RESISTANCE_THRESHOLD, CONTINUITY_THRESHOLD, BONDING_THRESHOLD, TEST_INTERVAL, DOWN_CONDUCTOR_SPACING, LPSClass } from '@/types/lightning-protection';

export function useLightningProtectionSmartForm() {
  const { companyProfile, loading: companyLoading } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();

  const loadTesterDetails = useCallback(() => {
    const profile = getDefaultProfile();
    const name = companyProfile?.inspector_name || profile?.name;
    if (!name) return null;
    return {
      testerName: name,
      contractorCompany: companyProfile?.company_name || profile?.companyName || '',
      testerQualifications: companyProfile?.inspector_qualifications?.join(', ') || profile?.qualifications?.join(', ') || '',
      inspectorSignature: companyProfile?.signature_data || profile?.signatureData || '',
      inspectorDate: new Date().toISOString().split('T')[0],
    };
  }, [companyProfile, getDefaultProfile]);

  const loadCompanyBranding = useCallback(() => {
    if (!companyProfile) return null;
    const fullAddress = companyProfile.company_postcode ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}` : companyProfile.company_address || '';
    return {
      companyLogo: companyProfile.logo_data_url || companyProfile.logo_url || '',
      companyName: companyProfile.company_name || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile.company_phone || '',
      companyEmail: companyProfile.company_email || '',
      registrationSchemeLogo: companyProfile.scheme_logo_data_url || companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
      registrationNumber: companyProfile.registration_number || '',
    };
  }, [companyProfile]);

  const hasSavedTesterDetails = useMemo(() => {
    const p = getDefaultProfile();
    return !!(companyProfile?.inspector_name || p?.name);
  }, [companyProfile, getDefaultProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  // Auto pass/fail for earth electrode resistance
  const isEarthResistancePass = useCallback((resistance: string): 'pass' | 'fail' | '' => {
    const v = parseFloat(resistance);
    if (isNaN(v)) return '';
    return v <= EARTH_RESISTANCE_THRESHOLD ? 'pass' : 'fail';
  }, []);

  // Auto pass/fail for continuity
  const isContinuityPass = useCallback((resistance: string): 'pass' | 'fail' | '' => {
    const v = parseFloat(resistance);
    if (isNaN(v)) return '';
    return v < CONTINUITY_THRESHOLD ? 'pass' : 'fail';
  }, []);

  // Auto pass/fail for bonding
  const isBondingPass = useCallback((resistance: string): 'pass' | 'fail' | '' => {
    const v = parseFloat(resistance);
    if (isNaN(v)) return '';
    return v <= BONDING_THRESHOLD ? 'pass' : 'fail';
  }, []);

  // Calculate next inspection due date from LPS class
  const calculateNextInspectionDue = useCallback((inspectionDate: string, lpsClass: LPSClass | ''): string => {
    if (!inspectionDate || !lpsClass) return '';
    const interval = TEST_INTERVAL[lpsClass] || 4;
    const d = new Date(inspectionDate);
    if (isNaN(d.getTime())) return '';
    d.setFullYear(d.getFullYear() + interval);
    return d.toISOString().split('T')[0];
  }, []);

  // Calculate next VISUAL inspection due (always 1 year regardless of class)
  const calculateNextVisualDue = useCallback((inspectionDate: string): string => {
    if (!inspectionDate) return '';
    const d = new Date(inspectionDate);
    if (isNaN(d.getTime())) return '';
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  // Validate down conductor spacing against class requirements
  const validateDownConductorSpacing = useCallback((spacing: string, lpsClass: LPSClass | ''): { valid: boolean; required: number; message: string } => {
    if (!spacing || !lpsClass) return { valid: true, required: 0, message: '' };
    const required = DOWN_CONDUCTOR_SPACING[lpsClass] || 20;
    const actual = parseFloat(spacing);
    if (isNaN(actual)) return { valid: true, required, message: '' };
    const valid = actual <= required;
    return {
      valid,
      required,
      message: valid ? `PASS: ${actual}m ≤ ${required}m (Class ${lpsClass})` : `FAIL: ${actual}m > ${required}m max for Class ${lpsClass}`,
    };
  }, []);

  return {
    loading: companyLoading,
    hasSavedTesterDetails,
    hasSavedCompanyBranding,
    loadTesterDetails,
    loadCompanyBranding,
    isEarthResistancePass,
    isContinuityPass,
    isBondingPass,
    calculateNextInspectionDue,
    calculateNextVisualDue,
    validateDownConductorSpacing,
  };
}

export default useLightningProtectionSmartForm;
