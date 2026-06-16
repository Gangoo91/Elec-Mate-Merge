/**
 * ExpensesPage
 *
 * Routed Worker Tools page for submitting and tracking expense claims.
 * Converted from ExpenseSheet (bottom sheet) — same data hooks, mutations and
 * handlers, re-housed in the shared WorkerToolPage shell with a two-view layout
 * (claims list ⇄ submit form), status filters and a glanceable summary.
 *
 * Data layer is unchanged: useMyJobs('active') + useMyExpenses().
 */

import { useMemo, useState } from 'react';
import { Camera, Loader2, Send, Plus, ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMyJobs, useMyExpenses } from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  Pill,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  Eyebrow,
  SectionHeader,
  StatStrip,
  SplitLayout,
  SuccessCheckmark,
  Field,
  FilterBar,
  ListCard,
  ListBody,
  ListRow,
  LoadingBlocks,
  type Tone,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/employer/editorial';

const EXPENSE_CATEGORIES = [
  { value: 'travel', label: 'Travel' },
  { value: 'materials', label: 'Materials' },
  { value: 'tools', label: 'Tools' },
  { value: 'ppe', label: 'PPE' },
  { value: 'subsistence', label: 'Subsistence' },
  { value: 'parking', label: 'Parking' },
  { value: 'other', label: 'Other' },
];

const statusTone: Record<string, { tone: Tone; label: string }> = {
  pending: { tone: 'amber', label: 'Pending' },
  approved: { tone: 'emerald', label: 'Approved' },
  rejected: { tone: 'red', label: 'Rejected' },
  paid: { tone: 'blue', label: 'Paid' },
};

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'paid', label: 'Paid' },
  { value: 'rejected', label: 'Rejected' },
];

/** Short relative timestamp (e.g. "2d ago"), falling back to a date. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const fmt = (n: number) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type View = 'list' | 'submit';

export default function ExpensesPage() {
  const [view, setView] = useState<View>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const { recentExpenses, isLoading, submitExpense, isSubmitting } = useMyExpenses();

  const employeeId = useMyEmployeeRecord().data?.id;

  // Live: an employer decision (approve / reject / mark paid) on one of this
  // worker's expense claims updates the page instantly — no manual reload. The
  // claims list is keyed by ['my-expenses', employeeId] (see useMyExpenses).
  useRealtimeInvalidate(
    'worker-expenses',
    [{ table: 'employer_expense_claims', filter: `employee_id=eq.${employeeId}` }],
    [['my-expenses', employeeId]],
    Boolean(employeeId)
  );

  const resetForm = () => {
    setCategory('');
    setAmount('');
    setDescription('');
    setSelectedJobId('');
  };

  const handleSubmit = async () => {
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      await submitExpense({
        category,
        amount: parseFloat(amount),
        description: description.trim(),
        jobId: selectedJobId || undefined,
      });
      toast.success('Expense submitted');
      resetForm();
      setShowSuccess(true);
      setStatusFilter('all');
      setView('list');
      window.setTimeout(() => setShowSuccess(false), 1400);
    } catch {
      toast.error('Failed to submit expense');
    }
  };

  // Stored Capitalised ('Pending') — normalise before matching
  const getStatusPill = (status: string) => {
    const match = statusTone[(status || '').toLowerCase()];
    return match ? <Pill tone={match.tone}>{match.label}</Pill> : <Pill tone="blue">{status}</Pill>;
  };

  const parsedAmount = parseFloat(amount);
  const amountPreview = amount && parsedAmount > 0 ? parsedAmount.toFixed(2) : '0.00';
  const selectedCategoryLabel = EXPENSE_CATEGORIES.find((c) => c.value === category)?.label;
  const selectedJobTitle = jobs?.find((j) => j.id === selectedJobId)?.title;
  const canSubmit = !!category && !!amount && parsedAmount > 0;

  const expenses = useMemo(() => recentExpenses ?? [], [recentExpenses]);
  const recentCount = expenses.length;

  // Glanceable summary derived from the same fetched claims — no extra queries.
  const summary = useMemo(() => {
    let pendingAmount = 0;
    let pendingCount = 0;
    let approvedAmount = 0;
    for (const e of expenses) {
      const s = (e.status || '').toLowerCase();
      if (s === 'pending') {
        pendingAmount += e.amount;
        pendingCount += 1;
      } else if (s === 'approved' || s === 'paid') {
        approvedAmount += e.amount;
      }
    }
    return { pendingAmount, pendingCount, approvedAmount };
  }, [expenses]);

  // Per-status counts for the filter tabs (scoped to recent claims).
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of expenses) {
      const s = (e.status || '').toLowerCase();
      counts[s] = (counts[s] ?? 0) + 1;
    }
    return counts;
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    if (statusFilter === 'all') return expenses;
    return expenses.filter((e) => (e.status || '').toLowerCase() === statusFilter);
  }, [expenses, statusFilter]);

  const filterTabs = STATUS_FILTERS.map((f) => ({
    value: f.value,
    label: f.label,
    count: f.value === 'all' ? recentCount : (statusCounts[f.value] ?? 0),
  }));

  // ───────────────────────── SUBMIT FORM ─────────────────────────
  // Shared form body — rendered full-width on mobile (submit view) and as the
  // left column of the desktop split. No behaviour differs between contexts.
  const submitForm = (
    <div className="space-y-4">
      {/* Amount hero — the figure being claimed */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
        <Eyebrow>Claim amount</Eyebrow>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-elec-yellow tabular-nums leading-none">
            £
          </span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            aria-label="Claim amount in pounds"
            className="flex-1 min-w-0 bg-transparent border-0 p-0 text-3xl font-semibold text-white tabular-nums placeholder:text-white/30 focus:outline-none focus:ring-0 touch-manipulation [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        {selectedCategoryLabel ? (
          <p className="mt-2 text-[12px] text-white/60">
            £{amountPreview} · {selectedCategoryLabel}
            {selectedJobTitle ? ` · ${selectedJobTitle}` : ''}
          </p>
        ) : (
          <p className="mt-2 text-[12px] text-white/40">
            Enter the amount, then choose a category below.
          </p>
        )}
      </div>

      {/* Category */}
      <Field label="Category" required>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Select category…" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            {EXPENSE_CATEGORIES.map((cat) => (
              <SelectItem
                key={cat.value}
                value={cat.value}
                className="text-white focus:bg-white/10 focus:text-white"
              >
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Description */}
      <Field label="Description" hint="Helps your employer approve the claim faster.">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this expense for?"
          aria-label="Description"
          className={cn(textareaClass, 'min-h-[80px]')}
        />
      </Field>

      {/* Job (optional) */}
      <Field label="Charge to job (optional)">
        <Select value={selectedJobId} onValueChange={setSelectedJobId} disabled={jobsLoading}>
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder={jobsLoading ? 'Loading jobs…' : 'No job selected'} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            {jobs?.map((job) => (
              <SelectItem
                key={job.id}
                value={job.id}
                className="text-white focus:bg-white/10 focus:text-white"
              >
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Receipt photo placeholder */}
      <button
        type="button"
        disabled
        className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.12] text-white/60 text-[13px] font-medium disabled:cursor-not-allowed touch-manipulation"
      >
        <Camera className="h-4 w-4" />
        Add receipt photo
        <span className="text-[11px] text-white/40">· Coming soon</span>
      </button>

      {!canSubmit && (amount.length > 0 || category.length > 0) && (
        <p className="text-[11px] text-amber-400/90 leading-snug">
          {!category
            ? 'Choose a category to continue.'
            : 'Enter an amount greater than £0.00 to submit.'}
        </p>
      )}

      {/* Submit */}
      <PrimaryButton
        onClick={handleSubmit}
        disabled={isSubmitting || !canSubmit}
        fullWidth
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Submit £{amountPreview}
          </>
        )}
      </PrimaryButton>
    </div>
  );

  // ───────────────────────── CLAIMS LIST ─────────────────────────
  // Status filters + the recent-claims list. Rendered as the right column on
  // desktop and inside the list view on mobile.
  const claimsList = (
    <div className="space-y-6">
      {/* Status filters */}
      <FilterBar tabs={filterTabs} activeTab={statusFilter} onTabChange={setStatusFilter} />

      {/* Claims list */}
      {filteredExpenses.length === 0 ? (
        <EmptyState
          title="No matching claims"
          description="No recent claims with this status. Try a different filter."
        />
      ) : (
        <ListCard>
          <ListBody>
            {filteredExpenses.map((expense) => (
              <ListRow
                key={expense.id}
                title={
                  <span className="tabular-nums">
                    £{expense.amount.toFixed(2)}
                    <span className="ml-1.5 font-normal text-white/60 capitalize">
                      {expense.category}
                    </span>
                  </span>
                }
                subtitle={
                  <span>
                    {relativeTime(expense.created_at)}
                    {expense.description && expense.description !== expense.category
                      ? ` · ${expense.description}`
                      : ''}
                  </span>
                }
                trailing={getStatusPill(expense.status)}
              />
            ))}
          </ListBody>
        </ListCard>
      )}
    </div>
  );

  // Full-width glanceable summary across recent claims.
  const summaryStrip = (
    <StatStrip
      columns={2}
      stats={[
        {
          label: 'Awaiting approval',
          value: `£${fmt(summary.pendingAmount)}`,
          accent: true,
          sub:
            summary.pendingCount === 1
              ? '1 recent claim pending'
              : `${summary.pendingCount} recent claims pending`,
        },
        {
          label: 'Approved / paid',
          value: `£${fmt(summary.approvedAmount)}`,
          tone: 'emerald',
          sub: 'Across recent claims',
        },
      ]}
    />
  );

  // ───────────────────────── MOBILE SUBMIT VIEW ─────────────────────────
  // On mobile the form is a dedicated view reached via "New claim". On lg the
  // page never enters this branch (the form lives in the desktop split below).
  if (view === 'submit') {
    return (
      <WorkerToolPage
        eyebrow="Claims"
        title="Submit expense"
        description="Log a claim for reimbursement and track its approval."
        actions={
          <SecondaryButton
            size="sm"
            onClick={() => {
              resetForm();
              setView('list');
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Claims
          </SecondaryButton>
        }
      >
        <SuccessCheckmark show={showSuccess} />
        <div className="lg:hidden">{submitForm}</div>
      </WorkerToolPage>
    );
  }

  // ───────────────────────── LIST / SPLIT VIEW ─────────────────────────
  return (
    <WorkerToolPage
      eyebrow="Claims"
      title="Expenses"
      description="Submit claims for reimbursement and track their approval status."
      actions={
        // "New claim" toggles the mobile submit view; on desktop the form is
        // always visible in the split, so the action is hidden there.
        <span className="lg:hidden">
          <PrimaryButton size="sm" onClick={() => setView('submit')}>
            <Plus className="h-4 w-4 mr-1.5" />
            New claim
          </PrimaryButton>
        </span>
      }
    >
      <SuccessCheckmark show={showSuccess} />

      {isLoading ? (
        <LoadingBlocks />
      ) : recentCount === 0 ? (
        <div className="space-y-8">
          <EmptyState
            title="No claims yet"
            description="Submitted expenses appear here with their approval status."
            action="Submit your first claim"
            onAction={() => setView('submit')}
          />
          {/* Desktop: form is always available even with no claims yet */}
          <div className="hidden lg:block max-w-xl">
            <SectionHeader eyebrow="New claim" title="Submit expense" />
            <div className="mt-4">{submitForm}</div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {/* Full-width glanceable summary */}
          {summaryStrip}

          {/* Desktop: form left, claims right. Mobile: claims only (form via view toggle). */}
          <div className="lg:hidden">{claimsList}</div>
          <SplitLayout
            ratio="1-1"
            className="hidden lg:grid"
            primary={
              <div>
                <SectionHeader eyebrow="New claim" title="Submit expense" />
                <div className="mt-4">{submitForm}</div>
              </div>
            }
            secondary={
              <div>
                <SectionHeader eyebrow="Recent" title="Your claims" />
                <div className="mt-4">{claimsList}</div>
              </div>
            }
          />
        </div>
      )}
    </WorkerToolPage>
  );
}
