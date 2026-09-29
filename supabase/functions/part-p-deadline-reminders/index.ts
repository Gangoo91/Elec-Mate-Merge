/**
 * Part P deadline reminders (daily cron).
 *
 * A "notifications" tracker is only useful if it actually chases you. This scans
 * open notifiable-work records and, as the statutory 30-day Building Regs window
 * closes, nudges the ELECTRICIAN (push + in-app bell + email) at these stages:
 *   - confirm     : the certificate never said whether the work was notifiable —
 *                   ask once, and never escalate to OVERDUE until it does
 *   - due_7d      : 7 days out  — plan the submission
 *   - due_1d      : ≤1 day out  — last chance
 *   - overdue     : past deadline — legal miss, submit now
 *   - ref_missing : marked submitted a week ago, still no reference (push + bell)
 *
 * Each stage fires ONCE per record (tracked in part_p_notifications.reminders_sent)
 * so the cron can run daily without re-sending the same nudge. The two soft
 * stages (confirm, ref_missing) are GROUPED per electrician — one message
 * listing the certificates, not six pushes in a row.
 *
 * Candidates come from `part_p_reminder_candidates()` — open rows whose
 * certificate still exists and does not already record the notification as
 * made — with the certificate's own verdict ('yes' | 'no' | 'unknown'); and
 * `part_p_reference_nudge_candidates()` for the reference chase.
 *
 * Body { "dry_run": true } decides every stage, sends nothing, marks nothing.
 * Trigger: pg_cron daily (see migration). Auth: service-role bearer from cron.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { sendSmartPush } from '../_shared/notification-engine.ts';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

type Stage = 'confirm' | 'due_7d' | 'due_1d' | 'overdue' | 'ref_missing';

const PART_P_LINK = '/electrician/inspection-testing?section=notifications';

interface Candidate {
  id: string;
  user_id: string;
  report_id: string;
  submission_deadline: string;
  reminders_sent: string[] | null;
  notification_status: string;
  verdict: 'yes' | 'no' | 'unknown';
  client_name: string | null;
  installation_address: string | null;
  certificate_number: string | null;
}

interface RefCandidate {
  id: string;
  user_id: string;
  report_id: string;
  reminders_sent: string[] | null;
  certificate_number: string | null;
  client_name: string | null;
}

interface Row {
  id: string;
  reportId: string;
  already: string[];
  certNo: string;
  client: string;
  address: string;
}

/** "EIC-2026-3905 and MW-2026-1212" / "EIC-2026-3905, MW-2026-1212 and 2 more" */
function listCerts(certs: string[]): string {
  if (certs.length <= 2) return certs.join(' and ');
  return `${certs.slice(0, 2).join(', ')} and ${certs.length - 2} more`;
}

function copyFor(stage: Stage, days: number, certs: string[], address: string) {
  const one = certs.length === 1;
  const certNo = certs[0];
  const where = one && address ? ` at ${address}` : '';
  switch (stage) {
    case 'confirm':
      return one
        ? {
            title: 'Was this work notifiable?',
            body: `${certNo}${where} didn't say whether Part P applies. Tap Yes or No in Elec-Mate — a Yes starts the 30-day clock, a No clears it.`,
            subject: `Was ${certNo} notifiable under Part P?`,
          }
        : {
            title: `${certs.length} certificates need a Part P answer`,
            body: `${listCerts(certs)} didn't say whether Part P applies. Tap Yes or No on each in Elec-Mate — a Yes starts the 30-day clock, a No clears it.`,
            subject: `${certs.length} certificates need a Part P answer`,
          };
    case 'ref_missing':
      return one
        ? {
            title: 'Got the notification number yet?',
            body: `${certNo} was marked submitted a week ago with no reference. Add the number your scheme gave you — it prints on the certificate and it's what a buyer's solicitor asks for.`,
            subject: `Add the Part P reference for ${certNo}`,
          }
        : {
            title: `${certs.length} notifications have no reference yet`,
            body: `${listCerts(certs)} were marked submitted a week ago with no reference. Add the numbers your scheme gave you — they print on the certificates.`,
            subject: `Add the Part P references for ${certs.length} certificates`,
          };
    case 'overdue':
      return {
        title: 'Part P notification OVERDUE',
        body: `${certNo}${where} is past its 30-day Building Regs deadline. Submit to your scheme or Building Control now.`,
        subject: `Overdue: notify Building Control for ${certNo}`,
      };
    case 'due_1d':
      return {
        title: 'Part P due tomorrow',
        body: `${certNo}${where} must be notified within 1 day — the 30-day Building Regs window is closing. Tap to submit.`,
        subject: `Due tomorrow: Part P notification for ${certNo}`,
      };
    default:
      return {
        title: 'Part P notification due soon',
        body: `${certNo}${where} must be notified within ${days} days to meet the 30-day Building Regs deadline. Not notifiable after all? Mark it not required and the reminders stop.`,
        subject: `Due in ${days} days: Part P notification for ${certNo}`,
      };
  }
}

function emailHtml(stage: Stage, days: number, rows: Row[]) {
  const one = rows.length === 1;
  const headline =
    stage === 'confirm'
      ? one
        ? 'Was this work notifiable?'
        : `${rows.length} certificates need a Part P answer`
      : stage === 'overdue'
        ? 'This notification is now overdue'
        : stage === 'due_1d'
          ? 'This notification is due tomorrow'
          : `This notification is due in ${days} days`;
  const accent =
    stage === 'confirm' ? '#facc15' : stage === 'overdue' ? '#ef4444' : stage === 'due_1d' ? '#f59e0b' : '#22c55e';
  const lead =
    stage === 'confirm'
      ? `${one ? 'The certificate below was' : 'The certificates below were'} issued without saying whether the work is notifiable under Part P. Open Elec-Mate and answer Yes or No — a Yes starts the 30-day Building Control clock, a No clears it from your list.`
      : 'Electrical work you certified is notifiable under Part P and must be submitted within 30 days of completion.';
  const footer =
    stage === 'confirm'
      ? 'A new circuit, a consumer unit change, or work inside the zones of a bathroom is notifiable. Most other domestic work is not.'
      : 'Submit through your competent-person scheme portal (NAPIT / NICEIC) or your local Building Control, then mark it submitted in Elec-Mate. If the work turned out not to be notifiable, mark it not required and the reminders stop.';
  const table = rows
    .map(
      (r, i) => `
        <tr><td style="padding:6px 0;color:#9ca3af">Certificate</td><td style="padding:6px 0;text-align:right;color:#fff;font-weight:600">${r.certNo}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af">Client</td><td style="padding:6px 0;text-align:right;color:#fff">${r.client}</td></tr>
        ${r.address ? `<tr><td style="padding:6px 0;color:#9ca3af">Address</td><td style="padding:6px 0;text-align:right;color:#fff">${r.address}</td></tr>` : ''}
        ${rows.length > 1 && i < rows.length - 1 ? '<tr><td colspan="2" style="padding:4px 0;border-bottom:1px solid #262626"></td></tr>' : ''}`
    )
    .join('');
  return `<!doctype html><html><body style="margin:0;background:#0a0a0a;font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#e5e5e5;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden">
    <div style="height:4px;background:${accent}"></div>
    <div style="padding:24px">
      <p style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin:0 0 8px">Part P — Building Regulations</p>
      <h1 style="font-size:20px;margin:0 0 16px;color:#fff">${headline}</h1>
      <p style="font-size:14px;line-height:1.6;margin:0 0 16px">${lead}</p>
      <table style="width:100%;font-size:13px;border-collapse:collapse">${table}</table>
      <p style="font-size:13px;line-height:1.6;color:#9ca3af;margin:16px 0 0">${footer}</p>
    </div>
  </div></body></html>`;
}

serve(withSentry('part-p-deadline-reminders', async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const supabase = createClient(supabaseUrl, serviceKey);
  const authHeader = `Bearer ${serviceKey}`;
  const resend = resendKey ? new Resend(resendKey) : null;

  const results: Array<Record<string, unknown>> = [];

  let dryRun = false;
  try {
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    dryRun = body?.dry_run === true;
  } catch {
    dryRun = false;
  }

  const emailFor = async (userId: string): Promise<string | null> => {
    const { data: cp } = await supabase
      .from('company_profiles')
      .select('company_email')
      .eq('user_id', userId)
      .maybeSingle();
    if (cp?.company_email) return cp.company_email as string;
    const { data: authUser } = await supabase.auth.admin.getUserById(userId);
    return authUser?.user?.email || null;
  };

  /**
   * One delivery = one push + one bell + (optionally) one email for one
   * electrician, covering one or more rows; every row then has the stage
   * recorded so it never fires again.
   */
  const deliver = async (opts: {
    userId: string;
    stage: Stage;
    days: number;
    rows: Row[];
    email: boolean;
    bypassCap: boolean;
    skipQuietHours: boolean;
  }) => {
    const { userId, stage, days, rows } = opts;
    const certs = rows.map((r) => r.certNo);
    const { title, body, subject } = copyFor(stage, days, certs, rows[0].address);

    if (dryRun) {
      results.push({ stage, days, userId, rows: rows.map((r) => r.id), certs, dryRun: true });
      return;
    }

    const push = await sendSmartPush(supabase, supabaseUrl, authHeader, {
      userId,
      tier: 'transactional',
      category: 'part_p_deadline',
      refId: `${rows.map((r) => r.id).join('+')}:${stage}`,
      bypassCap: opts.bypassCap,
      template: {
        title,
        body,
        type: 'part_p_deadline',
        data: { deep_link: PART_P_LINK, part_p_id: rows[0].id, stage, count: rows.length },
        skipQuietHours: opts.skipQuietHours,
      },
    });

    await supabase.from('user_notifications').insert({
      user_id: userId,
      type: 'part_p_deadline',
      title,
      message: body,
      link: PART_P_LINK,
      metadata: { part_p_id: rows[0].id, part_p_ids: rows.map((r) => r.id), stage, report_id: rows[0].reportId },
    });

    if (opts.email && resend) {
      const to = await emailFor(userId);
      if (to) {
        const html = emailHtml(stage, days, rows);
        try {
          await resend.emails.send({
            from: 'Elec-Mate <noreply@elec-mate.com>',
            to,
            subject,
            html,
            text: htmlToPlainText(html),
          });
        } catch (e) {
          console.error('[part-p-reminders] email failed', userId, stage, (e as Error).message);
        }
      }
    }

    for (const r of rows) {
      await supabase
        .from('part_p_notifications')
        .update({ reminders_sent: [...r.already, stage] })
        .eq('id', r.id);
    }
    results.push({ stage, days, userId, rows: rows.map((r) => r.id), pushed: push.sent, pushSkip: push.skipReason });
  };

  try {
    const { data: candidates, error } = await supabase.rpc('part_p_reminder_candidates');
    if (error) throw error;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Soft nudges are grouped per electrician; deadline stages go per row.
    const confirmByUser = new Map<string, Row[]>();

    for (const n of (candidates || []) as Candidate[]) {
      const deadline = new Date(n.submission_deadline);
      const days = Math.floor((deadline.getTime() - today.getTime()) / 86_400_000);
      const already: string[] = n.reminders_sent || [];
      const row: Row = {
        id: n.id,
        reportId: n.report_id,
        already,
        certNo: n.certificate_number || n.report_id,
        client: n.client_name || 'your client',
        address: n.installation_address || '',
      };

      if (n.verdict === 'no') continue; // the sync trigger closes it on the next save
      if (n.verdict === 'unknown') {
        // Ask once, at the point a reminder would otherwise have fired. Never
        // escalate: a row nobody confirmed is not "overdue".
        if (days <= 7 && !already.includes('confirm')) {
          const list = confirmByUser.get(n.user_id) || [];
          list.push(row);
          confirmByUser.set(n.user_id, list);
        }
        continue;
      }

      let stage: Stage | null = null;
      if (days < 0) stage = 'overdue';
      else if (days <= 1) stage = 'due_1d';
      else if (days <= 7) stage = 'due_7d';
      if (!stage || already.includes(stage)) continue;

      await deliver({
        userId: n.user_id,
        stage,
        days,
        rows: [row],
        email: true,
        bypassCap: true,
        skipQuietHours: stage === 'overdue',
      });
    }

    for (const [userId, rows] of confirmByUser) {
      await deliver({ userId, stage: 'confirm', days: 0, rows, email: true, bypassCap: true, skipQuietHours: false });
    }

    // ── Missing reference, a week after "submitted" ─────────────────────
    // 107 rows were marked submitted; 2 carried a reference. One nudge per
    // electrician, push and bell only — no email for this one.
    const { data: refRows, error: refErr } = await supabase.rpc('part_p_reference_nudge_candidates');
    if (refErr) console.error('[part-p-reminders] reference candidates failed', refErr.message);
    const refByUser = new Map<string, Row[]>();
    for (const n of (refRows || []) as RefCandidate[]) {
      const already: string[] = n.reminders_sent || [];
      if (already.includes('ref_missing')) continue;
      const list = refByUser.get(n.user_id) || [];
      list.push({
        id: n.id,
        reportId: n.report_id,
        already,
        certNo: n.certificate_number || n.report_id,
        client: n.client_name || 'your client',
        address: '',
      });
      refByUser.set(n.user_id, list);
    }
    for (const [userId, rows] of refByUser) {
      await deliver({ userId, stage: 'ref_missing', days: 0, rows, email: false, bypassCap: false, skipQuietHours: false });
    }

    return new Response(JSON.stringify({ processed: results.length, dryRun, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[part-p-reminders] fatal', (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}));
