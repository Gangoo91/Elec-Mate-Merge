import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  COLLEGE_LIST,
  CollegeLinkCard,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   Teaching, curriculum and resources: small building blocks shared by the
   hub pages and sections in this area, built only from the College Hub kit
   (CollegeUi). Nothing here has its own look; it arranges the kit.
   ========================================================================== */

/** Wraps a screen's blocks with the hub's vertical rhythm and stagger. */
export function TeachingScreen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-8 sm:space-y-10', className)}
    >
      {children}
    </motion.div>
  );
}

export interface QuickAction {
  title: string;
  body: string;
  onClick: () => void;
  primary?: boolean;
}

/** "Start something": one solid volt action, the rest as quiet cards. */
export function QuickActions({ items }: { items: QuickAction[] }) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'grid grid-cols-2 items-stretch gap-3',
        items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''
      )}
    >
      {items.map((a) => (
        <button
          key={a.title}
          type="button"
          onClick={a.onClick}
          className={cn(
            'group flex h-full min-h-[88px] flex-col justify-between rounded-3xl border p-4 text-left transition-colors touch-manipulation sm:p-5',
            a.primary
              ? 'border-elec-yellow bg-elec-yellow text-black hover:opacity-90'
              : 'border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] text-white hover:border-white/[0.2]'
          )}
        >
          <span className="flex w-full items-start justify-between gap-2">
            <span className="text-[14.5px] font-semibold leading-snug">{a.title}</span>
            <ChevronRight
              className={cn('mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5', a.primary ? 'text-black' : 'text-white')}
              aria-hidden
            />
          </span>
          <span className={cn('mt-2 block text-[12.5px] leading-snug', a.primary ? 'text-black' : 'text-white')}>{a.body}</span>
        </button>
      ))}
    </motion.div>
  );
}

export interface LinkItem {
  title: string;
  body?: ReactNode;
  figure?: string;
  warn?: boolean;
  onClick: () => void;
}

/** A titled group of destination cards, level in each row. */
export function LinkGroup({ title, sub, items }: { title: string; sub?: string; items: LinkItem[] }) {
  return (
    <section className="space-y-4">
      <CollegeSectionTitle title={title} sub={sub} />
      <motion.div
        variants={containerVariants}
        className={cn(
          'grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2',
          items.length >= 4 ? 'xl:grid-cols-4' : items.length === 3 ? 'xl:grid-cols-3' : ''
        )}
      >
        {items.map((i) => (
          <CollegeLinkCard key={i.title} title={i.title} body={i.body} figure={i.figure} warn={i.warn} onClick={i.onClick} />
        ))}
      </motion.div>
    </section>
  );
}

export interface WorkRow {
  id: string;
  title: string;
  sub?: ReactNode;
  trailing?: ReactNode;
  warn?: boolean;
  onClick?: () => void;
}

/** A list of rows inside the one list surface. */
export function WorkRows({ rows }: { rows: WorkRow[] }) {
  return (
    <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
      {rows.map((r) => {
        const inner = (
          <>
            <span className={cn('h-9 w-1 shrink-0 rounded-full', r.warn ? 'bg-orange-400' : 'bg-white/[0.14]')} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">{r.title}</span>
              {r.sub && <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">{r.sub}</span>}
            </span>
            {r.trailing && <span className="shrink-0 text-[12.5px] font-medium text-white">{r.trailing}</span>}
            {r.onClick && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
          </>
        );
        return (
          <li key={r.id}>
            {r.onClick ? (
              <button
                type="button"
                onClick={r.onClick}
                className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
              >
                {inner}
              </button>
            ) : (
              <div className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 sm:px-6">{inner}</div>
            )}
          </li>
        );
      })}
    </motion.ul>
  );
}

/** Spinner used while a screen's first data arrives. */
export function TeachingLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
    </div>
  );
}
