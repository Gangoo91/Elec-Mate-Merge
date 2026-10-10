/**
 * Study Centre surfaces (ELE-2024, 9 Oct 2026) — the landing page's cards.
 *
 * Andrew: "the cards are all too dark, the background needs to be same as
 * landing page… we need it to be excellent". The College Hub kit's layout,
 * buttons and type stay (he rated it good); only the surface changes, to the
 * marketing site's: `.card-landing` (a soft white gradient off the 11% ground,
 * hairline border) and the volt hairline along the top of a lead card.
 *
 * Edge to edge on a phone, inset and rounded from sm: up, as before.
 */
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';

/** A panel. */
export const SC_CARD =
  '-mx-4 card-landing max-sm:!rounded-none max-sm:!border-x-0 p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

/** A list panel: rows divided by hairlines. */
export const SC_LIST =
  '-mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 divide-y divide-white/[0.07] sm:mx-0 sm:rounded-2xl sm:border-x';

/** A tappable row in SC_LIST. */
export const SC_ROW =
  'flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.08] sm:px-6';

/** A tile in a grid (never edge to edge — it has neighbours). */
export const SC_TILE = 'card-landing-interactive rounded-2xl';

/** The landing page's volt hairline across the top of a lead card. */
export function Hairline() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
    />
  );
}

/** A progress ring with a figure in the middle (daily goal, level). */
export function ProgressRing({
  pct,
  size = 104,
  stroke = 8,
  colour = '#FFD000',
  children,
  label,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  colour?: string;
  children: ReactNode;
  label: string;
}) {
  const r = (size - stroke - 2) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, pct)) / 100;
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
        />
        {p > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={colour}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${c * p} ${c}`}
            style={{ transition: 'stroke-dasharray 700ms ease' }}
          />
        )}
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </span>
    </div>
  );
}

export interface ScStat {
  label: string;
  value: string;
  sub?: string;
  warn?: boolean;
  good?: boolean;
  onClick?: () => void;
}

/** A row of 2–4 headline figures on the landing surface. */
export function ScStats({ items, className }: { items: ScStat[]; className?: string }) {
  return (
    <motion.dl
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={cn('grid grid-cols-2 gap-3', items.length >= 4 && 'lg:grid-cols-4', className)}
    >
      {items.map((s) => {
        const body: ReactNode = (
          <>
            <dt className="text-[12.5px] font-semibold text-white">{s.label}</dt>
            <dd
              className={cn(
                'mt-2 text-[28px] font-bold leading-none tabular-nums',
                s.warn ? 'text-orange-400' : s.good ? 'text-emerald-400' : 'text-white'
              )}
            >
              {s.value}
            </dd>
            {s.sub && (
              <dd className="mt-2 line-clamp-2 text-[12.5px] font-medium leading-snug text-white">
                {s.sub}
              </dd>
            )}
          </>
        );
        const cls = cn(
          'block rounded-2xl px-4 py-4 text-left',
          s.onClick ? 'card-landing-interactive' : 'card-landing'
        );
        return s.onClick ? (
          <button
            key={s.label}
            type="button"
            onClick={s.onClick}
            className={cn(cls, 'touch-manipulation')}
          >
            {body}
          </button>
        ) : (
          <div key={s.label} className={cls}>
            {body}
          </div>
        );
      })}
    </motion.dl>
  );
}
