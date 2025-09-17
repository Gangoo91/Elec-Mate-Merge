import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, PoundSterling, Calculator, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useLiveEducationData, LiveEducationData } from "@/hooks/useLiveEducationData";
import EnhancedCourseCard from "./EnhancedCourseCard";
import CourseSearchForm from "./CourseSearchForm";
import CourseAnalyticsDashboard from "./CourseAnalyticsDashboard";
import ModernCourseDetailsModal from "./ModernCourseDetailsModal";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";
import EducationCacheManager from "./EducationCacheManager";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface CourseFilters {
  searchTerm: string;
  category: string;
  level: string;
  format: string;
  location: string;
  provider: string;
  maxPrice: string;
  duration: string;
  sortBy: string;
}

const ElectricianCareerCourses = () => {
  const { educationData, analytics, loading, error, lastUpdated, isFromCache, refreshData, cacheInfo } = useLiveEducationData('electrical');
  const [filteredCourses, setFilteredCourses] = useState<EnhancedCareerCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "funding">("grid");
  const [modalOpen, setModalOpen] = useState(false);

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
    rating: education.rating || 4.0,
    locations: education.locations,
    category: education.category,
    industryDemand: mapDemandLevel(education.employmentRate || 70),
    futureProofing: Math.round((education.employmentRate || 70) / 20),
    salaryImpact: education.averageStartingSalary,
    careerOutcomes: education.progressionOptions || [],
    accreditation: education.entryRequirements,
    employerSupport: true,
    prerequisites: education.entryRequirements,
    courseOutline: education.keyTopics || [],
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

  // Convert education data to courses when data changes
  useEffect(() => {
    if (educationData) {
      const courses = educationData.map(mapEducationDataToCourse);
      setFilteredCourses(courses);
    }
  }, [educationData]);

  const handleFiltersChange = (filters: CourseFilters) => {
    if (!educationData) return;
    
    let filtered = educationData.map(mapEducationDataToCourse);

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.provider.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
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
      filtered = filtered.filter(course => course.format === filters.format);
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
      case "price":
        filtered.sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/[^\d]/g, "") || "0");
          const bPrice = parseInt(b.price.replace(/[^\d]/g, "") || "0");
          return aPrice - bPrice;
        });
        break;
      case "duration":
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration.match(/\d+/)?.[0] || "0");
          const bDuration = parseInt(b.duration.match(/\d+/)?.[0] || "0");
          return aDuration - bDuration;
        });
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredCourses(filtered);
  };

  const handleReset = () => {
    if (educationData) {
      setFilteredCourses(educationData.map(mapEducationDataToCourse));
    }
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

  if (viewMode === "funding") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course Options
          </Button>
        </div>
        <FundingCalculator />
      </div>
    );
  }

  // Get featured courses (top 6 highest rated)
  const featuredCourses = filteredCourses
    .filter(course => (course.rating || 0) >= 4.0)
    .slice(0, 6);
  
  // Get remaining courses for grid
  const gridCourses = filteredCourses.filter(course => 
    !featuredCourses.find(featured => featured.id === course.id)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section with Analytics */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Electrical Career Courses
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Advance your electrical career with professional courses from leading UK providers. 
            Stay current with regulations, expand your skills, and increase your earning potential.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleShowFundingCalculator} variant="outline">
              <Calculator className="mr-2 h-4 w-4" />
              Course Funding Calculator
            </Button>
            <Button onClick={() => refreshData(true)} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Course Data
            </Button>
          </div>
        </div>
        
        {/* Analytics Dashboard */}
        <CourseAnalyticsDashboard />
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <strong>Connection Issue:</strong> {error} - Showing cached data if available.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-elec-yellow" />
          <div className="text-center space-y-3">
            <span className="text-lg font-medium text-white">Fetching live course data...</span>
            <div className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
              Gathering latest courses from training providers and colleges
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Cache Manager */}
          {cacheInfo && (
            <EducationCacheManager 
              cacheInfo={cacheInfo}
              onRefreshComplete={() => refreshData(true)}
            />
          )}

          {/* Search and Filters */}
          <div id="course-filters">
            <CourseSearchForm
              onSearch={handleFiltersChange}
              onReset={handleReset}
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
              {/* Featured Courses */}
              {featuredCourses.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                    <h3 className="text-xl font-semibold text-white px-4">
                      Featured Courses
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredCourses.map((course) => (
                      <EnhancedCourseCard
                        key={course.id}
                        course={course}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Courses Grid */}
              {gridCourses.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                    <h3 className="text-xl font-semibold text-white px-4">
                      {featuredCourses.length > 0 ? 'More Courses' : 'All Courses'}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridCourses.map((course) => (
                      <EnhancedCourseCard
                        key={course.id}
                        course={course}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Funding Information Card */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <PoundSterling className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            </div>
            UK Course Funding Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Government Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Government Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Skills Bootcamp
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Free courses for adults looking to build sector-specific skills. Up to 16 weeks training.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Adult Education Budget
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Funding for first Level 2 and Level 3 qualifications for adults (19+).
                  </p>
                </div>
              </div>
            </div>

            {/* Industry & Employer Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Industry & Employer Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Apprenticeship Levy
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Large employers can use levy funds for employee training and development.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Professional Body Grants
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    IET, ECA, and NICEIC offer grants and scholarships for continuing professional development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Details Modal */}
      <ModernCourseDetailsModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default ElectricianCareerCourses;