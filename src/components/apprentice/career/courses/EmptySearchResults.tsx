
import { Button } from "@/components/ui/button";
import { SearchX, RefreshCw } from "lucide-react";

interface EmptySearchResultsProps {
  type: "courses" | "centers";
  onReset: () => void;
}

const EmptySearchResults = ({ type, onReset }: EmptySearchResultsProps) => {
  return (
    <div className={`${type === "courses" ? "col-span-full" : ""} text-center py-12`}>
      <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 max-w-md mx-auto">
        <div className="p-4 rounded-full bg-white/5 w-fit mx-auto mb-4">
          <SearchX className="h-8 w-8 text-white/40" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No Results Found</h3>
        <p className="text-white/70 text-sm mb-4">
          No {type === "centers" ? "training centres" : type} found matching your search criteria.
          Try adjusting your filters or search terms.
        </p>
        <Button
          variant="outline"
          className="h-11 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default EmptySearchResults;
