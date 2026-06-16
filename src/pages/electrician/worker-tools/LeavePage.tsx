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
 */

import { useState, useMemo } from 'react';
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
  ListRow,
  FilterBar,
  LoadingBlocks,
  SuccessCheckmark,
  SplitLayout,
  inputClass,
  textareaClass,
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
      return 'amber';
    case 'pending':
    default:
      return 'amber';
  }
};

const statusLabel = (status: LeaveStatus): string => {
  const s = (status || '').toLowerCase();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Pending';
};

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
    [{ table: 'employer_leave_requests', filter: `employee_id=eq.${employeeId}` }],
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

  // Annual allowance, with a derived % used for a glanceable progress legend
  const totalAllowance = leaveAllowance
    ? leaveAllowance.usedDays + leaveAllowance.remainingDays + leaveAllowance.pendingDays
    : 0;
  const percentRemaining =
    totalAllowance > 0 && leaveAllowance
      ? Math.round((leaveAllowance.remainingDays / totalAllowance) * 100)
      : 0;

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
    } catch {
      toast.error('Failed to submit leave request');
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

  const selectedTypeOption = LEAVE_TYPES.find((t) => t.value === selectedType);
  const meta = viewMeta[view];

  const statusTabs: { value: StatusFilter; label: string; count?: number }[] = [
    { value: 'all', label: 'All', count: statusCounts.all },
    { value: 'pending', label: 'Pending', count: statusCounts.pending },
    { value: 'approved', label: 'Approved', count: statusCounts.approved },
    { value: 'rejected', label: 'Rejected', count: statusCounts.rejected },
    ...(statusCounts.cancelled > 0
      ? [{ value: 'cancelled' as StatusFilter, label: 'Cancelled', count: statusCounts.cancelled }]
      : []),
  ];

  // ── Header action: a single primary "Request Leave" on the list view ──
  const actions =
    view === 'list' ? (
      <PrimaryButton onClick={() => setView('type')} size="md" className="gap-2">
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
  const heroContent = isLoadingLeave ? (
    <LoadingBlocks />
  ) : leaveAllowance ? (
    <HeroNumber
      eyebrow={`Remaining · ${new Date().getFullYear()}`}
      value={
        <>
          {leaveAllowance.remainingDays}
          <span className="text-[20px] font-medium text-white/50 ml-2">
            day{leaveAllowance.remainingDays !== 1 ? 's' : ''}
          </span>
        </>
      }
      caption={`${totalAllowance} day annual allowance`}
      columns={[
        { label: 'Remaining', value: leaveAllowance.remainingDays, tone: 'yellow' },
        { label: 'Used', value: leaveAllowance.usedDays },
        { label: 'Pending', value: leaveAllowance.pendingDays, tone: 'amber' },
      ]}
      legend={[{ label: 'remaining', value: `${percentRemaining}%`, tone: 'yellow' }]}
    />
  ) : null;

  // ── History (filters + request list) ─────────────────────────
  const historyContent = isLoadingLeave ? (
    <LoadingBlocks />
  ) : sortedRequests.length > 0 ? (
    <div className="space-y-4">
      <FilterBar
        tabs={statusTabs}
        activeTab={statusFilter}
        onTabChange={(v) => setStatusFilter(v as StatusFilter)}
      />

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
              return (
                <ListRow
                  key={request.id}
                  accent={statusTone(request.status)}
                  title={getLeaveTypeName(request.type)}
                  subtitle={
                    <span className="tabular-nums">
                      {dateLabel} · {request.totalDays} day
                      {request.totalDays !== 1 ? 's' : ''}
                      {relative ? ` · ${relative}` : ''}
                    </span>
                  }
                  trailing={
                    <Pill tone={statusTone(request.status)}>{statusLabel(request.status)}</Pill>
                  }
                />
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
                ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
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
                isSelected ? 'text-elec-yellow' : 'text-white/30'
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
            className="h-9 px-3 flex items-center text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors shrink-0 touch-manipulation"
          >
            Change
          </button>
        </div>
      )}

      {/* Half day toggle */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-white">Half Day</p>
          <p className="text-[12px] text-white/70">Request half a day only</p>
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
                        ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                        : 'bg-white/[0.04] border-white/[0.08]'
                    )}
                  >
                    <p className="text-[14px] font-medium text-white">
                      {period === 'am' ? 'Morning' : 'Afternoon'}
                    </p>
                    <p className="text-[11px] text-white/60 uppercase">{period}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date inputs */}
      <div className={cn('grid gap-3', !formData.halfDay && 'sm:grid-cols-2')}>
        <Field label={formData.halfDay ? 'Date' : 'Start Date'}>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
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
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
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
      <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70" />
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <Eyebrow>Total Requested</Eyebrow>
            <p className="mt-1.5 text-[13px] text-white/70">
              working day{calculatedDays !== 1 ? 's' : ''}
            </p>
          </div>
          <p className="text-4xl font-semibold text-elec-yellow tabular-nums leading-none">
            {calculatedDays}
          </p>
        </div>
      </div>

      {/* Allowance impact — derived, only when annual + data present */}
      {selectedType === 'annual' && leaveAllowance && (
        <div className="flex items-center gap-2 px-1">
          <Dot tone={calculatedDays > leaveAllowance.remainingDays ? 'red' : 'emerald'} />
          <span className="text-[12px] text-white/70 tabular-nums">
            {calculatedDays > leaveAllowance.remainingDays
              ? `Exceeds your ${leaveAllowance.remainingDays} remaining day${
                  leaveAllowance.remainingDays !== 1 ? 's' : ''
                }`
              : `${leaveAllowance.remainingDays - calculatedDays} day${
                  leaveAllowance.remainingDays - calculatedDays !== 1 ? 's' : ''
                } would remain`}
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
