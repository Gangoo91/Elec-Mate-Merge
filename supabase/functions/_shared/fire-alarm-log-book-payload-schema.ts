/**
 * fire-alarm-log-book-payload-schema.ts
 * Zod schema for the Fire Alarm Log Book (BS 5839-1:2025 Annex H) PDF payload.
 * Validates the output of formatFireAlarmLogBookJson() before it reaches
 * PDFMonkey template A89B34B4-018F-45AE-A6C0-3AFCA4A595A6.
 *
 * Every field here maps to a {{ variable }} in the Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 *
 * ⚠️ This observes, it does not gate. The edge function sends the payload it
 * was given regardless of the result and reports drift to Sentry. A schema that
 * blocked would turn a cosmetic mismatch into "no log book at all" for someone
 * stood in front of a fire officer.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Record tables ───────────────────────────────────────────────────────────
// Generic on purpose: the formatter shapes columns and rows so a new entry type
// does not require a template edit or a schema edit.
const sectionSchema = z.object({
  title: z.string().default(''),
  columns: z.array(z.string()).default([]),
  rows: z.array(z.array(z.string())).default([]),
});

const openDefectSchema = z.object({
  date: z.string().default(''),
  description: z.string().default(''),
  location: z.string().default(''),
  days_open: z.string().default(''),
});

const photoSchema = z.object({
  url: z.string().default(''),
  date: z.string().default(''),
  caption: z.string().default(''),
});

const certificateSchema = z.object({
  type: z.string().default(''),
  reference: z.string().default(''),
  date: z.string().default(''),
  issued_by: z.string().default(''),
});

const deviationSchema = z.object({
  date: z.string().default(''),
  description: z.string().default(''),
  agreed_with: z.string().default(''),
  reason: z.string().default(''),
});

export const fireAlarmLogBookPayloadSchema = z
  .object({
    // Branding
    company_name: z.string().default(''),
    company_logo: z.string().default(''),
    company_accent_color: z.string().default('#dc2626'),
    registration_scheme_logo: z.string().default(''),

    standard_edition: z.string().default('BS 5839-1:2025'),
    exported_at: z.string().default(''),
    period_label: z.string().default(''),

    // Premises and system particulars
    premises_name: z.string().default(''),
    premises_address: z.string().default(''),
    system_category: z.string().default(''),
    panel_make_model: z.string().default(''),
    panel_location: z.string().default(''),
    detector_count: z.string().default(''),
    call_point_count: z.string().default(''),
    arc_summary: z.string().default(''),
    installation_date: z.string().default(''),
    acceptance_date: z.string().default(''),
    commissioning_cert_ref: z.string().default(''),
    servicing_org: z.string().default(''),
    service_interval: z.string().default(''),
    last_service_date: z.string().default(''),
    weekly_test_day: z.string().default(''),
    responsible_person_name: z.string().default(''),

    // Status
    last_weekly_test: z.string().default(''),
    next_weekly_due: z.string().default(''),
    weekly_overdue: z.boolean().default(false),
    entries_total: z.number().default(0),
    weekly_tests_count: z.number().default(0),
    open_defect_count: z.number().default(0),
    false_alarm_count: z.number().default(0),
    service_visit_count: z.number().default(0),

    // BS 5839-1 Annex F. Rate is a string so an empty value can mean "no
    // detector count recorded" rather than being indistinguishable from zero —
    // an unknown rate and a rate of nought are very different findings.
    false_alarm_rate: z.string().default(''),
    false_alarm_count_12mo: z.string().default(''),
    false_alarm_trigger_exceeded: z.boolean().default(false),

    open_defects: z.array(openDefectSchema).default([]),
    sections: z.array(sectionSchema).default([]),
    photos: z.array(photoSchema).default([]),
    has_photos: z.boolean().default(false),
    certificates: z.array(certificateSchema).default([]),

    // System documentation (BS 5839-1:2025 additions)
    fire_risk_assessment_ref: z.string().default(''),
    fire_risk_assessment_date: z.string().default(''),
    zone_plan_ref: z.string().default(''),
    zone_plan_verified: z.boolean().default(false),
    zone_plan_verified_date: z.string().default(''),
    cause_effect_ref: z.string().default(''),
    cause_effect_verified: z.boolean().default(false),
    cause_effect_verified_date: z.string().default(''),
    deviations: z.array(deviationSchema).default([]),

    // Countersignatures
    responsible_person_position: z.string().default(''),
    responsible_person_date: z.string().default(''),
    responsible_person_signature: z.string().default(''),
    engineer_name: z.string().default(''),
    engineer_date: z.string().default(''),
    engineer_signature: z.string().default(''),
  })
  // Passthrough, like the other cert schemas: an extra key is not a reason to
  // report drift, a missing or wrongly-typed one is.
  .passthrough();

export type FireAlarmLogBookPayload = z.infer<typeof fireAlarmLogBookPayloadSchema>;
