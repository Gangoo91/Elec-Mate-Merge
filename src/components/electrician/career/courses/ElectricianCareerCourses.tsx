import React, { useState, useMemo, useEffect } from "react";
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
import CourseCompareMode from "./CourseCompareMode";
import { useCourseComparison } from "@/hooks/useCourseComparison";
import CourseMap from "./CourseMap";
import GoogleMapsLoader from "../../../job-vacancies/GoogleMapsLoader";
import { 
  EnhancedCareerCourse,
  EnhancedTrainingCenter,
  enhancedCareerCourses
} from "../../../apprentice/career/courses/enhancedCoursesData";
import LocationBasedCourseSearch from "../../../apprentice/career/courses/LocationBasedCourseSearch";
import { useCoursesQuery } from "@/hooks/useCoursesQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { useLiveCourses } from "@/hooks/useLiveCourses";
import LiveCourseCard from "../../../apprentice/career/courses/LiveCourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Plus, Scale, FileDown, RefreshCw, Wifi, WifiOff, Map, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import CourseGridSkeleton from "./CourseGridSkeleton";
import { useCareerBookmarks } from "@/hooks/career/useCareerBookmarks";
import { parsePrice, parseDuration, parseDate, getNumericRating, getDemandScore, getFutureProofingScore } from "@/utils/courseSorting";
import { fallbackElectricalCourses } from "@/data/fallbackCourses";
import { 
  UnifiedCourse, 
  liveCourseToUnified, 
  enhancedCourseToUnified,
  getCourseTitle,
  getCoursePrice,
  getCourseFormat,
  getNextDate
} from "@/types/unifiedCourse";

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
  const { toggleBookmark: toggleDatabaseBookmark, isBookmarked: isDatabaseBookmarked } = useCareerBookmarks();
  const { 
    addToComparison, 
    removeFromComparison, 
    clearComparison,
    isInComparison, 
    selectedCount, 
    selectedCourses,
    selectedCourseData 
  } = useCourseComparison();

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

  // Debounced search to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);
  const debouncedLocation = useDebounce(filters.location, 300);

  // Live course data hook with auto-refetch on filter changes
  const {
    courses: liveCoursesList,
    summary: liveSummary,
    loading: isLoadingLive,
    error: liveError,
    refreshCourses,
    isFromCache
  } = useLiveCourses(
    debouncedSearchQuery || "electrical course",
    debouncedLocation === "All Locations" ? "United Kingdom" : debouncedLocation
  );

  // Convert courses to unified format
  const hasLiveCourses = liveCoursesList && liveCoursesList.length > 0;
  const unifiedCourses: UnifiedCourse[] = hasLiveCourses 
    ? liveCoursesList.map(liveCourseToUnified)
    : fallbackElectricalCourses.map(enhancedCourseToUnified);
  
  const totalCourses = unifiedCourses.length;
  const isLoadingCourses = isLoadingLive;
  const isLiveData = hasLiveCourses && !liveError;
  const isUsingFallback = !hasLiveCourses;

  // Enhanced sorting change handler with forced re-computation
  const [sortVersion, setSortVersion] = useState(0);
  const handleSortChange = (newSort: string) => {
    console.log('🔀 Changing sort to:', newSort, '(client-side only)');
    setCurrentSort(newSort);
    setSortVersion(prev => prev + 1); // Force useMemo re-computation
    console.log('🔄 Sort version bumped to:', sortVersion + 1);
  };

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

  // Enhanced filtering and sorting logic using unified data
  const filteredAndSortedCourses = useMemo(() => {
    console.log('🔄 useMemo recomputing with:', { currentSort, sortVersion, coursesCount: unifiedCourses.length });
    let filtered = unifiedCourses.filter(course => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const title = getCourseTitle(course);
        const description = course.description || '';
        const category = course.category || '';
        const provider = course.provider || '';
        
        const matches = 
          title.toLowerCase().includes(query) ||
          provider.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query);
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
      const coursePrice = parseInt(getCoursePrice(course).match(/£(\d+)/)?.[1] || "0");
      if (coursePrice < filters.priceRange[0] || coursePrice > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      if (filters.duration !== "Any Duration" && !course.duration.includes(filters.duration)) {
        return false;
      }

      // Industry demand filter
      if (filters.industryDemand !== "All" && course.industryDemand && course.industryDemand !== filters.industryDemand) {
        return false;
      }

      // Format filter
      const format = getCourseFormat(course);
      if (filters.format !== "All Formats" && !format.toLowerCase().includes(filters.format.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && course.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Sorting with robust data parsing and debugging
    const sortOption = sortOptions.find(opt => opt.key === currentSort);
    if (sortOption) {
      console.log('🔄 Sorting by:', currentSort, 'Direction:', sortOption.direction);
      console.log('📊 Sample course data for sorting:', filtered.slice(0, 2).map(c => ({
        title: getCourseTitle(c),
        price: getCoursePrice(c),
        duration: c.duration,
        rating: c.rating,
        industryDemand: c.industryDemand,
        futureProofing: c.futureProofing
      })));
      
      filtered.sort((a, b) => {
        // Validate course data before sorting
        if (!a || !b) {
          console.warn('⚠️ Invalid course data in sorting:', { a: !!a, b: !!b });
          return 0;
        }

        let comparison = 0;
        
        switch (sortOption.key) {
          case "relevance":
            const futureProofA = getFutureProofingScore(a.futureProofing || '');
            const futureProofB = getFutureProofingScore(b.futureProofing || '');
            const relevanceA = getNumericRating(a.rating) * futureProofA;
            const relevanceB = getNumericRating(b.rating) * futureProofB;
            comparison = relevanceB - relevanceA;
            const titleA = getCourseTitle(a);
            const titleB = getCourseTitle(b);
            console.log(`Relevance sort: ${titleA} (${relevanceA}) vs ${titleB} (${relevanceB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA.localeCompare(titleB);
            break;

          case "rating":
            const ratingA = getNumericRating(a.rating);
            const ratingB = getNumericRating(b.rating);
            comparison = ratingA - ratingB;
            const titleA2 = getCourseTitle(a);
            const titleB2 = getCourseTitle(b);
            console.log(`Rating sort: ${titleA2} (${a.rating}→${ratingA}) vs ${titleB2} (${b.rating}→${ratingB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA2.localeCompare(titleB2);
            break;
            
          case "price":
          case "price-low":
          case "price-high":
            const priceA = parsePrice(getCoursePrice(a));
            const priceB = parsePrice(getCoursePrice(b));
            // Handle price-low vs price-high direction
            if (sortOption.key === "price-high") {
              comparison = priceB - priceA; // High to low
            } else {
              comparison = priceA - priceB; // Low to high
            }
            const titleA3 = getCourseTitle(a);
            const titleB3 = getCourseTitle(b);
            console.log(`💰 Price sort (${sortOption.key}): ${titleA3} (${getCoursePrice(a)}→£${priceA}) vs ${titleB3} (${getCoursePrice(b)}→£${priceB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA3.localeCompare(titleB3);
            break;
            
          case "duration":
            const durationA = parseDuration(a.duration || '');
            const durationB = parseDuration(b.duration || '');
            comparison = durationA - durationB;
            const titleA4 = getCourseTitle(a);
            const titleB4 = getCourseTitle(b);
            console.log(`Duration sort: ${titleA4} (${a.duration}→${durationA}w) vs ${titleB4} (${b.duration}→${durationB}w) = ${comparison}`);
            if (comparison === 0) comparison = titleA4.localeCompare(titleB4);
            break;
            
          case "demand":
            const demandA = getDemandScore(a.industryDemand || '');
            const demandB = getDemandScore(b.industryDemand || '');
            comparison = demandA - demandB;
            const titleA5 = getCourseTitle(a);
            const titleB5 = getCourseTitle(b);
            console.log(`Demand sort: ${titleA5} (${a.industryDemand}→${demandA}) vs ${titleB5} (${b.industryDemand}→${demandB}) = ${comparison}`);
            if (comparison === 0) {
              comparison = getNumericRating(a.rating) - getNumericRating(b.rating);
              if (comparison === 0) comparison = titleA5.localeCompare(titleB5);
            }
            break;
            
          case "future-proof":
            const futureA = getFutureProofingScore(a.futureProofing || '');
            const futureB = getFutureProofingScore(b.futureProofing || '');
            comparison = futureA - futureB;
            const titleA6 = getCourseTitle(a);
            const titleB6 = getCourseTitle(b);
            console.log(`Future-proof sort: ${titleA6} (${a.futureProofing}→${futureA}) vs ${titleB6} (${b.futureProofing}→${futureB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA6.localeCompare(titleB6);
            break;
            
          case "title":
            // Enhanced alphabetical sorting with robust validation
            const titleA7 = getCourseTitle(a);
            const titleB7 = getCourseTitle(b);
            
            if (!titleA7 && !titleB7) {
              comparison = 0;
            } else if (!titleA7) {
              comparison = 1; // Move invalid titles to end
            } else if (!titleB7) {
              comparison = -1; // Move invalid titles to end
            } else {
              comparison = titleA7.localeCompare(titleB7);
            }
            
            console.log(`📝 Title sort: "${titleA7}" vs "${titleB7}" = ${comparison}`);
            break;
            
          case "provider":
            comparison = a.provider.localeCompare(b.provider);
            console.log(`Provider sort: ${a.provider} vs ${b.provider} = ${comparison}`);
            const titleA8 = getCourseTitle(a);
            const titleB8 = getCourseTitle(b);
            if (comparison === 0) comparison = titleA8.localeCompare(titleB8);
            break;
            
          case "next-date":
            const dateA = parseDate(getNextDate(a));
            const dateB = parseDate(getNextDate(b));
            comparison = dateA.getTime() - dateB.getTime();
            const titleA9 = getCourseTitle(a);
            const titleB9 = getCourseTitle(b);
            console.log(`Date sort: ${titleA9} (${getNextDate(a)}→${dateA}) vs ${titleB9} (${getNextDate(b)}→${dateB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA9.localeCompare(titleB9);
            break;
            
          default:
            const defaultRelevanceA = getNumericRating(a.rating) * getFutureProofingScore(a.futureProofing || '');
            const defaultRelevanceB = getNumericRating(b.rating) * getFutureProofingScore(b.futureProofing || '');
            comparison = defaultRelevanceA - defaultRelevanceB;
            const titleA10 = getCourseTitle(a);
            const titleB10 = getCourseTitle(b);
            console.log(`Default relevance sort: ${titleA10} (${defaultRelevanceA}) vs ${titleB10} (${defaultRelevanceB}) = ${comparison}`);
            if (comparison === 0) comparison = titleA10.localeCompare(titleB10);
        }
        
        // Apply sort direction consistently
        return sortOption.direction === "desc" ? -comparison : comparison;
      });
      
      console.log('✅ Sorted courses:', filtered.slice(0, 3).map(c => getCourseTitle(c)));
    }

    return filtered;
  }, [unifiedCourses, filters, currentSort, sortVersion]);

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
                  ✅ Live UK data: {liveSummary.liveCourses} courses from {liveSummary.sourceBreakdown.filter(s => s.success).length} providers
                  {liveSummary.lastUpdated && ` • Updated ${new Date(liveSummary.lastUpdated).toLocaleTimeString()}`}
                </p>
              )}
              {isUsingFallback && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <WifiOff className="h-3 w-3" />
                  Showing enhanced course database • 
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => refreshCourses()} 
                    className="p-0 h-auto text-xs underline"
                  >
                    Try live search
                  </Button>
                </div>
              )}
            </div>
            
            {/* Mobile Action Buttons - Better Touch Targets */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-2">
              <Button
                onClick={() => {
                  if (viewMode === "map") setViewMode("grid");
                  refreshCourses();
                }}
                disabled={isLoadingCourses}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingCourses ? 'animate-spin' : ''}`} />
                {isMobile ? "Refresh" : "Refresh Data"}
              </Button>
              
              <Button
                variant={showBookmarks ? "default" : "outline"}
                onClick={() => {
                  if (viewMode === "map") setViewMode("grid");
                  setShowBookmarks(!showBookmarks);
                }}
                className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <BookOpen className="h-4 w-4" />
                {isMobile ? "Saved" : "Saved Courses"}
              </Button>
              
              <Button
                variant={showComparison ? "default" : "outline"}
                onClick={() => {
                  if (viewMode === "map") setViewMode("grid");
                  setShowComparison(!showComparison);
                }}
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

      {/* View Mode Toggle - Moved below parent */}
      <div className="mb-4">
        <div className="flex border border-border rounded-md overflow-hidden w-fit">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-none border-r border-border"
          >
            <List className="h-4 w-4" />
            {!isMobile && " Courses"}
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
      </div>

      {/* Featured Courses Carousel - Hidden in map view */}
      {viewMode !== "map" && unifiedCourses.length > 0 && (
        <FeaturedCoursesCarousel 
          courses={unifiedCourses.slice(0, 6) as any} 
          onViewDetails={viewCourseDetails} 
        />
      )}

      {/* Enhanced Search and Filters - Hidden in map view */}
      {viewMode !== "map" && (
              <EnhancedCourseSearch 
                filters={filters}
                onFiltersChange={setFilters}
                onReset={handleResetFilters}
                totalResults={filteredAndSortedCourses.length}
                isSearching={isLoadingCourses}
                viewMode={viewMode}
              />
      )}

      {/* Course Comparison Tool */}
      {showComparison && (
        <CourseCompareMode
          courses={unifiedCourses as any}
          onViewDetails={viewCourseDetails}
          selectedCourseData={selectedCourseData}
          onAddToComparison={(course) => addToComparison(course.id, course)}
          onRemoveFromComparison={removeFromComparison}
          onClearComparison={clearComparison}
        />
      )}

      {/* Bookmark Manager */}
      {showBookmarks && (
        <CourseBookmarkManager
          courses={unifiedCourses as any}
          onViewDetails={viewCourseDetails}
        />
      )}

      {/* Sorting and View Controls */}
      {viewMode !== "map" && (
        <CourseSorting
          currentSort={currentSort}
          onSortChange={handleSortChange}
          totalResults={filteredAndSortedCourses.length}
          viewMode={viewMode as "grid" | "list"}
          onViewModeChange={(mode) => setViewMode(mode as "grid" | "list" | "map")}
        />
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {viewMode !== "map" && (
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold">
              Live Courses ({filteredAndSortedCourses.length})
            </h2>
            {userLocation && (
              <Badge variant="outline" className="text-xs">
                Within {searchRadius} miles of {userLocation.split(',')[0]}
              </Badge>
            )}
          </div>
        )}
        
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
            {isLoadingCourses && !isLiveData ? (
              /* Show skeleton loading on initial load */
              <div className="space-y-4">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-elec-yellow mb-2">Finding electrical courses for you...</h3>
                  <p className="text-sm text-muted-foreground">Searching training providers across the UK</p>
                </div>
                <CourseGridSkeleton count={9} />
              </div>
            ) : filteredAndSortedCourses.length > 0 ? (
              <div className={viewMode === "grid" ? 
                "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" : 
                "space-y-3 md:space-y-4"
              }>
                {filteredAndSortedCourses.map((course) => (
                  <div key={course.id} className="relative group">
                    <EnhancedCourseCard 
                      course={{
                        ...course,
                        title: getCourseTitle(course),
                        price: getCoursePrice(course),
                        format: getCourseFormat(course),
                        nextDates: getNextDate(course),
                        industryDemand: course.industryDemand || 'Medium',
                        futureProofing: course.futureProofing || 'High',
                        salaryImpact: undefined,
                        careerOutcomes: [],
                        employerSupport: false,
                        courseOutline: [],
                        continuousAssessment: false
                      } as any}
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
                        onClick={() => toggleDatabaseBookmark(String(course.id))}
                        className={`min-h-[40px] min-w-[40px] p-0 md:h-8 md:w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 ${isDatabaseBookmarked(String(course.id)) ? 
                          'text-elec-yellow hover:text-elec-yellow/80 border-elec-yellow/50' : 
                          'text-muted-foreground hover:text-elec-yellow hover:border-elec-yellow/50'
                        }`}
                        title={isDatabaseBookmarked(String(course.id)) ? "Remove from saved" : "Save course"}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComparison(course.id, course as any)}
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
            ) : liveError ? (
              /* Error state with retry option */
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <WifiOff className="h-12 w-12 text-destructive mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium">Failed to load courses</h3>
                      <p className="text-sm text-muted-foreground mt-1">{liveError}</p>
                    </div>
                    <Button onClick={() => refreshCourses()} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
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