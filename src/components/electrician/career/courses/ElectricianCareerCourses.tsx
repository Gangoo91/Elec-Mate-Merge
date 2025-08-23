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
import { 
  EnhancedCareerCourse,
  EnhancedTrainingCenter
} from "../../../apprentice/career/courses/enhancedCoursesData";
import { useLiveCourseSearch } from "@/hooks/useLiveCourseSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Plus, Scale, FileDown, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const ElectricianCareerCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<EnhancedTrainingCenter | null>(null);
  const [activeTab, setActiveTab] = useState("courses");
  const [currentSort, setCurrentSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
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

      // Location filter
      if (filters.location !== "All Locations") {
        const hasLocation = course.locations.some(loc => 
          loc.toLowerCase().includes(filters.location.toLowerCase())
        );
        if (!hasLocation) return false;
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
              <Button
                variant="outline"
                onClick={refreshCourses}
                disabled={isSearching}
                className="flex items-center justify-center gap-2 min-h-[44px] text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${isSearching ? 'animate-spin' : ''}`} />
                {isMobile ? "Refresh" : "Refresh Data"}
              </Button>
              
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
      <CourseSorting
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        totalResults={filteredAndSortedCourses.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content - Courses Only */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold">Live Courses ({filteredAndSortedCourses.length})</h2>
        </div>
        
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
                  
                  {/* Live Data Badge */}
                  {course.isLive && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                    >
                      <Wifi className="h-3 w-3 mr-1" />
                      LIVE
                    </Badge>
                  )}
                  
                  {/* Mobile-Friendly Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(course)}
                      className={`min-h-[44px] min-w-[44px] p-0 md:h-8 md:w-8 ${isBookmarked(course.id) ? 
                        'text-elec-yellow hover:text-elec-yellow/80' : 
                        'text-muted-foreground hover:text-elec-yellow'
                      }`}
                      title={isBookmarked(course.id) ? "Remove from saved" : "Save course"}
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addToComparison(course.id)}
                      className={`min-h-[44px] min-w-[44px] p-0 md:h-8 md:w-8 ${isInComparison(course.id) ? 
                        'text-blue-400 hover:text-blue-300' : 
                        'text-muted-foreground hover:text-blue-400'
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