import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  AlertTriangle,
  Clock,
  MailWarning,
  CheckCircle,
  ChevronRight,
  RefreshCw,
  Download,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';

interface FailedPaymentRecord {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  stripe_customer_id: string | null;
  amount: number;
  currency: string;
  hosted_invoice_url: string | null;
  emails_sent: number;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  email_1_sent_at: string | null;
  email_2_sent_at: string | null;
  email_3_sent_at: string | null;
  profiles: {
    full_name: string;
    username: string;
  };
}

function getStatusBadge(record: FailedPaymentRecord) {
  if (record.resolved) {
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
        Recovered
      </Badge>
    );
  }
  if (record.emails_sent === 3) {
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
        Final Notice Sent
      </Badge>
    );
  }
  if (record.emails_sent === 2) {
    return (
      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
        Email 2 Sent
      </Badge>
    );
  }
  if (record.emails_sent === 1) {
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
        Email 1 Sent
      </Badge>
    );
  }
  return (
    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Pending</Badge>
  );
}

function getEmailProgressBadge(emailsSent: number) {
  const colours =
    emailsSent === 3
      ? 'bg-red-500/20 text-red-400 border-red-500/30'
      : emailsSent === 2
        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
        : emailsSent >= 1
          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          : 'bg-muted text-muted-foreground';

  return <Badge className={`${colours} text-xs font-mono`}>{emailsSent}/3</Badge>;
}

export default function AdminFailedPayments() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<FailedPaymentRecord | null>(null);

  // Fetch failed payment records with profile join
  const {
    data: records,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-failed-payments', statusFilter, search],
    queryFn: async () => {
      let query = supabase
        .from('failed_payment_emails')
        .select('*, profiles!inner(full_name, username)')
        .order('created_at', { ascending: false });

      if (statusFilter === 'active') {
        query = query.eq('resolved', false);
      } else if (statusFilter === 'recovered') {
        query = query.eq('resolved', true);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as unknown as FailedPaymentRecord[];
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.profiles?.full_name?.toLowerCase().includes(searchLower) ||
            r.profiles?.username?.toLowerCase().includes(searchLower) ||
            r.stripe_invoice_id?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // Compute stats from fetched data
  const stats = {
    active: records?.filter((r) => !r.resolved).length ?? 0,
    awaitingRetry: records?.filter((r) => r.emails_sent >= 1 && !r.resolved).length ?? 0,
    allEmailsSent: records?.filter((r) => r.emails_sent === 3 && !r.resolved).length ?? 0,
    recovered: records?.filter((r) => r.resolved).length ?? 0,
  };

  const exportCSV = () => {
    if (!records || records.length === 0) return;
    const headers = ['User', 'Amount', 'Invoice ID', 'Emails Sent', 'Status', 'Created'];
    const rows = records.map((r) => [
      r.profiles?.full_name || '',
      `£${(r.amount / 100).toFixed(2)}`,
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

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Failed Payments</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats.awaitingRetry}</p>
                  <p className="text-xs text-muted-foreground">Awaiting Retry</p>
                </div>
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats.allEmailsSent}</p>
                  <p className="text-xs text-muted-foreground">All Emails Sent</p>
                </div>
                <MailWarning className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats.recovered}</p>
                  <p className="text-xs text-muted-foreground">Recovered</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by name or invoice..."
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px] h-11 touch-manipulation">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="recovered">Recovered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payment Records List */}
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
        ) : records?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <AdminEmptyState
                icon={AlertTriangle}
                title="No failed payments"
                description="Failed payment records will appear here."
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {records?.map((record) => (
              <Card
                key={record.id}
                className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
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
                        <p className="font-medium truncate">
                          {record.profiles?.full_name || 'Unknown'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>£{(record.amount / 100).toFixed(2)}</span>
                          <span className="font-mono truncate max-w-[120px]">
                            {record.stripe_invoice_id}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {getEmailProgressBadge(record.emails_sent)}
                      {getStatusBadge(record)}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detail Bottom Sheet */}
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
                    <p className="text-left">{selectedRecord?.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      £{selectedRecord ? (selectedRecord.amount / 100).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Email Timeline */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-amber-400" />
                      Email Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1, 2, 3].map((num) => {
                      const sentAt = selectedRecord?.[
                        `email_${num}_sent_at` as keyof FailedPaymentRecord
                      ] as string | null;
                      return (
                        <div key={num} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Email {num}</span>
                          {sentAt ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              {format(new Date(sentAt), 'dd MMM yyyy HH:mm')}
                            </Badge>
                          ) : (
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Invoice Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      Invoice Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Invoice ID</span>
                      <span className="text-sm font-mono truncate max-w-[200px]">
                        {selectedRecord?.stripe_invoice_id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Customer ID</span>
                      <span className="text-sm font-mono truncate max-w-[200px]">
                        {selectedRecord?.stripe_customer_id || '—'}
                      </span>
                    </div>
                    {selectedRecord?.hosted_invoice_url && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Invoice Link</span>
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
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm">
                        {selectedRecord?.created_at &&
                          format(new Date(selectedRecord.created_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Updated</span>
                      <span className="text-sm">
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
                      <CardTitle className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Resolution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Recovered
                        </Badge>
                      </div>
                      {selectedRecord.resolved_at && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Resolved At</span>
                          <span className="text-sm">
                            {format(new Date(selectedRecord.resolved_at), 'dd MMM yyyy HH:mm')}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
