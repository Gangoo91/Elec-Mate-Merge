/**
 * AdminPeerSafety — moderation queue for Mental Health Mates peer support.
 *
 * Reports filed from the peer chat land here (previously they were written to
 * mental_health_peer_reports and nobody could read them). Data access is via
 * admin-gated SECURITY DEFINER RPCs — the reported conversation is readable
 * only through a filed report, as moderation context.
 */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { ShieldAlert, Loader2, CheckCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';

interface PeerReport {
  id: string;
  created_at: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'actioned';
  reason: string;
  additional_notes: string | null;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by_name: string | null;
  conversation_id: string | null;
  reporter_id: string;
  reporter_name: string | null;
  reported_user_id: string;
  reported_name: string | null;
  reported_is_supporter: boolean;
  supporter_is_active: boolean;
}

interface ReportMessage {
  id: string;
  sender_id: string;
  sender_is_reported: boolean;
  content: string;
  created_at: string;
}

const statusTone = (status: PeerReport['status']): Tone =>
  status === 'pending' ? 'red' : status === 'actioned' ? 'orange' : 'emerald';

const reasonLabel = (reason: string) =>
  reason.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

export default function AdminPeerSafety() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved' | 'all'>('pending');
  const [selected, setSelected] = useState<PeerReport | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-peer-reports'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_list_peer_reports' as never);
      if (error) throw error;
      return (data ?? []) as PeerReport[];
    },
    staleTime: 30 * 1000,
  });

  const { data: transcript, isLoading: transcriptLoading } = useQuery({
    queryKey: ['admin-peer-report-messages', selected?.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'admin_get_peer_report_messages' as never,
        { p_report_id: selected!.id } as never
      );
      if (error) throw error;
      return (data ?? []) as ReportMessage[];
    },
    enabled: !!selected?.id && !!selected?.conversation_id,
  });

  const resolveMutation = useMutation({
    mutationFn: async ({
      status,
      deactivate,
    }: {
      status: 'reviewed' | 'dismissed' | 'actioned';
      deactivate: boolean;
    }) => {
      const { error } = await supabase.rpc(
        'admin_resolve_peer_report' as never,
        {
          p_report_id: selected!.id,
          p_status: status,
          p_admin_notes: adminNotes.trim() || null,
          p_deactivate_supporter: deactivate,
        } as never
      );
      if (error) throw error;
    },
    onSuccess: (_, { status, deactivate }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-peer-reports'] });
      setSelected(null);
      setAdminNotes('');
      toast({
        title: deactivate ? 'Supporter deactivated' : `Report ${status}`,
        description: deactivate
          ? 'They can no longer appear as a Mental Health Mate.'
          : 'The report has been updated.',
      });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to update', description: error.message, variant: 'destructive' });
    },
  });

  const pending = reports?.filter((r) => r.status === 'pending') ?? [];
  const resolved = reports?.filter((r) => r.status !== 'pending') ?? [];
  const visible =
    activeTab === 'pending' ? pending : activeTab === 'resolved' ? resolved : (reports ?? []);

  const openReport = (report: PeerReport) => {
    setSelected(report);
    setAdminNotes(report.admin_notes ?? '');
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Admin · Mental health"
          title="Peer safety"
          description="Reports from Mental Health Mates chats. Review the context, close the loop with the reporter from Messages, and deactivate supporters who shouldn't be here."
          tone="red"
        />

        <StatStrip
          columns={3}
          stats={[
            {
              label: 'Pending',
              value: pending.length,
              sub: pending.length === 0 ? 'All clear' : 'Needs review',
            },
            { label: 'Resolved', value: resolved.length, sub: 'Reviewed or actioned' },
            { label: 'Total', value: reports?.length ?? 0, sub: 'All time' },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'pending', label: 'Pending', count: pending.length },
            { value: 'resolved', label: 'Resolved', count: resolved.length },
            { value: 'all', label: 'All', count: reports?.length ?? 0 },
          ]}
          activeTab={activeTab}
          onTabChange={(t) => setActiveTab(t as typeof activeTab)}
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : visible.length === 0 ? (
          <EmptyState
            title={activeTab === 'pending' ? 'No pending reports' : 'No reports here'}
            description={
              activeTab === 'pending'
                ? 'Nothing needs your attention right now.'
                : 'Reports will appear here as they come in.'
            }
          />
        ) : (
          <ListCard>
            {visible.map((r) => (
              <ListRow
                key={r.id}
                accent={statusTone(r.status)}
                title={`${r.reported_name ?? 'Unknown user'}${r.reported_is_supporter ? ' · supporter' : ''}`}
                subtitle={`${reasonLabel(r.reason)} — reported by ${r.reporter_name ?? 'unknown'} · ${format(
                  new Date(r.created_at),
                  'd MMM yyyy'
                )}`}
                trailing={<Pill tone={statusTone(r.status)}>{r.status}</Pill>}
                onClick={() => openReport(r)}
              />
            ))}
          </ListCard>
        )}

        {/* Detail sheet */}
        <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
            {selected && (
              <div className="flex flex-col h-full bg-background">
                <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/[0.06] text-left">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-400" />
                    <SheetTitle className="text-white text-[17px]">
                      {selected.reported_name ?? 'Unknown user'}
                    </SheetTitle>
                    <Pill tone={statusTone(selected.status)}>{selected.status}</Pill>
                    {selected.reported_is_supporter && (
                      <Pill tone={selected.supporter_is_active ? 'yellow' : 'red'}>
                        {selected.supporter_is_active ? 'Active supporter' : 'Deactivated'}
                      </Pill>
                    )}
                  </div>
                  <p className="text-[12.5px] text-white mt-1">
                    {reasonLabel(selected.reason)} — reported by{' '}
                    {selected.reporter_name ?? 'unknown'} on{' '}
                    {format(new Date(selected.created_at), 'd MMM yyyy, h:mm a')}
                  </p>
                  {selected.additional_notes && (
                    <p className="text-[13px] text-white mt-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5">
                      "{selected.additional_notes}"
                    </p>
                  )}
                </SheetHeader>

                {/* Conversation context */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5">
                  {!selected.conversation_id ? (
                    <p className="text-[13px] text-white text-center py-8">
                      No conversation attached to this report.
                    </p>
                  ) : transcriptLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  ) : !transcript || transcript.length === 0 ? (
                    <p className="text-[13px] text-white text-center py-8">
                      No messages in this conversation.
                    </p>
                  ) : (
                    <>
                      <p className="text-[10.5px] uppercase tracking-[0.16em] text-white font-semibold text-center pb-1">
                        Conversation — moderation access via this report only
                      </p>
                      {transcript.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            'flex',
                            m.sender_is_reported ? 'justify-start' : 'justify-end'
                          )}
                        >
                          <div
                            className={cn(
                              'max-w-[85%] rounded-2xl px-3.5 py-2.5 border',
                              m.sender_is_reported
                                ? 'bg-red-500/[0.08] border-red-500/25 text-white rounded-bl-md'
                                : 'bg-white/[0.04] border-white/[0.06] text-white rounded-br-md'
                            )}
                          >
                            <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                              {m.content}
                            </p>
                            <span className="block text-[10px] text-white mt-1 tabular-nums">
                              {m.sender_is_reported ? 'Reported user' : 'Reporter side'} ·{' '}
                              {format(new Date(m.created_at), 'd MMM, h:mm a')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t border-white/[0.06] p-4 space-y-3 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Admin notes (kept on the report)..."
                    className="touch-manipulation text-base min-h-[64px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 bg-white/[0.03] text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'dismissed', deactivate: false })
                      }
                      disabled={resolveMutation.isPending}
                      className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation active:scale-[0.98] disabled:opacity-40"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'reviewed', deactivate: false })
                      }
                      disabled={resolveMutation.isPending}
                      className="h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[13px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40 inline-flex items-center justify-center gap-1.5"
                    >
                      <CheckCheck className="h-4 w-4" /> Mark reviewed
                    </button>
                  </div>
                  {selected.reported_is_supporter && selected.supporter_is_active && (
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'actioned', deactivate: true })
                      }
                      disabled={resolveMutation.isPending}
                      className="w-full h-11 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-[13px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40 inline-flex items-center justify-center gap-1.5"
                    >
                      {resolveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <UserX className="h-4 w-4" />
                      )}
                      Deactivate supporter & close report
                    </button>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
