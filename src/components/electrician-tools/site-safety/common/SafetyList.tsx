/**
 * The Site Safety list surface.
 *
 * Drop-in replacements for `ListCard` / `ListRow` from `college/primitives`,
 * with the same props, built on the card recipe instead.
 *
 * Why not just restyle the primitives: they are imported by 213 files across
 * the employer hub (44), site safety (27), college (25) and elsewhere.
 * Changing them at source restyles all of it in one commit, which is a
 * decision for another day. Rebuilding here — rather than wrapping them and
 * overriding classes — avoids fighting Tailwind conflict resolution: the
 * primitive sets `bg-[hsl(0_0%_12%)]`, and layering the recipe's white-alpha
 * ramp on top of a 12% base is not the same material as the ramp over
 * near-black, which is what the rest of the app is made of.
 *
 * What changes versus the primitive:
 *  - the flat `hsl(0 0% 12%)` body becomes the diagonal ramp + inset bevel
 *  - the white/6 hairline becomes the volt edge every other card wears
 *  - rows gain press feel — scale down, brighten, no grey tap flash — which
 *    the primitive never had, so every safety list felt like a web page
 *    rather than an app under the thumb
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { toneDot, type Tone } from '@/components/college/primitives';

export function SafetyListCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-elec-yellow/35',
        'divide-y divide-white/[0.08]',
        CARD_SURFACE,
        className
      )}
    >
      {children}
    </div>
  );
}

interface SafetyListRowProps {
  lead?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
  accent?: Tone;
}

export function SafetyListRow({
  lead,
  title,
  subtitle,
  trailing,
  onClick,
  className,
  accent,
}: SafetyListRowProps) {
  const Inner = (
    <>
      {accent && (
        <span aria-hidden className={cn('h-10 w-[3px] shrink-0 rounded-full', toneDot[accent])} />
      )}
      {lead && <div className="shrink-0">{lead}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white sm:text-[15px]">{title}</div>
        {subtitle && <div className="mt-0.5 truncate text-[11.5px] text-white">{subtitle}</div>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  );

  const base =
    'group flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 touch-manipulation';

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        'transition-[background-color,transform] duration-150',
        '[-webkit-tap-highlight-color:transparent] hover:bg-white/[0.05]',
        'active:scale-[0.99] active:bg-white/[0.08]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60',
        className
      )}
    >
      {Inner}
    </button>
  ) : (
    <div className={cn(base, className)}>{Inner}</div>
  );
}
