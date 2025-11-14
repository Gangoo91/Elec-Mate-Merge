import { FileText, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RAMSEmptyStateProps {
  type: 'no-documents' | 'no-results' | 'no-filtered-results';
  searchTerm?: string;
  onClearFilters?: () => void;
}

export const RAMSEmptyState = ({ type, searchTerm, onClearFilters }: RAMSEmptyStateProps) => {
  if (type === 'no-documents') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="p-4 rounded-full bg-primary/10">
          <FileText className="h-12 w-12 text-primary/60" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Saved Documents</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Generate your first RAMS document using the AI-Powered RAMS Generator above
          </p>
        </div>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="p-4 rounded-full bg-primary/10">
          <Search className="h-12 w-12 text-primary/60" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {searchTerm 
              ? `No documents found for "${searchTerm}". Try different keywords.`
              : 'No documents match your search criteria.'}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'no-filtered-results') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="p-4 rounded-full bg-primary/10">
          <Filter className="h-12 w-12 text-primary/60" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Matching Documents</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            No documents match your current filters. Try adjusting your filter settings.
          </p>
          {onClearFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};
