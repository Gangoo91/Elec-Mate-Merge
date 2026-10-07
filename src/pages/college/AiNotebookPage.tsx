import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotebook } from '@/hooks/useNotebook';
import { NotebookShell } from '@/components/notebook/NotebookShell';
import { CohortThisWeekCard } from '@/components/college/CohortThisWeekCard';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_LIST, CollegeEmpty, CollegePageHeader, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';

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

const HELP: PageHelpContent = {
  id: 'college-learner-notebook',
  title: 'Learner notebook',
  what: 'Ask a question about one learner and get an answer written from their record: criteria met, quiz attempts, off-the-job hours, observations, end-point judgements and their learning plan. It is AI, so check anything you act on.',
  steps: [
    { title: 'Pick a learner', body: 'Your assigned learners are listed. If none are assigned to you, you see everyone at the college.' },
    { title: 'Ask', body: 'Type a question or tap a ready one. Answers cite the evidence they used.' },
    { title: 'Act on it', body: 'Suggested actions, like booking an observation, can be filed in one tap.' },
  ],
};

const BACK_TO = '/college?section=curriculumhub';
const PUSH_CONTEXT = 'Get notified about marking, off-the-job hours and learners who need you';

interface LearnerOption {
  id: string;
  name: string;
  cohort_name: string | null;
}

export default function AiNotebookPage() {
  useSEO({
    title: 'Learner notebook',
    description: 'Ask about a learner and get an answer from their real record.',
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
  const [search, setSearch] = useState('');

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

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? learners.filter((l) => l.name.toLowerCase().includes(q) || (l.cohort_name ?? '').toLowerCase().includes(q)) : learners;
  }, [learners, search]);

  // Render the picker as a standalone view when no learner selected.
  if (pickerOpen || !subjectStudentId) {
    const pick = (id: string) => {
      setSubjectStudentId(id);
      setPickerOpen(false);
      setSearchParams({ student: id });
    };

    return (
      <HubPage ground="landing">
        <HubMasthead section="College" title="Learner notebook" backTo={BACK_TO} trailing={<PageHelpButton help={HELP} compact />} />
        <HubBody pushContext={PUSH_CONTEXT}>
          <CollegePageHeader
            eyebrow="Teaching"
            title="Learner notebook"
            description="Every answer is written from one learner's record: criteria, quiz history, off-the-job hours, observations and end-point judgements. Pick who to ask about."
          />

          {loadingLearners ? (
            <div className="flex items-center justify-center py-24">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : learners.length === 0 ? (
            <CollegeEmpty
              title="No learners assigned to you yet"
              body="Ask your college admin to add you to a cohort or assign you learners."
            />
          ) : (
            <section className="space-y-4">
              <CollegeSectionTitle
                title="Learners"
                sub={shown.length === learners.length ? `${learners.length} learners` : `${shown.length} of ${learners.length}`}
              />
              {learners.length > 6 && (
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or cohort"
                  aria-label="Search learners"
                  className="h-11 w-full max-w-md rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[15px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
                />
              )}
              <motion.ul
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={cn(COLLEGE_LIST, 'lg:grid lg:grid-cols-2 lg:divide-y-0 2xl:grid-cols-3')}
              >
                {shown.map((l) => (
                  <li key={l.id} className="lg:border-b lg:border-r lg:border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => pick(l.id)}
                      className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
                    >
                      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[12px] font-bold text-white">
                        {l.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold text-white">{l.name}</span>
                        <span className="mt-0.5 block truncate text-[12.5px] text-white">{l.cohort_name ?? 'No cohort'}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                ))}
              </motion.ul>
            </section>
          )}
        </HubBody>
      </HubPage>
    );
  }

  return (
    <NotebookShell
      eyebrow="Learner notebook"
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
