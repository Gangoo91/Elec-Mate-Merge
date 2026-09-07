import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  containerVariants,
  itemVariants,
  EmptyState,
  LoadingState,
} from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TutorNotebookSection — in-hub launcher into the real AI Notebook page
   (`/college/ai-notebook`).

   Real AI lives in AiNotebookPage where the notebook is grounded in a
   specific learner's data (ACs, quizzes, EPA verdicts, OTJ, observations).
   This section lists the tutor's learners and a handful of ready-made
   questions; every row navigates into the notebook with the learner and/or
   prompt pre-selected.

   Renders CONTENT ONLY under the CollegeDashboard masthead: one solid volt
   "Open notebook" → quick prompts → learners.
   ========================================================================== */

interface LearnerRow {
  /** college_students.id — what AiNotebookPage's `student` param expects. */
  id: string;
  name: string;
  cohort_name: string | null;
}

const QUICK_PROMPTS: Array<{ label: string; prompt: string }> = [
  { label: 'Gateway readiness', prompt: 'How is this learner tracking against gateway?' },
  { label: 'Biggest AC gaps', prompt: 'Where are the biggest AC gaps?' },
  {
    label: '1-2-1 agenda',
    prompt: "Draft a 1-2-1 agenda focused on what they're behind on.",
  },
  { label: 'Next observation', prompt: 'What should I observe next time I see them?' },
];

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';

export function TutorNotebookSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [learners, setLearners] = useState<LearnerRow[]>([]);
  const [assigned, setAssigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Mirrors the resolution logic in AiNotebookPage so the list lines up
  // with what the user sees when they actually open the notebook.
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);

      const { data: staff, error: staffErr } = await supabase
        .from('college_staff')
        .select('college_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (staffErr) {
        if (!cancelled) {
          setError(staffErr.message);
          setLoading(false);
        }
        return;
      }

      const collegeId = (staff as { college_id?: string } | null)?.college_id ?? null;
      if (!collegeId) {
        if (!cancelled) {
          setLearners([]);
          setLoading(false);
        }
        return;
      }

      // Prefer learners directly assigned to this staff member; fall back
      // to all learners in the college if there are no assignments.
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
      // assignments.student_id FKs to profiles.id (the auth uid), which on
      // college_students is `user_id` — NOT the table's own PK `id`. Filtering
      // by id here matched nothing, so an assigned tutor saw an empty list.
      if (assignedIds.length > 0) q = q.in('user_id', assignedIds);

      const { data, error: studentsErr } = await q;
      if (cancelled) return;
      if (studentsErr) {
        setError(studentsErr.message);
        setLoading(false);
        return;
      }

      const rows: LearnerRow[] = (
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
      setLearners(rows);
      setAssigned(assignedIds.length > 0);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.cohort_name && l.cohort_name.toLowerCase().includes(q))
    );
  }, [learners, search]);

  const openNotebook = (studentId?: string, prompt?: string) => {
    const params = new URLSearchParams();
    if (studentId) params.set('student', studentId);
    if (prompt) params.set('prompt', prompt);
    navigate(`/college/ai-notebook${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.p variants={itemVariants} className="max-w-prose text-[13px] leading-relaxed text-white">
          The notebook answers from a learner's real record — criteria, quizzes, off-the-job,
          observations and EPA judgements. Pick a learner below, or open it blank.
        </motion.p>
        <motion.div variants={itemVariants}>
          <button type="button" onClick={() => openNotebook()} className={PRIMARY}>
            Open notebook
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Ask about a learner</HubSectionHeading>
        <motion.div variants={itemVariants} className={LIST_CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {QUICK_PROMPTS.map((p) => (
              <li key={p.label}>
                <button
                  type="button"
                  onClick={() => openNotebook(undefined, p.prompt)}
                  className={ROW}
                >
                  <span
                    aria-hidden="true"
                    className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {p.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {p.prompt}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>{assigned ? 'Your learners' : 'Learners'}</HubSectionHeading>
          {!loading && !error && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {filtered.length === learners.length
                ? `${learners.length}`
                : `${filtered.length} of ${learners.length}`}
            </span>
          )}
        </motion.div>

        {learners.length > 3 && (
          <motion.div variants={itemVariants}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or cohort"
              aria-label="Search learners"
              className={SEARCH}
            />
          </motion.div>
        )}

        {error ? (
          <motion.div variants={itemVariants}>
            <EmptyState title="Could not load learners" description={error} />
          </motion.div>
        ) : loading ? (
          <LoadingState />
        ) : learners.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No learners yet"
              description="When learners join your college, or are assigned to you, they appear here and the notebook can answer about them."
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            {filtered.length === 0 ? (
              <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                No learner matches that search.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {filtered.map((learner) => (
                  <li key={learner.id}>
                    <button
                      type="button"
                      onClick={() => openNotebook(learner.id)}
                      className={ROW}
                    >
                      <span
                        aria-hidden="true"
                        className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {learner.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {learner.cohort_name ?? 'No cohort'} · Open their notebook
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
