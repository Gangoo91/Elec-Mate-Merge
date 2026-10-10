/**
 * EPASimulator
 *
 * Tab layout: Readiness | Your portfolio | Knowledge | History
 * Main entry page for the EPA Readiness Simulator feature.
 *
 * 6 Oct 2026: the learner's qualification (the one their portfolio is on)
 * decides the route — AM2S, AM2, AM2E or AM2D — and so what this page says
 * about grading. Pass/Merit/Distinction is shown only where it's sourced
 * (ST0152). Questioning comes from their own portfolio and their
 * qualification's ACs.
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import { P_TAB_LINE, P_TAB_RAIL, pTab } from '@/components/apprentice-hub/portfolio2/ui';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EPAReadinessDashboard } from '@/components/epa/EPAReadinessDashboard';
import { EPAProfessionalDiscussion } from '@/components/epa/EPAProfessionalDiscussion';
import { EPAKnowledgeQuiz } from '@/components/epa/EPAKnowledgeQuiz';
import type { PortfolioEntry } from '@/types/portfolio';
import { AM2_BANDS, gradeDisplay, pointsToNextBand, verdictForMockScore } from '@/lib/epa/grading';
import { EPA_FACTS } from '@/lib/epa/facts';
import { epaRouteFor } from '@/lib/epa/readiness';
import { Am2TaskReadiness } from '@/components/epa/Am2TaskReadiness';
import { ElectricalEpaPanel } from '@/components/epa/ElectricalEpaPanel';
import { routeForPlan, usePlanVersion } from '@/hooks/epa/useElectricalEpa';

type TabId = 'readiness' | 'discussion' | 'knowledge' | 'history';

const TABS: { id: TabId; label: string }[] = [
  { id: 'readiness', label: 'Readiness' },
  { id: 'discussion', label: 'Your portfolio' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'history', label: 'History' },
];

/**
 * Shown on every tab that's built around the apprentice's qualification when
 * none is set — without it the readiness, discussion and knowledge questions
 * would silently generate generic ('unknown') content.
 *
 * It used to be a dead end: it told you the qualification was missing and then
 * left you to work out where to set it. It now takes you there.
 */
function SetupNeeded() {
  const navigate = useNavigate();
  return (
    <CollegeEmpty
      title="Choose your qualification first"
      body="The readiness check, the questions on your portfolio and every knowledge question are built from its units and ACs, so the simulator can’t generate anything useful without it."
      action={
        <button
          type="button"
          onClick={() => navigate('/apprentice/hub')}
          className={COLLEGE_BTN_PRIMARY}
        >
          Choose your qualification
        </button>
      }
    />
  );
}

const EPASimulator = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'readiness';
  const setActiveTab = useCallback(
    (tab: TabId) => setSearchParams({ tab }, { replace: false }),
    [setSearchParams]
  );

  const { user } = useAuth();
  const { qualificationCode, qualificationId, enrolmentCode } = useStudentQualification();
  const route = epaRouteFor(enrolmentCode ?? qualificationCode);
  // ELE-2054: the plan version by start date decides which NET task list applies.
  const { data: planVersion } = usePlanVersion(user?.id);

  /*
   * A live mock session must survive a tab switch.
   *
   * The tabs rendered conditionally — `activeTab === 'knowledge' && <Quiz/>` —
   * so changing tab UNMOUNTED the component and took the session with it.
   * Nothing is persisted anywhere, so an apprentice eighteen questions into a
   * thirty-question mock who tapped "Readiness" to check something lost the
   * lot, including the AI generation behind it. The discussion was worse:
   * those are long typed answers.
   *
   * The two session tabs now stay mounted and are hidden when inactive, so
   * switching away and back is lossless. Mounting is cheap — neither generates
   * anything until you ask it to. Readiness and History stay conditional:
   * readiness is deliberately re-mounted via `readinessKey` to recalculate,
   * and history fetches when you open it.
   *
   * `sessionActive` remains for the refresh/close warning, which mounting
   * cannot solve.
   */
  /* Tracked per tab — both components are mounted now, so a single flag
     would let whichever reported last overwrite the other. */
  const [discussionActive, setDiscussionActive] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const sessionActive = discussionActive || quizActive;

  useEffect(() => {
    if (!sessionActive) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [sessionActive]);
  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  // Increment to force readiness dashboard to re-mount and recalculate
  const [readinessKey, setReadinessKey] = useState(0);
  const invalidateReadiness = useCallback(() => {
    setReadinessKey((k) => k + 1);
  }, []);
  // Target AC for "Drill this AC" deep-link from readiness → knowledge tab
  const [targetAC, setTargetAC] = useState<{
    acRef: string;
    acText: string;
    unitCode?: string;
  } | null>(null);
  const handleTargetAC = useCallback(
    (acRef: string, acText: string, unitCode?: string) => {
      setTargetAC({ acRef, acText, unitCode });
      setActiveTab('knowledge');
    },
    [setActiveTab]
  );

  // Fetch portfolio entries for discussion
  useEffect(() => {
    if (!user) return;

    const fetchPortfolio = async () => {
      try {
        const { data } = await supabase
          .from('portfolio_items')
          .select('id, title, description, skills_demonstrated, assessment_criteria_met')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (data) {
          setPortfolioEntries(
            data.map((item) => ({
              id: item.id,
              title: item.title || '',
              description: item.description || '',
              skills: item.skills_demonstrated || [],
              assessmentCriteria: item.assessment_criteria_met || [],
              date: '',
              type: 'site_work' as const,
              evidenceItems: [],
              tags: [],
            }))
          );
        }
      } catch {
        /* non-critical */
      }
    };

    fetchPortfolio();
  }, [user]);

  // Fetch history when tab activated
  useEffect(() => {
    if (activeTab !== 'history' || !user) return;

    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const { data } = await supabase
          .from('epa_mock_sessions')
          .select(
            'id, session_type, overall_score, predicted_grade, completed_at, time_spent_seconds, component_scores'
          )
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(20);

        setHistory(
          (data || []).map((s) => ({
            id: s.id,
            type: s.session_type as 'professional_discussion' | 'knowledge_test',
            score: s.overall_score,
            grade: s.predicted_grade,
            completedAt: s.completed_at ? new Date(s.completed_at) : new Date(),
            timeSpent: s.time_spent_seconds || 0,
            // Only a full sitting can be submitted as a self-assessment.
            // Older rows have no _meta: a knowledge test can't be told apart
            // from a drill, so it isn't; an older discussion counts.
            full:
              (s.component_scores as { _meta?: { full?: boolean } } | null)?._meta?.full ??
              s.session_type === 'professional_discussion',
          }))
        );
      } catch {
        setHistory([]);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [activeTab, user]);

  return (
    <HubPage>
      <HubMasthead section="Apprentice · EPA" title="EPA simulator" backTo="/apprentice" />

      <HubBody>
        <CollegePageHeader
          eyebrow="End-point assessment"
          title="EPA simulator"
          description={`${qualificationCode ? `${route.summary} ` : ''}Everything here is built from your own portfolio and your qualification’s units and ACs.`}
        />

        {/*
         * What the marks actually mean: the AM2 bands and the retake rule,
         * which is the single most consequential thing an apprentice can know
         * before their first attempt. A status line of figures, not chips.
         */}
        {route.graded && (
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={COLLEGE_CARD}
            aria-label="Grade boundaries"
          >
            <h2 className="text-[16px] font-semibold text-white">What you are aiming at</h2>
            <dl className="mt-3 grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-0">
              {[
                { label: 'Pass', pct: AM2_BANDS.pass },
                { label: 'Merit', pct: AM2_BANDS.merit },
                { label: 'Distinction', pct: AM2_BANDS.distinction },
              ].map((b, i) => (
                <div key={b.label} className="flex min-w-0 items-center">
                  {i > 0 && (
                    <span aria-hidden className="mx-5 hidden h-8 w-px bg-white/[0.14] sm:block" />
                  )}
                  <div>
                    <dt className="text-[13px] font-medium text-white">{b.label}</dt>
                    <dd className="mt-0.5 text-[24px] font-bold leading-none tabular-nums text-white">
                      {b.pct}%
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-white">
              These are the AM2S grade boundaries, so a mock score here means the same thing it
              would on the day. {EPA_FACTS.retake} {EPA_FACTS.overallGrade}
            </p>
          </motion.section>
        )}

        {/* Sections: quiet text tabs with a yellow underline, not pills. */}
        <div role="tablist" aria-label="EPA simulator sections" className={P_TAB_RAIL}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={pTab(isActive)}
              >
                {tab.label}
                {isActive && <span aria-hidden className={P_TAB_LINE} />}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="-mt-2 min-h-[50vh] sm:-mt-4">
          {activeTab === 'readiness' && qualificationCode && (
            <EPAReadinessDashboard
              key={readinessKey}
              qualificationCode={qualificationCode}
              qualificationId={qualificationId}
              enrolmentCode={enrolmentCode}
              onStartDiscussion={() => setActiveTab('discussion')}
              onStartKnowledgeTest={() => setActiveTab('knowledge')}
              onTargetAC={handleTargetAC}
            />
          )}

          {/* ELE-1907: AM2 practice against NET's task list, the same view the tutor sees. */}
          {activeTab === 'readiness' && qualificationCode && user && (
            <div className="mt-8 space-y-5">
              <Am2TaskReadiness
                userId={user.id}
                routeKind={routeForPlan(route.kind, planVersion)}
                audience="learner"
              />
              {/* ELE-2049/2050/2054/2055: on-site practice, NET checklist, plan version, Gold Card. */}
              <ElectricalEpaPanel learnerId={user.id} audience="learner" plan={planVersion} />
            </div>
          )}

          {activeTab === 'readiness' && !qualificationCode && <SetupNeeded />}

          {/* Hidden, not unmounted — see the note on `sessionActive` above. */}
          {qualificationCode ? (
            <div hidden={activeTab !== 'discussion'}>
              <EPAProfessionalDiscussion
                portfolioEntries={portfolioEntries}
                qualificationCode={qualificationCode}
                enrolmentCode={enrolmentCode}
                onSessionComplete={invalidateReadiness}
                onActiveChange={setDiscussionActive}
              />
            </div>
          ) : (
            activeTab === 'discussion' && <SetupNeeded />
          )}

          {qualificationCode ? (
            <div hidden={activeTab !== 'knowledge'}>
              <EPAKnowledgeQuiz
                qualificationCode={qualificationCode}
                targetAC={targetAC}
                onClearTargetAC={() => setTargetAC(null)}
                onSessionComplete={invalidateReadiness}
                onActiveChange={setQuizActive}
              />
            </div>
          ) : (
            activeTab === 'knowledge' && <SetupNeeded />
          )}

          {activeTab === 'history' && (
            <HistoryTab
              items={history}
              isLoading={isLoadingHistory}
              onStartSession={() => setActiveTab('discussion')}
            />
          )}
        </div>
      </HubBody>
    </HubPage>
  );
};

// --- History ---
interface HistoryItem {
  id: string;
  type: 'professional_discussion' | 'knowledge_test';
  score: number;
  grade: string;
  completedAt: Date;
  timeSpent: number;
  full: boolean;
}

function HistoryTab({
  items,
  isLoading,
  onStartSession,
}: {
  items: HistoryItem[];
  isLoading: boolean;
  onStartSession: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [collegeStudent, setCollegeStudent] = useState<{
    id: string;
    college_id: string;
    name: string;
  } | null>(null);
  const [submittedSessionId, setSubmittedSessionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);

  // Look up the apprentice's college_student row + their existing self-judgement
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data: cs } = await supabase
        .from('college_students')
        .select('id, college_id, name')
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      const row = cs as { id: string; college_id: string; name: string } | null;
      setCollegeStudent(row);
      if (row) {
        // Find which mock session is currently linked to the learner judgement
        const { data: mock } = await supabase
          .from('epa_mock_sessions')
          .select('id')
          .eq('user_id', user.id)
          .not('submitted_to_tutor_at', 'is', null)
          .order('submitted_to_tutor_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (cancelled) return;
        setSubmittedSessionId((mock as { id: string } | null)?.id ?? null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const submit = useCallback(
    async (item: HistoryItem) => {
      if (!user || !collegeStudent) return;
      setSubmitting(item.id);
      try {
        // One mapping, shared with the tutor's view. The grade goes through as
        // it was marked — a fail used to be sent as "pass" when it scored 50+.
        const verdict = verdictForMockScore(item.score);
        const grade = (['distinction', 'merit', 'pass'] as const).includes(
          item.grade as 'distinction' | 'merit' | 'pass'
        )
          ? (item.grade as 'distinction' | 'merit' | 'pass')
          : 'fail';
        const rationale = `Self-assessed via the EPA Simulator on ${item.completedAt.toLocaleDateString('en-GB')}. Full ${item.type === 'professional_discussion' ? 'portfolio questioning session' : 'knowledge test'} scored ${item.score}% (${gradeDisplay(item.grade).label}).`;
        const { error: jErr } = await supabase.from('college_epa_judgements').insert({
          college_id: collegeStudent.college_id,
          college_student_id: collegeStudent.id,
          source: 'learner',
          source_user_id: user.id,
          source_name_snapshot: collegeStudent.name,
          verdict,
          predicted_grade: grade,
          confidence: null,
          rationale,
          strengths: [],
          blockers: [],
          recommended_actions: [],
          what_if: [],
          citations: [],
          signals_used: { mock_session_id: item.id, score: item.score, type: item.type },
          is_current: true,
        });
        if (jErr) throw jErr;

        // Stamp the mock session
        const { error: mErr } = await supabase
          .from('epa_mock_sessions')
          .update({ submitted_to_tutor_at: new Date().toISOString() })
          .eq('id', item.id);
        if (mErr) throw mErr;

        setSubmittedSessionId(item.id);
        toast({
          title: 'Submitted to your tutor',
          description: 'Your self-assessment is now visible alongside the tutor and AI verdicts.',
        });
      } catch (e) {
        toast({
          title: 'Could not submit',
          description: (e as Error).message,
          variant: 'destructive',
        });
      } finally {
        setSubmitting(null);
      }
    },
    [user, collegeStudent, toast]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin h-5 w-5 border-2 border-elec-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  if (items.length === 0) {
    /* Also a dead end before — it described the empty state and stopped. */
    return (
      <CollegeEmpty
        title="No sessions yet"
        body="Once you have run a mock discussion or knowledge test, every attempt lands here with its score, predicted grade and how you are moving between attempts."
        action={
          <button type="button" onClick={onStartSession} className={COLLEGE_BTN_PRIMARY}>
            Run your first mock
          </button>
        }
      />
    );
  }

  // Trajectory — best score (+ its grade), latest, and the move since the
  // previous session. `items` are already newest-first.
  const latest = items[0];
  const best = items.reduce((b, x) => (x.score > b.score ? x : b), items[0]);
  const bestG = gradeDisplay(best.grade);
  // Compare like with like — a discussion against the last knowledge test
  // showed swings like ▲35 that meant nothing.
  const prevScore = items.slice(1).find((x) => x.type === latest.type)?.score ?? null;
  const delta = prevScore !== null ? latest.score - prevScore : null;
  const next = pointsToNextBand(best.score);

  return (
    <div className="space-y-5">
      {/* Trajectory: one card, figures as a status line with hairlines between. */}
      <section className={COLLEGE_CARD} aria-label="Your trajectory">
        <h2 className="text-[16px] font-semibold text-white">
          Your trajectory · {items.length} session{items.length === 1 ? '' : 's'}
        </h2>
        <dl className="mt-3 grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-0">
          {[
            { label: 'Best', value: `${best.score}%`, foot: bestG.label, footCn: bestG.className },
            {
              label: 'Latest',
              value: `${latest.score}%`,
              foot:
                delta === null
                  ? 'First of its kind'
                  : delta > 0
                    ? `Up ${delta}`
                    : delta < 0
                      ? `Down ${Math.abs(delta)}`
                      : 'No change',
              footCn: delta !== null && delta < 0 ? 'text-orange-300' : 'text-white',
            },
            {
              label: 'Sessions',
              value: String(items.length),
              foot: 'logged',
              footCn: 'text-white',
            },
          ].map((cell, i) => (
            <div key={cell.label} className="flex min-w-0 items-center">
              {i > 0 && (
                <span aria-hidden className="mx-5 hidden h-10 w-px bg-white/[0.14] sm:block" />
              )}
              <div className="min-w-0">
                <dt className="text-[13px] font-medium text-white">{cell.label}</dt>
                <dd className="mt-0.5 text-[24px] font-bold leading-none tabular-nums text-white">
                  {cell.value}
                </dd>
                <dd className={cn('mt-1 text-[12.5px] font-medium', cell.footCn)}>{cell.foot}</dd>
              </div>
            </div>
          ))}
        </dl>
        {/* Distance to the next band — a score on its own does not tell you how
            much work is left. `next` is null once you are at distinction. */}
        <p className="mt-4 text-[13.5px] leading-relaxed text-white">
          {next
            ? `Your best is ${best.score}%, ${next.points} ${next.points === 1 ? 'point' : 'points'} off a ${next.target}.`
            : `Your best is ${best.score}%, distinction standard on the AM2 bands.`}
        </p>
        {collegeStudent && (
          <p className="mt-2 text-[13px] leading-relaxed text-white">
            Your tutor sees the same readiness you do. Submit a full sitting to log it as your
            self-assessment alongside the tutor and AI verdicts. Drills (fewer than 30 questions,
            one difficulty or one AC) can’t be submitted.
          </p>
        )}
      </section>

      <ul className={COLLEGE_LIST}>
        {items.map((item) => {
          const isSubmitted = submittedSessionId === item.id;
          const isWorking = submitting === item.id;
          const g = gradeDisplay(item.grade);
          return (
            <li key={item.id} className="px-5 py-4 sm:px-6">
              <div className="flex items-start gap-4">
                <div className="w-11 shrink-0 rounded-xl border border-white/[0.1] py-1.5 text-center">
                  <p className="text-[12px] font-medium leading-none text-white">
                    {item.completedAt.toLocaleDateString('en-GB', { month: 'short' })}
                  </p>
                  <p className="mt-1 text-[17px] font-bold leading-none tabular-nums text-white">
                    {item.completedAt.getDate()}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-semibold leading-snug text-white">
                    {item.type === 'professional_discussion'
                      ? 'Questions on your portfolio'
                      : 'Knowledge test'}
                    {item.full ? '' : ' · drill'}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white">
                    <span className={g.className}>{g.label}</span> ·{' '}
                    {Math.floor(item.timeSpent / 60)} min
                  </p>
                </div>
                <p className="shrink-0 text-[22px] font-bold leading-none tabular-nums text-white">
                  {item.score}%
                </p>
              </div>
              {collegeStudent && item.full && (
                <button
                  type="button"
                  onClick={() => submit(item)}
                  disabled={isSubmitted || isWorking}
                  className={cn(
                    COLLEGE_BTN,
                    'mt-3 w-full sm:w-auto',
                    isSubmitted &&
                      'cursor-default border-emerald-400/60 hover:border-emerald-400/60'
                  )}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-300" strokeWidth={2.5} />
                      Submitted to your tutor
                    </>
                  ) : isWorking ? (
                    'Submitting…'
                  ) : (
                    <>
                      <Send className="h-4 w-4" strokeWidth={1.75} />
                      Submit as my self-assessment
                    </>
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EPASimulator;
