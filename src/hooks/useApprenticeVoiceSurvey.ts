import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useApprenticeVoiceSurvey — fetch active survey for the apprentice's
   college, check submission status, post anonymous response.
   ELE-936 (L1). The response_token is salted random — never linked back
   to the user. The submission log uses a separate table that only stores
   (user_id, survey_id) for dedup, not the answers.
   ========================================================================== */

export type QuestionKind = 'scale_1_5' | 'free_text' | 'multi_choice';

export interface SurveyQuestion {
  key: string;
  kind: QuestionKind;
  label: string;
  options?: string[];
}

export interface Survey {
  id: string;
  college_id: string;
  title: string;
  iso_month: string;
  open_at: string;
  close_at: string;
  questions: SurveyQuestion[];
  is_active: boolean;
}

export function useApprenticeVoiceSurvey() {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setSurvey(null);
        setAlreadySubmitted(false);
        return;
      }

      // Resolve the apprentice's college via college_students
      const { data: studentRow } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', userId)
        .maybeSingle();
      const collegeId = (studentRow as { college_id?: string } | null)?.college_id;
      if (!collegeId) {
        setSurvey(null);
        return;
      }

      const today = new Date().toISOString();
      const { data: surveys, error: sErr } = await supabase
        .from('college_apprentice_surveys')
        .select('id, college_id, title, iso_month, open_at, close_at, questions, is_active')
        .eq('college_id', collegeId)
        .eq('is_active', true)
        .lte('open_at', today)
        .gte('close_at', today)
        .order('open_at', { ascending: false })
        .limit(1);
      if (sErr) throw sErr;
      const activeSurvey = (surveys ?? [])[0] as Survey | undefined;
      if (!activeSurvey) {
        setSurvey(null);
        setAlreadySubmitted(false);
        return;
      }
      setSurvey(activeSurvey);

      // Dedup: have they already submitted?
      const { data: submission } = await supabase
        .from('college_apprentice_survey_submissions')
        .select('user_id')
        .eq('user_id', userId)
        .eq('survey_id', activeSurvey.id)
        .maybeSingle();
      setAlreadySubmitted(!!submission);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const submit = useCallback(
    async (answers: Record<string, string | number>) => {
      if (!survey) throw new Error('No active survey');
      setSubmitting(true);
      setError(null);
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const userId = userRes.user?.id;
        if (!userId) throw new Error('Not signed in');

        // One server call: checks the learner is on the college's roll and the
        // survey is open, logs the submission (one per learner) and writes the
        // anonymous response with no link back to them.
        const { error: subErr } = await supabase.rpc('submit_apprentice_survey' as never, {
          p_survey: survey.id,
          p_answers: answers,
        } as never);
        if (subErr) {
          if (subErr.code === '23505') {
            setAlreadySubmitted(true);
            throw new Error('You have already submitted this survey');
          }
          throw subErr;
        }

        setAlreadySubmitted(true);
        // analyze-apprentice-feedback fires via post-insert trigger
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setSubmitting(false);
      }
    },
    [survey]
  );

  return { survey, alreadySubmitted, loading, submitting, error, submit, refetch: fetch };
}
