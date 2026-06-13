import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  HubGrid,
  Pill,
  SectionHeader,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TutorNotebookSection — in-hub launcher into the real AI Notebook page
   (`/college/ai-notebook`).

   Was a self-contained mock with hardcoded notebooks + fake AI delays.
   Real AI lives in AiNotebookPage where the notebook is grounded in a
   specific learner's data (ACs, quizzes, EPA verdicts, OTJ, observations).

   This section now: shows the tutor's assigned learners as cards + quick
   prompts, plus a generic "Open notebook" entry. Each tap navigates into
   the real notebook with the learner pre-selected.
   ========================================================================== */

interface LearnerCard {
  id: string;
  name: string;
  cohort_name: string | null;
  tone: Tone;
}

const TONES: Tone[] = ['blue', 'emerald', 'purple', 'amber', 'yellow', 'cyan'];

const QUICK_PROMPTS: Array<{ label: string; prompt: string; tone: Tone }> = [
  {
    label: 'Gateway readiness',
    prompt: 'How is this learner tracking against gateway?',
    tone: 'amber',
  },
  { label: 'Biggest AC gaps', prompt: 'Where are the biggest AC gaps?', tone: 'red' },
  {
    label: '1-2-1 agenda',
    prompt: "Draft a 1-2-1 agenda focused on what they're behind on.",
    tone: 'blue',
  },
  {
    label: 'Next observation',
    prompt: 'What should I observe next time I see them?',
    tone: 'emerald',
  },
];

export function TutorNotebookSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [learners, setLearners] = useState<LearnerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Mirrors the resolution logic in AiNotebookPage so the cards line up
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

      const cards: LearnerCard[] = (
        (data ?? []) as Array<{
          id: string;
          name: string;
          college_cohorts: { name: string } | null;
        }>
      ).map((r, i) => ({
        id: r.id,
        name: r.name,
        cohort_name: r.college_cohorts?.name ?? null,
        tone: TONES[i % TONES.length],
      }));
      setLearners(cards);
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
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · AI Notebook"
          title="Teaching notebook"
          description="Pick a learner to open the AI co-tutor — answers grounded in their real ACs, quizzes, OTJ, observations and EPA judgements."
          tone="yellow"
          actions={
            <button
              onClick={() => openNotebook()}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Open notebook →
            </button>
          }
        />
      </motion.div>

      {/* AI feature strip */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
            AI-Powered · Per-learner
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Quick prompts
          </h3>
          <p className="mt-2 text-[13px] text-white/70 max-w-2xl leading-relaxed">
            Tap a prompt to open the notebook with that question pre-filled. The AI reads the
            chosen learner's full college record before answering.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => openNotebook(undefined, p.prompt)}
                className="group flex items-center justify-between gap-3 px-4 py-3 min-h-[64px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl transition-colors touch-manipulation text-left focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', toneDot[p.tone])} />
                    <span className="text-[13.5px] font-medium text-white">{p.label}</span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-white/60 truncate">{p.prompt}</p>
                </div>
                <span className="text-elec-yellow/70 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search learners…"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow={loading ? 'Loading…' : 'Your learners'}
          title={loading ? '—' : `${filtered.length} learner${filtered.length === 1 ? '' : 's'}`}
        />

        {error ? (
          <EmptyState title="Could not load learners" description={error} />
        ) : loading ? (
          <HubGrid columns={3}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-44 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl animate-pulse"
              />
            ))}
          </HubGrid>
        ) : filtered.length === 0 ? (
          <EmptyState
            title={learners.length === 0 ? 'No learners assigned yet' : 'No matches'}
            description={
              learners.length === 0
                ? 'When learners are assigned to you (or join your college), they\'ll appear here so you can dive into their notebook.'
                : 'Try a different search term.'
            }
            action={learners.length === 0 ? 'Open notebook anyway' : undefined}
            onAction={learners.length === 0 ? () => openNotebook() : undefined}
          />
        ) : (
          <HubGrid columns={3}>
            {filtered.map((learner, i) => (
              <button
                key={learner.id}
                onClick={() => openNotebook(learner.id)}
                className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 text-left touch-manipulation flex flex-col min-h-[180px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-elec-yellow/40 rounded-2xl border border-white/[0.06]"
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                    toneDot[learner.tone]
                  )}
                />
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                    {String(i + 1).padStart(2, '0')} · Learner
                  </div>
                  {learner.cohort_name && <Pill tone={learner.tone}>{learner.cohort_name}</Pill>}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white tracking-tight leading-snug">
                  {learner.name}
                </h3>
                <div className="flex-grow" />
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11.5px] text-white/60">
                  <span>Open AI notebook</span>
                  <span className="text-elec-yellow/70 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>
              </button>
            ))}
          </HubGrid>
        )}
      </motion.section>
    </PageFrame>
  );
}
