
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Loader2, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocationCache } from "@/hooks/useLocationCache";

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
  onUseCurrentLocation
}) => {
  const [searchInput, setSearchInput] = useState("");
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
      componentRestrictions: { country: 'gb' }
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        const locationName = place.formatted_address || place.name || "";
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
        lng: result.coordinates.lng
      };

      onLocationSelect(result.formattedAddress, coordinates);

      // Automatically search for training providers after successful geocoding
      if (onProviderSearch) {
        onProviderSearch(result.formattedAddress, coordinates);
      }

      toast({
        title: "Location found",
        description: `Found: ${result.formattedAddress}`,
      });

    } catch (error) {
      console.error('Manual search failed:', error);
      toast({
        title: "Search failed",
        description: "Unable to find the location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const radiusOptions = [5, 10, 25, 50, 100];

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="pb-4 relative">
        <CardTitle className="text-lg flex items-center gap-3 text-white">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <MapPin className="h-5 w-5 text-elec-yellow" />
          </div>
          Find Courses Near You
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="space-y-2">
          <Label htmlFor="location-search" className="text-white/80">Location</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
              <Input
                ref={inputRef}
                id="location-search"
                placeholder={isAutoDetecting ? "Detecting location..." : "Enter your city or postcode..."}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                disabled={isAutoDetecting}
              />
            </div>
            {onUseCurrentLocation && (
              <Button
                onClick={onUseCurrentLocation}
                disabled={isAutoDetecting}
                variant="outline"
                size="sm"
                className="h-11 w-11 border-elec-yellow/30 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
              >
                {isAutoDetecting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                ) : (
                  <Compass className="h-4 w-4 text-elec-yellow" />
                )}
              </Button>
            )}
            <Button
              onClick={handleManualSearch}
              disabled={isSearching || !searchInput.trim() || isAutoDetecting}
              size="sm"
              className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
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
          <div className="flex items-center gap-2 text-sm text-elec-yellow p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Detecting your location...</span>
          </div>
        )}

        {currentLocation && !isAutoDetecting && (
          <div className="flex items-center gap-2 text-sm text-white p-3 rounded-lg bg-white/5 border border-white/10">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            <span>Current location: <span className="text-elec-yellow">{currentLocation}</span></span>
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-white/80">Search Radius</Label>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((radius) => (
              <Badge
                key={radius}
                variant={searchRadius === radius ? "default" : "outline"}
                className={`cursor-pointer transition-all touch-manipulation active:scale-95 ${
                  searchRadius === radius
                    ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                    : "border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                }`}
                onClick={() => onRadiusChange(radius)}
              >
                {radius} miles
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-xs text-white/60 p-3 rounded-lg bg-white/5 border border-white/10">
          Use the search above to find training courses and colleges near your location.
          Results will be filtered based on your selected radius.
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationBasedCourseSearch;
