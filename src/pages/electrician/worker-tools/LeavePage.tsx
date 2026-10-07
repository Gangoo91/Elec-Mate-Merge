/**
 * LeavePage — routed Worker Tools page for requesting leave + viewing allowance/history.
 *
 * Page conversion of LeaveRequestSheet. The shell (WorkerToolPage) renders the
 * masthead, hero and team-access guard, so this file renders no Sheet, drag
 * handle, back button or open/onOpenChange props.
 *
 * The old sheet "steps" (list → type → dates) are now in-page views driven by
 * local state with explicit in-page back controls — no new routes. All data
 * hooks, the submit mutation, the calculateLeaveDays helper, the inverted-date
 * guard and every handler are carried over from the sheet unchanged in behaviour.
 *
 * ELE-2005: the allowance is only ever what the office set — until then the
 * page says "Ask the office for your allowance", never a made-up 28. Declined
 * requests show the reason in full. Pending requests, and approved leave that
 * hasn't started, can be cancelled (cancel_my_leave_request RPC). Before
 * submitting, a count of other people off on those dates (no names).
 */

import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, addDays, formatDistanceToNow } from 'date-fns';
import {
  Palmtree,
  Loader2,
  Calendar,
  Thermometer,
  Wallet,
  Heart,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import type { HelpBlocker } from '@/components/hub/PageHelp';
import { WT_LEAVE_HELP } from '@/components/worker-tools/help/worker-help';
import { LeaveType, LeaveStatus } from '@/services/types';
import {
  Pill,
  Dot,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  Field,
  Eyebrow,
  HeroNumber,
  ListCard,
  ListCardHeader,
  ListBody,
  FilterBar,
  LoadingBlocks,
  SuccessCheckmark,
  SplitLayout,
  inputClass,
  textareaClass,
  toneDot,
  type Tone,
} from '@/components/employer/editorial';

type LeaveView = 'list' | 'type' | 'dates';
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'cancelled';

interface LeaveTypeOption {
  value: LeaveType;
  label: string;
  icon: typeof Palmtree;
  colour: string;
}

const LEAVE_TYPES: LeaveTypeOption[] = [
  { value: 'annual', label: 'Annual Leave', icon: Palmtree, colour: 'text-emerald-400' },
  { value: 'sick', label: 'Sick Leave', icon: Thermometer, colour: 'text-red-400' },
  { value: 'unpaid', label: 'Unpaid Leave', icon: Wallet, colour: 'text-white' },
  { value: 'compassionate', label: 'Compassionate', icon: Heart, colour: 'text-pink-400' },
  { value: 'training', label: 'Training', icon: GraduationCap, colour: 'text-blue-400' },
];

const statusTone = (status: LeaveStatus): Tone => {
  // Stored Capitalised ('Pending') — normalise before matching
  switch ((status || '').toLowerCase()) {
    case 'approved':
      return 'emerald';
    case 'rejected':
      return 'red';
    case 'cancelled':
      return 'blue';
    case 'pending':
    default:
      return 'amber';
  }
};

const statusLabel = (status: LeaveStatus): string => {
  const s = (status || '').toLowerCase();
  if (s === 'rejected') return 'Declined';
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Pending';
};

const daysLabel = (n: number) => `${n} day${n === 1 ? '' : 's'}`;

const DEFAULT_DATE = () => addDays(new Date(), 1).toISOString().split('T')[0];

export default function LeavePage() {
  const {
    employee,
    employeeId,
    employeeName,
    leaveRequests,
    leaveAllowance,
    isLoadingLeave,
    submitLeaveRequest,
    calculateLeaveDays,
    getLeaveTypeName,
  } = useWorkerSelfService();

  // Live: an employer decision (approve / reject) on one of this worker's leave
  // requests updates the page instantly — no manual reload. (The decision push
  // notification already fires server-side; this keeps the open page in sync.)
  useRealtimeInvalidate(
    'worker-leave',
    [
      { table: 'employer_leave_requests', filter: `employee_id=eq.${employeeId}` },
      // The office setting or changing the allowance shows straight away.
      { table: 'employee_holiday_allowances', filter: `employee_id=eq.${employeeId}` },
    ],
    [
      ['my-leave-requests', employeeId],
      ['my-leave-allowance', employeeId],
    ],
    Boolean(employeeId)
  );

  const [view, setView] = useState<LeaveView>('list');
  const [selectedType, setSelectedType] = useState<LeaveType | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [formData, setFormData] = useState({
    startDate: DEFAULT_DATE(),
    endDate: DEFAULT_DATE(),
    halfDay: false,
    halfDayPeriod: 'am' as 'am' | 'pm',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ELE-2005: withdraw a pending request, or approved leave that hasn't started.
  // Two taps (arm, then confirm) so a stray thumb can't cancel a holiday.
  const queryClient = useQueryClient();
  const [cancelArmedId, setCancelArmedId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const todayIso = format(new Date(), 'yyyy-MM-dd');
  const canCancel = (r: { status: string; startDate: string }) => {
    const st = (r.status || '').toLowerCase();
    return st === 'pending' || (st === 'approved' && r.startDate > todayIso);
  };
  const handleCancel = async (id: string) => {
    if (cancelArmedId !== id) {
      setCancelArmedId(id);
      return;
    }
    setCancellingId(id);
    try {
      const { data, error } = await supabase.rpc(
        'cancel_my_leave_request' as never,
        {
          p_id: id,
        } as never
      );
      if (error) throw error;
      const officeTold = (data as { office_told?: boolean } | null)?.office_told === true;
      toast.success(
        officeTold ? 'Leave cancelled. The office has been told.' : 'Request withdrawn'
      );
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['my-leave-allowance', employeeId] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not cancel that request');
    } finally {
      setCancellingId(null);
      setCancelArmedId(null);
    }
  };
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setView('list');
    setSelectedType(null);
    setFormData({
      startDate: DEFAULT_DATE(),
      endDate: DEFAULT_DATE(),
      halfDay: false,
      halfDayPeriod: 'am',
      reason: '',
    });
  };

  // Calculate days for the current form data
  const calculatedDays = useMemo(() => {
    if (formData.halfDay) return 0.5;
    // Guard against inverted dates — calculateLeaveDays can throw a RangeError
    // on an end date that precedes the start date.
    if (formData.endDate < formData.startDate) return 0;
    return calculateLeaveDays(formData.startDate, formData.endDate);
  }, [formData.startDate, formData.endDate, formData.halfDay, calculateLeaveDays]);

  // Inline validation — end date must not precede start date
  const dateError =
    !formData.halfDay && formData.endDate < formData.startDate
      ? 'End date is before the start date'
      : null;

  // ELE-2005: how many other people in the firm are off on the chosen dates.
  // A count only — the RPC never returns names.
  const overlapEnd = formData.halfDay ? formData.startDate : formData.endDate;
  const overlapQuery = useQuery({
    queryKey: ['team-leave-overlap', employeeId, formData.startDate, overlapEnd],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'team_leave_overlap_count' as never,
        {
          p_start: formData.startDate,
          p_end: overlapEnd,
        } as never
      );
      if (error) throw error;
      return Number(data ?? 0);
    },
    enabled:
      view === 'dates' && !!employeeId && !!formData.startDate && overlapEnd >= formData.startDate,
    staleTime: 60 * 1000,
  });
  const overlapCount = overlapQuery.data;

  // History — newest first
  const sortedRequests = useMemo(
    () =>
      [...leaveRequests].sort((a, b) => {
        const ad = a.createdAt ? parseISO(a.createdAt).getTime() : 0;
        const bd = b.createdAt ? parseISO(b.createdAt).getTime() : 0;
        return bd - ad;
      }),
    [leaveRequests]
  );

  // Per-status counts for the filter tabs
  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: leaveRequests.length,
      pending: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
    };
    for (const r of leaveRequests) {
      const s = (r.status || '').toLowerCase() as StatusFilter;
      if (s === 'pending' || s === 'approved' || s === 'rejected' || s === 'cancelled') {
        counts[s] += 1;
      }
    }
    return counts;
  }, [leaveRequests]);

  const filteredRequests = useMemo(
    () =>
      statusFilter === 'all'
        ? sortedRequests
        : sortedRequests.filter((r) => (r.status || '').toLowerCase() === statusFilter),
    [sortedRequests, statusFilter]
  );

  const pendingCount = statusCounts.pending;

  const handleTypeSelect = (type: LeaveType) => {
    setSelectedType(type);
    setView('dates');
  };

  const handleSubmit = async () => {
    if (!selectedType || !employeeId || !employeeName) {
      toast.error('Please complete all fields');
      return;
    }
    if (dateError) {
      toast.error(dateError);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeaveRequest.mutateAsync({
        employeeId,
        employeeName,
        request: {
          type: selectedType,
          startDate: formData.startDate,
          endDate: formData.halfDay ? formData.startDate : formData.endDate,
          halfDay: formData.halfDay ? formData.halfDayPeriod : undefined,
          reason: formData.reason || undefined,
        },
      });

      setShowSuccess(true);
      toast.success('Leave request submitted');
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
      }, 900);
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : '';
      toast.error(message ? `Request not sent: ${message}` : 'Request not sent. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (view === 'dates') setView('type');
    else if (view === 'type') setView('list');
  };

  // Page chrome (eyebrow/title/description) changes by view; the shell renders it.
  const viewMeta: Record<LeaveView, { eyebrow: string; title: string; description: string }> = {
    list: {
      eyebrow: 'Time Off',
      title: 'Leave',
      description: 'Check your allowance and request time off.',
    },
    type: {
      eyebrow: 'New Request · Step 1 of 2',
      title: 'Type of Leave',
      description: 'Choose the kind of leave you need.',
    },
    dates: {
      eyebrow: 'New Request · Step 2 of 2',
      title: 'Dates & Details',
      description: 'Pick your dates and add an optional note.',
    },
  };

  if (!employee) {
    return (
      <WorkerToolPage eyebrow="Time Off" title="Leave">
        <EmptyState
          title="No worker record"
          description="Link your account to a team to see your allowance and request leave."
        />
      </WorkerToolPage>
    );
  }

  // ELE-1830: subcontractors have no holiday allowance and don't book leave
  // with the firm (the database refuses it). Tell them what to do instead.
  if (employee.team_role === 'Subcontractor') {
    return (
      <WorkerToolPage
        eyebrow="Time Off"
        title="Leave"
        description="You work on your own account, so there is no holiday allowance here."
      >
        <EmptyState
          title="No holiday allowance for subcontractors"
          description="Tell the office which days you're not available, by message or phone, so they don't book you on a job. Your days and statements are in My pay."
        />
      </WorkerToolPage>
    );
  }

  const selectedTypeOption = LEAVE_TYPES.find((t) => t.value === selectedType);
  const meta = viewMeta[view];

  const statusTabs: { value: StatusFilter; label: string; count?: number }[] = [
    { value: 'all', label: 'All', count: statusCounts.all },
    { value: 'pending', label: 'Pending', count: statusCounts.pending },
    { value: 'approved', label: 'Approved', count: statusCounts.approved },
    { value: 'rejected', label: 'Declined', count: statusCounts.rejected },
    ...(statusCounts.cancelled > 0
      ? [{ value: 'cancelled' as StatusFilter, label: 'Cancelled', count: statusCounts.cancelled }]
      : []),
  ];

  // ── Header action: a single primary "Request Leave" on the list view ──
  // Live "Before you start" for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    leaveAllowance && !leaveAllowance.isSet
      ? [{ text: 'The office hasn’t set your holiday allowance yet, so there’s no balance. You can still request leave.' }]
      : [];

  const actions =
    view === 'list' ? (
      <PrimaryButton
        data-help="wt-leave.request"
        onClick={() => setView('type')}
        size="md"
        className="gap-2"
      >
        <Palmtree className="h-4 w-4" />
        <span className="hidden sm:inline">Request Leave</span>
        <span className="sm:hidden">Request</span>
      </PrimaryButton>
    ) : (
      <SecondaryButton onClick={handleBack} size="md" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </SecondaryButton>
    );


  // ── Allowance hero (full-width above the split) ──────────────
  const year = new Date().getFullYear();
  const heroContent = isLoadingLeave ? (
    <LoadingBlocks />
  ) : leaveAllowance?.isSet && leaveAllowance.remainingDays !== null ? (
    <HeroNumber
      tone="emerald"
      eyebrow={`Holiday left · ${year}`}
      value={
        <>
          {leaveAllowance.remainingDays}
          <span className="text-[20px] font-medium text-white ml-2">
            day{leaveAllowance.remainingDays !== 1 ? 's' : ''}
          </span>
        </>
      }
      caption={
        leaveAllowance.carriedOver > 0
          ? `${daysLabel(leaveAllowance.totalDays ?? 0)} this year, including ${daysLabel(
              leaveAllowance.carriedOver
            )} carried over`
          : `${daysLabel(leaveAllowance.totalDays ?? 0)} this year, set by the office`
      }
      columns={[
        { label: 'Left', value: leaveAllowance.remainingDays, tone: 'emerald' },
        { label: 'Taken or booked', value: leaveAllowance.usedDays },
        { label: 'Waiting', value: leaveAllowance.pendingDays, tone: 'amber' },
      ]}
    />
  ) : leaveAllowance ? (
    <section className="-mx-4 sm:mx-0 border-y sm:border border-white/[0.07] sm:rounded-2xl bg-[hsl(0_0%_13%)] px-4 py-5 sm:p-7">
      <Eyebrow>Holiday · {year}</Eyebrow>
      <h2 className="mt-3 text-[22px] sm:text-3xl font-semibold text-white leading-tight">
        Ask the office for your allowance
      </h2>
      <p className="mt-2 text-[13px] text-white leading-relaxed">
        Your office hasn&apos;t set your holiday allowance for {year} yet, so there&apos;s no
        balance to show. You can still request leave.
      </p>
      {(leaveAllowance.usedDays > 0 || leaveAllowance.pendingDays > 0) && (
        <p className="mt-3 text-[13px] text-white tabular-nums">
          {daysLabel(leaveAllowance.usedDays)} taken or booked ·{' '}
          {daysLabel(leaveAllowance.pendingDays)} waiting for approval
        </p>
      )}
    </section>
  ) : null;

  // ── History (filters + request list) ─────────────────────────
  const historyContent = isLoadingLeave ? (
    <LoadingBlocks />
  ) : sortedRequests.length > 0 ? (
    <div className="space-y-4">
      <div data-help="wt-leave.tabs">
      <FilterBar
        tabs={statusTabs}
        activeTab={statusFilter}
        onTabChange={(v) => setStatusFilter(v as StatusFilter)}
      />
      </div>

      {filteredRequests.length > 0 ? (
        <ListCard>
          <ListCardHeader
            title="Your Requests"
            meta={pendingCount > 0 ? <Pill tone="amber">{pendingCount} pending</Pill> : undefined}
          />
          <ListBody>
            {filteredRequests.map((request) => {
              const sameDay = request.startDate === request.endDate;
              const dateLabel = sameDay
                ? format(parseISO(request.startDate), 'd MMM yyyy')
                : `${format(parseISO(request.startDate), 'd MMM')} – ${format(
                    parseISO(request.endDate),
                    'd MMM yyyy'
                  )}`;
              const relative = request.createdAt
                ? formatDistanceToNow(parseISO(request.createdAt), { addSuffix: true })
                : null;
              const declined = request.status?.toLowerCase() === 'rejected';
              const isArmed = cancelArmedId === request.id;
              const isApproved = request.status?.toLowerCase() === 'approved';
              return (
                <div key={request.id} className="flex gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4">
                  <span
                    aria-hidden
                    className={cn(
                      'w-[3px] self-stretch min-h-10 rounded-full shrink-0',
                      toneDot[statusTone(request.status)]
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[14px] font-medium text-white">
                        {getLeaveTypeName(request.type)}
                      </p>
                      <Pill tone={statusTone(request.status)}>{statusLabel(request.status)}</Pill>
                    </div>
                    <p className="mt-0.5 text-[12.5px] text-white tabular-nums">
                      {dateLabel} · {daysLabel(request.totalDays)}
                      {relative ? ` · asked ${relative}` : ''}
                    </p>
                    {declined && (
                      <p className="mt-2 text-[13px] text-white leading-snug whitespace-pre-line break-words">
                        <span className="font-semibold text-red-400">Why it was declined: </span>
                        {request.rejectedReason || 'The office did not give a reason.'}
                      </p>
                    )}
                    {canCancel(request) && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          data-help="wt-leave.cancel"
                          onClick={() => handleCancel(request.id)}
                          disabled={cancellingId === request.id}
                          className={cn(
                            'h-11 px-4 rounded-lg text-[13px] font-semibold touch-manipulation transition-colors',
                            isArmed
                              ? 'bg-red-500 text-white'
                              : 'border border-white/[0.14] bg-white/[0.05] text-white'
                          )}
                        >
                          {cancellingId === request.id
                            ? 'Cancelling…'
                            : isArmed
                              ? isApproved
                                ? 'Yes, cancel this leave'
                                : 'Yes, withdraw it'
                              : isApproved
                                ? 'Cancel leave'
                                : 'Withdraw request'}
                        </button>
                        {isArmed && cancellingId !== request.id && (
                          <button
                            type="button"
                            onClick={() => setCancelArmedId(null)}
                            className="h-11 px-4 rounded-lg text-[13px] font-medium text-white touch-manipulation"
                          >
                            Keep it
                          </button>
                        )}
                        {isArmed && isApproved && (
                          <p className="basis-full text-[12px] text-white">
                            The office will be told you&apos;ve cancelled approved leave.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </ListBody>
        </ListCard>
      ) : (
        <EmptyState
          title={`No ${statusFilter} requests`}
          description="Try a different filter to see your other leave requests."
          action="Show all"
          onAction={() => setStatusFilter('all')}
        />
      )}
    </div>
  ) : (
    <EmptyState
      title="No leave requests yet"
      description="Request annual, sick or other leave and it'll appear here once submitted to your manager."
      action="Request leave"
      onAction={() => setView('type')}
    />
  );

  // ── Request flow (type → dates) ──────────────────────────────
  const typeView = (
    <motion.div
      key="type"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      className="space-y-2"
      data-help="wt-leave.types"
    >
      {LEAVE_TYPES.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.value;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => handleTypeSelect(type.value)}
            aria-pressed={isSelected}
            className={cn(
              'w-full min-h-[60px] flex items-center gap-4 p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.99]',
              isSelected
                ? 'bg-white/[0.06] border-elec-yellow/40'
                : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.14]'
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0', type.colour)} />
            <span className="text-[14px] font-medium text-white flex-1 text-left">
              {type.label}
            </span>
            <span
              aria-hidden
              className={cn(
                'text-[15px] shrink-0 leading-none transition-colors',
                isSelected ? 'text-elec-yellow' : 'text-white'
              )}
            >
              →
            </span>
          </button>
        );
      })}

      <div className="pt-3">
        <SecondaryButton onClick={() => setView('list')} fullWidth size="lg">
          Cancel
        </SecondaryButton>
      </div>
    </motion.div>
  );

  const datesView = (
    <motion.div
      key="dates"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      className="space-y-5"
    >
      {/* Selected type recap */}
      {selectedTypeOption && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <selectedTypeOption.icon className={cn('h-5 w-5 shrink-0', selectedTypeOption.colour)} />
          <div className="flex-1 min-w-0">
            <Eyebrow>Leave Type</Eyebrow>
            <p className="mt-0.5 text-[14px] font-medium text-white truncate">
              {selectedTypeOption.label}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView('type')}
            className="h-11 px-3 flex items-center text-[12px] font-medium text-elec-yellow transition-colors shrink-0 touch-manipulation"
          >
            Change
          </button>
        </div>
      )}

      {/* Half day toggle */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-white">Half Day</p>
          <p className="text-[12px] text-white">Request half a day only</p>
        </div>
        <Switch
          checked={formData.halfDay}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              halfDay: checked,
              endDate: checked ? prev.startDate : prev.endDate,
            }))
          }
        />
      </div>

      {/* Half day period */}
      <AnimatePresence>
        {formData.halfDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3">
              {(['am', 'pm'] as const).map((period) => {
                const active = formData.halfDayPeriod === period;
                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, halfDayPeriod: period }))}
                    aria-pressed={active}
                    className={cn(
                      'min-h-[60px] p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98]',
                      active
                        ? 'bg-white/[0.06] border-elec-yellow/40'
                        : 'bg-white/[0.04] border-white/[0.08]'
                    )}
                  >
                    <p className="text-[14px] font-medium text-white">
                      {period === 'am' ? 'Morning' : 'Afternoon'}
                    </p>
                    <p className="text-[11px] text-white uppercase">{period}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date inputs */}
      <div className={cn('grid gap-3', !formData.halfDay && 'sm:grid-cols-2')} data-help="wt-leave.dates">
        <Field label={formData.halfDay ? 'Date' : 'Start Date'}>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                  endDate:
                    formData.halfDay || e.target.value > prev.endDate
                      ? e.target.value
                      : prev.endDate,
                }))
              }
              min={new Date().toISOString().split('T')[0]}
              className={cn(inputClass, 'pl-10')}
            />
          </div>
        </Field>

        {!formData.halfDay && (
          <Field label="End Date">
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                min={formData.startDate}
                className={cn(inputClass, 'pl-10')}
              />
            </div>
          </Field>
        )}
      </div>

      {/* Inline validation */}
      {dateError && (
        <div className="flex items-center gap-2 -mt-2">
          <Dot tone="red" />
          <span className="text-[12px] text-red-400">{dateError}</span>
        </div>
      )}

      {/* Days total */}
      <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <Eyebrow>Total Requested</Eyebrow>
            <p className="mt-1.5 text-[13px] text-white">
              working day{calculatedDays !== 1 ? 's' : ''}
            </p>
          </div>
          <p className="text-4xl font-semibold text-white tabular-nums leading-none">
            {calculatedDays}
          </p>
        </div>
      </div>

      {/* Allowance impact — only against an allowance the office actually set */}
      {selectedType === 'annual' && leaveAllowance && (
        <div className="flex items-center gap-2 px-1">
          {leaveAllowance.isSet && leaveAllowance.remainingDays !== null ? (
            <>
              <Dot tone={calculatedDays > leaveAllowance.remainingDays ? 'red' : 'emerald'} />
              <span className="text-[13px] text-white tabular-nums">
                {calculatedDays > leaveAllowance.remainingDays
                  ? `More than the ${daysLabel(leaveAllowance.remainingDays)} you have left`
                  : `${daysLabel(leaveAllowance.remainingDays - calculatedDays)} would be left`}
              </span>
            </>
          ) : (
            <>
              <Dot tone="blue" />
              <span className="text-[13px] text-white">
                No allowance set yet. Ask the office how many days you have.
              </span>
            </>
          )}
        </div>
      )}

      {/* Who else is off — a count from the server, never names */}
      {calculatedDays > 0 && !dateError && overlapCount !== undefined && (
        <div className="flex items-center gap-2 px-1" aria-live="polite">
          <Dot tone={overlapCount > 0 ? 'amber' : 'emerald'} />
          <span className="text-[13px] text-white">
            {overlapCount === 0
              ? 'Nobody else in your team is off on these dates'
              : `${overlapCount} other${overlapCount === 1 ? ' is' : 's are'} off on some of these dates`}
          </span>
        </div>
      )}

      {/* Reason */}
      <Field label="Reason (optional)" hint="A short note helps your manager review faster.">
        <Textarea
          value={formData.reason}
          onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
          placeholder="Add any notes for your manager…"
          className={cn(textareaClass, 'min-h-[88px]')}
        />
      </Field>

      {/* Submit actions */}
      <div className="flex flex-row gap-2 pt-1">
        <SecondaryButton onClick={handleBack} size="lg" className="px-6">
          Back
        </SecondaryButton>
        <PrimaryButton
          data-help="wt-leave.submit"
          onClick={handleSubmit}
          disabled={isSubmitting || calculatedDays <= 0 || !!dateError}
          fullWidth
          size="lg"
          className="gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Palmtree className="h-5 w-5" />
              Submit Request
            </>
          )}
        </PrimaryButton>
      </div>
    </motion.div>
  );

  // Mobile flow swap: list → type → dates (AnimatePresence keeps transitions)
  const mobileFlow = (
    <AnimatePresence mode="wait">
      {view === 'list' && (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          className="space-y-6"
        >
          {heroContent}
          {historyContent}
        </motion.div>
      )}
      {view === 'type' && typeView}
      {view === 'dates' && datesView}
    </AnimatePresence>
  );

  // Desktop request-flow column: shows a prompt when idle, else the active step
  const desktopRequestColumn = (
    <div className="space-y-4">
      <Eyebrow>New Request</Eyebrow>
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div
            key="desktop-prompt"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
          >
            <EmptyState
              title="Book time off"
              description="Choose a leave type, pick your dates and submit the request to your manager."
              action="Request leave"
              onAction={() => setView('type')}
            />
          </motion.div>
        ) : view === 'type' ? (
          typeView
        ) : (
          datesView
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <WorkerToolPage
      eyebrow={meta.eyebrow}
      title={meta.title}
      description={meta.description}
      actions={actions}
      maxWidth="7xl"
      help={WT_LEAVE_HELP}
      helpBlockers={helpBlockers}
    >
      {/* Full-width allowance hero */}
      <div className="hidden lg:block">{heroContent}</div>

      {/* Desktop: request flow (left) + history (right) */}
      <div className="hidden lg:block">
        <SplitLayout
          ratio="1-1"
          primary={desktopRequestColumn}
          secondary={
            <div className="space-y-4">
              <Eyebrow>History</Eyebrow>
              {historyContent}
            </div>
          }
        />
      </div>

      {/* Mobile: single-column flow swap */}
      <div className="lg:hidden">{mobileFlow}</div>

      <SuccessCheckmark show={showSuccess} />
    </WorkerToolPage>
  );
}
