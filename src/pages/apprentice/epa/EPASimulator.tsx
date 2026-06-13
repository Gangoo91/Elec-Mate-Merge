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
import { ArrowLeft, Send, Check } from 'lucide-react';
import { PageHero, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EPAReadinessDashboard } from '@/components/epa/EPAReadinessDashboard';
import { EPAProfessionalDiscussion } from '@/components/epa/EPAProfessionalDiscussion';
import { EPAKnowledgeQuiz } from '@/components/epa/EPAKnowledgeQuiz';
import type { PortfolioEntry } from '@/types/portfolio';

type TabId = 'readiness' | 'discussion' | 'knowledge' | 'history';

const TABS: { id: TabId; label: string }[] = [
  { id: 'readiness', label: 'Readiness' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'history', label: 'History' },
];

/** Shown on every tab that's built around the apprentice's qualification when
 *  none is set — without it the readiness, discussion and knowledge questions
 *  would silently generate generic ('unknown') content. */
function SetupNeeded() {
  return (
    <div className="px-4 sm:px-6 py-12 space-y-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Setup needed
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed max-w-md">
        Set your qualification in your profile to use the EPA simulator — the readiness check,
        professional discussion and knowledge questions are all built around it.
      </p>
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
    <div className="max-w-7xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-2 space-y-6">
        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/apprentice')}
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Apprentice · EPA"
            title="EPA simulator"
            description="Practise for your End Point Assessment with AI-powered mock sessions — readiness check, professional discussion and knowledge tests."
            tone="yellow"
          />
        </motion.div>
      </div>

      {/* Tab Bar — editorial pill row */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex gap-1.5 px-4 sm:px-6 py-2.5 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'h-9 px-3.5 rounded-full text-[12px] font-medium border transition-colors touch-manipulation flex-shrink-0',
                  isActive
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-white/[0.02] text-white/85 border-white/[0.08] hover:bg-white/[0.04]'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[60vh]">
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

        {activeTab === 'discussion' &&
          (qualificationCode ? (
            <EPAProfessionalDiscussion
              portfolioEntries={portfolioEntries}
              qualificationCode={qualificationCode}
              onSessionComplete={invalidateReadiness}
            />
          ) : (
            <SetupNeeded />
          ))}

        {activeTab === 'knowledge' &&
          (qualificationCode ? (
            <EPAKnowledgeQuiz
              qualificationCode={qualificationCode}
              targetAC={targetAC}
              onClearTargetAC={() => setTargetAC(null)}
              onSessionComplete={invalidateReadiness}
            />
          ) : (
            <SetupNeeded />
          ))}

        {activeTab === 'history' && <HistoryTab items={history} isLoading={isLoadingHistory} />}
      </div>
    </div>
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

/** Canonical EPA grade → display label + colour. Mocks write
 *  distinction | merit | pass | fail (legacy: not_yet_ready / not_yet_pass).
 *  Single source so the label and the colour can never disagree — merit is a
 *  grade above pass (not "Pass"), and a fail must read red. */
function gradeDisplay(grade: string | null | undefined): { label: string; className: string } {
  switch (grade) {
    case 'distinction':
      return { label: 'Distinction', className: 'text-elec-yellow' };
    case 'merit':
      return { label: 'Merit', className: 'text-elec-yellow/80' };
    case 'pass':
      return { label: 'Pass', className: 'text-white/85' };
    case 'fail':
    case 'not_yet_ready':
    case 'not_yet_pass':
      return { label: 'Fail', className: 'text-red-300' };
    default:
      return { label: grade ? grade.replace(/_/g, ' ') : '—', className: 'text-white/85' };
  }
}

function HistoryTab({ items, isLoading }: { items: HistoryItem[]; isLoading: boolean }) {
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
    return (
      <div className="px-4 sm:px-6 py-12 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          History
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-md">
          No mock sessions completed yet. Start a discussion or knowledge test and your past
          attempts will land here.
        </p>
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
    <div className="px-4 sm:px-6 py-6 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Your trajectory · {items.length} session{items.length === 1 ? '' : 's'}
      </span>

      {/* Trajectory strip — best / latest / move */}
      <div className="grid grid-cols-3 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="bg-[hsl(0_0%_10%)] px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/45">
            Best
          </span>
          <span className="text-[20px] font-mono font-semibold tabular-nums leading-none text-white">
            {best.score}
          </span>
          <span className={cn('text-[10.5px] font-medium', bestG.className)}>{bestG.label}</span>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/45">
            Latest
          </span>
          <span className="text-[20px] font-mono font-semibold tabular-nums leading-none text-white">
            {latest.score}
          </span>
          <span
            className={cn(
              'text-[10.5px] font-medium tabular-nums',
              delta === null
                ? 'text-white/40'
                : delta > 0
                  ? 'text-elec-yellow'
                  : delta < 0
                    ? 'text-red-300'
                    : 'text-white/50'
            )}
          >
            {delta === null
              ? 'first run'
              : delta > 0
                ? `▲ +${delta}`
                : delta < 0
                  ? `▼ ${delta}`
                  : 'no change'}
          </span>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/45">
            Sessions
          </span>
          <span className="text-[20px] font-mono font-semibold tabular-nums leading-none text-white">
            {items.length}
          </span>
          <span className="text-[10.5px] font-medium text-white/50">logged</span>
        </div>
      </div>

      {collegeStudent && (
        <p className="text-[12px] text-white/55 leading-snug">
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
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:px-5 sm:py-4 space-y-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-mono text-white/40 flex-shrink-0">
                  {item.completedAt.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 block">
                    {item.type === 'professional_discussion' ? 'Discussion' : 'Knowledge'} ·{' '}
                    {Math.floor(item.timeSpent / 60)}m
                  </span>
                  <span className={cn('text-[13px] font-medium', g.className)}>{g.label}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[24px] font-mono font-semibold text-white tabular-nums leading-none">
                    {item.score}
                  </span>
                  <span className="text-[11px] text-white/40 font-mono ml-0.5">/100</span>
                </div>
              </div>
              {collegeStudent && (
                <button
                  type="button"
                  onClick={() => submit(item)}
                  disabled={isSubmitted || isWorking}
                  className={cn(
                    'w-full h-9 rounded-md text-[12px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors touch-manipulation',
                    isSubmitted
                      ? 'border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow cursor-default'
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
