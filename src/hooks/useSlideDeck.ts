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
  | 'pull_quote'
  | 'big_stat'
  | 'two_column'
  | 'image_concept'
  | 'diagram_caption'
  | 'activity'
  | 'worked_example'
  | 'check_understanding'
  | 'misconception'
  | 'summary'
  | 'plenary';

export type DiagramKind =
  | 'ring_final'
  | 'radial'
  | 'lighting_final'
  | 'distribution_board'
  | 'voltage_drop_curve'
  | 'equipotential_bonding'
  | 'earthing_arrangement'
  | 'three_phase'
  | 'RCD_discrimination';

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
  // Layout-specific
  stat_value?: string;
  stat_caption?: string;
  stat_source?: string;
  left_heading?: string;
  left_body?: string;
  left_bullets?: string[];
  right_heading?: string;
  right_body?: string;
  right_bullets?: string[];
  quote?: string;
  attribution?: string;
  // Image-driven
  image_prompt?: string;
  image_caption?: string;
  image_url?: string;
  image_status?: 'pending' | 'generating' | 'ready' | 'failed';
  // Diagram
  diagram_kind?: DiagramKind;
  diagram_caption?: string;
  // AC mapping for the chip on each card
  slide_acs?: string[];
}

export type DeckTone = 'academic' | 'practical' | 'gen_z';
export type DeckDepth = 'overview' | 'standard' | 'deep_dive';
export type DeckTheme = 'dark' | 'light';

export interface DeckPreflight {
  slide_count?: number;
  tone?: DeckTone;
  depth?: DeckDepth;
}

export interface SlideDeck {
  generated_at: string;
  slides: Slide[];
  theme?: DeckTheme;
}

interface PlanRow {
  id: string;
  title: string;
  duration_minutes: number | null;
  cohort_id: string | null;
  college_id: string | null;
  slide_deck_json: SlideDeck | null;
  slide_deck_generated_at: string | null;
}

export interface CollegeBrand {
  id: string;
  name: string;
  logo_url: string | null;
}

export function useSlideDeck(lessonPlanId: string | null) {
  const [plan, setPlan] = useState<PlanRow | null>(null);
  const [brand, setBrand] = useState<CollegeBrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [imageStatus, setImageStatus] = useState<Record<number, 'generating' | 'ready' | 'failed'>>(
    {}
  );

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
        .select(
          'id, title, duration_minutes, cohort_id, college_id, slide_deck_json, slide_deck_generated_at'
        )
        .eq('id', lessonPlanId)
        .maybeSingle();
      if (qErr) throw qErr;
      const planRow = (data as PlanRow | null) ?? null;
      setPlan(planRow);
      // College brand for title-slide logo + accent. Optional.
      if (planRow?.college_id) {
        const { data: collegeRow } = await supabase
          .from('colleges')
          .select('id, name, logo_url')
          .eq('id', planRow.college_id)
          .maybeSingle();
        setBrand((collegeRow as CollegeBrand | null) ?? null);
      } else {
        setBrand(null);
      }
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

  const generate = useCallback(
    async (preflight?: DeckPreflight): Promise<SlideDeck | null> => {
      if (!lessonPlanId) return null;
      setGenerating(true);
      setError(null);
      setImageStatus({});
      try {
        const { data, error: fnErr } = await supabase.functions.invoke('ai-generate-slide-deck', {
          body: {
            lesson_plan_id: lessonPlanId,
            slide_count: preflight?.slide_count,
            tone: preflight?.tone,
            depth: preflight?.depth,
          },
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
    },
    [lessonPlanId, load]
  );

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

  /** Generate the gpt-image-1 photograph for one slide. Front-end fans
      these out per slide so the deck appears first and photos stream in. */
  const generateSlideImage = useCallback(
    async (slideIndex: number, prompt: string, quality: 'low' | 'medium' | 'high' = 'medium') => {
      if (!lessonPlanId) return;
      setImageStatus((s) => ({ ...s, [slideIndex]: 'generating' }));
      try {
        const { data, error: fnErr } = await supabase.functions.invoke('ai-generate-slide-image', {
          body: {
            lesson_plan_id: lessonPlanId,
            slide_index: slideIndex,
            prompt,
            quality,
          },
        });
        if (fnErr) throw new Error(fnErr.message);
        const url = (data as { image_url?: string } | null)?.image_url ?? null;
        if (!url) throw new Error('No image URL returned');
        setImageStatus((s) => ({ ...s, [slideIndex]: 'ready' }));
        // Re-read the deck so the new URL is live in state.
        await load();
      } catch (e) {
        setImageStatus((s) => ({ ...s, [slideIndex]: 'failed' }));
        // Stash a per-slide error in the slide row so the UI can show it.
        if (plan?.slide_deck_json) {
          const detail = (e as Error).message;
          // Only surface in console; keep the deck clean.
          console.error(`Slide ${slideIndex} image failed:`, detail);
        }
      }
    },
    [lessonPlanId, load, plan]
  );

  /** Kick off image generation for every slide that has an image_prompt
      but no image_url yet. Runs in PARALLEL via Promise.allSettled — at
      gpt-image-1's per-call latency this turns ~30-40s sequential into
      ~8-12s wall time. Cost identical (per-call, not per-batch). */
  const generateMissingImages = useCallback(
    async (quality: 'low' | 'medium' | 'high' = 'medium') => {
      const slides = plan?.slide_deck_json?.slides ?? [];
      const tasks: Array<Promise<void>> = [];
      for (let i = 0; i < slides.length; i++) {
        const s = slides[i];
        if (!s.image_prompt) continue;
        if (s.image_url) continue;
        if (imageStatus[i] === 'generating' || imageStatus[i] === 'ready') continue;
        tasks.push(generateSlideImage(i, s.image_prompt, quality));
      }
      if (tasks.length > 0) {
        await Promise.allSettled(tasks);
      }
    },
    [plan, imageStatus, generateSlideImage]
  );

  /** Per-slide regeneration with a tutor tweak prompt. Calls
      ai-regenerate-slide and refetches; keeps the rest of the deck. */
  const regenerateSlide = useCallback(
    async (slideIndex: number, tweakPrompt: string): Promise<boolean> => {
      if (!lessonPlanId) return false;
      setRegeneratingIndex(slideIndex);
      setError(null);
      try {
        const { data, error: fnErr } = await supabase.functions.invoke('ai-regenerate-slide', {
          body: {
            lesson_plan_id: lessonPlanId,
            slide_index: slideIndex,
            tweak_prompt: tweakPrompt,
          },
        });
        if (fnErr) throw new Error(fnErr.message);
        if (!(data as { slide?: unknown } | null)?.slide) {
          throw new Error('Edge function returned no slide');
        }
        // Drop any cached image status for this slide — it may have a new
        // image_prompt now and the front-end should re-fetch.
        setImageStatus((s) => {
          const next = { ...s };
          delete next[slideIndex];
          return next;
        });
        await load();
        return true;
      } catch (e) {
        setError((e as Error).message ?? 'Could not regenerate slide');
        return false;
      } finally {
        setRegeneratingIndex(null);
      }
    },
    [lessonPlanId, load]
  );

  /** Reorder slides via drag-and-drop. */
  const reorderSlides = useCallback(
    async (fromIndex: number, toIndex: number) => {
      if (!plan?.slide_deck_json) return;
      if (fromIndex === toIndex) return;
      const slides = [...plan.slide_deck_json.slides];
      const [moved] = slides.splice(fromIndex, 1);
      slides.splice(toIndex, 0, moved);
      const next = { ...plan.slide_deck_json, slides };
      setPlan((p) => (p ? { ...p, slide_deck_json: next } : p));
      // Image-status keyed by index — rebuild it under the new ordering.
      setImageStatus((s) => {
        const arr: Array<['generating' | 'ready' | 'failed' | undefined]> =
          plan.slide_deck_json!.slides.map((_, i) => [s[i]]);
        const [movedStatus] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, movedStatus);
        const out: Record<number, 'generating' | 'ready' | 'failed'> = {};
        arr.forEach((entry, i) => {
          if (entry[0]) out[i] = entry[0];
        });
        return out;
      });
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

  /** Duplicate a slide — useful for "I want this slide twice with a tweak". */
  const duplicateSlide = useCallback(
    async (slideIndex: number) => {
      if (!plan?.slide_deck_json) return;
      const orig = plan.slide_deck_json.slides[slideIndex];
      if (!orig) return;
      const copy: Slide = { ...orig };
      // Strip the image_url from the copy so the new slide gets its own
      // photo regen rather than sharing the original's URL.
      delete copy.image_url;
      const slides = [...plan.slide_deck_json.slides];
      slides.splice(slideIndex + 1, 0, copy);
      const next = { ...plan.slide_deck_json, slides };
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

  /** Delete a slide. */
  const deleteSlide = useCallback(
    async (slideIndex: number) => {
      if (!plan?.slide_deck_json) return;
      const slides = plan.slide_deck_json.slides.filter((_, i) => i !== slideIndex);
      const next = { ...plan.slide_deck_json, slides };
      setPlan((p) => (p ? { ...p, slide_deck_json: next } : p));
      setImageStatus((s) => {
        const out: Record<number, 'generating' | 'ready' | 'failed'> = {};
        Object.entries(s).forEach(([k, v]) => {
          const idx = Number(k);
          if (idx === slideIndex) return;
          out[idx > slideIndex ? idx - 1 : idx] = v;
        });
        return out;
      });
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

  /** Toggle dark/light theme. Persisted to slide_deck_json.theme. */
  const setTheme = useCallback(
    async (theme: DeckTheme) => {
      if (!plan?.slide_deck_json) return;
      const next = { ...plan.slide_deck_json, theme };
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
    brand,
    deck: plan?.slide_deck_json ?? null,
    generatedAt: plan?.slide_deck_generated_at ?? null,
    loading,
    generating,
    regeneratingIndex,
    error,
    generate,
    regenerateSlide,
    reorderSlides,
    duplicateSlide,
    deleteSlide,
    setTheme,
    refresh: load,
    updateSlide,
    generateSlideImage,
    generateMissingImages,
    imageStatus,
  };
}
