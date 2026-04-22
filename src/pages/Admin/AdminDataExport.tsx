import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import {
  PageFrame,
  PageHero,
  IconButton,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  Eyebrow,
  Divider,
} from '@/components/admin/editorial';
import type { Database as DbTypes } from '@/integrations/supabase/types';

type TableName = keyof DbTypes['public']['Tables'];

interface ExportConfig {
  table: string;
  name: string;
  description: string;
  fields: string[];
}

const EXPORT_CONFIGS: ExportConfig[] = [
  {
    table: 'profiles',
    name: 'Users',
    description: 'All user profiles and account data',
    fields: [
      'id',
      'email',
      'full_name',
      'username',
      'role',
      'subscribed',
      'subscription_tier',
      'created_at',
    ],
  },
  {
    table: 'vacancies',
    name: 'Job Vacancies',
    description: 'All employer job postings',
    fields: [
      'id',
      'employer_id',
      'title',
      'description',
      'location',
      'salary_min',
      'salary_max',
      'is_active',
      'created_at',
    ],
  },
  {
    table: 'conversations',
    name: 'Conversations',
    description: 'User messaging data',
    fields: ['id', 'participant_one', 'participant_two', 'created_at', 'updated_at'],
  },
  {
    table: 'employer_elec_id_profiles',
    name: 'Elec-ID Profiles',
    description: 'Electrician verification data',
    fields: ['id', 'user_id', 'ecs_card_type', 'ecs_expiry', 'is_verified', 'created_at'],
  },
  {
    table: 'apprentice_progress',
    name: 'Apprentice Progress',
    description: 'Learning progress tracking',
    fields: ['id', 'user_id', 'course_id', 'module_id', 'completed', 'score', 'created_at'],
  },
  {
    table: 'support_tickets',
    name: 'Support Tickets',
    description: 'Customer support requests',
    fields: ['id', 'user_id', 'subject', 'status', 'priority', 'created_at', 'resolved_at'],
  },
  {
    table: 'admin_audit_logs',
    name: 'Audit Logs',
    description: 'Admin activity logs',
    fields: ['id', 'user_id', 'action', 'entity_type', 'entity_id', 'created_at'],
  },
];

interface RecentExport {
  id: string;
  dataset: string;
  format: 'CSV' | 'JSON';
  timestamp: string;
  status: 'complete' | 'failed';
  size: string;
}

export default function AdminDataExport() {
  const { profile } = useAuth();
  const haptic = useHaptic();
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ExportConfig | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [dateRange, setDateRange] = useState('all');
  const [recentExports, setRecentExports] = useState<RecentExport[]>([]);

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  const { data: tableCounts, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['admin-table-counts'],
    queryFn: async () => {
      const counts: Record<string, number> = {};
      for (const config of EXPORT_CONFIGS) {
        const { count } = await supabase
          .from(config.table as TableName)
          .select('*', { count: 'exact', head: true });
        counts[config.table] = count || 0;
      }
      return counts;
    },
  });

  const exportMutation = useMutation({
    mutationFn: async () => {
      if (!selectedConfig) throw new Error('No table selected');

      let query = supabase.from(selectedConfig.table as TableName).select(selectedFields.join(','));

      if (dateRange !== 'all') {
        const days = parseInt(dateRange);
        const since = subDays(new Date(), days).toISOString();
        query = query.gte('created_at', since);
      }

      const { data, error } = await query;
      if (error) throw error;

      let content: string;
      let filename: string;
      let mimeType: string;

      if (exportFormat === 'csv') {
        const headers = selectedFields.join(',');
        const rows = (data || []).map((row: Record<string, unknown>) =>
          selectedFields
            .map((field) => {
              const value = row[field];
              if (value === null || value === undefined) return '';
              if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
              return String(value);
            })
            .join(',')
        );
        content = [headers, ...rows].join('\n');
        filename = `${selectedConfig.table}_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        mimeType = 'text/csv';
      } else {
        content = JSON.stringify(data, null, 2);
        filename = `${selectedConfig.table}_export_${format(new Date(), 'yyyy-MM-dd')}.json`;
        mimeType = 'application/json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'data_export',
        entity_type: selectedConfig.table,
        new_values: {
          fields: selectedFields,
          format: exportFormat,
          dateRange,
          rowCount: data?.length,
        },
      });

      return { count: data?.length || 0, size: blob.size, filename };
    },
    onSuccess: ({ count, size, filename }) => {
      haptic.success();
      setExportOpen(false);
      setRecentExports((prev) => [
        {
          id: `${Date.now()}`,
          dataset: selectedConfig?.name || filename,
          format: exportFormat.toUpperCase() as 'CSV' | 'JSON',
          timestamp: format(new Date(), 'HH:mm · dd MMM'),
          status: 'complete',
          size: formatBytes(size),
        },
        ...prev,
      ].slice(0, 12));
      setSelectedConfig(null);
      setSelectedFields([]);
      toast({ title: 'Export complete', description: `Exported ${count} records` });
    },
    onError: (error) => {
      haptic.error();
      setRecentExports((prev) => [
        {
          id: `${Date.now()}`,
          dataset: selectedConfig?.name || 'Unknown',
          format: exportFormat.toUpperCase() as 'CSV' | 'JSON',
          timestamp: format(new Date(), 'HH:mm · dd MMM'),
          status: 'failed',
          size: '—',
        },
        ...prev,
      ].slice(0, 12));
      toast({ title: 'Export failed', description: error.message, variant: 'destructive' });
    },
  });

  const handleOpenExport = (config: ExportConfig) => {
    setSelectedConfig(config);
    setSelectedFields([...config.fields]);
    setExportFormat('csv');
    setDateRange('all');
    setExportOpen(true);
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const totalRecords = Object.values(tableCounts || {}).reduce((a, b) => a + b, 0);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Data Export"
          description="Download CSV/JSON snapshots for reporting."
          tone="cyan"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        {!isSuperAdmin && (
          <ListCard>
            <ListCardHeader tone="amber" title="Access restricted" />
            <ListBody>
              <ListRow
                title="Super admin only"
                subtitle="Data export is restricted to super admins."
                trailing={<Pill tone="amber">Locked</Pill>}
              />
            </ListBody>
          </ListCard>
        )}

        <div className="flex items-center justify-between">
          <Eyebrow>
            {EXPORT_CONFIGS.length} datasets · {totalRecords.toLocaleString()} total records
          </Eyebrow>
        </div>

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {EXPORT_CONFIGS.map((config) => {
              const rowCount = tableCounts?.[config.table] ?? 0;
              return (
                <ListCard key={config.table}>
                  <ListCardHeader
                    tone="cyan"
                    title={config.name}
                    meta={
                      <Pill tone="cyan">{rowCount.toLocaleString()} rows</Pill>
                    }
                  />
                  <ListBody>
                    <ListRow
                      title="Description"
                      subtitle={config.description}
                      trailing={
                        <span className="text-[11px] text-white tabular-nums">
                          {config.fields.length} fields
                        </span>
                      }
                    />
                    <ListRow
                      title="Format"
                      subtitle="CSV spreadsheet or JSON payload"
                      trailing={
                        <>
                          <Pill tone="yellow">CSV</Pill>
                          <Pill tone="blue">JSON</Pill>
                        </>
                      }
                    />
                    <ListRow
                      title="Date range"
                      subtitle="Filter by created_at — default all time"
                      trailing={<Pill tone="purple">All · 7d · 30d · 90d · 1y</Pill>}
                    />
                    <div className="px-4 sm:px-5 py-3.5 sm:py-4">
                      <button
                        onClick={() => isSuperAdmin && handleOpenExport(config)}
                        disabled={!isSuperAdmin}
                        className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation transition-colors hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="h-4 w-4" />
                        Configure export
                      </button>
                    </div>
                  </ListBody>
                </ListCard>
              );
            })}
          </div>
        )}

        <Divider label="Activity" />

        {recentExports.length === 0 ? (
          <EmptyState
            title="No recent exports"
            description="Exports you run in this session will appear here with size, format and status."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              title="Recent Exports"
              meta={<Pill tone="cyan">{recentExports.length}</Pill>}
            />
            <ListBody>
              {recentExports.map((x) => (
                <ListRow
                  key={x.id}
                  title={x.dataset}
                  subtitle={`${x.format} · ${x.timestamp}`}
                  trailing={
                    <>
                      <Pill tone={x.status === 'complete' ? 'emerald' : 'red'}>
                        {x.status === 'complete' ? 'Complete' : 'Failed'}
                      </Pill>
                      <span className="text-[11px] text-white tabular-nums">{x.size}</span>
                    </>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={exportOpen} onOpenChange={setExportOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_12%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06] text-left">
                <Eyebrow>Configure</Eyebrow>
                <SheetTitle className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Export {selectedConfig?.name}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-2.5">
                  <Label className="text-white text-[12px] uppercase tracking-[0.18em] font-medium">
                    Format
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setExportFormat('csv')}
                      className={`h-11 rounded-full text-[13px] font-semibold touch-manipulation transition-colors ${
                        exportFormat === 'csv'
                          ? 'bg-elec-yellow text-black'
                          : 'bg-[hsl(0_0%_15%)] text-white border border-white/[0.08]'
                      }`}
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => setExportFormat('json')}
                      className={`h-11 rounded-full text-[13px] font-semibold touch-manipulation transition-colors ${
                        exportFormat === 'json'
                          ? 'bg-elec-yellow text-black'
                          : 'bg-[hsl(0_0%_15%)] text-white border border-white/[0.08]'
                      }`}
                    >
                      JSON
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-white text-[12px] uppercase tracking-[0.18em] font-medium">
                    Date Range
                  </Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_15%)] border-white/[0.08] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7">Last 7 Days</SelectItem>
                      <SelectItem value="30">Last 30 Days</SelectItem>
                      <SelectItem value="90">Last 90 Days</SelectItem>
                      <SelectItem value="365">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-[12px] uppercase tracking-[0.18em] font-medium">
                      Fields ({selectedFields.length}/{selectedConfig?.fields.length ?? 0})
                    </Label>
                    <button
                      onClick={() => setSelectedFields(selectedConfig?.fields || [])}
                      className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow touch-manipulation"
                    >
                      Select all →
                    </button>
                  </div>
                  <div className="bg-[hsl(0_0%_15%)] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06]">
                    {selectedConfig?.fields.map((field) => (
                      <div key={field} className="flex items-center gap-3 px-4 py-3.5">
                        <Checkbox
                          id={field}
                          checked={selectedFields.includes(field)}
                          onCheckedChange={() => toggleField(field)}
                          className="touch-manipulation border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                        />
                        <Label
                          htmlFor={field}
                          className="font-mono text-[13px] cursor-pointer text-white flex-1"
                        >
                          {field}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[hsl(0_0%_15%)] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Table</span>
                    <span className="font-mono text-[12px] text-white">{selectedConfig?.table}</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Format</span>
                    <Pill tone={exportFormat === 'csv' ? 'yellow' : 'blue'}>
                      {exportFormat.toUpperCase()}
                    </Pill>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Fields</span>
                    <span className="text-[12px] text-white tabular-nums">
                      {selectedFields.length} selected
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Approx. Rows</span>
                    <span className="text-[12px] text-white tabular-nums">
                      {tableCounts?.[selectedConfig?.table || '']?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>

              <SheetFooter className="p-5 border-t border-white/[0.06]">
                <button
                  onClick={() => exportMutation.mutate()}
                  disabled={exportMutation.isPending || selectedFields.length === 0}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation transition-colors hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exportMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Exporting…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export data
                    </>
                  )}
                </button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
