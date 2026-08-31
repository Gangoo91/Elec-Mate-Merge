/**
 * EPASimulator
 *
 * Tab layout: Readiness | Discussion | Knowledge | History
 * Main entry page for the EPA Readiness Simulator feature.
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send, Check } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CALLOUT, PANEL, PANEL_LABEL, PANEL_LABEL_ACCENT } from '@/components/ui/panel-recipe';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EPAReadinessDashboard } from '@/components/epa/EPAReadinessDashboard';
import { EPAProfessionalDiscussion } from '@/components/epa/EPAProfessionalDiscussion';
import { EPAKnowledgeQuiz } from '@/components/epa/EPAKnowledgeQuiz';
import type { PortfolioEntry } from '@/types/portfolio';
import { AM2_BANDS, gradeDisplay, pointsToNextBand } from '@/lib/epa/grading';

type TabId = 'readiness' | 'discussion' | 'knowledge' | 'history';

const TABS: { id: TabId; label: string }[] = [
  { id: 'readiness', label: 'Readiness' },
  { id: 'discussion', label: 'Discussion' },
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
    <div className={cn(CALLOUT, 'max-w-xl space-y-3')}>
      <span className={PANEL_LABEL_ACCENT}>Setup needed</span>
      <p className="text-[14px] leading-relaxed text-white/85">
        Choose your qualification first — the readiness check, the professional discussion and every
        knowledge question are built from its assessment criteria, so the simulator cannot generate
        anything useful without it.
      </p>
      <Button
        onClick={() => navigate('/apprentice/hub')}
        className="h-11 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
      >
        Choose your qualification
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
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
  const { qualificationCode, qualificationId } = useStudentQualification();

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
            'id, session_type, overall_score, predicted_grade, completed_at, time_spent_seconds'
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
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Practise for your End Point Assessment with mock sessions built from your qualification's
          assessment criteria — a readiness check, a professional discussion and knowledge tests.
        </p>

        {/*
         * What the marks actually mean.
         *
         * The simulator scored and graded every session without ever saying what
         * it was grading against, so a percentage had no meaning attached to it.
         * Both mocks now use the AM2 bands, and this says so — including the
         * retake rule, which is the single most consequential thing an
         * apprentice can know before their first attempt and was nowhere in the
         * app.
         */}
        <div className={cn(PANEL, 'space-y-3')}>
          <span className={PANEL_LABEL}>What you are aiming at</span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Pass', pct: AM2_BANDS.pass },
              { label: 'Merit', pct: AM2_BANDS.merit },
              { label: 'Distinction', pct: AM2_BANDS.distinction },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-baseline gap-1.5 rounded-full border border-elec-yellow/40 px-3 py-1.5"
              >
                <span className="font-mono text-[13px] font-semibold tabular-nums text-elec-yellow">
                  {b.pct}%
                </span>
                <span className="text-[12px] font-medium text-white">{b.label}</span>
              </span>
            ))}
          </div>
          <p className="text-[13px] leading-relaxed text-white/85">
            These are the AM2 grade boundaries, so a mock score here means the same thing it would
            on the day. Worth knowing before you sit it:{' '}
            <span className="text-white">
              merit and distinction are only available on your first attempt
            </span>{' '}
            — a retake, however well you do, is capped at a pass.
          </p>
        </div>

        {/*
         * Tabs. Were 36px tall (under the 44px touch minimum) on a
         * `bg-white/[0.02]` surface you could not see, in a sticky bar with its
         * own border that fought the masthead above it. Now the same pill row
         * the rest of the apprentice hub uses.
         */}
        <motion.div variants={itemVariants} className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="EPA simulator sections"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex h-11 shrink-0 items-center rounded-full px-4 text-[13px]',
                    'transition-colors touch-manipulation active:scale-[0.98]',
                    isActive
                      ? 'bg-elec-yellow font-semibold text-black'
                      : 'border border-white/[0.16] font-medium text-white hover:border-white/[0.32]'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="min-h-[50vh]">
        {activeTab === 'readiness' && qualificationCode && (
          <EPAReadinessDashboard
            key={readinessKey}
            qualificationCode={qualificationCode}
            qualificationId={qualificationId}
            onStartDiscussion={() => setActiveTab('discussion')}
            onStartKnowledgeTest={() => setActiveTab('knowledge')}
            onTargetAC={handleTargetAC}
          />
        )}

        {activeTab === 'readiness' && !qualificationCode && <SetupNeeded />}

        {/* Hidden, not unmounted — see the note on `sessionActive` above. */}
        {qualificationCode ? (
          <div hidden={activeTab !== 'discussion'}>
            <EPAProfessionalDiscussion
              portfolioEntries={portfolioEntries}
              qualificationCode={qualificationCode}
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
        // Map mock score → verdict + grade for the self-judgement row
        const verdict =
          item.score >= 80
            ? 'ready'
            : item.score >= 60
              ? 'almost'
              : item.score >= 40
                ? 'not_yet'
                : 'refer';
        const grade =
          item.grade === 'distinction'
            ? 'distinction'
            : item.grade === 'merit'
              ? 'merit'
              : item.grade === 'pass'
                ? 'pass'
                : item.score >= 50
                  ? 'pass'
                  : 'fail';
        const rationale = `Self-assessed via the EPA Simulator on ${item.completedAt.toLocaleDateString('en-GB')}. Mock ${item.type.replace('_', ' ')} scored ${item.score}% (${item.grade}).`;
        const { error: jErr } = await supabase.from('college_epa_judgements').insert({
          college_id: collegeStudent.college_id,
          college_student_id: collegeStudent.id,
          source: 'learner',
          source_user_id: user.id,
          source_name_snapshot: collegeStudent.name,
          verdict,
          predicted_grade: grade,
          confidence: item.score,
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
      <div className={cn(PANEL, 'max-w-xl space-y-3')}>
        <span className={PANEL_LABEL}>No sessions yet</span>
        <p className="text-[14px] leading-relaxed text-white/85">
          Once you have run a mock discussion or knowledge test, every attempt lands here with its
          score, predicted grade and how you are moving between attempts.
        </p>
        <Button
          onClick={onStartSession}
          className="h-11 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
        >
          Run your first mock
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Trajectory — best score (+ its grade), latest, and the move since the
  // previous session. `items` are already newest-first.
  const latest = items[0];
  const best = items.reduce((b, x) => (x.score > b.score ? x : b), items[0]);
  const bestG = gradeDisplay(best.grade);
  const prevScore = items[1]?.score ?? null;
  const delta = prevScore !== null ? latest.score - prevScore : null;

  return (
    <div className="space-y-3">
      <span className={PANEL_LABEL}>
        Your trajectory · {items.length} session{items.length === 1 ? '' : 's'}
      </span>

      {/*
       * Trajectory strip. The three cells were `bg-[hsl(0_0%_10%)]` separated by
       * 2px of pure black — invisible cells divided by a seam darker than the
       * page. Now the standard lit surface with a hairline between, so the
       * figures sit on something.
       */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Best', value: best.score, foot: bestG.label, footCn: bestG.className },
          {
            label: 'Latest',
            value: latest.score,
            foot:
              delta === null
                ? 'first run'
                : delta > 0
                  ? `▲ +${delta}`
                  : delta < 0
                    ? `▼ ${delta}`
                    : 'no change',
            footCn: cn(
              'tabular-nums',
              delta === null
                ? 'text-white/70'
                : delta > 0
                  ? 'text-elec-yellow'
                  : delta < 0
                    ? 'text-red-400'
                    : 'text-white/70'
            ),
          },
          { label: 'Sessions', value: items.length, foot: 'logged', footCn: 'text-white/70' },
        ].map((cell) => (
          <div
            key={cell.label}
            className={cn(
              'flex flex-col items-center gap-1 rounded-2xl border border-elec-yellow/25 px-3 py-3.5 text-center',
              CARD_SURFACE
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/70">
              {cell.label}
            </span>
            <span className="font-mono text-[24px] font-semibold leading-none tabular-nums text-white">
              {cell.value}
            </span>
            <span className={cn('text-[11px] font-medium', cell.footCn)}>{cell.foot}</span>
          </div>
        ))}
      </div>

      {/* Distance to the next band — a score on its own does not tell you how
          much work is left. `next` is null once you are at distinction. */}
      {(() => {
        const next = pointsToNextBand(best.score);
        return next ? (
          <p className="text-[13px] leading-relaxed text-white/85">
            Your best is <span className="text-white">{best.score}%</span> —{' '}
            <span className="text-white">
              {next.points} {next.points === 1 ? 'point' : 'points'}
            </span>{' '}
            off a {next.target}.
          </p>
        ) : (
          <p className="text-[13px] leading-relaxed text-white/85">
            Your best is <span className="text-white">{best.score}%</span> — distinction standard on
            the AM2 bands.
          </p>
        );
      })()}

      {collegeStudent && (
        <p className="text-[13px] leading-relaxed text-white/85">
          Your latest mock already feeds your tutor's EPA readiness view. Submit a session to log it
          as a formal self-assessment alongside the tutor and AI verdicts.
        </p>
      )}
      <ul className="space-y-2">
        {items.map((item) => {
          const isSubmitted = submittedSessionId === item.id;
          const isWorking = submitting === item.id;
          const g = gradeDisplay(item.grade);
          return (
            <li
              key={item.id}
              className={cn(PANEL, "space-y-3")}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-mono text-white/70 flex-shrink-0">
                  {item.completedAt.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 block">
                    {item.type === 'professional_discussion' ? 'Discussion' : 'Knowledge'} ·{' '}
                    {Math.floor(item.timeSpent / 60)}m
                  </span>
                  <span className={cn('text-[13px] font-medium', g.className)}>{g.label}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[24px] font-mono font-semibold text-white tabular-nums leading-none">
                    {item.score}
                  </span>
                  <span className="text-[11px] text-white/70 font-mono ml-0.5">/100</span>
                </div>
              </div>
              {collegeStudent && (
                <button
                  type="button"
                  onClick={() => submit(item)}
                  disabled={isSubmitted || isWorking}
                  className={cn(
                    'w-full h-11 rounded-md text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors touch-manipulation',
                    isSubmitted
                      ? 'border border-elec-yellow/50 text-elec-yellow cursor-default'
                      : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  )}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Submitted to tutor
                    </>
                  ) : isWorking ? (
                    'Submitting…'
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
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
