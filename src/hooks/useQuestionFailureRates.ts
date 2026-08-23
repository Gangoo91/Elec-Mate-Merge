/**
 * How often everyone else gets a question wrong.
 *
 * `seo_mock_question_stats` accumulates times_shown / times_wrong per question
 * per paper, written by the shared recorder in mockExamTelemetry. The public
 * exam pages have surfaced this for a while ("62% of people miss this one");
 * the in-app papers collected nothing and showed nothing, so a learner marked
 * wrong had no idea whether they'd missed something everyone misses or fluffed
 * an easy one.
 *
 * That distinction is the difference between "I'm behind" and "this is a hard
 * question" — worth showing, because the second is true far more often.
 *
 * Public-read table, fire-and-forget: if the fetch fails the review simply
 * omits the line rather than blocking anything.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/** Below this many sightings a percentage is noise, not insight. */
const MIN_SAMPLE = 25;

export type FailureRates = Record<string, number>;

export function useQuestionFailureRates(
  examSlug: string,
  questionIds: (number | string | undefined)[],
  enabled: boolean
): FailureRates {
  const [rates, setRates] = useState<FailureRates>({});
  // Stable key so the effect doesn't refire on every render just because the
  // caller rebuilt the array.
  const idKey = questionIds.filter((id) => typeof id === 'number').join(',');

  useEffect(() => {
    if (!enabled || !examSlug || !idKey) return;
    const ids = idKey.split(',').map(Number);
    let cancelled = false;

    void supabase
      .from('seo_mock_question_stats')
      .select('question_id,times_shown,times_wrong')
      .eq('exam_slug', examSlug)
      .in('question_id', ids)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map: FailureRates = {};
        data.forEach((r: { question_id: number; times_shown: number; times_wrong: number }) => {
          if (r.times_shown >= MIN_SAMPLE) {
            map[String(r.question_id)] = Math.round((100 * r.times_wrong) / r.times_shown);
          }
        });
        setRates(map);
      });

    return () => {
      cancelled = true;
    };
  }, [examSlug, idKey, enabled]);

  return rates;
}
