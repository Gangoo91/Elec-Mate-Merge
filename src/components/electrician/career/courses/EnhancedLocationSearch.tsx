import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Loader2, Navigation, X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedLocationSearchProps {
  onLocationSelect: (location: string, coordinates?: google.maps.LatLngLiteral) => void;
  onRadiusChange: (radius: number) => void;
  onClearLocation: () => void;
  currentLocation: string | null;
  searchRadius: number;
  isActive: boolean;
}

const EnhancedLocationSearch: React.FC<EnhancedLocationSearchProps> = ({
  onLocationSelect,
  onRadiusChange,
  onClearLocation,
  currentLocation,
  searchRadius,
  isActive
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!window.google?.maps?.places || !inputRef.current) return;

    // Initialize Google Places Autocomplete
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
        setSearchInput(result.formatted_address);
        
        toast({
          title: "Location found",
          description: `Searching for courses near ${result.formatted_address}`,
          variant: "success"
        });
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

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          
          const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                if (status === 'OK' && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Reverse geocoding failed: ${status}`));
                }
              }
            );
          });

          if (results.length > 0) {
            const locationName = results[0].formatted_address;
            onLocationSelect(locationName, { lat: latitude, lng: longitude });
            setSearchInput(locationName);
            
            toast({
              title: "Current location found",
              description: `Searching for courses near ${locationName}`,
              variant: "success"
            });
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          toast({
            title: "Location error",
            description: "Unable to determine your exact location.",
            variant: "destructive"
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        toast({
          title: "Location access denied",
          description: "Please allow location access or enter a location manually.",
          variant: "destructive"
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleClearLocation = () => {
    setSearchInput("");
    onClearLocation();
    toast({
      title: "Location cleared",
      description: "Showing all available courses",
      variant: "default"
    });
  };

  const radiusOptions = [5, 10, 25, 50, 100];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Find Courses Near You
          {isActive && (
            <Badge variant="secondary" className="ml-2">
              <MapPin className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Enter your city or postcode..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                className="pl-10 pr-10"
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchInput("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
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

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2"
              size="sm"
            >
              {isGettingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              Use Current Location
            </Button>
            
            {currentLocation && (
              <Button
                variant="outline"
                onClick={handleClearLocation}
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {currentLocation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-elec-yellow/5 rounded-md border border-elec-yellow/20">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            <span>Searching near: {currentLocation}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Search Radius</label>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((radius) => (
              <Badge
                key={radius}
                variant={searchRadius === radius ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  searchRadius === radius 
                    ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                    : "border-elec-yellow/30 hover:bg-elec-yellow/10 text-elec-yellow"
                }`}
                onClick={() => onRadiusChange(radius)}
              >
                {radius} miles
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Use the search above to find training courses and providers near your location.
          Results will be filtered based on your selected radius.
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedLocationSearch;