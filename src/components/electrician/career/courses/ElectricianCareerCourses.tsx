import React, { useState, useMemo } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import EnhancedCourseSearch from "./EnhancedCourseSearch";
import FeaturedCoursesCarousel from "./FeaturedCoursesCarousel";
import GridViewContainer from "./views/GridViewContainer";
import MapViewContainer from "./views/MapViewContainer";
import ViewModeToggle from "./shared/ViewModeToggle";
import LocationSearch from "./shared/LocationSearch";
import CourseSelectionTips from "../../../apprentice/career/courses/CourseSelectionTips";
import { 
  EnhancedCareerCourse,
  EnhancedTrainingCenter,
  enhancedCareerCourses
} from "../../../apprentice/career/courses/enhancedCoursesData";
import { useLiveCourseSearch } from "@/hooks/useLiveCourseSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Plus, Scale, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const ElectricianCareerCourses = () => {
  const [currentSort, setCurrentSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [nearbyProviders, setNearbyProviders] = useState<any[]>([]);
  
  // Location-based filtering state
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchRadius, setSearchRadius] = useState(25);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Search and filter state
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "All Categories",
    level: "All Levels",
    location: "All Locations",
    priceRange: [0, 2000] as [number, number],
    duration: "Any Duration",
    industryDemand: "All",
    format: "All Formats",
    rating: 0
  });

  // Live course data hook
  const {
    courses: liveCourses,
    total: liveTotal,
    summary: liveSummary,
    isLiveData,
    loading: isLoadingLive,
    error: liveError,
    refreshCourses,
    isSearching
  } = useLiveCourseSearch({
    keywords: filters.searchQuery || "electrical course",
    location: filters.location === "All Locations" ? "United Kingdom" : filters.location,
    enableLiveData: true
  });

  // Location-based distance calculation helper
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Handle nearby providers found from Google Places
  const handleNearbyProvidersFound = (providers: any[]) => {
    setNearbyProviders(providers);
    console.log('Nearby providers found:', providers.length);
  };

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
        handleNearbyProvidersFound(data.providers);
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
    }
  };

  // For map view, only use Google Places providers (no geocoding needed)
  const providersForMap = useMemo(() => {
    console.log('Providers for map:', nearbyProviders.length);
    return nearbyProviders;
  }, [nearbyProviders]);

  // Location handling functions
  const handleLocationSelect = (location: string, coordinates?: google.maps.LatLngLiteral) => {
    setUserLocation(location);
    setUserCoordinates(coordinates || null);
    
    toast({
      title: "Location set",
      description: `Finding courses and providers within ${searchRadius} miles of ${location}`,
    });
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    
    if (userLocation) {
      toast({
        title: "Radius updated",
        description: `Now showing results within ${radius} miles`,
      });
    }
  };

  // Handler for when location search triggers provider search
  const handleProviderSearchFromLocation = async (location: string, coordinates: google.maps.LatLngLiteral) => {
    try {
      console.log('Auto-searching for training providers near:', location);
      
      const { data, error } = await supabase.functions.invoke('find-training-providers', {
        body: { 
          postcode: location,
          radius: searchRadius * 1609.34, // Convert miles to meters
          courseType: 'electrical'
        }
      });

      if (error) {
        console.error('Error finding providers:', error);
        throw error;
      }

      if (data?.providers?.length > 0) {
        handleNearbyProvidersFound(data.providers);
        toast({
          title: "Training providers found",
          description: `Found ${data.providers.length} electrical training providers within ${searchRadius} miles`,
        });
      } else {
        toast({
          title: "No providers found",
          description: `No electrical training providers found within ${searchRadius} miles. Try increasing the search radius.`,
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
    }
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleCourseDeselect = () => {
    setSelectedCourseId(null);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "All Categories",
      level: "All Levels", 
      location: "All Locations",
      priceRange: [0, 2000],
      duration: "Any Duration",
      industryDemand: "All",
      format: "All Formats",
      rating: 0
    });
    setUserLocation(null);
    setUserCoordinates(null);
  };

  return (
    <div className="space-y-6 overflow-x-hidden min-w-0 max-w-full">
      {/* Header Section */}
      <Card className="border-elec-yellow/10 bg-elec-card">
        <CardHeader className="p-4 md:p-6">
          <div className="space-y-4">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
                UK Electrical Career Courses & Training
              </div>
              {isLiveData && (
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  <Wifi className="h-3 w-3" />
                  LIVE
                </Badge>
              )}
            </CardTitle>
            
            <div className="space-y-3">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Comprehensive professional development courses to advance your electrical career in the UK market
              </p>
              
              {isLiveData && liveSummary && (
                <p className="text-xs text-elec-yellow">
                  Live data: {liveSummary.liveCourses} live courses from {liveSummary.sourceBreakdown.filter(s => s.success).length} sources
                  {liveSummary.lastUpdated && ` • Updated ${new Date(liveSummary.lastUpdated).toLocaleTimeString()}`}
                </p>
              )}
              {!isLiveData && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <WifiOff className="h-3 w-3" />
                  Showing cached course data
                </p>
              )}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center">
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Featured Courses Carousel */}
      {liveCourses.length > 0 && (
        <FeaturedCoursesCarousel 
          courses={liveCourses.slice(0, 6)} 
          onViewDetails={() => {}} 
        />
      )}

      {/* Location Search */}
      <LocationSearch
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        userCoordinates={userCoordinates}
        setUserCoordinates={setUserCoordinates}
        searchRadius={searchRadius}
        setSearchRadius={setSearchRadius}
        onLocationSelect={handleLocationSelect}
        onRadiusChange={handleRadiusChange}
        onProviderSearch={handleProviderSearchFromLocation}
      />

      {/* Enhanced Search and Filters */}
      <EnhancedCourseSearch
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
        totalResults={liveCourses.length}
        viewMode={viewMode}
      />

      {/* View Content */}
      {viewMode === "grid" ? (
        <GridViewContainer
          courses={liveCourses}
          isLiveData={isLiveData}
          isLoadingLive={isLoadingLive}
          liveSummary={liveSummary}
          liveTotal={liveTotal}
          refreshCourses={refreshCourses}
          isSearching={isSearching}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
          filters={filters}
          userLocation={userLocation}
          searchRadius={searchRadius}
        />
      ) : (
        <MapViewContainer
          userLocation={userLocation}
          userCoordinates={userCoordinates}
          searchRadius={searchRadius}
          nearbyProviders={nearbyProviders}
          setNearbyProviders={setNearbyProviders}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      )}

      {/* Course Selection Tips */}
      <CourseSelectionTips />
    </div>
  );
};

export default ElectricianCareerCourses;