import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  AlertTriangle,
  Mail,
  MailWarning,
  CheckCircle,
  ChevronRight,
  RefreshCw,
  Download,
  ExternalLink,
  Loader2,
  Send,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FailedPaymentRow {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  amount_due: number;
  hosted_invoice_url: string | null;
  emails_sent: number;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  email_1_sent_at: string | null;
  email_2_sent_at: string | null;
  email_3_sent_at: string | null;
}

interface FailedPaymentRecord extends FailedPaymentRow {
  full_name: string | null;
  username: string | null;
}

type StatusFilter = 'active' | 'emailed' | 'final' | 'recovered' | null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDunningStage(record: FailedPaymentRecord): string {
  if (record.resolved) return 'Recovered';
  if (record.emails_sent === 3) return 'Final Notice';
  if (record.emails_sent === 2) return 'Email 2 Sent';
  if (record.emails_sent === 1) return 'Email 1 Sent';
  return 'Pending';
}

function getStageOrder(stage: string): number {
  switch (stage) {
    case 'Pending':
      return 0;
    case 'Email 1 Sent':
      return 1;
    case 'Email 2 Sent':
      return 2;
    case 'Final Notice':
      return 3;
    case 'Recovered':
      return 4;
    default:
      return 5;
  }
}

function getStageColour(stage: string): string {
  switch (stage) {
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Email 1 Sent':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Email 2 Sent':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'Final Notice':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Recovered':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-muted text-white';
  }
}

function getStageIcon(stage: string) {
  switch (stage) {
    case 'Recovered':
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    case 'Final Notice':
      return <MailWarning className="h-5 w-5 text-red-400" />;
    case 'Email 2 Sent':
    case 'Email 1 Sent':
      return <Mail className="h-5 w-5 text-amber-400" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminFailedPayments() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(null);
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<FailedPaymentRecord | null>(null);
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  // ── Data fetching ────────────────────────────────────────────────────────

  const {
    data: records,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-failed-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('failed_payment_emails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const rows = (data ?? []) as FailedPaymentRow[];

      // Enrich with profile names
      const userIds = [...new Set(rows.map((r) => r.user_id))];
      const profileMap = new Map<string, { full_name: string; username: string }>();

      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .in('id', userIds);

        profiles?.forEach((p) => profileMap.set(p.id, p));
      }

      return rows.map((r) => ({
        ...r,
        full_name: profileMap.get(r.user_id)?.full_name ?? null,
        username: profileMap.get(r.user_id)?.username ?? null,
      })) as FailedPaymentRecord[];
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // ── Mutations ────────────────────────────────────────────────────────────

  const sendNextMutation = useMutation({
    mutationFn: async (recordId: string) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-dunning-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ action: 'send_next', recordId }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send email');
      }

      return res.json();
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Email ${data.emailNumber} sent successfully`);
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
      // Update selected record in-place
      if (data.record) setSelectedRecord(data.record);
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (recordId: string) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-dunning-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ action: 'resolve', recordId }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to resolve');
      }

      return res.json();
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success('Marked as resolved');
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
      if (data.record) setSelectedRecord(data.record);
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  // ── Stats ────────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const all = records ?? [];
    return {
      active: all.filter((r) => !r.resolved).length,
      emailed: all.filter((r) => r.emails_sent >= 1 && !r.resolved).length,
      final: all.filter((r) => r.emails_sent === 3 && !r.resolved).length,
      recovered: all.filter((r) => r.resolved).length,
    };
  }, [records]);

  // ── Pipeline counts ──────────────────────────────────────────────────────

  const pipeline = useMemo(() => {
    const all = records ?? [];
    const unresolved = all.filter((r) => !r.resolved);
    return {
      email1: unresolved.filter((r) => r.emails_sent >= 1).length,
      email2: unresolved.filter((r) => r.emails_sent >= 2).length,
      email3: unresolved.filter((r) => r.emails_sent >= 3).length,
      recovered: all.filter((r) => r.resolved).length,
      total: all.length,
      totalOutstanding: unresolved.reduce((sum, r) => sum + (r.amount_due || 0), 0),
    };
  }, [records]);

  const recoveryRate =
    pipeline.total > 0 ? ((pipeline.recovered / pipeline.total) * 100).toFixed(1) : '0';

  // ── Filtered & grouped ───────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = records ?? [];

    // Apply status filter
    if (statusFilter === 'active') list = list.filter((r) => !r.resolved);
    else if (statusFilter === 'emailed')
      list = list.filter((r) => r.emails_sent >= 1 && !r.resolved);
    else if (statusFilter === 'final')
      list = list.filter((r) => r.emails_sent === 3 && !r.resolved);
    else if (statusFilter === 'recovered') list = list.filter((r) => r.resolved);

    // Apply search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.full_name?.toLowerCase().includes(q) ||
          r.username?.toLowerCase().includes(q) ||
          r.stripe_invoice_id?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [records, statusFilter, search]);

  const grouped = useMemo(() => {
    const groups = new Map<string, FailedPaymentRecord[]>();
    for (const r of filtered) {
      const stage = getDunningStage(r);
      const existing = groups.get(stage) ?? [];
      existing.push(r);
      groups.set(stage, existing);
    }
    return [...groups.entries()].sort(([a], [b]) => getStageOrder(a) - getStageOrder(b));
  }, [filtered]);

  // ── CSV export ───────────────────────────────────────────────────────────

  const exportCSV = () => {
    if (!records || records.length === 0) return;
    const headers = ['User', 'Amount', 'Invoice ID', 'Emails Sent', 'Status', 'Created'];
    const rows = records.map((r) => [
      r.full_name || '',
      `£${(r.amount_due / 100).toFixed(2)}`,
      r.stripe_invoice_id || '',
      String(r.emails_sent),
      r.resolved ? 'Recovered' : `Email ${r.emails_sent}/3`,
      r.created_at ? format(new Date(r.created_at), 'yyyy-MM-dd HH:mm') : '',
    ]);

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-failed-payments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Stat card tap handler ────────────────────────────────────────────────

  const toggleFilter = (filter: StatusFilter) => {
    haptic.selection();
    setStatusFilter((prev) => (prev === filter ? null : filter));
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Failed Payments</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 touch-manipulation"
              onClick={exportCSV}
              title="Export CSV"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 touch-manipulation"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards — clickable to filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Active */}
          <Card
            className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-all ${
              statusFilter === 'active' ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => toggleFilter('active')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-white">{stats.active}</p>
                  <p className="text-xs text-white">Active</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>

          {/* Emails Sent */}
          <Card
            className={`bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-all ${
              statusFilter === 'emailed' ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => toggleFilter('emailed')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-white">{stats.emailed}</p>
                  <p className="text-xs text-white">Emails Sent</p>
                </div>
                <Mail className="h-6 w-6 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          {/* Final Notice */}
          <Card
            className={`bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-all ${
              statusFilter === 'final' ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => toggleFilter('final')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-white">{stats.final}</p>
                  <p className="text-xs text-white">Final Notice</p>
                </div>
                <MailWarning className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          {/* Recovered */}
          <Card
            className={`bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-all ${
              statusFilter === 'recovered' ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => toggleFilter('recovered')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-white">{stats.recovered}</p>
                  <p className="text-xs text-white">Recovered</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dunning Pipeline */}
        {(records?.length ?? 0) > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white">Dunning Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Email 1', count: pipeline.email1, colour: 'bg-amber-500' },
                { label: 'Email 2', count: pipeline.email2, colour: 'bg-orange-500' },
                { label: 'Email 3', count: pipeline.email3, colour: 'bg-red-500' },
                { label: 'Recovered', count: pipeline.recovered, colour: 'bg-green-500' },
              ].map((bar) => {
                const maxCount = Math.max(pipeline.email1, pipeline.recovered, 1);
                const width = Math.max((bar.count / maxCount) * 100, bar.count > 0 ? 8 : 0);
                return (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="text-xs text-white w-20 shrink-0">{bar.label}</span>
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.colour} rounded-full transition-all duration-500`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white w-8 text-right">{bar.count}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-white">
                  Recovery Rate: <strong>{recoveryRate}%</strong>
                </span>
                <span className="text-xs text-white">
                  Outstanding:{' '}
                  <strong>
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: 'GBP',
                    }).format(pipeline.totalOutstanding / 100)}
                  </strong>
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <AdminSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or invoice..."
        />

        {/* Records List */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-4 pb-4">
                  <div className="h-14 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-8 pb-8">
              <AdminEmptyState
                icon={CheckCircle}
                title="All clear!"
                description={
                  search || statusFilter
                    ? 'No records match your current filter.'
                    : 'When a subscription payment fails, records will appear here automatically.'
                }
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {grouped.map(([stage, items]) => (
              <Card key={stage}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-white">
                    {getStageIcon(stage)}
                    {stage}
                    <Badge className={`${getStageColour(stage)} text-xs ml-auto`}>
                      {items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map((record) => (
                    <div
                      key={record.id}
                      className="p-3 rounded-xl bg-muted/50 active:scale-[0.99] touch-manipulation cursor-pointer transition-transform flex items-center justify-between gap-3"
                      onClick={() => {
                        haptic.light();
                        setSelectedRecord(record);
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            record.resolved
                              ? 'bg-gradient-to-br from-green-500/20 to-green-600/20'
                              : 'bg-gradient-to-br from-red-500/20 to-red-600/20'
                          }`}
                        >
                          {record.resolved ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white truncate">
                            {record.full_name || 'Unknown'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-white">
                            <span>£{(record.amount_due / 100).toFixed(2)}</span>
                            <span>·</span>
                            <span>
                              {formatDistanceToNow(new Date(record.created_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          className={`text-xs font-mono ${
                            record.emails_sent === 3
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : record.emails_sent >= 1
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : 'bg-muted text-white'
                          }`}
                        >
                          {record.emails_sent}/3
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Detail Bottom Sheet ─────────────────────────────────────────── */}
        <Sheet open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedRecord?.resolved
                        ? 'bg-gradient-to-br from-green-500/20 to-green-600/20'
                        : 'bg-gradient-to-br from-red-500/20 to-red-600/20'
                    }`}
                  >
                    {selectedRecord?.resolved ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-left text-white">{selectedRecord?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-white">
                      £{selectedRecord ? (selectedRecord.amount_due / 100).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Email Timeline */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-white">
                      <Mail className="h-4 w-4 text-amber-400" />
                      Email Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1, 2, 3].map((num) => {
                      const sentAt = selectedRecord?.[
                        `email_${num}_sent_at` as keyof FailedPaymentRecord
                      ] as string | null;
                      const isSent = !!sentAt;
                      const isNext =
                        !isSent &&
                        !selectedRecord?.resolved &&
                        selectedRecord?.emails_sent === num - 1;

                      return (
                        <div key={num} className="flex items-center gap-3">
                          {/* Stepper dot */}
                          <div
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              isSent ? 'bg-green-400' : 'bg-muted-foreground/30'
                            }`}
                          />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <span className="text-sm text-white">
                                Email {num}
                                {num === 1
                                  ? ' — Payment Issue'
                                  : num === 2
                                    ? ' — Overdue'
                                    : ' — Final Notice'}
                              </span>
                              {isSent && (
                                <p className="text-xs text-white">
                                  {format(new Date(sentAt!), 'dd MMM yyyy HH:mm')}
                                </p>
                              )}
                              {!isSent && !isNext && <p className="text-xs text-white">Pending</p>}
                            </div>
                            {isNext && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs touch-manipulation border-amber-500/30 text-amber-400"
                                disabled={sendNextMutation.isPending}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  haptic.medium();
                                  sendNextMutation.mutate(selectedRecord!.id);
                                }}
                              >
                                {sendNextMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                ) : (
                                  <Send className="h-3 w-3 mr-1" />
                                )}
                                Send Now
                              </Button>
                            )}
                            {isSent && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                Sent
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Invoice Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-white">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      Invoice Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Invoice ID</span>
                      <span className="text-sm font-mono truncate max-w-[200px] text-white">
                        {selectedRecord?.stripe_invoice_id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Customer ID</span>
                      <span className="text-sm font-mono truncate max-w-[200px] text-white">
                        {selectedRecord?.stripe_customer_id || '—'}
                      </span>
                    </div>
                    {selectedRecord?.hosted_invoice_url && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Invoice Link</span>
                        <a
                          href={selectedRecord.hosted_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-400 touch-manipulation"
                        >
                          View <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Created</span>
                      <span className="text-sm text-white">
                        {selectedRecord?.created_at &&
                          format(new Date(selectedRecord.created_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Updated</span>
                      <span className="text-sm text-white">
                        {selectedRecord?.updated_at &&
                          format(new Date(selectedRecord.updated_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Resolution Card */}
                {selectedRecord?.resolved && (
                  <Card className="border-green-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-white">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Resolution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Recovered
                        </Badge>
                      </div>
                      {selectedRecord.resolved_at && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">Resolved At</span>
                          <span className="text-sm text-white">
                            {format(new Date(selectedRecord.resolved_at), 'dd MMM yyyy HH:mm')}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons (if not resolved) */}
                {selectedRecord && !selectedRecord.resolved && (
                  <div className="space-y-3 pt-2">
                    {selectedRecord.emails_sent < 3 && (
                      <Button
                        className="w-full h-12 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                        disabled={sendNextMutation.isPending}
                        onClick={() => {
                          haptic.medium();
                          sendNextMutation.mutate(selectedRecord.id);
                        }}
                      >
                        {sendNextMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Send Email {selectedRecord.emails_sent + 1}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full h-12 touch-manipulation border-green-500/30 text-green-400 hover:bg-green-500/10"
                      disabled={resolveMutation.isPending}
                      onClick={() => {
                        haptic.medium();
                        resolveMutation.mutate(selectedRecord.id);
                      }}
                    >
                      {resolveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
