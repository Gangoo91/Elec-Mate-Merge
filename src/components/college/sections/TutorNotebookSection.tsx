import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  AiMarker,
  TEACH_BTN_PRIMARY,
  TeachingEmpty as CollegeEmpty,
  TeachingHeader,
  TeachingScreen,
  plural,
} from '@/components/college/teaching/TeachingKit';
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
   "Open notebook" → quick prompts → learners. 8 Oct 2026: a "Uses AI"
   marker on the title, the three figure tiles folded into the sentence.
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
/** A learner or a ready question as a card: the observation learner picker's shape. */
const PICK_CARD =
  'flex h-full min-h-[64px] w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-left transition-colors touch-manipulation hover:border-white/[0.22] hover:bg-white/[0.06] active:bg-white/[0.09]';

const HELP: PageHelpContent = {
  id: 'college-tutor-notebook',
  title: 'Learner notebook',
  what: 'Ask a question about a learner and get an answer written from their real record: criteria met, quizzes, off-the-job hours, observations and end-point judgements. It is AI, so check anything you act on.',
  steps: [
    {
      title: 'Pick a learner',
      body: 'Tap a learner to open the notebook with their record loaded.',
    },
    {
      title: 'Ask, or use a ready question',
      body: 'Gateway readiness, biggest gaps, a 1-2-1 agenda or what to observe next.',
    },
    {
      title: 'Check and use it',
      body: 'Answers say where they came from. Copy what is useful into a review, a learning plan or your notes.',
    },
  ],
  notes: [
    {
      title: 'Who you see',
      body: 'Your assigned learners first. If none are assigned to you, everyone at the college.',
    },
  ],
};

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

  // Grouped by cohort like the observation learner picker: a grid of cards.
  const groups = useMemo(() => {
    const map = new Map<string, LearnerRow[]>();
    for (const l of filtered) {
      const k = l.cohort_name ?? 'No cohort';
      map.set(k, [...(map.get(k) ?? []), l]);
    }
    return [...map.entries()]
      .sort(([a], [b]) => (a === 'No cohort' ? 1 : b === 'No cohort' ? -1 : a.localeCompare(b)))
      .map(([name, rows]) => ({ name, rows }));
  }, [filtered]);

  const cohortCount = useMemo(
    () => new Set(learners.map((l) => l.cohort_name).filter(Boolean)).size,
    [learners]
  );

  const openNotebook = (studentId?: string, prompt?: string) => {
    const params = new URLSearchParams();
    if (studentId) params.set('student', studentId);
    if (prompt) params.set('prompt', prompt);
    navigate(`/college/ai-notebook${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Teaching"
        title={
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            Learner notebook <AiMarker className="align-middle" />
          </span>
        }
        help={HELP}
        summary="Ask about one learner and get an answer written from their record: criteria, quizzes, off-the-job hours, observations and end-point judgements."
        sub={
          loading || error
            ? undefined
            : learners.length === 0
              ? 'No learners to ask about yet.'
              : `${plural(learners.length, assigned ? 'learner' : 'learner')} ${assigned ? 'assigned to you' : 'at the college'}, in ${plural(cohortCount, 'cohort')}. AI can be wrong, so check anything you act on.`
        }
        actions={
          <button
            type="button"
            onClick={() => openNotebook()}
            className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            Open the notebook
          </button>
        }
      />

      <section className="space-y-4">
        <CollegeSectionTitle
          title="Ready questions"
          sub="Opens the notebook with the question filled in. Pick the learner there."
        />
        <motion.ul
          variants={itemVariants}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4"
        >
          {QUICK_PROMPTS.map((p) => (
            <li key={p.label}>
              <button
                type="button"
                onClick={() => openNotebook(undefined, p.prompt)}
                className={PICK_CARD}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-semibold leading-snug text-white">
                    {p.label}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-white">
                    {p.prompt}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              </button>
            </li>
          ))}
        </motion.ul>
      </section>

      <section className="space-y-4">
        <CollegeSectionTitle
          title={assigned ? 'Your learners' : 'Learners'}
          sub={
            !loading && !error
              ? filtered.length === learners.length
                ? `${learners.length} learners`
                : `${filtered.length} of ${learners.length}`
              : undefined
          }
        />

        {learners.length > 3 && (
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or cohort"
            aria-label="Search learners"
            className={cn(SEARCH, 'lg:max-w-md')}
          />
        )}

        {error ? (
          <CollegeEmpty title="Could not load learners" body={error} />
        ) : loading ? (
          <LoadingState />
        ) : learners.length === 0 ? (
          <CollegeEmpty
            title="No learners yet"
            body="When learners join your college, or are assigned to you, they appear here and the notebook can answer about them."
          />
        ) : filtered.length === 0 ? (
          <CollegeEmpty title="No learner matches that search" />
        ) : (
          <div className="space-y-5">
            {groups.map((g) => (
              <section key={g.name} aria-label={g.name} className="space-y-2.5">
                {groups.length > 1 && (
                  <h3 className="flex items-baseline gap-2 text-[14px] font-semibold text-white">
                    {g.name}
                    <span className="text-[12.5px] font-medium tabular-nums">{g.rows.length}</span>
                  </h3>
                )}
                <motion.ul
                  variants={itemVariants}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {g.rows.map((learner) => (
                    <li key={learner.id}>
                      <button
                        type="button"
                        onClick={() => openNotebook(learner.id)}
                        className={PICK_CARD}
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[13px] font-semibold text-white"
                        >
                          {learner.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-white">
                          {learner.name}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </motion.ul>
              </section>
            ))}
          </div>
        )}
      </section>
    </TeachingScreen>
  );
}
