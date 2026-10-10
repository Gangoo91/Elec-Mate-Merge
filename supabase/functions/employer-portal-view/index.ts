/**
 * employer-portal-view — public read-only employer dashboard.
 *
 * URL: /functions/v1/employer-portal-view?token=<token>
 *
 * No auth required. The token (in `college_employer_tokens.token`) acts as
 * the bearer. Returns the employer record plus every active apprentice
 * `college_students.employer_id = employer.id` with attendance %,
 * progress %, EPA status and OTJ hours, and (ELE-2049) how often each has
 * done safe isolation, inspection and testing and fault finding on site.
 *
 * Security:
 *   - Token must exist, not be revoked, not be expired.
 *   - Service role bypasses RLS so we can read across college-scoped tables.
 *   - We bump use_count + last_used_at on every successful read.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';

interface StudentRow {
  id: string;
  name: string;
  status: string | null;
  progress_percent: number | null;
  start_date: string | null;
  expected_end_date: string | null;
  course_id: string | null;
  user_id: string | null;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token || token.length < 16) {
      return json({ ok: false, error: 'Invalid token' }, 400);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const sb = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Look up token + employer
    const { data: tokenRow, error: tokErr } = await sb
      .from('college_employer_tokens')
      .select('id, employer_id, expires_at, revoked_at, use_count')
      .eq('token', token)
      .maybeSingle();
    if (tokErr) throw tokErr;
    if (!tokenRow) return json({ ok: false, error: 'Token not found' }, 404);
    if ((tokenRow as { revoked_at: string | null }).revoked_at) {
      return json({ ok: false, error: 'Token has been revoked' }, 403);
    }
    if (new Date((tokenRow as { expires_at: string }).expires_at).getTime() < Date.now()) {
      return json({ ok: false, error: 'Token has expired' }, 403);
    }

    const employerId = (tokenRow as { employer_id: string }).employer_id;

    const { data: employer, error: empErr } = await sb
      .from('college_employers')
      .select('id, company_name, contact_name, contact_email, college_id, weekly_digest_opt_out_at')
      .eq('id', employerId)
      .maybeSingle();
    if (empErr) throw empErr;
    if (!employer) return json({ ok: false, error: 'Employer not found' }, 404);

    // College name for the page header
    const { data: college } = await sb
      .from('colleges')
      .select('name')
      .eq('id', (employer as { college_id: string }).college_id)
      .maybeSingle();

    // Active apprentices placed with this employer
    const { data: students, error: stuErr } = await sb
      .from('college_students')
      .select(
        'id, name, status, progress_percent, start_date, expected_end_date, course_id, user_id'
      )
      .eq('employer_id', employerId)
      .eq('status', 'Active');
    if (stuErr) throw stuErr;

    const studentList = (students ?? []) as StudentRow[];
    const studentIds = studentList.map((s) => s.id);
    const studentUserIds = studentList.map((s) => s.user_id).filter((id): id is string => !!id);

    // Pull attendance, EPA records, OTJ hours, courses in parallel
    const [{ data: attendance }, { data: epaRows }, { data: otjRows }, { data: courses }] =
      await Promise.all([
        studentIds.length > 0
          ? sb.from('college_attendance').select('student_id, status').in('student_id', studentIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        studentUserIds.length > 0
          ? sb
              .from('college_epa')
              .select('student_id, status, gateway_date')
              // FK is college_epa.student_id → college_students.id (NOT the auth
              // uid) — matching on user ids returned nothing, so EPA was always null.
              .in('student_id', studentIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        studentUserIds.length > 0
          ? sb
              .from('college_otj_entries')
              .select('student_id, duration_minutes, verification_status')
              .in('student_id', studentUserIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        studentList.length > 0
          ? sb
              .from('college_courses')
              .select('id, name')
              .in(
                'id',
                Array.from(
                  new Set(studentList.map((s) => s.course_id).filter((c): c is string => !!c))
                )
              )
          : Promise.resolve({ data: [] as any[], error: null }),
      ]);

    // get_otj_summary per linked learner (service role passes its read check).
    const summaryByUser = new Map<
      string,
      {
        counted_hours: number;
        verified_hours: number;
        required_hours: number | null;
        app_learning_hours: number;
      }
    >();
    await Promise.all(
      studentUserIds.map(async (uid) => {
        const { data } = await sb.rpc('get_otj_summary' as never, { p_user: uid } as never);
        if (data) summaryByUser.set(uid, data as never);
      })
    );
    void otjRows;

    // ELE-1879: what is waiting for the employer, per apprentice. The next
    // progress review (with its link), entries they can confirm, and the
    // training logged this week.
    const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);
    const monthAgo = new Date(Date.now() - 30 * 86_400_000).toISOString();
    const extrasByStudent = new Map<string, Record<string, unknown>>();
    await Promise.all(
      studentList.map(async (s) => {
        const [{ data: due }, { data: rv }, pending, week, am2] = await Promise.all([
          sb.rpc('tripartite_due_by' as never, { p_student: s.id } as never),
          // The review the employer should act on: the next one to take part in,
          // else a recent summary they must sign (plan changed). employer_review_focus.
          sb.rpc('employer_review_focus' as never, { p_student: s.id } as never),
          s.user_id
            ? sb
                .from('college_otj_entries')
                .select('id, title, activity_date, duration_minutes')
                .eq('student_id', s.user_id)
                .eq('verification_status', 'pending')
                .eq('source_kind', 'apprentice_submitted')
                .gte('created_at', monthAgo)
                .order('activity_date', { ascending: false })
                .limit(10)
            : Promise.resolve({ data: [] }),
          s.user_id
            ? sb
                .from('college_otj_entries')
                .select('title, activity_date, duration_minutes, verification_status')
                .eq('student_id', s.user_id)
                .neq('verification_status', 'rejected')
                .gte('activity_date', weekAgo)
                .order('activity_date', { ascending: false })
                .limit(12)
            : Promise.resolve({ data: [] }),
          // ELE-2049: how often they have done safe isolation, inspection and
          // testing and fault finding on site (the AM2 exposure alert email
          // links here). Service-role-only helper: the token was checked above
          // and the learner is placed with this employer.
          s.user_id
            ? sb.rpc('_am2x_summary_service' as never, { p_learner: s.user_id } as never)
            : Promise.resolve({ data: null }),
        ]);
        const am2Data = am2.data as unknown as { applies?: boolean } | null;
        const r = rv as unknown as {
          token: string;
          scheduled_at: string | null;
          mode: string | null;
          locked: boolean;
          employer_input: boolean;
          employer_signed: boolean;
          held_on: string | null;
          must_sign?: boolean;
        } | null;
        extrasByStudent.set(s.id, {
          review_due_by: (due as unknown as string) ?? null,
          review: r ?? null,
          to_confirm: (pending.data ?? []) as unknown[],
          this_week: (week.data ?? []) as unknown[],
          am2_exposure: am2Data && am2Data.applies ? am2Data : null,
        });
      })
    );

    const courseMap = new Map(
      ((courses ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name])
    );

    // Per-student rollups
    const apprentices = studentList.map((s) => {
      const studentAtt = (
        (attendance ?? []) as Array<{ student_id: string; status: string }>
      ).filter((a) => a.student_id === s.id);
      const presentCount = studentAtt.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      const attendancePercent =
        studentAtt.length > 0 ? Math.round((presentCount / studentAtt.length) * 100) : null;

      const epa = (
        (epaRows ?? []) as Array<{
          student_id: string;
          status: string | null;
          gateway_date: string | null;
        }>
      ).find((e) => e.student_id === s.id);

      // The one off-the-job figure (get_otj_summary) — the same numbers the
      // apprentice and their tutor see. The old sum added rejected and
      // pending entries into the "total" and left app learning out.
      const summary = s.user_id ? (summaryByUser.get(s.user_id) ?? null) : null;

      return {
        id: s.id,
        name: s.name,
        course_name: s.course_id ? (courseMap.get(s.course_id) ?? null) : null,
        progress_percent: s.progress_percent ?? 0,
        attendance_percent: attendancePercent,
        epa_status: epa?.status ?? null,
        epa_gateway_date: epa?.gateway_date ?? null,
        otj_total_hours: summary?.counted_hours ?? 0,
        otj_verified_hours: summary?.verified_hours ?? 0,
        otj_required_hours: summary?.required_hours ?? null,
        otj_app_learning_hours: summary?.app_learning_hours ?? 0,
        otj_planned_to_date_hours:
          (summary as { planned_to_date_hours?: number | null } | null)?.planned_to_date_hours ??
          null,
        ...(extrasByStudent.get(s.id) ?? {}),
        start_date: s.start_date,
        expected_end_date: s.expected_end_date,
      };
    });

    // Bump usage counter — fire-and-forget so a slow update doesn't delay the
    // response. NOTE: `void builder` never executes (PostgREST builders are
    // lazy thenables) — .then() is what actually fires the request.
    sb.from('college_employer_tokens')
      .update({
        use_count: (tokenRow as { use_count: number }).use_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', (tokenRow as { id: string }).id)
      .then(
        () => {},
        () => {}
      );

    return json({
      ok: true,
      employer: {
        company_name: (employer as { company_name: string }).company_name,
        contact_name: (employer as { contact_name: string | null }).contact_name,
        has_email: !!(employer as { contact_email: string | null }).contact_email,
        weekly_digest: !(employer as { weekly_digest_opt_out_at: string | null })
          .weekly_digest_opt_out_at,
      },
      college_name: (college as { name?: string } | null)?.name ?? null,
      apprentices,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    await captureException(err, {
      functionName: 'employer-portal-view',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('[employer-portal-view] error:', err);
    return json({ ok: false, error: err instanceof Error ? err.message : 'Internal error' }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
