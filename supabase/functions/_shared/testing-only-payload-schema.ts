/**
 * testing-only-payload-schema.ts
 * Zod schema for the Testing Only Certificate PDF payload.
 * Validates the output of formatTestingOnlyJson() before sending to PDF Monkey.
 *
 * Circuits now use the full TestResult format (same as EICR/EIC),
 * with snake_case field names matching the Liquid template variables.
 *
 * NO branding fields — intentionally omitted for Testing Only certificates.
 *
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Circuit sub-schema (matches EICR formatCircuit output) ────────────────

const testCircuitSchema = z.object({
  id: z.string().default(''),
  circuit_number: z.string().default(''),
  circuit_description: z.string().default(''),
  type_of_wiring: z.string().default(''),
  reference_method: z.string().default(''),
  points_served: z.string().default(''),
  live_size: z.string().default(''),
  cpc_size: z.string().default(''),
  bs_standard: z.string().default(''),
  protective_device_type: z.string().default(''),
  protective_device_curve: z.string().default(''),
  protective_device_rating: z.string().default(''),
  protective_device_ka_rating: z.string().default(''),
  max_zs: z.string().default(''),
  rcd_bs_standard: z.string().default(''),
  rcd_type: z.string().default(''),
  rcd_rating: z.string().default(''),
  rcd_rating_a: z.string().default(''),
  ring_r1: z.string().default(''),
  ring_rn: z.string().default(''),
  ring_r2: z.string().default(''),
  r1r2: z.string().default(''),
  r2: z.string().default(''),
  insulation_test_voltage: z.string().default(''),
  insulation_live_neutral: z.string().default(''),
  insulation_live_earth: z.string().default(''),
  polarity: z.string().default(''),
  zs: z.string().default(''),
  rcd_one_x: z.string().default(''),
  rcd_test_button: z.string().default(''),
  afdd_test: z.string().default(''),
  notes: z.string().default(''),
}).passthrough();

// ── Board sub-schema (matches EICR formatBoardsWithSchedules output) ──────

const boardSchema = z.object({
  db_reference: z.string().default(''),
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
  spd_operational: z.boolean().default(false),
  spd_na: z.boolean().default(false),
  spd_make: z.string().default(''),
  spd_model: z.string().default(''),
  spd_location: z.string().default(''),
  spd_rated_current_ka: z.string().default(''),
  main_switch_bs_en: z.string().default(''),
  main_switch_type: z.string().default(''),
  main_switch_rating: z.string().default(''),
  main_switch_poles: z.string().default(''),
  circuit_count: z.number().default(0),
  circuits: z.array(testCircuitSchema).default([]),
}).passthrough();

// ── Root Schema ────────────────────────────────────────────────────────────

export const testingOnlyPayloadSchema = z.object({
  // ── Certificate header ───────────────────────────────────────────────────
  referenceNumber: z.string().default(''),
  testDate: z.string().default(''),

  // ── Tester details ───────────────────────────────────────────────────────
  testerName: z.string().default(''),
  testerQualifications: z.string().default(''),
  testerPhone: z.string().default(''),
  testerEmail: z.string().default(''),

  // ── Client / Main Contractor ────────────────────────────────────────────
  clientName: z.string().default(''),
  declarationConfirmed: z.boolean().default(false),

  // ── MFT instrument ───────────────────────────────────────────────────────
  mftMake: z.string().default(''),
  mftModel: z.string().default(''),
  mftSerial: z.string().default(''),
  mftCalDate: z.string().default(''),

  // ── Loop tester ──────────────────────────────────────────────────────────
  loopMake: z.string().default(''),
  loopSerial: z.string().default(''),

  // ── RCD tester ───────────────────────────────────────────────────────────
  rcdTesterMake: z.string().default(''),
  rcdTesterSerial: z.string().default(''),

  // ── Installation ─────────────────────────────────────────────────────────
  installationAddress: z.string().default(''),
  installationDescription: z.string().default(''),
  workCarriedOut: z.string().default(''),
  numberOfCircuits: z.string().default(''),

  // ── Boards with grouped circuits ──────────────────────────────────────────
  boards: z.array(boardSchema).default([]),

  // ── Flat circuits list (backward compat) ─────────────────────────────────
  circuits: z.array(testCircuitSchema).default([]),

  // ── Signature & notes ────────────────────────────────────────────────────
  testerSignature: z.string().default(''),
  testerDate: z.string().default(''),
  notes: z.string().default(''),
}).passthrough();

export type TestingOnlyPayload = z.infer<typeof testingOnlyPayloadSchema>;
