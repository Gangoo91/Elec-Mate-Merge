/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Formats Fire Alarm certificate form data for PDF generation
 * Compliant with BS 5839-1:2025 Fire detection and fire alarm systems
 */

import {
  FireAlarmFormData,
  FireAlarmZone,
  InterfaceEquipment,
  AspiratingUnit,
  TestEquipmentItem,
} from '@/types/fire-alarm';
import type { FireAlarmPayloadType } from '@/types/fire-alarm-payload';

export const formatFireAlarmJson = (formData: Partial<FireAlarmFormData>): FireAlarmPayloadType => {
  const data = formData as Record<string, unknown>;

  const get = (key: string, defaultValue: string = ''): string => {
    const value = data[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value as string;
  };

  const getNum = (key: string, defaultValue: number = 0): number => {
    const value = data[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  };

  const getBool = (key: string): boolean => {
    const value = data[key];
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
      case 'pass':
        return 'PASS';
      case 'fail':
        return 'FAIL';
      case 'na':
        return 'N/A';
      default:
        return '';
    }
  };

  // Get badge class for test result
  const getResultClass = (result: string | undefined): string => {
    switch (result) {
      case 'pass':
        return 'pass';
      case 'fail':
        return 'fail';
      case 'na':
        return 'na';
      default:
        return 'na';
    }
  };

  // Format certificate type
  const formatCertificateType = (type: string): string => {
    switch (type) {
      case 'design':
        return 'Design Certificate';
      case 'installation':
        return 'Installation Certificate';
      case 'commissioning':
        return 'Commissioning Certificate';
      case 'acceptance':
        return 'Acceptance Certificate';
      case 'verification':
        return 'Verification Certificate';
      case 'periodic':
        return 'Periodic Test Certificate';
      case 'modification':
        return 'Modification Certificate';
      default:
        return type || 'Certificate';
    }
  };

  // Format network type
  const formatNetworkType = (type: string): string => {
    switch (type) {
      case 'standalone':
        return 'Standalone';
      case 'conventional':
        return 'Conventional';
      case 'addressable':
        return 'Addressable';
      case 'analogue':
        return 'Analogue Addressable';
      case 'networked':
        return 'Networked';
      case 'wireless':
        return 'Wireless';
      default:
        return type || '';
    }
  };

  // Format premises type
  const formatPremisesType = (type: string): string => {
    switch (type) {
      case 'residential':
        return 'Residential';
      case 'commercial':
        return 'Commercial';
      case 'industrial':
        return 'Industrial';
      case 'retail':
        return 'Retail';
      case 'healthcare':
        return 'Healthcare';
      case 'educational':
        return 'Educational';
      case 'hospitality':
        return 'Hospitality';
      case 'care-home':
        return 'Care Home';
      case 'hmo':
        return 'HMO';
      case 'mixed-use':
        return 'Mixed Use';
      default:
        return type || '';
    }
  };

  // Format occupancy type
  const formatOccupancyType = (type: string): string => {
    switch (type) {
      case 'sleeping':
        return 'Sleeping Risk';
      case 'day-use':
        return 'Day Use Only';
      case '24hr':
        return '24 Hour Occupation';
      case 'shift':
        return 'Shift Pattern';
      default:
        return type || '';
    }
  };

  // Format battery type
  const formatBatteryType = (type: string): string => {
    switch (type) {
      case 'sealed-lead-acid':
        return 'Sealed Lead Acid';
      case 'nickel-cadmium':
        return 'Nickel Cadmium';
      case 'lithium':
        return 'Lithium';
      default:
        return type || '';
    }
  };

  // Format system category description
  const getSystemCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      L1: 'Full coverage throughout the building',
      L2: 'Protection in escape routes + high-risk areas',
      L3: 'Protection of escape routes only',
      L4: 'Within escape routes only',
      L5: 'As risk assessment dictates',
      M: 'Manual call points only',
      P1: 'Full property protection',
      P2: 'Partial property protection',
    };
    return descriptions[category] || '';
  };

  // Format defect severity
  const formatSeverity = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'Critical';
      case 'non-critical':
        return 'Non-Critical';
      case 'recommendation':
        return 'Recommendation';
      default:
        return severity || '';
    }
  };

  const getSeverityClass = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'critical';
      case 'non-critical':
        return 'non-critical';
      case 'recommendation':
        return 'recommendation';
      default:
        return 'recommendation';
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

  const totalAlarmDevices = (formData.sounderCount || 0) + (formData.visualAlarmCount || 0);

  // Format zones for PDF
  const formatZones = (): Record<string, string | number>[] => {
    const zones: FireAlarmZone[] = formData.zones || [];
    return zones.map((zone) => ({
      zone_number: zone.zoneNumber,
      zone_name: zone.zoneName || '',
      location: zone.location || '',
      detector_count: zone.detectorCount || 0,
      call_point_count: zone.callPointCount || 0,
      sounder_count: zone.sounderCount || 0,
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
      remote_signalling_display: formatTestResult(tests.remoteSignalling),
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
      standby_display: formatTestResult(tests.standbyDuration),
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
      power_fail_display: formatTestResult(tests.powerFail),
    };
  };

  // Format sound readings
  const formatSoundReadings = (): Record<string, string | number | boolean>[] => {
    const readings = formData.soundLevelReadings || [];
    return readings.map((r) => {
      const dbValue = parseFloat(r.dBReading) || 0;
      const minRequired = parseFloat(r.minRequired) || 65;
      const isPassing = dbValue >= minRequired;

      return {
        zone: r.zone || '',
        location: r.location || '',
        area_type:
          (
            {
              general: 'General',
              sleeping: 'Sleeping',
              stairwell: 'Stairwell',
              'plant-room': 'Plant Room',
            } as Record<string, string>
          )[r.areaType || 'general'] ||
          r.areaType ||
          'General',
        db_reading: r.dBReading || '',
        min_required: r.minRequired || '65',
        result: isPassing ? 'PASS' : 'FAIL',
        result_class: isPassing ? 'pass' : 'fail',
      };
    });
  };

  // Format defects
  const formatDefects = (): Record<string, string | number | boolean>[] => {
    const defects = formData.defectsFound || [];
    return defects.map((d, index: number) => ({
      number: index + 1,
      description: d.description || '',
      severity: formatSeverity(d.severity),
      severity_class: getSeverityClass(d.severity),
      rectified: d.rectified || false,
      rectification_date: formatDateUK(d.rectificationDate || ''),
      photo_url: d.photoUrl || '',
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
      training: handover.trainingProvided || false,
      as_fitted_drawings: formData.handoverAsBuiltDrawings || false,
      operating_instructions: formData.handoverOperatingInstructions || false,
      log_book: formData.handoverLogBook || false,
      spares: formData.handoverSpares || false,
    };
  };

  // Format individual detector schedule
  const formatDetectors = (): Record<string, any>[] => {
    const items = formData.detectors || [];
    return items.map((d, index: number) => ({
      number: index + 1,
      zone_id: d.zoneId || '',
      location: d.location || '',
      type: d.type || '',
      make: d.make || '',
      model: d.model || '',
      serial_number: d.serialNumber || '',
      install_date: formatDateUK(d.installDate || ''),
      test_result: formatTestResult(d.testResult),
      test_result_class: getResultClass(d.testResult),
      notes: d.notes || '',
    }));
  };

  // Format individual sounder schedule
  const formatSounders = (): Record<string, any>[] => {
    const items = formData.sounders || [];
    return items.map((s, index: number) => ({
      number: index + 1,
      zone_id: s.zoneId || '',
      location: s.location || '',
      type: s.type || '',
      make: s.make || '',
      model: s.model || '',
      db_reading: s.dBReading || '',
      test_result: formatTestResult(s.testResult),
      test_result_class: getResultClass(s.testResult),
    }));
  };

  // Format individual call point schedule
  const formatCallPoints = (): Record<string, any>[] => {
    const items = formData.callPoints || [];
    return items.map((cp, index: number) => ({
      number: index + 1,
      zone_id: cp.zoneId || '',
      location: cp.location || '',
      type: cp.type || '',
      make: cp.make || '',
      model: cp.model || '',
      test_result: formatTestResult(cp.testResult),
      test_result_class: getResultClass(cp.testResult),
    }));
  };

  // Format interface equipment
  const formatInterfaceEquipment = (): Record<string, any>[] => {
    const items: InterfaceEquipment[] = formData.interfaceEquipment || [];
    return items.map((item) => ({
      type: item.type || '',
      location: item.location || '',
      interface_method: item.interfaceMethod || '',
      details: item.details || '',
      tested: item.tested || false,
    }));
  };

  // Format aspirating units
  const formatAspiratingUnits = (): Record<string, any>[] => {
    const units: AspiratingUnit[] = formData.aspiratingUnits || [];
    return units.map((unit) => ({
      make: unit.make || '',
      model: unit.model || '',
      sampling_points: unit.samplingPoints || 0,
      pipe_length: unit.pipeLength || '',
      transport_time: unit.transportTime || '',
      sensitivity_level: unit.sensitivityLevel || '',
    }));
  };

  // Format test equipment
  const formatTestEquipment = (): Record<string, any>[] => {
    const items: TestEquipmentItem[] = formData.testEquipment || [];
    return items.map((item) => ({
      type: item.type || '',
      make: item.make || '',
      model: item.model || '',
      serial_number: item.serialNumber || '',
      calibration_date: formatDateUK(item.calibrationDate || ''),
      calibration_due: formatDateUK(item.calibrationDue || ''),
    }));
  };

  // Get overall result display
  const overallResult = get('overallResult');
  const overallResultDisplay =
    overallResult === 'satisfactory'
      ? 'SATISFACTORY'
      : overallResult === 'unsatisfactory'
        ? 'UNSATISFACTORY'
        : '';
  const overallResultClass = overallResult === 'satisfactory' ? 'pass' : 'fail';

  // Format third-party certification
  const formatThirdPartyCertification = () => {
    const cert = formData.thirdPartyCertification || {};
    // G2 uses flat boolean fields; legacy uses nested object with strings
    const bafe =
      cert.bafeRegistration ||
      (formData.bafeRegistered ? formData.thirdPartyCertNumber || 'Yes' : '');
    const fia =
      cert.fiaMembership || (formData.fiaRegistered ? formData.thirdPartyCertNumber || 'Yes' : '');
    const nsi =
      cert.nsiSsaibCertification ||
      (formData.nsiRegistered ? formData.thirdPartyCertNumber || 'Yes' : '');
    const other = cert.otherAccreditation || '';
    return {
      bafe_registration: bafe,
      fia_membership: fia,
      nsi_ssaib_certification: nsi,
      other_accreditation: other,
      has_certification: !!(bafe || fia || nsi || other),
    };
  };

  // Format fire risk assessment
  const formatFireRiskAssessment = () => {
    const fra = formData.fireRiskAssessment || {};
    // G2 uses flat root-level fields; legacy uses nested object
    const ref = fra.fraReference || formData.fraReference || '';
    const date = fra.fraDate || formData.fraDate || '';
    const author = fra.fraAuthor || formData.fraAuthor || '';
    const company = fra.fraCompany || formData.fraCompany || '';
    return {
      fra_reference: ref,
      fra_date: formatDateUK(date),
      fra_author: author,
      fra_company: company,
      has_fra: !!(ref || author),
    };
  };

  // Format monitoring details
  const formatMonitoringDetails = () => {
    const monitoring = formData.monitoringDetails || {};
    // G2 uses flat root-level fields; legacy uses nested monitoringDetails object
    const isMonitored = monitoring.isMonitored || formData.systemMonitored || false;
    const arcName = monitoring.arcName || formData.arcName || '';
    const arcPhone = monitoring.arcContactNumber || formData.arcPhone || '';
    const arcAccount = monitoring.arcAccountNumber || formData.arcAccountNumber || '';
    const sigRoute = monitoring.signallingRoute || formData.signallingRoute || '';

    const signallingRouteDisplay =
      {
        'dual-path': 'Dual Path',
        'single-path': 'Single Path',
        'Dual path': 'Dual Path',
        'Single path': 'Single Path',
        redcare: 'BT Redcare',
        RedCare: 'BT Redcare',
        dualcom: 'Dualcom',
        Dualcom: 'Dualcom',
        gsm: 'GSM/GPRS',
        GSM: 'GSM',
        IP: 'IP',
        GPRS: 'GPRS',
        other: monitoring.signallingRouteOther || 'Other',
      }[sigRoute] ||
      sigRoute ||
      '';

    return {
      is_monitored: isMonitored,
      arc_name: arcName,
      arc_contact_number: arcPhone,
      arc_account_number: arcAccount,
      signalling_route: sigRoute,
      signalling_route_display: signallingRouteDisplay,
    };
  };

  // Format previous defects (for periodic testing)
  const formatPreviousDefects = (): Record<string, string | number | boolean>[] => {
    const defects = formData.previousDefects || [];
    return defects.map((d, index: number) => {
      const statusDisplay =
        {
          outstanding: 'Outstanding',
          rectified: 'Rectified',
          'no-longer-applicable': 'No Longer Applicable',
        }[d.status || ''] || '';
      const statusClass =
        {
          outstanding: 'fail',
          rectified: 'pass',
          'no-longer-applicable': 'na',
        }[d.status || ''] || 'na';

      return {
        number: index + 1,
        description: d.description || '',
        original_date: formatDateUK(d.originalDate || ''),
        status: d.status || 'outstanding',
        status_display: statusDisplay,
        status_class: statusClass,
        notes: d.notes || '',
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
    standard_edition: get('standardEdition') || 'BS 5839-1:2025',
    is_periodic: get('certificateType') === 'periodic',
    is_design: get('certificateType') === 'design',
    is_installation: get('certificateType') === 'installation',
    is_commissioning: get('certificateType') === 'commissioning',
    is_acceptance: get('certificateType') === 'acceptance',
    is_verification: get('certificateType') === 'verification',
    is_modification: get('certificateType') === 'modification',

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
    client_position: get('clientPosition'),
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
    floors_count: getNum('floorsCount', 1) || getNum('numberOfFloors', 1),
    floor_area: get('floorArea'),

    // ============================================
    // SYSTEM DETAILS
    // ============================================
    system_category: get('systemCategory'),
    system_category_description: getSystemCategoryDescription(get('systemCategory')),
    category_justification: get('categoryJustification'),
    network_type: get('networkType'),
    network_type_display: formatNetworkType(get('networkType')),
    zones_count: getNum('zonesCount', 1),
    repeaters_installed: getBool('repeatersInstalled'),
    panel_make: get('systemMake'),
    panel_model: get('systemModel'),
    panel_location: get('panelLocation'),
    panel_serial: get('panelSerialNumber'),
    panel_serial_photo: get('panelSerialPhoto'),
    panel_firmware_version: get('panelFirmwareVersion') || get('panelFirmware'),

    // ============================================
    // POWER SUPPLY
    // ============================================
    mains_power_supply: getBool('mainsPowerSupply') !== false, // Default true
    mains_supply_details: get('mainsSupplyDetails'),
    battery_type: get('batteryType'),
    battery_type_display: formatBatteryType(get('batteryType')),
    battery_backup_hours: getNum('batteryBackupHours', 24),
    battery_capacity: get('batteryCapacity'),
    standby_duration: get('standbyDuration'),
    battery_install_date: getDate('batteryInstallDate'),
    charger_type: get('chargerType'),
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
      co: detectorCount.co || 0,
    },
    // Auto-count from device arrays if available, fallback to manual counts
    total_detectors: (formData.detectors || []).length || totalDetectors,
    call_point_count: (formData.callPoints || []).length || formData.callPointCount || 0,
    sounder_count: (formData.sounders || []).length || formData.sounderCount || 0,
    visual_alarm_count: formData.visualAlarmCount || 0,
    total_alarm_devices:
      ((formData.sounders || []).length || formData.sounderCount || 0) +
      (formData.visualAlarmCount || 0),
    total_devices:
      ((formData.detectors || []).length || totalDetectors) +
      ((formData.callPoints || []).length || formData.callPointCount || 0) +
      ((formData.sounders || []).length || formData.sounderCount || 0) +
      (formData.visualAlarmCount || 0),

    // ============================================
    // ZONES
    // ============================================
    zones: formatZones(),
    has_zones: (formData.zones || []).length > 0,

    // ============================================
    // DEVICE SCHEDULES (individual items)
    // ============================================
    detectors: formatDetectors(),
    has_detectors: (formData.detectors || []).length > 0,
    sounders: formatSounders(),
    has_sounders: (formData.sounders || []).length > 0,
    call_points: formatCallPoints(),
    has_call_points: (formData.callPoints || []).length > 0,

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
    installer_company_address: get('installerCompanyAddress'),
    installer_phone: get('installerPhone') || get('installerCompanyPhone'),
    installer_email: get('installerEmail'),
    installer_qualifications: get('installerQualifications'),
    installer_competency_scheme: get('competencyScheme'),
    installer_registration_scheme: get('registrationScheme'),
    installer_registration_number: get('registrationNumber'),
    installer_date: getDate('installerDate') || getDate('installerSignatureDate'),
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

    // G1 Design-specific
    design_basis: get('designBasis'),
    coverage_rationale: get('coverageRationale'),
    design_coverage_category: get('designCoverageCategory'),
    ceiling_type: get('ceilingType'),
    beam_spacing: get('beamSpacing'),
    ventilation_notes: get('ventilationNotes'),
    building_construction_notes: get('buildingConstructionNotes'),
    ceiling_height: get('ceilingHeight'),
    detector_spacing: get('detectorSpacing'),
    coverage_per_detector: get('coveragePerDetector'),
    spacing_calculations: get('spacingCalculations'),
    design_doc_ref: get('designDocRef'),
    design_doc_date: getDate('designDocDate'),
    drawing_numbers: get('drawingNumbers'),
    design_deviations: get('designDeviations'),
    design_date: getDate('designDate'),
    planned_optical_smoke: getNum('plannedOpticalSmoke'),
    planned_heat: getNum('plannedHeat'),
    planned_multi_sensor: getNum('plannedMultiSensor'),
    planned_beam: getNum('plannedBeam'),
    planned_aspirating: getNum('plannedAspirating'),
    planned_flame: getNum('plannedFlame'),
    planned_co: getNum('plannedCO'),
    planned_call_points: getNum('plannedCallPoints'),
    planned_sounders: getNum('plannedSounders'),
    planned_vads: getNum('plannedVADs'),

    // G2 Installation-specific
    design_cert_reference: get('designCertReference'),
    design_cert_date: getDate('designCertDate'),
    designer_name_company: get('designerName'),
    installation_date: getDate('installationDate'),

    // Handover
    handover_as_built_drawings: getBool('handoverAsBuiltDrawings'),
    handover_operating_instructions: getBool('handoverOperatingInstructions'),
    handover_log_book: getBool('handoverLogBook'),
    handover_spares: getBool('handoverSpares'),
    handover_training: getBool('handoverTraining'),
    as_fitted_drawings_provided: getBool('asFittedDrawingsProvided'),
    zone_plan_provided: getBool('zonePlanProvided'),
    variations_from_design: get('variationsFromDesign'),
    design_doc_reference: get('designDocReference'),

    // Repeater panels
    repeater_panels: (formData.repeaterPanels || []).map((r: any, i: number) => ({
      number: i + 1,
      location: r.location || '',
      make: r.make || '',
      model: r.model || '',
    })),
    has_repeater_panels: (formData.repeaterPanels || []).length > 0,

    // Photos — general photos + device photos collected from arrays
    photos: (() => {
      const generalPhotos = formData.photos || [];
      const devicePhotos: string[] = [];
      (formData.detectors || []).forEach((d: any) => {
        if (d.photo) devicePhotos.push(d.photo);
      });
      (formData.sounders || []).forEach((s: any) => {
        if (s.photo) devicePhotos.push(s.photo);
      });
      (formData.callPoints || []).forEach((c: any) => {
        if (c.photo) devicePhotos.push(c.photo);
      });
      return [...generalPhotos, ...devicePhotos];
    })(),
    has_photos:
      (formData.photos || []).length > 0 ||
      (formData.detectors || []).some((d: any) => d.photo) ||
      (formData.sounders || []).some((s: any) => s.photo) ||
      (formData.callPoints || []).some((c: any) => c.photo),
    photo_count:
      (formData.photos || []).length +
      (formData.detectors || []).filter((d: any) => d.photo).length +
      (formData.sounders || []).filter((s: any) => s.photo).length +
      (formData.callPoints || []).filter((c: any) => c.photo).length,

    // ============================================
    // INTERFACE EQUIPMENT
    // ============================================
    interface_equipment: formatInterfaceEquipment(),
    has_interface_equipment: (formData.interfaceEquipment || []).length > 0,

    // ============================================
    // CABLE & WIRING
    // ============================================
    cable_type: get('cableType'),
    cable_fire_rating: get('cableFireRating'),
    circuit_integrity: get('circuitIntegrity'),
    red_cable_for_mains: getBool('redCableForMains'),
    wiring_notes: get('wiringNotes'),

    // ============================================
    // CAUSE & EFFECT
    // ============================================
    cause_effect_ref: get('causeAndEffectRef') || get('causeEffectReference'),
    cause_effect_verified: getBool('causeAndEffectVerified'),
    cause_effect_date: getDate('causeAndEffectDate'),
    evacuation_strategy: get('evacuationStrategy'),
    false_alarm_strategy_text: get('falseAlarmStrategy'),

    // ============================================
    // RESPONSIBLE PERSON
    // ============================================
    responsible_person: {
      name: get('responsiblePersonName'),
      position: get('responsiblePersonPosition'),
      signature: get('responsiblePersonSignature'),
      date: getDate('responsiblePersonDate'),
      acknowledgement: getBool('responsiblePersonAcknowledgement'),
    },

    // ============================================
    // DEVICES TESTED (Periodic)
    // ============================================
    devices_tested_count: getNum('devicesTestedCount'),
    devices_total_count: getNum('devicesTotalCount'),
    devices_tested_percentage:
      getNum('devicesTotalCount') > 0
        ? Math.round((getNum('devicesTestedCount') / getNum('devicesTotalCount')) * 100)
        : 0,
    device_testing_complete: getBool('deviceTestingComplete'),

    // ============================================
    // DESIGN CERTIFICATE
    // ============================================
    design: {
      basis: get('designBasis'),
      coverage_category: get('designCoverageCategory'),
      deviations: get('designDeviations'),
      doc_ref: get('designDocRef'),
    },

    // ============================================
    // ACCEPTANCE CERTIFICATE
    // ============================================
    acceptance: {
      criteria: get('acceptanceCriteria'),
      training_provided: getBool('acceptanceTrainingProvided'),
      log_book_provided: getBool('acceptanceLogBookProvided'),
    },

    // ============================================
    // VERIFICATION CERTIFICATE
    // ============================================
    verification: {
      organisation: get('verificationOrganisation'),
      scope: get('verificationScope'),
      findings: get('verificationFindings'),
      compliant: getBool('verificationCompliant'),
    },
    verifier_name: get('verifierName'),
    verifier_company: get('verifierCompany'),
    verifier_qualifications: get('verifierQualifications'),
    verifier_date: getDate('verifierDate'),
    verifier_signature: get('verifierSignature'),

    // ============================================
    // MODIFICATION CERTIFICATE
    // ============================================
    modification: {
      description: get('modificationDescription'),
      reason: get('modificationReason'),
      extent: get('modificationExtent'),
      original_cert_ref: get('originalCertRef'),
    },

    // ============================================
    // FALSE ALARM MANAGEMENT
    // ============================================
    false_alarm_management: getBool('falseAlarmManagement'),
    false_alarm_strategy: get('falseAlarmStrategy'),
    investigation_delay: getNum('investigationDelay'),
    false_alarm_notes: get('falseAlarmNotes'),

    // ============================================
    // LOOP/ADDRESSABLE DETAILS
    // ============================================
    loop_count: getNum('loopCount'),
    devices_per_loop: get('devicesPerLoop'),
    total_addressable_devices: getNum('totalAddressableDevices'),
    max_loop_capacity: getNum('maxLoopCapacity'),

    // ============================================
    // ASPIRATING SYSTEM
    // ============================================
    aspirating_units: formatAspiratingUnits(),
    has_aspirating_units: (formData.aspiratingUnits || []).length > 0,

    // ============================================
    // PREVIOUS CERTIFICATE (Periodic)
    // ============================================
    previous_certificate_date: getDate('previousCertificateDate'),
    previous_inspector: get('previousInspector'),
    previous_inspector_company: get('previousInspectorCompany'),

    // ============================================
    // ZONE PLAN REFERENCE
    // ============================================
    zone_plan_ref: get('zonePlanRef'),
    zone_plan_date: getDate('zonePlanDate'),

    // ============================================
    // EXTENT & LIMITATIONS (Periodic/Verification)
    // ============================================
    extent_of_inspection: get('extentOfInspection'),
    inspection_limitations: get('inspectionLimitations'),
    agreed_scope: get('agreedScope'),

    // ============================================
    // DETECTOR SPACING
    // ============================================
    detector_spacing_compliant: getBool('detectorSpacingCompliant'),
    spacing_notes: get('spacingNotes'),

    // ============================================
    // TEST EQUIPMENT
    // ============================================
    test_equipment: formatTestEquipment(),
    has_test_equipment: (formData.testEquipment || []).length > 0,

    // ============================================
    // ENVIRONMENTAL CONDITIONS
    // ============================================
    ambient_temperature: get('ambientTemperature'),
    ambient_noise_level: get('ambientNoiseLevel'),
    weather_conditions: get('weatherConditions'),

    // ============================================
    // BUILDING PLAN
    // ============================================
    building_plan_ref: get('buildingPlanRef'),
    building_plan_date: getDate('buildingPlanDate'),

    // ============================================
    // OCCUPANCY
    // ============================================
    estimated_occupancy: getNum('estimatedOccupancy'),
    occupancy_basis: get('occupancyBasis'),

    // ============================================
    // CONTACT DETAILS (legacy — G2 maps these earlier)
    // ============================================
    installer_company_phone: get('installerCompanyPhone'),
    commissioner_company_address: get('commissionerCompanyAddress'),
    commissioner_company_phone: get('commissionerCompanyPhone'),

    // ============================================
    // RELATED STANDARDS
    // ============================================
    related_standards: formData.relatedStandards || [],
    has_related_standards: (formData.relatedStandards || []).length > 0,

    // ============================================
    // COMPANY BRANDING (from profile)
    // ============================================
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_website: get('companyWebsite'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || get('companyAccentColor') || '#dc2626',
    registration_scheme_logo: get('registrationSchemeLogo'),
    registration_scheme: get('registrationScheme'),
  };
};
