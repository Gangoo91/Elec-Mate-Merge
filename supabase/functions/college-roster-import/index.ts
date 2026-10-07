/**
 * college-roster-import — ELE-1900. A college puts its learners (or staff) on
 * Elec-Mate in one go, from the College Hub, with no Elec-Mate admin.
 *
 * Per row, matched by email (case-insensitive) so a re-run never doubles:
 *   created  no Elec-Mate account → one is made (confirmed, temporary password),
 *            the roll / staff row is linked to it, and they are emailed their login
 *            and the college's join link.
 *   matched  they already have an account → the roll / staff row is added
 *            unlinked with their email and they are emailed the join link. Opening
 *            it signed in links them (accept_college_invite matches by email). A
 *            college never attaches somebody's existing account on its own.
 *   already  already on this college's roll / staff list → nothing new; an empty
 *            cohort / course is filled in. Emailed again only with `resend`.
 *   skipped  bad or repeated email, missing name, or the person belongs to
 *            another college — with the reason.
 *   failed   tried and refused — with the reason.
 *
 * `dry_run` returns the same itemised plan without writing or sending anything.
 * `preview` returns the email the first row would get. `send_email: false`
 * does the work but sends nothing (tests, or a college that will hand out
 * logins itself).
 *
 * Who may call (decided here, never from the request): staff of the college
 * with role admin / head_of_department, or tutor for learners; or a platform
 * admin, who must name the college. The college is the caller's own; a
 * college_id in the body, or the `x-acting-college` header the College Hub
 * sends while Elec-Mate acts for a college (white-glove set-up), is honoured
 * only for a platform admin. Every real run made while acting for a college
 * the admin is not staff at is also written to that college's college_activity.
 *
 * Every non-dry run is written to college_roster_imports, row by row.
 */
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, isAdminUser } from '../_shared/caller.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { accountEmailHtml, escapeHtml } from '../_shared/account-email.ts';
import { captureException } from '../_shared/sentry.ts';

const APP_URL = 'https://app.elec-mate.com';
const FOUNDER = 'founder@elec-mate.com';
const MAX_ROWS = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ULN_RE = /^\d{10}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const STAFF_ROLES = ['admin', 'head_of_department', 'tutor', 'assessor', 'iqa', 'support'] as const;
type StaffRole = (typeof STAFF_ROLES)[number];
const ROLE_LABEL: Record<StaffRole, string> = {
  admin: 'Admin',
  head_of_department: 'Head of Department',
  tutor: 'Tutor',
  assessor: 'Assessor',
  iqa: 'IQA',
  support: 'Support',
};

type Kind = 'learners' | 'staff';
type Outcome = 'created' | 'matched' | 'already' | 'skipped' | 'failed';

interface InRow {
  index?: number;
  name?: string;
  email?: string;
  phone?: string;
  uln?: string;
  cohort_id?: string | null;
  expected_end_date?: string | null;
  role?: string;
}

interface Item {
  index: number;
  name: string;
  email: string;
  outcome: Outcome;
  detail?: string;
  /** Warnings that did not stop the row. */
  notes?: string[];
  emailed?: boolean;
  email_error?: string;
  join_code?: string | null;
  /** Only when nobody is emailed (send_email: false): the new login's
   *  temporary password, returned once to the person running the import so
   *  they can hand it over. Never written to college_roster_imports. */
  temp_password?: string;
}

interface Lookup {
  email: string;
  user_id: string | null;
  roll_id: string | null;
  roll_user_id: string | null;
  roll_cohort_id: string | null;
  roll_course_id: string | null;
  staff_id: string | null;
  staff_user_id: string | null;
  other_learner_college: string | null;
  other_staff_college: string | null;
}

// The hub sends x-acting-college while a platform admin acts for a college.
const CORS = {
  ...corsHeaders,
  'Access-Control-Allow-Headers': `${corsHeaders['Access-Control-Allow-Headers']}, x-acting-college`,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

function randomFrom(alphabet: string, n: number): string {
  const bytes = new Uint32Array(n);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < n; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/** Readable, meets the sign-up rules (upper, lower, number, 8+). */
function tempPassword(): string {
  return `${randomFrom('ABCDEFGHJKLMNPQRSTUVWXYZ', 3)}${randomFrom('abcdefghijkmnpqrstuvwxyz', 4)}-${randomFrom('23456789', 4)}`;
}

function firstName(name: string): string {
  const f = name.trim().split(/\s+/)[0] ?? '';
  return f.length > 1 ? f : '';
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  try {
    const caller = await identifyCaller(req);
    if (!caller || caller.kind !== 'user') return json({ error: 'unauthorised', message: 'Sign in first.' }, 401);

    const admin: SupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const kind: Kind = body.kind === 'staff' ? 'staff' : 'learners';
    const dryRun = body.dry_run === true;
    const previewOnly = body.preview === true;
    const sendMail = body.send_email !== false;
    const resend = body.resend === true;

    // ── Who is calling, and for which college ─────────────────────────────
    const platformAdmin = await isAdminUser(caller.userId);
    let collegeId: string | null = null;
    let callerRole: string | null = null;
    let callerName: string | null = null;
    let actingFor: string | null = null;
    {
      const { data: staffRows } = await admin
        .from('college_staff')
        .select('college_id, role, name')
        .eq('user_id', caller.userId)
        .is('archived_at', null)
        .order('created_at')
        .limit(1);
      const own = staffRows?.[0] as { college_id: string; role: string | null; name: string | null } | undefined;
      const header = (req.headers.get('x-acting-college') ?? '').trim();
      const asked =
        typeof body.college_id === 'string' && body.college_id
          ? (body.college_id as string)
          : /^[0-9a-f-]{36}$/i.test(header)
            ? header
            : null;
      actingFor = asked && platformAdmin && asked !== own?.college_id ? asked : null;
      if (asked && platformAdmin) collegeId = asked;
      else if (own) {
        collegeId = own.college_id;
        callerRole = (own.role ?? '').toLowerCase();
        callerName = own.name;
      }
    }
    if (!collegeId) return json({ error: 'no_college', message: 'You are not staff at a college.' }, 403);

    const allowed =
      platformAdmin && !callerRole
        ? true
        : kind === 'staff'
          ? ['admin', 'head_of_department'].includes(callerRole ?? '') || platformAdmin
          : ['admin', 'head_of_department', 'tutor'].includes(callerRole ?? '') || platformAdmin;
    if (!allowed)
      return json(
        {
          error: 'forbidden',
          message:
            kind === 'staff'
              ? 'Only a college admin or head of department can add staff.'
              : 'Only a tutor, head of department or college admin can add learners.',
        },
        403
      );

    const { data: college } = await admin.from('colleges').select('id, name, code').eq('id', collegeId).maybeSingle();
    if (!college) return json({ error: 'no_college', message: 'College not found.' }, 404);
    const collegeName = (college as { name: string }).name;

    // ── Rows ───────────────────────────────────────────────────────────────
    const rawRows = Array.isArray(body.rows) ? (body.rows as InRow[]) : [];
    if (rawRows.length === 0) return json({ error: 'no_rows', message: 'Paste at least one row.' }, 400);
    if (rawRows.length > MAX_ROWS)
      return json({ error: 'too_many', message: `Up to ${MAX_ROWS} rows at a time. Split the list.` }, 400);

    // Course + cohorts must be this college's.
    const courseId = typeof body.course_id === 'string' && body.course_id ? (body.course_id as string) : null;
    let courseQual: string | null = null;
    if (courseId) {
      const { data: c } = await admin
        .from('college_courses')
        .select('id, qualification_id')
        .eq('id', courseId)
        .eq('college_id', collegeId)
        .maybeSingle();
      if (!c) return json({ error: 'bad_course', message: 'That course is not in your college.' }, 400);
      courseQual = (c as { qualification_id: string | null }).qualification_id;
    }
    const { data: cohortRows } = await admin
      .from('college_cohorts')
      .select('id, name, course_id, tutor_id')
      .eq('college_id', collegeId);
    const cohorts = new Map(
      ((cohortRows ?? []) as Array<{ id: string; name: string; course_id: string | null; tutor_id: string | null }>).map((c) => [c.id, c])
    );

    const items: Item[] = [];
    const seen = new Map<string, number>();
    type Planned = { item: Item; row: InRow; email: string; name: string; role: StaffRole; cohortId: string | null };
    const planned: Planned[] = [];

    rawRows.forEach((row, i) => {
      const index = typeof row.index === 'number' ? row.index : i;
      const name = String(row.name ?? '').trim().slice(0, 120);
      const email = String(row.email ?? '').trim().toLowerCase();
      const item: Item = { index, name, email, outcome: 'skipped' };
      const notes: string[] = [];
      if (!name) item.detail = 'Missing name';
      else if (!email) item.detail = 'Missing email';
      else if (!EMAIL_RE.test(email)) item.detail = 'Invalid email';
      else if (seen.has(email)) item.detail = `Same email as row ${(seen.get(email) ?? 0) + 1}`;
      let cohortId: string | null = null;
      let role: StaffRole = 'tutor';
      if (!item.detail) {
        seen.set(email, index);
        if (kind === 'learners') {
          if (row.cohort_id) {
            if (cohorts.has(row.cohort_id)) cohortId = row.cohort_id;
            else notes.push('Cohort not found in your college, no cohort set');
          }
          if (row.uln && !ULN_RE.test(String(row.uln).trim())) notes.push('ULN should be 10 digits');
        } else {
          const r = String(row.role ?? 'tutor').trim().toLowerCase().replace(/\s+/g, '_');
          const mapped = r === 'hod' || r === 'head' ? 'head_of_department' : r;
          if ((STAFF_ROLES as readonly string[]).includes(mapped)) role = mapped as StaffRole;
          else notes.push(`Role "${row.role}" not recognised, added as Tutor`);
          if (role === 'admin' && callerRole && callerRole !== 'admin' && !platformAdmin) {
            role = 'head_of_department';
            notes.push('Only a college admin can add another admin, added as Head of Department');
          }
        }
      }
      if (notes.length) item.notes = notes;
      items.push(item);
      if (!item.detail) planned.push({ item, row, email, name, role, cohortId });
    });

    // ── Who already exists ────────────────────────────────────────────────
    const lookups = new Map<string, Lookup>();
    if (planned.length) {
      const { data, error } = await admin.rpc('college_roster_lookup', {
        p_college: collegeId,
        p_emails: planned.map((p) => p.email),
      });
      if (error) throw new Error(`lookup failed: ${error.message}`);
      for (const l of (data ?? []) as Lookup[]) lookups.set(l.email, l);
    }

    // Decide the outcome per row (the dry run stops after this).
    type Action = 'create' | 'create_link_existing' | 'match' | 'already' | 'already_unlinked';
    const actions = new Map<Planned, Action>();
    for (const p of planned) {
      const l = lookups.get(p.email);
      const existingRow = kind === 'learners' ? l?.roll_id : l?.staff_id;
      const existingUser = kind === 'learners' ? l?.roll_user_id : l?.staff_user_id;
      if (kind === 'learners' && l?.other_learner_college) {
        p.item.detail = `Already a learner at ${l.other_learner_college}. One account links to one college.`;
        continue;
      }
      if (kind === 'staff' && l?.other_staff_college) {
        p.item.detail = `Already staff at ${l.other_staff_college}. One account belongs to one college.`;
        continue;
      }
      if (kind === 'staff' && l?.other_learner_college) {
        p.item.detail = `This email is a learner at ${l.other_learner_college}. Use a staff email.`;
        continue;
      }
      if (kind === 'learners' && l?.staff_id) {
        p.item.detail = 'This email is on your staff list. Use the learner’s own email.';
        continue;
      }
      if (kind === 'staff' && l?.roll_id) {
        p.item.detail = 'This email is on your learner roll. Use the staff member’s own email.';
        continue;
      }
      if (existingRow && existingUser) {
        p.item.outcome = 'already';
        p.item.detail = kind === 'learners' ? 'Already on your roll and linked' : 'Already on your staff list and linked';
        actions.set(p, 'already');
      } else if (existingRow && l?.user_id) {
        p.item.outcome = 'already';
        p.item.detail = 'Already on your list, waiting for them to open their join link';
        actions.set(p, 'already_unlinked');
      } else if (existingRow) {
        p.item.outcome = 'created';
        p.item.detail = dryRun ? 'On your list without a login: gets a login, linked' : 'On your list without a login: login made and linked';
        actions.set(p, 'create_link_existing');
      } else if (l?.user_id) {
        if (kind === 'learners' && !p.cohortId && !courseId) {
          p.item.detail = 'Has an Elec-Mate account: pick a course or cohort so their join link says what they are joining';
          continue;
        }
        p.item.outcome = 'matched';
        p.item.detail = dryRun
          ? 'Has an Elec-Mate account: added, and gets a link to join'
          : sendMail
            ? 'Has an Elec-Mate account: added and sent a link to join'
            : 'Has an Elec-Mate account: added. Not emailed, so give them the join code';
        actions.set(p, 'match');
      } else {
        p.item.outcome = 'created';
        p.item.detail = dryRun ? 'Gets a new login, linked to your list' : 'New login made and linked';
        actions.set(p, 'create');
      }
    }

    const summarise = () => ({
      total: items.length,
      created: items.filter((i) => i.outcome === 'created').length,
      matched: items.filter((i) => i.outcome === 'matched').length,
      already: items.filter((i) => i.outcome === 'already').length,
      skipped: items.filter((i) => i.outcome === 'skipped').length,
      failed: items.filter((i) => i.outcome === 'failed').length,
      emailed: items.filter((i) => i.emailed).length,
    });

    // ── Join codes: one per cohort (learners) or per role (staff) ─────────
    const inviteCache = new Map<string, string>();
    const joinCode = async (key: { cohortId?: string | null; role?: StaffRole }, create: boolean): Promise<string | null> => {
      const cacheKey = kind === 'learners' ? `c:${key.cohortId ?? ''}:${courseId ?? ''}` : `r:${key.role}`;
      if (inviteCache.has(cacheKey)) return inviteCache.get(cacheKey)!;
      let q = admin
        .from('college_invites')
        .select('invite_code, expires_at, max_uses, use_count')
        .eq('college_id', collegeId)
        .eq('is_active', true)
        .eq('invite_type', kind === 'learners' ? 'student' : 'staff')
        .order('created_at', { ascending: false });
      if (kind === 'learners') {
        q = key.cohortId ? q.eq('cohort_id', key.cohortId) : q.is('cohort_id', null);
        if (!key.cohortId) q = courseId ? q.eq('course_id', courseId) : q;
      } else q = q.eq('role_to_assign', key.role!);
      const { data } = await q;
      const live = ((data ?? []) as Array<{ invite_code: string; expires_at: string | null; max_uses: number | null; use_count: number }>).find(
        (r) => (!r.expires_at || new Date(r.expires_at) > new Date()) && (r.max_uses == null || r.use_count < r.max_uses)
      );
      if (live) {
        inviteCache.set(cacheKey, live.invite_code);
        return live.invite_code;
      }
      if (!create) return null;
      for (let attempt = 0; attempt < 5; attempt++) {
        const code = randomFrom(CODE_ALPHABET, 8);
        const cohort = key.cohortId ? cohorts.get(key.cohortId) : null;
        const course = courseId ?? cohort?.course_id ?? null;
        let qual: string | null = courseQual;
        if (!qual && course) {
          const { data: cc } = await admin.from('college_courses').select('qualification_id').eq('id', course).maybeSingle();
          qual = (cc as { qualification_id: string | null } | null)?.qualification_id ?? null;
        }
        const { error } = await admin.from('college_invites').insert({
          college_id: collegeId,
          invite_code: code,
          invite_type: kind === 'learners' ? 'student' : 'staff',
          role_to_assign: kind === 'staff' ? key.role : null,
          cohort_id: kind === 'learners' ? (key.cohortId ?? null) : null,
          course_id: kind === 'learners' ? course : null,
          qualification_id: kind === 'learners' ? qual : null,
          is_active: true,
          created_by: caller.userId,
        });
        if (!error) {
          inviteCache.set(cacheKey, code);
          return code;
        }
        if (!/duplicate|unique/i.test(error.message)) throw new Error(`join code: ${error.message}`);
      }
      throw new Error('could not make a join code');
    };

    // ── The email ─────────────────────────────────────────────────────────
    const { data: offerRow } = await admin
      .from('college_signup_offers')
      .select('apprentice_code')
      .eq('college_id', collegeId)
      .maybeSingle();
    const discountCode = kind === 'learners' ? ((offerRow as { apprentice_code: string | null } | null)?.apprentice_code ?? null) : null;

    const buildMail = (p: { name: string; email: string; password: string | null; code: string | null; role: StaffRole; cohortName: string | null }) => {
      const college = escapeHtml(collegeName);
      const joinUrl = p.code ? `${APP_URL}/college/join/${p.code}` : `${APP_URL}/auth/signin`;
      const who = callerName ? escapeHtml(callerName) : `your college`;
      const isStaff = kind === 'staff';
      const subject = isStaff
        ? `${collegeName} has added you to College Hub on Elec-Mate`
        : `${collegeName} has set you up on Elec-Mate`;
      const facts = [{ k: 'Email', v: escapeHtml(p.email) }];
      if (p.password) facts.push({ k: 'Temporary password', v: escapeHtml(p.password) });
      if (isStaff) facts.push({ k: 'Role', v: ROLE_LABEL[p.role] });
      else if (p.cohortName) facts.push({ k: 'Cohort', v: escapeHtml(p.cohortName) });
      if (p.code) facts.push({ k: 'Join code', v: p.code });
      const paragraphs = p.password
        ? [
            isStaff
              ? `${who} has added you to ${college}'s College Hub on Elec-Mate as ${ROLE_LABEL[p.role]}. Your account is ready: sign in with the details below and you land in the hub.`
              : `${who} has added you to ${college} on Elec-Mate, the app your college uses for your portfolio, off-the-job hours and revision. Your account is ready: sign in with the details below and you are linked to your college.`,
            'The first time you sign in, the app asks you to choose your own password.',
          ]
        : [
            isStaff
              ? `${who} has added you to ${college}'s College Hub on Elec-Mate as ${ROLE_LABEL[p.role]}. You already have an Elec-Mate account, so there is nothing new to set up.`
              : `${who} has added you to ${college} on Elec-Mate. You already have an Elec-Mate account, so there is nothing new to set up.`,
            'Open the link below, sign in with your usual email and password, and your account is linked to the college in one step.',
          ];
      if (!isStaff && discountCode) {
        paragraphs.push(
          `Your college's discount code is <strong>${escapeHtml(discountCode)}</strong>. It applies when you start your subscription on the web at app.elec-mate.com.`
        );
      }
      const html = accountEmailHtml({
        title: subject,
        eyebrow: collegeName,
        heading: isStaff ? 'Your College Hub<br>access is ready' : p.password ? 'Your Elec-Mate<br>account is ready' : 'Join your college<br>on Elec-Mate',
        firstName: firstName(p.name) || undefined,
        paragraphs,
        facts,
        button: { text: p.password ? 'Sign in and join' : 'Open my join link', url: joinUrl },
        note: {
          title: 'Not expecting this?',
          body: `${college} added this email to its ${isStaff ? 'staff list' : 'learner roll'}. If that is a mistake, ignore this email or reply and we will remove it.`,
        },
      });
      const text = [
        `${subject}`,
        '',
        p.password
          ? `Sign in at ${APP_URL}/auth/signin with ${p.email} and the temporary password ${p.password}, then open ${joinUrl}.`
          : `Open ${joinUrl} and sign in with your Elec-Mate account to join ${collegeName}.`,
        discountCode && !isStaff ? `College discount code: ${discountCode}` : '',
      ]
        .filter(Boolean)
        .join('\n');
      return { subject, html, text };
    };

    if (previewOnly) {
      const first = planned.find((p) => actions.has(p)) ?? planned[0];
      const sample = first ?? { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'tutor' as StaffRole, cohortId: null };
      const isNew = first ? actions.get(first)?.startsWith('create') ?? true : true;
      const code = await joinCode({ cohortId: sample.cohortId, role: sample.role }, false);
      const mail = buildMail({
        name: sample.name,
        email: sample.email,
        password: isNew ? 'Abc-defg-2345' : null,
        code: code ?? 'ABCD2345',
        role: sample.role,
        cohortName: sample.cohortId ? (cohorts.get(sample.cohortId)?.name ?? null) : null,
      });
      return json({ preview: { to: sample.email, subject: mail.subject, html: mail.html } });
    }

    if (dryRun) {
      return json({ dry_run: true, college: { id: collegeId, name: collegeName }, summary: summarise(), items });
    }

    // ── Do it ─────────────────────────────────────────────────────────────
    const startDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
    for (const p of planned) {
      const action = actions.get(p);
      if (!action) continue;
      const l = lookups.get(p.email);
      const cohort = p.cohortId ? cohorts.get(p.cohortId) : null;
      const rowCourse = courseId ?? cohort?.course_id ?? null;
      let password: string | null = null;
      let userId: string | null = null;
      try {
        if (action === 'already') {
          if (kind === 'learners' && l?.roll_id) {
            const patch: Record<string, unknown> = {};
            if (!l.roll_cohort_id && p.cohortId) patch.cohort_id = p.cohortId;
            if (!l.roll_course_id && rowCourse) patch.course_id = rowCourse;
            if (Object.keys(patch).length) await admin.from('college_students').update(patch).eq('id', l.roll_id);
          }
          continue;
        }
        if (action === 'already_unlinked' && !resend) continue;

        if (action === 'create' || action === 'create_link_existing') {
          password = tempPassword();
          const { data: created, error } = await admin.auth.admin.createUser({
            email: p.email,
            password,
            email_confirm: true,
            // must_change_password: the app asks for their own password on first sign-in.
            user_metadata: { created_via: 'college_roster', full_name: p.name, must_change_password: true },
          });
          if (error || !created?.user) {
            // Made between the lookup and now (or a GoTrue quirk): treat as matched.
            if (/already|registered|exists/i.test(error?.message ?? '')) {
              password = null;
              p.item.outcome = 'matched';
              p.item.detail = sendMail
                ? 'Has an Elec-Mate account: added and sent a link to join'
                : 'Has an Elec-Mate account: added. Not emailed, so give them the join code';
            } else throw new Error(error?.message ?? 'could not make the login');
          } else {
            userId = created.user.id;
            const { data: prof, error: pErr } = await admin
              .from('profiles')
              .update({
                full_name: p.name,
                role: kind === 'learners' ? 'apprentice' : 'electrician',
                onboarding_completed: true,
                college_org: collegeName,
              })
              .eq('id', userId)
              .select('id')
              .maybeSingle();
            if (pErr || !prof) throw new Error(`login made, profile not set: ${pErr?.message ?? 'no profile row'}`);
          }
        }

        // The roll / staff row.
        if (kind === 'learners') {
          const fields: Record<string, unknown> = {
            name: p.name,
            phone: p.row.phone ? String(p.row.phone).trim().slice(0, 40) : null,
            uln: p.row.uln && ULN_RE.test(String(p.row.uln).trim()) ? String(p.row.uln).trim() : null,
            expected_end_date:
              p.row.expected_end_date && ISO_DATE_RE.test(p.row.expected_end_date) ? p.row.expected_end_date : null,
          };
          if (l?.roll_id) {
            const patch: Record<string, unknown> = {};
            if (userId) patch.user_id = userId;
            if (!l.roll_cohort_id && p.cohortId) patch.cohort_id = p.cohortId;
            if (!l.roll_course_id && rowCourse) patch.course_id = rowCourse;
            if (Object.keys(patch).length) {
              const { error } = await admin.from('college_students').update(patch).eq('id', l.roll_id);
              if (error) throw new Error(`not linked to the roll: ${error.message}`);
            }
          } else {
            const { error } = await admin.from('college_students').insert({
              ...fields,
              college_id: collegeId,
              user_id: userId,
              email: p.email,
              cohort_id: p.cohortId,
              course_id: rowCourse,
              status: 'Active',
              start_date: startDate,
            });
            if (error) throw new Error(`not added to the roll: ${error.message}`);
          }
          if (userId) {
            // Same assignment row accept_college_invite writes on a join.
            let qual: string | null = courseQual;
            if (!qual && rowCourse) {
              const { data: cc } = await admin.from('college_courses').select('qualification_id').eq('id', rowCourse).maybeSingle();
              qual = (cc as { qualification_id: string | null } | null)?.qualification_id ?? null;
            }
            let tutorUser: string | null = null;
            if (cohort?.tutor_id) {
              const { data: t } = await admin.from('college_staff').select('user_id').eq('id', cohort.tutor_id).maybeSingle();
              tutorUser = (t as { user_id: string | null } | null)?.user_id ?? null;
            }
            const { data: hasA } = await admin
              .from('college_student_assignments')
              .select('id')
              .eq('student_id', userId)
              .eq('college_id', collegeId)
              .maybeSingle();
            if (!hasA) {
              await admin.from('college_student_assignments').insert({
                student_id: userId,
                college_id: collegeId,
                college_name: collegeName,
                qualification_id: qual,
                cohort_id: p.cohortId,
                cohort_name: cohort?.name ?? null,
                tutor_id: tutorUser,
                start_date: startDate,
                status: 'active',
              });
            }
          }
        } else {
          if (l?.staff_id) {
            if (userId) {
              const { error } = await admin.from('college_staff').update({ user_id: userId }).eq('id', l.staff_id);
              if (error) throw new Error(`not linked to the staff list: ${error.message}`);
            }
          } else {
            const { error } = await admin.from('college_staff').insert({
              college_id: collegeId,
              user_id: userId,
              name: p.name,
              email: p.email,
              role: p.role,
              status: 'Active',
            });
            if (error) throw new Error(`not added to the staff list: ${error.message}`);
          }
        }

        // The join link, and the email.
        const code = await joinCode({ cohortId: p.cohortId, role: p.role }, true);
        p.item.join_code = code;
        if (!sendMail && password) p.item.temp_password = password;
        if (sendMail) {
          const mail = buildMail({
            name: p.name,
            email: p.email,
            password,
            code,
            role: p.role,
            cohortName: cohort?.name ?? null,
          });
          const sent = await sendEmail({
            from: `${collegeName.replace(/[<>"]/g, '')} via Elec-Mate <${FOUNDER}>`,
            to: [p.email],
            replyTo: `Andrew Moore <${FOUNDER}>`,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
            tags: ['college-roster', kind],
          });
          if (sent.error) {
            p.item.emailed = false;
            p.item.email_error = sent.error.message || 'send failed';
          } else p.item.emailed = true;
        }
        if (action === 'already_unlinked')
          p.item.detail = sendMail ? 'Already on your list: join link sent again' : 'Already on your list, waiting for them to join';
      } catch (err) {
        p.item.outcome = 'failed';
        p.item.detail = err instanceof Error ? err.message : 'failed';
      }
    }

    const summary = summarise();
    await admin.from('college_roster_imports').insert({
      college_id: collegeId,
      run_by: caller.userId,
      kind,
      total: summary.total,
      created: summary.created,
      matched: summary.matched,
      already: summary.already,
      skipped: summary.skipped,
      failed: summary.failed,
      emailed: summary.emailed,
      // The audit trail never keeps a password.
      items: items.map(({ temp_password: _pw, ...rest }) => rest),
    });

    // White-glove: Elec-Mate acting for a college it is not staff at. The
    // college sees this in its own activity log.
    if (actingFor) {
      await admin.from('college_activity').insert({
        college_id: collegeId,
        actor_id: caller.userId,
        action: 'elec_mate_acting.roster_import',
        entity_type: 'college_roster_imports',
        details: { acting: true, kind, sent_email: sendMail, summary },
      });
    }

    return json({ dry_run: false, sent_email: sendMail, college: { id: collegeId, name: collegeName }, summary, items });
  } catch (error) {
    await captureException(error, { functionName: 'college-roster-import', requestUrl: req.url, requestMethod: req.method });
    return json({ error: 'server_error', message: error instanceof Error ? error.message : 'Something went wrong' }, 500);
  }
});
