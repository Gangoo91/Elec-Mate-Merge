import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useSlideDeck — fetch + generate + persist a tutor-ready slide deck
   companion to a college_lesson_plans row.

   Slides are a kind-tagged discriminated union; the viewer renders each
   kind with its own template. Generation hits the ai-generate-slide-deck
   edge function which writes back to slide_deck_json on the plan row.

   ELE-942 / [F1] — Smartscreen killer.
   ========================================================================== */

export type SlideKind =
  | 'title'
  | 'starter'
  | 'objectives'
  | 'concept'
  | 'reg_cite'
  | 'activity'
  | 'worked_example'
  | 'check_understanding'
  | 'misconception'
  | 'summary'
  | 'plenary';

export interface SlideKeyTerm {
  term: string;
  definition: string;
}

export interface Slide {
  kind: SlideKind;
  heading?: string;
  eyebrow?: string;
  body?: string;
  subtitle?: string;
  duration_label?: string;
  bullets?: string[];
  key_terms?: SlideKeyTerm[];
  reg_number?: string;
  clause?: string;
  why_it_matters?: string;
  instruction?: string;
  time_minutes?: number;
  group_size?: 'individual' | 'pairs' | 'small_group' | 'whole_class';
  success_criteria?: string;
  problem?: string;
  solution_steps?: string[];
  questions?: string[];
  belief?: string;
  correction?: string;
  exit_ticket?: string;
  speaker_notes?: string;
}

export interface SlideDeck {
  generated_at: string;
  slides: Slide[];
}

interface PlanRow {
  id: string;
  title: string;
  duration_minutes: number | null;
  cohort_id: string | null;
  slide_deck_json: SlideDeck | null;
  slide_deck_generated_at: string | null;
}

export function useSlideDeck(lessonPlanId: string | null) {
  const [plan, setPlan] = useState<PlanRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(async () => {
    if (!lessonPlanId) {
      setPlan(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('college_lesson_plans')
        .select('id, title, duration_minutes, cohort_id, slide_deck_json, slide_deck_generated_at')
        .eq('id', lessonPlanId)
        .maybeSingle();
      if (qErr) throw qErr;
      setPlan((data as PlanRow | null) ?? null);
    } catch (e) {
      setError((e as Error).message ?? 'Could not load lesson plan');
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }, [lessonPlanId]);

  useEffect(() => {
    void load();
  }, [load]);

  const generate = useCallback(async (): Promise<SlideDeck | null> => {
    if (!lessonPlanId) return null;
    setGenerating(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('ai-generate-slide-deck', {
        body: { lesson_plan_id: lessonPlanId },
      });
      if (fnErr) throw new Error(fnErr.message);
      const deck = (data as { deck?: SlideDeck } | null)?.deck ?? null;
      if (!deck) throw new Error('Edge function returned no deck');
      // Refetch the plan so slide_deck_generated_at is also up to date.
      await load();
      return deck;
    } catch (e) {
      setError((e as Error).message ?? 'Could not generate slide deck');
      return null;
    } finally {
      setGenerating(false);
    }
  }, [lessonPlanId, load]);

  /** Save an in-place edit to a single slide. */
  const updateSlide = useCallback(
    async (index: number, patch: Partial<Slide>) => {
      if (!plan?.slide_deck_json) return;
      const next = {
        ...plan.slide_deck_json,
        slides: plan.slide_deck_json.slides.map((s, i) => (i === index ? { ...s, ...patch } : s)),
      };
      // Optimistic local update.
      setPlan((p) => (p ? { ...p, slide_deck_json: next } : p));
      const { error: upErr } = await supabase
        .from('college_lesson_plans')
        .update({ slide_deck_json: next })
        .eq('id', plan.id);
      if (upErr) {
        setError(upErr.message);
        await load();
      }
    },
    [plan, load]
  );

  return {
    plan,
    deck: plan?.slide_deck_json ?? null,
    generatedAt: plan?.slide_deck_generated_at ?? null,
    loading,
    generating,
    error,
    generate,
    refresh: load,
    updateSlide,
  };
}
