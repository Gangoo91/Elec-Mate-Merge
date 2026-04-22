import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  type Tone,
} from '@/components/admin/editorial';

interface HealthCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  message: string;
  lastChecked: Date;
  responseTime?: number;
  details?: Record<string, unknown>;
}

function statusTone(status: HealthCheck['status']): Tone {
  switch (status) {
    case 'healthy':
      return 'emerald';
    case 'warning':
      return 'amber';
    case 'error':
      return 'red';
    case 'checking':
      return 'blue';
  }
}

function statusLabel(status: HealthCheck['status']): string {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'warning':
      return 'Warning';
    case 'error':
      return 'Error';
    case 'checking':
      return 'Checking';
  }
}

function formatCount(n: number): string {
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function AdminSystem() {
  const [selectedCheck, setSelectedCheck] = useState<HealthCheck | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const {
    data: healthChecks,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-system-health'],
    queryFn: async () => {
      const checks: HealthCheck[] = [];
      const now = new Date();

      try {
        const start = performance.now();
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        const duration = performance.now() - start;

        checks.push({
          name: 'Database Connection',
          status: duration < 1000 ? 'healthy' : duration < 3000 ? 'warning' : 'error',
          message: `Response time: ${duration.toFixed(0)}ms`,
          responseTime: duration,
          lastChecked: now,
          details: { responseTime: duration, totalUsers: count },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Database Connection',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      try {
        const start = performance.now();
        const { data } = await supabase.auth.getSession();
        const duration = performance.now() - start;

        checks.push({
          name: 'Auth Service',
          status: duration < 500 ? 'healthy' : duration < 1500 ? 'warning' : 'error',
          message: data.session
            ? `Active session - ${duration.toFixed(0)}ms`
            : `No session - ${duration.toFixed(0)}ms`,
          responseTime: duration,
          lastChecked: now,
          details: { responseTime: duration, hasSession: !!data.session },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Auth Service',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      try {
        const channels = supabase.getChannels();
        checks.push({
          name: 'Realtime Service',
          status: 'healthy',
          message: `${channels.length} active channel(s)`,
          lastChecked: now,
          details: { activeChannels: channels.length },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Realtime Service',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      try {
        const { count } = await supabase
          .from('profiles')
          .select('avatar_url', { count: 'exact', head: true })
          .not('avatar_url', 'is', null);

        checks.push({
          name: 'Storage Service',
          status: 'healthy',
          message: `${count || 0} files referenced`,
          lastChecked: now,
          details: { filesReferenced: count },
        });
      } catch (_error: unknown) {
        checks.push({
          name: 'Storage Service',
          status: 'warning',
          message: 'Unable to verify storage',
          lastChecked: now,
        });
      }

      try {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
        const { count } = await supabase
          .from('user_presence')
          .select('*', { count: 'exact', head: true })
          .gte('last_seen', fiveMinAgo.toISOString());

        checks.push({
          name: 'User Activity',
          status: (count || 0) > 0 ? 'healthy' : 'warning',
          message: `${count || 0} active users (5 min)`,
          lastChecked: now,
          details: { activeUsers: count },
        });
      } catch (_error: unknown) {
        checks.push({
          name: 'User Activity',
          status: 'warning',
          message: 'Unable to check activity',
          lastChecked: now,
        });
      }

      try {
        const criticalTables = ['profiles', 'global_chat_messages', 'promo_offers'];
        const tableCounts: Record<string, number> = {};

        for (const table of criticalTables) {
          const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
          tableCounts[table] = count || 0;
        }

        checks.push({
          name: 'Critical Tables',
          status: 'healthy',
          message: `${criticalTables.length} tables accessible`,
          lastChecked: now,
          details: { tableCounts },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Critical Tables',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      return checks;
    },
    refetchInterval: 60000,
  });

  const { data: dbStats } = useQuery({
    queryKey: ['admin-db-stats'],
    queryFn: async () => {
      const [profilesRes, messagesRes, offersRes, presenceRes, reportsRes, eventsRes] =
        await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('global_chat_messages').select('*', { count: 'exact', head: true }),
          supabase.from('promo_offers').select('*', { count: 'exact', head: true }),
          supabase.from('user_presence').select('*', { count: 'exact', head: true }),
          supabase.from('reports').select('*', { count: 'exact', head: true }),
          supabase.from('user_events').select('*', { count: 'exact', head: true }),
        ]);

      return {
        profiles: profilesRes.count || 0,
        messages: messagesRes.count || 0,
        offers: offersRes.count || 0,
        presence: presenceRes.count || 0,
        reports: reportsRes.count || 0,
        events: eventsRes.count || 0,
      };
    },
  });

  const dbCheck = healthChecks?.find((c) => c.name === 'Database Connection');
  const authCheck = healthChecks?.find((c) => c.name === 'Auth Service');
  const realtimeCheck = healthChecks?.find((c) => c.name === 'Realtime Service');
  const storageCheck = healthChecks?.find((c) => c.name === 'Storage Service');

  const dbHealthy = dbCheck?.status === 'healthy';
  const authHealthy = authCheck?.status === 'healthy';
  const realtimeHealthy = realtimeCheck?.status === 'healthy';
  const storageHealthy = storageCheck?.status === 'healthy';

  const apiLatency = dbCheck?.responseTime != null ? `${dbCheck.responseTime.toFixed(0)}ms` : '—';

  const databaseChecks = healthChecks?.filter((c) =>
    ['Database Connection', 'Critical Tables'].includes(c.name)
  );
  const edgeChecks = healthChecks?.filter((c) =>
    ['Auth Service', 'Realtime Service'].includes(c.name)
  );
  const infraChecks = healthChecks?.filter((c) =>
    ['Storage Service', 'User Activity'].includes(c.name)
  );

  const incidents = healthChecks?.filter((c) => c.status === 'error' || c.status === 'warning');

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="System"
          description="Infrastructure health and maintenance mode."
          tone="green"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                {
                  label: 'DB',
                  value: dbHealthy ? 'OK' : statusLabel(dbCheck?.status ?? 'checking'),
                  tone: dbCheck ? statusTone(dbCheck.status) : 'emerald',
                  sub: `${formatCount(dbStats?.profiles || 0)} profiles`,
                },
                {
                  label: 'Edge Functions',
                  value: authHealthy && realtimeHealthy ? 'OK' : 'Degraded',
                  tone: authHealthy && realtimeHealthy ? 'emerald' : 'amber',
                  sub: realtimeCheck?.message,
                },
                {
                  label: 'Storage',
                  value: storageHealthy ? 'OK' : statusLabel(storageCheck?.status ?? 'checking'),
                  tone: storageCheck ? statusTone(storageCheck.status) : 'emerald',
                  sub: storageCheck?.message,
                },
                {
                  label: 'API Latency',
                  value: apiLatency,
                  tone: 'blue',
                  sub: 'profiles head check',
                },
              ]}
            />

            <StatStrip
              columns={3}
              stats={[
                { label: 'Reports', value: formatCount(dbStats?.reports || 0), tone: 'yellow' },
                { label: 'Events', value: formatCount(dbStats?.events || 0), tone: 'cyan' },
                {
                  label: 'Active now',
                  value: formatCount(dbStats?.presence || 0),
                  tone: 'emerald',
                  sub: 'last 5 minutes',
                },
              ]}
            />

            {databaseChecks && databaseChecks.length > 0 && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title="Database"
                  meta={
                    <Pill tone={databaseChecks.every((c) => c.status === 'healthy') ? 'emerald' : 'amber'}>
                      {databaseChecks.every((c) => c.status === 'healthy') ? 'Healthy' : 'Attention'}
                    </Pill>
                  }
                />
                <ListBody>
                  {databaseChecks.map((c) => (
                    <ListRow
                      key={c.name}
                      title={c.name}
                      subtitle={c.message}
                      trailing={<Pill tone={statusTone(c.status)}>{statusLabel(c.status)}</Pill>}
                      onClick={() => setSelectedCheck(c)}
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}

            {edgeChecks && edgeChecks.length > 0 && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title="Edge Functions"
                  meta={
                    <Pill tone={edgeChecks.every((c) => c.status === 'healthy') ? 'emerald' : 'amber'}>
                      {edgeChecks.every((c) => c.status === 'healthy') ? 'Healthy' : 'Attention'}
                    </Pill>
                  }
                />
                <ListBody>
                  {edgeChecks.map((c) => (
                    <ListRow
                      key={c.name}
                      title={c.name}
                      subtitle={c.message}
                      trailing={<Pill tone={statusTone(c.status)}>{statusLabel(c.status)}</Pill>}
                      onClick={() => setSelectedCheck(c)}
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}

            {infraChecks && infraChecks.length > 0 && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title="Storage & Activity"
                  meta={
                    <Pill tone={infraChecks.every((c) => c.status === 'healthy') ? 'emerald' : 'amber'}>
                      {infraChecks.every((c) => c.status === 'healthy') ? 'Healthy' : 'Attention'}
                    </Pill>
                  }
                />
                <ListBody>
                  {infraChecks.map((c) => (
                    <ListRow
                      key={c.name}
                      title={c.name}
                      subtitle={c.message}
                      trailing={<Pill tone={statusTone(c.status)}>{statusLabel(c.status)}</Pill>}
                      onClick={() => setSelectedCheck(c)}
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}

            <ListCard>
              <ListCardHeader
                tone="amber"
                title="Maintenance mode"
                meta={
                  <Pill tone={maintenanceMode ? 'amber' : 'emerald'}>
                    {maintenanceMode ? 'Enabled' : 'Disabled'}
                  </Pill>
                }
              />
              <ListBody>
                <ListRow
                  title="Global maintenance banner"
                  subtitle="Blocks writes and shows a banner to all users. Use during deploys or DB migrations."
                  trailing={
                    <button
                      type="button"
                      role="switch"
                      aria-checked={maintenanceMode}
                      onClick={() => setMaintenanceMode((v) => !v)}
                      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/[0.08] transition-colors touch-manipulation ${
                        maintenanceMode ? 'bg-elec-yellow' : 'bg-white/[0.06]'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  }
                />
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone={incidents && incidents.length > 0 ? 'orange' : 'emerald'}
                title="Recent incidents"
                meta={
                  <Pill tone={incidents && incidents.length > 0 ? 'orange' : 'emerald'}>
                    {incidents?.length ?? 0}
                  </Pill>
                }
              />
              {incidents && incidents.length > 0 ? (
                <ListBody>
                  {incidents.map((c) => (
                    <ListRow
                      key={c.name}
                      title={c.name}
                      subtitle={`${c.message} · ${formatDistanceToNow(c.lastChecked, { addSuffix: true })}`}
                      trailing={<Pill tone={statusTone(c.status)}>{statusLabel(c.status)}</Pill>}
                      onClick={() => setSelectedCheck(c)}
                    />
                  ))}
                </ListBody>
              ) : (
                <EmptyState
                  title="No incidents"
                  description="All services have been operating normally."
                />
              )}
            </ListCard>
          </>
        )}

        <Sheet open={!!selectedCheck} onOpenChange={() => setSelectedCheck(null)}>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl p-0 bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                      Service check
                    </div>
                    <div className="mt-1.5 text-xl font-semibold text-white tracking-tight">
                      {selectedCheck?.name}
                    </div>
                  </div>
                  {selectedCheck && (
                    <Pill tone={statusTone(selectedCheck.status)}>
                      {statusLabel(selectedCheck.status)}
                    </Pill>
                  )}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <ListCard>
                  <ListCardHeader title="Status message" />
                  <div className="px-5 py-4 text-sm text-white">{selectedCheck?.message}</div>
                </ListCard>

                {selectedCheck?.details && Object.keys(selectedCheck.details).length > 0 && (
                  <ListCard>
                    <ListCardHeader title="Details" />
                    <ListBody>
                      {Object.entries(selectedCheck.details).map(([key, value]) => (
                        <ListRow
                          key={key}
                          title={key.replace(/([A-Z])/g, ' $1').trim()}
                          trailing={
                            <span className="text-sm font-mono text-white tabular-nums">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                <ListCard>
                  <ListCardHeader
                    title={
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Last checked
                      </span>
                    }
                  />
                  <div className="px-5 py-4 text-sm text-white">
                    {selectedCheck?.lastChecked &&
                      formatDistanceToNow(selectedCheck.lastChecked, { addSuffix: true })}
                  </div>
                </ListCard>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
