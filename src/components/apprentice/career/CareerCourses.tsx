
import React, { useState } from "react";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import EnhancedCourseCard from "./courses/EnhancedCourseCard";
import EnhancedTrainingCenterCard from "./courses/EnhancedTrainingCenterCard";
import CourseDetailsModal from "./courses/CourseDetailsModal";
import TrainingCentreDetailsModal from "./courses/TrainingCenterDetailsModal";
import CourseSearchForm from "./courses/CourseSearchForm";
import CourseSelectionTips from "./courses/CourseSelectionTips";
import EmptySearchResults from "./courses/EmptySearchResults";
import LocationBasedCourseSearch from "./courses/LocationBasedCourseSearch";
import CourseAnalyticsDashboard from "./courses/CourseAnalyticsDashboard";
import { useCoursesAndCentres } from "./courses/useCoursesAndCenters";
import { useLocationBasedCourses } from "./courses/useLocationBasedCourses";
import { ukLocations } from "./courses/coursesData";
import { 
  enhancedCareerCourses, 
  enhancedTrainingCenters, 
  courseCategories,
  EnhancedCareerCourse,
  EnhancedTrainingCenter
} from "./courses/enhancedCoursesData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, X, Filter, TrendingUp, BookOpen, Users } from "lucide-react";

const CareerCourses = () => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<EnhancedTrainingCenter | null>(null);
  
  const {
    activeTab,
    setActiveTab,
    resetFilters
  } = useCoursesAndCentres();

  const {
    locationState,
    handleLocationSelect,
    handleRadiusChange,
    clearLocation,
    isLocationFiltered
  } = useLocationBasedCourses(enhancedCareerCourses, enhancedTrainingCenters);

  // Apply location and category filters
  const filteredCourses = enhancedCareerCourses.filter(course => {
    const categoryMatch = selectedCategory === "All Categories" || course.category === selectedCategory;
    const locationMatch = !isLocationFiltered || course.locations.some(loc => 
      locationState.location === "All Locations" || loc.includes(locationState.location)
    );
    return categoryMatch && locationMatch;
  });

  const filteredCenters = enhancedTrainingCenters.filter(center => {
    const locationMatch = !isLocationFiltered || 
      locationState.location === "All Locations" || 
      center.location.includes(locationState.location);
    return locationMatch;
  });

  const handleSearchWithLocation = (values: { location: string; searchQuery: string }) => {
    // Search functionality implementation would go here
    console.log('Search values:', values);
  };

  const handleResetAll = () => {
    resetFilters();
    clearLocation();
    setSelectedCategory("All Categories");
    setShowLocationSearch(false);
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
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            UK Electrical Career Courses & Training
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive professional development courses to advance your electrical career in the UK market
            </p>
            
            <div className="flex gap-2">
              <Button
                variant={showLocationSearch ? "default" : "outline"}
                onClick={() => setShowLocationSearch(!showLocationSearch)}
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Location Search
              </Button>
              
              {(isLocationFiltered || selectedCategory !== "All Categories" || showLocationSearch) && (
                <Button
                  variant="outline"
                  onClick={handleResetAll}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Course Analytics Dashboard */}
      <CourseAnalyticsDashboard />

      {/* Active Filters Display */}
      {(isLocationFiltered || selectedCategory !== "All Categories") && (
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Active Filters:</span>
              
              {isLocationFiltered && (
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  {locationState.location} ({locationState.searchRadius} miles)
                </Badge>
              )}
              
              {selectedCategory !== "All Categories" && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {selectedCategory}
                </Badge>
              )}
              
              <Badge variant="outline" className="ml-auto">
                {filteredCourses.length + filteredCenters.length} results
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location-based search */}
      {showLocationSearch && (
        <LocationBasedCourseSearch
          onLocationSelect={handleLocationSelect}
          onRadiusChange={handleRadiusChange}
          currentLocation={locationState.location}
          searchRadius={locationState.searchRadius}
        />
      )}

      {/* Category Filter */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {courseCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-elec-yellow text-elec-dark" : 
                  "border-elec-yellow/30 hover:bg-elec-yellow/10"
                }
              >
                {category}
                {category !== "All Categories" && (
                  <Badge variant="secondary" className="ml-2 h-4 px-1">
                    {enhancedCareerCourses.filter(c => c.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Form */}
      <CourseSearchForm 
        locations={ukLocations} 
        onSearch={handleSearchWithLocation}
      />

      {/* Dropdown Navigation */}
      <DropdownTabs 
        tabs={[
          {
            value: "courses",
            label: `Courses (${filteredCourses.length})`,
            icon: BookOpen,
            content: (
              <div className="space-y-6">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <EnhancedCourseCard 
                        key={course.id} 
                        course={course}
                        onViewDetails={viewCourseDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySearchResults type="courses" onReset={handleResetAll} />
                )}
              </div>
            )
          },
          {
            value: "centers",
            label: `Training Centres (${filteredCenters.length})`,
            icon: Users,
            content: (
              <div className="space-y-6">
                {filteredCenters.length > 0 ? (
                  <div className="space-y-6">
                    {filteredCenters.map((center) => (
                      <EnhancedTrainingCenterCard 
                        key={center.id} 
                        center={center}
                        onViewDetails={viewCenterDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySearchResults type="centers" onReset={handleResetAll} />
                )}
              </div>
            )
          }
        ]}
        defaultValue={activeTab}
        placeholder="Select view"
        onValueChange={setActiveTab}
        className="w-full"
      />
      
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

export default CareerCourses;
