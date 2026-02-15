import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Award,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComparisonItem, SupplierMatch } from '@/types/procurement';

interface ItemComparisonTableProps {
  items: ComparisonItem[];
}

function StockIcon({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s.includes('in stock')) {
    return <CheckCircle2 className="h-3 w-3 text-green-500" />;
  }
  if (s.includes('low')) {
    return <AlertTriangle className="h-3 w-3 text-orange-500" />;
  }
  if (s.includes('out')) {
    return <XCircle className="h-3 w-3 text-red-500" />;
  }
  return <CheckCircle2 className="h-3 w-3 text-white" />;
}

function SupplierRow({ match, quantity }: { match: SupplierMatch; quantity: number }) {
  const lineTotal = match.current_price * quantity;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl',
        match.is_recommended
          ? 'bg-green-500/10 border border-green-500/20'
          : 'bg-white/[0.02] border border-white/[0.05]'
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{match.supplier_name}</span>
          {match.is_recommended && (
            <span className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">
              <Award className="h-3 w-3" />
              Best
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-white">
            <StockIcon status={match.stock_status} />
            {match.stock_status}
          </span>
          <span className="flex items-center gap-1 text-xs text-white">
            <Truck className="h-3 w-3" />
            {match.delivery.click_collect !== 'N/A'
              ? `C&C ${match.delivery.click_collect}`
              : match.delivery.standard}
          </span>
        </div>
        {match.product_name !== match.supplier_name && (
          <p className="text-xs text-white mt-1 line-clamp-1">{match.product_name}</p>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-sm font-bold text-white">£{match.current_price.toFixed(2)}</div>
        {quantity > 1 && (
          <div className="text-xs text-white">£{lineTotal.toFixed(2)} total</div>
        )}
        {match.is_on_sale && match.regular_price && (
          <div className="text-xs text-white line-through">£{match.regular_price.toFixed(2)}</div>
        )}
      </div>

      <a
        href={match.product_url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center touch-manipulation flex-shrink-0"
      >
        <ExternalLink className="h-3.5 w-3.5 text-white" />
      </a>
    </div>
  );
}

function ComparisonCard({ item }: { item: ComparisonItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasMatches = item.matches.length > 0;

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => hasMatches && setIsOpen(!isOpen)}
        className={cn(
          'w-full text-left p-4 flex items-center gap-3 touch-manipulation',
          hasMatches && 'active:bg-white/[0.05]'
        )}
        disabled={!hasMatches}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white line-clamp-2">{item.name}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-white">
              Qty: {item.quantity}
            </span>
            {item.best_price !== null ? (
              <span className="text-xs font-semibold text-elec-yellow">
                Best: £{item.best_price.toFixed(2)} @ {item.best_supplier}
              </span>
            ) : (
              <span className="text-xs text-orange-400">No matches found</span>
            )}
            {item.matches.length > 1 && (
              <span className="text-xs text-white">
                {item.matches.length} suppliers
              </span>
            )}
          </div>
        </div>

        {hasMatches && (
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-white" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white" />
            )}
          </div>
        )}
      </button>

      {/* Expanded supplier rows */}
      {isOpen && (
        <div className="px-3 pb-3 space-y-2">
          {item.matches.map((match) => (
            <SupplierRow
              key={match.product_id}
              match={match}
              quantity={item.quantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Per-item comparison cards — collapsible, mobile-first
 */
export function ItemComparisonTable({ items }: ItemComparisonTableProps) {
  const matchedItems = items.filter((i) => i.matches.length > 0);
  const unmatchedItems = items.filter((i) => i.matches.length === 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">
          Item Comparison ({items.length} items)
        </h2>
        {unmatchedItems.length > 0 && (
          <span className="text-xs text-orange-400">
            {unmatchedItems.length} unmatched
          </span>
        )}
      </div>

      {matchedItems.map((item, index) => (
        <ComparisonCard key={`matched-${index}`} item={item} />
      ))}

      {unmatchedItems.length > 0 && (
        <>
          <p className="text-xs text-white pt-2">
            Items below couldn't be matched to any supplier products:
          </p>
          {unmatchedItems.map((item, index) => (
            <ComparisonCard key={`unmatched-${index}`} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
