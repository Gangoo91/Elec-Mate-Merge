import { useState, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Send,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Loader2,
  Search,
  Mail,
  Eye,
  MousePointerClick,
  UserCheck,
  Target,
  Square,
  Clock,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';

interface UnconvertedLead {
  id: string;
  email: string;
  created_at: string;
  conversion_status: 'unsent' | 'sent' | 'opened' | 'clicked';
  conversion_email_sent_at: string | null;
  conversion_email_opened_at: string | null;
  conversion_email_clicked_at: string | null;
}

interface ConvertedLead {
  id: string;
  email: string;
  claimed_at: string | null;
  user: {
    full_name: string;
    role: string;
    signed_up_at: string;
  } | null;
}

interface ConversionData {
  unconverted: UnconvertedLead[];
  converted: ConvertedLead[];
  stats: {
    total_unconverted: number;
    unsent: number;
    sent: number;
    opened: number;
    clicked: number;
    total_converted: number;
    bounced: number;
  };
}

type SortField = 'conversion_status' | 'email' | 'created_at';

const STATUS_ORDER: Record<string, number> = {
  unsent: 0,
  sent: 1,
  opened: 2,
  clicked: 3,
};

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('conversion_status');
  const [sortAsc, setSortAsc] = useState(true);
  const [convertedOpen, setConvertedOpen] = useState(false);
  const [showSendSheet, setShowSendSheet] = useState(false);
  const [sendProgress, setSendProgress] = useState<{
    totalSent: number;
    remaining: number;
    sending: boolean;
  } | null>(null);
  const stopRef = useRef(false);

  // Fetch conversion leads
  const {
    data: conversionData,
    isLoading,
    refetch,
  } = useQuery<ConversionData>({
    queryKey: ['admin-conversion-leads'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'get_conversion_leads' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  // Send conversion campaign mutation (single batch)
  const sendBatchMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_conversion_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  // Auto-batch sending with stop support
  const startSending = useCallback(async () => {
    stopRef.current = false;
    setSendProgress({ totalSent: 0, remaining: conversionData?.stats.unsent || 0, sending: true });
    setShowSendSheet(false);

    let totalSent = 0;

    while (!stopRef.current) {
      try {
        const result = await sendBatchMutation.mutateAsync();
        totalSent += result.sent;
        setSendProgress({
          totalSent,
          remaining: result.remaining,
          sending: !result.complete,
        });

        queryClient.invalidateQueries({ queryKey: ['admin-conversion-leads'] });

        if (result.complete || result.sent === 0) {
          haptic.success();
          toast({
            title: 'Campaign complete',
            description: `Sent ${totalSent} conversion emails`,
          });
          break;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        haptic.error();
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
        break;
      }
    }

    if (stopRef.current) {
      toast({ title: 'Stopped', description: `Sent ${totalSent} emails before stopping` });
    }

    setSendProgress((prev) => (prev ? { ...prev, sending: false } : null));
  }, [conversionData, sendBatchMutation, queryClient, haptic]);

  const stopSending = () => {
    stopRef.current = true;
  };

  // Filter and sort leads
  const filteredLeads = (conversionData?.unconverted || []).filter((lead) =>
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'conversion_status') {
      cmp = STATUS_ORDER[a.conversion_status] - STATUS_ORDER[b.conversion_status];
    } else if (sortField === 'email') {
      cmp = a.email.localeCompare(b.email);
    } else if (sortField === 'created_at') {
      cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return sortAsc ? cmp : -cmp;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'clicked':
        return (
          <Badge className="bg-green-500/20 text-green-400 text-xs">
            <MousePointerClick className="h-3 w-3 mr-1" />
            Clicked
          </Badge>
        );
      case 'opened':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Opened
          </Badge>
        );
      case 'sent':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
            <Mail className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        );
      default:
        return (
          <Badge className="bg-zinc-500/20 text-zinc-400 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Unsent
          </Badge>
        );
    }
  };

  const stats = conversionData?.stats;
  const totalTarget = stats?.total_unconverted || 0;
  const progressPercent =
    sendProgress && totalTarget > 0 ? Math.round((sendProgress.totalSent / totalTarget) * 100) : 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Conversion Campaign
            </h2>
            <p className="text-xs text-muted-foreground">{totalTarget} leads to convert</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 touch-manipulation"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="grid grid-cols-4 gap-2">
            <Card className="bg-gradient-to-br from-zinc-500/10 to-zinc-600/10 border-zinc-500/20">
              <CardContent className="pt-2 pb-2 text-center">
                <p className="text-lg font-bold text-zinc-300">{stats.unsent}</p>
                <p className="text-xs text-muted-foreground">Unsent</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="pt-2 pb-2 text-center">
                <p className="text-lg font-bold text-blue-400">{stats.sent}</p>
                <p className="text-xs text-muted-foreground">Sent</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
              <CardContent className="pt-2 pb-2 text-center">
                <p className="text-lg font-bold text-yellow-400">{stats.opened}</p>
                <p className="text-xs text-muted-foreground">Opened</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardContent className="pt-2 pb-2 text-center">
                <p className="text-lg font-bold text-green-400">{stats.clicked}</p>
                <p className="text-xs text-muted-foreground">Clicked</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Send Progress Bar (visible during/after sending) */}
        {sendProgress && (
          <Card className="border-elec-yellow/30 bg-elec-yellow/5">
            <CardContent className="pt-3 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {sendProgress.sending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending {sendProgress.totalSent} of {totalTarget}...
                    </span>
                  ) : (
                    `Done — ${sendProgress.totalSent} sent`
                  )}
                </span>
                {sendProgress.sending && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 gap-1.5 touch-manipulation text-red-400 border-red-500/30 hover:bg-red-500/10"
                    onClick={stopSending}
                  >
                    <Square className="h-3 w-3 fill-current" />
                    Stop
                  </Button>
                )}
              </div>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">{sendProgress.remaining} remaining</p>
            </CardContent>
          </Card>
        )}

        {/* Send Button */}
        {stats && stats.unsent > 0 && !sendProgress?.sending && (
          <Button
            className="w-full h-12 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            onClick={() => setShowSendSheet(true)}
          >
            <Send className="h-4 w-4" />
            Send Conversion Email to All Unsent ({stats.unsent})
          </Button>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 touch-manipulation"
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          {(
            [
              ['conversion_status', 'Status'],
              ['email', 'Email'],
              ['created_at', 'Date'],
            ] as [SortField, string][]
          ).map(([field, label]) => (
            <Button
              key={field}
              variant={sortField === field ? 'default' : 'outline'}
              size="sm"
              className="h-9 touch-manipulation text-xs"
              onClick={() => handleSort(field)}
            >
              {label}
              {sortField === field && <span className="ml-1">{sortAsc ? '↑' : '↓'}</span>}
            </Button>
          ))}
        </div>

        {/* Lead List */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-3 pb-3">
                  <div className="h-10 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground px-1">
              {sortedLeads.length} leads
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            {sortedLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm font-medium truncate">{lead.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Invited {format(new Date(lead.created_at), 'd MMM yyyy')}
                    {lead.conversion_email_sent_at && (
                      <span className="text-blue-400">
                        {' '}
                        · Sent{' '}
                        {formatDistanceToNow(new Date(lead.conversion_email_sent_at), {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </p>
                </div>
                {getStatusBadge(lead.conversion_status)}
              </div>
            ))}
          </div>
        )}

        {/* Already Converted (collapsed) */}
        {conversionData && conversionData.converted.length > 0 && (
          <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
            <Collapsible open={convertedOpen} onOpenChange={setConvertedOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer touch-manipulation pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-400" />
                      <CardTitle className="text-sm font-bold tracking-wide">
                        Already Converted
                      </CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        {conversionData.converted.length}
                      </Badge>
                    </div>
                    {convertedOpen ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4">
                  <div className="space-y-1.5">
                    {conversionData.converted.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-green-500/5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{lead.email}</p>
                          <p className="text-xs text-green-400">
                            {lead.user?.full_name || 'Unknown'} · {lead.user?.role || ''}
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Signed Up
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Send Confirmation Sheet */}
        <Sheet open={showSendSheet} onOpenChange={setShowSendSheet}>
          <SheetContent side="bottom" className="h-auto max-h-[50vh] rounded-t-2xl p-0">
            <div className="flex flex-col">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-elec-yellow" />
                  Send Conversion Campaign
                </SheetTitle>
              </SheetHeader>
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  This will send the conversion email to{' '}
                  <strong className="text-foreground">{stats?.unsent || 0}</strong> people who
                  haven't received it yet.
                </p>
                <p className="text-xs text-muted-foreground">
                  Sends in batches of 10 with 6-second delays. You can stop at any time.
                </p>
                <p className="text-xs text-muted-foreground">
                  People who have already signed up ({stats?.total_converted || 0}) and bounced
                  emails ({stats?.bounced || 0}) are automatically excluded.
                </p>
              </div>
              <SheetFooter className="p-4 border-t border-border">
                <Button
                  className="w-full h-12 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                  onClick={startSending}
                >
                  <Send className="h-4 w-4" />
                  Start Sending
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
