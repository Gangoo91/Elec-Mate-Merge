import React, { useState, useMemo, useEffect } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import EnhancedCourseCard from "../../../apprentice/career/courses/EnhancedCourseCard";
import EnhancedTrainingCenterCard from "../../../apprentice/career/courses/EnhancedTrainingCenterCard";
import ModernCourseDetailsModal from "./ModernCourseDetailsModal";
import TrainingCentreDetailsModal from "../../../apprentice/career/courses/TrainingCenterDetailsModal";
import CourseSelectionTips from "../../../apprentice/career/courses/CourseSelectionTips";
import EmptySearchResults from "../../../apprentice/career/courses/EmptySearchResults";
import EnhancedCourseSearch from "./EnhancedCourseSearch";
import CourseSorting, { sortOptions } from "./CourseSorting";
import FeaturedCoursesCarousel from "./FeaturedCoursesCarousel";
import CourseFeaturedCarousel from "./CourseFeaturedCarousel";
import CourseNewsCard from "./CourseNewsCard";
import CourseBookmarkManager, { useBookmarkManager } from "./CourseBookmarkManager";
import CourseCompareMode from "./CourseCompareMode";
import { useCourseComparison } from "@/hooks/useCourseComparison";
import CourseMap from "./CourseMap";
import GoogleMapsLoader from "../../../job-vacancies/GoogleMapsLoader";
import { 
  EnhancedCareerCourse,
  EnhancedTrainingCenter,
  enhancedCareerCourses,
  courseAnalytics
} from "../../../apprentice/career/courses/enhancedCoursesData";
import LocationBasedCourseSearch from "../../../apprentice/career/courses/LocationBasedCourseSearch";
import { useLiveEducationData, LiveEducationData } from "@/hooks/useLiveEducationData";
import { useDebounce } from "@/hooks/useDebounce";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocationCache } from "@/hooks/useLocationCache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Plus, Scale, FileDown, RefreshCw, Wifi, WifiOff, Map, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import CourseGridSkeleton from "./CourseGridSkeleton";
import JobPagination from "../../../job-vacancies/JobPagination";
import { useCareerBookmarks } from "@/hooks/career/useCareerBookmarks";
import { parsePrice, parseDuration, parseDate, getNumericRating, getDemandScore, getFutureProofingScore } from "@/utils/courseSorting";
import { fallbackElectricalCourses } from "@/data/fallbackCourses";

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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(20);
  
  // Location-based filtering state
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchRadius, setSearchRadius] = useState(25);
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [autoLocationAttempted, setAutoLocationAttempted] = useState(false);
  const { reverseGeocodeWithCache, geocodeWithCache } = useLocationCache();
  
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

  // Live education data hook - unified with further education section
  const {
    educationData,
    analytics,
    loading: isLoadingLive,
    error: liveError,
    isFromCache,
    cacheInfo,
    refreshData: refreshCourses
  } = useLiveEducationData('electrical');

  // Convert education data to course format
  const mapEducationDataToCourse = (education: LiveEducationData): EnhancedCareerCourse => ({
    id: education.id,
    title: education.title,
    provider: education.institution,
    description: education.description,
    duration: education.duration,
    level: education.level,
    price: education.tuitionFees,
    format: education.studyMode,
    nextDates: [education.nextIntake],
    rating: education.rating,
    locations: education.locations,
    category: education.category,
    industryDemand: mapDemandLevel(education.employmentRate),
    futureProofing: Math.round(education.employmentRate / 20), // Scale 0-100 to 0-5
    salaryImpact: education.averageStartingSalary,
    careerOutcomes: education.progressionOptions,
    accreditation: education.entryRequirements,
    employerSupport: true,
    prerequisites: education.entryRequirements,
    courseOutline: education.keyTopics,
    assessmentMethod: 'Assessment varies',
    continuousAssessment: false,
    isLive: true,
    external_url: education.courseUrl,
    source: 'Live Education API'
  });

  const mapDemandLevel = (employmentRate: number): "High" | "Medium" | "Low" => {
    if (employmentRate >= 80) return "High";
    if (employmentRate >= 60) return "Medium";
    return "Low";
  };

  // Extract data with enhanced fallback logic
  const hasLiveCourses = educationData && educationData.length > 0;
  const liveCourses = hasLiveCourses ? educationData.map(mapEducationDataToCourse) : enhancedCareerCourses;
  const liveTotal = hasLiveCourses ? educationData.length : enhancedCareerCourses.length;
  const liveSummary = analytics ? {
    totalCourses: analytics.totalCourses,
    liveCourses: analytics.totalCourses,
    sourceBreakdown: [{
      source: 'Live Education API',
      courseCount: analytics.totalCourses,
      success: true,
      error: null
    }],
    lastUpdated: new Date().toISOString()
  } : undefined;
  const isLiveData = hasLiveCourses && !liveError;
  const isUsingFallback = !hasLiveCourses;
  const isSearching = isLoadingLive;

  // Auto-refetch courses when debounced search criteria change  
  useEffect(() => {
    if (debouncedSearchQuery || debouncedLocation !== "All Locations") {
      console.log('🔄 Triggering course search with:', { debouncedSearchQuery, debouncedLocation });
    }
  }, [debouncedSearchQuery, debouncedLocation]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, debouncedSearchQuery, debouncedLocation]);

  // Handle courses per page change
  const handleCoursesPerPageChange = (value: string) => {
    const newCoursesPerPage = value === "all" ? -1 : parseInt(value);
    setCoursesPerPage(newCoursesPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Enhanced sorting change handler with forced re-computation
  const [sortVersion, setSortVersion] = useState(0);
  const handleSortChange = (newSort: string) => {
    console.log('🔀 Changing sort to:', newSort, '(client-side only)');
    setCurrentSort(newSort);
    setSortVersion(prev => prev + 1); // Force useMemo re-computation
    console.log('🔄 Sort version bumped to:', sortVersion + 1);
  };

  // Initial load
  useEffect(() => {
    if (!educationData && !isLoadingLive && !liveError) {
      refreshCourses();
    }
  }, [educationData, isLoadingLive, liveError, refreshCourses]);

  // For map view, only use Google Places providers (no geocoding needed)
  const providersForMap = useMemo(() => {
    console.log('Providers for map:', nearbyProviders.length);
    return nearbyProviders;
  }, [nearbyProviders]);

  // Enhanced filtering and sorting logic using live data
  const filteredAndSortedCourses = useMemo(() => {
    console.log('🔄 useMemo recomputing with:', { currentSort, sortVersion, coursesCount: liveCourses.length });
    let filtered = liveCourses.filter(course => {
      // Category whitelist filter - only show electrical, engineering, tech, and safety courses
      const title = course.title.toLowerCase();
      const description = course.description.toLowerCase();
      const category = course.category.toLowerCase();
      const searchText = `${title} ${description} ${category}`;
      
      const electricalKeywords = ['electrical', 'electric', 'wiring', '18th edition', 'inspection', 'testing', 'pat testing', 'installation'];
      const engineeringKeywords = ['engineering', 'engineer', 'technical', 'design', 'construction', 'building'];
      const techKeywords = ['technology', 'tech', 'digital', 'computer', 'software', 'automation', 'smart', 'iot'];
      const safetyKeywords = ['safety', 'health', 'risk', 'hazard', 'protection', 'compliance', 'regulation'];
      
      const hasElectrical = electricalKeywords.some(keyword => searchText.includes(keyword));
      const hasEngineering = engineeringKeywords.some(keyword => searchText.includes(keyword));
      const hasTech = techKeywords.some(keyword => searchText.includes(keyword));
      const hasSafety = safetyKeywords.some(keyword => searchText.includes(keyword));
      
      if (!hasElectrical && !hasEngineering && !hasTech && !hasSafety) {
        return false;
      }
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

    // Sort the filtered courses based on current sort option
    const sortedCourses = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case "relevance":
          // Sort by industry demand first, then by rating
          const demandScore = (course: EnhancedCareerCourse) => {
            switch (course.industryDemand) {
              case "High": return 3;
              case "Medium": return 2;
              case "Low": return 1;
              default: return 0;
            }
          };
          const demandDiff = demandScore(b) - demandScore(a);
          return demandDiff !== 0 ? demandDiff : b.rating - a.rating;

        case "price_low":
          return parsePrice(a.price) - parsePrice(b.price);

        case "price_high":
          return parsePrice(b.price) - parsePrice(a.price);

        case "duration_short":
          return parseDuration(a.duration) - parseDuration(b.duration);

        case "duration_long":
          return parseDuration(b.duration) - parseDuration(a.duration);

        case "rating":
          return getNumericRating(b.rating) - getNumericRating(a.rating);

        case "demand":
          return getDemandScore(b.industryDemand) - getDemandScore(a.industryDemand);

        case "future_proofing":
          return getFutureProofingScore(b.futureProofing) - getFutureProofingScore(a.futureProofing);

        case "newest":
          // Use earliest next date as a proxy for newest courses
          const aDate = parseDate(a.nextDates[0]);
          const bDate = parseDate(b.nextDates[0]);
          return aDate.getTime() - bDate.getTime();

        default:
          return 0;
      }
    });
    
    console.log('🔍 Filtering results:', {
      total: liveCourses.length,
      filtered: filtered.length,
      sorted: sortedCourses.length,
      currentSort,
      sortVersion
    });
    
    return sortedCourses;
  }, [liveCourses, filters, currentSort, sortVersion, userLocation, userCoordinates]);

  // Pagination calculations
  const totalFilteredCourses = filteredAndSortedCourses.length;
  const indexOfLastCourse = coursesPerPage === -1 ? totalFilteredCourses : currentPage * coursesPerPage;
  const indexOfFirstCourse = coursesPerPage === -1 ? 0 : indexOfLastCourse - coursesPerPage;
  const currentCourses = coursesPerPage === -1 
    ? filteredAndSortedCourses 
    : filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Total pages calculation
  const totalPages = coursesPerPage === -1 ? 1 : Math.ceil(totalFilteredCourses / coursesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of results
    const element = document.querySelector('[data-courses-section]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle location selection from dropdown or manual input
  const handleLocationSelect = async (location: string) => {
    if (!location || location === "All Locations") {
      handleClearLocation();
      return;
    }

    setUserLocation(location);
    
    try {
      // Use cached geocoding to get coordinates
      const coordinates = await geocodeWithCache(location);
      if (coordinates) {
        setUserCoordinates({ lat: coordinates.latitude, lng: coordinates.longitude });
      }
    } catch (error) {
      console.error('Failed to geocode location:', error);
      // Continue without coordinates - we can still filter by text
    }
  };

  const handleManualLocationSet = (location: string) => {
    setUserLocation(location);
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setUserCoordinates(null);
    setFilters(prev => ({ ...prev, location: "All Locations" }));
  };

  const handleLocationFound = (location: { name: string; coordinates: google.maps.LatLngLiteral }) => {
    setUserLocation(location.name);
    setUserCoordinates(location.coordinates);
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
  };

  const handleProviderSearchFromLocation = () => {
    searchNearbyProviders();
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

  // Handle nearby providers found from Google Places
  const handleNearbyProvidersFound = (providers: any[]) => {
    setNearbyProviders(providers);
    console.log('Nearby providers found:', providers.length);
  };

  // Auto-detect user location when map view is first loaded
  const handleAutoLocationDetection = async () => {
    if (autoLocationAttempted || isAutoDetecting) return;
    
    setIsAutoDetecting(true);
    setAutoLocationAttempted(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use cached reverse geocoding
      const locationName = await reverseGeocodeWithCache(latitude, longitude);
      const coordinates = { lat: latitude, lng: longitude };
      
      setUserLocation(locationName);
      setUserCoordinates(coordinates);
      
      toast({
        title: "Location Detected",
        description: `Using your current location: ${locationName}`,
      });
      
      // Automatically search for providers
      searchNearbyProviders();
      
    } catch (error) {
      console.error('Auto-location detection failed:', error);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast({
              title: "Location Permission",
              description: "Location access denied. Please search manually or enable location permissions.",
              variant: "destructive",
            });
            break;
          case error.POSITION_UNAVAILABLE:
            toast({
              title: "Location Unavailable",
              description: "Location unavailable. Please search manually.",
              variant: "destructive",
            });
            break;
          case error.TIMEOUT:
            toast({
              title: "Location Timeout",
              description: "Location detection timed out. Please search manually.",
              variant: "destructive",
            });
            break;
        }
      } else {
        toast({
          title: "Location Error",
          description: "Failed to detect location. Please search manually.",
          variant: "destructive",
        });
      }
    } finally {
      setIsAutoDetecting(false);
    }
  };

  // Auto-detect location when switching to map view (only once per session)
  useEffect(() => {
    if (viewMode === "map" && !autoLocationAttempted && !userLocation && window.google?.maps) {
      handleAutoLocationDetection();
    }
  }, [viewMode, autoLocationAttempted, userLocation]);

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

  const handleCourseClick = (course: EnhancedCareerCourse) => {
    setSelectedCourse(course);
  };

  return (
    <div className="space-y-6">
      {/* Professional Career Courses Header */}
      <header className="border-b border-elec-yellow/10 bg-elec-dark/95 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6 py-6">
        <div className="space-y-4">
          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-elec-dark" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Career Courses & <span className="text-elec-yellow">Professional Development</span>
                </h1>
                <p className="text-sm text-white/80 mt-1">
                  Advance your electrical career with industry-recognised qualifications and emerging technology training
                </p>
              </div>
            </div>
            
            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 text-xs text-white/60">
              {isLiveData ? (
                <>
                  <Wifi className="h-3 w-3 text-green-400" />
                  <span className="hidden sm:inline">Live Data</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-orange-400" />
                  <span className="hidden sm:inline">Cached</span>
                </>
              )}
            </div>
          </div>

          {/* Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-elec-yellow">{totalFilteredCourses}</div>
              <div className="text-xs text-white/60">Available Courses</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.totalProviders}</div>
              <div className="text-xs text-white/60">Training Providers</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.averageRating}/5</div>
              <div className="text-xs text-white/60">Average Rating</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.highDemandCourses}</div>
              <div className="text-xs text-white/60">High Demand</div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Courses Carousel */}
      <div className="space-y-6">
        <CourseFeaturedCarousel 
          courses={filteredAndSortedCourses.slice(0, 6)}
          onCourseClick={handleCourseClick}
        />
      </div>

      {/* Enhanced search and controls */}
      <div className="space-y-4">
        <EnhancedCourseSearch
          filters={filters}
          onFiltersChange={setFilters}
          userLocation={userLocation}
          onClearLocation={handleClearLocation}
          isAutoDetecting={isAutoDetecting}
          radius={searchRadius}
          onRadiusChange={setSearchRadius}
          onRefresh={refreshCourses}
          isLoading={isSearching}
          isLiveData={isLiveData}
          totalResults={totalFilteredCourses}
        />

        {/* Course sorting and view controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <CourseSorting 
              currentSort={currentSort} 
              onSortChange={handleSortChange}
              totalResults={totalFilteredCourses}
              viewMode={viewMode as "grid" | "list"}
              onViewModeChange={(mode) => setViewMode(mode as "grid" | "list" | "map")}
            />
            
            {/* Courses per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Show:</span>
              <Select value={coursesPerPage === -1 ? "all" : coursesPerPage.toString()} onValueChange={handleCoursesPerPageChange}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View mode controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="h-8"
            >
              <Map className="h-4 w-4" />
            </Button>
            
            {/* Bookmark toggle */}
            <Button
              variant={showBookmarks ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="h-8"
            >
              <span className="hidden sm:inline">Bookmarks</span>
              <span className="sm:hidden">★</span>
            </Button>
            
            {/* Comparison toggle */}
            {selectedCount > 0 && (
              <Button
                variant={showComparison ? "default" : "outline"}
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
                className="h-8"
              >
                <Scale className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Compare</span>
                <span className="sm:hidden">{selectedCount}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* All Available Courses Section */}
      <div className="space-y-4">
        <div className="border-b border-elec-yellow/20 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            All Available Courses
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Browse our complete catalogue of electrical training courses and qualifications
          </p>
        </div>

        {/* Main content based on view mode */}
        {viewMode === "map" ? (
          <div className="space-y-4">
            {/* Google Maps Integration */}
            <GoogleMapsLoader>
              <CourseMap
                providers={providersForMap}
                userLocation={userCoordinates}
                onProviderSelect={(provider) => {
                  console.log('Selected provider:', provider);
                  toast({
                    title: "Training Provider",
                    description: `${provider.name} - ${provider.vicinity || 'Contact for more details'}`,
                  });
                }}
              />
            </GoogleMapsLoader>
            
            {/* Location-based search */}
            <LocationBasedCourseSearch
              onLocationSelect={handleLocationSelect}
              onRadiusChange={handleRadiusChange}
              currentLocation={userLocation}
              searchRadius={searchRadius}
              isAutoDetecting={isAutoDetecting}
              onProviderSearch={handleProviderSearchFromLocation}
              onUseCurrentLocation={handleAutoLocationDetection}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Course Comparison Tool */}
            {showComparison && (
              <CourseCompareMode
                courses={liveCourses}
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
                courses={liveCourses}
                onViewDetails={viewCourseDetails}
              />
            )}

            {/* Results Display */}
            {isSearching ? (
              <CourseGridSkeleton />
            ) : filteredAndSortedCourses.length === 0 ? (
              <EmptySearchResults
                searchQuery={filters.searchQuery}
                onResetFilters={handleResetFilters}
                suggestions={[
                  "18th Edition Wiring Regulations",
                  "EV Charging Installation",
                  "Inspection and Testing",
                  "Solar PV Installation"
                ]}
              />
            ) : (
              <div className="space-y-4">
                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {currentCourses.map((course) => (
                    <EnhancedCourseCard
                      key={course.id}
                      course={course}
                      onViewDetails={() => viewCourseDetails(course)}
                      onToggleBookmark={(courseId) => toggleDatabaseBookmark('course', courseId.toString())}
                      isBookmarked={isDatabaseBookmarked('course', course.id.toString())}
                      onAddToComparison={() => addToComparison(course.id, course)}
                      onRemoveFromComparison={() => removeFromComparison(course.id)}
                      isInComparison={isInComparison(course.id)}
                      canAddToComparison={selectedCount < 3}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {coursesPerPage !== -1 && totalPages > 1 && (
                  <div className="flex justify-center pt-6">
                    <JobPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Course Selection Tips */}
            {!isSearching && (
              <CourseSelectionTips />
            )}
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <ModernCourseDetailsModal
          course={selectedCourse}
          isOpen={!!selectedCourse}
          onClose={handleClose}
          onToggleBookmark={(courseId) => toggleDatabaseBookmark('course', courseId.toString())}
          isBookmarked={isDatabaseBookmarked('course', selectedCourse.id.toString())}
          onAddToComparison={() => addToComparison(selectedCourse.id, selectedCourse)}
          onRemoveFromComparison={() => removeFromComparison(selectedCourse.id)}
          isInComparison={isInComparison(selectedCourse.id)}
          canAddToComparison={selectedCount < 3}
        />
      )}

      {/* Training Center Details Modal */}
      {selectedCenter && (
        <TrainingCentreDetailsModal
          center={selectedCenter}
          isOpen={!!selectedCenter}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ElectricianCareerCourses;