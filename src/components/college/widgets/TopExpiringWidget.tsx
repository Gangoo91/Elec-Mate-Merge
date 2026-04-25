import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTopExpiring, type ExpiringItem } from '@/hooks/useTopExpiring';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   TopExpiringWidget — verifier/admin only. Surfaces the next n records that
   need action, sorted by urgency. Tap → opens that staff's drawer.
   ========================================================================== */

interface Props {
  limit?: number;
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

function formatExpiry(item: ExpiringItem): string {
  if (item.computed_status === 'expired') {
    if (item.days_to_expiry === null) return 'Expired';
    return `${Math.abs(item.days_to_expiry)}d overdue`;
  }
  if (item.days_to_expiry === null) return 'Expiring';
  if (item.days_to_expiry === 0) return 'Expires today';
  if (item.days_to_expiry === 1) return 'Expires tomorrow';
  return `${item.days_to_expiry}d to expiry`;
}

export function TopExpiringWidget({ limit = 5 }: Props) {
  const { isVerifier, loading: authLoading } = useVerifierAuthority();
  const { items, loading } = useTopExpiring(limit);
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);

  if (authLoading) return null;
  if (!isVerifier) return null;
  if (loading) return null;
  if (items.length === 0) return null;

  const expiredCount = items.filter((i) => i.computed_status === 'expired').length;

  return (
    <>
      <div className="bg-[hsl(0_0%_12%)] border border-amber-500/25 rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
              Action soon
            </div>
            <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
              Top {items.length} expiring across your college
            </div>
          </div>
          {expiredCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-red-500/[0.12] border border-red-500/30 text-[12px] font-semibold tabular-nums text-red-200">
              {expiredCount} overdue
            </span>
          )}
        </div>

        <div className="divide-y divide-white/[0.04]">
          {items.map((item) => (
            <ItemRow
              key={`${item.college_staff_id}:${item.requirement_code}`}
              item={item}
              onOpen={() => setOpenStaffId(item.college_staff_id)}
            />
          ))}
        </div>
      </div>

      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(o) => {
          if (!o) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function ItemRow({ item, onOpen }: { item: ExpiringItem; onOpen: () => void }) {
  const expired = item.computed_status === 'expired';

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left px-5 sm:px-6 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors touch-manipulation"
    >
      <Avatar
        className={cn('h-9 w-9 ring-1 shrink-0', expired ? 'ring-red-500/40' : 'ring-amber-500/40')}
      >
        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-[11px] font-semibold">
          {getInitials(item.staff_name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-white truncate">{item.staff_name}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55">
          <span className="capitalize truncate">{item.staff_role.replace(/_/g, ' ')}</span>
          <span className="text-white/25">·</span>
          <span className="truncate">{item.requirement_label}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span
          className={cn(
            'inline-flex items-center h-6 px-2 rounded-full border text-[10.5px] font-semibold tracking-[0.04em] uppercase tabular-nums',
            expired
              ? 'bg-red-500/[0.08] border-red-500/30 text-red-200'
              : 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200'
          )}
        >
          {formatExpiry(item)}
        </span>
        <div className="mt-1 text-[10.5px] text-white/55 group-hover:text-white transition-colors">
          Open vault →
        </div>
      </div>
    </button>
  );
}
