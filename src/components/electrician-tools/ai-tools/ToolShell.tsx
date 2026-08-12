/**
 * ToolShell — the frame every AI tool page is built from.
 *
 * The five tools (Client Explainer, Fault Diagnosis, Component ID, Install
 * Verify, Wiring Guide) converged on one shape, and then each kept its own
 * copy of it. Measured before this file existed:
 *
 *   Panel                        5 copies
 *   Chip                         4 copies
 *   camera acquire/attach/stop   4 copies
 *   fixed mobile action bar      5 copies
 *   h-[calc(100dvh-9.5rem)] rail 5 copies
 *
 * That duplication is not hypothetical debt: the camera was broken in four
 * places at once precisely because the first page was copied into the next
 * three. `HubPrimitives` exists for the same reason one level up, and this is
 * the same argument applied to the tools beneath it.
 *
 * The shape:
 *
 *   masthead
 *   ├── brief   (a 2x2 of Panels on a desktop, one column on a phone)
 *   └── result  (a sticky rail on a desktop, an 85vh sheet on a phone)
 *   fixed action bar (phones only)
 *
 * Exactly one of the rail and the sheet is ever mounted. `useIsMobile`
 * switches at 1024px, the same width as `lg:`, so the two can never both be
 * live — which matters because each holds its own view state and they used to
 * desync across a resize.
 */

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { HubPage, HubMasthead } from '@/components/hub/HubPrimitives';

// ───────────────────────────────────────────────────────────────────────────
// Panel
// ───────────────────────────────────────────────────────────────────────────

/**
 * One panel of the brief. Edge-to-edge on a phone and inset from `sm:` up,
 * made of the same lit surface as every card in the app.
 */
export const ToolPanel = ({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  /** Small right-aligned counter — "2 of 6", "34 words". */
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      '-mx-4 border-y border-elec-yellow/35 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5',
      'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]',
      className
    )}
  >
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">{title}</h2>
      {hint && (
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-white">{hint}</span>
      )}
    </div>
    {children}
  </section>
);

/** A labelled sub-group inside a panel. */
export const ToolField = ({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <p className="mb-2 text-[12px] font-medium text-white">{label}</p>
    {children}
  </div>
);

// ───────────────────────────────────────────────────────────────────────────
// Chip
// ───────────────────────────────────────────────────────────────────────────

/**
 * A selectable pill. Sentence case — these were all set in uppercase
 * `tracking-[0.12em]`, and eight shouting chips are harder to scan than eight
 * words.
 */
export const ToolChip = ({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={cn(
      'inline-flex min-h-11 items-center rounded-full border px-3.5 text-[12.5px] font-medium',
      'transition-colors duration-150 touch-manipulation select-none',
      '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
      on
        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
        : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.28]'
    )}
  >
    {children}
  </button>
);

/** A larger two-line chip — a label with a qualifier under it. */
export const ToolChoice = ({
  on,
  onClick,
  label,
  sub,
  subTone,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
  /** Only for a genuine warning, e.g. "Often serious". */
  subTone?: 'default' | 'warning';
}) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={cn(
      'min-h-[60px] rounded-xl border px-3 py-2.5 text-left',
      'transition-colors duration-150 touch-manipulation select-none',
      '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
      on
        ? 'border-elec-yellow bg-elec-yellow'
        : 'border-white/[0.12] bg-white/[0.06] hover:border-white/[0.28]'
    )}
  >
    <span
      className={cn(
        'block text-[13.5px] font-semibold leading-tight',
        on ? 'text-black' : 'text-white'
      )}
    >
      {label}
    </span>
    {sub && (
      <span
        className={cn(
          'mt-0.5 block text-[11px] leading-tight',
          on ? 'text-black/70' : subTone === 'warning' ? 'text-red-300' : 'text-white'
        )}
      >
        {sub}
      </span>
    )}
  </button>
);

// ───────────────────────────────────────────────────────────────────────────
// Primary action
// ───────────────────────────────────────────────────────────────────────────

/**
 * The one solid volt button. Rendered twice by AiToolPage — at the foot of the
 * brief on a desktop, and in the fixed bar on a phone — from a single node, so
 * the two can't drift apart.
 */
export const ToolAction = ({
  onClick,
  disabled,
  busy,
  busyLabel = 'Working…',
  icon,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  busy?: boolean;
  busyLabel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || busy}
    className={cn(
      'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5',
      'text-[14px] font-semibold text-black',
      'bg-gradient-to-b from-[hsl(47_100%_57%)] to-[hsl(47_100%_47%)]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_4px_14px_-8px_hsl(47_100%_50%_/_0.30)]',
      'transition-colors duration-150 touch-manipulation select-none',
      '[-webkit-tap-highlight-color:transparent] active:scale-[0.98]',
      'hover:from-[hsl(47_100%_61%)] hover:to-[hsl(47_100%_50%)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
      'disabled:cursor-not-allowed disabled:opacity-40'
    )}
  >
    {busy ? (
      <>
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black"
        />
        {busyLabel}
      </>
    ) : (
      <>
        {icon}
        {children}
      </>
    )}
  </button>
);

// ───────────────────────────────────────────────────────────────────────────
// Result surface
// ───────────────────────────────────────────────────────────────────────────

/**
 * The panel the answer lives in. Same material as the brief, with the body as
 * the only scrolling region so a footer of actions can stay pinned.
 */
export const ToolResult = ({
  title,
  footer,
  children,
}: {
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      'flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-elec-yellow/35',
      'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
    )}
  >
    <div className="shrink-0 border-b border-white/[0.10] px-5 py-4">
      <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">{title}</h2>
    </div>
    {children}
    {footer && <div className="shrink-0 border-t border-white/[0.10] p-2.5">{footer}</div>}
  </div>
);

/** The "still working" state. Indeterminate — never a fabricated percentage. */
export const ToolWorking = ({ title, detail }: { title: string; detail: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
    <span
      aria-hidden
      className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow/30 border-t-elec-yellow"
    />
    <p className="text-[13.5px] font-semibold text-white">{title}</p>
    <p className="max-w-[34ch] text-[12px] leading-snug text-white">{detail}</p>
    <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-white/[0.10]">
      <div className="h-full w-full animate-pulse rounded-full bg-elec-yellow/70" />
    </div>
  </div>
);

// ───────────────────────────────────────────────────────────────────────────
// Page frame
// ───────────────────────────────────────────────────────────────────────────

export interface AiToolPageProps {
  /** Masthead title. */
  title: string;
  /** The brief — Panels, laid out by the caller. */
  children: React.ReactNode;
  /** The answer panel. Rendered into the rail or the sheet, never both. */
  result: React.ReactNode;
  /** Whether the result needs a full-height scrolling region yet. */
  hasResult: boolean;
  /** The primary button. Appears under the brief and in the mobile bar. */
  action: React.ReactNode;
  /** Sheet title on a phone. */
  resultTitle: string;
  sheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  /**
   * `brief` — a wide brief beside a narrower rail. The default, and right when
   * the inputs outweigh the answer.
   *
   * `result` — the reverse, for Component ID, where the input is a photo and
   * two chips and the output is a full datasheet.
   */
  emphasis?: 'brief' | 'result';
  backTo?: string;
}

const EMPHASIS = {
  brief:
    'lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)]',
  result:
    'lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]',
} as const;

export const AiToolPage = ({
  title,
  children,
  result,
  hasResult,
  action,
  resultTitle,
  sheetOpen,
  onSheetOpenChange,
  emphasis = 'brief',
  backTo = '/electrician-tools/ai-tooling',
}: AiToolPageProps) => {
  const isMobile = useIsMobile();

  return (
    <HubPage>
      <HubMasthead section="AI tools" title={title} backTo={backTo} />

      <div className="mx-auto max-w-[1600px] px-4 pb-32 pt-4 lg:px-8 lg:pb-10">
        <div className={cn('grid gap-4 lg:gap-6', EMPHASIS[emphasis])}>
          <div className="min-w-0 space-y-4">
            {children}
            {/* On a phone this same node lives in the fixed bar below. */}
            <div className="hidden lg:block">{action}</div>
          </div>

          {!isMobile && (
            <aside className="hidden lg:block">
              {/*
               * Measured, not guessed. The app header is fixed at 64px and the
               * masthead another 48px, so this column starts ~130px down —
               * `top-20` clears the header once it sticks, and 9.5rem is what
               * must come off for the panel to end above the fold in BOTH
               * states (unstuck at 130px, stuck at 80px).
               *
               * Empty, that calc drew a box far taller than the brief beside
               * it, which read as a hole in the page. `h-full` stretches it to
               * the grid row instead, so it matches the controls exactly.
               */}
              <div
                className={cn(
                  'sticky top-20',
                  hasResult ? 'h-[calc(100dvh-9.5rem)] min-h-[420px]' : 'h-full'
                )}
              >
                {result}
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Phones: the action sits where the thumb already is. */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-elec-dark via-elec-dark/95 to-transparent px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-4 lg:hidden">
        <div className="flex items-center gap-2">
          {hasResult && (
            <button
              type="button"
              onClick={() => onSheetOpenChange(true)}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-neutral-900 px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation active:bg-white/[0.10]"
            >
              View result
            </button>
          )}
          <div className="min-w-0 flex-1">{action}</div>
        </div>
      </div>

      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={onSheetOpenChange}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.10] bg-elec-dark p-0"
          >
            <SheetHeader className="border-b border-white/[0.10] px-4 py-3 text-left">
              <SheetTitle className="text-[15px] font-semibold text-white">
                {resultTitle}
              </SheetTitle>
            </SheetHeader>
            {/* 57px is the header above: 12px padding either side of a 33px
                title line. Measured against the rendered sheet. */}
            <div className="h-[calc(85vh-57px)] p-3">{result}</div>
          </SheetContent>
        </Sheet>
      )}
    </HubPage>
  );
};

export default AiToolPage;
