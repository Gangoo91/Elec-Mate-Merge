/**
 * eicr-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/eicr-payload-schema.ts.
 * Used as the return type of formatEICRJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

// ─── Sub-types ───────────────────────────────────────────────────────

export interface EICRCircuit {
  id: string;
  circuit_number: string;
  circuit_description: string;
  circuit_type: string;
  type_of_wiring: string;
  reference_method: string;
  points_served: string;
  live_size: string;
  cpc_size: string;
  bs_standard: string;
  protective_device_type: string;
  protective_device_curve: string;
  protective_device_rating: string;
  protective_device_ka_rating: string;
  max_zs: string;
  protective_device_location: string;
  rcd_bs_standard: string;
  rcd_type: string;
  rcd_rating: string;
  rcd_rating_a: string;
  ring_r1: string;
  ring_rn: string;
  ring_r2: string;
  r1r2: string;
  r2: string;
  ring_continuity_live: string;
  ring_continuity_neutral: string;
  insulation_test_voltage: string;
  insulation_live_neutral: string;
  insulation_live_earth: string;
  insulation_resistance: string;
  insulation_neutral_earth: string;
  polarity: string;
  zs: string;
  rcd_one_x: string;
  rcd_test_button: string;
  afdd_test: string;
  rcd_half_x: string;
  rcd_five_x: string;
  pfc: string;
  pfc_live_neutral: string;
  pfc_live_earth: string;
  functional_testing: string;
  notes: string;
  source_circuit_id: string;
  auto_filled: boolean | string;
  phase_type: string;
  phase_rotation: string;
  phase_balance_l1: string;
  phase_balance_l2: string;
  phase_balance_l3: string;
  line_to_line_voltage: string;
  circuit_designation: string;
  type: string;
  cable_size: string;
  protective_device: string;
}

export interface EICRBoardWithSchedule {
  db_reference: string;
  db_location: string;
  db_manufacturer: string;
  db_type: string;
  db_ways: string;
  db_zdb: string;
  db_ipf: string;
  zdb: string;
  ipf: string;
  supplied_from: string;
  incoming_device_bs_en: string;
  incoming_device_type: string;
  incoming_device_rating: string;
  polarity_confirmed: boolean;
  phase_sequence_confirmed: boolean;
  ring_final_circuit_confirmed: boolean;
  spd_operational: boolean;
  spd_na: boolean;
  spd_type: string;
  spd_t1: boolean;
  spd_t2: boolean;
  spd_t3: boolean;
  spd_make: string;
  spd_model: string;
  spd_location: string;
  spd_rated_current_ka: string;
  main_switch_bs_en: string;
  main_switch_type: string;
  main_switch_rating: string;
  main_switch_poles: string;
  circuit_count: number;
  circuits: EICRCircuit[];
}

export interface EICRObservation {
  id: string;
  item: string;
  defect_code: string;
  description: string;
  recommendation: string;
  regulation: string;
  rectified: boolean;
  photo_evidence: string[];
  photo_count: number;
}

export interface EICRAdditionalBoard {
  designation: string;
  location: string;
  manufacturer: string;
  board_type: string;
  ways: string;
  zdb: string;
  ipf: string;
  // A4:2026 — sub-boards carry full board details (parity with main)
  supplied_from: string;
  incoming_device_bs_en: string;
  incoming_device_type: string;
  incoming_device_rating: string;
  main_switch_bs_en: string;
  main_switch_type: string;
  main_switch_rating: string;
  main_switch_poles: string;
  polarity_confirmed: boolean;
  phase_sequence_confirmed: boolean;
  ring_final_circuit_confirmed: boolean;
  spd_operational: boolean;
  spd_na: boolean;
  spd_type: string;
  spd_t1: boolean;
  spd_t2: boolean;
  spd_t3: boolean;
  spd_location: string;
  spd_make: string;
  spd_model: string;
  spd_rated_current_ka: string;
}

export interface EICRChecklistItem {
  id: string;
  item_number: string;
  description: string;
  outcome: string;
  clause: string;
  notes: string;
  section_num: string;
  col_acc: string;
  col_na: string;
  col_c1c2: string;
  col_c3: string;
  col_fi: string;
  col_nv: string;
  col_lim: string;
}

export interface EICRInspectionSectionItem {
  id: string;
  item_number: string;
  item: string;
  clause: string;
  outcome: string;
  outcome_display: string;
  notes: string;
}

export interface EICRInspectionSection {
  section_name: string;
  clause: string;
  items: EICRInspectionSectionItem[];
}

// ─── Root payload type ───────────────────────────────────────────────

export interface EICRPayload {
  // Nested objects
  metadata: {
    certificate_number: string;
    form_version: string;
    export_timestamp: string;
  };

  client_details: {
    client_name: string;
    client_address: string;
    client_phone: string;
    client_email: string;
  };

  installation_details: {
    address: string;
    same_as_client_address: boolean;
    occupier: string;
    installation_type: string;
    description: string;
    premises_type: string;
    other_premises_description: string;
    installation_date: string;
    test_date: string;
    construction_date: string;
    estimated_age: string;
    age_unit: string;
    last_inspection_type: string;
    date_of_last_inspection: string;
    evidence_of_alterations: string;
    alterations_details: string;
    alterations_age: string;
    installation_records_available: string;
    purpose_of_inspection: string;
    other_purpose: string;
    agreed_with: string;
    extent_of_inspection: string;
    limitations_of_inspection: string;
    operational_limitations: string;
    bs_amendment: string;
    next_inspection_date: string;
    inspection_interval: string;
    interval_reasons: string;
  };

  standards_compliance: {
    design_standard: string;
    part_p_compliance: string;
  };

  supply_characteristics: {
    supply_voltage: string;
    supply_frequency: string;
    supply_ac_dc: string;
    conductor_configuration: string;
    dc_conductor_config: string;
    phases: string;
    earthing_arrangement: string;
    supply_type: string;
    supply_pme: string;
    dno_name: string;
    mpan: string;
    cutout_location: string;
    service_entry: string;
    external_ze: string;
    prospective_fault_current: string;
    supply_polarity_confirmed: boolean;
    other_sources_of_supply: string;
    other_sources_of_supply_present: boolean;
  };

  main_protective_device: {
    bs_en: string;
    device_type: string;
    main_switch_rating: string;
    main_switch_location: string;
    main_switch_poles: string;
    main_switch_voltage_rating: string;
    fuse_device_rating: string;
    breaking_capacity: string;
  };

  rcd_details: {
    rcd_main_switch: string;
    rcd_rating: string;
    rcd_type: string;
    rcd_time_delay: string;
    rcd_measured_time: string;
    rcd_breaking_capacity: string;
  };

  distribution_board: {
    board_designation: string;
    board_size: string;
    board_type: string;
    board_location: string;
    board_manufacturer: string;
    board_ways: string;
  };

  cables: {
    intake_cable_size: string;
    intake_cable_type: string;
    tails_size: string;
    tails_length: string;
  };

  earthing_bonding: {
    means_of_earthing_distributor: boolean;
    means_of_earthing_electrode: boolean;
    earth_electrode_type: string;
    earth_electrode_location: string;
    earth_electrode_resistance: string;
    main_earthing_conductor_type: string;
    main_earthing_conductor_size: string;
    main_earthing_conductor: string;
    main_bonding_conductor_type: string;
    main_bonding_conductor: string;
    main_bonding_size: string;
    main_bonding_size_custom: string;
    main_bonding_locations: string;
    bonding_water: boolean;
    bonding_gas: boolean;
    bonding_oil: boolean;
    bonding_structural_steel: boolean;
    bonding_lightning_protection: boolean;
    bonding_other: boolean;
    bonding_other_specify: string;
    bonding_compliance: string;
    earthing_conductor_continuity_verified: boolean;
    bonding_conductor_continuity_verified: boolean;
    supplementary_bonding: string;
    supplementary_bonding_size: string;
    supplementary_bonding_size_custom: string;
    equipotential_bonding: string;
  };

  test_instrument_details: {
    make_model: string;
    serial_number: string;
    calibration_date: string;
    test_temperature: string;
  };

  test_information: {
    test_method: string;
    test_voltage: string;
    test_notes: string;
  };

  distribution_board_verification: {
    db_reference: string;
    zdb: string;
    ipf: string;
    confirmed_correct_polarity: boolean;
    confirmed_phase_sequence: boolean;
    spd_operational_status: boolean;
    spd_na: boolean;
  };

  designer: {
    name: string;
    qualifications: string;
    company: string;
    address: string;
    postcode: string;
    phone: string;
    date: string;
    signature: string;
    departures: string;
    permitted_exceptions: string;
  };

  constructor: {
    name: string;
    qualifications: string;
    company: string;
    date: string;
    signature: string;
  };

  inspector: {
    name: string;
    qualifications: string;
    company: string;
    date: string;
    signature: string;
  };

  declarations: {
    same_as_designer: boolean;
    same_as_constructor: boolean;
    additional_notes: string;
    inspected_by: {
      name: string;
      signature: string;
      date: string;
      for_on_behalf_of: string;
      position: string;
      address: string;
      cp_scheme: string;
      cp_scheme_na: boolean;
    };
    report_authorised_by: {
      name: string;
      date: string;
      signature: string;
      for_on_behalf_of: string;
      position: string;
      address: string;
      membership_no: string;
    };
    bs7671_compliance: boolean;
    building_regs_compliance: boolean;
    competent_person_scheme: boolean;
    overall_assessment: string;
    satisfactory_for_continued_use: string;
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
    company_registration_number: string;
    vat_number: string;
    registration_scheme: string;
    registration_number: string;
    registration_expiry: string;
    insurance_provider: string;
    insurance_policy_number: string;
    insurance_coverage: string;
    insurance_expiry: string;
    registration_scheme_logo: string;
  };

  // Arrays
  inspection_checklist: EICRChecklistItem[];
  inspection_items: EICRInspectionSection[];
  additional_boards: EICRAdditionalBoard[];
  schedule_of_tests: EICRCircuit[];
  boards_with_schedules: EICRBoardWithSchedule[];
  observations: EICRObservation[];

  // Flat top-level copies (template compatibility)
  // Index signature for the 595 flat inspection keys + duplicate copies
  [key: string]: unknown;
}
