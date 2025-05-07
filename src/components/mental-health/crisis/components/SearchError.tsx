
import { Info } from "lucide-react";

interface SearchErrorProps {
  error: string;
}

const SearchError = ({ error }: SearchErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="mt-4 p-3 bg-red-500/10 text-red-500 rounded-md text-sm border border-red-500/20">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <p>{error}</p>
      </div>
    </div>
  );
};

export default SearchError;
