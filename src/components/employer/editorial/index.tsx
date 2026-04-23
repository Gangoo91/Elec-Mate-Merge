/**
 * Admin editorial primitives — best-in-class monochrome + elec-yellow.
 * Modelled on the college dashboard primitives but owned by admin so the two
 * surfaces can evolve independently.
 * Hairline dividers. No icon-buckets. Large editorial numerals.
 */

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import type { ReactNode } from 'react';

/* ────────────────────────────────────────────────────────
   Tone tokens
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

const pillTone: Record<Tone, string> = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

/* ────────────────────────────────────────────────────────
   Motion
   ──────────────────────────────────────────────────────── */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
};

export const rowVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 340, damping: 28 },
  },
};

/* ────────────────────────────────────────────────────────
   Atoms
   ──────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
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
  return (
    <span
      className={cn(
        'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border tabular-nums',
        pillTone[tone],
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

export function PulseDot({
  tone = 'green',
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('inline-block h-2 w-2 rounded-full shrink-0 animate-pulse', toneDot[tone], className)}
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

export function Divider({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 pt-2', className)}>
      <div className="h-px flex-1 bg-white/[0.06]" />
      {label && (
        <span className="text-[10px] text-white font-semibold uppercase tracking-[0.2em]">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-white/[0.06]" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Page hero
   ──────────────────────────────────────────────────────── */

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  tone?: Tone;
  live?: { label?: string; tone?: Tone };
  meta?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  tone,
  live,
  meta,
}: PageHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {tone && (
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
            toneAccent[tone]
          )}
        />
      )}
      <div className="pt-4 sm:pt-6 lg:pt-8 pb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {live && (
              <span className="inline-flex items-center gap-1.5">
                <PulseDot tone={live.tone ?? 'green'} />
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  {live.label ?? 'Live'}
                </span>
              </span>
            )}
          </div>
          <h1 className="mt-2 text-[24px] sm:text-[36px] lg:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.15] sm:leading-[1.05] break-words hyphens-auto">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-[13px] sm:text-sm text-white max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          {meta && <div className="mt-3">{meta}</div>}
        </div>
        {actions && (
          <div className="shrink-0 flex items-center gap-2 flex-wrap">{actions}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Section header
   ──────────────────────────────────────────────────────── */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ eyebrow, title, meta, action, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div className="mt-1.5 flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tracking-tight leading-tight">
            {title}
          </h2>
          {meta}
        </div>
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
   Hero number — one big figure with supporting metrics
   Used for the Revenue / MRR card and equivalents.
   ──────────────────────────────────────────────────────── */

interface HeroNumberProps {
  eyebrow: string;
  value: ReactNode;
  caption?: string;
  columns?: { label: string; value: ReactNode; tone?: Tone }[];
  legend?: { label: string; value: ReactNode; tone?: Tone }[];
  actions?: ReactNode;
  tone?: Tone;
  onClick?: () => void;
  live?: boolean;
}

export function HeroNumber({
  eyebrow,
  value,
  caption,
  columns,
  legend,
  actions,
  tone = 'yellow',
  onClick,
  live,
}: HeroNumberProps) {
  const body = (
    <>
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
          toneAccent[tone]
        )}
      />
      <div className="relative p-5 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {live && <PulseDot tone="green" />}
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          {actions && <div className="shrink-0 -mt-1">{actions}</div>}
        </div>
        <div className="mt-5">
          <div className="text-[40px] sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-none tabular-nums">
            {value}
          </div>
          {caption && (
            <div className="mt-2 text-[13px] text-white">{caption}</div>
          )}
        </div>
        {columns && columns.length > 0 && (
          <div
            className="mt-6 sm:mt-8 grid gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {columns.map((col, i) => (
              <div
                key={`${col.label}-${i}`}
                className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:py-5 text-center"
              >
                <div
                  className={cn(
                    'text-xl sm:text-2xl lg:text-[28px] font-semibold tabular-nums leading-none',
                    col.tone ? toneText[col.tone] : 'text-white'
                  )}
                >
                  {col.value}
                </div>
                <div className="mt-2 text-[10px] text-white uppercase tracking-[0.14em] font-medium">
                  {col.label}
                </div>
              </div>
            ))}
          </div>
        )}
        {legend && legend.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legend.map((entry, i) => (
              <div key={`${entry.label}-${i}`} className="flex items-center gap-1.5">
                <Dot tone={entry.tone ?? 'yellow'} />
                <span className="text-[11px] text-white">{entry.label}</span>
                <span
                  className={cn(
                    'text-[11px] font-semibold tabular-nums',
                    entry.tone ? toneText[entry.tone] : 'text-white'
                  )}
                >
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const base =
    'group relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden';

  return onClick ? (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        base,
        'cursor-pointer hover:bg-[hsl(0_0%_14%)] transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      {body}
    </div>
  ) : (
    <div className={base}>{body}</div>
  );
}

/* ────────────────────────────────────────────────────────
   Stat strip — hairline numeral grid
   ──────────────────────────────────────────────────────── */

interface StatCell {
  value: number | string | ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
  tone?: Tone;
  accent?: boolean;
}

interface StatStripProps {
  stats: StatCell[];
  columns?: 2 | 3 | 4 | 5;
  numbered?: boolean;
  className?: string;
}

export function StatStrip({
  stats,
  columns = 4,
  numbered = false,
  className,
}: StatStripProps) {
  const colClass =
    columns === 5
      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      : columns === 3
        ? 'grid-cols-2 md:grid-cols-3'
        : columns === 2
          ? 'grid-cols-2'
          : 'grid-cols-2 md:grid-cols-4';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'grid gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden',
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

        const content = (
          <>
            <Eyebrow>
              {numbered ? `${String(i + 1).padStart(2, '0')} · ${stat.label}` : stat.label}
            </Eyebrow>
            <span
              className={cn(
                'mt-3 sm:mt-4 font-semibold tabular-nums tracking-[-0.02em] leading-none',
                'text-[30px] sm:text-4xl lg:text-[48px]',
                valueClass
              )}
            >
              {stat.value}
            </span>
            {stat.sub && <span className="mt-2.5 text-[11px] text-white">{stat.sub}</span>}
            {stat.onClick && (
              <span className="mt-2 text-[11px] font-medium text-elec-yellow/0 group-hover:text-elec-yellow/90 transition-colors">
                Open →
              </span>
            )}
          </>
        );

        const baseClass =
          'group relative flex flex-col items-start bg-[hsl(0_0%_12%)] transition-colors px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7 text-left overflow-hidden';

        return stat.onClick ? (
          <motion.button
            key={`${stat.label}-${i}`}
            variants={itemVariants}
            onClick={stat.onClick}
            whileTap={{ scale: 0.985 }}
            className={cn(
              baseClass,
              'cursor-pointer hover:bg-[hsl(0_0%_15%)] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
            )}
          >
            {content}
          </motion.button>
        ) : (
          <motion.div
            key={`${stat.label}-${i}`}
            variants={itemVariants}
            className={baseClass}
          >
            {content}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Alert row
   ──────────────────────────────────────────────────────── */

interface AlertRowProps {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  tone?: Tone;
  onClick?: () => void;
}

export function AlertRow({
  title,
  subtitle,
  trailing,
  tone = 'orange',
  onClick,
}: AlertRowProps) {
  const base =
    'group relative w-full flex items-center gap-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation transition-colors';
  const inner = (
    <>
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
          toneAccent[tone]
        )}
      />
      <Dot tone={tone} />
      <div className="flex-1 min-w-0">
        <div className="text-sm sm:text-[15px] font-semibold text-white truncate">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-[12px] text-white truncate">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      <Arrow className="shrink-0" />
    </>
  );
  return onClick ? (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        base,
        'cursor-pointer hover:bg-[hsl(0_0%_15%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      {inner}
    </div>
  ) : (
    <div className={base}>{inner}</div>
  );
}

/* ────────────────────────────────────────────────────────
   List card + list row
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
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ListCardHeader({
  title,
  meta,
  action,
  onAction,
  tone,
}: {
  title: ReactNode;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
  tone?: Tone;
}) {
  return (
    <div className="relative border-b border-white/[0.06]">
      {tone && (
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
            toneAccent[tone]
          )}
        />
      )}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 sm:py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-[13px] font-semibold text-white truncate">{title}</div>
          {meta}
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
    </div>
  );
}

export function ListBody({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="divide-y divide-white/[0.06]"
    >
      {children}
    </motion.div>
  );
}

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
        <div className="text-[14px] font-medium text-white truncate">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-[11.5px] text-white truncate">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="shrink-0 flex items-center gap-2">{trailing}</div>}
      {onClick && (
        <span
          aria-hidden
          className="shrink-0 -mr-1 text-white/0 group-hover:text-elec-yellow group-hover:translate-x-0 -translate-x-1 transition-all text-[14px]"
        >
          →
        </span>
      )}
    </>
  );

  const base =
    'group w-full flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4 text-left touch-manipulation';

  return onClick ? (
    <motion.div
      variants={rowVariants}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        base,
        'cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60',
        className
      )}
    >
      {Inner}
    </motion.div>
  ) : (
    <motion.div variants={rowVariants} className={cn(base, className)}>
      {Inner}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Avatar
   ──────────────────────────────────────────────────────── */

export function Avatar({
  initials,
  size = 'md',
  online,
  className,
}: {
  initials: string;
  size?: 'sm' | 'md';
  online?: boolean;
  className?: string;
}) {
  const dim = size === 'sm' ? 'h-8 w-8 text-[10px]' : 'h-9 w-9 text-[11px]';
  return (
    <div className={cn('relative shrink-0', className)}>
      <div
        className={cn(
          'rounded-lg bg-white/[0.06] text-white border border-white/[0.08] flex items-center justify-center font-semibold',
          dim
        )}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[hsl(0_0%_12%)]',
            online ? 'bg-green-500' : 'bg-white/20'
          )}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Hub card
   ──────────────────────────────────────────────────────── */

interface HubCardProps {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  tone?: Tone;
  onClick?: () => void;
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
    size === 'sm' ? 'min-h-[140px] sm:min-h-[160px]' : 'min-h-[180px] sm:min-h-[220px]';
  const titleClass =
    size === 'sm'
      ? 'text-lg sm:text-xl font-semibold'
      : 'text-xl sm:text-2xl lg:text-[26px] font-semibold';

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col',
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
      <h3 className={cn('mt-3 text-white tracking-tight leading-[1.1]', titleClass)}>
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-[12.5px] leading-relaxed text-white max-w-[34ch]">
          {description}
        </p>
      )}
      <div className="flex-grow" />
      <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
        <span className="text-[11px] text-white truncate">{meta ?? ''}</span>
        <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0 ml-3">
          {cta} →
        </span>
      </div>
    </button>
  );
}

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
        'grid gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden',
        colClass,
        className
      )}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Collapsible group (used in dashboard for Paid/Trial/Churned)
   ──────────────────────────────────────────────────────── */

export function GroupHeader({
  tone = 'yellow',
  label,
  count,
  open,
  onClick,
}: {
  tone?: Tone;
  label: string;
  count: number;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 sm:px-5 py-3 touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <Dot tone={tone} />
        <span className="text-[11px] font-semibold text-white uppercase tracking-[0.14em]">
          {label}
        </span>
        <span className={cn('text-[11px] font-semibold tabular-nums', toneText[tone])}>
          {count}
        </span>
      </div>
      <span
        className={cn(
          'text-white text-[13px] transition-transform duration-200',
          open && 'rotate-180'
        )}
        aria-hidden
      >
        ⌄
      </span>
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   Empty / loading
   ──────────────────────────────────────────────────────── */

export function EmptyState({
  title,
  description,
  action,
  onAction,
  className,
}: {
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
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
}

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-20', className)}>
      <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
    </div>
  );
}

export function LoadingBlocks({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 animate-pulse', className)}>
      <div className="h-48 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
      <div className="h-24 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-[hsl(0_0%_12%)] border-white/[0.06]"
          />
        ))}
      </div>
      <div className="h-80 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Text action, Icon button
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
        'h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation',
        className
      )}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   Page frame
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
        'mx-auto max-w-7xl space-y-8 sm:space-y-10 lg:space-y-14 pb-24',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Filter bar — pill tabs + search
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
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!onSearchChange) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onSearchChange]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      {tabs && tabs.length > 0 && (
        <div className="relative flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`filter-tab-${tabs.map((t) => t.value).join('-')}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 bg-elec-yellow rounded-full"
                  />
                )}
                <span
                  className={cn(
                    'relative z-10',
                    isActive ? 'text-black' : 'text-white'
                  )}
                >
                  {tab.label}
                  {typeof tab.count === 'number' && (
                    <span
                      className={cn(
                        'ml-1.5 tabular-nums text-[11px]',
                        isActive ? 'text-black/60' : 'text-white'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="flex items-center gap-2 lg:ml-auto">
        {onSearchChange && (
          <div className="relative w-full lg:w-80">
            <input
              ref={searchRef}
              type="text"
              value={search ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 pl-4 pr-10 w-full bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 focus-visible:ring-2 focus-visible:ring-elec-yellow/30 transition-colors touch-manipulation"
            />
            <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">/</Kbd>
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Keyboard shortcut hint
   ──────────────────────────────────────────────────────── */

export function Kbd({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono font-medium text-white',
        className
      )}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────
   Split layout — desktop 2-column, stacks on mobile
   ──────────────────────────────────────────────────────── */

export function SplitLayout({
  primary,
  secondary,
  ratio = '2-1',
  className,
}: {
  primary: ReactNode;
  secondary: ReactNode;
  ratio?: '2-1' | '1-1' | '3-2';
  className?: string;
}) {
  const cols =
    ratio === '1-1'
      ? 'lg:grid-cols-2'
      : ratio === '3-2'
        ? 'lg:grid-cols-[3fr_2fr]'
        : 'lg:grid-cols-[2fr_1fr]';
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:gap-8', cols, className)}>
      <div className="space-y-6 sm:space-y-8 min-w-0">{primary}</div>
      <div className="space-y-6 sm:space-y-8 min-w-0">{secondary}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Metric tile — KPI with trend delta (employer-specific)
   ──────────────────────────────────────────────────────── */

interface MetricTileProps {
  label: string;
  value: ReactNode;
  sub?: string;
  tone?: Tone;
  accent?: boolean;
  trend?: { direction: 'up' | 'down' | 'flat'; label: string };
  onClick?: () => void;
}

export function MetricTile({
  label,
  value,
  sub,
  tone,
  accent,
  trend,
  onClick,
}: MetricTileProps) {
  const valueClass = accent
    ? 'text-elec-yellow'
    : tone
      ? toneText[tone]
      : 'text-white';

  const trendTone: Tone = trend?.direction === 'up' ? 'emerald' : trend?.direction === 'down' ? 'red' : 'amber';
  const trendArrow = trend?.direction === 'up' ? '↑' : trend?.direction === 'down' ? '↓' : '→';

  const content = (
    <>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-3 sm:mt-4 flex items-baseline gap-3">
        <span
          className={cn(
            'font-semibold tabular-nums tracking-[-0.02em] leading-none',
            'text-[30px] sm:text-4xl lg:text-[44px]',
            valueClass
          )}
        >
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              toneText[trendTone]
            )}
          >
            {trendArrow} {trend.label}
          </span>
        )}
      </div>
      {sub && <span className="mt-2.5 text-[11px] text-white">{sub}</span>}
    </>
  );

  const base =
    'group flex flex-col items-start bg-[hsl(0_0%_12%)] transition-colors px-4 py-5 sm:px-5 sm:py-6 text-left';

  return onClick ? (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className={cn(base, 'cursor-pointer hover:bg-[hsl(0_0%_15%)] touch-manipulation')}
    >
      {content}
    </motion.button>
  ) : (
    <motion.div variants={itemVariants} className={base}>
      {content}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Quick action tile — big, obvious action buttons
   ──────────────────────────────────────────────────────── */

interface QuickActionTileProps {
  label: string;
  sub?: string;
  tone?: Tone;
  onClick: () => void;
}

export function QuickActionTile({
  label,
  sub,
  tone = 'yellow',
  onClick,
}: QuickActionTileProps) {
  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group relative h-full flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
          toneAccent[tone]
        )}
      />
      <div>
        <div className="text-[14px] font-semibold text-white">{label}</div>
        {sub && <div className="mt-0.5 text-[11.5px] text-white">{sub}</div>}
      </div>
      <span
        className={cn(
          'mt-3 text-[12px] font-medium transition-colors',
          toneText[tone]
        )}
      >
        Open →
      </span>
    </motion.button>
  );
}

/* ────────────────────────────────────────────────────────
   Hub landing template — page wrapper for a sub-hub
   (People / Jobs / Finance / Safety / SmartDocs)
   ──────────────────────────────────────────────────────── */

interface HubLandingProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  tone?: Tone;
  stats?: {
    label: string;
    value: ReactNode;
    tone?: Tone;
    accent?: boolean;
    onClick?: () => void;
  }[];
  children: ReactNode;
}

export function HubLanding({
  eyebrow,
  title,
  description,
  actions,
  tone = 'yellow',
  stats,
  children,
}: HubLandingProps) {
  return (
    <PageFrame>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
        tone={tone}
      />
      {stats && stats.length > 0 && <StatStrip stats={stats} columns={4} />}
      {children}
    </PageFrame>
  );
}

/* ────────────────────────────────────────────────────────
   Form field class constants (match college aesthetic)
   ──────────────────────────────────────────────────────── */

export const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

export const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

export const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

export const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none';

export const fieldLabelClass =
  'text-[11.5px] text-white mb-1.5 block';

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
  return (
    <div className={cn('grid gap-3', gridClass, className)}>{children}</div>
  );
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

/* ────────────────────────────────────────────────────────
   Sheet shell — drag handle + eyebrow header + scrollable body + footer
   Use inside <Sheet><SheetContent side="bottom" className="h-[85vh] p-0 ...">
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

/* ────────────────────────────────────────────────────────
   Re-exports for consumers
   ──────────────────────────────────────────────────────── */

export { AnimatePresence };
