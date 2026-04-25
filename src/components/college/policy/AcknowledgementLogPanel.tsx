import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePolicyAckLog, type AckLogRow, type AckStatus } from '@/hooks/usePolicyAckLog';

/* ==========================================================================
   AcknowledgementLogPanel — rendered on the policy detail page. Shows every
   staff member's sign-off status for the current version. The audit pack
   foundation: who has signed, who hasn't, who needs to re-sign.
   ========================================================================== */

interface Props {
  policyId: string;
  currentVersion: number;
  requiresAcknowledgement: boolean;
  status: 'draft' | 'live' | 'archived';
}

const STATUS_TONE: Record<AckStatus, 'emerald' | 'amber' | 'red'> = {
  signed: 'emerald',
  outdated: 'amber',
  outstanding: 'red',
};

const STATUS_LABEL: Record<AckStatus, string> = {
  signed: 'Signed',
  outdated: 'Outdated',
  outstanding: 'Outstanding',
};

type Filter = 'all' | AckStatus;

export function AcknowledgementLogPanel({
  policyId,
  currentVersion,
  requiresAcknowledgement,
  status,
}: Props) {
  const { rows, loading } = usePolicyAckLog(policyId, currentVersion);
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const c = { all: rows.length, signed: 0, outdated: 0, outstanding: 0 };
    for (const r of rows) c[r.status] += 1;
    return c;
  }, [rows]);

  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter]
  );

  if (!requiresAcknowledgement) {
    return (
      <Section title="Sign-off log">
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <p className="text-[12.5px] text-white/65 leading-relaxed max-w-prose">
            This policy doesn't require staff acknowledgement. Toggle{' '}
            <span className="text-white">"Requires acknowledgement"</span> in Settings to start
            tracking sign-off.
          </p>
        </div>
      </Section>
    );
  }

  if (status === 'draft') {
    return (
      <Section title="Sign-off log">
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <p className="text-[12.5px] text-white/65 leading-relaxed max-w-prose">
            Acknowledgement starts after publication. Publish v1 to surface this on every staff
            member's home.
          </p>
        </div>
      </Section>
    );
  }

  // Archived: still show historical sign-offs (key audit evidence) with a
  // clear disclaimer that the policy is retired.

  if (loading && rows.length === 0) {
    return (
      <Section title="Sign-off log">
        <Skeleton />
      </Section>
    );
  }

  if (rows.length === 0) {
    return (
      <Section title="Sign-off log">
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <p className="text-[12.5px] text-white/65 leading-relaxed max-w-prose">
            No staff in your college yet. Add tutors via{' '}
            <span className="text-white">People → Tutors</span> and they'll appear here.
          </p>
        </div>
      </Section>
    );
  }

  const filterChips: {
    value: Filter;
    label: string;
    count: number;
    tone: 'green' | 'amber' | 'red' | 'neutral';
  }[] = [
    { value: 'all', label: 'All', count: counts.all, tone: 'neutral' },
    { value: 'outstanding', label: 'Outstanding', count: counts.outstanding, tone: 'red' },
    { value: 'outdated', label: 'Outdated', count: counts.outdated, tone: 'amber' },
    { value: 'signed', label: 'Signed', count: counts.signed, tone: 'green' },
  ];

  return (
    <Section
      title="Sign-off log"
      eyebrow={status === 'archived' ? 'Audit · historical' : 'Audit'}
      sub={`${counts.signed}/${counts.all} signed for v${currentVersion}`}
    >
      {status === 'archived' && (
        <div className="mb-3 rounded-2xl border border-blue-500/25 bg-blue-500/[0.04] px-4 py-3">
          <p className="text-[11.5px] text-blue-200/85 leading-relaxed">
            <span className="font-semibold uppercase tracking-[0.06em] mr-2 text-blue-200">
              Archived
            </span>
            This policy is retired. The sign-off list below is historical evidence — new staff don't
            need to sign it.
          </p>
        </div>
      )}

      {/* Filter chips */}
      <div className="-mx-1 overflow-x-auto scrollbar-hide mb-3">
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
                        : c.tone === 'green'
                          ? 'bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-200'
                          : 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/80 hover:text-white hover:border-white/[0.18]'
                )}
              >
                {c.label}
                <span
                  className={cn(
                    'tabular-nums text-[10.5px] px-1.5 py-0.5 rounded-full',
                    active && c.tone === 'neutral'
                      ? 'bg-black/15 text-black/70'
                      : active && c.tone === 'red'
                        ? 'bg-red-500/20 text-red-200'
                        : active && c.tone === 'amber'
                          ? 'bg-amber-500/20 text-amber-200'
                          : active && c.tone === 'green'
                            ? 'bg-emerald-500/20 text-emerald-200'
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
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 text-center">
          <p className="text-[12.5px] text-white/65 leading-relaxed">
            {filter === 'signed'
              ? 'Nobody has signed v' + currentVersion + ' yet — chase the outstanding list.'
              : 'No one in this filter.'}
          </p>
        </div>
      ) : (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
          {filtered.map((r) => (
            <AckRow key={r.staff_id} row={r} currentVersion={currentVersion} />
          ))}
        </div>
      )}
    </Section>
  );
}

/* ──────────────────────────────────────────────────────── */

function Section({
  title,
  eyebrow,
  sub,
  children,
}: {
  title: string;
  eyebrow?: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-3">
        <div>
          {eyebrow && (
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {eyebrow}
            </div>
          )}
          <h2 className="mt-1 text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight">
            {title}
          </h2>
        </div>
        {sub && <div className="text-[11.5px] tabular-nums text-white/55">{sub}</div>}
      </div>
      {children}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function AckRow({ row, currentVersion }: { row: AckLogRow; currentVersion: number }) {
  const tone = STATUS_TONE[row.status];
  const initials = row.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const ringClass =
    tone === 'emerald'
      ? 'ring-emerald-500/40'
      : tone === 'amber'
        ? 'ring-amber-500/40'
        : 'ring-red-500/40';

  return (
    <div className="px-4 sm:px-5 py-3.5 flex items-center gap-3 flex-wrap">
      <Avatar className={cn('h-9 w-9 ring-1 shrink-0', ringClass)}>
        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-[11px] font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-white truncate">{row.name}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55">
          <span className="capitalize truncate">{row.role.replace(/_/g, ' ')}</span>
          {row.department && (
            <>
              <span className="text-white/25">·</span>
              <span className="truncate">{row.department}</span>
            </>
          )}
          {!row.user_id && (
            <>
              <span className="text-white/25">·</span>
              <span className="text-amber-300/85">No login linked</span>
            </>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <StatusBadge status={row.status} />
        <div className="mt-1 text-[10.5px] text-white/55 tabular-nums">
          {row.status === 'signed' ? (
            row.signed_at && (
              <>
                {new Date(row.signed_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </>
            )
          ) : row.status === 'outdated' ? (
            <>
              Signed v{row.signed_version} ·{' '}
              {row.signed_at
                ? new Date(row.signed_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })
                : ''}
            </>
          ) : (
            <>Never signed v{currentVersion}</>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AckStatus }) {
  const tone = STATUS_TONE[status];
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2 rounded-full border text-[10.5px] font-semibold tracking-[0.04em] uppercase',
        tone === 'emerald' && 'bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-200',
        tone === 'amber' && 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200',
        tone === 'red' && 'bg-red-500/[0.08] border-red-500/30 text-red-200'
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04] animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="px-4 sm:px-5 py-3.5 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/[0.06] shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
            <div className="h-2 w-1/2 bg-white/[0.04] rounded" />
          </div>
          <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
