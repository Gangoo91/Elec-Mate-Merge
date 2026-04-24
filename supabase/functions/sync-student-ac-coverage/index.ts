// Seeds student_ac_coverage rows for every active learner × AC in their
// course's qualification. Safe to run repeatedly — only inserts missing rows,
// never overwrites status/evidence_count for existing ones (so assessor work
// isn't clobbered).
//
// Scope:
//   - If called with a JWT: runs only for the caller's college
//   - If called server-to-server with {college_id}: scoped to that college
//   - Otherwise: all colleges
//
// Output: { seeded, students, per_student: [...] }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: { college_id?: string; student_ids?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  let scopedCollegeId = body.college_id ?? null;
  const authHeader = req.headers.get('authorization');
  if (authHeader && !scopedCollegeId) {
    const userClient = createClient(
      SUPABASE_URL,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
    );
    const { data: userRes } = await userClient.auth.getUser();
    if (userRes?.user) {
      const { data: profile } = await sb
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (profile?.college_id) scopedCollegeId = profile.college_id;
    }
  }

  try {
    // Students to process
    let sq = sb
      .from('college_students')
      .select('id, course_id')
      .neq('status', 'withdrawn')
      .neq('status', 'completed')
      .not('course_id', 'is', null);
    if (scopedCollegeId) sq = sq.eq('college_id', scopedCollegeId);
    if (body.student_ids?.length) sq = sq.in('id', body.student_ids);

    const { data: students, error: sErr } = await sq;
    if (sErr) throw sErr;
    if (!students || students.length === 0) {
      return new Response(
        JSON.stringify({ seeded: 0, students: 0, per_student: [] }),
        {
          headers: { ...corsHeaders, 'content-type': 'application/json' },
        }
      );
    }

    // Cache course → qualification_code lookup
    const courseIds = [...new Set(students.map((s) => s.course_id as string))];
    const { data: courses } = await sb
      .from('college_courses')
      .select('id, code')
      .in('id', courseIds);
    const courseCodeById = new Map<string, string>();
    for (const c of courses ?? []) {
      if (c.code) courseCodeById.set(c.id, c.code);
    }

    // Cache qualification_code → ACs
    const qualCodes = [...new Set(Array.from(courseCodeById.values()))];
    const { data: acs } = await sb
      .from('qualification_requirements')
      .select('qualification_code, unit_code, ac_code')
      .in('qualification_code', qualCodes);
    const acsByQual = new Map<
      string,
      { qualification_code: string; unit_code: string; ac_code: string }[]
    >();
    for (const r of acs ?? []) {
      const list = acsByQual.get(r.qualification_code) ?? [];
      list.push(r);
      acsByQual.set(r.qualification_code, list);
    }

    let totalSeeded = 0;
    const perStudent: { student_id: string; seeded: number; total_acs: number }[] = [];

    for (const student of students) {
      const qualCode = courseCodeById.get(student.course_id as string);
      if (!qualCode) continue;
      const acList = acsByQual.get(qualCode) ?? [];
      if (acList.length === 0) continue;

      // Find existing rows for this student
      const { data: existing } = await sb
        .from('student_ac_coverage')
        .select('qualification_code, unit_code, ac_code')
        .eq('student_id', student.id);
      const existingKeys = new Set(
        (existing ?? []).map(
          (r) => `${r.qualification_code}|${r.unit_code}|${r.ac_code}`
        )
      );

      const toInsert = acList
        .filter(
          (a) =>
            !existingKeys.has(
              `${a.qualification_code}|${a.unit_code}|${a.ac_code}`
            )
        )
        .map((a) => ({
          student_id: student.id,
          qualification_code: a.qualification_code,
          unit_code: a.unit_code,
          ac_code: a.ac_code,
          status: 'not_started',
          evidence_count: 0,
        }));

      if (toInsert.length > 0) {
        // Insert in chunks (Postgrest has limits)
        const CHUNK = 200;
        for (let i = 0; i < toInsert.length; i += CHUNK) {
          const batch = toInsert.slice(i, i + CHUNK);
          const { error } = await sb.from('student_ac_coverage').insert(batch);
          if (error) {
            console.error('[sync-ac-coverage] insert failed', student.id, error);
            break;
          }
        }
        totalSeeded += toInsert.length;
      }

      perStudent.push({
        student_id: student.id,
        seeded: toInsert.length,
        total_acs: acList.length,
      });
    }

    return new Response(
      JSON.stringify({ seeded: totalSeeded, students: students.length, per_student: perStudent }),
      {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  } catch (e) {
    console.error('[sync-ac-coverage] fatal', e);
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  }
});
