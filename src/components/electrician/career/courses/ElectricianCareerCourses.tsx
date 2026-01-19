import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ModernCoursesHero from "./ModernCoursesHero";
import ModernCoursesGrid from "./ModernCoursesGrid";
import ModernCoursesFilters, { CourseFilters } from "./ModernCoursesFilters";
import ModernCoursesDetailsModal from "./ModernCoursesDetailsModal";
import CourseEnquirySheet from "@/components/training-courses/CourseEnquirySheet";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { useTrainingCourses, calculateCoursesAnalytics, TrainingCourse } from "@/hooks/useTrainingCourses";

// Transform TrainingCourse to EnhancedCareerCourse for existing grid/modal components
const transformToEnhanced = (course: TrainingCourse): EnhancedCareerCourse => ({
  id: course.id,
  title: course.title,
  provider: course.provider_name,
  category: course.category,
  description: course.description || "",
  duration: course.duration || "Contact provider",
  price: course.price || "Contact for pricing",
  level: course.level || "All levels",
  format: course.format || "Classroom",
  location: course.venue_city || (course.is_online ? "Online" : "Various UK locations"),
  rating: course.rating || 4.0,
  external_url: course.external_url,
  image_url: undefined,
  futureProofing: 4,
  industryDemand: "High" as const,
  courseOutline: [],
  accreditation: course.accreditation || [],
  employerSupport: true,
  visitLink: course.external_url,
  // Additional fields for display
  _distance: (course as any)._distance,
  venue_postcode: course.venue_postcode,
  contact_phone: course.contact_phone,
  contact_email: course.contact_email,
  booking_url: course.booking_url,
  next_dates: course.next_dates,
});

const ElectricianCareerCourses = () => {
  // State
  const [viewMode, setViewMode] = useState<"grid" | "funding">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [enquiryCourse, setEnquiryCourse] = useState<EnhancedCareerCourse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState<CourseFilters>({
    searchTerm: "",
    category: "",
    level: "",
    format: "",
    location: "",
    sortBy: "rating"
  });

  // Training courses hook with filters
  const {
    courses: rawCourses,
    totalCount,
    isLoading,
    isRefreshing,
    forceRefresh,
  } = useTrainingCourses({
    searchQuery: searchQuery || filters.searchTerm,
    category: selectedCategory || filters.category,
    postcode: locationQuery,
    format: filters.format,
    level: filters.level,
    sortBy: filters.sortBy as "rating" | "price" | "title" | "distance",
  });

  // Transform courses
  const allCourses = useMemo(() => rawCourses.map(transformToEnhanced), [rawCourses]);

  // Filter courses (additional client-side filtering if needed)
  const filteredCourses = useMemo(() => {
    let result = [...allCourses];

    // Apply demand filter (using location field for demand)
    if (filters.location && !locationQuery) {
      result = result.filter(course => course.industryDemand === filters.location);
    }

    // Apply sorting if not already sorted by hook
    if (!locationQuery) {
      switch (filters.sortBy) {
        case "rating":
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "title":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "duration":
          result.sort((a, b) => {
            const aDuration = parseInt(a.duration.match(/\d+/)?.[0] || "0");
            const bDuration = parseInt(b.duration.match(/\d+/)?.[0] || "0");
            return aDuration - bDuration;
          });
          break;
        case "price":
          result.sort((a, b) => {
            const aPrice = parseInt(a.price.replace(/[^\d]/g, "") || "0");
            const bPrice = parseInt(b.price.replace(/[^\d]/g, "") || "0");
            return aPrice - bPrice;
          });
          break;
      }
    }

    return result;
  }, [allCourses, filters, locationQuery]);

  // Generate analytics
  const analytics = useMemo(() => {
    const baseAnalytics = calculateCoursesAnalytics(rawCourses);
    return {
      ...baseAnalytics,
      // Convert to expected format
      highDemandCourses: baseAnalytics.highDemandCourses,
    };
  }, [rawCourses]);

  // Handlers
  const handleFiltersChange = useCallback((newFilters: CourseFilters) => {
    setFilters(newFilters);
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      searchTerm: "",
      category: "",
      level: "",
      format: "",
      location: "",
      sortBy: "rating"
    });
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("");
  }, []);

  const handleViewDetails = useCallback((course: EnhancedCareerCourse) => {
    setSelectedCourse(course);
    setModalOpen(true);
  }, []);

  const handleShowFundingCalculator = useCallback(() => {
    setViewMode("funding");
  }, []);

  const handleBackToGrid = useCallback(() => {
    setViewMode("grid");
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setLocationQuery(location);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleEnquire = useCallback((course: EnhancedCareerCourse) => {
    setEnquiryCourse(course);
    setEnquiryOpen(true);
  }, []);

  // Funding Calculator View
  if (viewMode === "funding") {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={handleBackToGrid}
          className="bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
        <FundingCalculator />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero with Search + Location + Category Pills */}
      <ModernCoursesHero
        analytics={analytics}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFundingCalculator={handleShowFundingCalculator}
        onRefreshData={forceRefresh}
        isRefreshing={isRefreshing}
        locationQuery={locationQuery}
        onLocationChange={handleLocationChange}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      {/* Filters with Category Pills */}
      <ModernCoursesFilters
        courses={allCourses}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleReset}
        resultCount={filteredCourses.length}
      />

      {/* Course Grid */}
      <ModernCoursesGrid
        courses={filteredCourses}
        onCourseClick={handleViewDetails}
        isLoading={isLoading && allCourses.length === 0}
      />

      {/* Course Details Modal */}
      <ModernCoursesDetailsModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onEnquire={handleEnquire}
      />

      {/* Course Enquiry Sheet */}
      <CourseEnquirySheet
        course={enquiryCourse}
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
      />
    </div>
  );
};

export default ElectricianCareerCourses;
