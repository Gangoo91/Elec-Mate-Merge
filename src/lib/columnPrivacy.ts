/**
 * ELE-1831 — column privacy. Some columns are hidden from the `authenticated`
 * role at the database level (supabase/release-held/20261007169000_role_column_privacy.sql):
 *
 *   employer_jobs ............. value, client_phone, client_email
 *   employer_employees ........ hourly_rate, annual_salary, overtime_multiplier
 *   employer_company_tools .... purchase_price
 *   employer_elec_id_profiles . ecs_card_number, verification_notes, shareable_link
 *   elec_id_documents ......... document_number, extracted_data, raw_ocr_text
 *
 * Once that ships, select('*') / embedded (*) / .insert().select() on these
 * tables fails with 42501 for everyone — owners included. So every read uses
 * the explicit column lists below, and the hidden values come back through
 * owner/admin RPCs (20261007290000_role_column_privacy_rpcs.sql) that return
 * NULL where the caller may not see them.
 *
 * Adding a column to one of these tables? Add it here AND to the grant list in
 * the release-held script, or nobody can read it.
 *
 * Typing: each list is typed as '*' so supabase-js keeps inferring the full
 * generated Row (types.ts lags the live schema, and the hidden columns are
 * merged back in by the with*Private helpers below). The runtime string is
 * the explicit list — that is what PostgREST sees.
 */
import { supabase } from '@/integrations/supabase/client';

export const JOB_COLUMNS = (
  'id, title, client, location, lat, lng, status, progress, start_date, end_date, workers_count, description, created_at, updated_at, archived_at, is_template, cover_photo_url, position, user_id, client_id, board_stage, customer_id, completed_at, site_contact_name, site_contact_phone, access_notes, share_client_contact_with_crew, quoted_hours, job_type, recurring_contract_id, previous_visit_job_id, required_credentials'
) as unknown as '*';

export const EMPLOYEE_COLUMNS = (
  'id, name, role, team_role, status, phone, email, avatar_initials, photo_url, join_date, certifications_count, active_jobs_count, created_at, updated_at, pay_type, user_id, employer_id, is_principal_qs, overtime_threshold_hours, claimed_at, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, supervisor_employee_id, link_declined_at, invite_last_chased_at, invite_chase_count'
) as unknown as '*';

export const TOOL_COLUMNS = (
  'id, tool_number, name, category, serial_number, purchase_date, assigned_to, assigned_to_employee_id, status, last_calibration, next_calibration, pat_date, pat_due, notes, created_at, updated_at, user_id, assigned_vehicle_id, issue_state, issued_at, confirmed_at, barcode, photo_path'
) as unknown as '*';

export const ELEC_ID_PROFILE_COLUMNS = (
  'id, employee_id, elec_id_number, ecs_card_type, ecs_expiry_date, bio, specialisations, profile_views, is_verified, verified_at, verified_by, created_at, updated_at, activated, activated_at, opt_out, opt_out_at, verification_tier, tier_updated_at, available_for_hire, profile_visibility, rate_type, rate_amount, verification_status, reviewed_by, reviewed_at, rejection_reason, job_title, work_record_public, available_for_hire_opted_in_at, work_area, verification_method, ecs_verification_level, ecs_verified_by, ecs_verified_at, ecs_verification_method, ecs_verifier_employer_id'
) as unknown as '*';

export const ELEC_ID_DOCUMENT_COLUMNS = (
  'id, profile_id, document_type, document_name, issuing_body, issue_date, expiry_date, file_url, file_path, verification_status, verification_method, verification_confidence, verified_at, verified_by, rejection_reason, rejection_code, rejection_details, appeal_submitted_at, appeal_notes, extraction_confidence, user_corrections, corrections_applied_at, upload_attempt_number, previous_attempt_id, created_at, updated_at, flagged_for_review, flag_reason, flag_severity, reviewed_by, reviewed_at, review_notes, review_action'
) as unknown as '*';

// Cast: these RPCs postdate the last types.ts regeneration.
async function rpcRows<R>(fn: string, args: Record<string, unknown>): Promise<R[]> {
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) {
    // Never block a screen on the private extras — the row itself still shows.
    console.warn(`[columnPrivacy] ${fn} failed`, error);
    return [];
  }
  return (data ?? []) as unknown as R[];
}

const num = (v: unknown): number | null => (v == null ? null : Number(v));

type JobPrivate = { value: number | null; client_phone: string | null; client_email: string | null };

/** Merge value / client contact into job rows (NULL where the caller may not see them). */
export async function withJobPrivate<T extends { id: string }>(
  rows: T[]
): Promise<Array<T & JobPrivate>> {
  if (!rows.length) return rows as Array<T & JobPrivate>;
  const priv = await rpcRows<{ job_id: string; value: unknown; client_phone: string | null; client_email: string | null }>(
    'get_job_private_fields',
    { p_job_ids: rows.map((r) => r.id) }
  );
  const byId = new Map(priv.map((p) => [p.job_id, p]));
  return rows.map((r) => {
    const p = byId.get(r.id);
    return {
      ...r,
      value: num(p?.value),
      client_phone: p?.client_phone ?? null,
      client_email: p?.client_email ?? null,
    };
  });
}

/** job id → value, for embedded job reads that only need the money figure. */
export async function getJobValueMap(jobIds: string[]): Promise<Map<string, number | null>> {
  const ids = Array.from(new Set(jobIds.filter(Boolean)));
  if (!ids.length) return new Map();
  const priv = await rpcRows<{ job_id: string; value: unknown }>('get_job_private_fields', {
    p_job_ids: ids,
  });
  return new Map(priv.map((p) => [p.job_id, num(p.value)]));
}

type EmployeePay = {
  hourly_rate: number | null;
  annual_salary: number | null;
  overtime_multiplier: number | null;
};

/** Merge pay into roster rows. `firm` null = the caller's own rows only. */
export async function withEmployeePay<T extends { id: string }>(
  rows: T[],
  firm: string | null
): Promise<Array<T & EmployeePay>> {
  if (!rows.length) return rows as Array<T & EmployeePay>;
  const pay = await rpcRows<{
    employee_id: string;
    hourly_rate: unknown;
    annual_salary: unknown;
    overtime_multiplier: unknown;
  }>('get_firm_roster_pay', { p_firm: firm });
  const byId = new Map(pay.map((p) => [p.employee_id, p]));
  return rows.map((r) => {
    const p = byId.get(r.id);
    return {
      ...r,
      hourly_rate: num(p?.hourly_rate),
      annual_salary: num(p?.annual_salary),
      overtime_multiplier: num(p?.overtime_multiplier),
    };
  });
}

/** Merge purchase_price into company tool rows (owner/admin only). */
export async function withToolCosts<T extends { id: string; user_id?: string | null }>(
  rows: T[]
): Promise<Array<T & { purchase_price: number | null }>> {
  if (!rows.length) return rows as Array<T & { purchase_price: number | null }>;
  const firms = Array.from(new Set(rows.map((r) => r.user_id).filter(Boolean))) as string[];
  const all = await Promise.all(
    firms.map((f) => rpcRows<{ tool_id: string; purchase_price: unknown }>('get_firm_tool_costs', { p_firm: f }))
  );
  const byId = new Map(all.flat().map((c) => [c.tool_id, num(c.purchase_price)]));
  return rows.map((r) => ({ ...r, purchase_price: byId.get(r.id) ?? null }));
}

type ElecIdProfilePrivate = {
  ecs_card_number: string | null;
  verification_notes: string | null;
  shareable_link: string | null;
};

/** Merge the Elec-ID profile's private fields (the person, their firm, or a platform admin). */
export async function withElecIdProfilePrivate<T extends { id: string }>(
  rows: T[]
): Promise<Array<T & ElecIdProfilePrivate>> {
  if (!rows.length) return rows as Array<T & ElecIdProfilePrivate>;
  const priv = await rpcRows<{ profile_id: string } & ElecIdProfilePrivate>(
    'get_elec_id_profiles_private',
    { p_ids: rows.map((r) => r.id) }
  );
  const byId = new Map(priv.map((p) => [p.profile_id, p]));
  return rows.map((r) => {
    const p = byId.get(r.id);
    return {
      ...r,
      ecs_card_number: p?.ecs_card_number ?? null,
      verification_notes: p?.verification_notes ?? null,
      shareable_link: p?.shareable_link ?? null,
    };
  });
}

type ElecIdDocumentPrivate = {
  document_number: string | null;
  extracted_data: unknown;
  raw_ocr_text: string | null;
};

/** Merge an Elec-ID document's private fields (the person or a platform admin). */
export async function withElecIdDocumentPrivate<T extends { id: string }>(
  rows: T[]
): Promise<Array<T & ElecIdDocumentPrivate>> {
  if (!rows.length) return rows as Array<T & ElecIdDocumentPrivate>;
  const priv = await rpcRows<{ document_id: string } & ElecIdDocumentPrivate>(
    'get_elec_id_documents_private',
    { p_ids: rows.map((r) => r.id) }
  );
  const byId = new Map(priv.map((p) => [p.document_id, p]));
  return rows.map((r) => {
    const p = byId.get(r.id);
    return {
      ...r,
      document_number: p?.document_number ?? null,
      extracted_data: p?.extracted_data ?? null,
      raw_ocr_text: p?.raw_ocr_text ?? null,
    };
  });
}
