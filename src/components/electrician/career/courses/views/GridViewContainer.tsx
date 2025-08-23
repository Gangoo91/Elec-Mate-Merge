import React, { useState, useMemo } from "react";
import { EnhancedCareerCourse } from "../../../../apprentice/career/courses/enhancedCoursesData";
import EnhancedCourseCard from "../../../../apprentice/career/courses/EnhancedCourseCard";
import CourseDetailsModal from "../../../../apprentice/career/courses/CourseDetailsModal";
import EmptySearchResults from "../../../../apprentice/career/courses/EmptySearchResults";
import CourseSorting, { sortOptions } from "../CourseSorting";
import CourseBookmarkManager, { useBookmarkManager } from "../CourseBookmarkManager";
import CourseCompareMode, { useCourseComparison } from "../CourseCompareMode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileDown, RefreshCw, Wifi, WifiOff, List, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GridViewContainerProps {
  courses: EnhancedCareerCourse[];
  isLiveData: boolean;
  isLoadingLive: boolean;
  liveSummary: any;
  liveTotal: number;
  refreshCourses: () => void;
  isSearching: boolean;
  currentSort: string;
  setCurrentSort: (sort: string) => void;
  filters: any;
  userLocation: string | null;
  searchRadius: number;
}

const GridViewContainer: React.FC<GridViewContainerProps> = ({
  courses,
  isLiveData,
  isLoadingLive,
  liveSummary,
  liveTotal,
  refreshCourses,
  isSearching,
  currentSort,
  setCurrentSort,
  filters,
  userLocation,
  searchRadius
}) => {
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [gridLayoutMode, setGridLayoutMode] = useState<"grid" | "list">("grid");
  
  const { toast } = useToast();
  const { toggleBookmark, isBookmarked } = useBookmarkManager();
  const { addToComparison, removeFromComparison, isInComparison, selectedCount } = useCourseComparison();

  // Enhanced filtering and sorting logic
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
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

      // Radius-based location filtering
      if (userLocation) {
        const courseWithinRadius = course.locations.some(location => {
          const locationLower = location.toLowerCase();
          const userLocationLower = userLocation.toLowerCase();
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
  }, [courses, filters, currentSort, userLocation]);

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

  const handleClose = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <Card className="border-elec-yellow/10 bg-elec-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <select 
                  value={currentSort} 
                  onChange={(e) => setCurrentSort(e.target.value)}
                  className="px-3 py-1 rounded border border-elec-yellow/20 bg-elec-card text-sm"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                  <option value="demand">Industry Demand</option>
                  <option value="future-proof">Future-Proof Score</option>
                  <option value="title">Course Title A-Z</option>
                  <option value="provider">Provider A-Z</option>
                  <option value="next-date">Next Start Date</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGridLayoutMode(gridLayoutMode === "grid" ? "list" : "grid")}
                  className="border-elec-yellow/20 hover:border-elec-yellow/40"
                >
                  {gridLayoutMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                  {gridLayoutMode === "grid" ? "List" : "Grid"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshCourses}
                  disabled={isLoadingLive}
                  className="border-elec-yellow/20 hover:border-elec-yellow/40"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingLive ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportToPDF}
                  className="border-elec-yellow/20 hover:border-elec-yellow/40"
                >
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              {isLiveData ? (
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/20">
                  <Wifi className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
              ) : (
                <Badge variant="outline" className="border-gray-500/20 text-gray-400">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Cached
                </Badge>
              )}
              
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedCourses.length} of {liveTotal} courses
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Management */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={showBookmarks ? "default" : "outline"}
          onClick={() => setShowBookmarks(!showBookmarks)}
          className="border-elec-yellow/20 hover:border-elec-yellow/40"
        >
          📖 Bookmarks
        </Button>
        
        <Button
          variant={showComparison ? "default" : "outline"}
          onClick={() => setShowComparison(!showComparison)}
          className="border-elec-yellow/20 hover:border-elec-yellow/40"
        >
          ⚖️ Compare ({selectedCount})
        </Button>
      </div>

      {/* Results */}
      {isSearching ? (
        <Card className="border-elec-yellow/10 bg-elec-card">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
            <p className="text-lg">Searching for courses...</p>
          </CardContent>
        </Card>
      ) : filteredAndSortedCourses.length === 0 ? (
        <Card className="border-elec-yellow/10 bg-elec-card">
          <CardContent className="p-8 text-center">
            <p className="text-lg mb-4">No courses found matching your criteria</p>
            <Button onClick={() => {}}>Reset Filters</Button>
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-4 ${
          gridLayoutMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredAndSortedCourses.map((course) => (
            <EnhancedCourseCard
              key={course.id}
              course={course}
              onViewDetails={viewCourseDetails}
            />
          ))}
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default GridViewContainer;