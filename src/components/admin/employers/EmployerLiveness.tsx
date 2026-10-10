/**
 * Admin → Employers: which firms are alive (ELE-1836).
 *
 * One row per firm from admin_employer_liveness(): when they last did
 * anything, which workflows they used in the last 7 and 30 days, seats vs the
 * people actually doing things, the first workflow they have never touched,
 * and the aha metric (active on 3 of their first 7 days).
 *
 * The numbers come from employer_usage_events, which the database writes on
 * every workflow step (no cookie banner, no client tracking), backfilled from
 * the source tables so older firms are not shown as blank.
 */
import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/admin/editorial';
import {
  BLUE,
  GOOD,
  SERIOUS,
  KpiTile,
  Panel,
  SectionHead,
  Segmented,
  StateDot,
} from '@/components/admin/overview/primitives';

export interface FirmLiveness {
  firm_id: string;
  name: string;
  owner_email: string | null;
  signed_up_at: string | null;
  last_login_at: string | null;
  last_event_at: string | null;
  events_7d: number;
  events_30d: number;
  events_all: number;
  workflows_7d: string[];
  workflows_30d: string[];
  workflows_ever: string[];
  never_done: string[];
  seats: number;
  roster: number;
  linked: number;
  people_7d: number;
  aha_start: string | null;
  aha_days: number;
  aha_state: 'hit' | 'missed' | 'in_window';
  last_digest_at: string | null;
  digest_off: boolean;
}

const QUERY_KEY = ['admin-employer-liveness'];

/** The workflows in the order a firm should meet them. */
const WORKFLOWS: Array<{ key: string; label: string }> = [
  { key: 'team', label: 'Team' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'diary', label: 'Diary' },
  { key: 'timesheets', label: 'Timesheets' },
  { key: 'packs', label: 'Job packs' },
  { key: 'briefings', label: 'Briefings' },
  { key: 'snags', label: 'Snags' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'checklists', label: 'Checklists' },
  { key: 'apprentice_hours', label: 'Apprentice hours' },
];
const LABEL = Object.fromEntries(WORKFLOWS.map((w) => [w.key, w.label]));

type View = 'quiet' | 'active' | 'new' | 'never' | 'all';

const VIEW_META: Record<View, string> = {
  quiet: 'going quiet: active this month, nothing this week',
  active: 'active this week, busiest first',
  new: 'in their first week',
  never: 'signed up, never done a step',
  all: 'firms, most recently active first',
};

const ago = (iso: string | null) =>
  iso ? `${formatDistanceToNowStrict(parseISO(iso))} ago` : 'never';

const isQuiet = (f: FirmLiveness) => f.events_7d === 0 && f.events_30d > 0;

function useEmployerLiveness() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_employer_liveness' as never);
      if (error) throw error;
      const res = data as unknown as { generated_at: string; firms: FirmLiveness[] };
      return res;
    },
    staleTime: 60_000,
  });
}

function WorkflowChips({ f }: { f: FirmLiveness }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {WORKFLOWS.filter(
        (w) => w.key !== 'apprentice_hours' || f.workflows_ever.includes(w.key)
      ).map((w) => {
        const week = f.workflows_7d.includes(w.key);
        const month = !week && f.workflows_30d.includes(w.key);
        const ever = !week && !month && f.workflows_ever.includes(w.key);
        return (
          <span
            key={w.key}
            title={
              week
                ? 'Used in the last 7 days'
                : month
                  ? 'Used in the last 30 days'
                  : ever
                    ? 'Used, but not in the last 30 days'
                    : 'Never used'
            }
            className={cn(
              'inline-flex h-7 items-center rounded-full border px-2.5 text-[12px] font-medium text-white',
              week && 'border-white bg-white font-semibold text-black',
              month && 'border-white/60',
              ever && 'border-white/25',
              !week && !month && !ever && 'border-dashed border-white/30'
            )}
          >
            {w.label}
          </span>
        );
      })}
    </div>
  );
}

function AhaDot({ f }: { f: FirmLiveness }) {
  if (f.aha_state === 'hit')
    return <StateDot color={GOOD} label={`Aha hit · ${f.aha_days} of first 7 days`} />;
  if (f.aha_state === 'in_window')
    return <StateDot color={BLUE} label={`First week · ${f.aha_days} of 3 days so far`} />;
  return <StateDot color={SERIOUS} label={`Aha missed · ${f.aha_days} of first 7 days`} />;
}

function FirmCard({ f }: { f: FirmLiveness }) {
  const never = f.never_done[0];
  return (
    <div className="flex min-w-0 flex-col gap-3 border-t border-white/[0.1] py-4 first:border-t-0 lg:rounded-xl lg:border lg:border-white/[0.12] lg:bg-white/[0.03] lg:p-4 lg:first:border-t">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="break-words text-[15px] font-semibold leading-5 text-white">{f.name}</div>
          <div className="mt-0.5 text-[12px] text-white">
            {f.last_event_at ? `Last active ${ago(f.last_event_at)}` : 'Never active'} ·{' '}
            {f.last_login_at ? `logged in ${ago(f.last_login_at)}` : 'never logged in'}
          </div>
          {f.owner_email && (
            <div className="mt-0.5 break-all text-[12px] text-white">{f.owner_email}</div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[20px] font-semibold leading-6 tabular-nums text-white">
            {f.events_7d}
          </div>
          <div className="text-[11px] text-white">steps this week</div>
        </div>
      </div>

      <WorkflowChips f={f} />

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-white sm:grid-cols-4">
        <span>
          <span className="font-semibold tabular-nums">{f.seats}</span> seats
        </span>
        <span>
          <span className="font-semibold tabular-nums">{f.roster}</span> on roster ·{' '}
          <span className="font-semibold tabular-nums">{f.linked}</span> linked
        </span>
        <span>
          <span className="font-semibold tabular-nums">{f.people_7d}</span> active this week
        </span>
        <span>
          <span className="font-semibold tabular-nums">{f.events_30d}</span> steps in 30 days
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <AhaDot f={f} />
        {never ? (
          <span
            className="text-[12px] text-white"
            title={f.never_done.map((k) => LABEL[k] ?? k).join(', ')}
          >
            Never done: <span className="font-semibold">{LABEL[never] ?? never}</span>
            {f.never_done.length > 1 && ` +${f.never_done.length - 1} more`}
          </span>
        ) : (
          <span className="text-[12px] font-semibold text-white">Has used every workflow</span>
        )}
        <span className="text-[12px] text-white">
          {f.digest_off
            ? 'Sunday email off'
            : f.last_digest_at
              ? `Sunday email sent ${ago(f.last_digest_at)}`
              : 'No Sunday email yet'}
        </span>
      </div>
    </div>
  );
}

export function EmployerLiveness() {
  const qc = useQueryClient();
  const { data, isLoading, isFetching, error } = useEmployerLiveness();
  const [view, setView] = useState<View>('quiet');
  const [showAll, setShowAll] = useState(false);

  const model = useMemo(() => {
    const firms = data?.firms ?? [];
    const quiet = firms.filter(isQuiet).sort((a, b) => b.events_30d - a.events_30d);
    const active = firms.filter((f) => f.events_7d > 0).sort((a, b) => b.events_7d - a.events_7d);
    const fresh = firms
      .filter((f) => f.aha_state === 'in_window')
      .sort((a, b) => (b.aha_start ?? '').localeCompare(a.aha_start ?? ''));
    const never = firms
      .filter((f) => f.events_all === 0)
      .sort((a, b) => (b.signed_up_at ?? '').localeCompare(a.signed_up_at ?? ''));
    const pastWeekOne = firms.filter((f) => f.aha_state !== 'in_window' && f.events_all > 0);
    const hit = pastWeekOne.filter((f) => f.aha_state === 'hit').length;
    return {
      all: firms,
      quiet,
      active,
      fresh,
      never,
      hit,
      pastWeekOne: pastWeekOne.length,
      digests: firms.filter(
        (f) => f.last_digest_at && Date.now() - new Date(f.last_digest_at).getTime() < 7 * 864e5
      ).length,
    };
  }, [data]);

  const list =
    view === 'quiet'
      ? model.quiet
      : view === 'active'
        ? model.active
        : view === 'new'
          ? model.fresh
          : view === 'never'
            ? model.never
            : model.all;
  const shown = showAll ? list : list.slice(0, 24);
  const kpiCn =
    'border-t border-white/[0.1] lg:border-t-0 lg:border-l lg:pl-5 first:border-0 first:pl-0';
  const dash = isLoading ? '—' : undefined;

  const empty: Record<View, string> = {
    quiet: 'Nobody has gone quiet: every firm active in the last 30 days was active this week too.',
    active: 'No firm has done anything in the last 7 days.',
    new: 'No firm is in its first week right now.',
    never: 'Every firm has done at least one thing.',
    all: 'No employer accounts yet.',
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[22px]">
            Who is using it
          </h2>
          <div className="mt-0.5 text-[12px] text-white">
            Every workflow step a firm or its team completes, counted by the database. A firm hits
            the aha when it is active on 3 of its first 7 days.
          </div>
        </div>
        <IconButton
          aria-label="Refresh"
          onClick={() => void qc.invalidateQueries({ queryKey: QUERY_KEY })}
        >
          <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
        </IconButton>
      </div>

      {error ? (
        <Panel>
          <div className="text-[13px] text-white">
            Could not load firm activity:{' '}
            {(error as { message?: string })?.message || 'unknown error'}.
          </div>
        </Panel>
      ) : (
        <>
          <Panel>
            <div className="grid grid-cols-2 lg:grid-cols-6">
              <KpiTile
                label="Firms"
                value={dash ?? model.all.length}
                definition={
                  isLoading
                    ? 'employer accounts'
                    : `${model.never.length} ${model.never.length === 1 ? 'has' : 'have'} never done anything`
                }
                className={kpiCn}
              />
              <KpiTile
                label="Active this week"
                value={dash ?? model.active.length}
                definition="did at least one step in 7 days"
                className={cn(kpiCn, 'border-t-0')}
              />
              <KpiTile
                label="Going quiet"
                value={dash ?? model.quiet.length}
                definition="active this month, nothing this week"
                className={kpiCn}
              />
              <KpiTile
                label="Hit the aha"
                value={dash ?? `${model.hit}/${model.pastWeekOne}`}
                definition="3 active days in their first 7"
                className={kpiCn}
              />
              <KpiTile
                label="In first week"
                value={dash ?? model.fresh.length}
                definition="still inside the aha window"
                className={kpiCn}
              />
              <KpiTile
                label="Sunday emails"
                value={dash ?? model.digests}
                definition="sent in the last 7 days"
                className={kpiCn}
              />
            </div>
          </Panel>

          <Panel>
            <SectionHead
              title="Firms"
              meta={isLoading ? 'Loading…' : `${list.length} ${VIEW_META[view]}`}
            />
            <p className="mb-3 text-[12px] text-white">
              Workflow chips: solid = used this week, outline = this month, faint = earlier, dashed
              = never.
            </p>
            <Segmented<View>
              className="mt-2 overflow-x-auto"
              size="lg"
              value={view}
              onChange={(v) => {
                setView(v);
                setShowAll(false);
              }}
              options={[
                { key: 'quiet', label: 'Quiet', count: isLoading ? '—' : model.quiet.length },
                { key: 'active', label: 'Active', count: isLoading ? '—' : model.active.length },
                { key: 'new', label: 'New', count: isLoading ? '—' : model.fresh.length },
                { key: 'never', label: 'Never', count: isLoading ? '—' : model.never.length },
                { key: 'all', label: 'All', count: isLoading ? '—' : model.all.length },
              ]}
            />

            {isLoading ? (
              <div className="mt-4 grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-40 animate-pulse rounded-xl bg-white/[0.05]" />
                ))}
              </div>
            ) : shown.length === 0 ? (
              <div className="mt-4 py-6 text-[13px] text-white">
                {model.all.length === 0 ? empty.all : empty[view]}
              </div>
            ) : (
              <div className="mt-2 lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-3 2xl:grid-cols-3">
                {shown.map((f) => (
                  <FirmCard key={f.firm_id} f={f} />
                ))}
              </div>
            )}

            {!showAll && list.length > shown.length && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow lg:w-auto lg:px-5"
              >
                Show all {list.length}
              </button>
            )}
          </Panel>
        </>
      )}
    </div>
  );
}
