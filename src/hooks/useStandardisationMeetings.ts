import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStandardisationMeetings — list + create + delete IQA standardisation
   meetings. Realtime-subscribed.
   ========================================================================== */

export interface StandardisationMeeting {
  id: string;
  college_id: string | null;
  date: string;
  topic: string;
  chair_id: string | null;
  attendee_ids: string[];
  attendees_count: number | null;
  outcome: string | null;
  decisions: string | null;
  action_items: string[];
  minutes_url: string | null;
  created_at: string | null;
}

export interface NewStandardisationMeeting {
  date: string;
  topic: string;
  chair_id?: string | null;
  attendee_ids?: string[];
  outcome?: string | null;
  decisions?: string | null;
  action_items?: string[];
  minutes_url?: string | null;
}

const COLS =
  'id, college_id, date, topic, chair_id, attendee_ids, attendees_count, outcome, decisions, action_items, minutes_url, created_at';

export function useStandardisationMeetings() {
  const [meetings, setMeetings] = useState<StandardisationMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_standardisation_meetings')
      .select(COLS)
      .order('date', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setMeetings((data ?? []) as StandardisationMeeting[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel('standardisation_meetings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_standardisation_meetings' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  const create = useCallback(async (input: NewStandardisationMeeting) => {
    const { data: userData } = await supabase.auth.getUser();
    let collegeId: string | null = null;
    if (userData.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userData.user.id)
        .maybeSingle();
      collegeId = (profile?.college_id as string | null) ?? null;
    }
    const attendees = input.attendee_ids ?? [];
    const { error: insErr } = await supabase
      .from('college_standardisation_meetings')
      .insert({
        college_id: collegeId,
        date: input.date,
        topic: input.topic,
        chair_id: input.chair_id ?? null,
        attendee_ids: attendees,
        attendees_count: attendees.length,
        outcome: input.outcome ?? null,
        decisions: input.decisions ?? null,
        action_items: input.action_items ?? [],
        minutes_url: input.minutes_url ?? null,
      });
    if (insErr) throw insErr;
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error: delErr } = await supabase
      .from('college_standardisation_meetings')
      .delete()
      .eq('id', id);
    if (delErr) throw delErr;
  }, []);

  return { meetings, loading, error, refresh: fetch, create, remove };
}
