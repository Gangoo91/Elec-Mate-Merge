/**
 * solar-pv-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/solar-pv-payload-schema.ts.
 * Used as the return type of formatSolarPVJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface SolarPVArrayPayload {
  array_number: number;
  panel_make: string;
  panel_model: string;
  panel_wattage: number;
  panel_count: number;
  array_capacity: string;
  mcs_certified: boolean;
  orientation: string;
  tilt_angle: number;
  shading_factor: number;
  shading_percentage: string;
  string_voc: string;
  string_isc: string;
  mounting_type: string;
  mounting_type_display: string;
}

export interface SolarPVInverterPayload {
  inverter_number: number;
  make: string;
  model: string;
  serial_number: string;
  rated_power: number;
  mcs_certified: boolean;
  type: string;
  type_display: string;
  mppt_count: number;
  phases: string;
  phases_display: string;
  location: string;
}

export interface SolarPVArrayTestPayload {
  array_number: number;
  array_name: string;
  voc_measured: string;
  isc_measured: string;
  insulation_resistance: string;
  polarity_result: string;
  polarity_class: string;
  continuity_result: string;
  continuity_class: string;
}

export interface SolarPVInverterTestPayload {
  inverter_number: number;
  inverter_name: string;
  dc_isolator_result: string;
  dc_isolator_class: string;
  ac_isolator_result: string;
  ac_isolator_class: string;
  anti_islanding_result: string;
  anti_islanding_class: string;
  protection_result: string;
  protection_class: string;
}

export interface SolarPVDefectPayload {
  number: number;
  description: string;
  severity: string;
  severity_class: string;
  rectified: boolean;
  rectification_date: string;
}

export interface SolarPVPhotoPayload {
  url: string;
  caption: string;
  category: string;
}

export interface SolarPVPayloadType {
  // Metadata
  certificate_number: string;
  certificate_type: string;
  certificate_type_display: string;
  work_type: string;
  work_type_display: string;
  installation_date: string;
  commissioning_date: string;
  design_reference: string;
  previous_installation_ref: string;
  status: string;

  // Client details
  client_name: string;
  client_address: string;
  client_postcode: string;
  client_email: string;
  client_phone: string;

  // Installation address
  installation_address: string;
  installation_postcode: string;

  // Property & ownership
  property_type: string;
  property_type_display: string;
  ownership_type: string;
  property_age: string;
  roof_age: string;

  // Site access & safety
  site_access_notes: string;
  safe_isolation_verified: boolean;
  asbestos_check_required: boolean;
  asbestos_check_completed: boolean;
  structural_assessment_required: boolean;
  structural_assessment_completed: boolean;

  // MCS compliance
  mcs_details: {
    installer_number: string;
    installation_number: string;
    consumer_code: string;
    consumer_code_display: string;
  };

  // System overview
  system_type: string;
  system_type_display: string;
  total_capacity: string;
  total_panels: number;
  estimated_annual_yield: string;
  estimated_co2_savings: string;
  yield_calculation_method: string;
  yield_calculation_method_display: string;
  yield_calculation_notes: string;

  // PV arrays
  arrays: SolarPVArrayPayload[];
  has_arrays: boolean;
  array_count: number;

  // Inverters
  inverters: SolarPVInverterPayload[];
  has_inverters: boolean;
  inverter_count: number;

  // Battery storage
  battery: {
    installed: boolean;
    make: string;
    model: string;
    serial_number: string;
    capacity: number;
    chemistry: string;
    chemistry_display: string;
  };
  has_battery: boolean;

  // Grid connection
  grid_connection: {
    dno_name: string;
    mpan: string;
    application_reference: string;
    application_type: string;
    application_type_display: string;
    application_date: string;
    approval_date: string;
    approval_reference: string;
    export_limited: boolean;
    export_limit_kw: string;
  };

  // Metering
  metering: {
    meter_type: string;
    meter_type_display: string;
    meter_make: string;
    meter_model: string;
    meter_serial: string;
    ct_ratio: string;
  };

  // Test results
  array_tests: SolarPVArrayTestPayload[];
  has_array_tests: boolean;
  inverter_tests: SolarPVInverterTestPayload[];
  has_inverter_tests: boolean;
  ac_tests: {
    earthing_arrangement: string;
    earthing_arrangement_display: string;
    ze_value: string;
    zs_value: string;
    rcd_type: string;
    rcd_rating: string;
    rcd_trip_time: string;
    insulation_resistance: string;
    polarity_result: string;
    polarity_class: string;
    bidirectional_device_installed: boolean;
    bidirectional_device_type: string;
    bidirectional_device_make: string;
    bidirectional_device_model: string;
    bidirectional_device_result: string;
    bidirectional_device_class: string;
  };
  commissioning: {
    system_operational: boolean;
    export_verified: boolean;
    generation_meter_reading: string;
    customer_briefed: boolean;
    documentation_provided: boolean;
  };

  // Defects
  defects: SolarPVDefectPayload[];
  has_defects: boolean;
  no_defects: boolean;
  defect_count: number;

  // Handover
  handover: {
    user_manual_provided: boolean;
    warranty_docs_provided: boolean;
    mcs_document_provided: boolean;
    maintenance_schedule_provided: boolean;
    emergency_shutdown_explained: boolean;
  };

  // Declarations — Installer
  installer_name: string;
  installer_company: string;
  installer_mcs_number: string;
  installer_address: string;
  installer_phone: string;
  installer_email: string;
  installer_signature: string;
  installer_date: string;

  // Declarations — Electrician (optional)
  electrician_required: boolean;
  electrician_name: string;
  electrician_company: string;
  electrician_registration: string;
  electrician_scheme: string;
  electrician_signature: string;
  electrician_date: string;
  has_electrician: boolean;

  // Photos
  photos: SolarPVPhotoPayload[];
  has_photos: boolean;
  photo_count: number;

  // Overall assessment
  overall_satisfactory: boolean;
  overall_assessment_display: string;
  overall_assessment_class: string;

  // Additional notes
  additional_notes: string;
  has_additional_notes: boolean;

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
  registration_number: string;
}
