import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useTopExpiring, type ExpiringItem } from '@/hooks/useTopExpiring';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   TopExpiringWidget — verifier/admin only. The next n records that need
   action, sorted by urgency. Tap → opens that staff member's drawer.

   Hub card language: rule · name · role and requirement · time to expiry ·
   chevron. Expired is a real problem, so its figure stays red and its
   rule goes volt; "expiring" is plain white.
   ========================================================================== */

interface Props {
  limit?: number;
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

  const expiredCount = items.filter((i) => i.computed_status === 'expired').length;

  return (
    <>
      <section
        className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
      >
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Expiring across the college
          </h3>
          {expiredCount > 0 ? (
            <span className="text-[11px] font-semibold tabular-nums text-red-300">
              {expiredCount} overdue
            </span>
          ) : (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {items.length}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
            Nothing expiring soon.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
            {items.map((item) => (
              <li key={`${item.college_staff_id}:${item.requirement_code}`}>
                <ItemRow item={item} onOpen={() => setOpenStaffId(item.college_staff_id)} />
              </li>
            ))}
          </ul>
        )}
      </section>

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
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-8 w-[3px] shrink-0 rounded-full',
          expired ? 'bg-elec-yellow' : 'bg-white/[0.25]'
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {item.staff_name}
        </span>
        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
          <span className="capitalize">{item.staff_role.replace(/_/g, ' ')}</span> ·{' '}
          {item.requirement_label}
        </span>
      </span>
      <span
        className={cn(
          'shrink-0 text-[13px] font-semibold tabular-nums',
          expired ? 'text-red-300' : 'text-white'
        )}
      >
        {formatExpiry(item)}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
  );
}
