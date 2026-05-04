import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptySearchResultsProps {
  type: 'courses' | 'centers';
  onReset: () => void;
}

const EmptySearchResults = ({ type, onReset }: EmptySearchResultsProps) => {
  return (
    <div className={`${type === 'courses' ? 'col-span-full' : ''} text-center py-8`}>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-lg mx-auto space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          No results
        </span>
        <h3 className="text-[16px] font-semibold text-white">No results found</h3>
        <p className="text-[14px] text-white/70 leading-relaxed">
          No {type === 'centers' ? 'training centres' : type} found matching your search criteria.
          Try adjusting your filters or search terms.
        </p>
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset filters
        </Button>
      </div>
    </div>
  );
};

export default EmptySearchResults;
