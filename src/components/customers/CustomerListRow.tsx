import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { ChevronRight, Mail, Navigation, Phone } from 'lucide-react';
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

/*
 * Call / Email / Navigate as 44px icon circles rather than three text pills.
 * The pills were the heaviest thing on the card and ate the width that the
 * activity text needed. A phone, an envelope and a direction arrow are about
 * as unambiguous as icons get; each keeps its aria-label and title so the
 * meaning is still available to a screen reader and on hover.
 */
const actionBtn =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1] ' +
  'bg-white/[0.04] text-white transition-colors hover:border-white/[0.25] hover:bg-white/[0.09] ' +
  'touch-manipulation active:scale-[0.94]';

const chipBase =
  'inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] font-semibold whitespace-nowrap';
const chipNeutral = 'border-white/[0.1] bg-white/[0.06] text-white';

/**
 * ELE-1555 — the reliability chip now comes from resolveCustomerRisk, which
 * folds the manual flag over the computed payment level. The old local
 * `reliabilityChip` map lived here; it only knew about payments, so a customer
 * the electrician had marked red still showed "Reliable" if their invoices
 * happened to be clean.
 */

/*
 * A wall of identical grey avatars is unscannable — every card looks the same
 * until you read it. Tinting by a hash of the name gives each customer a
 * stable colour, so you start recognising regulars by shape before you read
 * a word. Six low-saturation tints, chosen to sit under white initials and
 * never compete with the yellow accent or the red/amber alert badges.
 */
const AVATAR_TINTS = [
  'from-sky-500/25 to-sky-500/[0.08] border-sky-400/25',
  'from-violet-500/25 to-violet-500/[0.08] border-violet-400/25',
  'from-emerald-500/25 to-emerald-500/[0.08] border-emerald-400/25',
  'from-rose-500/25 to-rose-500/[0.08] border-rose-400/25',
  'from-cyan-500/25 to-cyan-500/[0.08] border-cyan-400/25',
  'from-orange-500/25 to-orange-500/[0.08] border-orange-400/25',
];

const tintFor = (name: string): string => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
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
  /*
   * Keep-in-touch sends. Comes off the summary rollup, so it is absent until
   * that RPC resolves — `summary?.emailCount` rather than a default of 0, so a
   * customer who HAS been emailed never flashes "not emailed" on first paint.
   */
  const outstanding = summary?.outstanding ?? 0;
  const wonValue = summary?.approvedValue ?? 0;
  const emailCount = summary?.emailCount ?? 0;
  const lastEmailedAt = summary?.lastEmailedAt ?? null;
  /*
   * The quiet second tier. Built as data so the middot separators can be
   * interleaved without a run of `{x && '·'}` conditionals that go wrong the
   * moment one fact is missing.
   */
  const facts: { key: string; label: string; className?: string; title?: string }[] = [];
  if (customer.status === 'lead') facts.push({ key: 'lead', label: 'Lead', className: 'font-semibold' });
  if (customer.status === 'inactive')
    facts.push({ key: 'inactive', label: 'Inactive', className: 'font-semibold' });
  if (certCount > 0)
    facts.push({
      key: 'certs',
      label: `${certCount} cert${certCount !== 1 ? 's' : ''}`,
      className: 'tabular-nums',
    });
  if (emailCount > 0)
    facts.push({
      key: 'emails',
      label: `Emailed ${emailCount}×`,
      className: 'tabular-nums text-sky-300',
      title: lastEmailedAt
        ? `Last keep-in-touch email ${formatLastActivity(lastEmailedAt)}`
        : undefined,
    });

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
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br',
              tintFor(customer.name)
            )}
          >
            <span className="text-[13px] font-bold tracking-wide text-white">{initials}</span>
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
          {/*
            Money sits on the NAME row, hard right, at the size it deserves.
            It is the one number that changes what you do next, and the top
            right of a card is where the eye lands after the name — it was
            previously either buried in the footer (where it collided with the
            buttons) or reduced to another badge among five.
          */}
          <div className="flex items-baseline gap-3">
            <h3 className="min-w-0 flex-1 truncate text-[16px] font-semibold leading-tight tracking-tight text-white sm:text-[17px]">
              {customer.name}
            </h3>
            {/* The qualifier is small but not optional — a bare "£5,610" on a
                customer card reads just as easily as job value as money owed,
                and those two mean opposite things. */}
            {outstanding > 0 ? (
              <span className="shrink-0 whitespace-nowrap text-[15px] font-bold tabular-nums leading-tight text-amber-300">
                {formatGBP(outstanding)}
                <span className="ml-1 text-[11px] font-semibold">due</span>
              </span>
            ) : wonValue > 0 ? (
              <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold tabular-nums leading-tight text-emerald-300">
                {formatGBP(wonValue)}
                <span className="ml-1 text-[11px] font-medium">won</span>
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-[12.5px] text-white">
            {[customer.companyName, customer.phone || customer.email || customer.address]
              .filter(Boolean)
              .join(' · ') || 'No contact info'}
          </p>
        </div>
      </div>

      {/*
        Badges in TWO tiers, because they were not all the same kind of thing.
        Everything used to be an identical pill in one wrapping row — "Overdue
        invoice" sat at the same weight as "from-certificate", so nothing stood
        out and a card with five chips read as noise.

        Tier 1 — ATTENTION. Only renders when something wants doing: money owed,
        a risk flag, a suspected duplicate. Coloured, bordered, impossible to
        miss, and usually absent.

        Tier 2 — FACTS. Certs, keep-in-touch sends, status, tags. These are
        context you read *after* you have decided the card matters, so they are
        one quiet line of text with middots, not a row of competing pills.
      */}
      {(hasOverdue || isDuplicate || risk.rating !== null) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {hasOverdue && (
            <span className={cn(chipBase, 'border-red-500/30 bg-red-500/[0.14] text-red-300')}>
              Overdue invoice
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
                <span className={cn('mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full', risk.dotClass)} />
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
          {isDuplicate && (
            <span className={cn(chipBase, 'border-amber-500/30 bg-amber-500/[0.12] text-amber-300')}>
              Possible duplicate
            </span>
          )}
        </div>
      )}

      {(facts.length > 0 || (customer.tags && customer.tags.length > 0)) && (
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-white">
          {/* Interleaved with middots so the facts read as one sentence rather
              than three words that happen to sit near each other. */}
          {facts.map((fact, i) => (
            <span key={fact.key} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden className="text-white/30">
                  ·
                </span>
              )}
              <span className={fact.className} title={fact.title}>
                {fact.label}
              </span>
            </span>
          ))}
          {customer.tags?.slice(0, 2).map((tag) =>
            onTagClick ? (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="max-w-[10rem] truncate rounded-md bg-white/[0.06] px-1.5 py-0.5 text-white transition-colors hover:bg-white/[0.12] touch-manipulation"
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="max-w-[10rem] truncate rounded-md bg-white/[0.06] px-1.5 py-0.5"
              >
                {tag}
              </span>
            )
          )}
          {customer.tags && customer.tags.length > 2 && (
            <span className="text-white">+{customer.tags.length - 2}</span>
          )}
        </div>
      )}

      {/* Footer row: last activity + quick actions — pinned to the card base */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-3.5">
        {/*
          🔴 The money used to live HERE, and it collided with the buttons.
          `shrink-0` on the action group was not enough: the money is
          `whitespace-nowrap`, so "Today · £5,610 due" had a hard minimum width
          that no amount of truncation could reduce, and once it plus the
          buttons exceeded the card the money rendered UNDER them ("£5,610 d"
          with Call on top). Truncating it was not an option either — cutting a
          figure is worse than not showing one.

          It now sits with the attention badges above, where it belongs: money
          owed is a reason to act, not a footnote. The footer is activity plus
          actions, which always fits.
        */}
        <span className="min-w-0 flex-1 truncate text-[12px] text-white">
          {formatLastActivity(customer.lastActivityAt)}
        </span>
        {/*
          🔴 shrink-0. Without it this group is a flex child that is allowed to
          shrink, but its children are fixed-width buttons that cannot — so the
          group overflowed its track and the Call button rendered ON TOP of the
          money, giving "£244 du" with Call sat over the top. The left side truncates instead.
        */}
        <div className="flex shrink-0 items-center gap-1.5">
          {customer.phone && (
            <a
              href={`tel:${customer.phone}`}
              onClick={stopPropagation}
              className={actionBtn}
              aria-label={`Call ${customer.name}`}
              title={`Call ${customer.name}`}
            >
              <Phone className="h-[17px] w-[17px]" />
            </a>
          )}
          {customer.email && (
            <a
              href={`mailto:${customer.email}`}
              onClick={stopPropagation}
              className={actionBtn}
              aria-label={`Email ${customer.name}`}
              title={`Email ${customer.name}`}
            >
              <Mail className="h-[17px] w-[17px]" />
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
              className={actionBtn}
              aria-label={`Navigate to ${customer.name}`}
              title={`Navigate to ${customer.name}`}
            >
              <Navigation className="h-[17px] w-[17px] text-elec-yellow" />
            </button>
          )}
          {/*
            A hint, not a control — the whole card is role="button" and opens
            the customer, so this must not look like a separate target sat
            beside three real ones. The chevron alone says "this goes
            somewhere"; the word "Open" next to it was saying the same thing
            twice and its width pushed the activity text into truncating to
            "T…". aria-hidden because the card already has its own accessible
            name and role.
          */}
          <span
            aria-hidden
            className="ml-0.5 flex h-11 w-5 shrink-0 items-center justify-center text-elec-yellow"
          >
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
