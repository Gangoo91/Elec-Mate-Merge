
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ApiErrorDisplay, ApiTroubleshooting } from '../electrician-pricing/merchant-finder/ApiErrorDisplay';

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Don't load again if already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Load the Google Maps API
    const loadGoogleMapsAPI = () => {
      const apiKey = 'loaded-via-edge-function'; // We'll use the edge function with the API key

      // Function to call when script loads
      const onScriptLoad = () => {
        if (window.google?.maps) {
          console.log('Google Maps API loaded successfully');
          setIsLoaded(true);
        } else {
          setError('Failed to load Google Maps API');
          console.error('Google Maps API failed to load');
        }
      };

      // Check if script already exists
      const existingScript = document.getElementById('google-maps-api');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and append the script tag
      const script = document.createElement('script');
      script.id = 'google-maps-api';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      
      script.onload = onScriptLoad;
      
      script.onerror = (e) => {
        console.error('Error loading Google Maps API:', e);
        setError('Failed to load Google Maps API. Check your API key configuration.');
        setApiStatus('REQUEST_DENIED');
        toast({
          title: 'Maps API Error',
          description: 'Could not load the Google Maps API. Location-based features are unavailable.',
          variant: 'destructive',
        });
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();

    // Cleanup function
    return () => {
      // No need to remove the script on unmount since it's used globally
    };
  }, [toast]);

  if (error) {
    return (
      <div className="py-4">
        <ApiErrorDisplay apiStatus={apiStatus} apiErrorMessage={error} />
        <ApiTroubleshooting />
      </div>
    );
  }

  // Don't render children until Maps API is loaded
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading maps...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;
