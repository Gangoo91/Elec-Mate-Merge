import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { RefreshCw, Send, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
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
  LoadingBlocks,
  EmptyState,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';

interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string; username: string };
}

interface TicketResponse {
  id: string;
  ticket_id: string;
  user_id: string;
  message: string;
  is_admin_response: boolean;
  created_at: string;
  profiles?: { full_name: string };
}

const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'waiting', label: 'Awaiting' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const QUICK_REPLIES = [
  { label: 'Looking into this', text: "Thanks for reaching out. We're looking into this and will get back to you shortly." },
  { label: 'Fixed', text: 'This has been resolved. Please let us know if you experience any further issues.' },
  { label: 'More details', text: 'Could you share a bit more detail so we can help? Screenshots or steps to reproduce would be useful.' },
] as const;

function getInitials(name?: string | null): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function priorityTone(priority: string): Tone {
  switch (priority) {
    case 'urgent':
      return 'red';
    case 'high':
      return 'orange';
    case 'medium':
      return 'blue';
    default:
      return 'amber';
  }
}

function statusTone(status: string): Tone {
  switch (status) {
    case 'open':
      return 'blue';
    case 'in_progress':
      return 'amber';
    case 'waiting':
      return 'red';
    case 'resolved':
      return 'emerald';
    case 'closed':
    default:
      return 'purple';
  }
}

function statusLabel(status: string): string {
  return status.replace('_', ' ');
}

function excerpt(text: string, max = 80): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

export default function AdminSupport() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const {
    data: tickets,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-support-tickets', search, activeTab],
    queryFn: async () => {
      let query = supabase
        .from('support_tickets')
        .select(`*, profiles:user_id (full_name, username)`)
        .order('created_at', { ascending: false });

      if (activeTab !== 'all') {
        query = query.eq('status', activeTab);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as SupportTicket[];

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.subject.toLowerCase().includes(s) ||
            t.profiles?.full_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  const { data: responses } = useQuery({
    queryKey: ['ticket-responses', selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return [];
      const { data, error } = await supabase
        .from('support_ticket_responses')
        .select(`*, profiles:user_id (full_name)`)
        .eq('ticket_id', selectedTicket.id)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as TicketResponse[];
    },
    enabled: !!selectedTicket,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-support-tickets'] });
      toast({ title: 'Status updated' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const replyMutation = useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: string; message: string }) => {
      const { error } = await supabase.from('support_ticket_responses').insert({
        ticket_id: ticketId,
        user_id: profile?.id,
        message,
        is_admin_response: true,
      });
      if (error) throw error;

      await supabase
        .from('support_tickets')
        .update({ status: 'in_progress', updated_at: new Date().toISOString() })
        .eq('id', ticketId)
        .eq('status', 'open');
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['ticket-responses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-support-tickets'] });
      setReplyMessage('');
      toast({ title: 'Reply sent' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const stats = useMemo(() => {
    const list = tickets ?? [];
    return {
      open: list.filter((t) => t.status === 'open').length,
      waiting: list.filter((t) => t.status === 'waiting').length,
      inProgress: list.filter((t) => t.status === 'in_progress').length,
      resolvedToday: list.filter((t) => t.status === 'resolved' && isToday(t.updated_at)).length,
    };
  }, [tickets]);

  const refresh = () => {
    haptic.light();
    refetch();
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Support"
          description="Customer support queue and ticket management."
          tone="yellow"
          actions={
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Open', value: stats.open, tone: 'orange' },
            { label: 'Awaiting Reply', value: stats.waiting, tone: 'red' },
            { label: 'In Progress', value: stats.inProgress, tone: 'blue' },
            { label: 'Resolved Today', value: stats.resolvedToday, tone: 'emerald' },
          ]}
        />

        <FilterBar
          tabs={FILTER_TABS}
          activeTab={activeTab}
          onTabChange={(v) => {
            haptic.light();
            setActiveTab(v);
          }}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search tickets…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : !tickets || tickets.length === 0 ? (
          <EmptyState
            title="No support tickets"
            description="Tickets will appear here when users submit them."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Tickets"
              meta={<Pill tone="yellow">{tickets.length}</Pill>}
            />
            <ListBody>
              {tickets.map((t) => {
                const age = formatDistanceToNow(new Date(t.created_at), { addSuffix: false });
                const name = t.profiles?.full_name || 'Unknown';
                return (
                  <ListRow
                    key={t.id}
                    lead={<Avatar initials={getInitials(name)} />}
                    title={t.subject}
                    subtitle={`${name} · ${excerpt(t.description)}`}
                    trailing={
                      <>
                        <Pill tone={priorityTone(t.priority)}>{t.priority}</Pill>
                        <Pill tone={statusTone(t.status)}>{statusLabel(t.status)}</Pill>
                        <span className="text-[11px] text-white tabular-nums">{age}</span>
                      </>
                    }
                    onClick={() => setSelectedTicket(t)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 text-left">
                    <SheetTitle className="text-left text-white text-[17px] font-semibold leading-tight">
                      {selectedTicket?.subject}
                    </SheetTitle>
                    <p className="text-[12px] text-white mt-1 truncate">
                      {selectedTicket?.profiles?.full_name} · {selectedTicket?.category}
                    </p>
                  </div>
                  <Select
                    value={selectedTicket?.status}
                    onValueChange={(v) =>
                      selectedTicket &&
                      updateStatusMutation.mutate({ id: selectedTicket.id, status: v })
                    }
                  >
                    <SelectTrigger className="w-[130px] h-11 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedTicket && (
                  <div className="mt-3 flex items-center gap-2">
                    <Pill tone={priorityTone(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Pill>
                    <Pill tone={statusTone(selectedTicket.status)}>
                      {statusLabel(selectedTicket.status)}
                    </Pill>
                    <span className="text-[11px] text-white tabular-nums">
                      {formatDistanceToNow(new Date(selectedTicket.created_at), { addSuffix: true })}
                    </span>
                  </div>
                )}
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar
                      initials={getInitials(selectedTicket?.profiles?.full_name)}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold text-white truncate">
                        {selectedTicket?.profiles?.full_name || 'Unknown'}
                      </p>
                      <p className="text-[11px] text-white">
                        {selectedTicket?.created_at &&
                          format(new Date(selectedTicket.created_at), 'dd MMM yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                    {selectedTicket?.description}
                  </p>
                </div>

                {responses?.map((response) => (
                  <div
                    key={response.id}
                    className={`rounded-2xl border p-4 ${
                      response.is_admin_response
                        ? 'bg-elec-yellow/[0.06] border-elec-yellow/20'
                        : 'bg-[hsl(0_0%_12%)] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar
                        initials={getInitials(response.profiles?.full_name)}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                        <p className="text-[12px] font-semibold text-white truncate">
                          {response.profiles?.full_name || 'Unknown'}
                        </p>
                        {response.is_admin_response && (
                          <Pill tone="yellow">Admin</Pill>
                        )}
                        <span className="text-[11px] text-white tabular-nums">
                          {formatDistanceToNow(new Date(response.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                      {response.message}
                    </p>
                  </div>
                ))}
              </div>

              <SheetFooter className="p-4 border-t border-white/[0.06] flex-col items-stretch gap-2">
                <div className="flex gap-2 flex-wrap">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => setReplyMessage(qr.text)}
                      className="h-8 px-3 rounded-full text-[11px] font-medium bg-[hsl(0_0%_12%)] text-white border border-white/[0.08] hover:bg-white/[0.06] touch-manipulation transition-colors"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 w-full">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply…"
                    className="flex-1 min-h-[44px] max-h-[120px] touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <button
                    onClick={() =>
                      selectedTicket &&
                      replyMutation.mutate({ ticketId: selectedTicket.id, message: replyMessage })
                    }
                    disabled={!replyMessage.trim() || replyMutation.isPending}
                    aria-label="Send reply"
                    className="h-11 w-11 rounded-full bg-elec-yellow text-black flex items-center justify-center hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation shrink-0 transition-colors"
                  >
                    {replyMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
