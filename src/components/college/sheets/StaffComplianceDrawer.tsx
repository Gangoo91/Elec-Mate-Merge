import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useStaffComplianceVault,
  type RoleFlagKey,
  type VaultRow,
} from '@/hooks/useStaffComplianceVault';
import { EditComplianceRecordSheet } from './EditComplianceRecordSheet';
import { useCollegeCan } from '@/hooks/useCollegeCan';
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

const STATUS_TEXT: Record<VaultRow['computed_status'], string> = {
  expired: 'text-red-300',
  missing: 'text-orange-300',
  expiring: 'text-orange-300',
  valid: 'text-emerald-400',
  pending_verification: 'text-white',
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
    <>
      <FormSheet
        width="wide"
        bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[22rem_minmax(0,1fr)]"
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Compliance vault"
        title={core?.name ?? (loading ? 'Loading…' : 'Staff member')}
        description={
          core ? (
            <span className="capitalize">
              {core.role.replace(/_/g, ' ')}
              {core.department ? ` · ${core.department}` : ''}
            </span>
          ) : undefined
        }
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setPickerOpen(true);
              }}
              disabled={!core}
              className={buttonPrimaryCn}
            >
              Add a record
            </button>
          </div>
        }
      >
        {!core && !loading ? (
          <p className="text-[14px] text-white lg:col-span-2">
            This staff member couldn&apos;t be loaded.
          </p>
        ) : !core ? (
          <DrawerSkeleton />
        ) : (
          <>
            <div className="space-y-6 lg:sticky lg:top-0">
              <IdentityStrip
                core={core}
                onToggleFlag={toggleRoleFlag}
                overallScore={overallScore}
              />
              <CpdStrip cpd={cpd} onLog={() => setCpdOpen(true)} />
            </div>

            <div className="space-y-7">
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
      </FormSheet>

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
    </>
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
  // ELE-1898: only a manager names the leads, and never for themselves
  // (the database refuses both; the chips used to look tappable to all).
  const { can, staffId: myStaffId } = useCollegeCan();
  const isSelf = core.id === myStaffId;
  const canSetFlags = can('staff.grant_roles') && !isSelf;
  return (
    <section>
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-1 ring-white/[0.1]">
          <AvatarImage src={core.photo_url ?? undefined} />
          <AvatarFallback className="bg-white/[0.08] font-semibold text-white">
            {getInitials(core.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          {core.email && <p className="truncate text-[13.5px] text-white">{core.email}</p>}
          {core.phone && <p className="text-[13px] tabular-nums text-white">{core.phone}</p>}
          {!core.email && !core.phone && <p className="text-[13px] text-white">No email or phone on file</p>}
        </div>
      </div>

      {overallScore && (
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.1] pt-4">
          <div>
            <p className="text-[12.5px] font-medium text-white">Records in date</p>
            <p className="mt-1 text-[28px] font-bold leading-none tabular-nums text-white">
              {overallScore.inDate}
              <span className="text-[16px] font-semibold"> of {overallScore.total}</span>
            </p>
          </div>
          <p
            className={cn(
              'text-[20px] font-semibold tabular-nums',
              overallScore.pct === 100
                ? 'text-emerald-400'
                : overallScore.pct < 80
                  ? 'text-orange-400'
                  : 'text-white'
            )}
          >
            {overallScore.pct}%
          </p>
        </div>
      )}

      <div className="mt-5 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">Compliance roles</h3>
        <p className="mt-0.5 text-[12px] text-white">
          {canSetFlags
            ? 'Tap to switch a role on or off.'
            : isSelf
              ? 'You cannot change your own duties. Ask another admin or head of department.'
              : 'Only a college admin or head of department can change these.'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ROLE_FLAG_DEFS.map((f) => {
            const active = core[f.key];
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                disabled={!canSetFlags}
                onClick={() => onToggleFlag(f.key, !active)}
                title={`${f.label}: ${f.description}`}
                aria-label={f.label}
                className={chipCn(active)}
              >
                {f.short}
              </button>
            );
          })}
        </div>
        {ROLE_FLAG_DEFS.some((f) => core[f.key]) && (
          <p className="mt-2.5 text-[12px] leading-relaxed text-white">
            {ROLE_FLAG_DEFS.filter((f) => core[f.key])
              .map((f) => f.label)
              .join(', ')}
          </p>
        )}
      </div>
    </section>
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
  const tone = pct >= 100 ? 'bg-emerald-400' : pct >= 60 ? 'bg-elec-yellow' : 'bg-orange-400';

  return (
    <section className="border-t border-white/[0.1] pt-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            CPD in {cpd?.current_year ?? new Date().getFullYear()}
          </h3>
          <p className="mt-1 text-[22px] font-bold tabular-nums text-white">
            {hours}
            <span className="text-[14px] font-semibold"> of {target} hours</span>
          </p>
          <p className="text-[12px] tabular-nums text-white">
            {cpd?.entries_this_year ?? 0} {cpd?.entries_this_year === 1 ? 'entry' : 'entries'}
          </p>
        </div>
        <button
          type="button"
          onClick={onLog}
          className="h-11 rounded-xl border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
        >
          Log CPD
        </button>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div className={cn('h-full transition-all', tone)} style={{ width: `${pct}%` }} />
      </div>
    </section>
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
      <div className="mb-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">{label}</h3>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">{description}</p>
        </div>
        <p className="whitespace-nowrap text-[12.5px] tabular-nums text-white">
          <span className="font-semibold text-emerald-400">{inDate} in date</span>
          {action > 0 && (
            <>
              {' · '}
              <span className="font-semibold text-orange-400">{action} to act on</span>
            </>
          )}
        </p>
      </div>
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {items.map((item) => (
          <RequirementRow key={item.type.code} item={item} onEdit={onEdit} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function RequirementRow({ item, onEdit }: { item: VaultRow; onEdit: (row: VaultRow) => void }) {
  const hasEvidence = !!item.record?.evidence_path;
  const bits: string[] = [formatExpiry(item.record?.expires_at ?? null, item.days_to_expiry)];
  if (item.record?.reference_no) bits.push(`Ref ${item.record.reference_no}`);
  if (hasEvidence) bits.push('Evidence on file');
  if (item.record?.verified_at)
    bits.push(
      `Verified ${new Date(item.record.verified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
    );

  return (
    <button
      type="button"
      onClick={() => onEdit(item)}
      className="flex min-h-[60px] w-full items-center gap-3 px-1 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.06]"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-white">
          {item.type.label}
          {item.type.is_scr_required && (
            <span
              className="ml-2 text-[11px] font-semibold text-white"
              title="Required for the Single Central Record"
            >
              SCR
            </span>
          )}
        </p>
        {item.type.description && (
          <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-white">
            {item.type.description}
          </p>
        )}
        <p className="mt-1 text-[12.5px] text-white">
          <span className={cn('font-semibold', STATUS_TEXT[item.computed_status])}>
            {STATUS_LABEL[item.computed_status]}
          </span>
          {' · '}
          <span className="tabular-nums">{bits.join(' · ')}</span>
        </p>
      </div>
      <span className="shrink-0 text-[13px] font-semibold text-elec-yellow" aria-hidden>
        {item.computed_status === 'pending_verification' ? 'Verify' : item.record ? 'Edit' : 'Add'}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────── */

function DrawerSkeleton() {
  return (
    <>
      <div className="animate-pulse space-y-3">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
          </div>
        </div>
        <div className="h-1.5 w-full rounded bg-white/[0.04]" />
      </div>
      <div className="animate-pulse divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="py-4">
            <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </>
  );
}
