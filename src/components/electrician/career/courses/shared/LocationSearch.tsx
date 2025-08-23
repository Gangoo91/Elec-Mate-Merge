import React from "react";
import LocationBasedCourseSearch from "../../../../apprentice/career/courses/LocationBasedCourseSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

interface LocationSearchProps {
  userLocation: string | null;
  setUserLocation: (location: string | null) => void;
  userCoordinates: google.maps.LatLngLiteral | null;
  setUserCoordinates: (coords: google.maps.LatLngLiteral | null) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  onLocationSelect: (location: string, coordinates?: google.maps.LatLngLiteral) => void;
  onRadiusChange: (radius: number) => void;
  onProviderSearch?: (location: string, coordinates: google.maps.LatLngLiteral) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  userLocation,
  setUserLocation,
  userCoordinates,
  setUserCoordinates,
  searchRadius,
  setSearchRadius,
  onLocationSelect,
  onRadiusChange,
  onProviderSearch
}) => {
  const handleClearLocation = () => {
    setUserLocation(null);
    setUserCoordinates(null);
  };

  return (
    <Card className="border-elec-yellow/10 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Location Search
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <LocationBasedCourseSearch
            onLocationSelect={onLocationSelect}
            onRadiusChange={onRadiusChange}
            currentLocation={userLocation}
            searchRadius={searchRadius}
            onProviderSearch={onProviderSearch}
          />
          
          {userLocation && (
            <div className="flex items-center justify-between p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-elec-yellow/20">
                  📍 {userLocation}
                </Badge>
                <Badge variant="outline" className="border-elec-yellow/20">
                  {searchRadius} mile radius
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearLocation}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;