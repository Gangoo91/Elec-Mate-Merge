import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPagination from '@/components/admin/AdminPagination';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  LoadingBlocks,
  EmptyState,
  IconButton,
  Divider,
  type Tone,
} from '@/components/admin/editorial';

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

const statusTone = (status: string): Tone => {
  switch (status) {
    case 'sent':
    case 'delivered':
      return 'emerald';
    case 'failed':
      return 'red';
    case 'bounced':
      return 'red';
    case 'pending':
      return 'amber';
    default:
      return 'blue';
  }
};

export default function AdminEmailLogs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

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

  const { data: stats } = useQuery({
    queryKey: ['admin-email-stats'],
    queryFn: async () => {
      const [sentRes, deliveredRes, failedRes, bouncedRes, pendingRes, totalRes] =
        await Promise.all([
          supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'sent'),
          supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'delivered'),
          supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'failed'),
          supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'bounced'),
          supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending'),
          supabase.from('email_logs').select('*', { count: 'exact', head: true }),
        ]);
      return {
        sent: sentRes.count || 0,
        delivered: deliveredRes.count || 0,
        failed: failedRes.count || 0,
        bounced: bouncedRes.count || 0,
        pending: pendingRes.count || 0,
        total: totalRes.count || 0,
        deliveryRate: totalRes.count
          ? (((sentRes.count || 0) + (deliveredRes.count || 0)) / totalRes.count) * 100
          : 0,
      };
    },
  });

  const totalPages = Math.ceil((emails?.length || 0) / itemsPerPage);
  const paginatedEmails = useMemo(() => {
    if (!emails) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return emails.slice(start, start + itemsPerPage);
  }, [emails, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const filterTabs = [
    { value: 'all', label: 'All', count: stats?.total },
    { value: 'sent', label: 'Sent', count: stats?.sent },
    { value: 'delivered', label: 'Delivered', count: stats?.delivered },
    { value: 'pending', label: 'Pending', count: stats?.pending },
    { value: 'failed', label: 'Failed', count: stats?.failed },
    { value: 'bounced', label: 'Bounced', count: stats?.bounced },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Emails"
          description="Transactional email log and deliverability health."
          tone="blue"
          actions={
            <IconButton
              onClick={() => refetch()}
              aria-label="Refresh email logs"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={5}
          stats={[
            { label: 'Sent', value: (stats?.sent || 0).toLocaleString() },
            {
              label: 'Delivered',
              value: (stats?.delivered || 0).toLocaleString(),
              tone: 'emerald',
            },
            {
              label: 'Pending',
              value: (stats?.pending || 0).toLocaleString(),
              tone: 'amber',
              sub: `${(stats?.deliveryRate || 0).toFixed(0)}% delivery rate`,
            },
            {
              label: 'Failed',
              value: (stats?.failed || 0).toLocaleString(),
              tone: 'red',
            },
            {
              label: 'Bounced',
              value: (stats?.bounced || 0).toLocaleString(),
              tone: 'red',
            },
          ]}
        />

        <FilterBar
          tabs={filterTabs}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search recipient, subject, template…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : !emails || emails.length === 0 ? (
          <EmptyState
            title="No emails logged"
            description="Transactional email activity will appear here as it flows through Resend."
          />
        ) : (
          <>
            <ListCard>
              <ListCardHeader
                tone="blue"
                title="Log"
                meta={<Pill tone="blue">{emails.length}</Pill>}
              />
              <ListBody>
                {paginatedEmails.map((email) => (
                  <ListRow
                    key={email.id}
                    title={email.subject}
                    subtitle={`${email.to_email} · ${formatDistanceToNow(
                      new Date(email.created_at),
                      { addSuffix: true }
                    )}`}
                    trailing={
                      <Pill tone={statusTone(email.status)}>{email.status}</Pill>
                    }
                    onClick={() => setSelectedEmail(email)}
                  />
                ))}
              </ListBody>
            </ListCard>

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
              />
            )}
          </>
        )}

        <Sheet open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  {selectedEmail && (
                    <Pill tone={statusTone(selectedEmail.status)}>
                      {selectedEmail.status}
                    </Pill>
                  )}
                </div>
                <SheetTitle className="text-left text-white text-xl sm:text-2xl font-semibold tracking-tight mt-2">
                  {selectedEmail?.subject}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <ListCard>
                  <ListCardHeader tone="blue" title="Email details" />
                  <ListBody>
                    <ListRow
                      title="To"
                      trailing={
                        <span className="text-[13px] text-white">
                          {selectedEmail?.to_email}
                        </span>
                      }
                    />
                    {selectedEmail?.from_email && (
                      <ListRow
                        title="From"
                        trailing={
                          <span className="text-[13px] text-white">
                            {selectedEmail.from_email}
                          </span>
                        }
                      />
                    )}
                    <ListRow
                      title="Status"
                      trailing={
                        selectedEmail && (
                          <Pill tone={statusTone(selectedEmail.status)}>
                            {selectedEmail.status}
                          </Pill>
                        )
                      }
                    />
                    {selectedEmail?.template_name && (
                      <ListRow
                        title="Template"
                        trailing={<Pill tone="purple">{selectedEmail.template_name}</Pill>}
                      />
                    )}
                    {selectedEmail?.provider && (
                      <ListRow
                        title="Provider"
                        trailing={
                          <span className="text-[13px] text-white">
                            {selectedEmail.provider}
                          </span>
                        }
                      />
                    )}
                    <ListRow
                      title="Created"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {selectedEmail?.created_at &&
                            format(
                              new Date(selectedEmail.created_at),
                              'dd MMM yyyy HH:mm'
                            )}
                        </span>
                      }
                    />
                    {selectedEmail?.sent_at && (
                      <ListRow
                        title="Sent"
                        trailing={
                          <span className="text-[13px] text-white tabular-nums">
                            {format(new Date(selectedEmail.sent_at), 'dd MMM yyyy HH:mm')}
                          </span>
                        }
                      />
                    )}
                  </ListBody>
                </ListCard>

                {selectedEmail?.error_message && (
                  <ListCard>
                    <ListCardHeader
                      tone="red"
                      title="Error"
                      meta={<AlertCircle className="h-4 w-4 text-white" />}
                    />
                    <div className="p-5">
                      <p className="text-[13px] text-white leading-relaxed">
                        {selectedEmail.error_message}
                      </p>
                    </div>
                  </ListCard>
                )}

                {selectedEmail?.provider_message_id && (
                  <ListCard>
                    <ListCardHeader tone="cyan" title="Provider info" />
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                        Message ID
                      </div>
                      <p className="mt-2 text-[12px] font-mono text-white break-all">
                        {selectedEmail.provider_message_id}
                      </p>
                    </div>
                  </ListCard>
                )}

                {selectedEmail?.metadata &&
                  Object.keys(selectedEmail.metadata).length > 0 && (
                    <ListCard>
                      <ListCardHeader tone="indigo" title="Metadata" />
                      <div className="p-5">
                        <Divider />
                        <pre className="mt-4 text-[11.5px] text-white bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl overflow-x-auto leading-relaxed">
                          {JSON.stringify(selectedEmail.metadata, null, 2)}
                        </pre>
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
