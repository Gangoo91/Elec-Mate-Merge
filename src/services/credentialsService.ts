/**
 * credentialsService — the ONE credentials store (ELE-1950).
 *
 * Every qualification, card, certificate and training record for a person
 * lives on their Elec-ID (`employer_elec_id_qualifications`), with a
 * verification level per item:
 *
 *   self_declared       the person (or the firm) typed it in
 *   document_seen       someone looked at the certificate / card
 *   verified_at_source  checked with the awarding body or card scheme
 *
 * plus who checked it, for which firm, how and when. Only the database RPCs can
 * raise a level, nobody can verify their own items, and any change to an item's
 * substance drops it back to self_declared.
 *
 * The old stores (employer_certifications, training_records,
 * employer_elec_id_training) are [LEGACY — DO NOT USE]: never read or write them.
 *
 * Firm side: get_team_credentials() resolves each roster row to the PERSON's
 * Elec-ID (their own stub profile, which is where 83 of 85 real qualifications
 * live), not just a profile hanging off the firm's roster row.
 */
import { supabase } from '@/integrations/supabase/client';
import type { Tone } from '@/components/employer/editorial';
import { getQualificationLabel } from '@/data/uk-electrician-constants';

export type VerificationLevel = 'self_declared' | 'document_seen' | 'verified_at_source';

export const VERIFICATION_LEVELS: VerificationLevel[] = [
  'self_declared',
  'document_seen',
  'verified_at_source',
];

export type TrainingStatus = 'Pending' | 'In Progress' | 'Completed' | 'Failed' | 'Expired';

/** One item in a person's credentials store. */
export interface CredentialItem {
  id: string;
  profile_id: string;
  qualification_name: string;
  qualification_type: string;
  category: string | null;
  awarding_body: string | null;
  grade: string | null;
  date_achieved: string | null;
  expiry_date: string | null;
  certificate_number: string | null;
  document_url: string | null;
  training_type: string | null;
  training_status: TrainingStatus | null;
  start_date: string | null;
  funded_by: string | null;
  /** Derived: true only when verification_level = verified_at_source. */
  is_verified: boolean;
  verification_level: VerificationLevel;
  verified_at: string | null;
  verification_method: string | null;
  verified_by: string | null;
  verifier_employer_id: string | null;
  /** Person who checked it (when known). */
  verifier_name: string | null;
  /** Firm that checked it, or 'Elec-Mate' for an Elec-Mate admin. */
  verifier_firm: string | null;
  added_by_employer_id: string | null;
  source_table: string | null;
  created_at: string;
  updated_at: string | null;
}

/** A person's Elec-ID as the firm (or the person) sees it. */
export interface CredentialProfile {
  id: string;
  /** Firm view: the ROSTER row id. Worker view: undefined. */
  employee_id?: string;
  /** The employer_employees row the profile actually hangs off. */
  owner_employee_id: string;
  linked_account?: boolean;
  elec_id_number: string;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  /** Approved by an Elec-Mate admin — a profile review, not a card/qualification check. */
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  verification_method: string | null;
  verification_status: string | null;
  ecs_verification_level: VerificationLevel;
  ecs_verified_at: string | null;
  ecs_verification_method: string | null;
  ecs_verifier_name: string | null;
  ecs_verifier_firm: string | null;
  qualifications: CredentialItem[];
  employee?: {
    id: string;
    name: string;
    role: string;
    photo_url: string | null;
    email: string | null;
    phone: string | null;
  };
}

/* ── Wording ─────────────────────────────────────────────────────────────── */

export const verificationLabel = (level: VerificationLevel | null | undefined): string => {
  switch (level) {
    case 'verified_at_source':
      return 'Verified at source';
    case 'document_seen':
      return 'Document seen';
    default:
      return 'Self-declared';
  }
};

export const verificationShortLabel = (level: VerificationLevel | null | undefined): string => {
  switch (level) {
    case 'verified_at_source':
      return 'Source';
    case 'document_seen':
      return 'Doc seen';
    default:
      return 'Self';
  }
};

export const verificationExplainer: Record<VerificationLevel, string> = {
  self_declared: 'Typed in by the person or the office. Nobody has checked it.',
  document_seen: 'Someone has looked at the certificate or card.',
  verified_at_source:
    'Checked with the awarding body or card scheme (for example the JIB/ECS card checker).',
};

export const verificationTone = (level: VerificationLevel | null | undefined): Tone =>
  level === 'verified_at_source' ? 'emerald' : level === 'document_seen' ? 'blue' : 'amber';

/** "Document seen by Acme Electrical, 3 Oct 2026 — Certificate seen" */
export function verificationSentence(item: {
  verification_level: VerificationLevel | null;
  verifier_firm?: string | null;
  verifier_name?: string | null;
  verified_at?: string | null;
  verification_method?: string | null;
}): string {
  const level = item.verification_level ?? 'self_declared';
  if (level === 'self_declared') return 'Self-declared — not checked by anyone yet';
  const who = item.verifier_firm || item.verifier_name;
  const when = item.verified_at
    ? new Date(item.verified_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;
  return [
    `${verificationLabel(level)}${who ? ` by ${who}` : ''}${when ? `, ${when}` : ''}`,
    item.verification_method,
  ]
    .filter(Boolean)
    .join(' — ');
}

/** What the profile-level "approved" flag honestly means. */
export const ELEC_MATE_APPROVAL_LABEL = 'Approved by Elec-Mate';
export const ELEC_MATE_APPROVAL_EXPLAINER =
  'An Elec-Mate admin reviewed this Elec-ID profile. That is not a check of the ECS card or any qualification — each item shows its own verification.';

/** True when the item is something the person holds now (not planned training). */
export const isHeld = (item: Pick<CredentialItem, 'training_status'>): boolean =>
  !item.training_status || item.training_status === 'Completed' || item.training_status === 'Expired';

/* ── Reads ───────────────────────────────────────────────────────────────── */

const asItems = (raw: unknown): CredentialItem[] =>
  (Array.isArray(raw) ? raw : []).map((q) => ({
    ...(q as CredentialItem),
    verification_level: ((q as CredentialItem).verification_level ??
      'self_declared') as VerificationLevel,
  }));

const asProfile = (raw: Record<string, unknown>): CredentialProfile => ({
  ...(raw as unknown as CredentialProfile),
  ecs_verification_level: ((raw.ecs_verification_level as string) ??
    'self_declared') as VerificationLevel,
  qualifications: asItems(raw.qualifications),
});

/** Firm: every current team member with an Elec-ID, each with their whole store. */
export async function fetchTeamCredentials(): Promise<CredentialProfile[]> {
  const { data, error } = await supabase.rpc('get_team_credentials' as never);
  if (error) throw error;
  return ((data as unknown as Record<string, unknown>[] | null) ?? []).map(asProfile);
}

/** Worker: their own Elec-ID and store, or null if they have no Elec-ID yet. */
export async function fetchMyCredentials(): Promise<CredentialProfile | null> {
  const { data, error } = await supabase.rpc('get_my_credentials' as never);
  if (error) throw error;
  if (!data) return null;
  return asProfile(data as unknown as Record<string, unknown>);
}

/** Flat rows keyed by roster employee id — the shape expiry stats need. */
export interface TeamCredentialRow extends CredentialItem {
  employee_id: string;
  employee_name: string;
}

export function flattenTeamCredentials(team: CredentialProfile[]): TeamCredentialRow[] {
  return team.flatMap((p) =>
    p.qualifications.map((q) => ({
      ...q,
      employee_id: p.employee_id ?? p.owner_employee_id,
      employee_name: p.employee?.name ?? 'Unknown',
    }))
  );
}

/* ── Writes ──────────────────────────────────────────────────────────────── */

export interface CredentialInput {
  qualification_name: string;
  category?: string;
  qualification_type?: string;
  awarding_body?: string | null;
  grade?: string | null;
  certificate_number?: string | null;
  date_achieved?: string | null;
  expiry_date?: string | null;
  document_url?: string | null;
  training_type?: string | null;
  training_status?: TrainingStatus | null;
  start_date?: string | null;
  funded_by?: string | null;
  verification_level?: VerificationLevel;
  verification_method?: string | null;
}

/** Turn a Postgres error from the team RPCs into a sentence for a toast. */
export function credentialErrorMessage(error: unknown): string {
  const msg = (error as { message?: string })?.message ?? 'Something went wrong';
  if (msg.startsWith('NO_ELEC_ID:')) return msg.replace('NO_ELEC_ID:', '').trim();
  return msg;
}

/** Firm: record an item on a team member's Elec-ID (roster row id). */
export async function addTeamCredential(rosterId: string, input: CredentialInput): Promise<string> {
  const { data, error } = await supabase.rpc('add_team_credential' as never, {
    p_roster_id: rosterId,
    p_item: input,
  } as never);
  if (error) throw new Error(credentialErrorMessage(error));
  return data as unknown as string;
}

/** Firm: change an item the firm recorded. */
export async function updateTeamCredential(id: string, input: Partial<CredentialInput>) {
  const { error } = await supabase.rpc('update_team_credential' as never, {
    p_id: id,
    p_item: input,
  } as never);
  if (error) throw new Error(credentialErrorMessage(error));
}

/** Firm: remove an item the firm recorded. */
export async function deleteTeamCredential(id: string) {
  const { error } = await supabase.rpc('delete_team_credential' as never, { p_id: id } as never);
  if (error) throw new Error(credentialErrorMessage(error));
}

/** Firm (for a team member) or Elec-Mate admin: set how an item was checked. */
export async function setCredentialVerification(
  id: string,
  level: VerificationLevel,
  method: string | null
) {
  const { error } = await supabase.rpc('set_credential_verification' as never, {
    p_id: id,
    p_level: level,
    p_method: method,
  } as never);
  if (error) throw new Error(credentialErrorMessage(error));
}

/** Firm (for a team member) or Elec-Mate admin: set how the ECS card was checked. */
export async function setEcsCardVerification(
  profileId: string,
  level: VerificationLevel,
  method: string | null
) {
  const { error } = await supabase.rpc('set_ecs_card_verification' as never, {
    p_profile_id: profileId,
    p_level: level,
    p_method: method,
  } as never);
  if (error) throw new Error(credentialErrorMessage(error));
}

/* ── Worker: own store (direct table writes; the DB keeps them self-declared) ─ */

export async function addMyCredential(profileId: string, input: CredentialInput) {
  const category = input.category ?? 'training';
  const { error } = await supabase.from('employer_elec_id_qualifications').insert({
    profile_id: profileId,
    qualification_name: input.qualification_name.trim(),
    qualification_type: input.qualification_type ?? category,
    category,
    awarding_body: input.awarding_body || null,
    certificate_number: input.certificate_number || null,
    date_achieved: input.date_achieved || null,
    expiry_date: input.expiry_date || null,
  } as never);
  if (error) throw error;
}

export async function updateMyCredential(id: string, input: Partial<CredentialInput>) {
  const patch: Record<string, unknown> = {};
  for (const key of [
    'qualification_name',
    'awarding_body',
    'certificate_number',
    'date_achieved',
    'expiry_date',
  ] as const) {
    if (key in input) patch[key] = (input[key] as string | null | undefined) || null;
  }
  if (typeof patch.qualification_name !== 'string') delete patch.qualification_name;
  const { error } = await supabase
    .from('employer_elec_id_qualifications')
    .update(patch as never)
    .eq('id', id);
  if (error) throw error;
}

export async function deleteMyCredential(id: string) {
  const { error } = await supabase.from('employer_elec_id_qualifications').delete().eq('id', id);
  if (error) throw error;
}

/* ── Expiry stats (dashboards, job signals) ─────────────────────────────── */

export interface HeldCredentialRow {
  id: string;
  /** Roster row id. */
  employee_id: string;
  name: string;
  expiry_date: string | null;
  /** 'Valid' | 'Expired' — by expiry date. */
  status: 'Valid' | 'Expired';
  verification_level: VerificationLevel;
}

/**
 * Held credentials across the firm's team in a `{ data, error }` envelope, so
 * dashboard hooks that used to query employer_certifications (LEGACY, 0 rows)
 * read the single store with the same call shape.
 */
export async function fetchTeamHeldCredentialRows(): Promise<{
  data: HeldCredentialRow[] | null;
  error: Error | null;
}> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const rows = flattenTeamCredentials(await fetchTeamCredentials())
      .filter((q) => isHeld(q))
      .map((q) => ({
        id: q.id,
        employee_id: q.employee_id,
        name: getQualificationLabel(q.qualification_name),
        expiry_date: q.expiry_date,
        status: (q.expiry_date && q.expiry_date < today ? 'Expired' : 'Valid') as
          | 'Valid'
          | 'Expired',
        verification_level: q.verification_level,
      }));
    return { data: rows, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e : new Error(String(e)) };
  }
}
