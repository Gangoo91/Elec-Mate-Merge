import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { PeopleListRow, type AccentTone } from '@/components/college/primitives/PeopleListRow';
import { EmptyState, ListCard, type Tone } from '@/components/college/primitives';
import { useCollegePolicies, type PolicyRow, type PolicyStatus } from '@/hooks/useCollegePolicies';

/* ==========================================================================
   PoliciesList — institution policies list. Triage: Action needed (drafts +
   review-due) over Live policies. Mobile-first PeopleListRow pattern.
   ========================================================================== */

interface Props {
  search: string;
  onOpen: (policyId: string) => void;
  onAdd: () => void;
}

const STATUS_LABEL: Record<PolicyStatus, string> = {
  draft: 'Draft',
  live: 'Live',
  archived: 'Archived',
};

const STATUS_TONE: Record<PolicyStatus, Tone> = {
  draft: 'amber',
  live: 'green',
  archived: 'blue',
};

const STATUS_ACCENT: Record<PolicyStatus, AccentTone> = {
  draft: 'amber',
  live: 'emerald',
  archived: 'blue',
};

function daysUntil(date: string): number {
  const d = new Date(date);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

function formatReview(iso: string | null): {
  text: string;
  tone: 'red' | 'amber' | 'white';
} {
  if (!iso) return { text: 'No review date', tone: 'white' };
  const days = daysUntil(iso);
  if (days < 0) return { text: `Review ${Math.abs(days)}d overdue`, tone: 'red' };
  if (days === 0) return { text: 'Review due today', tone: 'red' };
  if (days <= 30) return { text: `Review in ${days}d`, tone: 'amber' };
  return {
    text: `Review ${new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`,
    tone: 'white',
  };
}

function isReviewDue(iso: string | null): boolean {
  if (!iso) return false;
  return daysUntil(iso) <= 30;
}

export function PoliciesList({ search, onOpen, onAdd }: Props) {
  const { policies, loading } = useCollegePolicies();
  const [filter, setFilter] = useState<'all' | 'action' | 'live' | 'draft' | 'archived'>('all');

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
      <div className="space-y-3">
        <FilterChipSkeletons />
        <ListCard>
          {Array.from({ length: 4 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </ListCard>
      </div>
    );
  }

  if (policies.length === 0) {
    return (
      <EmptyState
        title="No policies yet"
        description="Add your safeguarding, Prevent, equality and other institutional policies. Version history and acknowledgement logs are kept automatically."
        action="Add policy"
        onAction={onAdd}
      />
    );
  }

  const filterChips: {
    value: typeof filter;
    label: string;
    count: number;
    tone?: 'red' | 'amber';
  }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'action', label: 'Action needed', count: counts.action, tone: 'red' },
    { value: 'live', label: 'Live', count: counts.live },
    { value: 'draft', label: 'Drafts', count: counts.draft, tone: 'amber' },
    counts.archived > 0
      ? { value: 'archived' as const, label: 'Archived', count: counts.archived }
      : null,
  ].filter(Boolean) as {
    value: typeof filter;
    label: string;
    count: number;
    tone?: 'red' | 'amber';
  }[];

  return (
    <div className="space-y-4">
      <div className="-mx-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1.5 px-1 min-w-max">
          {filterChips.map((c) => {
            const active = c.value === filter;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setFilter(c.value)}
                className={cn(
                  'h-9 px-3.5 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation whitespace-nowrap border inline-flex items-center gap-1.5',
                  active
                    ? c.tone === 'red'
                      ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                      : c.tone === 'amber'
                        ? 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                        : 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/80 hover:text-white hover:border-white/[0.18]'
                )}
              >
                {c.label}
                <span
                  className={cn(
                    'tabular-nums text-[10.5px] px-1.5 py-0.5 rounded-full',
                    active && c.tone === 'red'
                      ? 'bg-red-500/20 text-red-200'
                      : active && c.tone === 'amber'
                        ? 'bg-amber-500/20 text-amber-200'
                        : active
                          ? 'bg-black/15 text-black/70'
                          : 'bg-white/[0.08] text-white/60'
                  )}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing matches"
          description={
            search.trim() ? `No policies match “${search}”.` : 'No policies in this filter.'
          }
        />
      ) : (
        <ListCard>
          {filtered.map((p) => (
            <PolicyRowItem key={p.id} policy={p} onOpen={onOpen} />
          ))}
        </ListCard>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function PolicyRowItem({ policy, onOpen }: { policy: PolicyRow; onOpen: (id: string) => void }) {
  const review = formatReview(policy.review_due_at);
  const reviewDue = isReviewDue(policy.review_due_at);
  const isDraft = policy.status === 'draft';
  const accent: AccentTone =
    isDraft || reviewDue ? (reviewDue ? 'red' : 'amber') : STATUS_ACCENT[policy.status];

  const ackPct =
    policy.requires_acknowledgement && policy.ack_target > 0
      ? Math.round((policy.ack_count / policy.ack_target) * 100)
      : null;

  return (
    <PeopleListRow
      id={policy.id}
      lead={{
        kind: 'initials',
        text: policy.title
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
          .toUpperCase(),
        tone: policy.status === 'live' ? 'emerald' : policy.status === 'draft' ? 'amber' : 'blue',
      }}
      title={<span className="text-white font-medium truncate">{policy.title}</span>}
      subtitle={
        <span className="truncate">
          <span className="capitalize">{policy.category}</span>
          {policy.code && ` · ${policy.code}`}
          {' · '}v{policy.version}
        </span>
      }
      meta={
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11.5px] tabular-nums">
          <span
            className={cn(
              review.tone === 'red'
                ? 'text-red-300'
                : review.tone === 'amber'
                  ? 'text-amber-300'
                  : 'text-white/65'
            )}
          >
            {review.text}
          </span>
          {policy.requires_acknowledgement && policy.status === 'live' && (
            <>
              <span className="text-white/25">·</span>
              <span className="text-white/65">
                <span
                  className={cn(
                    ackPct !== null && ackPct >= 100
                      ? 'text-emerald-300 font-medium'
                      : 'text-white font-medium'
                  )}
                >
                  {policy.ack_count}/{policy.ack_target}
                </span>{' '}
                acknowledged
              </span>
            </>
          )}
          {policy.owner_role && policy.owner_role.trim() !== '' && (
            <>
              <span className="text-white/25">·</span>
              <span className="text-white/55 capitalize">
                {policy.owner_role.replace(/_/g, ' ')}
              </span>
            </>
          )}
        </div>
      }
      status={{
        label: STATUS_LABEL[policy.status],
        tone: STATUS_TONE[policy.status],
      }}
      accent={accent}
      onOpen={() => onOpen(policy.id)}
      actions={[{ label: 'Open', onClick: () => onOpen(policy.id) }]}
    />
  );
}

/* ──────────────────────────────────────────────────────── */

function FilterChipSkeletons() {
  return (
    <div className="flex items-center gap-1.5 px-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-9 w-20 rounded-full bg-white/[0.04] border border-white/[0.06] animate-pulse"
        />
      ))}
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 sm:px-6 py-4 border-b border-white/[0.04] last:border-b-0 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-white/[0.06] shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
        <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
        <div className="h-2 w-2/3 rounded bg-white/[0.04]" />
      </div>
      <div className="h-6 w-16 rounded-full bg-white/[0.04] shrink-0" />
    </div>
  );
}
