/**
 * Formats Fire Alarm certificate form data for PDF generation
 * Compliant with BS 5839-1:2017 Fire detection and fire alarm systems
 */

import { FireAlarmFormData, FireAlarmZone } from '@/types/fire-alarm';

export const formatFireAlarmJson = (formData: Partial<FireAlarmFormData>) => {
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

  // Format test result for display
  const formatTestResult = (result: string | undefined): string => {
    switch (result) {
      case 'pass': return 'PASS';
      case 'fail': return 'FAIL';
      case 'na': return 'N/A';
      default: return '';
    }
  };

  // Get badge class for test result
  const getResultClass = (result: string | undefined): string => {
    switch (result) {
      case 'pass': return 'pass';
      case 'fail': return 'fail';
      case 'na': return 'na';
      default: return 'na';
    }
  };

  // Format certificate type
  const formatCertificateType = (type: string): string => {
    switch (type) {
      case 'installation': return 'Installation Certificate';
      case 'commissioning': return 'Commissioning Certificate';
      case 'periodic': return 'Periodic Test Certificate';
      default: return type || 'Certificate';
    }
  };

  // Format network type
  const formatNetworkType = (type: string): string => {
    switch (type) {
      case 'standalone': return 'Standalone';
      case 'conventional': return 'Conventional';
      case 'addressable': return 'Addressable';
      case 'analogue': return 'Analogue Addressable';
      case 'networked': return 'Networked';
      case 'wireless': return 'Wireless';
      default: return type || '';
    }
  };

  // Format premises type
  const formatPremisesType = (type: string): string => {
    switch (type) {
      case 'residential': return 'Residential';
      case 'commercial': return 'Commercial';
      case 'industrial': return 'Industrial';
      case 'retail': return 'Retail';
      case 'healthcare': return 'Healthcare';
      case 'educational': return 'Educational';
      case 'hospitality': return 'Hospitality';
      case 'care-home': return 'Care Home';
      case 'hmo': return 'HMO';
      case 'mixed-use': return 'Mixed Use';
      default: return type || '';
    }
  };

  // Format occupancy type
  const formatOccupancyType = (type: string): string => {
    switch (type) {
      case 'sleeping': return 'Sleeping Risk';
      case 'day-use': return 'Day Use Only';
      case '24hr': return '24 Hour Occupation';
      case 'shift': return 'Shift Pattern';
      default: return type || '';
    }
  };

  // Format battery type
  const formatBatteryType = (type: string): string => {
    switch (type) {
      case 'sealed-lead-acid': return 'Sealed Lead Acid';
      case 'nickel-cadmium': return 'Nickel Cadmium';
      case 'lithium': return 'Lithium';
      default: return type || '';
    }
  };

  // Format system category description
  const getSystemCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      'L1': 'Full coverage throughout the building',
      'L2': 'Protection in escape routes + high-risk areas',
      'L3': 'Protection of escape routes only',
      'L4': 'Within escape routes only',
      'L5': 'As risk assessment dictates',
      'M': 'Manual call points only',
      'P1': 'Full property protection',
      'P2': 'Partial property protection'
    };
    return descriptions[category] || '';
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

  // Calculate totals
  const detectorCount = formData.detectorCount || {};
  const totalDetectors =
    (detectorCount.opticalSmoke || 0) +
    (detectorCount.ionisationSmoke || 0) +
    (detectorCount.heatFixed || 0) +
    (detectorCount.heatRor || 0) +
    (detectorCount.multiSensor || 0) +
    (detectorCount.beam || 0) +
    (detectorCount.aspirating || 0) +
    (detectorCount.flame || 0) +
    (detectorCount.co || 0);

  const totalAlarmDevices =
    (formData.sounderCount || 0) + (formData.visualAlarmCount || 0);

  // Format zones for PDF
  const formatZones = (): any[] => {
    const zones: FireAlarmZone[] = formData.zones || [];
    return zones.map((zone) => ({
      zone_number: zone.zoneNumber,
      zone_name: zone.zoneName || '',
      location: zone.location || '',
      detector_count: zone.detectorCount || 0,
      call_point_count: zone.callPointCount || 0,
      sounder_count: zone.sounderCount || 0
    }));
  };

  // Format panel tests
  const formatPanelTests = () => {
    const tests = formData.panelTests || {};
    return {
      power_on_result: getResultClass(tests.powerOnTest),
      power_on_display: formatTestResult(tests.powerOnTest),
      zone_indicators_result: getResultClass(tests.zoneIndicators),
      zone_indicators_display: formatTestResult(tests.zoneIndicators),
      fault_indicators_result: getResultClass(tests.faultIndicators),
      fault_indicators_display: formatTestResult(tests.faultIndicators),
      silence_result: getResultClass(tests.silenceFacility),
      silence_display: formatTestResult(tests.silenceFacility),
      reset_result: getResultClass(tests.resetFunction),
      reset_display: formatTestResult(tests.resetFunction),
      event_log_result: getResultClass(tests.eventLog),
      event_log_display: formatTestResult(tests.eventLog),
      remote_signalling_result: getResultClass(tests.remoteSignalling),
      remote_signalling_display: formatTestResult(tests.remoteSignalling)
    };
  };

  // Format power tests
  const formatPowerTests = () => {
    const tests = formData.powerTests || {};
    return {
      mains_result: getResultClass(tests.mainsSupply),
      mains_display: formatTestResult(tests.mainsSupply),
      battery_voltage: tests.batteryVoltage || '',
      battery_condition_result: getResultClass(tests.batteryCondition),
      battery_condition_display: formatTestResult(tests.batteryCondition),
      charger_result: getResultClass(tests.chargerOperation),
      charger_display: formatTestResult(tests.chargerOperation),
      standby_result: getResultClass(tests.standbyDuration),
      standby_display: formatTestResult(tests.standbyDuration)
    };
  };

  // Format fault tests
  const formatFaultTests = () => {
    const tests = formData.faultTests || {};
    return {
      open_circuit_result: getResultClass(tests.openCircuit),
      open_circuit_display: formatTestResult(tests.openCircuit),
      short_circuit_result: getResultClass(tests.shortCircuit),
      short_circuit_display: formatTestResult(tests.shortCircuit),
      earth_fault_result: getResultClass(tests.earthFault),
      earth_fault_display: formatTestResult(tests.earthFault),
      power_fail_result: getResultClass(tests.powerFail),
      power_fail_display: formatTestResult(tests.powerFail)
    };
  };

  // Format sound readings
  const formatSoundReadings = (): any[] => {
    const readings = formData.soundLevelReadings || [];
    return readings.map((r: any) => {
      const dbValue = parseFloat(r.dBReading) || 0;
      const minRequired = parseFloat(r.minRequired) || 65;
      const isPassing = dbValue >= minRequired;

      return {
        zone: r.zone || '',
        location: r.location || '',
        area_type: r.areaType || 'general',
        db_reading: r.dBReading || '',
        min_required: r.minRequired || '65',
        result: isPassing ? 'PASS' : 'FAIL',
        result_class: isPassing ? 'pass' : 'fail'
      };
    });
  };

  // Format defects
  const formatDefects = (): any[] => {
    const defects = formData.defectsFound || [];
    return defects.map((d: any, index: number) => ({
      number: index + 1,
      description: d.description || '',
      severity: formatSeverity(d.severity),
      severity_class: getSeverityClass(d.severity),
      rectified: d.rectified || false,
      rectification_date: formatDateUK(d.rectificationDate || ''),
      photo_url: d.photoUrl || ''
    }));
  };

  // Format handover documentation
  const formatHandover = () => {
    const handover = formData.handoverDocumentation || {};
    return {
      as_built_drawings: handover.asBuiltDrawings || false,
      operation_manual: handover.operationManual || false,
      maintenance_log: handover.maintenanceLog || false,
      zone_chart: handover.zoneChart || false,
      cause_effect: handover.causeEffectMatrix || false,
      training: handover.trainingProvided || false
    };
  };

  // Get overall result display
  const overallResult = get('overallResult');
  const overallResultDisplay = overallResult === 'satisfactory' ? 'SATISFACTORY' :
    overallResult === 'unsatisfactory' ? 'UNSATISFACTORY' : '';
  const overallResultClass = overallResult === 'satisfactory' ? 'pass' : 'fail';

  // Format third-party certification
  const formatThirdPartyCertification = () => {
    const cert = formData.thirdPartyCertification || {};
    return {
      bafe_registration: cert.bafeRegistration || '',
      fia_membership: cert.fiaMembership || '',
      nsi_ssaib_certification: cert.nsiSsaibCertification || '',
      other_accreditation: cert.otherAccreditation || '',
      has_certification: !!(cert.bafeRegistration || cert.fiaMembership || cert.nsiSsaibCertification || cert.otherAccreditation)
    };
  };

  // Format fire risk assessment
  const formatFireRiskAssessment = () => {
    const fra = formData.fireRiskAssessment || {};
    return {
      fra_reference: fra.fraReference || '',
      fra_date: formatDateUK(fra.fraDate || ''),
      fra_author: fra.fraAuthor || '',
      fra_company: fra.fraCompany || '',
      has_fra: !!(fra.fraReference || fra.fraAuthor)
    };
  };

  // Format monitoring details
  const formatMonitoringDetails = () => {
    const monitoring = formData.monitoringDetails || {};
    const signallingRouteDisplay = {
      'dual-path': 'Dual Path',
      'single-path': 'Single Path',
      'redcare': 'BT Redcare',
      'dualcom': 'Dualcom',
      'gsm': 'GSM/GPRS',
      'other': monitoring.signallingRouteOther || 'Other'
    }[monitoring.signallingRoute || ''] || '';

    return {
      is_monitored: monitoring.isMonitored || false,
      arc_name: monitoring.arcName || '',
      arc_contact_number: monitoring.arcContactNumber || '',
      arc_account_number: monitoring.arcAccountNumber || '',
      signalling_route: monitoring.signallingRoute || '',
      signalling_route_display: signallingRouteDisplay
    };
  };

  // Format previous defects (for periodic testing)
  const formatPreviousDefects = (): any[] => {
    const defects = formData.previousDefects || [];
    return defects.map((d: any, index: number) => {
      const statusDisplay = {
        'outstanding': 'Outstanding',
        'rectified': 'Rectified',
        'no-longer-applicable': 'No Longer Applicable'
      }[d.status || ''] || '';
      const statusClass = {
        'outstanding': 'fail',
        'rectified': 'pass',
        'no-longer-applicable': 'na'
      }[d.status || ''] || 'na';

      return {
        number: index + 1,
        description: d.description || '',
        original_date: formatDateUK(d.originalDate || ''),
        status: d.status || 'outstanding',
        status_display: statusDisplay,
        status_class: statusClass,
        notes: d.notes || ''
      };
    });
  };

  return {
    // ============================================
    // METADATA
    // ============================================
    certificate_number: get('certificateNumber'),
    certificate_type: get('certificateType'),
    certificate_type_display: formatCertificateType(get('certificateType')),
    inspection_date: getDate('inspectionDate'),
    previous_certificate_ref: get('previousCertificateRef'),
    is_periodic: get('certificateType') === 'periodic',

    // ============================================
    // THIRD-PARTY CERTIFICATION
    // ============================================
    ...formatThirdPartyCertification(),

    // ============================================
    // FIRE RISK ASSESSMENT
    // ============================================
    ...formatFireRiskAssessment(),

    // ============================================
    // MONITORING / ARC DETAILS
    // ============================================
    monitoring: formatMonitoringDetails(),

    // ============================================
    // CLIENT DETAILS
    // ============================================
    client_name: get('clientName'),
    client_address: get('clientAddress'),
    client_telephone: get('clientTelephone'),
    client_email: get('clientEmail'),

    // ============================================
    // PREMISES DETAILS
    // ============================================
    premises_name: get('premisesName'),
    premises_address: get('premisesAddress'),
    premises_type: get('premisesType'),
    premises_type_display: formatPremisesType(get('premisesType')),
    occupancy_type: get('occupancyType'),
    occupancy_type_display: formatOccupancyType(get('occupancyType')),
    floors_count: getNum('floorsCount', 1),

    // ============================================
    // SYSTEM DETAILS
    // ============================================
    system_category: get('systemCategory'),
    system_category_description: getSystemCategoryDescription(get('systemCategory')),
    network_type: get('networkType'),
    network_type_display: formatNetworkType(get('networkType')),
    zones_count: getNum('zonesCount', 1),
    repeaters_installed: getBool('repeatersInstalled'),
    panel_make: get('systemMake'),
    panel_model: get('systemModel'),
    panel_location: get('panelLocation'),
    panel_serial: get('panelSerialNumber'),
    panel_serial_photo: get('panelSerialPhoto'),

    // ============================================
    // POWER SUPPLY
    // ============================================
    mains_power_supply: getBool('mainsPowerSupply') !== false, // Default true
    battery_type: get('batteryType'),
    battery_type_display: formatBatteryType(get('batteryType')),
    battery_backup_hours: getNum('batteryBackupHours', 24),
    battery_test_result: get('batteryTestResult'),
    battery_test_result_display: formatTestResult(get('batteryTestResult')),
    battery_test_result_class: getResultClass(get('batteryTestResult')),

    // ============================================
    // EQUIPMENT COUNTS
    // ============================================
    detector_count: {
      optical_smoke: detectorCount.opticalSmoke || 0,
      ionisation_smoke: detectorCount.ionisationSmoke || 0,
      multi_sensor: detectorCount.multiSensor || 0,
      heat_fixed: detectorCount.heatFixed || 0,
      heat_ror: detectorCount.heatRor || 0,
      beam: detectorCount.beam || 0,
      aspirating: detectorCount.aspirating || 0,
      flame: detectorCount.flame || 0,
      co: detectorCount.co || 0
    },
    total_detectors: totalDetectors,
    call_point_count: formData.callPointCount || 0,
    sounder_count: formData.sounderCount || 0,
    visual_alarm_count: formData.visualAlarmCount || 0,
    total_alarm_devices: totalAlarmDevices,

    // ============================================
    // ZONES
    // ============================================
    zones: formatZones(),
    has_zones: (formData.zones || []).length > 0,

    // ============================================
    // TEST RESULTS
    // ============================================
    panel_tests: formatPanelTests(),
    power_tests: formatPowerTests(),
    fault_tests: formatFaultTests(),

    // ============================================
    // SOUND LEVEL READINGS
    // ============================================
    sound_readings: formatSoundReadings(),
    has_sound_readings: (formData.soundLevelReadings || []).length > 0,

    // ============================================
    // COMMISSIONING
    // ============================================
    commissioning_date: getDate('commissioningDate'),
    handover_date: getDate('handoverDate'),
    handover: formatHandover(),

    // ============================================
    // DEFECTS
    // ============================================
    defects: formatDefects(),
    has_defects: (formData.defectsFound || []).length > 0,
    no_defects: (formData.defectsFound || []).length === 0,

    // ============================================
    // PREVIOUS DEFECTS (Periodic Testing)
    // ============================================
    previous_defects: formatPreviousDefects(),
    has_previous_defects: (formData.previousDefects || []).length > 0,

    // ============================================
    // DECLARATIONS
    // ============================================
    designer_name: get('designerName'),
    designer_company: get('designerCompany'),
    designer_qualifications: get('designerQualifications'),
    designer_date: getDate('designerDate'),
    designer_signature: get('designerSignature'),

    installer_name: get('installerName'),
    installer_company: get('installerCompany'),
    installer_qualifications: get('installerQualifications'),
    installer_date: getDate('installerDate'),
    installer_signature: get('installerSignature'),

    commissioner_name: get('commissionerName'),
    commissioner_company: get('commissionerCompany'),
    commissioner_qualifications: get('commissionerQualifications'),
    commissioner_date: getDate('commissionerDate'),
    commissioner_signature: get('commissionerSignature'),

    // ============================================
    // CERTIFICATION
    // ============================================
    overall_result: overallResult,
    overall_result_display: overallResultDisplay,
    overall_result_class: overallResultClass,
    next_service_due: getDate('nextServiceDue'),
    next_inspection_due: getDate('nextInspectionDue'),

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
    company_accent_color: get('accentColor') || get('companyAccentColor') || '#dc2626'
  };
};
