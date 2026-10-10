/**
 * Toolbox talks for this job, on the job sheet (ELE-1942, ELE-1944).
 *
 * Shows where the job's latest talk stands ("6 of 8 signed") and starts a new
 * one for the job: the briefing editor opens with the job's crew on the
 * register, AI drafting that can look at site photos, and Send to the crew.
 */
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { ClipboardCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PlanRow, planBtn, planBtnPrimary } from '@/components/employer/jobs/PlanRow';
import { briefingRegister } from '@/components/electrician-tools/site-safety/briefings/briefingSignOffs';

interface TalkRow {
  id: string;
  briefing_name: string | null;
  briefing_date: string | null;
  status: string | null;
  attendees: unknown;
  attendee_signatures: unknown;
}

export function JobToolboxTalkCard({ jobId }: { jobId: string }) {
  const navigate = useNavigate();
  const { data: talks = [], isLoading } = useQuery({
    queryKey: ['job-toolbox-talks', jobId],
    staleTime: 60 * 1000,
    queryFn: async (): Promise<TalkRow[]> => {
      const { data, error } = await supabase
        .from('team_briefings')
        .select('id, briefing_name, briefing_date, status, attendees, attendee_signatures')
        .eq('employer_job_id' as never, jobId)
        .neq('status', 'cancelled')
        .order('briefing_date', { ascending: false })
        .limit(5);
      if (error) throw error;
      return (data ?? []) as unknown as TalkRow[];
    },
  });

  if (isLoading) return null;
  const latest = talks[0];
  const reg = latest ? briefingRegister(latest as never) : null;
  const allSigned = !!reg && reg.total > 0 && reg.signed === reg.total;
  const when = (iso: string | null) => {
    if (!iso) return '';
    try {
      return format(parseISO(iso), 'EEE d MMM');
    } catch {
      return '';
    }
  };

  return (
    <PlanRow
      icon={ClipboardCheck}
      tone={!latest ? 'neutral' : allSigned ? 'ok' : 'warn'}
      title="Toolbox talk"
      status={
        latest
          ? `${latest.briefing_name || 'Toolbox talk'}: ${reg?.signed ?? 0} of ${reg?.total ?? 0} signed`
          : 'No toolbox talk for this job yet'
      }
      detail={
        latest ? (
          <p>
            {when(latest.briefing_date)}
            {talks.length > 1 ? ` · ${talks.length} talks on this job` : ''}
          </p>
        ) : (
          <p>Draft one with AI from the job and site photos. The crew sign it in the app.</p>
        )
      }
      actions={
        <>
          {latest && (
            <button
              type="button"
              className={planBtn}
              onClick={() =>
                navigate(`/employer?section=site-safety&tool=team-briefing&id=${latest.id}`)
              }
            >
              Open
            </button>
          )}
          <button
            type="button"
            className={latest ? planBtn : planBtnPrimary}
            onClick={() =>
              navigate(`/employer?section=site-safety&tool=team-briefing&job=${jobId}`)
            }
          >
            New talk
          </button>
        </>
      }
    />
  );
}

export default JobToolboxTalkCard;
