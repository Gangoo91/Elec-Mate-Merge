import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/**
 * Top-of-dashboard learner quick-jump. Student 360 is the single most-used
 * destination for a tutor, but it was buried 3–4 levels deep (overview →
 * People → Students → list → tap). This surfaces it at the top of every main
 * surface: type a name to jump straight into any learner's profile, or tap an
 * at-risk learner (the default) — one tap to Student 360 via
 * /college/students/:id. Self-fetches (RLS scopes to the caller's college) so
 * it drops into the overview AND the tutor's daily "Today" view without props.
 */
interface QuickJumpLearner {
  id: string;
  name: string;
  risk_level?: string | null;
}

const RISK_TONE: Record<string, string> = {
  critical: 'bg-red-500/15 border-red-400/40 text-red-200',
  high: 'bg-orange-500/15 border-orange-400/40 text-orange-200',
  medium: 'bg-amber-500/15 border-amber-400/40 text-amber-200',
};

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
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_11%)] p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Jump to a learner</h2>
        {students.length > 0 && (
          <span className="text-[11px] text-white/70">{students.length} learners</span>
        )}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name…"
        className="mt-3 w-full h-11 rounded-xl bg-black/30 border border-white/[0.12] px-3.5 text-base text-foreground placeholder:text-white/35 touch-manipulation focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/40 outline-none"
      />

      {!query && atRisk.length > 0 && (
        <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/70">
          Needs attention
        </div>
      )}

      <ul className="mt-2 space-y-1.5">
        {results.map((s) => {
          const tone = RISK_TONE[(s.risk_level ?? '').toLowerCase()];
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => navigate(`/college/students/${s.id}`)}
                className="w-full text-left flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] px-3.5 py-2.5 touch-manipulation transition-colors"
              >
                <span className="block text-[13.5px] font-medium text-foreground truncate min-w-0">
                  {s.name}
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  {tone && (
                    <span
                      className={cn(
                        'inline-flex items-center h-5 px-1.5 rounded-md border text-[9.5px] font-semibold uppercase tracking-[0.08em]',
                        tone
                      )}
                    >
                      {s.risk_level}
                    </span>
                  )}
                  <span className="text-white/60 text-[13px]" aria-hidden>
                    →
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {query && results.length === 0 && (
        <div className="mt-2 rounded-xl border border-dashed border-white/[0.10] px-4 py-5 text-center text-[12.5px] text-white/45">
          No learner matches &ldquo;{q}&rdquo;.
        </div>
      )}
      {!query && atRisk.length === 0 && students.length > 0 && (
        <div className="mt-2 text-[12.5px] text-white/45">
          No at-risk learners right now — search above to open any profile.
        </div>
      )}
    </section>
  );
}
