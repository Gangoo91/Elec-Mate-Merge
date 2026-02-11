import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Download,
  Database,
  Users,
  FileSpreadsheet,
  FileJson,
  Briefcase,
  MessageSquare,
  CreditCard,
  GraduationCap,
  Settings,
  Loader2,
  Check,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import type { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

interface ExportConfig {
  table: string;
  name: string;
  icon: LucideIcon;
  description: string;
  fields: string[];
}

const EXPORT_CONFIGS: ExportConfig[] = [
  {
    table: 'profiles',
    name: 'Users',
    icon: Users,
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
    icon: Briefcase,
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
    icon: MessageSquare,
    description: 'User messaging data',
    fields: ['id', 'participant_one', 'participant_two', 'created_at', 'updated_at'],
  },
  {
    table: 'employer_elec_id_profiles',
    name: 'Elec-ID Profiles',
    icon: CreditCard,
    description: 'Electrician verification data',
    fields: ['id', 'user_id', 'ecs_card_type', 'ecs_expiry', 'is_verified', 'created_at'],
  },
  {
    table: 'apprentice_progress',
    name: 'Apprentice Progress',
    icon: GraduationCap,
    description: 'Learning progress tracking',
    fields: ['id', 'user_id', 'course_id', 'module_id', 'completed', 'score', 'created_at'],
  },
  {
    table: 'support_tickets',
    name: 'Support Tickets',
    icon: MessageSquare,
    description: 'Customer support requests',
    fields: ['id', 'user_id', 'subject', 'status', 'priority', 'created_at', 'resolved_at'],
  },
  {
    table: 'admin_audit_logs',
    name: 'Audit Logs',
    icon: Settings,
    description: 'Admin activity logs',
    fields: ['id', 'user_id', 'action', 'entity_type', 'entity_id', 'created_at'],
  },
];

export default function AdminDataExport() {
  const { profile } = useAuth();
  const haptic = useHaptic();
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ExportConfig | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [dateRange, setDateRange] = useState('all');

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  // Get row counts for each table
  const { data: tableCounts, refetch } = useQuery({
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

  // Export mutation
  const exportMutation = useMutation({
    mutationFn: async () => {
      if (!selectedConfig) throw new Error('No table selected');

      let query = supabase.from(selectedConfig.table as TableName).select(selectedFields.join(','));

      // Apply date filter
      if (dateRange !== 'all') {
        const days = parseInt(dateRange);
        const since = subDays(new Date(), days).toISOString();
        query = query.gte('created_at', since);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Generate file
      let content: string;
      let filename: string;
      let mimeType: string;

      if (exportFormat === 'csv') {
        // Generate CSV
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
        // Generate JSON
        content = JSON.stringify(data, null, 2);
        filename = `${selectedConfig.table}_export_${format(new Date(), 'yyyy-MM-dd')}.json`;
        mimeType = 'application/json';
      }

      // Download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Log the export
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

      return data?.length || 0;
    },
    onSuccess: (count) => {
      haptic.success();
      setExportOpen(false);
      setSelectedConfig(null);
      setSelectedFields([]);
      toast({ title: 'Export complete', description: `Exported ${count} records` });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Export failed', description: error.message, variant: 'destructive' });
    },
  });

  const handleOpenExport = (config: ExportConfig) => {
    setSelectedConfig(config);
    setSelectedFields([...config.fields]);
    setExportOpen(true);
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">Data Export</h2>
          <p className="text-xs text-muted-foreground">Export platform data for analysis</p>
        </div>

        {!isSuperAdmin && (
          <Card className="border-amber-500/30 bg-amber-500/10">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-amber-300">
                Data export is restricted to super admins only.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Export Options */}
        <div className="grid gap-3">
          {EXPORT_CONFIGS.map((config) => {
            const Icon = config.icon;
            return (
              <Card
                key={config.table}
                className={`touch-manipulation transition-all ${
                  isSuperAdmin
                    ? 'active:scale-[0.99] cursor-pointer hover:border-primary/50'
                    : 'opacity-60'
                }`}
                onClick={() => isSuperAdmin && handleOpenExport(config)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{config.name}</p>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {tableCounts?.[config.table]?.toLocaleString() || 0} rows
                      </Badge>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-blue-500/5 to-yellow-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" />
              Database Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">
                  {Object.values(tableCounts || {})
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Records</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{EXPORT_CONFIGS.length}</p>
                <p className="text-xs text-muted-foreground">Tables Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Sheet */}
        <Sheet open={exportOpen} onOpenChange={setExportOpen}>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export {selectedConfig?.name}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Format Selection */}
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={exportFormat === 'csv' ? 'default' : 'outline'}
                      className="h-12 touch-manipulation"
                      onClick={() => setExportFormat('csv')}
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button
                      variant={exportFormat === 'json' ? 'default' : 'outline'}
                      className="h-12 touch-manipulation"
                      onClick={() => setExportFormat('json')}
                    >
                      <FileJson className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="h-11 touch-manipulation">
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

                {/* Field Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Fields to Export</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-11 text-xs touch-manipulation"
                      onClick={() => setSelectedFields(selectedConfig?.fields || [])}
                    >
                      Select All
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="pt-4 pb-4 space-y-3">
                      {selectedConfig?.fields.map((field) => (
                        <div key={field} className="flex items-center space-x-3">
                          <Checkbox
                            id={field}
                            checked={selectedFields.includes(field)}
                            onCheckedChange={() => toggleField(field)}
                            className="touch-manipulation"
                          />
                          <Label htmlFor={field} className="font-mono text-sm cursor-pointer">
                            {field}
                          </Label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Export Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Table</span>
                        <span className="font-mono">{selectedConfig?.table}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format</span>
                        <Badge variant="outline">{exportFormat.toUpperCase()}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fields</span>
                        <span>{selectedFields.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Approx. Rows</span>
                        <span>
                          {tableCounts?.[selectedConfig?.table || '']?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <SheetFooter className="p-4 border-t border-border">
                <Button
                  className="w-full h-12 touch-manipulation gap-2"
                  onClick={() => exportMutation.mutate()}
                  disabled={exportMutation.isPending || selectedFields.length === 0}
                >
                  {exportMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export Data
                    </>
                  )}
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
