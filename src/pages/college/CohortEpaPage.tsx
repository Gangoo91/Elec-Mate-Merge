import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownAZ, ArrowDown01, Filter, User2, ShieldCheck, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFrame, LoadingState } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import {
  useCohortEpaReadiness,
  judgementPosition,
  type CohortLearner,
} from '@/hooks/useCohortEpaReadiness';
import { EpaCalibrationCard } from '@/components/college/student360/EpaCalibrationCard';

/* ==========================================================================
   CohortEpaPage — /college/epa
   Every active apprentice's EPA readiness on one page. Mini-gauge per row,
   quick filter, sort, and click → Student 360 EPA section.
   ========================================================================== */

type SortKey = 'name' | 'readiness' | 'verdicts';

export default function CohortEpaPage() {
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', user.id)
        .maybeSingle();
      const id = (profile as { college_id?: string | null } | null)?.college_id ?? null;
      setCollegeId(id);
    })();
  }, []);

  const { learners, loading } = useCohortEpaReadiness({ collegeId });
  const [filter, setFilter] = useState<'all' | 'ready' | 'almost' | 'not_yet' | 'no_verdict' | 'blocked'>('all');
  const [sort, setSort] = useState<SortKey>('readiness');

  const filtered = useMemo(() => {
    let list = [...learners];
    if (filter !== 'all') {
      list = list.filter((l) => {
        if (filter === 'no_verdict') return !l.any_verdict;
        if (filter === 'blocked') return l.has_blocker;
        const verdicts = [l.learner?.verdict, l.tutor?.verdict, l.ai?.verdict];
        return verdicts.some((v) => v === filter);
      });
    }
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'verdicts')
      list.sort((a, b) => verdictCount(b) - verdictCount(a));
    else
      list.sort((a, b) => (b.best_position ?? -1) - (a.best_position ?? -1));
    return list;
  }, [learners, filter, sort]);

  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, not_yet: 0, refer: 0, no_verdict: 0, total: learners.length };
    for (const l of learners) {
      if (!l.any_verdict) c.no_verdict += 1;
      else {
        const v = l.tutor?.verdict ?? l.ai?.verdict ?? l.learner?.verdict;
        if (v === 'ready') c.ready += 1;
        else if (v === 'almost') c.almost += 1;
        else if (v === 'not_yet') c.not_yet += 1;
        else if (v === 'refer') c.refer += 1;
      }
    }
    return c;
  }, [learners]);

  return (
    <PageFrame className="max-w-[1280px] pb-24">
      <button
        onClick={() => navigate(-1)}
        className="text-[12px] font-medium text-white/65 hover:text-white transition-colors"
      >
        ← Back
      </button>

      <div className="mt-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Cohort EPA
        </div>
        <h1 className="mt-1.5 text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight">
          End-Point Assessment readiness
        </h1>
        <p className="mt-2 text-[13px] text-white/65 max-w-2xl leading-relaxed">
          Every active apprentice's current readiness across learner / tutor / AI verdicts. Click any
          learner for the full Student 360 EPA section.
        </p>
      </div>

      {/* Counts strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <CountTile label="Ready" value={counts.ready} tone="emerald" />
        <CountTile label="Almost" value={counts.almost} tone="amber" />
        <CountTile label="Not yet" value={counts.not_yet} tone="orange" />
        <CountTile label="Refer" value={counts.refer} tone="red" />
        <CountTile label="No verdict" value={counts.no_verdict} tone="white" />
      </div>

      {/* Calibration */}
      <div className="mt-4">
        <EpaCalibrationCard collegeId={collegeId} />
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </div>
        <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({learners.length})
        </FilterPill>
        <FilterPill active={filter === 'ready'} onClick={() => setFilter('ready')}>
          Ready
        </FilterPill>
        <FilterPill active={filter === 'almost'} onClick={() => setFilter('almost')}>
          Almost
        </FilterPill>
        <FilterPill active={filter === 'not_yet'} onClick={() => setFilter('not_yet')}>
          Not yet
        </FilterPill>
        <FilterPill active={filter === 'no_verdict'} onClick={() => setFilter('no_verdict')}>
          No verdict
        </FilterPill>
        <FilterPill active={filter === 'blocked'} onClick={() => setFilter('blocked')}>
          Has blockers
        </FilterPill>

        <div className="ml-auto flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setSort(sort === 'readiness' ? 'name' : sort === 'name' ? 'verdicts' : 'readiness')}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/85 hover:bg-white/[0.08] touch-manipulation"
          >
            {sort === 'readiness' ? <ArrowDown01 className="h-3 w-3" /> : <ArrowDownAZ className="h-3 w-3" />}
            Sort: {sort === 'readiness' ? 'Readiness' : sort === 'name' ? 'Name' : 'Verdict count'}
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <div className="mt-6 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[13px] text-white/65">No learners match this filter.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {filtered.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => navigate(`/college/students/${l.id}#epa`)}
                className="w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4 hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                <Row learner={l} />
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

function Row({ learner: l }: { learner: CohortLearner }) {
  const positions = {
    learner: judgementPosition(l.learner),
    tutor: judgementPosition(l.tutor),
    ai: judgementPosition(l.ai),
  };
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold text-white tracking-tight leading-tight">{l.name}</div>
        <div className="mt-0.5 text-[11px] text-white/55 tabular-nums">
          {l.course_code ?? '—'}
          {l.course_name && (
            <>
              <span className="text-white/25 mx-1.5">·</span>
              <span className="text-white/65">{l.course_name}</span>
            </>
          )}
        </div>
      </div>

      {/* Mini gauge */}
      <div className="w-full sm:w-[260px] flex-shrink-0 order-3 sm:order-2">
        <div className="relative h-7">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full overflow-hidden flex">
            <div className="flex-1 bg-red-500/[0.14]" />
            <div className="flex-1 bg-orange-500/[0.14]" />
            <div className="flex-1 bg-amber-500/[0.14]" />
            <div className="flex-1 bg-emerald-500/[0.14]" />
          </div>
          {(['ai', 'tutor', 'learner'] as const).map((src) => {
            const pos = positions[src];
            if (pos === null) return null;
            const meta = src === 'ai' ? 'bg-purple-400 ring-purple-400/60' : src === 'tutor' ? 'bg-elec-yellow ring-elec-yellow/60' : 'bg-blue-500 ring-blue-400/60';
            const Icon = src === 'ai' ? Bot : src === 'tutor' ? ShieldCheck : User2;
            return (
              <div
                key={src}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
                title={`${src}: ${pos}`}
              >
                <div className={cn('h-5 w-5 rounded-full ring-2 flex items-center justify-center shadow shadow-black/30', meta)}>
                  <Icon className="h-2.5 w-2.5 text-black" strokeWidth={2.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verdict badges */}
      <div className="flex items-center gap-1.5 flex-wrap order-2 sm:order-3 flex-shrink-0">
        <VerdictBadge label="L" judgement={l.learner} tone="blue" />
        <VerdictBadge label="T" judgement={l.tutor} tone="yellow" />
        <VerdictBadge label="AI" judgement={l.ai} tone="purple" />
      </div>
    </div>
  );
}

function VerdictBadge({
  label,
  judgement,
  tone,
}: {
  label: string;
  judgement: CohortLearner['ai'];
  tone: 'blue' | 'yellow' | 'purple';
}) {
  const has = !!judgement;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 h-6 px-2 rounded-full text-[10px] font-semibold tracking-[0.06em] uppercase',
        has
          ? tone === 'blue'
            ? 'bg-blue-500/[0.10] border border-blue-400/30 text-blue-200'
            : tone === 'yellow'
              ? 'bg-elec-yellow/[0.10] border border-elec-yellow/30 text-elec-yellow'
              : 'bg-purple-500/[0.10] border border-purple-400/30 text-purple-200'
          : 'bg-white/[0.03] border border-dashed border-white/[0.10] text-white/35'
      )}
      title={
        judgement
          ? `${judgement.verdict.replace('_', ' ')}${judgement.predicted_grade ? ` · ${judgement.predicted_grade}` : ''}${judgement.confidence != null ? ` · ${judgement.confidence}%` : ''}`
          : 'No verdict'
      }
    >
      {label}
      {has && (
        <span className="text-white/85 normal-case font-medium tracking-normal">
          {judgement!.predicted_grade?.[0]?.toUpperCase() ?? '–'}
        </span>
      )}
    </span>
  );
}

function CountTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'amber' | 'orange' | 'red' | 'white';
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div
        className={cn(
          'mt-1 text-[24px] font-semibold tabular-nums leading-none',
          tone === 'emerald' && 'text-emerald-300',
          tone === 'amber' && 'text-amber-300',
          tone === 'orange' && 'text-orange-300',
          tone === 'red' && 'text-red-300',
          tone === 'white' && 'text-white'
        )}
      >
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
      className={cn(
        'h-8 px-3 rounded-full text-[11.5px] font-semibold tracking-tight transition-colors touch-manipulation border',
        active
          ? 'bg-elec-yellow/[0.14] border-elec-yellow/40 text-elec-yellow'
          : 'bg-white/[0.04] border-white/[0.08] text-white/75 hover:bg-white/[0.08]'
      )}
    >
      {children}
    </button>
  );
}

function verdictCount(l: CohortLearner): number {
  return (l.learner ? 1 : 0) + (l.tutor ? 1 : 0) + (l.ai ? 1 : 0);
}
