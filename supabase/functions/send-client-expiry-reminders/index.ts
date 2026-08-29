/**
 * Certificate renewal emails to the CUSTOMER — the "5 years comes around and
 * they get emailed" half of the renewal funnel.
 *
 * Rebuilt 28-08. The original ran against `certificate_expiry_reminders`, a
 * ledger that NOTHING has ever written — zero rows since creation — so the
 * function was a no-op three layers deep: empty source table, a per-customer
 * opt-in flag set on exactly one customer, and no cron. Meanwhile the truth
 * has lived on `reports.next_inspection_due` all along (it is what the
 * engineer-facing `notify_cert_reinspections()` cron reads daily), and four
 * shipped UI surfaces — the dashboard card, ExpiringCertificatesCard, the
 * notifications manager and the whole CertificateExpiryPage — read the empty
 * ledger and have shown nothing forever.
 *
 * So this function now does two jobs, deliberately in this order:
 *
 *   1. SYNC  — mirror every future-dated `reports.next_inspection_due` into
 *              the ledger, for every user. This is what lights up the
 *              existing renewal-CRM UI. Descriptive fields only; it never
 *              touches `reminder_status` or the sent-stamps, which belong to
 *              the electrician's own workflow.
 *   2. SEND  — email customers of certs entering the 30/14/7-day windows,
 *              but ONLY for electricians who have turned the automation on
 *              (`user_automations` key `client_renewal_emails`, mode `auto`).
 *              Off for everyone until they flip it — the product's standing
 *              rule is that nothing customer-facing sends itself.
 *
 * The email carries the electrician's public booking link as its CTA, so a
 * reminder is a rebooking funnel rather than a nag.
 *
 * Sync-in-the-cron rather than a trigger on `reports`, on purpose: a trigger
 * bug would break certificate SAVING, and a daily lag is nothing against a
 * five-year cadence.
 *
 * v1 deliberately does NOT gate on `customers.client_notifications_enabled`:
 * it defaults false, one customer in the whole database has it set, and no UI
 * writes it — honouring it would silence the feature completely. The consent
 * boundary is the electrician's automation switch; the safety valves are the
 * suppression list and reply-to-the-electrician.
 *
 * Invoked by pg_cron daily (anon-key Bearer through net.http_post — the same
 * shape as every working fn-calling cron here; an unauthenticated http_post
 * 401s silently and has bitten this project three times).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import {
  buildCertExpiryReminderEmail,
  buildMaintenanceVisitEmail,
  type ExpiryTier,
} from '../_shared/email-templates/cert-expiry-reminder.ts';
import {
  buildUnsubscribeUrl,
  buildUnsubscribeHeaders,
} from '../_shared/unsubscribe-link.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const AUTOMATION_KEY = 'client_renewal_emails';

/*
 * Only certificates that RENEW belong in the book. A minor works cert or an
 * EIC is a one-off piece of work — "renew your minor works" is nonsense, and
 * an unfiltered sweep of next_inspection_due was 179 minor-works out of 191
 * rows (Andrew, 28-08: "minor works isn't a renewal — EICRs etc are").
 */
const RENEWAL_TYPES = [
  'eicr',
  'eic', // its "first periodic inspection" date IS an EICR lead (Andrew, 28-08)
  'fire-alarm-inspection',
  'fire-alarm',
  'pat-testing',
  'emergency-lighting',
  'smoke-co-alarm',
  'ev-charging',
  'bess',
] as const;

/*
 * Where each form actually keeps its next-due date. Only minor-works and the
 * fire-alarm family write the reports.next_inspection_due COLUMN — everything
 * else keeps the date in the report JSON under its own name. Read-only:
 * the reports table is never written by this sync.
 */
const JSON_DUE_SOURCES: Array<{ types: string[]; field: string }> = [
  {
    types: ['eicr', 'eic', 'smoke-co-alarm', 'ev-charging', 'bess'],
    field: 'nextInspectionDate',
  },
  // Emergency lighting has three cadences (monthly function test, annual
  // duration test, 3-yearly). The ANNUAL duration test is the billable visit.
  { types: ['emergency-lighting'], field: 'nextAnnualTestDue' },
];

/** Public booking page — the CTA every reminder funnels to. */
const BOOKING_ORIGIN = 'https://www.elec-mate.com';

const CERT_TYPE_SHORT: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire Alarm',
  'emergency-lighting': 'Emergency Lighting',
  'pat-testing': 'PAT Testing',
  'ev-charging': 'EV Charging',
  'solar-pv': 'Solar PV',
};

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

async function runReminders(req: Request): Promise<Response> {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // ── 1. SYNC — reports are the truth; the ledger is the working copy ────
    const { data: dueReports, error: reportsError } = await supabase
      .from('reports')
      .select(
        'id, user_id, report_id, report_type, client_name, installation_address, inspection_date, next_inspection_due, customer_id'
      )
      .is('deleted_at', null)
      .not('user_id', 'is', null)
      .in('report_type', RENEWAL_TYPES as unknown as string[])
      .gte('next_inspection_due', todayStr);

    if (reportsError) {
      return json({ error: 'Failed to read reports', details: reportsError.message }, 500);
    }

    /*
     * JSON-held due dates (EICR/EIC nextInspectionDate, emergency lighting
     * nextAnnualTestDue, …) per JSON_DUE_SOURCES above. PostgREST's string
     * compare is safe for ISO dates and the shape is re-checked below before
     * anything is trusted.
     */
    const eicrJsonReports: Array<Record<string, unknown>> = [];
    for (const source of JSON_DUE_SOURCES) {
      const { data: jsonRows, error: jsonError } = await supabase
        .from('reports')
        .select(
          `id, user_id, report_id, client_name, installation_address, inspection_date, customer_id, next_due:data->>${source.field}`
        )
        .in('report_type', source.types)
        .is('deleted_at', null)
        .not('user_id', 'is', null)
        .gte(`data->>${source.field}`, todayStr);
      if (jsonError) {
        console.error(`JSON sync read failed for ${source.field} (continuing):`, jsonError.message);
        continue;
      }
      // The select string is dynamic, so supabase-js can't type the rows.
      eicrJsonReports.push(...((jsonRows || []) as unknown as Array<Record<string, unknown>>));
    }

    let synced = 0;
    {
      /*
       * Upsert on the report_id UNIQUE key, descriptive fields only.
       *
       * reminder_status and the client_email_*_sent_at stamps are NOT in this
       * payload: the status belongs to the electrician (they mark reminders
       * contacted/booked on CertificateExpiryPage) and the stamps are what
       * makes sending idempotent. An upsert that reset either would re-email
       * customers and wipe the electrician's own tracking.
       */
      const now = new Date().toISOString();
      const rowsById = new Map<string, Record<string, unknown>>();
      for (const r of dueReports || []) {
        rowsById.set(r.id as string, {
          user_id: r.user_id as string,
          report_id: r.id as string,
          certificate_number: (r.report_id as string) || 'Certificate',
          client_name: (r.client_name as string) ?? null,
          installation_address: (r.installation_address as string) ?? null,
          inspection_date: (r.inspection_date as string) ?? null,
          expiry_date: r.next_inspection_due as string,
          customer_id: (r.customer_id as string) ?? null,
          updated_at: now,
        });
      }
      for (const r of eicrJsonReports || []) {
        // Free-text field in old reports — only a real ISO date gets in.
        // Some forms store full timestamps; the calendar date is all we need.
        const raw = String((r as Record<string, unknown>).next_due || '');
        if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) continue;
        const due = raw.slice(0, 10);
        // The column, if ever set on an EICR, wins over the JSON copy.
        if (rowsById.has(r.id as string)) continue;
        rowsById.set(r.id as string, {
          user_id: r.user_id as string,
          report_id: r.id as string,
          certificate_number: (r.report_id as string) || 'Certificate',
          client_name: (r.client_name as string) ?? null,
          installation_address: (r.installation_address as string) ?? null,
          inspection_date: (r.inspection_date as string) ?? null,
          expiry_date: due,
          customer_id: (r.customer_id as string) ?? null,
          updated_at: now,
        });
      }
      const rows = [...rowsById.values()];

      if (rows.length > 0) {
        const { error: upsertError, count } = await supabase
          .from('certificate_expiry_reminders')
          .upsert(rows, { onConflict: 'report_id', count: 'exact' });

        if (upsertError) {
          // Sync failing must not stop sends for rows already in the ledger.
          console.error('ledger sync failed (continuing):', upsertError.message);
        } else {
          synced = count ?? rows.length;
        }
      }

      /*
       * PRUNE — soft-deleted reports. The report_id FK cascades on HARD
       * delete, but the app soft-deletes (deleted_at), which leaves the
       * ledger row live — and a customer chased about a certificate the
       * electrician deleted. Checked in chunks: ~700 UUIDs in one `.in()`
       * overflows the request URL.
       */
      try {
        const { data: ledgerIds } = await supabase
          .from('certificate_expiry_reminders')
          .select('report_id')
          .range(0, 9999);
        const allIds = (ledgerIds ?? []).map((r) => r.report_id as string);
        const deadIds: string[] = [];
        for (let i = 0; i < allIds.length; i += 100) {
          const chunk = allIds.slice(i, i + 100);
          const { data: deadReports } = await supabase
            .from('reports')
            .select('id')
            .in('id', chunk)
            .not('deleted_at', 'is', null);
          deadIds.push(...(deadReports ?? []).map((r) => r.id as string));
        }
        if (deadIds.length > 0) {
          await supabase.from('certificate_expiry_reminders').delete().in('report_id', deadIds);
          console.log(`pruned ${deadIds.length} ledger rows for soft-deleted reports`);
        }
      } catch (pruneErr) {
        console.error('ledger prune failed (continuing):', pruneErr);
      }
    }

    // ── 2. GATE — who has actually turned this on ──────────────────────────
    const { data: enabledRows, error: gateError } = await supabase
      .from('user_automations')
      .select('user_id')
      .eq('key', AUTOMATION_KEY)
      .eq('mode', 'auto');

    if (gateError) {
      return json({ error: 'Failed to read automations', details: gateError.message }, 500);
    }

    const enabledUsers = new Set((enabledRows ?? []).map((r) => r.user_id as string));

    // ── 3. SEND — certs inside 30 days, opted-in electricians only ─────────
    // No early return when the gate is empty: maintenance-contract visit
    // emails below carry their own per-contract consent flag and must still
    // get their pass.
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    let candidates: Array<Record<string, unknown>> = [];
    if (enabledUsers.size > 0) {
      const { data: dueSoon, error: dueError } = await supabase
        .from('certificate_expiry_reminders')
        .select(
          'id, user_id, report_id, certificate_number, client_name, installation_address, expiry_date, reminder_status, customer_id, client_email_30_day_sent_at, client_email_14_day_sent_at, client_email_7_day_sent_at'
        )
        .not('reminder_status', 'in', '("completed","cancelled")')
        .gte('expiry_date', todayStr)
        .lte('expiry_date', in30Days.toISOString().split('T')[0]);

      if (dueError) {
        return json({ error: 'Failed to read ledger', details: dueError.message }, 500);
      }
      candidates = (dueSoon ?? []).filter((c) => enabledUsers.has(c.user_id as string));
    }

    /*
     * Maintenance-contract visits awaiting their reminder. Consent here is
     * PER CONTRACT (`auto_email_customer`, off by default — ticked by the
     * electrician when setting the contract up), not the user_automations
     * switch. One email per visit, ever: `email_sent_at` is the stamp.
     * FK named explicitly — the PGRST201 rule.
     */
    // Window matches the widest allowed reminder lead (60 days), not the
    // cert pass's 30 — the per-contract lead below decides the actual send day.
    const in60Days = new Date(today);
    in60Days.setDate(in60Days.getDate() + 60);

    const { data: visitRows, error: visitError } = await supabase
      .from('maintenance_contract_visits')
      .select(
        'id, user_id, due_date, email_sent_at, contract:maintenance_contracts!maintenance_contract_visits_contract_id_fkey!inner(id, customer_id, customer_name, job_type, reminder_days_before, auto_email_customer, status)'
      )
      .is('email_sent_at', null)
      .gte('due_date', todayStr)
      .lte('due_date', in60Days.toISOString().split('T')[0])
      .eq('contract.auto_email_customer', true)
      .eq('contract.status', 'active');

    if (visitError) console.error('contract visit read failed (continuing):', visitError.message);

    const visitCandidates = (visitRows ?? []).filter((v) => {
      const contract = v.contract as unknown as Record<string, unknown>;
      const lead = Number(contract?.reminder_days_before ?? 7);
      const dueMs = Date.parse(`${v.due_date as string}T12:00:00Z`);
      return dueMs <= today.getTime() + (lead + 1) * 86_400_000;
    });

    if (candidates.length === 0 && visitCandidates.length === 0) {
      return json({ success: true, synced, enabledUsers: enabledUsers.size, emailsSent: 0 });
    }

    /*
     * Suppression list — read whole and compared lower-cased. `.in()` is
     * case-SENSITIVE, so a stored `Foo@Bar.com` would never match and the
     * suppression would silently do nothing (same reasoning as winback-send).
     * A suppressed address is usually a hard bounce; emailing it again damages
     * the sending domain for every user.
     */
    const { data: suppressedRows } = await supabase
      .from('email_suppressions')
      .select('email')
      .range(0, 49999);
    const suppressed = new Set(
      (suppressedRows ?? [])
        .map((s) => String(s.email || '').trim().toLowerCase())
        .filter(Boolean)
    );

    // Customers and company profiles fetched once per batch — both passes.
    const customerIds = [
      ...new Set(
        [
          ...candidates.map((c) => c.customer_id),
          ...visitCandidates.map(
            (v) => (v.contract as unknown as Record<string, unknown>)?.customer_id
          ),
        ].filter(Boolean)
      ),
    ];
    const customerMap = new Map<
      string,
      {
        name: string | null;
        email: string | null;
        address: string | null;
        optedOut: boolean;
      }
    >();
    if (customerIds.length > 0) {
      const { data: customers } = await supabase
        .from('customers')
        .select('id, name, email, address, campaign_opted_out_at')
        .in('id', customerIds as string[]);
      for (const c of customers ?? []) {
        customerMap.set(c.id as string, {
          name: (c.name as string) ?? null,
          email: (c.email as string) ?? null,
          address: (c.address as string) ?? null,
          optedOut: !!c.campaign_opted_out_at,
        });
      }
    }

    const userIds = [
      ...new Set([
        ...candidates.map((c) => c.user_id as string),
        ...visitCandidates.map((v) => v.user_id as string),
      ]),
    ];
    // Only real company_profiles columns — the old code also read full_name,
    // email and phone, none of which exist on this table.
    const companyMap = new Map<string, Record<string, unknown>>();
    {
      const { data: companies } = await supabase
        .from('company_profiles')
        .select(
          'user_id, company_name, company_email, company_phone, company_website, company_address, logo_url, logo_data_url, primary_color, vat_number, company_registration'
        )
        .in('user_id', userIds);
      for (const co of companies ?? []) companyMap.set(co.user_id as string, co);
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) return json({ error: 'RESEND_API_KEY not configured' }, 500);
    const resend = new Resend(resendApiKey);

    let emailsSent = 0;
    let skipped = 0;
    const results: Array<Record<string, unknown>> = [];

    for (const cert of candidates) {
      const customer = cert.customer_id
        ? customerMap.get(cert.customer_id as string)
        : undefined;
      const to = (customer?.email ?? '').trim().toLowerCase();
      if (!to) {
        skipped++;
        continue;
      }
      if (suppressed.has(to)) {
        skipped++;
        results.push({ certificate: cert.certificate_number, status: 'skipped', reason: 'suppressed' });
        continue;
      }
      if (customer?.optedOut) {
        // They told THIS electrician to stop — scoped opt-out, not global.
        skipped++;
        results.push({ certificate: cert.certificate_number, status: 'skipped', reason: 'opted out' });
        continue;
      }

      const expiryDate = new Date(cert.expiry_date as string);
      const daysUntilExpiry = Math.floor(
        (expiryDate.getTime() - today.getTime()) / 86_400_000
      );

      // Escalating tiers, each sent once, ledger-stamped.
      let tier: ExpiryTier | null = null;
      let sentAtField: string | null = null;
      if (daysUntilExpiry <= 7 && !cert.client_email_7_day_sent_at) {
        tier = '7-day';
        sentAtField = 'client_email_7_day_sent_at';
      } else if (daysUntilExpiry <= 14 && !cert.client_email_14_day_sent_at) {
        tier = '14-day';
        sentAtField = 'client_email_14_day_sent_at';
      } else if (daysUntilExpiry <= 30 && !cert.client_email_30_day_sent_at) {
        tier = '30-day';
        sentAtField = 'client_email_30_day_sent_at';
      }
      if (!tier || !sentAtField) {
        skipped++;
        continue;
      }

      // At most one email per certificate per 24h, so a cert crossing two tier
      // boundaries in quick succession does not double-tap the customer.
      const lastSent = [
        cert.client_email_30_day_sent_at,
        cert.client_email_14_day_sent_at,
        cert.client_email_7_day_sent_at,
      ]
        .filter(Boolean)
        .map((ts) => new Date(ts as string).getTime());
      if (lastSent.length > 0 && Date.now() - Math.max(...lastSent) < 24 * 3_600_000) {
        skipped++;
        results.push({ certificate: cert.certificate_number, status: 'skipped', reason: 'rate limited (24h)' });
        continue;
      }

      const company = companyMap.get(cert.user_id as string);
      const companyName = (company?.company_name as string) || 'Your Electrician';
      const companyEmail = (company?.company_email as string) || '';
      const reportType = ''; // ledger does not carry it; label from cert number prefix below
      const prefixLabel =
        CERT_TYPE_SHORT[reportType] ||
        String(cert.certificate_number || '')
          .split('-')[0]
          .toUpperCase() ||
        'Certificate';
      /*
       * An EIC-sourced reminder is selling an EICR — the installation cert's
       * "first periodic inspection" has come due, and the periodic inspection
       * IS an EICR. Emailing "your EIC is due for renewal" would be nonsense;
       * the customer never renews an EIC.
       */
      const certLabel = prefixLabel === 'EIC' ? 'EICR' : prefixLabel;

      const emailContent = buildCertExpiryReminderEmail({
        company: {
          name: companyName,
          logoUrl: (company?.logo_url as string) || (company?.logo_data_url as string) || null,
          primaryColor: (company?.primary_color as string) || null,
          email: companyEmail || null,
          phone: (company?.company_phone as string) || null,
          website: (company?.company_website as string) || null,
          address: (company?.company_address as string) || null,
          vatNumber: (company?.vat_number as string) || null,
          registrationNumber: (company?.company_registration as string) || null,
        },
        clientName: customer?.name || (cert.client_name as string) || 'Valued Customer',
        certificateType: certLabel,
        certificateNumber: cert.certificate_number as string,
        installationAddress: (cert.installation_address as string) || null,
        expiryDate: cert.expiry_date as string,
        daysUntilExpiry,
        tier,
        /*
         * The whole point of the feature: one tap from the reminder to the
         * electrician's public booking page. Without this the email says "your
         * cert is expiring" and leaves the customer to go and find an
         * electrician — possibly a different one.
         */
        // rid closes the loop: booking from this email marks the renewal
        // BOOKED in the electrician's pipeline instead of leaving it to be
        // chased by hand.
        bookingUrl: `${BOOKING_ORIGIN}/book/${cert.user_id}?rid=${cert.id}`,
        unsubscribeUrl: await buildUnsubscribeUrl(to, {
          scope: 'customer_campaign',
          userId: cert.user_id as string,
        }),
        // Open tracking — email-open's cert_expiry type resolves the owning
        // report, records the open and (first time) tells the electrician.
        trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=cert_expiry&id=${cert.report_id}`,
      });

      try {
        const sender = clientFacingSender({
          companyName,
          companyEmail: companyEmail || undefined,
        });
        const unsubHeaders = buildUnsubscribeHeaders(
          await buildUnsubscribeUrl(to, {
            scope: 'customer_campaign',
            userId: cert.user_id as string,
          })
        );
        const { error: emailError } = await resend.emails.send({
          ...sender,
          to,
          subject: emailContent.subject,
          html: emailContent.html,
          text: htmlToPlainText(emailContent.html),
          headers: unsubHeaders,
        });

        if (emailError) {
          results.push({ certificate: cert.certificate_number, status: 'failed', reason: emailError.message });
          continue;
        }

        // Stamp only after Brevo accepted — under-record rather than double-send.
        await supabase
          .from('certificate_expiry_reminders')
          .update({ [sentAtField]: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq('id', cert.id);

        emailsSent++;
        results.push({
          certificate: cert.certificate_number,
          status: 'sent',
          tier,
          daysUntilExpiry,
          recipient: to,
        });
      } catch (sendErr) {
        results.push({
          certificate: cert.certificate_number,
          status: 'error',
          reason: sendErr instanceof Error ? sendErr.message : 'unknown',
        });
      }
    }

    // ── 4. SEND — maintenance-contract visit reminders ─────────────────────
    for (const visit of visitCandidates) {
      const contract = visit.contract as unknown as Record<string, unknown>;
      const customer = contract.customer_id
        ? customerMap.get(contract.customer_id as string)
        : undefined;
      const to = (customer?.email ?? '').trim().toLowerCase();
      const label = `${contract.job_type} · ${customer?.name || contract.customer_name}`;
      if (!to) {
        skipped++;
        continue;
      }
      if (suppressed.has(to)) {
        skipped++;
        results.push({ visit: label, status: 'skipped', reason: 'suppressed' });
        continue;
      }
      if (customer?.optedOut) {
        skipped++;
        results.push({ visit: label, status: 'skipped', reason: 'opted out' });
        continue;
      }

      const company = companyMap.get(visit.user_id as string);
      const companyName = (company?.company_name as string) || 'Your Electrician';
      const daysUntilDue = Math.ceil(
        (Date.parse(`${visit.due_date as string}T12:00:00Z`) - today.getTime()) / 86_400_000
      );

      const emailContent = buildMaintenanceVisitEmail({
        company: {
          name: companyName,
          logoUrl: (company?.logo_url as string) || (company?.logo_data_url as string) || null,
          primaryColor: (company?.primary_color as string) || null,
          email: (company?.company_email as string) || null,
          phone: (company?.company_phone as string) || null,
          website: (company?.company_website as string) || null,
          address: (company?.company_address as string) || null,
          vatNumber: (company?.vat_number as string) || null,
          registrationNumber: (company?.company_registration as string) || null,
        },
        clientName: customer?.name || (contract.customer_name as string) || 'Valued Customer',
        jobType: (contract.job_type as string) || 'Maintenance visit',
        installationAddress: customer?.address || null,
        dueDate: visit.due_date as string,
        daysUntilDue,
        // visit closes the loop: booking from this email links the diary
        // event back onto the contract visit.
        bookingUrl: `${BOOKING_ORIGIN}/book/${visit.user_id}?visit=${visit.id}`,
        unsubscribeUrl: await buildUnsubscribeUrl(to, {
          scope: 'customer_campaign',
          userId: visit.user_id as string,
        }),
      });

      try {
        const sender = clientFacingSender({
          companyName,
          companyEmail: ((company?.company_email as string) || '') || undefined,
        });
        const unsubHeaders = buildUnsubscribeHeaders(
          await buildUnsubscribeUrl(to, {
            scope: 'customer_campaign',
            userId: visit.user_id as string,
          })
        );
        const { error: emailError } = await resend.emails.send({
          ...sender,
          to,
          subject: emailContent.subject,
          html: emailContent.html,
          text: htmlToPlainText(emailContent.html),
          headers: unsubHeaders,
        });

        if (emailError) {
          results.push({ visit: label, status: 'failed', reason: emailError.message });
          continue;
        }

        // Stamp only after Brevo accepted — same rule as the cert pass.
        await supabase
          .from('maintenance_contract_visits')
          .update({ email_sent_at: new Date().toISOString() })
          .eq('id', visit.id);

        emailsSent++;
        results.push({ visit: label, status: 'sent', daysUntilDue, recipient: to });
      } catch (sendErr) {
        results.push({
          visit: label,
          status: 'error',
          reason: sendErr instanceof Error ? sendErr.message : 'unknown',
        });
      }
    }

    return json({
      success: true,
      synced,
      enabledUsers: enabledUsers.size,
      candidates: candidates.length,
      visitCandidates: visitCandidates.length,
      emailsSent,
      skipped,
      results,
    });
  } catch (error) {
    // The old catch referenced a loop variable that does not exist in this
    // scope — every outer failure died again inside its own error handler.
    console.error('Client expiry reminders error:', error);
    await captureException(error, {
      functionName: 'send-client-expiry-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'Internal error' }, 500);
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // pg_cron's http_post won't wait for a long send batch — the connection is
  // gone after its timeout. For scheduled runs, ack immediately and finish the
  // batch in the background so a client disconnect can never cut it short.
  let scheduled = false;
  try {
    const body = await req.clone().json();
    scheduled = body?.scheduled === true;
  } catch {
    // No JSON body — treat as a manual invocation.
  }

  const work = runReminders(req);
  const runtime = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } })
    .EdgeRuntime;
  if (scheduled && runtime?.waitUntil) {
    runtime.waitUntil(
      work.then(async (r) =>
        console.log('Scheduled run finished:', r.status, await r.text().catch(() => ''))
      )
    );
    return json({ accepted: true, background: true });
  }
  return work;
});
