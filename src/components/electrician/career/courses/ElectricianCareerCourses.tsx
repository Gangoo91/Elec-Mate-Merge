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
  enhancedCareerCourses
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
  const [coursesPerPage, setCoursesPerPage] = useState(10);
  
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
  const liveCourses = hasLiveCourses ? educationData.map(mapEducationDataToCourse) : fallbackElectricalCourses;
  const liveTotal = hasLiveCourses ? educationData.length : fallbackElectricalCourses.length;
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

    // Sorting with robust data parsing and debugging
    const sortOption = sortOptions.find(opt => opt.key === currentSort);
    if (sortOption) {
      console.log('🔄 Sorting by:', currentSort, 'Direction:', sortOption.direction);
      console.log('📊 Sample course data for sorting:', filtered.slice(0, 2).map(c => ({
        title: c.title,
        price: c.price,
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
            const relevanceA = getNumericRating(a.rating) * getFutureProofingScore(a.futureProofing);
            const relevanceB = getNumericRating(b.rating) * getFutureProofingScore(b.futureProofing);
            comparison = relevanceB - relevanceA;
            console.log(`Relevance sort: ${a.title} (${relevanceA}) vs ${b.title} (${relevanceB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;

          case "rating":
            const ratingA = getNumericRating(a.rating);
            const ratingB = getNumericRating(b.rating);
            comparison = ratingA - ratingB;
            console.log(`Rating sort: ${a.title} (${a.rating}→${ratingA}) vs ${b.title} (${b.rating}→${ratingB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          case "price":
          case "price-low":
          case "price-high":
            const priceA = parsePrice(a.price || '');
            const priceB = parsePrice(b.price || '');
            // Handle price-low vs price-high direction
            if (sortOption.key === "price-high") {
              comparison = priceB - priceA; // High to low
            } else {
              comparison = priceA - priceB; // Low to high
            }
            console.log(`💰 Price sort (${sortOption.key}): ${a.title} (${a.price}→£${priceA}) vs ${b.title} (${b.price}→£${priceB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          case "duration":
            const durationA = parseDuration(a.duration || '');
            const durationB = parseDuration(b.duration || '');
            comparison = durationA - durationB;
            console.log(`Duration sort: ${a.title} (${a.duration}→${durationA}w) vs ${b.title} (${b.duration}→${durationB}w) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          case "demand":
            const demandA = getDemandScore(a.industryDemand || '');
            const demandB = getDemandScore(b.industryDemand || '');
            comparison = demandA - demandB;
            console.log(`Demand sort: ${a.title} (${a.industryDemand}→${demandA}) vs ${b.title} (${b.industryDemand}→${demandB}) = ${comparison}`);
            if (comparison === 0) {
              comparison = getNumericRating(a.rating) - getNumericRating(b.rating);
              if (comparison === 0) comparison = a.title.localeCompare(b.title);
            }
            break;
            
          case "future-proof":
            const futureA = getFutureProofingScore(a.futureProofing);
            const futureB = getFutureProofingScore(b.futureProofing);
            comparison = futureA - futureB;
            console.log(`Future-proof sort: ${a.title} (${a.futureProofing}→${futureA}) vs ${b.title} (${b.futureProofing}→${futureB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          case "title":
            // Enhanced alphabetical sorting with robust validation
            const titleA = a.title || '';
            const titleB = b.title || '';
            
            if (!titleA && !titleB) {
              comparison = 0;
            } else if (!titleA) {
              comparison = 1; // Move invalid titles to end
            } else if (!titleB) {
              comparison = -1; // Move invalid titles to end
            } else {
              comparison = titleA.localeCompare(titleB);
            }
            
            console.log(`📝 Title sort: "${titleA}" vs "${titleB}" = ${comparison}`);
            break;
            
          case "provider":
            comparison = a.provider.localeCompare(b.provider);
            console.log(`Provider sort: ${a.provider} vs ${b.provider} = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          case "next-date":
            const dateA = parseDate(a.nextDates);
            const dateB = parseDate(b.nextDates);
            comparison = dateA.getTime() - dateB.getTime();
            console.log(`Date sort: ${a.title} (${a.nextDates}→${dateA}) vs ${b.title} (${b.nextDates}→${dateB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
            break;
            
          default:
            const defaultRelevanceA = getNumericRating(a.rating) * getFutureProofingScore(a.futureProofing);
            const defaultRelevanceB = getNumericRating(b.rating) * getFutureProofingScore(b.futureProofing);
            comparison = defaultRelevanceA - defaultRelevanceB;
            console.log(`Default relevance sort: ${a.title} (${defaultRelevanceA}) vs ${b.title} (${defaultRelevanceB}) = ${comparison}`);
            if (comparison === 0) comparison = a.title.localeCompare(b.title);
        }
        
        // Apply sort direction consistently
        return sortOption.direction === "desc" ? -comparison : comparison;
      });
      
      console.log('✅ Sorted courses:', filtered.slice(0, 3).map(c => c.title));
    }

    return filtered;
  }, [liveCourses, filters, currentSort, sortVersion]);

  // Pagination calculations
  const totalPages = coursesPerPage === -1 ? 1 : Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const indexOfLastCourse = coursesPerPage === -1 ? filteredAndSortedCourses.length : currentPage * coursesPerPage;
  const indexOfFirstCourse = coursesPerPage === -1 ? 0 : indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Pagination handler
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of courses section
    const coursesSection = document.querySelector('[data-courses-section]');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
                <div className="space-y-1">
                  <p className="text-xs text-elec-yellow">
                    ✅ Live UK data: {liveSummary.liveCourses} courses from {liveSummary.sourceBreakdown.filter(s => s.success).length} providers
                    {liveSummary.lastUpdated && ` • Updated ${new Date(liveSummary.lastUpdated).toLocaleTimeString()}`}
                  </p>
                  
                  {/* Cache Information Display */}
                  {cacheInfo && (
                    <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        {isFromCache ? 'Cached data' : 'Fresh data'}
                      </span>
                      
                      {cacheInfo.daysUntilRefresh > 0 ? (
                        <span>• Refreshes in {cacheInfo.daysUntilRefresh} day{cacheInfo.daysUntilRefresh !== 1 ? 's' : ''}</span>
                      ) : (
                        <span>• Next refresh: Sunday 2 AM</span>
                      )}
                      
                      <span>• Cache v{cacheInfo.cacheVersion}</span>
                      
                      {cacheInfo.refreshStatus === 'in_progress' && (
                        <span className="text-amber-400">• Refreshing...</span>
                      )}
                      
                      {cacheInfo.refreshStatus === 'failed' && (
                        <span className="text-red-400">• Last refresh failed</span>
                      )}
                    </div>
                  )}
                </div>
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
                disabled={isSearching}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${isSearching ? 'animate-spin' : ''}`} />
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

      {/* Professional Header */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6">
        <div className="space-y-1 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            UK Electrical Career Courses & Training
          </h1>
          <p className="text-sm text-white/80">
            Professional electrical courses from leading UK training providers
          </p>
        </div>
        
        {/* Live data indicators */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="text-sm text-white/80">
                <p className="break-words">
                  Available Courses: <span className="text-elec-yellow font-medium">{filteredAndSortedCourses.length}</span>
                  {isUsingFallback && (
                    <span className="text-elec-yellow/80 ml-2 text-xs">
                      (Cached Data)
                    </span>
                  )}
                </p>
                {liveTotal > 0 && (
                  <p className="text-xs text-white/80 mt-1">
                    Sources: {isLiveData ? 'Live Education API' : 'Cached Training Data'}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={() => refreshCourses()}
              disabled={isLoadingLive}
              size="sm"
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 bg-transparent whitespace-nowrap flex-shrink-0 transition-all duration-200 touch-target min-h-[44px]"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">{isLoadingLive ? 'Updating...' : 'Refresh Courses'}</span>
              <span className="xs:hidden">{isLoadingLive ? 'Updating...' : 'Refresh'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Courses Carousel - Hidden in map view */}
      {viewMode !== "map" && liveCourses.length > 0 && (
        <div className="transform transition-all duration-300">
          <CourseFeaturedCarousel 
            courses={liveCourses.slice(0, 6)} 
            onCourseClick={viewCourseDetails} 
          />
        </div>
      )}

      {/* Enhanced Search and Filters - Hidden in map view */}
      {viewMode !== "map" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
            <h3 className="text-lg sm:text-xl font-semibold text-white px-4">
              More Courses
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
          </div>
          <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6">
            <EnhancedCourseSearch 
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredAndSortedCourses.length}
              isSearching={isSearching}
              viewMode={viewMode}
            />
          </div>
        </div>
      )}

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 pb-4 border-b border-border" data-courses-section>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              <h2 className="text-lg font-semibold">
                Live Courses ({filteredAndSortedCourses.length})
              </h2>
              {filteredAndSortedCourses.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {coursesPerPage === -1 
                    ? `${filteredAndSortedCourses.length} courses${isSearching ? ' so far' : ''}` 
                    : `Showing ${indexOfFirstCourse + 1}-${Math.min(indexOfLastCourse, filteredAndSortedCourses.length)} of ${filteredAndSortedCourses.length}${isSearching ? ' so far' : ''}`
                  }
                </Badge>
              )}
              {userLocation && (
                <Badge variant="outline" className="text-xs">
                  Within {searchRadius} miles of {userLocation.split(',')[0]}
                </Badge>
              )}
            </div>
            
            {/* Courses Per Page Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Courses per page:</span>
              <span className="text-sm text-muted-foreground sm:hidden">Per page:</span>
              <Select
                value={coursesPerPage === -1 ? "all" : coursesPerPage.toString()} 
                onValueChange={handleCoursesPerPageChange}
                disabled={isSearching}
              >
                <SelectTrigger className="w-auto min-w-[100px] bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              isAutoDetecting={isAutoDetecting}
              onProviderSearch={handleProviderSearchFromLocation}
              onUseCurrentLocation={handleAutoLocationDetection}
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
            {isLoadingLive && !isLiveData ? (
              /* Show skeleton loading on initial load */
              <div className="space-y-4">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-elec-yellow mb-2">Finding electrical courses for you...</h3>
                  <p className="text-sm text-muted-foreground">Searching training providers across the UK</p>
                </div>
                <CourseGridSkeleton count={9} />
              </div>
            ) : filteredAndSortedCourses.length > 0 ? (
              <div className="space-y-6">
                 <div className={viewMode === "grid" ? 
                   "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6" : 
                   "space-y-4 md:space-y-6"
                 }>
                   {currentCourses.map((course) => (
                   <div key={course.id} className="relative group">
                     <CourseNewsCard 
                       course={course}
                       onClick={() => viewCourseDetails(course)}
                     />
                     
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
                         onClick={() => addToComparison(course.id, course)}
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
                
                {/* Pagination */}
                {filteredAndSortedCourses.length > 0 && coursesPerPage !== -1 && filteredAndSortedCourses.length > coursesPerPage && (
                  <JobPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                  />
                )}
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