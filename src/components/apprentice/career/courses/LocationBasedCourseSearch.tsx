
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface LocationBasedCourseSearchProps {
  onLocationSelect: (location: string, coordinates?: google.maps.LatLngLiteral) => void;
  onRadiusChange: (radius: number) => void;
  currentLocation: string | null;
  searchRadius: number;
}

const LocationBasedCourseSearch: React.FC<LocationBasedCourseSearchProps> = ({
  onLocationSelect,
  onRadiusChange,
  currentLocation,
  searchRadius
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onLocationSelect]);

  const handleManualSearch = async () => {
    if (!searchInput.trim() || !window.google?.maps) return;

    setIsSearching(true);
    const geocoder = new window.google.maps.Geocoder();

    try {
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ 
          address: `${searchInput}, UK`,
          componentRestrictions: { country: 'GB' }
        }, (results, status) => {
          if (status === 'OK' && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      if (results.length > 0) {
        const result = results[0];
        const coordinates = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };
        onLocationSelect(result.formatted_address, coordinates);
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different location or be more specific.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast({
        title: "Search error",
        description: "Unable to search for location. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const radiusOptions = [5, 10, 25, 50, 100];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Find Courses Near You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location-search">Location</Label>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              id="location-search"
              placeholder="Enter your city or postcode..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleManualSearch}
              disabled={isSearching || !searchInput.trim()}
              size="sm"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {currentLocation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Current location: {currentLocation}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label>Search Radius</Label>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((radius) => (
              <Badge
                key={radius}
                variant={searchRadius === radius ? "default" : "outline"}
                className={`cursor-pointer transition-colours ${
                  searchRadius === radius 
                    ? "bg-elec-yellow text-elec-dark" 
                    : "border-elec-yellow/30 hover:bg-elec-yellow/10"
                }`}
                onClick={() => onRadiusChange(radius)}
              >
                {radius} miles
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Use the search above to find training courses and colleges near your location.
          Results will be filtered based on your selected radius.
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationBasedCourseSearch;
