/**
 * College Primitives — shared editorial building blocks.
 * Monochrome + elec-yellow accent. Hairline dividers. No icons.
 * Every college hub/section/feature composes from these.
 */

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

export { PeopleListRow } from './PeopleListRow';
export type {
  PeopleListRowProps,
  PeopleListRowAction,
  LeadSlot,
  StatusPill,
  AccentTone,
} from './PeopleListRow';

/* ────────────────────────────────────────────────────────
   Tone tokens — family-level colour memory
   ──────────────────────────────────────────────────────── */

export type Tone =
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'purple'
  | 'yellow'
  | 'green'
  | 'orange'
  | 'red'
  | 'cyan'
  | 'indigo';

export const toneAccent: Record<Tone, string> = {
  blue: 'from-blue-500/70 via-blue-400/70 to-cyan-400/70',
  emerald: 'from-emerald-500/70 via-emerald-400/70 to-green-400/70',
  amber: 'from-amber-500/70 via-amber-400/70 to-yellow-400/70',
  purple: 'from-purple-500/70 via-violet-400/70 to-indigo-400/70',
  yellow: 'from-elec-yellow/80 via-amber-400/70 to-orange-400/70',
  green: 'from-green-500/70 via-emerald-400/70 to-green-400/70',
  orange: 'from-orange-500/70 via-amber-400/70 to-orange-500/70',
  red: 'from-red-500/70 via-rose-400/70 to-red-500/70',
  cyan: 'from-cyan-500/70 via-sky-400/70 to-blue-400/70',
  indigo: 'from-indigo-500/70 via-violet-400/70 to-purple-400/70',
};

export const toneText: Record<Tone, string> = {
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  yellow: 'text-elec-yellow',
  green: 'text-green-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
  cyan: 'text-cyan-400',
  indigo: 'text-indigo-400',
};

export const toneDot: Record<Tone, string> = {
  blue: 'bg-blue-400',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  purple: 'bg-purple-400',
  yellow: 'bg-elec-yellow',
  green: 'bg-green-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
  cyan: 'bg-cyan-400',
  indigo: 'bg-indigo-400',
};

/* ────────────────────────────────────────────────────────
   Motion
   ──────────────────────────────────────────────────────── */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

/* ────────────────────────────────────────────────────────
   Atoms
   ──────────────────────────────────────────────────────── */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'text-[10px] font-medium uppercase tracking-[0.18em] text-white',
        className
      )}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = 'yellow',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const colour =
    tone === 'red'
      ? 'bg-red-500/10 text-red-400 border-red-500/20'
      : tone === 'orange'
        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        : tone === 'amber'
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          : tone === 'green'
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : tone === 'emerald'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : tone === 'blue'
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                : tone === 'cyan'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  : tone === 'purple'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : tone === 'indigo'
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
  return (
    <span
      className={cn(
        'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border tabular-nums',
        colour,
        className
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = 'yellow', className }: { tone?: Tone; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block h-1.5 w-1.5 rounded-full shrink-0', toneDot[tone], className)}
    />
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all',
        className
      )}
    >
      →
    </span>
  );
}

/* ────────────────────────────────────────────────────────
   Page hero — replaces coloured-bar hub headers
   ──────────────────────────────────────────────────────── */

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  tone?: Tone;
}

export function PageHero({ eyebrow, title, description, actions, tone }: PageHeroProps) {
  return (
    <div className="relative">
      {tone && (
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
            toneAccent[tone]
          )}
        />
      )}
      <div className="pt-6 sm:pt-8 lg:pt-10 pb-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-1.5 text-[22px] sm:text-[32px] lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] sm:leading-[1.08] break-words hyphens-auto">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-[13px] sm:text-sm text-white max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="shrink-0 flex items-center gap-2 flex-wrap self-start sm:self-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Section header — within a page
   ──────────────────────────────────────────────────────── */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ eyebrow, title, action, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {action && onAction && (
        <button
          onClick={onAction}
          className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors shrink-0 touch-manipulation"
        >
          {action} →
        </button>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Stat strip — 4-cell hairline numeral grid
   ──────────────────────────────────────────────────────── */

interface StatCell {
  value: number | string;
  label: string;
  sub?: string;
  onClick?: () => void;
  tone?: Tone;
  accent?: boolean;
}

interface StatStripProps {
  stats: StatCell[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export function StatStrip({ stats, columns = 4, className }: StatStripProps) {
  const colClass =
    columns === 5
      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      : columns === 3
        ? 'grid-cols-2 md:grid-cols-3'
        : columns === 2
          ? 'grid-cols-2'
          : 'grid-cols-2 md:grid-cols-4';

  return (
    <div
      className={cn(
        'grid gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden',
        colClass,
        className
      )}
    >
      {stats.map((stat, i) => {
        const valueClass = stat.accent
          ? 'text-elec-yellow'
          : stat.tone
            ? toneText[stat.tone]
            : 'text-white';

        // Long text values (e.g. "Foundation") need a smaller scale than
        // pure numbers so they don't overflow the cell on mobile.
        const valueStr = String(stat.value);
        const isNumericish =
          typeof stat.value === 'number' || /^[\d.,+\-/%hkm]+$/i.test(valueStr);
        const sizeClass =
          isNumericish || valueStr.length <= 4
            ? 'text-3xl sm:text-5xl lg:text-6xl'
            : valueStr.length <= 8
              ? 'text-xl sm:text-3xl lg:text-4xl'
              : 'text-base sm:text-2xl lg:text-3xl';

        const content = (
          <>
            <Eyebrow>
              {String(i + 1).padStart(2, '0')} · {stat.label}
            </Eyebrow>
            <span
              className={cn(
                'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none break-words max-w-full',
                sizeClass,
                valueClass
              )}
            >
              {stat.value}
            </span>
            {stat.sub && <span className="mt-3 text-[11px] text-white">{stat.sub}</span>}
          </>
        );

        const baseClass =
          'group flex flex-col items-start bg-[hsl(0_0%_12%)] transition-colors px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8 text-left';

        return stat.onClick ? (
          <button
            key={`${stat.label}-${i}`}
            onClick={stat.onClick}
            className={cn(baseClass, 'hover:bg-[hsl(0_0%_15%)] touch-manipulation')}
          >
            {content}
          </button>
        ) : (
          <div key={`${stat.label}-${i}`} className={baseClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Hub grid — hairline grid wrapper
   ──────────────────────────────────────────────────────── */

export function HubGrid({
  columns = 4,
  className,
  children,
}: {
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  const colClass =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : columns === 2
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1';
  return (
    <div
      className={cn(
        'grid gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden',
        colClass,
        className
      )}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Hub card — big numbered editorial card
   ──────────────────────────────────────────────────────── */

interface HubCardProps {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  tone?: Tone;
  onClick?: () => void;
  href?: string;
  size?: 'md' | 'sm';
  badge?: ReactNode;
  cta?: string;
}

export function HubCard({
  number,
  eyebrow,
  title,
  description,
  meta,
  tone = 'yellow',
  onClick,
  size = 'md',
  badge,
  cta = 'Open',
}: HubCardProps) {
  const minH =
    size === 'sm' ? 'min-h-[140px] sm:min-h-[160px]' : 'min-h-[200px] sm:min-h-[240px] lg:min-h-[260px]';
  const titleClass =
    size === 'sm'
      ? 'text-lg sm:text-xl font-semibold'
      : 'text-2xl sm:text-[26px] lg:text-[30px] font-semibold';

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col',
        minH
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
          toneAccent[tone]
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <Eyebrow>
          {number ? `${number} · ` : ''}
          {eyebrow}
        </Eyebrow>
        {badge && <span className="shrink-0">{badge}</span>}
      </div>
      <h3 className={cn('mt-4 text-white tracking-tight leading-[1.1]', titleClass)}>
        {title}
      </h3>
      {description && (
        <p className="mt-2.5 text-[13px] leading-relaxed text-white max-w-[34ch]">
          {description}
        </p>
      )}
      <div className="flex-grow" />
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <span className="text-[11px] text-white truncate">{meta ?? ''}</span>
        <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0 ml-3">
          {cta} →
        </span>
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   List card — card surface wrapping hairline-divided rows
   ──────────────────────────────────────────────────────── */

export function ListCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   List row — inside a ListCard
   ──────────────────────────────────────────────────────── */

interface ListRowProps {
  lead?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
  accent?: Tone;
}

export function ListRow({
  lead,
  title,
  subtitle,
  trailing,
  onClick,
  className,
  accent,
}: ListRowProps) {
  const Inner = (
    <>
      {accent && (
        <span
          aria-hidden
          className={cn('w-[3px] h-10 rounded-full shrink-0', toneDot[accent])}
        />
      )}
      {lead && <div className="shrink-0">{lead}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-sm sm:text-[15px] font-medium text-white truncate">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-[11.5px] text-white truncate">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  );

  const base =
    'group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation';

  return onClick ? (
    <button
      onClick={onClick}
      className={cn(base, 'hover:bg-[hsl(0_0%_15%)] transition-colors', className)}
    >
      {Inner}
    </button>
  ) : (
    <div className={cn(base, className)}>{Inner}</div>
  );
}

/* ────────────────────────────────────────────────────────
   Empty state
   ──────────────────────────────────────────────────────── */

// forwardRef so framer-motion's AnimatePresence can measure the element when
// it's rendered as a direct child of <AnimatePresence>.
export const EmptyState = forwardRef<
  HTMLDivElement,
  {
    title: string;
    description?: string;
    action?: string;
    onAction?: () => void;
    className?: string;
  }
>(({ title, description, action, onAction, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 sm:py-14 text-center',
        className
      )}
    >
      <div className="text-base font-medium text-white">{title}</div>
      {description && (
        <p className="mt-2 text-[12.5px] text-white max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
        >
          {action} →
        </button>
      )}
    </div>
  );
});
EmptyState.displayName = 'EmptyState';

/* ────────────────────────────────────────────────────────
   Loading state
   ──────────────────────────────────────────────────────── */

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-20', className)}>
      <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Text button — primary action link
   ──────────────────────────────────────────────────────── */

export function TextAction({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation',
        className
      )}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   Page frame — wraps the whole page: max-w, motion, spacing
   ──────────────────────────────────────────────────────── */

export function PageFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'mx-auto max-w-7xl space-y-10 sm:space-y-14 lg:space-y-16 pb-8',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Filter bar — pill-tabs + search (no icons)
   ──────────────────────────────────────────────────────── */

interface FilterBarProps {
  tabs?: { value: string; label: string; count?: number }[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
}

export function FilterBar({
  tabs,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  actions,
}: FilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      {tabs && tabs.length > 0 && (
        <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                activeTab === tab.value
                  ? 'bg-elec-yellow text-black'
                  : 'text-white hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {tab.label}
              {typeof tab.count === 'number' && (
                <span
                  className={cn(
                    'ml-1.5 tabular-nums text-[11px]',
                    activeTab === tab.value ? 'text-black/60' : 'text-white'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 lg:ml-auto">
        {onSearchChange && (
          <input
            type="text"
            value={search ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 px-4 w-full lg:w-72 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
          />
        )}
        {actions}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Form field class constants — match college aesthetic
   ──────────────────────────────────────────────────────── */

export const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

export const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

export const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

export const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none';

export const fieldLabelClass = 'text-[11.5px] text-white mb-1.5 block';

export const checkboxClass =
  'h-5 w-5 rounded border border-white/[0.15] bg-[hsl(0_0%_9%)] data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black touch-manipulation';

/* ────────────────────────────────────────────────────────
   Field — label + input wrapper
   ──────────────────────────────────────────────────────── */

export function Field({
  label,
  hint,
  required,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className={fieldLabelClass}>
          {label}
          {required && <span className="ml-1 text-elec-yellow">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-[11px] text-white">{hint}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   FormCard — grouped section wrapper with optional eyebrow
   ──────────────────────────────────────────────────────── */

export function FormCard({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3',
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   FormGrid — responsive multi-column field layout
   ──────────────────────────────────────────────────────── */

export function FormGrid({
  cols = 2,
  children,
  className,
}: {
  cols?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  const gridClass =
    cols === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : cols === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1';
  return <div className={cn('grid gap-3', gridClass, className)}>{children}</div>;
}

/* ────────────────────────────────────────────────────────
   Buttons — canonical variants
   ──────────────────────────────────────────────────────── */

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeToClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-9 px-4 text-[12.5px]',
  md: 'h-11 px-5 text-[13px]',
  lg: 'h-12 px-6 text-[14px]',
};

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
  className,
  size = 'md',
  fullWidth,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all touch-manipulation',
        sizeToClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
  className,
  size = 'md',
  fullWidth,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all touch-manipulation',
        sizeToClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function DestructiveButton({
  children,
  onClick,
  disabled,
  type = 'button',
  className,
  size = 'md',
  fullWidth,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/20 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all touch-manipulation',
        sizeToClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function IconButton({
  children,
  onClick,
  disabled,
  'aria-label': ariaLabel,
  className,
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation',
        className
      )}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   SheetShell — drag handle + eyebrow header + body + footer
   ──────────────────────────────────────────────────────── */

export function SheetShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col h-full bg-[hsl(0_0%_8%)]', className)}>
      <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
        <div className="h-1 w-10 rounded-full bg-white/20" />
      </div>
      <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div className="mt-1 text-[20px] font-semibold text-white leading-tight">
          {title}
        </div>
        {description && (
          <div className="mt-1.5 text-[12.5px] text-white">{description}</div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
        {children}
      </div>
      {footer && (
        <div className="flex-shrink-0 border-t border-white/[0.06] p-4 flex flex-row gap-2">
          {footer}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Success checkmark overlay
   ──────────────────────────────────────────────────────── */

export function SuccessCheckmark({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-20 w-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-[40px] leading-none font-semibold text-emerald-400"
              aria-hidden
            >
              ✓
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
