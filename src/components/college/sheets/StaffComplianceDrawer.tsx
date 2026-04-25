import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Pill,
  type Tone,
} from '@/components/college/primitives';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useStaffComplianceVault,
  type RoleFlagKey,
  type VaultRow,
} from '@/hooks/useStaffComplianceVault';
import { EditComplianceRecordSheet } from './EditComplianceRecordSheet';
import { LogCpdSheet } from './LogCpdSheet';

/* ==========================================================================
   StaffComplianceDrawer — per-staff drawer with identity, role flags,
   CPD progress, and a categorised list of every applicable requirement.
   Mobile bottom sheet, ~85vh — same pattern as the rest of the app.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string | null;
}

const ROLE_FLAG_DEFS: {
  key: RoleFlagKey;
  label: string;
  short: string;
  tone: 'red' | 'amber' | 'emerald' | 'blue';
  description: string;
}[] = [
  {
    key: 'is_dsl',
    label: 'Designated Safeguarding Lead',
    short: 'DSL',
    tone: 'red',
    description: 'Statutory safeguarding lead.',
  },
  {
    key: 'is_deputy_dsl',
    label: 'Deputy DSL',
    short: 'Dep. DSL',
    tone: 'red',
    description: 'Deputises for the DSL.',
  },
  {
    key: 'is_prevent_lead',
    label: 'Prevent Lead',
    short: 'Prevent',
    tone: 'amber',
    description: 'Owns Prevent duty implementation.',
  },
  {
    key: 'is_h_and_s_lead',
    label: 'Health & Safety Lead',
    short: 'H&S',
    tone: 'emerald',
    description: 'Owns health & safety compliance.',
  },
  {
    key: 'is_quality_nominee',
    label: 'Quality Nominee',
    short: 'QN',
    tone: 'blue',
    description: 'EQA / awarding body quality lead.',
  },
  {
    key: 'is_mental_health_lead',
    label: 'Mental Health Lead',
    short: 'MH Lead',
    tone: 'emerald',
    description: 'Senior mental health champion.',
  },
];

const CATEGORY_ORDER: VaultRow['type']['category'][] = [
  'statutory',
  'qualification',
  'training',
  'declaration',
];

const CATEGORY_LABEL: Record<VaultRow['type']['category'], string> = {
  statutory: 'Statutory',
  qualification: 'Qualifications',
  training: 'Training',
  declaration: 'Declarations',
};

const CATEGORY_DESC: Record<VaultRow['type']['category'], string> = {
  statutory: 'Pre-employment statutory checks (Single Central Record).',
  qualification: 'Teaching, assessor and occupational qualifications.',
  training: 'Recurring training — safeguarding, Prevent, first aid, etc.',
  declaration: 'Self-declarations and supplementary checks.',
};

const STATUS_TONE: Record<VaultRow['computed_status'], Tone> = {
  expired: 'red',
  missing: 'blue',
  expiring: 'amber',
  valid: 'green',
  pending_verification: 'purple',
};

const STATUS_LABEL: Record<VaultRow['computed_status'], string> = {
  expired: 'Expired',
  missing: 'Not on file',
  expiring: 'Expiring',
  valid: 'In date',
  pending_verification: 'Awaiting verification',
};

function formatExpiry(iso: string | null, days: number | null): string {
  if (!iso) return 'No expiry';
  if (days === null) return new Date(iso).toLocaleDateString('en-GB');
  if (days < 0) return `Expired ${Math.abs(days)}d ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  if (days <= 60) return `${days}d to expiry`;
  return `Expires ${new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/* ──────────────────────────────────────────────────────── */

export function StaffComplianceDrawer({ open, onOpenChange, staffId }: Props) {
  // Keep data hot through close animation — only the parent's staffId nulls.
  const { core, rows, cpd, loading, toggleRoleFlag, refresh } = useStaffComplianceVault(staffId);
  const [editing, setEditing] = useState<VaultRow | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [cpdOpen, setCpdOpen] = useState(false);

  const availableTypesForAdd = useMemo(
    () => rows.filter((r) => !r.record).map((r) => r.type),
    [rows]
  );

  const grouped = useMemo(() => {
    const map = new Map<VaultRow['type']['category'], VaultRow[]>();
    for (const r of rows) {
      const list = map.get(r.type.category) ?? [];
      list.push(r);
      map.set(r.type.category, list);
    }
    return map;
  }, [rows]);

  const overallScore = useMemo(() => {
    if (rows.length === 0) return null;
    // "In date" = valid OR expiring — both are within their validity window.
    // Only expired and missing fail the in-date test.
    const inDate = rows.filter(
      (r) => r.computed_status === 'valid' || r.computed_status === 'expiring'
    ).length;
    return {
      inDate,
      total: rows.length,
      pct: Math.round((inDate / rows.length) * 100),
    };
  }, [rows]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[88vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Compliance vault"
          title={core?.name ?? 'Loading…'}
          description={
            core
              ? `${core.role.replace(/_/g, ' ')}${core.department ? ` · ${core.department}` : ''}`
              : ''
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Close
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={() => {
                  setEditing(null);
                  setPickerOpen(true);
                }}
                disabled={!core}
              >
                Add record →
              </PrimaryButton>
            </>
          }
        >
          {!core && !loading ? (
            <div className="text-[13px] text-white">This learner couldn't be loaded.</div>
          ) : !core ? (
            <DrawerSkeleton />
          ) : (
            <>
              <IdentityStrip
                core={core}
                onToggleFlag={toggleRoleFlag}
                overallScore={overallScore}
              />

              <CpdStrip cpd={cpd} onLog={() => setCpdOpen(true)} />

              <div className="space-y-5">
                {CATEGORY_ORDER.map((cat) => {
                  const items = grouped.get(cat) ?? [];
                  if (items.length === 0) return null;
                  return (
                    <CategoryGroup
                      key={cat}
                      label={CATEGORY_LABEL[cat]}
                      description={CATEGORY_DESC[cat]}
                      items={items}
                      onEdit={(item) => setEditing(item)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </SheetShell>
      </SheetContent>

      {/* Edit/Add record sheet — nested. Stays mounted so realtime keeps
          flowing when the user closes it back to the drawer. */}
      {core && (
        <>
          <EditComplianceRecordSheet
            open={!!editing || pickerOpen}
            onOpenChange={(o) => {
              if (!o) {
                setEditing(null);
                setPickerOpen(false);
              }
            }}
            staffId={core.id}
            staffName={core.name}
            initialItem={editing}
            availableTypes={availableTypesForAdd}
            onSaved={() => {
              // realtime will refetch, but explicit refresh keeps the drawer
              // perfectly in sync even if realtime is throttled.
              refresh();
            }}
          />
          <LogCpdSheet
            open={cpdOpen}
            onOpenChange={setCpdOpen}
            staffId={core.id}
            staffName={core.name}
            targetHours={cpd?.target_hours ?? 30}
            onSaved={refresh}
          />
        </>
      )}
    </Sheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function IdentityStrip({
  core,
  onToggleFlag,
  overallScore,
}: {
  core: NonNullable<ReturnType<typeof useStaffComplianceVault>['core']>;
  onToggleFlag: (key: RoleFlagKey, value: boolean) => Promise<void>;
  overallScore: { inDate: number; total: number; pct: number } | null;
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
      <div className="flex items-start gap-4 flex-wrap">
        <Avatar className="h-14 w-14 ring-1 ring-white/[0.1]">
          <AvatarImage src={core.photo_url ?? undefined} />
          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
            {getInitials(core.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-[160px]">
          <div className="text-[15px] font-semibold text-white tracking-tight leading-tight">
            {core.name}
          </div>
          <div className="mt-0.5 text-[11.5px] text-white/65">
            <span className="capitalize">{core.role.replace(/_/g, ' ')}</span>
            {core.department && ` · ${core.department}`}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-white flex-wrap">
            {core.email && <span className="truncate">{core.email}</span>}
            {core.phone && (
              <>
                <span className="text-white/25">·</span>
                <span className="font-mono tabular-nums">{core.phone}</span>
              </>
            )}
          </div>
        </div>
        {overallScore && (
          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white">In date</div>
            <div className="mt-0.5 text-[20px] font-semibold tabular-nums text-white">
              {overallScore.inDate}
              <span className="text-white">/{overallScore.total}</span>
            </div>
            <div className="text-[10.5px] text-white tabular-nums">{overallScore.pct}%</div>
          </div>
        )}
      </div>

      {/* Role flag toggles */}
      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2.5">
          Compliance roles
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ROLE_FLAG_DEFS.map((f) => {
            const active = core[f.key];
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => onToggleFlag(f.key, !active)}
                title={f.description}
                className={cn(
                  'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                  active
                    ? f.tone === 'red'
                      ? 'bg-red-500/[0.1] border-red-500/40 text-red-200'
                      : f.tone === 'amber'
                        ? 'bg-amber-500/[0.1] border-amber-500/40 text-amber-200'
                        : f.tone === 'emerald'
                          ? 'bg-emerald-500/[0.1] border-emerald-500/40 text-emerald-200'
                          : 'bg-blue-500/[0.1] border-blue-500/40 text-blue-200'
                    : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/65 hover:text-white hover:border-white/[0.18]'
                )}
              >
                {f.short}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function CpdStrip({
  cpd,
  onLog,
}: {
  cpd: ReturnType<typeof useStaffComplianceVault>['cpd'];
  onLog: () => void;
}) {
  const hours = cpd?.hours_this_year ?? 0;
  const target = cpd?.target_hours ?? 30;
  const pct = Math.min(100, cpd?.percent_to_target ?? 0);
  const tone =
    pct >= 100
      ? 'bg-emerald-400'
      : pct >= 60
        ? 'bg-elec-yellow'
        : pct >= 30
          ? 'bg-amber-400'
          : 'bg-red-400';

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            CPD · {cpd?.current_year ?? new Date().getFullYear()}
          </div>
          <div className="mt-1 text-[18px] font-semibold tabular-nums text-white">
            {hours}
            <span className="text-white text-[14px]"> / {target} hrs</span>
          </div>
          <div className="text-[11px] text-white tabular-nums">
            {cpd?.entries_this_year ?? 0} entries
          </div>
        </div>
        <button
          type="button"
          onClick={onLog}
          className="h-9 px-3.5 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.1] text-[12px] font-medium text-white hover:border-white/[0.2] touch-manipulation"
        >
          Log CPD →
        </button>
      </div>
      <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div className={cn('h-full transition-all', tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function CategoryGroup({
  label,
  description,
  items,
  onEdit,
}: {
  label: string;
  description: string;
  items: VaultRow[];
  onEdit: (row: VaultRow) => void;
}) {
  // "In date" = valid OR expiring (within validity window).
  const inDate = items.filter(
    (i) => i.computed_status === 'valid' || i.computed_status === 'expiring'
  ).length;
  const action = items.length - inDate;

  return (
    <section>
      <div className="flex items-end justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {label}
          </div>
          <div className="mt-0.5 text-[11px] text-white leading-snug">{description}</div>
        </div>
        <div className="text-[10.5px] tabular-nums text-white whitespace-nowrap">
          <span className="text-emerald-300 font-medium">{inDate}</span>
          <span className="text-white/30"> · </span>
          <span className={cn(action > 0 ? 'text-amber-300 font-medium' : 'text-white')}>
            {action} action
          </span>
        </div>
      </div>
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
        {items.map((item) => (
          <RequirementRow key={item.type.code} item={item} onEdit={onEdit} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function RequirementRow({ item, onEdit }: { item: VaultRow; onEdit: (row: VaultRow) => void }) {
  const tone = STATUS_TONE[item.computed_status];
  const hasEvidence = !!item.record?.evidence_path;

  return (
    <button
      type="button"
      onClick={() => onEdit(item)}
      className="group w-full text-left px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] active:bg-white/[0.05] transition-colors touch-manipulation flex items-start gap-3"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13.5px] font-medium text-white truncate">{item.type.label}</span>
          {item.type.is_scr_required && (
            <span
              className="inline-flex items-center h-[16px] px-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[9px] font-semibold tracking-[0.06em] uppercase text-white"
              title="Required for the Single Central Record"
            >
              SCR
            </span>
          )}
        </div>
        {item.type.description && (
          <div className="mt-0.5 text-[11px] text-white leading-snug line-clamp-2">
            {item.type.description}
          </div>
        )}
        <div className="mt-1.5 flex items-center gap-2 flex-wrap text-[11px]">
          <Pill tone={tone}>{STATUS_LABEL[item.computed_status]}</Pill>
          <span className="text-white tabular-nums">
            {formatExpiry(item.record?.expires_at ?? null, item.days_to_expiry)}
          </span>
          {item.record?.reference_no && (
            <>
              <span className="text-white/25">·</span>
              <span className="font-mono tabular-nums text-white/65 truncate max-w-[140px]">
                {item.record.reference_no}
              </span>
            </>
          )}
          {hasEvidence && (
            <>
              <span className="text-white/25">·</span>
              <span className="text-emerald-300/80">Evidence on file</span>
            </>
          )}
          {item.record?.verified_at && (
            <>
              <span className="text-white/25">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-300/85">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold leading-none"
                >
                  ✓
                </span>
                Verified
              </span>
            </>
          )}
        </div>
      </div>
      <span
        className="shrink-0 text-[12.5px] font-medium text-white group-hover:text-white transition-colors self-center"
        aria-hidden
      >
        {item.record ? 'Edit →' : 'Add →'}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────── */

function DrawerSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
            <div className="h-2 w-1/2 bg-white/[0.04] rounded" />
            <div className="h-2 w-2/3 bg-white/[0.04] rounded" />
          </div>
        </div>
      </div>
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 animate-pulse">
        <div className="h-2 w-20 bg-white/[0.06] rounded" />
        <div className="mt-2 h-5 w-32 bg-white/[0.08] rounded" />
        <div className="mt-3 h-1.5 w-full bg-white/[0.04] rounded" />
      </div>
      {[0, 1].map((g) => (
        <div
          key={g}
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04] animate-pulse"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="px-5 py-4">
              <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
              <div className="mt-2 h-2 w-3/4 bg-white/[0.04] rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
