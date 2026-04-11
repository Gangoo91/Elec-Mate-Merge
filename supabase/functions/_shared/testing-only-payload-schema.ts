/**
 * testing-only-payload-schema.ts
 * Zod schema for the Testing Only Certificate PDF payload.
 * Validates the output of formatTestingOnlyJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * If the template changes, update this schema — Deno tests will catch drift.
 *
 * Testing Only uses camelCase field names.
 * NO branding fields — intentionally omitted for Testing Only certificates.
 *
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Circuit sub-schema ─────────────────────────────────────────────────────

const testCircuitSchema = z.object({
  id: z.string().default(''),
  circuitRef: z.string().default(''),
  description: z.string().default(''),
  cableType: z.string().default(''),
  cableSize: z.string().default(''),
  protectionType: z.string().default(''),
  protectionRating: z.string().default(''),
  ze: z.string().default(''),
  zs: z.string().default(''),
  r1r2: z.string().default(''),
  r2: z.string().default(''),
  ir: z.string().default(''),
  polarity: z.string().default(''),
  rcdType: z.string().default(''),
  rcdRating: z.string().default(''),
  rcdTripTime: z.string().default(''),
  result: z.string().default(''),
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
  numberOfCircuits: z.string().default(''),

  // ── Circuits ─────────────────────────────────────────────────────────────
  circuits: z.array(testCircuitSchema).default([]),

  // ── Signature & notes ────────────────────────────────────────────────────
  testerSignature: z.string().default(''),
  testerDate: z.string().default(''),
  notes: z.string().default(''),
}).passthrough();

export type TestingOnlyPayload = z.infer<typeof testingOnlyPayloadSchema>;
