/**
 * eic-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/eic-payload-schema.ts.
 * Used as the return type of formatEicJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface EICCircuit {
  id: string;
  circuit_number: string;
  circuit_description: string;
  circuit_type: string;
  type_of_wiring: string;
  reference_method: string;
  live_size: string;
  cpc_size: string;
  protective_device_type: string;
  protective_device_curve: string;
  protective_device_rating: string;
  protective_device_ka_rating: string;
  protective_device_location: string;
  bs_standard: string;
  r1r2: string;
  r2: string;
  ring_continuity_live: string;
  ring_continuity_neutral: string;
  ring_r1: string;
  ring_rn: string;
  ring_r2: string;
  insulation_test_voltage: string;
  insulation_resistance: string;
  insulation_live_neutral: string;
  insulation_live_earth: string;
  insulation_neutral_earth: string;
  polarity: string;
  zs: string;
  max_zs: string;
  points_served: string;
  rcd_rating: string;
  rcd_bs_standard: string;
  rcd_type: string;
  rcd_rating_a: string;
  rcd_one_x: string;
  rcd_half_x: string;
  rcd_five_x: string;
  rcd_test_button: string;
  afdd_test: string;
  pfc: string;
  pfc_live_neutral: string;
  pfc_live_earth: string;
  functional_testing: string;
  notes: string;
  phase_type: string;
  phase_rotation: string;
  phase_balance_l1: string;
  phase_balance_l2: string;
  phase_balance_l3: string;
  line_to_line_voltage: string;
  db_reference: string;
  source_circuit_id: string | null;
  auto_filled: boolean | string;
}

export interface EICDistributionBoard {
  db_reference: string;
  location: string;
  board_type: string;
  board_make: string;
  board_model: string;
  total_ways: string | number;
  used_ways: string | number;
  spare_ways: string | number;
  zdb: string;
  ipf: string;
  main_switch_bs_en: string;
  main_switch_type: string;
  main_switch_rating: string;
  main_switch_poles: string;
  rcd_type: string;
  rcd_rating: string;
  rcd_measured_time: string;
  spd_fitted: boolean;
  spd_operational: boolean;
  spd_na: boolean;
  polarity_confirmed: boolean;
  phase_sequence_confirmed: boolean;
  supply_from: string;
  supply_cable_size: string;
  supply_cable_type: string;
}

export interface EICObservation {
  id: string;
  description: string;
  defect_code: string;
  recommendation: string;
  item: string;
  rectified: boolean;
  photo_evidence: string[];
  photo_count: number;
}

export interface EICChecklistItem {
  id: string;
  item_number: string;
  description: string;
  outcome: string;
  notes: string;
}

export interface EICPayload {
  // Flat inspection keys (insp_1 … insp_14)
  [key: string]: unknown;

  // Nested objects
  metadata: {
    certificate_number: string;
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
    installation_type: string;
    work_type: string;
    description: string;
    extent_of_installation: string;
    installation_date: string;
    test_date: string;
    construction_date: string;
  };

  standards_compliance: {
    design_standard: string;
    part_p_compliance: string;
  };

  supply_characteristics: {
    supply_voltage: string;
    supply_frequency: string;
    phases: string;
    earthing_arrangement: string;
    supply_type: string;
    supply_pme: string;
    live_conductor_type: string;
    dc_supply_type: string;
    prospective_fault_current: string;
    external_ze: string;
    supply_polarity_confirmed: boolean;
    other_sources_of_supply: boolean;
    other_sources_details: string;
  };

  supply_protective_device: {
    bs_en: string;
    type: string;
    rated_current: string;
  };

  main_protective_device: {
    device_type: string;
    main_switch_rating: string;
    main_switch_location: string;
    breaking_capacity: string;
    bs_en: string;
    poles: string;
    fuse_setting: string;
    voltage_rating: string;
  };

  rcd_details: {
    rcd_main_switch: string;
    rcd_rating: string;
    rcd_type: string;
    rcd_operating_time: string;
    rcd_rated_time_delay: string;
    rcd_measured_operating_time: string;
  };

  distribution_board: {
    board_size: string;
    board_type: string;
    board_location: string;
  };

  distribution_boards: EICDistributionBoard[];

  cables: {
    intake_cable_size: string;
    intake_cable_type: string;
    tails_size: string;
    tails_length: string;
  };

  earthing_bonding: {
    means_of_earthing: string;
    earth_electrode_type: string;
    earth_electrode_location: string;
    earth_electrode_resistance: string;
    earth_electrode_na: boolean;
    earthing_conductor_material: string;
    earthing_conductor_csa: string;
    earthing_conductor_verified: boolean;
    earthing_conductor_na: boolean;
    main_bonding_conductor: string;
    main_bonding_material: string;
    main_bonding_size: string;
    main_bonding_size_custom: string;
    main_bonding_verified: boolean;
    main_bonding_na: boolean;
    maximum_demand: string;
    maximum_demand_unit: string;
    bonding_water: boolean;
    bonding_gas: boolean;
    bonding_oil: boolean;
    bonding_structural_steel: boolean;
    bonding_lightning_protection: boolean;
    bonding_other: boolean;
    bonding_other_specify: string;
    bonding_compliance: string;
    supplementary_bonding: string;
    supplementary_bonding_size: string;
    supplementary_bonding_size_custom: string;
    equipotential_bonding: string;
  };

  inspection_checklist: EICChecklistItem[];
  schedule_of_tests: EICCircuit[];
  observations: EICObservation[];

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
    bs7671_amendment_date: string;
    departures: string;
    permitted_exceptions: string;
    risk_assessment_attached: boolean;
  };

  designer_2: {
    name: string;
    company: string;
    address: string;
    postcode: string;
    phone: string;
    date: string;
    signature: string;
  };

  constructor: {
    name: string;
    qualifications: string;
    company: string;
    address: string;
    postcode: string;
    phone: string;
    date: string;
    signature: string;
    bs7671_amendment_date: string;
    departures: string;
    same_as_designer: boolean;
  };

  inspector: {
    name: string;
    qualifications: string;
    company: string;
    address: string;
    postcode: string;
    phone: string;
    date: string;
    signature: string;
    bs7671_amendment_date: string;
    departures: string;
    same_as_constructor: boolean;
  };

  next_inspection: {
    interval_months: string;
    recommended_date: string;
  };

  existing_installation_comments: string;

  declarations: {
    additional_notes: string;
    inspected_by: {
      name: string;
      signature: string;
      for_on_behalf_of: string;
      position: string;
      address: string;
      cp_scheme: string;
      cp_scheme_na: boolean;
      same_as_inspector: boolean;
    };
    report_authorised_by: {
      name: string;
      date: string;
      signature: string;
      for_on_behalf_of: string;
      position: string;
      address: string;
      postcode: string;
      phone: string;
      membership_no: string;
    };
    bs7671_compliance: boolean;
    building_regs_compliance: boolean;
    competent_person_scheme: boolean;
  };

  company_details: {
    company_name: string;
    company_tagline: string;
    company_address: string;
    company_postcode: string;
    company_phone: string;
    company_email: string;
    company_website: string;
    company_logo: string;
    company_accent_color: string;
    registration_scheme: string;
    registration_number: string;
  };

  // Root-level branding
  company_logo?: string;
  registration_scheme_logo?: string;
  company_accent_color?: string;
}
