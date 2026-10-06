import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownAZ, ArrowDown01, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFrame, LoadingState } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import { useCohortEpaReadiness, type CohortLearner } from '@/hooks/useCohortEpaReadiness';
import { EpaCalibrationCard } from '@/components/college/student360/EpaCalibrationCard';
import { EPA_STATUS_LABEL } from '@/lib/epa/readiness';
import { VERDICT_LABEL, ageLabel } from '@/hooks/college/epaReadinessModels';

/* ==========================================================================
   CohortEpaPage — /college/epa
   One line per apprentice answering "who, why, what next": the shared
   readiness model (AM2S practice + gateway — what the learner sees), the
   one effective verdict (tutor, else AI as a prediction), the top blocker or
   next step, gateway date and how old the verdict is.

   6 Oct 2026: counts, sort and filters all use the effective verdict. Before,
   the "Ready" filter matched if ANY voice said ready (the learner's own
   included) while the tiles used tutor→AI→learner, so a tile could say 2
   Ready while the filter showed 4.
   ========================================================================== */

type SortKey = 'readiness' | 'name' | 'age';
type FilterKey = 'all' | 'sign_off' | 'ready' | 'almost' | 'not_yet' | 'refer' | 'no_verdict';

export default function CohortEpaPage() {
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [collegeChecked, setCollegeChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCollegeChecked(true);
        return;
      }
      // An active staff row first (what the data rules check), then the profile.
      const { data: staff } = await supabase
        .from('college_staff')
        .select('college_id')
        .eq('user_id', user.id)
        .is('archived_at', null)
        .limit(1)
        .maybeSingle();
      let id = (staff as { college_id?: string | null } | null)?.college_id ?? null;
      if (!id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', user.id)
          .maybeSingle();
        id = (profile as { college_id?: string | null } | null)?.college_id ?? null;
      }
      setCollegeId(id);
      setCollegeChecked(true);
    })();
  }, []);

  const { learners, loading, error, refresh } = useCohortEpaReadiness({ collegeId });
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('readiness');
  const [query, setQuery] = useState('');
  const [cohort, setCohort] = useState<string>('all');
  const [cohortNames, setCohortNames] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const ids = Array.from(new Set(learners.map((l) => l.cohort_id).filter(Boolean) as string[]));
    if (ids.length === 0) return;
    void supabase
      .from('college_cohorts')
      .select('id, name')
      .in('id', ids)
      .then(({ data }) =>
        setCohortNames(
          new Map(((data ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name]))
        )
      );
  }, [learners]);

  const verdictOf = (l: CohortLearner) => l.effective?.judgement.verdict ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = learners.filter(
      (l) =>
        (cohort === 'all' || l.cohort_id === cohort) &&
        (!q || l.name.toLowerCase().includes(q) || (l.course_code ?? '').toLowerCase().includes(q))
    );
    if (filter === 'sign_off') list = list.filter((l) => l.needs_sign_off);
    else if (filter === 'no_verdict') list = list.filter((l) => !l.effective);
    else if (filter !== 'all') list = list.filter((l) => verdictOf(l) === filter);

    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'age')
      list.sort(
        (a, b) =>
          new Date(a.effective?.judgement.created_at ?? 0).getTime() -
          new Date(b.effective?.judgement.created_at ?? 0).getTime()
      );
    else list.sort((a, b) => (b.readiness?.score ?? -1) - (a.readiness?.score ?? -1));
    return list;
  }, [learners, filter, sort, query, cohort]);

  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, not_yet: 0, refer: 0, no_verdict: 0, sign_off: 0 };
    for (const l of learners) {
      const v = verdictOf(l);
      if (!v) c.no_verdict += 1;
      else if (v in c) c[v as 'ready' | 'almost' | 'not_yet' | 'refer'] += 1;
      if (l.needs_sign_off) c.sign_off += 1;
    }
    return c;
  }, [learners]);

  const cohortOptions = Array.from(cohortNames.entries()).sort((a, b) => a[1].localeCompare(b[1]));

  return (
    <PageFrame className="max-w-[1280px] pb-24">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex h-11 items-center text-[13px] font-medium text-white touch-manipulation"
      >
        ← Back
      </button>

      <div className="mt-2">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Cohort EPA
        </div>
        <h1 className="mt-1.5 text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight">
          End-point assessment readiness
        </h1>
        <p className="mt-2 text-[13px] text-white max-w-2xl leading-relaxed">
          Readiness is the same picture the apprentice sees: AM2 practice by section, their
          portfolio against their own qualification's ACs, and the sign-off items. The verdict is
          the tutor's, or the AI's marked as a prediction until a tutor signs it off.
        </p>
      </div>

      {/* Counts strip — all from the effective verdict */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-6 gap-2.5">
        <CountTile label="Needs your sign-off" value={counts.sign_off} />
        <CountTile label="Ready" value={counts.ready} />
        <CountTile label="Almost" value={counts.almost} />
        <CountTile label="Not yet" value={counts.not_yet} />
        <CountTile label="Refer" value={counts.refer} />
        <CountTile label="No verdict" value={counts.no_verdict} />
      </div>

      <div className="mt-4">
        <EpaCalibrationCard collegeId={collegeId} />
      </div>

      {/* Search, cohort, filters, sort */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or course"
              aria-label="Search learners"
              className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
          </label>
          {cohortOptions.length > 1 && (
            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              aria-label="Cohort"
              className="h-11 rounded-xl border border-white/[0.15] bg-[hsl(0_0%_12%)] px-3 text-[14px] text-white [color-scheme:dark] touch-manipulation"
            >
              <option value="all">All cohorts</option>
              {cohortOptions.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ['all', `All (${learners.length})`],
              ['sign_off', 'Needs your sign-off'],
              ['ready', 'Ready'],
              ['almost', 'Almost'],
              ['not_yet', 'Not yet'],
              ['refer', 'Refer'],
              ['no_verdict', 'No verdict'],
            ] as Array<[FilterKey, string]>
          ).map(([k, label]) => (
            <FilterPill key={k} active={filter === k} onClick={() => setFilter(k)}>
              {label}
            </FilterPill>
          ))}
          <button
            type="button"
            onClick={() =>
              setSort(sort === 'readiness' ? 'name' : sort === 'name' ? 'age' : 'readiness')
            }
            className="ml-auto inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.15] px-3.5 text-[13px] font-semibold text-white touch-manipulation"
          >
            {sort === 'name' ? (
              <ArrowDownAZ className="h-4 w-4" />
            ) : (
              <ArrowDown01 className="h-4 w-4" />
            )}
            Sort: {sort === 'readiness' ? 'Readiness' : sort === 'name' ? 'Name' : 'Oldest verdict'}
          </button>
        </div>
      </div>

      {/* List */}
      {!collegeChecked || (loading && !!collegeId) ? (
        <LoadingState />
      ) : !collegeId ? (
        <Empty>Your account isn't linked to a college, so there's no cohort to show.</Empty>
      ) : error ? (
        <Empty>
          Couldn't load the cohort: {error}.{' '}
          <button
            type="button"
            onClick={() => void refresh()}
            className="ml-1 inline-flex h-11 items-center font-semibold underline touch-manipulation"
          >
            Try again
          </button>
        </Empty>
      ) : learners.length === 0 ? (
        <Empty>No apprentices on programme in this college yet.</Empty>
      ) : filtered.length === 0 ? (
        <Empty>No learners match this search or filter.</Empty>
      ) : (
        <ul className="mt-6 space-y-2">
          {filtered.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => navigate(`/college/students/${l.id}#epa`)}
                className="w-full rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_12%)] px-4 py-3.5 text-left touch-manipulation sm:px-5"
              >
                <Row
                  learner={l}
                  cohortName={l.cohort_id ? cohortNames.get(l.cohort_id) : undefined}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageFrame>
  );
}

/* ────────────────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────────────────── */

function Row({ learner: l, cohortName }: { learner: CohortLearner; cohortName?: string }) {
  const eff = l.effective;
  const v = eff?.judgement.verdict;
  const age = ageLabel(eff?.judgement.created_at);
  const r = l.readiness;
  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[15px] font-semibold leading-tight tracking-tight text-white">
            {l.name}
          </span>
          <span className="text-[12px] text-white">
            {[l.course_code, cohortName].filter(Boolean).join(' · ')}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {/* Readiness — the shared model */}
          <Chip>{r ? `${r.score} · ${EPA_STATUS_LABEL[r.status]}` : 'No account linked'}</Chip>
          {r && (
            <Chip>
              {r.route.assessment || 'AM2'} practice {r.am2.ready}/{r.am2.of}
              {r.portfolio.known && ` · ACs ${r.portfolio.pct}%`} · Sign-offs {r.gateway.done}/
              {r.gateway.of}
            </Chip>
          )}
          {/* Effective verdict */}
          {eff && v ? (
            <Chip strong={v === 'refer' || v === 'not_yet'}>
              {eff.isPrediction ? 'AI prediction: ' : 'Tutor: '}
              {VERDICT_LABEL[v] ?? v}
              {age && ` · ${age}`}
            </Chip>
          ) : (
            <Chip>No verdict</Chip>
          )}
          {l.needs_sign_off && <Chip strong>Needs your sign-off</Chip>}
        </div>

        {(l.top_blocker || l.next_action) && (
          <p className="mt-2 text-[13px] leading-snug text-white">
            {l.next_action ? (
              <>
                <span className="font-semibold">Next:</span> {l.next_action.action}
                {l.next_action.target_date && ` (by ${formatDate(l.next_action.target_date)})`}
              </>
            ) : (
              <>
                <span className="font-semibold">Blocker:</span> {l.top_blocker}
              </>
            )}
          </p>
        )}
        {l.gateway_date && (
          <p className="mt-1 text-[12px] text-white">Gateway {formatDate(l.gateway_date)}</p>
        )}
      </div>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" />
    </div>
  );
}

function Chip({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex min-h-[28px] items-center rounded-full border px-2.5 text-[12px] font-semibold text-white',
        strong ? 'border-red-400/70' : 'border-white/[0.2]'
      )}
    >
      {children}
    </span>
  );
}

function CountTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_12%)] px-4 py-3">
      <div className="text-[11px] font-medium text-white">{label}</div>
      <div className="mt-1 text-[24px] font-semibold leading-none tabular-nums text-white">
        {value}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'h-11 rounded-xl border px-3.5 text-[13px] tracking-tight touch-manipulation',
        active
          ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
          : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
      )}
    >
      {children}
    </button>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_12%)] px-6 py-8 text-center text-[14px] text-white">
      {children}
    </div>
  );
}

function formatDate(iso: string): string {
  // Date-only strings are local dates, not UTC midnight.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
