/**
 * morning-brief — the daily "here's what needs you" email + push + bell.
 *
 * Replaces proactive-morning-brief (WhatsApp) and the 07:00 generic push
 * digest. The old brief read the `invoices` table for overdue money — but app
 * invoices live in `quotes` (791 of 893 have no invoices row), so its
 * headline was wrong for nearly every user — and it predated renewals, held
 * certificates, contracts and T&M tracking entirely.
 *
 * Consent: user_automations key 'morning_brief' — mode 'off' skips the user;
 * NO ROW MEANS ON (product mail to our own user; customer-facing mail stays
 * strictly opt-in). One-click unsubscribe flips the row via the unsubscribe
 * fn's morning_brief scope. email_suppressions honoured on top.
 *
 * Push + bell go through notify_user() so the notification registry routes
 * them (type 'morning_brief', registered push=true). The bell row doubles as
 * the once-per-day dedupe ledger.
 *
 * Sends only when there is something to say — noise gets the channel muted.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const RENEWAL_WINDOW_DAYS = 45;

const ukDate = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
const ukTime = (d: Date) =>
  d.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });

interface UserBrief {
  outstandingTotal: number;
  outstandingCount: number;
  overdueTotal: number;
  overdueCount: number;
  dueThisWeekTotal: number;
  paidLast7Total: number;
  paidLast7Count: number;
  awaitingQuotesCount: number;
  awaitingQuotesTotal: number;
  oldestAwaitingDays: number;
  viewedAwaitingCount: number;
  hotQuotes: Array<{ clientName: string; total: number }>;
  acceptedToBook: Array<{ clientName: string; total: number; quoteId: string }>;
  todayEvents: Array<{ title: string; time: string; location?: string | null }>;
  renewalsDueCount: number;
  renewalEmailsOn: boolean;
  heldCerts: Array<{ label: string; invoiceNumber: string }>;
  unbilledHours: number;
  visitsThisWeek: number;
}

const emptyBrief = (): UserBrief => ({
  outstandingTotal: 0,
  outstandingCount: 0,
  overdueTotal: 0,
  overdueCount: 0,
  dueThisWeekTotal: 0,
  paidLast7Total: 0,
  paidLast7Count: 0,
  awaitingQuotesCount: 0,
  awaitingQuotesTotal: 0,
  oldestAwaitingDays: 0,
  viewedAwaitingCount: 0,
  hotQuotes: [],
  acceptedToBook: [],
  todayEvents: [],
  renewalsDueCount: 0,
  renewalEmailsOn: false,
  heldCerts: [],
  unbilledHours: 0,
  visitsThisWeek: 0,
});

const hasContent = (b: UserBrief) =>
  b.outstandingTotal > 0 ||
  b.awaitingQuotesCount > 0 ||
  b.acceptedToBook.length > 0 ||
  b.todayEvents.length > 0 ||
  b.renewalsDueCount > 0 ||
  b.heldCerts.length > 0 ||
  b.unbilledHours >= 1 ||
  b.visitsThisWeek > 0;

const clientNameOf = (clientData: unknown): string => {
  const cd = (clientData || {}) as Record<string, unknown>;
  const name =
    (typeof cd.name === 'string' && cd.name) ||
    (typeof cd.full_name === 'string' && cd.full_name) ||
    '';
  return name.trim() || 'A customer';
};


const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Math.round(n));

/**
 * The push IS the brief now. One title, one line — drawn from the whole app,
 * not just the money: diary first (it's 8am), then won-work-to-book, hot
 * quotes, overdue, renewals, visits, unbilled time. Top four facts win.
 */
function buildPush(firstName: string, b: UserBrief): { title: string; body: string } {
  const title = `Morning, ${firstName} ☀️`;
  const bits: string[] = [];

  if (b.todayEvents.length > 0) {
    const first = b.todayEvents[0];
    bits.push(
      b.todayEvents.length === 1
        ? `${first.time} ${first.title}`.slice(0, 60)
        : `${b.todayEvents.length} jobs today, first at ${first.time}`
    );
  }
  if (b.acceptedToBook.length > 0) {
    bits.push(`${b.acceptedToBook[0].clientName} accepted — book them in`);
  }
  if (b.hotQuotes.length > 0) {
    bits.push(`${b.hotQuotes[0].clientName} is reading your ${gbp(b.hotQuotes[0].total)} quote`);
  }
  if (b.overdueTotal > 0) {
    bits.push(
      b.overdueTotal >= b.outstandingTotal
        ? `${gbp(b.overdueTotal)} overdue`
        : `${gbp(b.overdueTotal)} of ${gbp(b.outstandingTotal)} overdue`
    );
  } else if (b.outstandingTotal > 0) {
    bits.push(`${gbp(b.outstandingTotal)} owed to you`);
  }
  if (b.awaitingQuotesCount > 0 && b.hotQuotes.length === 0) {
    bits.push(`${b.awaitingQuotesCount} quote${b.awaitingQuotesCount === 1 ? '' : 's'} awaiting a decision`);
  }
  if (b.renewalsDueCount > 0) {
    bits.push(`${b.renewalsDueCount} renewal${b.renewalsDueCount === 1 ? '' : 's'} coming up`);
  }
  if (b.visitsThisWeek > 0) {
    bits.push(`${b.visitsThisWeek} contract visit${b.visitsThisWeek === 1 ? '' : 's'} this week`);
  }
  if (b.unbilledHours >= 1) {
    bits.push(`${b.unbilledHours}h tracked, not yet invoiced`);
  }
  if (b.heldCerts.length > 0) {
    bits.push(`${b.heldCerts.length} cert${b.heldCerts.length === 1 ? '' : 's'} release on payment`);
  }

  return { title, body: bits.slice(0, 4).join(' · ') || 'Your day is clear — win some work.' };
}

async function runBrief(req: Request): Promise<Response> {
  const admin = createClient(
    Deno.env.get('SUPABASE_URL') as string,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
  );

  const body = await req.json().catch(() => ({}) as Record<string, unknown>);
  const testUserId = typeof body.test_user_id === 'string' ? body.test_user_id : null;

  const now = new Date();
  const todayUk = ukDate(now);
  const nowIso = now.toISOString();
  const in7Iso = new Date(now.getTime() + 7 * 86_400_000).toISOString();
  const in7Date = in7Iso.slice(0, 10);
  const in45 = new Date(now.getTime() + RENEWAL_WINDOW_DAYS * 86_400_000).toISOString().slice(0, 10);
  const since7d = new Date(now.getTime() - 7 * 86_400_000).toISOString();
  const since14d = new Date(now.getTime() - 14 * 86_400_000).toISOString();
  const since30d = new Date(now.getTime() - 30 * 86_400_000).toISOString();
  const since60d = new Date(now.getTime() - 60 * 86_400_000).toISOString();

  const briefs = new Map<string, UserBrief>();
  const get = (userId: string) => {
    let b = briefs.get(userId);
    if (!b) {
      b = emptyBrief();
      briefs.set(userId, b);
    }
    return b;
  };

  const [
    unpaidRes,
    paidRes,
    awaitingRes,
    acceptedRes,
    eventsRes,
    renewalsRes,
    heldRes,
    timeRes,
    visitsRes,
    autoRes,
  ] = await Promise.all([
    // Money owed — app invoices live in quotes, NOT the invoices table.
    admin
      .from('quotes')
      .select('user_id, total, total_paid, invoice_due_date')
      .eq('invoice_raised', true)
      .is('deleted_at', null)
      .not('invoice_status', 'in', '("paid","draft")'),
    admin
      .from('quotes')
      .select('user_id, total')
      .eq('invoice_raised', true)
      .is('deleted_at', null)
      .gte('invoice_paid_at', since7d),
    admin
      .from('quotes')
      .select('user_id, total, created_at, first_viewed_at, client_data')
      .eq('status', 'sent')
      .or('invoice_raised.is.null,invoice_raised.eq.false')
      .neq('acceptance_status', 'accepted')
      .is('deleted_at', null)
      .gte('created_at', since60d),
    admin
      .from('quotes')
      .select('id, user_id, total, client_data')
      .eq('acceptance_status', 'accepted')
      .or('invoice_raised.is.null,invoice_raised.eq.false')
      .is('deleted_at', null)
      .gte('accepted_at', since30d),
    admin
      .from('calendar_events')
      .select('user_id, title, start_at, location, quote_id')
      .gte('start_at', new Date(now.getTime() - 6 * 3_600_000).toISOString())
      .lte('start_at', new Date(now.getTime() + 30 * 3_600_000).toISOString()),
    admin
      .from('certificate_expiry_reminders')
      .select('user_id')
      .eq('reminder_status', 'pending')
      .gte('expiry_date', todayUk)
      .lte('expiry_date', in45),
    admin
      .from('quotes')
      .select('user_id, invoice_number, linked_certificate_type, linked_certificate_reference')
      .eq('invoice_raised', true)
      .eq('certificate_release_mode', 'on_payment')
      .is('certificate_released_at', null)
      .not('linked_certificate_id', 'is', null)
      .is('deleted_at', null)
      .neq('invoice_status', 'paid'),
    admin
      .from('time_sessions')
      .select('user_id, duration_seconds')
      .is('invoice_id', null)
      .not('ended_at', 'is', null)
      .gte('started_at', since14d),
    admin
      .from('maintenance_contract_visits')
      .select('user_id')
      .is('completed_at', null)
      .gte('due_date', todayUk)
      .lte('due_date', in7Date),
    admin.from('user_automations').select('user_id, key, mode'),
  ]);

  for (const r of unpaidRes.data || []) {
    const owed = Math.max(0, (Number(r.total) || 0) - (Number(r.total_paid) || 0));
    if (owed <= 0) continue;
    const b = get(r.user_id);
    b.outstandingTotal += owed;
    b.outstandingCount += 1;
    if (r.invoice_due_date) {
      // Compare calendar days in UK time — an invoice due TODAY is not
      // overdue at 07:00 this morning.
      const dueUk = ukDate(new Date(r.invoice_due_date));
      if (dueUk < todayUk) {
        b.overdueTotal += owed;
        b.overdueCount += 1;
      } else if (r.invoice_due_date <= in7Iso) {
        b.dueThisWeekTotal += owed;
      }
    }
  }
  for (const r of paidRes.data || []) {
    const b = get(r.user_id);
    b.paidLast7Total += Number(r.total) || 0;
    b.paidLast7Count += 1;
  }
  const HOT_WINDOW = new Date(now.getTime() - 3 * 86_400_000).toISOString();
  for (const r of awaitingRes.data || []) {
    const b = get(r.user_id);
    b.awaitingQuotesCount += 1;
    b.awaitingQuotesTotal += Number(r.total) || 0;
    const ageDays = Math.floor((now.getTime() - new Date(r.created_at).getTime()) / 86_400_000);
    if (ageDays > b.oldestAwaitingDays) b.oldestAwaitingDays = ageDays;
    if (r.first_viewed_at) {
      b.viewedAwaitingCount += 1;
      if (r.first_viewed_at >= HOT_WINDOW && b.hotQuotes.length < 3) {
        b.hotQuotes.push({ clientName: clientNameOf(r.client_data), total: Number(r.total) || 0 });
      }
    }
  }
  // Accepted quotes with no diary entry = won work not yet booked in.
  const bookedQuoteIds = new Set(
    (eventsRes.data || []).map((e) => e.quote_id).filter((id): id is string => !!id)
  );
  for (const r of acceptedRes.data || []) {
    if (bookedQuoteIds.has(r.id)) continue;
    const b = get(r.user_id);
    if (b.acceptedToBook.length < 3) {
      b.acceptedToBook.push({
        clientName: clientNameOf(r.client_data),
        total: Number(r.total) || 0,
        quoteId: r.id,
      });
    }
  }
  for (const r of eventsRes.data || []) {
    if (!r.start_at) continue;
    const start = new Date(r.start_at);
    if (ukDate(start) !== todayUk) continue;
    get(r.user_id).todayEvents.push({
      title: r.title || 'Job',
      time: ukTime(start),
      location: r.location || null,
    });
  }
  for (const b of briefs.values()) b.todayEvents.sort((a, z) => a.time.localeCompare(z.time));
  for (const r of renewalsRes.data || []) get(r.user_id).renewalsDueCount += 1;
  for (const r of heldRes.data || []) {
    get(r.user_id).heldCerts.push({
      label:
        `${r.linked_certificate_type || 'Certificate'} ${r.linked_certificate_reference || ''}`.trim(),
      invoiceNumber: r.invoice_number || '—',
    });
  }
  for (const r of timeRes.data || []) {
    get(r.user_id).unbilledHours += (Number(r.duration_seconds) || 0) / 3600;
  }
  for (const b of briefs.values()) b.unbilledHours = Math.round(b.unbilledHours * 10) / 10;
  for (const r of visitsRes.data || []) get(r.user_id).visitsThisWeek += 1;

  const optedOut = new Set<string>();
  const renewalsOn = new Set<string>();
  for (const r of autoRes.data || []) {
    if (r.key === 'morning_brief' && r.mode === 'off') optedOut.add(r.user_id);
    if (r.key === 'client_renewal_emails' && r.mode === 'auto') renewalsOn.add(r.user_id);
  }

  let userIds = [...briefs.keys()].filter((id) => hasContent(briefs.get(id)!) && !optedOut.has(id));
  if (testUserId) userIds = userIds.filter((id) => id === testUserId);

  // Daily dedupe — the notify_user bell row is the "already sent today" ledger.
  if (userIds.length && !testUserId) {
    const { data: sentToday } = await admin
      .from('user_notifications')
      .select('user_id')
      .eq('type', 'morning_brief')
      .gte('created_at', `${todayUk}T00:00:00Z`)
      .in('user_id', userIds.slice(0, 1000));
    const already = new Set((sentToday || []).map((r) => r.user_id));
    userIds = userIds.filter((id) => !already.has(id));
  }

  let sent = 0;
  const skipped = 0;
  const errors: string[] = [];

  for (const userId of userIds) {
    try {
      const brief = briefs.get(userId)!;
      brief.renewalEmailsOn = renewalsOn.has(userId);

      const { data: profile } = await admin
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .maybeSingle();
      const rawFirst = (profile?.full_name || '').trim().split(/\s+/)[0] || 'mate';
      const firstName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();

      const push = buildPush(firstName, brief);

      const { error: rpcError } = await admin.rpc('notify_user', {
        p_user_id: userId,
        p_type: 'morning_brief',
        p_title: push.title,
        p_message: push.body,
        p_data: { route: '/electrician/business', ref_id: todayUk },
      });
      if (rpcError) {
        errors.push(`${userId}: ${rpcError.message}`);
        continue;
      }

      sent++;
    } catch (userError) {
      errors.push(`${userId}: ${userError instanceof Error ? userError.message : 'unknown'}`);
    }
  }

  console.log(
    `Morning brief: ${sent} sent, ${skipped} skipped, ${errors.length} errors of ${userIds.length} candidates (${briefs.size} users with data)`
  );
  if (errors.length) console.error('Brief errors:', errors.slice(0, 5));

  return json({ success: true, sent, skipped, candidates: userIds.length, errors: errors.length });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    let scheduled = false;
    try {
      const peek = await req.clone().json();
      scheduled = peek?.scheduled === true;
    } catch {
      /* no body */
    }

    const work = runBrief(req);
    const runtime = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } })
      .EdgeRuntime;
    if (scheduled && runtime?.waitUntil) {
      runtime.waitUntil(
        work.then(async (r) => console.log('Scheduled brief finished:', r.status, await r.text()))
      );
      return json({ accepted: true, background: true });
    }
    return await work;
  } catch (error) {
    console.error('morning-brief error:', error);
    await captureException(error, {
      functionName: 'morning-brief',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'Internal error' }, 500);
  }
});
