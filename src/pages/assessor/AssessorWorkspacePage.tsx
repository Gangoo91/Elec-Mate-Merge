/**
 * AssessorWorkspacePage — /assessor (ELE-1870 / ELE-1867)
 *
 * Where an independent assessor (or IQA / EPA assessor) works: every learner
 * who invited them, and for the chosen learner the full criteria view with
 * decisions. No subscription needed; access is scoped by the learner's link
 * (RLS + _can_assess). College staff use the same LearnerAssessmentView from
 * Student 360.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { LearnerAssessmentView } from '@/components/assessment/LearnerAssessmentView';
import { AssessorProfileCard } from '@/components/assessment/AssessorProfileCard';
import { ROLE_LABEL } from '@/lib/assessorInvite';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicPageShell,
} from '@/components/public/PublicPageShell';

const HELP: PageHelpContent = {
  id: 'assessor-workspace',
  title: 'Assessor workspace',
  what: 'Every apprentice who has invited you to assess their portfolio, and for each one their evidence against every criterion of their qualification.',
  steps: [
    {
      title: 'Open a learner',
      body: 'The count on each card is criteria the learner has put forward that have no decision yet.',
    },
    {
      title: 'Decide each criterion',
      body: 'Open a criterion to see the evidence mapped to it. Pass it, or send it back with what more is needed. The learner sees your feedback.',
    },
    {
      title: 'Keep your profile current',
      body: 'Your qualifications show next to your name, and each decision you record keeps a copy of them.',
    },
  ],
  notes: [
    {
      title: 'Access',
      body: 'You see only the learners who invited you, for as long as their invite stands. No subscription is needed.',
    },
  ],
};

interface LinkRow {
  id: string;
  learner_id: string;
  role: string;
  accepted_at: string | null;
}

export default function AssessorWorkspacePage() {
  const { user, profile } = useAuth();
  const [params, setParams] = useSearchParams();
  const [links, setLinks] = useState<LinkRow[] | null>(null);
  const [names, setNames] = useState<Record<string, string>>({});
  const [ready, setReady] = useState<Record<string, number>>({});
  const learnerId = params.get('learner');

  useEffect(() => {
    if (!user) return;
    supabase
      .from('portfolio_assessor_links' as never)
      .select('id, learner_id, role, accepted_at')
      .eq('assessor_user_id', user.id)
      .eq('status', 'active')
      // Employer links are for the employer's own view, not this workspace.
      .in('role', ['assessor', 'iqa', 'epa_assessor'])
      .order('accepted_at', { ascending: false })
      .then(async ({ data }) => {
        const rows = (data ?? []) as unknown as LinkRow[];
        setLinks(rows);
        const ids = [...new Set(rows.map((r) => r.learner_id))];
        if (ids.length) {
          const { data: profs } = await supabase
            .from('public_profiles')
            .select('id, full_name')
            .in('id', ids);
          setNames(
            Object.fromEntries((profs ?? []).map((p) => [p.id, p.full_name ?? 'Apprentice']))
          );
          // How much each learner has waiting: evidence put forward with no decision yet.
          const counts = await Promise.all(
            ids.map(async (id) => {
              const { data: st } = await (
                supabase.rpc.bind(supabase) as unknown as (
                  f: string,
                  p: Record<string, unknown>
                ) => Promise<{ data: { state: string }[] | null }>
              )('get_portfolio_ac_state', { p_user_id: id });
              return [
                id,
                (st ?? []).filter((r) => r.state === 'claimed' || r.state === 'submitted').length,
              ] as const;
            })
          );
          setReady(Object.fromEntries(counts));
        }
      });
  }, [user]);

  const current = useMemo(
    () => links?.find((l) => l.learner_id === learnerId) ?? null,
    [links, learnerId]
  );
  const mode = current?.role === 'iqa' ? 'iqa' : 'assessor';
  const learnerName = learnerId ? names[learnerId] : undefined;

  const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const totalReady = Object.values(ready).reduce((a, b) => a + b, 0);

  return (
    <PublicPageShell
      width="wide"
      homeTo="/assessor"
      right={
        learnerId ? (
          <button
            type="button"
            onClick={() => setParams({})}
            className="inline-flex h-11 items-center px-3 text-[15px] font-medium text-white touch-manipulation hover:text-elec-yellow"
          >
            All learners
          </button>
        ) : null
      }
    >
      {links === null && (
        <div className="flex items-center gap-2 text-[15px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}

      {links !== null && !learnerId && (
        <>
          <div className="flex items-start justify-between gap-4">
            <PublicEyebrow>Assessor workspace</PublicEyebrow>
            <PageHelpButton help={HELP} className="-mt-2 shrink-0" />
          </div>
          <PublicH1>
            {links.length === 0 ? (
              'No learners yet'
            ) : totalReady > 0 ? (
              <>
                {totalReady} criteria <span className="text-elec-yellow">ready for you</span>
              </>
            ) : (
              'Learners you assess'
            )}
          </PublicH1>
          <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.55] text-white">
            {links.length === 0
              ? 'When an apprentice invites you to assess their portfolio, open their link and they appear here.'
              : 'Open a learner to see their evidence against every criterion and record your decisions.'}
          </p>

          {links.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setParams({ learner: l.learner_id })}
                  className="text-left touch-manipulation transition-transform active:scale-[0.98]"
                >
                  {/* Neutral edge: one gold card per screen, not one per learner. */}
                  <PublicCard className="flex h-full items-center gap-4 border-white/[0.12]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[18px] font-bold text-white">
                      {(names[l.learner_id] ?? 'A').charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words text-[17px] font-bold leading-snug text-white">
                        {names[l.learner_id] ?? 'Apprentice'}
                      </span>
                      <span className="block text-[14px] text-white">
                        You are their {ROLE_LABEL[l.role] ?? 'assessor'}
                      </span>
                      <span
                        className={
                          (ready[l.learner_id] ?? 0) > 0
                            ? 'mt-1 block text-[14px] font-semibold text-orange-400'
                            : 'mt-1 block text-[14px] text-white'
                        }
                      >
                        {(ready[l.learner_id] ?? 0) > 0
                          ? `${ready[l.learner_id]} waiting for your decision`
                          : 'Nothing waiting'}
                      </span>
                    </span>
                  </PublicCard>
                </button>
              ))}
            </div>
          )}

          {user && (
            <div className="mt-10">
              <AssessorProfileCard userId={user.id} defaultName={profile?.full_name} />
            </div>
          )}
        </>
      )}

      {links !== null &&
        learnerId &&
        (current ? (
          <>
            <PublicEyebrow>{sentence(ROLE_LABEL[current.role] ?? 'assessor')}</PublicEyebrow>
            <PublicH1 className="mb-8">{learnerName ?? 'Learner'}</PublicH1>
            <div className="max-w-[56rem]">
              <LearnerAssessmentView
                learnerId={learnerId}
                mode={mode}
                learnerName={learnerName}
                appSidebar={false}
              />
            </div>
          </>
        ) : (
          <>
            <PublicEyebrow>Assessor workspace</PublicEyebrow>
            <PublicH1>You don't assess this learner</PublicH1>
            <p className="mt-4 text-[17px] leading-[1.55] text-white">
              Their invite may have been removed.
            </p>
          </>
        ))}
    </PublicPageShell>
  );
}
