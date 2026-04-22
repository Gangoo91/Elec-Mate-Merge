import { useState, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import AdminPagination from '@/components/admin/AdminPagination';
import { RefreshCw } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  PageFrame,
  PageHero,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';

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

const getActionType = (action: string): string => {
  if (action.includes('create')) return 'create';
  if (action.includes('update')) return 'update';
  if (action.includes('delete')) return 'delete';
  if (action.includes('login') || action.includes('auth')) return 'login';
  if (action.includes('view') || action.includes('read')) return 'view';
  return action.split('_')[0] || 'action';
};

const actionTone = (type: string): Tone => {
  switch (type) {
    case 'create':
      return 'emerald';
    case 'update':
      return 'blue';
    case 'delete':
      return 'red';
    case 'login':
      return 'yellow';
    case 'view':
      return 'cyan';
    default:
      return 'indigo';
  }
};

const getInitials = (name: string): string => {
  if (!name) return 'SY';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const humaniseAction = (action: string): string =>
  action.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function AdminAuditLogs() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

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

  const totalPages = Math.ceil((logs?.length || 0) / itemsPerPage);
  const paginatedLogs = useMemo(() => {
    if (!logs) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return logs.slice(start, start + itemsPerPage);
  }, [logs, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, actionFilter]);

  const filterTabs = [
    { value: 'all', label: 'All', count: logs?.length ?? undefined },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'login', label: 'Login' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ['admin-audit-logs'] });
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Audit Log"
          description="Every administrative action is recorded here."
          tone="indigo"
          actions={
            <IconButton
              onClick={() => refetch()}
              aria-label="Refresh audit log"
              disabled={isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <FilterBar
          tabs={filterTabs}
          activeTab={actionFilter}
          onTabChange={setActionFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search action, entity, admin…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : !logs || logs.length === 0 ? (
          <EmptyState
            title="No audit logs"
            description="Activity will be logged here when administrators perform actions."
          />
        ) : (
          <>
            <ListCard>
              <ListCardHeader
                tone="indigo"
                title="Events"
                meta={<Pill tone="indigo">{logs.length}</Pill>}
              />
              <ListBody>
                {paginatedLogs.map((log) => {
                  const type = getActionType(log.action);
                  const adminName = log.profiles?.full_name || 'System';
                  const verb = humaniseAction(log.action);
                  const relative = formatDistanceToNow(new Date(log.created_at), {
                    addSuffix: true,
                  });
                  return (
                    <ListRow
                      key={log.id}
                      lead={<Avatar initials={getInitials(adminName)} />}
                      title={
                        <>
                          <span className="font-semibold">{adminName}</span>{' '}
                          <span className="text-white">— {verb}</span>
                        </>
                      }
                      subtitle={`${log.entity_type} · ${relative}`}
                      trailing={<Pill tone={actionTone(type)}>{type}</Pill>}
                      onClick={() => setSelectedLog(log)}
                    />
                  );
                })}
              </ListBody>
            </ListCard>

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
              />
            )}
          </>
        )}

        <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-left">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    {selectedLog ? getActionType(selectedLog.action) : ''}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    {selectedLog ? humaniseAction(selectedLog.action) : ''}
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                <ListCard>
                  <ListCardHeader tone="indigo" title="Details" />
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Admin</span>
                      <span className="text-[13px] font-medium text-white">
                        {selectedLog?.profiles?.full_name || 'System'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Entity type</span>
                      <span className="text-[13px] font-mono text-white">
                        {selectedLog?.entity_type}
                      </span>
                    </div>
                    {selectedLog?.entity_id && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Entity ID</span>
                        <span className="text-[12px] font-mono text-white">
                          {selectedLog.entity_id.slice(0, 8)}…
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Timestamp</span>
                      <span className="text-[13px] text-white tabular-nums">
                        {selectedLog?.created_at &&
                          format(new Date(selectedLog.created_at), 'dd MMM yyyy HH:mm:ss')}
                      </span>
                    </div>
                    {selectedLog?.ip_address && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">IP address</span>
                        <span className="text-[13px] font-mono text-white">
                          {selectedLog.ip_address}
                        </span>
                      </div>
                    )}
                  </div>
                </ListCard>

                {selectedLog?.old_values && (
                  <ListCard>
                    <ListCardHeader tone="red" title="Old values" />
                    <div className="p-4">
                      <pre className="text-[11px] bg-white/[0.04] border border-white/[0.06] p-3 rounded-lg overflow-x-auto text-white leading-relaxed">
                        {JSON.stringify(selectedLog.old_values, null, 2)}
                      </pre>
                    </div>
                  </ListCard>
                )}

                {selectedLog?.new_values && (
                  <ListCard>
                    <ListCardHeader tone="emerald" title="New values" />
                    <div className="p-4">
                      <pre className="text-[11px] bg-white/[0.04] border border-white/[0.06] p-3 rounded-lg overflow-x-auto text-white leading-relaxed">
                        {JSON.stringify(selectedLog.new_values, null, 2)}
                      </pre>
                    </div>
                  </ListCard>
                )}

                {selectedLog?.user_agent && (
                  <ListCard>
                    <ListCardHeader tone="cyan" title="User agent" />
                    <div className="p-4">
                      <p className="text-[12px] text-white break-all leading-relaxed">
                        {selectedLog.user_agent}
                      </p>
                    </div>
                  </ListCard>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
