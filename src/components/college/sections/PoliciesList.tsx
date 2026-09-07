import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { useCollegePolicies, type PolicyRow, type PolicyStatus } from '@/hooks/useCollegePolicies';

/* ==========================================================================
   PoliciesList — institution policies list.

   Hub work-list rows: rule · title · category / code / version / review /
   acknowledgements · status word · chevron. A review that is overdue is the
   red word; a draft or a review due within 30 days is volt; live and
   archived are white.
   ========================================================================== */

interface Props {
  search: string;
  onOpen: (policyId: string) => void;
  onAdd: () => void;
}

type Filter = 'all' | 'action' | 'live' | 'draft' | 'archived';

const STATUS_LABEL: Record<PolicyStatus, string> = {
  draft: 'Draft',
  live: 'Live',
  archived: 'Archived',
};

function daysUntil(date: string): number {
  const d = new Date(date);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

function reviewText(iso: string | null): string {
  if (!iso) return 'no review date';
  const days = daysUntil(iso);
  if (days < 0) return `review ${Math.abs(days)}d overdue`;
  if (days === 0) return 'review due today';
  if (days <= 30) return `review in ${days}d`;
  return `review ${new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

function isReviewDue(iso: string | null): boolean {
  if (!iso) return false;
  return daysUntil(iso) <= 30;
}

function isReviewOverdue(iso: string | null): boolean {
  if (!iso) return false;
  return daysUntil(iso) <= 0;
}

const LIST_CARD =
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x';

export function PoliciesList({ search, onOpen, onAdd }: Props) {
  const { policies, loading } = useCollegePolicies();
  const [filter, setFilter] = useState<Filter>('all');

  // Archived policies are retired — they're never part of "action needed",
  // even if their review date is overdue.
  const needsAction = (p: PolicyRow) =>
    p.status !== 'archived' && (p.status === 'draft' || isReviewDue(p.review_due_at));

  const counts = useMemo(() => {
    const c = { all: 0, action: 0, live: 0, draft: 0, archived: 0 };
    for (const p of policies) {
      c.all += 1;
      if (needsAction(p)) c.action += 1;
      c[p.status] += 1;
    }
    return c;
  }, [policies]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return policies.filter((p) => {
      if (filter === 'action') {
        if (!needsAction(p)) return false;
      } else if (filter !== 'all' && p.status !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.code ?? '').toLowerCase().includes(q)
      );
    });
  }, [policies, filter, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  if (policies.length === 0) {
    return (
      <div className={cn(LIST_CARD, 'px-4 py-5 sm:px-5', CARD_SURFACE)}>
        <div className="text-[14px] font-semibold text-white">No policies yet</div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          Add your safeguarding, Prevent, equality and other institutional policies. Version
          history and acknowledgement logs are kept automatically.
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="-ml-2 mt-2 flex h-11 items-center px-2 text-[12.5px] font-bold text-elec-yellow transition-colors touch-manipulation"
        >
          Add the first policy
        </button>
      </div>
    );
  }

  const allChips: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'action', label: 'Action needed', count: counts.action },
    { value: 'live', label: 'Live', count: counts.live },
    { value: 'draft', label: 'Drafts', count: counts.draft },
    { value: 'archived', label: 'Archived', count: counts.archived },
  ];
  const filterChips = allChips.filter((c) => c.value !== 'archived' || c.count > 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filterChips.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setFilter(c.value)}
            className={cn(
              chipBase,
              'px-4 text-[12.5px]',
              c.value === filter ? chipOn : chipOff,
              c.value === 'action' && c.count > 0 && c.value !== filter && 'text-elec-yellow'
            )}
          >
            {c.label}
            <span className="ml-1.5 tabular-nums">{c.count}</span>
          </button>
        ))}
      </div>

      <div className={cn(LIST_CARD, CARD_SURFACE)}>
        {filtered.length === 0 ? (
          <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
            {search.trim() ? `No policies match “${search}”.` : 'No policies in this filter.'}
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10]">
            {filtered.map((p) => (
              <PolicyRowItem key={p.id} policy={p} onOpen={onOpen} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function PolicyRowItem({ policy, onOpen }: { policy: PolicyRow; onOpen: (id: string) => void }) {
  const retired = policy.status === 'archived';
  const overdue = !retired && isReviewOverdue(policy.review_due_at);
  const due = !retired && isReviewDue(policy.review_due_at);
  const isDraft = policy.status === 'draft';

  const statusWord = overdue
    ? 'Review overdue'
    : isDraft
      ? 'Draft'
      : due
        ? 'Review due'
        : STATUS_LABEL[policy.status];
  const statusTone = overdue ? 'text-red-300' : isDraft || due ? 'text-elec-yellow' : 'text-white';

  const ackText =
    policy.requires_acknowledgement && policy.status === 'live'
      ? `${policy.ack_count}/${policy.ack_target} acknowledged`
      : null;
  const owner =
    policy.owner_role && policy.owner_role.trim() !== ''
      ? policy.owner_role.replace(/_/g, ' ')
      : null;

  const reason = [
    policy.category,
    policy.code,
    `v${policy.version}`,
    reviewText(policy.review_due_at),
    ackText,
    owner,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(policy.id)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            overdue || isDraft || due ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {policy.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <span className={cn('shrink-0 text-[12px] font-semibold', statusTone)}>{statusWord}</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}
