import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePolicyAckLog, type AckLogRow, type AckStatus } from '@/hooks/usePolicyAckLog';
import { useToast } from '@/hooks/use-toast';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { QBTN, QCARD, QCHIP_ROW, QLIST } from '@/components/college/quality/QualityHubKit';
import { keyLabel } from '@/lib/college/labels';

/* ==========================================================================
   AcknowledgementLogPanel — rendered on the policy detail page. Shows every
   staff member's sign-off status for the current version. The audit pack
   foundation: who has signed, who hasn't, who needs to re-sign.

   8 Oct 2026: restyled to the College Hub kit (all text white, chips with
   border and text only), states said in words ("Not signed", "Needs to
   re-sign"), and "Copy names to chase" puts everyone still to sign on the
   clipboard for a message.
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
  outdated: 'Needs to re-sign',
  outstanding: 'Not signed',
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
  const { toast } = useToast();

  const counts = useMemo(() => {
    const c = { all: rows.length, signed: 0, outdated: 0, outstanding: 0 };
    for (const r of rows) c[r.status] += 1;
    return c;
  }, [rows]);

  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter]
  );

  const chase = rows.filter((r) => r.status !== 'signed');
  const copyChase = async () => {
    const text = chase.map((r) => r.name).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `Copied ${chase.length} ${chase.length === 1 ? 'name' : 'names'}`,
        description: 'Paste them into a message to chase sign-off.',
      });
    } catch {
      toast({
        title: 'Could not copy',
        description: 'Your browser blocked the clipboard.',
        variant: 'destructive',
      });
    }
  };

  if (!requiresAcknowledgement) {
    return (
      <Section title="Sign-off log">
        <div className={QCARD}>
          <p className="max-w-prose text-[13px] leading-relaxed text-white">
            This policy does not ask staff to acknowledge it. Turn on Requires acknowledgement in
            its settings to start tracking who has read and signed it.
          </p>
        </div>
      </Section>
    );
  }

  if (status === 'draft') {
    return (
      <Section title="Sign-off log">
        <div className={QCARD}>
          <p className="max-w-prose text-[13px] leading-relaxed text-white">
            Sign-off starts when it is published. Publish it and every member of staff is asked to
            read and sign it on their home screen.
          </p>
        </div>
      </Section>
    );
  }

  // Archived: still show historical sign-offs (key audit evidence) with a
  // clear note that the policy is retired.

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
        <div className={QCARD}>
          <p className="max-w-prose text-[13px] leading-relaxed text-white">
            No staff in your college yet. Add tutors under People and they appear here.
          </p>
        </div>
      </Section>
    );
  }

  const filterChips: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'outstanding', label: 'Not signed', count: counts.outstanding },
    { value: 'outdated', label: 'Signed an old version', count: counts.outdated },
    { value: 'signed', label: 'Signed', count: counts.signed },
  ];

  return (
    <Section
      title="Sign-off log"
      sub={
        counts.signed === counts.all
          ? `Everyone has signed version ${currentVersion}.`
          : `${counts.signed} of ${counts.all} staff have signed version ${currentVersion}; ${chase.length} still to sign.`
      }
      action={
        chase.length > 0 && status !== 'archived' ? (
          <button type="button" onClick={() => void copyChase()} className={QBTN}>
            Copy names to chase
          </button>
        ) : undefined
      }
    >
      {status === 'archived' && (
        <div className={cn(QCARD, 'mb-3')}>
          <p className="text-[13px] leading-relaxed text-white">
            <span className="font-semibold">Archived. </span>
            This policy is retired. The list below is kept as evidence of who signed it; new staff
            do not need to.
          </p>
        </div>
      )}

      <div className={cn(QCHIP_ROW, 'mb-3')}>
        {filterChips.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setFilter(c.value)}
            className={cn(
              chipCn(c.value === filter),
              'inline-flex items-center gap-1.5 whitespace-nowrap'
            )}
          >
            {c.label}
            <span className="tabular-nums">{c.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={QCARD}>
          <p className="text-[13px] leading-relaxed text-white">
            {filter === 'signed'
              ? `Nobody has signed version ${currentVersion} yet. Chase the not signed list.`
              : 'No one in this filter.'}
          </p>
        </div>
      ) : (
        <div className={QLIST}>
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
  sub,
  action,
  children,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
            {title}
          </h2>
          {sub && <p className="mt-1 text-[13px] text-white">{sub}</p>}
        </div>
        {action}
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
  const role =
    row.role === 'iqa' ? 'IQA' : row.role.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="flex min-h-[60px] flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback className="bg-white/[0.08] text-[12px] font-semibold text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-white">{row.name}</div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-white">
          <span className="truncate">{keyLabel(role)}</span>
          {row.department && <span className="truncate">· {row.department}</span>}
          {!row.user_id && (
            <span className="text-orange-300">
              · No login linked, so they cannot sign in the app
            </span>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span
          className={cn(
            'inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-semibold',
            tone === 'emerald'
              ? 'border-emerald-400/60 text-emerald-300'
              : 'border-orange-400/60 text-orange-300'
          )}
        >
          {STATUS_LABEL[row.status]}
        </span>
        <div className="mt-1 text-[12px] tabular-nums text-white">
          {row.status === 'signed'
            ? row.signed_at &&
              new Date(row.signed_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : row.status === 'outdated'
              ? `Signed version ${row.signed_version}${
                  row.signed_at
                    ? ` on ${new Date(row.signed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                    : ''
                }`
              : `Not signed version ${currentVersion}`}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className={cn(QLIST, 'animate-pulse')}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
          <div className="h-9 w-9 shrink-0 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
          </div>
          <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
