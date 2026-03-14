import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Ticket, User, Send, RefreshCw, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

const STATUS_BORDER_COLORS: Record<string, string> = {
  open: 'border-l-4 border-l-blue-500',
  in_progress: 'border-l-4 border-l-amber-500',
  waiting: 'border-l-4 border-l-yellow-500',
  resolved: 'border-l-4 border-l-green-500',
  closed: 'border-l-4 border-l-gray-500',
};

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

export default function AdminSupport() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Fetch tickets
  const {
    data: tickets,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-support-tickets', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('support_tickets')
        .select(`*, profiles:user_id (full_name, username)`)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as SupportTicket[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.subject.toLowerCase().includes(s) || t.profiles?.full_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Fetch responses for selected ticket
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

  // Update ticket status
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
  });

  // Reply to ticket
  const replyMutation = useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: string; message: string }) => {
      const { error } = await supabase.from('support_ticket_responses').insert({
        ticket_id: ticketId,
        user_id: profile?.id,
        message,
        is_admin_response: true,
      });
      if (error) throw error;

      // Update ticket status to in_progress if it was open
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
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: 'bg-blue-500/20 text-blue-400',
      in_progress: 'bg-amber-500/20 text-amber-400',
      waiting: 'bg-yellow-500/20 text-yellow-400',
      resolved: 'bg-green-500/20 text-green-400',
      closed: 'bg-gray-500/20 text-gray-400',
    };
    return <Badge className={styles[status] || ''}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: 'bg-gray-500/20 text-gray-400',
      medium: 'bg-blue-500/20 text-blue-400',
      high: 'bg-orange-500/20 text-orange-400',
      urgent: 'bg-red-500/20 text-red-400',
    };
    return (
      <Badge className={styles[priority] || ''} variant="outline">
        {priority}
      </Badge>
    );
  };

  const stats = {
    open: tickets?.filter((t) => t.status === 'open').length || 0,
    inProgress: tickets?.filter((t) => t.status === 'in_progress').length || 0,
    resolved: tickets?.filter((t) => t.status === 'resolved').length || 0,
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Stats */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-2"
          >
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Ticket className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-blue-400">
                <AnimatedCounter value={stats.open} />
              </p>
              <p className="text-xs text-white">Open</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <RefreshCw className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-amber-400">
                <AnimatedCounter value={stats.inProgress} />
              </p>
              <p className="text-xs text-white">In Progress</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-green-400">
                <AnimatedCounter value={stats.resolved} />
              </p>
              <p className="text-xs text-white">Resolved</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Filters */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <div className="glass-premium rounded-2xl overflow-hidden p-4">
            <div className="flex gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search tickets..."
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
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
        </motion.section>

        {/* Tickets List */}
        {isLoading ? (
          <div className="glass-premium rounded-2xl overflow-hidden p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/[0.06] animate-pulse rounded-lg" />
            ))}
          </div>
        ) : tickets?.length === 0 ? (
          <div className="glass-premium rounded-2xl overflow-hidden p-6">
            <AdminEmptyState
              icon={Ticket}
              title="No support tickets"
              description="Tickets will appear here when users submit them."
            />
          </div>
        ) : (
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
            <div className="glass-premium rounded-2xl overflow-hidden">
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {tickets?.map((ticket, i) => (
                  <motion.button
                    key={ticket.id}
                    variants={listItemVariants}
                    className={`w-full text-left p-4 touch-manipulation active:scale-[0.99] active:bg-white/5 transition-all cursor-pointer ${
                      STATUS_BORDER_COLORS[ticket.status] || ''
                    } ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate !text-white">
                            {ticket.subject}
                          </p>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="text-xs !text-white line-clamp-1">{ticket.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs !text-white">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {ticket.profiles?.full_name || 'Unknown'}
                          </span>
                          <span>
                            {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 !text-white shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Ticket Detail Sheet */}
        <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-white/[0.06]">
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-left">{selectedTicket?.subject}</SheetTitle>
                    <p className="text-sm !text-white mt-1">
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
                    <SelectTrigger className="w-[130px] h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Original description */}
                <div className="glass-premium rounded-2xl overflow-hidden p-4">
                  <p className="text-xs !text-white mb-2">
                    {selectedTicket?.created_at &&
                      format(new Date(selectedTicket.created_at), 'dd MMM yyyy HH:mm')}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{selectedTicket?.description}</p>
                </div>

                {/* Responses */}
                {responses?.map((response) => (
                  <div
                    key={response.id}
                    className={`glass-premium rounded-2xl overflow-hidden p-4 ${
                      response.is_admin_response ? 'bg-blue-500/[0.05]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs font-medium !text-white">
                        {response.profiles?.full_name || 'Unknown'}
                        {response.is_admin_response && (
                          <Badge className="ml-2 bg-blue-500/20 text-blue-400 text-xs">Admin</Badge>
                        )}
                      </p>
                      <span className="text-xs !text-white">
                        {formatDistanceToNow(new Date(response.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{response.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <SheetFooter className="p-4 border-t border-white/[0.06]">
                <div className="flex gap-2 w-full">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 min-h-[44px] max-h-[120px] touch-manipulation bg-white/[0.04] border-white/[0.08] focus:border-yellow-500"
                  />
                  <Button
                    size="icon"
                    className="h-11 w-11 touch-manipulation shrink-0"
                    onClick={() =>
                      selectedTicket &&
                      replyMutation.mutate({ ticketId: selectedTicket.id, message: replyMessage })
                    }
                    disabled={!replyMessage.trim() || replyMutation.isPending}
                  >
                    {replyMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
