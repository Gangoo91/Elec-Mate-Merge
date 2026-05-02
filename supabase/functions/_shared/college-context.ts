// Shared loader for college-level org context — used by AI edge functions
// that draft documents for a specific college (policy authoring, audit
// pack narrative, prospectus drafts, etc).
//
// Returns a tight summary the LLM can ground in: name, scale, course
// breadth, existing policy footprint. Intentionally narrow — we don't
// leak student-level data here. Per-learner context lives in
// learner-context.ts.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

type SbClient = ReturnType<typeof createClient>;

export interface CollegeContext {
  id: string;
  name: string;
  code: string | null;
  address: string | null;
  /** Active student headcount (status = 'Active'). Capped at exact count. */
  active_students: number;
  /** Active staff headcount (archived_at IS NULL). */
  active_staff: number;
  /** Distinct course titles up to N — gives the LLM a sense of provision. */
  course_titles: string[];
  /** Number of policies already published as 'live' — so the AI knows
      what's already covered and doesn't propose duplicates. */
  live_policy_categories: string[];
}

export async function loadCollegeContext(
  sb: SbClient,
  collegeId: string
): Promise<CollegeContext | null> {
  const { data: college } = await sb
    .from('colleges')
    .select('id, name, code, address')
    .eq('id', collegeId)
    .maybeSingle();
  if (!college) return null;

  const collegeRow = college as {
    id: string;
    name: string;
    code: string | null;
    address: string | null;
  };

  const [studentsRes, staffRes, coursesRes, policiesRes] = await Promise.all([
    sb
      .from('college_students')
      .select('id', { count: 'exact', head: true })
      .eq('college_id', collegeId)
      .eq('status', 'Active'),
    sb
      .from('college_staff')
      .select('id', { count: 'exact', head: true })
      .eq('college_id', collegeId)
      .is('archived_at', null),
    sb.from('college_courses').select('title').eq('college_id', collegeId).limit(20),
    sb.from('college_policies').select('category').eq('college_id', collegeId).eq('status', 'live'),
  ]);

  const courses = (coursesRes.data ?? []) as Array<{ title: string }>;
  const livePols = (policiesRes.data ?? []) as Array<{ category: string }>;

  return {
    id: collegeRow.id,
    name: collegeRow.name,
    code: collegeRow.code,
    address: collegeRow.address,
    active_students: studentsRes.count ?? 0,
    active_staff: staffRes.count ?? 0,
    course_titles: Array.from(new Set(courses.map((c) => c.title).filter(Boolean))).slice(0, 10),
    live_policy_categories: Array.from(new Set(livePols.map((p) => p.category).filter(Boolean))),
  };
}

/** Render a compact context block for inclusion in an LLM prompt. */
export function collegeContextLines(ctx: CollegeContext): string[] {
  const lines: string[] = [];
  lines.push(`College: ${ctx.name}${ctx.code ? ` (${ctx.code})` : ''}`);
  if (ctx.address) lines.push(`Address: ${ctx.address}`);
  lines.push(`Scale: ${ctx.active_students} active learners · ${ctx.active_staff} active staff`);
  if (ctx.course_titles.length > 0) {
    lines.push(`Provision: ${ctx.course_titles.slice(0, 6).join(', ')}`);
  }
  if (ctx.live_policy_categories.length > 0) {
    lines.push(`Existing live policies: ${ctx.live_policy_categories.join(', ')}`);
  }
  return lines;
}
