import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, ArrowLeft, Clock, Users } from 'lucide-react';
import { useState } from 'react';
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

type DateRangeKey = '1d' | '7d' | '30d' | '90d';
const DATE_RANGES: { key: DateRangeKey; label: string; days: number }[] = [
  { key: '1d', label: 'Today', days: 1 },
  { key: '7d', label: '7d', days: 7 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
];

interface AreaRow {
  area: string;
  minutes: number;
  users: number;
  mins_per_user: number;
}
interface PageRow {
  page: string;
  minutes: number;
  users: number;
  mins_per_user: number;
}
interface PersonRow {
  user_id: string;
  full_name: string | null;
  email: string | null;
  tier: string;
  minutes: number;
  last_seen: string;
}

function fmtMinutes(mins: number): string {
  if (mins >= 120) return `${(mins / 60).toFixed(1)}h`;
  return `${Math.round(mins)}m`;
}

export default function AdminPageAnalytics() {
  const [dateRange, setDateRange] = useState<DateRangeKey>('7d');
  const [drillArea, setDrillArea] = useState<string | null>(null);
  const [drillPage, setDrillPage] = useState<string | null>(null);
  const days = DATE_RANGES.find((r) => r.key === dateRange)?.days ?? 7;

  const areasQ = useQuery({
    queryKey: ['admin-page-time-areas', days],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not yet in generated types (house pattern, see AdminAnalytics)
      const { data, error } = await supabase.rpc('admin_page_time_areas' as any, { p_days: days } as any);
      if (error) throw error;
      return (data ?? []) as AreaRow[];
    },
  });

  const pagesQ = useQuery({
    queryKey: ['admin-page-time-pages', days, drillArea],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not yet in generated types
      const { data, error } = await supabase.rpc('admin_page_time_pages' as any, {
        p_days: days,
        p_prefix: drillArea,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped RPC params
      } as any);
      if (error) throw error;
      return (data ?? []) as PageRow[];
    },
    enabled: drillArea !== null,
  });

  const peopleQ = useQuery({
    queryKey: ['admin-page-time-people', days, drillPage],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not yet in generated types
      const { data, error } = await supabase.rpc('admin_page_time_people' as any, {
        p_days: days,
        p_page: drillPage,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped RPC params
      } as any);
      if (error) throw error;
      return (data ?? []) as PersonRow[];
    },
    enabled: drillPage !== null,
  });

  const areas = areasQ.data ?? [];
  const totalMinutes = areas.reduce((n, a) => n + Number(a.minutes), 0);
  const totalUsers = Math.max(...areas.map((a) => Number(a.users)), 0);
  const isLoading = areasQ.isLoading;

  const refetchAll = () => {
    void areasQ.refetch();
    if (drillArea) void pagesQ.refetch();
    if (drillPage) void peopleQ.refetch();
  };

  return (
    <PullToRefresh onRefresh={async () => refetchAll()}>
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Page analytics"
          description="Where users actually spend their time — every page, every person. From 30-second session heartbeats."
          tone="emerald"
          actions={
            <IconButton onClick={refetchAll} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${areasQ.isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <FilterBar
          tabs={DATE_RANGES.map((r) => ({ value: r.key, label: r.label }))}
          activeTab={dateRange}
          onTabChange={(v) => {
            setDateRange(v as DateRangeKey);
          }}
        />

        {isLoading && <LoadingBlocks />}

        {!isLoading && areas.length === 0 && (
          <EmptyState title="No heartbeat data" description="No session activity in this period." />
        )}

        {!isLoading && areas.length > 0 && (
          <>
            <StatStrip
              columns={3}
              stats={[
                { label: 'Total time', value: fmtMinutes(totalMinutes) },
                { label: 'Areas used', value: String(areas.length) },
                { label: 'Busiest area users', value: String(totalUsers) },
              ]}
            />

            {/* Level 1 — areas */}
            {!drillArea && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title="Time by area"
                  meta={<Pill tone="emerald">tap to drill down</Pill>}
                />
                <ListBody>
                  {areas.map((a) => (
                    <ListRow
                      key={a.area}
                      title={a.area}
                      subtitle={`${a.users} users · ${fmtMinutes(Number(a.mins_per_user))} each`}
                      trailing={
                        <span className="font-semibold text-white tabular-nums">
                          {fmtMinutes(Number(a.minutes))}
                        </span>
                      }
                      onClick={() => {
                        setDrillArea(a.area);
                        setDrillPage(null);
                      }}
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}

            {/* Level 2 — pages within an area */}
            {drillArea && !drillPage && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title={
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDrillArea(null)}
                        className="touch-manipulation inline-flex items-center gap-1 text-white/60 hover:text-white text-[13px]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Areas
                      </button>
                      <span className="text-white/40">/</span>
                      <span className="truncate">{drillArea}</span>
                    </span>
                  }
                  meta={<Pill tone="emerald">tap a page for people</Pill>}
                />
                <ListBody>
                  {pagesQ.isLoading && <LoadingBlocks />}
                  {(pagesQ.data ?? []).map((p) => (
                    <ListRow
                      key={p.page}
                      title={p.page}
                      subtitle={`${p.users} users · ${fmtMinutes(Number(p.mins_per_user))} each`}
                      trailing={
                        <span className="font-semibold text-white tabular-nums">
                          {fmtMinutes(Number(p.minutes))}
                        </span>
                      }
                      onClick={() => setDrillPage(p.page)}
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}

            {/* Level 3 — who spent the time on a page */}
            {drillPage && (
              <ListCard>
                <ListCardHeader
                  tone="purple"
                  title={
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDrillPage(null)}
                        className="touch-manipulation inline-flex items-center gap-1 text-white/60 hover:text-white text-[13px]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Pages
                      </button>
                      <span className="text-white/40">/</span>
                      <span className="truncate">{drillPage}</span>
                    </span>
                  }
                  meta={
                    <Pill tone="purple">
                      <Users className="h-3 w-3 mr-1 inline" />
                      who spent time here
                    </Pill>
                  }
                />
                <ListBody>
                  {peopleQ.isLoading && <LoadingBlocks />}
                  {(peopleQ.data ?? []).map((person) => (
                    <ListRow
                      key={person.user_id}
                      title={person.full_name || person.email || person.user_id.slice(0, 8)}
                      subtitle={
                        <span>
                          {person.email && person.full_name ? `${person.email} · ` : ''}
                          <span className="capitalize">{person.tier}</span> · last seen{' '}
                          {new Date(person.last_seen).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      }
                      trailing={
                        <span className="inline-flex items-center gap-1.5 font-semibold text-white tabular-nums">
                          <Clock className="h-3.5 w-3.5 text-white/50" />
                          {fmtMinutes(Number(person.minutes))}
                        </span>
                      }
                    />
                  ))}
                  {!peopleQ.isLoading && (peopleQ.data ?? []).length === 0 && (
                    <EmptyState title="Nobody yet" description="No time recorded on this page in the period." />
                  )}
                </ListBody>
              </ListCard>
            )}
          </>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
