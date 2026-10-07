/**
 * ELE-1980: Admin → Help usage.
 *
 * Every time someone opens a page's "?" help sheet (PageHelp), one row lands in
 * help_open_events. This page rolls those up with admin_help_usage(p_days) so
 * the screens people find confusing can be found: top help pages, opens per
 * hub, and a daily trend.
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  IconButton,
  FilterBar,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  LoadingBlocks,
  EmptyState,
  Pill,
} from '@/components/admin/editorial';

type RangeKey = '7d' | '30d' | '90d';
const RANGES: { key: RangeKey; label: string; days: number }[] = [
  { key: '7d', label: '7d', days: 7 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
];

interface TopRow {
  help_id: string;
  area: string;
  opens: number;
  people: number;
  top_path: string | null;
  last_opened: string;
}
interface AreaRow {
  area: string;
  opens: number;
  people: number;
}
interface DayRow {
  day: string;
  opens: number;
  people: number;
}
interface HelpUsage {
  days: number;
  totals: { opens: number; people: number; pages: number };
  by_area: AreaRow[];
  top: TopRow[];
  daily: DayRow[];
}

const AREA_LABEL: Record<string, string> = {
  college: 'College',
  employer: 'Employer',
  wt: 'Worker tools',
  apprentice: 'Apprentice',
  electrician: 'Electrician',
};

function areaLabel(a: string): string {
  return AREA_LABEL[a] ?? a.charAt(0).toUpperCase() + a.slice(1);
}

/** "college-otj-inbox" → "Otj inbox" (the help id without its hub prefix). */
function helpLabel(id: string): string {
  const rest = id.split('-').slice(1).join(' ') || id;
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

function fmtDay(d: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) {
  return new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-GB', opts);
}

/** Opens per day: one series, thin bars on a zero baseline, hover for the figure. */
function DailyTrend({ daily }: { daily: DayRow[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...daily.map((d) => d.opens));
  const shown = hover !== null ? daily[hover] : null;
  return (
    <div className="px-4 pb-4 pt-2 sm:px-5">
      <div className="mb-2 h-5 text-[12px] text-white tabular-nums" aria-live="polite">
        {shown
          ? `${fmtDay(shown.day, { weekday: 'short', day: 'numeric', month: 'short' })}: ${shown.opens} opens by ${shown.people} ${shown.people === 1 ? 'person' : 'people'}`
          : `Busiest day: ${max} opens`}
      </div>
      <div
        className="relative flex h-32 items-end gap-[2px] border-b border-white/20"
        role="img"
        aria-label={`Help opens per day over the last ${daily.length} days`}
        onMouseLeave={() => setHover(null)}
      >
        {daily.map((d, i) => (
          <button
            key={d.day}
            type="button"
            className="group relative flex h-full flex-1 items-end focus:outline-none"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => setHover(i)}
            aria-label={`${fmtDay(d.day)}: ${d.opens} opens`}
          >
            <span
              className={`block w-full rounded-t-[4px] transition-colors ${
                hover === i ? 'bg-elec-yellow' : 'bg-elec-yellow/60'
              }`}
              style={{ height: d.opens === 0 ? 0 : `${Math.max(3, (d.opens / max) * 100)}%` }}
            />
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-white">
        <span>{daily[0] ? fmtDay(daily[0].day) : ''}</span>
        <span>{daily.length ? fmtDay(daily[daily.length - 1].day) : ''}</span>
      </div>
    </div>
  );
}

export default function AdminHelpUsage() {
  const [range, setRange] = useState<RangeKey>('30d');
  const [area, setArea] = useState<string | null>(null);
  const days = RANGES.find((r) => r.key === range)?.days ?? 30;

  const q = useQuery({
    queryKey: ['admin-help-usage', days],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not yet in generated types (house pattern)
      const { data, error } = await supabase.rpc('admin_help_usage' as any, { p_days: days } as any);
      if (error) throw error;
      return data as unknown as HelpUsage;
    },
  });

  const data = q.data;
  const top = useMemo(
    () => (data?.top ?? []).filter((t) => !area || t.area === area),
    [data, area]
  );

  return (
    <PullToRefresh onRefresh={async () => void (await q.refetch())}>
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Help usage"
          description="Which screens people open the ? help on. A screen near the top is one people find hard to follow."
          tone="yellow"
          actions={
            <IconButton onClick={() => void q.refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${q.isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <FilterBar
          tabs={RANGES.map((r) => ({ value: r.key, label: r.label }))}
          activeTab={range}
          onTabChange={(v) => setRange(v as RangeKey)}
        />

        {q.isLoading && <LoadingBlocks />}
        {q.error && (
          <EmptyState title="Could not load help usage" description={(q.error as Error).message} />
        )}

        {data && data.totals.opens === 0 && (
          <EmptyState title="No help opened" description="Nobody opened a help sheet in this period." />
        )}

        {data && data.totals.opens > 0 && (
          <>
            <StatStrip
              columns={3}
              stats={[
                { label: 'Help opens', value: String(data.totals.opens) },
                { label: 'People', value: String(data.totals.people) },
                { label: 'Screens', value: String(data.totals.pages) },
              ]}
            />

            <ListCard>
              <ListCardHeader tone="yellow" title="Opens per day" meta={<Pill tone="yellow">trend</Pill>} />
              <DailyTrend daily={data.daily} />
            </ListCard>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setArea(null)}
                className={`h-11 rounded-full border px-4 text-[13px] font-medium text-white touch-manipulation ${
                  area === null ? 'border-elec-yellow bg-elec-yellow/15' : 'border-white/15 bg-white/[0.04]'
                }`}
              >
                All hubs · {data.totals.opens}
              </button>
              {data.by_area.map((a) => (
                <button
                  key={a.area}
                  type="button"
                  onClick={() => setArea(a.area)}
                  className={`h-11 rounded-full border px-4 text-[13px] font-medium text-white touch-manipulation ${
                    area === a.area ? 'border-elec-yellow bg-elec-yellow/15' : 'border-white/15 bg-white/[0.04]'
                  }`}
                >
                  {areaLabel(a.area)} · {a.opens}
                </button>
              ))}
            </div>

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title={area ? `Top screens: ${areaLabel(area)}` : 'Top screens'}
                meta={<Pill tone="yellow">{top.length} screens</Pill>}
              />
              <ListBody>
                {top.map((t, i) => (
                  <ListRow
                    key={t.help_id}
                    title={`${i + 1}. ${helpLabel(t.help_id)}`}
                    subtitleWrap
                    subtitle={
                      <span>
                        {areaLabel(t.area)} · {t.people} {t.people === 1 ? 'person' : 'people'}
                        {t.top_path ? ` · ${t.top_path}` : ''} · last {fmtDay(t.last_opened)}
                      </span>
                    }
                    trailing={
                      <span className="font-semibold text-white tabular-nums">{t.opens}</span>
                    }
                  />
                ))}
              </ListBody>
            </ListCard>
          </>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
