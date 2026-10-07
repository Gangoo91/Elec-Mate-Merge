import { supabase } from '@/integrations/supabase/client';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

/** Columns that belong to the original plan's life, not to a fresh copy. */
const NOT_COPIED = [
  'updated_at',
  'delivered_at',
  'slide_deck_json',
  'slide_deck_generated_at',
] as const;

/**
 * Copies a lesson plan row with its criteria mappings and regulation
 * references, and returns the new plan's id. The copy is always a draft.
 * Lifted from the plan page's Duplicate (7 Oct 2026) so the "Start a plan"
 * sheet can start from a past plan the same way.
 */
export async function duplicateLessonPlan(
  lessonId: string,
  overrides: {
    title?: string;
    cohort_id?: string | null;
    scheduled_date?: string | null;
    scheduled_start_time?: string | null;
    scheduled_room?: string | null;
  } = {}
): Promise<string> {
  const { data: src, error: srcErr } = await supabase
    .from('college_lesson_plans')
    .select('*')
    .eq('id', lessonId)
    .maybeSingle();
  if (srcErr || !src) throw new Error(srcErr?.message ?? 'Plan not found');

  const {
    id: _omitId,
    created_at: _omitCa,
    ...copy
  } = src as Record<string, unknown> & {
    id: string;
    created_at: string | null;
  };
  for (const k of NOT_COPIED) if (k in copy) (copy as Record<string, unknown>)[k] = null;

  // The copy belongs to whoever made it, not to the colleague who wrote the
  // original (it would vanish from their own "Mine" list otherwise).
  const collegeId = getActingCollegeId() ?? ((src as { college_id?: string | null }).college_id ?? null);
  const { data: me } = await supabase.auth.getUser();
  let tutorId: string | null = null;
  if (me.user && collegeId) {
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', me.user.id)
      .eq('college_id', collegeId)
      .is('archived_at', null)
      .limit(1)
      .maybeSingle();
    tutorId = (staff as { id: string } | null)?.id ?? null;
  }

  const newRow = {
    ...copy,
    ...(tutorId && 'tutor_id' in copy ? { tutor_id: tutorId } : null),
    title: overrides.title ?? `${(src.title as string | null) ?? 'Lesson plan'} (copy)`,
    ...('cohort_id' in overrides ? { cohort_id: overrides.cohort_id } : null),
    ...('scheduled_date' in overrides ? { scheduled_date: overrides.scheduled_date } : null),
    ...('scheduled_start_time' in overrides
      ? { scheduled_start_time: overrides.scheduled_start_time }
      : null),
    ...('scheduled_room' in overrides ? { scheduled_room: overrides.scheduled_room } : null),
    status: 'draft',
  };
  const { data: inserted, error: insErr } = await supabase
    .from('college_lesson_plans')
    .insert(newRow as never)
    .select('id')
    .maybeSingle();
  if (insErr || !inserted) throw new Error(insErr?.message ?? 'Duplicate failed');

  const newId = inserted.id as string;

  // Copy AC mappings
  const { data: mappings } = await supabase
    .from('lesson_plan_ac_mapping')
    .select('qualification_code, unit_code, ac_code, mapping_source, confidence')
    .eq('lesson_plan_id', lessonId);
  if (mappings && mappings.length > 0) {
    await supabase.from('lesson_plan_ac_mapping').insert(
      mappings.map((m) => ({
        lesson_plan_id: newId,
        qualification_code: m.qualification_code,
        unit_code: m.unit_code,
        ac_code: m.ac_code,
        mapping_source: m.mapping_source,
        confidence: m.confidence,
      }))
    );
  }

  // Copy regulation refs
  const { data: refs } = await supabase
    .from('lesson_regulation_refs')
    .select('facet_id, document_type, cited_how, is_a4_change')
    .eq('lesson_plan_id', lessonId);
  if (refs && refs.length > 0) {
    await supabase.from('lesson_regulation_refs').insert(
      refs.map((r) => ({
        lesson_plan_id: newId,
        facet_id: r.facet_id,
        document_type: r.document_type,
        cited_how: r.cited_how,
        is_a4_change: r.is_a4_change,
      }))
    );
  }

  return newId;
}
