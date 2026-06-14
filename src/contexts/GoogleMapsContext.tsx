import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { getSetting, setSetting, clearSetting } from '@/services/settingsService';
import { supabase } from '@/integrations/supabase/client';

const SETTINGS_KEY = 'google_maps_api_key';

// Check for environment variable first (for app-wide API key)
const ENV_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// The app-managed key is a process-wide constant — fetch it once and share the
// result (and the in-flight promise) across every GoogleMapsProvider mount so we
// don't hit get-google-maps-key on each map surface.
let cachedAppKey: string | null = null;
let appKeyPromise: Promise<string | null> | null = null;
async function fetchAppMapsKey(): Promise<string | null> {
  if (cachedAppKey) return cachedAppKey;
  if (!appKeyPromise) {
    appKeyPromise = (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        const key = (data as { apiKey?: string } | null)?.apiKey;
        if (!error && key) {
          cachedAppKey = key;
          return key;
        }
      } catch {
        // ignore — caller falls back to a user-saved key
      }
      appKeyPromise = null; // allow a retry on the next mount if it failed
      return null;
    })();
  }
  return appKeyPromise;
}

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  apiKey: string;
  setApiKey: (key: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
  isLoadingKey: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

// Libraries to load - includes Places for autocomplete
const GOOGLE_MAPS_LIBRARIES: ('places' | 'geometry' | 'drawing' | 'visualization')[] = ['places'];

// Inner component that loads Google Maps only when we have a valid API key
function GoogleMapsLoader({
  apiKey,
  children,
  setApiKey,
  clearApiKey,
}: {
  apiKey: string;
  children: ReactNode;
  setApiKey: (key: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    id: 'google-map-script',
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return (
    <GoogleMapsContext.Provider
      value={{ isLoaded, loadError, apiKey, setApiKey, clearApiKey, isLoadingKey: false }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  // Load API key - check env variable first, then Supabase
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        // 1) Build-time env key, if configured (app-wide).
        if (ENV_API_KEY) {
          setApiKeyState(ENV_API_KEY);
          setIsLoadingKey(false);
          return;
        }

        // 2) App-managed key served from the GoogleAPI secret — zero setup for
        //    the user (no "paste your API key" screen). This is the normal path.
        //    Cached process-wide so repeat map surfaces don't refetch it.
        const appKey = await fetchAppMapsKey();
        if (appKey) {
          setApiKeyState(appKey);
          setIsLoadingKey(false);
          return;
        }

        // 3) Last resort: a key the user saved themselves.
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
      <GoogleMapsContext.Provider
        value={{
          isLoaded: false,
          loadError: undefined,
          apiKey: '',
          setApiKey,
          clearApiKey,
          isLoadingKey: true,
        }}
      >
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  // No API key configured - don't attempt to load Google Maps
  if (!apiKey) {
    return (
      <GoogleMapsContext.Provider
        value={{
          isLoaded: false,
          loadError: undefined,
          apiKey: '',
          setApiKey,
          clearApiKey,
          isLoadingKey: false,
        }}
      >
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

// Safe default for when hook is used outside provider
const defaultContextValue: GoogleMapsContextType = {
  isLoaded: false,
  loadError: undefined,
  apiKey: '',
  setApiKey: async () => {},
  clearApiKey: async () => {},
  isLoadingKey: false,
};

export function useGoogleMaps(): GoogleMapsContextType {
  const context = useContext(GoogleMapsContext);
  // Return safe defaults if used outside provider - allows graceful fallback
  return context ?? defaultContextValue;
}
