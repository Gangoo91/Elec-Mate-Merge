import { useState, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminPagination from '@/components/admin/AdminPagination';
import {
  History,
  ChevronRight,
  RefreshCw,
  Shield,
  Settings,
  Trash2,
  Edit,
  Plus,
  Eye,
  ScrollText,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

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

// Static action badge styles - extracted to module scope for performance
const ACTION_BADGE_STYLES: Record<string, string> = {
  create: 'bg-green-500/20 text-green-400',
  update: 'bg-blue-500/20 text-blue-400',
  delete: 'bg-red-500/20 text-red-400',
};

const getActionType = (action: string): string => {
  if (action.includes('create')) return 'create';
  if (action.includes('update')) return 'update';
  if (action.includes('delete')) return 'delete';
  return action.split('_')[0];
};

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  profiles?: { full_name: string; username: string };
}

export default function AdminAuditLogs() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Fetch audit logs
  const {
    data: logs,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-audit-logs', search, actionFilter],
    queryFn: async () => {
      let query = supabase
        .from('admin_audit_logs')
        .select(`*, profiles:user_id (full_name, username)`)
        .order('created_at', { ascending: false })
        .limit(200);

      if (actionFilter !== 'all') {
        query = query.ilike('action', `%${actionFilter}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as AuditLog[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.action.toLowerCase().includes(s) ||
            l.entity_type.toLowerCase().includes(s) ||
            l.profiles?.full_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  const getActionIcon = (action: string) => {
    if (action.includes('create') || action.includes('insert'))
      return <Plus className="h-4 w-4 text-green-400" />;
    if (action.includes('update') || action.includes('edit'))
      return <Edit className="h-4 w-4 text-blue-400" />;
    if (action.includes('delete') || action.includes('remove'))
      return <Trash2 className="h-4 w-4 text-red-400" />;
    if (action.includes('view') || action.includes('read'))
      return <Eye className="h-4 w-4 !text-white" />;
    if (action.includes('login') || action.includes('auth'))
      return <Shield className="h-4 w-4 text-yellow-400" />;
    return <Settings className="h-4 w-4 text-amber-400" />;
  };

  const getActionBadge = (action: string) => {
    const actionType = getActionType(action);
    const style = ACTION_BADGE_STYLES[actionType];
    if (style) return <Badge className={style}>{actionType}</Badge>;
    return <Badge variant="outline">{actionType}</Badge>;
  };

  // Pagination
  const totalPages = Math.ceil((logs?.length || 0) / itemsPerPage);
  const paginatedLogs = useMemo(() => {
    if (!logs) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return logs.slice(start, start + itemsPerPage);
  }, [logs, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, actionFilter]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ['admin-audit-logs'] });
      }}
    >
      <div className="space-y-4 pb-20">
        <AdminPageHeader
          title="Audit Logs"
          subtitle={`${logs?.length || 0} recent actions`}
          icon={ScrollText}
          iconColor="text-white"
          iconBg="bg-white/10 border-white/20"
          accentColor="from-white/10 via-white/20 to-white/10"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {/* Filters */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <div className="glass-premium rounded-2xl overflow-hidden p-4">
            <div className="flex gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search logs..."
                className="flex-1"
              />
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.section>

        {/* Logs List */}
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
        ) : logs?.length === 0 ? (
          <div className="glass-premium rounded-2xl overflow-hidden p-6">
            <AdminEmptyState
              icon={History}
              title="No audit logs"
              description="Activity will be logged here when actions are performed."
            />
          </div>
        ) : (
          <>
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {paginatedLogs.map((log, i) => (
                    <motion.button
                      key={log.id}
                      variants={listItemVariants}
                      className={`w-full text-left p-3 touch-manipulation active:scale-[0.99] active:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-3 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                          {getActionIcon(log.action)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate !text-white">{log.action}</p>
                            {getActionBadge(log.action)}
                          </div>
                          <div className="flex items-center gap-2 text-xs !text-white mt-0.5">
                            <span>{log.profiles?.full_name || 'System'}</span>
                            <span>·</span>
                            <span>{log.entity_type}</span>
                            <span>·</span>
                            <span>
                              {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 !text-white shrink-0" />
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
                totalItems={logs?.length || 0}
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

        {/* Log Detail Sheet */}
        <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2">
                  {selectedLog && getActionIcon(selectedLog.action)}
                  {selectedLog?.action}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="glass-premium rounded-2xl overflow-hidden p-4 space-y-2">
                  <h4 className="text-sm font-semibold !text-white mb-2">Details</h4>
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">User</span>
                    <span className="text-sm">{selectedLog?.profiles?.full_name || 'System'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">Entity Type</span>
                    <span className="text-sm font-mono">{selectedLog?.entity_type}</span>
                  </div>
                  {selectedLog?.entity_id && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">Entity ID</span>
                      <span className="text-xs font-mono !text-white">
                        {selectedLog.entity_id.slice(0, 8)}...
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm !text-white">Time</span>
                    <span className="text-sm">
                      {selectedLog?.created_at &&
                        format(new Date(selectedLog.created_at), 'dd MMM yyyy HH:mm:ss')}
                    </span>
                  </div>
                  {selectedLog?.ip_address && (
                    <div className="flex justify-between">
                      <span className="text-sm !text-white">IP Address</span>
                      <span className="text-sm font-mono">{selectedLog.ip_address}</span>
                    </div>
                  )}
                </div>

                {selectedLog?.old_values && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4">
                    <h4 className="text-sm font-semibold text-red-400 mb-2">Old Values</h4>
                    <pre className="text-xs bg-white/[0.05] p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedLog.old_values, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog?.new_values && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">New Values</h4>
                    <pre className="text-xs bg-white/[0.05] p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedLog.new_values, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog?.user_agent && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4">
                    <h4 className="text-sm font-semibold !text-white mb-2">User Agent</h4>
                    <p className="text-xs !text-white break-all">{selectedLog.user_agent}</p>
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
