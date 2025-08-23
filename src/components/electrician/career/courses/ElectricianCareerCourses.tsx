import React, { useState, useMemo } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import EnhancedCourseCard from "../../../apprentice/career/courses/EnhancedCourseCard";
import EnhancedTrainingCenterCard from "../../../apprentice/career/courses/EnhancedTrainingCenterCard";
import CourseDetailsModal from "../../../apprentice/career/courses/CourseDetailsModal";
import TrainingCentreDetailsModal from "../../../apprentice/career/courses/TrainingCenterDetailsModal";
import CourseSelectionTips from "../../../apprentice/career/courses/CourseSelectionTips";
import EmptySearchResults from "../../../apprentice/career/courses/EmptySearchResults";
import EnhancedCourseSearch from "./EnhancedCourseSearch";
import CourseSorting, { sortOptions } from "./CourseSorting";
import FeaturedCoursesCarousel from "./FeaturedCoursesCarousel";
import CourseBookmarkManager, { useBookmarkManager } from "./CourseBookmarkManager";
import CourseCompareMode, { useCourseComparison } from "./CourseCompareMode";
import CourseMap from "./CourseMap";
import GoogleMapsLoader from "../../../job-vacancies/GoogleMapsLoader";
import { 
  EnhancedCareerCourse,
  EnhancedTrainingCenter,
  enhancedCareerCourses
} from "../../../apprentice/career/courses/enhancedCoursesData";
import LocationBasedCourseSearch from "../../../apprentice/career/courses/LocationBasedCourseSearch";
import { useCoursesQuery } from "@/hooks/useCoursesQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Plus, Scale, FileDown, RefreshCw, Wifi, WifiOff, Map, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const ElectricianCareerCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<EnhancedTrainingCenter | null>(null);
  const [activeTab, setActiveTab] = useState("courses");
  const [currentSort, setCurrentSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [nearbyProviders, setNearbyProviders] = useState<any[]>([]);
  
  // Location-based filtering state
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchRadius, setSearchRadius] = useState(25);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { toggleBookmark, isBookmarked } = useBookmarkManager();
  const { addToComparison, removeFromComparison, isInComparison, selectedCount } = useCourseComparison();

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
  // Use TanStack Query for efficient data fetching and caching
  const {
    data: queryResult,
    isLoading: isLoadingLive,
    error: queryError,
    refetch: refreshCourses,
    isFetching: isSearching,
    isError
  } = useCoursesQuery(
    filters.searchQuery || "electrical course",
    filters.location === "All Locations" ? "United Kingdom" : filters.location
  );

  // Extract data from query result with proper typing
  const liveCourses = queryResult?.courses || [];
  const liveTotal = queryResult?.total || 0;
  const liveSummary = queryResult?.summary;
  const isLiveData = !!queryResult;
  const liveError = isError ? (queryError?.message || "Failed to fetch course data") : null;

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

  // Enhanced filtering and sorting logic using live data
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = liveCourses.filter(course => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matches = 
          course.title.toLowerCase().includes(query) ||
          course.provider.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Category filter
      if (filters.category !== "All Categories" && course.category !== filters.category) {
        return false;
      }

      // Level filter
      if (filters.level !== "All Levels" && course.level !== filters.level) {
        return false;
      }

      // Location filter - now supports both dropdown and radius-based filtering
      if (filters.location !== "All Locations") {
        const hasLocation = course.locations.some(loc => 
          loc.toLowerCase().includes(filters.location.toLowerCase())
        );
        if (!hasLocation) return false;
      }

      // Radius-based location filtering
      if (userCoordinates && userLocation) {
        const courseWithinRadius = course.locations.some(location => {
          // This would need geocoding for precise distance calculation
          // For now, we'll use a simple text-based proximity check
          const locationLower = location.toLowerCase();
          const userLocationLower = userLocation.toLowerCase();
          
          // Extract city names for comparison
          const userCity = userLocationLower.split(',')[0].trim();
          return locationLower.includes(userCity) || locationLower.includes('online') || locationLower.includes('remote');
        });
        
        if (!courseWithinRadius) return false;
      }

      // Price range filter
      const coursePrice = parseInt(course.price.match(/£(\d+)/)?.[1] || "0");
      if (coursePrice < filters.priceRange[0] || coursePrice > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      if (filters.duration !== "Any Duration" && !course.duration.includes(filters.duration)) {
        return false;
      }

      // Industry demand filter
      if (filters.industryDemand !== "All" && course.industryDemand !== filters.industryDemand) {
        return false;
      }

      // Format filter
      if (filters.format !== "All Formats" && !course.format.toLowerCase().includes(filters.format.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && course.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Sorting
    const sortOption = sortOptions.find(opt => opt.key === currentSort);
    if (sortOption) {
      filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (sortOption.key) {
          case "rating":
            comparison = b.rating - a.rating;
            break;
          case "price-low":
            const priceA = parseInt(a.price.match(/£(\d+)/)?.[1] || "0");
            const priceB = parseInt(b.price.match(/£(\d+)/)?.[1] || "0");
            comparison = priceA - priceB;
            break;
          case "price-high":
            const priceA2 = parseInt(a.price.match(/£(\d+)/)?.[1] || "0");
            const priceB2 = parseInt(b.price.match(/£(\d+)/)?.[1] || "0");
            comparison = priceB2 - priceA2;
            break;
          case "duration":
            const durationA = parseInt(a.duration.match(/(\d+)/)?.[1] || "0");
            const durationB = parseInt(b.duration.match(/(\d+)/)?.[1] || "0");
            comparison = durationA - durationB;
            break;
          case "demand":
            const demandOrder = { "High": 3, "Medium": 2, "Low": 1 };
            comparison = demandOrder[b.industryDemand as keyof typeof demandOrder] - 
                        demandOrder[a.industryDemand as keyof typeof demandOrder];
            break;
          case "future-proof":
            comparison = b.futureProofing - a.futureProofing;
            break;
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "provider":
            comparison = a.provider.localeCompare(b.provider);
            break;
          case "next-date":
            const dateA = new Date(a.nextDates[0]);
            const dateB = new Date(b.nextDates[0]);
            comparison = dateA.getTime() - dateB.getTime();
            break;
          default: // relevance
            comparison = (b.rating * b.futureProofing) - (a.rating * a.futureProofing);
        }
        
        return sortOption.direction === "desc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [liveCourses, filters, currentSort]);

  // Remove training centers for electricians - live-only approach
  const filteredCenters: EnhancedTrainingCenter[] = [];

  // Location handling functions
  const handleLocationSelect = (location: string, coordinates?: google.maps.LatLngLiteral) => {
    setUserLocation(location);
    setUserCoordinates(coordinates || null);
    
    toast({
      title: "Location set",
      description: `Filtering courses within ${searchRadius} miles of ${location}`,
      variant: "success"
    });
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    
    if (userLocation) {
      toast({
        title: "Radius updated",
        description: `Now showing courses within ${radius} miles`,
        variant: "default"
      });
    }
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setUserCoordinates(null);
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
    handleClearLocation();
  };

  // PDF Export functionality
  const exportToPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF();
      
      pdf.setFontSize(20);
      pdf.text('Career Course Search Results', 20, 30);
      
      pdf.setFontSize(12);
      let yPosition = 50;
      
      filteredAndSortedCourses.slice(0, 10).forEach((course, index) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 30;
        }
        
        pdf.setFont(undefined, 'bold');
        pdf.text(`${index + 1}. ${course.title}`, 20, yPosition);
        yPosition += 10;
        
        pdf.setFont(undefined, 'normal');
        pdf.text(`Provider: ${course.provider}`, 25, yPosition);
        yPosition += 7;
        
        pdf.text(`Duration: ${course.duration} | Level: ${course.level}`, 25, yPosition);
        yPosition += 7;
        
        pdf.text(`Price: ${course.price}`, 25, yPosition);
        yPosition += 7;
        
        pdf.text(`Rating: ${course.rating}/5 | Demand: ${course.industryDemand}`, 25, yPosition);
        yPosition += 15;
      });
      
      pdf.save('course-search-results.pdf');
      
      toast({
        title: "PDF exported successfully",
        description: "Your course search results have been saved as PDF.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the PDF.",
        variant: "destructive"
      });
    }
  };

  const viewCourseDetails = (course: EnhancedCareerCourse) => {
    setSelectedCourse(course);
  };

  const viewCenterDetails = (center: EnhancedTrainingCenter) => {
    setSelectedCenter(center);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedCenter(null);
  };

  return (
    <div className="space-y-6 overflow-x-hidden min-w-0 max-w-full">
      {/* Header Section - Mobile Optimized */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
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
            
            {/* Mobile Action Buttons - Better Touch Targets */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-2">
              {!isLiveData && !isLoadingLive && (
                <Button
                  onClick={() => {
                    toast({
                      title: "Loading courses",
                      description: "Fetching the latest course data...",
                      variant: "default"
                    });
                    refreshCourses();
                  }}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center justify-center gap-2 min-h-[44px] text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {isMobile ? "Load" : "Load Courses"}
                </Button>
              )}
              
              {isLiveData && (
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Refreshing courses",
                      description: "Fetching the latest course data...",
                      variant: "default"
                    });
                    refreshCourses();
                  }}
                  disabled={isSearching}
                  className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${isSearching ? 'animate-spin' : ''}`} />
                  {isMobile ? "Refresh" : "Refresh Data"}
                </Button>
              )}
              
              <Button
                variant={showBookmarks ? "default" : "outline"}
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <BookOpen className="h-4 w-4" />
                {isMobile ? "Saved" : "Saved Courses"}
              </Button>
              
              <Button
                variant={showComparison ? "default" : "outline"}
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <Scale className="h-4 w-4" />
                {isMobile ? "Compare" : "Compare Courses"}
                {selectedCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 px-1">
                    {selectedCount}
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-r border-border"
                >
                  <List className="h-4 w-4" />
                  {!isMobile && " Grid"}
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="rounded-none"
                >
                  <Map className="h-4 w-4" />
                  {!isMobile && " Map"}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={exportToPDF}
                className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <FileDown className="h-4 w-4" />
                {isMobile ? "PDF" : "Export PDF"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Featured Courses Carousel */}
      {liveCourses.length > 0 && (
        <FeaturedCoursesCarousel 
          courses={liveCourses.slice(0, 6)} 
          onViewDetails={viewCourseDetails} 
        />
      )}


      {/* Enhanced Search and Filters */}
      <EnhancedCourseSearch
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
        totalResults={filteredAndSortedCourses.length}
        viewMode={viewMode}
      />

      {/* Course Comparison Tool */}
      {showComparison && (
        <CourseCompareMode
          courses={liveCourses}
          onViewDetails={viewCourseDetails}
        />
      )}

      {/* Bookmark Manager */}
      {showBookmarks && (
        <CourseBookmarkManager
          courses={liveCourses}
          onViewDetails={viewCourseDetails}
        />
      )}

      {/* Sorting and View Controls */}
      {viewMode !== "map" && (
        <CourseSorting
          currentSort={currentSort}
          onSortChange={setCurrentSort}
          totalResults={filteredAndSortedCourses.length}
          viewMode={viewMode as "grid" | "list"}
          onViewModeChange={(mode) => setViewMode(mode as "grid" | "list" | "map")}
        />
      )}

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold">
            {viewMode === "map" ? "Course Locations" : "Live Courses"} ({filteredAndSortedCourses.length})
          </h2>
          {userLocation && (
            <Badge variant="outline" className="text-xs">
              Within {searchRadius} miles of {userLocation.split(',')[0]}
            </Badge>
          )}
        </div>
        
        {/* Map View */}
        {viewMode === "map" ? (
          <div className="space-y-4">
            {/* Enhanced Location Search with Provider Discovery - Only in Map View */}
            <LocationBasedCourseSearch
              onLocationSelect={handleLocationSelect}
              onRadiusChange={handleRadiusChange}
              currentLocation={userLocation}
              searchRadius={searchRadius}
              onProviderSearch={handleProviderSearchFromLocation}
            />
            
            
            <GoogleMapsLoader>
              <CourseMap 
                nearbyProviders={providersForMap}
                selectedCourse={selectedCourseId}
                onCourseSelect={handleCourseSelect}
                onCourseDeselect={handleCourseDeselect}
                userLocation={userLocation}
                userCoordinates={userCoordinates}
                searchRadius={searchRadius}
                isLoading={isLoadingLive}
              />
            </GoogleMapsLoader>
          </div>
        ) : (
          /* Grid/List View */
          <div className="space-y-6">
            {filteredAndSortedCourses.length > 0 ? (
              <div className={viewMode === "grid" ? 
                "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" : 
                "space-y-3 md:space-y-4"
              }>
                {filteredAndSortedCourses.map((course) => (
                  <div key={course.id} className="relative group">
                    <EnhancedCourseCard 
                      course={course}
                      onViewDetails={viewCourseDetails}
                    />
                    
                    {/* Top Badges Row - Hidden LIVE badge per user request */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-120px)]">
                      {/* LIVE badge hidden */}
                    </div>
                    
                    {/* Action Buttons - Positioned below rating badge area */}
                    <div className="absolute top-12 right-2 flex flex-col gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 mt-[10px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(course)}
                        className={`min-h-[40px] min-w-[40px] p-0 md:h-8 md:w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 ${isBookmarked(course.id) ? 
                          'text-elec-yellow hover:text-elec-yellow/80 border-elec-yellow/50' : 
                          'text-muted-foreground hover:text-elec-yellow hover:border-elec-yellow/50'
                        }`}
                        title={isBookmarked(course.id) ? "Remove from saved" : "Save course"}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComparison(course.id)}
                        className={`min-h-[40px] min-w-[40px] p-0 md:h-8 md:w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 ${isInComparison(course.id) ? 
                          'text-blue-400 hover:text-blue-300 border-blue-400/50' : 
                          'text-muted-foreground hover:text-blue-400 hover:border-blue-400/50'
                        }`}
                        title="Add to comparison"
                        disabled={selectedCount >= 3 && !isInComparison(course.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptySearchResults type="courses" onReset={handleResetFilters} />
            )}
          </div>
        )}
      </div>
      
      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal course={selectedCourse} onClose={handleClose} />
      )}
      
      {/* Training Centre Details Modal */}
      {selectedCenter && (
        <TrainingCentreDetailsModal center={selectedCenter} onClose={handleClose} />
      )}

      {/* Course Selection Tips */}
      <CourseSelectionTips />
    </div>
  );
};

export default ElectricianCareerCourses;