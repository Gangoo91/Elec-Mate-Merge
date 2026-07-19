import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   FirstRunChecklist — walks a new employer to their first wow in minutes:
   company set up → team invited (live joined count) → first job → first
   tickets. Disappears once all four are done.
   ========================================================================== */

interface Props {
  onNavigate: (section: string) => void;
}

export function FirstRunChecklist({ onNavigate }: Props) {
  const { data } = useQuery({
    queryKey: ['first-run-checklist'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const [profileRes, rosterRes, linkedRes, jobsRes, tasksRes] = await Promise.all([
        supabase
          .from('company_profiles')
          .select('company_name')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('employer_employees')
          .select('id', { count: 'exact', head: true })
          .eq('employer_id', user.id),
        supabase
          .from('employer_employees')
          .select('id', { count: 'exact', head: true })
          .eq('employer_id', user.id)
          .not('user_id', 'is', null),
        // Scope to jobs/tasks this employer OWNS — worker-side RLS policies
        // also grant reads on jobs the user is merely assigned to, which
        // would falsely tick these steps for an employer who also works
        // on someone else's books.
        supabase
          .from('employer_jobs')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('employer_job_tasks')
          .select('id', { count: 'exact', head: true })
          .eq('employer_id', user.id),
      ]);

      return {
        company: !!profileRes.data?.company_name?.trim(),
        rosterCount: rosterRes.count ?? 0,
        linkedCount: linkedRes.count ?? 0,
        hasJob: (jobsRes.count ?? 0) > 0,
        hasTasks: (tasksRes.count ?? 0) > 0,
      };
    },
    staleTime: 30 * 1000,
  });

  if (!data) return null;

  const steps = [
    {
      done: data.company,
      label: 'Set up your company',
      sub: 'Name, logo and details — they brand everything your clients see',
      section: 'settings',
    },
    {
      done: data.rosterCount > 0,
      label: 'Invite your team',
      sub:
        data.rosterCount > 0
          ? `${data.linkedCount} of ${data.rosterCount} joined — they link the moment they sign in`
          : 'WhatsApp the team code or add them by email',
      section: 'team',
    },
    {
      done: data.hasJob,
      label: 'Create your first job',
      sub: 'Client, site, dates — the container everything else lives in',
      section: 'jobs',
    },
    {
      done: data.hasTasks,
      label: 'Break it into tickets',
      sub: 'Describe the job and let the AI propose the task list',
      section: 'jobs',
    },
  ];

  const remaining = steps.filter((s) => !s.done).length;
  if (remaining === 0) return null;

  return (
    <div className="rounded-2xl bg-elec-yellow/[0.05] border border-elec-yellow/25 p-5 space-y-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[14px] font-semibold text-white">Get your firm running</p>
        <p className="text-[11.5px] text-white/50">
          {steps.length - remaining} of {steps.length} done
        </p>
      </div>
      <div className="space-y-1.5">
        {steps.map((step) => (
          <button
            key={step.label}
            type="button"
            onClick={() => !step.done && onNavigate(step.section)}
            disabled={step.done}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left touch-manipulation disabled:opacity-60 enabled:hover:bg-white/[0.04] transition-colors"
          >
            {step.done ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-white/30 shrink-0" />
            )}
            <span className="min-w-0 flex-1">
              <span
                className={`block text-[13px] font-medium ${step.done ? 'text-white/50 line-through' : 'text-white'}`}
              >
                {step.label}
              </span>
              <span className="block text-[11.5px] text-white/45">{step.sub}</span>
            </span>
            {!step.done && <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FirstRunChecklist;
