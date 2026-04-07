/**
 * Fire Alarm G3 Commissioning Certificate — JSON Formatter
 * Maps form data to PDF template variables for PDF Monkey
 * BS 5839-1:2025
 */

export const formatFireAlarmG3Json = (formData: Record<string, any>) => {
  const get = (key: string, defaultValue = ''): string => {
    const value = formData[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value as string;
  };

  const getNum = (key: string, defaultValue = 0): number => {
    const value = formData[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') { const p = parseFloat(value); return isNaN(p) ? defaultValue : p; }
    return defaultValue;
  };

  const getBool = (key: string): boolean => formData[key] === true || formData[key] === 'true';

  const formatDateUK = (dateStr: string): string => {
    if (!dateStr) return '';
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return `${match[3]}/${match[2]}/${match[1]}`;
    return dateStr;
  };

  const getDate = (key: string): string => formatDateUK(get(key));

  const formatTestResult = (result: string): string => {
    if (result === 'pass') return 'Pass';
    if (result === 'fail') return 'Fail';
    if (result === 'na') return 'N/A';
    return '';
  };

  const getResultClass = (result: string): string => {
    if (result === 'pass') return 'pass';
    if (result === 'fail') return 'fail';
    if (result === 'na') return 'na';
    return '';
  };

  // Panel tests
  const pt = formData.panelTests || {};
  const panelTests = {
    power_on: formatTestResult(pt.powerOnTest), power_on_class: getResultClass(pt.powerOnTest),
    zone_indicators: formatTestResult(pt.zoneIndicators), zone_indicators_class: getResultClass(pt.zoneIndicators),
    fault_indicators: formatTestResult(pt.faultIndicators), fault_indicators_class: getResultClass(pt.faultIndicators),
    silence: formatTestResult(pt.silenceFacility), silence_class: getResultClass(pt.silenceFacility),
    reset: formatTestResult(pt.resetFunction), reset_class: getResultClass(pt.resetFunction),
    event_log: formatTestResult(pt.eventLog), event_log_class: getResultClass(pt.eventLog),
    remote_signalling: formatTestResult(pt.remoteSignalling), remote_signalling_class: getResultClass(pt.remoteSignalling),
  };

  // Power tests
  const pw = formData.powerTests || {};
  const powerTests = {
    mains: formatTestResult(pw.mainsSupply), mains_class: getResultClass(pw.mainsSupply),
    battery_voltage: pw.batteryVoltage || '',
    battery_condition: formatTestResult(pw.batteryCondition), battery_condition_class: getResultClass(pw.batteryCondition),
    charger: formatTestResult(pw.chargerOperation), charger_class: getResultClass(pw.chargerOperation),
    standby: formatTestResult(pw.standbyDuration), standby_class: getResultClass(pw.standbyDuration),
  };

  // Fault tests
  const ft = formData.faultTests || {};
  const faultTests = {
    open_circuit: formatTestResult(ft.openCircuit), open_circuit_class: getResultClass(ft.openCircuit),
    short_circuit: formatTestResult(ft.shortCircuit), short_circuit_class: getResultClass(ft.shortCircuit),
    earth_fault: formatTestResult(ft.earthFault), earth_fault_class: getResultClass(ft.earthFault),
    power_fail: formatTestResult(ft.powerFail), power_fail_class: getResultClass(ft.powerFail),
  };

  // Sound readings
  const soundReadings = (formData.soundLevelReadings || []).map((r: any, i: number) => ({
    number: i + 1,
    zone: r.zone || '',
    location: r.location || '',
    area_type: r.areaType || 'general',
    db_reading: r.dBReading || '',
    min_required: r.minRequired || '65',
    result: formatTestResult(r.result),
    result_class: getResultClass(r.result),
  }));

  // Test equipment
  const testEquipment = (formData.testEquipment || []).map((e: any, i: number) => ({
    number: i + 1,
    type: e.type || '',
    make_model: `${e.make || ''} ${e.model || ''}`.trim(),
    serial_number: e.serialNumber || '',
    calibration_date: formatDateUK(e.calibrationDate || ''),
    calibration_due: formatDateUK(e.calibrationDue || ''),
  }));

  // Defects
  const defects = (formData.defectsFound || []).map((d: any, i: number) => ({
    number: i + 1,
    description: d.description || '',
    severity: d.severity || 'non-critical',
    severity_class: d.severity === 'critical' ? 'critical' : d.severity === 'recommendation' ? 'recommendation' : 'non-critical',
    rectified: d.rectified || false,
    rectification_date: formatDateUK(d.rectificationDate || ''),
  }));

  // Soak test duration
  let soakDuration = get('soakTestDuration');
  if (!soakDuration && formData.soakTestStart && formData.soakTestEnd) {
    const days = Math.round((new Date(formData.soakTestEnd).getTime() - new Date(formData.soakTestStart).getTime()) / 86400000);
    soakDuration = `${days} days`;
  }

  // Device coverage percentages
  const detCoverage = getNum('detectorsTotalCount') > 0 ? Math.round((getNum('detectorsTestedCount') / getNum('detectorsTotalCount')) * 100) : 0;
  const cpCoverage = getNum('callPointsTotalCount') > 0 ? Math.round((getNum('callPointsTestedCount') / getNum('callPointsTotalCount')) * 100) : 0;
  const sndCoverage = getNum('soundersTotalCount') > 0 ? Math.round((getNum('soundersTestedCount') / getNum('soundersTotalCount')) * 100) : 0;
  const intCoverage = getNum('interfacesTotalCount') > 0 ? Math.round((getNum('interfacesTestedCount') / getNum('interfacesTotalCount')) * 100) : 0;

  // Overall result
  const overallResult = get('overallResult');

  // Photos
  const photos = formData.photos || [];

  return {
    // Metadata
    certificate_number: get('certificateNumber'),
    certificate_type: 'commissioning',
    commissioning_date: getDate('commissioningDate'),
    standard_edition: get('standardEdition') || 'BS 5839-1:2025',
    installation_cert_ref: get('installationCertRef'),
    design_cert_reference: get('designCertReference'),

    // Client
    client_name: get('clientName'),
    client_telephone: get('clientTelephone'),
    client_address: get('clientAddress'),

    // Premises
    premises_name: get('premisesName'),
    premises_address: get('premisesAddress'),
    premises_type: get('premisesType'),
    floors_count: getNum('numberOfFloors', 1),

    // System
    system_category: get('systemCategory'),
    panel_make: get('systemMake'),
    panel_model: get('systemModel'),
    panel_location: get('panelLocation'),

    // Panel Tests
    panel_tests: panelTests,

    // Power Tests
    power_tests: powerTests,

    // Fault Tests
    fault_tests: faultTests,

    // Cause & Effect
    cause_effect_verified: getBool('causeAndEffectVerified'),
    cause_effect_ref: get('causeAndEffectRef'),
    cause_effect_date: getDate('causeAndEffectDate'),

    // Soak Test
    soak_test_start: getDate('soakTestStart'),
    soak_test_end: getDate('soakTestEnd'),
    soak_test_duration: soakDuration,
    soak_test_result: formatTestResult(get('soakTestResult')),
    soak_test_result_class: getResultClass(get('soakTestResult')),
    soak_test_notes: get('soakTestNotes'),
    has_soak_test: !!(get('soakTestStart') || get('soakTestEnd')),

    // Device Function Testing
    detectors_tested: getNum('detectorsTestedCount'),
    detectors_total: getNum('detectorsTotalCount'),
    detector_coverage: detCoverage,
    call_points_tested: getNum('callPointsTestedCount'),
    call_points_total: getNum('callPointsTotalCount'),
    call_point_coverage: cpCoverage,
    sounders_tested: getNum('soundersTestedCount'),
    sounders_total: getNum('soundersTotalCount'),
    sounder_coverage: sndCoverage,
    interfaces_tested: getNum('interfacesTestedCount'),
    interfaces_total: getNum('interfacesTotalCount'),
    interface_coverage: intCoverage,
    has_device_testing: !!(getNum('detectorsTestedCount') || getNum('callPointsTestedCount')),

    // Sound Readings
    sound_readings: soundReadings,
    has_sound_readings: soundReadings.length > 0,

    // Environment
    ambient_temperature: get('ambientTemperature'),
    ambient_noise_level: get('ambientNoiseLevel'),
    weather_conditions: get('weatherConditions'),
    has_environment: !!(get('ambientTemperature') || get('ambientNoiseLevel')),

    // Test Equipment
    test_equipment: testEquipment,
    has_test_equipment: testEquipment.length > 0,

    // Handover
    handover_date: getDate('handoverDate'),
    handover_as_built_drawings: getBool('handoverAsBuiltDrawings'),
    handover_operating_instructions: getBool('handoverOperatingInstructions'),
    handover_log_book: getBool('handoverLogBook'),
    handover_spares: getBool('handoverSpares'),
    handover_training: getBool('handoverTraining'),
    handover_zone_chart: getBool('handoverZoneChart'),
    handover_cause_effect: getBool('handoverCauseEffect'),
    handover_operation_manual: getBool('handoverOperationManual'),

    // Defects
    defects,
    has_defects: defects.length > 0,
    no_defects: defects.length === 0,

    // Commissioner
    commissioner_name: get('commissionerName'),
    commissioner_company: get('commissionerCompany'),
    commissioner_qualifications: get('commissionerQualifications'),
    commissioner_signature: get('commissionerSignature'),
    commissioner_date: getDate('commissionerDate'),

    // Responsible Person
    responsible_person: {
      name: get('responsiblePersonName'),
      position: get('responsiblePersonPosition'),
      signature: get('responsiblePersonSignature'),
      date: getDate('responsiblePersonDate'),
    },

    // Overall Result
    overall_result: overallResult,
    overall_result_display: overallResult === 'satisfactory' ? 'Satisfactory' : overallResult === 'unsatisfactory' ? 'Unsatisfactory' : '',

    // Service Schedule
    next_service_due: getDate('nextServiceDue'),
    next_inspection_due: getDate('nextInspectionDue'),

    // Notes
    additional_notes: get('additionalNotes'),
    has_additional_notes: !!(get('additionalNotes')?.trim()),

    // Photos
    photos,
    has_photos: photos.length > 0,
    photo_count: photos.length,

    // Company Branding
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || '#dc2626',
    registration_scheme_logo: get('registrationSchemeLogo'),
  };
};
