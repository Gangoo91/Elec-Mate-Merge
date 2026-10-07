// deno-lint-ignore-file no-explicit-any
/**
 * learner-document-pdf (ELE-2017)
 *
 * Every apprentice and college document that used to be printed from the
 * browser, rendered through the PDFMonkey "Learner Record" template instead.
 *
 * POST { kind, ... } → { url, filename, cached }
 *
 *   shared_portfolio  { token }                     anyone with a live share link
 *   otj_statement     { statementId } | { token }   the apprentice, staff who can assess them, or the employer's link
 *   otj_log           { learnerId? }                the apprentice (default: me) or staff who can assess them
 *   review_record     { reviewId }    | { token }   the apprentice, college staff, or the employer's link (signed-off reviews only)
 *   witness_statement { statementId }               the apprentice or staff who can assess them (signed only)
 *   funding_pack      { studentId }                 college staff (get_learner_evidence_pack decides)
 *   transfer_pack     { learnerId? }                the apprentice or staff who can assess them
 *   audit_pack        {}                            college staff, for their own college
 *   iqa_report        {}                            college staff, for their own college
 *   quality_report    {}                            college staff: the quality dashboard's figures
 *   college_value     { month? }                    college staff: the month in numbers (get_college_value)
 *   ofsted_lens       {}                            college staff: evidence against Ofsted's evaluation areas
 *   epa_brief         { briefId } | { studentId }   the apprentice or college staff (row-level security decides)
 *   lesson_plan       { lessonPlanId }              anyone who can read the plan (row-level security decides)
 *
 * Ids from the client are only ever a request: each kind checks the caller
 * against the record (RPCs run WITH THE CALLER'S JWT, so auth.uid() is the real
 * caller) before anything is read with the service role.
 *
 * The PDF is filed in the private portfolio-exports bucket under
 * documents/<kind>/<record>/<fingerprint>.pdf and handed back as a one-hour
 * signed link. The fingerprint covers the content (not the time it was made or
 * the photo links), so asking again for an unchanged record returns the stored
 * file without rendering it again.
 *
 * Deploy with --no-verify-jwt (the token kinds have no account).
 */
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller } from '../_shared/caller.ts';
import { renderLearnerRecord } from '../_shared/learner-record-pdf.ts';
import { readOfstedSignals } from '../_shared/ofsted-signals.ts';
import { EXPORT_BUCKET, pairFacts, sha256Hex, type BuildCtx } from '../portfolio-export-pack/build.ts';
import {
  buildAuditPack,
  buildCollegeValue,
  buildEpaBrief,
  buildFundingPack,
  buildIqaReport,
  buildLessonPlan,
  buildOfstedLens,
  buildOtjLog,
  buildOtjStatement,
  buildQualityReport,
  buildReviewRecord,
  buildSharedPortfolio,
  buildTransferPack,
  buildWitnessStatement,
  type Doc,
  type Who,
} from './docs.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LINK_SECONDS = 60 * 60;
/** Fresh renders per record per hour; an unchanged record is served from storage and never counts. */
const RENDERS_PER_HOUR = 12;
const KINDS = [
  'shared_portfolio',
  'otj_statement',
  'otj_log',
  'review_record',
  'witness_statement',
  'funding_pack',
  'transfer_pack',
  'audit_pack',
  'iqa_report',
  'quality_report',
  'college_value',
  'ofsted_lens',
  'epa_brief',
  'lesson_plan',
] as const;
type Kind = (typeof KINDS)[number];

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
const deny = (msg = 'You cannot open this document.') => new HttpError(403, msg);
const notFound = (msg = 'Not found.') => new HttpError(404, msg);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    const kind = String(body.kind ?? '') as Kind;
    if (!KINDS.includes(kind)) return json({ error: 'Unknown document.' }, 400);

    const url = Deno.env.get('SUPABASE_URL')!;
    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const caller = await identifyCaller(req);
    const userId = caller?.kind === 'user' ? caller.userId : null;
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    if (token && (token.length < 16 || token.length > 200)) return json({ error: 'This link is not valid.' }, 400);

    const callerName = async (fallback: string) => {
      if (!userId) return fallback;
      const { data } = await admin.from('profiles').select('full_name').eq('id', userId).maybeSingle();
      return ((data as any)?.full_name as string)?.trim() || (caller as any)?.email || fallback;
    };
    const requireUser = () => {
      if (!userId) throw new HttpError(401, 'Sign in to download this document.');
      return userId;
    };
    const canAssess = async (learner: string) => {
      const { data, error } = await asCaller.rpc('_can_assess', { p_learner: learner });
      return !error && data === true;
    };
    const staffCollege = async (): Promise<any> => {
      const uid = requireUser();
      const { data: rows } = await admin
        .from('college_staff')
        .select('college_id, colleges(id, name, logo_url)')
        .eq('user_id', uid)
        .is('archived_at', null);
      const wanted = typeof body.collegeId === 'string' && UUID.test(body.collegeId) ? body.collegeId : null;
      const row = ((rows ?? []) as any[]).find((r) => !wanted || r.college_id === wanted) ?? null;
      if (!row?.colleges) throw deny('This is for college staff.');
      const { data: ok } = await asCaller.rpc('_review_staff_can', { p_college: row.college_id });
      if (ok !== true) throw deny('This is for college staff.');
      return row.colleges;
    };

    let doc: Doc;
    let who: Who;

    switch (kind) {
      case 'shared_portfolio': {
        if (!token) return json({ error: 'This link is not valid.' }, 400);
        const { data: share } = await admin
          .from('portfolio_shares')
          .select('id, user_id, entry_ids, portfolio_item_id, is_active, expires_at, title, description')
          .eq('token', token)
          .maybeSingle();
        if (!share || !share.is_active || (share.expires_at && new Date(share.expires_at) < new Date())) {
          throw notFound('This share link has expired or been turned off.');
        }
        who = { userId, name: 'Share link', role: 'external' };
        doc = await buildSharedPortfolio(admin, share);
        break;
      }

      case 'otj_statement': {
        let st: any = null;
        if (token) {
          const { data } = await admin.from('otj_hours_statements').select('*').eq('employer_token', token).maybeSingle();
          if (!data) throw notFound('This link is not valid.');
          st = data;
          who = { userId: null, name: data.employer_signed_name || 'Employer', role: 'employer' };
        } else {
          const uid = requireUser();
          const id = String(body.statementId ?? '');
          if (!UUID.test(id)) return json({ error: 'Unknown statement.' }, 400);
          const { data } = await admin.from('otj_hours_statements').select('*').eq('id', id).maybeSingle();
          if (!data) throw notFound('Statement not found.');
          const role = data.user_id === uid ? 'learner' : (await canAssess(data.user_id)) ? 'staff' : null;
          if (!role) throw deny();
          st = data;
          who = { userId: uid, name: await callerName(role === 'learner' ? 'The apprentice' : 'College staff'), role };
        }
        doc = await buildOtjStatement(admin, st, who);
        break;
      }

      case 'otj_log': {
        const uid = requireUser();
        const learner = body.learnerId ? String(body.learnerId) : uid;
        if (!UUID.test(learner)) return json({ error: 'Unknown learner.' }, 400);
        const role = learner === uid ? 'learner' : (await canAssess(learner)) ? 'staff' : null;
        if (!role) throw deny();
        who = { userId: uid, name: await callerName(role === 'learner' ? 'The apprentice' : 'College staff'), role };
        doc = await buildOtjLog(admin, learner, who);
        break;
      }

      case 'review_record': {
        let r: any = null;
        if (token) {
          if (token.length < 32) throw notFound('This link is not valid.');
          const { data } = await admin.from('college_tripartite_reviews').select('*').eq('employer_token', token).maybeSingle();
          if (!data || data.status === 'cancelled') throw notFound('This link is not valid.');
          // Same staleness rule as get_tripartite_review_public: a moved
          // apprentice's old employer sees nothing.
          const { data: s } = await admin.from('college_students').select('employer_id').eq('id', data.student_id).maybeSingle();
          if (data.employer_id && s?.employer_id && data.employer_id !== s.employer_id) throw notFound('This link is not valid.');
          r = data;
          who = { userId: null, name: (data.signatures as any)?.employer_name || 'Employer', role: 'employer' };
        } else {
          const uid = requireUser();
          const id = String(body.reviewId ?? '');
          if (!UUID.test(id)) return json({ error: 'Unknown review.' }, 400);
          const { data } = await admin.from('college_tripartite_reviews').select('*').eq('id', id).maybeSingle();
          if (!data || data.status === 'cancelled') throw notFound('Review not found.');
          const { data: s } = await admin.from('college_students').select('user_id').eq('id', data.student_id).maybeSingle();
          let role: Who['role'] | null = null;
          if (s?.user_id && s.user_id === uid) role = 'learner';
          else {
            const { data: ok } = await asCaller.rpc('_review_staff_can', { p_college: data.college_id });
            if (ok === true) role = 'staff';
          }
          if (!role) throw deny();
          r = data;
          who = { userId: uid, name: await callerName(role === 'learner' ? 'The apprentice' : 'College staff'), role };
        }
        if (!r.locked_at) throw new HttpError(409, 'The record is ready once the college has signed off the review.');
        doc = await buildReviewRecord(admin, r, who);
        break;
      }

      case 'witness_statement': {
        const uid = requireUser();
        const id = String(body.statementId ?? '');
        if (!UUID.test(id)) return json({ error: 'Unknown statement.' }, 400);
        const { data: w } = await admin.from('portfolio_witness_statements').select('*').eq('id', id).maybeSingle();
        if (!w) throw notFound('Statement not found.');
        const role = w.learner_id === uid ? 'learner' : (await canAssess(w.learner_id)) ? 'staff' : null;
        if (!role) throw deny();
        if (w.status !== 'signed' || !w.signed_at) throw new HttpError(409, 'The witness has not signed this statement yet.');
        who = { userId: uid, name: await callerName(role === 'learner' ? 'The apprentice' : 'College staff'), role };
        doc = await buildWitnessStatement(admin, w, who);
        break;
      }

      case 'funding_pack': {
        const uid = requireUser();
        const id = String(body.studentId ?? '');
        if (!UUID.test(id)) return json({ error: 'Unknown learner.' }, 400);
        // The database decides: _review_staff_can on the learner's college.
        const { data: pack, error } = await asCaller.rpc('get_learner_evidence_pack', { p_student: id });
        if (error || !pack) throw deny();
        const { data: col } = await admin.from('colleges').select('name, logo_url').eq('id', (pack as any).learner?.college_id).maybeSingle();
        who = { userId: uid, name: await callerName('College staff'), role: 'staff' };
        doc = buildFundingPack(pack as any, { name: col?.name ?? '', sub: 'Training provider', logo: col?.logo_url ?? '' }, who);
        break;
      }

      case 'transfer_pack': {
        const uid = requireUser();
        const learner = body.learnerId ? String(body.learnerId) : uid;
        if (!UUID.test(learner)) return json({ error: 'Unknown learner.' }, 400);
        const { data: access } = await asCaller.rpc('portfolio_export_access', { p_learner: learner });
        if (access !== 'learner' && access !== 'staff') throw deny();
        const name = await callerName(access === 'learner' ? 'The apprentice' : 'College staff');
        who = { userId: uid, name, role: access };
        const ctx: BuildCtx = {
          admin,
          asCaller,
          learnerId: learner,
          exportId: learner,
          kind: 'evidence_pack',
          access,
          requestedBy: uid,
          requestedByName: name,
          progress: async () => {},
        };
        doc = await buildTransferPack(ctx, who);
        break;
      }

      case 'audit_pack': {
        const college = await staffCollege();
        who = { userId, name: await callerName('College staff'), role: 'staff' };
        doc = await buildAuditPack(asCaller, college, who);
        break;
      }

      case 'iqa_report': {
        const college = await staffCollege();
        who = { userId, name: await callerName('College staff'), role: 'staff' };
        doc = await buildIqaReport(asCaller, admin, college, who);
        break;
      }

      case 'quality_report': {
        const college = await staffCollege();
        who = { userId, name: await callerName('College staff'), role: 'staff' };
        doc = await buildQualityReport(asCaller, college, who);
        break;
      }

      case 'college_value': {
        const college = await staffCollege();
        const month = typeof body.month === 'string' && /^\d{4}-\d{2}-01$/.test(body.month) ? body.month : null;
        // get_college_value checks _review_staff_can itself, with the caller's JWT.
        const { data: v, error } = await asCaller.rpc('get_college_value', { p_college: college.id, p_month: month });
        if (error || !v) throw deny('This is for college staff.');
        who = { userId, name: await callerName('College staff'), role: 'staff' };
        doc = buildCollegeValue(v as any, college, who);
        break;
      }

      case 'ofsted_lens': {
        const college = await staffCollege();
        who = { userId, name: await callerName('College staff'), role: 'staff' };
        doc = buildOfstedLens(await readOfstedSignals(asCaller, college.id, college.name ?? null), college, who);
        break;
      }

      case 'epa_brief': {
        const uid = requireUser();
        const briefId = typeof body.briefId === 'string' && UUID.test(body.briefId) ? body.briefId : null;
        const studentId = typeof body.studentId === 'string' && UUID.test(body.studentId) ? body.studentId : null;
        if (!briefId && !studentId) return json({ error: 'Unknown brief.' }, 400);
        // Read with the caller's JWT: the learner's own briefs or staff at that college.
        let q = asCaller.from('college_epa_briefs').select('id, college_id, college_student_id, generated_for, brief, signals_used, facets_used, created_at');
        q = briefId ? q.eq('id', briefId) : q.eq('college_student_id', studentId).order('created_at', { ascending: false }).limit(1);
        const { data: rows } = await q;
        const row = ((rows ?? []) as any[])[0];
        if (!row) throw notFound('No brief found. Draft one first.');
        const { data: s } = await admin.from('college_students').select('user_id').eq('id', row.college_student_id).maybeSingle();
        const role: Who['role'] = s?.user_id === uid ? 'learner' : 'staff';
        who = { userId: uid, name: await callerName(role === 'learner' ? 'The apprentice' : 'College staff'), role };
        doc = await buildEpaBrief(admin, row, who);
        break;
      }

      case 'lesson_plan': {
        const uid = requireUser();
        const id = String(body.lessonPlanId ?? '');
        if (!UUID.test(id)) return json({ error: 'Unknown lesson plan.' }, 400);
        // Read with the caller's JWT: same-college staff, or learners in the cohort once it is not a draft.
        const { data: row } = await asCaller
          .from('college_lesson_plans')
          .select('id, college_id, title, content, duration_minutes, status, scheduled_date, scheduled_start_time, scheduled_room')
          .eq('id', id)
          .maybeSingle();
        if (!row) throw notFound('Lesson plan not found.');
        let plan: any = row.content;
        if (typeof plan === 'string') {
          try {
            plan = JSON.parse(plan);
          } catch {
            plan = null;
          }
        }
        if (!plan || typeof plan !== 'object') throw new HttpError(409, 'This lesson has no plan to download yet.');
        const { data: col } = await admin.from('colleges').select('id, name, logo_url').eq('id', row.college_id).maybeSingle();
        const { data: staffOk } = await asCaller.rpc('_review_staff_can', { p_college: row.college_id });
        const role: Who['role'] = staffOk === true ? 'staff' : 'learner';
        who = { userId: uid, name: await callerName(role === 'staff' ? 'College staff' : 'The apprentice'), role };
        doc = buildLessonPlan(row, plan, col ?? null, who);
        break;
      }

      default:
        return json({ error: 'Unknown document.' }, 400);
    }

    return json(await deliver(admin, kind, doc, who));
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.message }, e.status);
    console.error('learner-document-pdf', e);
    return json({ error: e instanceof Error ? e.message : 'The document could not be made.' }, 500);
  }
});

// ── Fingerprint, render (or reuse), file, sign ──────────────────────────────

async function deliver(admin: SupabaseClient, kind: Kind, doc: Doc, who: Who) {
  // Two half-width cells to a row: a lone half cell goes full width.
  for (const sec of (doc.payload.sections ?? []) as any[]) {
    if (sec?.kind === 'kv' && Array.isArray(sec.rows)) sec.rows = pairFacts(sec.rows);
  }
  // The fingerprint ignores when it was made; photo placeholders are stable.
  const forHash = structuredClone(doc.payload);
  if (forHash.meta) {
    delete forHash.meta.generated;
    delete forHash.meta.generated_by;
  }
  const fp = (await sha256Hex(new TextEncoder().encode(JSON.stringify(forHash)))).slice(0, 32);
  const folder = `documents/${doc.folder}`;
  const path = `${folder}/${fp}.pdf`;
  const download = `${doc.filename}.pdf`;

  const { data: existing } = await admin.storage.from(EXPORT_BUCKET).list(folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
  const files = (existing ?? []) as Array<{ name: string; created_at?: string }>;
  let cached = files.some((f) => f.name === `${fp}.pdf`);

  if (!cached) {
    const hourAgo = Date.now() - 3600_000;
    const recent = files.filter((f) => f.created_at && new Date(f.created_at).getTime() > hourAgo).length;
    if (recent >= RENDERS_PER_HOUR) throw new HttpError(429, 'This document has been made many times in the last hour. Try again later.');

    const payload = await signPhotos(admin, doc.payload);
    const bytes = await renderLearnerRecord(payload, download, { timeoutMs: 110_000 });
    const { error: upErr } = await admin.storage.from(EXPORT_BUCKET).upload(path, bytes, { contentType: 'application/pdf', upsert: true });
    if (upErr) throw new Error(`Could not file the PDF: ${upErr.message}`);

    if (doc.learnerId) {
      await admin
        .from('portfolio_audit_events')
        .insert({
          learner_id: doc.learnerId,
          actor_id: who.userId,
          actor_role: who.role === 'learner' ? 'learner' : who.role === 'staff' ? 'staff' : who.role === 'employer' ? 'employer' : 'system',
          action: 'document_generated',
          object_type: 'learner_document',
          object_id: null,
          summary: { kind, title: doc.payload?.meta?.kind ?? kind, by: who.name, path },
          content_hash: fp,
        })
        .then(({ error }) => error && console.error('audit insert', error.message));
    }
  }

  const { data: signed, error } = await admin.storage.from(EXPORT_BUCKET).createSignedUrl(path, LINK_SECONDS, { download });
  if (error || !signed?.signedUrl) {
    cached = false;
    throw new Error('Could not make a download link.');
  }
  return { url: signed.signedUrl, filename: download, cached };
}

/** Replace every `sign:<bucket>/<path>` placeholder with a one-hour signed URL (original format, never WebP). */
async function signPhotos(admin: SupabaseClient, payload: any): Promise<any> {
  const refs = new Set<string>();
  const walk = (v: any) => {
    if (typeof v === 'string') {
      if (v.startsWith('sign:')) refs.add(v);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(payload);
  const map = new Map<string, string>();
  await Promise.all(
    [...refs].map(async (ref) => {
      const rest = ref.slice(5);
      const i = rest.indexOf('/');
      const bucket = rest.slice(0, i);
      const path = rest.slice(i + 1);
      const { data } = await admin.storage
        .from(bucket)
        .createSignedUrl(path, LINK_SECONDS, { transform: { width: 900, quality: 70, format: 'origin' } });
      map.set(ref, data?.signedUrl ?? '');
    })
  );
  const swap = (v: any): any => {
    if (typeof v === 'string') return v.startsWith('sign:') ? map.get(v) ?? '' : v;
    if (Array.isArray(v)) return v.map(swap).filter((x) => !(x && typeof x === 'object' && 'url' in x && x.url === ''));
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, swap(x)]));
    return v;
  };
  return swap(payload);
}
