
import { useState } from "react";
import CourseCard from "./courses/CourseCard";
import TrainingCenterCard from "./courses/TrainingCenterCard";
import CourseDetailsModal from "./courses/CourseDetailsModal";
import TrainingCenterDetailsModal from "./courses/TrainingCenterDetailsModal";
import CourseSearchForm from "./courses/CourseSearchForm";
import CourseSelectionTips from "./courses/CourseSelectionTips";
import EmptySearchResults from "./courses/EmptySearchResults";
import { useCoursesAndCenters } from "./courses/useCoursesAndCenters";
import { ukLocations } from "./courses/coursesData";

const CareerCourses = () => {
  const {
    activeTab,
    setActiveTab,
    selectedCourse,
    selectedCenter,
    filteredCourses,
    filteredCenters,
    form,
    handleSearch,
    viewCourseDetails,
    viewCenterDetails,
    handleClose,
    resetFilters
  } = useCoursesAndCenters();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Courses</h2>
        <p className="text-muted-foreground">
          Professional development courses are essential for staying current with industry standards and expanding your skillset.
          These popular courses can help you advance your electrical career and increase your earning potential.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-elec-yellow/20">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "courses" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("courses")}
        >
          Available Courses
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "directory" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("directory")}
        >
          Training Center Directory
        </button>
      </div>
      
      {/* Search and Filter */}
      <CourseSearchForm 
        locations={ukLocations} 
        onSearch={handleSearch}
      />

      {/* Courses Tab Content */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              onViewDetails={viewCourseDetails}
            />
          ))}
          
          {filteredCourses.length === 0 && (
            <EmptySearchResults type="courses" onReset={resetFilters} />
          )}
        </div>
      )}
      
      {/* Training Centers Directory Tab Content */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {filteredCenters.map((center) => (
            <TrainingCenterCard 
              key={center.id} 
              center={center}
              onViewDetails={viewCenterDetails}
            />
          ))}
          
          {filteredCenters.length === 0 && (
            <EmptySearchResults type="centers" onReset={resetFilters} />
          )}
        </div>
      )}
      
      {/* Course Details Modal */}
      <CourseDetailsModal course={selectedCourse} onClose={handleClose} />
      
      {/* Training Center Details Modal */}
      <TrainingCenterDetailsModal center={selectedCenter} onClose={handleClose} />

      {/* Course Selection Tips */}
      <CourseSelectionTips />
    </div>
  );
};

export default CareerCourses;
