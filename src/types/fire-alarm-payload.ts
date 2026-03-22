/**
 * fire-alarm-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/fire-alarm-payload-schema.ts.
 * Used as the return type of formatFireAlarmJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface FireAlarmZonePayload {
  zone_number: number | string;
  zone_name: string;
  location: string;
  detector_count: number;
  call_point_count: number;
  sounder_count: number;
}

export interface FireAlarmDetectorPayload {
  number: number;
  zone_id: string;
  location: string;
  type: string;
  make: string;
  model: string;
  serial_number: string;
  install_date: string;
  test_result: string;
  test_result_class: string;
  notes: string;
}

export interface FireAlarmSounderPayload {
  number: number;
  zone_id: string;
  location: string;
  type: string;
  make: string;
  model: string;
  db_reading: string;
  test_result: string;
  test_result_class: string;
}

export interface FireAlarmCallPointPayload {
  number: number;
  zone_id: string;
  location: string;
  type: string;
  make: string;
  model: string;
  test_result: string;
  test_result_class: string;
}

export interface FireAlarmSoundReadingPayload {
  zone: string;
  location: string;
  area_type: string;
  db_reading: string;
  min_required: string;
  result: string;
  result_class: string;
}

export interface FireAlarmDefectPayload {
  number: number;
  description: string;
  severity: string;
  severity_class: string;
  rectified: boolean;
  rectification_date: string;
  photo_url: string;
}

export interface FireAlarmPreviousDefectPayload {
  number: number;
  description: string;
  original_date: string;
  status: string;
  status_display: string;
  status_class: string;
  notes: string;
}

export interface FireAlarmInterfaceEquipmentPayload {
  type: string;
  location: string;
  interface_method: string;
  details: string;
  tested: boolean;
}

export interface FireAlarmAspiratingUnitPayload {
  make: string;
  model: string;
  sampling_points: number;
  pipe_length: string;
  transport_time: string;
  sensitivity_level: string;
}

export interface FireAlarmTestEquipmentPayload {
  type: string;
  make: string;
  model: string;
  serial_number: string;
  calibration_date: string;
  calibration_due: string;
}

export interface FireAlarmPhotoPayload {
  url: string;
  caption: string;
}

export interface FireAlarmPayloadType {
  // Metadata
  certificate_number: string;
  certificate_type: string;
  certificate_type_display: string;
  inspection_date: string;
  previous_certificate_ref: string;
  standard_edition: string;
  is_periodic: boolean;
  is_design: boolean;
  is_installation: boolean;
  is_commissioning: boolean;
  is_acceptance: boolean;
  is_verification: boolean;
  is_modification: boolean;

  // Third-party certification
  bafe_registration: string;
  fia_membership: string;
  nsi_ssaib_certification: string;
  other_accreditation: string;
  has_certification: boolean;

  // Fire risk assessment
  fra_reference: string;
  fra_date: string;
  fra_author: string;
  fra_company: string;
  has_fra: boolean;

  // Client details
  client_name: string;
  client_address: string;
  client_telephone: string;
  client_email: string;

  // Premises details
  premises_name: string;
  premises_address: string;
  premises_type: string;
  premises_type_display: string;
  occupancy_type: string;
  occupancy_type_display: string;
  floors_count: number;
  estimated_occupancy: number;
  occupancy_basis: string;

  // System details
  system_category: string;
  system_category_description: string;
  network_type: string;
  network_type_display: string;
  zones_count: number;
  repeaters_installed: boolean;
  panel_make: string;
  panel_model: string;
  panel_location: string;
  panel_serial: string;
  panel_serial_photo: string;
  panel_firmware_version: string;

  // Loop/addressable details
  loop_count: number;
  devices_per_loop: string;
  total_addressable_devices: number;
  max_loop_capacity: number;

  // Detector spacing
  detector_spacing_compliant: boolean;
  spacing_notes: string;

  // Power supply
  mains_power_supply: boolean;
  battery_type: string;
  battery_type_display: string;
  battery_backup_hours: number;
  battery_test_result: string;
  battery_test_result_display: string;
  battery_test_result_class: string;

  // Equipment counts
  detector_count: {
    optical_smoke: number;
    ionisation_smoke: number;
    multi_sensor: number;
    heat_fixed: number;
    heat_ror: number;
    beam: number;
    aspirating: number;
    flame: number;
    co: number;
  };
  total_detectors: number;
  call_point_count: number;
  sounder_count: number;
  visual_alarm_count: number;
  total_alarm_devices: number;
  total_devices: number;

  // Cable & wiring
  cable_type: string;
  cable_fire_rating: string;
  circuit_integrity: string;
  wiring_notes: string;

  // Cause & effect
  cause_effect_ref: string;
  cause_effect_verified: boolean;
  cause_effect_date: string;

  // False alarm management
  false_alarm_management: boolean;
  false_alarm_strategy: string;
  investigation_delay: number;
  false_alarm_notes: string;

  // Commissioning
  commissioning_date: string;
  handover_date: string;

  // Nested objects
  monitoring: {
    is_monitored: boolean;
    arc_name: string;
    arc_contact_number: string;
    arc_account_number: string;
    signalling_route: string;
    signalling_route_display: string;
  };

  handover: {
    as_built_drawings: boolean;
    as_fitted_drawings: boolean;
    operation_manual: boolean;
    maintenance_log: boolean;
    zone_chart: boolean;
    cause_effect: boolean;
    training: boolean;
    operating_instructions: boolean;
    log_book: boolean;
    spares: boolean;
  };

  responsible_person: {
    name: string;
    position: string;
    signature: string;
    date: string;
    acknowledgement: boolean;
  };

  panel_tests: {
    power_on_result: string;
    power_on_display: string;
    zone_indicators_result: string;
    zone_indicators_display: string;
    fault_indicators_result: string;
    fault_indicators_display: string;
    silence_result: string;
    silence_display: string;
    reset_result: string;
    reset_display: string;
    event_log_result: string;
    event_log_display: string;
    remote_signalling_result: string;
    remote_signalling_display: string;
  };

  power_tests: {
    mains_result: string;
    mains_display: string;
    battery_voltage: string;
    battery_condition_result: string;
    battery_condition_display: string;
    charger_result: string;
    charger_display: string;
    standby_result: string;
    standby_display: string;
  };

  fault_tests: {
    open_circuit_result: string;
    open_circuit_display: string;
    short_circuit_result: string;
    short_circuit_display: string;
    earth_fault_result: string;
    earth_fault_display: string;
    power_fail_result: string;
    power_fail_display: string;
  };

  design: {
    basis: string;
    coverage_category: string;
    deviations: string;
    doc_ref: string;
  };

  acceptance: {
    criteria: string;
    training_provided: boolean;
    log_book_provided: boolean;
  };

  verification: {
    organisation: string;
    scope: string;
    findings: string;
    compliant: boolean;
  };

  modification: {
    description: string;
    reason: string;
    extent: string;
    original_cert_ref: string;
  };

  // Arrays
  zones: FireAlarmZonePayload[];
  has_zones: boolean;
  detectors: FireAlarmDetectorPayload[];
  has_detectors: boolean;
  sounders: FireAlarmSounderPayload[];
  has_sounders: boolean;
  call_points: FireAlarmCallPointPayload[];
  has_call_points: boolean;
  sound_readings: FireAlarmSoundReadingPayload[];
  has_sound_readings: boolean;
  defects: FireAlarmDefectPayload[];
  has_defects: boolean;
  no_defects: boolean;
  previous_defects: FireAlarmPreviousDefectPayload[];
  has_previous_defects: boolean;
  interface_equipment: FireAlarmInterfaceEquipmentPayload[];
  has_interface_equipment: boolean;
  aspirating_units: FireAlarmAspiratingUnitPayload[];
  has_aspirating_units: boolean;
  test_equipment: FireAlarmTestEquipmentPayload[];
  has_test_equipment: boolean;
  photos: FireAlarmPhotoPayload[];
  has_photos: boolean;
  related_standards: string[];
  has_related_standards: boolean;

  // Declarations — Designer
  designer_name: string;
  designer_company: string;
  designer_qualifications: string;
  designer_date: string;
  designer_signature: string;

  // Declarations — Installer
  installer_name: string;
  installer_company: string;
  installer_company_address: string;
  installer_company_phone: string;
  installer_qualifications: string;
  installer_date: string;
  installer_signature: string;

  // Declarations — Commissioner/Tester
  commissioner_name: string;
  commissioner_company: string;
  commissioner_company_address: string;
  commissioner_company_phone: string;
  commissioner_qualifications: string;
  commissioner_date: string;
  commissioner_signature: string;

  // Declarations — Verifier
  verifier_name: string;
  verifier_company: string;
  verifier_qualifications: string;
  verifier_date: string;
  verifier_signature: string;

  // Overall result
  overall_result: string;
  overall_result_display: string;
  overall_result_class: string;

  // Service schedule
  next_service_due: string;
  next_inspection_due: string;

  // Additional notes
  additional_notes: string;
  has_additional_notes: boolean;

  // Devices tested (periodic)
  devices_tested_count: number;
  devices_total_count: number;
  devices_tested_percentage: number;
  device_testing_complete: boolean;

  // Extent & limitations
  extent_of_inspection: string;
  inspection_limitations: string;
  agreed_scope: string;

  // Previous certificate
  previous_certificate_date: string;
  previous_inspector: string;
  previous_inspector_company: string;

  // Plan references
  zone_plan_ref: string;
  zone_plan_date: string;
  building_plan_ref: string;
  building_plan_date: string;

  // Environmental conditions
  ambient_temperature: string;
  ambient_noise_level: string;
  weather_conditions: string;

  // Company branding
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  company_accent_color: string;
  registration_scheme_logo: string;
  registration_scheme: string;
}
