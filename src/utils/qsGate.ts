import { supabase } from '@/integrations/supabase/client';

export interface QsGateResult {
  blocked: boolean;
  companyName?: string;
}

/**
 * Client-side check for the per-company "QS approval required before issue"
 * gate. Delegates to the is_qs_issue_blocked RPC — the same logic the DB
 * trigger enforces (gate on + latest review not approved, or content edited
 * since approval) — so the friendly message and the backstop always agree.
 */
export async function checkQsIssueGate(reportId: string | undefined): Promise<QsGateResult> {
  if (!reportId) return { blocked: false };

  try {
    const { data: report } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportId)
      .maybeSingle();
    if (!report) return { blocked: false };

    const { data: blocked, error } = await supabase.rpc('is_qs_issue_blocked', {
      p_report_uuid: report.id,
    });
    if (error || !blocked) return { blocked: false };

    // Blocked — fetch the company name for the message
    const { data: ctx } = await supabase.rpc('get_my_qs_team_context');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyName = (ctx as any)?.company_name || undefined;
    return { blocked: true, companyName };
  } catch (err) {
    // Fail open client-side — the DB trigger still enforces the gate
    console.error('[QS gate] check failed:', err);
    return { blocked: false };
  }
}

export function qsGateMessage(companyName?: string): string {
  return `${companyName || 'Your company'} requires Qualifying Supervisor approval before this certificate can be issued. Submit it for QS review first.`;
}

/** True when a Supabase/Postgres error is the QS gate trigger firing. */
export function isQsGateError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  return message.includes('QS_APPROVAL_REQUIRED');
}
