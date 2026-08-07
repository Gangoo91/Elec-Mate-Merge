import { useState } from 'react';
import { cn } from '@/lib/utils';
import { cardCn, chipBase, chipOff, chipOn } from '@/components/shared/surfaceStyles';
import { usePriceMoves, type PriceMove } from '@/hooks/usePriceMoves';
import ProductImage from './ProductImage';

const money = (v: number) => `£${v.toFixed(2)}`;

function when(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  return `${Math.round(days / 7)} weeks ago`;
}

const MoveRow = ({ move, direction }: { move: PriceMove; direction: 'down' | 'up' }) => {
  const diff = Math.abs(move.old_price - move.new_price);
  return (
    <a
      href={move.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04] touch-manipulation sm:px-5"
    >
      <ProductImage
        src={move.image_url}
        alt={move.name}
        fallbackLabel={move.brand || move.supplier_name}
        sizeClassName="h-12 w-12 shrink-0"
        className="rounded-lg"
      />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-snug tracking-tight text-white">
          {move.name}
        </span>
        <span className="mt-0.5 block truncate text-[12px] text-white tabular-nums">
          {move.supplier_name} · was {money(move.old_price)} · {when(move.recorded_at)}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <span className="block text-[16px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
          {money(move.new_price)}
        </span>
        <span
          className={cn(
            'mt-1 block text-[11px] font-semibold tabular-nums',
            direction === 'down' ? 'text-white' : 'text-orange-300'
          )}
        >
          {direction === 'down' ? `−${money(diff)}` : `+${money(diff)}`}
        </span>
      </span>
    </a>
  );
};

/**
 * What has actually changed price lately.
 *
 * The rises are the half nobody builds. Over 90 days there were 1,429 price
 * rises against 818 drops — so an electrician quoting from a price book set a
 * few months ago is losing margin on every job, and had no way to know. Both
 * directions get equal billing here for that reason.
 */
const PriceMoves = ({ productType }: { productType: 'tools' | 'materials' }) => {
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const { data: moves = [], isLoading } = usePriceMoves(productType, direction, { limit: 8 });

  const { data: risesPeek = [] } = usePriceMoves(productType, 'up', { limit: 1 });
  const { data: dropsPeek = [] } = usePriceMoves(productType, 'down', { limit: 1 });

  // Nothing to say in either direction — stay off the page entirely.
  if (!isLoading && dropsPeek.length === 0 && risesPeek.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Price moves</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDirection('down')}
            className={cn(chipBase, 'h-9 px-3.5 text-[12.5px]', direction === 'down' ? chipOn : chipOff)}
          >
            Dropped
          </button>
          <button
            type="button"
            onClick={() => setDirection('up')}
            className={cn(chipBase, 'h-9 px-3.5 text-[12.5px]', direction === 'up' ? chipOn : chipOff)}
          >
            Gone up
          </button>
        </div>
      </div>

      {direction === 'up' && moves.length > 0 && (
        <p className="px-1 text-[12px] leading-snug text-white">
          Worth checking against your price book — a quote priced before these went up is short.
        </p>
      )}

      <div className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
        {isLoading && (
          <p className="px-4 py-6 text-center text-[13px] text-white">Checking prices…</p>
        )}
        {!isLoading && moves.length === 0 && (
          <p className="px-4 py-6 text-center text-[13px] text-white">
            {direction === 'down'
              ? 'Nothing has dropped in the last month.'
              : 'Nothing has gone up in the last month.'}
          </p>
        )}
        {!isLoading &&
          moves.map((m) => <MoveRow key={m.product_id} move={m} direction={direction} />)}
      </div>

      <p className="px-1 text-[11px] leading-snug text-white">
        Changes of 5% or more over the last 30 days, taken from what suppliers actually charged —
        not from whether they flagged a sale.
      </p>
    </section>
  );
};

export default PriceMoves;
