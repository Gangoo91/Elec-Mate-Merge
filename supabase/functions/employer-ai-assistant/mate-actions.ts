/**
 * Employer Mate's confirmed write actions (7 Oct 2026): approve and send back
 * timesheets, decide leave and expenses, mark expenses paid, chase an invite,
 * book someone on a job, message the team and chase a signature.
 *
 * Two halves, never joined by the model:
 *  - previewAction: the model calls a tool; this reads (as the CALLER, so
 *    row-level security applies), checks, works out clashes and flags, and
 *    returns a confirmation card carrying a signed token (mate-token.ts).
 *    Nothing is written.
 *  - executeAction: runs only from the user's own Confirm (a separate request
 *    with that token), again as the CALLER, through the SAME write the app
 *    uses (same table update and payload, or the same RPC / edge function).
 *
 * Every write is audit-logged with via:'mate' and the token's nonce, which is
 * also what stops a token running twice.
 */
import { signAction, type ActionPayload, UNDO_TTL_MS } from './mate-token.ts';

// deno-lint-ignore no-explicit-any
type Client = any;

export interface ActionCtx {
  caller: Client;
  /** Service role: ONLY for the audit log, never for the action itself. */
  admin: Client;
  firmId: string;
  userId: string;
  userEmail: string | null;
  role: string;
  canSeeMoney: boolean;
  authHeader: string;
  secret: string;
  supabaseUrl: string;
  anonKey: string;
}

export interface CardLine {
  label: string;
  value: string;
}
export interface CardLink {
  label: string;
  section: string;
  params?: Record<string, string>;
}
export interface ConfirmCard {
  card: 'confirm';
  token: string;
  action: string;
  title: string;
  lines: CardLine[];
  warnings: string[];
  /** What happens if they change their mind. */
  undo: string;
  expires_at: string;
  confirm_label: string;
}
export interface ResultCard {
  card: 'result';
  ok: boolean;
  action: string;
  title: string;
  lines: CardLine[];
  links: CardLink[];
  undo_token?: string;
  undo_until?: string;
}

export interface PreviewOutcome {
  card?: ConfirmCard;
  /** What the model is told. */
  note: string;
}

// ── Tool schemas the model sees (preview only) ─────────────────────────────
const fn = (name: string, description: string, properties: Record<string, unknown>, required: string[] = []) => ({
  type: 'function',
  function: { name, description, parameters: { type: 'object', properties, required } },
});
const CONFIRM_RULE =
  ' Calling this does NOT change anything: it shows the user a confirmation card with the exact changes and Confirm / Cancel buttons. Only their Confirm (or a "yes" to the card) does it. Call it only when they asked for this or said yes to your offer.';

export const ACTION_TOOLS = [
  fn(
    'approve_timesheets',
    'Approve pending timesheet entries, exactly as the Timesheets page does. Give person (a name, approves that person\'s CLEAN pending entries) or ids. Entries still clocked in are never approved. Flagged entries (long day, no break, weekend, no job, far from site, over quote, no rate) are skipped unless the user named that specific entry, in which case put its id in include_flagged_ids.' + CONFIRM_RULE,
    {
      person: { type: 'string', description: 'Worker name or id: approve their clean pending entries.' },
      ids: { type: 'array', items: { type: 'string' }, description: 'Specific timesheet entry ids.' },
      include_flagged_ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'Flagged entry ids the user explicitly named and wants approved anyway. Never fill this on your own.',
      },
    }
  ),
  fn(
    'send_back_timesheet',
    'Send one pending timesheet entry back to the worker with a reason (they see it in Worker Tools). A reason is required: ask for it if they did not give one.' + CONFIRM_RULE,
    { id: { type: 'string', description: 'Timesheet entry id.' }, reason: { type: 'string' } },
    ['id', 'reason']
  ),
  fn(
    'decide_leave',
    'Approve or decline a pending leave request, as the Leave page does. The card shows clashes (others off, jobs left with nobody). Declining needs a reason in the user\'s own words: ask for it.' + CONFIRM_RULE,
    {
      id: { type: 'string', description: 'Leave request id.' },
      decision: { type: 'string', enum: ['approve', 'decline'] },
      reason: { type: 'string', description: 'Required to decline; the worker sees it.' },
    },
    ['id', 'decision']
  ),
  fn(
    'decide_expense',
    'Approve or reject a pending expense claim, as the Expenses page does. Rejecting needs a reason.' + CONFIRM_RULE,
    {
      id: { type: 'string', description: 'Expense claim id.' },
      decision: { type: 'string', enum: ['approve', 'reject'] },
      reason: { type: 'string', description: 'Required to reject; the worker sees it.' },
    },
    ['id', 'decision']
  ),
  fn(
    'mark_expenses_paid',
    'Owner or admin only. Mark APPROVED expense claims as paid (the pay run), for given ids, one person, or every approved claim when neither is given. Office managers cannot do this.' + CONFIRM_RULE,
    {
      ids: { type: 'array', items: { type: 'string' } },
      person: { type: 'string', description: 'Worker name or id.' },
      paid_on: { type: 'string', description: 'YYYY-MM-DD, default today.' },
    }
  ),
  fn(
    'chase_team_invite',
    'Email a reminder to someone who was added to the team but has not joined (the Team page "Send reminder"). At most one a day, three in all.' + CONFIRM_RULE,
    { employee: { type: 'string', description: 'Worker name or id.' } },
    ['employee']
  ),
  fn(
    'book_person_on_job',
    'Book a team member onto a job for a date range, as the Diary does. The card shows clashes (leave, double-booking, over a working day). They get the usual app notification.' + CONFIRM_RULE,
    {
      employee: { type: 'string', description: 'Worker name or id.' },
      job: { type: 'string', description: 'Job title or id.' },
      from: { type: 'string', description: 'YYYY-MM-DD' },
      to: { type: 'string', description: 'YYYY-MM-DD, default same as from.' },
      start_time: { type: 'string', description: 'HH:MM, optional.' },
      hours: { type: 'number', description: 'Hours a day, optional (default a full working day).' },
      notes: { type: 'string' },
    },
    ['employee', 'job', 'from']
  ),
  fn(
    'send_team_message',
    'Send a team message (Communications): to everyone, one job\'s crew, or named people. It lands on their phones straight away.' + CONFIRM_RULE,
    {
      audience: { type: 'string', enum: ['all', 'job', 'people'] },
      job: { type: 'string', description: 'Job title or id when audience is job.' },
      people: { type: 'array', items: { type: 'string' }, description: 'Names or ids when audience is people.' },
      title: { type: 'string' },
      body: { type: 'string' },
      requires_ack: { type: 'boolean', description: 'They must tap to acknowledge it.' },
      kind: { type: 'string', enum: ['announcement', 'message', 'alert'], description: 'alert = safety alert. Default announcement.' },
      urgent: { type: 'boolean' },
    },
    ['audience', 'title', 'body']
  ),
  fn(
    'reschedule_job',
    "Move a job to new dates, exactly as dragging it in the Diary does: everyone booked on it moves with it and gets the diary update. Give the job (name or id) and the new start (and end for a multi-day job; default keeps its length)." + CONFIRM_RULE,
    {
      job: { type: 'string', description: 'Job title words or id.' },
      start: { type: 'string', description: 'New first day, YYYY-MM-DD.' },
      end: { type: 'string', description: 'New last day, YYYY-MM-DD. Omit to keep the job the same length.' },
    },
    ['job', 'start']
  ),
  fn(
    'send_pack_to_worker',
    "Send an existing RAMS or job pack to one named worker to read and sign in Worker Tools (\"send Dan the RAMS for Orchard Close\"). Same send as RAMS & packs: if they already have it unsigned, it re-sends it as a reminder; if they are not on the pack yet, it adds them and sends it. Give the worker and the job as the words the user used; give pack only when the job has more than one pack. Managers only (owner, admin, office)." + CONFIRM_RULE,
    {
      employee: { type: 'string', description: 'Worker name or id.' },
      job: { type: 'string', description: 'Job title words or id, e.g. "Orchard Close".' },
      pack: { type: 'string', description: 'Pack title words, only when the job has more than one pack.' },
    },
    ['employee', 'job']
  ),
  fn(
    'chase_signature',
    'Email the signer a reminder for an open signature request (Signatures "Chase by email"). Once a day at most, six emails in all.' + CONFIRM_RULE,
    { id: { type: 'string', description: 'Signature request id.' } },
    ['id']
  ),
];

export const ACTION_NAMES = new Set(ACTION_TOOLS.map((t) => t.function.name));
/** Actions that move money: refused for anyone who cannot see the firm's money. */
export const MONEY_ACTIONS = new Set(['mark_expenses_paid']);
/** Actions only a manager (owner, admin, office) may take: refused for crew. */
export const MANAGER_ACTIONS = new Set(['send_pack_to_worker']);
const MANAGER_ROLES = new Set(['owner', 'admin', 'office']);
const managerRefusal = (role: string) =>
  `Sending a RAMS or job pack is for the owner, an admin or the office. As ${/^[aeiou]/i.test(role) ? 'an' : 'a'} ${role} you can see your own packs in Worker Tools.`;

// ── Small helpers ──────────────────────────────────────────────────────────
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;
const likeEscape = (v: string) => v.replace(/[%_\\]/g, (c) => '\\' + c);
const lc = (v: unknown) => String(v ?? '').toLowerCase();
const ymd = (v: unknown) => String(v ?? '').slice(0, 10);
const gbp = (v: unknown) =>
  `£${(Number(v) || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const hrs = (n: number) => `${Math.round(n * 10) / 10}h`;
const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`;
const todayYmd = () => new Date().toISOString().slice(0, 10);

export function dayLabel(s: string): string {
  const d = new Date(`${ymd(s)}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}
export function rangeLabel(a: string, b?: string | null): string {
  return !b || ymd(b) === ymd(a) ? dayLabel(a) : `${dayLabel(a)} to ${dayLabel(b)}`;
}
const addDays = (s: string, n: number) => {
  const d = new Date(`${ymd(s)}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const isWeekend = (s: string) => {
  const dow = new Date(`${ymd(s)}T12:00:00Z`).getUTCDay();
  return dow === 0 || dow === 6;
};
const diffDays = (a: string, b: string) =>
  Math.round((new Date(`${a}T12:00:00Z`).getTime() - new Date(`${b}T12:00:00Z`).getTime()) / 864e5);
/** Same rule as the Diary: weekend days count only when the booking starts or ends on them. */
function coversDay(start: string, end: string, day: string): boolean {
  if (day < start || day > end) return false;
  if (!isWeekend(day)) return true;
  const startsWeekend = isWeekend(start) && diffDays(day, start) <= 1 && diffDays(day, start) >= 0;
  const endsWeekend = isWeekend(end) && diffDays(end, day) <= 1 && diffDays(end, day) >= 0;
  return startsWeekend || endsWeekend;
}
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const cleanBody = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

interface Emp {
  id: string;
  name: string;
  status: string | null;
  email: string | null;
  user_id: string | null;
}

async function firmPeople(ctx: ActionCtx): Promise<Emp[]> {
  const { data } = await ctx.caller
    .from('employer_employees')
    .select('id, name, status, email, user_id')
    .eq('employer_id', ctx.firmId)
    .limit(1000);
  return (data ?? []) as Emp[];
}

/** A person named in chat: id, exact name, else one unique partial match. */
function pickPerson(people: Emp[], ref: unknown): { emp?: Emp; error?: string } {
  const r = String(ref ?? '').trim();
  if (!r) return { error: 'Say who.' };
  if (UUID_RE.test(r)) {
    const e = people.find((p) => p.id === r);
    return e ? { emp: e } : { error: 'That person is not on your team.' };
  }
  const live = people.filter((p) => lc(p.status) !== 'archived');
  const exact = live.filter((p) => lc(p.name) === lc(r));
  if (exact.length === 1) return { emp: exact[0] };
  const part = live.filter((p) => lc(p.name).includes(lc(r)));
  if (part.length === 1) return { emp: part[0] };
  if (part.length > 1) return { error: `More than one person matches "${r}": ${part.slice(0, 5).map((p) => p.name).join(', ')}. Which one?` };
  return { error: `Nobody on the team is called "${r}".` };
}

async function pickJob(ctx: ActionCtx, ref: unknown): Promise<{ job?: { id: string; title: string; location: string | null }; error?: string }> {
  const r = String(ref ?? '').trim();
  if (!r) return { error: 'Say which job.' };
  const base = () =>
    ctx.caller.from('employer_jobs').select('id, title, location').eq('user_id', ctx.firmId).is('archived_at', null).neq('status', 'Cancelled');
  if (UUID_RE.test(r)) {
    const { data } = await base().eq('id', r).maybeSingle();
    return data ? { job: data } : { error: 'That job is not on your books.' };
  }
  const { data: exact } = await base().ilike('title', likeEscape(r)).limit(2);
  if (exact?.length === 1) return { job: exact[0] };
  const { data: part } = await base().ilike('title', `%${likeEscape(r)}%`).limit(6);
  if (part?.length === 1) return { job: part[0] };
  if ((part?.length ?? 0) > 1) return { error: `More than one job matches "${r}": ${part!.map((j: { title: string }) => j.title).join(', ')}. Which one?` };
  // People say "the Orchard Close CU job" for "Consumer unit upgrade, 14 Orchard Close":
  // match every meaningful word, in any order, against the title and address.
  const words = lc(r).replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !['the', 'job', 'one', 'for', 'and', 'next'].includes(w));
  if (words.length) {
    const { data: all } = await base().limit(500);
    const hits = ((all ?? []) as { id: string; title: string; location: string | null }[]).filter((j) => {
      const hay = lc(`${j.title} ${j.location ?? ''}`);
      return words.every((w) => hay.includes(w));
    });
    if (hits.length === 1) return { job: hits[0] };
    if (hits.length > 1) return { error: `More than one job matches "${r}": ${hits.slice(0, 6).map((j) => j.title).join(', ')}. Which one?` };
  }
  return { error: `No open job called "${r}".` };
}

async function myName(ctx: ActionCtx): Promise<string | null> {
  const { data } = await ctx.caller.from('profiles').select('full_name').eq('id', ctx.userId).maybeSingle();
  return (data?.full_name as string | null) || ctx.userEmail || null;
}

async function audit(ctx: ActionCtx, action: string, entity: string, entityId: string | null, detail: Record<string, unknown>) {
  try {
    await ctx.admin.from('employer_audit_log').insert({
      employer_id: ctx.firmId,
      actor_id: ctx.userId,
      action,
      entity,
      entity_id: entityId && UUID_RE.test(entityId) ? entityId : null,
      detail: { ...detail, via: 'mate' },
    });
  } catch {
    /* non-fatal, as logAudit */
  }
}

/**
 * One token, one run — atomically. The nonce is inserted into
 * mate_action_nonces (primary key) BEFORE the action runs, so two confirms of
 * the same card racing on different servers can't both act: the second insert
 * hits the key and is told it was already done.
 */
export async function claimNonce(ctx: ActionCtx, nonce: string, action: string): Promise<boolean> {
  const { error } = await ctx.admin
    .from('mate_action_nonces')
    .insert({ nonce, user_id: ctx.userId, action });
  if (!error) return true;
  if ((error as { code?: string }).code === '23505') return false;
  // Unexpected failure: refuse rather than risk running twice.
  return false;
}

async function makeCard(
  ctx: ActionCtx,
  action: string,
  args: Record<string, unknown>,
  c: Omit<ConfirmCard, 'card' | 'token' | 'action' | 'expires_at'>
): Promise<PreviewOutcome> {
  const { token, payload } = await signAction(ctx.secret, { k: 'confirm', t: action, a: args, u: ctx.userId, f: ctx.firmId });
  const card: ConfirmCard = { card: 'confirm', token, action, expires_at: new Date(payload.e).toISOString(), ...c };
  const summary = [c.title, ...c.lines.map((l) => `${l.label}: ${l.value}`), ...c.warnings.map((w) => `Note: ${w}`)].join('; ');
  return {
    card,
    note:
      `A confirmation card is now on the user's screen: ${summary}. NOTHING HAS CHANGED YET. ` +
      'In one or two short sentences, point them to the card (mention any clash or note on it) and say to tap Confirm, or Cancel. Never say it is done.',
  };
}
const refuse = (note: string): PreviewOutcome => ({ note: `Not offered: ${note} Tell the user plainly, nothing was changed.` });

// ── Timesheet flags: the same checks as the Timesheets page ────────────────
const LONG_DAY_HOURS = 10;
const NO_BREAK_HOURS = 6;
const FAR_FROM_SITE_M = 500;
const FLAG_MAX_ACCURACY_M = 200;

// deno-lint-ignore no-explicit-any
type Row = Record<string, any>;

function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6_371_000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}
function farFromSite(t: Row, job: Row | undefined): boolean {
  if (!job || job.lat == null || job.lng == null) return false;
  return (['clock_in', 'clock_out'] as const).some((w) => {
    const acc = t[`${w}_accuracy_m`];
    if (acc == null || Number(acc) >= FLAG_MAX_ACCURACY_M) return false;
    if (t[`${w}_location_status`] !== 'captured' || t[`${w}_lat`] == null || t[`${w}_lng`] == null) return false;
    return haversineM(Number(t[`${w}_lat`]), Number(t[`${w}_lng`]), Number(job.lat), Number(job.lng)) > FAR_FROM_SITE_M;
  });
}
const isLive = (t: Row) => !!t.clock_in && !t.clock_out;

/** Flags for each pending row, using the person's other settled entries and the jobs' quoted hours. */
async function timesheetFlags(ctx: ActionCtx, rows: Row[]): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  if (!rows.length) return out;
  const empIds = [...new Set(rows.map((r) => r.employee_id))];
  const dates = rows.map((r) => ymd(r.date)).sort();
  const jobIds = [...new Set(rows.map((r) => r.job_id).filter(Boolean))];
  const [{ data: sameDays }, { data: jobs }, { data: jobRows }, { data: rates }] = await Promise.all([
    ctx.caller
      .from('employer_timesheets')
      .select('id, employee_id, date, total_hours, clock_in, clock_out, status')
      .in('employee_id', empIds)
      .gte('date', dates[0])
      .lte('date', dates[dates.length - 1])
      .neq('status', 'Rejected')
      .limit(2000),
    jobIds.length
      ? ctx.caller.from('employer_jobs').select('id, lat, lng, quoted_hours').in('id', jobIds)
      : Promise.resolve({ data: [] }),
    jobIds.length
      ? ctx.caller.from('employer_timesheets').select('job_id, total_hours, clock_in, clock_out').in('job_id', jobIds).neq('status', 'Rejected').limit(5000)
      : Promise.resolve({ data: [] }),
    ctx.canSeeMoney
      ? ctx.caller.from('employer_employees').select('id, hourly_rate').in('id', empIds)
      : Promise.resolve({ data: [] }),
  ]);
  const dayTotal = new Map<string, number>();
  ((sameDays ?? []) as Row[]).filter((t) => !isLive(t)).forEach((t) => {
    const k = `${t.employee_id}|${ymd(t.date)}`;
    dayTotal.set(k, (dayTotal.get(k) ?? 0) + (Number(t.total_hours) || 0));
  });
  const jobById = new Map(((jobs ?? []) as Row[]).map((j) => [j.id, j]));
  const jobHours = new Map<string, number>();
  ((jobRows ?? []) as Row[]).filter((t) => !isLive(t)).forEach((t) => jobHours.set(t.job_id, (jobHours.get(t.job_id) ?? 0) + (Number(t.total_hours) || 0)));
  const rate = new Map(((rates ?? []) as Row[]).map((e) => [e.id, Number(e.hourly_rate) || 0]));
  rows.forEach((t) => {
    const list: string[] = [];
    const day = dayTotal.get(`${t.employee_id}|${ymd(t.date)}`) ?? 0;
    if (day > LONG_DAY_HOURS) list.push(`${day.toFixed(1)}h day`);
    if ((Number(t.total_hours) || 0) > NO_BREAK_HOURS && !Number(t.break_minutes)) list.push('No break');
    if (isWeekend(t.date)) list.push('Weekend');
    if (!t.job_id) list.push('No job');
    const job = t.job_id ? jobById.get(t.job_id) : undefined;
    if (farFromSite(t, job)) list.push('Far from site');
    const q = Number(job?.quoted_hours);
    const used = t.job_id ? jobHours.get(t.job_id) ?? 0 : 0;
    if (q > 0 && used > q) list.push(`Over quote ${Math.round(used * 10) / 10}/${q}h`);
    if (ctx.canSeeMoney && !(rate.get(t.employee_id) ?? 0)) list.push('No rate');
    if (list.length) out.set(t.id, list);
  });
  return out;
}

const TS_COLS =
  'id, employee_id, date, clock_in, clock_out, break_minutes, total_hours, status, job_id, clock_in_lat, clock_in_lng, clock_in_accuracy_m, clock_in_location_status, clock_out_lat, clock_out_lng, clock_out_accuracy_m, clock_out_location_status, employer_jobs(title)';

// ── Previews ───────────────────────────────────────────────────────────────
export async function previewAction(ctx: ActionCtx, name: string, rawArgs: Record<string, unknown>): Promise<PreviewOutcome> {
  if (MONEY_ACTIONS.has(name) && !ctx.canSeeMoney) {
    return refuse(
      `Marking expenses paid is for the owner or an admin. As ${ctx.role === 'office' ? 'the office manager' : 'a ' + ctx.role} you can approve or reject claims, and the owner or an admin pays them from Expenses.`
    );
  }
  if (MANAGER_ACTIONS.has(name) && !MANAGER_ROLES.has(ctx.role)) return refuse(managerRefusal(ctx.role));
  try {
    switch (name) {
      case 'approve_timesheets':
        return await previewApproveTimesheets(ctx, rawArgs);
      case 'send_back_timesheet':
        return await previewSendBack(ctx, rawArgs);
      case 'decide_leave':
        return await previewDecideLeave(ctx, rawArgs);
      case 'decide_expense':
        return await previewDecideExpense(ctx, rawArgs);
      case 'mark_expenses_paid':
        return await previewMarkPaid(ctx, rawArgs);
      case 'chase_team_invite':
        return await previewChaseInvite(ctx, rawArgs);
      case 'book_person_on_job':
        return await previewBooking(ctx, rawArgs);
      case 'send_team_message':
        return await previewMessage(ctx, rawArgs);
      case 'chase_signature':
        return await previewChaseSignature(ctx, rawArgs);
      case 'reschedule_job':
        return await previewReschedule(ctx, rawArgs);
      case 'send_pack_to_worker':
        return await previewSendPack(ctx, rawArgs);
    }
    return refuse('Unknown action.');
  } catch (e) {
    return refuse(`Could not check that: ${e instanceof Error ? e.message : 'unknown error'}.`);
  }
}

async function previewApproveTimesheets(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const people = await firmPeople(ctx);
  const firmIds = people.map((p) => p.id);
  if (!firmIds.length) return refuse('There is nobody on the team.');
  const ids = (Array.isArray(a.ids) ? a.ids : []).map(String).filter((x) => UUID_RE.test(x));
  const named = new Set((Array.isArray(a.include_flagged_ids) ? a.include_flagged_ids : []).map(String));
  let q = ctx.caller.from('employer_timesheets').select(TS_COLS).eq('status', 'Pending').in('employee_id', firmIds);
  let who: Emp | undefined;
  if (ids.length) {
    q = q.in('id', ids);
  } else {
    const pick = pickPerson(people, a.person);
    if (!pick.emp) return refuse(pick.error ?? 'Say whose timesheets.');
    who = pick.emp;
    q = q.eq('employee_id', who.id);
  }
  const { data, error } = await q.order('date', { ascending: true }).limit(400);
  if (error) return refuse(`Couldn't read the timesheets (${error.message}).`);
  const rows = (data ?? []) as Row[];
  if (!rows.length) return refuse(who ? `${who.name} has nothing waiting for approval.` : 'None of those entries are waiting for approval.');
  const flags = await timesheetFlags(ctx, rows.filter((r) => !isLive(r)));
  const live = rows.filter(isLive);
  const flagged = rows.filter((r) => !isLive(r) && flags.has(r.id) && !named.has(r.id));
  const approve = rows.filter((r) => !isLive(r) && (!flags.has(r.id) || named.has(r.id)));
  const nameOf = new Map(people.map((p) => [p.id, p.name]));
  const describe = (r: Row) => `${dayLabel(r.date)} ${hrs(Number(r.total_hours) || 0)}${r.employer_jobs?.title ? ` ${r.employer_jobs.title}` : ''}`;
  const warnings: string[] = [];
  if (flagged.length) {
    warnings.push(
      `${plural(flagged.length, 'flagged entry', 'flagged entries')} left for you to check: ` +
        flagged.slice(0, 4).map((r) => `${nameOf.get(r.employee_id)} ${describe(r)} (${flags.get(r.id)!.join(', ')})`).join('; ') +
        (flagged.length > 4 ? ` and ${flagged.length - 4} more` : '')
    );
  }
  if (live.length) warnings.push(`${plural(live.length, 'entry is', 'entries are')} still clocked in, so not approved.`);
  if (ids.length && rows.length < ids.length) warnings.push(`${ids.length - rows.length} of the entries asked for are already decided or not on your team.`);
  if (!approve.length) {
    return refuse(`nothing clean to approve. ${warnings.join(' ')} Flagged entries need the user to name them, or to check them on the Timesheets page.`);
  }
  const byPerson = new Map<string, Row[]>();
  approve.forEach((r) => byPerson.set(r.employee_id, [...(byPerson.get(r.employee_id) ?? []), r]));
  const lines: CardLine[] = [...byPerson.entries()].map(([id, rs]) => ({
    label: nameOf.get(id) ?? 'Team member',
    value: `${plural(rs.length, 'entry', 'entries')}, ${hrs(rs.reduce((s, r) => s + (Number(r.total_hours) || 0), 0))} (${rangeLabel(rs[0].date, rs[rs.length - 1].date)})`,
  }));
  const overridden = approve.filter((r) => flags.has(r.id));
  overridden.forEach((r) =>
    lines.push({ label: 'Flagged, approving as you asked', value: `${nameOf.get(r.employee_id)} ${describe(r)} (${flags.get(r.id)!.join(', ')})` })
  );
  return await makeCard(ctx, 'approve_timesheets', { ids: approve.map((r) => r.id) }, {
    title: `Approve ${plural(approve.length, 'timesheet entry', 'timesheet entries')}`,
    lines,
    warnings,
    undo: 'Mate cannot undo an approval. Approved hours go into the payroll file.',
    confirm_label: 'Approve',
  });
}

async function previewSendBack(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const id = String(a.id ?? '');
  const reason = clean(a.reason, 500);
  if (!UUID_RE.test(id)) return refuse('Give the timesheet entry id.');
  if (!reason) return refuse('A reason is needed so the worker knows what to fix. Ask the user for it.');
  const people = await firmPeople(ctx);
  const { data: t } = await ctx.caller.from('employer_timesheets').select(TS_COLS).eq('id', id).in('employee_id', people.map((p) => p.id)).maybeSingle();
  if (!t) return refuse('That entry is not on your team.');
  if (t.status !== 'Pending') return refuse(`That entry is already ${lc(t.status)}.`);
  if (isLive(t)) return refuse('They are still clocked in on that entry. Wait until they clock out.');
  const who = people.find((p) => p.id === t.employee_id)?.name ?? 'Team member';
  return await makeCard(ctx, 'send_back_timesheet', { id, reason }, {
    title: `Send back ${who}'s entry`,
    lines: [
      { label: 'Entry', value: `${dayLabel(t.date)}, ${hrs(Number(t.total_hours) || 0)}${t.employer_jobs?.title ? `, ${t.employer_jobs.title}` : ''}` },
      { label: 'Reason they will see', value: reason },
    ],
    warnings: [],
    undo: 'Mate cannot undo this. They fix it and send it back to you.',
    confirm_label: 'Send back',
  });
}

/** The Leave page's clash check: who else is off, and jobs they are booked on with nobody else. */
async function leaveClashes(ctx: ActionCtx, lr: Row, people: Emp[]): Promise<string[]> {
  const start = ymd(lr.start_date);
  const end = lr.half_day ? start : ymd(lr.end_date);
  const days: string[] = [];
  for (let d = start; d <= end && days.length < 400; d = addDays(d, 1)) if (!isWeekend(d)) days.push(d);
  if (!days.length) return [];
  const ids = people.map((p) => p.id);
  const nameOf = new Map(people.map((p) => [p.id, p.name]));
  const [{ data: leave }, { data: asg }] = await Promise.all([
    ctx.caller.from('employer_leave_requests').select('id, employee_id, employee_name, start_date, end_date, half_day, status')
      .in('employee_id', ids).lte('start_date', end).gte('end_date', start).limit(500),
    ctx.caller.from('employer_job_assignments').select('id, job_id, employee_id, start_date, end_date, status, job:employer_jobs(title)')
      .in('employee_id', ids).lte('start_date', end).limit(1000),
  ]);
  const off = ((leave ?? []) as Row[]).filter((o) => o.id !== lr.id && ['approved', 'pending'].includes(lc(o.status)));
  const covers = (o: Row, k: string) => ymd(o.start_date) <= k && (o.half_day ? ymd(o.start_date) : ymd(o.end_date)) >= k;
  const others = new Map<string, { name: string; status: string }>();
  off.filter((o) => o.employee_id !== lr.employee_id && days.some((k) => covers(o, k))).forEach((o) => {
    const prev = others.get(o.employee_id);
    others.set(o.employee_id, { name: o.employee_name || nameOf.get(o.employee_id) || 'Someone', status: prev?.status === 'approved' ? 'approved' : lc(o.status) });
  });
  const ACTIVE = (s: unknown) => !['declined', 'removed', 'completed', 'cancelled', 'ended'].includes(lc(s));
  const live = ((asg ?? []) as Row[]).filter((x) => ACTIVE(x.status));
  const approvedOff = (emp: string, k: string) => off.some((o) => o.employee_id === emp && lc(o.status) === 'approved' && covers(o, k));
  const jobs = new Map<string, { title: string; days: string[]; uncovered: string[] }>();
  live.filter((x) => x.employee_id === lr.employee_id).forEach((x) => {
    days.forEach((k) => {
      if (ymd(x.start_date) > k || (x.end_date && ymd(x.end_date) < k)) return;
      const e = jobs.get(x.job_id) ?? { title: String(x.job?.title ?? 'a job'), days: [] as string[], uncovered: [] as string[] };
      if (e.days.includes(k)) return;
      e.days.push(k);
      const cover = live.filter((b) => b.job_id === x.job_id && b.employee_id !== lr.employee_id && ymd(b.start_date) <= k && (!b.end_date || ymd(b.end_date) >= k) && !approvedOff(b.employee_id, k));
      if (!cover.length) e.uncovered.push(k);
      jobs.set(x.job_id, e);
    });
  });
  const out: string[] = [];
  const alsoOff = [...others.values()];
  if (alsoOff.length) out.push(`Also off: ${alsoOff.map((o) => `${o.name}${o.status === 'pending' ? ' (asked, not decided)' : ''}`).join(', ')}.`);
  for (const j of jobs.values()) {
    out.push(
      j.uncovered.length
        ? `${j.title} has nobody else on ${j.uncovered.slice(0, 3).map(dayLabel).join(', ')}${j.uncovered.length > 3 ? ` and ${j.uncovered.length - 3} more days` : ''}.`
        : `Booked on ${j.title} those days; others are on it too.`
    );
  }
  return out;
}

async function previewDecideLeave(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const id = String(a.id ?? '');
  const decision = a.decision === 'decline' ? 'decline' : a.decision === 'approve' ? 'approve' : null;
  const reason = clean(a.reason, 500);
  if (!UUID_RE.test(id) || !decision) return refuse('Give the leave request id and approve or decline.');
  if (decision === 'decline' && !reason) return refuse('Declining needs a reason in their words so the worker knows why. Ask the user for it.');
  const people = await firmPeople(ctx);
  const { data: lr } = await ctx.caller.from('employer_leave_requests').select('*').eq('id', id).in('employee_id', people.map((p) => p.id)).maybeSingle();
  if (!lr) return refuse('That leave request is not on your team.');
  if (lc(lr.status) !== 'pending') return refuse(`That request is already ${lc(lr.status)}.`);
  const who = lr.employee_name || people.find((p) => p.id === lr.employee_id)?.name || 'Team member';
  const clashes = await leaveClashes(ctx, lr, people);
  const lines: CardLine[] = [
    { label: 'Who', value: who },
    { label: 'Leave', value: `${lr.type || 'Leave'}, ${lr.half_day ? `${dayLabel(lr.start_date)} (half day, ${String(lr.half_day).toUpperCase()})` : rangeLabel(lr.start_date, lr.end_date)}${lr.total_days != null ? `, ${plural(Number(lr.total_days), 'day')}` : ''}` },
  ];
  if (decision === 'decline') lines.push({ label: 'Reason they will see', value: reason });
  const warnings = decision === 'approve'
    ? clashes.length ? clashes : ['No clashes: nobody else is off and they are not booked on a job those days.']
    : [];
  return await makeCard(ctx, 'decide_leave', decision === 'decline' ? { id, decision, reason } : { id, decision }, {
    title: `${decision === 'approve' ? (clashes.length ? 'Approve anyway' : 'Approve') : 'Decline'} ${who}'s leave`,
    lines,
    warnings,
    undo: 'Mate cannot undo a leave decision. Change it on the Leave page if you need to.',
    confirm_label: decision === 'approve' ? (clashes.length ? 'Approve anyway' : 'Approve') : 'Decline',
  });
}

async function previewDecideExpense(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const id = String(a.id ?? '');
  const decision = a.decision === 'reject' ? 'reject' : a.decision === 'approve' ? 'approve' : null;
  const reason = clean(a.reason, 500);
  if (!UUID_RE.test(id) || !decision) return refuse('Give the expense claim id and approve or reject.');
  if (decision === 'reject' && !reason) return refuse('Rejecting needs a reason so they know what to fix. Ask the user for it.');
  const people = await firmPeople(ctx);
  const { data: c } = await ctx.caller.from('employer_expense_claims')
    .select('id, employee_id, category, description, amount, status, submitted_date, incurred_on, receipt_url, mileage_miles')
    .eq('id', id).in('employee_id', people.map((p) => p.id)).maybeSingle();
  if (!c) return refuse('That claim is not on your team.');
  if (c.status !== 'Pending') return refuse(`That claim is already ${lc(c.status)}.`);
  const who = people.find((p) => p.id === c.employee_id)?.name ?? 'Team member';
  const lines: CardLine[] = [
    { label: 'Who', value: who },
    { label: 'Claim', value: `${c.category || 'Expense'}${c.description ? `: ${String(c.description).slice(0, 120)}` : ''}${c.mileage_miles ? ` (${c.mileage_miles} miles)` : ''}` },
    { label: 'Date', value: dayLabel(c.incurred_on || c.submitted_date) },
  ];
  if (ctx.canSeeMoney) lines.push({ label: 'Amount', value: gbp(c.amount) });
  if (decision === 'reject') lines.push({ label: 'Reason they will see', value: reason });
  const warnings = decision === 'approve' && !c.receipt_url && !c.mileage_miles ? ['No receipt attached.'] : [];
  return await makeCard(ctx, 'decide_expense', decision === 'reject' ? { id, decision, reason } : { id, decision }, {
    title: `${decision === 'approve' ? 'Approve' : 'Reject'} ${who}'s expense`,
    lines,
    warnings,
    undo: 'Mate cannot undo this decision.',
    confirm_label: decision === 'approve' ? 'Approve' : 'Reject',
  });
}

async function previewMarkPaid(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const people = await firmPeople(ctx);
  const nameOf = new Map(people.map((p) => [p.id, p.name]));
  let q = ctx.caller.from('employer_expense_claims').select('id, employee_id, amount, category').eq('status', 'Approved').in('employee_id', people.map((p) => p.id));
  const ids = (Array.isArray(a.ids) ? a.ids : []).map(String).filter((x) => UUID_RE.test(x));
  let who: Emp | undefined;
  if (ids.length) q = q.in('id', ids);
  else if (a.person) {
    const pick = pickPerson(people, a.person);
    if (!pick.emp) return refuse(pick.error ?? 'Say whose claims.');
    who = pick.emp;
    q = q.eq('employee_id', who.id);
  }
  const paidOn = typeof a.paid_on === 'string' && YMD_RE.test(a.paid_on) ? a.paid_on : todayYmd();
  const { data, error } = await q.limit(500);
  if (error) return refuse(`Couldn't read the claims (${error.message}).`);
  const rows = (data ?? []) as Row[];
  if (!rows.length) return refuse(who ? `${who.name} has no approved claims waiting to be paid.` : 'There are no approved claims waiting to be paid.');
  const by = new Map<string, Row[]>();
  rows.forEach((r) => by.set(r.employee_id, [...(by.get(r.employee_id) ?? []), r]));
  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const lines: CardLine[] = [...by.entries()].map(([id, rs]) => ({
    label: nameOf.get(id) ?? 'Team member',
    value: `${plural(rs.length, 'claim')}, ${gbp(rs.reduce((s, r) => s + (Number(r.amount) || 0), 0))}`,
  }));
  lines.push({ label: 'Total', value: gbp(total) }, { label: 'Paid on', value: dayLabel(paidOn) });
  const warnings = ids.length && rows.length < ids.length ? [`${ids.length - rows.length} of those are not approved and waiting, so they are left out.`] : [];
  return await makeCard(ctx, 'mark_expenses_paid', { ids: rows.map((r) => r.id), paid_on: paidOn }, {
    title: `Mark ${plural(rows.length, 'claim')} paid`,
    lines,
    warnings: [...warnings, 'This records the payment only. Make sure the money has gone.'],
    undo: 'Mate cannot undo this.',
    confirm_label: `Mark ${rows.length} paid`,
  });
}

async function previewChaseInvite(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const people = await firmPeople(ctx);
  const pick = pickPerson(people, a.employee);
  if (!pick.emp) return refuse(pick.error ?? 'Say who.');
  const e = pick.emp;
  if (e.user_id) return refuse(`${e.name} has already joined.`);
  if (lc(e.status) === 'archived') return refuse(`${e.name} is archived. Restore them on the Team page first.`);
  if (!e.email) return refuse(`${e.name} has no email address. Add one on the Team page, or share the team code.`);
  const { data: last } = await ctx.caller.from('employer_team_invites').select('created_at').eq('employee_id', e.id).order('created_at', { ascending: false }).limit(1);
  const lastAt = last?.[0]?.created_at as string | undefined;
  if (lastAt && Date.now() - new Date(lastAt).getTime() < 24 * 3600e3) {
    const next = new Date(new Date(lastAt).getTime() + 24 * 3600e3);
    return refuse(`An invite went to ${e.name} in the last 24 hours. They can be chased again after ${next.toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}.`);
  }
  return await makeCard(ctx, 'chase_team_invite', { employee_id: e.id }, {
    title: `Email ${e.name} a reminder to join`,
    lines: [
      { label: 'To', value: e.email },
      { label: 'Last invite', value: lastAt ? dayLabel(lastAt) : 'Not recorded' },
    ],
    warnings: [],
    undo: 'An email cannot be unsent.',
    confirm_label: 'Send reminder',
  });
}

// deno-lint-ignore no-explicit-any
async function bookingClashes(ctx: ActionCtx, empId: string, jobId: string, from: string, to: string, hours: number | null): Promise<{ clashes: string[]; workingDay: number; existing: Row | null }> {
  const { data: board } = await ctx.caller.rpc('get_dispatch_board', { p_firm: ctx.firmId, p_from: from, p_to: to });
  const b = (board ?? {}) as { assignments?: Row[]; leave?: Row[]; jobs?: Row[]; working_day_hours?: number };
  const wd = Number(b.working_day_hours) >= 1 && Number(b.working_day_hours) <= 24 ? Number(b.working_day_hours) : 8;
  const asg = b.assignments ?? [];
  const leave = b.leave ?? [];
  const titles = new Map((b.jobs ?? []).map((j) => [j.id, j.title]));
  const want = hours && hours > 0 ? hours : wd;
  const bh = (x: Row) => (Number(x.hours_per_day) > 0 ? Number(x.hours_per_day) : wd);
  const out: string[] = [];
  const seen = new Set<string>();
  for (let d = from; d <= to; d = addDays(d, 1)) {
    if (!coversDay(from, to, d)) continue;
    const l = leave.find((x) => x.employee_id === empId && ymd(x.start_date) <= d && ymd(x.end_date) >= d);
    if (l && !seen.has(`l${l.id}`)) {
      seen.add(`l${l.id}`);
      out.push(`On ${lc(l.type || 'annual')} leave ${rangeLabel(l.start_date, l.end_date)}${l.half_day ? ' (half day)' : ''}`);
    }
    const others = asg.filter((x) => x.employee_id === empId && x.job_id !== jobId && coversDay(ymd(x.start_date), ymd(x.end_date), d));
    const booked = others.reduce((s, x) => s + bh(x), 0);
    const lh = l ? (l.half_day ? wd / 2 : wd) : 0;
    if (others.length && booked + want + lh > wd) {
      for (const x of others) {
        if (seen.has(x.id)) continue;
        seen.add(x.id);
        out.push(`Already on ${titles.get(x.job_id) ?? 'another job'} ${rangeLabel(x.start_date, x.end_date)}`);
      }
    }
  }
  const { data: ex } = await ctx.caller.from('employer_job_assignments').select('id, start_date, end_date, status').eq('job_id', jobId).eq('employee_id', empId).limit(1);
  const existing = ex?.[0] && !['removed', 'cancelled'].includes(lc(ex[0].status)) ? (ex[0] as Row) : null;
  return { clashes: out, workingDay: wd, existing };
}

async function previewBooking(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const people = await firmPeople(ctx);
  const pick = pickPerson(people, a.employee);
  if (!pick.emp) return refuse(pick.error ?? 'Say who.');
  const job = await pickJob(ctx, a.job);
  if (!job.job) return refuse(job.error ?? 'Say which job.');
  const from = String(a.from ?? '');
  const to = String(a.to ?? '') || from;
  if (!YMD_RE.test(from) || !YMD_RE.test(to)) return refuse('Give the dates as YYYY-MM-DD.');
  if (to < from) return refuse('The end date is before the start date.');
  if (diffDays(to, from) > 366) return refuse('That is more than a year; book it in the Diary.');
  const startTime = typeof a.start_time === 'string' && /^\d{1,2}:\d{2}$/.test(a.start_time) ? a.start_time.padStart(5, '0') : null;
  const hours = Number(a.hours) > 0 && Number(a.hours) <= 24 ? Number(a.hours) : null;
  const notes = clean(a.notes, 500) || null;
  const { clashes, existing } = await bookingClashes(ctx, pick.emp.id, job.job.id, from, to, hours);
  const lines: CardLine[] = [
    { label: 'Who', value: pick.emp.name },
    { label: 'Job', value: `${job.job.title}${job.job.location ? `, ${job.job.location}` : ''}` },
    { label: 'When', value: rangeLabel(from, to) + (startTime ? `, from ${startTime}` : '') + (hours ? `, ${hrs(hours)} a day` : '') },
  ];
  if (notes) lines.push({ label: 'Notes', value: notes });
  const warnings = clashes.map((c) => `Clash: ${c}.`);
  if (existing) warnings.push(`${pick.emp.name} is already booked on this job ${rangeLabel(existing.start_date, existing.end_date)}. This moves that booking to the new dates.`);
  if (!pick.emp.user_id) warnings.push(`${pick.emp.name} has not joined the app yet, so they will not get the notification.`);
  return await makeCard(ctx, 'book_person_on_job', { employee_id: pick.emp.id, job_id: job.job.id, from, to, start_time: startTime, hours, notes, moves_existing: !!existing }, {
    title: `${existing ? 'Move' : 'Book'} ${pick.emp.name} on ${job.job.title}`,
    lines,
    warnings,
    undo: existing ? 'Mate cannot undo a move; change it back in the Diary.' : 'You can undo this for 15 minutes.',
    confirm_label: clashes.length ? 'Book anyway' : 'Book',
  });
}

async function previewReschedule(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const job = await pickJob(ctx, a.job);
  if (!job.job) return refuse(job.error ?? 'Say which job.');
  const start = String(a.start ?? '');
  if (!YMD_RE.test(start)) return refuse('Give the new start as YYYY-MM-DD.');
  const { data: cur } = await ctx.caller.from('employer_jobs').select('start_date, end_date').eq('id', job.job.id).maybeSingle();
  const len = cur?.start_date ? Math.max(0, diffDays(ymd(cur.end_date || cur.start_date), ymd(cur.start_date))) : 0;
  const end = YMD_RE.test(String(a.end ?? '')) ? String(a.end) : addDays(start, len);
  if (end < start) return refuse('The end date is before the start date.');
  if (start < todayYmd()) return refuse('That date has passed. Pick today or later.');
  const { data: crewRows } = await ctx.caller
    .from('employer_job_assignments')
    .select('status, employer_employees(name)')
    .eq('job_id', job.job.id);
  const crew = ((crewRows ?? []) as unknown as { status: string | null; employer_employees: { name: string | null } | null }[])
    .filter((r) => !['removed', 'cancelled', 'ended'].includes(lc(r.status ?? 'assigned')))
    .map((r) => r.employer_employees?.name)
    .filter(Boolean) as string[];
  const warnings: string[] = [];
  if (!cur?.start_date) warnings.push('The job had no dates yet; this puts it in the Diary.');
  if (isWeekend(start)) warnings.push('That starts on a weekend.');
  return await makeCard(ctx, 'reschedule_job', { job_id: job.job.id, start, end, was_start: cur?.start_date ?? null, was_end: cur?.end_date ?? null }, {
    title: `Move ${job.job.title}`,
    lines: [
      { label: 'Was', value: cur?.start_date ? rangeLabel(ymd(cur.start_date), cur.end_date ? ymd(cur.end_date) : null) : 'No dates' },
      { label: 'Now', value: rangeLabel(start, end) },
      { label: 'Crew', value: crew.length ? `${crew.join(', ')} ${crew.length === 1 ? 'moves' : 'move'} with it and ${crew.length === 1 ? 'gets' : 'get'} the update` : 'Nobody booked yet' },
    ],
    warnings,
    undo: 'Move it back in the Diary if you change your mind.',
    confirm_label: 'Move the job',
  });
}

async function previewMessage(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const title = clean(a.title, 200);
  const body = cleanBody(a.body, 8000);
  if (!title || !body) return refuse('A message needs a title and the words to send.');
  const audience = a.audience === 'job' ? 'job' : a.audience === 'people' ? 'people' : a.audience === 'all' ? 'all' : null;
  if (!audience) return refuse('Say who it goes to: everyone, a job\'s crew or named people.');
  const kind = ['announcement', 'message', 'alert'].includes(String(a.kind)) ? String(a.kind) : 'announcement';
  const people = (await firmPeople(ctx)).filter((p) => lc(p.status) === 'active');
  let to = '';
  let count = 0;
  const args: Record<string, unknown> = { audience, title, body, kind, requires_ack: a.requires_ack === true, urgent: a.urgent === true };
  if (audience === 'all') {
    count = people.length;
    to = `Everyone (${plural(count, 'person', 'people')})`;
  } else if (audience === 'job') {
    const job = await pickJob(ctx, a.job);
    if (!job.job) return refuse(job.error ?? 'Say which job.');
    const { data: opts } = await ctx.caller.rpc('comms_job_options');
    count = Number(((opts ?? []) as Row[]).find((o) => o.job_id === job.job!.id)?.crew ?? 0);
    to = `${job.job.title} crew (${plural(count, 'person', 'people')})`;
    args.job_id = job.job.id;
  } else {
    const refs = Array.isArray(a.people) ? a.people : [];
    const picked: Emp[] = [];
    for (const r of refs) {
      const p = pickPerson(people, r);
      if (!p.emp) return refuse(p.error ?? 'Say who.');
      if (!picked.some((x) => x.id === p.emp!.id)) picked.push(p.emp);
    }
    count = picked.length;
    to = picked.map((p) => p.name).join(', ');
    args.employee_ids = picked.map((p) => p.id);
  }
  if (!count) return refuse('Nobody active would get that message.');
  const warnings = ['It goes to their phones straight away and cannot be unsent.'];
  return await makeCard(ctx, 'send_team_message', args, {
    title: `Send ${kind === 'alert' ? 'a safety alert' : kind === 'message' ? 'a message' : 'an announcement'} to ${plural(count, 'person', 'people')}`,
    lines: [
      { label: 'To', value: to },
      { label: 'Title', value: title },
      { label: 'Message', value: body },
      { label: 'Must acknowledge', value: a.requires_ack === true ? 'Yes' : 'No' },
      ...(a.urgent === true ? [{ label: 'Priority', value: 'Urgent' }] : []),
    ],
    warnings,
    undo: 'A sent message cannot be unsent. You can delete it from Communications.',
    confirm_label: `Send to ${count}`,
  });
}

async function previewChaseSignature(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const id = String(a.id ?? '');
  if (!UUID_RE.test(id)) return refuse('Give the signature request id.');
  const { data: r } = await ctx.caller.from('signature_requests')
    .select('id, user_id, document_title, document_type, signer_name, signer_email, status, revoked_at, expires_at, last_sent_at, send_count')
    .eq('id', id).eq('user_id', ctx.firmId).maybeSingle();
  if (!r) return refuse('That signature request is not on your account.');
  if (!['Pending', 'Sent', 'Viewed'].includes(r.status) || r.revoked_at) return refuse(`That request is ${lc(r.status)}, so there is nothing to chase.`);
  if (r.expires_at && new Date(r.expires_at).getTime() <= Date.now()) return refuse('That link has expired. Send a new request from Signatures.');
  if (!r.signer_email) return refuse('There is no email for the signer. Copy the link from Signatures and text it.');
  if ((r.send_count ?? 0) >= 6) return refuse('It has been emailed six times already, the most allowed. Copy the link and text it.');
  if (r.last_sent_at && Date.now() - new Date(r.last_sent_at).getTime() < 24 * 3600e3) {
    return refuse('It was emailed in the last 24 hours. It can be chased again a day after the last email.');
  }
  return await makeCard(ctx, 'chase_signature', { id, kind: (r.send_count ?? 0) > 0 || r.status !== 'Pending' ? 'chase' : 'initial' }, {
    title: `Email ${r.signer_name || 'the signer'} a reminder to sign`,
    lines: [
      { label: 'Document', value: `${r.document_type ? `${r.document_type}: ` : ''}${r.document_title || 'Document'}` },
      { label: 'To', value: r.signer_email },
      { label: 'Emails so far', value: String(r.send_count ?? 0) },
    ],
    warnings: [],
    undo: 'An email cannot be unsent.',
    confirm_label: 'Send reminder',
  });
}

/**
 * ELE-2085: send an existing RAMS / job pack to one named worker. The pack is
 * where the RAMS goes to the crew (RAMS & packs, Worker Tools Sign-offs), so
 * this reuses the pack's own send: chase_pack_signoff when they already have
 * it unsigned, else add them to the pack and send_job_pack (idempotent: only
 * people without a sign-off row get one, so nobody who already has it is sent
 * it again).
 */
async function previewSendPack(ctx: ActionCtx, a: Record<string, unknown>): Promise<PreviewOutcome> {
  const people = await firmPeople(ctx);
  const pick = pickPerson(people, a.employee);
  if (!pick.emp) return refuse(pick.error ?? 'Say who.');
  const emp = pick.emp;
  if (lc(emp.status) === 'archived') return refuse(`${emp.name} is archived, so nothing new goes to them.`);
  const job = await pickJob(ctx, a.job);
  if (!job.job) return refuse(job.error ?? 'Say which job.');
  const { data: packRows } = await ctx.caller
    .from('employer_job_packs')
    .select('id, title, status, assigned_workers, sent_to_workers_at, rams_generated, method_statement_generated, briefing_pack_generated')
    .eq('employer_id', ctx.firmId)
    .eq('job_id', job.job.id)
    .order('created_at', { ascending: false })
    .limit(20);
  let packs = (packRows ?? []) as Row[];
  if (!packs.length) return refuse(`There is no RAMS or job pack on ${job.job.title} yet. Make one in RAMS & packs first.`);
  const packRef = clean(a.pack, 200);
  if (packs.length > 1 && packRef) {
    const words = lc(packRef).split(/\s+/).filter((w) => w.length > 2);
    const hits = packs.filter((p) => words.every((w) => lc(p.title).includes(w)));
    if (hits.length) packs = hits;
  }
  if (packs.length > 1) {
    return refuse(`${job.job.title} has ${packs.length} packs: ${packs.slice(0, 6).map((p) => p.title || 'Untitled').join(', ')}. Which one?`);
  }
  const pack = packs[0];
  const { data: ackRows } = await ctx.caller
    .from('employer_job_pack_acknowledgements')
    .select('id, employee_id, acknowledged_at')
    .eq('job_pack_id', pack.id)
    .limit(500);
  const acks = (ackRows ?? []) as Row[];
  const mine = acks.find((x) => x.employee_id === emp.id);
  if (mine?.acknowledged_at) return refuse(`${emp.name} already signed ${pack.title || 'that pack'} on ${dayLabel(mine.acknowledged_at)}.`);
  const docs = [pack.rams_generated && 'RAMS', pack.method_statement_generated && 'method statement', pack.briefing_pack_generated && 'briefing']
    .filter(Boolean)
    .join(', ');
  const warnings: string[] = [];
  if (!pack.rams_generated) warnings.push('This pack has no RAMS in it yet. They will sign the pack as it stands.');
  if (!emp.user_id) {
    if (mine) return refuse(`${emp.name} has not joined the app yet, so a reminder cannot reach them. Chase their invite from Team first.`);
    warnings.push(`${emp.name} has not joined the app yet. It will be waiting for them when they do, but no notification goes now.`);
  }
  const mode = mine ? 'chase' : 'send';
  // The first send of a pack goes to everyone on it who has no sign-off row yet.
  const assigned: string[] = Array.isArray(pack.assigned_workers) ? pack.assigned_workers : [];
  const alsoGets = mode === 'send'
    ? assigned.filter((id) => id !== emp.id && !acks.some((x) => x.employee_id === id))
        .map((id) => people.find((p) => p.id === id)?.name)
        .filter(Boolean) as string[]
    : [];
  if (alsoGets.length) warnings.push(`The pack has not gone to ${alsoGets.join(', ')} yet, so they get it too.`);
  return await makeCard(ctx, 'send_pack_to_worker', {
    mode, pack_id: pack.id, employee_id: emp.id, ack_id: mine?.id ?? null, add_to_pack: !assigned.includes(emp.id),
  }, {
    title: mode === 'chase' ? `Remind ${emp.name} to sign ${pack.title || 'the pack'}` : `Send ${pack.title || 'the pack'} to ${emp.name}`,
    lines: [
      { label: 'Who', value: emp.name },
      { label: 'Job', value: `${job.job.title}${job.job.location ? `, ${job.job.location}` : ''}` },
      { label: 'Pack', value: `${pack.title || 'Job pack'}${docs ? ` (${docs})` : ''}` },
      { label: 'What happens', value: mode === 'chase' ? 'They already have it unsigned: a reminder goes to their phone.' : `It lands in their Worker Tools Sign-offs to read and sign${assigned.includes(emp.id) ? '' : ', and they are added to the pack'}.` },
    ],
    warnings,
    undo: 'A sent pack cannot be unsent. You can take them off the pack in RAMS & packs.',
    confirm_label: mode === 'chase' ? 'Send reminder' : 'Send pack',
  });
}

// ── Execute (from the user's Confirm only) ─────────────────────────────────
const result = (action: string, ok: boolean, title: string, lines: CardLine[] = [], links: CardLink[] = []): ResultCard => ({
  card: 'result', ok, action, title, lines, links,
});

async function callFn(ctx: ActionCtx, name: string, body: unknown): Promise<{ ok: boolean; data: Row | null }> {
  try {
    const r = await fetch(`${ctx.supabaseUrl}/functions/v1/${name}`, {
      method: 'POST',
      headers: { Authorization: ctx.authHeader, apikey: ctx.anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {}),
    });
    let data: Row | null = null;
    try { data = await r.json(); } catch { /* not json */ }
    return { ok: r.ok && data?.success !== false && !data?.error, data };
  } catch {
    return { ok: false, data: null };
  }
}

export async function executeAction(ctx: ActionCtx, p: ActionPayload): Promise<ResultCard> {
  const a = p.a as Row;
  const n = p.n;
  if (MONEY_ACTIONS.has(p.t) && !ctx.canSeeMoney) {
    return result(p.t, false, 'Only the owner or an admin can mark expenses paid.');
  }
  if (MANAGER_ACTIONS.has(p.t) && !MANAGER_ROLES.has(ctx.role)) return result(p.t, false, managerRefusal(ctx.role));
  switch (p.t) {
    case 'approve_timesheets': {
      const ids: string[] = (a.ids ?? []).filter((x: string) => UUID_RE.test(x));
      const name = (await myName(ctx)) || 'Admin';
      const now = new Date().toISOString();
      // approvalPayload from useTimesheets.ts, Pending only, never a live clock-in.
      const { data, error } = await ctx.caller.from('employer_timesheets')
        .update({ status: 'Approved', approved_by: name, approved_by_id: ctx.userId, approved_at: now, updated_at: now })
        .in('id', ids).eq('status', 'Pending').or('clock_in.is.null,clock_out.not.is.null').select('id');
      if (error) return result(p.t, false, `Not approved: ${error.message}`);
      const done = data?.length ?? 0;
      if (!done) return result(p.t, false, 'Nothing was approved. They may already be decided, or you cannot approve them.', [], [{ label: 'Open Timesheets', section: 'timesheets', params: { tab: 'pending' } }]);
      await audit(ctx, 'approve', 'timesheet', ids.length === 1 ? ids[0] : null, { name: plural(done, 'timesheet entry', 'timesheet entries'), ids: data.map((r: Row) => r.id), nonce: n });
      return result(p.t, true, `Approved ${plural(done, 'timesheet entry', 'timesheet entries')}`,
        done < ids.length ? [{ label: 'Skipped', value: `${ids.length - done} already decided or changed since` }] : [],
        [{ label: 'Open Timesheets', section: 'timesheets', params: { tab: 'approved' } }]);
    }
    case 'send_back_timesheet': {
      // rejectionPayload from useTimesheets.ts
      const { data, error } = await ctx.caller.from('employer_timesheets')
        .update({ status: 'Rejected', approved_by: null, approved_by_id: null, approved_at: null, rejection_reason: a.reason, updated_at: new Date().toISOString() })
        .eq('id', a.id).eq('status', 'Pending').select('id');
      if (error) return result(p.t, false, `Not sent back: ${error.message}`);
      if (!data?.length) return result(p.t, false, 'Not sent back. It may already be decided, or you cannot change it.');
      await audit(ctx, 'send_back', 'timesheet', a.id, { name: 'timesheet entry', reason: a.reason, nonce: n });
      return result(p.t, true, 'Sent back to the worker', [{ label: 'Reason', value: a.reason }], [{ label: 'Open Timesheets', section: 'timesheets', params: { tab: 'pending' } }]);
    }
    case 'decide_leave': {
      const decider = (await myName(ctx)) || 'Manager';
      const now = new Date().toISOString();
      // useDecideLeave's patch, pending only.
      const patch = a.decision === 'approve'
        ? { status: 'Approved', approved_by: decider, approved_date: now }
        : { status: 'Rejected', rejected_reason: String(a.reason ?? '').trim(), approved_by: decider, approved_date: now };
      if (a.decision !== 'approve' && !patch.rejected_reason) return result(p.t, false, 'A decline needs a reason.');
      const { data, error } = await ctx.caller.from('employer_leave_requests').update(patch).eq('id', a.id).ilike('status', 'pending').select('id, employee_name');
      if (error) return result(p.t, false, `Not decided: ${error.message}`);
      if (!data?.length) return result(p.t, false, 'Someone has already decided this request, or you cannot change it.', [], [{ label: 'Open Leave', section: 'leave' }]);
      await audit(ctx, a.decision === 'approve' ? 'approve' : 'decline', 'leave', a.id, { name: data[0].employee_name ?? 'leave request', nonce: n });
      return result(p.t, true, `${a.decision === 'approve' ? 'Approved' : 'Declined'} ${data[0].employee_name ? `${data[0].employee_name}'s` : 'the'} leave`, [], [{ label: 'Open Leave', section: 'leave' }]);
    }
    case 'decide_expense': {
      const name = (await myName(ctx)) || 'Manager';
      const patch = a.decision === 'approve'
        ? { status: 'Approved', approved_by: name, approved_date: new Date().toISOString() }
        : { status: 'Rejected', approved_by: name, approved_date: new Date().toISOString(), rejection_reason: a.reason };
      const { data, error } = await ctx.caller.from('employer_expense_claims').update(patch).eq('id', a.id).eq('status', 'Pending').select('id');
      if (error) return result(p.t, false, `Not decided: ${error.message}`);
      if (!data?.length) return result(p.t, false, 'That claim is no longer pending, or you cannot change it.');
      await audit(ctx, a.decision === 'approve' ? 'approve' : 'reject', 'expense', a.id, { name: 'expense claim', nonce: n });
      return result(p.t, true, `${a.decision === 'approve' ? 'Approved' : 'Rejected'} the expense`, [], [
        { label: 'Open the claim', section: 'expenses', params: { expense: a.id } },
      ]);
    }
    case 'mark_expenses_paid': {
      const ids: string[] = (a.ids ?? []).filter((x: string) => UUID_RE.test(x));
      // bulkMarkPaidMutation: Approved only.
      const { data, error } = await ctx.caller.from('employer_expense_claims').update({ status: 'Paid', paid_date: a.paid_on }).in('id', ids).eq('status', 'Approved').select('id');
      if (error) return result(p.t, false, `Not marked paid: ${error.message}`);
      const done = data?.length ?? 0;
      if (!done) return result(p.t, false, 'Nothing was marked paid. They may have changed since.');
      await audit(ctx, 'mark_paid', 'expense', null, { name: plural(done, 'expense claim'), ids: data.map((r: Row) => r.id), paid_on: a.paid_on, nonce: n });
      return result(p.t, true, `Marked ${plural(done, 'claim')} paid`,
        done < ids.length ? [{ label: 'Skipped', value: `${ids.length - done} changed by someone else first` }] : [],
        [{ label: 'Open Expenses', section: 'expenses' }]);
    }
    case 'chase_team_invite': {
      // useChaseTeamInvite: the gate RPC records the chase, then send-team-welcome emails.
      const { error: gate } = await ctx.caller.rpc('chase_team_invite', { p_employee_id: a.employee_id });
      if (gate) return result(p.t, false, gate.message);
      const sent = await callFn(ctx, 'send-team-welcome', { employeeId: a.employee_id });
      if (!sent.ok) return result(p.t, false, String(sent.data?.error ?? 'The email did not go. Try again in a minute.'));
      await audit(ctx, 'chase', 'team_invite', a.employee_id, { name: 'invite reminder', nonce: n });
      return result(p.t, true, 'Reminder emailed', [], [{ label: 'Open Team', section: 'team', params: { tab: 'invited' } }]);
    }
    case 'book_person_on_job': {
      // useDispatchAssign: the same RPC (the notify_assignment trigger sends the bell and push).
      const { data, error } = await ctx.caller.rpc('dispatch_assign', {
        p_job: a.job_id, p_employee: a.employee_id, p_start: a.from, p_end: a.to,
        p_start_time: a.start_time || null, p_hours: a.hours ?? null, p_notes: a.notes || null,
      });
      if (error) return result(p.t, false, error.message);
      const asgId = String(data ?? '');
      await audit(ctx, a.moves_existing ? 'move' : 'book', 'assignment', asgId, { name: 'diary booking', job_id: a.job_id, employee_id: a.employee_id, from: a.from, to: a.to, nonce: n });
      const card = result(p.t, true, a.moves_existing ? 'Booking moved' : 'Booked', [{ label: 'When', value: rangeLabel(a.from, a.to) }], [
        { label: 'Open Diary', section: 'diary' },
      ]);
      if (!a.moves_existing && UUID_RE.test(asgId)) {
        const u = await signAction(ctx.secret, { k: 'undo', t: 'book_person_on_job', a: { assignment_id: asgId, job_id: a.job_id, employee_id: a.employee_id }, u: ctx.userId, f: ctx.firmId, ttlMs: UNDO_TTL_MS });
        card.undo_token = u.token;
        card.undo_until = new Date(u.payload.e).toISOString();
      }
      return card;
    }
    case 'send_team_message': {
      // sendMessage in teamCommsService.ts
      const { data, error } = await ctx.caller.rpc('comms_send', {
        p_title: a.title, p_body: a.body, p_type: a.kind, p_priority: a.urgent ? 'high' : 'normal',
        p_audience: a.audience, p_job_id: a.audience === 'job' ? a.job_id : null,
        p_employee_ids: a.audience === 'people' ? a.employee_ids : null,
        p_requires_ack: !!a.requires_ack, p_pinned: false, p_attachments: [],
      });
      if (error) return result(p.t, false, `Not sent: ${error.message}`);
      const id = String(data ?? '');
      await audit(ctx, 'send', 'communication', id, { name: a.title, audience: a.audience, nonce: n });
      return result(p.t, true, 'Message sent', [{ label: 'Title', value: a.title }], [
        { label: 'Open the message', section: 'comms', params: UUID_RE.test(id) ? { thread: id } : {} },
      ]);
    }
    case 'reschedule_job': {
      // useRescheduleJob: the same RPC the Diary drag uses; bookings move with
      // the job and the crew get the batched diary update.
      const { error } = await ctx.caller.rpc('reschedule_job', { p_job: a.job_id, p_start: a.start, p_end: a.end });
      if (error) return result(p.t, false, error.message);
      await audit(ctx, 'move', 'job', a.job_id, { name: 'job dates', from: a.was_start, to: a.start, end: a.end, nonce: n });
      return result(p.t, true, 'Job moved', [{ label: 'Now', value: rangeLabel(a.start, a.end) }], [
        { label: 'Open Diary', section: 'diary' },
        { label: 'Open the job', section: 'jobs', params: { job: a.job_id } },
      ]);
    }
    case 'send_pack_to_worker': {
      const links: CardLink[] = [{ label: 'Open the pack', section: 'jobpacks', params: { pack: a.pack_id } }];
      if (a.mode === 'chase') {
        // ViewJobPackSheet chaseOne: the same RPC (worker_notify pushes the reminder).
        const { data, error } = await ctx.caller.rpc('chase_pack_signoff', { p_ack_id: a.ack_id });
        const err = error?.message ?? (data as Row | null)?.error;
        if (err) {
          const why = err === 'already_signed' ? 'They have signed it since.' : err === 'worker_not_linked' ? 'They have not joined the app yet.' : String(err);
          return result(p.t, false, `Reminder not sent. ${why}`, [], links);
        }
        await audit(ctx, 'chase', 'job_pack_signoff', a.ack_id, { name: 'pack sign-off reminder', job_pack_id: a.pack_id, employee_id: a.employee_id, nonce: n });
        return result(p.t, true, 'Reminder sent', [], links);
      }
      // ViewJobPackSheet: add them to the pack, then send_job_pack (the
      // sign-off row's INSERT trigger pushes "Job pack to sign").
      const { data: cur, error: readErr } = await ctx.caller
        .from('employer_job_packs').select('id, assigned_workers').eq('id', a.pack_id).eq('employer_id', ctx.firmId).maybeSingle();
      if (readErr || !cur) return result(p.t, false, 'That pack is no longer there, or you cannot change it.');
      const assigned: string[] = Array.isArray(cur.assigned_workers) ? cur.assigned_workers : [];
      if (!assigned.includes(a.employee_id)) {
        const { error: upErr } = await ctx.caller
          .from('employer_job_packs').update({ assigned_workers: [...assigned, a.employee_id] }).eq('id', a.pack_id).select('id');
        if (upErr) return result(p.t, false, `Not sent: ${upErr.message}`, [], links);
      }
      const { data, error } = await ctx.caller.rpc('send_job_pack', { p_pack_id: a.pack_id });
      const err = error?.message ?? (data as Row | null)?.error;
      if (err) return result(p.t, false, `Not sent: ${err === 'not_found' ? 'that pack is not on your account.' : err}`, [], links);
      await audit(ctx, 'send', 'job_pack', a.pack_id, { name: 'job pack to worker', employee_id: a.employee_id, added_to_pack: !assigned.includes(a.employee_id), new_signoffs: (data as Row | null)?.new_signoffs ?? null, nonce: n });
      return result(p.t, true, 'Pack sent', [{ label: 'Sign-offs created', value: String((data as Row | null)?.new_signoffs ?? 1) }], links);
    }
    case 'chase_signature': {
      // useChaseSignatureRequest: send-signature-request gates through record_signature_send as the caller.
      const sent = await callFn(ctx, 'send-signature-request', { signatureRequestId: a.id, kind: a.kind });
      if (!sent.ok) return result(p.t, false, String(sent.data?.error ?? 'The reminder did not send. Copy the link instead.'));
      await audit(ctx, 'chase', 'signature_request', a.id, { name: 'signature reminder', nonce: n });
      return result(p.t, true, 'Reminder emailed', [], [{ label: 'Open the request', section: 'signatures', params: { request: a.id } }]);
    }
  }
  return result(p.t, false, 'Unknown action.');
}

/** Undo: only what the app itself can reverse. Today that is a new Diary booking. */
export async function undoAction(ctx: ActionCtx, p: ActionPayload): Promise<ResultCard> {
  const a = p.a as Row;
  if (p.t !== 'book_person_on_job') return result(p.t, false, 'That cannot be undone.');
  const { data: asg } = await ctx.caller.from('employer_job_assignments').select('id, job_id, employee_id').eq('id', a.assignment_id).maybeSingle();
  if (!asg || asg.job_id !== a.job_id || asg.employee_id !== a.employee_id) return result(p.t, false, 'That booking has already changed or gone.');
  const { error } = await ctx.caller.rpc('dispatch_unassign', { p_assignment: a.assignment_id });
  if (error) return result(p.t, false, error.message);
  await audit(ctx, 'undo', 'assignment', a.assignment_id, { name: 'diary booking', nonce: p.n });
  return result(p.t, true, 'Booking taken off', [], [{ label: 'Open Diary', section: 'diary' }]);
}
