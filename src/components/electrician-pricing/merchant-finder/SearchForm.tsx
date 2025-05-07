
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFormProps {
  postcode: string;
  setPostcode: (value: string) => void;
  handleSearch: () => Promise<void>;
  isLoading: boolean;
}

export const SearchForm = ({ postcode, setPostcode, handleSearch, isLoading }: SearchFormProps) => {
  const { toast } = useToast();

  const onSubmit = () => {
    if (!postcode.trim()) {
      toast({
        title: "Postcode required",
        description: "Please enter a valid UK postcode to search",
        variant: "destructive"
      });
      return;
    }
    handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Input 
        placeholder="Enter your UK postcode" 
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        className="max-w-xs"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />
      <Button 
        onClick={onSubmit} 
        disabled={isLoading}
        className="flex items-center gap-1 sm:w-auto w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            <span>Search</span>
          </>
        )}
      </Button>
    </div>
  );
};
