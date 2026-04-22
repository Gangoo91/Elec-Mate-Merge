import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { RefreshCw, Check, X, Flag, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
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
  IconButton,
  LoadingBlocks,
  EmptyState,
  Divider,
  Eyebrow,
  type Tone,
} from '@/components/admin/editorial';

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

function getInitials(input?: string | null) {
  if (!input) return '—';
  const parts = input.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '—';
}

function statusToTone(status: string | null | undefined): Tone {
  switch (status) {
    case 'approved':
      return 'emerald';
    case 'rejected':
      return 'red';
    case 'flagged':
      return 'amber';
    case 'pending':
    default:
      return 'blue';
  }
}

function statusLabel(status: string | null | undefined) {
  if (!status) return 'Pending';
  return status.charAt(0).toUpperCase() + status.slice(1);
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

  const formatSalary = (v: Vacancy) => {
    if (v.salary_min && v.salary_max) {
      return `£${v.salary_min.toLocaleString()}–£${v.salary_max.toLocaleString()}${v.salary_period ? `/${v.salary_period}` : ''}`;
    }
    if (v.salary_min) return `£${v.salary_min.toLocaleString()}+`;
    if (v.salary_max) return `up to £${v.salary_max.toLocaleString()}`;
    return 'Rate on request';
  };

  const tabs = [
    { value: 'pending', label: 'Pending', count: stats?.pending ?? 0 },
    { value: 'approved', label: 'Live', count: stats?.approved ?? 0 },
    { value: 'flagged', label: 'Flagged', count: stats?.flagged ?? 0 },
    { value: 'rejected', label: 'Expired', count: stats?.rejected ?? 0 },
    { value: 'all', label: 'All' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Moderation"
          title="Employer Vacancies"
          description="Review job postings before they go live."
          tone="purple"
          actions={
            <IconButton
              onClick={() => refetch()}
              aria-label="Refresh"
              disabled={isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Pending',
              value: stats?.pending ?? 0,
              tone: 'orange',
              onClick: () => setStatusFilter('pending'),
            },
            {
              label: 'Live',
              value: stats?.approved ?? 0,
              tone: 'emerald',
              onClick: () => setStatusFilter('approved'),
            },
            {
              label: 'Flagged',
              value: stats?.flagged ?? 0,
              tone: 'red',
              onClick: () => setStatusFilter('flagged'),
            },
            {
              label: 'Expired',
              value: stats?.rejected ?? 0,
              tone: 'amber',
              onClick: () => setStatusFilter('rejected'),
            },
          ]}
        />

        <FilterBar
          tabs={tabs}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search vacancies…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : !vacancies || vacancies.length === 0 ? (
          <EmptyState
            title="No vacancies to review"
            description={
              statusFilter === 'pending'
                ? 'All caught up. New submissions will appear here.'
                : 'No vacancies match this filter.'
            }
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="purple"
              title="Vacancies"
              meta={<Pill tone="purple">{vacancies.length}</Pill>}
            />
            <ListBody>
              {vacancies.map((vacancy) => {
                const tone = statusToTone(vacancy.moderation_status);
                return (
                  <ListRow
                    key={vacancy.id}
                    lead={<Avatar initials={getInitials(vacancy.title)} />}
                    title={vacancy.title}
                    subtitle={
                      <span className="text-white">
                        {[
                          vacancy.type || 'Vacancy',
                          vacancy.location || 'Location TBC',
                          formatSalary(vacancy),
                        ].join(' · ')}
                      </span>
                    }
                    trailing={
                      <Pill tone={tone}>{statusLabel(vacancy.moderation_status)}</Pill>
                    }
                    accent={tone}
                    onClick={() => setSelectedVacancy(vacancy)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedVacancy} onOpenChange={() => setSelectedVacancy(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06] text-left">
                <Eyebrow>Vacancy review</Eyebrow>
                <SheetTitle className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight mt-1.5">
                  {selectedVacancy?.title}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-3">
                  {selectedVacancy && (
                    <Pill tone={statusToTone(selectedVacancy.moderation_status)}>
                      {statusLabel(selectedVacancy.moderation_status)}
                    </Pill>
                  )}
                  <Pill tone="blue">{selectedVacancy?.type || 'Full-time'}</Pill>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                <ListCard>
                  <ListCardHeader tone="purple" title="Job details" />
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Posted</span>
                      <span className="text-[13px] text-white tabular-nums">
                        {selectedVacancy?.created_at &&
                          formatDistanceToNow(new Date(selectedVacancy.created_at), {
                            addSuffix: true,
                          })}
                      </span>
                    </div>
                    {selectedVacancy?.location && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Location</span>
                        <span className="text-[13px] text-white">{selectedVacancy.location}</span>
                      </div>
                    )}
                    {(selectedVacancy?.salary_min || selectedVacancy?.salary_max) && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Salary</span>
                        <span className="text-[13px] text-white tabular-nums">
                          {formatSalary(selectedVacancy)}
                        </span>
                      </div>
                    )}
                    {selectedVacancy?.closing_date && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Closing date</span>
                        <span className="text-[13px] text-white tabular-nums">
                          {format(new Date(selectedVacancy.closing_date), 'dd MMM yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </ListCard>

                {selectedVacancy?.description && (
                  <ListCard>
                    <ListCardHeader tone="blue" title="Description" />
                    <div className="px-5 py-4">
                      <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                        {selectedVacancy.description}
                      </p>
                    </div>
                  </ListCard>
                )}

                {selectedVacancy?.requirements && selectedVacancy.requirements.length > 0 && (
                  <ListCard>
                    <ListCardHeader tone="yellow" title="Requirements" />
                    <ListBody>
                      {selectedVacancy.requirements.map((req, i) => (
                        <ListRow
                          key={i}
                          title={<span className="text-white">{req}</span>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedVacancy?.benefits && selectedVacancy.benefits.length > 0 && (
                  <ListCard>
                    <ListCardHeader tone="emerald" title="Benefits" />
                    <ListBody>
                      {selectedVacancy.benefits.map((b, i) => (
                        <ListRow
                          key={i}
                          title={<span className="text-white">{b}</span>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedVacancy?.moderation_notes && (
                  <ListCard>
                    <ListCardHeader tone="amber" title="Moderation notes" />
                    <div className="px-5 py-4">
                      <p className="text-[13px] text-white leading-relaxed">
                        {selectedVacancy.moderation_notes}
                      </p>
                      {selectedVacancy.moderated_at && (
                        <>
                          <Divider />
                          <p className="text-[11px] text-white mt-3">
                            Moderated{' '}
                            {formatDistanceToNow(new Date(selectedVacancy.moderated_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </>
                      )}
                    </div>
                  </ListCard>
                )}
              </div>

              {selectedVacancy?.moderation_status === 'pending' && (
                <SheetFooter className="p-4 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                      className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
                      onClick={() => setModerationAction('approve')}
                    >
                      <Check className="h-4 w-4 mr-1.5" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 touch-manipulation border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      onClick={() => setModerationAction('flag')}
                    >
                      <Flag className="h-4 w-4 mr-1.5" />
                      Flag
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 touch-manipulation border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      onClick={() => setModerationAction('reject')}
                    >
                      <X className="h-4 w-4 mr-1.5" />
                      Reject
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={!!moderationAction} onOpenChange={() => setModerationAction(null)}>
          <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-white">
                {moderationAction === 'approve' && <Check className="h-5 w-5 text-emerald-400" />}
                {moderationAction === 'reject' && <X className="h-5 w-5 text-red-400" />}
                {moderationAction === 'flag' && <Flag className="h-5 w-5 text-amber-400" />}
                {moderationAction === 'approve'
                  ? 'Approve vacancy'
                  : moderationAction === 'reject'
                    ? 'Reject vacancy'
                    : 'Flag vacancy'}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                {moderationAction === 'approve'
                  ? 'This vacancy will be visible to all users.'
                  : moderationAction === 'reject'
                    ? 'This vacancy will be hidden and the employer notified.'
                    : 'This vacancy will be flagged for further review.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 py-2">
              <Label className="text-white">Reason (optional)</Label>
              <Textarea
                placeholder="Add a note about this moderation decision…"
                value={moderationReason}
                onChange={(e) => setModerationReason(e.target.value)}
                className="min-h-[80px] touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
                onClick={handleModerate}
                disabled={moderateMutation.isPending}
              >
                {moderateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing…
                  </>
                ) : (
                  'Confirm'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}
