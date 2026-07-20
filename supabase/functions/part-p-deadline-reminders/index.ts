/**
 * Part P deadline reminders (daily cron).
 *
 * A "notifications" tracker is only useful if it actually chases you. This scans
 * open notifiable-work records and, as the statutory 30-day Building Regs window
 * closes, nudges the ELECTRICIAN (push + in-app bell + email) at three stages:
 *   - due_7d   : 7 days out  — plan the submission
 *   - due_1d   : ≤1 day out  — last chance
 *   - overdue  : past deadline — legal miss, submit now
 *
 * Each stage fires ONCE per record (tracked in part_p_notifications.reminders_sent)
 * so the cron can run daily without re-sending the same nudge.
 *
 * Trigger: pg_cron daily (see migration). Auth: service-role bearer from cron.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { sendSmartPush } from '../_shared/notification-engine.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

type Stage = 'due_7d' | 'due_1d' | 'overdue';

const PART_P_LINK = '/electrician/inspection-testing?section=notifications';

function copyFor(stage: Stage, days: number, certNo: string, address: string) {
  const where = address ? ` at ${address}` : '';
  switch (stage) {
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
        body: `${certNo}${where} must be notified within ${days} days to meet the 30-day Building Regs deadline.`,
        subject: `Due in ${days} days: Part P notification for ${certNo}`,
      };
  }
}

function emailHtml(stage: Stage, days: number, client: string, address: string, certNo: string) {
  const headline =
    stage === 'overdue'
      ? 'This notification is now overdue'
      : stage === 'due_1d'
        ? 'This notification is due tomorrow'
        : `This notification is due in ${days} days`;
  const accent = stage === 'overdue' ? '#ef4444' : stage === 'due_1d' ? '#f59e0b' : '#22c55e';
  return `<!doctype html><html><body style="margin:0;background:#0a0a0a;font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#e5e5e5;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden">
    <div style="height:4px;background:${accent}"></div>
    <div style="padding:24px">
      <p style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin:0 0 8px">Part P — Building Regulations</p>
      <h1 style="font-size:20px;margin:0 0 16px;color:#fff">${headline}</h1>
      <p style="font-size:14px;line-height:1.6;margin:0 0 16px">Electrical work you certified is notifiable under Part P and must be submitted within 30 days of completion.</p>
      <table style="width:100%;font-size:13px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#9ca3af">Certificate</td><td style="padding:6px 0;text-align:right;color:#fff;font-weight:600">${certNo}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af">Client</td><td style="padding:6px 0;text-align:right;color:#fff">${client}</td></tr>
        ${address ? `<tr><td style="padding:6px 0;color:#9ca3af">Address</td><td style="padding:6px 0;text-align:right;color:#fff">${address}</td></tr>` : ''}
      </table>
      <p style="font-size:13px;line-height:1.6;color:#9ca3af;margin:16px 0 0">Submit through your competent-person scheme portal (NAPIT / NICEIC) or your local Building Control, then mark it complete in Elec-Mate. Open the app → Inspection &amp; Testing → Part P Notifications.</p>
    </div>
  </div></body></html>`;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const supabase = createClient(supabaseUrl, serviceKey);
  const authHeader = `Bearer ${serviceKey}`;
  const resend = resendKey ? new Resend(resendKey) : null;

  const results: Array<Record<string, unknown>> = [];

  try {
    // Open notifiable records with a deadline. (Status filtered in JS to avoid
    // PostgREST NOT-IN quoting pitfalls; volume is small.)
    const { data: notifs, error } = await supabase
      .from('part_p_notifications')
      .select(
        'id, user_id, report_id, submission_deadline, reminders_sent, notification_status, napit_submitted, niceic_submitted, local_authority_submitted'
      )
      .not('submission_deadline', 'is', null);

    if (error) throw error;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    for (const n of notifs || []) {
      // Skip anything already resolved.
      if (n.notification_status === 'submitted' || n.notification_status === 'cancelled') continue;
      // Already submitted through a channel (status may not have been flipped) — done, don't chase.
      if (n.napit_submitted || n.niceic_submitted || n.local_authority_submitted) continue;

      const deadline = new Date(n.submission_deadline as string);
      const days = Math.floor((deadline.getTime() - today.getTime()) / 86_400_000);

      let stage: Stage | null = null;
      if (days < 0) stage = 'overdue';
      else if (days <= 1) stage = 'due_1d';
      else if (days <= 7) stage = 'due_7d';
      if (!stage) continue;

      const already: string[] = (n.reminders_sent as string[]) || [];
      if (already.includes(stage)) continue;

      // Cert context for the copy.
      const { data: report } = await supabase
        .from('reports')
        .select('client_name, installation_address, certificate_number')
        .eq('report_id', n.report_id)
        .maybeSingle();

      const client = report?.client_name || 'your client';
      const address = report?.installation_address || '';
      const certNo = report?.certificate_number || (n.report_id as string);
      const { title, body, subject } = copyFor(stage, days, certNo, address);

      // 1) Push (transactional — bypass caps; overdue skips quiet hours).
      const push = await sendSmartPush(supabase, supabaseUrl, authHeader, {
        userId: n.user_id as string,
        tier: 'transactional',
        category: 'part_p_deadline',
        refId: `${n.id}:${stage}`,
        bypassCap: true,
        template: {
          title,
          body,
          type: 'part_p_deadline',
          data: { deep_link: PART_P_LINK, part_p_id: n.id, stage },
          skipQuietHours: stage === 'overdue',
        },
      });

      // 2) In-app bell.
      await supabase.from('user_notifications').insert({
        user_id: n.user_id,
        type: 'part_p_deadline',
        title,
        message: body,
        link: PART_P_LINK,
        metadata: { part_p_id: n.id, stage, report_id: n.report_id },
      });

      // 3) Email (best-effort — company email, else the account email).
      if (resend) {
        let email: string | null = null;
        const { data: cp } = await supabase
          .from('company_profiles')
          .select('company_email')
          .eq('user_id', n.user_id)
          .maybeSingle();
        email = cp?.company_email || null;
        if (!email) {
          const { data: authUser } = await supabase.auth.admin.getUserById(n.user_id as string);
          email = authUser?.user?.email || null;
        }
        if (email) {
          const html = emailHtml(stage, days, client, address, certNo);
          try {
            await resend.emails.send({
              from: 'Elec-Mate <noreply@elec-mate.com>',
              to: email,
              subject,
              html,
              text: htmlToPlainText(html),
            });
          } catch (e) {
            console.error('[part-p-reminders] email failed', n.id, (e as Error).message);
          }
        }
      }

      // 4) Mark this stage fired so it never re-sends.
      await supabase
        .from('part_p_notifications')
        .update({ reminders_sent: [...already, stage] })
        .eq('id', n.id);

      results.push({ id: n.id, stage, days, pushed: push.sent, pushSkip: push.skipReason });
    }

    return new Response(JSON.stringify({ processed: results.length, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[part-p-reminders] fatal', (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
