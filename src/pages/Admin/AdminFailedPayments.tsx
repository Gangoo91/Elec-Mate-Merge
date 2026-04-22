import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  RefreshCw,
  Download,
  ExternalLink,
  Loader2,
  Send,
  MessageCircle,
  Ban,
  CheckCircle,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  Eyebrow,
} from '@/components/admin/editorial';

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
  personal_message_sent_at: string | null;
  personal_message_body: string | null;
}

interface FailedPaymentRecord extends FailedPaymentRow {
  full_name: string | null;
  username: string | null;
}

type TimeFilter = '24h' | '7d' | '30d' | 'all';

function getInitials(name: string | null | undefined): string {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || '?';
}

function getStageLabel(r: FailedPaymentRecord): string {
  if (r.resolved) return 'Recovered';
  if (r.emails_sent === 3) return 'Final Notice';
  if (r.emails_sent === 2) return 'Email 2 Sent';
  if (r.emails_sent === 1) return 'Email 1 Sent';
  return 'Pending';
}

function getStageTone(r: FailedPaymentRecord): 'yellow' | 'amber' | 'orange' | 'red' | 'emerald' {
  if (r.resolved) return 'emerald';
  if (r.emails_sent === 3) return 'red';
  if (r.emails_sent === 2) return 'orange';
  if (r.emails_sent === 1) return 'amber';
  return 'yellow';
}

function withinWindow(createdAt: string, filter: TimeFilter): boolean {
  if (filter === 'all') return true;
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const diffMs = now - created;
  if (filter === '24h') return diffMs <= 24 * 60 * 60 * 1000;
  if (filter === '7d') return diffMs <= 7 * 24 * 60 * 60 * 1000;
  if (filter === '30d') return diffMs <= 30 * 24 * 60 * 60 * 1000;
  return true;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function AdminFailedPayments() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<FailedPaymentRecord | null>(null);
  const [messageSheetOpen, setMessageSheetOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const openMessageSheet = (template: 'cancel_or_pay' | 'custom') => {
    if (!selectedRecord) return;
    haptic.medium();
    const firstName = (selectedRecord.full_name || 'there').split(' ')[0];
    if (template === 'cancel_or_pay') {
      setMessageSubject('A quick question about your Elec-Mate subscription');
      setMessageBody(
        `Hi ${firstName},\n\n` +
          `Andrew here from Elec-Mate — I noticed we've had a few failed payment attempts on your subscription. No hard feelings, just wanted to check in personally.\n\n` +
          `If you don't want your subscription anymore, just say the word and I'll initiate the cancellation straight away — no questions, no hassle.\n\n` +
          `If you do want to stay on, there's a link below to pay the invoice and you'll be sorted in 30 seconds.\n\n` +
          `Cheers,\nAndrew`
      );
    } else {
      setMessageSubject('');
      setMessageBody('');
    }
    setMessageSheetOpen(true);
  };

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
      if (data.record) setSelectedRecord(data.record);
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  const backfillMutation = useMutation({
    mutationFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/backfill-failed-payments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Backfill failed');
      }

      return res.json();
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Backfill complete: ${data.inserted} imported, ${data.skipped} skipped`);
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  const sendPersonalMessageMutation = useMutation({
    mutationFn: async ({
      recordId,
      subject,
      body,
    }: {
      recordId: string;
      subject: string;
      body: string;
    }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-send-personal-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ recordId, subject, body }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send personal message');
      }

      return res.json();
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Personal message sent to ${data.sentTo}`);
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
      if (data.record) setSelectedRecord(data.record);
      setMessageSheetOpen(false);
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  const cancelSubMutation = useMutation({
    mutationFn: async (recordId: string) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-cancel-failed-subscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ recordId }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to cancel subscription');
      }

      return res.json();
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Subscription cancelled (${data.stripeStatus})`);
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
      if (data.record) setSelectedRecord(data.record);
      setCancelConfirmOpen(false);
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

  const retryAllMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      let successCount = 0;
      let failCount = 0;

      for (const recordId of ids) {
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
        if (res.ok) successCount++;
        else failCount++;
      }

      return { successCount, failCount };
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Retried: ${data.successCount} sent, ${data.failCount} failed`);
      queryClient.invalidateQueries({ queryKey: ['admin-failed-payments'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast.error(err.message);
    },
  });

  const stats = useMemo(() => {
    const all = records ?? [];
    const unresolved = all.filter((r) => !r.resolved);
    return {
      failedToday: all.filter((r) => !r.resolved && isToday(r.created_at)).length,
      atRiskPence: unresolved.reduce((sum, r) => sum + (r.amount_due || 0), 0),
      retried: all.filter((r) => r.emails_sent >= 1).length,
      recovered: all.filter((r) => r.resolved).length,
      pending: unresolved.filter((r) => r.emails_sent === 0).length,
      email1: unresolved.filter((r) => r.emails_sent === 1).length,
      email2: unresolved.filter((r) => r.emails_sent === 2).length,
      finalNotice: unresolved.filter((r) => r.emails_sent === 3).length,
    };
  }, [records]);

  const filtered = useMemo(() => {
    let list = records ?? [];
    list = list.filter((r) => withinWindow(r.created_at, timeFilter));
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
  }, [records, timeFilter, search]);

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

  const refresh = () => {
    haptic.light();
    refetch();
  };

  const retryAllUnresolved = () => {
    const targets = filtered.filter((r) => !r.resolved && r.emails_sent < 3);
    if (targets.length === 0) {
      toast.info('Nothing to retry in the current view');
      return;
    }
    haptic.medium();
    retryAllMutation.mutate(targets.map((t) => t.id));
  };

  const atRiskAmount = (stats.atRiskPence / 100).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const timeTabs = [
    { value: '24h', label: 'Last 24h' },
    { value: '7d', label: 'Last 7d' },
    { value: '30d', label: 'Last 30d' },
    { value: 'all', label: 'All' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Billing"
          title="Failed Payments"
          description="Recover revenue lost to failed card charges."
          tone="red"
          actions={
            <>
              <IconButton
                onClick={exportCSV}
                aria-label="Export CSV"
              >
                <Download className="h-4 w-4" />
              </IconButton>
              <IconButton
                onClick={() => {
                  haptic.medium();
                  backfillMutation.mutate();
                }}
                disabled={backfillMutation.isPending}
                aria-label="Sync from Stripe"
              >
                {backfillMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </IconButton>
              <IconButton onClick={refresh} aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </IconButton>
            </>
          }
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                { label: 'Failed Today', value: stats.failedToday, tone: 'red' },
                { label: 'At Risk £', value: '£' + atRiskAmount, tone: 'orange' },
                { label: 'Retried', value: stats.retried, tone: 'blue' },
                { label: 'Recovered', value: stats.recovered, accent: true },
              ]}
            />

            <div className="space-y-4">
              <Eyebrow>Dunning Stage Breakdown</Eyebrow>
              <StatStrip
                columns={4}
                numbered
                stats={[
                  { label: 'Pending', value: stats.pending },
                  { label: 'Email 1 Sent', value: stats.email1 },
                  { label: 'Email 2 Sent', value: stats.email2 },
                  { label: 'Final Notice', value: stats.finalNotice },
                ]}
              />
            </div>

            <FilterBar
              tabs={timeTabs}
              activeTab={timeFilter}
              onTabChange={(v) => {
                haptic.selection();
                setTimeFilter(v as TimeFilter);
              }}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by name or invoice..."
              actions={
                <button
                  onClick={retryAllUnresolved}
                  disabled={retryAllMutation.isPending}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-50 touch-manipulation"
                >
                  {retryAllMutation.isPending ? 'Retrying...' : 'Retry All'}
                </button>
              }
            />

            {filtered.length === 0 ? (
              <EmptyState
                title="No failed payments"
                description="Every charge succeeded in the selected period."
                action={!search && timeFilter === 'all' ? 'Import from Stripe' : undefined}
                onAction={
                  !search && timeFilter === 'all'
                    ? () => {
                        haptic.medium();
                        backfillMutation.mutate();
                      }
                    : undefined
                }
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="red"
                  title="Failed Charges"
                  meta={<Pill tone="red">{filtered.length}</Pill>}
                />
                <ListBody>
                  {filtered.map((r) => {
                    const stage = getStageLabel(r);
                    const tone = getStageTone(r);
                    const timeAgo = formatDistanceToNow(new Date(r.created_at), {
                      addSuffix: true,
                    });
                    const amount = `£${(r.amount_due / 100).toFixed(2)}`;
                    const reason = `${r.emails_sent}/3 emails`;
                    const subtitleEmail = r.username || r.stripe_invoice_id || '—';

                    return (
                      <ListRow
                        key={r.id}
                        lead={<Avatar initials={getInitials(r.full_name)} />}
                        title={r.full_name || 'Unknown'}
                        subtitle={`${subtitleEmail} · ${amount} · ${reason}`}
                        trailing={
                          <>
                            <Pill tone={tone}>{stage}</Pill>
                            <span className="text-[11px] text-white tabular-nums">{timeAgo}</span>
                          </>
                        }
                        onClick={() => {
                          haptic.light();
                          setSelectedRecord(r);
                        }}
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        <Sheet open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3">
                  <Avatar initials={getInitials(selectedRecord?.full_name)} />
                  <div className="min-w-0">
                    <p className="text-left text-white text-base font-semibold truncate">
                      {selectedRecord?.full_name || 'Unknown'}
                    </p>
                    <p className="text-[12px] font-normal text-white tabular-nums">
                      £{selectedRecord ? (selectedRecord.amount_due / 100).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <ListCard>
                  <ListCardHeader title="Email Timeline" tone="amber" />
                  <ListBody>
                    {[1, 2, 3].map((num) => {
                      const sentAt = selectedRecord?.[
                        `email_${num}_sent_at` as keyof FailedPaymentRecord
                      ] as string | null;
                      const isSent = !!sentAt;
                      const isNext =
                        !isSent &&
                        !selectedRecord?.resolved &&
                        selectedRecord?.emails_sent === num - 1;
                      const titleText =
                        num === 1
                          ? `Email ${num} — Payment Issue`
                          : num === 2
                            ? `Email ${num} — Overdue`
                            : `Email ${num} — Final Notice`;
                      const subtitle = isSent
                        ? format(new Date(sentAt!), 'dd MMM yyyy HH:mm')
                        : isNext
                          ? 'Ready to send'
                          : 'Pending';

                      return (
                        <ListRow
                          key={num}
                          title={titleText}
                          subtitle={subtitle}
                          trailing={
                            isSent ? (
                              <Pill tone="emerald">Sent</Pill>
                            ) : isNext ? (
                              <button
                                disabled={sendNextMutation.isPending}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  haptic.medium();
                                  sendNextMutation.mutate(selectedRecord!.id);
                                }}
                                className="h-9 px-3 rounded-full bg-elec-yellow text-black text-[12px] font-semibold flex items-center gap-1.5 disabled:opacity-50 touch-manipulation"
                              >
                                {sendNextMutation.isPending ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Send className="h-3.5 w-3.5" />
                                )}
                                Send
                              </button>
                            ) : (
                              <Pill tone="yellow">Pending</Pill>
                            )
                          }
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader title="Invoice Details" tone="red" />
                  <ListBody>
                    <ListRow
                      title="Invoice ID"
                      trailing={
                        <span className="text-[12px] font-mono text-white truncate max-w-[180px]">
                          {selectedRecord?.stripe_invoice_id}
                        </span>
                      }
                    />
                    <ListRow
                      title="Customer ID"
                      trailing={
                        <span className="text-[12px] font-mono text-white truncate max-w-[180px]">
                          {selectedRecord?.stripe_customer_id || '—'}
                        </span>
                      }
                    />
                    {selectedRecord?.hosted_invoice_url && (
                      <ListRow
                        title="Invoice Link"
                        trailing={
                          <a
                            href={selectedRecord.hosted_invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[12px] text-elec-yellow touch-manipulation"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        }
                      />
                    )}
                    <ListRow
                      title="Created"
                      trailing={
                        <span className="text-[12px] text-white tabular-nums">
                          {selectedRecord?.created_at &&
                            format(new Date(selectedRecord.created_at), 'dd MMM yyyy HH:mm')}
                        </span>
                      }
                    />
                    <ListRow
                      title="Updated"
                      trailing={
                        <span className="text-[12px] text-white tabular-nums">
                          {selectedRecord?.updated_at &&
                            format(new Date(selectedRecord.updated_at), 'dd MMM yyyy HH:mm')}
                        </span>
                      }
                    />
                  </ListBody>
                </ListCard>

                {selectedRecord?.resolved && (
                  <ListCard>
                    <ListCardHeader title="Resolution" tone="emerald" />
                    <ListBody>
                      <ListRow title="Status" trailing={<Pill tone="emerald">Recovered</Pill>} />
                      {selectedRecord.resolved_at && (
                        <ListRow
                          title="Resolved At"
                          trailing={
                            <span className="text-[12px] text-white tabular-nums">
                              {format(new Date(selectedRecord.resolved_at), 'dd MMM yyyy HH:mm')}
                            </span>
                          }
                        />
                      )}
                    </ListBody>
                  </ListCard>
                )}

                {selectedRecord && !selectedRecord.resolved && selectedRecord.emails_sent === 3 && (
                  <ListCard>
                    <ListCardHeader title="Final Stage — Decision Time" tone="red" />
                    <div className="p-5 space-y-4">
                      <p className="text-[12.5px] text-white leading-relaxed">
                        All three automated emails have gone out. Send a personal note asking them
                        to either pay or cancel — or pull the plug yourself.
                      </p>

                      {selectedRecord.personal_message_sent_at && (
                        <div className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] px-4 py-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <p className="text-[12px] text-white">
                            Personal message sent{' '}
                            {formatDistanceToNow(
                              new Date(selectedRecord.personal_message_sent_at),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                      )}

                      <Divider />

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => openMessageSheet('cancel_or_pay')}
                          className="h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold flex items-center justify-center gap-2 touch-manipulation"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Personal Msg
                        </button>
                        <button
                          disabled={!selectedRecord.stripe_subscription_id}
                          onClick={() => {
                            haptic.medium();
                            setCancelConfirmOpen(true);
                          }}
                          className="h-12 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
                        >
                          <Ban className="h-4 w-4" />
                          Cancel Sub
                        </button>
                      </div>
                    </div>
                  </ListCard>
                )}

                {selectedRecord && !selectedRecord.resolved && (
                  <div className="space-y-3 pt-1">
                    {selectedRecord.emails_sent < 3 && (
                      <button
                        disabled={sendNextMutation.isPending}
                        onClick={() => {
                          haptic.medium();
                          sendNextMutation.mutate(selectedRecord.id);
                        }}
                        className="w-full h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
                      >
                        {sendNextMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Send Email {selectedRecord.emails_sent + 1}
                      </button>
                    )}
                    <button
                      disabled={resolveMutation.isPending}
                      onClick={() => {
                        haptic.medium();
                        resolveMutation.mutate(selectedRecord.id);
                      }}
                      className="w-full h-12 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
                    >
                      {resolveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={messageSheetOpen} onOpenChange={setMessageSheetOpen}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3">
                  <Avatar initials={getInitials(selectedRecord?.full_name) || 'M'} />
                  <div className="min-w-0">
                    <p className="text-left text-white text-base font-semibold">
                      Send Personal Message
                    </p>
                    <p className="text-[12px] font-normal text-white truncate">
                      founder@elec-mate.com → {selectedRecord?.full_name || 'user'}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openMessageSheet('cancel_or_pay')}
                    className="h-11 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold touch-manipulation"
                  >
                    Cancel or Pay?
                  </button>
                  <button
                    type="button"
                    onClick={() => openMessageSheet('custom')}
                    className="h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12.5px] font-semibold touch-manipulation"
                  >
                    Custom
                  </button>
                </div>

                <div>
                  <Eyebrow>Subject</Eyebrow>
                  <Input
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    placeholder="A quick question about your subscription"
                    className="mt-2 h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-elec-yellow/30"
                  />
                </div>

                <div>
                  <Eyebrow>Message</Eyebrow>
                  <Textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Type your personal message..."
                    className="mt-2 touch-manipulation text-base min-h-[260px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-elec-yellow/30"
                  />
                  <p className="mt-2 text-[11px] text-white leading-relaxed">
                    Invoice pay button will be added automatically below the message. Replies go
                    straight to founder@elec-mate.com.
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-white/[0.06] space-y-2">
                <button
                  disabled={
                    sendPersonalMessageMutation.isPending ||
                    !messageSubject.trim() ||
                    !messageBody.trim()
                  }
                  onClick={() => {
                    if (!selectedRecord) return;
                    sendPersonalMessageMutation.mutate({
                      recordId: selectedRecord.id,
                      subject: messageSubject.trim(),
                      body: messageBody.trim(),
                    });
                  }}
                  className="w-full h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
                >
                  {sendPersonalMessageMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send Message
                </button>
                <button
                  onClick={() => setMessageSheetOpen(false)}
                  className="w-full h-11 rounded-full text-white text-[12.5px] font-medium touch-manipulation"
                >
                  Cancel
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
          <SheetContent side="bottom" className="rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div className="px-6 pt-4 pb-6 space-y-5">
                <div className="text-center space-y-2">
                  <Eyebrow>Confirm</Eyebrow>
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    Cancel {selectedRecord?.full_name || 'user'}'s subscription?
                  </h3>
                  <p className="text-[13px] text-white leading-relaxed max-w-sm mx-auto">
                    This cancels immediately in Stripe and clears their subscribed flag. It can't
                    be undone from here — they'd need to re-subscribe.
                  </p>
                </div>
                <Divider />
                <div className="space-y-2">
                  <button
                    disabled={cancelSubMutation.isPending}
                    onClick={() => {
                      if (!selectedRecord) return;
                      cancelSubMutation.mutate(selectedRecord.id);
                    }}
                    className="w-full h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
                  >
                    {cancelSubMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Ban className="h-4 w-4" />
                    )}
                    Yes, cancel their subscription
                  </button>
                  <button
                    onClick={() => setCancelConfirmOpen(false)}
                    className="w-full h-11 rounded-full text-white text-[12.5px] font-medium touch-manipulation"
                  >
                    Keep it active
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
