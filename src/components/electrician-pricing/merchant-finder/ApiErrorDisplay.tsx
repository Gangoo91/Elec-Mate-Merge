
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info, LinkIcon } from "lucide-react";

interface ApiErrorDisplayProps {
  apiStatus: string | null;
  apiErrorMessage: string | null;
}

export const ApiErrorDisplay = ({ apiStatus, apiErrorMessage }: ApiErrorDisplayProps) => {
  if (!apiStatus) return null;
  
  switch(apiStatus) {
    case 'REQUEST_DENIED':
      return (
        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <p className="mb-2">API authorization issue detected. This is likely due to one of the following:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The Google Maps API key has not been setup correctly.</li>
              <li>The Places API or Geocoding API is not enabled for this API key.</li>
              <li>The API key has billing issues or has exceeded its quota.</li>
              <li>The API key has domain/IP restrictions that block this request.</li>
            </ol>
            {apiErrorMessage && (
              <p className="mt-2 italic text-xs">{apiErrorMessage}</p>
            )}
          </AlertDescription>
        </Alert>
      );
    case 'OVER_QUERY_LIMIT':
      return (
        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            The Google Maps API usage quota has been exceeded. Please try again later or check your billing settings in the Google Cloud Console.
          </AlertDescription>
        </Alert>
      );
    case 'INVALID_REQUEST':
      return (
        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            The request sent to the Google Maps API was invalid. This could be due to a problem with the postcode format.
          </AlertDescription>
        </Alert>
      );
    default:
      return (
        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            An error occurred with status: {apiStatus}
            {apiErrorMessage && (
              <p className="mt-1 italic text-xs">{apiErrorMessage}</p>
            )}
          </AlertDescription>
        </Alert>
      );
  }
};

export const ApiTroubleshooting = () => (
  <div className="mt-4 p-3 bg-black/20 rounded-md">
    <p className="text-sm font-medium mb-2">Troubleshooting Steps:</p>
    <ol className="list-decimal pl-5 space-y-2 text-sm">
      <li>Ensure the GoogleAPI secret is set correctly in your Supabase project</li>
      <li>Check that you have enabled both Geocoding API and Places API in Google Cloud Console</li>
      <li>Verify that your Google Maps API key billing is set up and active</li>
      <li>If you've set any API key restrictions, ensure they allow access from your domain</li>
    </ol>
    <div className="flex items-center gap-2 mt-3 text-xs">
      <LinkIcon className="h-3 w-3" />
      <a 
        href="https://console.cloud.google.com/apis/library" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-elec-yellow hover:underline"
      >
        Google Cloud Console API Library
      </a>
    </div>
  </div>
);
