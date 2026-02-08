/**
 * Formats Solar PV Installation Certificate data for PDF generation
 *
 * Standards Compliance:
 * - BS 7671:2018+A3:2024 (18th Edition Amendment 3)
 * - BS EN IEC 62446-1:2016+A1:2018
 * - MIS 3002:2025 V5.0 (MCS Solar PV Installation Standard)
 */

import {
  SolarPVFormData,
  PVArray,
  Inverter,
  ArrayTestResult,
  InverterTestResult,
  Defect,
  CertificatePhoto
} from '@/types/solar-pv';

export const formatSolarPVJson = (formData: Partial<SolarPVFormData>) => {
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

  // Format date to UK format (DD/MM/YYYY)
  const formatDateUK = (dateStr: string): string => {
    if (!dateStr) return '';
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const getDate = (key: string): string => {
    return formatDateUK(get(key));
  };

  // Format system type for display
  const formatSystemType = (type: string): string => {
    switch (type) {
      case 'grid-tied': return 'Grid-Tied';
      case 'hybrid': return 'Hybrid (Grid + Battery)';
      case 'off-grid': return 'Off-Grid';
      default: return type || '';
    }
  };

  // Format mounting type for display
  const formatMountingType = (type: string): string => {
    switch (type) {
      case 'roof-integrated': return 'Roof Integrated (In-Roof)';
      case 'roof-mounted': return 'Roof Mounted (On-Roof)';
      case 'ground-mounted': return 'Ground Mounted';
      case 'building-integrated': return 'Building Integrated (BIPV)';
      default: return type || '';
    }
  };

  // Format inverter type for display
  const formatInverterType = (type: string): string => {
    switch (type) {
      case 'string': return 'String Inverter';
      case 'micro': return 'Micro Inverter';
      case 'hybrid': return 'Hybrid Inverter';
      case 'central': return 'Central Inverter';
      default: return type || '';
    }
  };

  // Format phase type for display
  const formatPhaseType = (type: string): string => {
    switch (type) {
      case 'single': return 'Single Phase';
      case 'three': return 'Three Phase';
      default: return type || '';
    }
  };

  // Format battery chemistry for display
  const formatBatteryChemistry = (type: string): string => {
    switch (type) {
      case 'lithium-ion': return 'Lithium-Ion';
      case 'lfp': return 'LFP (Lithium Iron Phosphate)';
      case 'lead-acid': return 'Lead Acid';
      case 'other': return 'Other';
      default: return type || '';
    }
  };

  // Format earthing arrangement for display
  const formatEarthingArrangement = (type: string): string => {
    switch (type) {
      case 'TN-S': return 'TN-S';
      case 'TN-C-S': return 'TN-C-S (PME)';
      case 'TT': return 'TT';
      default: return type || '';
    }
  };

  // Format meter type for display
  const formatMeterType = (type: string): string => {
    switch (type) {
      case 'smart': return 'Smart Meter';
      case 'export': return 'Export Meter';
      case 'generation': return 'Generation Meter';
      case 'none': return 'No Meter';
      default: return type || '';
    }
  };

  // Format defect severity
  const formatSeverity = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'Critical';
      case 'non-critical': return 'Non-Critical';
      case 'recommendation': return 'Recommendation';
      default: return severity || '';
    }
  };

  const getSeverityClass = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'critical';
      case 'non-critical': return 'non-critical';
      case 'recommendation': return 'recommendation';
      default: return 'recommendation';
    }
  };

  // Format test result for display
  const formatTestResult = (value: boolean | undefined): string => {
    if (value === true) return 'PASS';
    if (value === false) return 'FAIL';
    return 'N/A';
  };

  const getTestResultClass = (value: boolean | undefined): string => {
    if (value === true) return 'pass';
    if (value === false) return 'fail';
    return 'na';
  };

  // Format consumer code for display
  const formatConsumerCode = (code: string): string => {
    switch (code) {
      case 'RECC': return 'RECC';
      case 'HIES': return 'HIES';
      case 'other': return 'Other';
      default: return code || '';
    }
  };

  // Format certificate type for display
  const formatCertificateType = (type: string): string => {
    switch (type) {
      case 'installation': return 'Installation Certificate';
      case 'commissioning': return 'Commissioning Report';
      case 'design-only': return 'Design Report';
      default: return 'Installation Certificate';
    }
  };

  // Format work type for display
  const formatWorkType = (type: string): string => {
    switch (type) {
      case 'new-installation': return 'New Installation';
      case 'retrofit': return 'Retrofit / Addition';
      case 'extension': return 'System Extension';
      case 'replacement': return 'Component Replacement';
      case 'repair': return 'Repair / Remedial Work';
      default: return 'New Installation';
    }
  };

  // Format property type for display
  const formatPropertyType = (type: string): string => {
    switch (type) {
      case 'domestic': return 'Domestic / Residential';
      case 'commercial': return 'Commercial';
      case 'industrial': return 'Industrial';
      case 'agricultural': return 'Agricultural / Farm';
      case 'mixed-use': return 'Mixed Use';
      default: return type || 'Domestic';
    }
  };

  // Format yield calculation method for display
  const formatYieldMethod = (method: string): string => {
    switch (method) {
      case 'mcs-estimator': return 'MCS Yield Estimator';
      case 'sap-2012': return 'SAP 2012 Appendix M';
      case 'pvgis': return 'PVGIS';
      case 'pvsyst': return 'PVsyst Simulation';
      case 'manufacturer': return 'Manufacturer Tool';
      case 'other': return 'Other Method';
      default: return 'MCS Yield Estimator';
    }
  };

  // Format PV Arrays for PDF
  const formatArrays = (): any[] => {
    const arrays: PVArray[] = formData.arrays || [];
    return arrays.map((arr, index) => ({
      array_number: index + 1,
      panel_make: arr.panelMake || '',
      panel_model: arr.panelModel || '',
      panel_wattage: arr.panelWattage || 0,
      panel_count: arr.panelCount || 0,
      array_capacity: ((arr.panelWattage || 0) * (arr.panelCount || 0) / 1000).toFixed(2),
      mcs_certified: arr.mcsCertified || false,
      orientation: arr.orientation || '',
      tilt_angle: arr.tiltAngle || 0,
      shading_factor: arr.shadingFactor || 1,
      shading_percentage: ((1 - (arr.shadingFactor || 1)) * 100).toFixed(0),
      string_voc: arr.stringVoltage || '',
      string_isc: arr.stringCurrent || '',
      mounting_type: arr.mountingType || '',
      mounting_type_display: formatMountingType(arr.mountingType || '')
    }));
  };

  // Format Inverters for PDF
  const formatInverters = (): any[] => {
    const inverters: Inverter[] = formData.inverters || [];
    return inverters.map((inv, index) => ({
      inverter_number: index + 1,
      make: inv.make || '',
      model: inv.model || '',
      serial_number: inv.serialNumber || '',
      rated_power: inv.ratedPower || 0,
      mcs_certified: inv.mcsCertified || false,
      type: inv.type || '',
      type_display: formatInverterType(inv.type || ''),
      mppt_count: inv.mpptCount || 1,
      phases: inv.phases || 'single',
      phases_display: formatPhaseType(inv.phases || 'single'),
      location: inv.location || ''
    }));
  };

  // Format Array Test Results for PDF
  const formatArrayTests = (): any[] => {
    const testResults = formData.testResults || {};
    const arrayTests: ArrayTestResult[] = testResults.arrayTests || [];
    const arrays: PVArray[] = formData.arrays || [];

    return arrayTests.map((test, index) => {
      const array = arrays.find(a => a.id === test.arrayId);
      return {
        array_number: index + 1,
        array_name: array ? `${array.panelMake} ${array.panelModel}` : `Array ${index + 1}`,
        voc_measured: test.vocMeasured || '',
        isc_measured: test.iscMeasured || '',
        insulation_resistance: test.insulationResistance || '',
        polarity_result: formatTestResult(test.polarityCorrect),
        polarity_class: getTestResultClass(test.polarityCorrect),
        continuity_result: formatTestResult(test.stringContinuity),
        continuity_class: getTestResultClass(test.stringContinuity)
      };
    });
  };

  // Format Inverter Test Results for PDF
  const formatInverterTests = (): any[] => {
    const testResults = formData.testResults || {};
    const inverterTests: InverterTestResult[] = testResults.inverterTests || [];
    const inverters: Inverter[] = formData.inverters || [];

    return inverterTests.map((test, index) => {
      const inverter = inverters.find(i => i.id === test.inverterId);
      return {
        inverter_number: index + 1,
        inverter_name: inverter ? `${inverter.make} ${inverter.model}` : `Inverter ${index + 1}`,
        dc_isolator_result: formatTestResult(test.dcIsolatorOperational),
        dc_isolator_class: getTestResultClass(test.dcIsolatorOperational),
        ac_isolator_result: formatTestResult(test.acIsolatorOperational),
        ac_isolator_class: getTestResultClass(test.acIsolatorOperational),
        anti_islanding_result: formatTestResult(test.antiIslandingTest),
        anti_islanding_class: getTestResultClass(test.antiIslandingTest),
        protection_result: formatTestResult(test.earthFaultProtection),
        protection_class: getTestResultClass(test.earthFaultProtection)
      };
    });
  };

  // Format AC Test Results for PDF (BS 7671:2018+A3:2024)
  const formatACTests = () => {
    const testResults = formData.testResults || {};
    const acTests = testResults.acTests || {};

    return {
      earthing_arrangement: acTests.earthingArrangement || '',
      earthing_arrangement_display: formatEarthingArrangement(acTests.earthingArrangement || ''),
      ze_value: acTests.zeValue || '',
      zs_value: acTests.zsValue || '',
      rcd_type: acTests.rcdType || '',
      rcd_rating: acTests.rcdRating || '',
      rcd_trip_time: acTests.rcdTripTime || '',
      insulation_resistance: acTests.insulationResistance || '',
      polarity_result: formatTestResult(acTests.polarityCorrect),
      polarity_class: getTestResultClass(acTests.polarityCorrect),
      // BS 7671:2018+A3:2024 Reg. 530.3.201 - Bidirectional protective devices
      bidirectional_device_installed: acTests.bidirectionalDeviceInstalled || false,
      bidirectional_device_type: acTests.bidirectionalDeviceType || '',
      bidirectional_device_make: acTests.bidirectionalDeviceMake || '',
      bidirectional_device_model: acTests.bidirectionalDeviceModel || '',
      bidirectional_device_result: formatTestResult(acTests.bidirectionalDeviceInstalled),
      bidirectional_device_class: getTestResultClass(acTests.bidirectionalDeviceInstalled)
    };
  };

  // Format Commissioning Results for PDF
  const formatCommissioning = () => {
    const testResults = formData.testResults || {};
    const commissioning = testResults.commissioning || {};

    return {
      system_operational: commissioning.systemOperational || false,
      export_verified: commissioning.exportVerified || false,
      generation_meter_reading: commissioning.generationMeterReading || '',
      customer_briefed: commissioning.customerBriefed || false,
      documentation_provided: commissioning.documentationProvided || false
    };
  };

  // Format Defects for PDF
  const formatDefects = (): any[] => {
    const defects: Defect[] = formData.defects || [];
    return defects.map((d, index) => ({
      number: index + 1,
      description: d.description || '',
      severity: formatSeverity(d.severity),
      severity_class: getSeverityClass(d.severity),
      rectified: d.rectified || false,
      rectification_date: formatDateUK(d.rectificationDate || '')
    }));
  };

  // Format Photos for PDF
  const formatPhotos = (): any[] => {
    const photos: CertificatePhoto[] = formData.photos || [];
    return photos.map(p => ({
      url: p.url || '',
      caption: p.caption || '',
      category: p.category || 'general'
    }));
  };

  // Format Battery details
  const formatBattery = () => {
    const battery = formData.battery || {};
    return {
      installed: battery.installed || false,
      make: battery.make || '',
      model: battery.model || '',
      serial_number: battery.serialNumber || '',
      capacity: battery.capacity || 0,
      chemistry: battery.chemistry || '',
      chemistry_display: formatBatteryChemistry(battery.chemistry || '')
    };
  };

  // Format Grid Connection details
  const formatGridConnection = () => {
    const grid = formData.gridConnection || {};
    return {
      dno_name: grid.dnoName || '',
      mpan: grid.mpan || '',
      application_reference: grid.applicationReference || '',
      application_type: grid.applicationType || '',
      application_type_display: grid.applicationType === 'G98' ? 'G98 (≤16A per phase)' : 'G99 (>16A per phase)',
      application_date: formatDateUK(grid.applicationDate || ''),
      approval_date: formatDateUK(grid.approvalDate || ''),
      approval_reference: grid.approvalReference || '',
      export_limited: grid.exportLimited || false,
      export_limit_kw: grid.exportLimitKw || ''
    };
  };

  // Format Metering details
  const formatMetering = () => {
    const metering = formData.metering || {};
    return {
      meter_type: metering.meterType || '',
      meter_type_display: formatMeterType(metering.meterType || ''),
      meter_make: metering.meterMake || '',
      meter_model: metering.meterModel || '',
      meter_serial: metering.meterSerial || '',
      ct_ratio: metering.ctRatio || ''
    };
  };

  // Format Handover documentation
  const formatHandover = () => {
    const handover = formData.handover || {};
    return {
      user_manual_provided: handover.userManualProvided || false,
      warranty_docs_provided: handover.warrantyDocsProvided || false,
      mcs_document_provided: handover.mcsDocumentProvided || false,
      maintenance_schedule_provided: handover.maintenanceScheduleProvided || false,
      emergency_shutdown_explained: handover.emergencyShutdownExplained || false
    };
  };

  // Format MCS Details
  const formatMCSDetails = () => {
    const mcs = formData.mcsDetails || {};
    return {
      installer_number: mcs.installerNumber || '',
      installation_number: mcs.installationNumber || '',
      consumer_code: mcs.consumerCode || '',
      consumer_code_display: formatConsumerCode(mcs.consumerCode || '')
    };
  };

  // Calculate totals
  const arrays = formData.arrays || [];
  const totalCapacity = arrays.reduce((sum, arr) => {
    return sum + ((arr.panelWattage || 0) * (arr.panelCount || 0) / 1000);
  }, 0);
  const totalPanels = arrays.reduce((sum, arr) => sum + (arr.panelCount || 0), 0);

  // Estimate annual yield (UK average ~850 kWh/kWp)
  const estimatedYield = totalCapacity * 850;

  // Estimate CO2 savings (UK grid average ~0.233 kg CO2/kWh)
  const co2Savings = estimatedYield * 0.233;

  return {
    // ============================================
    // METADATA
    // ============================================
    certificate_number: get('certificateNumber'),
    certificate_type: get('certificateType') || 'installation',
    certificate_type_display: formatCertificateType(get('certificateType')),
    work_type: get('workType') || 'new-installation',
    work_type_display: formatWorkType(get('workType')),
    installation_date: getDate('installationDate'),
    commissioning_date: getDate('commissioningDate'),
    design_reference: get('designReference'),
    previous_installation_ref: get('previousInstallationRef'),
    status: get('status'),

    // ============================================
    // CLIENT DETAILS
    // ============================================
    client_name: get('clientName'),
    client_address: get('clientAddress'),
    client_postcode: get('clientPostcode'),
    client_email: get('clientEmail'),
    client_phone: get('clientPhone'),

    // ============================================
    // INSTALLATION ADDRESS
    // ============================================
    installation_address: get('installationAddress') || get('clientAddress'),
    installation_postcode: get('installationPostcode') || get('clientPostcode'),

    // ============================================
    // PROPERTY & OWNERSHIP (MCS Requirement)
    // ============================================
    property_type: get('propertyType') || 'domestic',
    property_type_display: formatPropertyType(get('propertyType')),
    ownership_type: get('ownershipType') || 'owner-occupied',
    property_age: get('propertyAge'),
    roof_age: get('roofAge'),

    // ============================================
    // SITE ACCESS & SAFETY
    // ============================================
    site_access_notes: get('siteAccessNotes'),
    safe_isolation_verified: getBool('safeIsolationVerified'),
    asbestos_check_required: getBool('asbestosCheckRequired'),
    asbestos_check_completed: getBool('asbestosCheckCompleted'),
    structural_assessment_required: getBool('structuralAssessmentRequired'),
    structural_assessment_completed: getBool('structuralAssessmentCompleted'),

    // ============================================
    // MCS COMPLIANCE
    // ============================================
    mcs_details: formatMCSDetails(),

    // ============================================
    // SYSTEM OVERVIEW
    // ============================================
    system_type: get('systemType'),
    system_type_display: formatSystemType(get('systemType')),
    total_capacity: totalCapacity.toFixed(2),
    total_panels: totalPanels,
    estimated_annual_yield: estimatedYield.toFixed(0),
    estimated_co2_savings: co2Savings.toFixed(0),
    yield_calculation_method: get('yieldCalculationMethod') || 'mcs-estimator',
    yield_calculation_method_display: formatYieldMethod(get('yieldCalculationMethod')),
    yield_calculation_notes: get('yieldCalculationNotes'),

    // ============================================
    // PV ARRAYS
    // ============================================
    arrays: formatArrays(),
    has_arrays: arrays.length > 0,
    array_count: arrays.length,

    // ============================================
    // INVERTERS
    // ============================================
    inverters: formatInverters(),
    has_inverters: (formData.inverters || []).length > 0,
    inverter_count: (formData.inverters || []).length,

    // ============================================
    // BATTERY STORAGE
    // ============================================
    battery: formatBattery(),
    has_battery: (formData.battery || {}).installed || false,

    // ============================================
    // GRID CONNECTION
    // ============================================
    grid_connection: formatGridConnection(),

    // ============================================
    // METERING
    // ============================================
    metering: formatMetering(),

    // ============================================
    // TEST RESULTS
    // ============================================
    array_tests: formatArrayTests(),
    has_array_tests: ((formData.testResults || {}).arrayTests || []).length > 0,

    inverter_tests: formatInverterTests(),
    has_inverter_tests: ((formData.testResults || {}).inverterTests || []).length > 0,

    ac_tests: formatACTests(),

    commissioning: formatCommissioning(),

    // ============================================
    // DEFECTS & OBSERVATIONS
    // ============================================
    defects: formatDefects(),
    has_defects: (formData.defects || []).length > 0,
    no_defects: (formData.defects || []).length === 0,
    defect_count: (formData.defects || []).length,

    // ============================================
    // HANDOVER DOCUMENTATION
    // ============================================
    handover: formatHandover(),

    // ============================================
    // DECLARATIONS
    // ============================================
    installer_name: (formData.installerDeclaration || {}).installerName || '',
    installer_company: (formData.installerDeclaration || {}).installerCompany || '',
    installer_mcs_number: (formData.installerDeclaration || {}).installerMcsNumber || '',
    installer_address: (formData.installerDeclaration || {}).installerAddress || '',
    installer_phone: (formData.installerDeclaration || {}).installerPhone || '',
    installer_email: (formData.installerDeclaration || {}).installerEmail || '',
    installer_signature: (formData.installerDeclaration || {}).installerSignature || '',
    installer_date: formatDateUK((formData.installerDeclaration || {}).installerDate || ''),

    electrician_required: (formData.electricianDeclaration || {}).required || false,
    electrician_name: (formData.electricianDeclaration || {}).electricianName || '',
    electrician_company: (formData.electricianDeclaration || {}).electricianCompany || '',
    electrician_registration: (formData.electricianDeclaration || {}).electricianRegistration || '',
    electrician_scheme: (formData.electricianDeclaration || {}).electricianScheme || '',
    electrician_signature: (formData.electricianDeclaration || {}).electricianSignature || '',
    electrician_date: formatDateUK((formData.electricianDeclaration || {}).electricianDate || ''),
    has_electrician: (formData.electricianDeclaration || {}).required || false,

    // ============================================
    // PHOTOS
    // ============================================
    photos: formatPhotos(),
    has_photos: (formData.photos || []).length > 0,
    photo_count: (formData.photos || []).length,

    // ============================================
    // OVERALL ASSESSMENT
    // ============================================
    overall_satisfactory: getBool('overallSatisfactory'),
    overall_assessment_display: getBool('overallSatisfactory') ? 'SATISFACTORY' : 'UNSATISFACTORY',
    overall_assessment_class: getBool('overallSatisfactory') ? 'pass' : 'fail',

    // ============================================
    // ADDITIONAL NOTES
    // ============================================
    additional_notes: get('additionalNotes'),
    has_additional_notes: !!(get('additionalNotes') && get('additionalNotes').trim()),

    // ============================================
    // COMPANY BRANDING (from profile)
    // ============================================
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_website: get('companyWebsite'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || get('companyAccentColor') || '#f59e0b',
    registration_scheme_logo: get('registrationSchemeLogo'),
    registration_scheme: get('registrationScheme')
  };
};
