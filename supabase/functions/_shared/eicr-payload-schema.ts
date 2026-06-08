/**
 * eicr-payload-schema.ts
 * Zod schema defining every field the EICR PDF Monkey template expects.
 * This is the SINGLE SOURCE OF TRUTH for the payload shape.
 *
 * Shape matches the output of formatEICRJson() in src/utils/eicrJsonFormatter.ts.
 * The edge function validates against this before sending to PDF Monkey (soft-fail).
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// Form fields that should be booleans sometimes arrive as the strings
// "true"/"false"/"yes"/"no"/"N/A"/"LIM" from select inputs. Coerce defensively
// so schema validation doesn't reject otherwise-valid payloads. Note: plain
// z.coerce.boolean() would treat "false" as truthy, so we parse explicitly.
const boolish = z.preprocess((v) => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const s = v.toLowerCase().trim();
    return s === 'true' || s === 'yes' || s === '1';
  }
  return false;
}, z.boolean());

// Numeric inputs (measured Zs, R1+R2, insulation MΩ, computed values, board
// scan / AI fills) can arrive as JS numbers, but every text field in this
// schema is a string. PDF Monkey renders numbers fine, so a number here is not
// a real error — coerce defensively so validation doesn't raise false "schema
// drift" noise (this was the Solar PV drift: number received where string
// expected). Booleans are likewise stringified rather than rejected.
const stringish = z.preprocess((v) => {
  if (v === null || v === undefined) return v; // let .default() apply
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return v;
}, z.string());

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
function buildFlatInspectionSchema(): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const item of INSPECTION_ITEM_NUMBERS) {
    for (const col of INSPECTION_COLUMNS) {
      shape[`insp_${item}_${col}`] = stringish.default('').optional();
    }
  }
  return shape;
}

// ─── Sub-schemas ─────────────────────────────────────────────────────

const circuitSchema = z
  .object({
    id: stringish.default('N/A'),
    circuit_number: stringish.default('N/A'),
    circuit_description: stringish.default('N/A'),
    circuit_type: stringish.default('N/A'),
    type_of_wiring: stringish.default('N/A'),
    reference_method: stringish.default('N/A'),
    points_served: stringish.default('N/A'),
    live_size: stringish.default('N/A'),
    cpc_size: stringish.default('N/A'),
    bs_standard: stringish.default('N/A'),
    protective_device_type: stringish.default('N/A'),
    protective_device_curve: stringish.default('N/A'),
    protective_device_rating: stringish.default('N/A'),
    protective_device_ka_rating: stringish.default('N/A'),
    max_zs: stringish.default('N/A'),
    protective_device_location: stringish.default('N/A'),
    rcd_bs_standard: stringish.default('N/A'),
    rcd_type: stringish.default('N/A'),
    rcd_rating: stringish.default('N/A'),
    rcd_rating_a: stringish.default('N/A'),
    ring_r1: stringish.default('N/A'),
    ring_rn: stringish.default('N/A'),
    ring_r2: stringish.default('N/A'),
    r1r2: stringish.default('N/A'),
    r2: stringish.default('N/A'),
    ring_continuity_live: stringish.default('N/A'),
    ring_continuity_neutral: stringish.default('N/A'),
    insulation_test_voltage: stringish.default('N/A'),
    insulation_live_neutral: stringish.default('N/A'),
    insulation_live_earth: stringish.default('N/A'),
    insulation_resistance: stringish.default('N/A'),
    insulation_neutral_earth: stringish.default('N/A'),
    polarity: stringish.default('N/A'),
    zs: stringish.default('N/A'),
    rcd_one_x: stringish.default('N/A'),
    rcd_test_button: stringish.default('N/A'),
    afdd_test: stringish.default('N/A'),
    rcd_half_x: stringish.default('N/A'),
    rcd_five_x: stringish.default('N/A'),
    pfc: stringish.default('N/A'),
    pfc_live_neutral: stringish.default('N/A'),
    pfc_live_earth: stringish.default('N/A'),
    functional_testing: stringish.default('N/A'),
    notes: stringish.default('N/A'),
    source_circuit_id: stringish.default('N/A'),
    auto_filled: z.union([boolish, z.string()]).default(false),
    phase_type: stringish.default('N/A'),
    phase_rotation: stringish.default('N/A'),
    phase_balance_l1: stringish.default('N/A'),
    phase_balance_l2: stringish.default('N/A'),
    phase_balance_l3: stringish.default('N/A'),
    line_to_line_voltage: stringish.default('N/A'),
    circuit_designation: stringish.default('N/A'),
    type: stringish.default('N/A'),
    cable_size: stringish.default('N/A'),
    protective_device: stringish.default('N/A'),
  })
  .passthrough();

const boardWithScheduleSchema = z
  .object({
    db_reference: stringish.default('Main DB'),
    db_location: stringish.default(''),
    db_manufacturer: stringish.default(''),
    db_type: stringish.default(''),
    db_ways: stringish.default(''),
    db_zdb: stringish.default(''),
    db_ipf: stringish.default(''),
    zdb: stringish.default(''),
    ipf: stringish.default(''),
    supplied_from: stringish.default(''),
    incoming_device_bs_en: stringish.default(''),
    incoming_device_type: stringish.default(''),
    incoming_device_rating: stringish.default(''),
    polarity_confirmed: boolish.default(false),
    phase_sequence_confirmed: boolish.default(false),
    ring_final_circuit_confirmed: boolish.default(false),
    spd_operational: boolish.default(false),
    spd_na: boolish.default(false),
    spd_t1: boolish.default(false),
    spd_t2: boolish.default(false),
    spd_t3: boolish.default(false),
    spd_type: stringish.default(''),
    spd_make: stringish.default(''),
    spd_model: stringish.default(''),
    spd_location: stringish.default(''),
    spd_rated_current_ka: stringish.default(''),
    main_switch_bs_en: stringish.default(''),
    main_switch_type: stringish.default(''),
    main_switch_rating: stringish.default(''),
    main_switch_poles: stringish.default(''),
    circuit_count: z.number().default(0),
    circuits: z.array(circuitSchema).default([]),
  })
  .passthrough();

const observationSchema = z
  .object({
    id: stringish.default(''),
    item: stringish.default(''),
    defect_code: stringish.default(''),
    description: stringish.default(''),
    recommendation: stringish.default(''),
    regulation: stringish.default(''),
    rectified: boolish.default(false),
    photo_evidence: z.array(z.string()).default([]),
    photo_count: z.number().default(0),
  })
  .passthrough();

const additionalBoardSchema = z
  .object({
    designation: stringish.default(''),
    location: stringish.default(''),
    manufacturer: stringish.default(''),
    board_type: stringish.default(''),
    ways: stringish.default(''),
    zdb: stringish.default(''),
    ipf: stringish.default(''),
    // A4:2026 — sub-boards must carry full board details (parity with main)
    supplied_from: stringish.default(''),
    incoming_device_bs_en: stringish.default(''),
    incoming_device_type: stringish.default(''),
    incoming_device_rating: stringish.default(''),
    main_switch_bs_en: stringish.default(''),
    main_switch_type: stringish.default(''),
    main_switch_rating: stringish.default(''),
    main_switch_poles: stringish.default(''),
    polarity_confirmed: boolish.default(false),
    phase_sequence_confirmed: boolish.default(false),
    ring_final_circuit_confirmed: boolish.default(false),
    spd_operational: boolish.default(false),
    spd_na: boolish.default(false),
    spd_t1: boolish.default(false),
    spd_t2: boolish.default(false),
    spd_t3: boolish.default(false),
    spd_type: stringish.default(''),
    spd_make: stringish.default(''),
    spd_model: stringish.default(''),
    spd_location: stringish.default(''),
    spd_rated_current_ka: stringish.default(''),
  })
  .passthrough();

const inspectionChecklistItemSchema = z
  .object({
    id: stringish.default(''),
    item_number: stringish.default(''),
    description: stringish.default(''),
    outcome: stringish.default(''),
    clause: stringish.default(''),
    notes: stringish.default(''),
    section_num: stringish.default(''),
    col_acc: stringish.default(''),
    col_na: stringish.default(''),
    col_c1c2: stringish.default(''),
    col_c3: stringish.default(''),
    col_fi: stringish.default(''),
    col_nv: stringish.default(''),
    col_lim: stringish.default(''),
  })
  .passthrough();

const inspectionSectionItemSchema = z
  .object({
    id: stringish.default(''),
    item_number: stringish.default(''),
    item: stringish.default(''),
    clause: stringish.default(''),
    outcome: stringish.default(''),
    outcome_display: stringish.default(''),
    notes: stringish.default(''),
  })
  .passthrough();

const inspectionSectionSchema = z
  .object({
    section_name: stringish.default(''),
    clause: stringish.default(''),
    items: z.array(inspectionSectionItemSchema).default([]),
  })
  .passthrough();

const circuitPlanningSchema = z
  .object({
    id: stringish.default(''),
    circuit_number: stringish.default(''),
    cable_size: stringish.default(''),
    cable_type: stringish.default(''),
    protective_device_rating: stringish.default(''),
    circuit_description: stringish.default(''),
  })
  .passthrough();

// ─── Root schema ─────────────────────────────────────────────────────

const s = stringish.default('').optional();
const b = boolish.default(false).optional();

export const eicrPayloadSchema = z
  .object({
    // ── Nested objects ──────────────────────────────────────────────

    metadata: z
      .object({
        certificate_number: stringish.default(''),
        form_version: stringish.default('1.0'),
        export_timestamp: stringish.default(''),
      })
      .default({}),

    client_details: z
      .object({
        client_name: stringish.default(''),
        client_address: stringish.default(''),
        client_phone: stringish.default(''),
        client_email: stringish.default(''),
      })
      .default({}),

    installation_details: z
      .object({
        address: stringish.default(''),
        same_as_client_address: boolish.default(false),
        occupier: stringish.default(''),
        installation_type: stringish.default(''),
        description: stringish.default(''),
        premises_type: stringish.default(''),
        other_premises_description: stringish.default(''),
        installation_date: stringish.default(''),
        test_date: stringish.default(''),
        construction_date: stringish.default(''),
        estimated_age: stringish.default(''),
        age_unit: stringish.default(''),
        // Valid values: '' | 'known' | 'unknown' | 'first'
        // Frontend stores 'not-applicable' — normaliseLastInspectionType() in eicrJsonFormatter maps it to 'first'
        last_inspection_type: z.enum(['', 'known', 'unknown', 'first']).default(''),
        date_of_last_inspection: stringish.default(''),
        evidence_of_alterations: stringish.default(''),
        alterations_details: stringish.default(''),
        alterations_age: stringish.default(''),
        installation_records_available: stringish.default(''),
        purpose_of_inspection: stringish.default(''),
        other_purpose: stringish.default(''),
        agreed_with: stringish.default(''),
        extent_of_inspection: stringish.default(''),
        limitations_of_inspection: stringish.default(''),
        operational_limitations: stringish.default(''),
        bs_amendment: stringish.default(''),
        next_inspection_date: stringish.default(''),
        inspection_interval: stringish.default(''),
        interval_reasons: stringish.default(''),
      })
      .default({}),

    standards_compliance: z
      .object({
        design_standard: stringish.default('BS7671'),
        part_p_compliance: stringish.default(''),
      })
      .default({}),

    supply_characteristics: z
      .object({
        supply_voltage: stringish.default(''),
        supply_frequency: stringish.default('50'),
        supply_ac_dc: stringish.default('ac'),
        conductor_configuration: stringish.default(''),
        dc_conductor_config: stringish.default(''),
        phases: stringish.default(''),
        earthing_arrangement: stringish.default(''),
        tncs_variant: stringish.default(''), // A4:2026 — 'pme' | 'pnb' for TN-C-S
        supply_type: stringish.default(''),
        supply_pme: stringish.default(''),
        dno_name: stringish.default(''),
        mpan: stringish.default(''),
        cutout_location: stringish.default(''),
        service_entry: stringish.default(''),
        external_ze: stringish.default(''),
        prospective_fault_current: stringish.default(''),
        supply_polarity_confirmed: boolish.default(false),
        other_sources_of_supply: stringish.default(''),
        other_sources_of_supply_present: boolish.default(false),
      })
      .default({}),

    main_protective_device: z
      .object({
        bs_en: stringish.default(''),
        device_type: stringish.default(''),
        main_switch_rating: stringish.default(''),
        main_switch_location: stringish.default(''),
        main_switch_poles: stringish.default(''),
        main_switch_voltage_rating: stringish.default(''),
        fuse_device_rating: stringish.default(''),
        breaking_capacity: stringish.default(''),
      })
      .default({}),

    rcd_details: z
      .object({
        rcd_main_switch: stringish.default(''),
        rcd_rating: stringish.default(''),
        rcd_type: stringish.default(''),
        rcd_time_delay: stringish.default(''),
        rcd_measured_time: stringish.default(''),
        rcd_breaking_capacity: stringish.default(''),
      })
      .default({}),

    distribution_board: z
      .object({
        board_designation: stringish.default('Main DB'),
        board_size: stringish.default(''),
        board_type: stringish.default(''),
        board_location: stringish.default(''),
        board_manufacturer: stringish.default(''),
        board_ways: stringish.default(''),
      })
      .default({}),

    cables: z
      .object({
        intake_cable_size: stringish.default(''),
        intake_cable_type: stringish.default(''),
        tails_size: stringish.default(''),
        tails_length: stringish.default(''),
      })
      .default({}),

    earthing_bonding: z
      .object({
        means_of_earthing_distributor: boolish.default(false),
        means_of_earthing_electrode: boolish.default(false),
        earth_electrode_type: stringish.default(''),
        earth_electrode_location: stringish.default(''),
        earth_electrode_resistance: stringish.default(''),
        main_earthing_conductor_type: stringish.default(''),
        main_earthing_conductor_size: stringish.default(''),
        main_earthing_conductor: stringish.default(''),
        main_bonding_conductor_type: stringish.default(''),
        main_bonding_conductor: stringish.default(''),
        main_bonding_size: stringish.default(''),
        main_bonding_size_custom: stringish.default(''),
        main_bonding_locations: stringish.default(''),
        bonding_water: boolish.default(false),
        bonding_gas: boolish.default(false),
        bonding_oil: boolish.default(false),
        bonding_structural_steel: boolish.default(false),
        bonding_lightning_protection: boolish.default(false),
        bonding_other: boolish.default(false),
        bonding_other_specify: stringish.default(''),
        bonding_compliance: stringish.default(''),
        earthing_conductor_continuity_verified: boolish.default(false),
        bonding_conductor_continuity_verified: boolish.default(false),
        supplementary_bonding: stringish.default(''),
        supplementary_bonding_size: stringish.default(''),
        supplementary_bonding_size_custom: stringish.default(''),
        equipotential_bonding: stringish.default(''),
      })
      .default({}),

    test_instrument_details: z
      .object({
        make_model: stringish.default(''),
        serial_number: stringish.default(''),
        calibration_date: stringish.default(''),
        test_temperature: stringish.default(''),
      })
      .default({}),

    test_information: z
      .object({
        test_method: stringish.default(''),
        test_voltage: stringish.default(''),
        test_notes: stringish.default(''),
      })
      .default({}),

    distribution_board_verification: z
      .object({
        db_reference: stringish.default('Main DB'),
        zdb: stringish.default(''),
        ipf: stringish.default(''),
        confirmed_correct_polarity: boolish.default(false),
        confirmed_phase_sequence: boolish.default(false),
        ring_final_circuit_confirmed: boolish.default(false),
        spd_operational_status: boolish.default(false),
        spd_na: boolish.default(false),
        spd_t1: boolish.default(false),
        spd_t2: boolish.default(false),
        spd_t3: boolish.default(false),
        spd_type: stringish.default(''),
        spd_make: stringish.default(''),
        spd_model: stringish.default(''),
        spd_location: stringish.default(''),
        spd_rated_current_ka: stringish.default(''),
      })
      .default({}),

    designer: z
      .object({
        name: stringish.default(''),
        qualifications: stringish.default(''),
        company: stringish.default(''),
        address: stringish.default(''),
        postcode: stringish.default(''),
        phone: stringish.default(''),
        date: stringish.default(''),
        signature: stringish.default(''),
        departures: stringish.default(''),
        permitted_exceptions: stringish.default(''),
      })
      .default({}),

    // Note: JS `{}.constructor` is the built-in Object function.
    // Preprocess treats non-plain-object values (like the Object constructor) as undefined → default.
    constructor: z.preprocess(
      (val) => (typeof val === 'function' ? undefined : val),
      z
        .object({
          name: stringish.default(''),
          qualifications: stringish.default(''),
          company: stringish.default(''),
          date: stringish.default(''),
          signature: stringish.default(''),
        })
        .default({})
    ),

    inspector: z
      .object({
        name: stringish.default(''),
        qualifications: stringish.default(''),
        company: stringish.default(''),
        date: stringish.default(''),
        signature: stringish.default(''),
      })
      .default({}),

    declarations: z
      .object({
        same_as_designer: boolish.default(false),
        same_as_constructor: boolish.default(false),
        additional_notes: stringish.default(''),
        inspected_by: z
          .object({
            name: stringish.default(''),
            signature: stringish.default(''),
            date: stringish.default(''),
            for_on_behalf_of: stringish.default(''),
            position: stringish.default(''),
            address: stringish.default(''),
            cp_scheme: stringish.default(''),
            cp_scheme_na: boolish.default(false),
          })
          .default({}),
        report_authorised_by: z
          .object({
            name: stringish.default(''),
            date: stringish.default(''),
            signature: stringish.default(''),
            for_on_behalf_of: stringish.default(''),
            position: stringish.default(''),
            address: stringish.default(''),
            membership_no: stringish.default(''),
          })
          .default({}),
        bs7671_compliance: boolish.default(false),
        building_regs_compliance: boolish.default(false),
        competent_person_scheme: boolish.default(false),
        overall_assessment: stringish.default(''),
        satisfactory_for_continued_use: stringish.default(''),
      })
      .default({}),

    company_details: z
      .object({
        company_name: stringish.default(''),
        company_address: stringish.default(''),
        company_phone: stringish.default(''),
        company_email: stringish.default(''),
        company_website: stringish.default(''),
        company_logo: stringish.default(''),
        company_tagline: stringish.default(''),
        company_accent_color: stringish.default(''),
        company_registration_number: stringish.default(''),
        vat_number: stringish.default(''),
        registration_scheme: stringish.default(''),
        registration_number: stringish.default(''),
        registration_expiry: stringish.default(''),
        insurance_provider: stringish.default(''),
        insurance_policy_number: stringish.default(''),
        insurance_coverage: stringish.default(''),
        insurance_expiry: stringish.default(''),
        registration_scheme_logo: stringish.default(''),
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
