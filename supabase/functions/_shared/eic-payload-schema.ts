/**
 * eic-payload-schema.ts
 * Zod schema defining every field the EIC (Electrical Installation Certificate)
 * PDF Monkey template expects (B39538E9-8FF1-4882-BC13-70B1C0D30947).
 *
 * Shape matches the output of formatEicJson() in src/utils/eicJsonFormatter.ts.
 * The edge function validates against this before sending to PDF Monkey (soft-fail).
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ─── Sub-schemas ─────────────────────────────────────────────────────

const eicCircuitSchema = z
  .object({
    id: z.string().default('N/A'),
    circuit_number: z.string().default('N/A'),
    circuit_description: z.string().default('N/A'),
    circuit_type: z.string().default('N/A'),
    type_of_wiring: z.string().default('N/A'),
    reference_method: z.string().default('N/A'),
    live_size: z.string().default('N/A'),
    cpc_size: z.string().default('N/A'),
    protective_device_type: z.string().default('N/A'),
    protective_device_curve: z.string().default('N/A'),
    protective_device_rating: z.string().default('N/A'),
    protective_device_ka_rating: z.string().default('N/A'),
    protective_device_location: z.string().default('N/A'),
    bs_standard: z.string().default('N/A'),
    r1r2: z.string().default('N/A'),
    r2: z.string().default('N/A'),
    ring_continuity_live: z.string().default('N/A'),
    ring_continuity_neutral: z.string().default('N/A'),
    ring_r1: z.string().default('N/A'),
    ring_rn: z.string().default('N/A'),
    ring_r2: z.string().default('N/A'),
    insulation_test_voltage: z.string().default('N/A'),
    insulation_resistance: z.string().default('N/A'),
    insulation_live_neutral: z.string().default('N/A'),
    insulation_live_earth: z.string().default('N/A'),
    insulation_neutral_earth: z.string().default('N/A'),
    polarity: z.string().default('N/A'),
    zs: z.string().default('N/A'),
    max_zs: z.string().default('N/A'),
    points_served: z.string().default('N/A'),
    rcd_rating: z.string().default('N/A'),
    rcd_bs_standard: z.string().default('N/A'),
    rcd_type: z.string().default('N/A'),
    rcd_rating_a: z.string().default('N/A'),
    rcd_one_x: z.string().default('N/A'),
    rcd_half_x: z.string().default('N/A'),
    rcd_five_x: z.string().default('N/A'),
    rcd_test_button: z.string().default('N/A'),
    afdd_test: z.string().default('N/A'),
    pfc: z.string().default('N/A'),
    pfc_live_neutral: z.string().default('N/A'),
    pfc_live_earth: z.string().default('N/A'),
    functional_testing: z.string().default('N/A'),
    notes: z.string().default('N/A'),
    phase_type: z.string().default('N/A'),
    phase_rotation: z.string().default('N/A'),
    phase_balance_l1: z.string().default('N/A'),
    phase_balance_l2: z.string().default('N/A'),
    phase_balance_l3: z.string().default('N/A'),
    line_to_line_voltage: z.string().default('N/A'),
    db_reference: z.string().default('DB1'),
    source_circuit_id: z.union([z.string(), z.null()]).default(null),
    auto_filled: z.union([z.boolean(), z.string()]).default(false),
  })
  .passthrough();

const eicDistributionBoardSchema = z
  .object({
    db_reference: z.string().default(''),
    location: z.string().default(''),
    board_type: z.string().default(''),
    board_make: z.string().default(''),
    board_model: z.string().default(''),
    total_ways: z.union([z.string(), z.number()]).default(''),
    used_ways: z.union([z.string(), z.number()]).default(''),
    spare_ways: z.union([z.string(), z.number()]).default(''),
    zdb: z.string().default(''),
    ipf: z.string().default(''),
    main_switch_bs_en: z.string().default(''),
    main_switch_type: z.string().default(''),
    main_switch_rating: z.string().default(''),
    main_switch_poles: z.string().default(''),
    rcd_type: z.string().default(''),
    rcd_rating: z.string().default(''),
    rcd_measured_time: z.string().default(''),
    spd_fitted: z.boolean().default(false),
    spd_operational: z.boolean().default(false),
    spd_na: z.boolean().default(false),
    polarity_confirmed: z.boolean().default(false),
    phase_sequence_confirmed: z.boolean().default(false),
    supply_from: z.string().default('Main'),
    supply_cable_size: z.string().default(''),
    supply_cable_type: z.string().default(''),
  })
  .passthrough();

const eicObservationSchema = z
  .object({
    id: z.string().default(''),
    description: z.string().default(''),
    defect_code: z.string().default(''),
    recommendation: z.string().default(''),
    item: z.string().default(''),
    rectified: z.boolean().default(false),
    photo_evidence: z.array(z.string()).default([]),
    photo_count: z.number().default(0),
  })
  .passthrough();

const eicChecklistItemSchema = z
  .object({
    id: z.string().default(''),
    item_number: z.string().default(''),
    description: z.string().default(''),
    outcome: z.string().default(''),
    notes: z.string().default(''),
  })
  .passthrough();

// ─── Root schema ─────────────────────────────────────────────────────

// EIC has 14 flat inspection keys (insp_1 … insp_14)
function buildFlatInspectionSchema(): Record<string, z.ZodOptional<z.ZodDefault<z.ZodString>>> {
  const shape: Record<string, z.ZodOptional<z.ZodDefault<z.ZodString>>> = {};
  for (let i = 1; i <= 14; i++) {
    shape[`insp_${i}`] = z.string().default('').optional();
  }
  return shape;
}

export const eicPayloadSchema = z
  .object({
    // ── Flat inspection keys (14) ──────────────────────────────────
    ...buildFlatInspectionSchema(),

    // ── Nested objects ─────────────────────────────────────────────

    metadata: z
      .object({
        certificate_number: z.string().default(''),
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
        installation_type: z.string().default(''),
        work_type: z.string().default(''),
        description: z.string().default(''),
        extent_of_installation: z.string().default(''),
        installation_date: z.string().default(''),
        test_date: z.string().default(''),
        construction_date: z.string().default(''),
      })
      .default({}),

    standards_compliance: z
      .object({
        design_standard: z.string().default(''),
        part_p_compliance: z.string().default(''),
      })
      .default({}),

    supply_characteristics: z
      .object({
        supply_voltage: z.string().default(''),
        supply_frequency: z.string().default(''),
        phases: z.string().default(''),
        earthing_arrangement: z.string().default(''),
        supply_type: z.string().default(''),
        supply_pme: z.string().default(''),
        live_conductor_type: z.string().default(''),
        dc_supply_type: z.string().default(''),
        prospective_fault_current: z.string().default(''),
        external_ze: z.string().default(''),
        supply_polarity_confirmed: z.boolean().default(false),
        other_sources_of_supply: z.boolean().default(false),
        other_sources_details: z.string().default(''),
      })
      .default({}),

    supply_protective_device: z
      .object({
        bs_en: z.string().default('N/A'),
        type: z.string().default('N/A'),
        rated_current: z.string().default('N/A'),
      })
      .default({}),

    main_protective_device: z
      .object({
        device_type: z.string().default('N/A'),
        main_switch_rating: z.string().default('N/A'),
        main_switch_location: z.string().default('N/A'),
        breaking_capacity: z.string().default('N/A'),
        bs_en: z.string().default('N/A'),
        poles: z.string().default('N/A'),
        fuse_setting: z.string().default('N/A'),
        voltage_rating: z.string().default('N/A'),
      })
      .default({}),

    rcd_details: z
      .object({
        rcd_main_switch: z.string().default(''),
        rcd_rating: z.string().default('N/A'),
        rcd_type: z.string().default('N/A'),
        rcd_operating_time: z.string().default('N/A'),
        rcd_rated_time_delay: z.string().default('N/A'),
        rcd_measured_operating_time: z.string().default('N/A'),
      })
      .default({}),

    distribution_board: z
      .object({
        board_size: z.string().default(''),
        board_type: z.string().default(''),
        board_location: z.string().default(''),
      })
      .default({}),

    distribution_boards: z.array(eicDistributionBoardSchema).default([]),

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
        means_of_earthing: z.string().default(''),
        earth_electrode_type: z.string().default(''),
        earth_electrode_location: z.string().default(''),
        earth_electrode_resistance: z.string().default(''),
        earth_electrode_na: z.boolean().default(false),
        earthing_conductor_material: z.string().default(''),
        earthing_conductor_csa: z.string().default(''),
        earthing_conductor_verified: z.boolean().default(false),
        earthing_conductor_na: z.boolean().default(false),
        main_bonding_conductor: z.string().default(''),
        main_bonding_material: z.string().default(''),
        main_bonding_size: z.string().default(''),
        main_bonding_size_custom: z.string().default(''),
        main_bonding_verified: z.boolean().default(false),
        main_bonding_na: z.boolean().default(false),
        maximum_demand: z.string().default(''),
        maximum_demand_unit: z.string().default('A'),
        bonding_water: z.boolean().default(false),
        bonding_gas: z.boolean().default(false),
        bonding_oil: z.boolean().default(false),
        bonding_structural_steel: z.boolean().default(false),
        bonding_lightning_protection: z.boolean().default(false),
        bonding_other: z.boolean().default(false),
        bonding_other_specify: z.string().default(''),
        bonding_compliance: z.string().default(''),
        supplementary_bonding: z.string().default(''),
        supplementary_bonding_size: z.string().default(''),
        supplementary_bonding_size_custom: z.string().default(''),
        equipotential_bonding: z.string().default(''),
      })
      .default({}),

    inspection_checklist: z.array(eicChecklistItemSchema).default([]),

    schedule_of_tests: z.array(eicCircuitSchema).default([]),

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
        db_reference: z.string().default(''),
        zdb: z.string().default(''),
        ipf: z.string().default(''),
        confirmed_correct_polarity: z.boolean().default(false),
        confirmed_phase_sequence: z.boolean().default(false),
        spd_operational_status: z.boolean().default(false),
        spd_na: z.boolean().default(false),
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
        bs7671_amendment_date: z.string().default(''),
        departures: z.string().default(''),
        permitted_exceptions: z.string().default(''),
        risk_assessment_attached: z.boolean().default(false),
      })
      .default({}),

    designer_2: z.preprocess(
      (val) => (val == null || typeof val === 'function' ? undefined : val),
      z
        .object({
          name: z.string().default(''),
          company: z.string().default(''),
          address: z.string().default(''),
          postcode: z.string().default(''),
          phone: z.string().default(''),
          date: z.string().default(''),
          signature: z.string().default(''),
        })
        .default({})
    ),

    // Note: JS `{}.constructor` is the built-in Object function.
    // Preprocess treats non-plain-object values (like the Object constructor) as undefined -> default.
    constructor: z.preprocess(
      (val) => (typeof val === 'function' ? undefined : val),
      z
        .object({
          name: z.string().default(''),
          qualifications: z.string().default(''),
          company: z.string().default(''),
          address: z.string().default(''),
          postcode: z.string().default(''),
          phone: z.string().default(''),
          date: z.string().default(''),
          signature: z.string().default(''),
          bs7671_amendment_date: z.string().default(''),
          departures: z.string().default(''),
          same_as_designer: z.boolean().default(false),
        })
        .default({})
    ),

    inspector: z
      .object({
        name: z.string().default(''),
        qualifications: z.string().default(''),
        company: z.string().default(''),
        address: z.string().default(''),
        postcode: z.string().default(''),
        phone: z.string().default(''),
        date: z.string().default(''),
        signature: z.string().default(''),
        bs7671_amendment_date: z.string().default(''),
        departures: z.string().default(''),
        same_as_constructor: z.boolean().default(false),
      })
      .default({}),

    next_inspection: z
      .object({
        interval_months: z.string().default(''),
        recommended_date: z.string().default(''),
      })
      .default({}),

    existing_installation_comments: z.string().default(''),

    declarations: z
      .object({
        additional_notes: z.string().default(''),
        inspected_by: z
          .object({
            name: z.string().default(''),
            signature: z.string().default(''),
            for_on_behalf_of: z.string().default(''),
            position: z.string().default(''),
            address: z.string().default(''),
            cp_scheme: z.string().default(''),
            cp_scheme_na: z.boolean().default(false),
            same_as_inspector: z.boolean().default(false),
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
            postcode: z.string().default(''),
            phone: z.string().default(''),
            membership_no: z.string().default(''),
          })
          .default({}),
        bs7671_compliance: z.boolean().default(false),
        building_regs_compliance: z.boolean().default(false),
        competent_person_scheme: z.boolean().default(false),
      })
      .default({}),

    observations: z.array(eicObservationSchema).default([]),

    company_details: z
      .object({
        company_name: z.string().default(''),
        company_tagline: z.string().default(''),
        company_address: z.string().default(''),
        company_postcode: z.string().default(''),
        company_phone: z.string().default(''),
        company_email: z.string().default(''),
        company_website: z.string().default(''),
        company_logo: z.string().default(''),
        company_accent_color: z.string().default(''),
        registration_scheme: z.string().default(''),
        registration_number: z.string().default(''),
      })
      .default({}),

    // Root-level branding fields
    company_logo: z.string().default('').optional(),
    registration_scheme_logo: z.string().default('').optional(),
    company_accent_color: z.string().default('').optional(),
  })
  .passthrough(); // Allow extra keys — PDF Monkey ignores unknowns

export type EICPayload = z.infer<typeof eicPayloadSchema>;

/**
 * Validates an EIC payload. Uses safeParse — returns { success, data?, error? } without throwing.
 */
export function validateEICPayload(data: unknown) {
  return eicPayloadSchema.safeParse(data);
}
