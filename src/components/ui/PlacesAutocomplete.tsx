import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useGoogleMaps } from '@/contexts/GoogleMapsContext';
import { MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaceResult {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  postcode?: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function PlacesAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = 'Enter address',
  className,
  disabled = false,
}: PlacesAutocompleteProps) {
  const { isLoaded, apiKey } = useGoogleMaps();
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Initialise (or re-initialise) the Google Places services. Safe to call any
  // number of times — only does work when window.google.maps.places is ready.
  // Returns true if services are available afterwards.
  const initServices = useCallback((): boolean => {
    if (typeof window === 'undefined' || !window.google?.maps?.places) {
      return false;
    }
    try {
      if (!autocompleteService.current) {
        autocompleteService.current = new google.maps.places.AutocompleteService();
      }
      if (!placesService.current) {
        const dummyDiv = document.createElement('div');
        placesService.current = new google.maps.places.PlacesService(dummyDiv);
      }
      if (!sessionToken.current) {
        sessionToken.current = new google.maps.places.AutocompleteSessionToken();
      }
      return true;
    } catch (err) {
      console.error('[PlacesAutocomplete] init failed:', err);
      return false;
    }
  }, []);

  // Initialise services when Google Maps is loaded
  useEffect(() => {
    if (isLoaded) initServices();
  }, [isLoaded, initServices]);

  // Re-initialise on Capacitor app resume (iOS may discard refs when app is
  // backgrounded and relaunched, leaving the autocomplete service stale).
  useEffect(() => {
    let isMounted = true;
    let removeListener: (() => void) | undefined;

    const setup = async () => {
      try {
        const { Capacitor } = await import('@capacitor/core');
        if (!Capacitor.isNativePlatform() || !isMounted) return;
        const { App } = await import('@capacitor/app');
        if (!isMounted) return;

        const handle = await App.addListener('appStateChange', ({ isActive }) => {
          if (isActive) {
            // Returning to foreground — refresh service references.
            // Drop refs first so initServices rebuilds them with the current
            // window.google instance.
            autocompleteService.current = null;
            placesService.current = null;
            sessionToken.current = null;
            initServices();
          }
        });
        if (!isMounted) {
          handle.remove();
          return;
        }
        removeListener = () => handle.remove();
      } catch (err) {
        // Not running under Capacitor or plugin missing — silently ignore.
        console.debug('[PlacesAutocomplete] Capacitor resume listener skipped:', err);
      }
    };

    setup();

    return () => {
      isMounted = false;
      if (removeListener) removeListener();
    };
  }, [initServices]);

  // Fetch predictions when value changes
  const fetchPredictions = useCallback(async (input: string) => {
    // Lazy re-init if refs are stale (e.g. after iOS app resume) — gives us
    // one shot to recover before bailing out silently.
    if (!autocompleteService.current) {
      const ok = initServices();
      if (!ok) {
        setPredictions([]);
        return;
      }
    }
    if (!autocompleteService.current || !input.trim()) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const request: google.maps.places.AutocompletionRequest = {
        input,
        componentRestrictions: { country: 'gb' }, // UK only
        sessionToken: sessionToken.current || undefined,
        types: ['address'],
      };

      const result = await autocompleteService.current.getPlacePredictions(request);
      setPredictions(result.predictions || []);
      setIsOpen(true);
    } catch (error) {
      console.error('Places autocomplete error:', error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  }, [initServices]);

  // Debounce input
  useEffect(() => {
    if (!value) {
      setPredictions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchPredictions(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, fetchPredictions]);

  // Handle place selection
  const handleSelectPlace = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      if (!placesService.current) {
        const ok = initServices();
        if (!ok || !placesService.current) return;
      }

      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: prediction.place_id,
        fields: ['formatted_address', 'geometry', 'place_id', 'address_components'],
        sessionToken: sessionToken.current || undefined,
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          // Extract postcode from address components
          const postcodeComponent = place.address_components?.find((c) =>
            c.types.includes('postal_code')
          );

          const result: PlaceResult = {
            address: place.formatted_address || prediction.description,
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            placeId: place.place_id || prediction.place_id,
            postcode: postcodeComponent?.long_name,
          };

          onChange(result.address);
          onPlaceSelect?.(result);
          setPredictions([]);
          setIsOpen(false);

          // Create new session token for next search
          sessionToken.current = new google.maps.places.AutocompleteSessionToken();
        }
      });
    },
    [onChange, onPlaceSelect, initServices]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // If Google Maps isn't available, fall back to regular input
  if (!apiKey || !isLoaded) {
    return (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => predictions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={cn('pr-8', className)}
          disabled={disabled}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Predictions dropdown */}
      {isOpen && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-elec-gray border border-white/10 rounded-lg shadow-lg overflow-hidden">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelectPlace(prediction)}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 active:bg-white/5 transition-colors flex items-start gap-3 touch-manipulation"
            >
              <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium truncate">{prediction.structured_formatting.main_text}</p>
                <p className="text-xs text-white truncate">
                  {prediction.structured_formatting.secondary_text}
                </p>
              </div>
            </button>
          ))}
          <div className="px-4 py-2 border-t border-white/10">
            <p className="text-[10px] text-white flex items-center gap-1">
              <img
                loading="lazy"
                src="https://www.gstatic.com/mapspro/images/stock/20180110_google_my_business_logo.svg"
                alt="Google"
                className="h-3"
              />
              Powered by Google
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
