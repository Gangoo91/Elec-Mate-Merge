import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { Navigation } from 'lucide-react';
import { Customer } from '@/hooks/inspection/useCustomers';
import { navigateToAddress, canNavigateTo } from '@/utils/navigate-to-address';
import { cn } from '@/lib/utils';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';
import { resolveCustomerRisk } from '@/lib/customerRisk';
import type { CustomerSummary } from '@/hooks/useCustomerSummaries';

/**
 * Same rule as CustomerDetailPage: compact above £10k so a five-figure sum
 * cannot push the row's action buttons off a phone screen. Kept identical to
 * the detail page so the same customer does not read "£12,400" in one place
 * and "£12k" in the other.
 */
const formatGBP = (value: number) =>
  value >= 10_000
    ? `£${Math.round(value / 1000)}k`
    : `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

interface CustomerListRowProps {
  customer: Customer;
  /** Rollup for this customer, when loaded. Absent = show the row as before. */
  summary?: CustomerSummary | null;
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

/**
 * ELE-1555 — the reliability chip now comes from resolveCustomerRisk, which
 * folds the manual flag over the computed payment level. The old local
 * `reliabilityChip` map lived here; it only knew about payments, so a customer
 * the electrician had marked red still showed "Reliable" if their invoices
 * happened to be clean.
 */

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
  summary,
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
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);

  const handleCardClick = () => {
    if (selectionMode) {
      onToggleSelect?.(customer.id);
    } else {
      navigate(`/customers/${customer.id}`);
    }
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onLongPress) return;
    const t = e.touches[0];
    touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
    longPressTimer.current = window.setTimeout(() => {
      onLongPress(customer.id);
      longPressTimer.current = null;
    }, 500);
  };

  /**
   * Cancel the long-press once the finger travels — without this the timer
   * fired mid-scroll and dropped the list into selection mode, so scrolling
   * past a card with a finger resting on it looked like you'd selected it.
   * 10px is below the browser's own scroll threshold, so a genuine press-and-
   * hold still registers while any drag kills it.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!longPressTimer.current || !touchStart.current) return;
    const t = e.touches[0];
    if (!t) return;
    const moved =
      Math.abs(t.clientX - touchStart.current.x) > 10 ||
      Math.abs(t.clientY - touchStart.current.y) > 10;
    if (moved) cancelLongPress();
  };

  const handleTouchEnd = () => {
    cancelLongPress();
    touchStart.current = null;
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const certCount = customer.certificateCount || 0;
  const risk = resolveCustomerRisk({
    riskRating: customer.riskRating,
    riskReason: customer.riskReason,
    paymentReliability,
  });

  return (
    <div
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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
        // The app-wide card recipe (see components/ui/card-recipe) so this
        // matches the I&T hub, Certificates, Specialist and Notices cards.
        // flex-col + h-full keeps desktop-grid rows equal height regardless of
        // tags/chips — the footer pins to the bottom.
        CARD_BASE,
        'cursor-pointer p-3.5 sm:p-4',
        selected
          ? 'border-elec-yellow bg-gradient-to-b from-white/[0.16] to-white/[0.08]'
          : isDuplicate
            ? cn('border-amber-500/40 hover:border-amber-500/60', CARD_SURFACE)
            : CARD_NEUTRAL
      )}
    >
      {/* Top row: avatar + name + status chips */}
      <div className="flex items-start gap-3">
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

        {/*
          Name + contact take the FULL width. The status chips used to sit in a
          right-hand column on this same row, which left the name roughly half
          the card and truncated real customers to "Andrew H…" / "Andrew M…"
          with their email cut to "founder@elec…". Chips moved to their own
          wrapping row below — they're secondary to knowing who this is.
        */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-semibold leading-tight tracking-tight text-white sm:text-[17px]">
            {customer.name}
          </h3>
          <p className="mt-0.5 truncate text-[12.5px] text-white">
            {[customer.companyName, customer.phone || customer.email || customer.address]
              .filter(Boolean)
              .join(' · ') || 'No contact info'}
          </p>
        </div>
      </div>

      {/* Status chips — one wrapping row across the full card width. */}
      {(hasOverdue ||
        customer.status === 'lead' ||
        customer.status === 'inactive' ||
        isDuplicate ||
        certCount > 0 ||
        risk.rating !== null ||
        (customer.tags && customer.tags.length > 0)) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {hasOverdue && (
            <span className={cn(chipBase, 'border-red-500/30 bg-red-500/[0.14] text-red-300')}>
              Overdue invoice
            </span>
          )}
          {customer.status === 'lead' && <span className={cn(chipBase, chipNeutral)}>Lead</span>}
          {customer.status === 'inactive' && (
            <span className={cn(chipBase, chipNeutral)}>Inactive</span>
          )}
          {isDuplicate && (
            <span className={cn(chipBase, 'border-amber-500/30 bg-amber-500/[0.12] text-amber-300')}>
              Possible duplicate
            </span>
          )}
          {certCount > 0 && (
            <span className={cn(chipBase, chipNeutral, 'tabular-nums')}>
              {certCount} cert{certCount !== 1 ? 's' : ''}
            </span>
          )}
          {risk.rating && (
            <span
              className={cn(chipBase, risk.chipClass, 'max-w-full')}
              // The reason rides IN the chip rather than in a title attribute:
              // this is used on a phone, where there is no hover and title
              // never renders. Truncation keeps a long note from wrapping the
              // chip row.
              title={risk.reason || undefined}
            >
              {risk.source === 'manual' && (
                <span
                  className={cn('mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full', risk.dotClass)}
                />
              )}
              {/* min-w-0 is load-bearing: a flex child defaults to
                  min-width:auto and will not shrink below its content, so
                  `truncate` alone would let a long reason push the chip past
                  the card edge instead of ellipsising. */}
              <span className="min-w-0 truncate">
                {risk.label}
                {risk.reason ? ` · ${risk.reason}` : ''}
              </span>
            </span>
          )}
          {customer.tags?.slice(0, 2).map((tag) =>
            onTagClick ? (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className={cn(chipBase, chipNeutral, 'touch-manipulation hover:border-white/[0.3]')}
              >
                {tag}
              </button>
            ) : (
              <span key={tag} className={cn(chipBase, chipNeutral)}>
                {tag}
              </span>
            )
          )}
          {customer.tags && customer.tags.length > 2 && (
            <span className="text-[10.5px] font-medium text-white">
              +{customer.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Footer row: last activity + quick actions — pinned to the card base */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
        <span className="flex min-w-0 items-center gap-2 text-[12px] text-white">
          <span className="truncate">{formatLastActivity(customer.lastActivityAt)}</span>
          {/* Money, when there is any. Outstanding wins over won work: an unpaid
              invoice is the one number that should change what you do next.
              Silent when both are zero, so a customer with no financial history
              does not carry a meaningless "£0". */}
          {summary && (summary.outstanding > 0 || summary.approvedValue > 0) && (
            <>
              <span aria-hidden className="text-white/30">·</span>
              {summary.outstanding > 0 ? (
                <span className="whitespace-nowrap font-semibold text-amber-300">
                  {formatGBP(summary.outstanding)} due
                </span>
              ) : (
                <span className="whitespace-nowrap font-semibold text-emerald-300">
                  {formatGBP(summary.approvedValue)} won
                </span>
              )}
            </>
          )}
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
          {/* ELE-1520 — the whole card is role="button" and opens the customer,
              so this has to stop the click from bubbling or you would navigate
              and change page at the same time. */}
          {canNavigateTo(customer) && (
            <button
              type="button"
              onClick={(e) => {
                stopPropagation(e);
                navigateToAddress({
                  address: customer.address,
                  latitude: customer.latitude,
                  longitude: customer.longitude,
                });
              }}
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:border-white/[0.25] hover:bg-white/[0.07] touch-manipulation"
              aria-label={`Navigate to ${customer.name}`}
            >
              <Navigation className="h-3.5 w-3.5 text-elec-yellow" />
              Navigate
            </button>
          )}
          <span className="ml-1 flex h-9 items-center text-[12.5px] font-semibold text-elec-yellow">
            Open
          </span>
        </div>
      </div>
    </div>
  );
};
