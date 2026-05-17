/**
 * employer-portal-view — public read-only employer dashboard.
 *
 * URL: /functions/v1/employer-portal-view?token=<token>
 *
 * No auth required. The token (in `college_employer_tokens.token`) acts as
 * the bearer. Returns the employer record plus every active apprentice
 * `college_students.employer_id = employer.id` with attendance %,
 * progress %, EPA status and OTJ hours.
 *
 * Security:
 *   - Token must exist, not be revoked, not be expired.
 *   - Service role bypasses RLS so we can read across college-scoped tables.
 *   - We bump use_count + last_used_at on every successful read.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

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
      .select('id, company_name, contact_name, contact_email, college_id')
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
      .select('id, name, status, progress_percent, start_date, expected_end_date, course_id, user_id')
      .eq('employer_id', employerId)
      .eq('status', 'Active');
    if (stuErr) throw stuErr;

    const studentList = (students ?? []) as StudentRow[];
    const studentIds = studentList.map((s) => s.id);
    const studentUserIds = studentList.map((s) => s.user_id).filter((id): id is string => !!id);

    // Pull attendance, EPA records, OTJ hours, courses in parallel
    const [
      { data: attendance },
      { data: epaRows },
      { data: otjRows },
      { data: courses },
    ] = await Promise.all([
      studentIds.length > 0
        ? sb.from('college_attendance').select('student_id, status').in('student_id', studentIds)
        : Promise.resolve({ data: [] as any[], error: null }),
      studentUserIds.length > 0
        ? sb
            .from('college_epa')
            .select('student_id, status, gateway_date')
            .in('student_id', studentUserIds)
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
              Array.from(new Set(studentList.map((s) => s.course_id).filter((c): c is string => !!c)))
            )
        : Promise.resolve({ data: [] as any[], error: null }),
    ]);

    const courseMap = new Map(
      ((courses ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name])
    );

    // Per-student rollups
    const apprentices = studentList.map((s) => {
      const studentAtt = ((attendance ?? []) as Array<{ student_id: string; status: string }>).filter(
        (a) => a.student_id === s.id
      );
      const presentCount = studentAtt.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      const attendancePercent =
        studentAtt.length > 0 ? Math.round((presentCount / studentAtt.length) * 100) : null;

      const epa = ((epaRows ?? []) as Array<{ student_id: string; status: string | null; gateway_date: string | null }>)
        .find((e) => e.student_id === s.user_id);

      const studentOtj = ((otjRows ?? []) as Array<{
        student_id: string;
        duration_minutes: number;
        verification_status: string;
      }>).filter((o) => o.student_id === s.user_id);
      const otjTotalMin = studentOtj.reduce((acc, o) => acc + (o.duration_minutes ?? 0), 0);
      const otjVerifiedMin = studentOtj
        .filter((o) => o.verification_status?.startsWith('verified'))
        .reduce((acc, o) => acc + (o.duration_minutes ?? 0), 0);

      return {
        id: s.id,
        name: s.name,
        course_name: s.course_id ? courseMap.get(s.course_id) ?? null : null,
        progress_percent: s.progress_percent ?? 0,
        attendance_percent: attendancePercent,
        epa_status: epa?.status ?? null,
        epa_gateway_date: epa?.gateway_date ?? null,
        otj_total_hours: Math.round((otjTotalMin / 60) * 10) / 10,
        otj_verified_hours: Math.round((otjVerifiedMin / 60) * 10) / 10,
        start_date: s.start_date,
        expected_end_date: s.expected_end_date,
      };
    });

    // Bump usage counter — fire-and-forget so a slow update doesn't delay
    void sb
      .from('college_employer_tokens')
      .update({
        use_count: (tokenRow as { use_count: number }).use_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', (tokenRow as { id: string }).id);

    return json({
      ok: true,
      employer: {
        company_name: (employer as { company_name: string }).company_name,
        contact_name: (employer as { contact_name: string | null }).contact_name,
      },
      college_name: (college as { name?: string } | null)?.name ?? null,
      apprentices,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[employer-portal-view] error:', err);
    return json(
      { ok: false, error: err instanceof Error ? err.message : 'Internal error' },
      500
    );
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
