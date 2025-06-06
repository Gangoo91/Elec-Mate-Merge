
import React, { useState } from "react";
import CourseCard from "./courses/CourseCard";
import TrainingCentreCard from "./courses/TrainingCenterCard";
import CourseDetailsModal from "./courses/CourseDetailsModal";
import TrainingCentreDetailsModal from "./courses/TrainingCenterDetailsModal";
import CourseSearchForm from "./courses/CourseSearchForm";
import CourseSelectionTips from "./courses/CourseSelectionTips";
import EmptySearchResults from "./courses/EmptySearchResults";
import LocationBasedCourseSearch from "./courses/LocationBasedCourseSearch";
import { useCoursesAndCentres } from "./courses/useCoursesAndCenters";
import { useLocationBasedCourses } from "./courses/useLocationBasedCourses";
import { ukLocations, careerCourses, trainingCenters } from "./courses/coursesData";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CareerCourses = () => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  
  const {
    activeTab,
    setActiveTab,
    selectedCourse,
    selectedCenter,
    handleSearch,
    viewCourseDetails,
    viewCenterDetails,
    handleClose,
    resetFilters
  } = useCoursesAndCentres();

  const {
    locationState,
    handleLocationSelect,
    handleRadiusChange,
    filteredCourses: locationFilteredCourses,
    filteredCentres: locationFilteredCenters,
    clearLocation,
    isLocationFiltered
  } = useLocationBasedCourses(careerCourses, trainingCenters);

  // Apply both search and location filters
  const [searchFilteredCourses, setSearchFilteredCourses] = useState(locationFilteredCourses);
  const [searchFilteredCenters, setSearchFilteredCenters] = useState(locationFilteredCenters);

  // Update search filters when location filters change
  React.useEffect(() => {
    setSearchFilteredCourses(locationFilteredCourses);
    setSearchFilteredCenters(locationFilteredCenters);
  }, [locationFilteredCourses, locationFilteredCenters]);

  const handleSearchWithLocation = (values: { location: string; searchQuery: string }) => {
    const { location, searchQuery } = values;
    
    // Filter courses based on search criteria
    const coursesResult = locationFilteredCourses.filter(course => {
      const locationMatch = location === "All Locations" || course.locations.includes(location);
      const searchMatch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      return locationMatch && searchMatch;
    });
    
    setSearchFilteredCourses(coursesResult);
    
    // Filter centres based on search criteria
    const centersResult = locationFilteredCenters.filter(center => {
      const locationMatch = location === "All Locations" || center.location === location;
      const searchMatch = searchQuery === "" || 
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        center.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return locationMatch && searchMatch;
    });
    
    setSearchFilteredCenters(centersResult);
  };

  const handleResetAll = () => {
    resetFilters();
    clearLocation();
    setShowLocationSearch(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Career Courses</h2>
            <p className="text-muted-foreground">
              Professional development courses are essential for staying current with industry standards and expanding your skillset.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showLocationSearch ? "default" : "outline"}
              onClick={() => setShowLocationSearch(!showLocationSearch)}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Location Search
            </Button>
            
            {(isLocationFiltered || showLocationSearch) && (
              <Button
                variant="outline"
                onClick={handleResetAll}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Location filter indicator */}
        {isLocationFiltered && (
          <div className="flex items-center gap-2 p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm">
              Showing results within {locationState.searchRadius} miles of {locationState.location}
            </span>
            <Badge variant="outline" className="ml-auto">
              {searchFilteredCourses.length + searchFilteredCenters.length} results
            </Badge>
          </div>
        )}
      </div>

      {/* Location-based search */}
      {showLocationSearch && (
        <LocationBasedCourseSearch
          onLocationSelect={handleLocationSelect}
          onRadiusChange={handleRadiusChange}
          currentLocation={locationState.location}
          searchRadius={locationState.searchRadius}
        />
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-elec-yellow/20">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "courses" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("courses")}
        >
          Available Courses ({searchFilteredCourses.length})
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "centers" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("centers")}
        >
          Training Centres ({searchFilteredCenters.length})
        </button>
      </div>
      
      {/* Search and Filter */}
      <CourseSearchForm 
        locations={ukLocations} 
        onSearch={handleSearchWithLocation}
      />

      {/* Courses Tab Content */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFilteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              onViewDetails={viewCourseDetails}
            />
          ))}
          
          {searchFilteredCourses.length === 0 && (
            <EmptySearchResults type="courses" onReset={handleResetAll} />
          )}
        </div>
      )}
      
      {/* Training Centres Directory Tab Content */}
      {activeTab === "centers" && (
        <div className="space-y-6">
          {searchFilteredCenters.map((center) => (
            <TrainingCentreCard 
              key={center.id} 
              center={center}
              onViewDetails={viewCenterDetails}
            />
          ))}
          
          {searchFilteredCenters.length === 0 && (
            <EmptySearchResults type="centres" onReset={handleResetAll} />
          )}
        </div>
      )}
      
      {/* Course Details Modal */}
      <CourseDetailsModal course={selectedCourse} onClose={handleClose} />
      
      {/* Training Centre Details Modal */}
      <TrainingCentreDetailsModal center={selectedCenter} onClose={handleClose} />

      {/* Course Selection Tips */}
      <CourseSelectionTips />
    </div>
  );
};

export default CareerCourses;
