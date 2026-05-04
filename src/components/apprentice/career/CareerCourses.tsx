import { useState } from 'react';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import EnhancedCourseCard from './courses/EnhancedCourseCard';
import EnhancedTrainingCenterCard from './courses/EnhancedTrainingCenterCard';
import CourseDetailsModal from './courses/CourseDetailsModal';
import TrainingCentreDetailsModal from './courses/TrainingCenterDetailsModal';
import CourseSearchForm from './courses/CourseSearchForm';
import CourseSelectionTips from './courses/CourseSelectionTips';
import EmptySearchResults from './courses/EmptySearchResults';
import LocationBasedCourseSearch from './courses/LocationBasedCourseSearch';
import CourseAnalyticsDashboard from './courses/CourseAnalyticsDashboard';
import { useCoursesAndCentres } from './courses/useCoursesAndCenters';
import { useLocationBasedCourses } from './courses/useLocationBasedCourses';
import { ukLocations } from './courses/coursesData';
import {
  enhancedCareerCourses,
  enhancedTrainingCenters,
  courseCategories,
  EnhancedCareerCourse,
  EnhancedTrainingCenter,
} from './courses/enhancedCoursesData';
import { Button } from '@/components/ui/button';
import { MapPin, X, BookOpen, Users } from 'lucide-react';

const CareerCourses = () => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCourse, setSelectedCourse] = useState<EnhancedCareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<EnhancedTrainingCenter | null>(null);

  const { activeTab, setActiveTab, resetFilters } = useCoursesAndCentres();

  const {
    locationState,
    handleLocationSelect,
    handleRadiusChange,
    clearLocation,
    isLocationFiltered,
  } = useLocationBasedCourses(enhancedCareerCourses as any, enhancedTrainingCenters);

  const filteredCourses = enhancedCareerCourses.filter((course) => {
    const categoryMatch =
      selectedCategory === 'All Categories' || course.category === selectedCategory;
    const locationMatch =
      !isLocationFiltered ||
      course.locations.some(
        (loc) => locationState.location === 'All Locations' || loc.includes(locationState.location)
      );
    return categoryMatch && locationMatch;
  });

  const filteredCenters = enhancedTrainingCenters.filter((center) => {
    const locationMatch =
      !isLocationFiltered ||
      locationState.location === 'All Locations' ||
      center.location.includes(locationState.location);
    return locationMatch;
  });

  const handleSearchWithLocation = (values: { location: string; searchQuery: string }) => {
    console.log('Search values:', values);
  };

  const handleResetAll = () => {
    resetFilters();
    clearLocation();
    setSelectedCategory('All Categories');
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
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Training & courses
          </span>
          <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
            UK electrical career courses
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Professional development courses to advance your electrical career.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={showLocationSearch ? 'default' : 'outline'}
            onClick={() => setShowLocationSearch(!showLocationSearch)}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] flex items-center gap-2 touch-manipulation"
          >
            <MapPin className="h-4 w-4" />
            Location search
          </Button>

          {(isLocationFiltered ||
            selectedCategory !== 'All Categories' ||
            showLocationSearch) && (
            <Button
              variant="outline"
              onClick={handleResetAll}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] flex items-center gap-2 touch-manipulation"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <CourseAnalyticsDashboard />

      {(isLocationFiltered || selectedCategory !== 'All Categories') && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Active filters
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {isLocationFiltered && (
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {locationState.location} ({locationState.searchRadius} miles)
              </span>
            )}
            {selectedCategory !== 'All Categories' && (
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {selectedCategory}
              </span>
            )}
            <span className="text-[12px] text-white/55 ml-auto">
              {filteredCourses.length + filteredCenters.length} results
            </span>
          </div>
        </div>
      )}

      {showLocationSearch && (
        <LocationBasedCourseSearch
          onLocationSelect={handleLocationSelect}
          onRadiusChange={handleRadiusChange}
          currentLocation={locationState.location}
          searchRadius={locationState.searchRadius}
        />
      )}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Filter by category
        </span>
        <div className="flex flex-wrap gap-2">
          {courseCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Button
                key={category}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  isActive
                    ? 'bg-elec-yellow text-black font-semibold h-9 touch-manipulation'
                    : 'border-white/15 text-white hover:bg-white/[0.05] h-9 touch-manipulation'
                }
              >
                {category}
                {category !== 'All Categories' && (
                  <span className="ml-2 text-[11px] opacity-70">
                    {enhancedCareerCourses.filter((c) => c.category === category).length}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <CourseSearchForm locations={ukLocations} onSearch={handleSearchWithLocation} />

      <DropdownTabs
        tabs={[
          {
            value: 'courses',
            label: `Courses (${filteredCourses.length})`,
            icon: BookOpen,
            content: (
              <div className="space-y-6">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
            ),
          },
          {
            value: 'centers',
            label: `Training centres (${filteredCenters.length})`,
            icon: Users,
            content: (
              <div className="space-y-6">
                {filteredCenters.length > 0 ? (
                  <div className="space-y-4">
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
            ),
          },
        ]}
        defaultValue={activeTab}
        placeholder="Select view"
        onValueChange={setActiveTab}
        className="w-full"
      />

      {selectedCourse && <CourseDetailsModal course={selectedCourse} onClose={handleClose} />}
      {selectedCenter && (
        <TrainingCentreDetailsModal center={selectedCenter} onClose={handleClose} />
      )}

      <CourseSelectionTips />
    </div>
  );
};

export default CareerCourses;
