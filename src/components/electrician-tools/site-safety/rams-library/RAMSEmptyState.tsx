import { FileText, Search, Filter, FolderOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RAMSEmptyStateProps {
  type: 'no-documents' | 'no-results' | 'no-filtered-results';
  searchTerm?: string;
  onClearFilters?: () => void;
}

export const RAMSEmptyState = ({ type, searchTerm, onClearFilters }: RAMSEmptyStateProps) => {
  if (type === 'no-documents') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-3xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center mb-6">
          <FolderOpen className="w-12 h-12 text-elec-yellow/60" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Documents Yet</h3>
        <p className="text-white text-center max-w-xs mb-6 text-sm leading-relaxed">
          Generate your first RAMS document using the AI-powered generator above
        </p>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
          <Sparkles className="w-4 h-4 text-elec-yellow" />
          <span className="text-sm text-white">Tip: Scroll up to create your first RAMS</span>
        </div>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
          <Search className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Results Found</h3>
        <p className="text-white text-center max-w-xs text-sm">
          {searchTerm
            ? `No documents match "${searchTerm}". Try different keywords.`
            : 'No documents match your search criteria.'}
        </p>
      </div>
    );
  }

  if (type === 'no-filtered-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
          <Filter className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Matching Documents</h3>
        <p className="text-white text-center max-w-xs text-sm mb-5">
          No documents match your current filters. Try adjusting your filter settings.
        </p>
        {onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="h-11 px-6 rounded-xl border-white/[0.1] hover:bg-white/[0.05] text-white"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  return null;
};
