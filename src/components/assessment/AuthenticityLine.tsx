/**
 * AuthenticityLine — the assessor's "own work" countersign on one evidence
 * item, for staff and the learner. When the item has changed since it was
 * confirmed (its fingerprint no longer matches), it says so in orange.
 */
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ItemAuthenticity } from '@/hooks/portfolio/useItemAuthenticity';

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function AuthenticityLine({
  a,
  currentHash,
  audience,
  className,
}: {
  a: ItemAuthenticity | null | undefined;
  /** The item's content_hash now, to spot a change since it was confirmed. */
  currentHash?: string | null;
  audience: 'staff' | 'learner';
  className?: string;
}) {
  if (!a) return null;
  const changed = !!currentHash && !!a.item_content_hash && currentHash !== a.item_content_hash;
  const who = a.assessor_name || 'the assessor';
  return (
    <p
      data-testid="authenticity-line"
      className={cn('flex items-start gap-2 text-[12.5px] leading-snug', className)}
    >
      <ShieldCheck
        className={cn('mt-0.5 h-4 w-4 shrink-0', changed ? 'text-orange-300' : 'text-emerald-400')}
        strokeWidth={1.5}
        aria-hidden
      />
      <span className={changed ? 'font-medium text-orange-300' : 'text-white'}>
        {audience === 'learner'
          ? `${who} confirmed this is your own work on ${fmt(a.confirmed_at)}.`
          : `Own work confirmed by ${who} on ${fmt(a.confirmed_at)}.`}
        {changed ? ' The evidence has changed since.' : ''}
      </span>
    </p>
  );
}
