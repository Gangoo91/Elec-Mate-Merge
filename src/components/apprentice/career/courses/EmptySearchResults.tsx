
import { Button } from "@/components/ui/button";

interface EmptySearchResultsProps {
  type: "courses" | "centers";
  onReset: () => void;
}

const EmptySearchResults = ({ type, onReset }: EmptySearchResultsProps) => {
  return (
    <div className={type === "courses" ? "col-span-full text-center py-12" : "text-center py-12"}>
      <p className="text-muted-foreground">
        No {type === "centers" ? "centres" : type} found matching your search criteria.
      </p>
      <Button 
        variant="outline" 
        className="mt-4" 
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptySearchResults;
