import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { PeopleListRow, type AccentTone } from '@/components/college/primitives/PeopleListRow';
import { EmptyState, ListCard, type Tone } from '@/components/college/primitives';
import {
  useStaffComplianceList,
  isOnboarding,
  type ComputedStatus,
  type StaffComplianceRow,
} from '@/hooks/useStaffComplianceList';

/* ==========================================================================
   StaffComplianceList — staff compliance roll-up.
   Mobile-first editorial pattern. Two sections (Action needed / All in date)
   each independently collapsible. Per-row:
     · DSL / Prevent / H&S role chips
     · Compact mobile meta + full desktop meta
     · Tone-graded donut ring on the right (% in date)
     · Onboarding tone for new staff with no records yet
   ========================================================================== */

type RoleFilter = 'all' | 'tutor' | 'assessor' | 'iqa' | 'support' | 'action';

const STATUS_ACCENT: Record<ComputedStatus, AccentTone> = {
  expired: 'red',
  missing: 'blue',
  expiring: 'amber',
  valid: 'emerald',
  pending_verification: 'purple',
};

const STATUS_TONE: Record<ComputedStatus, Tone> = {
  expired: 'red',
  missing: 'blue',
  expiring: 'amber',
  valid: 'green',
  pending_verification: 'purple',
};

const STATUS_LABEL: Record<ComputedStatus, string> = {
  expired: 'Action needed',
  missing: 'Missing docs',
  expiring: 'Expiring soon',
  valid: 'All in date',
  pending_verification: 'Awaiting verification',
};

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
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  if (days <= 60) return `${days}d to expiry`;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function dept(s: string | null): string {
  const t = (s ?? '').trim();
  return t.length > 0 ? t : '';
}

interface Props {
  search: string;
  onOpen: (staffId: string) => void;
}

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

  const filterChips: { value: RoleFilter; label: string; count: number; tone?: 'red' }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'action', label: 'Action needed', count: counts.action, tone: 'red' },
    { value: 'tutor', label: 'Tutors', count: counts.tutor },
    { value: 'assessor', label: 'Assessors', count: counts.assessor },
    { value: 'iqa', label: 'IQAs', count: counts.iqa },
    { value: 'support', label: 'Support', count: counts.support },
  ].filter((c) => c.value === 'all' || c.value === 'action' || c.count > 0);

  // Triage groups (only when not searching/filtering by action — those views
  // already show a single homogeneous list).
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

  if (rows.length === 0) {
    return (
      <EmptyState
        title="No staff yet"
        description="Add your tutors, assessors and support staff in the People → Tutors section, then come back here to track DBS, qualifications and CPD."
      />
    );
  }

  const showTriage = filter === 'all' && search.trim().length === 0;

  return (
    <div className="space-y-4">
      {/* Filter chip row — horizontal scroll on mobile if needed */}
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
                      : 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:text-white hover:border-white/[0.18]'
                )}
              >
                {c.label}
                <span
                  className={cn(
                    'tabular-nums text-[10.5px] px-1.5 py-0.5 rounded-full',
                    active && c.tone !== 'red'
                      ? 'bg-black/15 text-black/70'
                      : active
                        ? 'bg-red-500/20 text-red-200'
                        : 'bg-white/[0.08] text-white'
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
            search.trim()
              ? `No staff match “${search}”. Clear the search or pick a different filter.`
              : 'No staff in this filter.'
          }
        />
      ) : showTriage ? (
        <div className="space-y-6">
          {grouped.action.length > 0 && (
            <Section
              eyebrow="Triage"
              title="Action needed"
              count={grouped.action.length}
              tone="red"
            >
              <ListCard>
                {grouped.action.map((r) => (
                  <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
                ))}
              </ListCard>
            </Section>
          )}
          {grouped.valid.length > 0 && (
            <Section
              eyebrow="On track"
              title="All in date"
              count={grouped.valid.length}
              tone="emerald"
              collapsible
              collapsed={!showAllInDate && grouped.action.length > 0}
              onToggle={() => setShowAllInDate((v) => !v)}
            >
              <ListCard>
                {grouped.valid.map((r) => (
                  <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
                ))}
              </ListCard>
            </Section>
          )}
        </div>
      ) : (
        <ListCard>
          {filtered.map((r) => (
            <StaffRow key={r.college_staff_id} row={r} onOpen={onOpen} />
          ))}
        </ListCard>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function StaffRow({ row, onOpen }: { row: StaffComplianceRow; onOpen: (id: string) => void }) {
  const onboarding = isOnboarding(row);
  const effectiveStatus: ComputedStatus = onboarding ? 'missing' : row.worst_status;
  const accent: AccentTone = onboarding ? 'blue' : STATUS_ACCENT[effectiveStatus];
  const tone: Tone = onboarding ? 'blue' : STATUS_TONE[effectiveStatus];
  const statusLabel = onboarding ? 'Awaiting setup' : STATUS_LABEL[effectiveStatus];
  const mobileGlyph = onboarding
    ? '·'
    : effectiveStatus === 'expired'
      ? '!'
      : effectiveStatus === 'missing'
        ? '?'
        : effectiveStatus === 'expiring'
          ? '~'
          : '✓';

  const inDate = row.totals.valid + row.totals.expiring;
  const percent = row.totals.total === 0 ? null : Math.round((inDate / row.totals.total) * 100);
  const department = dept(row.department);

  return (
    <PeopleListRow
      id={row.college_staff_id}
      lead={{ kind: 'avatar', name: row.name, ringTone: accent }}
      title={
        <span className="inline-flex items-center gap-2 min-w-0">
          <span className="text-white font-medium truncate">{row.name}</span>
        </span>
      }
      titleChips={<RoleFlagChips row={row} />}
      subtitle={
        <span className="truncate">
          <span className="capitalize">{row.role.replace(/_/g, ' ')}</span>
          {department && ` · ${department}`}
        </span>
      }
      meta={
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-white/65 tabular-nums min-w-0">
            <span className="shrink-0">
              <span className="text-white font-medium">{inDate}</span>
              <span className="text-white">/{row.totals.total}</span>
              <span className="text-white"> in date</span>
            </span>
            {/* Mobile: only show worst-segment. Desktop: show full breakdown. */}
            <MetaSegments row={row} onboarding={onboarding} />
          </div>
          <ComplianceRing percent={onboarding ? null : percent} tone={accent} />
        </div>
      }
      status={{ label: statusLabel, tone, mobileGlyph }}
      accent={accent}
      onOpen={() => onOpen(row.college_staff_id)}
      actions={[
        { label: 'View vault', onClick: () => onOpen(row.college_staff_id) },
        { label: 'Add record', onClick: () => onOpen(row.college_staff_id) },
      ]}
    />
  );
}

/* ──────────────────────────────────────────────────────── */

function RoleFlagChips({ row }: { row: StaffComplianceRow }) {
  const flags: { label: string; tone: 'red' | 'amber' | 'emerald' | 'blue' }[] = [];
  if (row.is_dsl) flags.push({ label: 'DSL', tone: 'red' });
  else if (row.is_deputy_dsl) flags.push({ label: 'Dep. DSL', tone: 'red' });
  if (row.is_prevent_lead) flags.push({ label: 'Prevent', tone: 'amber' });
  if (row.is_h_and_s_lead) flags.push({ label: 'H&S', tone: 'emerald' });
  if (row.is_quality_nominee) flags.push({ label: 'QN', tone: 'blue' });
  if (row.is_mental_health_lead) flags.push({ label: 'MH', tone: 'emerald' });
  if (flags.length === 0) return null;
  return (
    <span className="inline-flex items-center gap-1 shrink-0">
      {flags.slice(0, 3).map((f) => (
        <span
          key={f.label}
          className={cn(
            'inline-flex items-center h-[18px] px-1.5 rounded-md border text-[9.5px] font-semibold tracking-[0.06em] uppercase',
            f.tone === 'red' && 'bg-red-500/[0.1] border-red-500/30 text-red-200',
            f.tone === 'amber' && 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200',
            f.tone === 'emerald' && 'bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-200',
            f.tone === 'blue' && 'bg-blue-500/[0.08] border-blue-500/30 text-blue-200'
          )}
        >
          {f.label}
        </span>
      ))}
      {flags.length > 3 && (
        <span className="text-[10px] text-white tabular-nums">+{flags.length - 3}</span>
      )}
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

function MetaSegments({ row, onboarding }: { row: StaffComplianceRow; onboarding: boolean }) {
  if (onboarding) {
    return <span className="text-blue-300/85">Just added — start uploading docs</span>;
  }

  const segments: { label: string; tone: Tone; n: number }[] = [];
  if (row.totals.expired > 0)
    segments.push({ label: 'expired', tone: 'red', n: row.totals.expired });
  if (row.totals.missing > 0)
    segments.push({ label: 'missing', tone: 'blue', n: row.totals.missing });
  if (row.totals.expiring > 0)
    segments.push({ label: 'expiring', tone: 'amber', n: row.totals.expiring });

  // Mobile: collapse to most urgent. Desktop: show all.
  const mobileSegment = segments[0];

  return (
    <>
      {/* Mobile: most-urgent only */}
      {mobileSegment && (
        <span className="inline-flex items-center gap-1 sm:hidden">
          <Dot tone={mobileSegment.tone} />
          <span className="text-white">
            {mobileSegment.n} {mobileSegment.label}
          </span>
        </span>
      )}
      {/* Desktop: full breakdown */}
      <span className="hidden sm:inline-flex items-center gap-3">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1">
            <Dot tone={s.tone} />
            <span className="text-white">
              {s.n} {s.label}
            </span>
          </span>
        ))}
        {row.next_expiry && row.totals.expiring > 0 && (
          <span className="text-amber-300/85">{formatNextExpiry(row.next_expiry)}</span>
        )}
      </span>
    </>
  );
}

function Dot({ tone }: { tone: Tone }) {
  return (
    <span
      className={cn(
        'inline-block h-1.5 w-1.5 rounded-full',
        tone === 'red'
          ? 'bg-red-400'
          : tone === 'amber'
            ? 'bg-amber-400'
            : tone === 'blue'
              ? 'bg-blue-400'
              : 'bg-emerald-400'
      )}
    />
  );
}

/* ──────────────────────────────────────────────────────── */

function ComplianceRing({ percent, tone }: { percent: number | null; tone: AccentTone }) {
  const size = 36;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const isPlaceholder = percent === null;
  const safePct = isPlaceholder ? 0 : Math.max(0, Math.min(100, percent));
  const off = c * (1 - safePct / 100);
  const ringClass =
    tone === 'red'
      ? 'stroke-red-400'
      : tone === 'amber'
        ? 'stroke-amber-400'
        : tone === 'blue'
          ? 'stroke-blue-400'
          : tone === 'emerald'
            ? 'stroke-emerald-400'
            : 'stroke-white/45';
  return (
    <span
      aria-hidden
      className="relative shrink-0 inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-white/[0.08] fill-none"
          strokeWidth={stroke}
        />
        {!isPlaceholder && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className={cn('fill-none transition-all', ringClass)}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={off}
          />
        )}
      </svg>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center font-semibold tabular-nums',
          isPlaceholder ? 'text-[14px] text-white/35 leading-none' : 'text-[10px] text-white'
        )}
      >
        {isPlaceholder ? '·' : percent}
      </span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

function Section({
  eyebrow,
  title,
  count,
  tone,
  children,
  collapsible,
  collapsed,
  onToggle,
}: {
  eyebrow: string;
  title: string;
  count: number;
  tone: 'red' | 'emerald';
  children: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-3">
        <div>
          <div
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.18em]',
              tone === 'red' ? 'text-red-300/80' : 'text-emerald-300/80'
            )}
          >
            {eyebrow}
          </div>
          <h3 className="mt-1 text-[18px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
            {title}
            <span className="ml-2 text-white tabular-nums text-[14px] font-medium">{count}</span>
          </h3>
        </div>
        {collapsible && (
          <button
            type="button"
            onClick={onToggle}
            className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
          >
            {collapsed ? 'Show →' : 'Hide'}
          </button>
        )}
      </div>
      {!collapsed && children}
    </section>
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
      <div className="h-9 w-9 rounded-full bg-white/[0.04] shrink-0" />
    </div>
  );
}
