/**
 * Read-only lookups for Employer Mate's page awareness (7 Oct 2026).
 *
 * Every read runs on the CALLER's client (their JWT), so row-level security
 * decides what they can see, exactly as the hub does; each query is also
 * pinned to the firm Mate acts for. Money (totals, amounts paid, job value)
 * is only included when can_see_firm_money said yes: office managers never
 * get money from Mate.
 */
import type { RecordKind } from './page-knowledge.ts';

// deno-lint-ignore no-explicit-any
type Client = any;

const d = (v: unknown) => (typeof v === 'string' && v ? v.slice(0, 10) : null);
const gbp = (v: unknown) => `£${(Number(v) || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const lc = (v: unknown) => String(v ?? '').toLowerCase();

async function firmEmployees(caller: Client, firmId: string) {
  const { data } = await caller
    .from('employer_employees')
    .select('id, name, status')
    .eq('employer_id', firmId)
    .limit(500);
  return (data ?? []) as Array<{ id: string; name: string; status: string | null }>;
}

/**
 * One record the user has open, as a short brief for the model. Returns a
 * plain sentence when the record can't be read (wrong firm, RLS, deleted).
 */
export async function fetchPageRecord(
  caller: Client,
  firmId: string,
  kind: RecordKind,
  id: string,
  canSeeMoney: boolean
): Promise<string> {
  const none = `No ${kind} with that id is visible to you in this firm.`;
  try {
    if (kind === 'job') {
      const { data: j } = await caller
        .from('employer_jobs')
        .select('id, title, client, location, status, board_stage, progress, start_date, end_date, value, quoted_hours, site_contact_name, access_notes')
        .eq('id', id)
        .eq('user_id', firmId)
        .maybeSingle();
      if (!j) return none;
      const [tasks, sheets, packs, invoices] = await Promise.all([
        caller.from('employer_job_tasks').select('status, due_date').eq('job_id', id).eq('employer_id', firmId),
        caller.from('employer_timesheets').select('total_hours, status').eq('job_id', id).limit(1000),
        caller.from('employer_job_packs').select('title, status, sent_to_workers_at').eq('job_id', id).eq('employer_id', firmId),
        canSeeMoney
          ? caller.from('quotes').select('invoice_number, invoice_status, total, invoice_due_date').eq('user_id', firmId).eq('employer_job_id', id).eq('invoice_raised', true).is('deleted_at', null)
          : Promise.resolve({ data: [] }),
      ]);
      const t = (tasks.data ?? []) as Array<{ status: string; due_date: string | null }>;
      const openTasks = t.filter((x) => !['done', 'completed', 'complete'].includes(lc(x.status)));
      const s = (sheets.data ?? []) as Array<{ total_hours: number | null; status: string }>;
      const hours = s.filter((x) => x.status !== 'Rejected').reduce((a, x) => a + (Number(x.total_hours) || 0), 0);
      const pending = s.filter((x) => x.status === 'Pending').length;
      const p = (packs.data ?? []) as Array<{ title: string; status: string; sent_to_workers_at: string | null }>;
      const inv = (invoices.data ?? []) as Array<{ invoice_number: string; invoice_status: string; total: number; invoice_due_date: string | null }>;
      return [
        `JOB "${j.title}"${j.client ? ` for ${j.client}` : ''}${j.location ? `, ${j.location}` : ''}. Status ${j.status ?? 'unknown'}${j.board_stage ? ` (board: ${j.board_stage})` : ''}${j.progress != null ? `, ${j.progress}% done` : ''}.`,
        `Dates: start ${d(j.start_date) ?? 'not set'}, end ${d(j.end_date) ?? 'not set'}.${j.site_contact_name ? ` Site contact ${j.site_contact_name}.` : ''}`,
        `Hours logged ${Math.round(hours * 10) / 10}${j.quoted_hours ? ` of ${j.quoted_hours} quoted` : ''}; ${pending} timesheet entr${pending === 1 ? 'y' : 'ies'} waiting for approval.`,
        `Tasks: ${openTasks.length} open of ${t.length}.`,
        p.length ? `Job packs: ${p.map((x) => `${x.title} (${x.status}${x.sent_to_workers_at ? ', sent ' + d(x.sent_to_workers_at) : ', not sent'})`).join('; ')}. For who has not signed, call who_has_not_signed with the job title.` : 'Job packs: none for this job.',
        canSeeMoney
          ? `Value ${j.value != null ? gbp(j.value) : 'not set'}. Invoices: ${inv.length ? inv.map((x) => `${x.invoice_number ?? 'draft'} ${x.invoice_status ?? 'draft'} ${gbp(x.total)}`).join('; ') : 'none'}.`
          : 'Money for this job is hidden for this user.',
      ].join('\n');
    }

    if (kind === 'client') {
      const { data: c } = await caller
        .from('customers')
        .select('id, name, company_name, email, phone, address, postcode, status, last_activity_at')
        .eq('id', id)
        .eq('user_id', firmId)
        .maybeSingle();
      if (!c) return none;
      const [{ data: q }, { data: jobs }] = await Promise.all([
        caller.from('quotes').select('quote_number, invoice_number, invoice_raised, status, acceptance_status, invoice_status, total').eq('user_id', firmId).eq('customer_id', id).is('deleted_at', null).limit(100),
        caller.from('employer_jobs').select('title, status').eq('user_id', firmId).eq('customer_id', id).limit(50),
      ]);
      const rows = (q ?? []) as Array<{ invoice_raised: boolean; status: string; acceptance_status: string | null; invoice_status: string | null; total: number }>;
      const invs = rows.filter((r) => r.invoice_raised);
      const quotes = rows.filter((r) => !r.invoice_raised);
      const unpaid = invs.filter((r) => !lc(r.invoice_status).includes('paid') && lc(r.invoice_status) !== 'draft');
      return [
        `CLIENT ${c.name}${c.company_name ? ` (${c.company_name})` : ''}. ${[c.email, c.phone].filter(Boolean).join(', ') || 'No contact details'}${c.address ? `; ${c.address}` : ''}${c.postcode ? ` ${c.postcode}` : ''}.`,
        `Jobs: ${(jobs ?? []).length ? (jobs as Array<{ title: string; status: string }>).map((x) => `${x.title} (${x.status})`).join('; ') : 'none'}.`,
        `Quotes ${quotes.length}, invoices ${invs.length} (${unpaid.length} unpaid${canSeeMoney ? `, ${gbp(unpaid.reduce((a, r) => a + Number(r.total || 0), 0))} owed` : ''}).`,
      ].join('\n');
    }

    if (kind === 'quote' || kind === 'invoice') {
      const { data: q } = await caller
        .from('quotes')
        .select('id, quote_number, invoice_number, invoice_raised, client_data, status, acceptance_status, accepted_at, expiry_date, first_viewed_at, invoice_status, invoice_date, invoice_due_date, invoice_sent_at, invoice_paid_at, total, total_paid, external_invoice_provider, external_invoice_id, external_invoice_synced_at, external_invoice_sync_error, external_invoice_sync_failed_at')
        .eq('id', id)
        .eq('user_id', firmId)
        .is('deleted_at', null)
        .maybeSingle();
      if (!q) return none;
      const client = (q.client_data && typeof q.client_data === 'object' ? (q.client_data as { name?: string }).name : null) ?? 'unknown client';
      if (!q.invoice_raised) {
        return [
          `QUOTE ${q.quote_number ?? '(no number)'} to ${client}. Status ${q.status ?? 'draft'}${q.acceptance_status ? `, client response: ${q.acceptance_status}` : ''}${q.accepted_at ? ` on ${d(q.accepted_at)}` : ''}.`,
          `Expires ${d(q.expiry_date) ?? 'not set'}. ${q.first_viewed_at ? `Client first opened it ${d(q.first_viewed_at)}.` : 'Client has not opened it yet.'}`,
          canSeeMoney ? `Total ${gbp(q.total)}.` : 'Money is hidden for this user.',
        ].join('\n');
      }
      // Sync state, in the words the Accounting page uses.
      let sync = 'Not sent to accounting software.';
      if (q.external_invoice_id) {
        sync = `Synced to ${q.external_invoice_provider ?? 'accounting software'}${q.external_invoice_synced_at ? ` on ${d(q.external_invoice_synced_at)}` : ''}.`;
      } else if (q.external_invoice_sync_failed_at || q.external_invoice_sync_error) {
        sync = `Sync to ${q.external_invoice_provider ?? 'accounting software'} FAILED${q.external_invoice_sync_failed_at ? ` on ${d(q.external_invoice_sync_failed_at)}` : ''}: ${String(q.external_invoice_sync_error ?? 'no reason recorded').slice(0, 300)}`;
      } else if (lc(q.invoice_status) === 'draft') {
        sync = 'Not synced: it is still a draft (drafts are not sent to accounting software).';
      }
      return [
        `INVOICE ${q.invoice_number ?? '(no number yet)'} to ${client}. Status ${q.invoice_status ?? 'draft'}. Dated ${d(q.invoice_date) ?? 'not set'}, due ${d(q.invoice_due_date) ?? 'not set'}.`,
        `${q.invoice_sent_at ? `Sent ${d(q.invoice_sent_at)}.` : 'Not sent yet.'} ${q.invoice_paid_at ? `Paid ${d(q.invoice_paid_at)}.` : ''}`.trim(),
        `Accounting: ${sync}`,
        canSeeMoney ? `Total ${gbp(q.total)}, paid so far ${gbp(q.total_paid)}.` : 'Money is hidden for this user.',
      ].join('\n');
    }

    if (kind === 'lead') {
      const { data: l } = await caller
        .from('employer_leads')
        .select('name, contact_name, email, phone, source, stage, estimated_value, job_type, postcode, preferred_timing, notes, converted_at, created_at')
        .eq('id', id)
        .eq('user_id', firmId)
        .maybeSingle();
      if (!l) return none;
      return [
        `LEAD ${l.name}${l.contact_name ? ` (contact ${l.contact_name})` : ''}. Stage ${l.stage ?? 'new'}, from ${l.source ?? 'unknown source'}, came in ${d(l.created_at)}.`,
        `${[l.job_type, l.postcode, l.preferred_timing].filter(Boolean).join(', ')}${l.converted_at ? `. Converted ${d(l.converted_at)}.` : '.'}`,
        canSeeMoney && l.estimated_value != null ? `Estimated value ${gbp(l.estimated_value)}.` : '',
        l.notes ? `Notes: ${String(l.notes).slice(0, 300)}` : '',
      ].filter(Boolean).join('\n');
    }

    if (kind === 'incident') {
      // deno-lint-ignore no-explicit-any
      let { data: i } = (await caller
        .from('employer_incidents')
        .select('title, incident_type, severity, status, reported_at, location, riddor_reportable, riddor_category, riddor_reported_at, acknowledged_at, closed_at, injured_person, employer_jobs(title)')
        .eq('id', id)
        .eq('employer_id', firmId)
        .maybeSingle()) as { data: any };
      if (!i) {
        // ELE-2031: a Site Safety near miss / accident shared with the firm.
        const { data: all } = await caller.rpc('get_firm_incidents', { p_firm: firmId });
        // deno-lint-ignore no-explicit-any
        const row = Array.isArray(all) ? (all as any[]).find((r) => r.id === id) : null;
        if (row) i = { ...row, employer_jobs: row.job_title ? { title: row.job_title } : null };
      }
      if (!i) return none;
      // deno-lint-ignore no-explicit-any
      const job = (i as any).employer_jobs?.title;
      return [
        `INCIDENT "${i.title}" (${i.incident_type ?? 'report'}${i.severity ? `, ${i.severity}` : ''}). Status ${i.status ?? 'open'}; reported ${d(i.reported_at)}${job ? ` on ${job}` : i.location ? ` at ${i.location}` : ''}.`,
        `${i.acknowledged_at ? `Opened by the office ${d(i.acknowledged_at)}.` : 'Not opened by the office yet.'} ${i.closed_at ? `Closed ${d(i.closed_at)}.` : ''}`.trim(),
        i.riddor_reportable
          ? `RIDDOR: reportable (${i.riddor_category ?? 'category not set'}), ${i.riddor_reported_at ? `reported ${d(i.riddor_reported_at)}` : 'NOT yet reported to the HSE'}.`
          : 'RIDDOR: not marked reportable.',
      ].join('\n');
    }

    if (kind === 'expense') {
      const emps = await firmEmployees(caller, firmId);
      const ids = emps.map((e) => e.id);
      if (!ids.length) return none;
      const { data: e } = await caller
        .from('employer_expense_claims')
        .select('employee_id, category, description, amount, status, submitted_date, incurred_on, receipt_url, rejection_reason, paid_date, employer_jobs(title)')
        .eq('id', id)
        .in('employee_id', ids)
        .maybeSingle();
      if (!e) return none;
      // deno-lint-ignore no-explicit-any
      const job = (e as any).employer_jobs?.title;
      const who = emps.find((x) => x.id === e.employee_id)?.name ?? 'a worker';
      return [
        `EXPENSE from ${who}: ${e.category ?? 'expense'}${e.description ? `, ${String(e.description).slice(0, 160)}` : ''}${job ? ` (job ${job})` : ''}. ${gbp(e.amount)}.`,
        `Status ${e.status ?? 'pending'}; submitted ${d(e.submitted_date) ?? '?'}${e.incurred_on ? `, spent ${d(e.incurred_on)}` : ''}. ${e.receipt_url ? 'Receipt attached.' : 'No receipt attached.'}${e.rejection_reason ? ` Rejected because: ${e.rejection_reason}` : ''}${e.paid_date ? ` Paid ${d(e.paid_date)}.` : ''}`,
      ].join('\n');
    }

    if (kind === 'request') {
      const { data: r } = await caller
        .from('signature_requests')
        .select('document_title, document_type, signer_name, status, created_at, last_sent_at, send_count, first_viewed_at, view_count, signed_at, declined_at, decline_reason, expires_at, revoked_at')
        .eq('id', id)
        .eq('user_id', firmId)
        .maybeSingle();
      if (!r) return none;
      return [
        `SIGNATURE REQUEST: "${r.document_title ?? r.document_type ?? 'document'}" to ${r.signer_name ?? 'the signer'}. Status ${r.status ?? 'pending'}.`,
        `Sent ${d(r.last_sent_at ?? r.created_at)} (${r.send_count ?? 1} time${(r.send_count ?? 1) === 1 ? '' : 's'}). ${r.first_viewed_at ? `Opened ${r.view_count ?? 1} time(s), first ${d(r.first_viewed_at)}.` : 'Not opened yet.'} Expires ${d(r.expires_at) ?? 'never'}.`,
        r.signed_at ? `Signed ${d(r.signed_at)}.` : r.declined_at ? `Declined ${d(r.declined_at)}${r.decline_reason ? `: ${r.decline_reason}` : ''}.` : r.revoked_at ? `Withdrawn ${d(r.revoked_at)}.` : '',
      ].filter(Boolean).join('\n');
    }

    if (kind === 'thread') {
      const { data: t } = await caller
        .from('employer_communications')
        .select('title, type, priority, content, created_at, last_reply_at, requires_acknowledgement, target_audience, sent_by_name, employer_jobs(title)')
        .eq('id', id)
        .maybeSingle();
      if (!t) return none;
      // deno-lint-ignore no-explicit-any
      const job = (t as any).employer_jobs?.title;
      return [
        `MESSAGE THREAD "${t.title ?? 'Untitled'}" (${t.type ?? 'message'}${t.priority ? `, ${t.priority}` : ''})${job ? ` about ${job}` : ''}, started ${d(t.created_at)}${t.sent_by_name ? ` by ${t.sent_by_name}` : ''}.`,
        `${t.last_reply_at ? `Last reply ${d(t.last_reply_at)}.` : 'No replies yet.'}${t.requires_acknowledgement ? ' Needs acknowledging.' : ''}`,
        t.content ? `Opening message: ${String(t.content).slice(0, 300)}` : '',
      ].filter(Boolean).join('\n');
    }

    return `The ${kind} is open on screen; there is no lookup for it, so work from what the user tells you.`;
  } catch (e) {
    return `Couldn't read that ${kind}: ${e instanceof Error ? e.message : 'unknown error'}.`;
  }
}

/** Flags the Timesheets page also raises (it adds far from site, over quote and no rate). */
const LONG_DAY_HOURS = 10;
const NO_BREAK_HOURS = 6;

/**
 * Everything waiting for someone in the office to approve, by person:
 * timesheets (with clean vs flagged, so Mate can say "Dan has 3 clean"),
 * expenses and leave. Read-only; Mate cannot approve.
 */
export async function fetchPendingApprovals(
  caller: Client,
  firmId: string,
  kind: string,
  person: string | null,
  canSeeMoney = false
): Promise<string> {
  const emps = await firmEmployees(caller, firmId);
  const want = person ? lc(person).trim() : '';
  const scoped = want ? emps.filter((e) => lc(e.name).includes(want)) : emps;
  if (!scoped.length) return want ? `Nobody on the team matches "${person}". Call list_team for names.` : 'No team members yet.';
  const ids = scoped.map((e) => e.id);
  const name = new Map(scoped.map((e) => [e.id, e.name]));
  const all = kind === 'all' || !kind;
  const out: string[] = [];

  if (all || kind === 'timesheets') {
    const { data, error } = await caller
      .from('employer_timesheets')
      .select('id, employee_id, date, clock_in, clock_out, total_hours, break_minutes, job_id, employer_jobs(title)')
      .in('employee_id', ids)
      .eq('status', 'Pending')
      .order('date', { ascending: true })
      .limit(400);
    if (error) out.push(`TIMESHEETS: couldn't read them (${error.message}).`);
    else {
      // Live entries (clocked in, not out) carry no hours yet and can't be approved.
      // deno-lint-ignore no-explicit-any
      const rows = ((data ?? []) as any[]).filter((t) => !(t.clock_in && !t.clock_out));
      const dayTotals = new Map<string, number>();
      rows.forEach((t) => {
        const k = `${t.employee_id}|${t.date}`;
        dayTotals.set(k, (dayTotals.get(k) ?? 0) + (Number(t.total_hours) || 0));
      });
      const byPerson = new Map<string, { clean: number; flagged: Array<string>; hours: number; from: string; to: string }>();
      rows.forEach((t) => {
        const flags: string[] = [];
        const day = dayTotals.get(`${t.employee_id}|${t.date}`) ?? 0;
        if (day > LONG_DAY_HOURS) flags.push(`${day.toFixed(1)}h day`);
        if ((Number(t.total_hours) || 0) > NO_BREAK_HOURS && !Number(t.break_minutes)) flags.push('No break');
        const dow = new Date(`${String(t.date).slice(0, 10)}T12:00:00Z`).getUTCDay();
        if (dow === 0 || dow === 6) flags.push('Weekend');
        if (!t.job_id) flags.push('No job');
        const p = byPerson.get(t.employee_id) ?? { clean: 0, flagged: [] as string[], hours: 0, from: t.date, to: t.date };
        p.hours += Number(t.total_hours) || 0;
        p.to = t.date;
        if (flags.length) p.flagged.push(`${String(t.date).slice(0, 10)} ${Number(t.total_hours) || 0}h${t.employer_jobs?.title ? ` ${t.employer_jobs.title}` : ''} (${flags.join(', ')}) [id ${t.id}]`);
        else p.clean += 1;
        byPerson.set(t.employee_id, p);
      });
      if (!byPerson.size) out.push('TIMESHEETS: nothing waiting for approval.');
      else {
        out.push(
          `TIMESHEETS waiting for approval: ${rows.length} entries from ${byPerson.size} people. "Clean" = none of: day over 10h, over 6h with no break, weekend, no job. The page can also flag far from site, over quote and no rate, so its own count is final.\n` +
            [...byPerson.entries()]
              .map(([id, p]) => `- ${name.get(id) ?? 'Unknown'}: ${p.clean + p.flagged.length} entries, ${Math.round(p.hours * 10) / 10}h (${String(p.from).slice(0, 10)} to ${String(p.to).slice(0, 10)}); ${p.clean} clean${p.flagged.length ? `; flagged: ${p.flagged.slice(0, 6).join('; ')}${p.flagged.length > 6 ? ` and ${p.flagged.length - 6} more` : ''}` : ''}`)
              .join('\n')
        );
      }
    }
  }

  if (all || kind === 'expenses') {
    const { data, error } = await caller
      .from('employer_expense_claims')
      .select('id, employee_id, category, amount, submitted_date, receipt_url')
      .in('employee_id', ids)
      .ilike('status', 'pending')
      .order('submitted_date', { ascending: true })
      .limit(200);
    if (error) out.push(`EXPENSES: couldn't read them (${error.message}).`);
    else {
      // deno-lint-ignore no-explicit-any
      const rows = (data ?? []) as any[];
      out.push(
        rows.length
          ? `EXPENSES waiting for approval: ${rows.length}.\n` +
              rows.slice(0, 25).map((e) => `- ${name.get(e.employee_id) ?? 'Unknown'}: ${e.category ?? 'expense'}${canSeeMoney ? ` ${gbp(e.amount)}` : ''}, submitted ${d(e.submitted_date) ?? '?'}${e.receipt_url ? '' : ', NO RECEIPT'} [id ${e.id}]`).join('\n')
          : 'EXPENSES: nothing waiting for approval.'
      );
    }
  }

  if (all || kind === 'leave') {
    // employer_leave_requests is the table workers submit to and the Leave page decides.
    const { data, error } = await caller
      .from('employer_leave_requests')
      .select('id, employee_id, type, start_date, end_date, total_days, half_day')
      .in('employee_id', ids)
      .ilike('status', 'pending')
      .order('start_date', { ascending: true })
      .limit(100);
    if (error) out.push(`LEAVE: couldn't read it (${error.message}).`);
    else {
      // deno-lint-ignore no-explicit-any
      const rows = (data ?? []) as any[];
      out.push(
        rows.length
          ? `LEAVE waiting for approval: ${rows.length}.\n` +
              rows.map((l) => `- ${name.get(l.employee_id) ?? 'Unknown'}: ${l.type ?? 'leave'} ${d(l.start_date)}${l.end_date && l.end_date !== l.start_date ? ` to ${d(l.end_date)}` : ''}${l.total_days != null ? ` (${l.total_days} day${Number(l.total_days) === 1 ? '' : 's'})` : ''} [id ${l.id}]`).join('\n')
          : 'LEAVE: nothing waiting for approval.'
      );
    }
  }
  return out.join('\n\n') + '\n(Clean timesheets can be approved by person with approve_timesheets; leave and expenses by id with decide_leave and decide_expense. Each shows the user a confirmation card first.)';
}
