/**
 * Formats EV Charging certificate form data for PDF generation
 * Compliant with BS 7671:2018+A4:2026 and IET CoP 5th Edition
 */

import { EVChargingFormData } from '@/types/ev-charging';
import type { EVChargingPayloadType } from '@/types/ev-charging-payload';
import { createAccessTracker, reportUnmappedFields } from './reportUnmappedFields';
import { ukDate } from '@/utils/certDate';

/**
 * The methods permitted by Reg 722.411.4.1, spelled out for the certificate.
 *
 * Indent (a) was deleted by A2:2022, so the list starts at (b). Anything not in
 * here is not a permitted method — an RCD in particular cannot detect an open
 * PEN, and used to be selectable.
 */
const PME_MEASURE_LABELS: Record<string, string> = {
  'earth-electrode': '722.411.4.1(b) — earth electrode, MET to Earth ≤ 70V on PEN fault',
  'voltage-monitor-cpc':
    '722.411.4.1(c) — device disconnecting within 5s if CPC-to-Earth exceeds 70V',
  'voltage-monitor-supply': '722.411.4.1(d) — device disconnecting within 5s outside 207–253V',
  'alternative-device': '722.411.4.1(e) — alternative device of no lesser safety',
  'electrical-separation': 'Not applicable — supply electrically separated (722.413)',
};

/**
 * Values written by the old options list, which offered methods that Reg
 * 722.411.4.1 does not permit.
 *
 * 15 certificates in the live table recorded `integral-rcd`. Dropping these to
 * blank would quietly erase what was actually recorded on an issued document,
 * so they are named and marked instead. They are deliberately NOT selectable
 * any more — this map exists to render history honestly, not to keep the option
 * alive.
 */
const LEGACY_PME_MEASURE_LABELS: Record<string, string> = {
  'integral-rcd':
    'Recorded as "Integral RCD protection in charger" — not a permitted method under Reg 722.411.4.1; an RCD cannot detect an open PEN',
  'class-ii': 'Recorded as "Class II charger used" — not a permitted method under Reg 722.411.4.1',
  'protective-bonding':
    'Recorded as "Additional protective bonding" — not a permitted method under Reg 722.411.4.1',
  'separated-extra-low':
    'Recorded as "Separated extra-low voltage" — see Reg 722.413 for the electrical separation route',
};

/** Permitted method first; otherwise name the legacy value; otherwise pass it through. */
export const pmeMeasureLabel = (raw: string): string =>
  PME_MEASURE_LABELS[raw] ?? LEGACY_PME_MEASURE_LABELS[raw] ?? raw;

export const formatEVChargingJson = (
  formData: Partial<EVChargingFormData>
): EVChargingPayloadType => {
  // Track which form-data keys we actually read, so reportUnmappedFields() can
  // flag any field the user filled in that never made it into the payload.
  const { keys: accessedKeys, track } = createAccessTracker();

  const get = (key: string, defaultValue: any = ''): string => {
    track(key);
    const value = (formData as any)[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value;
  };

  const getNum = (key: string, defaultValue: number = 0): number => {
    track(key);
    const value = (formData as any)[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  };

  /** Same as get(), but renders the ISO date the form stores as UK DD/MM/YYYY. */
  const getDate = (key: string): string => ukDate(get(key));

  const getBool = (key: string): boolean => {
    track(key);
    const value = (formData as any)[key];
    return value === true || value === 'true';
  };

  const getTestResult = (key: string): string => {
    track(`testResults.${key}`);
    return formData.testResults?.[key as keyof typeof formData.testResults] ?? '';
  };

  // Whether the outdoor question was answered at all, kept separate from its
  // value so "unanswered" and "No" stay distinguishable on the certificate.
  const rawOutdoors = (formData as EVChargingFormData & Record<string, unknown>)
    .vehicleChargedOutdoors;
  const outdoorsAnswered = rawOutdoors === true || rawOutdoors === false;

  // Vehicle make: when "Other" is chosen the picker stores the sentinel
  // '__other' in vehicleMake until the free-text is typed. Resolve to the
  // custom value so the sentinel never leaks onto the PDF.
  const vehicleMakeResolved =
    get('vehicleMake') === '__other' ? get('vehicleMakeCustom') : get('vehicleMake');

  // Safe numeric comparison for test validation
  const safeCompare = (a: string, b: string, comparison: 'lte' | 'gte'): string => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return '';
    if (comparison === 'lte') return numA <= numB ? 'Yes' : 'No';
    return numA >= numB ? 'Yes' : 'No';
  };

  const payload: EVChargingPayloadType = {
    // Metadata
    metadata: {
      certificate_number: get('certificateNumber'),
      installation_date: getDate('installationDate'),
      standard: 'BS 7671:2018+A4:2026',
      code_of_practice:
        'IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition)',
      section_reference: 'Section 722',
    },

    // Client Details
    client_details: {
      name: get('clientName'),
      address: get('clientAddress'),
      telephone: get('clientTelephone'),
      email: get('clientEmail'),
    },

    // Vehicle Details
    vehicle_details: {
      make: vehicleMakeResolved,
      model: get('vehicleModel'),
      registration: get('vehicleRegistration'),
    },

    // Installation Details
    installation_details: {
      address: get('installationAddress'),
      type: get('installationType'),
      type_display:
        get('installationType') === 'domestic'
          ? 'Domestic'
          : get('installationType') === 'commercial'
            ? 'Commercial'
            : get('installationType') === 'public'
              ? 'Public'
              : '',
    },

    // Charger Details
    charger_details: {
      make: get('chargerMake'),
      model: get('chargerModel'),
      serial: get('chargerSerial'),
      mode: get('chargerType'),
      connection_type: get('chargerConnection'),
      connection_display: !get('chargerConnection')
        ? ''
        : get('chargerConnection') === 'tethered'
          ? 'Tethered Cable'
          : 'Socket Outlet',
      power_rating_kw: get('powerRating'),
      rated_current_a: get('ratedCurrent'),
      phases: get('phases'),
      socket_type: get('socketType'),
    },

    // Supply Characteristics
    supply_details: {
      voltage: get('supplyVoltage'),
      phases: get('supplyPhases'),
      // Read-tolerant: the canonical values are 'single'/'three', but the Quick
      // Fill presets used to write the display strings 'Single Phase'/'Three
      // Phase'. Because the old test was a strict !== 'single', a saved
      // single-phase cert printed "Three Phase". Match on the leading word so
      // certificates already stored with the legacy value render correctly.
      phases_display: !get('supplyPhases')
        ? ''
        : /^single/i.test(String(get('supplyPhases')).trim())
          ? 'Single Phase'
          : 'Three Phase',
      earthing_arrangement: get('earthingArrangement'),
      ze: get('ze'),
      pfc: get('prospectiveFaultCurrent'),
      external_loop_impedance: get('externalLoopImpedance'),
    },

    /*
     * Next inspection. An installation certificate without one is incomplete,
     * and this payload had no such field.
     */
    next_inspection: {
      interval_months: get('nextInspectionInterval'),
      date: getDate('nextInspectionDate'),
      display: get('nextInspectionDate')
        ? `${ukDate(get('nextInspectionDate'))}${get('nextInspectionInterval') ? ` (${get('nextInspectionInterval')} months)` : ''}`
        : 'Not recorded',
    },

    // Earthing & main protective bonding — Reg 411.3.1.2 / 544.1.1 / 542.3.
    // Absent from this certificate entirely until now.
    earthing_bonding: {
      earthing_conductor_csa: get('earthingConductorCsa'),
      main_bonding_csa: get('mainBondingSize'),
      main_bonding_locations: get('mainBondingLocations'),
      main_bonding_verified: getBool('mainBondingVerified'),
      main_bonding_na: getBool('mainBondingNA'),
      main_bonding_display: getBool('mainBondingNA')
        ? 'No extraneous-conductive-parts requiring bonding'
        : get('mainBondingSize')
          ? `${get('mainBondingSize')}mm²${get('mainBondingLocations') ? ` — ${get('mainBondingLocations')}` : ''}`
          : 'Not recorded',
    },

    /*
     * Section 722 design confirmations — 722.312.2.1, 722.410.3.5/.3.6 and
     * 722.413.1.2. Requirements of the standard that the certificate had no
     * way to record.
     */
    section_722: {
      no_pen_in_final_circuit: getBool('noPenInFinalCircuit'),
      no_pen_in_final_circuit_display: getBool('noPenInFinalCircuit')
        ? 'Confirmed — no PEN conductor in the charging circuit (722.312.2.1)'
        : 'Not confirmed',
      prohibited_measures_not_used: getBool('prohibitedMeasuresNotUsed'),
      prohibited_measures_not_used_display: getBool('prohibitedMeasuresNotUsed')
        ? 'Confirmed — none of the measures prohibited by 722.410.3.5/.3.6 is used'
        : 'Not confirmed',
      separation_single_vehicle: getBool('separationSingleVehicle'),
      separation_transformer_standard: get('separationTransformerStandard'),
      separation_display:
        get('pmeEarthingMeasures') === 'electrical-separation'
          ? `${getBool('separationSingleVehicle') ? 'One vehicle from one unearthed source' : 'Single-vehicle limit not confirmed'}${
              get('separationTransformerStandard')
                ? ` — transformer to ${get('separationTransformerStandard')}`
                : ''
            }`
          : 'Not applicable',
    },

    // PME Considerations (722.411.4.1)
    pme_details: {
      is_pme: getBool('isPME'),
      is_pme_display: getBool('isPME') ? 'Yes' : 'No',
      earthing_measures: get('pmeEarthingMeasures'),
      // The raw value is a slug; without this the certificate printed
      // "voltage-monitor-supply" where it should name the method.
      earthing_measures_display: pmeMeasureLabel(String(get('pmeEarthingMeasures') ?? '')),
      earth_electrode_installed: getBool('earthElectrodeInstalled'),
      earth_electrode_installed_display: getBool('earthElectrodeInstalled') ? 'Yes' : 'No',
      earth_electrode_resistance: get('earthElectrodeResistance'),
      // The condition that triggers 722.411.4.1 at all. Without it the PDF
      // showed the earthing measure with nothing to say why it was needed.
      // Deliberately null, not false, when unanswered. getBool() collapses
      // null to false, so a template reaching for the raw name would print
      // "No" on a certificate where nobody answered — reading as "722.411.4.1
      // does not apply", which is the one wrong answer that hides the whole
      // requirement. Null renders blank in Liquid; the _display field carries
      // the wording.
      vehicle_charged_outdoors: outdoorsAnswered ? getBool('vehicleChargedOutdoors') : null,
      vehicle_charged_outdoors_display: !outdoorsAnswered
        ? 'Not recorded'
        : getBool('vehicleChargedOutdoors')
          ? 'Yes'
          : 'No',
      // 722.411.4.1 (h) and (i) — segregation downstream of a (c)/(d)/(e) device.
      segregation_confirmed: getBool('openPENSegregationConfirmed'),
      segregation_confirmed_display: getBool('openPENSegregationConfirmed') ? 'Yes' : 'No',
    },

    // Open-PEN device — method (c)/(d)/(e) of Reg 722.411.4.1
    open_pen: {
      device_fitted: getBool('openPENDeviceFitted'),
      device_fitted_display: getBool('openPENDeviceFitted') ? 'Yes' : 'No',
      // Reg 722.411.4.1 permits the functionality to sit inside the charging
      // equipment for methods (c), (d) and (e). Recording which it is matters:
      // an integral unit has no separate serial to inspect at the next EICR.
      device_location: get('openPENDeviceLocation'),
      device_location_display:
        get('openPENDeviceLocation') === 'integral'
          ? 'Integral to the charge point'
          : get('openPENDeviceLocation') === 'separate'
            ? 'Separate device'
            : '',
      manufacturer: get('openPENManufacturer'),
      model: get('openPENModel'),
      serial: get('openPENSerial'),
      test_verified: getBool('openPENTestVerified'),
      test_verified_display: getBool('openPENTestVerified') ? 'Yes' : 'No',
    },

    // Distribution Board
    distribution_board: {
      location: get('dbLocation'),
      manufacturer: get('dbManufacturer'),
      main_switch_rating: get('dbMainSwitchRating'),
    },

    // Circuit Details
    circuit_details: {
      dedicated_circuit: getBool('dedicatedCircuit'),
      dedicated_circuit_display: getBool('dedicatedCircuit') ? 'Yes' : 'No',
      cable_route: get('cableRoute'),
      designation: get('circuitDesignation'),
      cable_type: get('cableType'),
      cable_size_mm2: get('cableSize'),
      cable_length_m: get('cableLength'),
      installation_method: get('installationMethod'),
    },

    // Protection Details (722.531.2)
    protection_details: {
      device_type: get('protectionDeviceType'),
      rating_a: get('protectionDeviceRating'),
      curve: get('protectionDeviceCurve'),
      rcd_type: get('rcdType'),
      rcd_rating_ma: get('rcdRating'),
      rcd_integral: getBool('rcdIntegral'),
      rcd_integral_display: getBool('rcdIntegral') ? 'Integral to Charger' : 'Separate RCD',
    },

    // Protective devices & external influences (A4:2026)
    protective_devices: {
      spd_fitted: get('spdFitted'),
      spd_fitted_display:
        get('spdFitted') === 'yes'
          ? 'Fitted'
          : get('spdFitted') === 'no'
            ? 'Not fitted'
            : get('spdFitted') === 'na'
              ? 'N/A'
              : '',
      spd_type: get('spdType'),
      spd_location: get('spdLocation'),
      spd_status_ok: getBool('spdStatusOk'),
      spd_status_display: getBool('spdStatusOk') ? 'Healthy' : '',
      afdd_fitted: get('afddFitted'),
      afdd_fitted_display:
        get('afddFitted') === 'yes'
          ? 'Fitted'
          : get('afddFitted') === 'no'
            ? 'Not fitted'
            : get('afddFitted') === 'not-required'
              ? 'Not required (BS EN 61851)'
              : '',
      afdd_type: get('afddType'),
      ip_rating: get('ipRating'),
      ik_rating: get('ikRating'),
    },

    // Maximum demand assessment (722.311.201)
    demand_assessment: {
      existing_a: get('maxDemandExisting'),
      ev_a: get('maxDemandEv'),
      total_a: get('maxDemandTotal'),
      supply_capacity_a: get('supplyCapacity'),
      within_capacity: safeCompare(get('maxDemandTotal'), get('supplyCapacity'), 'lte'),
      load_curtailment: getBool('loadManagement'),
      load_curtailment_display: getBool('loadManagement') ? 'Applied (722.311.201)' : '',
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
      polarity_display:
        getTestResult('polarity') === 'correct'
          ? 'Correct'
          : getTestResult('polarity') === 'incorrect'
            ? 'Incorrect'
            : '',
      rcd_trip_time: getTestResult('rcdTripTime'),
      rcd_trip_time_satisfactory: safeCompare(getTestResult('rcdTripTime'), '300', 'lte'),
      rcd_trip_time_x5: getTestResult('rcdTripTimeX5'),
      rcd_trip_time_x5_satisfactory: safeCompare(getTestResult('rcdTripTimeX5'), '40', 'lte'),
      earth_electrode_ra: getTestResult('earthElectrodeRa'),
      functional_test: getTestResult('functionalTest'),
      functional_test_display:
        getTestResult('functionalTest') === 'pass'
          ? 'Pass'
          : getTestResult('functionalTest') === 'fail'
            ? 'Fail'
            : '',
      load_test: getTestResult('loadTest'),
      load_test_display:
        getTestResult('loadTest') === 'pass'
          ? 'Pass'
          : getTestResult('loadTest') === 'fail'
            ? 'Fail'
            : '',
      load_test_current: getTestResult('loadTestCurrent'),
      voltage_drop: getTestResult('voltageDrop'),
      voltage_drop_satisfactory: safeCompare(getTestResult('voltageDrop'), '11.5', 'lte'),
      phase_rotation: getTestResult('phaseRotation'),
      continuity_pe: getTestResult('continuityPE'),
      rcd_test_button: getTestResult('rcdTestButton'),
      rcd_test_button_display:
        getTestResult('rcdTestButton') === 'pass'
          ? 'Pass'
          : getTestResult('rcdTestButton') === 'fail'
            ? 'Fail'
            : '',
      ambient_temperature: getTestResult('ambientTemperature'),
    },

    // Test Equipment
    test_equipment: {
      model: get('testInstrumentModel'),
      serial: get('testInstrumentSerial'),
      calibration_date: getDate('testInstrumentCalDate'),
    },

    // DNO Notification
    dno_notification: {
      required: getBool('dnoNotified') || getBool('g98Notification') || getBool('g99Application'),
      submitted: getBool('dnoNotified'),
      submitted_display: getBool('dnoNotified') ? 'Yes' : 'No',
      date: getDate('dnoNotificationDate'),
      reference: get('dnoReference'),
      // ENA Connect Direct application reference — the route the notification
      // is actually made through.
      connect_direct_reference: get('connectDirectReference'),
      g98_notification: getBool('g98Notification'),
      g98_display: getBool('g98Notification') ? 'Yes' : 'N/A',
      g99_application: getBool('g99Application'),
      g99_display: getBool('g99Application') ? 'Yes' : 'N/A',
    },

    // OZEV Grant Details
    ozev_details: {
      applicable: getBool('ozevGrantApplicable'),
      applicable_display: getBool('ozevGrantApplicable') ? 'Yes' : 'No',
      scheme: get('ozevScheme'),
      scheme_display:
        get('ozevScheme') === 'EVHS'
          ? 'Electric Vehicle Homecharge Scheme'
          : get('ozevScheme') === 'WCS'
            ? 'Workplace Charging Scheme'
            : get('ozevScheme') === 'OZEV-flat'
              ? 'Flat Owner-Occupier Grant'
              : '',
      reference: get('ozevGrantRef'),
    },

    // Smart Functionality
    smart_features: {
      smart_charging_enabled: getBool('smartChargingEnabled'),
      smart_charging_display: getBool('smartChargingEnabled') ? 'Yes' : 'No',
      load_management: getBool('loadManagement'),
      load_management_display: getBool('loadManagement') ? 'Yes' : 'No',
      load_management_type: get('loadManagementType'),
    },

    // Handover
    handover: {
      user_instructions_provided: getBool('userInstructionsProvided'),
      user_instructions_display: getBool('userInstructionsProvided') ? 'Yes' : 'No',
      operating_manual_provided: getBool('operatingManualProvided'),
      operating_manual_display: getBool('operatingManualProvided') ? 'Yes' : 'No',
      special_conditions: get('specialConditions'),
    },

    // Installer Declaration
    installer: {
      name: get('installerName'),
      company: get('installerCompany'),
      qualifications: get('installerQualifications'),
      scheme: get('installerScheme'),
      scheme_number: get('installerSchemeNumber'),
      signature: get('installerSignature'),
      date: getDate('installerDate'),
    },

    // Compliance
    compliance: {
      bs7671: getBool('bs7671Compliance'),
      bs7671_display: getBool('bs7671Compliance') ? '✓' : '',
      iet_cop: getBool('ietCopCompliance'),
      iet_cop_display: getBool('ietCopCompliance') ? '✓' : '',
      building_regs: getBool('buildingRegsCompliance'),
      building_regs_display: getBool('buildingRegsCompliance') ? '✓' : '',
    },

    // Verification Checklist
    verification: {
      charger_power_up: getBool('chargerPowerUpVerified'),
      charger_power_up_display: getBool('chargerPowerUpVerified') ? '✓' : '',
      led_indicators: getBool('ledIndicatorsVerified'),
      led_indicators_display: getBool('ledIndicatorsVerified') ? '✓' : '',
      cable_secure: getBool('cableSecureVerified'),
      cable_secure_display: getBool('cableSecureVerified') ? '✓' : '',
      earth_continuity: getBool('earthContinuityVerified'),
      earth_continuity_display: getBool('earthContinuityVerified') ? '✓' : '',
    },

    // Building Regulations Notification
    building_regs_notification: {
      required: getBool('buildingRegsRequired'),
      required_display: getBool('buildingRegsRequired') ? 'Yes' : 'No',
      via_scheme: getBool('buildingRegsViaScheme'),
      via_scheme_display: getBool('buildingRegsViaScheme') ? 'Yes' : 'No',
      submitted: getBool('buildingRegsSubmitted'),
      submitted_display: getBool('buildingRegsSubmitted') ? 'Yes' : 'No',
    },

    // Additional Notes
    additional_notes: get('additionalNotes'),
    special_conditions: get('specialConditions'),

    // Declaration Text (hardcoded for PDF)
    declaration_text:
      'I/We certify that this EV charging equipment has been designed, installed, inspected and tested in accordance with BS 7671:2018+A4:2026 and the IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition).',

    // ============================================
    // FLAT COPIES FOR DIRECT TEMPLATE ACCESS
    // ============================================

    // Client (flat)
    client_name: get('clientName'),
    client_address: get('clientAddress'),
    client_telephone: get('clientTelephone'),
    client_email: get('clientEmail'),

    // Vehicle (flat)
    vehicle_make: vehicleMakeResolved,
    vehicle_model: get('vehicleModel'),
    vehicle_registration: get('vehicleRegistration'),

    // Installation (flat)
    installation_address: get('installationAddress'),
    installation_type: get('installationType'),
    installation_date: getDate('installationDate'),

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
    vehicle_charged_outdoors: outdoorsAnswered ? getBool('vehicleChargedOutdoors') : null,
    open_pen_segregation_confirmed: getBool('openPENSegregationConfirmed'),
    open_pen_device_location: get('openPENDeviceLocation'),
    earthing_conductor_csa: get('earthingConductorCsa'),
    main_bonding_csa: get('mainBondingSize'),
    main_bonding_locations: get('mainBondingLocations'),
    main_bonding_verified: getBool('mainBondingVerified'),
    main_bonding_na: getBool('mainBondingNA'),
    no_pen_in_final_circuit: getBool('noPenInFinalCircuit'),
    prohibited_measures_not_used: getBool('prohibitedMeasuresNotUsed'),
    separation_single_vehicle: getBool('separationSingleVehicle'),
    separation_transformer_standard: get('separationTransformerStandard'),
    connect_direct_reference: get('connectDirectReference'),
    next_inspection_interval: get('nextInspectionInterval'),
    next_inspection_date: getDate('nextInspectionDate'),

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

    // Additional Test Results (flat)
    voltage_drop: getTestResult('voltageDrop'),
    phase_rotation: getTestResult('phaseRotation'),
    continuity_pe: getTestResult('continuityPE'),
    rcd_test_button: getTestResult('rcdTestButton'),

    // OZEV (flat)
    ozev_grant_applicable: getBool('ozevGrantApplicable'),
    ozev_scheme: get('ozevScheme'),
    ozev_grant_ref: get('ozevGrantRef'),

    // DNO (flat)
    dno_notified: getBool('dnoNotified'),
    dno_notification_date: getDate('dnoNotificationDate'),
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
    installer_date: getDate('installerDate'),

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
      registration_scheme_logo: get('registrationSchemeLogo'),
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
    registration_scheme_logo: get('registrationSchemeLogo'),
  };

  // Safety net: warn (via Sentry) if any field the user filled in wasn't read by
  // this formatter — i.e. it would be silently dropped from the PDF. The ignore
  // list is the set of form-data keys that are deliberately not mapped: pure UI
  // state, or values resolved through another key (vehicleMakeCustom →
  // vehicleMake). companyName/etc. live on the merged settings object, not the
  // form, so they never appear here as unmapped.
  reportUnmappedFields('ev-charging', formData as Record<string, unknown>, accessedKeys, {
    ignore: ['completedSections', 'status', 'sameAsClientAddress', 'vehicleMakeCustom'],
    nestedKeys: ['testResults'],
  });

  return payload;
};
