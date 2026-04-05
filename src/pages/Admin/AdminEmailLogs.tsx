import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPagination from '@/components/admin/AdminPagination';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Mail,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertCircle,
  Send,
  Inbox,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
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

// Static status styles - extracted to module scope for performance
const STATUS_BADGE_STYLES: Record<string, string> = {
  sent: 'bg-green-500/20 text-green-400',
  delivered: 'bg-green-500/20 text-green-400',
  failed: 'bg-red-500/20 text-red-400',
  bounced: 'bg-red-500/20 text-red-400',
  pending: 'bg-amber-500/20 text-amber-400',
};

const STATUS_ICON_COLORS: Record<string, string> = {
  sent: 'text-green-400',
  delivered: 'text-green-400',
  failed: 'text-red-400',
  bounced: 'text-red-400',
  pending: 'text-amber-400',
  default: 'text-gray-400',
};

const STATUS_BG_COLORS: Record<string, string> = {
  sent: 'bg-green-500/10',
  delivered: 'bg-green-500/10',
  failed: 'bg-red-500/10',
  bounced: 'bg-red-500/10',
  pending: 'bg-amber-500/10',
  default: 'bg-gray-500/10',
};

interface EmailLog {
  id: string;
  to_email: string;
  from_email: string | null;
  subject: string;
  template_name: string | null;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
  provider: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  sent_at: string | null;
  profiles?: { full_name: string; username: string };
}

export default function AdminEmailLogs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Fetch email logs
  const {
    data: emails,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-email-logs', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('email_logs')
        .select(`*`)
        .order('created_at', { ascending: false })
        .limit(200);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as EmailLog[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.to_email.toLowerCase().includes(s) ||
            e.subject.toLowerCase().includes(s) ||
            e.template_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Get email stats
  const { data: stats } = useQuery({
    queryKey: ['admin-email-stats'],
    queryFn: async () => {
      const [sentRes, failedRes, totalRes] = await Promise.all([
        supabase
          .from('email_logs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent'),
        supabase
          .from('email_logs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'failed'),
        supabase.from('email_logs').select('*', { count: 'exact', head: true }),
      ]);
      return {
        sent: sentRes.count || 0,
        failed: failedRes.count || 0,
        total: totalRes.count || 0,
        deliveryRate: totalRes.count ? ((sentRes.count || 0) / totalRes.count) * 100 : 0,
      };
    },
  });

  // Pagination
  const totalPages = Math.ceil((emails?.length || 0) / itemsPerPage);
  const paginatedEmails = useMemo(() => {
    if (!emails) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return emails.slice(start, start + itemsPerPage);
  }, [emails, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const getStatusIcon = (status: string) => {
    const colorClass = STATUS_ICON_COLORS[status] || STATUS_ICON_COLORS.default;
    switch (status) {
      case 'sent':
      case 'delivered':
        return <Check className={`h-4 w-4 ${colorClass}`} />;
      case 'failed':
      case 'bounced':
        return <X className={`h-4 w-4 ${colorClass}`} />;
      case 'pending':
        return <Clock className={`h-4 w-4 ${colorClass}`} />;
      default:
        return <Mail className={`h-4 w-4 ${colorClass}`} />;
    }
  };

  const getStatusBadge = (status: string) => (
    <Badge className={STATUS_BADGE_STYLES[status] || ''}>{status}</Badge>
  );

  const getStatusBgColor = (status: string) => STATUS_BG_COLORS[status] || STATUS_BG_COLORS.default;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        <AdminPageHeader
          title="Email Logs"
          subtitle={`${emails?.length || 0} emails tracked`}
          icon={Mail}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10 border-blue-500/20"
          accentColor="from-blue-500 via-blue-400 to-cyan-500"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {/* Stats */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Inbox className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-blue-400">
                <AnimatedCounter value={stats?.total || 0} />
              </p>
              <p className="text-xs text-white">Total</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Send className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-green-400">
                <AnimatedCounter value={stats?.sent || 0} />
              </p>
              <p className="text-xs text-white">Sent</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <AlertCircle className="h-5 w-5 text-red-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-red-400">
                <AnimatedCounter value={stats?.failed || 0} />
              </p>
              <p className="text-xs text-white">Failed</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Check className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-yellow-400">
                {(stats?.deliveryRate || 0).toFixed(0)}%
              </p>
              <p className="text-xs text-white">Rate</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Filters */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
          <div className="glass-premium rounded-2xl overflow-hidden p-4">
            <div className="flex gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search emails..."
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.section>

        {/* Email List */}
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : emails?.length === 0 ? (
          <div className="glass-premium rounded-2xl overflow-hidden p-6">
            <AdminEmptyState
              icon={Mail}
              title="No emails logged"
              description="Email activity will appear here."
            />
          </div>
        ) : (
          <>
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {paginatedEmails.map((email, i) => (
                    <motion.button
                      key={email.id}
                      variants={listItemVariants}
                      className={`w-full text-left p-3 touch-manipulation active:scale-[0.99] active:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-3 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getStatusBgColor(email.status)}`}
                        >
                          {getStatusIcon(email.status)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate !text-white">
                            {email.subject}
                          </p>
                          <div className="flex items-center gap-2 text-xs !text-white mt-0.5">
                            <span className="truncate">{email.to_email}</span>
                            <span>·</span>
                            <span>
                              {formatDistanceToNow(new Date(email.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getStatusBadge(email.status)}
                        <ChevronRight className="h-4 w-4 !text-white" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Pagination */}
            {totalPages > 1 && (
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={emails?.length || 0}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(val) => {
                  setItemsPerPage(val);
                  setCurrentPage(1);
                }}
                className="mt-4"
              />
            )}
          </>
        )}

        {/* Email Detail Sheet */}
        <Sheet open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2 text-left">
                  {selectedEmail && getStatusIcon(selectedEmail.status)}
                  <span className="truncate">{selectedEmail?.subject}</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="glass-premium rounded-2xl overflow-hidden p-4 space-y-2">
                  <h4 className="text-sm font-semibold !text-white mb-2">Email Details</h4>
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">To</span>
                    <span className="text-sm">{selectedEmail?.to_email}</span>
                  </div>
                  {selectedEmail?.from_email && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">From</span>
                      <span className="text-sm">{selectedEmail.from_email}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">Status</span>
                    {selectedEmail && getStatusBadge(selectedEmail.status)}
                  </div>
                  {selectedEmail?.template_name && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">Template</span>
                      <Badge variant="outline">{selectedEmail.template_name}</Badge>
                    </div>
                  )}
                  {selectedEmail?.provider && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">Provider</span>
                      <span className="text-sm">{selectedEmail.provider}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">Created</span>
                    <span className="text-sm">
                      {selectedEmail?.created_at &&
                        format(new Date(selectedEmail.created_at), 'dd MMM yyyy HH:mm')}
                    </span>
                  </div>
                  {selectedEmail?.sent_at && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">Sent</span>
                      <span className="text-sm">
                        {format(new Date(selectedEmail.sent_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                  )}
                </div>

                {selectedEmail?.error_message && (
                  <div className="glass-premium rounded-2xl overflow-hidden border-red-500/30 p-4">
                    <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      Error
                    </h4>
                    <p className="text-sm text-red-300">{selectedEmail.error_message}</p>
                  </div>
                )}

                {selectedEmail?.provider_message_id && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4">
                    <h4 className="text-sm font-semibold !text-white mb-2">Provider Info</h4>
                    <p className="text-xs font-mono !text-white break-all">
                      Message ID: {selectedEmail.provider_message_id}
                    </p>
                  </div>
                )}

                {selectedEmail?.metadata && Object.keys(selectedEmail.metadata).length > 0 && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4">
                    <h4 className="text-sm font-semibold !text-white mb-2">Metadata</h4>
                    <pre className="text-xs bg-white/[0.05] p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedEmail.metadata, null, 2)}
                    </pre>
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
