import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ModernCoursesHero from "./ModernCoursesHero";
import ModernCoursesGrid from "./ModernCoursesGrid";
import ModernCoursesFilters, { CourseFilters } from "./ModernCoursesFilters";
import ModernCoursesDetailsModal from "./ModernCoursesDetailsModal";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";
import {
  enhancedCareerCourses,
  EnhancedCareerCourse
} from "@/components/apprentice/career/courses/enhancedCoursesData";
import { generateCoursesAnalytics } from "./coursesAnalyticsHelper";
import { useLiveCourses, LiveCourse } from "@/hooks/useLiveCourses";
import { isValidUrl } from "@/utils/urlUtils";

const ElectricianCareerCourses = () => {
  // State
  const [allCourses, setAllCourses] = useState<EnhancedCareerCourse[]>(enhancedCareerCourses);
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "funding">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CourseFilters>({
    searchTerm: "",
    category: "",
    level: "",
    format: "",
    location: "",
    sortBy: "rating"
  });

  // Live courses hook
  const { fetchLiveCourses, isLoading: isRefreshing, lastUpdated } = useLiveCourses();

  // Transform live course to enhanced course format
  const transformLiveCourse = useCallback((liveCourse: LiveCourse): EnhancedCareerCourse => ({
    ...liveCourse,
    rating: liveCourse.rating ?? 4.0,
    external_url: liveCourse.visitLink,
    image_url: liveCourse.image_url,
    futureProofing: liveCourse.futureProofing === 'Excellent' ? 5 : 4,
    accreditation: [liveCourse.accreditation],
    employerSupport: liveCourse.employerSupport === 'High'
  }), []);

  // Fetch live courses on mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchLiveCourses();
      if (result?.success && result.data && result.data.length > 0) {
        const transformedLiveCourses = result.data
          .filter(course => isValidUrl(course.visitLink))
          .map(transformLiveCourse);

        if (transformedLiveCourses.length > 0) {
          setAllCourses(transformedLiveCourses);
        }
      }
    };
    fetchData();
  }, [fetchLiveCourses, transformLiveCourse]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...allCourses];

    // Apply search query from hero
    const searchTerm = searchQuery || filters.searchTerm;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.provider.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.courseOutline.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(course => course.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter(course => course.level === filters.level);
    }

    // Apply format filter
    if (filters.format) {
      result = result.filter(course =>
        course.format.toLowerCase().includes(filters.format.toLowerCase())
      );
    }

    // Apply demand filter (using location field for demand)
    if (filters.location) {
      result = result.filter(course => course.industryDemand === filters.location);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "demand":
        result.sort((a, b) => {
          const demandOrder = { "High": 3, "Medium": 2, "Low": 1 };
          return demandOrder[b.industryDemand] - demandOrder[a.industryDemand];
        });
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

    return result;
  }, [allCourses, searchQuery, filters]);

  // Generate analytics
  const analytics = useMemo(() => generateCoursesAnalytics(allCourses), [allCourses]);

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

  const handleRefreshData = useCallback(async () => {
    const result = await fetchLiveCourses();
    if (result?.success && result.data && result.data.length > 0) {
      const transformedLiveCourses = result.data
        .filter(course => isValidUrl(course.visitLink))
        .map(transformLiveCourse);

      if (transformedLiveCourses.length > 0) {
        setAllCourses(transformedLiveCourses);
      }
    }
  }, [fetchLiveCourses, transformLiveCourse]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
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
    <div className="space-y-6">
      {/* Hero with Search */}
      <ModernCoursesHero
        analytics={analytics}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFundingCalculator={handleShowFundingCalculator}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
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
        isLoading={isRefreshing && allCourses.length === 0}
      />

      {/* Course Details Modal */}
      <ModernCoursesDetailsModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default ElectricianCareerCourses;
