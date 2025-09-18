import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, PoundSterling, Calculator, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import ModernCoursesHero from "./ModernCoursesHero";
import ModernCoursesFeaturedCarousel from "./ModernCoursesFeaturedCarousel";
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

const ElectricianCareerCourses = () => {
  const [allCourses, setAllCourses] = useState<EnhancedCareerCourse[]>(enhancedCareerCourses);
  const [filteredCourses, setFilteredCourses] = useState<EnhancedCareerCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "funding">("grid");
  const [modalOpen, setModalOpen] = useState(false);

  // Live courses functionality
  const { fetchLiveCourses, isLoading: isRefreshing, lastUpdated } = useLiveCourses();

  // Generate analytics from courses data
  const analytics = generateCoursesAnalytics(allCourses);

  useEffect(() => {
    setFilteredCourses(allCourses);
  }, [allCourses]);

  const handleFiltersChange = (filters: CourseFilters) => {
    let filtered = allCourses;

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.provider.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.courseOutline.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    // Apply format filter
    if (filters.format) {
      filtered = filtered.filter(course => 
        course.format.toLowerCase().includes(filters.format.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(course => 
        course.locations.some(loc => loc.toLowerCase().includes(locationLower))
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "demand":
        filtered.sort((a, b) => {
          const demandOrder = { "High": 3, "Medium": 2, "Low": 1 };
          return demandOrder[b.industryDemand] - demandOrder[a.industryDemand];
        });
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "duration":
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration.match(/\d+/)?.[0] || "0");
          const bDuration = parseInt(b.duration.match(/\d+/)?.[0] || "0");
          return aDuration - bDuration;
        });
        break;
      case "price":
        filtered.sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/[^\d]/g, "") || "0");
          const bPrice = parseInt(b.price.replace(/[^\d]/g, "") || "0");
          return aPrice - bPrice;
        });
        break;
    }

    setFilteredCourses(filtered);
  };

  const handleReset = () => {
    setFilteredCourses(allCourses);
  };

  const handleViewDetails = (course: EnhancedCareerCourse) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleBackToGrid = () => {
    setSelectedCourse(null);
    setViewMode("grid");
  };

  const handleShowFundingCalculator = () => {
    setViewMode("funding");
  };

  // Transform live course to enhanced course format
  const transformLiveCourse = (liveCourse: LiveCourse): EnhancedCareerCourse => ({
    ...liveCourse,
    futureProofing: liveCourse.futureProofing === 'Excellent' ? 5 : 4,
    accreditation: [liveCourse.accreditation],
    employerSupport: liveCourse.employerSupport === 'High'
  });

  const handleRefreshData = async () => {
    const result = await fetchLiveCourses();
    if (result?.success && result.data) {
      // Transform live courses to match EnhancedCareerCourse format
      const transformedLiveCourses = result.data.map(transformLiveCourse);
      
      // Merge with static courses, prioritizing live data
      const mergedCourses = [...transformedLiveCourses, ...enhancedCareerCourses];
      setAllCourses(mergedCourses);
    }
  };

  if (viewMode === "funding") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
        <FundingCalculator />
      </div>
    );
  }

  // Get featured courses (top 6 highest rated or high demand)
  const featuredCourses = filteredCourses
    .filter(course => (course.rating || 0) >= 4.5 || course.industryDemand === "High")
    .slice(0, 6);
  
  // Get remaining courses for grid
  const gridCourses = filteredCourses.filter(course => 
    !featuredCourses.find(featured => featured.id === course.id)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <ModernCoursesHero 
        analytics={analytics}
        onFundingCalculator={handleShowFundingCalculator}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* Modern Filters */}
      <div id="courses-filters">
        <ModernCoursesFilters
          courses={allCourses}
          onFiltersChange={handleFiltersChange}
          onReset={handleReset}
          resultCount={filteredCourses.length}
        />
      </div>

      {/* Results Section */}
      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">No courses found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Featured Carousel */}
          {featuredCourses.length > 0 && (
            <div className="transform transition-all duration-300">
              <ModernCoursesFeaturedCarousel 
                courses={featuredCourses}
                onCourseClick={handleViewDetails}
              />
            </div>
          )}

          {/* Remaining Courses Grid */}
          {gridCourses.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                <h3 className="text-xl font-semibold text-white px-4">
                  {featuredCourses.length > 0 ? 'More Courses' : 'All Courses'}
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
              </div>
              <div className="transform transition-all duration-300">
                <ModernCoursesGrid 
                  courses={gridCourses}
                  onCourseClick={handleViewDetails}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course Funding Information */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <PoundSterling className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            </div>
            UK Course Funding Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Government & Public Funding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Government & Public Funding</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Skills Bootcamp
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Free skills training for adults. Available for digital, technical, and green skills including electrical courses.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Adult Education Budget
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Funding for Level 2 qualifications and below for adults without these qualifications. Covers essential electrical training.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Construction Industry Levy
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    CITB funding available for electrical installation training. Grants up to £2,000 for eligible courses.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry & Employer Support */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Industry & Employer Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Employer Funding
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Many employers fund training for employees. Check with your employer about professional development budgets.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Professional Body Grants
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    IET, ECA, and NECA offer grants and bursaries for electrical training and continuing professional development.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Tax Relief & Deductions
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Self-employed electricians can claim training costs as business expenses. Employed staff may qualify for tax relief.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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