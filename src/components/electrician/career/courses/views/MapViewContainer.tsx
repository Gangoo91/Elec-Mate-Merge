import React, { useState, useMemo } from "react";
import CourseMap from "../CourseMap";
import GoogleMapsLoader from "../../../../job-vacancies/GoogleMapsLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MapViewContainerProps {
  userLocation: string | null;
  userCoordinates: google.maps.LatLngLiteral | null;
  searchRadius: number;
  nearbyProviders: any[];
  setNearbyProviders: (providers: any[]) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
}

const MapViewContainer: React.FC<MapViewContainerProps> = ({
  userLocation,
  userCoordinates,
  searchRadius,
  nearbyProviders,
  setNearbyProviders,
  selectedCourseId,
  setSelectedCourseId
}) => {
  const [isSearchingProviders, setIsSearchingProviders] = useState(false);
  const { toast } = useToast();

  // For map view, only use Google Places providers
  const providersForMap = useMemo(() => {
    return nearbyProviders;
  }, [nearbyProviders]);

  // Function to search for nearby providers using the edge function
  const searchNearbyProviders = async () => {
    if (!userLocation) {
      toast({
        title: "Location required",
        description: "Please set your location first to find nearby training providers",
        variant: "destructive"
      });
      return;
    }

    setIsSearchingProviders(true);

    try {
      console.log('Searching for training providers near:', userLocation);
      
      const { data, error } = await supabase.functions.invoke('find-training-providers', {
        body: { 
          postcode: userLocation,
          radius: searchRadius * 1609.34, // Convert miles to meters
          courseType: 'electrical'
        }
      });

      if (error) {
        console.error('Error finding providers:', error);
        throw error;
      }

      if (data?.providers?.length > 0) {
        setNearbyProviders(data.providers);
        toast({
          title: "Training providers found",
          description: `Found ${data.providers.length} training providers within ${searchRadius} miles`,
        });
      } else {
        toast({
          title: "No providers found",
          description: `No training providers found within ${searchRadius} miles. Try increasing the search radius.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error searching for providers:', error);
      toast({
        title: "Search failed",
        description: "Failed to find nearby training providers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearchingProviders(false);
    }
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleCourseDeselect = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="border-elec-yellow/10 bg-elec-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            Training Provider Map
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2 items-center">
              {userLocation && (
                <Badge variant="outline" className="border-elec-yellow/20">
                  📍 {userLocation}
                </Badge>
              )}
              <Badge variant="outline" className="border-elec-yellow/20">
                {searchRadius} mile radius
              </Badge>
              <Badge variant="outline" className="border-elec-yellow/20">
                {providersForMap.length} providers found
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={searchNearbyProviders}
                disabled={!userLocation || isSearchingProviders}
                size="sm"
                className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 hover:bg-elec-yellow/20"
              >
                {isSearchingProviders ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                {isSearchingProviders ? "Searching..." : "Find Providers"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="border-elec-yellow/10 bg-elec-card overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[600px] w-full">
            <GoogleMapsLoader>
              <CourseMap
                nearbyProviders={providersForMap}
                selectedCourse={selectedCourseId}
                onCourseSelect={handleCourseSelect}
                onCourseDeselect={handleCourseDeselect}
                userLocation={userLocation}
                userCoordinates={userCoordinates}
                searchRadius={searchRadius}
                isLoading={isSearchingProviders}
              />
            </GoogleMapsLoader>
          </div>
        </CardContent>
      </Card>

      {/* Map Instructions */}
      {!userLocation && (
        <Card className="border-elec-yellow/10 bg-elec-card">
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Set Your Location</h3>
            <p className="text-muted-foreground">
              Use the location search above to find electrical training providers near you.
              The map will show providers within your selected radius.
            </p>
          </CardContent>
        </Card>
      )}

      {userLocation && providersForMap.length === 0 && (
        <Card className="border-elec-yellow/10 bg-elec-card">
          <CardContent className="p-6 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Providers Found</h3>
            <p className="text-muted-foreground mb-4">
              No electrical training providers found within {searchRadius} miles of {userLocation}.
            </p>
            <Button onClick={searchNearbyProviders} className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 hover:bg-elec-yellow/20">
              Try Search Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapViewContainer;