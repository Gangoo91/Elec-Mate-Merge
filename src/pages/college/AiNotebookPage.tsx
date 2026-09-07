import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotebook } from '@/hooks/useNotebook';
import { NotebookShell } from '@/components/notebook/NotebookShell';
import { CohortThisWeekCard } from '@/components/college/CohortThisWeekCard';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { itemVariants } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubWorkList,
  HubSectionHeading,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';

/* ==========================================================================
   AiNotebookPage — /college/ai-notebook
   Tutor's analytical AI co-tutor — answers questions about a specific
   learner using their actual data. Top-level surface, mirrors the
   apprentice's College AI on the other side of the loop.

   The learner picker is now on the shared hub shell (masthead → list). The
   chat itself is NotebookShell, which owns its own header and back button.
   ========================================================================== */

const STARTER_CARDS = [
  { category: 'Gateway', prompt: 'How is this learner tracking against gateway?' },
  { category: 'Gaps', prompt: 'Where are the biggest AC gaps?' },
  { category: '1-2-1', prompt: "Draft a 1-2-1 agenda focused on what they're behind on." },
  { category: 'Observe', prompt: 'What should I observe next time I see them?' },
];

const BACK_TO = '/college?section=curriculumhub';
const PUSH_CONTEXT = 'Get notified about marking, off-the-job hours and learners who need you';

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
  const queryPrompt = searchParams.get('prompt');
  const [subjectStudentId, setSubjectStudentId] = useState<string | null>(queryStudent);
  const [learners, setLearners] = useState<LearnerOption[]>([]);
  const [loadingLearners, setLoadingLearners] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(!queryStudent);
  // Latch the initial prompt so it only auto-sends once per page load —
  // re-renders / cohort changes shouldn't keep firing it.
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(queryPrompt);

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
      // Try assignments first. tutor_id / assessor_id / iqa_id are auth uids
      // (FK → profiles.id), so user.id is the right key here.
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
        // college_student_assignments.student_id is the learner's AUTH UID
        // (FK → profiles.id), not the college row id. This filtered on `id`,
        // so a tutor with assignments always saw "No learners assigned".
        q = q.in('user_id', assignedIds);
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

  // If the launcher passed a `?prompt=...`, fire it once the notebook is
  // ready (subject is set + the conversations hook is no longer loading).
  // Depend on the specific stable members of `nb` rather than the whole
  // object — `nb` itself is a fresh shell on every render so depending
  // on it would retrigger this effect every paint.
  const nbSend = nb.send;
  const nbLoadingConversations = nb.loadingConversations;
  useEffect(() => {
    if (!pendingPrompt) return;
    if (!subjectStudentId) return;
    if (nbLoadingConversations) return;
    nbSend(pendingPrompt);
    setPendingPrompt(null);
    const next = new URLSearchParams(searchParams);
    next.delete('prompt');
    setSearchParams(next, { replace: true });
  }, [
    pendingPrompt,
    subjectStudentId,
    nbLoadingConversations,
    nbSend,
    searchParams,
    setSearchParams,
  ]);

  // Render the picker as a standalone view when no learner selected.
  if (pickerOpen || !subjectStudentId) {
    const items: HubWorkItem[] = learners.map((l) => ({
      id: l.id,
      title: l.name,
      reason: l.cohort_name ?? 'No cohort',
      onClick: () => {
        setSubjectStudentId(l.id);
        setPickerOpen(false);
        setSearchParams({ student: l.id });
      },
    }));

    return (
      <HubPage>
        <HubMasthead section="College" title="AI Notebook" backTo={BACK_TO} />
        <HubBody pushContext={PUSH_CONTEXT}>
          <p className="-mb-4 max-w-prose text-[13px] leading-relaxed text-white sm:-mb-6">
            Every answer is grounded in one learner's actual record — ACs, quiz history,
            off-the-job hours, observations, EPA verdicts. Pick who to focus on.
          </p>

          {loadingLearners ? (
            <div className="flex items-center justify-center py-24">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : items.length === 0 ? (
            <section className="space-y-3">
              <HubSectionHeading>Learners</HubSectionHeading>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                  '-mx-4 border-y border-elec-yellow/35 px-4 py-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
                  CARD_SURFACE
                )}
              >
                <p className="text-[13px] leading-relaxed text-white">
                  No learners assigned to you yet. Ask your college admin to add you to a cohort.
                </p>
              </motion.div>
            </section>
          ) : (
            <HubWorkList label="Learners" unit="learner" items={items} visible={items.length} />
          )}
        </HubBody>
      </HubPage>
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
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
          >
            <span className="truncate">{activeLearner.name}</span>
            {activeLearner.cohort_name && (
              <span className="hidden sm:inline">· {activeLearner.cohort_name}</span>
            )}
            <span className="font-semibold text-elec-yellow">Change</span>
          </button>
        )
      }
    />
  );
}
