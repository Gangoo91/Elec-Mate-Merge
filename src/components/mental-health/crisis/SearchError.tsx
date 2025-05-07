
import { AlertTriangle, Info } from "lucide-react";

interface SearchErrorProps {
  error: string;
  apiStatus?: string | null;
}

const SearchError = ({ error, apiStatus }: SearchErrorProps) => {
  if (!error) return null;
  
  // Special handling for API errors
  if (apiStatus === 'REQUEST_DENIED' || apiStatus === 'INVALID_REQUEST') {
    return (
      <div className="mt-4 p-3 bg-amber-500/10 text-amber-500 rounded-md text-sm border border-amber-500/20">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <div>
            <p className="font-medium">API Error: {apiStatus}</p>
            <p>{error}</p>
            <p className="mt-2 text-xs">
              This could be due to an issue with the Google Maps API key. Please check the Supabase edge function logs.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
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
