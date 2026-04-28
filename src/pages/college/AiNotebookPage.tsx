import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotebook } from '@/hooks/useNotebook';
import { NotebookShell } from '@/components/notebook/NotebookShell';
import { CohortThisWeekCard } from '@/components/college/CohortThisWeekCard';
import { cn } from '@/lib/utils';

/* ==========================================================================
   AiNotebookPage — /college/ai-notebook
   Tutor's analytical AI co-tutor — answers questions about a specific
   learner using their actual data. Top-level surface, mirrors the
   apprentice's College AI on the other side of the loop.
   ========================================================================== */

const STARTER_CARDS = [
  { category: 'Gateway', prompt: 'How is this learner tracking against gateway?' },
  { category: 'Gaps', prompt: 'Where are the biggest AC gaps?' },
  { category: '1-2-1', prompt: "Draft a 1-2-1 agenda focused on what they're behind on." },
  { category: 'Observe', prompt: 'What should I observe next time I see them?' },
];

interface LearnerOption {
  id: string;
  name: string;
  cohort_name: string | null;
}

export default function AiNotebookPage() {
  useSEO({
    title: 'AI Notebook',
    description: 'Ask anything about your learners — grounded in real data.',
    noindex: true,
  });

  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStudent = searchParams.get('student');
  const [subjectStudentId, setSubjectStudentId] = useState<string | null>(queryStudent);
  const [learners, setLearners] = useState<LearnerOption[]>([]);
  const [loadingLearners, setLoadingLearners] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(!queryStudent);

  // Pull the staff member's cohort + assigned learners. Falls back to all
  // college learners if the staff member has no assignments.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoadingLearners(true);
      // Resolve staff college
      const { data: staff } = await supabase
        .from('college_staff')
        .select('college_id')
        .eq('user_id', user.id)
        .maybeSingle();
      const collegeId = (staff as { college_id?: string } | null)?.college_id ?? null;
      if (!collegeId) {
        if (!cancelled) {
          setLearners([]);
          setLoadingLearners(false);
        }
        return;
      }
      // Try assignments first
      const { data: assignments } = await supabase
        .from('college_student_assignments')
        .select('student_id')
        .or(`tutor_id.eq.${user.id},assessor_id.eq.${user.id},iqa_id.eq.${user.id}`);
      const assignedIds = ((assignments ?? []) as Array<{ student_id: string }>).map(
        (r) => r.student_id
      );

      let q = supabase
        .from('college_students')
        .select('id, name, college_cohorts(name)')
        .eq('college_id', collegeId)
        .order('name');
      if (assignedIds.length > 0) {
        q = q.in('id', assignedIds);
      }
      const { data } = await q;
      if (cancelled) return;
      const opts: LearnerOption[] = (
        (data ?? []) as Array<{
          id: string;
          name: string;
          college_cohorts: { name: string } | null;
        }>
      ).map((r) => ({
        id: r.id,
        name: r.name,
        cohort_name: r.college_cohorts?.name ?? null,
      }));
      setLearners(opts);
      setLoadingLearners(false);
      // Auto-pick if URL pre-targets and the learner is in scope
      if (queryStudent && opts.some((o) => o.id === queryStudent)) {
        setSubjectStudentId(queryStudent);
        setPickerOpen(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, queryStudent]);

  const nb = useNotebook({
    persona: 'tutor',
    subjectStudentId,
  });

  const activeLearner = learners.find((l) => l.id === subjectStudentId) ?? null;

  // Render the picker as a standalone view when no learner selected.
  if (pickerOpen || !subjectStudentId) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_8%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
            AI Notebook
          </div>
          <h1 className="mt-1 text-[22px] sm:text-[28px] lg:text-[36px] font-semibold text-white tracking-tight leading-[1.1]">
            Pick a learner to ask about
          </h1>
          <p className="mt-2 text-[12.5px] sm:text-[13px] text-white/85 leading-snug max-w-2xl">
            The notebook grounds every answer in this learner's actual data — ACs, quiz history,
            OTJ, observations, EPA verdicts. Pick who you want to focus on.
          </p>

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
            {loadingLearners ? (
              <div className="px-5 py-6 text-[12.5px] text-white/85">Loading learners…</div>
            ) : learners.length === 0 ? (
              <div className="px-5 py-6 text-[12.5px] text-white/85">
                No learners assigned to you yet. Ask your college admin to add you to the cohort.
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.05] max-h-[60vh] overflow-y-auto">
                {learners.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSubjectStudentId(l.id);
                        setPickerOpen(false);
                        setSearchParams({ student: l.id });
                      }}
                      className="w-full text-left px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors touch-manipulation"
                    >
                      <div className="text-[13.5px] font-medium text-white leading-snug">
                        {l.name}
                      </div>
                      {l.cohort_name && (
                        <div className="mt-0.5 text-[11px] text-white/85">{l.cohort_name}</div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NotebookShell
      eyebrow="AI Notebook"
      title="Ask anything about this learner"
      description="Grounded in their actual ACs, quiz attempts, OTJ, observations, EPA verdicts, ILP. Cites evidence. Suggests tutor actions you can take in one tap."
      tone="amber"
      starterCards={STARTER_CARDS}
      conversations={nb.conversations}
      activeId={nb.activeId}
      setActiveId={nb.setActiveId}
      messages={nb.messages}
      loadingConversations={nb.loadingConversations}
      loadingMessages={nb.loadingMessages}
      streaming={nb.streaming}
      error={nb.error}
      send={nb.send}
      newConversation={nb.newConversation}
      deleteConversation={nb.deleteConversation}
      togglePinned={nb.togglePinned}
      markProposalFiled={nb.markProposalFiled}
      welcomeExtra={<CohortThisWeekCard />}
      headerExtra={
        activeLearner && (
          <button
            type="button"
            onClick={() => {
              setSubjectStudentId(null);
              setPickerOpen(true);
              nb.newConversation();
              setSearchParams({});
            }}
            className={cn(
              'inline-flex items-center h-7 px-2.5 rounded-full border border-amber-400/30 bg-amber-500/[0.08] text-[11px] font-medium text-amber-200 hover:bg-amber-500/[0.14] transition-colors touch-manipulation'
            )}
          >
            {activeLearner.name}
            {activeLearner.cohort_name && (
              <span className="ml-1.5 text-amber-100/85">· {activeLearner.cohort_name}</span>
            )}
            <span className="ml-1.5 text-amber-200/65">change ↓</span>
          </button>
        )
      }
    />
  );
}
