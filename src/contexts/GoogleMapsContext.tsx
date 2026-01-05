import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { getSetting, setSetting, clearSetting } from '@/services/settingsService';

const SETTINGS_KEY = 'google_maps_api_key';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  apiKey: string;
  setApiKey: (key: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
  isLoadingKey: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

// Inner component that loads Google Maps only when we have a valid API key
function GoogleMapsLoader({ 
  apiKey, 
  children, 
  setApiKey, 
  clearApiKey 
}: { 
  apiKey: string; 
  children: ReactNode;
  setApiKey: (key: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    id: 'google-map-script',
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError, apiKey, setApiKey, clearApiKey, isLoadingKey: false }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  // Load API key from Supabase on mount
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const value = await getSetting(SETTINGS_KEY);
        if (value) {
          setApiKeyState(value);
        }
      } catch (error) {
        console.error('Failed to load Google Maps API key:', error);
      } finally {
        setIsLoadingKey(false);
      }
    };
    loadApiKey();
  }, []);

  const setApiKey = async (key: string) => {
    const trimmed = key.trim();
    if (trimmed) {
      const success = await setSetting(SETTINGS_KEY, trimmed);
      if (success) {
        setApiKeyState(trimmed);
        // Reload the page to reinitialize Google Maps with the new key
        window.location.reload();
      }
    }
  };

  const clearApiKey = async () => {
    const success = await clearSetting(SETTINGS_KEY);
    if (success) {
      setApiKeyState('');
      window.location.reload();
    }
  };

  // Still loading from Supabase
  if (isLoadingKey) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: undefined, apiKey: '', setApiKey, clearApiKey, isLoadingKey: true }}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  // No API key configured - don't attempt to load Google Maps
  if (!apiKey) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: undefined, apiKey: '', setApiKey, clearApiKey, isLoadingKey: false }}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  // We have an API key - load Google Maps
  return (
    <GoogleMapsLoader apiKey={apiKey} setApiKey={setApiKey} clearApiKey={clearApiKey}>
      {children}
    </GoogleMapsLoader>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}