import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import {
  useStaffComplianceList,
  isOnboarding,
  type ComputedStatus,
  type StaffComplianceRow,
} from '@/hooks/useStaffComplianceList';

/* ==========================================================================
   StaffComplianceList — staff compliance roll-up.

   One row per staff member in the hub work-list language: rule · name ·
   why · status word · chevron. Two groups — Action needed, then All in date
   (closed by default while there is anything to action). Colour only where
   it encodes state: expired is the red word, expiring / missing / awaiting
   verification are volt text, in date is white.
   ========================================================================== */

type RoleFilter = 'all' | 'tutor' | 'assessor' | 'iqa' | 'support' | 'action';

const STATUS_LABEL: Record<ComputedStatus, string> = {
  expired: 'Expired',
  missing: 'Missing docs',
  expiring: 'Expiring',
  valid: 'In date',
  pending_verification: 'Awaiting verification',
};

function statusTone(s: ComputedStatus): string {
  if (s === 'expired') return 'text-red-300';
  if (s === 'valid') return 'text-white';
  return 'text-elec-yellow';
}

function daysUntil(date: string): number {
  const d = new Date(date);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

function formatNextExpiry(iso: string | null): string {
  if (!iso) return '';
  const days = daysUntil(iso);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'expires today';
  if (days === 1) return 'expires tomorrow';
  if (days <= 60) return `${days}d to expiry`;
  return `next expiry ${new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

function dept(s: string | null): string {
  const t = (s ?? '').trim();
  return t.length > 0 ? t : '';
}

function roleFlags(row: StaffComplianceRow): string[] {
  const flags: string[] = [];
  if (row.is_dsl) flags.push('DSL');
  else if (row.is_deputy_dsl) flags.push('Deputy DSL');
  if (row.is_prevent_lead) flags.push('Prevent');
  if (row.is_h_and_s_lead) flags.push('H&S');
  if (row.is_quality_nominee) flags.push('Quality nominee');
  if (row.is_mental_health_lead) flags.push('Mental health');
  return flags;
}

interface Props {
  search: string;
  onOpen: (staffId: string) => void;
}

const LIST_CARD =
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x';

export function StaffComplianceList({ search, onOpen }: Props) {
  const { rows, loading } = useStaffComplianceList();
  const [filter, setFilter] = useState<RoleFilter>('all');
  const [showAllInDate, setShowAllInDate] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (r.archived_at) return false;
      if (filter === 'action' && r.worst_status === 'valid') return false;
      if (filter !== 'all' && filter !== 'action' && r.role.toLowerCase() !== filter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        dept(r.department).toLowerCase().includes(q)
      );
    });
  }, [rows, filter, search]);

  const counts = useMemo(() => {
    const c = { all: 0, action: 0, tutor: 0, assessor: 0, iqa: 0, support: 0 };
    for (const r of rows) {
      if (r.archived_at) continue;
      c.all += 1;
      if (r.worst_status !== 'valid') c.action += 1;
      const role = r.role.toLowerCase() as keyof typeof c;
      if (role in c) c[role] += 1;
    }
    return c;
  }, [rows]);

  const allChips: { value: RoleFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'action', label: 'Action needed', count: counts.action },
    { value: 'tutor', label: 'Tutors', count: counts.tutor },
    { value: 'assessor', label: 'Assessors', count: counts.assessor },
    { value: 'iqa', label: 'IQAs', count: counts.iqa },
    { value: 'support', label: 'Support', count: counts.support },
  ];
  const filterChips = allChips.filter(
    (c) => c.value === 'all' || c.value === 'action' || c.count > 0
  );

  const grouped = useMemo(() => {
    const action: StaffComplianceRow[] = [];
    const valid: StaffComplianceRow[] = [];
    for (const r of filtered) {
      if (r.worst_status === 'valid') valid.push(r);
      else action.push(r);
    }
    return { action, valid };
  }, [filtered]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className={cn(LIST_CARD, 'px-4 py-5 sm:px-5', CARD_SURFACE)}>
        <div className="text-[14px] font-semibold text-white">No staff yet</div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          Add your tutors, assessors and support staff under People, then come back here to track
          DBS, qualifications and CPD.
        </p>
      </div>
    );
  }

  const showTriage = filter === 'all' && search.trim().length === 0;
  const collapsed = !showAllInDate && grouped.action.length > 0;

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

      {filtered.length === 0 ? (
        <div className={cn(LIST_CARD, 'px-4 py-5 sm:px-5', CARD_SURFACE)}>
          <div className="text-[14px] font-semibold text-white">Nothing matches</div>
          <p className="mt-1 text-[12.5px] leading-snug text-white">
            {search.trim()
              ? `No staff match “${search}”. Clear the search or pick a different filter.`
              : 'No staff in this filter.'}
          </p>
        </div>
      ) : showTriage ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-4">
              <span className="text-[13px] font-semibold text-white">Action needed</span>
              <span
                className={cn(
                  'text-[11px] font-semibold tabular-nums',
                  grouped.action.length > 0 ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {grouped.action.length === 0
                  ? 'Nothing outstanding'
                  : `${grouped.action.length} staff`}
              </span>
            </div>
            <div className={cn(LIST_CARD, CARD_SURFACE)}>
              {grouped.action.length === 0 ? (
                <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
                  Every required record is in date.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {grouped.action.map((r) => (
                    <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
                  ))}
                </ul>
              )}
            </div>
          </div>

          {grouped.valid.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-end justify-between gap-4">
                <span className="text-[13px] font-semibold text-white">
                  All in date
                  <span className="ml-2 text-[11px] font-semibold tabular-nums">
                    {grouped.valid.length}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllInDate((v) => !v)}
                  className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
                >
                  {collapsed ? 'Show' : 'Hide'}
                </button>
              </div>
              {!collapsed && (
                <div className={cn(LIST_CARD, CARD_SURFACE)}>
                  <ul className="divide-y divide-white/[0.10]">
                    {grouped.valid.map((r) => (
                      <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={cn(LIST_CARD, CARD_SURFACE)}>
          <ul className="divide-y divide-white/[0.10]">
            {filtered.map((r) => (
              <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function StaffRow({ row, onOpen }: { row: StaffComplianceRow; onOpen: (id: string) => void }) {
  const onboarding = isOnboarding(row);
  const status: ComputedStatus = onboarding ? 'missing' : row.worst_status;
  const inDate = row.totals.valid + row.totals.expiring;
  const flags = roleFlags(row);
  const department = dept(row.department);

  const segments = onboarding
    ? ['just added — start uploading documents']
    : [
        row.totals.expired > 0 ? `${row.totals.expired} expired` : null,
        row.totals.missing > 0 ? `${row.totals.missing} missing` : null,
        row.totals.expiring > 0 ? `${row.totals.expiring} expiring` : null,
        row.totals.pending_verification > 0
          ? `${row.totals.pending_verification} awaiting verification`
          : null,
        row.next_expiry && row.totals.expiring > 0 ? formatNextExpiry(row.next_expiry) : null,
      ].filter(Boolean);

  const roleLabel = row.role.replace(/_/g, ' ');
  const reason = [
    roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1),
    department || null,
    ...flags,
    row.totals.total > 0 ? `${inDate}/${row.totals.total} in date` : null,
    ...segments,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(row.college_staff_id)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            status === 'expired' || status === 'missing' ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {row.name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <span className={cn('shrink-0 text-[12px] font-semibold', statusTone(status))}>
          {onboarding ? 'Awaiting setup' : STATUS_LABEL[status]}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}
