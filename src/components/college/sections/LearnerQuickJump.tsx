import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/**
 * Learner quick-jump. Student 360 is the single most-used destination for a
 * tutor, but it was buried 3–4 levels deep (overview → People → Students →
 * list → tap). This puts it on the front page: type a name to jump straight
 * into any learner's profile, or tap an at-risk learner (the default) — one
 * tap to Student 360 via /college/students/:id. Self-fetches (RLS scopes to
 * the caller's college) so it drops into the overview AND the tutor's daily
 * "Today" view without props.
 *
 * Hub card language: 15px volt title, a 44px search field, then HubWorkList
 * rows (rule · name · risk · chevron). Critical is the one word that stays
 * red; high gets the volt rule; nothing wears a coloured chip.
 */
interface QuickJumpLearner {
  id: string;
  name: string;
  risk_level?: string | null;
}

function riskWord(level: string | null | undefined): JSX.Element | string {
  switch ((level ?? '').toLowerCase()) {
    case 'critical':
      return <span className="font-semibold text-red-300">Critical risk</span>;
    case 'high':
      return 'High risk';
    case 'medium':
      return 'Medium risk';
    default:
      return 'Open Student 360';
  }
}

export function LearnerQuickJump() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<QuickJumpLearner[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from('college_students')
        .select('id, name, risk_level')
        .neq('status', 'withdrawn')
        .order('name', { ascending: true });
      if (!cancelled && Array.isArray(data)) setStudents(data as QuickJumpLearner[]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const query = q.trim().toLowerCase();
  const atRisk = students.filter((s) =>
    ['high', 'critical'].includes((s.risk_level ?? '').toLowerCase())
  );
  const results = query
    ? students.filter((s) => s.name?.toLowerCase().includes(query)).slice(0, 8)
    : atRisk.slice(0, 6);

  return (
    <section
      className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
    >
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Jump to a learner
        </h3>
        {students.length > 0 && (
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {students.length} learners
          </span>
        )}
      </div>

      <div className="px-4 pb-3.5 sm:px-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name…"
          aria-label="Search learners by name"
          className="h-11 w-full rounded-xl border border-white/[0.18] bg-transparent px-3.5 text-base text-white outline-none transition-colors placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/40 touch-manipulation"
        />
      </div>

      {results.length > 0 && (
        <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {results.map((s) => {
            const level = (s.risk_level ?? '').toLowerCase();
            const urgent = level === 'critical' || level === 'high';
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/college?section=student360&studentId=${s.id}`)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {riskWord(s.risk_level)}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {query && results.length === 0 && (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          No learner matches &ldquo;{q}&rdquo;.
        </p>
      )}
      {!query && atRisk.length === 0 && students.length > 0 && (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          No at-risk learners right now. Search above to open any profile.
        </p>
      )}
    </section>
  );
}
