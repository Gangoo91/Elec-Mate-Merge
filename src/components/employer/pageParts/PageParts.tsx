/**
 * Employer Hub page language: the one set of page parts every Employer Hub
 * page uses (People, Jobs, Finance, Clients, Settings, Fleet, Kit), so each
 * page reads like the Overview (sections/OverviewSection.tsx +
 * overview/HomeSections.tsx).
 *
 * The Overview sets the rules: a calm hero with one row of actions, one
 * figure strip, edge-to-edge panels on a phone, a 16px panel title, rows with
 * a 15px title, one 13px detail line and one trailing status or action, and
 * filters that wrap rather than scroll sideways. Presentation only: nothing
 * here fetches data or decides what a person may see.
 */
import { forwardRef, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronRight, RefreshCw, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { panel } from '@/components/employer/overview/HomeSections';

export { panel, PanelTitle } from '@/components/employer/overview/HomeSections';

/* ── Page layout ─────────────────────────────────────────────────────── */

/** Vertical rhythm between page blocks (passed to PageFrame). */
export const frameClass = 'space-y-6 sm:space-y-8 lg:space-y-8';

/** Desktop two-column body, matching the Overview. Stacks on a phone. */
export const twoColClass =
  'flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start';

/** Put a right-hand column first on a phone (when it holds what needs doing). */
export const asideFirstClass = 'order-first lg:order-none';

/** A column inside twoColClass. */
export const colClass = 'min-w-0 space-y-6 sm:space-y-8';

/** A page column of its own (pages not drawn inside PageFrame). */
export function PageColumn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-[1600px] space-y-6 pb-24 sm:space-y-8', className)}>
      {children}
    </div>
  );
}

/** The two-column body as a component: main work left, supporting panels right. */
export function TwoColumn({
  main,
  side,
  className,
}: {
  main: ReactNode;
  side?: ReactNode;
  className?: string;
}) {
  if (!side) return <div className={cn('space-y-6 sm:space-y-8', className)}>{main}</div>;
  return (
    <div className={cn(twoColClass, className)}>
      <div className={colClass}>{main}</div>
      <div className={colClass}>{side}</div>
    </div>
  );
}

/**
 * Wrap the shared FilterBar in this when it sits in a column: tabs on one
 * row, search and buttons on the next, search taking the spare width.
 */
export const filterStack =
  'lg:[&>div]:flex-col lg:[&>div]:items-stretch lg:[&>div>div:first-child]:self-start lg:[&>div>div:last-child]:ml-0 lg:[&>div>div:last-child>div:first-child]:w-auto lg:[&>div>div:last-child>div:first-child]:flex-1';

/* ── Hero actions ────────────────────────────────────────────────────── */

/**
 * One row of hero actions. On a phone the primary takes the width and the
 * round tool buttons sit beside it; nothing wraps into a second ragged row.
 * `stretchFirst` makes the first child take the width when it is not a
 * HeroPrimary (e.g. a shared PrimaryButton with `heroBtn`).
 */
export function HeroActions({
  children,
  stretchFirst = false,
}: {
  children: ReactNode;
  stretchFirst?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 items-center gap-2 sm:w-auto',
        stretchFirst &&
          '[&>*:first-child]:min-w-0 [&>*:first-child]:flex-1 sm:[&>*:first-child]:flex-none'
      )}
    >
      {children}
    </div>
  );
}

type BtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  icon?: ReactNode;
  children?: ReactNode;
  'data-help'?: string;
};

/** The one yellow button in the header. */
export const HeroPrimary = forwardRef<HTMLButtonElement, BtnProps>(function HeroPrimary(
  { icon, children, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      className={cn(
        'inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation transition-colors hover:bg-elec-yellow/90 disabled:opacity-50 sm:flex-none',
        className
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
    </button>
  );
});

/**
 * A secondary header action. With a `label` it is icon only on a phone (so
 * the row still fits) and icon + label from sm: up, the label staying as the
 * accessible name; `labelOnPhone` shows the label on a phone too. Without a
 * `label` it always shows its text (give it `className="hidden sm:inline-flex"`
 * when it would crowd the phone row).
 */
export const HeroSecondary = forwardRef<
  HTMLButtonElement,
  BtnProps & {
    label?: string;
    /** Show the label on a phone too (when nothing else is in the row). */
    labelOnPhone?: boolean;
  }
>(function HeroSecondary({ icon, children, label, labelOnPhone, className, ...rest }, ref) {
  const iconOnPhone = !!label && !labelOnPhone;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      {...rest}
      className={cn(
        'relative inline-flex h-11 min-w-0 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.14] bg-white/[0.04] text-[14px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.08] disabled:opacity-50',
        iconOnPhone && 'w-11 sm:w-auto sm:px-4',
        labelOnPhone && 'flex-1 px-4 sm:flex-none',
        !label && 'px-5',
        className
      )}
    >
      {icon}
      <span className={iconOnPhone ? 'hidden sm:inline' : undefined}>{children}</span>
    </button>
  );
});

/** A round 44px tool button (filter, refresh, export), drawn like the ? button. */
export const ToolButton = forwardRef<HTMLButtonElement, BtnProps & { label: string }>(
  function ToolButton({ icon, children, label, className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        {...rest}
        className={cn(
          'relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation transition-colors hover:border-elec-yellow hover:text-elec-yellow disabled:opacity-50',
          className
        )}
      >
        {icon}
        {children}
      </button>
    );
  }
);

/** Small count badge for a ToolButton (active filters). */
export function ToolBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-elec-yellow px-1 text-[10.5px] font-bold text-black">
      {count}
    </span>
  );
}

/** The refresh tool button. */
export function RefreshIcon({ onClick, spinning }: { onClick: () => void; spinning?: boolean }) {
  return (
    <ToolButton onClick={onClick} label="Refresh">
      <RefreshCw className={cn('h-4 w-4', spinning && 'animate-spin')} />
    </ToolButton>
  );
}

/** Primary hero button class for a shared Button: fills the row on a phone. */
export const heroPrimaryClass = 'flex-1 sm:flex-none';

/** Hero button class for a shared Button, the Overview HeroButton shape. */
export const heroBtn =
  'h-11 sm:h-12 rounded-xl sm:rounded-2xl px-4 sm:px-5 text-[14.5px] sm:text-[15px] font-semibold';
/** Row/inline action buttons, the Overview's "Approve" shape. */
export const rowBtn =
  'inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 text-[14px] font-semibold touch-manipulation transition-colors disabled:opacity-50';
export const rowBtnPrimary = cn(rowBtn, 'bg-elec-yellow text-black hover:bg-elec-yellow/90');
export const rowBtnSecondary = cn(
  rowBtn,
  'border border-white/[0.18] bg-white/[0.06] text-white hover:bg-white/[0.1]'
);

/* ── Figures ─────────────────────────────────────────────────────────── */

export interface Figure {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  /** Only where the colour carries meaning. */
  tone?: 'red' | 'volt' | 'green';
  onOpen?: () => void;
}

const figTone = (t?: Figure['tone']) =>
  t === 'red'
    ? 'text-red-400'
    : t === 'volt'
      ? 'text-elec-yellow'
      : t === 'green'
        ? 'text-emerald-400'
        : 'text-white';

/** The Overview MoneyStrip, without its Finance link: 2×2 on a phone, one row from sm. */
export function FigureStrip({
  figures,
  title,
  meta,
  className,
}: {
  figures: Figure[];
  title?: string;
  meta?: ReactNode;
  className?: string;
}) {
  const n = figures.length;
  const cols = n >= 4 ? 'sm:grid-cols-4' : n === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <div className={cn(panel, 'overflow-hidden', className)}>
      {title && (
        <div className="flex h-11 items-center gap-2 border-b border-white/[0.07] px-4 sm:px-5">
          <span className="text-[14px] font-semibold text-white">{title}</span>
          {meta && <span className="min-w-0 truncate text-[12.5px] text-white">{meta}</span>}
        </div>
      )}
      <div className={cn('grid grid-cols-2', cols)}>
        {figures.map((f, i) => {
          const cls = cn(
            'flex min-h-[84px] min-w-0 flex-col px-4 py-3 text-left sm:px-5',
            i % 2 === 1 && 'border-l border-white/[0.07]',
            i >= 2 && 'border-t border-white/[0.07] sm:border-t-0',
            i >= 2 && 'sm:border-l',
            n % 2 === 1 && i === n - 1 && 'col-span-2 sm:col-span-1'
          );
          const body = (
            <>
              <span className="text-[12px] font-semibold text-white">{f.label}</span>
              <span
                className={cn(
                  'mt-1 block truncate text-[20px] font-semibold leading-tight tracking-tight tabular-nums sm:text-[22px]',
                  figTone(f.tone)
                )}
              >
                {f.value}
              </span>
              {f.sub && (
                <span
                  className={cn(
                    'mt-0.5 block text-[11.5px] leading-snug line-clamp-2',
                    f.tone === 'red' ? 'text-red-300' : 'text-white'
                  )}
                >
                  {f.sub}
                </span>
              )}
            </>
          );
          return f.onOpen ? (
            <button
              key={f.label}
              type="button"
              onClick={f.onOpen}
              className={cn(cls, 'transition-colors touch-manipulation hover:bg-white/[0.04]')}
            >
              {body}
            </button>
          ) : (
            <div key={f.label} className={cls}>
              {body}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Status ──────────────────────────────────────────────────────────── */

export type PillTone = 'neutral' | 'volt' | 'green' | 'red';

/** One small outlined status per row (volt is the one solid fill). */
export function StatusPill({
  tone = 'neutral',
  dot,
  children,
  className,
}: {
  tone?: PillTone;
  /** A solid colour class for a small leading dot (e.g. a job stage colour). */
  dot?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[12px] font-semibold tabular-nums',
        tone === 'volt' && 'bg-elec-yellow text-black',
        tone === 'green' && 'border border-emerald-500/40 text-emerald-400',
        tone === 'red' && 'border border-red-500/40 text-red-400',
        tone === 'neutral' && 'border border-white/[0.16] text-white',
        className
      )}
    >
      {dot && <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dot)} />}
      {children}
    </span>
  );
}

export type TagTone = 'neutral' | 'yellow' | 'green' | 'done' | 'red' | 'outline';

const tagTone: Record<TagTone, string> = {
  neutral: 'bg-white/[0.1] text-white',
  yellow: 'bg-elec-yellow text-black',
  green: 'bg-emerald-500 text-black',
  done: 'bg-white/[0.08] text-emerald-300',
  red: 'bg-red-500 text-white',
  outline: 'border border-white/[0.18] text-white',
};

/** A solid-filled status, the Overview Today/Week panels' tag. */
export function Tag({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none tabular-nums',
        tagTone[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Initials ────────────────────────────────────────────────────────── */

/** Round initials, as on the Overview's Today panel. Pass `name` or ready `text`. */
export function Initials({
  name,
  text,
  fallback = '?',
  live,
  className,
}: {
  name?: string;
  text?: string;
  fallback?: string;
  /** Green "on site" dot. */
  live?: boolean;
  className?: string;
}) {
  const initials =
    text ??
    ((name ?? '')
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() ||
      fallback);
  return (
    <span
      aria-hidden
      className={cn(
        'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[12.5px] font-bold text-white',
        className
      )}
    >
      {initials}
      {live && (
        <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
      )}
    </span>
  );
}

/* ── Rows ────────────────────────────────────────────────────────────── */

/** Hairline dividers between rows inside a `panel`. */
export const rowsClass = 'divide-y divide-white/[0.07]';

/** Rows container: hairline dividers inside a panel. */
export function Rows({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(rowsClass, className)}>{children}</div>;
}

/** A panel holding divided rows. */
export function RowList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(panel, 'overflow-hidden', className)}>
      <div className={rowsClass}>{children}</div>
    </div>
  );
}

/**
 * A list row: a 15px title, one 13px detail line, and one trailing status or
 * action. Money rows put a right-aligned tabular `amount` with its `status`
 * under it. Tappable rows get a chevron unless `chevron={false}`.
 */
export function Row({
  lead,
  title,
  detail,
  meta,
  amount,
  status,
  action,
  trailing,
  onClick,
  chevron,
  wrapDetail = false,
  className,
  'data-help': dataHelp,
}: {
  lead?: ReactNode;
  title: ReactNode;
  detail?: ReactNode;
  /** A second short coloured line, e.g. a due date in volt or red. */
  meta?: ReactNode;
  /** Right-aligned money, with `status` under it. */
  amount?: ReactNode;
  status?: ReactNode;
  /** A button after the amount column. */
  action?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  chevron?: boolean;
  /** Let the detail run to two lines (hub link rows) instead of one. */
  wrapDetail?: boolean;
  className?: string;
  'data-help'?: string;
}) {
  const showChevron = chevron ?? !!onClick;
  const body = (
    <>
      {lead}
      <div className="min-w-0 flex-1">
        {/* Phone: up to two lines, never cut mid-sentence. Desktop has the room for one. */}
        <div className="line-clamp-2 text-[15px] font-semibold leading-snug text-white sm:line-clamp-none sm:truncate">
          {title}
        </div>
        {detail && (
          <div
            className={cn(
              'mt-0.5 text-[13px] text-white',
              wrapDetail ? 'line-clamp-2' : 'line-clamp-2 sm:line-clamp-none sm:truncate'
            )}
          >
            {detail}
          </div>
        )}
        {meta && <div className="mt-0.5 text-[12.5px] font-medium text-white">{meta}</div>}
      </div>
      {(amount !== undefined || status) && (
        <div className="flex shrink-0 flex-col items-end gap-1">
          {amount !== undefined && (
            <span className="text-[15px] font-semibold tabular-nums text-white">{amount}</span>
          )}
          {status}
        </div>
      )}
      {action && <div className="shrink-0">{action}</div>}
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
      {showChevron && <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-white" />}
    </>
  );
  const base = cn(
    'flex w-full min-h-[60px] items-center gap-3 px-4 py-3 text-left sm:px-5',
    className
  );
  if (!onClick) {
    return (
      <div className={base} data-help={dataHelp}>
        {body}
      </div>
    );
  }
  return (
    <div
      role="button"
      tabIndex={0}
      data-help={dataHelp}
      onClick={onClick}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        base,
        'cursor-pointer touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60'
      )}
    >
      {body}
    </div>
  );
}

/** Label/value line for a side panel ("Labour spend   £219"). */
export function KeyValue({
  label,
  value,
  tone,
  onClick,
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: 'red' | 'yellow' | 'green';
  onClick?: () => void;
}) {
  const cls = cn(
    'flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left sm:px-5',
    onClick && 'touch-manipulation hover:bg-white/[0.04]'
  );
  const inner = (
    <>
      <span className="min-w-0 truncate text-[14px] text-white">{label}</span>
      <span
        className={cn(
          'shrink-0 text-[15px] font-semibold tabular-nums',
          tone === 'red'
            ? 'text-red-400'
            : tone === 'yellow'
              ? 'text-elec-yellow'
              : tone === 'green'
                ? 'text-emerald-400'
                : 'text-white'
        )}
      >
        {value}
      </span>
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ── Panel head ──────────────────────────────────────────────────────── */

/**
 * A title row inside a panel, the way the Overview's Money panel opens:
 * 16px title, optional meta, optional yellow action on the right.
 */
export function PanelHead({
  title,
  meta,
  action,
  onAction,
}: {
  title: string;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[52px] items-center gap-3 border-b border-white/[0.07] px-4 sm:px-5">
      <h2 className="text-[16px] font-semibold tracking-tight text-white">{title}</h2>
      {meta && <div className="flex min-w-0 items-center gap-2">{meta}</div>}
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="ml-auto flex h-11 shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          {action}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

/** A panel shell for a settings-style card. */
export const panelShellClass = cn(panel, 'overflow-hidden');

/* ── Empty state ─────────────────────────────────────────────────────── */

/**
 * One plain sentence and at most one button. Inside its own panel unless
 * `bare` (already in a panel). A string `action` with `onAction` draws the
 * standard button; any other node is drawn as given. `stacked` keeps the
 * button under the sentence (narrow columns).
 */
export function PlainEmpty({
  text,
  action,
  onAction,
  bare = false,
  stacked = false,
  className,
}: {
  text: ReactNode;
  action?: ReactNode;
  onAction?: () => void;
  bare?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        !bare && panel,
        'flex flex-col gap-3 px-4 py-4 sm:px-5',
        stacked ? 'items-start' : 'sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <p className={cn('min-w-0 text-[14px] leading-snug text-white', !stacked && 'flex-1')}>
        {text}
      </p>
      {typeof action === 'string'
        ? onAction && (
            <button
              type="button"
              onClick={onAction}
              className="h-11 shrink-0 self-start rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] sm:self-auto"
            >
              {action}
            </button>
          )
        : action}
    </div>
  );
}

/* ── Filters ─────────────────────────────────────────────────────────── */

/**
 * Filter tabs that never scroll sideways. By default one segmented control
 * that fills the width on a phone (a set too long for one phone row falls
 * into a three-column grid there); `wrap` draws wrapping chips instead.
 */
export function Segments<T extends string>({
  items,
  value,
  onChange,
  wrap = false,
  quiet = false,
  className,
}: {
  items: readonly { value: T; label: string; count?: number }[];
  value: NoInfer<T>;
  onChange: (v: NoInfer<T>) => void;
  wrap?: boolean;
  /** A second filter next to a yellow one: the chosen option is white, not yellow. */
  quiet?: boolean;
  className?: string;
}) {
  const onCls = quiet ? 'bg-white text-black' : 'bg-elec-yellow text-black';
  if (wrap) {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {items.map((it) => {
          const on = it.value === value;
          return (
            <button
              key={it.value}
              type="button"
              onClick={() => onChange(it.value)}
              aria-pressed={on}
              className={cn(
                'h-11 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[13px] font-semibold touch-manipulation transition-colors',
                on
                  ? quiet
                    ? 'border-white bg-white text-black'
                    : 'border-elec-yellow bg-elec-yellow text-black'
                  : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              )}
            >
              {it.label}
              {typeof it.count === 'number' && (
                <span className="ml-1.5 tabular-nums">{it.count}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
  // Too long for one phone row (roughly 36 characters across 358px).
  const chars = items.reduce(
    (n, it) =>
      n + it.label.length + (typeof it.count === 'number' ? String(it.count).length + 1 : 0),
    0
  );
  const many = items.length > 5 || (items.length > 3 && chars > 36);
  return (
    <div
      role="tablist"
      className={cn(
        'w-full min-w-0 border border-white/[0.12] bg-white/[0.04] p-0.5 sm:flex sm:w-auto sm:rounded-full',
        // Too many for one phone row: one row that scrolls sideways, like a
        // native segmented strip, rather than an uneven grid.
        many
          ? 'flex overflow-x-auto overscroll-x-contain rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'flex rounded-full',
        className
      )}
    >
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(it.value)}
            className={cn(
              'h-11 whitespace-nowrap rounded-full text-[12.5px] font-semibold touch-manipulation transition-colors sm:flex-none sm:px-4 sm:text-[13px]',
              many ? 'shrink-0 px-3.5' : 'min-w-0 flex-auto truncate px-1.5',
              on ? onCls : 'text-white hover:bg-white/[0.06]'
            )}
          >
            {it.label}
            {typeof it.count === 'number' && (
              <span className="ml-1 tabular-nums sm:ml-1.5">{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Search field with a clear button. Give it a width via `className`. */
export function SearchField({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative min-w-0', className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
      />
      <input
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 w-full rounded-full border border-white/[0.12] bg-white/[0.04] pl-10 pr-10 text-[14px] text-white placeholder:text-white/60 focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-white touch-manipulation"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/** Class for a hand-built search input (icon placed by the caller at left-3.5). */
export const searchInputClass =
  'h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] pl-10 pr-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

/** Filters (segments) and search on one tidy row on desktop, stacked on a phone. */
export function FilterRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Text ────────────────────────────────────────────────────────────── */

export function plural(n: number, one: string, many = `${one}s`) {
  return `${n.toLocaleString('en-GB')} ${n === 1 ? one : many}`;
}
