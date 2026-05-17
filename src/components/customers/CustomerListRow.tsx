import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@/hooks/inspection/useCustomers';
import { cn } from '@/lib/utils';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';
import { Pill, Dot, Arrow } from '@/components/college/primitives';

interface CustomerListRowProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onStartCertificate: (customer: Customer) => void;
  onQuickNote: (customer: Customer) => void;
  paymentReliability?: ReliabilityLevel | null;
  // Selection mode
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onLongPress?: (id: string) => void;
  isDuplicate?: boolean;
  onTagClick?: (tag: string) => void;
}

type ActivityTone = 'green' | 'amber' | 'red' | 'yellow';

const reliabilityPill: Record<
  Exclude<ReliabilityLevel, 'none'>,
  { label: string; tone: 'green' | 'amber' | 'red' }
> = {
  good: { label: 'Reliable', tone: 'green' },
  fair: { label: 'Fair', tone: 'amber' },
  poor: { label: 'Late', tone: 'red' },
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
        'group relative cursor-pointer overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 active:scale-[0.995] touch-manipulation sm:p-5',
        selected
          ? 'border-elec-yellow/50 bg-elec-yellow/[0.06]'
          : isDuplicate
            ? 'border-amber-500/30 bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
            : 'border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
      )}
    >
      {/* Hairline yellow accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-70"
      />

      {/* Top row: avatar + name + cert pill */}
      <div className="flex items-start gap-3">
        {/* Selection checkbox (selection mode only) */}
        {selectionMode && (
          <div
            className={cn(
              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
              selected
                ? 'border-elec-yellow bg-elec-yellow'
                : 'border-white/30 bg-transparent'
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">{initials}</span>
          </div>
          <span
            aria-label={`Last activity: ${formatLastActivity(customer.lastActivityAt)}`}
            className={cn(
              'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-[hsl(0_0%_12%)]',
              activity === 'green' && 'bg-emerald-400',
              activity === 'amber' && 'bg-amber-400',
              activity === 'red' && 'bg-red-400'
            )}
          />
        </div>

        {/* Name + sub */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-semibold leading-tight text-white sm:text-[17px]">
            {customer.name}
          </h3>
          <p className="mt-1 truncate text-[12.5px] text-white/65">
            {customer.phone || customer.email || customer.address || 'No contact info'}
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
                    className="inline-flex h-5 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-[10.5px] font-medium text-white/75 transition-colors hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.04] hover:text-elec-yellow touch-manipulation"
                  >
                    {tag}
                  </button>
                ) : (
                  <span
                    key={tag}
                    className="inline-flex h-5 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-[10.5px] font-medium text-white/75"
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

        {/* Right side pills */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {isDuplicate && (
            <Pill tone="amber">
              <Dot tone="amber" className="mr-1.5" />
              Possible duplicate
            </Pill>
          )}
          {certCount > 0 && (
            <Pill tone="green">
              {certCount} cert{certCount !== 1 ? 's' : ''}
            </Pill>
          )}
          {paymentReliability && paymentReliability !== 'none' && (
            <Pill tone={reliabilityPill[paymentReliability].tone}>
              <Dot tone={reliabilityPill[paymentReliability].tone} className="mr-1.5" />
              {reliabilityPill[paymentReliability].label}
            </Pill>
          )}
        </div>
      </div>

      {/* Footer row: last activity + quick actions */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
        <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-white/55">
          {formatLastActivity(customer.lastActivityAt)}
        </span>
        <div className="flex items-center gap-1.5">
          {customer.phone && (
            <a
              href={`tel:${customer.phone}`}
              onClick={stopPropagation}
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:border-elec-yellow/40 hover:bg-elec-yellow/10 hover:text-elec-yellow touch-manipulation"
              aria-label={`Call ${customer.name}`}
            >
              Call
            </a>
          )}
          {customer.email && (
            <a
              href={`mailto:${customer.email}`}
              onClick={stopPropagation}
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:border-elec-yellow/40 hover:bg-elec-yellow/10 hover:text-elec-yellow touch-manipulation"
              aria-label={`Email ${customer.name}`}
            >
              Email
            </a>
          )}
          <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
            <Arrow />
          </span>
        </div>
      </div>
    </div>
  );
};
