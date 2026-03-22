/**
 * minor-works-schema.ts
 * Zod schema defining every field the Minor Works PDF template expects.
 * This is the SINGLE SOURCE OF TRUTH — TypeScript infers the type,
 * the template function consumes it, Zod validates at runtime.
 *
 * Shape matches the output of transformFormDataForTemplate() in
 * generate-minor-works-pdf/index.ts (the snake_case nested format).
 */

import { z } from 'https://esm.sh/zod@3.23.8';

export const minorWorksSchema = z.object({
  // Certificate metadata
  certificate_number: z.string().default(''),
  generated_at: z.string().default(''),
  bs7671_amendment_date: z.string().default('A3:2024'),
  work_date: z.string().default(''),
  date_of_completion: z.string().default(''),
  next_inspection_due: z.string().default(''),

  // Contractor details
  contractor: z
    .object({
      name: z.string().default(''),
      address: z.string().default(''),
    })
    .default({}),

  // Supply characteristics
  supply: z
    .object({
      voltage: z.string().default('230'),
      frequency: z.string().default('50'),
      phases: z.string().default('1'),
    })
    .default({}),

  // Company details (for header branding)
  company: z
    .object({
      name: z.string().default(''),
      logo_url: z.string().default(''),
      phone: z.string().default(''),
      email: z.string().default(''),
      address: z.string().default(''),
      registration_no: z.string().default(''),
      tagline: z.string().default(''),
      accent_color: z.string().default('#d69e2e'),
      website: z.string().default(''),
      scheme_logo: z.string().default(''),
    })
    .default({}),

  // Client details
  client: z
    .object({
      name: z.string().default(''),
      phone: z.string().default(''),
      email: z.string().default(''),
    })
    .default({}),

  person_ordering_work: z.string().default(''),

  // Installation address
  installation: z
    .object({
      address: z.string().default(''),
      postcode: z.string().default(''),
    })
    .default({}),

  // Work details
  work_type: z.string().default(''),
  work_location: z.string().default(''),
  work_description: z.string().default(''),
  departures: z.string().default('None'),
  permitted_exceptions: z.string().default('None'),
  risk_assessment_attached: z.boolean().default(false),
  existing_installation_comments: z.string().default(''),

  // Earthing
  earthing: z
    .object({
      type: z.string().default(''),
      zdb: z.string().default(''),
      conductor_present: z.boolean().default(false),
      conductor_size: z.string().default(''),
      conductor_material: z.string().default('Copper'),
    })
    .default({}),

  // Bonding
  bonding: z
    .object({
      size: z.string().default(''),
      water: z.boolean().default(false),
      water_size: z.string().default(''),
      gas: z.boolean().default(false),
      gas_size: z.string().default(''),
      oil: z.boolean().default(false),
      oil_size: z.string().default(''),
      structural: z.boolean().default(false),
      structural_size: z.string().default(''),
      other: z.boolean().default(false),
      other_specify: z.string().default(''),
    })
    .default({}),

  // Circuit details
  circuit: z
    .object({
      db_ref: z.string().default(''),
      db_location_type: z.string().default(''),
      number: z.string().default(''),
      description: z.string().default(''),
      type: z.string().default(''),
      reference_method: z.string().default(''),
      number_of_conductors: z.string().default(''),
      live_size: z.string().default(''),
      cpc_size: z.string().default(''),
      cable_type: z.string().default(''),
      installation_method: z.string().default(''),
      ocpd: z
        .object({
          bs_en: z.string().default(''),
          type: z.string().default(''),
          rating: z.string().default(''),
          breaking_capacity: z.string().default(''),
        })
        .default({}),
      protection: z
        .object({
          rcd: z.boolean().default(false),
          rcbo: z.boolean().default(false),
          afdd: z.boolean().default(false),
          spd: z.boolean().default(false),
        })
        .default({}),
      rcd: z
        .object({
          bs_en: z.string().default(''),
          type: z.string().default(''),
          rating: z.string().default(''),
          idn: z.string().default(''),
        })
        .default({}),
      afdd: z
        .object({
          bs_en: z.string().default(''),
          rating: z.string().default(''),
        })
        .default({}),
      spd: z
        .object({
          bs_en: z.string().default(''),
          type: z.string().default(''),
        })
        .default({}),
    })
    .default({}),

  // Test results
  tests: z
    .object({
      // Continuity
      r1_r2: z.string().default('N/A'),
      r2: z.string().default('N/A'),
      // Ring circuit
      ring_ll: z.string().default('N/A'),
      ring_nn: z.string().default('N/A'),
      ring_cpc: z.string().default('N/A'),
      ring_r1_end: z.string().default('N/A'),
      ring_rn_end: z.string().default('N/A'),
      ring_r2_end: z.string().default('N/A'),
      ring_r1_cross: z.string().default('N/A'),
      ring_rn_cross: z.string().default('N/A'),
      ring_r2_cross: z.string().default('N/A'),
      ring_final: z.string().default('N/A'),
      // Insulation resistance
      insulation_voltage: z.string().default('500'),
      ir_live_live: z.string().default('N/A'),
      ir_live_neutral: z.string().default('N/A'),
      ir_live_earth: z.string().default('N/A'),
      ir_neutral_earth: z.string().default('N/A'),
      // General tests
      polarity: z.string().default('N/A'),
      zs: z.string().default('N/A'),
      max_zs: z.string().default('N/A'),
      pfc: z.string().default('N/A'),
      // RCD
      rcd_time: z.string().default('N/A'),
      rcd_5x_time: z.string().default('N/A'),
      rcd_half_x: z.string().default('N/A'),
      rcd_test_button: z.string().default('N/A'),
      rcd_rating: z.string().default('N/A'),
      // Functional
      functional_test: z.string().default('N/A'),
      // AFDD
      afdd_test_button: z.string().default('N/A'),
      afdd_trip_time: z.string().default('N/A'),
      // RCBO
      rcbo_trip_time: z.string().default('N/A'),
      // Earth electrode
      earth_electrode: z.string().default('N/A'),
      // Three-phase
      phase_rotation: z.string().default('N/A'),
      // SPD
      spd_visual: z.string().default('N/A'),
      spd_indicator: z.string().default('N/A'),
      spd_test_button: z.union([z.string(), z.boolean()]).default('N/A'),
      // Environment
      temperature: z.string().default('N/A'),
    })
    .default({}),

  // Test equipment
  test_equipment: z
    .object({
      model: z.string().default(''),
      serial: z.string().default(''),
      calibration_date: z.string().default(''),
      custom: z.string().default(''),
    })
    .default({}),

  // Declaration
  declaration: z
    .object({
      name: z.string().default(''),
      company: z.string().default(''),
      address: z.string().default(''),
      phone: z.string().default(''),
      email: z.string().default(''),
      position: z.string().default(''),
      date: z.string().default(''),
      qualification: z.string().default(''),
      scheme_provider: z.string().default(''),
      registration_number: z.string().default(''),
      signature: z.string().default(''),
      iet_declaration: z.boolean().default(false),
      bs7671_compliance: z.boolean().default(false),
      test_results_accurate: z.boolean().default(false),
      work_safety: z.boolean().default(false),
      part_p_notification: z.boolean().default(false),
      copy_provided: z.boolean().default(false),
      additional_notes: z.string().default(''),
    })
    .default({}),
}).passthrough();

export type MinorWorksPayload = z.infer<typeof minorWorksSchema>;

/**
 * Validates and fills defaults for a Minor Works payload.
 * Throws ZodError with detailed field-level issues if data is malformed.
 */
export function validateMinorWorksPayload(data: unknown): MinorWorksPayload {
  return minorWorksSchema.parse(data);
}
