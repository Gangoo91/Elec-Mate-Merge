import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@/hooks/inspection/useCustomers';
import { cn } from '@/lib/utils';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';

interface CustomerListRowProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onStartCertificate: (customer: Customer) => void;
  onQuickNote: (customer: Customer) => void;
  paymentReliability?: ReliabilityLevel | null;
  /** Any unpaid invoice past its due date — the "who owes me" signal */
  hasOverdue?: boolean;
  // Selection mode
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onLongPress?: (id: string) => void;
  isDuplicate?: boolean;
  onTagClick?: (tag: string) => void;
}

type ActivityTone = 'green' | 'amber' | 'red';

const chipBase =
  'inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] font-semibold whitespace-nowrap';
const chipNeutral = 'border-white/[0.1] bg-white/[0.06] text-white/70';

const reliabilityChip: Record<Exclude<ReliabilityLevel, 'none'>, { label: string; cls: string }> = {
  good: { label: 'Reliable', cls: 'border-green-500/25 bg-green-500/[0.1] text-green-400' },
  fair: { label: 'Fair', cls: 'border-amber-500/25 bg-amber-500/[0.1] text-amber-300' },
  poor: { label: 'Pays late', cls: 'border-red-500/25 bg-red-500/[0.12] text-red-400' },
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const formatLastActivity = (date?: string) => {
  if (!date) return 'No activity yet';
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

// Status dot on avatar: green = active <90d, amber = 90d-2y, red = >2y or never.
const getActivityTone = (lastActivityAt?: string): ActivityTone => {
  if (!lastActivityAt) return 'red';
  const days = Math.floor((Date.now() - new Date(lastActivityAt).getTime()) / 86_400_000);
  if (days < 90) return 'green';
  if (days < 730) return 'amber';
  return 'red';
};

export const CustomerListRow = ({
  customer,
  paymentReliability,
  hasOverdue = false,
  selectionMode = false,
  selected = false,
  onToggleSelect,
  onLongPress,
  isDuplicate = false,
  onTagClick,
}: CustomerListRowProps) => {
  const navigate = useNavigate();
  const initials = getInitials(customer.name);
  const activity = getActivityTone(customer.lastActivityAt);
  const longPressTimer = React.useRef<number | null>(null);

  const handleCardClick = () => {
    if (selectionMode) {
      onToggleSelect?.(customer.id);
    } else {
      navigate(`/customers/${customer.id}`);
    }
  };

  const handleTouchStart = () => {
    if (!onLongPress) return;
    longPressTimer.current = window.setTimeout(() => {
      onLongPress(customer.id);
      longPressTimer.current = null;
    }, 500);
  };
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const certCount = customer.certificateCount || 0;

  return (
    <div
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className={cn(
        // flex-col + h-full so cards in the desktop grid are equal height
        // regardless of tags/chips — footer pins to the bottom
        'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 active:scale-[0.995] touch-manipulation sm:p-5',
        selected
          ? 'border-elec-yellow'
          : isDuplicate
            ? 'border-amber-500/30 hover:border-amber-500/50'
            : 'border-white/[0.12] hover:border-white/[0.22]'
      )}
    >
      {/* Top row: avatar + name + status chips */}
      <div className="mb-4 flex items-start gap-3">
        {/* Selection checkbox (selection mode only) */}
        {selectionMode && (
          <div
            className={cn(
              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
              selected ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30 bg-transparent'
            )}
          >
            {selected && (
              <svg className="h-3 w-3 text-black" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8.5l3 3 6-7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        )}
        {/* Avatar with status dot */}
        <div className="relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">{initials}</span>
          </div>
          <span
            aria-label={`Last activity: ${formatLastActivity(customer.lastActivityAt)}`}
            className={cn(
              'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-[hsl(0_0%_10%)]',
              activity === 'green' && 'bg-emerald-400',
              activity === 'amber' && 'bg-amber-400',
              activity === 'red' && 'bg-red-400'
            )}
          />
        </div>

        {/* Name + sub */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-semibold leading-tight tracking-tight text-white sm:text-[17px]">
            {customer.name}
          </h3>
          <p className="mt-1 truncate text-[12.5px] text-white/60">
            {[customer.companyName, customer.phone || customer.email || customer.address]
              .filter(Boolean)
              .join(' · ') || 'No contact info'}
          </p>
          {customer.tags && customer.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {customer.tags.slice(0, 3).map((tag) =>
                onTagClick ? (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag);
                    }}
                    className="inline-flex h-5 items-center rounded-full border border-white/[0.1] bg-white/[0.05] px-2 text-[10.5px] font-medium text-white/75 transition-colors hover:border-white/[0.25] hover:text-white touch-manipulation"
                  >
                    {tag}
                  </button>
                ) : (
                  <span
                    key={tag}
                    className="inline-flex h-5 items-center rounded-full border border-white/[0.1] bg-white/[0.05] px-2 text-[10.5px] font-medium text-white/75"
                  >
                    {tag}
                  </span>
                )
              )}
              {customer.tags.length > 3 && (
                <span className="inline-flex h-5 items-center text-[10.5px] font-medium text-white/55">
                  +{customer.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right side chips */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {hasOverdue && (
            <span className={cn(chipBase, 'border-red-500/25 bg-red-500/[0.12] text-red-400')}>
              Overdue invoice
            </span>
          )}
          {customer.status === 'lead' && <span className={cn(chipBase, chipNeutral)}>Lead</span>}
          {customer.status === 'inactive' && (
            <span className={cn(chipBase, chipNeutral)}>Inactive</span>
          )}
          {isDuplicate && (
            <span className={cn(chipBase, 'border-amber-500/25 bg-amber-500/[0.1] text-amber-300')}>
              Possible duplicate
            </span>
          )}
          {certCount > 0 && (
            <span className={cn(chipBase, chipNeutral, 'tabular-nums')}>
              {certCount} cert{certCount !== 1 ? 's' : ''}
            </span>
          )}
          {paymentReliability && paymentReliability !== 'none' && (
            <span className={cn(chipBase, reliabilityChip[paymentReliability].cls)}>
              {reliabilityChip[paymentReliability].label}
            </span>
          )}
        </div>
      </div>

      {/* Footer row: last activity + quick actions — pinned to the card base */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
        <span className="text-[12px] text-white/50">
          {formatLastActivity(customer.lastActivityAt)}
        </span>
        <div className="flex items-center gap-1.5">
          {customer.phone && (
            <a
              href={`tel:${customer.phone}`}
              onClick={stopPropagation}
              className="flex h-9 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:border-white/[0.25] hover:bg-white/[0.07] touch-manipulation"
              aria-label={`Call ${customer.name}`}
            >
              Call
            </a>
          )}
          {customer.email && (
            <a
              href={`mailto:${customer.email}`}
              onClick={stopPropagation}
              className="flex h-9 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:border-white/[0.25] hover:bg-white/[0.07] touch-manipulation"
              aria-label={`Email ${customer.name}`}
            >
              Email
            </a>
          )}
          <span className="ml-1 flex h-9 items-center text-[12.5px] font-semibold text-elec-yellow">
            Open
          </span>
        </div>
      </div>
    </div>
  );
};
