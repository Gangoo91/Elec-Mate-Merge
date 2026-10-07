import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { COLLEGE_LIST } from '@/components/college/ui/CollegeUi';
import { SEARCH_CN } from '@/components/college/people/peopleKit';

/**
 * Learner quick-jump. Student 360 is the single most-used destination for a
 * tutor, but it was buried 3–4 levels deep (overview → People → Students →
 * list → tap). This puts it on the front page: type a name to jump straight
 * into any learner's profile, or tap an at-risk learner (the default) — one
 * tap to Student 360 via /college/students/:id. Self-fetches (RLS scopes to
 * the caller's college) so it drops into the overview AND the tutor's daily
 * "Today" view without props.
 *
 * College Hub kit (7 Oct 2026): white title, underline search, kit list rows
 * (rule · name · risk · chevron). Critical is red, high orange. Scoped to the
 * caller's college explicitly, not only by RLS, so a platform admin or a
 * member of two colleges never sees another college's learners here.
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
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? null;
  const [students, setStudents] = useState<QuickJumpLearner[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      let q = supabase
        .from('college_students')
        .select('id, name, risk_level')
        .not('status', 'ilike', 'withdrawn')
        .order('name', { ascending: true });
      if (collegeId) q = q.eq('college_id', collegeId);
      const { data } = await q;
      if (!cancelled && Array.isArray(data)) setStudents(data as QuickJumpLearner[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  const query = q.trim().toLowerCase();
  const atRisk = students.filter((s) =>
    ['high', 'critical'].includes((s.risk_level ?? '').toLowerCase())
  );
  const results = query
    ? students.filter((s) => s.name?.toLowerCase().includes(query)).slice(0, 8)
    : atRisk.slice(0, 6);

  return (
    <section className={COLLEGE_LIST}>
      <div className="space-y-2 px-5 pb-3 pt-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Jump to a learner</h3>
          {students.length > 0 && (
            <span className="text-[12px] font-medium tabular-nums text-white">{students.length} learners</span>
          )}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name…"
          aria-label="Search learners by name"
          className={SEARCH_CN}
        />
      </div>

      {results.length > 0 && (
        <ul className="divide-y divide-white/[0.06]">
          {results.map((s) => {
            const level = (s.risk_level ?? '').toLowerCase();
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/college?section=student360&studentId=${s.id}`)}
                  className="flex min-h-[56px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      level === 'critical' ? 'bg-red-400' : level === 'high' ? 'bg-orange-400' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">{s.name}</span>
                    <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-white">{riskWord(s.risk_level)}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {query && results.length === 0 && (
        <p className="px-5 py-4 text-[13px] leading-snug text-white sm:px-6">No learner matches &ldquo;{q}&rdquo;.</p>
      )}
      {!query && atRisk.length === 0 && students.length > 0 && (
        <p className="px-5 py-4 text-[13px] leading-snug text-white sm:px-6">
          No at-risk learners right now. Search above to open any profile.
        </p>
      )}
    </section>
  );
}
