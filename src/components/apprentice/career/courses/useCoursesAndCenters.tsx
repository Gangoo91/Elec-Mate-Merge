
import { useState } from "react";
import { careerCourses, trainingCenters, CareerCourse, TrainingCenter } from "./coursesData";
import { useForm } from "react-hook-form";

interface SearchFormValues {
  location: string;
  searchQuery: string;
}

export const useCoursesAndCenters = () => {
  const [activeTab, setActiveTab] = useState("courses"); // courses or directory
  const [selectedCourse, setSelectedCourse] = useState<CareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<TrainingCenter | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<CareerCourse[]>(careerCourses);
  const [filteredCenters, setFilteredCenters] = useState<TrainingCenter[]>(trainingCenters);
  
  const form = useForm<SearchFormValues>({
    defaultValues: {
      location: "All Locations",
      searchQuery: "",
    }
  });

  // Handle search and filtering
  const handleSearch = (values: SearchFormValues) => {
    const { location, searchQuery } = values;
    
    // Filter courses based on search criteria
    const coursesResult = careerCourses.filter(course => {
      const locationMatch = location === "All Locations" || course.locations.includes(location);
      const searchMatch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      return locationMatch && searchMatch;
    });
    
    setFilteredCourses(coursesResult);
    
    // Filter centers based on search criteria
    const centersResult = trainingCenters.filter(center => {
      const locationMatch = location === "All Locations" || center.location === location;
      const searchMatch = searchQuery === "" || 
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        center.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return locationMatch && searchMatch;
    });
    
    setFilteredCenters(centersResult);
  };
  
  const viewCourseDetails = (course: CareerCourse) => {
    setSelectedCourse(course);
  };
  
  const viewCenterDetails = (center: TrainingCenter) => {
    setSelectedCenter(center);
  };
  
  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedCenter(null);
  };

  const resetFilters = () => {
    form.reset({
      location: "All Locations",
      searchQuery: ""
    });
    setFilteredCourses(careerCourses);
    setFilteredCenters(trainingCenters);
  };

  return {
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
  };
};
