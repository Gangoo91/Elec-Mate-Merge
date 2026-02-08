/**
 * Formats EV Charging certificate form data for PDF generation
 * Compliant with BS 7671:2018+A3:2024 and IET CoP 5th Edition
 */

import { EVChargingFormData } from '@/types/ev-charging';

export const formatEVChargingJson = (formData: Partial<EVChargingFormData>) => {
  const get = (key: string, defaultValue: any = ''): string => {
    const value = (formData as any)[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value;
  };

  const getNum = (key: string, defaultValue: number = 0): number => {
    const value = (formData as any)[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  };

  const getBool = (key: string): boolean => {
    const value = (formData as any)[key];
    return value === true || value === 'true';
  };

  const getTestResult = (key: string): string => {
    return formData.testResults?.[key as keyof typeof formData.testResults] ?? '';
  };

  // Safe numeric comparison for test validation
  const safeCompare = (a: string, b: string, comparison: 'lte' | 'gte'): string => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return '';
    if (comparison === 'lte') return numA <= numB ? 'Yes' : 'No';
    return numA >= numB ? 'Yes' : 'No';
  };

  return {
    // Metadata
    metadata: {
      certificate_number: get('certificateNumber'),
      installation_date: get('installationDate'),
      standard: 'BS 7671:2018+A3:2024',
      code_of_practice: 'IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition)',
      section_reference: 'Section 722'
    },

    // Client Details
    client_details: {
      name: get('clientName'),
      address: get('clientAddress'),
      telephone: get('clientTelephone'),
      email: get('clientEmail')
    },

    // Vehicle Details
    vehicle_details: {
      make: get('vehicleMake'),
      model: get('vehicleModel'),
      registration: get('vehicleRegistration')
    },

    // Installation Details
    installation_details: {
      address: get('installationAddress'),
      type: get('installationType'),
      type_display: get('installationType') === 'domestic' ? 'Domestic'
                   : get('installationType') === 'commercial' ? 'Commercial'
                   : get('installationType') === 'public' ? 'Public' : ''
    },

    // Charger Details
    charger_details: {
      make: get('chargerMake'),
      model: get('chargerModel'),
      serial: get('chargerSerial'),
      mode: get('chargerType'),
      connection_type: get('chargerConnection'),
      connection_display: get('chargerConnection') === 'tethered' ? 'Tethered Cable' : 'Socket Outlet',
      power_rating_kw: get('powerRating'),
      rated_current_a: get('ratedCurrent'),
      phases: get('phases'),
      socket_type: get('socketType')
    },

    // Supply Characteristics
    supply_details: {
      voltage: get('supplyVoltage'),
      phases: get('supplyPhases'),
      phases_display: get('supplyPhases') === 'single' ? 'Single Phase' : 'Three Phase',
      earthing_arrangement: get('earthingArrangement'),
      ze: get('ze'),
      pfc: get('prospectiveFaultCurrent'),
      external_loop_impedance: get('externalLoopImpedance')
    },

    // PME Considerations (722.411.4.1)
    pme_details: {
      is_pme: getBool('isPME'),
      is_pme_display: getBool('isPME') ? 'Yes' : 'No',
      earthing_measures: get('pmeEarthingMeasures'),
      earth_electrode_installed: getBool('earthElectrodeInstalled'),
      earth_electrode_installed_display: getBool('earthElectrodeInstalled') ? 'Yes' : 'No',
      earth_electrode_resistance: get('earthElectrodeResistance')
    },

    // Circuit Details
    circuit_details: {
      designation: get('circuitDesignation'),
      cable_type: get('cableType'),
      cable_size_mm2: get('cableSize'),
      cable_length_m: get('cableLength'),
      installation_method: get('installationMethod')
    },

    // Protection Details (722.531.2)
    protection_details: {
      device_type: get('protectionDeviceType'),
      rating_a: get('protectionDeviceRating'),
      curve: get('protectionDeviceCurve'),
      rcd_type: get('rcdType'),
      rcd_rating_ma: get('rcdRating'),
      rcd_integral: getBool('rcdIntegral'),
      rcd_integral_display: getBool('rcdIntegral') ? 'Integral to Charger' : 'Separate RCD'
    },

    // Test Results
    test_results: {
      r1r2: getTestResult('r1r2'),
      r2: getTestResult('r2'),
      zs: getTestResult('zs'),
      max_zs: getTestResult('maxZs'),
      zs_satisfactory: safeCompare(getTestResult('zs'), getTestResult('maxZs'), 'lte'),
      insulation_resistance: getTestResult('insulationResistance'),
      insulation_satisfactory: safeCompare(getTestResult('insulationResistance'), '1', 'gte'),
      polarity: getTestResult('polarity'),
      polarity_display: getTestResult('polarity') === 'correct' ? 'Correct' :
                        getTestResult('polarity') === 'incorrect' ? 'Incorrect' : '',
      rcd_trip_time: getTestResult('rcdTripTime'),
      rcd_trip_time_satisfactory: safeCompare(getTestResult('rcdTripTime'), '300', 'lte'),
      rcd_trip_time_x5: getTestResult('rcdTripTimeX5'),
      rcd_trip_time_x5_satisfactory: safeCompare(getTestResult('rcdTripTimeX5'), '40', 'lte'),
      earth_electrode_ra: getTestResult('earthElectrodeRa'),
      functional_test: getTestResult('functionalTest'),
      functional_test_display: getTestResult('functionalTest') === 'pass' ? 'Pass' :
                               getTestResult('functionalTest') === 'fail' ? 'Fail' : '',
      load_test: getTestResult('loadTest'),
      load_test_display: getTestResult('loadTest') === 'pass' ? 'Pass' :
                         getTestResult('loadTest') === 'fail' ? 'Fail' : '',
      load_test_current: getTestResult('loadTestCurrent')
    },

    // DNO Notification
    dno_notification: {
      required: getBool('dnoNotified') || getBool('g98Notification') || getBool('g99Application'),
      submitted: getBool('dnoNotified'),
      submitted_display: getBool('dnoNotified') ? 'Yes' : 'No',
      date: get('dnoNotificationDate'),
      reference: get('dnoReference'),
      g98_notification: getBool('g98Notification'),
      g98_display: getBool('g98Notification') ? 'Yes' : 'N/A',
      g99_application: getBool('g99Application'),
      g99_display: getBool('g99Application') ? 'Yes' : 'N/A'
    },

    // OZEV Grant Details
    ozev_details: {
      applicable: getBool('ozevGrantApplicable'),
      applicable_display: getBool('ozevGrantApplicable') ? 'Yes' : 'No',
      scheme: get('ozevScheme'),
      scheme_display: get('ozevScheme') === 'EVHS' ? 'Electric Vehicle Homecharge Scheme'
                     : get('ozevScheme') === 'WCS' ? 'Workplace Charging Scheme'
                     : get('ozevScheme') === 'OZEV-flat' ? 'Flat Owner-Occupier Grant' : '',
      reference: get('ozevGrantRef')
    },

    // Smart Functionality
    smart_features: {
      smart_charging_enabled: getBool('smartChargingEnabled'),
      smart_charging_display: getBool('smartChargingEnabled') ? 'Yes' : 'No',
      load_management: getBool('loadManagement'),
      load_management_display: getBool('loadManagement') ? 'Yes' : 'No',
      load_management_type: get('loadManagementType')
    },

    // Handover
    handover: {
      user_instructions_provided: getBool('userInstructionsProvided'),
      user_instructions_display: getBool('userInstructionsProvided') ? 'Yes' : 'No',
      operating_manual_provided: getBool('operatingManualProvided'),
      operating_manual_display: getBool('operatingManualProvided') ? 'Yes' : 'No',
      special_conditions: get('specialConditions')
    },

    // Installer Declaration
    installer: {
      name: get('installerName'),
      company: get('installerCompany'),
      qualifications: get('installerQualifications'),
      scheme: get('installerScheme'),
      scheme_number: get('installerSchemeNumber'),
      signature: get('installerSignature'),
      date: get('installerDate')
    },

    // Compliance
    compliance: {
      bs7671: getBool('bs7671Compliance'),
      bs7671_display: getBool('bs7671Compliance') ? '✓' : '',
      iet_cop: getBool('ietCopCompliance'),
      iet_cop_display: getBool('ietCopCompliance') ? '✓' : '',
      building_regs: getBool('buildingRegsCompliance'),
      building_regs_display: getBool('buildingRegsCompliance') ? '✓' : ''
    },

    // Additional Notes
    additional_notes: get('additionalNotes'),
    special_conditions: get('specialConditions'),

    // Declaration Text (hardcoded for PDF)
    declaration_text: 'I/We certify that this EV charging equipment has been designed, installed, inspected and tested in accordance with BS 7671:2018+A3:2024 and the IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition).',

    // ============================================
    // FLAT COPIES FOR DIRECT TEMPLATE ACCESS
    // ============================================

    // Client (flat)
    client_name: get('clientName'),
    client_address: get('clientAddress'),
    client_telephone: get('clientTelephone'),
    client_email: get('clientEmail'),

    // Vehicle (flat)
    vehicle_make: get('vehicleMake'),
    vehicle_model: get('vehicleModel'),
    vehicle_registration: get('vehicleRegistration'),

    // Installation (flat)
    installation_address: get('installationAddress'),
    installation_type: get('installationType'),
    installation_date: get('installationDate'),

    // Charger (flat)
    charger_make: get('chargerMake'),
    charger_model: get('chargerModel'),
    charger_serial: get('chargerSerial'),
    charger_mode: get('chargerType'),
    charger_connection: get('chargerConnection'),
    power_rating_kw: get('powerRating'),
    rated_current_a: get('ratedCurrent'),
    phases: get('phases'),
    socket_type: get('socketType'),

    // Supply (flat)
    supply_voltage: get('supplyVoltage'),
    supply_phases: get('supplyPhases'),
    earthing_arrangement: get('earthingArrangement'),
    ze: get('ze'),
    prospective_fault_current: get('prospectiveFaultCurrent'),
    external_loop_impedance: get('externalLoopImpedance'),

    // PME (flat)
    is_pme: getBool('isPME'),
    pme_earthing_measures: get('pmeEarthingMeasures'),
    earth_electrode_installed: getBool('earthElectrodeInstalled'),
    earth_electrode_resistance: get('earthElectrodeResistance'),

    // Circuit (flat)
    circuit_designation: get('circuitDesignation'),
    cable_type: get('cableType'),
    cable_size_mm2: get('cableSize'),
    cable_length_m: get('cableLength'),
    installation_method: get('installationMethod'),

    // Protection (flat)
    protection_device_type: get('protectionDeviceType'),
    protection_device_rating_a: get('protectionDeviceRating'),
    protection_device_curve: get('protectionDeviceCurve'),
    rcd_type: get('rcdType'),
    rcd_rating_ma: get('rcdRating'),
    rcd_integral: getBool('rcdIntegral'),

    // OZEV (flat)
    ozev_grant_applicable: getBool('ozevGrantApplicable'),
    ozev_scheme: get('ozevScheme'),
    ozev_grant_ref: get('ozevGrantRef'),

    // DNO (flat)
    dno_notified: getBool('dnoNotified'),
    dno_notification_date: get('dnoNotificationDate'),
    dno_reference: get('dnoReference'),
    g98_notification: getBool('g98Notification'),
    g99_application: getBool('g99Application'),

    // Smart (flat)
    smart_charging_enabled: getBool('smartChargingEnabled'),
    load_management: getBool('loadManagement'),
    load_management_type: get('loadManagementType'),

    // Handover (flat)
    user_instructions_provided: getBool('userInstructionsProvided'),
    operating_manual_provided: getBool('operatingManualProvided'),

    // Installer (flat)
    installer_name: get('installerName'),
    installer_company: get('installerCompany'),
    installer_qualifications: get('installerQualifications'),
    installer_scheme: get('installerScheme'),
    installer_scheme_number: get('installerSchemeNumber'),
    installer_signature: get('installerSignature'),
    installer_date: get('installerDate'),

    // Compliance (flat)
    bs7671_compliance: getBool('bs7671Compliance'),
    iet_cop_compliance: getBool('ietCopCompliance'),
    building_regs_compliance: getBool('buildingRegsCompliance'),

    // Certificate
    certificate_number: get('certificateNumber'),

    // ============================================
    // COMPANY BRANDING (from settings)
    // ============================================
    company_details: {
      company_name: get('companyName'),
      company_address: get('companyAddress'),
      company_phone: get('companyPhone'),
      company_email: get('companyEmail'),
      company_website: get('companyWebsite'),
      company_logo: get('companyLogo'),
      company_tagline: get('companyTagline'),
      company_accent_color: get('companyAccentColor') || '#22c55e',
      registration_scheme: get('registrationScheme'),
      registration_number: get('registrationNumber'),
      registration_scheme_logo: get('registrationSchemeLogo')
    },

    // Company (flat for template)
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_website: get('companyWebsite'),
    company_logo: get('companyLogo'),
    company_tagline: get('companyTagline'),
    company_accent_color: get('companyAccentColor') || '#22c55e',
    registration_scheme: get('registrationScheme'),
    registration_number: get('registrationNumber'),
    registration_scheme_logo: get('registrationSchemeLogo')
  };
};
