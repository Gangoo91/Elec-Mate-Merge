/**
 * useMinorWorksSmartForm Hook
 *
 * Provides smart auto-fill from Business Settings for Minor Works certificates.
 * Auto-fills electrician details, test equipment, and company information.
 */

import { useCallback, useMemo, useEffect, useState } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

// ============================================================================
// Types
// ============================================================================

export interface ElectricianDetails {
  electricianName: string;
  forAndOnBehalfOf: string;
  position: string;
  qualificationLevel: string;
  schemeProvider: string;
  registrationNumber: string;
  contractorAddress: string;
  electricianPhone: string;
  electricianEmail: string;
  signature: string;
  signatureDate: string;
}

export interface TestEquipmentDetails {
  testEquipmentModel: string;
  testEquipmentSerial: string;
  testEquipmentCalDate: string;
}

export interface ContractorDetails {
  contractorName: string;
  contractorAddress: string;
  contractorPhone: string;
  contractorEmail: string;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useMinorWorksSmartForm() {
  const { companyProfile, loading: companyLoading, refetch } = useCompanyProfile();
  const [hasAppliedDefaults, setHasAppliedDefaults] = useState(false);

  // ---------------------------------------------------------------------------
  // Load Electrician Details from Business Settings
  // ---------------------------------------------------------------------------
  const loadElectricianDetails = useCallback((): ElectricianDetails | null => {
    if (!companyProfile) return null;

    const today = new Date().toISOString().split('T')[0];

    // Build qualifications string from array
    const qualifications = companyProfile.inspector_qualifications?.length
      ? companyProfile.inspector_qualifications[0] // Use first qualification as level
      : '';

    // Build full address
    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      electricianName: companyProfile.inspector_name || '',
      forAndOnBehalfOf: companyProfile.company_name || '',
      position: 'Qualified Electrician', // Default position
      qualificationLevel: qualifications,
      schemeProvider: companyProfile.registration_scheme || '',
      registrationNumber: companyProfile.registration_number || '',
      contractorAddress: fullAddress,
      electricianPhone: companyProfile.company_phone || '',
      electricianEmail: companyProfile.company_email || '',
      signature: companyProfile.signature_data || '',
      signatureDate: today
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Load Test Equipment from Business Settings
  // ---------------------------------------------------------------------------
  const loadTestEquipment = useCallback((): TestEquipmentDetails | null => {
    if (!companyProfile?.testing_instruments?.length) return null;

    // Find the multifunction tester (most commonly used for Minor Works)
    const multifunction = companyProfile.testing_instruments.find(
      i => i.instrument_type === 'multifunction'
    );

    // Fall back to first instrument if no multifunction found
    const instrument = multifunction || companyProfile.testing_instruments[0];

    if (!instrument) return null;

    return {
      testEquipmentModel: `${instrument.make} ${instrument.model}`.trim(),
      testEquipmentSerial: instrument.serial_number || '',
      testEquipmentCalDate: instrument.calibration_date || ''
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Load Contractor Details from Business Settings
  // ---------------------------------------------------------------------------
  const loadContractorDetails = useCallback((): ContractorDetails | null => {
    if (!companyProfile) return null;

    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      contractorName: companyProfile.company_name || '',
      contractorAddress: fullAddress,
      contractorPhone: companyProfile.company_phone || '',
      contractorEmail: companyProfile.company_email || ''
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Get All Available Instruments
  // ---------------------------------------------------------------------------
  const getAvailableInstruments = useCallback(() => {
    if (!companyProfile?.testing_instruments?.length) return [];

    return companyProfile.testing_instruments.map(instrument => ({
      value: `${instrument.make} ${instrument.model}`.trim(),
      label: `${instrument.make} ${instrument.model}`.trim(),
      serialNumber: instrument.serial_number,
      calibrationDate: instrument.calibration_date,
      type: instrument.instrument_type
    }));
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Check if Saved Details Available
  // ---------------------------------------------------------------------------
  const hasSavedElectricianDetails = useMemo(() => {
    return !!(companyProfile?.inspector_name);
  }, [companyProfile]);

  const hasSavedTestEquipment = useMemo(() => {
    return !!(companyProfile?.testing_instruments?.length);
  }, [companyProfile]);

  const hasSavedContractorDetails = useMemo(() => {
    return !!(companyProfile?.company_name);
  }, [companyProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Load Company Branding for PDF
  // ---------------------------------------------------------------------------
  const loadCompanyBranding = useCallback(() => {
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
  // Auto-Apply Defaults on Form Mount
  // ---------------------------------------------------------------------------
  const getInitialFormDefaults = useCallback(() => {
    const defaults: Record<string, any> = {};

    // Auto-fill contractor details
    const contractor = loadContractorDetails();
    if (contractor) {
      defaults.contractorName = contractor.contractorName;
      defaults.contractorAddress = contractor.contractorAddress;
      defaults.contractorPhone = contractor.contractorPhone;
      defaults.contractorEmail = contractor.contractorEmail;
    }

    // Auto-fill test equipment
    const equipment = loadTestEquipment();
    if (equipment) {
      defaults.testEquipmentModel = equipment.testEquipmentModel;
      defaults.testEquipmentSerial = equipment.testEquipmentSerial;
      defaults.testEquipmentCalDate = equipment.testEquipmentCalDate;
    }

    // Auto-fill electrician details (for declaration)
    const electrician = loadElectricianDetails();
    if (electrician) {
      defaults.electricianName = electrician.electricianName;
      defaults.forAndOnBehalfOf = electrician.forAndOnBehalfOf;
      defaults.position = electrician.position;
      defaults.qualificationLevel = electrician.qualificationLevel;
      defaults.schemeProvider = electrician.schemeProvider;
      defaults.registrationNumber = electrician.registrationNumber;
      defaults.contractorAddress = electrician.contractorAddress;
      defaults.electricianPhone = electrician.electricianPhone;
      defaults.electricianEmail = electrician.electricianEmail;
      defaults.signature = electrician.signature;
      defaults.signatureDate = electrician.signatureDate;
    }

    // Set today's date for certificate
    defaults.certificateDate = new Date().toISOString().split('T')[0];

    return defaults;
  }, [loadContractorDetails, loadTestEquipment, loadElectricianDetails]);

  // ---------------------------------------------------------------------------
  // Apply Defaults to Form
  // ---------------------------------------------------------------------------
  const applySmartDefaults = useCallback((
    currentFormData: Record<string, any>,
    onUpdate: (field: string, value: any) => void
  ) => {
    const defaults = getInitialFormDefaults();

    // Only apply defaults if fields are empty
    Object.entries(defaults).forEach(([field, value]) => {
      if (value && !currentFormData[field]) {
        onUpdate(field, value);
      }
    });

    setHasAppliedDefaults(true);
  }, [getInitialFormDefaults]);

  // ---------------------------------------------------------------------------
  // Return Hook Interface
  // ---------------------------------------------------------------------------
  return {
    // State
    loading: companyLoading,
    hasAppliedDefaults,
    hasSavedElectricianDetails,
    hasSavedTestEquipment,
    hasSavedContractorDetails,
    hasSavedCompanyBranding,

    // Loaders
    loadElectricianDetails,
    loadTestEquipment,
    loadContractorDetails,
    loadCompanyBranding,
    getAvailableInstruments,
    getInitialFormDefaults,

    // Actions
    applySmartDefaults,
    refetchProfile: refetch
  };
}

export default useMinorWorksSmartForm;
