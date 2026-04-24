/**
 * PeopleListRow — shared editorial row for every college hub list
 * (students, tutors, support staff, ILPs, grading queue, EPA tracking,
 * work queue, progress tracking).
 *
 * Design rules:
 *   - Mobile-first (375px). 44px touch targets. No horizontal scroll.
 *   - No swipe gestures — actions live in an always-visible ⋯ menu.
 *   - Risk / status accent rail (3px) on the left edge.
 *   - Grid: [lead] [body] [trailing]. Body truncates; trailing never hides.
 *   - Tap anywhere in the body or lead → onOpen(); long-press → onLongPress().
 *   - Status pill collapses to a dot on mobile to save width.
 */

import { useRef, type ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from './index';

export type AccentTone =
  | 'none'
  | 'red'
  | 'amber'
  | 'emerald'
  | 'blue'
  | 'purple'
  | 'yellow';

export interface PeopleListRowAction {
  label: string;
  onClick: () => void;
  /** 'destructive' uses red tone; 'warn' uses amber; default uses neutral. */
  variant?: 'default' | 'destructive' | 'warn' | 'success';
  /** If set, renders a separator ABOVE this item. */
  divider?: boolean;
  disabled?: boolean;
}

interface AvatarLead {
  kind: 'avatar';
  name: string;
  photoUrl?: string | null;
  /** Ring tone — matches accent by default. */
  ringTone?: AccentTone;
}

interface InitialsLead {
  kind: 'initials';
  text: string;
  /** Small background tone. */
  tone?: AccentTone;
}

interface GlyphLead {
  kind: 'glyph';
  glyph: ReactNode;
  tone?: AccentTone;
}

interface CheckboxLead {
  kind: 'checkbox';
  checked: boolean;
}

export type LeadSlot = AvatarLead | InitialsLead | GlyphLead | CheckboxLead;

export interface StatusPill {
  label: string;
  tone?: Tone;
  /** Single-char glyph shown on narrow viewports. Defaults to label initial. */
  mobileGlyph?: string;
}

export interface PeopleListRowProps {
  /** Deterministic key the parent also uses. */
  id: string;
  lead: LeadSlot;
  /** The single-line title (truncates). */
  title: ReactNode;
  /** Inline chips next to the title (risk level, etc). */
  titleChips?: ReactNode;
  /** Small line directly beneath the title (ULN, role, unit etc). */
  subtitle?: ReactNode;
  /** Rich third line — progress bar, meta, chips. Provide a flex container. */
  meta?: ReactNode;
  /** Tiny status pill, far-right. */
  status?: StatusPill | null;
  /** Left accent rail colour. */
  accent?: AccentTone;
  /** Menu items for the ⋯ dropdown. Rendered top→bottom. */
  actions?: PeopleListRowAction[];
  /** Fires when the row body is tapped (or clicked). */
  onOpen?: () => void;
  /** Fires after a ~450ms touch press for entering batch mode. */
  onLongPress?: () => void;
  /** Visually mark this row as selected. */
  selected?: boolean;
}

function toneBorderRing(tone: AccentTone): string {
  switch (tone) {
    case 'red':
      return 'ring-red-500/40';
    case 'amber':
      return 'ring-amber-500/40';
    case 'emerald':
      return 'ring-emerald-500/40';
    case 'blue':
      return 'ring-blue-500/40';
    case 'purple':
      return 'ring-purple-500/40';
    case 'yellow':
      return 'ring-elec-yellow/40';
    default:
      return 'ring-white/[0.08]';
  }
}

function toneRailBg(tone: AccentTone): string {
  switch (tone) {
    case 'red':
      return 'bg-red-400/80';
    case 'amber':
      return 'bg-amber-400/80';
    case 'emerald':
      return 'bg-emerald-400/80';
    case 'blue':
      return 'bg-blue-400/80';
    case 'purple':
      return 'bg-purple-400/80';
    case 'yellow':
      return 'bg-elec-yellow/80';
    default:
      return '';
  }
}

function leadBgTone(tone?: AccentTone): string {
  switch (tone) {
    case 'red':
      return 'bg-red-500/10 text-red-200 border-red-500/25';
    case 'amber':
      return 'bg-amber-500/10 text-amber-200 border-amber-500/25';
    case 'emerald':
      return 'bg-emerald-500/10 text-emerald-200 border-emerald-500/25';
    case 'blue':
      return 'bg-blue-500/10 text-blue-200 border-blue-500/25';
    case 'purple':
      return 'bg-purple-500/10 text-purple-200 border-purple-500/25';
    case 'yellow':
      return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25';
    default:
      return 'bg-white/[0.04] text-white border-white/[0.08]';
  }
}

function itemClasses(variant?: PeopleListRowAction['variant']): string {
  switch (variant) {
    case 'destructive':
      return 'text-red-300 focus:text-red-200';
    case 'warn':
      return 'text-amber-300 focus:text-amber-200';
    case 'success':
      return 'text-emerald-300 focus:text-emerald-200';
    default:
      return 'text-white';
  }
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

export function PeopleListRow({
  lead,
  title,
  titleChips,
  subtitle,
  meta,
  status,
  accent = 'none',
  actions = [],
  onOpen,
  onLongPress,
  selected,
}: PeopleListRowProps) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  const startLongPress = () => {
    if (!onLongPress) return;
    longPressFired.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      onLongPress();
    }, 450);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTap = () => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return;
    }
    onOpen?.();
  };

  const showAccentRail = accent !== 'none' && lead.kind !== 'checkbox';

  return (
    <div
      className={cn(
        'relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 transition-colors',
        selected ? 'bg-elec-yellow/[0.06]' : 'hover:bg-[hsl(0_0%_14%)]'
      )}
      onTouchStart={startLongPress}
      onTouchEnd={cancelLongPress}
      onTouchCancel={cancelLongPress}
      onTouchMove={cancelLongPress}
    >
      {showAccentRail && (
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-3 bottom-3 w-[3px] rounded-full',
            toneRailBg(accent)
          )}
        />
      )}

      {/* Lead */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleTap();
        }}
        className="shrink-0 touch-manipulation"
        aria-label="Open"
      >
        {lead.kind === 'checkbox' && (
          <div
            className={cn(
              'h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors',
              lead.checked
                ? 'bg-elec-yellow border-elec-yellow text-black'
                : 'border-white/20'
            )}
          >
            {lead.checked && <span className="text-sm font-semibold">✓</span>}
          </div>
        )}
        {lead.kind === 'avatar' && (
          <Avatar
            className={cn(
              'h-10 w-10 ring-1 transition-colors',
              toneBorderRing(lead.ringTone ?? accent)
            )}
          >
            <AvatarImage src={lead.photoUrl ?? undefined} />
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
              {getInitials(lead.name)}
            </AvatarFallback>
          </Avatar>
        )}
        {lead.kind === 'initials' && (
          <div
            className={cn(
              'h-10 w-10 rounded-full border flex items-center justify-center text-[12px] font-semibold tabular-nums',
              leadBgTone(lead.tone)
            )}
          >
            {lead.text}
          </div>
        )}
        {lead.kind === 'glyph' && (
          <div
            className={cn(
              'h-10 w-10 rounded-full border flex items-center justify-center',
              leadBgTone(lead.tone)
            )}
          >
            {lead.glyph}
          </div>
        )}
      </button>

      {/* Body */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleTap();
        }}
        className="text-left min-w-0 touch-manipulation"
      >
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[14.5px] sm:text-[15px] font-semibold text-white truncate max-w-full">
            {title}
          </span>
          {titleChips}
        </div>
        {subtitle && (
          <div className="mt-0.5 text-[11.5px] text-white truncate">{subtitle}</div>
        )}
        {meta && <div className="mt-2.5">{meta}</div>}
      </button>

      {/* Trailing */}
      <div className="flex items-center gap-1.5 shrink-0">
        {status && (
          <Pill tone={status.tone ?? 'yellow'}>
            <span className="hidden sm:inline">{status.label}</span>
            <span className="sm:hidden">
              {status.mobileGlyph ?? status.label.charAt(0)}
            </span>
          </Pill>
        )}
        {actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More actions"
                onClick={(e) => e.stopPropagation()}
                className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
              >
                <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[hsl(0_0%_11%)] border border-white/[0.08] text-white min-w-[180px]"
            >
              {actions.map((a, i) => (
                <RowAction key={i} action={a} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

function RowAction({ action }: { action: PeopleListRowAction }) {
  return (
    <>
      {action.divider && <DropdownMenuSeparator className="bg-white/[0.06]" />}
      <DropdownMenuItem
        disabled={action.disabled}
        onClick={action.onClick}
        className={cn('text-[13px]', itemClasses(action.variant))}
      >
        {action.label}
      </DropdownMenuItem>
    </>
  );
}
