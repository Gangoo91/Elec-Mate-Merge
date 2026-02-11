import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Briefcase,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertTriangle,
  MapPin,
  Flag,
  Loader2,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';

interface Vacancy {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string | null;
  status: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string | null;
  requirements: string[] | null;
  benefits: string[] | null;
  closing_date: string | null;
  moderation_status: 'pending' | 'approved' | 'rejected' | 'flagged' | null;
  moderation_notes: string | null;
  moderated_by: string | null;
  moderated_at: string | null;
  created_at: string;
}

export default function AdminEmployerModeration() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'flag' | null>(
    null
  );
  const [moderationReason, setModerationReason] = useState('');
  const haptic = useHaptic();

  // Fetch vacancies
  const {
    data: vacancies,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-vacancies-moderation', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('employer_vacancies')
        .select(`*`)
        .order('created_at', { ascending: false })
        .limit(100);

      if (statusFilter !== 'all') {
        query = query.eq('moderation_status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as Vacancy[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (v) =>
            v.title.toLowerCase().includes(s) ||
            v.description?.toLowerCase().includes(s) ||
            v.location?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Get moderation stats
  const { data: stats } = useQuery({
    queryKey: ['admin-vacancy-moderation-stats'],
    queryFn: async () => {
      const [pendingRes, approvedRes, rejectedRes, flaggedRes] = await Promise.all([
        supabase
          .from('employer_vacancies')
          .select('*', { count: 'exact', head: true })
          .eq('moderation_status', 'pending'),
        supabase
          .from('employer_vacancies')
          .select('*', { count: 'exact', head: true })
          .eq('moderation_status', 'approved'),
        supabase
          .from('employer_vacancies')
          .select('*', { count: 'exact', head: true })
          .eq('moderation_status', 'rejected'),
        supabase
          .from('employer_vacancies')
          .select('*', { count: 'exact', head: true })
          .eq('moderation_status', 'flagged'),
      ]);
      return {
        pending: pendingRes.count || 0,
        approved: approvedRes.count || 0,
        rejected: rejectedRes.count || 0,
        flagged: flaggedRes.count || 0,
      };
    },
  });

  // Moderate vacancy
  const moderateMutation = useMutation({
    mutationFn: async ({ id, status, reason }: { id: string; status: string; reason: string }) => {
      const { error } = await supabase
        .from('employer_vacancies')
        .update({
          moderation_status: status,
          moderation_notes: reason || null,
          moderated_by: profile?.id,
          moderated_at: new Date().toISOString(),
          status: status === 'approved' ? 'active' : 'draft',
        })
        .eq('id', id);
      if (error) throw error;

      // Log the action
      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: `vacancy_${status}`,
        entity_type: 'employer_vacancy',
        entity_id: id,
        new_values: { moderation_status: status, reason },
      });
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-vacancies-moderation'] });
      queryClient.invalidateQueries({ queryKey: ['admin-vacancy-moderation-stats'] });
      setSelectedVacancy(null);
      setModerationAction(null);
      setModerationReason('');
      toast({ title: 'Vacancy moderated' });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-4 w-4 text-green-400" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-400" />;
      case 'flagged':
        return <Flag className="h-4 w-4 text-amber-400" />;
      default:
        return <Clock className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      flagged: 'bg-amber-500/20 text-amber-400',
      pending: 'bg-blue-500/20 text-blue-400',
    };
    return <Badge className={styles[status] || ''}>{status}</Badge>;
  };

  const handleModerate = () => {
    if (!selectedVacancy || !moderationAction) return;
    moderateMutation.mutate({
      id: selectedVacancy.id,
      status:
        moderationAction === 'approve'
          ? 'approved'
          : moderationAction === 'reject'
            ? 'rejected'
            : 'flagged',
      reason: moderationReason,
    });
  };

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
            <h2 className="text-lg font-semibold">Vacancy Moderation</h2>
            <p className="text-xs text-muted-foreground">{stats?.pending || 0} pending review</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 touch-manipulation"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2">
          <Card
            className={`bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 touch-manipulation cursor-pointer ${statusFilter === 'pending' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-lg font-bold">{stats?.pending || 0}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 touch-manipulation cursor-pointer ${statusFilter === 'approved' ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => setStatusFilter('approved')}
          >
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-lg font-bold">{stats?.approved || 0}</p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 touch-manipulation cursor-pointer ${statusFilter === 'rejected' ? 'ring-2 ring-red-500' : ''}`}
            onClick={() => setStatusFilter('rejected')}
          >
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-lg font-bold">{stats?.rejected || 0}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 touch-manipulation cursor-pointer ${statusFilter === 'flagged' ? 'ring-2 ring-amber-500' : ''}`}
            onClick={() => setStatusFilter('flagged')}
          >
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-400" />
                <div>
                  <p className="text-lg font-bold">{stats?.flagged || 0}</p>
                  <p className="text-xs text-muted-foreground">Flagged</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <AdminSearchInput value={search} onChange={setSearch} placeholder="Search vacancies..." />

        {/* Vacancy List */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-4 pb-4">
                  <div className="h-16 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : vacancies?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <AdminEmptyState
                icon={Briefcase}
                title="No vacancies to moderate"
                description={
                  statusFilter === 'pending' ? 'All caught up!' : 'No vacancies match this filter.'
                }
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {vacancies?.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => setSelectedVacancy(vacancy)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          vacancy.moderation_status === 'approved'
                            ? 'bg-green-500/10'
                            : vacancy.moderation_status === 'rejected'
                              ? 'bg-red-500/10'
                              : vacancy.moderation_status === 'flagged'
                                ? 'bg-amber-500/10'
                                : 'bg-blue-500/10'
                        }`}
                      >
                        {getStatusIcon(vacancy.moderation_status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{vacancy.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          {vacancy.location && (
                            <>
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{vacancy.location}</span>
                              <span>·</span>
                            </>
                          )}
                          {vacancy.type && (
                            <Badge variant="outline" className="text-xs">
                              {vacancy.type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {getStatusBadge(vacancy.moderation_status)}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Vacancy Detail Sheet */}
        <Sheet open={!!selectedVacancy} onOpenChange={() => setSelectedVacancy(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <Briefcase className="h-5 w-5" />
                  {selectedVacancy?.title}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-2">
                  {selectedVacancy && getStatusBadge(selectedVacancy.moderation_status)}
                  <Badge variant="outline">{selectedVacancy?.type || 'Full-time'}</Badge>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Posted</span>
                      <span className="text-sm">
                        {selectedVacancy?.created_at &&
                          formatDistanceToNow(new Date(selectedVacancy.created_at), {
                            addSuffix: true,
                          })}
                      </span>
                    </div>
                    {selectedVacancy?.location && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Location</span>
                        <span className="text-sm">{selectedVacancy.location}</span>
                      </div>
                    )}
                    {(selectedVacancy?.salary_min || selectedVacancy?.salary_max) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Salary</span>
                        <span className="text-sm">
                          £{selectedVacancy.salary_min?.toLocaleString()} - £
                          {selectedVacancy.salary_max?.toLocaleString()}{' '}
                          {selectedVacancy.salary_period && `/${selectedVacancy.salary_period}`}
                        </span>
                      </div>
                    )}
                    {selectedVacancy?.closing_date && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Closing Date</span>
                        <span className="text-sm">
                          {format(new Date(selectedVacancy.closing_date), 'dd MMM yyyy')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{selectedVacancy?.description}</p>
                  </CardContent>
                </Card>

                {selectedVacancy?.moderation_notes && (
                  <Card className="border-amber-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Moderation Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedVacancy.moderation_notes}</p>
                      {selectedVacancy.moderated_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Moderated{' '}
                          {formatDistanceToNow(new Date(selectedVacancy.moderated_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Moderation Actions */}
              {selectedVacancy?.moderation_status === 'pending' && (
                <SheetFooter className="p-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                      className="h-12 touch-manipulation bg-green-600 hover:bg-green-700"
                      onClick={() => setModerationAction('approve')}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 touch-manipulation border-amber-500 text-amber-500"
                      onClick={() => setModerationAction('flag')}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-12 touch-manipulation"
                      onClick={() => setModerationAction('reject')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Moderation Confirmation Dialog */}
        <AlertDialog open={!!moderationAction} onOpenChange={() => setModerationAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {moderationAction === 'approve' && <Check className="h-5 w-5 text-green-400" />}
                {moderationAction === 'reject' && <X className="h-5 w-5 text-red-400" />}
                {moderationAction === 'flag' && <Flag className="h-5 w-5 text-amber-400" />}
                {moderationAction === 'approve'
                  ? 'Approve Vacancy'
                  : moderationAction === 'reject'
                    ? 'Reject Vacancy'
                    : 'Flag Vacancy'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {moderationAction === 'approve'
                  ? 'This vacancy will be visible to all users.'
                  : moderationAction === 'reject'
                    ? 'This vacancy will be hidden and the employer notified.'
                    : 'This vacancy will be flagged for further review.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 py-2">
              <Label>Reason (optional)</Label>
              <Textarea
                placeholder="Add a note about this moderation decision..."
                value={moderationReason}
                onChange={(e) => setModerationReason(e.target.value)}
                className="min-h-[80px] touch-manipulation"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={`h-11 touch-manipulation ${
                  moderationAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : moderationAction === 'reject'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-amber-500 hover:bg-amber-600'
                }`}
                onClick={handleModerate}
                disabled={moderateMutation.isPending}
              >
                {moderateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}
