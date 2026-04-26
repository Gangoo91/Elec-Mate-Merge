/**
 * EPASimulator
 *
 * Tab layout: Readiness | Discussion | Knowledge | History
 * Main entry page for the EPA Readiness Simulator feature.
 */

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Target, MessageSquare, FileText, Clock, Award, Send, Check } from 'lucide-react';
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

const TABS: { id: TabId; label: string; icon: typeof Target }[] = [
  { id: 'readiness', label: 'Readiness', icon: Target },
  { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  { id: 'knowledge', label: 'Knowledge', icon: FileText },
  { id: 'history', label: 'History', icon: Clock },
];

const EPASimulator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'readiness';
  const setActiveTab = (tab: TabId) => setSearchParams({ tab }, { replace: false });

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
    <div className="max-w-2xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="mb-3">
          <SmartBackButton />
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-elec-yellow/20 rounded-xl shrink-0">
            <Award className="h-7 w-7 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">EPA Simulator</h1>
            <p className="text-white text-sm">
              Practise for your End Point Assessment with AI-powered mock sessions
            </p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex px-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium touch-manipulation transition-colors',
                activeTab === tab.id
                  ? 'text-elec-yellow border-b-2 border-elec-yellow'
                  : 'text-white'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
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
          />
        )}

        {activeTab === 'readiness' && !qualificationCode && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-sm text-white text-center">
              Set your qualification in your profile to see EPA readiness data.
            </p>
          </div>
        )}

        {activeTab === 'discussion' && (
          <EPAProfessionalDiscussion
            portfolioEntries={portfolioEntries}
            qualificationCode={qualificationCode || ''}
            onSessionComplete={invalidateReadiness}
          />
        )}

        {activeTab === 'knowledge' && (
          <EPAKnowledgeQuiz
            qualificationCode={qualificationCode || ''}
            onSessionComplete={invalidateReadiness}
          />
        )}

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

const GRADE_COLOURS: Record<string, string> = {
  distinction: 'text-emerald-400',
  pass: 'text-amber-400',
  fail: 'text-red-400',
};

function HistoryTab({ items, isLoading }: { items: HistoryItem[]; isLoading: boolean }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [collegeStudent, setCollegeStudent] = useState<{ id: string; college_id: string; name: string } | null>(null);
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
          item.score >= 80 ? 'ready' : item.score >= 60 ? 'almost' : item.score >= 40 ? 'not_yet' : 'refer';
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
        <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 space-y-3">
        <Clock className="h-10 w-10 text-white" />
        <p className="text-sm text-white text-center">
          No mock sessions completed yet. Start a discussion or knowledge test to see your history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 px-4 py-5">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Past Sessions</h3>
      {collegeStudent && (
        <p className="text-[11px] text-white/65 leading-snug pb-1">
          Tap "Submit to tutor" on a session to have it appear as your self-assessment on your tutor's dashboard.
        </p>
      )}
      {items.map((item) => {
        const isSubmitted = submittedSessionId === item.id;
        const isWorking = submitting === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              'flex flex-col gap-2 p-3 rounded-xl border',
              isSubmitted
                ? 'bg-emerald-500/[0.05] border-emerald-400/30'
                : 'bg-white/[0.03] border-white/10'
            )}
          >
            <div className="flex items-center gap-3">
              {item.type === 'professional_discussion' ? (
                <MessageSquare className="h-5 w-5 text-purple-400 shrink-0" />
              ) : (
                <FileText className="h-5 w-5 text-blue-400 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {item.type === 'professional_discussion'
                    ? 'Professional Discussion'
                    : 'Knowledge Test'}
                </p>
                <p className="text-[10px] text-white">
                  {item.completedAt.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  · {Math.floor(item.timeSpent / 60)}m
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-foreground">{item.score}</p>
                <p className={cn('text-[10px] capitalize', GRADE_COLOURS[item.grade] || 'text-white')}>
                  {item.grade === 'not_yet_ready'
                    ? 'Fail'
                    : item.grade === 'merit'
                      ? 'Pass'
                      : item.grade?.replace('_', ' ')}
                </p>
              </div>
            </div>
            {collegeStudent && (
              <button
                type="button"
                onClick={() => submit(item)}
                disabled={isSubmitted || isWorking}
                className={cn(
                  'h-9 rounded-lg text-[12px] font-semibold tracking-tight inline-flex items-center justify-center gap-1.5 transition-colors touch-manipulation',
                  isSubmitted
                    ? 'bg-emerald-500/[0.12] border border-emerald-400/30 text-emerald-200 cursor-default'
                    : 'bg-elec-yellow/[0.10] border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/[0.18]'
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
          </div>
        );
      })}
    </div>
  );
}

export default EPASimulator;
