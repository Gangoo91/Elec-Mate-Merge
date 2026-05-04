import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Loader2, Compass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocationCache } from '@/hooks/useLocationCache';

interface LocationBasedCourseSearchProps {
  onLocationSelect: (location: string, coordinates?: google.maps.LatLngLiteral) => void;
  onRadiusChange: (radius: number) => void;
  currentLocation: string | null;
  searchRadius: number;
  isAutoDetecting?: boolean;
  onProviderSearch?: (location: string, coordinates: google.maps.LatLngLiteral) => void;
  onUseCurrentLocation?: () => void;
}

const LocationBasedCourseSearch: React.FC<LocationBasedCourseSearchProps> = ({
  onLocationSelect,
  onRadiusChange,
  currentLocation,
  searchRadius,
  isAutoDetecting = false,
  onProviderSearch,
  onUseCurrentLocation,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { geocodeWithCache } = useLocationCache();

  useEffect(() => {
    if (!window.google?.maps?.places || !inputRef.current) return;

    // Initialise Google Places Autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      componentRestrictions: { country: 'gb' },
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        const locationName = place.formatted_address || place.name || '';
        onLocationSelect(locationName, coordinates);
        setSearchInput(locationName);

        // Automatically search for training providers after successful selection
        if (onProviderSearch) {
          onProviderSearch(locationName, coordinates);
        }
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onLocationSelect]);

  const handleManualSearch = async () => {
    if (!searchInput.trim()) return;

    setIsSearching(true);

    try {
      // Use cached geocoding
      const result = await geocodeWithCache(searchInput);

      const coordinates = {
        lat: result.coordinates.lat,
        lng: result.coordinates.lng,
      };

      onLocationSelect(result.formattedAddress, coordinates);

      // Automatically search for training providers after successful geocoding
      if (onProviderSearch) {
        onProviderSearch(result.formattedAddress, coordinates);
      }

      toast({
        title: 'Location found',
        description: `Found: ${result.formattedAddress}`,
      });
    } catch (error) {
      console.error('Manual search failed:', error);
      toast({
        title: 'Search failed',
        description: 'Unable to find the location. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const radiusOptions = [5, 10, 25, 50, 100];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Find courses near you
      </span>

      <div className="space-y-2">
        <Label htmlFor="location-search" className="text-[12px] text-white/70">
          Location
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-white/55" />
            <Input
              ref={inputRef}
              id="location-search"
              placeholder={
                isAutoDetecting ? 'Detecting location...' : 'Enter your city or postcode...'
              }
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              className="pl-10 h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 touch-manipulation"
              disabled={isAutoDetecting}
            />
          </div>
          {onUseCurrentLocation && (
            <Button
              onClick={onUseCurrentLocation}
              disabled={isAutoDetecting}
              variant="outline"
              size="sm"
              className="h-11 w-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              {isAutoDetecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Compass className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            onClick={handleManualSearch}
            disabled={isSearching || !searchInput.trim() || isAutoDetecting}
            size="sm"
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isAutoDetecting && (
        <div className="flex items-center gap-2 text-[13px] text-white/85 rounded-md border border-white/10 bg-white/[0.03] p-3">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Detecting your location...</span>
        </div>
      )}

      {currentLocation && !isAutoDetecting && (
        <div className="flex items-center gap-2 text-[13px] text-white/85 rounded-md border border-white/10 bg-white/[0.03] p-3">
          <MapPin className="h-4 w-4 text-white/55" />
          <span>
            Current location: <span className="text-white">{currentLocation}</span>
          </span>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-[12px] text-white/70">Search radius</Label>
        <div className="flex flex-wrap gap-1.5">
          {radiusOptions.map((radius) => {
            const isActive = searchRadius === radius;
            return (
              <button
                key={radius}
                type="button"
                onClick={() => onRadiusChange(radius)}
                className={`text-[12px] px-2.5 py-1 rounded-md border touch-manipulation min-h-[36px] active:scale-[0.98] ${
                  isActive
                    ? 'bg-elec-yellow text-black font-semibold border-elec-yellow'
                    : 'text-white/85 border-white/10 bg-white/[0.03]'
                }`}
              >
                {radius} miles
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[12px] text-white/55 leading-relaxed">
        Use the search above to find training courses and colleges near your location. Results
        will be filtered based on your selected radius.
      </p>
    </div>
  );
};

export default LocationBasedCourseSearch;
