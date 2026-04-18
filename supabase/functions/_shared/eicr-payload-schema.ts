/**
 * eicr-payload-schema.ts
 * Zod schema defining every field the EICR PDF Monkey template expects.
 * This is the SINGLE SOURCE OF TRUTH for the payload shape.
 *
 * Shape matches the output of formatEICRJson() in src/utils/eicrJsonFormatter.ts.
 * The edge function validates against this before sending to PDF Monkey (soft-fail).
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ─── Item numbers from BS 7671 inspection checklist ──────────────────
// 85 items across 8 sections
const INSPECTION_ITEM_NUMBERS = [
  '1_0',
  '1_1',
  '1_2',
  '1_3',
  '2_0',
  '3_1',
  '3_2',
  '3_3',
  '3_4',
  '3_5',
  '3_6',
  '3_7',
  '3_8',
  '3_9',
  '4_1',
  '4_2',
  '4_3',
  '4_4',
  '4_5',
  '4_6',
  '4_7',
  '4_8',
  '4_9',
  '4_10',
  '4_11',
  '4_12',
  '4_13',
  '4_14',
  '4_15',
  '4_16',
  '4_17',
  '4_18',
  '4_19',
  '4_20',
  '4_21',
  '4_22',
  '4_23',
  '4_24',
  '4_25',
  '5_1',
  '5_2',
  '5_3',
  '5_4',
  '5_5',
  '5_6',
  '5_7',
  '5_8',
  '5_9',
  '5_10',
  '5_11',
  '5_12',
  '5_13',
  '5_14',
  '5_15',
  '5_16',
  '5_17',
  '5_18',
  '5_19',
  '5_20',
  '5_21',
  '5_22',
  '5_23',
  '6_0',
  '6_1',
  '6_2',
  '6_3',
  '6_4',
  '6_5',
  '6_6',
  '6_7',
  '6_8',
  '6_9',
  '6_10',
  '6_11',
  '6_12',
  '6_13',
  '7_0',
  '7_1',
  '7_2',
  '7_3',
  '8_0',
  '8_1',
  '8_2',
  '8_3',
  '8_4',
] as const;

const INSPECTION_COLUMNS = ['acc', 'na', 'c1c2', 'c3', 'fi', 'nv', 'lim'] as const;

// Generate the flat inspection key schema: insp_1_0_acc, insp_1_0_na, ... (85 * 7 = 595 keys)
function buildFlatInspectionSchema(): Record<string, z.ZodOptional<z.ZodDefault<z.ZodString>>> {
  const shape: Record<string, z.ZodOptional<z.ZodDefault<z.ZodString>>> = {};
  for (const item of INSPECTION_ITEM_NUMBERS) {
    for (const col of INSPECTION_COLUMNS) {
      shape[`insp_${item}_${col}`] = z.string().default('').optional();
    }
  }
  return shape;
}

// ─── Sub-schemas ─────────────────────────────────────────────────────

const circuitSchema = z
  .object({
    id: z.string().default('N/A'),
    circuit_number: z.string().default('N/A'),
    circuit_description: z.string().default('N/A'),
    circuit_type: z.string().default('N/A'),
    type_of_wiring: z.string().default('N/A'),
    reference_method: z.string().default('N/A'),
    points_served: z.string().default('N/A'),
    live_size: z.string().default('N/A'),
    cpc_size: z.string().default('N/A'),
    bs_standard: z.string().default('N/A'),
    protective_device_type: z.string().default('N/A'),
    protective_device_curve: z.string().default('N/A'),
    protective_device_rating: z.string().default('N/A'),
    protective_device_ka_rating: z.string().default('N/A'),
    max_zs: z.string().default('N/A'),
    protective_device_location: z.string().default('N/A'),
    rcd_bs_standard: z.string().default('N/A'),
    rcd_type: z.string().default('N/A'),
    rcd_rating: z.string().default('N/A'),
    rcd_rating_a: z.string().default('N/A'),
    ring_r1: z.string().default('N/A'),
    ring_rn: z.string().default('N/A'),
    ring_r2: z.string().default('N/A'),
    r1r2: z.string().default('N/A'),
    r2: z.string().default('N/A'),
    ring_continuity_live: z.string().default('N/A'),
    ring_continuity_neutral: z.string().default('N/A'),
    insulation_test_voltage: z.string().default('N/A'),
    insulation_live_neutral: z.string().default('N/A'),
    insulation_live_earth: z.string().default('N/A'),
    insulation_resistance: z.string().default('N/A'),
    insulation_neutral_earth: z.string().default('N/A'),
    polarity: z.string().default('N/A'),
    zs: z.string().default('N/A'),
    rcd_one_x: z.string().default('N/A'),
    rcd_test_button: z.string().default('N/A'),
    afdd_test: z.string().default('N/A'),
    rcd_half_x: z.string().default('N/A'),
    rcd_five_x: z.string().default('N/A'),
    pfc: z.string().default('N/A'),
    pfc_live_neutral: z.string().default('N/A'),
    pfc_live_earth: z.string().default('N/A'),
    functional_testing: z.string().default('N/A'),
    notes: z.string().default('N/A'),
    source_circuit_id: z.string().default('N/A'),
    auto_filled: z.union([z.boolean(), z.string()]).default(false),
    phase_type: z.string().default('N/A'),
    phase_rotation: z.string().default('N/A'),
    phase_balance_l1: z.string().default('N/A'),
    phase_balance_l2: z.string().default('N/A'),
    phase_balance_l3: z.string().default('N/A'),
    line_to_line_voltage: z.string().default('N/A'),
    circuit_designation: z.string().default('N/A'),
    type: z.string().default('N/A'),
    cable_size: z.string().default('N/A'),
    protective_device: z.string().default('N/A'),
  })
  .passthrough();

const boardWithScheduleSchema = z
  .object({
    db_reference: z.string().default('Main DB'),
    db_location: z.string().default(''),
    db_manufacturer: z.string().default(''),
    db_type: z.string().default(''),
    db_ways: z.string().default(''),
    db_zdb: z.string().default(''),
    db_ipf: z.string().default(''),
    zdb: z.string().default(''),
    ipf: z.string().default(''),
    supplied_from: z.string().default(''),
    incoming_device_bs_en: z.string().default(''),
    incoming_device_type: z.string().default(''),
    incoming_device_rating: z.string().default(''),
    polarity_confirmed: z.boolean().default(false),
    phase_sequence_confirmed: z.boolean().default(false),
    ring_final_circuit_confirmed: z.boolean().default(false),
    spd_operational: z.boolean().default(false),
    spd_na: z.boolean().default(false),
    spd_t1: z.boolean().default(false),
    spd_t2: z.boolean().default(false),
    spd_t3: z.boolean().default(false),
    spd_type: z.string().default(''),
    spd_make: z.string().default(''),
    spd_model: z.string().default(''),
    spd_location: z.string().default(''),
    spd_rated_current_ka: z.string().default(''),
    main_switch_bs_en: z.string().default(''),
    main_switch_type: z.string().default(''),
    main_switch_rating: z.string().default(''),
    main_switch_poles: z.string().default(''),
    // A4:2026 — per-board test instruments (Schedule of Test Results)
    test_instrument_multifunction: z.string().default(''),
    test_instrument_continuity: z.string().default(''),
    test_instrument_insulation: z.string().default(''),
    test_instrument_eli: z.string().default(''),
    test_instrument_rcd: z.string().default(''),
    test_instrument_earth_electrode: z.string().default(''),
    circuit_count: z.number().default(0),
    circuits: z.array(circuitSchema).default([]),
  })
  .passthrough();

const observationSchema = z
  .object({
    id: z.string().default(''),
    item: z.string().default(''),
    defect_code: z.string().default(''),
    description: z.string().default(''),
    recommendation: z.string().default(''),
    regulation: z.string().default(''),
    rectified: z.boolean().default(false),
    photo_evidence: z.array(z.string()).default([]),
    photo_count: z.number().default(0),
  })
  .passthrough();

const additionalBoardSchema = z
  .object({
    designation: z.string().default(''),
    location: z.string().default(''),
    manufacturer: z.string().default(''),
    board_type: z.string().default(''),
    ways: z.string().default(''),
    zdb: z.string().default(''),
    ipf: z.string().default(''),
    // A4:2026 — sub-boards must carry full board details (parity with main)
    supplied_from: z.string().default(''),
    incoming_device_bs_en: z.string().default(''),
    incoming_device_type: z.string().default(''),
    incoming_device_rating: z.string().default(''),
    main_switch_bs_en: z.string().default(''),
    main_switch_type: z.string().default(''),
    main_switch_rating: z.string().default(''),
    main_switch_poles: z.string().default(''),
    polarity_confirmed: z.boolean().default(false),
    phase_sequence_confirmed: z.boolean().default(false),
    ring_final_circuit_confirmed: z.boolean().default(false),
    spd_operational: z.boolean().default(false),
    spd_na: z.boolean().default(false),
    spd_t1: z.boolean().default(false),
    spd_t2: z.boolean().default(false),
    spd_t3: z.boolean().default(false),
    spd_type: z.string().default(''),
    spd_make: z.string().default(''),
    spd_model: z.string().default(''),
    spd_location: z.string().default(''),
    spd_rated_current_ka: z.string().default(''),
  })
  .passthrough();

const inspectionChecklistItemSchema = z
  .object({
    id: z.string().default(''),
    item_number: z.string().default(''),
    description: z.string().default(''),
    outcome: z.string().default(''),
    clause: z.string().default(''),
    notes: z.string().default(''),
    section_num: z.string().default(''),
    col_acc: z.string().default(''),
    col_na: z.string().default(''),
    col_c1c2: z.string().default(''),
    col_c3: z.string().default(''),
    col_fi: z.string().default(''),
    col_nv: z.string().default(''),
    col_lim: z.string().default(''),
  })
  .passthrough();

const inspectionSectionItemSchema = z
  .object({
    id: z.string().default(''),
    item_number: z.string().default(''),
    item: z.string().default(''),
    clause: z.string().default(''),
    outcome: z.string().default(''),
    notes: z.string().default(''),
  })
  .passthrough();

const inspectionSectionSchema = z
  .object({
    section_name: z.string().default(''),
    clause: z.string().default(''),
    items: z.array(inspectionSectionItemSchema).default([]),
  })
  .passthrough();

const circuitPlanningSchema = z
  .object({
    id: z.string().default(''),
    circuit_number: z.string().default(''),
    cable_size: z.string().default(''),
    cable_type: z.string().default(''),
    protective_device_rating: z.string().default(''),
    circuit_description: z.string().default(''),
  })
  .passthrough();

// ─── Root schema ─────────────────────────────────────────────────────

const s = z.string().default('').optional();
const b = z.boolean().default(false).optional();

export const eicrPayloadSchema = z
  .object({
    // ── Nested objects ──────────────────────────────────────────────

    metadata: z
      .object({
        certificate_number: z.string().default(''),
        form_version: z.string().default('1.0'),
        export_timestamp: z.string().default(''),
      })
      .default({}),

    client_details: z
      .object({
        client_name: z.string().default(''),
        client_address: z.string().default(''),
        client_phone: z.string().default(''),
        client_email: z.string().default(''),
      })
      .default({}),

    installation_details: z
      .object({
        address: z.string().default(''),
        same_as_client_address: z.boolean().default(false),
        occupier: z.string().default(''),
        installation_type: z.string().default(''),
        description: z.string().default(''),
        premises_type: z.string().default(''),
        other_premises_description: z.string().default(''),
        installation_date: z.string().default(''),
        test_date: z.string().default(''),
        construction_date: z.string().default(''),
        estimated_age: z.string().default(''),
        age_unit: z.string().default(''),
        // Valid values: '' | 'known' | 'unknown' | 'first'
        // Frontend stores 'not-applicable' — normaliseLastInspectionType() in eicrJsonFormatter maps it to 'first'
        last_inspection_type: z.enum(['', 'known', 'unknown', 'first']).default(''),
        date_of_last_inspection: z.string().default(''),
        evidence_of_alterations: z.string().default(''),
        alterations_details: z.string().default(''),
        alterations_age: z.string().default(''),
        installation_records_available: z.string().default(''),
        purpose_of_inspection: z.string().default(''),
        other_purpose: z.string().default(''),
        agreed_with: z.string().default(''),
        extent_of_inspection: z.string().default(''),
        limitations_of_inspection: z.string().default(''),
        operational_limitations: z.string().default(''),
        bs_amendment: z.string().default(''),
        next_inspection_date: z.string().default(''),
        inspection_interval: z.string().default(''),
        interval_reasons: z.string().default(''),
      })
      .default({}),

    standards_compliance: z
      .object({
        design_standard: z.string().default('BS7671'),
        part_p_compliance: z.string().default(''),
      })
      .default({}),

    supply_characteristics: z
      .object({
        supply_voltage: z.string().default(''),
        supply_frequency: z.string().default('50'),
        supply_ac_dc: z.string().default('ac'),
        conductor_configuration: z.string().default(''),
        dc_conductor_config: z.string().default(''),
        phases: z.string().default(''),
        earthing_arrangement: z.string().default(''),
        supply_type: z.string().default(''),
        supply_pme: z.string().default(''),
        dno_name: z.string().default(''),
        mpan: z.string().default(''),
        cutout_location: z.string().default(''),
        service_entry: z.string().default(''),
        external_ze: z.string().default(''),
        prospective_fault_current: z.string().default(''),
        supply_polarity_confirmed: z.boolean().default(false),
        other_sources_of_supply: z.string().default(''),
        other_sources_of_supply_present: z.boolean().default(false),
      })
      .default({}),

    main_protective_device: z
      .object({
        bs_en: z.string().default(''),
        device_type: z.string().default(''),
        main_switch_rating: z.string().default(''),
        main_switch_location: z.string().default(''),
        main_switch_poles: z.string().default(''),
        main_switch_voltage_rating: z.string().default(''),
        fuse_device_rating: z.string().default(''),
        breaking_capacity: z.string().default(''),
      })
      .default({}),

    rcd_details: z
      .object({
        rcd_main_switch: z.string().default(''),
        rcd_rating: z.string().default(''),
        rcd_type: z.string().default(''),
        rcd_time_delay: z.string().default(''),
        rcd_measured_time: z.string().default(''),
        rcd_breaking_capacity: z.string().default(''),
      })
      .default({}),

    distribution_board: z
      .object({
        board_designation: z.string().default('Main DB'),
        board_size: z.string().default(''),
        board_type: z.string().default(''),
        board_location: z.string().default(''),
        board_manufacturer: z.string().default(''),
        board_ways: z.string().default(''),
      })
      .default({}),

    cables: z
      .object({
        intake_cable_size: z.string().default(''),
        intake_cable_type: z.string().default(''),
        tails_size: z.string().default(''),
        tails_length: z.string().default(''),
      })
      .default({}),

    earthing_bonding: z
      .object({
        means_of_earthing_distributor: z.boolean().default(false),
        means_of_earthing_electrode: z.boolean().default(false),
        earth_electrode_type: z.string().default(''),
        earth_electrode_location: z.string().default(''),
        earth_electrode_resistance: z.string().default(''),
        main_earthing_conductor_type: z.string().default(''),
        main_earthing_conductor_size: z.string().default(''),
        main_earthing_conductor: z.string().default(''),
        main_bonding_conductor_type: z.string().default(''),
        main_bonding_conductor: z.string().default(''),
        main_bonding_size: z.string().default(''),
        main_bonding_size_custom: z.string().default(''),
        main_bonding_locations: z.string().default(''),
        bonding_water: z.boolean().default(false),
        bonding_gas: z.boolean().default(false),
        bonding_oil: z.boolean().default(false),
        bonding_structural_steel: z.boolean().default(false),
        bonding_lightning_protection: z.boolean().default(false),
        bonding_other: z.boolean().default(false),
        bonding_other_specify: z.string().default(''),
        bonding_compliance: z.string().default(''),
        earthing_conductor_continuity_verified: z.boolean().default(false),
        bonding_conductor_continuity_verified: z.boolean().default(false),
        supplementary_bonding: z.string().default(''),
        supplementary_bonding_size: z.string().default(''),
        supplementary_bonding_size_custom: z.string().default(''),
        equipotential_bonding: z.string().default(''),
      })
      .default({}),

    test_instrument_details: z
      .object({
        make_model: z.string().default(''),
        serial_number: z.string().default(''),
        calibration_date: z.string().default(''),
        test_temperature: z.string().default(''),
      })
      .default({}),

    test_information: z
      .object({
        test_method: z.string().default(''),
        test_voltage: z.string().default(''),
        test_notes: z.string().default(''),
      })
      .default({}),

    distribution_board_verification: z
      .object({
        db_reference: z.string().default('Main DB'),
        zdb: z.string().default(''),
        ipf: z.string().default(''),
        confirmed_correct_polarity: z.boolean().default(false),
        confirmed_phase_sequence: z.boolean().default(false),
        ring_final_circuit_confirmed: z.boolean().default(false),
        spd_operational_status: z.boolean().default(false),
        spd_na: z.boolean().default(false),
        spd_t1: z.boolean().default(false),
        spd_t2: z.boolean().default(false),
        spd_t3: z.boolean().default(false),
        spd_type: z.string().default(''),
        spd_make: z.string().default(''),
        spd_model: z.string().default(''),
        spd_location: z.string().default(''),
        spd_rated_current_ka: z.string().default(''),
      })
      .default({}),

    designer: z
      .object({
        name: z.string().default(''),
        qualifications: z.string().default(''),
        company: z.string().default(''),
        address: z.string().default(''),
        postcode: z.string().default(''),
        phone: z.string().default(''),
        date: z.string().default(''),
        signature: z.string().default(''),
        departures: z.string().default(''),
        permitted_exceptions: z.string().default(''),
      })
      .default({}),

    // Note: JS `{}.constructor` is the built-in Object function.
    // Preprocess treats non-plain-object values (like the Object constructor) as undefined → default.
    constructor: z.preprocess(
      (val) => (typeof val === 'function' ? undefined : val),
      z
        .object({
          name: z.string().default(''),
          qualifications: z.string().default(''),
          company: z.string().default(''),
          date: z.string().default(''),
          signature: z.string().default(''),
        })
        .default({})
    ),

    inspector: z
      .object({
        name: z.string().default(''),
        qualifications: z.string().default(''),
        company: z.string().default(''),
        date: z.string().default(''),
        signature: z.string().default(''),
      })
      .default({}),

    declarations: z
      .object({
        same_as_designer: z.boolean().default(false),
        same_as_constructor: z.boolean().default(false),
        additional_notes: z.string().default(''),
        inspected_by: z
          .object({
            name: z.string().default(''),
            signature: z.string().default(''),
            date: z.string().default(''),
            for_on_behalf_of: z.string().default(''),
            position: z.string().default(''),
            address: z.string().default(''),
            cp_scheme: z.string().default(''),
            cp_scheme_na: z.boolean().default(false),
          })
          .default({}),
        report_authorised_by: z
          .object({
            name: z.string().default(''),
            date: z.string().default(''),
            signature: z.string().default(''),
            for_on_behalf_of: z.string().default(''),
            position: z.string().default(''),
            address: z.string().default(''),
            membership_no: z.string().default(''),
          })
          .default({}),
        bs7671_compliance: z.boolean().default(false),
        building_regs_compliance: z.boolean().default(false),
        competent_person_scheme: z.boolean().default(false),
        overall_assessment: z.string().default(''),
        satisfactory_for_continued_use: z.string().default(''),
      })
      .default({}),

    company_details: z
      .object({
        company_name: z.string().default(''),
        company_address: z.string().default(''),
        company_phone: z.string().default(''),
        company_email: z.string().default(''),
        company_website: z.string().default(''),
        company_logo: z.string().default(''),
        company_tagline: z.string().default(''),
        company_accent_color: z.string().default(''),
        company_registration_number: z.string().default(''),
        vat_number: z.string().default(''),
        registration_scheme: z.string().default(''),
        registration_number: z.string().default(''),
        registration_expiry: z.string().default(''),
        insurance_provider: z.string().default(''),
        insurance_policy_number: z.string().default(''),
        insurance_coverage: z.string().default(''),
        insurance_expiry: z.string().default(''),
        registration_scheme_logo: z.string().default(''),
      })
      .default({}),

    // ── Arrays ──────────────────────────────────────────────────────

    inspection_checklist: z.array(inspectionChecklistItemSchema).default([]),
    inspection_items: z.array(inspectionSectionSchema).default([]),
    additional_boards: z.array(additionalBoardSchema).default([]),
    schedule_of_tests: z.array(circuitSchema).default([]),
    boards_with_schedules: z.array(boardWithScheduleSchema).default([]),
    observations: z.array(observationSchema).default([]),

    // ── Flat top-level copies (template compatibility) ─────────────
    // Earth electrode
    earth_electrode_type: s,
    earth_electrode_location: s,
    earth_electrode_resistance: s,
    earthElectrodeType: s,
    earthElectrodeLocation: s,
    earthElectrodeResistance: s,

    // Departures
    departures: s,
    designer_departures: s,
    designerDepartures: s,
    details_of_departures: s,

    // Permitted exceptions
    permitted_exceptions: s,
    permittedExceptions: s,
    details_of_permitted_exceptions: s,
    exceptions: s,

    // Main switch location
    main_switch_location: s,
    mainSwitchLocation: s,

    // Supply Authority
    dno_name: s,
    dnoName: s,
    mpan: s,
    cutout_location: s,
    cutoutLocation: s,

    // Supply Details
    phases: s,
    supply_voltage: s,
    supplyVoltage: s,
    supply_frequency: s,
    supply_pme: s,
    supplyPME: s,
    earthing_arrangement: s,
    earthingArrangement: s,

    // Main Protective Device (flat)
    mainProtectiveDevice: s,
    main_protective_device_type: s,
    rcd_main_switch: s,
    rcdMainSwitch: s,
    rcd_rating: s,
    rcdRating: s,

    // Client Details (flat)
    client_name: s,
    clientName: s,
    client_address: s,
    clientAddress: s,
    client_phone: s,
    clientPhone: s,
    client_email: s,
    clientEmail: s,
    installation_address: s,
    installationAddress: s,

    // Installation Details (flat)
    installation_type: s,
    installationType: s,
    description: s,
    estimated_age: s,
    estimatedAge: s,
    age_unit: s,
    ageUnit: s,
    last_inspection_type: s,
    date_of_last_inspection: s,
    evidence_of_alterations: s,
    alterations_details: s,

    // Inspection Details (flat)
    inspection_date: s,
    inspectionDate: s,
    next_inspection_date: s,
    nextInspectionDate: s,
    inspection_interval: s,
    inspectionInterval: s,
    purpose_of_inspection: s,
    purposeOfInspection: s,
    other_purpose: s,
    extent_of_inspection: s,
    extentOfInspection: s,
    limitations_of_inspection: s,
    limitationsOfInspection: s,

    // Distribution Board (flat)
    db_location: s,
    db_manufacturer: s,
    db_type: s,
    db_ways: s,
    db_reference: s,
    db_zdb: s,
    db_ipf: s,

    // Cables (flat)
    intake_cable_size: s,
    intakeCableSize: s,
    intake_cable_type: s,
    intakeCableType: s,
    tails_size: s,
    tailsSize: s,
    tails_length: s,
    tailsLength: s,

    // Earthing & Bonding (flat)
    main_earthing_conductor_type: s,
    mainEarthingConductorType: s,
    main_earthing_conductor_size: s,
    mainEarthingConductorSize: s,
    main_bonding_conductor_type: s,
    mainBondingConductorType: s,
    main_bonding_size: s,
    mainBondingSize: s,
    main_bonding_locations: s,
    mainBondingLocations: s,
    bonding_compliance: s,
    bondingCompliance: s,
    supplementary_bonding_size: s,
    supplementaryBondingSize: s,
    equipotential_bonding: s,
    equipotentialBonding: s,

    // Overall Assessment & Summary
    overall_assessment: s,
    overallAssessment: s,
    satisfactory_for_continued_use: s,
    satisfactoryForContinuedUse: s,
    additional_comments: s,
    additionalComments: s,

    // Inspected By (flat)
    inspected_by_name: s,
    inspectedByName: s,
    inspected_by_signature: s,
    inspectedBySignature: s,
    inspected_by_for_on_behalf_of: s,
    inspected_by_position: s,
    inspected_by_address: s,
    inspected_by_cp_scheme: s,

    // Report Authorised By (flat)
    report_authorised_by_name: s,
    report_authorised_by_date: s,
    report_authorised_by_signature: s,
    report_authorised_by_for_on_behalf_of: s,
    report_authorised_by_position: s,
    report_authorised_by_address: s,
    report_authorised_by_membership_no: s,

    // Inspector Details (flat)
    inspector_name: s,
    inspectorName: s,
    inspector_qualifications: s,
    inspectorQualifications: s,
    inspector_signature: s,
    inspectorSignature: s,
    registration_scheme: s,
    registrationScheme: s,
    registration_number: s,
    registrationNumber: s,
    registration_expiry: s,
    registrationExpiry: s,
    registration_scheme_logo: s,
    registrationSchemeLogo: s,

    // Insurance (flat)
    insurance_provider: s,
    insuranceProvider: s,
    insurance_policy_number: s,
    insurancePolicyNumber: s,
    insurance_coverage: s,
    insuranceCoverage: s,
    insurance_expiry: s,
    insuranceExpiry: s,

    // Company Details (flat)
    company_name: s,
    companyName: s,
    company_address: s,
    companyAddress: s,
    company_phone: s,
    companyPhone: s,
    company_email: s,
    companyEmail: s,
    company_logo: s,
    companyLogo: s,
    company_website: s,
    companyWebsite: s,
    company_tagline: s,
    companyTagline: s,
    company_accent_color: s,
    companyAccentColor: s,

    // Test Instrument & Method (flat)
    test_method: s,
    test_voltage: s,
    test_notes: s,
    test_temperature: s,
    test_instrument_make: s,
    test_instrument_serial: s,
    calibration_date: s,

    // Main Switch (flat)
    main_switch_rating: s,
    main_switch_poles: s,
    main_switch_voltage_rating: s,
    fuse_device_rating: s,
    breaking_capacity: s,
    service_entry: s,

    // BS 7671 Model Form Fields (flat)
    occupier: s,
    premises_type: s,
    other_premises_description: s,
    alterations_age: s,
    installation_records_available: s,
    agreed_with: s,
    operational_limitations: s,
    bs_amendment: s,
    interval_reasons: s,
    supply_ac_dc: s,
    conductor_configuration: s,
    external_ze: s,
    prospective_fault_current: s,
    supply_polarity_confirmed: b,
    other_sources_of_supply: s,
    means_of_earthing_distributor: b,
    means_of_earthing_electrode: b,
    earthing_conductor_continuity_verified: b,
    bonding_conductor_continuity_verified: b,

    // RCD details (flat)
    rcd_time_delay: s,
    rcd_measured_time: s,
    rcd_breaking_capacity: s,

    // A4:2026 — Supply variants + tick-box
    other_sources_of_supply_present: b,
    dc_conductor_config: s,

    // A4:2026 — Section E + Section J
    general_condition: s,
    maximum_demand: s,
    maximum_demand_unit: s,

    // A4:2026 — Schedule of Test Results signature
    schedule_tested_by_name: s,
    schedule_tested_by_date: s,
    schedule_tested_by_signature: s,

    // Section K
    no_remedial_action: b,

    // Schedule counts
    inspection_schedule_count: z.number().default(1).optional(),
    test_schedule_count: z.number().default(1).optional(),
    continuation_sheets_count: z.number().default(0).optional(),

    // ── Flat inspection keys (595) ─────────────────────────────────
    ...buildFlatInspectionSchema(),
  })
  .passthrough(); // Allow extra keys — PDF Monkey ignores unknowns

export type EICRPayload = z.infer<typeof eicrPayloadSchema>;

/**
 * Validates and fills defaults for an EICR payload.
 * Uses safeParse — returns { success, data?, error? } without throwing.
 */
export function validateEICRPayload(data: unknown) {
  return eicrPayloadSchema.safeParse(data);
}

/** Re-export the item numbers for tests */
export { INSPECTION_ITEM_NUMBERS, INSPECTION_COLUMNS };
