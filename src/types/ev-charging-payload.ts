/**
 * ev-charging-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/ev-charging-payload-schema.ts.
 * Used as the return type of formatEVChargingJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface EVChargingPayloadType {
  // Nested objects
  metadata: {
    certificate_number: string;
    installation_date: string;
    standard: string;
    code_of_practice: string;
    section_reference: string;
  };

  client_details: {
    name: string;
    address: string;
    telephone: string;
    email: string;
  };

  vehicle_details: {
    make: string;
    model: string;
    registration: string;
  };

  installation_details: {
    address: string;
    type: string;
    type_display: string;
  };

  charger_details: {
    make: string;
    model: string;
    serial: string;
    mode: string;
    connection_type: string;
    connection_display: string;
    power_rating_kw: string;
    rated_current_a: string;
    phases: string;
    socket_type: string;
  };

  supply_details: {
    voltage: string;
    phases: string;
    phases_display: string;
    earthing_arrangement: string;
    ze: string;
    pfc: string;
    external_loop_impedance: string;
  };

  pme_details: {
    is_pme: boolean;
    is_pme_display: string;
    earthing_measures: string;
    earth_electrode_installed: boolean;
    earth_electrode_installed_display: string;
    earth_electrode_resistance: string;
  };

  circuit_details: {
    designation: string;
    cable_type: string;
    cable_size_mm2: string;
    cable_length_m: string;
    installation_method: string;
  };

  protection_details: {
    device_type: string;
    rating_a: string;
    curve: string;
    rcd_type: string;
    rcd_rating_ma: string;
    rcd_integral: boolean;
    rcd_integral_display: string;
  };

  test_results: {
    r1r2: string;
    r2: string;
    zs: string;
    max_zs: string;
    zs_satisfactory: string;
    insulation_resistance: string;
    insulation_satisfactory: string;
    polarity: string;
    polarity_display: string;
    rcd_trip_time: string;
    rcd_trip_time_satisfactory: string;
    rcd_trip_time_x5: string;
    rcd_trip_time_x5_satisfactory: string;
    earth_electrode_ra: string;
    functional_test: string;
    functional_test_display: string;
    load_test: string;
    load_test_display: string;
    load_test_current: string;
    voltage_drop: string;
    voltage_drop_satisfactory: string;
    phase_rotation: string;
    continuity_pe: string;
    rcd_test_button: string;
    rcd_test_button_display: string;
  };

  dno_notification: {
    required: boolean;
    submitted: boolean;
    submitted_display: string;
    date: string;
    reference: string;
    g98_notification: boolean;
    g98_display: string;
    g99_application: boolean;
    g99_display: string;
  };

  ozev_details: {
    applicable: boolean;
    applicable_display: string;
    scheme: string;
    scheme_display: string;
    reference: string;
  };

  smart_features: {
    smart_charging_enabled: boolean;
    smart_charging_display: string;
    load_management: boolean;
    load_management_display: string;
    load_management_type: string;
  };

  handover: {
    user_instructions_provided: boolean;
    user_instructions_display: string;
    operating_manual_provided: boolean;
    operating_manual_display: string;
    special_conditions: string;
  };

  installer: {
    name: string;
    company: string;
    qualifications: string;
    scheme: string;
    scheme_number: string;
    signature: string;
    date: string;
  };

  compliance: {
    bs7671: boolean;
    bs7671_display: string;
    iet_cop: boolean;
    iet_cop_display: string;
    building_regs: boolean;
    building_regs_display: string;
  };

  company_details: {
    company_name: string;
    company_address: string;
    company_phone: string;
    company_email: string;
    company_website: string;
    company_logo: string;
    company_tagline: string;
    company_accent_color: string;
    registration_scheme: string;
    registration_number: string;
    registration_scheme_logo: string;
  };

  // Root-level text fields
  additional_notes: string;
  special_conditions: string;
  declaration_text: string;

  // Flat copies — client
  client_name: string;
  client_address: string;
  client_telephone: string;
  client_email: string;

  // Flat copies — vehicle
  vehicle_make: string;
  vehicle_model: string;
  vehicle_registration: string;

  // Flat copies — installation
  installation_address: string;
  installation_date: string;
  installation_type: string;

  // Flat copies — charger
  charger_make: string;
  charger_model: string;
  charger_serial: string;
  charger_mode: string;
  charger_connection: string;
  power_rating_kw: string;
  rated_current_a: string;
  phases: string;
  socket_type: string;

  // Flat copies — supply
  supply_voltage: string;
  supply_phases: string;
  earthing_arrangement: string;
  ze: string;
  prospective_fault_current: string;
  external_loop_impedance: string;

  // Flat copies — PME
  is_pme: boolean;
  pme_earthing_measures: string;
  earth_electrode_installed: boolean;
  earth_electrode_resistance: string;

  // Flat copies — circuit
  circuit_designation: string;
  cable_type: string;
  cable_size_mm2: string;
  cable_length_m: string;
  installation_method: string;

  // Flat copies — protection
  protection_device_type: string;
  protection_device_rating_a: string;
  protection_device_curve: string;
  rcd_type: string;
  rcd_rating_ma: string;
  rcd_integral: boolean;

  // Flat copies — additional test results
  voltage_drop: string;
  phase_rotation: string;
  continuity_pe: string;
  rcd_test_button: string;

  // Flat copies — OZEV
  ozev_grant_applicable: boolean;
  ozev_scheme: string;
  ozev_grant_ref: string;

  // Flat copies — DNO
  dno_notified: boolean;
  dno_notification_date: string;
  dno_reference: string;
  g98_notification: boolean;
  g99_application: boolean;

  // Flat copies — smart
  smart_charging_enabled: boolean;
  load_management: boolean;
  load_management_type: string;

  // Flat copies — handover
  user_instructions_provided: boolean;
  operating_manual_provided: boolean;

  // Flat copies — installer
  installer_name: string;
  installer_company: string;
  installer_qualifications: string;
  installer_scheme: string;
  installer_scheme_number: string;
  installer_signature: string;
  installer_date: string;

  // Flat copies — compliance
  bs7671_compliance: boolean;
  iet_cop_compliance: boolean;
  building_regs_compliance: boolean;

  // Certificate
  certificate_number: string;

  // Flat copies — company branding
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  company_tagline: string;
  company_accent_color: string;
  registration_scheme: string;
  registration_number: string;
  registration_scheme_logo: string;
}
