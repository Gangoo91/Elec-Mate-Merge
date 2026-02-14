import { ChevronDown, Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading?: boolean;
  remaining?: number;
}

export function LoadMoreButton({ onLoadMore, isLoading = false, remaining }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onLoadMore}
      disabled={isLoading}
      className="w-full h-11 rounded-xl bg-white/5 border border-white/[0.08] text-sm font-medium text-white flex items-center justify-center gap-2 touch-manipulation active:bg-white/10 disabled:opacity-50 transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4" />
          Load More{remaining ? ` (${remaining} more)` : ''}
        </>
      )}
    </button>
  );
}
