/* ==========================================================================
   collegeRoster — client for the college-roster-import edge function
   (ELE-1900). Bulk learners or staff: dry-run plan, real run, email preview.

   The function decides everything that matters (who already has an account,
   who is on another college's roll, which join code each person gets); the
   sheets only parse the paste and show what came back.
   ========================================================================== */

import { supabase } from '@/integrations/supabase/client';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

export type RosterKind = 'learners' | 'staff';
export type RosterOutcome = 'created' | 'matched' | 'already' | 'skipped' | 'failed';

export interface RosterRowIn {
  index: number;
  name: string;
  email: string;
  phone?: string;
  uln?: string;
  cohort_id?: string | null;
  expected_end_date?: string | null;
  role?: string;
}

export interface RosterItem {
  index: number;
  name: string;
  email: string;
  outcome: RosterOutcome;
  detail?: string;
  notes?: string[];
  emailed?: boolean;
  email_error?: string;
  join_code?: string | null;
  /** Only when nobody was emailed: the new login's temporary password, returned once. */
  temp_password?: string;
}

export interface RosterSummary {
  total: number;
  created: number;
  matched: number;
  already: number;
  skipped: number;
  failed: number;
  emailed: number;
}

export interface RosterResult {
  dry_run: boolean;
  sent_email?: boolean;
  college: { id: string; name: string };
  summary: RosterSummary;
  items: RosterItem[];
}

export interface RosterRequest {
  kind: RosterKind;
  rows: RosterRowIn[];
  course_id?: string | null;
  /** Platform admins only (Admin → Colleges); ignored for college staff. */
  college_id?: string | null;
  dry_run?: boolean;
  send_email?: boolean;
  resend?: boolean;
}

async function invoke<T>(body: Record<string, unknown>): Promise<T> {
  // White-glove: while a platform admin acts for a college, the run is for
  // THAT college, never the admin's own. The function re-checks the admin.
  const acting = getActingCollegeId();
  const { data, error } = await supabase.functions.invoke('college-roster-import', {
    body: acting && !body.college_id ? { ...body, college_id: acting } : body,
    headers: acting ? { 'x-acting-college': acting } : undefined,
  });
  if (error) {
    // Non-2xx: the function's own message is in the response body.
    let message = error.message;
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      const b = (await ctx.json().catch(() => null)) as { message?: string; error?: string } | null;
      message = b?.message ?? b?.error ?? message;
    }
    throw new Error(message);
  }
  return data as T;
}

export function runRoster(req: RosterRequest): Promise<RosterResult> {
  return invoke<RosterResult>({ ...req });
}

export async function previewRosterEmail(
  req: Omit<RosterRequest, 'dry_run'>
): Promise<{ to: string; subject: string; html: string }> {
  const res = await invoke<{ preview: { to: string; subject: string; html: string } }>({ ...req, preview: true });
  return res.preview;
}

/** Open the rendered email in a new tab, exactly as it would be sent. */
export function openEmailPreview(html: string) {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  window.open(url, '_blank', 'noopener');
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export const OUTCOME_LABEL: Record<RosterOutcome, string> = {
  created: 'New login',
  matched: 'Has an account',
  already: 'Already on',
  skipped: "Won't go in",
  failed: 'Failed',
};

export const OUTCOME_TONE: Record<RosterOutcome, string> = {
  created: 'text-emerald-300',
  matched: 'text-emerald-300',
  already: 'text-white',
  skipped: 'text-orange-300',
  failed: 'text-red-300',
};

export function csvEscape(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
